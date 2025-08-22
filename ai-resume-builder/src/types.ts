export type ThemeName = 'light' | 'dark';
export type TemplateName = 'minimal' | 'modern' | 'compact';

export type Basics = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

export type Summary = {
  content: string;
};

export type Skill = { name: string; level?: 'beginner' | 'intermediate' | 'advanced' | 'expert' };
export type Skills = {
  items: Skill[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  link?: string;
  description: string;
  highlights: string[];
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details?: string;
};

export type AchievementItem = {
  id: string;
  title: string;
  description?: string;
  date?: string;
};

export type SectionKey =
  | 'basics'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'achievements';

export type ResumeData = {
  basics: Basics;
  summary: Summary;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  sectionOrder: SectionKey[];
};

export type AppSettings = {
  theme: ThemeName;
  primaryColor: string;
  template: TemplateName;
};

export type JDAnalysisResult = {
  keywords: string[];
  matched: string[];
  missing: string[];
  matchPercent: number;
  suggestions: string[];
};