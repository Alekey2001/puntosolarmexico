import { useState } from 'react';

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text', autoComplete: 'given-name' },
  { name: 'apellidos', label: 'Apellidos', type: 'text', autoComplete: 'family-name' },
  { name: 'correo', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
];
const amounts = ['8,000', '10,000', '15,000', '40,000'];
const inputClass = 'mt-2 min-h-12 w-full rounded-lg border border-primary/30 bg-white px-3 py-2 text-base text-primary focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary';

export default function LeadForm() {
  const [receiptName, setReceiptName] = useState('');
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function selectReceipt(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    const valid = !file || /\.pdf$/i.test(file.name) || file.type.startsWith('image/');
    const error = !valid ? 'Selecciona un PDF o una imagen.' : file?.size > 10 * 1024 * 1024 ? 'El archivo debe pesar como máximo 10 MB.' : '';
    input.setCustomValidity(error);
    setFileError(error);
    setReceiptName(file?.name ?? '');
  }

  function validatePhone(event) {
    const input = event.currentTarget;
    const digits = input.value.replace(/\D/g, '');
    input.setCustomValidity(digits.length < 10 || digits.length > 15 ? 'Ingresa un teléfono de entre 10 y 15 dígitos.' : '');
  }

  function submit(event) {
    event.preventDefault();
    // Prototipo local: no enviar ni almacenar datos personales o archivos.
    setSubmitted(true);
  }

  return (
    <aside id="cotizacion" aria-labelledby="lead-title" className="min-w-0 scroll-mt-6 rounded-2xl bg-white p-6 text-primary shadow-xl sm:p-8">
      <p className="text-sm font-bold uppercase tracking-widest">Da el primer paso</p>
      <h2 id="lead-title" className="mt-2 text-3xl font-bold">Conoce tu potencial solar</h2>
      <p id="lead-note" className="mt-3 text-sm leading-relaxed">Vista previa del formulario: tus datos y tu recibo no se envían ni se guardan. Todos los campos son obligatorios, excepto el recibo.</p>
      <form onSubmit={submit} onChange={() => setSubmitted(false)} aria-describedby="lead-note" className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="min-w-0">
              <label htmlFor={`lead-${field.name}`} className="text-sm font-bold">{field.label}</label>
              <input
                id={`lead-${field.name}`} name={field.name} type={field.type}
                autoComplete={field.autoComplete} required maxLength={field.type === 'tel' ? 25 : 150}
                pattern={field.type === 'tel' ? '[+0-9\\(\\) .\\-]{10,25}' : field.type === 'text' ? '.*\\S.*' : undefined}
                title={field.type === 'tel' ? 'Ingresa entre 10 y 15 dígitos; puedes incluir código de país, espacios o guiones.' : undefined}
                onInput={field.type === 'tel' ? validatePhone : undefined}
                className={inputClass}
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="lead-consumo" className="text-sm font-bold">¿Cuánto pagas de luz?</label>
          <select id="lead-consumo" name="consumo" required defaultValue="" className={inputClass}>
            <option value="" disabled>Selecciona un rango</option>
            {amounts.map((amount) => <option key={amount} value={amount.replace(',', '')}>Más de ${amount} MXN</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lead-recibo" className="block text-sm font-bold">Subir recibo <span className="font-normal">(opcional)</span></label>
          <input id="lead-recibo" name="recibo" type="file" accept=".pdf,image/*" onChange={selectReceipt} aria-describedby="receipt-help receipt-name receipt-error" aria-invalid={fileError ? true : undefined} className="mt-2 block w-full min-w-0 rounded-lg border border-dashed border-primary/40 p-3 text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:font-bold file:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
          <p id="receipt-help" className="mt-2 text-xs">PDF o imagen, máximo 10 MB.</p>
          <p id="receipt-name" aria-live="polite" className="mt-1 break-all text-sm">{receiptName && `Archivo seleccionado: ${receiptName}`}</p>
          <p id="receipt-error" role="alert" className="mt-1 text-sm font-bold">{fileError}</p>
        </div>
        <button type="submit" className="min-h-12 w-full rounded-lg bg-accent px-6 py-3 font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Validar solicitud</button>
        <p role="status" className="text-sm font-bold leading-relaxed">{submitted && 'Formulario validado. Esta es una demostración: no se han enviado tus datos ni tu recibo.'}</p>
      </form>
    </aside>
  );
}
