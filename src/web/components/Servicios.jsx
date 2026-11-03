const services = [
  ['Diseño fotovoltaico', 'Una propuesta que considera tu consumo, ubicación y superficie disponible.'],
  ['Instalación y puesta en marcha', 'Planeación de los trabajos y revisión del sistema antes de comenzar a generar.'],
  ['Monitoreo', 'Consulta las opciones de seguimiento de generación disponibles para tu sistema.'],
  ['Mantenimiento', 'Conoce los cuidados y revisiones recomendados para conservar el desempeño de tu instalación.'],
];

export default function Servicios() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-primary px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Acompañamiento en cada etapa</p>
        <h2 id="servicios-title" className="mt-3 text-3xl font-bold sm:text-4xl">Más que paneles solares.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, description]) => <article key={title} className="rounded-xl border border-white/25 p-6"><h3 className="text-xl font-bold text-accent">{title}</h3><p className="mt-4 leading-relaxed">{description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
