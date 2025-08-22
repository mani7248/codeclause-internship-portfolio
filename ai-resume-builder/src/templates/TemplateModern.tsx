import type { ResumeData } from '../context/ResumeContext'

export default function TemplateModern({ data, color }: { data: ResumeData, color: string }) {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mt-6">
      <div className="text-sm font-semibold tracking-widest" style={{ color }}>{title.toUpperCase()}</div>
      <div className="mt-2 space-y-2 text-sm text-gray-800">{children}</div>
    </div>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{data.basics.name}</div>
          <div className="text-sm text-gray-500">{data.basics.title}</div>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div>{data.basics.email}</div>
          <div>{data.basics.phone}</div>
          <div>{data.basics.location}</div>
          {data.basics.website && <div>{data.basics.website}</div>}
        </div>
      </div>

      <div className="mt-3 text-sm">{data.summary}</div>

      {data.order.map(section => {
        if (section === 'skills') return (
          <Section key={section} title="Skills">
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s} className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${color}1a`, color }}>{s}</span>
              ))}
            </div>
          </Section>
        )
        const list = (data as any)[section] as any[]
        if (!Array.isArray(list)) return null
        return (
          <Section key={section} title={section}>
            {list.map(item => (
              <div key={item.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.meta}</div>
                </div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
                {item.description && <div className="text-sm mt-1">{item.description}</div>}
              </div>
            ))}
          </Section>
        )
      })}
    </div>
  )
}