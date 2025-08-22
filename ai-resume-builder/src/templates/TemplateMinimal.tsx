import type { ResumeData } from '../types';

export default function TemplateMinimal({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="prose prose-sm mx-auto w-[210mm] min-h-[297mm] bg-white p-8 text-gray-900 print:p-8">
      <div className="border-b pb-4" style={{ borderColor: color }}>
        <h1 className="m-0 text-3xl font-bold">{data.basics.name}</h1>
        <div className="text-sm text-gray-600">{data.basics.title}</div>
        <div className="text-xs text-gray-600">{data.basics.email} • {data.basics.phone} • {data.basics.location}</div>
      </div>

      {data.summary.content && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Summary</h2>
          <p className="m-0 text-sm leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {!!data.skills.items.length && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Skills</h2>
          <p className="m-0 text-sm">{data.skills.items.map(s => s.name).join(' • ')}</p>
        </section>
      )}

      {!!data.experience.length && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex items-baseline justify-between">
                <div className="font-medium">{exp.role} — {exp.company}</div>
                <div className="text-xs text-gray-600">{exp.startDate} — {exp.endDate}</div>
              </div>
              {!!exp.highlights.length && (
                <ul className="mt-1 list-inside list-disc text-sm">
                  {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {!!data.projects.length && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Projects</h2>
          {data.projects.map(p => (
            <div key={p.id} className="mb-2">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm">{p.description}</div>
            </div>
          ))}
        </section>
      )}

      {!!data.education.length && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Education</h2>
          {data.education.map(e => (
            <div key={e.id} className="mb-1 text-sm">
              <div className="font-medium">{e.degree}, {e.institution}</div>
              <div className="text-xs text-gray-600">{e.startDate} — {e.endDate}</div>
            </div>
          ))}
        </section>
      )}

      {!!data.achievements.length && (
        <section className="mt-4">
          <h2 className="mb-1 border-b pb-1 text-base font-semibold" style={{ borderColor: color }}>Achievements</h2>
          <ul className="list-inside list-disc text-sm">
            {data.achievements.map(a => <li key={a.id}>{a.title} {a.date ? `(${a.date})` : ''}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}