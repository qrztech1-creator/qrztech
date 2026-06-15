import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Check, Cloud, Monitor, Tablet, ShoppingCart, Package, BarChart, Shield, Zap, TrendingUp, ChevronDown, Menu, X, Wifi, WifiOff, Palette, Users, Store, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Varejo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const navHeight = 80;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start: number | null = null;

    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    document.title = "QRZ Store - Sistema para Varejo";
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FAQ toggle state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Módulos do varejo
  const modules = [
    {
      title: "ERP SaaS em Nuvem",
      icon: <Cloud className="w-8 h-8" />,
      features: [
        "Estoque completo — controla produtos, variações, compras, fichas técnicas e custo de mercadoria vendida (CMV). Importação de XML e pareamento automático.",
        "Financeiro — contas a pagar e receber, conciliação bancária, plano de contas e demonstração de resultados (DRE).",
        "Relatórios e dashboards — indicadores em tempo real com exportação para Excel e acesso via API.",
        "Fiscal — emissor completo de NFe e NFCe integrado a TEF/SiTef e SmartPOS.",
        "API de integração — endpoints documentados em Swagger para conectar sistemas ou aplicativos ao PDV, estoque e financeiro."
      ],
      image: "https://static.wixstatic.com/media/6bae68_2e6d6567c7f0461eb7b60bb69c21ae8d~mv2.png/v1/fill/w_731,h_668,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/dw-office-new.png"
    },
    {
      title: "PDV — Frente de Caixa (Windows / Android / SmartPOS)",
      icon: <Monitor className="w-8 h-8" />,
      features: [
        "Operação híbrida — possibilidade de modo offline conforme os equipamentos da empresa, com sincronização automática na nuvem.",
        "NFC-e integrada — emita notas fiscais de consumidor eletrônica direto no caixa, sem complicação.",
        "Controle de caixa — suprimentos, sangrias, conferência e fechamento detalhado por operador.",
        "SmartPOS — realize vendas e pagamentos direto na maquininha com conexão 4G/Wi-Fi, ideal para atendimento móvel na loja.",
        "Leitura de código de barras — agilidade total para mercadinhos, padarias, lojas e conveniências."
      ],
      image: "https://static.wixstatic.com/media/6bae68_79f77811f7e2458e990262fa9cc0b570~mv2.png/v1/fill/w_600,h_441,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pdvwindowsmaquina.png"
    },
    {
      title: "Autoatendimento (Totem, Tablet, SmartPOS)",
      icon: <Tablet className="w-8 h-8" />,
      features: [
        "Funcionamento autônomo — basta ligar o equipamento para começar; não precisa de operador.",
        "Interface personalizável — visual simples e intuitivo com possibilidade de personalizar imagens, cores e aparência da loja.",
        "Integração total — emite nota fiscal automaticamente na aprovação do pagamento e dá baixa no estoque em tempo real.",
        "Múltiplos formatos — disponível em totens, tablets de balcão e máquinas SmartPOS.",
        "Pagamentos — aceita Pix, cartão de crédito/débito e vouchers. Impressão de comprovante automática."
      ],
      image: "https://static.wixstatic.com/media/6bae68_de1cff7c101840689c80e5e61e7bffae~mv2.png/v1/fill/w_731,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/M82%20-%20Copy.png"
    },
    {
      title: "Catálogo Digital",
      icon: <Package className="w-8 h-8" />,
      features: [
        "Venda seus produtos pela internet — catálogo completo com fotos, descrições e preços atualizados automaticamente.",
        "Estoque integrado — cada venda online dá baixa automática no estoque da loja física em tempo real.",
        "Área do cliente — o consumidor acompanha pedidos, histórico de compras e status da entrega.",
        "Regras de entrega — defina taxas e regiões de entrega ou retirada na loja.",
        "Integração com PDV e financeiro — todos os pedidos do catálogo alimentam o ERP automaticamente."
      ],
      image: "https://static.wixstatic.com/media/6bae68_52dd1fdfa4234e71adcaa33550930221~mv2.png/v1/fill/w_508,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pdvwindowsmaquinatef.png"
    }
  ];

  // Diferenciais do varejo
  const differentiators = [
    {
      title: "Operação Híbrida",
      description: "O sistema opera de forma híbrida, com possibilidade de modo offline conforme os equipamentos e infraestrutura da sua empresa. Agende uma call para entendermos sua operação.",
      icon: <WifiOff className="w-6 h-6" />
    },
    {
      title: "NFe/NFCe integradas",
      description: "Emissor fiscal completo integrado ao PDV. Emita NFe e NFCe de forma rápida e segura, sem precisar de sistemas externos.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Customização do PDV",
      description: "Personalize seu PDV com logo, cores e atalhos de teclado da sua loja. A interface se adapta ao fluxo de trabalho da sua equipe.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Escalável (multi-loja)",
      description: "Gerencie todas as suas unidades a partir de um único painel, com dados consolidados de vendas, estoque e financeiro. Ideal para redes.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Relatórios e DRE",
      description: "Acompanhe indicadores em tempo real, DRE completo, plano de contas e relatórios detalhados com exportação para Excel.",
      icon: <BarChart className="w-6 h-6" />
    },
    {
      title: "Suporte presencial e treinamento",
      description: "A <strong>QRZ Store</strong> oferece suporte presencial no primeiro dia de operação, treinamento da equipe e acompanhamento contínuo via WhatsApp.",
      icon: <Users className="w-6 h-6" />
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "O sistema funciona offline?",
      answer: "Sim! O sistema é híbrido e possui capacidade de operar offline em determinados módulos. O funcionamento depende dos equipamentos e infraestrutura de rede da sua empresa. Realizamos uma call de diagnóstico para definir a configuração ideal."
    },
    {
      question: "Como funciona o controle de estoque?",
      answer: "O estoque é atualizado em tempo real a cada venda no PDV, catálogo digital ou autoatendimento. Você pode importar XMLs de notas de entrada, configurar alertas de estoque mínimo, controlar variações de produto (cor, tamanho), gerar relatórios de giro e muito mais."
    },
    {
      question: "O sistema emite NFCe?",
      answer: "Sim! O sistema possui emissor fiscal completo e integrado. Você emite NFCe direto no caixa em segundos, sem precisar de nenhum software externo. Também emite NFe para vendas B2B e fornecedores."
    },
    {
      question: "Posso usar o sistema em mais de uma loja?",
      answer: "Sim! A plataforma é multi-loja. Você gerencia todas as unidades em um único painel com dados consolidados de vendas, estoque e financeiro. Transferências entre lojas também são controladas pelo sistema."
    },
    {
      question: "O catálogo digital substitui um e-commerce?",
      answer: "O catálogo digital funciona como uma vitrine online integrada ao seu estoque e PDV. O cliente acessa pelo celular, escolhe produtos, faz o pedido e pode pagar online ou retirar na loja. É uma solução prática e integrada para vender pela internet sem precisar de uma plataforma separada."
    },
    {
      question: "Quanto tempo leva a implantação?",
      answer: "A implantação acontece de forma extremamente ágil: a base do sistema já está online em cerca de <strong>24 horas</strong>. Caso seja necessária a compra ou envio de hardwares/equipamentos físicos, o prazo variará de acordo com o frete. Oferecemos suporte presencial no primeiro dia de operação."
    }
  ];

  // Animation helpers
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }
  });

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }
  });

  return (
    <main className="bg-qrz-dark text-white overflow-x-hidden relative">

      {/* ══════════════════════════════════════════════════════════════════
          NAVBAR DEDICADA STORE
      ══════════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0a1628]/50 backdrop-blur-md border-qrz-blue/20' : 'bg-[#0a1628]/95 backdrop-blur-md border-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3 cursor-pointer">
            <img src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png" alt="QRZ Store" className="h-8 md:h-10" />
            <span className="text-white font-bold text-lg md:text-xl">
              Store
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-semibold text-gray-300">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-qrz-orange cursor-pointer transition-colors">Início</a>
            <a href="#solucoes" onClick={(e) => handleNavClick(e, 'solucoes')} className="hover:text-qrz-orange cursor-pointer transition-colors">Soluções</a>
            <a href="#segmentos" onClick={(e) => handleNavClick(e, 'segmentos')} className="hover:text-qrz-orange cursor-pointer transition-colors">Segmentos</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-qrz-orange cursor-pointer transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center">
            <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-2 px-3 lg:px-4 rounded-lg transition-all text-[11px] lg:text-sm shadow-lg whitespace-nowrap flex items-center justify-center">
              FALAR COM ESPECIALISTA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[#0a1628]/95 backdrop-blur-md border-t border-qrz-blue/20"
            >
              <div className="flex flex-col px-4 pt-2 pb-6 space-y-2 shadow-xl">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">Início</a>
                <a href="#solucoes" onClick={(e) => handleNavClick(e, 'solucoes')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">Soluções</a>
                <a href="#segmentos" onClick={(e) => handleNavClick(e, 'segmentos')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">Segmentos</a>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">FAQ</a>
                <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="bg-qrz-orange text-white flex items-center justify-center font-bold uppercase py-3 px-2 rounded-lg transition-all mt-4 w-full text-[10px] min-[390px]:text-[12px] sm:text-sm whitespace-nowrap">
                  FALAR COM ESPECIALISTA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative pt-20 min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background com gradientes de luz */}
        <div className="absolute inset-0 bg-gradient-to-br from-qrz-dark via-[#0a1628] to-qrz-dark" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-qrz-blue/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-qrz-orange/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-qrz-blue-light/8 rounded-full blur-[80px]" />
        {/* Sombra inferior para profundidade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-qrz-dark to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <img
              src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
              alt="QRZ Store Logo"
              className="h-20 md:h-28 w-auto object-contain drop-shadow-2xl"
            />
            <span className="text-white font-bold text-4xl md:text-6xl tracking-tight">
              Store
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold font-montserrat mb-6 text-white max-w-4xl mx-auto leading-tight"
          >
            Automação Completa para o <span className="text-qrz-orange">Varejo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 text-base md:text-xl font-medium max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            PDV em nuvem, estoque automatizado, NFCe integrada e catálogo digital — tudo em um único sistema para sua loja vender mais e perder menos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 min-[390px]:gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5527999936682?text=Olá! Gostaria de agendar uma demonstração do QRZ Store para minha loja"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-8 rounded-lg transition-all duration-300 shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:shadow-qrz-orange/40 text-[9px] min-[390px]:text-[11px] sm:text-sm md:text-base whitespace-nowrap flex items-center justify-center w-full md:w-auto"
            >
              AGENDAR DEMONSTRAÇÃO GRATUITA
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#solucoes"
              onClick={(e) => handleNavClick(e, 'solucoes')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-8 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 text-[9px] min-[390px]:text-[11px] sm:text-sm md:text-base whitespace-nowrap flex items-center justify-center w-full md:w-auto mt-1 md:mt-0"
            >
              EXPLORAR O SISTEMA COMPLETO
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PAIN / SOLUTION SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white" id="beneficios">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">

            {/* Esquerda: Dor */}
            <motion.div {...fadeUp(0.1)} className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-qrz-dark leading-tight">
                Sua loja merece mais — <br className="hidden md:block" /><span className="text-qrz-orange">pare de perder dinheiro com controle manual</span>
              </h2>

              <div className="bg-red-50/70 rounded-2xl p-6 md:p-8 border border-red-100 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  Você já passou por isso?
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Estoque furado — sobra de um lado, falta do outro",
                    "Perda de vendas por falta de controle de produtos",
                    "Erro de digitação na emissão de nota fiscal",
                    "Atendimento lento no caixa e filas desnecessárias"
                  ].map((dor, i) => (
                    <li key={`dor-${i}`} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{dor}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                  <p className="text-red-800 font-medium">
                    <span className="font-bold">A verdade é simples:</span> Sem controle, sua loja perde dinheiro todos os dias sem perceber.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direita: Solução */}
            <motion.div {...fadeUp(0.2)} className="md:w-1/2 w-full">
              <div className="bg-gradient-to-br from-[#0a1628] to-qrz-dark rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-qrz-blue/10 rounded-full blur-[40px] -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-qrz-orange/10 rounded-full blur-[40px] -ml-10 -mb-10" />

                <h3 className="text-xl md:text-2xl font-bold mb-8 text-white relative z-10">
                  Com o QRZ Store, sua loja ganha controle total:
                </h3>

                <ul className="space-y-4 mb-8 relative z-10">
                  {[
                    "PDV rápido e robusto em nuvem",
                    "Estoque automatizado em tempo real",
                    "NFCe integrada — emissão em segundos",
                    "Catálogo digital para vender online",
                    "Gestão completa com DRE e relatórios"
                  ].map((beneficio, i) => (
                    <li key={`ben-${i}`} className="flex items-center">
                      <span className="bg-qrz-orange/20 text-qrz-orange p-1 rounded-full mr-3">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="text-gray-200 font-medium">{beneficio}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/10 relative z-10">
                  <p className="text-gray-300 font-medium flex items-start">
                    Você ganha tranquilidade para focar no que realmente importa: vender mais e crescer seu negócio.
                  </p>
                </div>

                <a
                  href="https://wa.me/5527999936682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-6 rounded-lg transition-all shadow-lg shadow-qrz-orange/20 hover:shadow-qrz-orange/40 text-[9px] min-[390px]:text-[11px] sm:text-sm md:text-lg relative z-10 whitespace-nowrap"
                >
                  QUERO AUTOMATIZAR MINHA LOJA
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CARROSSEL DE PARCEIROS (Marquee infinito)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-center text-qrz-dark mb-2">Marcas que confiam na QRZ Store</h3>
        </div>
        <div className="relative flex overflow-x-hidden group bg-white">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          <div className="animate-marquee-store flex flex-row items-center whitespace-nowrap py-4" style={{ width: 'max-content' }}>
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={`marquee-group-${i}`}>
                {[
                  "https://dcdn-us.mitiendanube.com/stores/006/190/512/themes/common/logo-2110752536-1748523248-68dd26e5b7d038b3b19152ea0618297c1748523248-480-0.webp",
                  "https://i.postimg.cc/vBNFbqrq/4.png",
                  "https://i.postimg.cc/8cf85R4m/5.png",
                  "https://i.postimg.cc/FzktRypP/av.png",
                  "https://i.postimg.cc/T158wV0q/es.png",
                  "https://i.postimg.cc/T158wV0c/fl.png",
                  "https://i.postimg.cc/13XRBNCR/logo-bio-sem-fundo.png",
                  "https://i.postimg.cc/CMDW70kg/logo-branco-clinica-praia-da-costa.png",
                  "https://i.postimg.cc/KjvxHdDv/Tag-e-etiqueta.png"
                ].map((logo, index) => (
                  <div key={`logo-${i}-${index}`} className="flex-none mx-8 md:mx-12 w-24 md:w-32 flex items-center justify-center transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100 h-16 md:h-20">
                    <img
                      src={logo}
                      alt={`Parceiro QRZ Store ${index + 1}`}
                      className={`max-w-full max-h-full object-contain drop-shadow-md ${logo.includes('logo-branco') ? 'brightness-0' : ''}`}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
           @keyframes marqueeStore {
             0% { transform: translateX(0%); }
             100% { transform: translateX(-50%); }
           }
           .animate-marquee-store {
             width: fit-content;
             animation: marqueeStore 40s linear infinite;
           }
           .animate-marquee-store:hover {
             animation-play-state: paused;
           }
         `}} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEGMENTOS DO VAREJO
      ══════════════════════════════════════════════════════════════════ */}
      <section id="segmentos" className="py-16 md:py-20 bg-gradient-to-b from-[#0a1628] to-qrz-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
                <span className="text-qrz-orange">Atendemos</span> Diversos Segmentos do Varejo
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Nossa solução é adaptável para diferentes tipos de lojas e comércios varejistas
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[
                { name: "Mercadinhos", icon: "🛒" },
                { name: "Conveniências", icon: "🏪" },
                { name: "Sacolões/Hortifruti", icon: "🥬" },
                { name: "Açougues", icon: "🥩" },
                { name: "Padarias/Confeitarias", icon: "🥐" },
                { name: "Lojas de Roupas", icon: "👗" },
                { name: "Lojas de Calçados", icon: "👟" },
                { name: "Papelarias", icon: "📚" },
                { name: "Utilidades/Presentes", icon: "🎁" },
                { name: "Mat. de Construção", icon: "🧱" },
                { name: "Lojas de Celulares", icon: "📱" },
                { name: "Pet Shops", icon: "🐾" },
                { name: "Agropecuárias", icon: "🌾" },
                { name: "Farmácias/Drogarias", icon: "💊" },
                { name: "Distribuidoras", icon: "📦" },
                { name: "Lojas de Informática", icon: "💻" }
              ].map((segment) => (
                <div
                  key={segment.name}
                  className="rounded-xl p-4 md:p-5 text-center border border-white/10 hover:border-qrz-orange/40 transition-all duration-200 group cursor-pointer"
                >
                  <div className="text-3xl mb-2">{segment.icon}</div>
                  <div className="text-white font-semibold text-sm md:text-base group-hover:text-qrz-orange transition-colors">{segment.name}</div>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="bg-gradient-to-r from-qrz-blue/10 to-qrz-orange/10 rounded-xl p-6 md:p-8 text-center border border-white/10">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">Não encontrou seu segmento?</h3>
              <p className="text-gray-300 mb-5 max-w-2xl mx-auto text-sm md:text-base">
                Nossa plataforma é altamente customizável e pode ser adaptada para atender necessidades específicas do seu comércio.
              </p>
              <a
                href="https://wa.me/5527999936682?text=Olá! Gostaria de saber se o QRZ Store atende meu segmento específico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 px-2 md:px-8 rounded-lg transition-all duration-300 text-[9px] min-[390px]:text-[11px] sm:text-sm whitespace-nowrap"
              >
                CONSULTAR SEGMENTO
                <svg className="w-5 h-5 ml-2 hidden min-[390px]:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MÓDULOS E FUNCIONALIDADES
      ══════════════════════════════════════════════════════════════════ */}
      <section id="solucoes" className="py-16 md:py-20 bg-gradient-to-b from-qrz-dark to-[#0a1628]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Soluções Principais
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Conheça todos os módulos que compõem a solução <strong>QRZ Store</strong>
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16 max-w-6xl mx-auto">
            {modules.map((module, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  {...fadeUp(0.05)}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-6 md:gap-8`}>
                    <div className="lg:w-1/2">
                      <div className="flex items-center mb-6">
                        <div className="bg-qrz-blue/20 p-3 rounded-xl mr-4">
                          <div className="text-qrz-blue">{module.icon}</div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white break-words">{module.title}</h3>
                      </div>

                      <ul className="space-y-3">
                        {module.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="w-5 h-5 text-qrz-orange mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:w-1/2 flex items-center justify-center w-full">
                      <img
                        src={module.image}
                        alt={module.title}
                        className="rounded-lg shadow-lg max-w-full max-h-96 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DIFERENCIAIS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0d1f3c] to-qrz-dark">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Diferenciais
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              O que torna a <strong>QRZ Store</strong> a melhor escolha para o seu comércio
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-qrz-orange/30 transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-qrz-orange/20 p-2 rounded-lg mr-3">
                    <div className="text-qrz-orange">{diff.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white" dangerouslySetInnerHTML={{ __html: diff.title }} />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: diff.description }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
              Perguntas <span className="text-qrz-orange">Frequentes</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre o <strong>QRZ Store</strong>, implantação, valores e funcionalidades
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-3">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-5 md:p-6 transition-all duration-200 flex items-center justify-between"
                >
                  <h3 className="text-base md:text-lg font-semibold text-qrz-dark pr-4" dangerouslySetInnerHTML={{ __html: item.question }} />
                  <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-5 md:px-6 pb-5 pt-3 bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl -mt-1">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="text-center mt-10">
            <div className="bg-gradient-to-r from-qrz-blue/5 to-qrz-orange/5 border border-gray-200 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-qrz-dark mb-3">Ainda tem dúvidas?</h3>
              <p className="text-gray-600 mb-5 text-sm md:text-base">
                Nossa equipe está pronta para esclarecer todas as suas perguntas e mostrar como o <strong>QRZ Store</strong> pode transformar sua loja.
              </p>
              <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary font-bold uppercase inline-flex items-center justify-center gap-2 w-full md:w-auto text-[9px] min-[390px]:text-[11px] sm:text-sm md:text-base px-2 md:px-8 py-3 whitespace-nowrap">
                FALE CONOSCO NO WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-qrz-dark via-[#0d1f3c] to-qrz-blue/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">
              Profissionalize sua loja
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Entre em contato agora mesmo e descubra como a <strong>QRZ Store</strong> pode automatizar sua operação, reduzir perdas e aumentar o faturamento da sua loja.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/5527999936682?text=Olá! Gostaria de saber mais sobre o QRZ Store para minha loja"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-10 rounded-lg transition-all duration-300 text-[8.5px] min-[390px]:text-[10px] sm:text-[13px] md:text-lg shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              AGENDAR MINHA DEMONSTRAÇÃO GRATUITA
            </a>
          </motion.div>

          <motion.div {...fadeIn(0.4)} className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-lg">
              <strong>QRZ Store</strong>
            </p>
            <p className="text-white/60 mt-2">
              <strong>Telefone:</strong> (27) 99993-6682 · <strong>Email:</strong> thiago@qrztech.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Varejo;
