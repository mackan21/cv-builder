import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CVData, Education, Experience, Link, SkillGroup } from '../types/cv'

function makeId() {
  return Math.random().toString(36).slice(2, 10)
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
    { id: makeId(), label: 'Frontend', items: '' },
    { id: makeId(), label: 'Backend', items: '' },
    { id: makeId(), label: 'Verktyg', items: '' },
  ],
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
  addLink: () => void
  updateLink: (id: string, patch: Partial<Link>) => void
  removeLink: (id: string) => void
  addSkillGroup: () => void
  updateSkillGroup: (id: string, patch: Partial<SkillGroup>) => void
  removeSkillGroup: (id: string) => void
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
      reset: () => set({ data: initialData }),
    }),
    {
      name: 'cv-forge-data',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<CVStore>),
        data: { ...currentState.data, ...(persistedState as Partial<CVStore>)?.data },
      }),
    },
  ),
)
