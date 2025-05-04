
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  results: string[];
}

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      title: "Automação de Backoffice Financeiro",
      category: "RPA",
      description: "Implementação de RPA com N8N para automatizar processos de conciliação bancária e emissão de relatórios financeiros.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=800&h=500",
      results: ["Redução de 85% no tempo de processamento", "Eliminação de erros manuais", "ROI em 3 meses"]
    },
    {
      title: "Plataforma de Logística Integrada",
      category: "Web App",
      description: "Desenvolvimento de aplicação web personalizada para gerenciamento de frotas e otimização de rotas.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&w=800&h=500",
      results: ["Aumento de 40% na eficiência operacional", "Redução de custos de combustível", "Dashboard em tempo real"]
    },
    {
      title: "Integração de Sistemas ERP/CRM",
      category: "API",
      description: "Integração entre múltiplos sistemas via API com sincronização bidirecional de dados em tempo real usando Make.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&w=800&h=500",
      results: ["Sincronização em tempo real", "Eliminação de tarefas duplicadas", "Dados consolidados em um só lugar"]
    },
    {
      title: "Chatbot com IA para Atendimento",
      category: "IA",
      description: "Implementação de chatbot com IA para triagem e resolução de chamados de suporte técnico.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=800&h=500",
      results: ["Atendimento 24/7", "Resolução de 65% dos tickets sem intervenção humana", "Satisfação do cliente aumentada"]
    },
    {
      title: "Banco de Dados para Big Data",
      category: "Database",
      description: "Estruturação de banco de dados distribuído para processamento de grandes volumes de informações.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800&h=500",
      results: ["Processamento 10x mais rápido", "Escalabilidade horizontal", "Backup e recuperação otimizados"]
    },
  ];

  const categories = ['all', 'RPA', 'Web App', 'API', 'IA', 'Database'];
  
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
    
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${0.1 + index * 0.1}s`;
      observer.observe(card);
    });
    
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 bg-gradient-to-b from-qrz-dark/90 to-qrz-dark">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Portfólio</h2>
          <p className="text-lg mt-6 text-gray-300 max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos e os resultados que alcançamos para nossos clientes.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === category
                  ? 'bg-qrz-orange text-white font-medium'
                  : 'border border-gray-700 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="portfolio-card opacity-0 bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 bg-qrz-blue-light/20 text-qrz-blue-light">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2 text-white font-montserrat">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h4 className="text-qrz-orange text-sm font-semibold mb-2">Resultados:</h4>
                  <ul className="text-sm">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="mb-1 text-gray-300 flex items-center">
                        <span className="mr-2 text-qrz-orange">→</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mt-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-qrz-orange font-montserrat">Fluxos N8N Prontos para Uso</h3>
            <p className="text-gray-300 mb-6">
              Temos soluções prontas em N8N para diversas necessidades. Basta instalar as credenciais e começar a usar.
              Conheça nossos fluxos pré-configurados para automação e inteligência artificial.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center text-gray-300 mb-6">
              <div className="flex items-center">
                <span className="mr-2 text-qrz-orange">→</span>
                Agentes de IA
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-qrz-orange">→</span>
                Automação de WordPress
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-qrz-orange">→</span>
                Extração de Dados
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-qrz-orange">→</span>
                Respostas Automáticas
              </div>
            </div>
            
            <Link to="/flows" className="btn-primary">
              Ver Todos os Fluxos N8N
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Quero um projeto como esses
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
