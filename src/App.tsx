import styles from './App.module.css'
import { PersonalSection } from './components/PersonalSection'
import { SummarySection } from './components/SummarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { SkillsSection } from './components/SkillsSection'
import { ResumePage } from './components/ResumePage'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            ▦
          </span>
          <span className={styles.wordmark}>CV Forge</span>
        </div>
        <a
          className={`${styles.githubLink} mono`}
          href="https://github.com/mackan21/cv-builder"
          target="_blank"
          rel="noopener noreferrer"
        >
          source →
        </a>
      </header>

      <main className={styles.layout}>
        <div className={styles.formPanel}>
          <div className={styles.panelLabel}>editor</div>
          <PersonalSection />
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
