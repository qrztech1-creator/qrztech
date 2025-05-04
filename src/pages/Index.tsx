
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PartnersSection from "../components/PartnersSection";
import PortfolioSection from "../components/PortfolioSection";
import SolutionsSection from "../components/SolutionsSection";
import WhatsAppButton from "../components/WhatsAppButton";
import N8nFlowsSection from "../components/N8nFlowsSection";

const Index = () => {
  return (
    <main className="bg-qrz-dark text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <PortfolioSection />
      <div className="py-6"></div> {/* Additional spacing between Portfolio and Flows sections */}
      <N8nFlowsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
