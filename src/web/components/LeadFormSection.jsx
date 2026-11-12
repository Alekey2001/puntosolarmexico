import { useEffect, useState } from 'react';

const services = [
  {
    title: 'Estudio Solar por Modelado 3D (Sin Costo)',
    description: 'Simulación computarizada de radiación anual, sombras y número óptimo de paneles para tu azotea.',
    icon: 'm12 3 9 5v8l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v8M7.5 5.5l9 5',
  },
  {
    title: 'Asesoría de Ingeniería Certificada',
    description: 'Especialistas colegiados que analizan tu historial de consumo CFE para garantizar el retorno de inversión.',
    icon: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM8 14l-1 7 5-3 5 3-1-7m-7-5 2 2 4-4',
  },
  {
    title: 'Gestión 100% Gratuita del Trámite CFE',
    description: 'Nosotros realizamos la solicitud de contrato de interconexión y cambio de medidor bidireccional sin cuotas ocultas.',
    icon: 'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 14l3 3 5-6',
  },
];
const testimonials = [
  {
    quote: 'Pagábamos más de $15,000 MXN al bimestre por aire acondicionado en tarifa DAC. Con Punto Solar nuestro último recibo llegó en $54 MXN. La instalación fue impecable en solo 2 días.',
    author: 'Ing. Carlos Villarreal L.',
    location: 'Residencial en Juriquilla, Qro.',
    rating: '4.9 / 5.0',
  },
  // Testimonios de ejemplo para el carrusel; sustituir por reseñas reales antes de publicar.
  {
    quote: 'Nuestro negocio pagaba cerca de $10,000 MXN al bimestre. Con los paneles solares el último recibo fue de $120 MXN. Nos explicaron cada etapa y se encargaron del trámite ante CFE.',
    author: 'Lic. Mariana Torres G.',
    location: 'Comercio en Guadalajara, Jal.',
    rating: '5.0 / 5.0',
  },
  {
    quote: 'En casa pagábamos más de $8,000 MXN cada bimestre. Después de instalar el sistema solar recibimos un cobro de $78 MXN. El equipo trabajó con orden y resolvió todas nuestras dudas.',
    author: 'Arq. Roberto Méndez S.',
    location: 'Residencial en Monterrey, N.L.',
    rating: '4.9 / 5.0',
  },
];
const paymentOptions = ['8,000', '10,000', '15,000', '40,000'];
const inputClass = 'mt-2 min-h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-primary focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary';

export default function LeadFormSection() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', pago: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiptName, setReceiptName] = useState('');
  const [fileError, setFileError] = useState('');
  const testimonial = testimonials[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function handleReceipt(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    const validType = !file || /\.(pdf|jpe?g|png)$/i.test(file.name);
    const error = !validType ? 'Selecciona un archivo PDF, JPG o PNG.' : file?.size > 10 * 1024 * 1024 ? 'El archivo debe pesar como máximo 10 MB.' : '';
    input.setCustomValidity(error);
    setFileError(error);
    setReceiptName(file?.name ?? '');
    setStatusMessage(null);
  }

  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type !== 'file') setFormData((previous) => ({ ...previous, [name]: value }));
    setStatusMessage(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting || fileError) return;

    const form = event.currentTarget;
    const payload = new FormData(form);
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/enviar-correo.php', { method: 'POST', body: payload });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setStatusMessage({ success: false, message: result.message || 'No se pudo enviar la solicitud. Intenta nuevamente.' });
        return;
      }
      setStatusMessage({ success: true, message: result.message });
      form.reset();
      setFormData({ nombre: '', correo: '', telefono: '', pago: '' });
      setReceiptName('');
      setFileError('');
    } catch {
      setStatusMessage({ success: false, message: 'No se pudo confirmar el envío. Revisa tu conexión e intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="lead-section-title" className="bg-gray-50 py-16 font-sans lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-bold tracking-wide text-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
              <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />
            </svg>
            COTIZACIÓN Y ASESORÍA 100% GRATUITA
          </p>
          <h2 id="lead-section-title" className="mt-6 text-4xl font-bold leading-tight text-primary">Calcula tu Ahorro Solar y Recibe tu Propuesta Técnica</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-500">Comprueba cuánto puedes ahorrar bimestralmente con ingeniería fotovoltaica de vanguardia y trámite oficial ante CFE.</p>
          <ul className="mt-8 space-y-4">
            {services.map((service) => (
              <li key={service.title} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
                    <path d={service.icon} />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-primary">{service.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div role="region" aria-roledescription="carrusel" aria-label="Testimonios de clientes" className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <p className="flex items-center gap-2">
                <span aria-label="5 estrellas" className="tracking-widest text-yellow-400">★★★★★</span>
                <span className="font-bold text-primary">{testimonial.rating}</span>
              </p>
              <span className="inline-flex items-center gap-1 font-bold text-success">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 3 3 5-6" />
                </svg>
                Cliente Verificado
              </span>
            </div>
            <figure className="mt-4" aria-label={`Testimonio ${currentIndex + 1} de ${testimonials.length}`}>
              <blockquote className="text-sm italic leading-relaxed text-gray-600">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="mt-1 text-xs text-gray-500">{testimonial.location}</p>
              </figcaption>
            </figure>
            <div role="group" aria-label="Seleccionar testimonio" className="mt-3 flex justify-center">
              {testimonials.map((item, index) => (
                <button key={item.author} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Ver testimonio ${index + 1}`} aria-pressed={currentIndex === index} className="flex size-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className={`size-2 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border-t-4 border-accent/40 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
            <span className="rounded-full bg-primary/5 px-3 py-1 text-primary">COTIZADOR EXPRESS</span>
            <span className="inline-flex items-center gap-1 text-success">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
              100% Gratuito
            </span>
          </div>
          <h3 id="lead-form-title" className="mt-5 text-2xl font-bold text-primary">¿Cuánto pagas de luz actualmente?</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">Recibe un estudio solar personalizado y simulación de retorno en menos de 15 minutos.</p>
          <form aria-labelledby="lead-form-title" aria-busy={isSubmitting} onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="quote-name" className="text-sm font-bold text-primary">Nombre y Apellido</label>
              <input id="quote-name" name="nombre" type="text" autoComplete="name" value={formData.nombre} onChange={handleChange} disabled={isSubmitting} maxLength={150} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="quote-email" className="text-sm font-bold text-primary">Correo Electrónico</label>
              <input id="quote-email" name="correo" type="email" autoComplete="email" value={formData.correo} onChange={handleChange} disabled={isSubmitting} maxLength={254} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="quote-phone" className="text-sm font-bold text-primary">Teléfono / WhatsApp</label>
              <input id="quote-phone" name="telefono" type="tel" autoComplete="tel" value={formData.telefono} onChange={handleChange} disabled={isSubmitting} maxLength={25} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="quote-payment" className="text-sm font-bold text-primary">Pago de luz bimestral promedio (CFE)</label>
              <select id="quote-payment" name="pago" value={formData.pago} onChange={handleChange} disabled={isSubmitting} required className={inputClass}>
                <option value="" disabled>Selecciona un rango</option>
                {paymentOptions.map((amount) => (
                  <option key={amount} value={amount.replace(',', '')}>Más de ${amount} MXN</option>
                ))}
              </select>
            </div>
            <div className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center focus-within:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
              <label htmlFor="quote-receipt" className="block text-sm font-bold text-primary">Subir recibo de luz (Opcional)</label>
              <p id="quote-receipt-help" className="mt-2 text-sm text-gray-500">Arrastra o selecciona un archivo PDF, JPG o PNG</p>
              <p id="quote-receipt-limit" className="mt-1 text-xs text-gray-400">Máximo 10 MB para cálculo más ágil</p>
              <input id="quote-receipt" name="recibo" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" disabled={isSubmitting} onChange={handleReceipt} aria-invalid={Boolean(fileError)} aria-describedby="quote-receipt-help quote-receipt-limit quote-receipt-name quote-receipt-error" className="absolute inset-0 size-full cursor-pointer opacity-0" />
              <p id="quote-receipt-name" aria-live="polite" className="mt-2 break-all text-xs text-primary">{receiptName}</p>
              <p id="quote-receipt-error" role="alert" className="mt-1 text-xs text-red-700">{fileError}</p>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-accent px-6 py-4 font-bold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Enviando...' : 'Solicitar Mi Cotización y Estudio Gratis'}</button>
            <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-gray-400">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-3 shrink-0">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
              </svg>
              Tus datos están protegidos por nuestro Aviso de Privacidad. Sin spam.
            </p>
            <p role="status" className={`text-sm ${statusMessage?.success ? 'text-success' : 'text-red-700'}`}>{statusMessage?.message}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
