import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-4xl font-bold">{site.name}</h1>
      <p className="text-muted">{site.tagline}</p>
    </main>
  );
}