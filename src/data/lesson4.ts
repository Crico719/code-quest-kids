export const lesson4Content = {
  id: 4,
  title: 'Bucles',
  level: 1,
  sections: [
    {
      type: 'explanation',
      content: '¿Te imaginas escribir "Hola" 100 veces? ¡Sería aburridísimo! Los bucles (como el "for") sirven para repetir una acción muchas veces automáticamente.'
    },
    {
      type: 'example',
      code: `for (let i = 1; i <= 5; i++) {
  console.log("Repetición número: " + i);
}`,
      description: 'Este código imprimirá el mensaje 5 veces.'
    },
    {
      type: 'exercise',
      instruction: 'Cambia el número 5 por un 10 para que el bucle se repita más veces.',
      starterCode: `for (let i = 1; i <= 5; i++)`,
      solution: `for (let i = 1; i <= 10; i++)`
    },
    {
      type: 'challenge',
      instruction: 'Crea un bucle que cuente hacia atrás desde 10 hasta 1.',
    },
    {
      type: 'quiz',
      question: '¿Para qué sirve un bucle?',
      options: [
        'Para detener el programa',
        'Para repetir una acción varias veces',
        'Para cambiar el color de la página'
      ],
      correctAnswer: 1
    }
  ]
};
