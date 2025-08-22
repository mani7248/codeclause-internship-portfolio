import { useMemo, useState } from 'react';
import { useResume } from '../context/ResumeContext';

export default function JDAnalyzer() {
  const { analyzeJD } = useResume();
  const [text, setText] = useState('Paste job description here...');
  const result = useMemo(() => (text.trim() ? analyzeJD(text) : null), [text, analyzeJD]);

  return (
    <div className="no-print rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-2 text-lg font-semibold">Job Description Analyzer</h3>
      <textarea
        className="h-32 w-full rounded-md border p-2 text-sm dark:bg-gray-950"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {result && (
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="rounded-md border p-2 dark:border-gray-700">
            <div className="text-sm font-medium">Match</div>
            <div className="text-2xl font-bold text-green-600">{result.matchPercent}%</div>
          </div>
          <div className="rounded-md border p-2 dark:border-gray-700">
            <div className="text-sm font-medium">Matched</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{result.matched.join(', ') || 'None'}</div>
          </div>
          <div className="rounded-md border p-2 dark:border-gray-700">
            <div className="text-sm font-medium">Missing</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{result.missing.join(', ') || 'None'}</div>
          </div>
          <div className="md:col-span-3 rounded-md border p-2 dark:border-gray-700">
            <div className="text-sm font-medium">Suggestions</div>
            <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}