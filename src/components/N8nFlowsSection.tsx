import { ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface Flow {
  title: string;
  description: string;
  buyLink: string;
  category?: string;
  imageUrl: string;
}

const N8nFlowsSection = () => {
  const n8nFlows: Flow[] = [
    {
      title: "Agente de IA Completo",
      description:
        "Aguarda múltiplas mensagens antes de gerar uma única resposta otimizada, interpreta áudios e gerencia agendamentos no Google Agenda, incluindo remarcações e cancelamentos. Além disso, divide longas mensagens em partes para facilitar a leitura.",
      buyLink: "https://www.asaas.com/c/70gyozn2dujz7flz",
      category: "ai",
      imageUrl: "https://i.postimg.cc/dVf326nd/4.jpg",
    },
    {
      title: "Gerador de Conteúdo com IA e Postagem Automática no WordPress",
      description:
        "Cria artigos e imagens otimizados com inteligência artificial e publica diretamente no WordPress, automatizando a criação de conteúdo.",
      buyLink: "https://www.asaas.com/c/7rapcccyxbto8sib",
      category: "content",
      imageUrl: "https://i.postimg.cc/ZRtqgqG5/5.jpg",
    },
    {
      title: "Agente de I.A que Responde E-mail Automaticamente",
      description:
        "Processa e responde e-mails com inteligência artificial, tornando a comunicação mais rápida e eficiente.",
      buyLink: "https://www.asaas.com/c/bkhlejzobdeeeet1",
      category: "ai",
      imageUrl: "https://i.postimg.cc/T1QYpJpK/6.jpg",
    },
    {
      title: "Disparador em Massa com IA",
      description:
        "Envia mensagens em grande escala com limite diário, utilizando dados inseridos via formulário web para personalização.",
      buyLink: "https://www.asaas.com/c/0ab3cl5xdw4vu5es",
      category: "marketing",
      imageUrl: "https://i.postimg.cc/xTT1Bh4M/1.jpg",
    },
    {
      title: "Resumidor de Grupos do WhatsApp",
      description:
        "Analisa mensagens de grupos do WhatsApp e gera um resumo diário, enviado automaticamente em um horário determinado via Node Trigger.",
      buyLink: "https://www.asaas.com/c/k8n2ek0sw0lud0mk",
      category: "ai",
      imageUrl: "https://i.postimg.cc/xTx1Q5w7/2.jpg",
    },
    {
      title: "Extrator de Dados Comerciais do Google Maps",
      description:
        "Coleta e organiza informações de empresas diretamente do Google Maps, facilitando a análise e o uso comercial dos dados.",
      buyLink: "https://www.asaas.com/c/3854g6o0l7wbhl30",
      category: "data",
      imageUrl: "https://i.postimg.cc/zfWznryZ/3.jpg",
    },
    {
      title: "Raspador de Páginas Web (WebScrapping)",
      description:
        "Extrai e estrutura informações de sites automaticamente, permitindo o uso dos dados em diferentes aplicações.",
      buyLink: "https://www.asaas.com/c/f4w8046h96r8g9fg",
      category: "data",
      imageUrl: "https://i.postimg.cc/vBsQhNn1/7.jpg",
    },
    {
      title: "Extrator de Notícias Diário com Envio por E-mail ou WhatsApp",
      description:
        "Busca e seleciona as principais notícias do dia e as entrega no formato desejado, garantindo acesso rápido à informação.",
      buyLink: "https://www.asaas.com/c/6dezd0k7d09owdte",
      category: "content",
      imageUrl: "https://i.postimg.cc/653BMR8h/8.jpg",
    },
    {
      title: "Transcrição de Reuniões em Tempo Real com Extração de Insights",
      description:
        "Registra reuniões ao vivo, transcreve o conteúdo e identifica os principais pontos e insights discutidos.",
      buyLink: "https://www.asaas.com/c/9fyn7px2vled5704",
      category: "ai",
      imageUrl: "https://i.postimg.cc/3r9Kj9xR/9.jpg",
    },
  ];

  return (
    <section id="automations" className="py-8 bg-gradient-to-b from-qrz-dark to-black px-4 md:px-0">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Automações <span className="text-qrz-orange">completas</span></h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Soluções prontas para implementar no seu negócio
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
            Nossas soluções são prontas para uso. Basta instalar as credenciais e começar a usar. Economize tempo e recursos com automações pré-configuradas para diversas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {n8nFlows.map((flow, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 flex flex-col hover:shadow-lg hover:shadow-qrz-blue/10 transition-all hover:-translate-y-1"
            >
              {/* Imagem adicionada aqui */}
              <div className="mb-4 flex items-center justify-center h-40">
                <img
                  src={flow.imageUrl}
                  alt={flow.title}
                  className="max-h-40 max-w-full object-contain border border-gray-700 rounded-lg p-1"
                />
              </div>
              <div className="mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    flow.category === "ai"
                      ? "bg-purple-900/50 text-purple-200"
                      : flow.category === "data"
                      ? "bg-blue-900/50 text-blue-200"
                      : flow.category === "content"
                      ? "bg-green-900/50 text-green-200"
                      : "bg-orange-900/50 text-orange-200"
                  }`}
                >
                  {flow.category === "ai"
                    ? "Inteligência Artificial"
                    : flow.category === "data"
                    ? "Extração de Dados"
                    : flow.category === "content"
                    ? "Conteúdo"
                    : "Marketing"}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat text-qrz-orange">
                {flow.title}
              </h3>
              <p className="text-gray-400 mb-6 flex-grow">
                {flow.description}
              </p>
              <div className="mt-auto"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
            Não encontrou o que procura? Entre em contato para desenvolvermos uma solução personalizada para o seu negócio.
          </p>
          <a
            href="https://wa.me/5527999936682"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-md bg-qrz-orange text-white font-medium transition-all hover:bg-qrz-orange/90 hover:scale-105 inline-flex items-center"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Conversar com Especialista
          </a>
        </div>
      </div>
    </section>
  );
};

export default N8nFlowsSection;