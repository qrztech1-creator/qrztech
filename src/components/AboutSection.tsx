
import { useRef, useEffect, useState } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');
  
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
    
    const children = sectionRef.current?.children;
    if (children) {
      Array.from(children).forEach(child => {
        observer.observe(child);
      });
    }
    
    return () => {
      if (children) {
        Array.from(children).forEach(child => {
          observer.unobserve(child);
        });
      }
    };
  }, []);

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-qrz-dark to-qrz-dark/90">
      <div className="section-container">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="opacity-0" style={{ transitionDelay: '0.2s' }}>
            <h2 className="section-title">Sobre Nós</h2>
            <p className="text-lg mb-6 text-gray-300">
              A <span className="text-qrz-orange font-semibold">QRZ Tech</span> nasceu para otimizar 
              fluxos, aumentar a produtividade e reduzir custos através de soluções tecnológicas inovadoras.
            </p>
            <p className="text-lg mb-6 text-gray-300">
              Nossa abordagem vai além da técnica - entregamos valor estratégico 
              para o seu negócio com tecnologia de ponta e expertise especializada.
            </p>
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <p className="text-3xl font-bold text-qrz-orange">100+</p>
                <p className="text-gray-400">Projetos Entregues</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-qrz-orange">30+</p>
                <p className="text-gray-400">Clientes Ativos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-qrz-orange">5+</p>
                <p className="text-gray-400">Anos de Expertise</p>
              </div>
            </div>
          </div>
          
          <div className="relative opacity-0" style={{ transitionDelay: '0.4s' }}>
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl">
              <div className="flex justify-center mb-6 border-b border-gray-800">
                <button 
                  className={`px-6 py-3 text-center w-1/2 transition-all ${activeTab === 'mission' ? 'text-qrz-orange border-b-2 border-qrz-orange' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('mission')}
                >
                  Nossa Missão
                </button>
                <button 
                  className={`px-6 py-3 text-center w-1/2 transition-all ${activeTab === 'vision' ? 'text-qrz-blue-light border-b-2 border-qrz-blue-light' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('vision')}
                >
                  Nossa Visão
                </button>
              </div>
              
              <div className="h-[200px] flex items-center justify-center">
                <div className={`text-center transition-all duration-500 transform ${activeTab === 'mission' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 absolute'}`}>
                  <h3 className="text-2xl font-bold mb-4 text-qrz-orange font-montserrat">Nossa Missão</h3>
                  <p className="text-gray-300">
                    Impulsionar o crescimento dos nossos clientes através da transformação digital,
                    automatizando processos e implementando soluções tecnológicas inteligentes e eficientes.
                  </p>
                </div>
                
                <div className={`text-center transition-all duration-500 transform ${activeTab === 'vision' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 absolute'}`}>
                  <h3 className="text-2xl font-bold mb-4 text-qrz-blue-light font-montserrat">Nossa Visão</h3>
                  <p className="text-gray-300">
                    Ser referência em soluções tecnológicas inovadoras, criando impacto positivo
                    mensurável nos resultados e na eficiência operacional dos nossos clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
