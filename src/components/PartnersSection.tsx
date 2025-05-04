
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

  // Logos dos clientes
  const partners = [
    { name: "BioHealth Corretora", logo: "https://biohealthcorretora.com/img/logo%20sit.png" },
    { name: "Patrícia Posses (A Forma da Fala)", logo: "https://i.postimg.cc/90BGvkzY/MARCA-DAGUA-ICONE-ROSA.png" },
    { name: "Clínica Excelence Odontologia Integrada", logo: "https://i.postimg.cc/50ZZj3m5/Log2.png" },
    { name: "BioEstetic Medicina Estética Avançada", logo: "https://bioestetic.bioestetic.com.br/wp-content/uploads/2025/03/logo-bioestetic.webp" },
    { name: "Fishing Business", logo: "https://www.fishingbusiness.com.br/img/logo%20fishing.png" },
    { name: "Dra. Manoela Sarmento", logo: "https://assets.makefunnels.com.br/media/users/u3669/media-3669-546707fe2a89fe7565-vp-default-sm-93px.webp" },
  ];

  return (
    <section id="partners" className="py-12 bg-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-10">
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
              className="flex justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all h-32 items-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 max-w-full object-contain filter hover:grayscale-0 transition-all duration-300" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-400">
            E muitas outras empresas que já transformaram seus processos com a QRZ Tech.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
