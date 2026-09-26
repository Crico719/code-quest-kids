import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CodeBlock, Shell } from "@/components/Shell";
import { getLesson, lessons } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/leccion/$id")({
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Lección no encontrada" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.lesson.title} — CodeLab Joven`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.lesson.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.lesson.summary },
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const { completeLesson } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const next = lessons.find((l) => l.num === lesson.num + 1);
  const answered = Object.keys(answers).length;
  const correct = lesson.questions.filter((q, i) => answers[i] === q.answer).length;

  const finish = () => {
    setFinished(true);
    completeLesson(lesson.id, correct * 10);
  };

  return (
    <Shell key={lesson.id}>
      <Link to="/" className="font-mono text-sm text-muted-foreground hover:text-foreground">← todas las lecciones</Link>
      <h1 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">{lesson.emoji} {lesson.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{lesson.summary}</p>

      <div className="mt-8 space-y-6">
        {lesson.sections.map((s, i) => (
          <section key={i} className="brutal rounded-2xl bg-card p-6">
            <h2 className="font-display text-xl font-bold"><span className="font-mono text-primary">{i + 1}.</span> {s.title}</h2>
            <p className="mt-2 leading-relaxed">{s.text}</p>
            {s.code && <div className="mt-4"><CodeBlock code={s.code} /></div>}
          </section>
        ))}

        <section className="brutal rounded-2xl bg-accent p-6 text-accent-foreground">
          <p className="font-mono text-xs font-bold">📐 TEOREMA</p>
          <h2 className="font-display text-2xl font-extrabold">{lesson.theorem.name}</h2>
          <p className="mt-2 text-lg">{lesson.theorem.statement}</p>
        </section>
      </div>

      <h2 className="mt-12 font-display text-3xl font-extrabold">✏️ Actividades</h2>
      <div className="mt-4 space-y-5">
        {lesson.questions.map((q, qi) => {
          const picked = answers[qi];
          const has = picked !== undefined;
          return (
            <div key={qi} className="brutal rounded-2xl bg-card p-6">
              <p className="font-bold">{qi + 1}. {q.q}</p>
              {q.code && <div className="mt-3"><CodeBlock code={q.code} /></div>}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((o, oi) => {
                  let cls = "bg-background hover:bg-muted";
                  if (has && oi === q.answer) cls = "bg-success text-primary-foreground";
                  else if (has && oi === picked) cls = "bg-destructive text-destructive-foreground";
                  return (
                    <button key={oi} disabled={has} onClick={() => setAnswers({ ...answers, [qi]: oi })} className={`brutal-sm rounded-xl px-4 py-2.5 text-left font-mono text-sm ${cls}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {has && <p className="mt-3 text-sm">{picked === q.answer ? "✅ ¡Correcto! " : "❌ Casi. "}{q.why}</p>}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {!finished ? (
          <button disabled={answered < lesson.questions.length} onClick={finish} className="brutal rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-40">
            Terminar lección
          </button>
        ) : (
          <>
            <p className="brutal-sm rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground">🎉 {correct}/{lesson.questions.length} correctas · +{correct * 10} XP</p>
            {next ? (
              <Link to="/leccion/$id" params={{ id: next.id }} className="brutal rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">Siguiente: {next.title} →</Link>
            ) : (
              <Link to="/juegos" className="brutal rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">¡Ruta completa! A jugar 🎮</Link>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}
