const questions = [
  ['¿Cuánto puedo ahorrar con paneles solares?', 'Depende de tu tarifa, consumo y del sistema que se pueda instalar. Con tu recibo y una evaluación del sitio es posible elaborar una estimación personalizada.'],
  ['¿Qué necesito para evaluar mi proyecto?', 'Tu recibo de luz reciente y la información del espacio donde quieres instalar el sistema. La revisión técnica permite definir su viabilidad.'],
  ['¿Los paneles funcionan durante un apagón?', 'Un sistema conectado a la red normalmente se desconecta por seguridad. Para contar con respaldo se necesita un diseño compatible y equipo adicional.'],
  ['¿Qué mantenimiento necesita un sistema solar?', 'La limpieza y las revisiones dependen del sitio y de las recomendaciones del fabricante. Consulta el plan adecuado para tu instalación.'],
];

export default function PreguntasFrecuentes() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 id="preguntas-title" className="text-3xl font-bold sm:text-4xl">Resolvamos tus dudas.</h2>
        <div className="mt-8 divide-y divide-primary/20">
          {questions.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer rounded py-2 text-lg font-bold marker:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{question}</summary><p className="mt-3 leading-relaxed">{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
