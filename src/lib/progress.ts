import { useEffect, useState } from "react";

type Progress = { done: string[]; xp: number };
const KEY = "codelab-progress";
const empty: Progress = { done: [], xp: 0 };

export function useProgress() {
  const [p, setP] = useState<Progress>(empty);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setP(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (next: Progress) => {
    setP(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const completeLesson = (id: string, xp: number) => {
    const cur: Progress = JSON.parse(localStorage.getItem(KEY) || JSON.stringify(empty));
    save({ done: cur.done.includes(id) ? cur.done : [...cur.done, id], xp: cur.xp + xp });
  };
  const addXp = (xp: number) => {
    const cur: Progress = JSON.parse(localStorage.getItem(KEY) || JSON.stringify(empty));
    save({ ...cur, xp: cur.xp + xp });
  };
  return { ...p, completeLesson, addXp };
}
