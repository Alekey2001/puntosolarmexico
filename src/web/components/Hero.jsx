import { useState } from 'react';

const estimates = {
  '8 Paneles': { before: '18,450', after: '67', savings: '18,383', reduction: '-99.6%' },
  '12 Paneles': { before: '27,600', after: '85', savings: '27,515', reduction: '-99.6%' },
  '24 Paneles': { before: '55,300', after: '170', savings: '55,130', reduction: '-99.6%' },
};

const waUrl = 'https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20';
const benefits = [
  'Retorno de inversión garantizado en 2.5 a 4 años',
  'Garantía de rendimiento lineal por 25 años en paneles Tier 1',
  'Gestión integral de trámites y medidor bidireccional CFE',
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('8 Paneles');
  const estimate = estimates[activeTab];

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary px-6 py-16 font-sans text-white sm:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-success">
              <path d="M20 4c-8-2-15 1-15 8a7 7 0 0 0 7 7c7 0 9-7 8-15Z" />
              <path d="M4 21 15 10" />
            </svg>
            Energía Limpia y Ahorro Garantizado en Todo México
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Reduce hasta un <span className="text-accent underline decoration-2 underline-offset-8">99% tu recibo de luz</span> con Paneles Solares
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">Diseño, instalación y gestión total de interconexión con CFE para residencias de alto consumo (DAC), comercios e industrias en todo el territorio nacional.</p>
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span aria-hidden="true" className="shrink-0 font-bold text-success">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cotizacion" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">Calcular mi Ahorro</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white bg-transparent px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4">Llamar a un asesor</a>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6">
            <p aria-label="5 estrellas" className="text-xl tracking-widest text-yellow-400">★★★★★</p>
            <p className="mt-2 text-sm text-white/80">Más de 1,200 familias e industrias ya ahorran en su recibo CFE</p>
          </div>
        </div>
        <aside id="cotizacion" aria-labelledby="simulator-title" className="min-w-0 scroll-mt-6 rounded-2xl bg-white p-6 text-primary shadow-2xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="simulator-title" className="text-sm font-bold tracking-wide">SIMULADOR DE RECIBO CFE</h2>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">{estimate.reduction} Reducción</span>
          </div>
          <div role="group" aria-label="Cantidad de paneles" className="mt-6 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
            {Object.keys(estimates).map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-11 rounded-md border-b-2 px-2 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${activeTab === tab ? 'border-primary bg-primary/10 text-primary' : 'border-transparent bg-transparent text-primary/70 hover:bg-primary/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true" className="mt-6 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-xl bg-red-50 px-3 py-6 sm:px-4">
              <h3 className="text-xs font-bold">ANTES (TARIFA DAC)</h3>
              <p className="mt-4 text-2xl font-bold text-red-900 sm:text-3xl">${estimate.before} <span className="text-sm">MXN</span></p>
              <p className="mt-3 text-sm">Sin subsidio de red</p>
            </div>
            <div className="relative min-w-0 rounded-xl border border-success bg-green-50 px-3 py-6 sm:px-4">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-3 size-5 text-success">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
              <h3 className="pr-5 text-xs font-bold">CON PUNTO SOLAR</h3>
              <p className="mt-4 text-2xl font-bold text-success sm:text-3xl">${estimate.after} <span className="text-sm">MXN</span></p>
              <p className="mt-3 text-sm">Ahorro al bimestre: ${estimate.savings}</p>
            </div>
          </div>
          <a href="#contacto" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-4 py-4 text-center font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Solicitar Cálculo Exacto para Mi Recibo</a>
        </aside>
      </div>
    </section>
  );
}
