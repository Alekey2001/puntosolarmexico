const certifications = ['CFE', 'FIDE', 'NOM-001', 'UL 1703', 'Código de Red'];

export default function CertificationsBanner() {
  return (
    <section aria-labelledby="certifications-title" className="bg-gray-50 py-8 font-sans">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4 lg:max-w-md">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-10 shrink-0 text-primary">
            <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
            <path d="m8 12 3 3 5-6" />
          </svg>
          <div>
            <h2 id="certifications-title" className="text-lg font-bold text-primary">Certificaciones y Avales Oficiales</h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">Acreditación institucional para interconexión segura y legal en México.</p>
          </div>
        </div>
        {/* NOTA: Reemplazar por logos oficiales de certificaciones (formato SVG preferentemente) */}
        <ul aria-label="Certificaciones y avales" className="flex flex-wrap items-center gap-6 lg:justify-end">
          {certifications.map((certification) => (
            <li key={certification} className="rounded-md border border-gray-200 bg-white px-4 py-3 text-center text-sm font-bold tracking-wide text-gray-400">
              {certification}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
