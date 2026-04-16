import { useRef, useEffect } from "react";
import { Play, Users, Clock, TrendingUp } from "lucide-react";

const RealTimeClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
      title: "Resultados Reais - Sistema em Ação",
      url: "https://video.wixstatic.com/video/6bae68_8e14a52c77264505b2b4fae4de238400/480p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_8e14a52c77264505b2b4fae4de238400f000.jpg"
    },
    {
      title: "Robô WhatsApp Automatizado",
      url: "https://video.wixstatic.com/video/6bae68_8483695eb71848a9a00011914b79795f/1080p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_8483695eb71848a9a00011914b79795ff000.jpg"
    },
    {
      title: "App de Entregas Integrado",
      url: "https://video.wixstatic.com/video/6bae68_8102a819c0d64eb59f19c90731b43eeb/1080p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_8102a819c0d64eb59f19c90731b43eebf000.jpg"
    },
    {
      title: "SaaS ERP Gestão em Nuvem",
      url: "https://video.wixstatic.com/video/6bae68_bd9f7418f47b4bc9b4621cd8e3df2b45/1080p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_bd9f7418f47b4bc9b4621cd8e3df2b45f000.jpg"
    },
    {
      title: "PDV - Frente de Caixa (Windows)",
      url: "https://video.wixstatic.com/video/6bae68_1f8cf5b6e62a4bd5afea58de3dbe40da/1080p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_1f8cf5b6e62a4bd5afea58de3dbe40daf000.jpg"
    },
    {
      title: "PDV Android Mobile",
      url: "https://video.wixstatic.com/video/6bae68_5ca806e3f54d48519b8e7287c11a390b/720p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_5ca806e3f54d48519b8e7287c11a390bf000.jpg"
    },
    {
      title: "SmartPOS (APP para Maquininha)",
      url: "https://video.wixstatic.com/video/6bae68_d490d98bbdb94764b5fa2a14edbfd582/720p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_d490d98bbdb94764b5fa2a14edbfd582f000.jpg"
    },
    {
      title: "Cardápio Digital Interativo",
      url: "https://video.wixstatic.com/video/6bae68_ef6c0ae4ff954b84a2d9adbd293dd17a/480p/mp4/file.mp4",
      thumbnail: "https://static.wixstatic.com/media/6bae68_ef6c0ae4ff954b84a2d9adbd293dd17af000.jpg"
    }
  ];

  const stats = [
    { icon: Users, value: "30+", label: "Clientes Ativos" },
    { icon: Clock, value: "24/7", label: "Operação Contínua" },
    { icon: TrendingUp, value: "124+", label: "Projetos Entregues" }
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
    <section className="py-16 bg-gray-900 px-4 md:px-0">
      <div className="section-container">
        <div ref={sectionRef} className="text-center mb-12">
          <h2 className="section-title animate-on-scroll opacity-0">
            Veja Resultados <span className="text-qrz-orange">Reais</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            Clientes utilizando nosso sistema em tempo real e exemplos em vídeo dos principais módulos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="animate-on-scroll opacity-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
              <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-r from-qrz-blue to-qrz-orange flex items-center justify-center mx-auto">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
          <div className="animate-on-scroll opacity-0 bg-gradient-to-r from-qrz-blue/20 to-qrz-orange/20 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Satisfação Garantida</div>
            <div className="text-sm text-gray-500 mt-2">Suporte técnico especializado</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {videos.slice(0, 4).map((video, index) => (
            <div key={index} className="animate-on-scroll opacity-0 group">
              <div className="relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-qrz-orange transition-all duration-300">
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-qrz-orange/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-900/80">
                  <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-qrz-orange text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Assistir vídeo <Play className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.slice(4).map((video, index) => (
            <div key={index} className="animate-on-scroll opacity-0 group">
              <div className="relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-qrz-orange transition-all duration-300">
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-qrz-orange/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-900/80">
                  <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-qrz-orange text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Assistir vídeo <Play className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll opacity-0">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Todos os vídeos mostram sistemas em produção, utilizados diariamente por nossos clientes em diversos segmentos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RealTimeClientsSection;