import type { ResumeData } from '../types';

export default function TemplateModern({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="mx-auto flex w-[210mm] min-h-[297mm] bg-white print:p-0">
      <aside className="w-56 bg-gray-50 p-6" style={{ backgroundColor: '#f8fafc' }}>
        <h1 className="text-xl font-bold" style={{ color }}>{data.basics.name}</h1>
        <div className="text-xs text-gray-600">{data.basics.title}</div>
        <div className="mt-4 text-xs text-gray-700">
          <div>{data.basics.email}</div>
          <div>{data.basics.phone}</div>
          <div>{data.basics.location}</div>
        </div>
        {!!data.skills.items.length && (
          <div className="mt-6">
            <div className="text-sm font-semibold" style={{ color }}>Skills</div>
            <ul className="mt-1 list-inside list-disc text-xs">
              {data.skills.items.map((s, i) => <li key={i}>{s.name}</li>)}
            </ul>
          </div>
        )}
      </aside>
      <main className="flex-1 p-8">
        {data.summary.content && (
          <section>
            <h2 className="mb-1 text-base font-semibold" style={{ color }}>Summary</h2>
            <p className="m-0 text-sm leading-relaxed">{data.summary.content}</p>
          </section>
        )}

        {!!data.experience.length && (
          <section className="mt-4">
            <h2 className="mb-1 text-base font-semibold" style={{ color }}>Experience</h2>
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
            <h2 className="mb-1 text-base font-semibold" style={{ color }}>Projects</h2>
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
            <h2 className="mb-1 text-base font-semibold" style={{ color }}>Education</h2>
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
            <h2 className="mb-1 text-base font-semibold" style={{ color }}>Achievements</h2>
            <ul className="list-inside list-disc text-sm">
              {data.achievements.map(a => <li key={a.id}>{a.title} {a.date ? `(${a.date})` : ''}</li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}