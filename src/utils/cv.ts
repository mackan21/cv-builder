import type { Certification, CustomEntry, Education, Experience } from '../types/cv'

export function hasExperienceContent(item: Experience) {
  return Boolean(
    item.role?.trim() ||
      item.company?.trim() ||
      item.location?.trim() ||
      item.start?.trim() ||
      item.end?.trim() ||
      item.description?.trim(),
  )
}

export function hasEducationContent(item: Education) {
  return Boolean(
    item.degree?.trim() || item.school?.trim() || item.location?.trim() || item.start?.trim() || item.end?.trim(),
  )
}

export function hasCertificationContent(item: Certification) {
  return Boolean(item.name?.trim() || item.issuer?.trim() || item.date?.trim() || item.url?.trim())
}

export function hasCustomEntryContent(item: CustomEntry) {
  return Boolean(item.title?.trim() || item.subtitle?.trim() || item.date?.trim() || item.description?.trim())
}
