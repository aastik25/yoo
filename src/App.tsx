import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { VulnerabilityLabs } from './components/VulnerabilityLabs';
import { VulnerableStore } from './components/VulnerableStore';
import { SecurityTools } from './components/SecurityTools';
import { LearningPath } from './components/LearningPath';
import { Progress } from './components/Progress';
import { AIAssistant } from './components/AIAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('labs');
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  const handleLabSelect = (labType: string) => {
    setSelectedLab(labType);
  };

  const handleCloseStore = () => {
    setSelectedLab(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'labs' && (
          <>
            <Dashboard />
            <div className="mt-8">
              <VulnerabilityLabs onLabSelect={handleLabSelect} />
            </div>
          </>
        )}

        {activeTab === 'tools' && <SecurityTools />}
        {activeTab === 'learn' && <LearningPath />}
        {activeTab === 'progress' && <Progress />}
        {activeTab === 'assistant' && <AIAssistant />}
      </main>

      {selectedLab && (
        <VulnerableStore
          vulnerabilityType={selectedLab}
          onClose={handleCloseStore}
        />
      )}
    </div>
  );
}

export default App;
