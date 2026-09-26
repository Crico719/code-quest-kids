export const lesson2Content = {
  id: 2,
  title: 'Variables',
  level: 1,
  sections: [
    {
      type: 'explanation',
      content: 'Imagina que una variable es como una caja donde puedes guardar un juguete o un dato. Para usarla, primero le pones un nombre a la caja y luego guardas algo dentro.'
    },
    {
      type: 'explanation',
      content: 'En JavaScript usamos "let" para crear estas cajas. Podemos guardar textos (strings), números (numbers) o verdades/mentiras (booleans).'
    },
    {
      type: 'example',
      code: `let nombre = "Leo"; 
let edad = 12;
let esProgramador = true;

console.log(nombre); // Imprime "Leo"`,
      description: 'Aquí creamos tres variables de diferentes tipos.'
    },
    {
      type: 'exercise',
      instruction: 'Crea una variable llamada "miColor" y guarda tu color favorito.',
      starterCode: `let miColor = "";`,
      solution: `let miColor = "Azul";`
    },
    {
      type: 'challenge',
      instruction: 'Crea una variable para tu edad y otra para tu nombre, luego únelas en un mensaje.',
    },
    {
      type: 'quiz',
      question: '¿Para qué sirve una variable?',
      options: [
        'Para borrar el código',
        'Para guardar datos y usarlos después',
        'Para apagar la computadora'
      ],
      correctAnswer: 1
    }
  ]
};
