import imgResidencial from '../../assets/media/A1.webp';
import imgComercial from '../../assets/media/A2.webp';
import imgIndustrial from '../../assets/media/A3.webp';

const lines = [
  {
    id: 'residencial',
    image: imgResidencial,
    category: 'Residencial',
    categoryColor: 'bg-primary',
    badge: 'Elimina Tarifa DAC',
    badgeColor: 'text-success',
    title: 'Energía Solar Residencial',
    description: 'Protege la economía de tu familia eliminando la tarifa de alto consumo (DAC). Disfruta de aire acondicionado, calefacción y alberca sin preocuparte por el recibo de luz.',
    benefits: ['Retorno de inversión en 3 a 4 años', 'Aumento de plusvalía inmobiliaria', 'Monitoreo en app móvil 24/7'],
    action: 'Ver Soluciones Residenciales',
  },
  {
    id: 'comercial',
    image: imgComercial,
    category: 'Pymes y Comercio',
    categoryColor: 'bg-accent',
    badge: '100% Deducible de ISR',
    badgeColor: 'text-success',
    title: 'Comercios y Negocios',
    description: 'Disminuye drásticamente costos operativos fijos en restaurantes, plazas comerciales, colegios y clínicas. Aprovecha el incentivo de la LISR con deducción fiscal acelerada del 100%.',
    benefits: ['Deducción inmediata según Art. 34 LISR', 'Tarifa Comercial PDBT, GDMTO', 'Retornos de inversión (ROI) acelerados'],
    action: 'Ver Soluciones Comerciales',
  },
  {
    id: 'industrial',
    image: imgIndustrial,
    category: 'Media y Alta Tensión',
    categoryColor: 'bg-primary',
    badge: 'GDMTO y GDMTH',
    badgeColor: 'text-accent',
    title: 'Media y Alta Tensión Industrial',
    description: 'Ingeniería fotovoltaica para naves industriales, centros de distribución y maquilas. Mitigamos picos de demanda y cargos por capacidad en tarifas horarias de media tensión.',
    benefits: ['Proyectos llave en mano hasta 500 kWp', 'Cumplimiento estricto del Código de Red', 'Certificados de Energía Limpia (CELs)'],
    action: 'Ver Soluciones Industriales',
  },
];

function CheckIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function SpecializedLines() {
  return (
    <section aria-labelledby="specialized-lines-title" className="bg-gray-50/30 py-20 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-widest text-accent">NUESTRAS LÍNEAS ESPECIALIZADAS</p>
            <h2 id="specialized-lines-title" className="mt-2 text-4xl font-bold leading-tight text-primary">Especialistas en Energía Solar para Hogar, Negocio e Industria</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">Tecnología alemana y norteamericana adaptada al régimen de irradiación de cada región de México.</p>
          </div>
          <a href="#soluciones" className="inline-flex min-h-11 items-center self-start font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:shrink-0 lg:self-end">Ver catálogo de proyectos →</a>
        </header>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {lines.map((line) => (
            <article key={line.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img src={line.image} alt={line.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:group-hover:scale-100 motion-reduce:transition-none" />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${line.categoryColor}`}>{line.category}</span>
                <span className={`absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold ${line.badgeColor}`}>
                  <CheckIcon className="size-4 shrink-0" />
                  {line.badge}
                </span>
              </div>
              <div className="flex flex-grow flex-col p-8">
                <h3 className="text-xl font-bold text-primary">{line.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{line.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  {line.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-success/70" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <footer className="mt-auto pt-8">
                  <a href={`#${line.id}`} className="block w-full rounded-xl bg-accent px-4 py-4 text-center font-bold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{line.action}</a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
