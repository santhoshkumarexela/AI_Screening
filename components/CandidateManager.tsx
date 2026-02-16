
import React, { useState } from 'react';
import { Candidate, JobDescription } from '../types';
import { screenCandidate } from '../geminiService';

interface CandidateManagerProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  onAddCandidate: (c: Candidate) => void;
  onUpdateCandidate: (c: Candidate) => void;
  onViewAnalysis: (c: Candidate) => void;
}

const CandidateManager: React.FC<CandidateManagerProps> = ({ 
  candidates, 
  jobs, 
  selectedJobId, 
  setSelectedJobId, 
  onAddCandidate, 
  onUpdateCandidate,
  onViewAnalysis
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const activeJob = jobs.find(j => j.id === selectedJobId);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleScoreCandidate = async (candidate: Candidate) => {
    if (!activeJob) return;
    setIsProcessing(true);
    try {
      const analysis = await screenCandidate(activeJob.content, candidate.resumeContent);
      onUpdateCandidate({
        ...candidate,
        score: analysis.matchPercentage,
        matchAnalysis: analysis,
        status: 'scored'
      });
      showToast(`${candidate.name} screened successfully!`);
    } catch (err) {
      showToast("AI Screening failed. Check API key.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !resume) return;

    onAddCandidate({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      resumeContent: resume,
      status: 'pending'
    });

    setName('');
    setEmail('');
    setResume('');
    showToast("Candidate added to pipeline.");
  };

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl text-white font-bold animate-in fade-in slide-in-from-top-2 ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pipeline Manager</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-500 text-sm">Screening for:</span>
            <select 
              value={selectedJobId} 
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-transparent border-b border-indigo-200 text-indigo-700 font-semibold focus:outline-none cursor-pointer"
            >
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Applicant
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Resume Text</label>
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  rows={8}
                  placeholder="Paste candidate's resume or cover letter here..."
                  className="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-lg"
              >
                Add to Pipeline
              </button>
            </div>
          </form>
        </div>

        {/* Candidate Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">AI Score</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map(candidate => (
                    <tr key={candidate.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{candidate.name}</div>
                        <div className="text-xs text-slate-500">{candidate.email || 'No email provided'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          candidate.status === 'scored' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : candidate.status === 'contacted'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-500'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {candidate.score !== undefined ? (
                          <div className={`text-lg font-black ${
                            candidate.score >= 80 ? 'text-emerald-600' : candidate.score >= 50 ? 'text-amber-600' : 'text-slate-400'
                          }`}>
                            {candidate.score}%
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {candidate.status === 'pending' ? (
                          <button
                            onClick={() => handleScoreCandidate(candidate)}
                            disabled={isProcessing}
                            className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
                          >
                            {isProcessing ? 'Analyzing...' : 'Run AI Screen'}
                          </button>
                        ) : (
                          <button
                            onClick={() => onViewAnalysis(candidate)}
                            className="text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all"
                          >
                            View Report
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>No applicants in the queue</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateManager;
