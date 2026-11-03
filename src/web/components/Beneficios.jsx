import VisualPlaceholder from './VisualPlaceholder.jsx';

// NOTA: Reemplazar temp-beneficios por el asset oficial
const visual = <VisualPlaceholder label="Energía solar en tu espacio" />;
const benefits = [
  ['Ahorro a tu medida', 'Aprovecha la energía del sol para reducir tu consumo de la red eléctrica.'],
  ['Planeación de tu inversión', 'Conoce una propuesta basada en tu tarifa, consumo y espacio disponible.'],
  ['Energía renovable', 'Genera electricidad con una fuente renovable desde tu propiedad.'],
];

export default function Beneficios() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest">Tu energía, con más posibilidades</p>
          <h2 id="beneficios-title" className="mt-3 text-3xl font-bold sm:text-4xl">Haz que el sol trabaje a tu favor.</h2>
          <ul className="mt-8 space-y-6">
            {benefits.map(([title, description]) => <li key={title} className="border-l-4 border-accent pl-5"><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 leading-relaxed">{description}</p></li>)}
          </ul>
          <p className="mt-6 text-sm leading-relaxed">El ahorro depende de tu consumo, tarifa y las condiciones de instalación. Se estima después de evaluar tu proyecto.</p>
        </div>
        {visual}
      </div>
    </section>
  );
}
