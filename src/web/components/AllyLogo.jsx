const wordmarks = {
  solis: { text: 'SOLIS', size: 18, weight: 900, spacing: 3 },
  'canadian-solar': { text: 'Canadian Solar', size: 14, weight: 700, spacing: 0 },
  growatt: { text: 'Growatt', size: 17, weight: 700, spacing: 0 },
  trinasolar: { text: 'trinasolar', size: 16, weight: 500, spacing: 0 },
  'tw-solar': { text: 'TW SOLAR', size: 16, weight: 900, spacing: 1 },
};

export default function AllyLogo({ id, brand }) {
  const mark = wordmarks[id] ?? { text: brand, size: 14, weight: 700, spacing: 0 };
  return (
    <svg role="img" aria-label={brand} viewBox="0 0 120 24" className="h-5 w-auto sm:h-6">
      <text
        x="60"
        y="17"
        textAnchor="middle"
        fontFamily="Roboto, sans-serif"
        fontSize={mark.size}
        fontWeight={mark.weight}
        letterSpacing={mark.spacing}
        fill="#172d5b"
      >
        {mark.text}
      </text>
    </svg>
  );
}