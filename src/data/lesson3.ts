export const lesson3Content = {
  id: 3,
  title: 'Condicionales',
  level: 1,
  sections: [
    {
      type: 'explanation',
      content: 'Los condicionales son como caminos en un mapa. Dependiendo de si algo es verdad o mentira, el programa toma un camino u otro. Se usa la palabra "if" (que significa "si" en inglés).'
    },
    {
      type: 'example',
      code: `let edad = 10;

if (edad >= 12) {
  console.log("Puedes entrar al juego");
} else {
  console.log("Aún eres muy joven");
}`,
      description: 'Si la edad es 12 o más, permite la entrada; si no, muestra un aviso.'
    },
    {
      type: 'exercise',
      instruction: 'Cambia el número de la edad para que el programa diga "Puedes entrar al juego".',
      starterCode: `let edad = 8;`,
      solution: `let edad = 12;`
    },
    {
      type: 'challenge',
      instruction: 'Crea un condicional que diga "Tengo hambre" si una variable llamada hambre es igual a true.',
    },
    {
      type: 'quiz',
      question: '¿Qué palabra usamos para crear una condición en JS?',
      options: [
        'maybe',
        'if',
        'while'
      ],
      correctAnswer: 1
    }
  ]
};
