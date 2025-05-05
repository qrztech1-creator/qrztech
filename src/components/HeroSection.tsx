
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      <div className="absolute inset-0 bg-qrz-dark z-0 opacity-60"></div>
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(0, 59, 168, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 102, 51, 0.2) 0%, transparent 50%)",
          backgroundSize: "cover"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center mb-4 animate-float">
          <img 
            src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
            alt="QRZ Tech Logo" 
            className="h-24 md:h-32 w-auto object-contain" 
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient">Inteligência Digital</span> que <span className="text-qrz-orange">Transforma</span>
        </h1>
        
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-6 text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Automações, Inteligência Artificial, Desenvolvimento Web e Integração de Sistemas
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Fale Conosco
          </a>
          <a href="#solutions" className="btn-secondary">
            Conheça Nossas Soluções
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
