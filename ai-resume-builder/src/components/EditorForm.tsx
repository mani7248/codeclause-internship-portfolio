import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { useResume } from '../context/ResumeContext'
import { useState } from 'react'

export default function EditorForm() {
  const { data, setData, reset, loadJson } = useResume()
  const [importText, setImportText] = useState('')

  const updateField = (path: string, value: any) => {
    setData(prev => {
      const next = { ...prev } as any
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  const addSkill = () => updateField('skills', [...data.skills, ''])
  const removeSkill = (idx: number) => updateField('skills', data.skills.filter((_, i) => i !== idx))

  const addEntry = (section: 'experience' | 'projects' | 'education' | 'achievements') => {
    const newEntry = { id: crypto.randomUUID(), title: '', subtitle: '', meta: '', description: '' }
    updateField(section, [...(data as any)[section], newEntry])
  }
  const removeEntry = (section: 'experience' | 'projects' | 'education' | 'achievements', id: string) => {
    updateField(section, (data as any)[section].filter((e: any) => e.id !== id))
  }

  const moveSection = (section: string, dir: -1 | 1) => {
    const idx = data.order.indexOf(section as any)
    const nextIdx = idx + dir
    if (nextIdx < 0 || nextIdx >= data.order.length) return
    const newOrder = [...data.order]
    const [s] = newOrder.splice(idx, 1)
    newOrder.splice(nextIdx, 0, s)
    updateField('order', newOrder)
  }

  const handleImport = () => loadJson(importText)

  const sectionHeader = (name: string) => (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
      <div className="flex items-center gap-1">
        <button onClick={() => moveSection(name.toLowerCase() as any, -1)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><ArrowUp className="h-4 w-4" /></button>
        <button onClick={() => moveSection(name.toLowerCase() as any, 1)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><ArrowDown className="h-4 w-4" /></button>
      </div>
    </div>
  )

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={reset} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800">Reset Demo</button>
        <details>
          <summary className="cursor-pointer px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800">Import JSON</summary>
          <div className="mt-2 space-y-2">
            <textarea value={importText} onChange={e => setImportText(e.target.value)} rows={4} className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm" placeholder='Paste JSON exported data' />
            <button onClick={handleImport} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800">Load</button>
          </div>
        </details>
      </div>

      <section className="space-y-3">
        {sectionHeader('Basics')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={data.basics.name} onChange={e => updateField('basics.name', e.target.value)} placeholder="Name" className="input" />
          <input value={data.basics.title} onChange={e => updateField('basics.title', e.target.value)} placeholder="Title" className="input" />
          <input value={data.basics.email} onChange={e => updateField('basics.email', e.target.value)} placeholder="Email" className="input" />
          <input value={data.basics.phone} onChange={e => updateField('basics.phone', e.target.value)} placeholder="Phone" className="input" />
          <input value={data.basics.location} onChange={e => updateField('basics.location', e.target.value)} placeholder="Location" className="input" />
          <input value={data.basics.website ?? ''} onChange={e => updateField('basics.website', e.target.value)} placeholder="Website" className="input" />
        </div>
      </section>

      <section className="space-y-3">
        {sectionHeader('Summary')}
        <textarea value={data.summary} onChange={e => updateField('summary', e.target.value)} rows={4} className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm" placeholder="Professional summary" />
      </section>

      <section className="space-y-3">
        {sectionHeader('Skills')}
        <div className="space-y-2">
          {data.skills.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={s} onChange={e => updateField('skills', data.skills.map((v, idx) => idx === i ? e.target.value : v))} placeholder="Skill" className="input flex-1" />
              <button onClick={() => removeSkill(i)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={addSkill} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 flex items-center gap-2"><Plus className="h-4 w-4" /> Add Skill</button>
        </div>
      </section>

      {(['experience','projects','education','achievements'] as const).map(section => (
        <section key={section} className="space-y-3">
          {sectionHeader(section.charAt(0).toUpperCase() + section.slice(1))}
          <div className="space-y-3">
            {(data as any)[section].map((e: any) => (
              <div key={e.id} className="p-3 rounded-md border border-gray-200 dark:border-gray-800 space-y-2">
                <input value={e.title} onChange={ev => updateField(`${section}`, (data as any)[section].map((x: any) => x.id === e.id ? { ...e, title: ev.target.value } : x))} placeholder="Title" className="input" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input value={e.subtitle} onChange={ev => updateField(`${section}`, (data as any)[section].map((x: any) => x.id === e.id ? { ...e, subtitle: ev.target.value } : x))} placeholder="Subtitle" className="input" />
                  <input value={e.meta} onChange={ev => updateField(`${section}`, (data as any)[section].map((x: any) => x.id === e.id ? { ...e, meta: ev.target.value } : x))} placeholder="Duration / Meta" className="input" />
                </div>
                <textarea value={e.description} onChange={ev => updateField(`${section}`, (data as any)[section].map((x: any) => x.id === e.id ? { ...e, description: ev.target.value } : x))} rows={3} className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm" placeholder="Description" />
                <div className="flex justify-end">
                  <button onClick={() => removeEntry(section, e.id)} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 text-red-600 flex items-center gap-2"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            ))}
            <button onClick={() => addEntry(section)} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 flex items-center gap-2"><Plus className="h-4 w-4" /> Add {section}</button>
          </div>
        </section>
      ))}

      <style>{`
        .input { @apply w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm; }
      `}</style>
    </div>
  )
}