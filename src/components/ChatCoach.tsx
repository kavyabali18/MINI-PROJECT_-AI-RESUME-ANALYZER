import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, LogIn, ChevronRight, User2, Bot } from "lucide-react";
import { ChatMessage, ResumeAnalysisResult } from "../types";

interface ChatCoachProps {
  activeAnalysis: ResumeAnalysisResult | null;
}

const CONVERSATION_SUGGESTIONS = [
  "Rewrite my professional summary for higher ATS impact.",
  "How can I format experience bullets with the Google X-Y-Z formula?",
  "What is the single biggest skill gap I should tackle first?",
  "Recommend 3 specific course titles to boost my resume ranking."
];

export default function ChatCoach({ activeAnalysis }: ChatCoachProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome_msg",
      role: "assistant",
      content: `Hello! I'm your premium **AI Career Coach**. I have loaded your analyzed resume details and target role information. 

Ask me anything about:
- Crucial technical skills or certifications to pursue.
- Interactive mock interview preparation for this role.
- Redrafting your custom bullet points with professional metrics.
- Overcoming general ATS formatting filters.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Math.random().toString(36).substring(2, 11),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          activeAnalysis
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact the chatbot service.");
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: "msg_" + Math.random().toString(36).substring(2, 11),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: "error_msg",
          role: "assistant",
          content: "Sorry, I ran into a minor networking complication. Please verify your GEMINI_API_KEY environment variable is configured correctly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Helper to parse double asterisks and bullet points to inline components
  const formatMarkdownText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      let content: React.ReactNode = line;

      // Code Block formatting
      if (line.startsWith("```")) {
        return null; // Skip backticks inside standard parsing
      }

      // Strong formatting (double asterisks)
      const parts = line.split("/**/").join("").split("**");
      if (parts.length > 1) {
        content = parts.map((part, i) => {
          if (i % 2 === 1) {
            return <strong key={i} className="text-white font-semibold">{part}</strong>;
          }
          return part;
        });
      }

      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="list-disc ml-5 text-xs text-slate-300 leading-relaxed my-1">
            {bulletText.split("**").map((p, i) => (i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{p}</strong> : p))}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed my-1.5 min-h-[1em]">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Elite Career Co-Pilot</h4>
            <span className="text-[10px] font-mono text-green-400">Contextual Engine Loaded</span>
          </div>
        </div>
        {activeAnalysis && (
          <div className="text-right text-[10px] text-slate-400 truncate max-w-xs font-mono">
            Analyzing: <span className="text-brand-accent truncate max-w-[80px] inline-block">{activeAnalysis.fileName}</span>
          </div>
        )}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isAssistant = message.role === "assistant";
          return (
            <div
              key={message.id}
              className={`flex items-start space-x-2.5 ${!isAssistant ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              {/* Avatar icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 border ${
                  isAssistant
                    ? "bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary"
                    : "bg-slate-850 border-slate-700 text-slate-300"
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User2 className="w-4 h-4" />}
              </div>

              {/* Text Bubble */}
              <div className="space-y-1 max-w-[80%]">
                <div
                  className={`p-3.5 rounded-2xl border text-slate-200 ${
                    isAssistant
                      ? "bg-slate-950/60 border-slate-800/80 rounded-tl-none"
                      : "bg-brand-primary/80 border-brand-primary/95 text-white rounded-tr-none"
                  }`}
                >
                  {isAssistant ? (
                    <div className="space-y-0.5">{formatMarkdownText(message.content)}</div>
                  ) : (
                    <p className="text-xs leading-relaxed">{message.content}</p>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-500 px-1 inline-block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        {isSending && (
          <div className="flex items-start space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary animate-bounce">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl rounded-tl-none max-w-[8em]">
              <div className="flex space-x-1.5 items-center justify-center h-4">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts checklist */}
      {messages.length === 1 && (
        <div className="p-3 bg-slate-950/60 border-t border-slate-850 space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center space-x-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-brand-accent animate-pulse" />
            <span>Recommended Coach starters:</span>
          </span>
          <div className="flex flex-col space-y-1">
            {CONVERSATION_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-[11px] text-slate-300 hover:text-brand-accent hover:bg-slate-900 text-left px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/40 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder={activeAnalysis ? "Ask about skills, certificates, resume bullet prep..." : "Upload a resume to initialize the coach..."}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-slate-200 focus:outline-none focus:border-brand-primary text-xs transition-colors"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isSending}
          className={`p-2.5 rounded-xl text-white transition-all ${
            !inputVal.trim() || isSending
              ? "bg-slate-800 text-slate-400 cursor-not-allowed"
              : "bg-brand-primary hover:bg-brand-secondary shadow-[0_0_10px_rgba(79,70,229,0.2)]"
          }`}
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
