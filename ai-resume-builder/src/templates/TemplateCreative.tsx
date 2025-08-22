import type { ResumeData } from '../context/ResumeContext'

export default function TemplateCreative({ data, color }: { data: ResumeData, color: string }) {
  const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2 py-1 rounded-full text-xs" style={{ background: `${color}1a`, color }}>{children}</span>
  )

  return (
    <div className="p-8">
      <div className="border-l-4 pl-4" style={{ borderColor: color }}>
        <div className="text-3xl font-extrabold">{data.basics.name}</div>
        <div className="text-sm text-gray-500">{data.basics.title}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.skills.map(s => <Badge key={s}>{s}</Badge>)}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold" style={{ color }}>Experience</div>
          <div className="mt-2 space-y-2">
            {data.experience.map(e => (
              <div key={e.id} className="rounded-md p-3 border" style={{ borderColor: `${color}33` }}>
                <div className="flex justify-between">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-gray-500">{e.meta}</div>
                </div>
                <div className="text-xs text-gray-500">{e.subtitle}</div>
                {e.description && <div className="mt-1 text-sm">{e.description}</div>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold" style={{ color }}>Projects</div>
          <div className="mt-2 space-y-2">
            {data.projects.map(p => (
              <div key={p.id} className="rounded-md p-3 border" style={{ borderColor: `${color}33` }}>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{p.subtitle} • {p.meta}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="font-semibold" style={{ color }}>Education</div>
            <div className="mt-2 space-y-1">
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

      <div className="mt-4">
        <div className="font-semibold" style={{ color }}>Achievements</div>
        <ul className="list-disc list-inside text-sm mt-1">
          {data.achievements.map(a => <li key={a.id}>{a.title} — {a.description}</li>)}
        </ul>
      </div>
    </div>
  )
}