
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-qrz-dark z-0 opacity-60"></div>
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(0, 59, 168, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 102, 51, 0.2) 0%, transparent 50%)",
          backgroundSize: "cover"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center mb-8 animate-float">
          <img 
            src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
            alt="QRZ Tech Logo" 
            className="h-24 md:h-32 w-auto object-contain" 
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient">Transformamos</span> operações manuais em processos <span className="text-qrz-orange">automatizados</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Especialistas em Automação, Inteligência Artificial, Desenvolvimento Web e Integração de Sistemas
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a href="#contact" className="btn-primary">
            Fale Conosco
          </a>
          <a href="#solutions" className="btn-secondary">
            Conheça Nossas Soluções
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white animate-bounce w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
        aria-label="Rolar para baixo"
      >
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default HeroSection;
