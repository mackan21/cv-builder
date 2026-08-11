import type { CVData } from '../types/cv'

export function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export interface ContactItem {
  key: string
  text: string
  href?: string
}

// Shared between the HTML preview and the PDF export so the "single link
// stays inline, two or more move to their own line" rule (and whether the
// header renders at all) can never quietly drift apart between the two.
export function buildContactLines(data: CVData) {
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

  const hasHeaderContent = Boolean(data.name || data.title || contactLineItems.length > 0 || linkLineItems.length > 0)

  return { contactLineItems, linkLineItems, hasHeaderContent }
}
