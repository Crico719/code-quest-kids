import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { jsLessons } from "@/data/javascript-lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Code Quest Kids — Aprende JavaScript" },
      { name: "description", content: "Aprende programación con JavaScript desde cero para niños y jóvenes." },
    ],
  }),
  component: Index,
});

function Index() {
  const { done } = useProgress();
  const allLessons = jsLessons.flatMap(l => l.lessons);
  const pct = Math.round((done.length / allLessons.length) * 100);

  return (
    <Shell>
      <section className="brutal mb-10 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
        <p className="font-mono text-sm opacity-80">&gt; console.log("¡Hola futuro programador!");</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
          Aventura de <br /> <span className="rounded-lg bg-secondary px-2 text-secondary-foreground">JavaScript</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg opacity-90">Domina el lenguaje de la web con lecciones divertidas, retos y proyectos reales.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/leccion/$id" params={{ id: allLessons[0]!.id }} className="brutal-sm rounded-xl bg-secondary px-5 py-3 font-bold text-secondary-foreground">Empezar Nivel 1 →</Link>
          <Link to="/juegos" className="brutal-sm rounded-xl bg-card px-5 py-3 font-bold text-card-foreground">🎮 Ir a los juegos</Link>
        </div>
      </section>

      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold">Tu Camino Maestro</h2>
        <span className="font-mono text-sm text-muted-foreground">{done.length}/{allLessons.length} · {pct}%</span>
      </div>
      <div className="brutal-sm mb-8 h-4 overflow-hidden rounded-full bg-card">
        <div className="h-full bg-success transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex flex-col gap-10">
        {jsLessons.map((level) => (
          <div key={level.level}>
            <h2 className="mb-5 font-display text-2xl font-bold" style={{ color: level.color === 'green' ? '#2e7d32' : level.color === 'yellow' ? '#fbc02d' : level.color === 'orange' ? '#ef6c00' : '#c62828' }}>
              Nivel {level.level}: {level.title}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {level.lessons.map((l) => {
                const ok = done.includes(l.id);
                return (
                  <Link key={l.id} to="/leccion/$id" params={{ id: l.id }} className="brutal group rounded-2xl bg-card p-6 transition-transform hover:-translate-y-1" style={{ borderLeft: `8px solid ${level.color}` }}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold">
                        {l.id}
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-xs text-muted-foreground">LECCIÓN {l.id}</p>
                        <h3 className="font-display text-xl font-bold">{l.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
                      </div>
                      {ok && <span className="rounded-full bg-success px-2 py-1 text-xs font-bold text-primary-foreground">✓</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
