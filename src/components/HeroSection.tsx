
import { useRef, useEffect } from "react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.hero-element');
            children.forEach((child, index) => {
              (child as HTMLElement).style.animationDelay = `${index * 0.2}s`;
              child.classList.add('animate-fade-in-up');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-10 pt-24">
      {/* Background com luzes e sombras */}
      <div className="absolute inset-0 bg-qrz-dark z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qrz-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-qrz-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-qrz-blue/5 to-qrz-orange/5 rounded-full blur-3xl"></div>
      </div>


      <div ref={heroRef} className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center mb-6 hero-element opacity-0">
          <img
            src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
            alt="QRZ Tech Logo"
            className="h-28 md:h-36 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6 hero-element opacity-0">
          Simplificando Processos Manuais, <br className="hidden md:block"/>
          Eliminando <span className="text-qrz-orange drop-shadow-lg">Retrabalho</span> com <span className="text-gradient drop-shadow-lg">Automação e IA</span>
        </h1>

        <p className="text-base md:text-xl font-light max-w-4xl mx-auto mb-8 text-gray-300 hero-element opacity-0 leading-relaxed">
          Ajudamos empresas a realizar a Transformação Digital real: reduzindo tempo ocioso, otimizando fluxos de trabalho através de Process Mining, RPA e soluções exclusivas preparadas para escalar.
        </p>

        <div className="flex flex-wrap justify-center gap-4 hero-element opacity-0">
          <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:shadow-qrz-orange/40 transition-all">
            Fale Conosco
          </a>
          <a href="#solutions" className="btn-secondary hover:bg-qrz-orange/20 transition-all">
            Conheça Nossos Projetos & Soluções
          </a>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute -bottom-20 left-10 w-40 h-40 bg-qrz-blue/5 rounded-full blur-2xl"></div>
        <div className="absolute -top-20 right-10 w-60 h-60 bg-qrz-orange/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
