
import { useState, useRef, useEffect } from 'react';
import { Database, Code, Network, Cpu, Settings, MessageSquare, TrendingUp, Users, Smartphone, Store, Utensils, Receipt, Building2, Zap } from "lucide-react";
import { Link } from 'react-router-dom';

interface Solution {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  link?: string;
}

const SolutionsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const solutions: Solution[] = [
    {
      title: "Transformação Digital & Process Mining",
      description: "Automatizamos processos manuais e repetitivos com RPA e IA. Reduza o tempo ocioso, corte custos e não dependa exclusivamente de trabalho manual constante.",
      icon: Settings
    },
    {
      title: "QRZ Food",
      description: "Sistema completo para restaurantes com PDV, smartPOS (integrado na maquininha), gestão na nuvem e operação local sem travamentos.",
      icon: Utensils,
      link: "/food"
    },
    {
      title: "QRZ Store",
      description: "A tecnologia ideal para lojas e frente de caixa no varejo, unificando controle de estoque, vendas e emissão fiscal de maneira ágil.",
      icon: Store,
      badge: "Em breve"
    },
    {
      title: "QRZ Inv",
      description: "Plataforma avançada para gestão de serviços, emissão de OS e cobranças recorrentes, construindo uma experiência digital direta.",
      icon: Receipt,
      badge: "Em breve"
    },
    {
      title: "CoutureFit",
      description: "Provador virtual inteligente para lojas físicas e virtuais, proporcionando uma experiência de compra incrível e assertiva para o seu cliente.",
      icon: Smartphone
    },
    {
      title: "Método de Prospecção",
      description: "Sistema de busca e captação automática de clientes potenciais nos nichos e lugares específicos mapeados como ideais para a sua empresa.",
      icon: Network
    },
    {
      title: "QRZ Compare",
      description: "Sistema comparativo de preços em tempo real entre fornecedores para bares e restaurantes, visando máxima economia no dia a dia do comércio.",
      icon: TrendingUp,
      badge: "Em finalização"
    },
    {
      title: "Desenvolvimento WEB e Consultoria",
      description: "Criação de aplicações corporativas sob medida e consultoria especializada para elevar o nível de maturidade tecnológica e arquitetural do seu negócio.",
      icon: Code
    }
  ];

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
    
    const children = sectionRef.current?.querySelectorAll('.solution-card');
    if (children) {
      children.forEach((child, index) => {
        // Add staggered animation delay
        (child as HTMLElement).style.animationDelay = `${0.1 + index * 0.1}s`;
        observer.observe(child);
      });
    }
    
    return () => {
      if (children) {
        children.forEach(child => {
          observer.unobserve(child);
        });
      }
    };
  }, []);

  return (
    <section id="solutions" className="py-12 bg-qrz-dark px-4 md:px-0">
      <div className="section-container text-center">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Projetos & Soluções</h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Ecossistema de produtos prontos para transformar sua operação e soluções sob medida em pleno desenvolvimento.
          </p>
        </div>
        
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center md:justify-items-stretch">
          {solutions.map((solution, index) => {
            const CardContent = (
              <div 
                className="solution-card opacity-0 h-full bg-qrz-dark p-6 rounded-xl border border-gray-800 hover:border-qrz-orange/50 transition-all duration-300 hover:-translate-y-1 w-full max-w-sm md:max-w-none text-center md:text-left"
              >
                <div className="w-14 h-14 mb-5 rounded-lg flex items-center justify-center bg-gradient-to-r from-qrz-blue to-qrz-blue-light mx-auto md:mx-0">
                  {solution.title === 'QRZ Food' ? (
                    <img src="https://i.postimg.cc/X7znNcFg/qrzfood.png" alt="QRZ Food" className="w-[80%] h-auto object-contain drop-shadow-md brightness-0 invert" />
                  ) : (
                    <solution.icon className="w-7 h-7 text-white flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <h3 className="text-xl font-bold font-montserrat text-white hover:text-qrz-orange transition-colors">{solution.title}</h3>
                  {solution.badge && (
                    <span className="bg-qrz-orange/20 text-qrz-orange text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {solution.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-400">{solution.description}</p>
                {solution.link && (
                  <div className="mt-4 text-qrz-orange text-sm font-semibold hover:underline">
                    Ver mais →
                  </div>
                )}
              </div>
            );

            return solution.link ? (
              <Link to={solution.link} key={index} className="w-full">
                {CardContent}
              </Link>
            ) : (
              <div key={index} className="w-full">
                {CardContent}
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 text-center">
          <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Solicite um Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
