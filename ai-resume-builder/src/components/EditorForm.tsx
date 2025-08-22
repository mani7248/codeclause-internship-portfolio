import { useResume } from '../context/ResumeContext';
import type { SectionKey } from '../types';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

export default function EditorForm() {
  const {
    data,
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
    moveSection
  } = useResume();

  const move = (key: SectionKey, dir: 'up' | 'down') => () => moveSection(key, dir);

  return (
    <div className="space-y-6 p-4">
      {data.sectionOrder.map(section => (
        <div key={section} className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold capitalize">{section}</h3>
            <div className="flex gap-2">
              <button onClick={move(section, 'up')} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button onClick={move(section, 'down')} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {section === 'basics' && (
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Name" value={data.basics.name} onChange={e => updateBasics({ name: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Title" value={data.basics.title} onChange={e => updateBasics({ title: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Email" value={data.basics.email} onChange={e => updateBasics({ email: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Phone" value={data.basics.phone} onChange={e => updateBasics({ phone: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Location" value={data.basics.location} onChange={e => updateBasics({ location: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Website" value={data.basics.website ?? ''} onChange={e => updateBasics({ website: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="LinkedIn" value={data.basics.linkedin ?? ''} onChange={e => updateBasics({ linkedin: e.target.value })} />
              <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="GitHub" value={data.basics.github ?? ''} onChange={e => updateBasics({ github: e.target.value })} />
            </div>
          )}

          {section === 'summary' && (
            <textarea className="h-28 w-full rounded-md border p-2 dark:bg-gray-950" placeholder="Professional summary" value={data.summary.content} onChange={e => updateSummary(e.target.value)} />
          )}

          {section === 'skills' && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">Comma-separated skills</label>
              <input className="w-full rounded-md border p-2 dark:bg-gray-950" value={data.skills.items.map(s => s.name).join(', ')} onChange={e => setSkills(e.target.value.split(',').map(v => ({ name: v.trim() })).filter(v => v.name))} />
            </div>
          )}

          {section === 'experience' && (
            <div className="space-y-3">
              {data.experience.map(exp => (
                <div key={exp.id} className="rounded-md border p-3 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, { company: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Role" value={exp.role} onChange={e => updateExperience(exp.id, { role: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Location" value={exp.location ?? ''} onChange={e => updateExperience(exp.id, { location: e.target.value })} />
                    <div className="grid grid-cols-2 gap-2">
                      <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Start" value={exp.startDate} onChange={e => updateExperience(exp.id, { startDate: e.target.value })} />
                      <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="End" value={exp.endDate} onChange={e => updateExperience(exp.id, { endDate: e.target.value })} />
                    </div>
                  </div>
                  <textarea className="mt-2 h-20 w-full rounded-md border p-2 text-sm dark:bg-gray-950" placeholder="Highlights (one per line)" value={exp.highlights.join('\n')} onChange={e => updateExperience(exp.id, { highlights: e.target.value.split('\n').filter(Boolean) })} />
                  <div className="mt-2 text-right">
                    <button onClick={() => removeExperience(exp.id)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addExperience} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <Plus className="h-4 w-4" /> Add Experience
              </button>
            </div>
          )}

          {section === 'projects' && (
            <div className="space-y-3">
              {data.projects.map(p => (
                <div key={p.id} className="rounded-md border p-3 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Name" value={p.name} onChange={e => updateProject(p.id, { name: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Link" value={p.link ?? ''} onChange={e => updateProject(p.id, { link: e.target.value })} />
                  </div>
                  <textarea className="mt-2 h-16 w-full rounded-md border p-2 text-sm dark:bg-gray-950" placeholder="Description" value={p.description} onChange={e => updateProject(p.id, { description: e.target.value })} />
                  <textarea className="mt-2 h-20 w-full rounded-md border p-2 text-sm dark:bg-gray-950" placeholder="Highlights (one per line)" value={p.highlights.join('\n')} onChange={e => updateProject(p.id, { highlights: e.target.value.split('\n').filter(Boolean) })} />
                  <div className="mt-2 text-right">
                    <button onClick={() => removeProject(p.id)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addProject} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </div>
          )}

          {section === 'education' && (
            <div className="space-y-3">
              {data.education.map(ed => (
                <div key={ed.id} className="rounded-md border p-3 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Institution" value={ed.institution} onChange={e => updateEducation(ed.id, { institution: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Degree" value={ed.degree} onChange={e => updateEducation(ed.id, { degree: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Start" value={ed.startDate} onChange={e => updateEducation(ed.id, { startDate: e.target.value })} />
                    <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="End" value={ed.endDate} onChange={e => updateEducation(ed.id, { endDate: e.target.value })} />
                  </div>
                  <textarea className="mt-2 h-16 w-full rounded-md border p-2 text-sm dark:bg-gray-950" placeholder="Details" value={ed.details ?? ''} onChange={e => updateEducation(ed.id, { details: e.target.value })} />
                  <div className="mt-2 text-right">
                    <button onClick={() => removeEducation(ed.id)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addEducation} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <Plus className="h-4 w-4" /> Add Education
              </button>
            </div>
          )}

          {section === 'achievements' && (
            <div className="space-y-3">
              {data.achievements.map(a => (
                <div key={a.id} className="grid grid-cols-2 gap-2 rounded-md border p-3 dark:border-gray-700">
                  <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Title" value={a.title} onChange={e => updateAchievement(a.id, { title: e.target.value })} />
                  <input className="rounded-md border p-2 dark:bg-gray-950" placeholder="Date" value={a.date ?? ''} onChange={e => updateAchievement(a.id, { date: e.target.value })} />
                  <textarea className="col-span-2 h-16 w-full rounded-md border p-2 text-sm dark:bg-gray-950" placeholder="Description" value={a.description ?? ''} onChange={e => updateAchievement(a.id, { description: e.target.value })} />
                  <div className="col-span-2 text-right">
                    <button onClick={() => removeAchievement(a.id)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addAchievement} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <Plus className="h-4 w-4" /> Add Achievement
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}