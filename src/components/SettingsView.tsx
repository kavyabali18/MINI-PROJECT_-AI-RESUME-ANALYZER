import React from "react";
import { Settings, CreditCard, Shield, Globe, Terminal, RefreshCw, Sparkles } from "lucide-react";

export default function SettingsView() {
  const handleClearCache = () => {
    localStorage.removeItem("resume_analyzer_history");
    alert("Local history storage cache cleared successfully.");
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-350">
      
      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation / List */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-4 px-2">Settings Sections</span>
          
          <button className="w-full text-left px-3 py-2 bg-white/5 border border-white/10 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-[0_0_12px_rgba(79,70,229,0.1)]">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Account Security</span>
          </button>
          
          <button className="w-full text-left px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-355 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all">
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span>Premium Subscription</span>
          </button>
          
          <button className="w-full text-left px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-355 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>Integrations (Workday, Taleo, Greenhouse)</span>
          </button>
        </div>

        {/* Content detail panel */}
        <div className="md:col-span-2 p-6 bg-[#0d0720]/80 border border-white/10 rounded-2xl backdrop-blur-md space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-slate-200 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              <span>SaaS Platform Configurations</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Verify your premium account profile details, system credentials, and cloud caching preferences.
            </p>
          </div>

          {/* Account Tier */}
          <div className="p-4 bg-gradient-to-br from-[#4F46E5]/15 to-[#7C3AED]/15 border border-[#4F46E5]/30 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase block tracking-wider font-extrabold">Active Subscription tier</span>
              <span className="text-sm font-bold text-slate-200 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>Enterprise Suite Life Plan</span>
              </span>
              <p className="text-xs text-slate-400">Unlimited scans, structural formatting simulation, and 1:1 Gemini career advisor coaching.</p>
            </div>
            
            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-sans font-extrabold uppercase rounded-full">
              Active Privilege
            </span>
          </div>

          {/* Developer Credentials */}
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-300 block uppercase font-mono tracking-wider">System credentials</span>
            
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">Hiring Workspace URL</label>
                <input
                   type="text"
                   readOnly
                   value="https://rezi-scan-prod-secure.ai.studio/workplace/kavyabali2006"
                   className="w-full p-2.5 bg-[#0d0720] border border-white/10 rounded-xl text-slate-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium font-sans block flex items-center justify-between">
                  <span>Gemini Secrets Integration State</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded">PROVISIONED</span>
                </label>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  The API token is safely fetched server-side from your protected **Secrets Panel**. Do not place raw keys inside browser files to secure your cloud limits.
                </p>
              </div>
            </div>
          </div>

          {/* Destructive clearance */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-300 block">Clear analysis history</span>
              <p className="text-[10px] text-slate-400">Purge local history, comparisons, and cached profile scans.</p>
            </div>

            <button
              onClick={handleClearCache}
              type="button"
              className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Purge Cache</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
