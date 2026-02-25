"use client";

import { useState, useRef } from "react";
import TranslateForm from "./TranslateForm";
import ResultsPanel from "./ResultsPanel";

export default function MedicalTranslator() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleTranslate() {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setResult("");
    setIsComplete(false);
    setError("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to translate. Please try again.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream available.");

      const decoder = new TextDecoder();

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setResult((prev) => prev + chunk);
      }

      setIsComplete(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setInputText("");
    setResult("");
    setIsComplete(false);
    setError("");
  }

  const showForm = !result && !isLoading;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-16">
      {showForm && (
        <TranslateForm
          inputText={inputText}
          setInputText={setInputText}
          onTranslate={handleTranslate}
          isLoading={isLoading}
        />
      )}

      <div ref={resultsRef}>
        {(isLoading || result) && (
          <ResultsPanel
            result={result}
            isLoading={isLoading}
            isComplete={isComplete}
            onReset={handleReset}
          />
        )}
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
          <button
            onClick={handleReset}
            className="ml-2 font-medium underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
