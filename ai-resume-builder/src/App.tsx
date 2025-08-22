import { useEffect } from 'react'
import './index.css'
import Topbar from './components/Topbar'
import EditorForm from './components/EditorForm'
import JDAnalyzer from './components/JDAnalyzer'
import ResumePreview from './components/ResumePreview'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-gray-50', 'dark:bg-gray-900');
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Topbar */}
      <div className="no-print sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500" />
            <span className="font-semibold text-gray-900 dark:text-white">AI Resume Builder</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Topbar />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="mx-auto max-w-screen-2xl h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Left: Editor */}
          <div className="h-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <EditorForm />
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <JDAnalyzer />
          </div>

          {/* Right: Preview */}
          <div className="h-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-start justify-center p-4">
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Bottom controls for print on mobile */}
      <div className="no-print lg:hidden fixed bottom-4 right-4">
        <button onClick={() => window.print()} className="px-4 py-2 rounded-md bg-blue-600 text-white shadow">Export PDF</button>
      </div>
    </div>
  )
}

export default App
