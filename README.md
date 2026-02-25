# Plain Language Medical Record Translator

**A project by Helen for [Citizen Health](https://www.citizenhealth.io)**

---

Paste a clinical note or lab result and get a clear, jargon-free explanation — plus questions to bring to your next doctor's visit.

This project demonstrates a core piece of what Citizen Health's AI Advocate does: translating medical complexity into clarity and empowerment for patients and families navigating complex conditions.

## Why I Built This

Citizen Health's mission resonates deeply with me — using AI to put patients and families back in control of their healthcare data. This tool is a focused demonstration of that vision: taking intimidating clinical language and making it approachable, warm, and actionable.

It also showcases the skills relevant to the role:

- **React / Next.js** — App Router, server components, client components, streaming
- **API Integration** — Anthropic Claude API with real-time streaming responses
- **Accessibility** — Semantic HTML, ARIA labels, focus trapping, keyboard navigation, screen reader support
- **Design Sensibility** — Warm, empathetic UI inspired by Citizen Health's own design language

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

```bash
git clone https://github.com/helen/citizen-health-translator.git
cd citizen-health-translator
npm install
```

Create a `.env.local` file in the root:

```
ANTHROPIC_API_KEY=your-api-key-here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router + Turbopack)
- **Tailwind CSS v4**
- **Anthropic Claude API** with streaming
- **TypeScript**
- Deployed on **Vercel**

## How It Works

1. Paste a clinical note, lab result, or discharge summary into the text area (or pick a mock data example to see it in action)
2. Click "Translate to Plain Language"
3. The app streams back two sections:
   - **In Plain Language** — a warm, clear explanation at a 6th-grade reading level
   - **Questions for Your Next Visit** — practical questions you can bring to your doctor

The AI is instructed to be honest but reassuring, explain *why* things matter (not just what they are), and never provide medical advice — always encouraging patients to talk to their doctor.

## Project Structure

```
app/
  layout.tsx              Root layout with fonts and metadata
  page.tsx                Single page composing all sections
  globals.css             Tailwind config + custom animations
  api/translate/route.ts  Streaming API route for Claude
components/
  Header.tsx              Sticky header with About Me trigger
  Hero.tsx                Hero section with headline
  MedicalTranslator.tsx   Main client component (state management)
  TranslateForm.tsx       Textarea + sample + submit
  ResultsPanel.tsx        Streaming results with copy buttons
  AboutMeModal.tsx        Modal with focus trap + keyboard dismissal
  LoadingDots.tsx         Calm pulsing dot animation
  Footer.tsx              Footer with GitHub link
lib/
  prompt.ts               System prompt for Claude
  sample-note.ts          Sample CBC lab result for demo
```

## License

MIT
