
import React, { useState, useEffect } from 'react';
import { View, JobDescription, Candidate } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import JobsManager from './components/JobsManager';
import CandidateManager from './components/CandidateManager';
import AnalysisView from './components/AnalysisView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [jobs, setJobs] = useState<JobDescription[]>([
    {
      id: '1',
      title: 'Senior Software Engineer (React)',
      company: 'HirePulse AI',
      content: 'We are looking for a Senior React Engineer with 5+ years experience. Must know TypeScript, Tailwind, and Node.js. Experience with Generative AI APIs is a plus.',
      createdAt: Date.now()
    }
  ]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('1');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const addJob = (job: JobDescription) => {
    setJobs(prev => [job, ...prev]);
  };

  const addCandidate = (candidate: Candidate) => {
    setCandidates(prev => [candidate, ...prev]);
  };

  const updateCandidate = (updated: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const navigateToAnalysis = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView(View.ANALYSIS);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {currentView === View.DASHBOARD && (
            <Dashboard 
              jobs={jobs} 
              candidates={candidates} 
              onNavigate={setCurrentView}
            />
          )}
          
          {currentView === View.JOBS && (
            <JobsManager 
              jobs={jobs} 
              onAddJob={addJob} 
            />
          )}
          
          {currentView === View.CANDIDATES && (
            <CandidateManager 
              candidates={candidates} 
              jobs={jobs}
              selectedJobId={selectedJobId}
              setSelectedJobId={setSelectedJobId}
              onAddCandidate={addCandidate}
              onUpdateCandidate={updateCandidate}
              onViewAnalysis={navigateToAnalysis}
            />
          )}

          {currentView === View.ANALYSIS && selectedCandidate && (
            <AnalysisView 
              candidate={selectedCandidate} 
              onBack={() => setCurrentView(View.CANDIDATES)}
              onUpdateCandidate={updateCandidate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
