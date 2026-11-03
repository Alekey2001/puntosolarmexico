// Configurar los números oficiales con código de país antes de publicar.
const whatsapp = (import.meta.env.VITE_CONTACT_WHATSAPP ?? '').replace(/\D/g, '');
const phone = (import.meta.env.VITE_CONTACT_PHONE ?? '').replace(/\D/g, '');
const validNumber = (value) => /^[1-9]\d{9,14}$/.test(value);

export default function ContactActions({ dark = false }) {
  const actions = [
    { label: 'WhatsApp', number: whatsapp, href: `https://wa.me/${whatsapp}`, className: 'bg-success text-white', external: true },
    { label: 'Llamar a un asesor', number: phone, href: `tel:+${phone}`, className: 'bg-accent text-primary' },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const className = `inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? 'focus-visible:outline-white' : 'focus-visible:outline-primary'} ${action.className}`;
          return validNumber(action.number) ? (
            <a key={action.label} href={action.href} target={action.external ? '_blank' : undefined} rel={action.external ? 'noopener noreferrer' : undefined} className={`${className} hover:underline`}>{action.label}</a>
          ) : (
            <button key={action.label} type="button" disabled className={`${className} cursor-not-allowed opacity-70`}>{action.label}</button>
          );
        })}
      </div>
      {(!validNumber(whatsapp) || !validNumber(phone)) && <p className="mt-3 text-sm">Contacto directo próximamente disponible.</p>}
    </div>
  );
}
