import { Fragment } from 'react'
import { useCVStore } from '../store/cvStore'
import { usePageCount } from '../pdf/usePageCount'
import { hasExperienceContent, hasEducationContent, hasCertificationContent } from '../utils/cv'
import { SECTION_ORDER, type SectionId } from '../constants/sections'
import styles from './ResumePage.module.css'

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export function ResumePage({ furthestSection }: { furthestSection: SectionId }) {
  const data = useCVStore((state) => state.data)
  const furthestIndex = SECTION_ORDER.indexOf(furthestSection)
  const isPastSection = (id: SectionId) => furthestIndex > SECTION_ORDER.indexOf(id)
  const pageCount = usePageCount(data)
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

  const experience = data.experience.filter(hasExperienceContent)
  const education = data.education.filter(hasEducationContent)
  const certifications = data.certifications.filter(hasCertificationContent)
  const hasHeaderContent = Boolean(data.name || data.title || contactLineItems.length > 0 || linkLineItems.length > 0)

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
    <>
      {pageCount > 1 && (
        <div className={styles.pageBadge}>⚠ Will export as {pageCount} pages</div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.page} id="resume-page">
          {hasHeaderContent && (
            <header className={styles.header}>
              {data.name && <h1 className={styles.name}>{data.name}</h1>}
              {data.title && <p className={styles.title}>{data.title}</p>}
              {data.name && data.title && <hr className={styles.rule} />}
              {contactLineItems.length > 0 && <p className={styles.contact}>{renderItems(contactLineItems)}</p>}
              {linkLineItems.length > 0 && <p className={styles.contact}>{renderItems(linkLineItems)}</p>}
              {isPastSection('links') && <hr className={styles.rule} />}
            </header>
          )}

        {data.summary && (
          <section className={styles.section}>
            <h2 className={styles.summaryTitle}>{data.headings.summary || 'Professional Summary'}</h2>
            <p className={styles.summary}>{data.summary}</p>
            {isPastSection('summary') && <hr className={styles.rule} />}
          </section>
        )}

        {skillGroups.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.headings.skills || 'Skills'}</h2>
            <div className={styles.skillGrid}>
              {skillGroups.map((group) => (
                <Fragment key={group.id}>
                  <span className={styles.skillLabel}>{group.label}</span>
                  <span className={styles.skillItems}>{group.itemList.join(' | ')}</span>
                </Fragment>
              ))}
            </div>
            {isPastSection('skills') && <hr className={styles.rule} />}
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.headings.experience || 'Experience'}</h2>
            {experience.map((item) => {
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
            {isPastSection('experience') && <hr className={styles.rule} />}
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.headings.education || 'Education'}</h2>
            {education.map((item) => (
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
            {isPastSection('education') && <hr className={styles.rule} />}
          </section>
        )}

        {certifications.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{data.headings.certifications || 'Certifications'}</h2>
            {certifications.map((item) => (
              <div key={item.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <span className={styles.entryRole}>
                    <span className={styles.entryRoleTitle}>
                      {item.url ? (
                        <a href={normalizeUrl(item.url)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </span>
                    {item.issuer && <span className={styles.entryCompany}>, {item.issuer}</span>}
                  </span>
                  <span className={styles.entryDates}>{item.date}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
      </div>
    </>
  )
}
