import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import styles from './App.module.css'
import { PersonalSection } from './components/PersonalSection'
import { LinksSection } from './components/LinksSection'
import { SummarySection } from './components/SummarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { SkillsSection } from './components/SkillsSection'
import { ResumePage } from './components/ResumePage'
import { ResumeDocument } from './pdf/ResumeDocument'
import { registerPdfFonts } from './pdf/fonts'
import { useCVStore } from './store/cvStore'

registerPdfFonts()

function App() {
  const data = useCVStore((state) => state.data)
  const reset = useCVStore((state) => state.reset)
  const [exporting, setExporting] = useState(false)

  function handleReset() {
    if (window.confirm('Clear everything and start over?')) reset()
  }

  async function handleExport() {
    setExporting(true)
    try {
      const blob = await pdf(<ResumeDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${(data.name || 'resume').trim().replace(/\s+/g, '_')}.pdf`
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
          <button type="button" className={styles.exportButton} onClick={handleExport} disabled={exporting}>
            {exporting ? 'Exporting…' : 'Export PDF'}
          </button>
          <a
            className={`${styles.githubLink} mono`}
            href="https://github.com/mackan21/cv-builder"
            target="_blank"
            rel="noopener noreferrer"
          >
            source →
          </a>
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
          <PersonalSection />
          <LinksSection />
          <SummarySection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
        </div>
        <div className={styles.previewPanel}>
          <div className={styles.panelLabel}>preview</div>
          <ResumePage />
        </div>
      </main>
    </div>
  )
}

export default App
