const waUrl = 'https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20';

export default function ContactActions({ dark = false }) {
  const actions = [
    { label: 'WhatsApp', className: 'bg-success text-white' },
    { label: 'Llamar a un asesor', className: 'bg-accent text-primary' },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const className = `inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? 'focus-visible:outline-white' : 'focus-visible:outline-primary'} ${action.className}`;
          return (
            <a key={action.label} href={waUrl} target="_blank" rel="noopener noreferrer" className={`${className} hover:underline`}>{action.label}</a>
          );
        })}
      </div>
    </div>
  );
}
