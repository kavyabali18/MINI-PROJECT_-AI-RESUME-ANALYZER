import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ResumeAnalysisResult } from "../types";

interface AnalyticsChartsProps {
  data: ResumeAnalysisResult;
}

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  // 1. Data for Section Scores
  const sectionScoresData = [
    { name: "Education", Score: data.sectionAnalysis?.education?.score ?? 80 },
    { name: "Skills", Score: data.sectionAnalysis?.skills?.score ?? 85 },
    { name: "Projects", Score: data.sectionAnalysis?.projects?.score ?? 75 },
    { name: "Experience", Score: data.sectionAnalysis?.experience?.score ?? 70 },
    { name: "Certifications", Score: data.sectionAnalysis?.certifications?.score ?? 65 }
  ];

  // 2. Data for Keyword Matches Pie Chart
  const keywordsPieData = [
    { name: "Tech Keywords Found", value: data.keywordsFound?.length ?? 1, color: "#10B981" },
    { name: "Tech Keywords Missing", value: data.keywordsMissing?.length ?? 1, color: "#EF4444" },
    { name: "Soft Keywords Found", value: data.professionalKeywordsFound?.length ?? 1, color: "#3B82F6" },
    { name: "Soft Keywords Missing", value: data.professionalKeywordsMissing?.length ?? 1, color: "#F59E0B" }
  ];

  const totalKeywords = keywordsPieData.reduce((acc, curr) => acc + curr.value, 0);

  // 3. Data for Career Growth Radar (Competency Mapping)
  const radarData = [
    { subject: "Technical Align", A: data.sectionAnalysis?.skills?.score ?? 80, fullMark: 100 },
    { subject: "Project Impact", A: data.sectionAnalysis?.projects?.score ?? 75, fullMark: 100 },
    { subject: "Leadership / Soft", A: data.professionalKeywordsFound?.length * 15 > 100 ? 100 : Math.max(50, data.professionalKeywordsFound?.length * 15), fullMark: 100 },
    { subject: "ATS Formatting", A: data.atsScore ?? 80, fullMark: 100 },
    { subject: "Experience Weight", A: data.sectionAnalysis?.experience?.score ?? 70, fullMark: 100 },
    { subject: "Role Match", A: data.jobMatchScore ?? 85, fullMark: 100 }
  ];

  const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B"];

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Resume Section Scores Bar */}
        <div className="p-6 bg-[#0d0720]/80 border border-white/10 rounded-2xl backdrop-blur-md">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center justify-between">
            <span>Resume Section Evaluation</span>
            <span className="text-xs font-mono text-[#7C3AED]">Out of 100</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionScoresData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d0720", borderColor: "rgba(255,255,255,0.1)" }}
                  labelStyle={{ color: "#f8fafc", fontWeight: "bold" }}
                  itemStyle={{ color: "#4F46E5" }}
                />
                <Bar dataKey="Score" radius={[4, 4, 0, 0]}>
                  {sectionScoresData.map((entry, index) => {
                    const color = entry.Score >= 80 ? "#10B981" : entry.Score >= 65 ? "#4F46E5" : "#EF4444";
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Competency Alignment Radar */}
        <div className="p-6 bg-[#0d0720]/80 border border-white/10 rounded-2xl backdrop-blur-md">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center justify-between">
            <span>Career Competency Alignment</span>
            <span className="text-xs font-mono text-[#7C3AED]">Target Specifics</span>
          </h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" fontSize={10} />
                <Radar
                   name="Candidate Level"
                   dataKey="A"
                   stroke="#7c3aed"
                   fill="#7c3aed"
                   fillOpacity={0.25}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d0720", borderColor: "rgba(255,255,255,0.1)" }}
                  itemStyle={{ color: "#a78bfa" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Ats Keyword Optimization Distribution (Pie) */}
        <div className="p-6 bg-[#0d0720]/80 border border-white/10 rounded-2xl backdrop-blur-md">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center justify-between">
            <span>ATS Keyword Proportion</span>
            <span className="text-xs font-mono text-[#7C3AED]">Intersection</span>
          </h4>
          <div className="h-64 flex flex-col justify-center">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={keywordsPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {keywordsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0d0720", borderColor: "rgba(255,255,255,0.1)" }}
                    itemStyle={{ color: "#f8fafc" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mt-2">
              {keywordsPieData.map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5 truncate">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name} ({Math.round((item.value / totalKeywords) * 100) || 0}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
