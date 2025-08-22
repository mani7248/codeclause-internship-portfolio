import type { ResumeData } from '../types';

export default function TemplateCompact({ data, color }: { data: ResumeData; color: string }) {
  return (
    <div className="mx-auto w-[210mm] min-h-[297mm] bg-white p-8 text-[12px] leading-snug">
      <div className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: color }}>
        <div className="text-2xl font-bold">{data.basics.name}</div>
        <div className="text-xs text-gray-600">{data.basics.email} • {data.basics.phone}</div>
      </div>

      {data.summary.content && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Summary</h2>
          <p className="m-0">{data.summary.content}</p>
        </section>
      )}

      {!!data.skills.items.length && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Skills</h2>
          <p className="m-0">{data.skills.items.map(s => s.name).join(' • ')}</p>
        </section>
      )}

      {!!data.experience.length && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Experience</h2>
          <ul className="m-0 list-inside list-disc">
            {data.experience.flatMap(exp => exp.highlights.map((h, i) => (
              <li key={`${exp.id}-${i}`}>{exp.role} @ {exp.company}: {h}</li>
            )))}
          </ul>
        </section>
      )}

      {!!data.projects.length && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Projects</h2>
          <ul className="m-0 list-inside list-disc">
            {data.projects.map(p => <li key={p.id}>{p.name}: {p.description}</li>)}
          </ul>
        </section>
      )}

      {!!data.education.length && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Education</h2>
          <ul className="m-0 list-inside list-disc">
            {data.education.map(e => <li key={e.id}>{e.degree}, {e.institution} ({e.startDate}—{e.endDate})</li>)}
          </ul>
        </section>
      )}

      {!!data.achievements.length && (
        <section className="mt-2">
          <h2 className="mb-1 text-sm font-semibold" style={{ color }}>Achievements</h2>
          <ul className="m-0 list-inside list-disc">
            {data.achievements.map(a => <li key={a.id}>{a.title} {a.date ? `(${a.date})` : ''}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}