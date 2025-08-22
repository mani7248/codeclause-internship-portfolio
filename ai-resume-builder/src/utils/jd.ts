export type JDAnalysis = {
  keywords: string[]
  matched: string[]
  missing: string[]
  matchPercent: number
  suggestions: string[]
}

const STOPWORDS = new Set([
  'the','and','or','with','a','an','to','of','in','on','for','by','from','as','at','is','are','be','you','your','we','our','their','they','he','she','it','this','that','these','those','i'
])

const DEFAULT_HINTS = [
  'Add more action verbs (led, built, managed, designed, delivered)',
  'Quantify achievements with numbers (%, $, time saved, users)',
  'Include job-specific keywords from the description',
  'Tailor your summary to reflect the role focus',
]

export function extractKeywords(jdText: string): string[] {
  const normalized = jdText
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]/g, ' ')
  const parts = normalized.split(/\s+/).filter(Boolean)
  const counts = new Map<string, number>()
  for (const token of parts) {
    if (STOPWORDS.has(token)) continue
    if (token.length <= 2) continue
    counts.set(token, (counts.get(token) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a,b) => b[1]-a[1])
    .slice(0, 50)
    .map(([k]) => k)
}

export function analyzeJDAgainstResume(jdText: string, resumeSkills: string[], resumeText: string): JDAnalysis {
  const keywords = extractKeywords(jdText)
  const resumeNormalized = (resumeSkills.join(' ') + ' ' + resumeText)
    .toLowerCase()
  const matched: string[] = []
  const missing: string[] = []
  for (const kw of keywords) {
    if (resumeNormalized.includes(kw.toLowerCase())) matched.push(kw)
    else missing.push(kw)
  }
  const matchPercent = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0

  const suggestions = new Set<string>(DEFAULT_HINTS)
  if (missing.some(k => ['react', 'typescript', 'node', 'aws', 'python'].includes(k))) {
    suggestions.add('Mention relevant technologies explicitly and demonstrate usage')
  }
  if (!/\d+%|\d+\+|\$\d+/.test(resumeText)) {
    suggestions.add('Quantify accomplishments using percentages, counts, or revenue impact')
  }
  if (!/led|built|owned|designed|delivered|improved|optimized/i.test(resumeText)) {
    suggestions.add('Use strong action verbs to describe your impact')
  }

  return { keywords, matched, missing, matchPercent, suggestions: [...suggestions] }
}