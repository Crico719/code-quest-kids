import { jsLessons } from "@/data/javascript-lessons";
import { lesson1Content } from "@/data/lesson1";
import { lesson2Content } from "@/data/lesson2";
import { lesson3Content } from "@/data/lesson3";
import { lesson4Content } from "@/data/lesson4";
import { lesson5Content } from "@/data/lesson5";
import { lesson6Content } from "@/data/lesson6";

const allLessons = jsLessons.flatMap(l => l.lessons);

export const lessons = allLessons;

export function getLesson(id: string) {
  const numericId = parseInt(id);
  
  const contents: Record<number, any> = {
    1: lesson1Content,
    2: lesson2Content,
    3: lesson3Content,
    4: lesson4Content,
    5: lesson5Content,
    6: lesson6Content,
  };

  const content = contents[numericId];
  if (content) {
    return { 
      ...content, 
      summary: allLessons.find(l => l.id === numericId)?.description || "Lección de JavaScript", 
      emoji: "🚀" 
    };
  }
  
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
