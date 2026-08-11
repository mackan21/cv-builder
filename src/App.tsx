import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import styles from './App.module.css'
import { PersonalSection } from './components/PersonalSection'
import { LinksSection } from './components/LinksSection'
import { SummarySection } from './components/SummarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { SkillsSection } from './components/SkillsSection'
import { ExportDialog } from './components/ExportDialog'
import { ResumePage } from './components/ResumePage'
import { ResumeDocument } from './pdf/ResumeDocument'
import { registerPdfFonts } from './pdf/fonts'
import { useCVStore } from './store/cvStore'

registerPdfFonts()

const TABS = [
  { id: 'personal', label: 'Personal', Component: PersonalSection },
  { id: 'links', label: 'Links', Component: LinksSection },
  { id: 'summary', label: 'Summary', Component: SummarySection },
  { id: 'skills', label: 'Skills', Component: SkillsSection },
  { id: 'experience', label: 'Experience', Component: ExperienceSection },
  { id: 'education', label: 'Education', Component: EducationSection },
] as const

type TabId = (typeof TABS)[number]['id']

function defaultFileName(name: string) {
  const slug = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .join('-')
    .toLowerCase()
  return `${slug || 'resume'}-cv.pdf`
}

function App() {
  const data = useCVStore((state) => state.data)
  const reset = useCVStore((state) => state.reset)
  const [exporting, setExporting] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('personal')
  const ActiveSection = TABS.find((tab) => tab.id === activeTab)?.Component ?? PersonalSection
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [fileName, setFileName] = useState('')

  function handleReset() {
    if (window.confirm('Clear everything and start over?')) reset()
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
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          </div>
          <nav className={styles.tabNav} aria-label="CV sections">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={tab.id === activeTab ? `${styles.tabButton} ${styles.tabButtonActive}` : styles.tabButton}
                onClick={() => setActiveTab(tab.id)}
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
          <ResumePage />
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
    </div>
  )
}

export default App
