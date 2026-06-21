export interface SectionAnalysis {
  score: number;
  rating: string; // "Weak" | "Average" | "Good" | "Excellent"
  findings: string[];
  suggestions: string[];
}

export interface KeywordMatch {
  keyword: string;
  category: string; // "Technical" | "Professional"
  found: boolean;
}

export interface SkillGapItem {
  name: string;
  level: number; // 0-100 representation for progress bar
  status: 'matched' | 'missing' | 'recommended';
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  skills: string[];
  description: string;
}

export interface CareerRecommendation {
  skills: string[];
  certifications: string[];
  courses: string[];
  projects: string[];
  roles: string[];
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  description: string;
  section: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  analyzedAt: string;
  targetRole: string;
  industry: string;
  experienceLevel: string;
  overallScore: number;
  atsScore: number;
  jobMatchScore: number;
  strengthIndicator: 'Weak' | 'Average' | 'Good' | 'Excellent';
  keywordsFound: string[];
  keywordsMissing: string[];
  professionalKeywordsFound: string[];
  professionalKeywordsMissing: string[];
  keywordMatchPercentage: number;
  missingKeywordsCount: number;
  atsOptimizationSuggestions: string[];
  skillGapList: SkillGapItem[];
  roadmap: RoadmapPhase[];
  recommendations: CareerRecommendation;
  improvementSuggestions: ImprovementSuggestion[];
  sectionAnalysis: {
    education: SectionAnalysis;
    skills: SectionAnalysis;
    projects: SectionAnalysis;
    experience: SectionAnalysis;
    certifications: SectionAnalysis;
  };
  summary: string;
}

export interface ResumeListItem {
  id: string;
  fileName: string;
  uploadedAt: string;
  overallScore: number;
  atsScore: number;
  jobMatchScore: number;
  targetRole: string;
  experienceLevel: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
