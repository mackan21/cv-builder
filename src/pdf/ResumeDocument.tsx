import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import type { CVData } from '../types/cv'

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

const CM = 28.3465 // pt per cm, PDF's native unit

const styles = StyleSheet.create({
  page: {
    paddingTop: 1 * CM,
    paddingBottom: 2 * CM,
    paddingLeft: 2 * CM,
    paddingRight: 2 * CM,
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Tinos',
    fontSize: 32,
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'Arimo',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#595959',
    marginTop: 8,
  },
  rule: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    marginVertical: 10,
    width: '100%',
  },
  contactLine: {
    fontFamily: 'Carlito',
    fontSize: 10,
    textAlign: 'center',
    color: '#000000',
  },
  contactLineSpaced: {
    marginTop: 6,
  },
  link: {
    color: '#0563c1',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontFamily: 'Arimo',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#595959',
    marginBottom: 12,
  },
  summaryTitle: {
    fontFamily: 'Arimo',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#595959',
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.35,
  },
  skillRow: {
    flexDirection: 'row',
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
  },
  skillRowSpaced: {
    marginTop: 4,
  },
  skillLabel: {
    width: 90,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  skillItems: {
    flex: 1,
  },
  entry: {
    marginBottom: 10,
  },
  entryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  entryRole: {
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 12,
  },
  entryRoleTitle: {
    fontWeight: 700,
  },
  entryCompany: {
    fontWeight: 400,
  },
  entryLocation: {
    fontWeight: 400,
    fontStyle: 'italic',
  },
  entryDates: {
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletMark: {
    width: 12,
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
  },
  bulletText: {
    flex: 1,
    fontFamily: 'Carlito',
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.3,
  },
})

type ContactItem = { key: string; text: string; href?: string }

function ContactLine({ items, spaced }: { items: ContactItem[]; spaced?: boolean }) {
  return (
    <Text style={[styles.contactLine, spaced ? styles.contactLineSpaced : undefined]}>
      {items.map((item, idx) => (
        <Text key={item.key}>
          {idx > 0 && ' | '}
          {item.href ? (
            <Link src={item.href} style={styles.link}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </Text>
      ))}
    </Text>
  )
}

type ExperienceItem = CVData['experience'][number]
type EducationItem = CVData['education'][number]

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const bullets = item.description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.entryRole}>
          <Text style={styles.entryRoleTitle}>{item.role}</Text>
          {item.company && <Text style={styles.entryCompany}> | {item.company}</Text>}
          {item.location && <Text style={styles.entryLocation}>, {item.location}</Text>}
        </Text>
        <Text style={styles.entryDates}>
          {item.start}
          {item.end ? ` – ${item.end}` : ''}
        </Text>
      </View>
      {bullets.map((line, idx) => (
        <View key={idx} style={styles.bulletRow}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{line}</Text>
        </View>
      ))}
    </View>
  )
}

function EducationEntry({ item }: { item: EducationItem }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.entryRole}>
          <Text style={styles.entryRoleTitle}>{item.degree}</Text>
          {item.school && <Text style={styles.entryCompany}>, {item.school}</Text>}
          {item.location && <Text style={styles.entryLocation}>, {item.location}</Text>}
        </Text>
        <Text style={styles.entryDates}>
          {item.start}
          {item.end ? ` – ${item.end}` : ''}
        </Text>
      </View>
    </View>
  )
}

export function ResumeDocument({ data }: { data: CVData }) {
  const skillGroups = data.skillGroups
    .map((group) => ({
      ...group,
      itemList: group.items
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }))
    .filter((group) => group.itemList.length > 0)

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

  const contactLineItems = linkItems.length <= 1 ? [...infoItems, ...linkItems] : infoItems
  const linkLineItems = linkItems.length <= 1 ? [] : linkItems

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name || 'Your Name'}</Text>
          {data.title && <Text style={styles.title}>{data.title}</Text>}
          <View style={styles.rule} />
          <ContactLine items={contactLineItems} />
          {linkLineItems.length > 0 && <ContactLine items={linkLineItems} spaced />}
          <View style={styles.rule} />
        </View>

        {data.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.summaryTitle}>{data.headings.summary || 'Professional Summary'}</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
            <View style={styles.rule} />
          </View>
        )}

        {skillGroups.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{data.headings.skills || 'Skills'}</Text>
            {skillGroups.map((group, idx) => (
              <View key={group.id} style={[styles.skillRow, idx > 0 ? styles.skillRowSpaced : undefined]}>
                <Text style={styles.skillLabel}>{group.label}</Text>
                <Text style={styles.skillItems}>{group.itemList.join(' | ')}</Text>
              </View>
            ))}
            <View style={styles.rule} />
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            {/* Wrapped with the first entry so the heading can never be
                orphaned alone at the bottom of a page. */}
            <View wrap={false}>
              <Text style={styles.sectionTitle}>{data.headings.experience || 'Experience'}</Text>
              <ExperienceEntry item={data.experience[0]} />
            </View>
            {data.experience.slice(1).map((item) => (
              <ExperienceEntry key={item.id} item={item} />
            ))}
            <View style={styles.rule} />
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>{data.headings.education || 'Education'}</Text>
              <EducationEntry item={data.education[0]} />
            </View>
            {data.education.slice(1).map((item) => (
              <EducationEntry key={item.id} item={item} />
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
