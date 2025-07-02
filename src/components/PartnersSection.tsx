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

  // Logos dos clientes com links
  const partners = [
    { 
      name: "Clinica Praia da Costa", 
      logo: "https://i.postimg.cc/CMDW70kg/logo-branco-clinica-praia-da-costa.png",
      url: "https://www.clinicapraiadacosta.com.br/"
    },
    { 
      name: "Esteban", 
      logo: "https://i.postimg.cc/02GFyk0r/Sem-nome-1024-x-1024-px-500-x-500-px-2.png",
      url: "https://www.drestebansadovsky.com.br/"
    },
    { 
      name: "Amplity", 
      logo: "https://i.postimg.cc/sx7cG83r/amplity.png",
      url: "https://amplitydh.com.br/"
    },
    { 
      name: "Patrícia Posses (A Forma da Fala)", 
      logo: "https://i.postimg.cc/90BGvkzY/MARCA-DAGUA-ICONE-ROSA.png",
      url: "https://velvety-paprenjak-8dada5.netlify.app/"
    },
    { 
      name: "Clínica Excelence Odontologia Integrada", 
      logo: "https://i.postimg.cc/50ZZj3m5/Log2.png",
      url: "https://excelenceodontologia.com.br/"
    },
    { 
      name: "BioEstetic Medicina Estética Avançada", 
      logo: "https://bioestetic.bioestetic.com.br/wp-content/uploads/2025/03/logo-bioestetic.webp",
      url: "https://bioestetic.bioestetic.com.br/"
    },
    { 
      name: "BioHealth Corretora", 
      logo: "https://biohealthcorretora.com/img/logo%20sit.png",
      url: "https://biohealthcorretora.com/"
    },
    { 
      name: "Dra. Manoela Sarmento", 
      logo: "https://assets.makefunnels.com.br/media/users/u3669/media-3669-546707fe2a89fe7565-vp-default-sm-93px.webp",
      url: "https://www.instagram.com/dramanoelasarmento/"
    },
    { 
      name: "Fishing Business", 
      logo: "https://www.fishingbusiness.com.br/img/logo%20fishing.png",
      url: "https://www.fishingbusiness.com.br/"
    },
    { 
      name: "TC Beauty", 
      logo: "https://dcdn-us.mitiendanube.com/stores/006/190/512/themes/common/logo-2110752536-1748523248-68dd26e5b7d038b3b19152ea0618297c1748523248-480-0.webp",
      url: "https://tcbeautycare.com.br/"
    },
  ];

  return (
    <section id="partners" className="py-8 bg-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Nossos Clientes</h2>
          <p className="text-lg mt-5 text-gray-300 max-w-3xl mx-auto">
            Algumas empresas que já confiam em nossas soluções para impulsionar seus negócios.
          </p>
        </div>
        
        <div 
          ref={partnersRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-0"
        >
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all h-32 items-center group"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
                aria-label={`Visitar site de ${partner.name}`}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-20 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 hover:scale-105" 
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">
            E muitas outras empresas que já transformaram seus processos com a <strong>QRZ Tech</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;