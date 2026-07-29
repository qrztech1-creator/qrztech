import { useState, useEffect, useRef } from "react";
import { 
  ExternalLink, 
  ShoppingBag, 
  Plane, 
  BookOpen, 
  Music, 
  Stethoscope, 
  ShieldCheck, 
  Briefcase,
  Layers,
  Globe
} from "lucide-react";

export interface ClientPartner {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  categoryName: string;
  logo?: string;
}

export interface CategoryDef {
  id: string;
  name: string;
  icon: React.ElementType;
}

const categories: CategoryDef[] = [
  { id: "all", name: "Todos os Setores", icon: Layers },
  { id: "loja-virtual", name: "Loja Virtual", icon: ShoppingBag },
  { id: "turismo-viagens", name: "Turismo e Viagens", icon: Plane },
  { id: "infoprodutos", name: "Infoprodutos", icon: BookOpen },
  { id: "musica-eventos", name: "Música e Eventos", icon: Music },
  { id: "saude-clinicas", name: "Saúde e Clínicas", icon: Stethoscope },
  { id: "corretora-seguros", name: "Corretora de Saúde e Seguros", icon: ShieldCheck },
  { id: "consultoria-gestao", name: "Consultoria e Gestão", icon: Briefcase },
];

const partners: ClientPartner[] = [
  // Loja Virtual
  {
    id: "prive",
    name: "Privé",
    url: "https://prive.qrztech.com/loja",
    categoryId: "loja-virtual",
    categoryName: "Loja Virtual",
  },
  {
    id: "tcbeauty",
    name: "TC Beauty Care",
    url: "https://tcbeautycare.com.br/",
    categoryId: "loja-virtual",
    categoryName: "Loja Virtual",
    logo: "https://dcdn-us.mitiendanube.com/stores/006/190/512/themes/common/logo-2110752536-1748523248-68dd26e5b7d038b3b19152ea0618297c1748523248-480-0.webp",
  },

  // Turismo e Viagens
  {
    id: "anepe",
    name: "ANEPE",
    url: "https://anepe-reborn-hub.vercel.app/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
  },
  {
    id: "riocuiaba",
    name: "Rio Cuiabá Lodge",
    url: "https://riocuiabalodge.vercel.app/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
  },
  {
    id: "turismosqrz",
    name: "QRZ Turismos",
    url: "https://www.turismos.qrztech.com/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
  },
  {
    id: "fishingbusiness",
    name: "Fishing Business",
    url: "https://www.fishingbusiness.com.br/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
    logo: "https://i.postimg.cc/J7KYFwYF/logo-fishing.png",
  },

  // Infoprodutos
  {
    id: "shopqrz",
    name: "QRZ Shop",
    url: "https://shop.qrztech.com/",
    categoryId: "infoprodutos",
    categoryName: "Infoprodutos",
  },
  {
    id: "arsenalqrz",
    name: "Arsenal QRZ",
    url: "https://arsenalqrz.qrztech.com/",
    categoryId: "infoprodutos",
    categoryName: "Infoprodutos",
  },
  {
    id: "formuladafala",
    name: "Fórmula da Fala",
    url: "https://velvety-paprenjak-8dada5.netlify.app/",
    categoryId: "infoprodutos",
    categoryName: "Infoprodutos",
    logo: "https://i.postimg.cc/90BGvkzY/MARCA-DAGUA-ICONE-ROSA.png",
  },

  // Música e Eventos
  {
    id: "royalx",
    name: "Royal X",
    url: "https://www.royalx.com.br/",
    categoryId: "musica-eventos",
    categoryName: "Música e Eventos",
  },

  // Saúde e Clínicas
  {
    id: "bioestetic-inst",
    name: "BioEstetic Institucional",
    url: "https://www.bioestetic.com.br/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://bioestetic.bioestetic.com.br/wp-content/uploads/2025/03/logo-bioestetic.webp",
  },
  {
    id: "bioestetic-lp",
    name: "BioEstetic Landing Page",
    url: "https://bioestetic.bioestetic.com.br/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://bioestetic.bioestetic.com.br/wp-content/uploads/2025/03/logo-bioestetic.webp",
  },
  {
    id: "esteban",
    name: "Dr. Esteban Sadovsky",
    url: "https://www.drestebansadovsky.com.br/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://i.postimg.cc/02GFyk0r/Sem-nome-1024-x-1024-px-500-x-500-px-2.png",
  },
  {
    id: "clinicapraiadacosta",
    name: "Clínica Praia da Costa",
    url: "https://www.clinicapraiadacosta.com.br/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://i.postimg.cc/CMDW70kg/logo-branco-clinica-praia-da-costa.png",
  },
  {
    id: "excelence",
    name: "Clínica Excelence",
    url: "https://excelenceodontologia.com.br/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://i.postimg.cc/50ZZj3m5/Log2.png",
  },
  {
    id: "manoela",
    name: "Dra. Manoela Sarmento",
    url: "https://www.instagram.com/dramanoelasarmento/",
    categoryId: "saude-clinicas",
    categoryName: "Saúde e Clínicas",
    logo: "https://assets.makefunnels.com.br/media/users/u3669/media-3669-546707fe2a89fe7565-vp-default-sm-93px.webp",
  },

  // Corretora de Saúde e Seguros
  {
    id: "biohealth",
    name: "BioHealth Corretora",
    url: "https://biohealthcorretora.com/",
    categoryId: "corretora-seguros",
    categoryName: "Corretora de Saúde e Seguros",
    logo: "https://biohealthcorretora.com/img/logo%20sit.png",
  },

  // Consultoria e Gestão
  {
    id: "amplity",
    name: "Amplity DH",
    url: "https://amplitydh.com.br/",
    categoryId: "consultoria-gestao",
    categoryName: "Consultoria e Gestão",
    logo: "https://i.postimg.cc/sx7cG83r/amplity.png",
  },
];

const PartnersSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleImageError = (partnerId: string) => {
    setImageErrors((prev) => ({ ...prev, [partnerId]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [activeCategory]);

  const activeCategoryDefs =
    activeCategory === "all"
      ? categories.filter((c) => c.id !== "all")
      : categories.filter((c) => c.id === activeCategory);

  return (
    <section id="partners" className="py-16 bg-qrz-dark relative overflow-hidden border-t border-gray-800/40">
      {/* Background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-qrz-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">
            Nossos Clientes por Setor
          </h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Conheça as empresas de diversos segmentos que confiam na <strong>QRZ Tech</strong> para impulsionar seus negócios.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-qrz-orange to-orange-500 text-white shadow-lg shadow-qrz-orange/20 scale-105"
                    : "bg-gray-900/80 text-gray-300 border border-gray-800 hover:border-gray-700 hover:text-white hover:bg-gray-800/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-qrz-orange"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Clients Display */}
        <div ref={sectionRef} className="space-y-10 transition-all">
          {activeCategoryDefs.map((catDef) => {
            const catPartners = partners.filter((p) => p.categoryId === catDef.id);
            if (catPartners.length === 0) return null;
            const CategoryIcon = catDef.icon;

            return (
              <div key={catDef.id} className="bg-gray-900/40 rounded-2xl p-6 md:p-8 border border-gray-800/80 backdrop-blur-sm">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-qrz-orange/10 border border-qrz-orange/20 text-qrz-orange">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-montserrat">
                        {catDef.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    {catPartners.length} {catPartners.length === 1 ? "cliente" : "clientes"}
                  </span>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {catPartners.map((partner) => {
                    const hasValidLogo = partner.logo && !imageErrors[partner.id];

                    return (
                      <a
                        key={partner.id}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-[#0a1220]/90 hover:bg-[#101b2e] border border-gray-800/90 hover:border-qrz-orange/60 rounded-xl p-5 flex flex-col justify-between items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-qrz-orange/5 min-h-[150px]"
                        aria-label={`Visitar site de ${partner.name}`}
                      >
                        {/* Glowing top accent line on hover */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[2px] bg-gradient-to-r from-transparent via-qrz-orange to-transparent transition-all duration-500" />

                        {/* Logo Container */}
                        <div className="h-14 w-full flex items-center justify-center mb-3">
                          {hasValidLogo ? (
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              onError={() => handleImageError(partner.id)}
                              className={`max-h-12 max-w-[85%] object-contain transition-all duration-300 group-hover:scale-105 ${
                                partner.logo.includes("logo-branco") || partner.logo.includes("amplity")
                                  ? ""
                                  : "brightness-95 group-hover:brightness-110"
                              }`}
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-qrz-orange/10 border border-qrz-orange/20 text-qrz-orange group-hover:border-qrz-orange/40 transition-colors">
                              <Globe className="w-4 h-4 text-qrz-orange" />
                              <span className="font-bold text-sm text-white tracking-wide">
                                {partner.name}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Client Info */}
                        <div className="w-full">
                          <h4 className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-1 mb-2">
                            {partner.name}
                          </h4>
                          
                          <div className="flex items-center justify-center gap-1.5 text-xs text-qrz-orange group-hover:text-orange-400 font-medium transition-colors">
                            <span>Visitar site</span>
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 pt-6 border-t border-gray-800/60">
          <p className="text-gray-400 text-sm md:text-base">
            E muitas outras empresas que já transformaram seus processos com a <strong className="text-white font-semibold">QRZ Tech</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;