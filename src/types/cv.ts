export interface Experience {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  location: string
  start: string
  end: string
}

export interface Link {
  id: string
  label: string
  url: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
}

export interface SkillGroup {
  id: string
  label: string
  items: string
}

export interface CustomEntry {
  id: string
  title: string
  subtitle: string
  date: string
  description: string
}

export interface Headings {
  summary: string
  skills: string
  experience: string
  education: string
  certifications: string
  customSection: string
}

export interface CVData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  links: Link[]
  summary: string
  experience: Experience[]
  education: Education[]
  skillGroups: SkillGroup[]
  certifications: Certification[]
  customSection: CustomEntry[]
  headings: Headings
}
