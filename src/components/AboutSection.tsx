
import { useRef, useEffect } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section id="about" className="py-20 bg-gradient-to-b from-qrz-dark to-qrz-dark/90">
      <div className="section-container">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
            <div className="flex flex-wrap gap-8 mt-10">
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
          
          <div className="relative h-[400px] opacity-0" style={{ transitionDelay: '0.4s' }}>
            <div className="absolute top-0 right-0 w-5/6 h-5/6 rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-qrz-blue to-qrz-blue-light p-1 rounded-lg">
                <div className="w-full h-full bg-qrz-dark/90 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold mb-4 text-qrz-orange font-montserrat">Nossa Missão</h3>
                    <p className="text-gray-300">
                      Impulsionar o crescimento dos nossos clientes através da transformação digital,
                      automatizando processos e implementando soluções tecnológicas inteligentes e eficientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-5/6 h-5/6 rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-qrz-orange to-qrz-orange/70 p-1 rounded-lg">
                <div className="w-full h-full bg-qrz-dark/90 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
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
      </div>
    </section>
  );
};

export default AboutSection;
