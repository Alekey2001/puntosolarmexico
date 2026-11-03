import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import Beneficios from '../components/Beneficios.jsx';
import Soluciones from '../components/Soluciones.jsx';
import Proceso from '../components/Proceso.jsx';
import Servicios from '../components/Servicios.jsx';
import PreguntasFrecuentes from '../components/PreguntasFrecuentes.jsx';
import Contacto from '../components/Contacto.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="font-sans text-primary">
        <Hero />
        <Beneficios />
        <Soluciones />
        <Proceso />
        <Servicios />
        <PreguntasFrecuentes />
        <Contacto />
      </main>
    </>
  );
}