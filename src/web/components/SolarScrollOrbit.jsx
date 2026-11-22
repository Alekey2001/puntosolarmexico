import { useEffect, useRef } from 'react';

export default function SolarScrollOrbit() {
  const orbitRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = null;

    const paint = () => {
      frame = null;
      orbit.style.transform = `rotate(${window.scrollY * 0.08}deg)`;
    };
    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(paint);
    };
    const syncMotion = () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      if (desktop.matches && !reducedMotion.matches) {
        paint();
        window.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        orbit.style.transform = 'rotate(0deg)';
      }
    };

    syncMotion();
    desktop.addEventListener('change', syncMotion);
    reducedMotion.addEventListener('change', syncMotion);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      desktop.removeEventListener('change', syncMotion);
      reducedMotion.removeEventListener('change', syncMotion);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={orbitRef} aria-hidden="true" className="fixed -right-36 top-1/4 w-[440px] h-[440px] pointer-events-none z-0 opacity-[0.06] hidden md:block">
      <svg viewBox="0 0 440 440" fill="none" className="h-full w-full" stroke="#172d5b" strokeWidth="1.5">
        <circle cx="220" cy="220" r="210" strokeDasharray="3 10" />
        <circle cx="220" cy="220" r="172" />
        <circle cx="220" cy="220" r="132" stroke="#f48020" strokeDasharray="6 12" />
        <circle cx="220" cy="220" r="70" />
        <path d="M220 10v140m0 140v140M10 220h140m140 0h140M72 72l99 99m98 98 99 99M72 368l99-99m98-98 99-99" strokeDasharray="4 8" />
        <path d="m220 178 12 30 30 12-30 12-12 30-12-30-30-12 30-12 12-30Z" stroke="#f48020" strokeWidth="2" />
        <g fill="#f48020" stroke="none">
          <circle cx="220" cy="48" r="8" />
          <circle cx="392" cy="220" r="6" />
          <circle cx="126.7" cy="313.3" r="7" />
        </g>
        <g fill="#172d5b" stroke="none">
          <circle cx="48" cy="220" r="6" />
          <circle cx="220" cy="392" r="8" />
          <circle cx="313.3" cy="126.7" r="7" />
        </g>
      </svg>
    </div>
  );
}
