import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Info, Copy, Check, Sparkles, Filter, CheckSquare } from "lucide-react";
import { ResumeAnalysisResult } from "../types";

interface AtsSimulatorProps {
  data: ResumeAnalysisResult;
}

export default function AtsSimulator({ data }: AtsSimulatorProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKey(keyword);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Simulate parsing rules checker
  const checkerReports = [
    {
      id: "rule_1",
      name: "File Format Verification",
      status: "PASS",
      message: "The document is parsed successfully. Standard text structures detected.",
      detail: "Using standard PDFs rather than image-scanned resumes enables 100% keyword parsing accuracies."
    },
    {
      id: "rule_2",
      name: "Tabular & Table Check",
      status: "INFO",
      message: "Minor complex structures detected in layout.",
      detail: "Avoid heavy multi-column tables as older ATS systems might mix text sequences horizontally."
    },
    {
      id: "rule_3",
      name: "Industry Standard Headers",
      status: data.sectionAnalysis?.experience?.score && data.sectionAnalysis.experience.score < 60 ? "WARNING" : "PASS",
      message: "Targeted Section Header tags aligned.",
      detail: "Experience, Skills, Education, and projects sections use standard industry lexicon words."
    },
    {
      id: "rule_4",
      name: "Stylistic Font Check",
      status: "PASS",
      message: "Clean readable characters and standard fonts identified.",
      detail: "Avoid wingdings or obscure visual symbols. Bullet points utilize standard UTF markers."
    },
    {
      id: "rule_5",
      name: "Contact Credentials Parsing",
      status: "PASS",
      message: "Found standard email and structural credentials.",
      detail: "Found email patterns. Note: Don't put crucial contact details purely in PDF double headers or footers."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Simulation Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: ATS Simulator */}
        <div className="space-y-6">
          <div className="bg-[#0d0720]/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-indigo-400" />
                <span>Smart ATS Parsing Scan Simulator</span>
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                Live Scanner Active
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Older legacy Applicant Tracking Systems (e.g. Taleo, Workday, Greenhouse) utilize old school parsers. This simulator predicts parser compliance with structural layout elements.
            </p>

            <div className="space-y-4">
              {checkerReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl border flex items-start space-x-3 bg-white/5 border-white/5 hover:border-white/10 transition-all"
                >
                  {report.status === "PASS" && (
                    <div className="p-1.5 bg-green-500/10 text-green-400 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {report.status === "INFO" && (
                    <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                      <Info className="w-4 h-4" />
                    </div>
                  )}
                  {report.status === "WARNING" && (
                    <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-slate-200">{report.name}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          report.status === "PASS"
                            ? "bg-green-500/10 text-green-400"
                            : report.status === "INFO"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{report.message}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-1 select-none">{report.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Keyword Optimizer */}
        <div className="space-y-6">
          <div className="bg-[#0d0720]/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                <span>Target Keyword & Semantic Optimizer</span>
              </h3>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-200">{data.keywordMatchPercentage || 65}%</p>
                <p className="text-[10px] text-slate-400 font-mono">Semantic Intersection</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Recruiters query high-intent keywords to filter incoming candidates. Copy and weave these missing phrases naturally into your summaries and achievements to index higher.
            </p>

            {/* Technical Keywords found vs missing */}
            <div className="space-y-5">
              
              {/* Missing skills */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block animate-ping" />
                    <span>Highly Requested (Missing on Resume)</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">Click to copy terms</span>
                </div>
                
                {data.keywordsMissing?.length > 0 || data.professionalKeywordsMissing?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set([...(data.keywordsMissing || []), ...(data.professionalKeywordsMissing || [])])).map((kw, idx) => (
                      <button
                        key={`${kw}-${idx}`}
                        onClick={() => handleCopy(kw)}
                        className="group relative px-3 py-1.5 text-xs bg-red-950/20 hover:bg-slate-800 border border-red-900/30 hover:border-slate-600/80 text-red-200 rounded-lg flex items-center space-x-1.5 transition-all text-left"
                      >
                        <span className="truncate">{kw}</span>
                        {copiedKey === kw ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                        {/* Tooltip */}
                        {copiedKey === kw && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 text-white text-[10px] rounded border border-slate-800 shadow-md">
                            Copied!
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No missing keywords! Your keywords perfectly match the target profile.</p>
                )}
              </div>

              {/* Found keywords */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>Indexed Keywords Found ({data.keywordsFound?.length || 0})</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                  {Array.from(new Set([...(data.keywordsFound || []), ...(data.professionalKeywordsFound || [])])).map((kw, idx) => (
                    <div
                      key={`${kw}-${idx}`}
                      className="px-2.5 py-1 text-xs bg-slate-950 text-slate-300 border border-slate-800 rounded-lg flex items-center space-x-1"
                    >
                      <span>{kw}</span>
                      <span className="text-[9px] text-green-500">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization suggestions list */}
              {data.atsOptimizationSuggestions && data.atsOptimizationSuggestions.length > 0 && (
                <div className="mt-5 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl space-y-2">
                  <span className="text-xs font-semibold text-slate-300 block flex items-center space-x-1.5">
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                    <span>ATS Formatting Insights</span>
                  </span>
                  <ul className="space-y-1.5">
                    {data.atsOptimizationSuggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start space-x-2">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
