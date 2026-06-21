import React, { useState } from "react";
import { Sparkles, ArrowRightLeft, Copy, Check, CornerDownRight, RotateCcw } from "lucide-react";

export default function RewriteTool() {
  const [inpBullet, setInpBullet] = useState("");
  const [tone, setTone] = useState("Metrics-focused (Google X-Y-Z)");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inpBullet.trim()) return;

    setIsLoading(true);
    setResult("");
    setCopied(false);

    try {
      // Direct call to our backend chat-coach proxy, or we can use custom routing
      const response = await fetch("/api/chat-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please rewrite the following resume bullet point to make it extremely strong, professional, and matching target recruitment bars. 
Rewrite under tone/style: ${tone}. 
If Metric/Google X-Y-Z is set, strictly format it with: "Accomplished [X] as measured by [Y], by doing [Z]".
Provide 2 strong alternative versions.

Bullet to rewrite: "${inpBullet}"`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Bullet optimizer is sleeping.");
      }

      const data = await response.json();
      setResult(data.reply);
    } catch (err) {
      setResult("Failed to automatically rewrite this bullet point. Please verify your internet alignment and secrets setup.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInpBullet("");
    setResult("");
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-6">
      
      <div>
        <h3 className="text-base font-semibold text-slate-200 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-brand-secondary animate-pulse" />
          <span>Interactive AI Resume Section & Bullet Rewriter</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Weak resume bullet descriptions lead to rejection. Paste standard phrases below (e.g. "I built landing pages") and turn them into highly quantified achievement metrics.
        </p>
      </div>

      <form onSubmit={handleRewrite} className="space-y-4">
        
        {/* Bullet input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block uppercase font-mono">My Weak Experience Bullet Point</label>
          <textarea
            rows={3}
            value={inpBullet}
            onChange={(e) => setInpBullet(e.target.value)}
            placeholder="e.g. Worked with React on the main website to design dashboards and add features..."
            required
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-brand-accent text-xs resize-none"
          ></textarea>
        </div>

        {/* Tone and options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 block uppercase font-mono">Optimization Strategy</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-brand-primary text-xs"
            >
              <option>Metrics-focused (Google X-Y-Z Formula)</option>
              <option>Action-oriented (Strong verb index)</option>
              <option>Leadership & Scale representation</option>
              <option>Strictly Concise (Space optimization)</option>
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              type="submit"
              disabled={isLoading || !inpBullet.trim()}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors text-white ${
                isLoading || !inpBullet.trim()
                  ? "bg-slate-800 text-slate-450 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 shadow-lg shadow-brand-primary/15"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Rebuilding stack...</span>
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>Execute AI Rewrite</span>
                </>
              )}
            </button>
            
            {(inpBullet || result) && (
              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
                title="Reset rewriter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </form>

      {/* Result presentation area */}
      {result && (
        <div className="p-4 bg-slate-950 rounded-xl border border-brand-primary/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center space-x-1.5 uppercase">
              <CornerDownRight className="w-3.5 h-3.5 text-brand-accent" />
              <span>Optimized Alternatives</span>
            </span>
            <button
              onClick={handleCopyResult}
              className="text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 px-2.5 py-1 rounded border border-slate-800 flex items-center space-x-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-900">
            {result}
          </div>
        </div>
      )}

    </div>
  );
}
