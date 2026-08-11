import type { Education, Experience } from '../types/cv'

export function hasExperienceContent(item: Experience) {
  return Boolean(
    item.role.trim() ||
      item.company.trim() ||
      item.location.trim() ||
      item.start.trim() ||
      item.end.trim() ||
      item.description.trim(),
  )
}

export function hasEducationContent(item: Education) {
  return Boolean(
    item.degree.trim() || item.school.trim() || item.location.trim() || item.start.trim() || item.end.trim(),
  )
}
