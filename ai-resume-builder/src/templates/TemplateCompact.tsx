import type { ResumeData } from '../context/ResumeContext'

export default function TemplateCompact({ data, color }: { data: ResumeData, color: string }) {
  return (
    <div className="p-8 text-sm">
      <div className="text-center">
        <div className="text-xl font-bold">{data.basics.name}</div>
        <div className="text-gray-500">{data.basics.title}</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-3">
          <div>
            <div className="font-semibold" style={{ color }}>Contact</div>
            <div className="text-xs text-gray-500">
              <div>{data.basics.email}</div>
              <div>{data.basics.phone}</div>
              <div>{data.basics.location}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold" style={{ color }}>Skills</div>
            <ul className="list-disc list-inside text-xs text-gray-700">
              {data.skills.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold" style={{ color }}>Experience</div>
          <div className="space-y-2 mt-1">
            {data.experience.map(e => (
              <div key={e.id}>
                <div className="flex justify-between">
                  <div className="font-medium">{e.title} • {e.subtitle}</div>
                  <div className="text-xs text-gray-500">{e.meta}</div>
                </div>
                {e.description && <div>{e.description}</div>}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <div className="font-semibold" style={{ color }}>Projects</div>
              <div className="space-y-1 mt-1">
                {data.projects.map(p => (
                  <div key={p.id}>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold" style={{ color }}>Education</div>
              <div className="space-y-1 mt-1">
                {data.education.map(ed => (
                  <div key={ed.id}>
                    <div className="font-medium">{ed.title}</div>
                    <div className="text-xs text-gray-500">{ed.subtitle} • {ed.meta}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}