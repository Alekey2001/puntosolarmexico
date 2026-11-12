const steps = [
  {
    title: 'Diseño y cotización',
    description: 'Revisamos tu recibo de luz y las condiciones de tu espacio para definir el sistema, la inversión y una estimación de generación.',
    icon: 'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 11h8m-8 4h8m-8 4h4',
    color: 'text-primary',
  },
  {
    title: 'Instalación',
    description: 'Planeamos los trabajos contigo, instalamos el equipo y revisamos el sistema antes de comenzar a generar.',
    icon: 'M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z',
    color: 'text-accent',
  },
  {
    title: 'Encendido y ahorro',
    description: 'Con la interconexión lista, ponemos en marcha tu sistema y te orientamos para consultar su generación y dar seguimiento a tu ahorro.',
    icon: 'm13 2-9 12h7l-1 8 10-12h-7l1-8Z',
    color: 'text-success',
  },
];

export default function Proceso() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-gray-50 px-6 py-20 font-sans sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Paso a paso</p>
        <h2 id="proceso-title" className="mt-3 text-3xl font-bold text-primary sm:text-4xl">Tu camino hacia la energía solar.</h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ title, description, icon, color }, index) => (
            <li key={title} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
              <span aria-hidden="true" className="absolute right-4 top-4 text-5xl font-black text-gray-100">0{index + 1}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`relative size-10 ${color}`}>
                <path d={icon} />
              </svg>
              <h3 className="relative mt-6 text-xl font-bold text-primary">{title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
