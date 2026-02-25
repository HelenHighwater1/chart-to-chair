"use client";

import { useMemo, useState } from "react";
import LoadingDots from "./LoadingDots";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
      aria-label={label}
    >
      {copied ? (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <path d="M8 4V2.5A1.5 1.5 0 006.5 1h-4A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

interface ResultsPanelProps {
  result: string;
  isLoading: boolean;
  isComplete: boolean;
  onReset: () => void;
}

export default function ResultsPanel({
  result,
  isLoading,
  isComplete,
  onReset,
}: ResultsPanelProps) {
  const { explanation, questions } = useMemo(() => {
    const marker = "## Questions";
    const idx = result.indexOf(marker);
    if (idx === -1) {
      return { explanation: result, questions: "" };
    }
    return {
      explanation: result.substring(0, idx).trim(),
      questions: result.substring(idx).trim(),
    };
  }, [result]);

  const cleanExplanation = explanation
    .replace(/^## What This Means in Plain Language\s*/i, "")
    .trim();

  const cleanQuestions = questions
    .replace(/^## Questions[^\n]*\n*/i, "")
    .trim();

  if (isLoading && !result) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 py-12">
        <LoadingDots />
        <p className="text-sm text-gray-400">
          Translating your medical record…
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6" aria-live="polite">
      {cleanExplanation && (
        <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              In Plain Language
            </h2>
            {isComplete && (
              <CopyButton text={cleanExplanation} label="Copy explanation" />
            )}
          </div>
          <div className="space-y-3">
            {cleanExplanation.split("\n\n").map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      )}

      {cleanQuestions && (
        <article className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-6 shadow-sm animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Questions for Your Next Visit
            </h2>
            {isComplete && (
              <CopyButton text={cleanQuestions} label="Copy questions" />
            )}
          </div>
          <div className="space-y-2">
            {cleanQuestions
              .split("\n")
              .filter((line) => line.trim())
              .map((question, i) => (
                <p key={i} className="leading-relaxed text-gray-600">
                  {question}
                </p>
              ))}
          </div>
        </article>
      )}

      {isLoading && result && (
        <div className="flex justify-center">
          <LoadingDots />
        </div>
      )}

      {isComplete && (
        <div className="flex justify-center pt-2">
          <button
            onClick={onReset}
            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
          >
            &larr; Translate another record
          </button>
        </div>
      )}
    </div>
  );
}
