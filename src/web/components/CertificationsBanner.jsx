const certifications = [
  {
    name: 'CRE', institution: 'Comisión Reguladora de Energía', detail: 'Permiso Generación Distribuida',
    emblem: <>
      <path d="m24 3 6 4 7 1 3 7 5 9-5 9-3 7-7 1-6 4-6-4-7-1-3-7-5-9 5-9 3-7 7-1 6-4Z" />
      <circle cx="24" cy="24" r="14" />
      <text x="24" y="25" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="800">CRE</text>
      <path d="m18 31 4 3 8-7" stroke="#4a8b2c" strokeWidth="2.5" />
    </>,
  },
  {
    name: 'CFE', institution: 'Comisión Federal de Electricidad', detail: 'Contrato Interconexión Bidireccional',
    emblem: <>
      <path d="M19 5h10l9 38M19 5 10 43M16 15h16M13 27h22M10 43h28M19 5l13 10-19 12 25 16M29 5 16 15l19 12-25 16M8 15h32M5 27h38M8 15v5m32-5v5M5 27v5m38-5v5" />
      <path d="m25 17-6 9h5l-1 7 7-11h-5l1-5Z" fill="#4a8b2c" stroke="#4a8b2c" />
    </>,
  },
  {
    name: 'SELLO FIDE', institution: 'Fideicomiso para el Ahorro', detail: 'Equipos con Eficiencia Certificada',
    emblem: <g stroke="#f48020">
      <path d="M24 4 8 10v13c0 10 16 19 16 19s16-9 16-19V10L24 4Z" />
      <path d="M24 9 13 13v10c0 7 11 13 11 13s11-6 11-13V13L24 9Z" />
      <text x="24" y="23" textAnchor="middle" fill="#f48020" stroke="none" fontSize="9" fontWeight="800">FIDE</text>
      <path d="m19 28 4 3 6-6" />
    </g>,
  },
  {
    name: 'NOM-001-SEDE', institution: 'Norma Oficial Mexicana', detail: 'Instalaciones Eléctricas Seguras',
    emblem: <>
      <path d="m15 4-11 11v18l11 11h18l11-11V15L33 4H15Z" />
      <path d="M16 9 9 16v16l7 7h16l7-7V16l-7-7H16Z" />
      <text x="24" y="24" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="800">NOM</text>
      <path d="M16 30h16" stroke="#4a8b2c" strokeWidth="2.5" />
      <path d="M20 34h8" />
    </>,
  },
  {
    name: 'UL 1703 / IEC 61215', institution: 'Estándar Internacional Tier 1', detail: 'Módulos Fotovoltaicos Certificados',
    emblem: <>
      <circle cx="22" cy="22" r="18" />
      <ellipse cx="22" cy="22" rx="8" ry="18" />
      <path d="M4 22h36M7 12h30M7 32h20" />
      <circle cx="35" cy="35" r="10" fill="#f8fafc" stroke="#4a8b2c" />
      <path d="m30 35 3 3 7-7" stroke="#4a8b2c" strokeWidth="2.5" />
    </>,
  },
  {
    name: 'CÓDIGO DE RED', institution: 'CENACE / CRE', detail: 'Cumplimiento Calidad de Energía',
    emblem: <>
      <rect x="5" y="5" width="38" height="38" rx="6" />
      <path d="M14 5v38M24 5v38M34 5v38M5 14h38M5 24h38M5 34h38" strokeOpacity="0.2" />
      <path d="M8 24h5c4-18 6 18 11 0s7 18 11 0h5" stroke="#4a8b2c" strokeWidth="2.5" />
      <circle cx="8" cy="24" r="2" fill="#f48020" stroke="none" />
      <circle cx="40" cy="24" r="2" fill="#f48020" stroke="none" />
    </>,
  },
];

export default function CertificationsBanner() {
  return (
    <section aria-labelledby="certifications-title" className="bg-white border-b border-slate-200/80 py-6 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#172d5b]/10 text-[#172d5b] flex items-center justify-center shrink-0">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-6">
              <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
              <path d="m8 12 3 3 5-6" />
            </svg>
          </div>
          <div>
            <h2 id="certifications-title" className="text-sm font-bold text-[#172d5b]">Certificaciones y Avales Oficiales</h2>
            <p className="mt-1 text-xs text-slate-500">Acreditación nivel nacional para interconexión segura y legal en México</p>
          </div>
        </div>
        <ul aria-label="Certificaciones y avales" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          {certifications.map(({ name, institution, detail, emblem }) => (
            <li key={name} className="bg-white border border-slate-200/90 shadow-xs rounded-xl p-3.5 flex items-center gap-3 hover:border-[#172d5b]/40 transition-all">
              <span className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0">
                <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-9 text-[#172d5b]">
                  {emblem}
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-extrabold text-xs text-[#172d5b] tracking-tight">{name}</p>
                <p className="mt-1 text-[11px] text-slate-500 leading-tight">{institution}</p>
                <p className="mt-1 text-[11px] text-slate-500 leading-tight">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
