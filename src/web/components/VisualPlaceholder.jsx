export default function VisualPlaceholder({ label }) {
  return (
    <div role="img" aria-label={`Imagen temporal: ${label}`} className="flex aspect-[4/3] items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center text-primary">
      <span><span className="block text-xs font-bold uppercase tracking-widest">Imagen temporal</span><span className="mt-3 block text-lg font-bold">{label}</span></span>
    </div>
  );
}
