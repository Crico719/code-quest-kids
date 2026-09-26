export const lesson6Content = {
  id: 6,
  title: 'Operadores',
  level: 1,
  sections: [
    {
      type: 'explanation',
      content: 'Los operadores son símbolos que hacemos cálculos o comparaciones. Tenemos matemáticos (+, -, *, /) y de comparación (==, >, <).'
    },
    {
      type: 'example',
      code: `let puntos = 10;
puntos = puntos + 5; // Ahora tiene 15
let esMayor = 15 > 10; // true`,
      description: 'Sumamos puntos y comparamos si un número es mayor que otro.'
    },
    {
      type: 'exercise',
      instruction: 'Usa el operador de resta (-) para quitarle 3 puntos a una variable.',
      starterCode: `let vida = 100;
vida = vida + 3;`,
      solution: `let vida = 100;
vida = vida - 3;`
    },
    {
      type: 'challenge',
      instruction: 'Crea una comparación que verifique si 10 es igual a 10 usando el operador ==.',
    },
    {
      type: 'quiz',
      question: '¿Qué operador se usa para saber si dos valores son iguales?',
      options: [
        '++',
        '==',
        '!='
      ],
      correctAnswer: 1
    }
  ]
};
