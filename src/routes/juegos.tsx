import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CodeBlock, Shell } from "@/components/Shell";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/juegos")({
  head: () => ({
    meta: [
      { title: "Juegos de programación — CodeLab Joven" },
      { name: "description", content: "Guía al robot, adivina qué imprime el código y ordena programas para ganar XP." },
      { property: "og:title", content: "Juegos de programación — CodeLab Joven" },
      { property: "og:description", content: "Minijuegos para practicar lógica y programación." },
    ],
  }),
  component: Games,
});

type GameId = "robot" | "salida" | "ordena";

function Games() {
  const [game, setGame] = useState<GameId>("robot");
  const tabs: { id: GameId; label: string }[] = [
    { id: "robot", label: "🤖 Robot al tesoro" },
    { id: "salida", label: "⏱️ ¿Qué imprime?" },
    { id: "ordena", label: "🧱 Ordena el código" },
  ];
  return (
    <Shell>
      <h1 className="font-display text-4xl font-extrabold md:text-5xl">Zona de juegos</h1>
      <p className="mt-2 text-muted-foreground">Practica la lógica y gana XP.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setGame(t.id)} className={`brutal-sm rounded-xl px-4 py-2 font-bold ${game === t.id ? "bg-primary text-primary-foreground" : "bg-card"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="brutal mt-6 rounded-2xl bg-card p-6">
        {game === "robot" && <RobotGame />}
        {game === "salida" && <OutputGame />}
        {game === "ordena" && <OrderGame />}
      </div>
    </Shell>
  );
}

/* ---------- Robot ---------- */
type Dir = "↑" | "↓" | "←" | "→";
const levels = [
  { size: 5, start: [0, 0], goal: [4, 0], walls: ["2,0"] },
  { size: 5, start: [0, 4], goal: [4, 0], walls: ["1,3", "2,3", "3,1", "1,1", "2,1"] },
  { size: 6, start: [0, 0], goal: [5, 5], walls: ["1,0", "1,1", "1,2", "3,5", "3,4", "3,3", "3,2", "5,4", "4,1"] },
];

function RobotGame() {
  const { addXp } = useProgress();
  const [lvl, setLvl] = useState(0);
  const L = levels[lvl]!;
  const [cmds, setCmds] = useState<Dir[]>([]);
  const [pos, setPos] = useState(L.start);
  const [status, setStatus] = useState<"idle" | "run" | "win" | "fail">("idle");

  const reset = (l = lvl) => { setPos(levels[l]!.start); setStatus("idle"); };

  const run = async () => {
    setStatus("run");
    let [x, y] = L.start;
    setPos([x, y]);
    for (const c of cmds) {
      await new Promise((r) => setTimeout(r, 350));
      const nx = x + (c === "→" ? 1 : c === "←" ? -1 : 0);
      const ny = y + (c === "↓" ? 1 : c === "↑" ? -1 : 0);
      if (nx < 0 || ny < 0 || nx >= L.size || ny >= L.size || L.walls.includes(`${nx},${ny}`)) { setStatus("fail"); return; }
      x = nx; y = ny; setPos([x, y]);
    }
    if (x === L.goal[0] && y === L.goal[1]) { setStatus("win"); addXp(15); } else setStatus("fail");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="font-mono text-xs text-muted-foreground">NIVEL {lvl + 1}/{levels.length}</p>
        <p className="mb-3 text-sm">Escribe el algoritmo: una lista de pasos para llevar al robot hasta el tesoro 💎 sin chocar con los muros.</p>
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${L.size}, 3rem)` }}>
          {Array.from({ length: L.size * L.size }).map((_, i) => {
            const x = i % L.size, y = Math.floor(i / L.size);
            const wall = L.walls.includes(`${x},${y}`);
            const robot = pos[0] === x && pos[1] === y;
            const goal = L.goal[0] === x && L.goal[1] === y;
            return (
              <div key={i} className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 border-border text-2xl ${wall ? "bg-foreground" : "bg-muted"}`}>
                {robot ? "🤖" : goal ? "💎" : ""}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex gap-2">
          {(["↑", "↓", "←", "→"] as Dir[]).map((d) => (
            <button key={d} disabled={status === "run"} onClick={() => setCmds([...cmds, d])} className="brutal-sm h-12 w-12 rounded-xl bg-secondary text-xl font-bold">{d}</button>
          ))}
        </div>
        <div className="mt-4 min-h-24 rounded-xl bg-code p-3 font-mono text-sm text-code-foreground">
          {cmds.length === 0 ? <span className="opacity-60"># agrega pasos…</span> : cmds.map((c, i) => <div key={i}>{i + 1}. mover({c})</div>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button disabled={status === "run" || !cmds.length} onClick={run} className="brutal-sm rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground disabled:opacity-40">▶ Ejecutar</button>
          <button onClick={() => setCmds(cmds.slice(0, -1))} className="brutal-sm rounded-xl bg-card px-4 py-2 font-bold">⌫ Borrar</button>
          <button onClick={() => { setCmds([]); reset(); }} className="brutal-sm rounded-xl bg-card px-4 py-2 font-bold">↺ Reiniciar</button>
        </div>
        {status === "fail" && <p className="mt-4 font-bold text-destructive">💥 ¡Ups! Revisa tu algoritmo (depúralo) e inténtalo otra vez.</p>}
        {status === "win" && (
          <div className="mt-4">
            <p className="font-bold text-success">🎉 ¡Tesoro encontrado! +15 XP</p>
            {lvl < levels.length - 1 && (
              <button onClick={() => { const n = lvl + 1; setLvl(n); setCmds([]); reset(n); }} className="brutal-sm mt-2 rounded-xl bg-secondary px-4 py-2 font-bold">Siguiente nivel →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Output quiz ---------- */
const outputs = [
  { code: "print(2 + 3 * 2)", options: ["10", "8", "7"], answer: "8" },
  { code: 'x = "5"\nprint(x * 2)', options: ["10", "55", "Error"], answer: "55" },
  { code: "n = 7\nif n % 2 == 0:\n    print('par')\nelse:\n    print('impar')", options: ["par", "impar", "7"], answer: "impar" },
  { code: "t = 0\nfor i in range(3):\n    t += i\nprint(t)", options: ["3", "6", "2"], answer: "3" },
  { code: "def f(a):\n    return a - 1\nprint(f(f(5)))", options: ["4", "3", "5"], answer: "3" },
  { code: "print(10 > 3 and 2 > 5)", options: ["True", "False", "Error"], answer: "False" },
  { code: "print(len('hola'))", options: ["4", "hola", "5"], answer: "4" },
  { code: "a = 3\nb = a\na = 9\nprint(b)", options: ["9", "3", "a"], answer: "3" },
];

function OutputGame() {
  const { addXp } = useProgress();
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [playing, setPlaying] = useState(false);
  const [flash, setFlash] = useState<"" | "ok" | "no">("");

  useEffect(() => {
    if (!playing) return;
    if (time <= 0) { setPlaying(false); addXp(score * 5); return; }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [playing, time]);

  const start = () => { setI(0); setScore(0); setTime(60); setPlaying(true); };
  const pick = (o: string) => {
    const ok = o === outputs[i % outputs.length]!.answer;
    if (ok) setScore(score + 1);
    setFlash(ok ? "ok" : "no");
    setTimeout(() => setFlash(""), 300);
    setI(i + 1);
  };

  if (!playing)
    return (
      <div className="py-6 text-center">
        <h2 className="font-display text-2xl font-bold">¿Qué imprime?</h2>
        <p className="mt-2 text-muted-foreground">60 segundos. Adivina la salida de cada código. +5 XP por acierto.</p>
        {time <= 0 && <p className="mt-4 text-xl font-bold">Puntaje: {score} · +{score * 5} XP</p>}
        <button onClick={start} className="brutal mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">{time <= 0 ? "Jugar otra vez" : "¡Empezar!"}</button>
      </div>
    );

  const q = outputs[i % outputs.length]!;
  return (
    <div>
      <div className="mb-4 flex justify-between font-mono font-bold">
        <span>⏱️ {time}s</span><span>⭐ {score}</span>
      </div>
      <div className={`rounded-xl transition-all ${flash === "ok" ? "ring-4 ring-success" : flash === "no" ? "ring-4 ring-destructive" : ""}`}>
        <CodeBlock code={q.code} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {q.options.map((o) => (
          <button key={o} onClick={() => pick(o)} className="brutal-sm rounded-xl bg-secondary py-3 font-mono font-bold">{o}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Order the code ---------- */
const puzzles = [
  { goal: "Imprime los números del 1 al 3", lines: ["for i in range(1, 4):", "    print(i)"] },
  { goal: "Pide un nombre y saluda", lines: ['nombre = input("¿Tu nombre? ")', 'saludo = "Hola " + nombre', "print(saludo)"] },
  { goal: "Define y usa una función que duplica", lines: ["def doble(n):", "    return n * 2", "r = doble(4)", "print(r)"] },
];
const shuffle = <T,>(a: T[]) => { const b = [...a]; while (b.join() === a.join()) b.sort(() => Math.random() - 0.5); return b; };

function OrderGame() {
  const { addXp } = useProgress();
  const [p, setP] = useState(0);
  const [lines, setLines] = useState<string[]>(puzzles[0]!.lines);
  const [won, setWon] = useState(false);
  useEffect(() => { setLines(shuffle(puzzles[p]!.lines)); setWon(false); }, [p]);

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= lines.length) return;
    const n = [...lines]; [n[i], n[j]] = [n[j]!, n[i]!]; setLines(n);
  };
  const check = () => {
    if (lines.join() === puzzles[p]!.lines.join()) { setWon(true); addXp(10); } else alert("Aún no está en orden. ¡Sigue intentando!");
  };

  return (
    <div>
      <p className="font-mono text-xs text-muted-foreground">RETO {p + 1}/{puzzles.length}</p>
      <h2 className="font-display text-xl font-bold">🎯 {puzzles[p]!.goal}</h2>
      <div className="mt-4 space-y-2">
        {lines.map((l, i) => (
          <div key={l} className="flex items-center gap-2">
            <div className="flex flex-col">
              <button onClick={() => move(i, -1)} className="px-2 text-sm hover:text-primary">▲</button>
              <button onClick={() => move(i, 1)} className="px-2 text-sm hover:text-primary">▼</button>
            </div>
            <pre className="flex-1 whitespace-pre rounded-lg bg-code px-4 py-2 font-mono text-sm text-code-foreground">{l}</pre>
          </div>
        ))}
      </div>
      {!won ? (
        <button onClick={check} className="brutal-sm mt-5 rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground">Comprobar</button>
      ) : (
        <div className="mt-5 flex items-center gap-3">
          <span className="font-bold text-success">✅ ¡Perfecto! +10 XP</span>
          <button onClick={() => setP((p + 1) % puzzles.length)} className="brutal-sm rounded-xl bg-secondary px-4 py-2 font-bold">Siguiente reto →</button>
        </div>
      )}
    </div>
  );
}
