
import { useEffect, useRef } from "react";

const PartnersSection = () => {
  const partnersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (partnersRef.current) {
      observer.observe(partnersRef.current);
    }
    
    return () => {
      if (partnersRef.current) {
        observer.unobserve(partnersRef.current);
      }
    };
  }, []);

  // Exemplo de logos de parceiros/clientes
  const partners = [
    { name: "Empresa A", logo: "https://via.placeholder.com/150x80?text=Cliente+A" },
    { name: "Empresa B", logo: "https://via.placeholder.com/150x80?text=Cliente+B" },
    { name: "Empresa C", logo: "https://via.placeholder.com/150x80?text=Cliente+C" },
    { name: "Empresa D", logo: "https://via.placeholder.com/150x80?text=Cliente+D" },
    { name: "Empresa E", logo: "https://via.placeholder.com/150x80?text=Cliente+E" },
    { name: "Empresa F", logo: "https://via.placeholder.com/150x80?text=Cliente+F" },
  ];

  return (
    <section id="partners" className="py-16 bg-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Nossos Clientes</h2>
          <p className="text-lg mt-6 text-gray-300 max-w-3xl mx-auto">
            Empresas que confiam em nossas soluções tecnológicas para impulsionar seus negócios.
          </p>
        </div>
        
        <div 
          ref={partnersRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-0"
        >
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Junte-se a dezenas de empresas que transformaram seus processos com a QRZ Tech.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
