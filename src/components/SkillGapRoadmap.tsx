import React, { useState } from "react";
import { BookOpen, HelpCircle, Award, Target, FolderOpen, ArrowRight, TrendingUp } from "lucide-react";
import { ResumeAnalysisResult } from "../types";

interface SkillGapRoadmapProps {
  data: ResumeAnalysisResult;
}

export default function SkillGapRoadmap({ data }: SkillGapRoadmapProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const defaultSkillGap = [
    { name: "Python Programming", level: 95, status: "matched" },
    { name: "Machine Learning (Math)", level: 80, status: "matched" },
    { name: "Docker Orchestration", level: 40, status: "missing" },
    { name: "Kubernetes Orchestration", level: 25, status: "missing" },
    { name: "Cloud Operations (AWS/GCP)", level: 35, status: "recommended" }
  ];

  const skillGaps = data.skillGapList || defaultSkillGap;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "matched":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "missing":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "recommended":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Structural layout: Skills Gap vs Career Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Skills Gap with Interactive Progress Bars */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-6">
          <div>
            <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
              <Target className="w-5 h-5 text-brand-primary" />
              <span>Target Role Skill Gap Analysis</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Based on specialized requirements for a <span className="text-brand-accent font-medium">{data.targetRole || "target role"}</span>. Adjust your portfolio stack focus accordingly.
            </p>
          </div>

          <div className="space-y-5">
            {skillGaps.map((skill) => (
              <div
                key={skill.name}
                className="space-y-2 p-3 rounded-xl hover:bg-slate-800/20 transition-all border border-transparent hover:border-slate-800"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full border ${getStatusColor(skill.status)}`}>
                      {skill.status}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {skill.level}% {skill.status === "matched" ? "Ready" : "Cap"}
                    </span>
                  </div>
                </div>

                {/* Micro Animated Progress Bar */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden relative border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      skill.status === "matched"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : skill.status === "missing"
                        ? "bg-gradient-to-r from-red-500 to-rose-600"
                        : "bg-gradient-to-r from-yellow-500 to-amber-600"
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs text-slate-400 leading-relaxed">
            💡 <strong className="text-indigo-300">Strategy:</strong> Leverage recommended tools in your portfolio projects. Even minor exposure can prevent pre-screening filters from immediately disqualifying your resume.
          </div>
        </div>

        {/* Right Side: Career Recommendation Engine */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-6">
          <div>
            <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-brand-secondary" />
              <span>AI Career Recommendation Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Targeted growth pathways generated under the hood by examining typical credential matrices for similar veteran profiles.
            </p>
          </div>

          {/* List recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Certifications and Projects */}
            <div className="space-y-4">
              
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-brand-accent" />
                  <span>Suggested Certifications</span>
                </span>
                <div className="space-y-1.5">
                  {data.recommendations?.certifications?.map((cert, idx) => (
                    <div key={idx} className="text-xs text-slate-400 flex items-start space-x-1">
                      <span className="text-slate-500">•</span>
                      <span>{cert}</span>
                    </div>
                  )) || <span className="text-xs text-slate-500 italic">No recommendations</span>}
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
                  <FolderOpen className="w-4 h-4 text-coral" />
                  <span>Resume Projects Portfolio focus</span>
                </span>
                <div className="space-y-1.5">
                  {data.recommendations?.projects?.map((proj, idx) => (
                    <div key={idx} className="text-xs text-slate-400 flex items-start space-x-1">
                      <span className="text-slate-500">•</span>
                      <span>{proj}</span>
                    </div>
                  )) || <span className="text-xs text-slate-500 italic">No recommendations</span>}
                </div>
              </div>

            </div>

            {/* Courses and Alternative roles */}
            <div className="space-y-4">
              
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Learning paths</span>
                </span>
                <div className="space-y-1.5">
                  {data.recommendations?.courses?.map((course, idx) => (
                    <div key={idx} className="text-xs text-slate-400 flex items-start space-x-1">
                      <span className="text-slate-500">•</span>
                      <span>{course}</span>
                    </div>
                  )) || <span className="text-xs text-slate-500 italic">No recommendations</span>}
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <span>Alternative career options</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.recommendations?.roles?.map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-md"
                    >
                      {role}
                    </span>
                  )) || <span className="text-xs text-slate-500 italic">No recommendations</span>}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Upward Career Learning Timeline Roadmap */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
        <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2 mb-6">
          <BookOpen className="w-5 h-5 text-brand-secondary animate-pulse" />
          <span>Personalized Career Upskilling Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Timeline separator lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          
          {data.roadmap?.map((phase, idx) => (
            <div
              key={idx}
              className="relative p-5 bg-slate-950/80 rounded-xl border border-slate-800 z-10 hover:border-brand-primary/50 hover:bg-slate-950 transition-all duration-300 space-y-3"
            >
              {/* Timeline bubble */}
              <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-brand-primary hover:border-brand-accent flex items-center justify-center text-xs font-bold font-mono text-brand-primary group-hover:scale-115 transition-transform">
                0{idx + 1}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200">{phase.title || `Phase ${idx + 1}`}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{phase.description}</p>
              </div>

              {/* Skills covered in this phase */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">Priority Learnings:</span>
                <div className="flex flex-wrap gap-1">
                  {Array.from(new Set(phase.skills || [])).map((sk, idx) => (
                    <span
                      key={`${sk}-${idx}`}
                      className="text-[9px] px-2 py-0.5 bg-slate-900 border border-slate-800/80 text-brand-accent rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
