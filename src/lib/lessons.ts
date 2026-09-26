import { jsLessons } from "@/data/javascript-lessons";
import { lesson1Content } from "@/data/lesson1";

const allLessons = jsLessons.flatMap(l => l.lessons);

export const lessons = allLessons;

export function getLesson(id: string) {
  const numericId = parseInt(id);
  if (numericId === 1) return { ...lesson1Content, summary: "Lógica, instrucciones y para qué sirve JavaScript", emoji: "🚀", questions: [lesson1Content.sections.find(s => s.type === 'quiz')] };
  
  const lesson = allLessons.find(l => l.id === numericId);
  if (!lesson) return null;
  
  return {
    ...lesson,
    summary: lesson.description,
    emoji: "💻",
    sections: [], 
    theorem: { name: "Concepto Clave", statement: "Sigue aprendiendo para desbloquear esto" },
    questions: []
  };
}
