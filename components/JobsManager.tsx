
import React, { useState } from 'react';
import { JobDescription } from '../types';

interface JobsManagerProps {
  jobs: JobDescription[];
  onAddJob: (job: JobDescription) => void;
}

const JobsManager: React.FC<JobsManagerProps> = ({ jobs, onAddJob }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddJob({
      id: Math.random().toString(36).substr(2, 9),
      title,
      company,
      content,
      createdAt: Date.now()
    });

    setTitle('');
    setCompany('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Job Descriptions</h2>
          <p className="text-slate-500">Define your hiring needs for AI screening.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          {showForm ? 'Cancel' : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Job
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Product Designer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Company/Department</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Engineering Team"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description (Full Text)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Paste the full job description here. Include requirements, responsibilities, and preferred skills..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors">
            Create Job Role
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                <span className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-slate-100">
                  ID: {job.id}
                </span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                {job.content}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsManager;
