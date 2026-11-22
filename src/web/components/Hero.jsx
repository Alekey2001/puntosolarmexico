import { useEffect, useRef, useState } from 'react';
import useScrollReveal, { scrollRevealClass } from '../hooks/useScrollReveal';
import heroVideo from '../../assets/media/hero-bg.mp4';

const tariffs = {
  residencial: { label: 'Residencial', rate: 3.00, icon: '🏠' },
  comercial: { label: 'Comercial', rate: 4.90, icon: '🏢' },
  industrial: { label: 'Industrial', rate: 3.15, icon: '🏭' },
};

const solarCells = [
  { top: '96px', left: '144px', animationDuration: '4.5s', animationDelay: '0s' },
  { top: '240px', left: '48px', animationDuration: '5.8s', animationDelay: '1.2s' },
  { top: '144px', left: '480px', animationDuration: '4.2s', animationDelay: '2.5s' },
  { top: '384px', left: '288px', animationDuration: '6.1s', animationDelay: '0.8s' },
  { top: '96px', right: '192px', animationDuration: '5.0s', animationDelay: '3.1s' },
  { top: '336px', right: '96px', animationDuration: '4.8s', animationDelay: '1.9s' },
  { top: '480px', left: '576px', animationDuration: '5.5s', animationDelay: '2.2s' },
];

const waUrl = 'https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20';
const benefits = [
  'Retorno de inversión garantizado en 2.5 a 4 años',
  'Garantía de rendimiento lineal por 25 años en paneles Tier 1',
  'Gestión integral de trámites y medidor bidireccional CFE',
];

export default function Hero() {
  const revealRef = useScrollReveal();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const tutorialRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [tariffType, setTariffType] = useState('residencial');
  const [monthlyKwh, setMonthlyKwh] = useState(600);
  const modalRef = useRef(null);
  const submittingRef = useRef(false);
  const currentTariff = tariffs[tariffType];
  const currentRate = currentTariff.rate;
  const monthlySavings = Math.round(monthlyKwh * currentRate * 0.99);
  const bimonthlySavings = monthlySavings * 2;
  const annualSavings = monthlySavings * 12;

  const updateConsumption = (event) => {
    const value = event.target.valueAsNumber;
    setMonthlyKwh(Number.isFinite(value) ? Math.min(5000, Math.max(50, value)) : 50);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current || statusMessage?.success) return;

    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.set('mensaje', `Solicitud desde Calculadora Hero - Tarifa: ${currentTariff.label} ($${currentRate.toFixed(2)}/kWh) | Consumo Mensual: ${monthlyKwh} kWh | Ahorro Mensual: $${monthlySavings} MXN | Ahorro Bimestral: $${bimonthlySavings} MXN | Ahorro Anual: $${annualSavings} MXN`);
    submittingRef.current = true;
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/enviar-correo.php', { method: 'POST', body: payload });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setStatusMessage({ success: false, message: result.message || 'No se pudo enviar la solicitud. Intenta nuevamente.' });
        return;
      }
      setStatusMessage({ success: true, message: '¡Tu cálculo fue enviado! Un asesor técnico te contactará a la brevedad.' });
      form.reset();
    } catch {
      setStatusMessage({ success: false, message: 'No se pudo confirmar el envío. Revisa tu conexión e intenta nuevamente.' });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!isModalOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const dialog = modalRef.current;
    dialog.querySelector('input').focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !submittingRef.current) setIsModalOpen(false);
      if (event.key !== 'Tab') return;
      const controls = dialog.querySelectorAll('button:not(:disabled), input:not(:disabled)');
      if (!controls.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!dialog.contains(document.activeElement) || document.activeElement === dialog) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isTutorialOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const dialog = tutorialRef.current;
    const closeButton = dialog.querySelector('button');
    closeButton.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsTutorialOpen(false);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isTutorialOpen]);

  return (
    <section ref={revealRef} id="inicio" aria-labelledby="hero-title" className={`relative isolate overflow-hidden min-h-[90vh] flex items-center bg-primary px-6 pb-16 pt-28 font-sans text-white sm:px-10 lg:pb-24 lg:pt-32 ${isModalOpen || isTutorialOpen ? 'z-[60]' : ''}`}>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-bottom origin-bottom scale-115 transform-gpu -z-20">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#172d5b]/75 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
        {solarCells.map((cell) => (
          <div
            key={cell.animationDelay}
            className="animate-solar-cell absolute z-0 w-[48px] h-[48px] opacity-0 bg-[#f48020]/35 border border-[#f48020]/80 shadow-[0_0_20px_rgba(244,128,32,0.65)]"
            style={cell}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-scroll-reveal className={`${scrollRevealClass} delay-100`}>
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
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-8 bg-[#f48020] hover:bg-[#e07015] text-white font-bold py-4 px-6 rounded-xl w-full flex items-center justify-center gap-3 shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-4">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            Llamar a un asesor especialista (Lada sin costo)
          </a>
          <div className="mt-8 border-t border-white/20 pt-6">
            <p aria-label="5 estrellas" className="text-xl tracking-widest text-yellow-400">★★★★★</p>
            <p className="mt-2 text-sm text-white/80">Más de 1,200 familias e industrias ya ahorran en su recibo CFE</p>
          </div>
        </div>
        <aside data-scroll-reveal id="cotizacion" aria-labelledby="calculator-title" className={`relative min-w-0 scroll-mt-6 bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800 ${scrollRevealClass} delay-200`}>
          <div className="bg-[#172d5b] px-5 py-4 text-white flex items-center gap-3">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0 text-[#f48020]">
              <path d="M5 4h14l3 13H2L5 4Zm-1.5 6.5h17M10 4 9 17m5-13 1 13m-3 0v4m-4 0h8" />
            </svg>
            <div>
              <h2 id="calculator-title" className="font-bold text-base sm:text-lg leading-tight">Calcula tu Ahorro Solar</h2>
              <p className="text-xs text-slate-300">Estima tu ahorro real con paneles solares en México</p>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <h3 id="calculator-tariff-label" className="text-[11px] font-bold tracking-wider text-[#172d5b] uppercase mb-2.5">1. SELECCIONA TU TIPO DE TARIFA CFE</h3>
            <div role="group" aria-labelledby="calculator-tariff-label" className="grid grid-cols-3 gap-2.5">
              {Object.entries(tariffs).map(([type, tariff]) => (
                <button key={type} type="button" aria-pressed={tariffType === type} onClick={() => setTariffType(type)} className={`min-w-0 rounded-xl px-1 py-3 sm:p-3 text-center transition-all ${tariffType === type ? 'border-2 border-[#172d5b] bg-slate-50/90' : 'border border-slate-200 bg-slate-50/40 hover:border-slate-300'}`}>
                  <span aria-hidden="true" className="block text-2xl mb-1">{tariff.icon}</span>
                  <span className="block font-bold text-xs sm:text-sm text-[#172d5b]">{tariff.label}</span>
                  <span className={`block text-xs ${tariffType === type ? 'font-bold text-[#4a8b2c]' : 'text-slate-500'}`}>${tariff.rate.toFixed(2)} / kWh</span>
                </button>
              ))}
            </div>
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 my-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <label id="calculator-consumption-label" htmlFor="calculator-consumption" className="text-[11px] font-bold text-[#172d5b] uppercase">2. CONSUMO PROMEDIO MENSUAL (KWH)</label>
                <div className="flex shrink-0 items-center gap-1.5">
                  <input id="calculator-consumption" type="number" min="50" max="5000" value={monthlyKwh} onChange={updateConsumption} className="w-24 text-right font-bold text-[#172d5b] bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-[#f48020]" />
                  <span className="text-xs font-medium text-slate-600">kWh</span>
                </div>
              </div>
              <input type="range" min="50" max="5000" step="10" value={monthlyKwh} onChange={updateConsumption} aria-labelledby="calculator-consumption-label" className="accent-[#f48020] w-full cursor-pointer" />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
                <span>50 kWh</span><span>2,500 kWh</span><span>5,000+ kWh</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs my-4">
              <span className="text-slate-600">Tarifa CFE aplicada:</span>
              <span className="bg-slate-100 text-[#172d5b] font-bold px-3 py-1 rounded-full">${currentRate.toFixed(2)} / kWh ({currentTariff.label})</span>
            </div>
            <div aria-live="polite" aria-atomic="true" className="grid grid-cols-3 gap-2.5 mb-5">
              <div className="min-w-0 bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 sm:p-3 text-center">
                <p className="text-[10px] font-bold text-[#4a8b2c] uppercase">AHORRO MENSUAL</p>
                <p className="break-words text-lg sm:text-xl font-extrabold text-[#4a8b2c] my-0.5">${monthlySavings.toLocaleString('en-US')}</p>
                <p className="text-[10px] text-[#4a8b2c]/90">MXN (99% ahorro)</p>
              </div>
              <div className="min-w-0 bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 sm:p-3 text-center">
                <p className="text-[10px] font-bold text-[#4a8b2c] uppercase">AHORRO BIMESTRAL</p>
                <p className="break-words text-lg sm:text-xl font-extrabold text-[#4a8b2c] my-0.5">${bimonthlySavings.toLocaleString('en-US')}</p>
                <p className="text-[10px] text-[#4a8b2c]/90">MXN por recibo CFE</p>
              </div>
              <div className="min-w-0 bg-[#172d5b] rounded-xl p-2.5 sm:p-3 text-center text-white">
                <p className="text-[10px] font-bold text-slate-300 uppercase">AHORRO ANUAL</p>
                <p className="break-words text-lg sm:text-xl font-extrabold text-[#f48020] my-0.5">${annualSavings.toLocaleString('en-US')}</p>
                <p className="text-[10px] text-slate-300">MXN al año</p>
              </div>
            </div>
            <button type="button" aria-haspopup="dialog" aria-expanded={isModalOpen} onClick={() => {
              setStatusMessage(null);
              setIsModalOpen(true);
            }} className="bg-[#f48020] hover:bg-[#e07015] text-white font-bold py-3.5 px-5 rounded-xl w-full flex items-center justify-center gap-2 shadow-md transition-all">
              Agendar con un especialista personalizado →
            </button>
            <button type="button" aria-haspopup="dialog" aria-expanded={isTutorialOpen} onClick={() => setIsTutorialOpen(true)} className="bg-[#172d5b] hover:bg-[#102042] text-white font-semibold py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2.5 text-xs sm:text-sm transition-all mt-3 shadow-sm">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0 text-[#f48020]">
                <circle cx="12" cy="12" r="9" />
                <path d="m10 8 6 4-6 4V8Z" />
              </svg>
              <span className="min-w-0">¿Cuántos kW/hora consumo bimestralmente?</span>
              <span className="bg-white/10 text-[10px] px-2 py-0.5 rounded-full shrink-0">Video Guía</span>
            </button>
          </div>
        </aside>
        <div className="border-t border-white/15 pt-5 mt-10 flex flex-col gap-4 lg:col-span-2 xl:flex-row xl:items-center xl:justify-between">
          <p className="flex items-center gap-2 text-sm font-bold text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-[#f48020]">
              <path d="M3 21h18M5 21V3h14v18M9 21v-4h6v4M9 7h1m4 0h1M9 12h1m4 0h1" />
            </svg>
            Instalaciones Reales Punto Solar México
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              ['Casa Residencial DAC (12 kWp)', 'bg-[#4a8b2c]'],
              ['Comercio & Pyme (45 kWp)', 'bg-[#f48020]'],
              ['Industria Acero (450 kWp)', 'bg-sky-300'],
            ].map(([label, color]) => (
              <span key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 text-xs text-white flex items-center gap-2">
                <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isTutorialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs" onClick={(event) => {
          if (event.target === event.currentTarget) setIsTutorialOpen(false);
        }}>
          <div ref={tutorialRef} role="dialog" aria-modal="true" aria-labelledby="hero-tutorial-title" aria-describedby="hero-tutorial-status" className="w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 text-[#172d5b] shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id="hero-tutorial-title" className="text-lg font-bold">Cómo leer tu recibo CFE bimestral</h2>
              <button type="button" aria-label="Cerrar tutorial" onClick={() => setIsTutorialOpen(false)} className="flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#f48020]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="aspect-video flex items-center justify-center rounded-xl bg-[#172d5b] p-4 text-center text-white sm:p-8">
              <p id="hero-tutorial-status" role="status" className="max-w-md text-sm leading-relaxed sm:text-base">Tutorial en video: Cómo leer tu recibo CFE bimestral — Próximamente disponible</p>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs" onClick={(event) => {
          if (event.target === event.currentTarget && !submittingRef.current) setIsModalOpen(false);
        }}>
          <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="hero-quote-title" tabIndex={-1} className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <h2 id="hero-quote-title" className="text-xl font-bold text-[#172d5b]">Solicita tu estudio solar</h2>
              <button type="button" aria-label="Cerrar solicitud" onClick={() => {
                if (!submittingRef.current) setIsModalOpen(false);
              }} className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[#172d5b] hover:bg-slate-100">
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <dl className="my-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <dt>Tarifa seleccionada</dt>
                <dd className="font-bold">{currentTariff.label} (${currentRate.toFixed(2)} / kWh)</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt>Consumo mensual</dt>
                <dd className="font-bold">{monthlyKwh.toLocaleString('en-US')} kWh</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 text-[#172d5b]">
                <dt>Ahorro anual estimado</dt>
                <dd className="font-bold">${annualSavings.toLocaleString('en-US')} MXN</dd>
              </div>
            </dl>
            <form onSubmit={handleSubmit} aria-labelledby="hero-quote-title" aria-busy={isSubmitting} className="space-y-4">
              <div>
                <label htmlFor="hero-quote-name" className="text-sm font-bold text-[#172d5b]">Nombre completo</label>
                <input id="hero-quote-name" name="nombre" type="text" autoComplete="name" required maxLength={150} disabled={isSubmitting || statusMessage?.success} className="mt-1 min-h-12 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-[#f48020]" />
              </div>
              <div>
                <label htmlFor="hero-quote-phone" className="text-sm font-bold text-[#172d5b]">Teléfono / WhatsApp</label>
                <input id="hero-quote-phone" name="telefono" type="tel" autoComplete="tel" required maxLength={25} disabled={isSubmitting || statusMessage?.success} className="mt-1 min-h-12 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-[#f48020]" />
              </div>
              <div>
                <label htmlFor="hero-quote-email" className="text-sm font-bold text-[#172d5b]">Correo electrónico</label>
                <input id="hero-quote-email" name="correo" type="email" autoComplete="email" required maxLength={254} disabled={isSubmitting || statusMessage?.success} className="mt-1 min-h-12 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-[#f48020]" />
              </div>
              <button type="submit" disabled={isSubmitting || statusMessage?.success} className="w-full rounded-xl bg-[#f48020] px-5 py-3.5 font-bold text-white transition-all hover:bg-[#e07015] disabled:opacity-60">
                {isSubmitting ? 'Enviando cálculo...' : statusMessage?.success ? 'Cálculo enviado' : 'Enviar cálculo y solicitar estudio'}
              </button>
              {statusMessage && (
                <p role={statusMessage.success ? 'status' : 'alert'} className={`rounded-lg p-3 text-sm ${statusMessage.success ? 'bg-emerald-50 text-[#4a8b2c]' : 'bg-red-50 text-red-700'}`}>{statusMessage.message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
