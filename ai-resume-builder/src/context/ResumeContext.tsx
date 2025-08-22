import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppSettings, JDAnalysisResult, ResumeData, SectionKey, TemplateName, ThemeName } from '../types';
import { defaultResume } from '../data/defaultResume';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const RESUME_KEY = 'ai-resume-builder:data';
const SETTINGS_KEY = 'ai-resume-builder:settings';

export type ResumeContextValue = {
  data: ResumeData;
  settings: AppSettings;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  setPrimaryColor: (hex: string) => void;
  setTemplate: (name: TemplateName) => void;
  updateBasics: (partial: Partial<ResumeData['basics']>) => void;
  updateSummary: (content: string) => void;
  setSkills: (items: ResumeData['skills']['items']) => void;
  addExperience: () => void;
  updateExperience: (id: string, partial: Partial<ResumeData['experience'][number]>) => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, partial: Partial<ResumeData['projects'][number]>) => void;
  removeProject: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, partial: Partial<ResumeData['education'][number]>) => void;
  removeEducation: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, partial: Partial<ResumeData['achievements'][number]>) => void;
  removeAchievement: (id: string) => void;
  moveSection: (key: SectionKey, direction: 'up' | 'down') => void;
  reset: () => void;
  importJson: (json: string) => void;
  exportJson: () => string;
  analyzeJD: (jdText: string) => JDAnalysisResult;
};

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(() => loadFromStorage(RESUME_KEY, defaultResume));
  const [settings, setSettings] = useState<AppSettings>(() =>
    loadFromStorage(SETTINGS_KEY, { theme: 'light', primaryColor: '#6366f1', template: 'minimal' })
  );

  useEffect(() => {
    saveToStorage(RESUME_KEY, data);
  }, [data]);

  useEffect(() => {
    saveToStorage(SETTINGS_KEY, settings);
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [settings.theme]);

  const setTheme = useCallback((theme: ThemeName) => setSettings(s => ({ ...s, theme })), []);
  const toggleTheme = useCallback(() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })), []);
  const setPrimaryColor = useCallback((hex: string) => setSettings(s => ({ ...s, primaryColor: hex })), []);
  const setTemplate = useCallback((name: TemplateName) => setSettings(s => ({ ...s, template: name })), []);

  const updateBasics = useCallback((partial: Partial<ResumeData['basics']>) => {
    setData(d => ({ ...d, basics: { ...d.basics, ...partial } }));
  }, []);

  const updateSummary = useCallback((content: string) => {
    setData(d => ({ ...d, summary: { content } }));
  }, []);

  const setSkills = useCallback((items: ResumeData['skills']['items']) => {
    setData(d => ({ ...d, skills: { items } }));
  }, []);

  const addExperience = useCallback(() => {
    setData(d => ({
      ...d,
      experience: [
        ...d.experience,
        { id: uid('exp'), company: '', role: '', startDate: '', endDate: '', location: '', highlights: [] }
      ]
    }));
  }, []);

  const updateExperience = useCallback((id: string, partial: Partial<ResumeData['experience'][number]>) => {
    setData(d => ({
      ...d,
      experience: d.experience.map(it => (it.id === id ? { ...it, ...partial } : it))
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setData(d => ({ ...d, experience: d.experience.filter(it => it.id !== id) }));
  }, []);

  const addProject = useCallback(() => {
    setData(d => ({
      ...d,
      projects: [
        ...d.projects,
        { id: uid('proj'), name: '', link: '', description: '', highlights: [] }
      ]
    }));
  }, []);

  const updateProject = useCallback((id: string, partial: Partial<ResumeData['projects'][number]>) => {
    setData(d => ({
      ...d,
      projects: d.projects.map(it => (it.id === id ? { ...it, ...partial } : it))
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData(d => ({ ...d, projects: d.projects.filter(it => it.id !== id) }));
  }, []);

  const addEducation = useCallback(() => {
    setData(d => ({
      ...d,
      education: [
        ...d.education,
        { id: uid('edu'), institution: '', degree: '', startDate: '', endDate: '', details: '' }
      ]
    }));
  }, []);

  const updateEducation = useCallback((id: string, partial: Partial<ResumeData['education'][number]>) => {
    setData(d => ({
      ...d,
      education: d.education.map(it => (it.id === id ? { ...it, ...partial } : it))
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setData(d => ({ ...d, education: d.education.filter(it => it.id !== id) }));
  }, []);

  const addAchievement = useCallback(() => {
    setData(d => ({
      ...d,
      achievements: [...d.achievements, { id: uid('ach'), title: '', description: '', date: '' }]
    }));
  }, []);

  const updateAchievement = useCallback((id: string, partial: Partial<ResumeData['achievements'][number]>) => {
    setData(d => ({
      ...d,
      achievements: d.achievements.map(it => (it.id === id ? { ...it, ...partial } : it))
    }));
  }, []);

  const removeAchievement = useCallback((id: string) => {
    setData(d => ({ ...d, achievements: d.achievements.filter(it => it.id !== id) }));
  }, []);

  const moveSection = useCallback((key: SectionKey, direction: 'up' | 'down') => {
    setData(d => {
      const idx = d.sectionOrder.indexOf(key);
      if (idx === -1) return d;
      const newOrder = [...d.sectionOrder];
      const swapWith = direction === 'up' ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= newOrder.length) return d;
      [newOrder[idx], newOrder[swapWith]] = [newOrder[swapWith], newOrder[idx]];
      return { ...d, sectionOrder: newOrder };
    });
  }, []);

  const reset = useCallback(() => {
    setData(defaultResume);
  }, []);

  const importJson = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as ResumeData;
      if (!parsed || !parsed.basics || !parsed.sectionOrder) throw new Error('Invalid');
      setData(parsed);
    } catch {
      // ignore invalid import
    }
  }, []);

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const analyzeJD = useCallback<ResumeContextValue['analyzeJD']>((jdText: string) => {
    const normalized = jdText.toLowerCase();
    const keywordPatterns = [
      /react|typescript|javascript|node|graphql|aws|docker|kubernetes|tailwind|vite|jest|cypress|sql|nosql|redis|python|java|go/g,
      /lead|manage|mentor|optimi[sz]e|scale|design|architect|deliver|improve/g
    ];
    const keywords = Array.from(new Set(keywordPatterns.flatMap(rx => normalized.match(rx) ?? [])));

    const resumeText = [
      data.basics.name,
      data.basics.title,
      data.summary.content,
      data.skills.items.map(s => s.name).join(' '),
      data.experience.map(e => `${e.role} ${e.company} ${e.highlights.join(' ')}`).join(' '),
      data.projects.map(p => `${p.name} ${p.description} ${p.highlights.join(' ')}`).join(' ')
    ]
      .join(' ')
      .toLowerCase();

    const matched = keywords.filter(k => resumeText.includes(k));
    const missing = keywords.filter(k => !resumeText.includes(k));
    const matchPercent = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;

    const suggestions: string[] = [];
    if (missing.length) suggestions.push(`Include missing keywords: ${missing.slice(0, 10).join(', ')}`);
    suggestions.push('Use action verbs (Led, Built, Optimized, Delivered).');
    suggestions.push('Quantify achievements (e.g., increased conversion by 15%).');

    return { keywords, matched, missing, matchPercent, suggestions };
  }, [data]);

  const value = useMemo<ResumeContextValue>(
    () => ({
      data,
      settings,
      setTheme,
      toggleTheme,
      setPrimaryColor,
      setTemplate,
      updateBasics,
      updateSummary,
      setSkills,
      addExperience,
      updateExperience,
      removeExperience,
      addProject,
      updateProject,
      removeProject,
      addEducation,
      updateEducation,
      removeEducation,
      addAchievement,
      updateAchievement,
      removeAchievement,
      moveSection,
      reset,
      importJson,
      exportJson,
      analyzeJD
    }),
    [
      data,
      settings,
      setTheme,
      toggleTheme,
      setPrimaryColor,
      setTemplate,
      updateBasics,
      updateSummary,
      setSkills,
      addExperience,
      updateExperience,
      removeExperience,
      addProject,
      updateProject,
      removeProject,
      addEducation,
      updateEducation,
      removeEducation,
      addAchievement,
      updateAchievement,
      removeAchievement,
      moveSection,
      reset,
      importJson,
      exportJson,
      analyzeJD
    ]
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}