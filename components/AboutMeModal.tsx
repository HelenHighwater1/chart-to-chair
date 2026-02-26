"use client";

import { useEffect, useRef, useCallback } from "react";

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutMeModal({ isOpen, onClose }: AboutMeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="About Helen"
    >
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close dialog"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="5" y1="5" x2="15" y2="15" />
            <line x1="15" y1="5" x2="5" y2="15" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900">
          Hi, I&apos;m Helen!
        </h2>

        <div className="mt-4 space-y-3 leading-relaxed text-gray-600">
          <p>
            I built this project as part of my application to{" "}
            <span className="font-medium text-moss-600">Citizen Health</span>.
          </p>
          <p>
            I&apos;m passionate about using technology to help families navigate
            complex healthcare systems. This tool demonstrates the kind of
            AI-powered, patient-friendly experience I&apos;d love to help
            build — translating medical complexity into clarity and empowerment.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://heyimhelen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-moss-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-moss-700"
          >
            Visit my website
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 1h7v7" />
              <path d="M13 1L1 13" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
