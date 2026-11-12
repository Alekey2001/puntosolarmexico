const stats = [
  {
    value: '1,200+',
    title: 'Sistemas Instalados',
    description: 'En 24 estados de la República',
    color: 'text-accent',
    icon: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7',
  },
  {
    value: '+75,000',
    title: 'Ton de CO2 Evitadas',
    description: 'Mitigación ambiental activa',
    color: 'text-success',
    icon: 'M20 4c-8-2-15 1-15 8a7 7 0 0 0 7 7c7 0 9-7 8-15ZM4 21 15 10',
  },
  {
    value: '95 MW',
    title: 'Capacidad Instalada',
    description: 'En residencial, Pymes e industria',
    color: 'text-accent',
    icon: 'm13 2-9 12h7l-1 8 10-12h-7l1-8Z',
  },
  {
    value: '3.5 M',
    title: 'Árboles Equivalentes',
    description: 'Equivalencia ecológica absorbida',
    color: 'text-success',
    icon: 'm12 2-6 7h3l-5 8h16l-5-8h3l-6-7Zm0 15v5m-3 0h6',
  },
];

export default function ImpactStats() {
  return (
    <section aria-labelledby="impact-stats-title" className="bg-primary py-20 font-sans text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 id="impact-stats-title" className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">Impacto Real y Solidez Técnica en México</h2>
        <p className="text-lg leading-relaxed text-white/80">Más de una década liderando la transición fotovoltaica con ingeniería certificada y cumplimiento estricto del Código de Red.</p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.title} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`size-10 ${stat.color}`}>
              <path d={stat.icon} />
            </svg>
            <p className="mt-4 text-4xl font-bold">{stat.value}</p>
            <h3 className="mt-2 text-sm font-bold">{stat.title}</h3>
            <p className="mt-1 text-xs text-white/60">{stat.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
