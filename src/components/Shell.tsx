import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useProgress } from "@/lib/progress";

export function Shell({ children }: { children: ReactNode }) {
  const { xp } = useProgress();
  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-background/95 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <Link to="/" className="font-display text-xl font-extrabold">
            Code<span className="text-primary">Lab</span>_
          </Link>
          <div className="ml-auto flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="rounded-lg px-3 py-1.5 hover:bg-muted" activeOptions={{ exact: true }} activeProps={{ className: "bg-muted" }}>Lecciones</Link>
            <Link to="/juegos" className="rounded-lg px-3 py-1.5 hover:bg-muted" activeProps={{ className: "bg-muted" }}>Juegos</Link>
            <span className="brutal-sm rounded-lg bg-secondary px-3 py-1.5 font-mono">⚡ {xp} XP</span>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-code p-4 font-mono text-sm leading-relaxed text-code-foreground">
      <code>{code}</code>
    </pre>
  );
}
