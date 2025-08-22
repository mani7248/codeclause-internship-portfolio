import { useRef } from 'react';
import Topbar from './components/Topbar';
import EditorForm from './components/EditorForm';
import JDAnalyzer from './components/JDAnalyzer';
import ResumePreview from './components/ResumePreview';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <ResumeProvider>
      <div className="flex min-h-screen flex-col">
        <Topbar printTarget={printRef} />
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div className="space-y-4">
            <EditorForm />
            <JDAnalyzer />
          </div>
          <div className="rounded-lg border bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <ResumePreview ref={printRef} />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}

export default App;
