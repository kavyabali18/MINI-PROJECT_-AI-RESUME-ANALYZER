import React, { useState } from "react";
import { History, Eye, CheckSquare, Plus, ArrowRightLeft, FileText, Calendar, Trash2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ResumeAnalysisResult } from "../types";

interface HistoryAndCompareProps {
  history: ResumeAnalysisResult[];
  onSelectActive: (analysis: ResumeAnalysisResult) => void;
  onDeleteHistory: (id: string) => void;
  onCompare: (analysisA: ResumeAnalysisResult, analysisB: ResumeAnalysisResult) => void;
  activeId: string | null;
}

export default function HistoryAndCompare({
  history,
  onSelectActive,
  onDeleteHistory,
  onCompare,
  activeId
}: HistoryAndCompareProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        // limit to 2 maximum
        alert("You can select up to 2 resumes at once for a side-by-side comprehensive analysis matrix.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const executeCompare = () => {
    if (selectedIds.length !== 2) return;
    const itemA = history.find((h) => h.id === selectedIds[0]);
    const itemB = history.find((h) => h.id === selectedIds[1]);
    if (itemA && itemB) {
      onCompare(itemA, itemB);
      setIsComparing(true);
    }
  };

  const clearCompare = () => {
    setSelectedIds([]);
    setIsComparing(false);
  };

  const compareA = isComparing ? history.find((h) => h.id === selectedIds[0]) : null;
  const compareB = isComparing ? history.find((h) => h.id === selectedIds[1]) : null;

  return (
    <div className="space-y-8">
      
      {/* Structural layout: History List */}
      <div className="bg-[#0d0720]/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/5 mb-6 gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
              <History className="w-5 h-5 text-indigo-400" />
              <span>Resume Optimization Version History</span>
            </h3>
            <p className="text-xs text-slate-450 mt-1 leading-relaxed">
              Track your score progress over time. Select exactly 2 version checkboxes below to launch the multi-variable delta comparison benchmark.
            </p>
          </div>

          {selectedIds.length === 2 && !isComparing && (
            <button
              onClick={executeCompare}
              className="px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:brightness-110 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-[#4F46E5]/20 active:scale-95 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4 animate-pulse" />
              <span>Launch Comparison Matrix</span>
            </button>
          )}

          {isComparing && (
            <button
              onClick={clearCompare}
              className="px-4 py-2 bg-[#0d0720]/80 hover:bg-[#0d0720] border border-white/10 text-slate-355 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <span>Clear Matrix & Return</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-3">
            <div className="p-3 bg-white/5 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-slate-400 border border-white/10">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400">No optimized versions found yet</p>
              <p className="text-xs text-slate-500">Go to Upload Resume, configure details, and parse using Gemini AI to populate history.</p>
            </div>
          </div>
        ) : !isComparing ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-slate-405 text-xs font-mono uppercase">
                  <th className="py-3 px-4 w-12 text-center">Compare</th>
                  <th className="py-3 px-4">Document Details</th>
                  <th className="py-3 px-4">Target Role</th>
                  <th className="py-3 px-4 text-center">Resume Score</th>
                  <th className="py-3 px-4 text-center">ATS Score</th>
                  <th className="py-3 px-4 text-center">Job Match</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {history.map((record) => (
                  <tr
                    key={record.id}
                    className={`hover:bg-white/5 transition-colors ${
                      record.id === activeId ? "bg-white/5 border-l-2 border-l-indigo-500" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(record.id)}
                        onChange={() => handleCheckboxChange(record.id)}
                        className="w-4 h-4 rounded bg-[#0d0720] border-white/10 text-indigo-550 focus:ring-0 focus:ring-offset-0"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-white/5 border border-white/5 rounded-lg text-slate-400">
                          <FileText className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200 truncate max-w-[180px]" title={record.fileName}>
                            {record.fileName}
                          </p>
                          <span className="text-[10px] text-slate-550 flex items-center space-x-1 font-mono pt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(record.analyzedAt).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium truncate max-w-[140px]" title={record.targetRole}>
                      {record.targetRole}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-sm">
                      <span className={record.overallScore >= 80 ? "text-emerald-400" : record.overallScore >= 65 ? "text-indigo-400" : "text-red-400"}>
                        {record.overallScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <span className={record.atsScore >= 80 ? "text-emerald-400" : "text-slate-300"}>
                        {record.atsScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <span className="text-[#7C3AED]">{record.jobMatchScore}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => onSelectActive(record)}
                          className="p-1 px-2.5 bg-white/5 hover:bg-[#0d0720]/45 border border-white/10 text-slate-300 rounded-lg flex items-center space-x-1"
                          title="View analysis detail on dashboard"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => onDeleteHistory(record.id)}
                          className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                          title="Delete optimized version"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {/* Side-by-Side Comparison Matrix */}
      {isComparing && compareA && compareB && (
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-slate-200 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Multi-Variable Side-by-Side Comparison Matrix</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
              Benchmark Mode
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            {/* Vector metrics */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Core Metrics comparison</span>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Resume Score</span>
                  <p className="text-lg font-extrabold text-slate-200">{compareA.overallScore} vs {compareB.overallScore}</p>
                  <span className={`text-[9px] font-mono font-bold ${compareB.overallScore >= compareA.overallScore ? "text-green-400" : "text-amber-400"}`}>
                    Shift: {compareB.overallScore - compareA.overallScore >= 0 ? "+" : ""}{compareB.overallScore - compareA.overallScore} pts
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">ATS Score</span>
                  <p className="text-lg font-extrabold text-slate-200">{compareA.atsScore} vs {compareB.atsScore}</p>
                  <span className={`text-[9px] font-mono font-bold ${compareB.atsScore >= compareA.atsScore ? "text-green-400" : "text-amber-400"}`}>
                    Shift: {compareB.atsScore - compareA.atsScore >= 0 ? "+" : ""}{compareB.atsScore - compareA.atsScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Job Match Score</span>
                  <p className="text-lg font-extrabold text-slate-200">{compareA.jobMatchScore}% vs {compareB.jobMatchScore}%</p>
                  <span className={`text-[9px] font-mono font-bold ${compareB.jobMatchScore >= compareA.jobMatchScore ? "text-green-400" : "text-amber-400"}`}>
                    Shift: {compareB.jobMatchScore - compareA.jobMatchScore >= 0 ? "+" : ""}{compareB.jobMatchScore - compareA.jobMatchScore}%
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Keywords Count</span>
                  <p className="text-lg font-extrabold text-slate-200">{(compareA.keywordsFound?.length || 0)} vs {(compareB.keywordsFound?.length || 0)}</p>
                  <span className="text-[9px] text-slate-500 block font-mono">Found Technical</span>
                </div>
              </div>
            </div>

            {/* Keyword intersections comparison */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">Keyword Delta comparison</span>
              
              <div className="space-y-3 font-medium">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">A: {compareA.fileName}</span>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                    {Array.from(new Set(compareA.keywordsFound || [])).slice(0, 8).map((k, idx) => (
                      <span key={`${k}-${idx}`} className="text-[9px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded">{k}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">B: {compareB.fileName}</span>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                    {Array.from(new Set(compareB.keywordsFound || [])).slice(0, 8).map((k, idx) => (
                      <span key={`${k}-${idx}`} className="text-[9px] px-1.5 py-0.5 bg-indigo-950/20 border border-indigo-900/35 text-indigo-200 rounded">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sections comparison list */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">Section scoring deltas</span>
              
              <div className="space-y-2 text-[11px] font-mono pt-1">
                <div className="flex items-center justify-between py-1 border-b border-slate-850/50">
                  <span className="text-slate-400 font-sans">Education:</span>
                  <span className="text-slate-200 font-bold">{compareA.sectionAnalysis?.education?.score ?? 0} vs {compareB.sectionAnalysis?.education?.score ?? 0}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-850/50">
                  <span className="text-slate-400 font-sans">Skills Section:</span>
                  <span className="text-slate-200 font-bold">{compareA.sectionAnalysis?.skills?.score ?? 0} vs {compareB.sectionAnalysis?.skills?.score ?? 0}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-850/50">
                  <span className="text-slate-400 font-sans">Projects Grid:</span>
                  <span className="text-slate-200 font-bold">{compareA.sectionAnalysis?.projects?.score ?? 0} vs {compareB.sectionAnalysis?.projects?.score ?? 0}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-850/50">
                  <span className="text-slate-400 font-sans">Experience Block:</span>
                  <span className="text-slate-200 font-bold">{compareA.sectionAnalysis?.experience?.score ?? 0} vs {compareB.sectionAnalysis?.experience?.score ?? 0}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-sans">Certifications:</span>
                  <span className="text-slate-200 font-bold">{compareA.sectionAnalysis?.certifications?.score ?? 0} vs {compareB.sectionAnalysis?.certifications?.score ?? 0}</span>
                </div>
              </div>
            </div>

          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start space-x-2.5 text-xs text-slate-350 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-slate-200 mb-0.5">Benchmarking insight:</p>
              <span>The multivariable optimization shows a clear shift. Resolving target project descriptions and action verbs can account for delta improvements. Use the AI Career Coach to draft final refinements.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
