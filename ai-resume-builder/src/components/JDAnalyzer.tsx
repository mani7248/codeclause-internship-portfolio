import { useMemo, useState } from 'react'
import { analyzeJDAgainstResume } from '../utils/jd'
import { useResume } from '../context/ResumeContext'
import { Sparkles } from 'lucide-react'

export default function JDAnalyzer() {
  const { data } = useResume()
  const [jd, setJd] = useState('')

  const resumeText = useMemo(() => {
    const entries = [...data.experience, ...data.projects, ...data.education, ...data.achievements]
    return [
      data.basics.name,
      data.basics.title,
      data.summary,
      data.skills.join(' '),
      ...entries.map(e => `${e.title} ${e.subtitle ?? ''} ${e.description ?? ''}`)
    ].join(' ')
  }, [data])

  const analysis = useMemo(() => analyzeJDAgainstResume(jd, data.skills, resumeText), [jd, data.skills, resumeText])

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-yellow-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">ATS + Job Description Analyzer</h3>
      </div>
      <textarea value={jd} onChange={e => setJd(e.target.value)} rows={6} placeholder="Paste job description here" className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm" />

      {jd && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">Match</div>
            <div className="font-semibold text-gray-900 dark:text-white">{analysis.matchPercent}%</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">Matched Keywords</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {analysis.matched.length ? analysis.matched.map(k => (
                  <span key={k} className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e5edff', color: '#1e3a8a' }}>{k}</span>
                )) : <div className="text-sm text-gray-500">None yet</div>}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">Missing Keywords</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {analysis.missing.length ? analysis.missing.map(k => (
                  <span key={k} className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">{k}</span>
                )) : <div className="text-sm text-gray-500">Great! Minimal gaps</div>}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">Suggestions</div>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {analysis.suggestions.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}