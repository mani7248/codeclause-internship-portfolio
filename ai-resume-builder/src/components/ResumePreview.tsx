import { useResume } from '../context/ResumeContext'
import TemplateMinimal from '../templates/TemplateMinimal'
import TemplateModern from '../templates/TemplateModern'
import TemplateCompact from '../templates/TemplateCompact'
import TemplateCreative from '../templates/TemplateCreative'

export default function ResumePreview() {
  const { data, theme } = useResume()
  const color = theme.color

  const renderTemplate = () => {
    const common = { data, color }
    switch (theme.template) {
      case 'minimal': return <TemplateMinimal {...common} />
      case 'compact': return <TemplateCompact {...common} />
      case 'creative': return <TemplateCreative {...common} />
      default: return <TemplateModern {...common} />
    }
  }

  return (
    <div className="a4 bg-white text-gray-900" style={{ ['--accent' as any]: color }}>
      {renderTemplate()}
    </div>
  )
}