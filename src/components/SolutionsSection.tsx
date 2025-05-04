
import { useState, useRef, useEffect } from 'react';
import { Database, Code, Network, Cpu, Settings, MessageSquare, TrendingUp, Users } from "lucide-react";

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
      description: "Automatizamos tarefas repetitivas e processos manuais com plataformas como N8N e Make ou através de programação, liberando sua equipe para atividades estratégicas.",
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
    },
    {
      title: "Social Media",
      description: "Gerenciamos suas redes sociais com estratégias personalizadas para aumentar engajamento e conversões para seu negócio.",
      icon: MessageSquare
    },
    {
      title: "Tráfego Pago",
      description: "Criamos e gerenciamos campanhas de anúncios online para atrair clientes qualificados e aumentar suas vendas.",
      icon: TrendingUp
    },
    {
      title: "Consultoria",
      description: "Oferecemos consultoria especializada para ajudar sua empresa a definir e implementar estratégias digitais eficientes.",
      icon: Users
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
    <section id="solutions" className="py-12 bg-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Nossas Soluções</h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Combinamos tecnologia, expertise e estratégia para transformar desafios em oportunidades de crescimento para o seu negócio.
          </p>
        </div>
        
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="solution-card opacity-0 bg-qrz-dark p-6 rounded-xl border border-gray-800 hover:border-qrz-orange/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mb-5 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-qrz-blue to-qrz-blue-light hover:from-qrz-orange hover:to-qrz-orange/80">
                <solution.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat text-white hover:text-qrz-orange transition-colors">{solution.title}</h3>
              <p className="text-gray-400">{solution.description}</p>
            </div>
          ))}
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
