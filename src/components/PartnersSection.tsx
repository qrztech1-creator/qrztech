import { useState, useEffect, useRef } from "react";
import { 
  ShoppingBag, 
  Plane, 
  BookOpen, 
  Music, 
  Stethoscope, 
  ShieldCheck, 
  Briefcase,
  Layers
} from "lucide-react";

export interface ClientPartner {
  id: string;
  name: string;
  url: string;
  categoryId: string;
  categoryName: string;
  logo: string;
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
    logo: "https://prive.qrztech.com/assets/logo-prive-rzIR1ydI.png",
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
    logo: "https://anepe-reborn-hub.vercel.app/assets/logo-anepe-_Q-kH-M_.png",
  },
  {
    id: "riocuiaba",
    name: "Rio Cuiabá Lodge",
    url: "https://riocuiabalodge.vercel.app/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
    logo: "https://riocuiabalodge.vercel.app/assets/inicio/asset_2.png",
  },
  {
    id: "turismosqrz",
    name: "QRZ Turismos",
    url: "https://www.turismos.qrztech.com/",
    categoryId: "turismo-viagens",
    categoryName: "Turismo e Viagens",
    logo: "https://i.postimg.cc/x8v6gGx0/faviconqrz.png",
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
    logo: "https://i.postimg.cc/x8v6gGx0/faviconqrz.png",
  },
  {
    id: "arsenalqrz",
    name: "Arsenal QRZ",
    url: "https://arsenalqrz.qrztech.com/",
    categoryId: "infoprodutos",
    categoryName: "Infoprodutos",
    logo: "https://i.postimg.cc/NGbqQP7r/arsenal.png",
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
    logo: "https://www.royalx.com.br/assets/logo-royal-x-DXbFhOv8.png",
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
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="partners" className="py-12 bg-qrz-dark relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-8">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">
            Nossos Clientes
          </h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Algumas empresas que já confiam em nossas soluções para impulsionar seus negócios.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-qrz-orange text-white shadow-lg shadow-qrz-orange/20 scale-105"
                    : "bg-gray-900/80 text-gray-300 border border-gray-800 hover:border-gray-700 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-qrz-orange"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Clients Display (Original Clean Logo Grid Format) */}
        <div ref={sectionRef} className="space-y-10">
          {activeCategoryDefs.map((catDef) => {
            const catPartners = partners.filter((p) => p.categoryId === catDef.id);
            if (catPartners.length === 0) return null;

            return (
              <div key={catDef.id} className="space-y-4">
                {/* Category Subtitle */}
                <div className="flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-qrz-orange">
                    {catDef.name}
                  </span>
                  <span className="text-xs text-gray-500">({catPartners.length})</span>
                </div>

                {/* Original Clean Logo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
                  {catPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="group flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/90 transition-all h-28 items-center border border-gray-800/60 hover:border-qrz-orange/40"
                    >
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex flex-col items-center justify-center gap-1"
                        aria-label={`Visitar site de ${partner.name}`}
                        title={partner.name}
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`max-h-14 max-w-full object-contain filter transition-all duration-300 group-hover:scale-105 ${
                            partner.logo.includes("logo-branco") || partner.logo.includes("amplity")
                              ? ""
                              : "brightness-95 group-hover:brightness-110"
                          }`}
                          loading="lazy"
                        />
                        <span className="text-[11px] text-gray-400 group-hover:text-qrz-orange transition-colors truncate max-w-full px-1 text-center font-medium">
                          {partner.name}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            E muitas outras empresas que já transformaram seus processos com a <strong className="text-white font-semibold">QRZ Tech</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;