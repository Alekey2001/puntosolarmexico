import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer#site-footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="https://wa.me/5213332175444?text=Hola%2C%20vengo%20de%20su%20sitio%20web%2C%20quisiera%20cotizar%20%2F%20preguntar%3A%20"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp (abre en una pestaña nueva)"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-success motion-reduce:transition-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <span aria-hidden="true" className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-7">
        <path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z" />
        <path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 2c-1 3-5 1-7-1s-4-6-2-8Z" />
      </svg>
    </a>
  );
}
