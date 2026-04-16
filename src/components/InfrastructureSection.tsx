import { useRef, useEffect } from "react";
import { Server, Printer, Truck, Ticket, Scale, CreditCard, BarChart, MessageSquare } from "lucide-react";

const InfrastructureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Server, text: "Operação sem servidor local (híbrido on/offline)" },
    { icon: Printer, text: "Até 7 impressoras de produção por departamento ou KDS" },
    { icon: Truck, text: "Delivery Digitalweb + puxada automática de marketplaces (iFood/Neemo/Rappi etc.)" },
    { icon: Ticket, text: "Comandas NFC e tickets para eventos, leitura de ingressos" },
    { icon: Scale, text: "Integração com balanças e etiquetas EAN-13" },
    { icon: CreditCard, text: "TEF / SiTEF e SmartPOS como smartTEF" },
    { icon: BarChart, text: "Dashboards e relatórios exportáveis" },
    { icon: MessageSquare, text: "WhatsApp integrado para avisos, fila e status de preparo" }
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
    <section className="py-16 bg-gradient-to-b from-gray-900 to-qrz-dark px-4 md:px-0">
      <div className="section-container">
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll opacity-0">
            <h2 className="section-title text-left mb-6">
              Infraestrutura <span className="text-qrz-orange">Básica</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Nossa solução completa oferece tudo que você precisa para operar com eficiência máxima,
              desde o atendimento até a gestão financeira.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-qrz-orange/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-qrz-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <feature.icon className="w-5 h-5 text-qrz-blue" />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-qrz-blue/10 to-transparent border border-gray-800 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">Solução Completa</h3>
              <p className="text-gray-400">
                Tudo integrado em uma única plataforma: PDV, gestão, delivery, marketplaces e muito mais.
                Economize tempo e recursos com uma solução unificada.
              </p>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="https://static.wixstatic.com/media/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png/v1/fill/w_887,h_491,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png"
                alt="Infraestrutura QRZ Food"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Sistema Integrado QRZ Food</h3>
                <p className="text-gray-300">Todas as funcionalidades em uma única interface intuitiva</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-qrz-orange mb-1">100%</div>
                <div className="text-sm text-gray-400">Integração Completa</div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-qrz-blue mb-1">24/7</div>
                <div className="text-sm text-gray-400">Suporte Técnico</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll opacity-0">
          <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            Solicitar Demonstração Personalizada
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;