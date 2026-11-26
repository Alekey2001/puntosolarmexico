import useScrollReveal, { scrollRevealClass, scrollRevealDelays } from '../hooks/useScrollReveal';

const services = [
  {
    title: 'Diseño Fotovoltaico',
    description: 'Evaluamos tu tejado mediante modelado satelital 3D y termografía para estimar la irradiación óptima y sombreado de cada panel.',
    footer: 'Estudio de Irradiación 3D',
    icon: <>
      <path d="m3 16 12-8 12 8M6 14v13h18V14M2 29h28" />
      <path d="m10 15 8-3 5 4-8 3-5-4Zm4-1.5 5 4M12.5 17l8-3M15 19v4m-3 0h6" />
      <path d="M5 4v3M1 8l3 1M9 2 8 5m17-1-4 5m9-1-5 3" stroke="#f48020" />
      <path d="m8 25 3-2 3 2" stroke="#4a8b2c" />
    </>,
  },
  {
    title: 'Mantenimiento y Lavado',
    description: 'Pólizas de postventa con agua desionizada y revisión de torque/inversor para mantener la producción en su pico máximo garantizado.',
    footer: 'Máximo Rendimiento',
    icon: <>
      <path d="M5 14h20l3 12H2l3-12Zm-1.5 6h23M12 14l-1 12m9-12 1 12m-6 0v4m-5 0h10" />
      <path d="M8 2S4 6 4 8a4 4 0 0 0 8 0c0-2-4-6-4-6Zm11 2s-2 3-2 4a2 2 0 0 0 4 0c0-1-2-4-2-4Z" stroke="#4a8b2c" />
      <path d="m27 4 1.2 3.8L32 9l-3.8 1.2L27 14l-1.2-3.8L22 9l3.8-1.2L27 4Z" stroke="#f48020" />
    </>,
  },
  {
    title: 'Monitoreo 24/7',
    description: 'Supervisión telemática continua de cada módulo. Detectamos caídas y sombreados instantáneamente desde nuestro centro técnico.',
    footer: 'App iOS y Android',
    icon: <>
      <path d="M19 8H3v17h26V14M3 21h26M16 25v5m-6 0h12" />
      <path d="m7 18 4-5 4 3 6-7m-4 0h4v4" stroke="#4a8b2c" />
      <path d="M20 3a9 9 0 0 1 9 9M21 7a4 4 0 0 1 4 4" stroke="#f48020" />
      <circle cx="21" cy="12" r="1" fill="#f48020" stroke="none" />
    </>,
  },
  {
    title: 'Financiamiento Solar',
    description: 'Inicia tu proyecto fotovoltaico mediante parcialidades programadas por avance de obra, sin intermediarios bancarios costosos',
    footer: 'Planes de Inversión Solar',
    icon: <>
      <path d="m15 2 12 4v11c0 7-12 13-12 13S3 24 3 17V6l12-4Z" />
      <path d="M18 9h-6a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-6m4-14v16" stroke="#f48020" />
      <path d="M21 23c-2-6 2-10 9-9 1 7-3 11-9 9Zm-2 4 8-9" stroke="#4a8b2c" fill="#ffffff" />
    </>,
  },
];

export default function ServicesOverview() {
  const revealRef = useScrollReveal();
  return (
    <section ref={revealRef} aria-labelledby="services-overview-title" className="bg-gray-50 py-24 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <header data-scroll-reveal className={`mb-16 flex flex-col items-center text-center ${scrollRevealClass}`}>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">SERVICIO INTEGRAL, LLAVE EN MANO</p>
          <h2 id="services-overview-title" className="mt-3 text-4xl font-bold text-primary">¿Qué Hacemos en Punto Solar México?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">Nos encargamos del 100% del ciclo fotovoltaico para que no tengas que preocuparte por trámites burocráticos o fallas técnicas.</p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article key={service.title} data-scroll-reveal className={`group flex h-full flex-col rounded-xl bg-white p-8 shadow-sm hover:shadow-md ${scrollRevealClass} ${scrollRevealDelays[index % scrollRevealDelays.length]}`}>
              <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#172d5b]/8 to-[#172d5b]/15 border border-[#172d5b]/15 flex items-center justify-center relative group-hover:scale-105 group-hover:border-[#f48020]/50 transition-all duration-300 motion-reduce:group-hover:scale-100 motion-reduce:transition-none">
                <span aria-hidden="true" className="absolute inset-1 rounded-xl border border-white/60 bg-white/30" />
                <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#f48020] absolute -top-1 -right-1 ring-2 ring-white" />
                <svg aria-hidden="true" viewBox="0 0 34 34" fill="none" stroke="#172d5b" strokeLinecap="round" strokeLinejoin="round" className="relative w-7 h-7 stroke-[1.8]">
                  {service.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary">{service.title}</h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-600">{service.description}</p>
              <footer className="mt-6 text-sm font-bold text-accent">{service.footer}</footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
