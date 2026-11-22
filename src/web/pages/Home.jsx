import Hero from '../components/Hero.jsx';
import CertificationsBanner from '../components/CertificationsBanner.jsx';
import LeadFormSection from '../components/LeadFormSection.jsx';
import TechAllies from '../components/TechAllies.jsx';
import EnergyEfficiency from '../components/EnergyEfficiency.jsx';
import ImpactStats from '../components/ImpactStats.jsx';
import SpecializedLines from '../components/SpecializedLines.jsx';
import ServicesOverview from '../components/ServicesOverview.jsx';
import FAQSection from '../components/FAQSection.jsx';
import Layout from '../components/Layout.jsx';
import Soluciones from '../components/Soluciones.jsx';
import Proceso from '../components/Proceso.jsx';
import Contacto from '../components/Contacto.jsx';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <CertificationsBanner />
      <LeadFormSection />
      <TechAllies />
      <EnergyEfficiency />
      <ImpactStats />
      <SpecializedLines />
      <ServicesOverview />
      <Soluciones />
      <Proceso />
      <Contacto />
      <FAQSection />
    </Layout>
  );
}
