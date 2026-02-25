"use client";

import { useState } from "react";
import AboutMeModal from "./AboutMeModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800">
              Helen{" "}
              <span className="text-gray-300">·</span>{" "}
              <span className="text-indigo-600">for Citizen Health</span>
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-indigo-200 px-4 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
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
