const solarImage = 'https://images.unsplash.com/photo-1509391366360-2e959784a276';

export default function Hero({ onQuoteRequest }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen min-h-svh items-center overflow-hidden bg-primary px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <img
        src={`${solarImage}?auto=format&fit=crop&w=2400&q=85`}
        srcSet={`${solarImage}?auto=format&fit=crop&w=768&q=80 768w, ${solarImage}?auto=format&fit=crop&w=1280&q=85 1280w, ${solarImage}?auto=format&fit=crop&w=2400&q=85 2400w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        width="2400"
        height="1600"
        className="absolute inset-0 -z-20 size-full object-cover object-[60%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/70" />

      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-8 flex items-center gap-3 text-xs font-bold tracking-[0.2em] sm:text-sm">
          <span aria-hidden="true" className="h-0.5 w-10 shrink-0 bg-accent" />
          PUNTO SOLAR MÉXICO
        </p>
        <h1
          id="hero-title"
          className="max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-tight"
        >
          Expertos en<br />Energía Solar
        </h1>
        <p className="mt-7 text-xl leading-relaxed text-white/90 sm:text-2xl">
          Energía solar, así de simple.
        </p>
        <button
          type="button"
          onClick={onQuoteRequest}
          className="mt-10 inline-flex min-h-14 cursor-pointer items-center justify-center gap-4 rounded-md bg-accent px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#db701b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
        >
          Cotiza tu sistema
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5">
            <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
