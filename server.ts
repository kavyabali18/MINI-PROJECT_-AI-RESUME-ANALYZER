import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Set body limit higher for receiving base64 files
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy instantiator for Gemini Client
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Utility helper to perform robust generation with an automatic failover to 'gemini-3.1-flash-lite'
// in case of transient issues (e.g., 503 UNAVAILABLE or high demand on 'gemini-3.5-flash').
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    model?: string;
  }
) {
  const primaryModel = params.model || "gemini-3.5-flash";
  const models = [primaryModel, "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`Starting content generation with model: ${model}`);
      const response = await ai.models.generateContent({
        ...params,
        model,
      });
      return response;
    } catch (err: any) {
      console.error(`Gemini generation error with model ${model}:`, err);
      lastError = err;

      const isTransient =
        err.status === "UNAVAILABLE" ||
        err.code === 503 ||
        err.statusCode === 503 ||
        (typeof err.message === "string" && (
          err.message.includes("503") ||
          err.message.includes("UNAVAILABLE") ||
          err.message.includes("high demand") ||
          err.message.includes("temporary")
        ));

      if (isTransient) {
        console.warn(`Transient overload detected on ${model}. Retrying with alternate model in 1 second...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      } else {
        throw err;
      }
    }
  }
  throw lastError;
}

// REST API endpoint: Analyze Resume
app.post("/api/analyze", async (req, res) => {
  try {
    const { pdfBase64, fileContent, targetRole, industry, experienceLevel, jobDescription } = req.body;

    if (!targetRole) {
      return res.status(400).json({ error: "Target job role is required." });
    }

    const ai = getGeminiClient();

    // Prepare content parts for Gemini
    const contents: any[] = [];

    if (pdfBase64) {
      // Strip base64 prefix if present
      const cleanBase64 = pdfBase64.replace(/^data:[^;]+;base64,/, "");
      contents.push({
        inlineData: {
          data: cleanBase64,
          mimeType: "application/pdf"
        }
      });
    } else if (fileContent) {
      contents.push({
        text: `--- RESUME RAW TEXT ---\n${fileContent}\n-----------------------`
      });
    } else {
      return res.status(400).json({ error: "Please upload a resume file or paste raw text content." });
    }

    const promptMessage = `
You are ResumeIntellect AI, a premium Applicant Tracking System (ATS) parser, career coach, and veteran hiring manager.
Your task is to analyze the provided resume for constraints and compatibility with the target career role:

- Target Role: ${targetRole}
- Industry: ${industry || "Technology / Professional"}
- Experience Level: ${experienceLevel || "Mid Level"}
${jobDescription ? `- Specific Job Description target:\n"""\n${jobDescription}\n"""` : ""}

Evaluate the resume meticulously, conducting:
1. Parsing of sections (experience, skills, certifications, education, etc.) and evaluating section formatting, impact, and layout quality.
2. Technical & professional keyword presence matching against standard roles in "${industry}" at "${experienceLevel}".
3. Key Skill Gap analysis with specific relative scores for interactive charts.
4. Actionable resume rewriting & optimization suggestions categorized by priority.
5. Personalized learning roadmap and timeline phases.
6. Custom certifications, portfolio projects, courses, and potential career paths to explore.

Return your response strictly as a single JSON object with the following schema:
{
  "overallScore": number (out of 100),
  "atsScore": number (out of 100),
  "jobMatchScore": number (out of 100, if no custom job description is pasted, calculate default relevance for the role),
  "strengthIndicator": string ("Weak" | "Average" | "Good" | "Excellent"),
  "summary": string (a concise 3-4 sentence professional career intelligence summary of this candidate),
  "keywordsFound": string[] (technical keywords found in the resume),
  "keywordsMissing": string[] (important technical skills/keywords relevant for "${targetRole}" that are missing),
  "professionalKeywordsFound": string[] (soft skills or professional actions found like leadership, agile, teamwork),
  "professionalKeywordsMissing": string[] (professional skills or action words missing),
  "keywordMatchPercentage": number (the overall keyword intersection percentage, e.g. 72),
  "missingKeywordsCount": number (total missing keywords),
  "atsOptimizationSuggestions": string[] (actionable system suggestions, e.g., "Add metrics", "Fix file format"),
  "skillGapList": [
    { "name": "Skill Name 1", "level": number (0-100 score), "status": string ("matched" | "missing" | "recommended") },
    ...
  ],
  "roadmap": [
    { "title": string, "duration": string, "skills": string[], "description": string }
  ] (contains 3 phased timeline steps, e.g. Phase 1, Phase 2, Phase 3),
  "recommendations": {
    "skills": string[],
    "certifications": string[],
    "courses": string[],
    "projects": string[] (real-world resume projects that make the resume stand out, with tech stack),
    "roles": string[] (alternative roles to leverage)
  },
  "improvementSuggestions": [
    { "id": string, "title": string, "description": string, "section": string, "priority": string ("High" | "Medium" | "Low") }
  ],
  "sectionAnalysis": {
    "education": { "score": number, "rating": string, "findings": string[], "suggestions": string[] },
    "skills": { "score": number, "rating": string, "findings": string[], "suggestions": string[] },
    "projects": { "score": number, "rating": string, "findings": string[], "suggestions": string[] },
    "experience": { "score": number, "rating": string, "findings": string[], "suggestions": string[] },
    "certifications": { "score": number, "rating": string, "findings": string[], "suggestions": string[] }
  }
}

Do not include any wrapping markdown blocks like \`\`\`json or trailing commentary. Return only the valid JSON parseable string.
`;
contents.unshift({
  text: promptMessage
});
    const response = await generateWithFallback(ai, {
  model: "gemini-3.5-flash",
  contents: contents,
  config: {
    responseMimeType: "application/json",
  }
});

console.log("Gemini response received");
console.log(response.text);

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No analysis response was returned by the AI engine.");
    }

    try {
      const parsedJson = JSON.parse(textOutput.trim());
      // Return with a random generated ID so referencing is pristine
      parsedJson.id = "result_" + Math.random().toString(36).substring(2, 11);
      parsedJson.fileName = req.body.fileName || "Uploaded Resume";
      parsedJson.analyzedAt = new Date().toISOString();
      parsedJson.targetRole = targetRole;
      parsedJson.industry = industry;
      parsedJson.experienceLevel = experienceLevel;
      return res.json(parsedJson);
    } catch (parseErr) {
      console.error("JSON Parsing failed. Output was:", textOutput);
      return res.status(500).json({
        error: "Failed to parse AI output response as structured JSON.",
        rawOutput: textOutput
      });
    }

  } catch (error: any) {
    console.error("Analysis route error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during resume analysis." });
  }
});

// REST API endpoint: AI Chat Career Coach
app.post("/api/chat-coach", async (req, res) => {
  try {
    const { messages, activeAnalysis } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
You are ResumeIntellect AI Coach, an expert elite career strategist, resume optimizer, and technical recruiter.
You are helping the candidate with their resume and their career growth.

You have access to the active resume analysis profile shown below:
${activeAnalysis ? JSON.stringify(activeAnalysis, null, 2) : "No resume has been uploaded yet by the candidate."}

Your goals:
1. Provide extremely practical, specific resume writing advice.
2. When asked to rewrite bullet points, apply the Google x-y-z formula: "Accomplished [X] as measured by [Y], by doing [Z]"
3. Guide them on technical skill acquisition, mock interviews, and certification directions.
4. Keep answers deeply engaging, encouraging, and structured using clean markdown bullets.
`;

    // Map messages payload to Gemini Chat API structure
    // We will use the simple generateContent call with history or the chat client
    // For ease and reliability, we can build a prompt containing the conversation history
    const geminiContents: any[] = [];
    
    // Add context and system prompt
    geminiContents.push({ text: systemInstruction });
    
    // Include conversation history
    messages.forEach((msg: any) => {
      geminiContents.push({
        text: `${msg.role === "user" ? "Candidate" : "Coach"}: ${msg.content}`
      });
    });

    geminiContents.push({ text: "Coach:" });

    const response = await generateWithFallback(ai, {
      model: "gemini-3.5-flash",
      contents: geminiContents,
    });

    const reply = response.text || "I'm processing your query, feel free to ask again.";
    res.json({ reply: reply.trim() });

  } catch (error: any) {
    console.error("Chat Coach route error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred in the chat coach model." });
  }
});

// Setup Vite & Static Assets serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupServer();
