import logo from '../../assets/media/logo.webp';

const waUrl = 'https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20';
const linkClass = 'text-sm text-white/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white aria-disabled:cursor-not-allowed';

// Completar los destinos pendientes cuando estén disponibles las páginas y perfiles oficiales.
const solutions = [
  { label: 'Residencial DAC', href: '#residencial' },
  { label: 'Comercial e Industrial', href: '#comercial' },
  { label: 'Tarifa GDMTO y GDMTH', href: '#industrial' },
  { label: 'Interconexión CFE', href: '#energy-efficiency-title' },
  { label: 'Calentadores CFE' },
];
const institutional = [
  { label: 'Nosotros' },
  { label: 'Proyectos', href: '#soluciones' },
  { label: 'Impacto Ecológico', href: '#impact-stats-title' },
  { label: 'Aviso de Privacidad' },
  { label: 'Términos y Condiciones' },
];
const socials = [
  { label: 'Facebook', icon: 'M14 21v-8h3l1-4h-4V7c0-1 1-2 2-2h2V2h-3c-4 0-5 3-5 5v2H7v4h3v8' },
  { label: 'Instagram', icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1-5h.01' },
  { label: 'LinkedIn', icon: 'M4 9v12M4 4v.01M10 21V9m0 5a4 4 0 0 1 8 0v7' },
  { label: 'WhatsApp', href: waUrl, icon: 'M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5ZM8 7l2 3-1 1c1 2 2 3 4 4l1-1 3 2c-1 3-5 1-7-1s-4-6-2-8Z' },
];
const contacts = [
  { text: 'Corporativo 4A Av. Insurgentes Sur, CDMX & Cobertura Nacional', icon: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
  { text: '800 786 8676 (Lada sin costo)', href: 'tel:+528007868676', icon: 'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C9 21 3 15 3 5a2 2 0 0 1 2-2Z' },
  { text: 'contacto@puntosolar.mx', href: 'mailto:contacto@puntosolar.mx', icon: 'M3 5h18v14H3V5Zm0 0 9 7 9-7' },
  { text: 'Atención Activa en Horario CFE', icon: 'm5 12 4 4L19 6', active: true },
];
const bottomLinks = [
  { label: 'Aviso de Privacidad' },
  { label: 'Términos de Servicio' },
  { label: 'Contacto', href: '#contacto' },
];

function Icon({ path, className = 'size-5 shrink-0' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-primary pb-8 pt-16 font-sans text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="Punto Solar México" width="64" height="64" loading="lazy" className="h-16 w-auto max-w-full object-contain" />
          <p className="mt-6 text-sm leading-relaxed text-white/70">Empresa mexicana líder en ingeniería, suministro e instalación de sistemas fotovoltaicos de alta eficiencia para los sectores residencial, comercial e industrial.</p>
          <div aria-label="Redes sociales" className="mt-6 flex gap-3">
            {socials.map((social) => {
              const className = `flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed ${social.label === 'WhatsApp' ? 'bg-success hover:bg-success/80' : 'bg-white/10 hover:bg-accent'}`;
              return social.href ? (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className={className}><Icon path={social.icon} /></a>
              ) : (
                <button key={social.label} type="button" disabled aria-label={`${social.label}: próximamente disponible`} className={className}><Icon path={social.icon} /></button>
              );
            })}
          </div>
        </div>
        {[
          { title: 'SOLUCIONES', links: solutions },
          { title: 'INSTITUCIONAL', links: institutional },
        ].map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="mb-6 text-sm font-bold tracking-widest text-white">{group.title}</h2>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}><a href={link.href} aria-disabled={!link.href} className={linkClass}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="mb-6 text-sm font-bold tracking-widest text-white">CONTACTO MÉXICO</h2>
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact.text} className={`flex items-start gap-3 text-sm ${contact.active ? 'font-semibold text-success' : 'text-white/70'}`}>
                <Icon path={contact.icon} />
                {contact.href ? <a href={contact.href} className="min-w-0 break-words transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{contact.text}</a> : <span>{contact.text}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-center text-xs text-white/50 md:text-left">© 2024 Punto Solar México. Todos los derechos reservados. Soluciones fotovoltaicas de alta eficiencia.</p>
          <nav aria-label="Enlaces legales y contacto" className="flex flex-wrap justify-center gap-6">
            {bottomLinks.map((link) => (
              <a key={link.label} href={link.href} aria-disabled={!link.href} className="text-xs text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white aria-disabled:cursor-not-allowed">{link.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
