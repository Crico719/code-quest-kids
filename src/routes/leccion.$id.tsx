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
    const t = `${loaderData.lesson.title} — Code Quest Kids`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.lesson.summary },
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
  
  const next = lessons.find((l) => l.id === lesson.id + 1);
  const quiz = lesson.sections.find(s => s.type === 'quiz');
  const answered = Object.keys(answers).length;
  const correct = quiz ? (answers[0] === quiz.correctAnswer ? 1 : 0) : 0;

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
        {lesson.sections.map((s, i) => {
          if (s.type === 'quiz') return null;
          return (
            <section key={i} className={`brutal rounded-2xl p-6 ${s.type === 'challenge' ? 'bg-accent text-accent-foreground' : 'bg-card'}`}>
              <h2 className="font-display text-xl font-bold">
                <span className="font-mono text-primary">{s.type === 'explanation' ? '📖' : s.type === 'example' ? '💻' : '🧩'} {s.type === 'explanation' ? 'Explicación' : s.type === 'example' ? 'Ejemplo' : 'Reto'}:</span>
              </h2>
              <p className="mt-2 leading-relaxed">{s.content || s.instruction}</p>
              {s.code && <div className="mt-4"><CodeBlock code={s.code} /></div>}
              {s.starterCode && <div className="mt-4"><CodeBlock code={s.starterCode} /></div>}
            </section>
          );
        })}
      </div>

      {quiz && (
        <div className="mt-12">
          <h2 className="font-display text-3xl font-extrabold mb-4">✅ Repaso rápido</h2>
          <div className="brutal rounded-2xl bg-card p-6">
            <p className="font-bold">{quiz.question}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {quiz.options.map((o, oi) => {
                let cls = "bg-background hover:bg-muted";
                if (answers[0] !== undefined && oi === quiz.correctAnswer) cls = "bg-success text-primary-foreground";
                else if (answers[0] !== undefined && oi === answers[0]) cls = "bg-destructive text-destructive-foreground";
                return (
                  <button key={oi} disabled={answers[0] !== undefined} onClick={() => setAnswers({ 0: oi })} className={`brutal-sm rounded-xl px-4 py-2.5 text-left font-mono text-sm ${cls}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {!finished ? (
          <button disabled={answered === 0 && quiz} onClick={finish} className="brutal rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-40">
            Terminar lección
          </button>
        ) : (
          <>
            <p className="brutal-sm rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground">🎉 {correct}/{quiz ? 1 : 0} correctas · +{correct * 10} XP</p>
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
