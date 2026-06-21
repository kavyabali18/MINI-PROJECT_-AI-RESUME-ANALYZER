import React, { useState, useRef } from "react";
import { Upload, FileText, Sparkles, AlertCircle, Trash2, Code2, Layers } from "lucide-react";

interface UploadAreaProps {
  onAnalyze: (payload: {
    pdfBase64: string;
    fileContent: string;
    fileName: string;
    targetRole: string;
    industry: string;
    experienceLevel: string;
    jobDescription: string;
  }) => void;
  isLoading: boolean;
}

const PRESET_ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "Cybersecurity Analyst",
  "Cloud Engineer",
  "DevOps Engineer",
  "Product Manager",
  "Mobile Developer",
  "Systems Architect"
];

const INDUSTRIES = [
  "Information Technology",
  "Finance & Banking",
  "Healthcare & Biotech",
  "E-Commerce & Retail",
  "Education Tech",
  "Consulting",
  "Media & Entertainment",
  "Aerospace & Defense"
];

const EXPERIENCE_LEVELS = [
  "Fresher",
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead / Architect",
  "Director / Executive"
];

export default function UploadArea({ onAnalyze, isLoading }: UploadAreaProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState(PRESET_ROLES[0]);
  const [customRole, setCustomRole] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[2]);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    const validTypes = ["application/pdf", "text/plain"];
    const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();
    
    if (!validTypes.includes(uploadedFile.type) && fileExtension !== "pdf" && fileExtension !== "txt") {
      setError("Please upload a PDF document or TXT file.");
      return;
    }
    
    // Check file size (limit to 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError("File is too large. Please select a resume smaller than 10MB.");
      return;
    }

    setFile(uploadedFile);
  };

  const triggerSearch = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a resume file to analyze.");
      return;
    }

    setError(null);
    const finalRole = customRole.trim() !== "" ? customRole.trim() : targetRole;

    try {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result as string;
          onAnalyze({
            pdfBase64: base64String,
            fileContent: "",
            fileName: file.name,
            targetRole: finalRole,
            industry,
            experienceLevel,
            jobDescription
          });
        };
        reader.onerror = () => {
          setError("Error reading the PDF file. Please try again.");
        };
      } else {
        // Plain text file
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          onAnalyze({
            pdfBase64: "",
            fileContent: reader.result as string,
            fileName: file.name,
            targetRole: finalRole,
            industry,
            experienceLevel,
            jobDescription
          });
        };
        reader.onerror = () => {
          setError("Error reading the text file.");
        };
      }
    } catch (err: any) {
      setError("An unexpected error occurred during file preprocessing: " + err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: File Uploader */}
        <div className="relative group">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cursor-pointer transition-all duration-300 border-2 border-dashed rounded-2xl p-8 text-center bg-[#0d0720]/50 backdrop-blur-md ${
              isDragging
                ? "border-indigo-500 bg-indigo-950/20 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                : file
                ? "border-green-500/60 bg-green-950/5"
                : "border-white/10 hover:border-indigo-500/50 hover:bg-[#0d0720]/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.txt"
              className="hidden"
            />

            {!file ? (
              <div className="space-y-4" onClick={triggerSearch}>
                <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors duration-300">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-200">
                    Drag and drop your resume here, or <span className="text-indigo-400 group-hover:underline">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports high-fidelity PDF and TXT formats (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl max-w-2xl mx-auto border border-white/10">
                <div className="flex items-center space-x-3 text-left">
                  <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 truncate max-w-md">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {(file.size / 1024).toFixed(1)} KB • Ready for AI Parsing
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Step 2: Meta Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">Target Job Role</label>
            <select
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
                setCustomRole("");
              }}
              className="w-full px-4 py-3 bg-[#0d0720] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all text-ellipsis"
            >
              {PRESET_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
              <option value="other">-- Custom Role --</option>
            </select>
            {targetRole === "other" && (
              <input
                type="text"
                placeholder="Enter custom role..."
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 bg-[#0d0720] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">Industry Sector</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0720] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0720] border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

         {/* Step 3: Job Description Matching (Optional, but highly recommended) */}
        <div className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-200 block flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Target Job Description (Optional)</span>
            </label>
            <span className="text-xs text-slate-400">Enables high-accuracy match percentage & keywords optimization</span>
          </div>
          <textarea
            rows={5}
            placeholder="Paste target job listing description here to simulate professional ATS matcher scanning (requirements, duties, tech stack)..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 bg-[#0d0720]/70 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isLoading || !file}
            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all text-white shadow-lg ${
              isLoading || !file
                ? "bg-white/5 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338ca] hover:to-[#6d28d9] hover:brightness-110 active:scale-[0.98] shadow-indigo-500/20 hover:shadow-indigo-500/30"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing Portfolio Elements with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>Optimize Resume with Career Intelligence</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
