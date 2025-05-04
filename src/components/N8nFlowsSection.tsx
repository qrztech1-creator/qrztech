
import { Link } from 'react-router-dom';
import { 
  Database, 
  Code, 
  Network, 
  Cpu, 
  MessageSquare,
  Bot,
  Rss,
  FileText,
  Mail,
  Search
} from "lucide-react";

interface FlowItem {
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
}

const N8nFlowsSection = () => {
  const n8nFlows: FlowItem[] = [
    {
      title: "Agente de IA Completo",
      category: "ai",
      icon: Bot,
      color: "bg-purple-600"
    },
    {
      title: "Gerador de Conteúdo com IA e WordPress",
      category: "content",
      icon: FileText,
      color: "bg-green-600"
    },
    {
      title: "Agente de IA para E-mails",
      category: "ai",
      icon: Mail,
      color: "bg-purple-600"
    },
    {
      title: "Disparador em Massa com IA",
      category: "marketing",
      icon: Network,
      color: "bg-orange-600"
    },
    {
      title: "Resumidor de Grupos do WhatsApp",
      category: "ai",
      icon: MessageSquare,
      color: "bg-purple-600"
    },
    {
      title: "Extrator de Dados do Google Maps",
      category: "data",
      icon: Search,
      color: "bg-blue-600"
    },
    {
      title: "Raspador de Páginas Web",
      category: "data",
      icon: Code,
      color: "bg-blue-600"
    },
    {
      title: "Extrator de Notícias Diário",
      category: "content",
      icon: Rss,
      color: "bg-green-600"
    },
    {
      title: "Transcrição de Reuniões com IA",
      category: "ai",
      icon: Cpu,
      color: "bg-purple-600"
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-qrz-dark to-black">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Fluxos N8N</h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Soluções prontas em N8N para automação, inteligência artificial e processamento de dados.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          {n8nFlows.map((flow, index) => (
            <div 
              key={index} 
              className="border border-gray-800 rounded-lg p-4 flex items-center gap-3 bg-black/30 hover:border-qrz-blue-light transition-colors"
            >
              <div className={`flex-shrink-0 w-12 h-12 ${flow.color}/80 rounded-lg flex items-center justify-center shadow-lg`}>
                <flow.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-200">{flow.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  flow.category === 'ai' ? 'bg-purple-900/50 text-purple-200' :
                  flow.category === 'data' ? 'bg-blue-900/50 text-blue-200' :
                  flow.category === 'content' ? 'bg-green-900/50 text-green-200' : 'bg-orange-900/50 text-orange-200'
                }`}>
                  {flow.category === 'ai' ? 'IA' :
                   flow.category === 'data' ? 'Dados' :
                   flow.category === 'content' ? 'Conteúdo' : 'Marketing'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/flows" className="btn-primary">
            Ver Todos os Fluxos N8N
          </Link>
        </div>
      </div>
    </section>
  );
};

export default N8nFlowsSection;
