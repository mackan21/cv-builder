export interface Experience {
  id: string
  role: string
  company: string
  start: string
  end: string
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  start: string
  end: string
}

export interface CVData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string
}
