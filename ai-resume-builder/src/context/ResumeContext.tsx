import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type ResumeBasics = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
}

export type ResumeEntry = {
  id: string
  title: string
  subtitle?: string
  meta?: string
  description?: string
}

export type ResumeData = {
  basics: ResumeBasics
  summary: string
  skills: string[]
  experience: ResumeEntry[]
  projects: ResumeEntry[]
  education: ResumeEntry[]
  achievements: ResumeEntry[]
  order: Array<keyof Omit<ResumeData, 'order'>>
}

export type Theme = {
  color: string
  template: 'minimal' | 'modern' | 'compact' | 'creative'
  darkMode: boolean
}

const SAMPLE: ResumeData = {
  basics: {
    name: 'Alex Johnson',
    title: 'Senior Frontend Engineer',
    email: 'alex@example.com',
    phone: '+1 555-555-5555',
    location: 'San Francisco, CA',
    website: 'alex.dev',
  },
  summary: 'Frontend engineer with 7+ years building SaaS products. Specializes in React, TypeScript, performance, and delightful UX.',
  skills: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Testing', 'Accessibility'],
  experience: [
    {
      id: 'exp1',
      title: 'Senior Frontend Engineer',
      subtitle: 'Acme Corp',
      meta: '2021 - Present',
      description: 'Led migration to React 18 & Vite; improved performance by 40%. Built design system and mentored 4 engineers.'
    },
    {
      id: 'exp2',
      title: 'Frontend Engineer',
      subtitle: 'Startup XYZ',
      meta: '2018 - 2021',
      description: 'Shipped analytics features used by 50k+ users. Collaborated with product to increase activation by 15%.'
    }
  ],
  projects: [
    { id: 'pr1', title: 'Real-time Dashboard', subtitle: 'React, WebSockets', meta: '2023', description: 'Interactive dashboards with live metrics and animations.' }
  ],
  education: [
    { id: 'ed1', title: 'B.S. Computer Science', subtitle: 'State University', meta: '2014 - 2018', description: 'Graduated with Honors' }
  ],
  achievements: [
    { id: 'ach1', title: 'Speaker', subtitle: 'ReactConf', meta: '2022', description: 'Gave a talk on performance patterns' }
  ],
  order: ['basics', 'summary', 'skills', 'experience', 'projects', 'education', 'achievements']
}

const DEFAULT_THEME: Theme = {
  color: '#2563eb',
  template: 'modern',
  darkMode: true,
}

const STORAGE_KEY = 'ai-resume-data-v1'
const THEME_KEY = 'ai-resume-theme-v1'

export type ResumeContextValue = {
  data: ResumeData
  setData: (updater: (prev: ResumeData) => ResumeData) => void
  theme: Theme
  updateTheme: (partial: Partial<Theme>) => void
  reset: () => void
  loadJson: (json: string) => void
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as ResumeData : SAMPLE
  })
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved ? JSON.parse(saved) as Theme : DEFAULT_THEME
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme))
    if (theme.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.style.setProperty('--theme-color', theme.color)
  }, [theme])

  const setData = (updater: (prev: ResumeData) => ResumeData) => {
    setDataState(prev => updater(prev))
  }

  const updateTheme = (partial: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...partial }))
  }

  const reset = () => {
    setDataState(SAMPLE)
  }

  const loadJson = (json: string) => {
    try {
      const parsed = JSON.parse(json) as ResumeData
      setDataState(parsed)
    } catch {}
  }

  const value = useMemo<ResumeContextValue>(() => ({ data, setData, theme, updateTheme, reset, loadJson }), [data, theme])

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  )
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}