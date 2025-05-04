
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PartnersSection from "../components/PartnersSection";
import PortfolioSection from "../components/PortfolioSection";
import SolutionsSection from "../components/SolutionsSection";
import WhatsAppButton from "../components/WhatsAppButton";

const Index = () => {
  return (
    <main className="bg-qrz-dark text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <PortfolioSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
