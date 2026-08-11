import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Certification, CVData, Education, Experience, Headings, Link, SkillGroup } from '../types/cv'

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

// A corrupted or blocked localStorage record must never crash the app at
// startup — any read/write/parse failure here just falls back to a fresh CV
// instead of a white screen with no recovery path.
const safeStorage = {
  getItem: (name: string) => {
    try {
      const value = localStorage.getItem(name)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },
  setItem: (name: string, value: unknown) => {
    try {
      localStorage.setItem(name, JSON.stringify(value))
    } catch {
      // Storage full, disabled, or blocked — silently skip persisting this write.
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name)
    } catch {
      // ignore
    }
  },
}

const initialData: CVData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  links: [],
  summary: '',
  experience: [
    {
      id: makeId(),
      role: '',
      company: '',
      location: '',
      start: '',
      end: '',
      description: '',
    },
  ],
  education: [
    {
      id: makeId(),
      school: '',
      degree: '',
      location: '',
      start: '',
      end: '',
    },
  ],
  skillGroups: [
    { id: makeId(), label: 'Technical Skills', items: '' },
    { id: makeId(), label: 'Soft Skills', items: '' },
  ],
  certifications: [],
  headings: {
    summary: 'Professional Summary',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
  },
}

type ReorderableField = 'links' | 'experience' | 'education' | 'skillGroups' | 'certifications'

interface CVStore {
  data: CVData
  setField: <K extends keyof CVData>(key: K, value: CVData[K]) => void
  moveItem: (field: ReorderableField, id: string, direction: 'up' | 'down') => void
  addExperience: () => void
  updateExperience: (id: string, patch: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, patch: Partial<Education>) => void
  removeEducation: (id: string) => void
  addLink: () => void
  updateLink: (id: string, patch: Partial<Link>) => void
  removeLink: (id: string) => void
  addSkillGroup: () => void
  updateSkillGroup: (id: string, patch: Partial<SkillGroup>) => void
  removeSkillGroup: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, patch: Partial<Certification>) => void
  removeCertification: (id: string) => void
  updateHeading: (key: keyof Headings, value: string) => void
  reset: () => void
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: initialData,
      setField: (key, value) => set((state) => ({ data: { ...state.data, [key]: value } })),
      moveItem: (field, id, direction) =>
        set((state) => {
          const list = state.data[field]
          const index = list.findIndex((item) => item.id === id)
          const swapWith = direction === 'up' ? index - 1 : index + 1
          if (index === -1 || swapWith < 0 || swapWith >= list.length) return state
          const next = [...list] as typeof list
          ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
          return { data: { ...state.data, [field]: next } }
        }),
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { id: makeId(), role: '', company: '', location: '', start: '', end: '', description: '' },
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
            education: [
              ...state.data.education,
              { id: makeId(), school: '', degree: '', location: '', start: '', end: '' },
            ],
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
      addLink: () =>
        set((state) => ({
          data: { ...state.data, links: [...state.data.links, { id: makeId(), label: '', url: '' }] },
        })),
      updateLink: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            links: state.data.links.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          },
        })),
      removeLink: (id) =>
        set((state) => ({
          data: { ...state.data, links: state.data.links.filter((item) => item.id !== id) },
        })),
      addSkillGroup: () =>
        set((state) => ({
          data: { ...state.data, skillGroups: [...state.data.skillGroups, { id: makeId(), label: '', items: '' }] },
        })),
      updateSkillGroup: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            skillGroups: state.data.skillGroups.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          },
        })),
      removeSkillGroup: (id) =>
        set((state) => ({
          data: { ...state.data, skillGroups: state.data.skillGroups.filter((item) => item.id !== id) },
        })),
      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [...state.data.certifications, { id: makeId(), name: '', issuer: '', date: '', url: '' }],
          },
        })),
      updateCertification: (id, patch) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          data: { ...state.data, certifications: state.data.certifications.filter((item) => item.id !== id) },
        })),
      updateHeading: (key, value) =>
        set((state) => ({
          data: { ...state.data, headings: { ...state.data.headings, [key]: value } },
        })),
      reset: () => set({ data: initialData }),
    }),
    {
      name: 'cv-forge-data',
      storage: safeStorage,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<CVStore>),
        data: { ...currentState.data, ...(persistedState as Partial<CVStore>)?.data },
      }),
    },
  ),
)
