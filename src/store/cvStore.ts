import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CVData, Education, Experience } from '../types/cv'

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

const initialData: CVData = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'you@email.com',
  phone: '+46 70 000 00 00',
  location: 'City, Country',
  linkedin: 'linkedin.com/in/yourname',
  github: 'github.com/yourname',
  summary: 'A short summary of who you are and what you do — two or three sentences is plenty.',
  experience: [
    {
      id: makeId(),
      role: 'Role Title',
      company: 'Company Name',
      start: '2024',
      end: 'Present',
      description: 'What you did and what changed because of it.',
    },
  ],
  education: [
    {
      id: makeId(),
      school: 'School Name',
      degree: 'Degree or Programme',
      start: '2021',
      end: '2024',
    },
  ],
  skills: 'Skill one, skill two, skill three',
}

interface CVStore {
  data: CVData
  setField: <K extends keyof CVData>(key: K, value: CVData[K]) => void
  addExperience: () => void
  updateExperience: (id: string, patch: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, patch: Partial<Education>) => void
  removeEducation: (id: string) => void
  reset: () => void
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: initialData,
      setField: (key, value) => set((state) => ({ data: { ...state.data, [key]: value } })),
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { id: makeId(), role: '', company: '', start: '', end: '', description: '' },
            ],
          },
        })),
      updateExperience: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: { ...state.data, experience: state.data.experience.filter((item) => item.id !== id) },
        })),
      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, { id: makeId(), school: '', degree: '', start: '', end: '' }],
          },
        })),
      updateEducation: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: { ...state.data, education: state.data.education.filter((item) => item.id !== id) },
        })),
      reset: () => set({ data: initialData }),
    }),
    { name: 'cv-forge-data' },
  ),
)
