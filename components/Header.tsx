"use client";

import { useState } from "react";
import AboutMeModal from "./AboutMeModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-warm-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-terra-900">
              Helen{" "}
              <span className="text-warm-gray-300">·</span>{" "}
              <span className="text-terra-600">for Citizen Health</span>
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-terra-200 px-4 py-1.5 text-sm font-medium text-terra-600 transition-colors hover:bg-terra-50"
          >
            About Me
          </button>
        </div>
      </header>
      <AboutMeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
