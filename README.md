# AI Resume Analyzer

## Overview

AI Resume Analyzer is a full-stack web application that leverages Google Gemini AI to evaluate resumes, provide ATS compatibility analysis, identify skill gaps, and deliver personalized career recommendations. The platform helps users optimize their resumes for specific job roles through intelligent feedback and data-driven insights.

## Features

* AI-powered resume analysis
* ATS score evaluation
* Resume quality scoring
* Job-role matching and compatibility analysis
* Skill gap identification
* Missing keyword detection
* AI-generated executive summary
* ATS optimization recommendations
* Personalized career guidance
* Learning roadmap suggestions
* Resume bullet point enhancement
* Interactive analytics dashboard
* PDF resume upload support

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API

## Project Structure

```text
src/
├── Components
├── Pages
├── Services
├── Utilities

server.ts
vite.config.ts
package.json
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd ai-resume-analyzer
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
APP_URL=http://localhost:3000
```

4. Run the application

```bash
npm run dev
```

5. Open in browser

```text
http://localhost:3000
```

## How It Works

1. Upload a resume in PDF format.
2. Select target job role and career preferences.
3. AI analyzes resume content using Gemini.
4. ATS compatibility and job-match scores are generated.
5. Skill gaps and missing keywords are identified.
6. Personalized recommendations and career insights are provided.

## Future Enhancements

* Resume comparison module
* Industry-specific analysis
* Interview preparation assistant
* Resume version tracking
* Job recommendation engine
* Multi-language support

## License

This project is intended for educational and portfolio purposes.
