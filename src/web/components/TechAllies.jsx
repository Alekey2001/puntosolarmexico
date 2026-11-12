const allies = ['CanadianSolar', 'Enphase', 'HUAWEI Solar', 'Growatt', 'LONGI Solar', 'SMA Solar'];

export default function TechAllies() {
  return (
    <section aria-labelledby="tech-allies-title" className="border-y border-gray-100 bg-gray-50/50 font-sans">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-8 lg:flex-row lg:gap-8">
        <div className="text-center lg:max-w-xs lg:shrink-0 lg:text-left">
          <h2 id="tech-allies-title" className="text-sm font-bold tracking-widest text-primary">ALIADOS TECNOLÓGICOS TIER 1</h2>
          <p className="mt-1 text-xs text-gray-500">Componentes con certificación internacional UL, IEC y NOM</p>
        </div>
        <ul aria-label="Aliados tecnológicos" className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:mt-0 lg:justify-end lg:gap-8">
          {/* NOTA: Reemplazar textos por logos oficiales en formato SVG de los Aliados Tecnológicos */}
          {allies.map((ally) => (
            <li key={ally} className="px-3 py-1 text-center text-sm font-semibold text-gray-400 transition-colors hover:text-primary">{ally}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
