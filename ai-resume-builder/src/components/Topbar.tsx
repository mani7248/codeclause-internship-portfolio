import { Palette, FileDown, SunMedium, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useResume } from '../context/ResumeContext'

const COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Gray', value: '#4b5563' },
]

export default function Topbar() {
  const { theme, updateTheme } = useResume()

  const toggleDark = () => updateTheme({ darkMode: !theme.darkMode })

  const exportPdf = () => {
    window.print()
  }

  return (
    <div className="flex items-center gap-2">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
        <div className="hidden sm:flex items-center rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
          {COLORS.map(c => (
            <button key={c.value} onClick={() => updateTheme({ color: c.value })} className="px-3 py-2 text-sm" style={{ color: c.value }}>
              <Palette className="h-4 w-4" />
            </button>
          ))}
          <input aria-label="custom color" type="color" value={theme.color} onChange={e => updateTheme({ color: e.target.value })} className="w-10 h-9 p-1 bg-transparent" />
        </div>

        <select aria-label="template" value={theme.template} onChange={e => updateTheme({ template: e.target.value as any })} className="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <option value="minimal">Minimal</option>
          <option value="modern">Modern</option>
          <option value="compact">Compact</option>
          <option value="creative">Creative</option>
        </select>

        <button onClick={exportPdf} className="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          <span className="hidden sm:inline">Export PDF</span>
        </button>

        <button onClick={toggleDark} aria-label="toggle theme" className="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          {theme.darkMode ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </motion.div>
    </div>
  )
}