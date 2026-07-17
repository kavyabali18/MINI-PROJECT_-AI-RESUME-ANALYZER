import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Target,
  Route,
  History,
  Download,
  Settings,
  Sparkles,
  ArrowRight,
  Sparkle,
  TrendingUp,
  AlertTriangle,
  Award,
  Bot,
  Layers,
  ChevronRight,
  Menu,
  X,
  FileDown,
  Printer,
  ExternalLink,
  Trash2
} from "lucide-react";

import { ResumeAnalysisResult } from "./types";
import UploadArea from "./components/UploadArea";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AtsSimulator from "./components/AtsSimulator";
import SkillGapRoadmap from "./components/SkillGapRoadmap";
import HistoryAndCompare from "./components/HistoryAndCompare";
import ChatCoach from "./components/ChatCoach";
import RewriteTool from "./components/RewriteTool";
import SettingsView from "./components/SettingsView";

// High-fidelity Preseeded Demo Resume Analysis Result to show the full aesthetic power of the platform instantly on first launch!
const DEMO_ANALYSIS: ResumeAnalysisResult = {
  id: "demo_jane_doe",
  fileName: "Jane_Doe_Resume_AI_Engineer.pdf",
  analyzedAt: new Date().toISOString(),
  targetRole: "Senior AI Engineer",
  industry: "Information Technology",
  experienceLevel: "Senior Level",
  overallScore: 84,
  atsScore: 88,
  jobMatchScore: 78,
  strengthIndicator: "Good",
  summary: "Accomplished software engineer with over 5 years of experience deploying scalable machine learning models. Demonstrates powerful execution across Python, PyTorch, and cloud container orchestration (Kubernetes, AWS). Proven track record of optimizing model inference latency by 35% on enterprise servers while coordinating dual engineers.",
  keywordsFound: [
    "Python", "PyTorch", "Git", "Docker", "Machine Learning", "TensorFlow", "SQL", "Scikit-Learn", "REST APIs", "CI/CD"
  ],
  keywordsMissing: [
    "Kubernetes", "AWS SageMaker", "MLOps", "Terraform", "Prometheus"
  ],
  professionalKeywordsFound: [
    "Coordinated", "Designed", "Optimized", "Scaled", "Mentored", "Cross-functional team Collaboration"
  ],
  professionalKeywordsMissing: [
    "Budget stewardship", "Stakeholder presentation"
  ],
  keywordMatchPercentage: 74,
  missingKeywordsCount: 5,
  atsOptimizationSuggestions: [
    "Convert double-column sidebar layout into a single structural column to avoid line-break parsing mixes.",
    "Quantify your backend automation outcomes. Add percentage scales or runtime hours to experience bullets.",
    "Place crucial developer contact links directly on raw text, without masking them behind digital hyperlinks."
  ],
  skillGapList: [
    { name: "Python Programming", level: 95, status: "matched" },
    { name: "PyTorch Framework", level: 90, status: "matched" },
    { name: "Kubernetes Orchestration", level: 30, status: "missing" },
    { name: "AWS ML Ops / SageMaker", level: 45, status: "recommended" },
    { name: "CI/CD & Jenkins Pipeline", level: 80, status: "matched" },
    { name: "System Architecture", level: 60, status: "recommended" }
  ],
  roadmap: [
    {
      title: "Phase 1: Container Orchestration Mastery",
      duration: "Weeks 1-3",
      skills: ["Kubernetes", "EKS Services", "Helm Charts"],
      description: "Gain structural familiarity with Helm packaging to deploy PyTorch model endpoints across highly available Kubernetes setups."
    },
    {
      title: "Phase 2: MLOps Automation Pipelines",
      duration: "Weeks 4-6",
      skills: ["MLFlow", "AWS SageMaker Studio", "Data Drift"],
      description: "Establish regression monitoring checks to verify dataset alignment drifts and trigger automated model retrain loops."
    },
    {
      title: "Phase 3: Multi-Cloud Infrastructure & IaC",
      duration: "Weeks 7-9",
      skills: ["Terraform", "CloudFormation", "Prometheus Metrics"],
      description: "Automate machine resources provisioning on AWS, logging core inference times with clean Prometheus charts."
    }
  ],
  recommendations: {
    skills: ["Kubernetes", "AWS SageMaker", "Terraform", "MLFlow", "Prometheus"],
    certifications: [
      "AWS Certified Machine Learning Specialty",
      "Certified Kubernetes Administrator (CKA)"
    ],
    courses: [
      "MLOps Engineering Specialization on Coursera",
      "Production-ready Kubernetes Deployment on Udemy"
    ],
    projects: [
      "Deploy scalable microservice endpoints using Docker, AWS ECS, and monitoring panels",
      "High-throughput model inference gateway built with FastAPI, Redis caching, and Prometheus metrics"
    ],
    roles: [
      "MLOps Engineer",
      "Lead Machine Learning Developer",
      "Platform Systems Architect"
    ]
  },
  improvementSuggestions: [
    {
      id: "imp_1",
      title: "Integrate Quantified Production Metrics",
      description: "Your experience bullet 'Wrote PyTorch scripts' doesn't illustrate financial or performance scale. Rewrite as 'Reduced model query lag by 35% using TensorRT optimizations on AWS clusters.'",
      section: "Experience",
      priority: "High"
    },
    {
      id: "imp_2",
      title: "Flesh out Portfolio Projects Stack",
      description: "Add a dedicated Projects section displaying 2 relevant cloud deployments including live GitHub hyperlinks to prove hands-on validation.",
      section: "Projects",
      priority: "Medium"
    },
    {
      id: "imp_3",
      title: "Establish Standard Educational Format",
      description: "Consolidate degree dates and university titles cleanly on a single row to save precious negative layout margins for text optimization.",
      section: "Education",
      priority: "Low"
    }
  ],
  sectionAnalysis: {
    education: {
      score: 90,
      rating: "Excellent",
      findings: ["Found degree structures and university benchmarks clearly.", "Standard chronological order is observed."],
      suggestions: ["Ensure GPA is only listed if above 3.5; otherwise, omit to save vertical spacing."]
    },
    skills: {
      score: 85,
      rating: "Good",
      findings: ["Skills list is robust and well categorized.", "Includes modern tech verbs relevant for IT engineering."],
      suggestions: ["Group skills by context (Frameworks, Utilities, Languages) to accommodate rapid recuriter scanning."]
    },
    projects: {
      score: 75,
      rating: "Average",
      findings: ["Projects lack structural links.", "Tech stacks are generalized."],
      suggestions: ["Detail exact libraries used in each project title (e.g. built with FastAPI and SQLite)."]
    },
    experience: {
      score: 70,
      rating: "Average",
      findings: ["Action verbs are present but achievements lack numerical key outcomes.", "Uses too many passive roles definitions like 'responsible for'."],
      suggestions: ["Apply the Google X-Y-Z formula to write metrics-focused outcomes."]
    },
    certifications: {
      score: 60,
      rating: "Weak",
      findings: ["Missing high-authority AWS or platform DevOps compliance credentials."],
      suggestions: ["Study for AWS Specialty or Kubernetes CKA to drastically boost resume relevance."]
    }
  }
};

export default function App() {
  const [history, setHistory] = useState<ResumeAnalysisResult[]>([]);
  const [activeAnalysis, setActiveAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  // Load history from localStorage on mount
  // Load history from localStorage on mount
 useEffect(() => {
  const cached = localStorage.getItem("resume_analyzer_history");

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      setHistory(parsed);

      if (parsed.length > 0) {
        setActiveAnalysis(parsed[0]);
      }
    } catch (err) {
      console.error("Invalid local storage data");
      localStorage.removeItem("resume_analyzer_history");
      setHistory([]);
      setActiveAnalysis(null);
    }
  } else {
    setHistory([]);
    setActiveAnalysis(null);
  }
}, []);
  const handleAnalyzeResume = async (payload: {
    pdfBase64: string;
    fileContent: string;
    fileName: string;
    targetRole: string;
    industry: string;
    experienceLevel: string;
    jobDescription: string;
  }) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "An error occurred during parsing.");
      }

      const result: ResumeAnalysisResult = await response.json();
      
      // Update states
      const updatedHistory = [result, ...history];
      setHistory(updatedHistory);
      setActiveAnalysis(result);
      localStorage.setItem("resume_analyzer_history", JSON.stringify(updatedHistory));
      
      // Navigate to dashboard
      setActiveTab("dashboard");
    } catch (err: any) {
      alert("Error: " + (err.message || "Something went wrong. Please confirm your AI API secret variables are connected safely."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecordToDelete(id);
  };

  const handleSelectActiveAnalysis = (record: ResumeAnalysisResult) => {
    setActiveAnalysis(record);
    setActiveTab("dashboard");
  };

  const handleDirectCompare = (itemA: ResumeAnalysisResult, itemB: ResumeAnalysisResult) => {
    // Simply sets elements so they render on history comparison
  };

  const triggerPDFDownloadAndPrint = () => {
    window.print();
  };

  const generateReportHTML = (record: ResumeAnalysisResult) => {
    const docName = record.fileName.replace(/\.[^/.]+$/, "");
    const dateStr = new Date(record.analyzedAt).toLocaleDateString();
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Executive Resume Audit - ${record.fileName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    body {
      font-family: var(--font-sans);
      background-color: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .wrapper {
      max-width: 850px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-b: 1px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }
    .brand {
      font-weight: 850;
      color: #4f46e5;
      font-size: 15px;
      letter-spacing: -0.025em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .confidential {
      font-family: var(--font-mono);
      font-size: 9px;
      color: #df5858;
      background: #fef2f2;
      border: 1px solid #fca5a5;
      padding: 4px 10px;
      letter-spacing: 0.08em;
      border-radius: 6px;
      font-weight: 700;
    }
    .title-area {
      margin-bottom: 30px;
    }
    .sub {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      color: #6366f1;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 6px;
    }
    h1 {
      font-size: 26px;
      font-weight: 950;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin: 0 0 18px 0;
    }
    .meta-grid {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 20px;
      border-top: 1px solid #f1f5f9;
      padding-top: 18px;
    }
    @media(min-width: 600px) {
      .meta-grid {
        grid-template-cols: repeat(4, 1fr);
      }
    }
    .meta-item {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .meta-val {
      font-size: 12px;
      font-weight: 800;
      color: #1e293b;
      margin-top: 4px;
      word-break: break-all;
    }
    .stats-row {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      padding: 24px 0;
      margin: 28px 0;
      text-align: center;
      gap: 12px;
    }
    .stat-label {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
    }
    .stat-val {
      font-size: 38px;
      font-weight: 900;
      margin: 6px 0;
    }
    .indigo-text { color: #4f46e5; }
    .slate-text { color: #1e293b; }
    .blue-text { color: #2563eb; }
    .stat-desc {
      font-size: 10px;
      color: #64748b;
    }
    .summary-area {
      margin-bottom: 32px;
    }
    h2 {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 24px 0 12px 0;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 6px;
    }
    p {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      margin: 0;
    }
    .grid-sections {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 32px;
    }
    @media(min-width: 600px) {
      .grid-sections {
        grid-template-cols: repeat(5, 1fr);
      }
    }
    .sec-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px;
    }
    .sec-label {
      font-size: 9px;
      color: #64748b;
      display: block;
      font-weight: 600;
    }
    .sec-score {
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
      font-family: var(--font-mono);
      display: block;
      margin: 4px 0;
    }
    .sec-rating {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      font-family: var(--font-mono);
      color: #4f46e5;
    }
    .skills-area {
      display: grid;
      grid-template-cols: 1fr;
      gap: 24px;
    }
    @media(min-width: 600px) {
      .skills-area {
        grid-template-cols: repeat(2, 1fr);
      }
    }
    .skills-col h3 {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 10px;
    }
    .found-title { color: #059669; }
    .missing-title { color: #dc2626; }
    .skills-list {
      font-size: 12px;
      color: #334155;
      background: #f8fafc;
      padding: 14px;
      border-radius: 12px;
      line-height: 1.6;
      border: 1px solid #e2e8f0;
      min-height: 80px;
    }
    .footer-stamp {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .footer-stamp span {
      font-family: var(--font-mono);
    }
    .btn-bar {
      margin-top: 28px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn {
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }
    .btn-primary {
      background: #4f46e5;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #4338ca;
    }
    .btn-secondary {
      background: #ffffff;
      color: #475569;
      border: 1px solid #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f1f5f9;
    }
    @media print {
      body {
        background-color: #ffffff;
        padding: 0;
      }
      .wrapper {
        border: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        max-width: 100%;
      }
      .btn-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand">
        <svg h="16" w="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>ResumeIntellect Audit</span>
      </div>
      <span class="confidential">CONFIDENTIAL AUDIT</span>
    </div>

    <div class="title-area">
      <span class="sub">Executive Career Report</span>
      <h1>RESUME CREDENTIALS EVALUATION SHEET</h1>
      <div class="meta-grid">
        <div>
          <span class="meta-item">CANDIDATE DOCUMENT</span>
          <div class="meta-val">${record.fileName}</div>
        </div>
        <div>
          <span class="meta-item">TARGET PROFILE</span>
          <div class="meta-val">${record.targetRole}</div>
        </div>
        <div>
          <span class="meta-item">DATE PROCESSED</span>
          <div class="meta-val">${dateStr}</div>
        </div>
        <div>
          <span class="meta-item">STRENGTH</span>
          <div class="meta-val" style="color: #059669">${record.strengthIndicator}</div>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div>
        <span class="stat-label">RESUME SCORE</span>
        <div class="stat-val indigo-text">${record.overallScore}</div>
        <span class="stat-desc">Industry benchmark</span>
      </div>
      <div>
        <span class="stat-label">ATS RATING</span>
        <div class="stat-val slate-text">${record.atsScore}%</div>
        <span class="stat-desc">Formatting pass rate</span>
      </div>
      <div>
        <span class="stat-label">JOB RELEVANCE</span>
        <div class="stat-val blue-text">${record.jobMatchScore}%</div>
        <span class="stat-desc">Semantic match</span>
      </div>
    </div>

    <div class="summary-area">
      <h2>AI Platform Evaluation Summary</h2>
      <p>${record.summary}</p>
    </div>

    <h2>Modular Section Analytics</h2>
    <div class="grid-sections">
      <div class="sec-card">
        <span class="sec-label">Education</span>
        <span class="sec-score">${record.sectionAnalysis?.education?.score ?? 0}</span>
        <span class="sec-rating">${record.sectionAnalysis?.education?.rating ?? "Good"}</span>
      </div>
      <div class="sec-card">
        <span class="sec-label">Skills</span>
        <span class="sec-score">${record.sectionAnalysis?.skills?.score ?? 0}</span>
        <span class="sec-rating">${record.sectionAnalysis?.skills?.rating ?? "Good"}</span>
      </div>
      <div class="sec-card">
        <span class="sec-label">Projects</span>
        <span class="sec-score">${record.sectionAnalysis?.projects?.score ?? 0}</span>
        <span class="sec-rating">${record.sectionAnalysis?.projects?.rating ?? "Good"}</span>
      </div>
      <div class="sec-card">
        <span class="sec-label">Experience</span>
        <span class="sec-score">${record.sectionAnalysis?.experience?.score ?? 0}</span>
        <span class="sec-rating">${record.sectionAnalysis?.experience?.rating ?? "Good"}</span>
      </div>
      <div class="sec-card">
        <span class="sec-label">Certifications</span>
        <span class="sec-score">${record.sectionAnalysis?.certifications?.score ?? 0}</span>
        <span class="sec-rating">${record.sectionAnalysis?.certifications?.rating ?? "Good"}</span>
      </div>
    </div>

    <div class="skills-area">
      <div class="skills-col">
        <h3 class="found-title">Identified Target Keywords</h3>
        <div class="skills-list">${record.keywordsFound?.join(", ") || "None listed."}</div>
      </div>
      <div class="skills-col">
        <h3 class="missing-title">Missing Keywords to Optimize</h3>
        <div class="skills-list" style="color: #991b1b; background: #fff5f5; border-color: #fca5a5;">${record.keywordsMissing?.join(", ") || "None detected."}</div>
      </div>
    </div>

    <div class="footer-stamp">
      <span>SECURE ENCRYPTED VERIFIED REPORT</span>
      <span>DATED: ${dateStr}</span>
    </div>

    <div class="btn-bar">
      <button class="btn btn-secondary" onclick="window.close()">Close Preview</button>
      <button class="btn btn-primary" onclick="window.print()">Print or Save to PDF Office</button>
    </div>
  </div>
</body>
</html>`;
    return htmlContent;
  };

  const downloadStandaloneHTML = () => {
    if (!activeAnalysis) return;
    const docName = activeAnalysis.fileName.replace(/\.[^/.]+$/, "");
    const htmlContent = generateReportHTML(activeAnalysis);
    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `Resume_Optimization_Audit_${docName}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLaunchPrintWindow = () => {
    if (!activeAnalysis) return;
    const htmlContent = generateReportHTML(activeAnalysis);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Popup blocker is preventing opening the direct print window. We recommend clicking the 'Download Offline-Ready Report' instead as it is completely secure and unblockable!");
      return;
    }
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const menuItems = [
    { id: "dashboard", label: "Intelligence Hub", icon: LayoutDashboard },
    { id: "analyze", label: "Upload & Matcher", icon: Sparkles },
    { id: "ats", label: "Smart ATS Simulator", icon: ShieldCheck },
    { id: "gap", label: "Core Skills Match", icon: Target },
    { id: "roadmap", label: "Career Upskill", icon: Route },
    { id: "history", label: "Optimization Logs", icon: History },
    { id: "rewrite", label: "AI Bullet Rewrite", icon: Sparkle },
    { id: "reports", label: "Download Executive", icon: Download },
    { id: "settings", label: "SaaS Preferences", icon: Settings }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
    if (score >= 65) return "text-brand-accent border-brand-accent/20 bg-brand-accent/5";
    return "text-red-400 border-red-500/20 bg-red-500/5";
  };

  return (
    <div className="min-h-screen bg-[#0a0518] text-slate-200 flex flex-col font-sans relative overflow-hidden">
      
      {/* Sleek Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4F46E5]/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#7C3AED]/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="no-print h-16 border-b border-white/5 bg-[#0a0518]/85 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/5 text-slate-450 hover:text-white md:hidden transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#4F46E5]/30">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-lg">
              Resume<span className="text-[#7C3AED]">Intellect</span>
            </span>
          </div>
          <span className="hidden md:inline-flex px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
            Free & Unlimited
          </span>
        </div>

        {activeAnalysis && (
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <FileText className="w-4 h-4 text-indigo-455" />
            <span className="text-slate-200 font-semibold truncate max-w-[200px]" title={activeAnalysis.fileName}>
              {activeAnalysis.fileName}
            </span>
            <span className="text-[10px] font-mono text-slate-450">
              Score: {activeAnalysis.overallScore}/100
            </span>
          </div>
        )}
      </header>

      {/* Main Structural Body */}
      <div className="flex-1 flex relative">
        
        {/* Left Side Navigation Sidebar */}
        <aside
          className={`no-print w-64 border-r border-white/10 bg-[#0d0720]/95 backdrop-blur-md flex flex-col justify-between fixed inset-y-16 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-3 px-3">
              Core Platform
            </span>
            {menuItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium flex items-center space-x-3 transition-all ${
                    activeTab === item.id
                      ? "bg-white/5 text-white font-semibold border border-white/10 shadow-[0_0_12px_rgba(79,70,229,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === item.id ? "text-indigo-400" : "text-slate-550"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mt-6 mb-3 px-3">
              Advanced Tools
            </span>
            {menuItems.slice(5).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium flex items-center space-x-3 transition-all ${
                    activeTab === item.id
                      ? "bg-white/5 text-white font-semibold border border-white/10 shadow-[0_0_12px_rgba(79,70,229,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === item.id ? "text-indigo-400" : "text-slate-550"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 space-y-4">
            {/* Free Tier Info Box */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border border-emerald-500/20 p-4">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">FREE & ACTIVE</p>
              <p className="text-[11px] text-slate-350 mb-2 leading-relaxed">Unlimited resume parsing scans and live career coach feedback are free for everyone.</p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 font-mono text-center">
              ResumeIntellect © 2026<br />Free Community Tool
            </div>
          </div>
        </aside>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:pl-72 focus:outline-none min-h-[calc(100vh-64px)] pb-16">
          
          {/* Active View Port Routing */}
          <div className="space-y-8 print-card">
            
            {activeTab === "dashboard" && activeAnalysis && (
              <div className="space-y-8">
                
                {/* Executive Summary Greeting */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center space-x-2">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                      <span>Career Intelligence Command Center</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Showing detailed analysis for: <strong className="text-brand-accent font-semibold">{activeAnalysis.fileName}</strong>, tailored to <span className="text-slate-200 font-medium">{activeAnalysis.targetRole}</span> requirements.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("analyze")}
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center space-x-2 shrink-0 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
                    <span>Scan New Version</span>
                  </button>
                </div>

                {/* Micro Counters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Card 1: Resume Score */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50 pointer-events-none"></div>
                    <div className="text-4xl font-extrabold text-white mb-1 font-sans">{activeAnalysis.overallScore}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Resume Score</div>
                    <div className="mt-4 w-full h-1 bg-white/10 rounded-full">
                      <div 
                        className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-500" 
                        style={{ width: `${activeAnalysis.overallScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Card 2: ATS Score */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                    <div className="text-4xl font-extrabold text-white mb-1 font-sans">{activeAnalysis.atsScore}%</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">ATS Match</div>
                    <div className="mt-4 w-full h-1 bg-white/10 rounded-full">
                      <div 
                        className="h-full bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)] transition-all duration-500" 
                        style={{ width: `${activeAnalysis.atsScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Card 3: Job Match percentage */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                    <div className="text-4xl font-extrabold text-emerald-400 mb-1 font-sans">{activeAnalysis.jobMatchScore || 70}%</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Job Match</div>
                    <div className="mt-4 w-full h-1 bg-white/10 rounded-full">
                      <div 
                        className="h-full bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-500" 
                        style={{ width: `${activeAnalysis.jobMatchScore || 70}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Card 4: Strength indicator gauge */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative bg-indigo-650/15 backdrop-blur-md">
                    <div className="text-xl font-extrabold text-white mb-1 font-sans">{activeAnalysis.strengthIndicator || "Good"}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Strength State</div>
                    <div className="mt-3 flex gap-1">
                      <div className={`w-6 h-1.5 rounded-full ${activeAnalysis.overallScore >= 40 ? "bg-indigo-500" : "bg-white/10"}`}></div>
                      <div className={`w-6 h-1.5 rounded-full ${activeAnalysis.overallScore >= 65 ? "bg-indigo-500" : "bg-white/10"}`}></div>
                      <div className={`w-6 h-1.5 rounded-full ${activeAnalysis.overallScore >= 80 ? "bg-indigo-500" : "bg-white/10"}`}></div>
                      <div className={`w-6 h-1.5 rounded-full ${activeAnalysis.overallScore >= 95 ? "bg-indigo-500" : "bg-white/10"}`}></div>
                    </div>
                  </div>

                </div>

                {/* Dashboard layout structure: Left charts/analytics + Right Chat career coach */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  
                  {/* Left block (charts, executive summaries, priorities) */}
                  <div className="xl:col-span-2 space-y-8">
                    
                    {/* Professional summary intelligence card */}
                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center space-x-1.5">
                        <Bot className="w-4 h-4 text-brand-accent animate-pulse" />
                        <span>AI Executive Career Intelligence Summary</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {activeAnalysis.summary || "No executive summary available yet."}
                      </p>
                    </div>

                    {/* Detailed charts */}
                    <AnalyticsCharts data={activeAnalysis} />

                    {/* Highly important Actionable Improvement Suggestions list */}
                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                          <AlertTriangle className="text-amber-400 w-5 h-5 flex-shrink-0" />
                          <span>Actionable Resume Optimizations</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Resolve high-priority warnings to immediately notice shifts in standard applicant tracking pre-screening pipelines.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {activeAnalysis.improvementSuggestions?.map((item, index) => (
                          <div
                            key={item.id || index}
                            className={`p-4 rounded-xl border flex items-start space-x-3.5 bg-slate-950/40 border-slate-800/80 hover:border-slate-700 transition-all`}
                          >
                            <span
                              className={`text-[10px] font-mono leading-none font-bold uppercase px-2 py-1 rounded border flex-shrink-0 ${
                                item.priority === "High"
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : item.priority === "Medium"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              }`}
                            >
                              {item.priority}
                            </span>

                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-slate-200">{item.title}</span>
                                <span className="text-[10px] font-mono text-slate-500">Section: {item.section}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right block: Live interactive career coach */}
                  <div className="space-y-6">
                    <ChatCoach activeAnalysis={activeAnalysis} />
                  </div>

                </div>

              </div>
            )}

            {activeTab === "analyze" && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="text-center space-y-2 mb-4">
                  <h2 className="text-2xl font-extrabold text-white flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
                    <span>Upload & Optimize Resume</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Parse file structures using state-of-the-art Gemini LLM. Connect targets to calculate match percentage indexes.
                  </p>
                </div>
                
                <UploadArea onAnalyze={handleAnalyzeResume} isLoading={isAnalyzing} />
              </div>
            )}

            {activeTab === "ats" && activeAnalysis && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Smart ATS Simulator & Keyword Filter</h2>
                  <p className="text-xs text-slate-400 mt-1">Audit compliance of resume layouts with classic algorithmic filters.</p>
                </div>
                <AtsSimulator data={activeAnalysis} />
              </div>
            )}

            {activeTab === "gap" && activeAnalysis && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Target Skills Matching & Recommendations</h2>
                  <p className="text-xs text-slate-400 mt-1">Cross-reference core credentials against upskilling suggestions.</p>
                </div>
                <SkillGapRoadmap data={activeAnalysis} />
              </div>
            )}

            {activeTab === "roadmap" && activeAnalysis && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Interactive Career Upskilling Timeline</h2>
                  <p className="text-xs text-slate-400 mt-1">Sequential learning phase deck curated based on parsed gaps.</p>
                </div>
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
                  <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2 mb-6">
                    <Route className="w-5 h-5 text-brand-secondary" />
                    <span>Phased Timeline Dashboard</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeAnalysis.roadmap?.map((phase, idx) => (
                      <div key={idx} className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 hover:border-brand-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-mono text-brand-accent">0{idx + 1}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-full font-mono font-semibold">{phase.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-100">{phase.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{phase.description}</p>
                        <div className="pt-2">
                          <span className="text-[9px] font-semibold text-slate-500 uppercase block mb-1">Focus Toolset:</span>
                          <div className="flex flex-wrap gap-1">
                            {Array.from(new Set(phase.skills || [])).map((sk, idx) => (
                              <span key={`${sk}-${idx}`} className="text-[9px] px-2 py-0.5 bg-slate-900 border border-slate-850 text-slate-350 rounded-md">{sk}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans">Resume Optimization Log</h2>
                  <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                    <span>Inspect historic version scans and perform side-by-side variable comparisons.</span>
                  </p>
                </div>
                <HistoryAndCompare
                  history={history}
                  onSelectActive={handleSelectActiveAnalysis}
                  onDeleteHistory={handleDeleteRecord}
                  onCompare={handleDirectCompare}
                  activeId={activeAnalysis?.id || null}
                />
              </div>
            )}

            {activeTab === "rewrite" && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="text-center space-y-1 mb-4">
                  <h2 className="text-2xl font-extrabold text-white">AI Experience Bullet Rewriter</h2>
                  <p className="text-xs text-slate-400">Transform weak duties descriptions into strong, metrics-driven outcomes.</p>
                </div>
                <RewriteTool />
              </div>
            )}

            {activeTab === "reports" && activeAnalysis && (
              <div className="space-y-6 max-w-4xl mx-auto">
                
                {/* Control Panel */}
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-200">Export & Download Executive Audit Report</h3>
                      <p className="text-xs text-slate-400">Select standard high-authority printing or download local backups bypassing sandbox container limits.</p>
                    </div>
                    <span className="text-[10px] font-mono select-none px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20">
                      Print/PDF Engine Enabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={handleLaunchPrintWindow}
                      className="p-3 bg-gradient-to-r from-brand-primary to-indigo-600 hover:brightness-110 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 shadow-md transition-all group"
                      title="Opens print view in a top-level tab to guarantee sandbox-free high definition printing"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Open Pop-up Print View</span>
                    </button>

                    <button
                      onClick={downloadStandaloneHTML}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border border-slate-700 hover:border-slate-600 shadow-sm transition-all"
                      title="Downloads a self-contained offline html file containing this styled sheet with graphics"
                    >
                      <FileDown className="w-4 h-4 text-emerald-400" />
                      <span>Download Offline HTML Report</span>
                    </button>

                    <button
                      onClick={triggerPDFDownloadAndPrint}
                      className="p-3 bg-[#0d0720]/80 hover:bg-[#150a30] text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border border-white/10 transition-all"
                      title="Attempts to prompt printing on the current document frame"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Direct Page Print</span>
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 leading-relaxed bg-[#0d0720]/50 p-2.5 rounded-lg border border-white/5">
                    💡 <strong>Highly Recommended:</strong> If you are running inside a preview frame sandbox, standard printing may be restricted. Use the <strong>"Open Pop-up Print View"</strong> button to print natively, or <strong>"Download Offline HTML"</strong> to save a beautiful, formatted document directly.
                  </p>
                </div>

                {/* Cover representation card */}
                <div className="p-8 bg-white text-slate-900 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden text-left border border-slate-200">
                  
                  {/* Subtle design header */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-extrabold font-sans text-slate-850 tracking-tight text-sm">ResumeIntellect AI Audit</span>
                    </div>

                    <span className="font-mono text-[9px] text-slate-500 uppercase font-semibold">CONFIDENTIAL RECRUITMENT BENCHMARK</span>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">EXECUTIVE CAREER REPORT</span>
                    <h1 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">RESUME CREDENTIALS EVALUATION SHEET</h1>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-[10px] font-semibold text-slate-500 pt-4 border-t border-slate-100">
                      <div>
                        <span>CANDIDATE DOCUMENT:</span>
                        <p className="text-xs text-slate-850 font-bold block truncate">{activeAnalysis.fileName}</p>
                      </div>
                      <div>
                        <span>TARGET PROFILE:</span>
                        <p className="text-xs text-slate-850 font-bold block">{activeAnalysis.targetRole}</p>
                      </div>
                      <div>
                        <span>DATED:</span>
                        <p className="text-xs text-slate-850 font-bold block">{new Date(activeAnalysis.analyzedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span>TRIAL RATING:</span>
                        <p className="text-xs text-emerald-600 font-bold block uppercase">{activeAnalysis.strengthIndicator}</p>
                      </div>
                    </div>
                  </div>

                  {/* Overall score summaries */}
                  <div className="grid grid-cols-3 gap-4 border-y border-slate-200 py-6 text-center">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">RESUME SCORE</span>
                      <p className="text-4xl font-black text-indigo-600">{activeAnalysis.overallScore}</p>
                      <span className="text-[10px] text-slate-500">Industry benchmark</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">ATS RATING</span>
                      <p className="text-4xl font-black text-slate-800">{activeAnalysis.atsScore}%</p>
                      <span className="text-[10px] text-slate-500">Formatting pass rate</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block">JOB RELEVANCE</span>
                      <p className="text-4xl font-black text-blue-600">{activeAnalysis.jobMatchScore}%</p>
                      <span className="text-[10px] text-slate-500">Semantic match</span>
                    </div>
                  </div>

                  {/* Written evaluation details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">AI Platform Summary:</h4>
                    <p className="text-xs text-slate-650 leading-relaxed font-sans">{activeAnalysis.summary}</p>
                  </div>

                  {/* Section scores */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Modular Section Analytics:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-[11px]">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-450 block text-[9px] font-sans">Education</span>
                        <strong className="text-slate-850 text-base">{activeAnalysis.sectionAnalysis?.education?.score ?? 0}</strong>
                        <p className="text-[9px] text-indigo-600 font-semibold uppercase">{activeAnalysis.sectionAnalysis?.education?.rating}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-450 block text-[9px] font-sans">Skills</span>
                        <strong className="text-slate-850 text-base">{activeAnalysis.sectionAnalysis?.skills?.score ?? 0}</strong>
                        <p className="text-[9px] text-indigo-600 font-semibold uppercase">{activeAnalysis.sectionAnalysis?.skills?.rating}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-450 block text-[9px] font-sans">Projects</span>
                        <strong className="text-slate-850 text-base">{activeAnalysis.sectionAnalysis?.projects?.score ?? 0}</strong>
                        <p className="text-[9px] text-indigo-600 font-semibold uppercase">{activeAnalysis.sectionAnalysis?.projects?.rating}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-450 block text-[9px] font-sans">Experience</span>
                        <strong className="text-slate-850 text-base">{activeAnalysis.sectionAnalysis?.experience?.score ?? 0}</strong>
                        <p className="text-[9px] text-indigo-600 font-semibold uppercase">{activeAnalysis.sectionAnalysis?.experience?.rating}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-450 block text-[9px] font-sans">Certifications</span>
                        <strong className="text-slate-850 text-base">{activeAnalysis.sectionAnalysis?.certifications?.score ?? 0}</strong>
                        <p className="text-[9px] text-indigo-600 font-semibold uppercase">{activeAnalysis.sectionAnalysis?.certifications?.rating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Identified Target keywords:</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans">{activeAnalysis.keywordsFound?.join(", ") || "None listed."}</p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider">Missing keywords to optimize:</h5>
                      <p className="text-xs text-red-950 font-sans leading-relaxed">{activeAnalysis.keywordsMissing?.join(", ") || "None detected."}</p>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {activeTab === "settings" && <SettingsView />}

            {/* Empty States */}
            {!activeAnalysis && activeTab !== "analyze" && activeTab !== "settings" && (
              <div className="text-center py-20 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-lg mx-auto space-y-6">
                <div className="p-4 bg-slate-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-500 border border-slate-850">
                  <FileText className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-200">Initial Analysis Context Required</h4>
                  <p className="text-xs text-slate-450 leading-relaxed px-6">
                    Ready to unlock premium ATS analytics, skill matched timelines, and personal Gemini coaching? Please upload your resume first.
                  </p>
                </div>
                
                <button
                  onClick={() => setActiveTab("analyze")}
                  className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl text-xs font-semibold shadow-md inline-flex items-center space-x-1"
                >
                  <span>Go to Upload Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </main>

      </div>

      {/* Beautiful Custom styled Confirmation Modal to bypass Sandbox restrictions on window.confirm */}
      {recordToDelete && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f0a28]/95 border border-white/15 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                <Trash2 className="w-6 h-6 animate-bounce" />
              </div>
              <div className="text-center space-y-1.5">
                <h3 className="text-base font-extrabold text-white">Delete Resume History Log?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Are you sure you want to delete this optimized resume entry? This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setRecordToDelete(null)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const updated = history.filter((item) => item.id !== recordToDelete);
                    setHistory(updated);
                    localStorage.setItem("resume_analyzer_history", JSON.stringify(updated));
                    if (activeAnalysis?.id === recordToDelete) {
                      setActiveAnalysis(updated.length > 0 ? updated[0] : null);
                    }
                    setRecordToDelete(null);
                  }}
                  className="w-1/2 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs text-white font-bold rounded-xl shadow-lg shadow-red-500/15 transition-all cursor-pointer"
                >
                  Delete Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
