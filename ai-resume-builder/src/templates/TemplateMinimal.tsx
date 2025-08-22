import type { ResumeData } from '../context/ResumeContext'

export default function TemplateMinimal({ data, color }: { data: ResumeData, color: string }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4" style={{ borderColor: color }}>
        <div className="text-2xl font-bold">{data.basics.name}</div>
        <div className="text-sm text-gray-500">{data.basics.title}</div>
        <div className="text-xs text-gray-500 mt-1">{data.basics.email} • {data.basics.phone} • {data.basics.location}</div>
      </div>
      <div className="mt-4 text-sm">{data.summary}</div>
      <div className="mt-4 text-sm">
        <div className="font-semibold" style={{ color }}>Skills</div>
        <div className="mt-1 flex flex-wrap gap-2">
          {data.skills.map(s => <span key={s} className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{s}</span>)}
        </div>
      </div>
      {(['experience','projects','education','achievements'] as const).map(section => (
        <div key={section} className="mt-4 text-sm">
          <div className="font-semibold" style={{ color }}>{section[0].toUpperCase()+section.slice(1)}</div>
          <div className="mt-1 space-y-1">
            {(data as any)[section].map((e: any) => (
              <div key={e.id}>
                <div className="flex justify-between">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-gray-500">{e.meta}</div>
                </div>
                <div className="text-xs text-gray-500">{e.subtitle}</div>
                {e.description && <div className="mt-1">{e.description}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}