
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: View.JOBS, label: 'Job Roles', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V6a2 2 0 012-2h14a2 2 0 012 2v7.255zM12 8a1 1 0 100-2 1 1 0 000 2z' },
    { id: View.CANDIDATES, label: 'Candidates', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="hidden md:block font-bold text-xl text-slate-800 tracking-tight">HirePulse</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
              currentView === item.id 
              ? 'bg-indigo-50 text-indigo-600 font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="hidden md:flex items-center gap-3 p-2">
          <img src="https://picsum.photos/40/40?seed=hr" className="w-10 h-10 rounded-full border border-slate-200" alt="Avatar" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">Admin User</span>
            <span className="text-xs text-slate-500">Recruitment Lead</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
