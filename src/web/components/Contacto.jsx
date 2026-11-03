import ContactActions from './ContactActions.jsx';

export default function Contacto() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-primary px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-7xl border-l-4 border-accent pl-6 sm:pl-10">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Hablemos de tu proyecto</p>
        <h2 id="contacto-title" className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">El siguiente paso empieza contigo.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">Ya sea para tu hogar, negocio o industria, en Punto Solar México queremos ayudarte a explorar tu potencial solar.</p>
        <ContactActions dark />
        <a href="#cotizacion" className="mt-6 inline-flex min-h-12 items-center rounded font-bold underline decoration-accent underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Ir al formulario</a>
      </div>
    </section>
  );
}
