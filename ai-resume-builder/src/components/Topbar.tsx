import { useResume } from '../context/ResumeContext';
import { Download, Moon, Sun, RotateCcw, Upload, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function Topbar({ printTarget }: { printTarget: React.RefObject<HTMLDivElement | null> }) {
  const {
    settings,
    toggleTheme,
    setTemplate,
    setPrimaryColor,
    exportJson,
    importJson,
    reset
  } = useResume();

  const onExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async () => {
    const text = window.prompt('Paste resume JSON');
    if (text) importJson(text);
  };

  const handlePrint = useReactToPrint({ contentRef: printTarget });

  return (
    <div className="no-print sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div className="mr-4 text-lg font-semibold">AI Resume Builder</div>

        <label className="text-sm">Template</label>
        <select
          value={settings.template}
          onChange={e => setTemplate(e.target.value as any)}
          className="rounded-md border px-2 py-1 text-sm dark:bg-gray-900"
        >
          <option value="minimal">Minimal</option>
          <option value="modern">Modern</option>
          <option value="compact">Compact</option>
        </select>

        <label className="ml-3 text-sm">Theme</label>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {settings.theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4" /> Light
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" /> Dark
            </>
          )}
        </button>

        <label className="ml-3 text-sm">Color</label>
        <input
          type="color"
          value={settings.primaryColor}
          onChange={e => setPrimaryColor(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded-md border p-0"
          aria-label="Primary color"
        />

        <div className="ml-auto flex items-center gap-2">
          <button onClick={handlePrint} className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
          <button onClick={onExport} className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            <Download className="h-4 w-4" /> Export JSON
          </button>
          <button onClick={onImport} className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            <Upload className="h-4 w-4" /> Import JSON
          </button>
          <button onClick={reset} className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}