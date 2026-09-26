import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { lessons } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeLab Joven — Aprende a programar desde cero" },
      { name: "description", content: "Lecciones, teoremas, actividades y juegos para aprender programación entre los 13 y 16 años." },
      { property: "og:title", content: "CodeLab Joven — Aprende a programar desde cero" },
      { property: "og:description", content: "Lecciones, teoremas, actividades y juegos para aprender programación." },
    ],
  }),
  component: Index,
});

function Index() {
  const { done } = useProgress();
  const pct = Math.round((done.length / lessons.length) * 100);
  return (
    <Shell>
      <section className="brutal mb-10 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
        <p className="font-mono text-sm opacity-80">&gt; print("hola, futuro programador")</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
          Aprende a programar<br />desde <span className="rounded-lg bg-secondary px-2 text-secondary-foreground">cero</span>.
        </h1>
        <p className="mt-4 max-w-xl text-lg opacity-90">Lecciones cortas, teoremas clave, actividades para practicar y juegos para ganar XP.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/leccion/$id" params={{ id: lessons[0].id }} className="brutal-sm rounded-xl bg-secondary px-5 py-3 font-bold text-secondary-foreground">Empezar lección 1 →</Link>
          <Link to="/juegos" className="brutal-sm rounded-xl bg-card px-5 py-3 font-bold text-card-foreground">🎮 Ir a los juegos</Link>
        </div>
      </section>

      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold">Tu ruta</h2>
        <span className="font-mono text-sm text-muted-foreground">{done.length}/{lessons.length} · {pct}%</span>
      </div>
      <div className="brutal-sm mb-8 h-4 overflow-hidden rounded-full bg-card">
        <div className="h-full bg-success transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {lessons.map((l) => {
          const ok = done.includes(l.id);
          return (
            <Link key={l.id} to="/leccion/$id" params={{ id: l.id }} className="brutal group rounded-2xl bg-card p-6 transition-transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{l.emoji}</span>
                <div className="flex-1">
                  <p className="font-mono text-xs text-muted-foreground">LECCIÓN {l.num}</p>
                  <h3 className="font-display text-xl font-bold">{l.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{l.summary}</p>
                </div>
                {ok && <span className="rounded-full bg-success px-2 py-1 text-xs font-bold text-primary-foreground">✓</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </Shell>
  );
}
