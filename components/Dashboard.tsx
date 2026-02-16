
import React from 'react';
import { View, JobDescription, Candidate } from '../types';

interface DashboardProps {
  jobs: JobDescription[];
  candidates: Candidate[];
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ jobs, candidates, onNavigate }) => {
  const pendingCount = candidates.filter(c => c.status === 'pending').length;
  const contactedCount = candidates.filter(c => c.status === 'contacted').length;
  const highMatches = candidates.filter(c => (c.score || 0) >= 80).length;

  const stats = [
    { label: 'Active Jobs', value: jobs.length, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Applicants', value: candidates.length, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'High Match (80%+)', value: highMatches, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Awaiting Action', value: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Recruitment Hub</h1>
        <p className="text-slate-500 mt-1 text-lg">AI-powered insights for your hiring pipeline.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <span className="text-slate-500 text-sm font-medium mb-2">{stat.label}</span>
            <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recently Posted Jobs</h3>
            <button 
              onClick={() => onNavigate(View.JOBS)}
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              Manage All
            </button>
          </div>
          <div className="space-y-4">
            {jobs.length > 0 ? jobs.slice(0, 3).map(job => (
              <div key={job.id} className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="font-semibold text-slate-800">{job.title}</div>
                <div className="text-xs text-slate-400 mt-1">Added {new Date(job.createdAt).toLocaleDateString()}</div>
              </div>
            )) : <p className="text-slate-400 text-sm">No active jobs found.</p>}
          </div>
        </div>

        {/* Top Matches */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Top Scoring Candidates</h3>
            <button 
              onClick={() => onNavigate(View.CANDIDATES)}
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              Review All
            </button>
          </div>
          <div className="space-y-4">
            {candidates.length > 0 ? candidates
              .filter(c => c.score)
              .sort((a, b) => (b.score || 0) - (a.score || 0))
              .slice(0, 3)
              .map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Score</span>
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-sm">{c.score}%</span>
                  </div>
                </div>
              )) : <p className="text-slate-400 text-sm">No candidates processed yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
