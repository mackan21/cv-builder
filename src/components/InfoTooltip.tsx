import styles from './InfoTooltip.module.css'

export function InfoTooltip({ text }: { text: string }) {
  return (
    <span className={styles.wrapper}>
      <button type="button" className={styles.icon} aria-label={text}>
        i
      </button>
      <span className={styles.bubble} role="tooltip">
        {text}
      </span>
    </span>
  )
}
