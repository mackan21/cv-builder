import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import styles from './App.module.css'
import { PersonalSection } from './components/PersonalSection'
import { LinksSection } from './components/LinksSection'
import { SummarySection } from './components/SummarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { CertificationsSection } from './components/CertificationsSection'
import { SkillsSection } from './components/SkillsSection'
import { ExportDialog } from './components/ExportDialog'
import { ConfirmDialog } from './components/ConfirmDialog'
import { ResumePage } from './components/ResumePage'
import { ResumeDocument } from './pdf/ResumeDocument'
import { registerPdfFonts } from './pdf/fonts'
import { useCVStore } from './store/cvStore'
import { SECTION_ORDER, type SectionId } from './constants/sections'
import { hasExperienceContent, hasEducationContent, hasCertificationContent } from './utils/cv'
import type { CVData } from './types/cv'

registerPdfFonts()

const SECTION_META: Record<SectionId, { label: string; Component: React.ComponentType }> = {
  personal: { label: 'Personal', Component: PersonalSection },
  links: { label: 'Links', Component: LinksSection },
  summary: { label: 'Summary', Component: SummarySection },
  skills: { label: 'Skills', Component: SkillsSection },
  experience: { label: 'Experience', Component: ExperienceSection },
  education: { label: 'Education', Component: EducationSection },
  certifications: { label: 'Certifications', Component: CertificationsSection },
}

const TABS = SECTION_ORDER.map((id) => ({ id, ...SECTION_META[id] }))

function defaultFileName(name: string) {
  const slug = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .join('-')
    .toLowerCase()
  return `${slug || 'resume'}-cv.pdf`
}

// Lets a returning user's already-filled CV show all its dividing lines
// immediately, instead of only revealing them as they click through tabs again.
function furthestFilledIndex(data: CVData): number {
  const hasSkills = data.skillGroups.some((group) => group.items.trim())
  const hasLinks = Boolean(data.linkedin) || data.links.some((link) => link.url)
  const hasPersonal = Boolean(data.name || data.title || data.email || data.phone || data.location)

  const filled: SectionId[] = [
    ...(hasPersonal ? (['personal'] as const) : []),
    ...(hasLinks ? (['links'] as const) : []),
    ...(data.summary ? (['summary'] as const) : []),
    ...(hasSkills ? (['skills'] as const) : []),
    ...(data.experience.some(hasExperienceContent) ? (['experience'] as const) : []),
    ...(data.education.some(hasEducationContent) ? (['education'] as const) : []),
    ...(data.certifications.some(hasCertificationContent) ? (['certifications'] as const) : []),
  ]
  return filled.reduce((max, id) => Math.max(max, SECTION_ORDER.indexOf(id)), 0)
}

function App() {
  const data = useCVStore((state) => state.data)
  const reset = useCVStore((state) => state.reset)
  const [exporting, setExporting] = useState(false)
  const [activeTab, setActiveTab] = useState<SectionId>('personal')
  const ActiveSection = TABS.find((tab) => tab.id === activeTab)?.Component ?? PersonalSection
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [maxTabIndex, setMaxTabIndex] = useState(() => furthestFilledIndex(data))

  function handleReset() {
    setResetDialogOpen(false)
    reset()
    setActiveTab('personal')
    setMaxTabIndex(0)
  }

  function goToTab(id: SectionId, index: number) {
    setActiveTab(id)
    setMaxTabIndex((prev) => Math.max(prev, index))
  }

  function openExportDialog() {
    setFileName(defaultFileName(data.name))
    setExportDialogOpen(true)
  }

  async function handleExport() {
    const trimmed = fileName.trim()
    if (!trimmed) return
    setExportDialogOpen(false)

    setExporting(true)
    try {
      const blob = await pdf(<ResumeDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = trimmed.toLowerCase().endsWith('.pdf') ? trimmed : `${trimmed}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            ▦
          </span>
          <span className={styles.wordmark}>CV Forge</span>
        </div>
        <div className={styles.headerRight}>
          <button type="button" className={styles.exportButton} onClick={openExportDialog} disabled={exporting}>
            {exporting ? 'Exporting…' : 'Export PDF'}
          </button>
        </div>
      </header>

      <main className={styles.layout}>
        <div className={styles.formPanel}>
          <div className={styles.panelLabelRow}>
            <div className={styles.panelLabel}>editor</div>
            <button type="button" className={styles.resetButton} onClick={() => setResetDialogOpen(true)}>
              Reset
            </button>
          </div>
          <nav className={styles.tabNav} aria-label="CV sections">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={tab.id === activeTab ? `${styles.tabButton} ${styles.tabButtonActive}` : styles.tabButton}
                onClick={() => goToTab(tab.id, index)}
                aria-current={tab.id === activeTab}
              >
                <span className={styles.tabIndex}>{String(index + 1).padStart(2, '0')}</span>
                {tab.label}
              </button>
            ))}
          </nav>
          <ActiveSection />
        </div>
        <div className={styles.previewPanel}>
          <div className={styles.panelLabel}>preview</div>
          <ResumePage furthestSection={SECTION_ORDER[maxTabIndex]} />
        </div>
      </main>

      {exportDialogOpen && (
        <ExportDialog
          fileName={fileName}
          onFileNameChange={setFileName}
          onConfirm={handleExport}
          onCancel={() => setExportDialogOpen(false)}
        />
      )}

      {resetDialogOpen && (
        <ConfirmDialog
          title="Reset CV"
          message="This clears everything you've entered and starts over. This can't be undone."
          confirmLabel="Reset"
          onConfirm={handleReset}
          onCancel={() => setResetDialogOpen(false)}
        />
      )}
    </div>
  )
}

export default App
