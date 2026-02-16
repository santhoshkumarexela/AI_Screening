
import React, { useState } from 'react';
import { Candidate } from '../types';

interface AnalysisViewProps {
  candidate: Candidate;
  onBack: () => void;
  onUpdateCandidate: (c: Candidate) => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ candidate, onBack, onUpdateCandidate }) => {
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!candidate.matchAnalysis) return null;

  const { matchPercentage, keyStrengths, gapAnalysis, recommendation, suggestedQuestions } = candidate.matchAnalysis;

  const handleSendEmail = () => {
    setEmailSending(true);
    // Simulate API call to send recruitment mail
    setTimeout(() => {
      setEmailSending(false);
      setEmailSent(true);
      onUpdateCandidate({ ...candidate, status: 'contacted' });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Pipeline
        </button>
        
        <div className="flex gap-4">
          <button 
            onClick={handleSendEmail}
            disabled={emailSent || emailSending}
            className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md ${
              emailSent 
              ? 'bg-emerald-50 text-emerald-700 cursor-default' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {emailSending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </span>
            ) : emailSent ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Invitation Sent
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Interview Invite
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-4xl font-black mb-4">
              {candidate.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
            <p className="text-slate-500 mb-6">{candidate.email}</p>
            
            <div className="w-full pt-6 border-t border-slate-100">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">AI Match Score</div>
              <div className={`text-6xl font-black ${
                matchPercentage >= 80 ? 'text-emerald-500' : matchPercentage >= 50 ? 'text-amber-500' : 'text-slate-400'
              }`}>
                {matchPercentage}%
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI Recommendation
            </h3>
            <p className="text-indigo-100 leading-relaxed text-sm">
              {recommendation}
            </p>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Key Strengths
              </h4>
              <ul className="space-y-3">
                {keyStrengths.map((str, i) => (
                  <li key={i} className="flex gap-2 text-slate-600 text-sm">
                    <span className="text-emerald-500 font-bold">•</span>
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100">
              <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Gap Analysis
              </h4>
              <ul className="space-y-3">
                {gapAnalysis.map((gap, i) => (
                  <li key={i} className="flex gap-2 text-slate-600 text-sm">
                    <span className="text-rose-500 font-bold">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tailored Interview Questions
              </h3>
              <span className="bg-slate-50 px-3 py-1 rounded-full text-slate-500 text-xs font-bold border border-slate-100">AI GENERATED</span>
            </div>
            <div className="space-y-4">
              {suggestedQuestions.map((q, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-medium">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
