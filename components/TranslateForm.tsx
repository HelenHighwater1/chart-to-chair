"use client";

import { SAMPLE_NOTE } from "@/lib/sample-note";

interface TranslateFormProps {
  inputText: string;
  setInputText: (text: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

export default function TranslateForm({
  inputText,
  setInputText,
  onTranslate,
  isLoading,
}: TranslateFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onTranslate();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="clinical-note" className="sr-only">
          Paste your clinical note or lab result
        </label>
        <textarea
          id="clinical-note"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your clinical note, lab result, or discharge summary here…"
          className="w-full min-h-[220px] rounded-xl border border-gray-200 bg-white p-5 font-mono text-sm leading-relaxed text-gray-800 placeholder:text-gray-400 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-y"
          disabled={isLoading}
          aria-describedby="disclaimer"
        />
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="w-full rounded-full bg-indigo-600 px-8 py-3 font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-sm sm:w-auto"
        >
          Translate to Plain Language
        </button>
        {!inputText.trim() && (
          <button
            type="button"
            onClick={() => setInputText(SAMPLE_NOTE)}
            className="w-full rounded-full border border-indigo-200 px-6 py-3 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 sm:w-auto"
          >
            Try a sample
          </button>
        )}
      </div>

      <p
        id="disclaimer"
        className="text-center text-xs text-gray-400 sm:text-left"
      >
        This tool is for educational purposes only and does not provide medical
        advice.
      </p>
    </form>
  );
}
