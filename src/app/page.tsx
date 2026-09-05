import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koopwoningen",
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="grow mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <h1 className="text-2xl font-bold">Koopwoningen</h1>
      <button>test</button>
    </main>
  );
}
