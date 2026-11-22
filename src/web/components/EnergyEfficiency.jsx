import useScrollReveal, { scrollRevealClass, scrollRevealDelays } from '../hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    color: 'bg-primary',
    icon: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    title: 'Captación Solar de Alta Eficiencia',
    description: 'Módulos fotovoltaicos monocristalinos capturan radiación solar directa y difusa, transformándola en corriente directa (DC) incluso en días nublados.',
  },
  {
    number: '02',
    color: 'bg-accent',
    icon: 'M4 4h16v16H4V4Zm3 8c2-6 3 6 5 0s3 6 5 0',
    title: 'Inversor Inteligente a Corriente Alterna',
    description: 'El microinversor o inversor central transforma la energía a corriente alterna (AC 110V/220V), sincronizada perfectamente con la frecuencia de tu inmueble.',
  },
  {
    number: '03',
    color: 'bg-success',
    icon: 'M4 4h16v16H4V4Zm3 5h10m-3-3 3 3-3 3m3 3H7m3-3-3 3 3 3',
    title: 'Contrato e Interconexión CFE',
    description: 'CFE reemplaza tu medidor convencional por uno bidireccional. La energía que no consumes se envía a la red para abonarse a tus consumos posteriores.',
  },
];

export default function EnergyEfficiency() {
  const revealRef = useScrollReveal();
  return (
    <section ref={revealRef} aria-labelledby="energy-efficiency-title" className="bg-gray-50/50 px-6 py-16 font-sans lg:py-24">
      <div data-scroll-reveal className={`mx-auto max-w-3xl text-center ${scrollRevealClass}`}>
        <p className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-xs font-bold tracking-wide text-success">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0">
            <path d="M20 4c-8-2-15 1-15 8a7 7 0 0 0 7 7c7 0 9-7 8-15ZM4 21 15 10" />
          </svg>
          EFICIENCIA ENERGÉTICA COMPROBADA
        </p>
        <h2 id="energy-efficiency-title" className="mt-4 text-4xl font-bold leading-tight text-primary">Ahorrar nunca fue tan fácil: De la tarifa DAC al pago mínimo</h2>
        <p className="mt-4 leading-relaxed text-gray-600">Con nuestro esquema de interconexión bidireccional avalado por CFE, tu sistema solar produce excedentes durante el día que se abonan en saldo a favor en la red eléctrica.</p>
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <article data-scroll-reveal aria-labelledby="consumption-comparison-title" className={`min-w-0 rounded-2xl bg-white p-8 shadow-xl ${scrollRevealClass} delay-100`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 id="consumption-comparison-title" className="text-xl font-bold text-primary">Comparativo de Consumo Real</h3>
              <p className="mt-1 text-sm text-gray-500">Caso real auditado: Residencia en Querétaro con 12 paneles solares</p>
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">-99.6% Reducción</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="min-w-0 rounded-xl bg-red-50 p-3 sm:p-4">
              <h4 className="text-xs font-bold text-red-800">ANTES DE PUNTO SOLAR</h4>
              <p className="mt-2 text-xs text-gray-600">Recibo CFE Bimestral (Tarifa DAC)</p>
              <p className="mt-4 text-2xl font-bold text-primary sm:text-3xl">$18,450 <span className="text-sm">MXN</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>Sin subsidio de gobierno</li>
                <li>Cargo fijo por kwh excedente</li>
                <li>Gasto acumulado: $110,700/año</li>
              </ul>
            </div>
            <div className="min-w-0 rounded-xl border border-success bg-success/10 p-3 sm:p-4">
              <h4 className="flex items-start gap-2 text-xs font-bold text-success">
                CON PUNTO SOLAR
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </h4>
              <p className="mt-2 text-xs text-gray-600">Nuevo Recibo interconectado CFE</p>
              <p className="mt-4 text-2xl font-bold text-success sm:text-3xl">$67 <span className="text-sm">MXN</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>Solo pago mínimo de porteo</li>
                <li>Medidor digital bidireccional</li>
                <li className="font-bold text-success">Ahorro anual: $110,298 MXN</li>
              </ul>
            </div>
          </div>
          <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs">
            <p className="text-gray-500">Resultados reales bimestrales, regulados por la CRE y CFE.</p>
            <a href="#cotizacion" className="inline-flex min-h-11 items-center font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Simular mi caso →</a>
          </footer>
        </article>
        <ol aria-label="Proceso de generación e interconexión solar" className="flex flex-col gap-8">
          {steps.map((step, index) => (
            <li key={step.number} data-scroll-reveal className={`flex items-start gap-5 ${scrollRevealClass} ${scrollRevealDelays[index]}`}>
              <div className={`flex size-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl text-white ${step.color}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6">
                  <path d={step.icon} />
                </svg>
                <span className="text-lg font-bold">{step.number}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
