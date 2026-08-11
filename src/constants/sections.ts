export const SECTION_ORDER = ['personal', 'links', 'summary', 'skills', 'experience', 'education'] as const

export type SectionId = (typeof SECTION_ORDER)[number]
