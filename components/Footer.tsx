export default function Footer() {
  return (
    <footer className="mt-auto border-t border-warm-gray-200 py-8">
      <div className="mx-auto max-w-4xl px-6 text-center text-sm text-warm-gray-400">
        Built with care by Helen ·{" "}
        <a
          href="https://github.com/helen/citizen-health-translator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terra-400 transition-colors hover:text-terra-600"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
