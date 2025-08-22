import { forwardRef } from 'react';
import { useResume } from '../context/ResumeContext';
import TemplateMinimal from '../templates/TemplateMinimal';
import TemplateModern from '../templates/TemplateModern';
import TemplateCompact from '../templates/TemplateCompact';

const ResumePreview = forwardRef<HTMLDivElement>(function ResumePreview(_props, ref) {
  const { data, settings } = useResume();
  const color = settings.primaryColor;

  return (
    <div ref={ref} className="page mx-auto w-full max-w-[210mm] bg-gray-100 p-4 print:bg-white print:p-0">
      {settings.template === 'minimal' && <TemplateMinimal data={data} color={color} />}
      {settings.template === 'modern' && <TemplateModern data={data} color={color} />}
      {settings.template === 'compact' && <TemplateCompact data={data} color={color} />}
    </div>
  );
});

export default ResumePreview;