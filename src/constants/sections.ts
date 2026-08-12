export const SECTION_ORDER = [
  'personal',
  'links',
  'summary',
  'skills',
  'experience',
  'education',
  'certifications',
  'customSection',
] as const

export type SectionId = (typeof SECTION_ORDER)[number]
