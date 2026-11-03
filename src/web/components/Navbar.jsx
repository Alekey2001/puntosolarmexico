import { useState } from 'react';
// NOTA: Reemplazar 'temp-logo.svg' por el logotipo positivo oficial en src/assets/media/.
import logo from '../../assets/media/temp-logo.svg';

const links = [['Inicio', '#inicio'], ['Residencial', '#residencial'], ['Comercial', '#comercial'], ['Industrial', '#industrial']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = 'rounded px-3 py-3 font-bold hover:underline decoration-accent underline-offset-8 focus-visible:outline-2 focus-visible:outline-primary';

  return (
    <header className="relative z-20 bg-white text-primary">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4">Saltar al contenido</a>
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="hidden items-center lg:flex">
          {links.slice(0, 2).map(([label, href]) => <a key={href} href={href} className={linkClass}>{label}</a>)}
        </div>
        <a href="#inicio" aria-label="Punto Solar México, inicio" className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-primary">
          {/* NOTA: Reemplazar 'temp-logo.svg' por 'logotipo_punto solar mexico_RGB-02.jpg.jpeg' y actualizar el import; conservar sus proporciones. */}
          <img src={logo} alt="" width="56" height="56" className="h-14 w-14 object-contain" />
          <span className="text-lg font-bold leading-tight">PUNTO SOLAR<span className="block text-sm tracking-[0.2em]">MÉXICO</span></span>
        </a>
        <div className="hidden items-center justify-end lg:flex">
          {links.slice(2).map(([label, href]) => <a key={href} href={href} className={linkClass}>{label}</a>)}
        </div>
        <button type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="min-h-11 rounded border border-primary px-4 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden">
          {open ? 'Cerrar' : 'Menú'}
        </button>
        <div id="mobile-menu" hidden={!open} className="w-full border-t border-primary/15 pt-3 lg:hidden" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); event.currentTarget.previousElementSibling.focus(); } }}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className={`block ${linkClass}`}>{label}</a>)}
        </div>
      </nav>
    </header>
  );
}
