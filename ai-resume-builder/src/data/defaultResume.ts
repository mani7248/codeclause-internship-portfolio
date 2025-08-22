import type { ResumeData } from '../types';

export const defaultResume: ResumeData = {
  basics: {
    name: 'Alex Johnson',
    title: 'Senior Software Engineer',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alex.dev',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson'
  },
  summary: {
    content:
      'Senior Engineer with 8+ years building scalable web apps. Specialized in React, TypeScript, Node.js. Led teams, shipped products, and improved performance.'
  },
  skills: {
    items: [
      { name: 'React', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Node.js', level: 'advanced' },
      { name: 'GraphQL', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'PostgreSQL', level: 'advanced' }
    ]
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Acme Corp',
      role: 'Senior Frontend Engineer',
      location: 'Remote',
      startDate: '2022',
      endDate: 'Present',
      highlights: [
        'Led migration to React 18 + Vite, improving build times by 40%.',
        'Implemented design system in Tailwind, reduced CSS bloat by 60%.',
        'Mentored 4 engineers and coordinated cross-team initiatives.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Globex',
      role: 'Software Engineer',
      startDate: '2019',
      endDate: '2022',
      highlights: [
        'Built analytics dashboard with React + D3 used by 5k+ users.',
        'Optimized rendering, cutting P95 latency from 1.2s to 500ms.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Realtime Chat',
      link: 'https://github.com/alexjohnson/realtime-chat',
      description: 'WebSocket-based chat app with end-to-end encryption.',
      highlights: ['React, TypeScript, Socket.IO', 'Deployed on Fly.io']
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'State University',
      degree: 'B.S. Computer Science',
      startDate: '2014',
      endDate: '2018',
      details: 'Graduated magna cum laude.'
    }
  ],
  achievements: [
    { id: 'ach-1', title: 'AWS Certified Developer', date: '2021' },
    { id: 'ach-2', title: 'Spoke at ReactConf', date: '2023' }
  ],
  sectionOrder: [
    'basics',
    'summary',
    'skills',
    'experience',
    'projects',
    'education',
    'achievements'
  ]
};