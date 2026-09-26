export type Question = { q: string; code?: string; options: string[]; answer: number; why: string };
export type Section = { title: string; text: string; code?: string };
export type Lesson = {
  id: string;
  num: number;
  title: string;
  emoji: string;
  summary: string;
  sections: Section[];
  theorem: { name: string; statement: string };
  questions: Question[];
};

export const lessons: Lesson[] = [
  {
    id: "algoritmos",
    num: 1,
    title: "¿Qué es programar?",
    emoji: "🧭",
    summary: "Algoritmos: instrucciones paso a paso que una computadora puede seguir.",
    sections: [
      { title: "Programar es dar instrucciones", text: "Una computadora no piensa por sí sola: hace exactamente lo que le dices. Programar es escribir instrucciones claras, en orden, para resolver un problema." },
      { title: "Los algoritmos están en todos lados", text: "Una receta de cocina es un algoritmo: pasos ordenados que llevan a un resultado. Si cambias el orden (hornear antes de mezclar) el resultado sale mal.", code: "1. Tomar pan\n2. Untar mantequilla\n3. Poner jamón\n4. Cerrar el sándwich" },
      { title: "Tu primer programa", text: "En Python, para mostrar un mensaje en pantalla usamos print().", code: 'print("¡Hola, mundo!")' },
    ],
    theorem: { name: "Principio del orden", statement: "Las instrucciones se ejecutan de arriba hacia abajo, una por una. Mismo código + mismo orden = mismo resultado, siempre." },
    questions: [
      { q: "¿Qué es un algoritmo?", options: ["Un tipo de computadora", "Una lista de pasos ordenados para resolver un problema", "Un virus", "Un idioma humano"], answer: 1, why: "Un algoritmo es una secuencia de pasos para llegar a un resultado." },
      { q: "¿Qué muestra este código?", code: 'print("Hola")\nprint("Adiós")', options: ["Adiós y luego Hola", "Solo Hola", "Hola y luego Adiós", "Nada"], answer: 2, why: "Se ejecuta de arriba a abajo." },
      { q: "¿Qué pasa si das instrucciones en el orden equivocado?", options: ["La computadora lo corrige sola", "El resultado puede ser incorrecto", "Nada cambia", "Se apaga"], answer: 1, why: "La computadora sigue tu orden exacto, aunque esté mal." },
    ],
  },
  {
    id: "variables",
    num: 2,
    title: "Variables",
    emoji: "📦",
    summary: "Cajas con nombre donde guardamos datos para usarlos después.",
    sections: [
      { title: "Una caja con etiqueta", text: "Una variable es como una caja con un nombre. Dentro guardas un valor: un número, un texto, etc.", code: 'nombre = "Lucía"\nedad = 14\nprint(nombre)\nprint(edad)' },
      { title: "Tipos de datos", text: "Los valores tienen tipos: enteros (int) como 7, decimales (float) como 3.5, texto (str) entre comillas como \"hola\" y booleanos (bool): True o False." },
      { title: "Las variables cambian", text: "Puedes reemplazar el valor de una variable. La caja se queda con el último valor guardado.", code: "puntos = 10\npuntos = puntos + 5\nprint(puntos)  # 15" },
    ],
    theorem: { name: "Teorema de la asignación", statement: "En x = expresión, primero se calcula todo lo de la derecha y después se guarda en la caja de la izquierda. El valor anterior se pierde." },
    questions: [
      { q: "¿Qué imprime?", code: "x = 3\nx = x * 2\nprint(x)", options: ["3", "6", "x", "32"], answer: 1, why: "Se calcula 3*2 = 6 y se guarda en x." },
      { q: "¿Cuál es un texto (str)?", options: ["42", "True", '"42"', "4.2"], answer: 2, why: "Los textos van entre comillas." },
      { q: "¿Qué imprime?", code: 'a = "Hola"\nb = "Mundo"\nprint(a + " " + b)', options: ["a b", "Hola Mundo", "HolaMundo", "Error"], answer: 1, why: "Sumar textos los une (concatenación)." },
    ],
  },
  {
    id: "condicionales",
    num: 3,
    title: "Condicionales",
    emoji: "🔀",
    summary: "Tomar decisiones: si pasa algo, haz esto; si no, haz otra cosa.",
    sections: [
      { title: "if: si…", text: "Con if el programa decide qué hacer según una condición que es True o False.", code: 'edad = 15\nif edad >= 13:\n    print("Puedes crear tu cuenta")' },
      { title: "else y elif", text: "else se ejecuta cuando la condición es falsa. elif permite revisar más opciones.", code: 'nota = 16\nif nota >= 18:\n    print("Excelente")\nelif nota >= 11:\n    print("Aprobado")\nelse:\n    print("A repasar")' },
      { title: "Comparadores", text: "== igual, != distinto, > mayor, < menor, >= mayor o igual, <= menor o igual. ¡Ojo! = guarda, == compara." },
    ],
    theorem: { name: "Teorema de la bifurcación", statement: "En un bloque if / elif / else se ejecuta exactamente UNA rama: la primera cuya condición sea verdadera (o else si ninguna lo es)." },
    questions: [
      { q: "¿Qué imprime?", code: 'x = 5\nif x > 10:\n    print("Grande")\nelse:\n    print("Pequeño")', options: ["Grande", "Pequeño", "Ambos", "Nada"], answer: 1, why: "5 > 10 es False, así que va al else." },
      { q: "¿Qué operador compara si dos valores son iguales?", options: ["=", "==", "=>", "!="], answer: 1, why: "== compara; = asigna." },
      { q: "¿Qué imprime?", code: 'n = 20\nif n > 5:\n    print("A")\nelif n > 10:\n    print("B")', options: ["A", "B", "A y B", "Nada"], answer: 0, why: "Solo se ejecuta la primera rama verdadera." },
    ],
  },
  {
    id: "bucles",
    num: 4,
    title: "Bucles",
    emoji: "🔁",
    summary: "Repetir instrucciones sin escribirlas mil veces.",
    sections: [
      { title: "for: repetir N veces", text: "range(n) genera los números de 0 a n-1. El bucle for recorre cada uno.", code: "for i in range(3):\n    print(i)\n# 0, 1, 2" },
      { title: "while: mientras…", text: "while repite mientras la condición sea verdadera. ¡Cuidado con los bucles infinitos!", code: "vidas = 3\nwhile vidas > 0:\n    print(\"Jugando…\")\n    vidas = vidas - 1" },
      { title: "Acumular", text: "Un patrón muy común: sumar valores dentro de un bucle.", code: "total = 0\nfor n in range(1, 5):\n    total = total + n\nprint(total)  # 10" },
    ],
    theorem: { name: "Teorema de la terminación", statement: "Un bucle while termina solo si algo dentro de él hace que la condición llegue a ser falsa. Si nada cambia, se repite para siempre." },
    questions: [
      { q: "¿Cuántas veces se imprime?", code: 'for i in range(5):\n    print("¡Hey!")', options: ["4", "5", "6", "Infinitas"], answer: 1, why: "range(5) da 0,1,2,3,4: cinco vueltas." },
      { q: "¿Qué imprime al final?", code: "t = 0\nfor i in range(4):\n    t = t + 2\nprint(t)", options: ["4", "6", "8", "2"], answer: 2, why: "4 vueltas sumando 2 = 8." },
      { q: "¿Qué pasa aquí?", code: "x = 1\nwhile x > 0:\n    print(x)", options: ["Imprime 1 una vez", "Error", "Bucle infinito", "No imprime nada"], answer: 2, why: "x nunca cambia, la condición siempre es True." },
    ],
  },
  {
    id: "funciones",
    num: 5,
    title: "Funciones",
    emoji: "🧩",
    summary: "Bloques de código reutilizables con nombre propio.",
    sections: [
      { title: "Definir una función", text: "Con def creas una función. Luego la llamas por su nombre cuantas veces quieras.", code: 'def saludar():\n    print("¡Hola!")\n\nsaludar()\nsaludar()' },
      { title: "Parámetros", text: "Los parámetros son datos que le pasas a la función para que trabaje con ellos.", code: 'def saludar(nombre):\n    print("Hola " + nombre)\n\nsaludar("Mateo")' },
      { title: "return", text: "return devuelve un resultado que puedes guardar en una variable.", code: "def doble(n):\n    return n * 2\n\nr = doble(7)\nprint(r)  # 14" },
    ],
    theorem: { name: "Principio de reutilización (DRY)", statement: "Don't Repeat Yourself: si escribes el mismo código dos veces, conviértelo en una función. Un cambio en la función arregla todos los lugares donde se usa." },
    questions: [
      { q: "¿Qué palabra crea una función en Python?", options: ["func", "def", "function", "new"], answer: 1, why: "def viene de 'define'." },
      { q: "¿Qué imprime?", code: "def suma(a, b):\n    return a + b\n\nprint(suma(3, 4))", options: ["34", "7", "a + b", "Error"], answer: 1, why: "Devuelve 3 + 4 = 7." },
      { q: "¿Para qué sirve return?", options: ["Para repetir", "Para devolver un resultado", "Para borrar la función", "Para imprimir"], answer: 1, why: "return entrega un valor a quien llamó la función." },
    ],
  },
];

export const getLesson = (id: string) => lessons.find((l) => l.id === id);
