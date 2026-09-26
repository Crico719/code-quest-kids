export const lesson5Content = {
  id: 5,
  title: 'Funciones',
  level: 1,
  sections: [
    {
      type: 'explanation',
      content: 'Una función es como una "máquina" a la que le das algo, ella hace un proceso y te devuelve un resultado. Sirven para no repetir el mismo código en muchas partes.'
    },
    {
      type: 'example',
      code: `function sumar(a, b) {
  return a + b;
}

console.log(sumar(5, 3)); // Resultado: 8`,
      description: 'Creamos una máquina que suma dos números que nosotros le demos.'
    },
    {
      type: 'exercise',
      instruction: 'Crea una función llamada "multiplicar" que reciba dos números y los multiplique.',
      starterCode: `function multiplicar(a, b) {
  return 0;
}`,
      solution: `function multiplicar(a, b) {
  return a * b;
}`
    },
    {
      type: 'challenge',
      instruction: 'Crea una función que reciba un nombre y devuelva "¡Hola [nombre]!, bienvenido al club".',
    },
    {
      type: 'quiz',
      question: '¿Cuál es la ventaja de usar funciones?',
      options: [
        'Hacen que el código sea más largo',
        'Permiten reutilizar el código',
        'No necesitan nombres'
      ],
      correctAnswer: 1
    }
  ]
};
