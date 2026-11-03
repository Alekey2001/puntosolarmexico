import ContactActions from './ContactActions.jsx';
import LeadForm from './LeadForm.jsx';
import heroImage from '../../assets/media/temp-hero.svg';

// NOTA: Reemplazar temp-hero.svg por el asset oficial
const heroBackground = <img src={heroImage} alt="" aria-hidden="true" fetchPriority="high" width="1600" height="1000" className="absolute inset-0 -z-20 size-full object-cover" />;

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary px-6 py-16 font-sans text-white sm:px-10 lg:py-24">
      {heroBackground}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/90" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm font-bold tracking-widest text-accent">PUNTO SOLAR MÉXICO</p>
          <h1 id="hero-title" className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Paneles solares.<br /><span className="text-accent">Más posibilidades.</span>
          </h1>
          <p className="mt-6 max-w-lg text-xl leading-relaxed">Energía para tu hogar, negocio e industria. Encuentra un sistema solar a la medida de tu consumo.</p>
          <ContactActions dark />
          <p className="mt-6 text-sm leading-relaxed text-white/80">El primer paso es conocer tu recibo de luz. Te ayudamos a explorar las posibilidades de tu espacio.</p>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
