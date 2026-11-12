const services = [
  {
    title: 'Diseño Fotovoltaico',
    description: 'Evaluamos tu tejado mediante modelado satelital 3D y termografía para estimar la irradiación óptima y sombreado de cada panel.',
    footer: 'Estudio de Irradiación 3D',
    icon: 'm12 3 9 5v8l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v8',
  },
  {
    title: 'Mantenimiento y Lavado',
    description: 'Pólizas de postventa con agua desionizada y revisión de torque/inversor para mantener la producción en su pico máximo garantizado.',
    footer: 'Máximo Rendimiento',
    icon: 'M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12ZM8 15a4 4 0 0 0 4 4',
  },
  {
    title: 'Monitoreo 24/7',
    description: 'Supervisión telemática continua de cada módulo. Detectamos caídas y sombreados instantáneamente desde nuestro centro técnico.',
    footer: 'App iOS y Android',
    icon: 'M3 4h18v13H3V4Zm5 17h8m-4-4v4M6 12l3-3 3 3 6-5',
  },
  {
    title: 'Financiamiento Solar',
    description: 'Alianzas con FIDE, banca verde y esquemas de arrendamiento puro con 0% de enganche. Tu ahorro mensual paga la mensualidad del equipo.',
    footer: '0% Enganche Disponible',
    icon: 'M3 5h18v14H3V5Zm0 5h18M6 15h4m5 0h3',
  },
];

export default function ServicesOverview() {
  return (
    <section aria-labelledby="services-overview-title" className="bg-gray-50 py-24 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 flex flex-col items-center text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">SERVICIO INTEGRAL, LLAVE EN MANO</p>
          <h2 id="services-overview-title" className="mt-3 text-4xl font-bold text-primary">¿Qué Hacemos en Punto Solar México?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">Nos encargamos del 100% del ciclo fotovoltaico para que no tengas que preocuparte por trámites burocráticos o fallas técnicas.</p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="flex h-full flex-col rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-primary">
                  <path d={service.icon} />
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
