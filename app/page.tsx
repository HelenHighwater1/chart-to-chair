import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MedicalTranslator from "@/components/MedicalTranslator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-indigo-600"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <MedicalTranslator />
      </main>
      <Footer />
    </div>
  );
}
