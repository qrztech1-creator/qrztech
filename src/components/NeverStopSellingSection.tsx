import { useRef, useEffect } from "react";
import { WifiOff, Battery, Shield } from "lucide-react";

const NeverStopSellingSection = () => {
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
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.animationDelay = `${index * 0.2}s`;
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
    <section className="py-16 bg-gradient-to-b from-qrz-dark to-gray-900 px-4 md:px-0">
      <div className="section-container">
        <div ref={sectionRef} className="text-center">
          <div className="opacity-0 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              Nunca Pare de <span className="text-qrz-orange">Vender</span>!
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Já imaginou se acaba a internet ou energia em qualquer momento?
            </p>
          </div>

          <div className="opacity-0 mb-10">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Seu negócio não pode parar por causa de um imprevisto. O <span className="text-qrz-orange font-semibold">QRZ Food</span> garante operação contínua em todas as situações:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="opacity-0 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-qrz-orange/30 transition-all duration-300">
              <div className="w-16 h-16 mb-4 rounded-full bg-qrz-blue/20 flex items-center justify-center mx-auto">
                <WifiOff className="w-8 h-8 text-qrz-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sem internet?</h3>
              <p className="text-gray-400">
                Nosso PDV funciona em modo offline. Você continua registrando pedidos, imprimindo comandas e controlando o caixa. Assim que a conexão volta, os dados são sincronizados com a nuvem.
              </p>
            </div>

            <div className="opacity-0 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-qrz-orange/30 transition-all duration-300">
              <div className="w-16 h-16 mb-4 rounded-full bg-qrz-orange/20 flex items-center justify-center mx-auto">
                <Battery className="w-8 h-8 text-qrz-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sem energia?</h3>
              <p className="text-gray-400">
                Tablets e terminais SmartPOS possuem bateria interna de longa duração. Mesmo durante quedas de energia, você continua atendendo normalmente utilizando nosso sistema na sua maquininha ou tablet.
              </p>
            </div>

            <div className="opacity-0 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-qrz-orange/30 transition-all duration-300">
              <div className="w-16 h-16 mb-4 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Estabilidade 24/7</h3>
              <p className="text-gray-400">
                Equipamentos robustos e software híbrido (online/offline) asseguram que seu restaurante opere com segurança e sem interrupções, oferecendo a melhor experiência aos clientes.
              </p>
            </div>
          </div>

          <div className="opacity-0 mt-10 bg-gradient-to-r from-qrz-blue/10 to-qrz-orange/10 border border-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-qrz-orange">Resultado:</h3>
            <p className="text-xl text-gray-300">
              Não importa o que aconteça, suas vendas continuam e o fluxo de caixa segue saudável e rastreável, <span className="text-qrz-orange font-semibold">nada se perde</span>!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeverStopSellingSection;