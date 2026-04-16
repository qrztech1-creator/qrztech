import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle, Clock, DollarSign, Wifi, Shield, Smartphone, Users } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
  category: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Como funciona o sistema QRZ Food?",
      answer: "O QRZ Food é um sistema completo para gestão de restaurantes que funciona tanto online quanto offline. Inclui PDV, smartPOS integrado na maquininha, gestão na nuvem, delivery digital, integração com marketplaces (iFood, Rappi, etc.) e muito mais. Tudo em uma única plataforma unificada.",
      icon: HelpCircle,
      category: "Geral"
    },
    {
      question: "O sistema funciona sem internet?",
      answer: "Sim! Nosso PDV funciona em modo offline. Você pode continuar registrando pedidos, imprimindo comandas e controlando o caixa normalmente. Quando a internet voltar, todos os dados são automaticamente sincronizados com a nuvem, sem perda de informações.",
      icon: Wifi,
      category: "Tecnologia"
    },
    {
      question: "Quanto tempo leva para implantar o sistema?",
      answer: "A implantação básica leva de 3 a 7 dias úteis, dependendo da complexidade do seu negócio. Incluímos configuração inicial, treinamento da equipe e suporte durante o período de adaptação. Para implantações mais complexas, elaboramos um cronograma personalizado.",
      icon: Clock,
      category: "Implantação"
    },
    {
      question: "Qual é o investimento necessário?",
      answer: "Oferecemos planos flexíveis que se adaptam ao tamanho do seu negócio. Os valores variam conforme o número de pontos de venda, funcionalidades necessárias e volume de transações. Entre em contato para receber uma proposta personalizada sem compromisso.",
      icon: DollarSign,
      category: "Financeiro"
    },
    {
      question: "O sistema é seguro?",
      answer: "Totalmente seguro! Utilizamos criptografia de ponta a ponta, backups automáticos diários, autenticação em dois fatores e compliance com as principais normas de segurança. Seus dados e transações estão sempre protegidos.",
      icon: Shield,
      category: "Segurança"
    },
    {
      question: "Funciona em tablets e smartphones?",
      answer: "Sim! O sistema é 100% responsivo e funciona perfeitamente em tablets, smartphones, computadores e terminais POS. Também oferecemos aplicativos nativos para Android com funcionalidades específicas para garçons e gestores.",
      icon: Smartphone,
      category: "Dispositivos"
    },
    {
      question: "Como é o suporte técnico?",
      answer: "Oferecemos suporte técnico especializado 24/7 via WhatsApp, telefone e e-mail. Temos uma equipe dedicada para resolver qualquer problema rapidamente. Também oferecemos treinamentos contínuos para sua equipe.",
      icon: Users,
      category: "Suporte"
    },
    {
      question: "Integra com maquininhas de cartão?",
      answer: "Sim! Nossa solução SmartPOS transforma sua maquininha de cartão em um terminal completo com PDV integrado. Aceitamos todas as principais bandeiras e oferecemos TEF/SiTEF com as melhores taxas do mercado.",
      icon: DollarSign,
      category: "Integrações"
    },
    {
      question: "Como funciona a integração com iFood e outros marketplaces?",
      answer: "O sistema faz a integração automática com iFood, Rappi, Neemo e outros marketplaces. Os pedidos chegam diretamente no sistema, são impressos automaticamente na cozinha e o status é atualizado em tempo real, eliminando trabalho manual.",
      icon: HelpCircle,
      category: "Integrações"
    },
    {
      question: "Precisa de servidor local?",
      answer: "Não! Nossa solução é 100% na nuvem com operação híbrida (online/offline). Você não precisa investir em servidores caros ou manutenção de hardware. Tudo é gerenciado por nós com máxima segurança e disponibilidade.",
      icon: Server,
      category: "Infraestrutura"
    },
    {
      question: "Oferecem treinamento para a equipe?",
      answer: "Sim! Incluímos treinamento completo para toda a equipe: garçons, caixas, gerentes e proprietários. Também disponibilizamos manuais, vídeo-aulas e suporte durante o período de adaptação para garantir que todos utilizem o sistema com eficiência.",
      icon: Users,
      category: "Treinamento"
    },
    {
      question: "Como são os relatórios e dashboards?",
      answer: "Oferecemos dashboards em tempo real com os principais indicadores: vendas, ticket médio, produtos mais vendidos, horários de pico, desempenho de funcionários, etc. Todos os relatórios são exportáveis em PDF e Excel para análise detalhada.",
      icon: BarChart,
      category: "Relatórios"
    }
  ];

  const categories = ["Todos", "Geral", "Tecnologia", "Implantação", "Financeiro", "Segurança", "Dispositivos", "Suporte", "Integrações", "Infraestrutura", "Treinamento", "Relatórios"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredFaqs = selectedCategory === "Todos"
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

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

    const children = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    if (children) {
      children.forEach((child, index) => {
        (child as HTMLElement).style.animationDelay = `${index * 0.1}s`;
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
    <section className="py-16 bg-qrz-dark px-4 md:px-0">
      <div className="section-container">
        <div ref={sectionRef} className="text-center mb-12">
          <h2 className="section-title animate-on-scroll opacity-0">
            Perguntas <span className="text-qrz-orange">Frequentes</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            Tire suas dúvidas sobre nosso sistema, implantação, valores e funcionalidades
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-on-scroll opacity-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'bg-qrz-orange text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((item, index) => (
            <div key={index} className="animate-on-scroll opacity-0 mb-4">
              <div
                className={`bg-gray-900/50 border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-qrz-orange' : 'border-gray-800 hover:border-gray-700'}`}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-qrz-blue/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-qrz-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.question}</h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 border-t border-gray-800">
                    <div className="pl-14">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll opacity-0">
          <div className="bg-gradient-to-r from-qrz-blue/10 to-qrz-orange/10 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ainda tem dúvidas?</h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe está pronta para esclarecer todas as suas perguntas e mostrar como o QRZ Food pode transformar seu negócio.
            </p>
            <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              Fale Conosco no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Importando ícones adicionais
import { Server, BarChart } from "lucide-react";

export default FAQSection;