import styles from './App.module.css'
import { PersonalSection } from './components/PersonalSection'
import { SummarySection } from './components/SummarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { SkillsSection } from './components/SkillsSection'
import { ResumePage } from './components/ResumePage'
import { useCVStore } from './store/cvStore'

function App() {
  const reset = useCVStore((state) => state.reset)

  function handleReset() {
    if (window.confirm('Clear everything and start over?')) reset()
  }

  return (
    <div className={`${styles.app} print-reset`}>
      <header className={`${styles.header} print-hide`}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            ▦
          </span>
          <span className={styles.wordmark}>CV Forge</span>
        </div>
        <div className={styles.headerRight}>
          <button type="button" className={styles.exportButton} onClick={() => window.print()}>
            Export PDF
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

      <main className={`${styles.layout} print-reset`}>
        <div className={`${styles.formPanel} print-hide`}>
          <div className={styles.panelLabelRow}>
            <div className={styles.panelLabel}>editor</div>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          </div>
          <PersonalSection />
          <SummarySection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
        </div>
        <div className={`${styles.previewPanel} print-reset`}>
          <div className={`${styles.panelLabel} print-hide`}>preview</div>
          <ResumePage />
        </div>
      </main>
    </div>
  )
}

export default App
