import { useState } from 'react';

const waUrl = 'https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20';

const faqs = [
  {
    question: '¿Cuánto tiempo tarda la instalación y el trámite de CFE?',
    answer: 'La instalación física en tu techo demora típicamente de 2 a 4 días hábiles. El trámite administrativo de interconexión y cambio de medidor bidireccional ante CFE toma entre 15 y 20 días hábiles, el cual gestionamos íntegramente nosotros sin que tengas que acudir a ventanilla.',
  },
  {
    question: '¿Cómo funcionan las deducciones fiscales de paneles en México?',
    // Fuente: [Artículo 34, fracción XIII, LISR — SAT](https://wwwmat.sat.gob.mx/articulo/61054/articulo-34).
    answer: 'La LISR permite deducir el 100% de la inversión elegible en maquinaria y equipo para generar energía renovable al calcular el ISR, según el artículo 34, fracción XIII. Su aplicación depende de tu régimen y del cumplimiento de los requisitos fiscales, incluida la operación del equipo durante al menos los cinco años siguientes al ejercicio de la deducción, salvo las excepciones legales.',
  },
  {
    question: '¿Qué garantía tienen los paneles y el inversor?',
    answer: 'Los paneles pueden contar con una garantía lineal de rendimiento de 25 años, conforme a la ficha y condiciones del fabricante. La garantía del inversor es independiente y varía según la marca y el modelo; los plazos y coberturas de cada equipo se detallan en tu propuesta técnica.',
  },
  {
    question: '¿Qué ocurre si hay días nublados o lluviosos?',
    answer: 'Los paneles siguen captando radiación difusa en días nublados o lluviosos, aunque su producción disminuye. En un sistema interconectado, la red de CFE complementa la energía que necesita tu inmueble y los excedentes se compensan conforme a tu contrato de interconexión.',
  },
  {
    question: '¿Se daña la estructura o impermeabilizante de mi techo?',
    answer: 'Se utilizan estructuras de aluminio anodizado y sistemas de fijación adecuados a cada cubierta para evitar perforaciones severas. La revisión técnica determina si se requieren anclajes; cuando son necesarios, se sellan y protegen para preservar la impermeabilización y la integridad del techo.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="preguntas" aria-labelledby="faq-title" className="bg-white px-6 py-20 font-sans">
      <header className="mb-12 flex flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">RESUELVE TUS DUDAS</p>
        <h2 id="faq-title" className="mt-2 max-w-2xl text-3xl font-bold text-primary sm:text-4xl">Preguntas Frecuentes sobre Paneles Solares en México</h2>
        <p className="mt-4 text-gray-500">Comunicado sobre la interconexión con CFE, garantías, tiempos de instalación e incentivos fiscales.</p>
      </header>
      <div className="mx-auto max-w-4xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} onMouseEnter={() => {
              // Evita que el mouseenter emulado por un toque abra y cierre la fila en el mismo gesto.
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setOpenIndex(index);
            }} className={`overflow-hidden rounded-lg border bg-[#f8f9fa] transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'border-[#172d5b]/40' : 'border-slate-200'}`}>
              <h3>
                <button
                  id={`faq-question-${index}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-lg p-5 text-left transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="text-base font-semibold text-primary">{faq.question}</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`size-5 shrink-0 text-primary transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen} inert={!isOpen} className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{faq.answer}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-between rounded-xl bg-primary p-8 shadow-lg md:flex-row md:gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">¿Tienes un caso especial o tarifa compleja?</h3>
          <p className="mt-1 text-sm text-white/80">Nuestros ingenieros certificados te asesoran de forma personalizada sin costo.</p>
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4 whitespace-nowrap rounded-lg bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:mt-0">Hablar con un ingeniero</a>
      </div>
    </section>
  );
}
