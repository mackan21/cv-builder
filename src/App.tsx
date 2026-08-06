import styles from './App.module.css'

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
        </div>
        <div className={styles.previewPanel}>
          <div className={styles.panelLabel}>preview</div>
        </div>
      </main>
    </div>
  )
}

export default App
