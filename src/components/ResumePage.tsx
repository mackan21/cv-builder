import { useCVStore } from '../store/cvStore'
import styles from './ResumePage.module.css'

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export function ResumePage() {
  const data = useCVStore((state) => state.data)
  const skillGroups = data.skillGroups
    .map((group) => ({
      ...group,
      itemList: group.items
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }))
    .filter((group) => group.itemList.length > 0)

  type ContactItem = { key: string; text: string; href?: string }

  const infoItems: ContactItem[] = [
    ...(data.phone ? [{ key: 'phone', text: data.phone }] : []),
    ...(data.email ? [{ key: 'email', text: data.email }] : []),
    ...(data.location ? [{ key: 'location', text: data.location }] : []),
  ]

  const linkItems: ContactItem[] = [
    ...(data.linkedin ? [{ key: 'linkedin', text: 'LinkedIn', href: normalizeUrl(data.linkedin) }] : []),
    ...data.links
      .filter((link) => link.url)
      .map((link) => ({ key: link.id, text: link.label || link.url, href: normalizeUrl(link.url) })),
  ]

  // A single link stays on the contact line. Two or more move to their own line below.
  const contactLineItems = linkItems.length <= 1 ? [...infoItems, ...linkItems] : infoItems
  const linkLineItems = linkItems.length <= 1 ? [] : linkItems

  function renderItems(items: ContactItem[]) {
    return items.map((item, idx) => (
      <span key={item.key}>
        {idx > 0 && ' | '}
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {item.text}
          </a>
        ) : (
          item.text
        )}
      </span>
    ))
  }

  return (
    <div className={`${styles.wrapper} print-reset`}>
      <div className={`${styles.ruler} print-hide`} aria-hidden="true"></div>
      <div className={`${styles.rulerSide} print-hide`} aria-hidden="true"></div>
      <div className={`${styles.page} print-page`} id="resume-page">
        <header className={styles.header}>
          <h1 className={styles.name}>{data.name || 'Your Name'}</h1>
          <p className={styles.title}>{data.title}</p>
          <hr className={styles.rule} />
          <p className={styles.contact}>{renderItems(contactLineItems)}</p>
          {linkLineItems.length > 0 && <p className={styles.contact}>{renderItems(linkLineItems)}</p>}
          <hr className={styles.rule} />
        </header>

        {data.summary && (
          <section className={styles.section}>
            <h2 className={styles.summaryTitle}>Professional Summary</h2>
            <p className={styles.summary}>{data.summary}</p>
            <hr className={styles.rule} />
          </section>
        )}

        {skillGroups.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            {skillGroups.map((group) => (
              <div key={group.id} className={styles.skillRow}>
                <span className={styles.skillLabel}>{group.label}</span>
                <span className={styles.skillItems}>{group.itemList.join(' | ')}</span>
              </div>
            ))}
            <hr className={styles.rule} />
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {data.experience.map((item) => {
              const bullets = item.description
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
              return (
                <div key={item.id} className={styles.entry}>
                  <div className={styles.entryHead}>
                    <span className={styles.entryRole}>
                      <span className={styles.entryRoleTitle}>{item.role}</span>
                      {item.company && <span className={styles.entryCompany}> | {item.company}</span>}
                      {item.location && <span className={styles.entryLocation}>, {item.location}</span>}
                    </span>
                    <span className={styles.entryDates}>
                      {item.start}
                      {item.end ? ` – ${item.end}` : ''}
                    </span>
                  </div>
                  {bullets.length > 0 && (
                    <ul className={styles.entryBullets}>
                      {bullets.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
            <hr className={styles.rule} />
          </section>
        )}

        {data.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {data.education.map((item) => (
              <div key={item.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <span className={styles.entryRole}>
                    <span className={styles.entryRoleTitle}>{item.degree}</span>
                    {item.school && <span className={styles.entryCompany}>, {item.school}</span>}
                    {item.location && <span className={styles.entryLocation}>, {item.location}</span>}
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
      </div>
    </div>
  )
}
