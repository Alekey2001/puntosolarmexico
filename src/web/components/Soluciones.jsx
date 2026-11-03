import VisualPlaceholder from './VisualPlaceholder.jsx';

const solutions = [
  {
    id: 'residencial', title: 'Para tu hogar', description: 'Un sistema pensado para el consumo de tu familia y el espacio de tu casa.',
    // NOTA: Reemplazar temp-residencial por el asset oficial
    visual: <VisualPlaceholder label="Proyecto residencial" />,
  },
  {
    id: 'comercial', title: 'Para tu negocio', description: 'Aprovecha tus horarios de operación para generar energía y planear tus costos.',
    // NOTA: Reemplazar temp-comercial por el asset oficial
    visual: <VisualPlaceholder label="Proyecto comercial" />,
  },
  {
    id: 'industrial', title: 'Para tu industria', description: 'Explora una solución fotovoltaica acorde con la demanda energética de tu operación.',
    // NOTA: Reemplazar temp-industrial por el asset oficial
    visual: <VisualPlaceholder label="Proyecto industrial" />,
  },
];

export default function Soluciones() {
  return (
    <section id="soluciones" aria-labelledby="soluciones-title" className="bg-primary px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Soluciones solares</p>
        <h2 id="soluciones-title" className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Una solución para cada espacio.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {solutions.map(({ id, title, description, visual }) => (
            <article key={id} id={id} className="flex scroll-mt-6 flex-col rounded-2xl bg-white p-6 text-primary">
              {visual}
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mb-6 mt-3 leading-relaxed">{description}</p>
              <a href="#cotizacion" aria-label={`Evaluar proyecto ${id}`} className="mt-auto inline-flex min-h-12 items-center self-start rounded-lg bg-accent px-5 py-3 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Evaluar mi proyecto</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
