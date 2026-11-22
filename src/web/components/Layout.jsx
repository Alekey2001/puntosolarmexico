import useScrollReveal from '../hooks/useScrollReveal';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import SolarScrollOrbit from './SolarScrollOrbit.jsx';

export default function Layout({ children }) {
  const revealRef = useScrollReveal({ discoverSections: true, viewKey: children });

  return (
    <>
      <Navbar />
      <main ref={revealRef} id="contenido" tabIndex={-1} className="font-sans text-primary">
        {children}
      </main>
      <SolarScrollOrbit />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
