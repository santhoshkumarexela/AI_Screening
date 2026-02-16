
export interface JobDescription {
  id: string;
  title: string;
  company: string;
  content: string;
  createdAt: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeContent: string;
  score?: number;
  matchAnalysis?: MatchAnalysis;
  status: 'pending' | 'scored' | 'contacted' | 'rejected';
}

export interface MatchAnalysis {
  matchPercentage: number;
  keyStrengths: string[];
  gapAnalysis: string[];
  recommendation: string;
  suggestedQuestions: string[];
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  JOBS = 'JOBS',
  CANDIDATES = 'CANDIDATES',
  ANALYSIS = 'ANALYSIS'
}
