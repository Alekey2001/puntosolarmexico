import { useEffect, useRef } from 'react';

export const scrollRevealClass = 'opacity-0 translate-y-6 scale-[0.985] transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none';
export const scrollRevealDelays = ['delay-100', 'delay-200', 'delay-300'];

export default function useScrollReveal({ discoverSections = false, viewKey } = {}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (discoverSections) {
      section.querySelectorAll('section').forEach((block) => {
        // Respeta los bloques que ya gestionan sus propios efectos (como Hero).
        if (block.querySelector('[data-scroll-reveal]')) return;
        block.querySelectorAll(':scope > div').forEach((element) => {
          element.dataset.scrollReveal = '';
          element.dataset.scrollRevealGlobal = '';
          element.classList.add(...scrollRevealClass.split(' '));
        });
      });
    }
    const selector = discoverSections ? '[data-scroll-reveal-global].opacity-0' : '[data-scroll-reveal].opacity-0';
    const pending = new Set(section.querySelectorAll(selector));
    if (!pending.size) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    let fallbackTimer;

    const reveal = (element) => {
      element.classList.remove('opacity-0', 'translate-y-6', 'scale-[0.985]');
      element.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      observer?.unobserve(element);
      pending.delete(element);
      if (!pending.size) {
        observer?.disconnect();
        window.clearTimeout(fallbackTimer);
      }
    };
    const revealAll = () => pending.forEach(reveal);
    const handleMotionChange = () => {
      if (reducedMotion.matches) revealAll();
    };
    const handleFocus = (event) => {
      const target = event.target.closest('[data-scroll-reveal]');
      if (pending.has(target)) reveal(target);
    };

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    // Evita contenido oculto si el observador no entrega sus notificaciones.
    fallbackTimer = window.setTimeout(revealAll, 900);
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, intersectionRatio, target }) => {
          if (isIntersecting && intersectionRatio >= 0.12) reveal(target);
        });
      }, { threshold: 0.12 });
      pending.forEach((element) => observer.observe(element));
    } catch {
      revealAll();
    }
    section.addEventListener('focusin', handleFocus);
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer?.disconnect();
      section.removeEventListener('focusin', handleFocus);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, [discoverSections, viewKey]);

  return sectionRef;
}
