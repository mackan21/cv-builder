import { useCVStore } from '../store/cvStore'
import styles from './ResumePage.module.css'

export function ResumePage() {
  const data = useCVStore((state) => state.data)
  const skillList = data.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className={`${styles.wrapper} print-reset`}>
      <div className={`${styles.ruler} print-hide`} aria-hidden="true"></div>
      <div className={`${styles.rulerSide} print-hide`} aria-hidden="true"></div>
      <div className={`${styles.page} print-page`} id="resume-page">
        <header className={styles.header}>
          <h1 className={styles.name}>{data.name || 'Your Name'}</h1>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.contact}>
            {[data.email, data.phone, data.location, data.linkedin, data.github].filter(Boolean).join('  ·  ')}
          </p>
        </header>

        {data.summary && (
          <section className={styles.section}>
            <p className={styles.summary}>{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {data.experience.map((item) => (
              <div key={item.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <span className={styles.entryRole}>
                    {item.role}
                    {item.company ? `, ${item.company}` : ''}
                  </span>
                  <span className={styles.entryDates}>
                    {item.start}
                    {item.end ? ` – ${item.end}` : ''}
                  </span>
                </div>
                {item.description && <p className={styles.entryDescription}>{item.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {data.education.map((item) => (
              <div key={item.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <span className={styles.entryRole}>
                    {item.degree}
                    {item.school ? `, ${item.school}` : ''}
                  </span>
                  <span className={styles.entryDates}>
                    {item.start}
                    {item.end ? ` – ${item.end}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {skillList.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skills}>
              {skillList.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
