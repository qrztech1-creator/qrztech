
import { useState, useRef, useEffect } from 'react';
import { Database, Code, Network, Cpu, Settings } from "lucide-react";

interface Solution {
  title: string;
  description: string;
  icon: React.ElementType;
}

const SolutionsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const solutions: Solution[] = [
    {
      title: "Automação com RPA",
      description: "Automatizamos tarefas repetitivas e processos manuais, liberando sua equipe para atividades estratégicas e aumentando a eficiência operacional.",
      icon: Settings
    },
    {
      title: "Desenvolvimento Web",
      description: "Criamos sites institucionais, landing pages e web apps personalizados com design moderno e experiência de usuário excepcional.",
      icon: Code
    },
    {
      title: "Integração com APIs",
      description: "Conectamos diferentes sistemas e plataformas para criar um ecossistema digital coeso que compartilha dados de forma inteligente e segura.",
      icon: Network
    },
    {
      title: "IA Aplicada",
      description: "Implementamos soluções de inteligência artificial para análise de dados, automação avançada e otimização de processos de negócio.",
      icon: Cpu
    },
    {
      title: "Bancos de Dados",
      description: "Desenvolvemos e otimizamos bancos de dados escaláveis e seguros para armazenar e gerenciar grandes volumes de informações.",
      icon: Database
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
    <section id="solutions" className="py-20 bg-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Nossas Soluções</h2>
          <p className="text-lg mt-6 text-gray-300 max-w-3xl mx-auto">
            Combinamos tecnologia, expertise e estratégia para transformar desafios em oportunidades de crescimento para o seu negócio.
          </p>
        </div>
        
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className={`solution-card opacity-0 bg-qrz-dark p-8 rounded-xl border border-gray-800 transition-all duration-300 card-hover ${
                hoveredIndex === index ? 'border-qrz-orange shadow-lg shadow-qrz-orange/10' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`w-16 h-16 mb-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'bg-gradient-to-r from-qrz-orange to-qrz-orange/80' 
                  : 'bg-gradient-to-r from-qrz-blue to-qrz-blue-light'
              }`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-montserrat text-white">{solution.title}</h3>
              <p className="text-gray-400">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
