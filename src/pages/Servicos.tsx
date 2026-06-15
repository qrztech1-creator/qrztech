import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Check, Cloud, ClipboardList, CalendarClock, Receipt, Plug, Users, TrendingUp, MessageCircle, Shield, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Servicos = () => {
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
    document.title = "QRZ Serviços - Sistema para Prestadores de Serviço";
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

  // Módulos
  const modules = [
    {
      title: "Ordem de Serviço Digital",
      icon: <ClipboardList className="w-8 h-8" />,
      features: [
        "Preencha dados do cliente e equipamento de forma rápida e organizada.",
        "Adicione peças e serviços com valores unitários e calcule automaticamente.",
        "Gere contratos automáticos vinculados à OS e envie por WhatsApp.",
        "Aprovação em tempo real — o cliente aceita ou recusa direto pelo celular.",
        "Emissão de NFe e NFSe integrada à ordem de serviço.",
        "Acompanhamento por QR Code — o cliente rastreia o status do serviço a qualquer momento."
      ],
      image: "https://static.wixstatic.com/media/6bae68_b345ba2df7ac4a77a5d3b9a950ec0fa0~mv2.png/v1/fill/w_754,h_566,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/impressao.png"
    },
    {
      title: "ERP SaaS Completo",
      icon: <Cloud className="w-8 h-8" />,
      features: [
        "Gestão financeira completa — contas a pagar e receber, DRE e conciliação bancária.",
        "Controle de estoque com importação de XMLs e gestão de peças e insumos.",
        "Emissor de NFe e NFSe integrado ao ERP.",
        "Gerador de pedidos pela internet com envio automático ao financeiro.",
        "Integração com WhatsApp para envio de cobranças, orçamentos e status de OS.",
        "Relatórios e dashboards em tempo real para decisões estratégicas."
      ],
      image: "https://static.wixstatic.com/media/6bae68_2e6d6567c7f0461eb7b60bb69c21ae8d~mv2.png/v1/fill/w_731,h_668,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/dw-office-new.png"
    },
    {
      title: "Cobranças Recorrentes",
      icon: <Receipt className="w-8 h-8" />,
      features: [
        "Envio automático de cobranças via WhatsApp — sem esforço manual.",
        "Link de pagamento Pix e cartão de crédito integrado.",
        "Geração ilimitada de boletos bancários registrados.",
        "Acompanhamento de inadimplência com alertas automáticos.",
        "Recorrência e parcelamento configuráveis por cliente.",
        "Relatórios de recebimentos e previsão de caixa."
      ],
      image: "https://static.wixstatic.com/media/6bae68_2c5706f8d6fc44d496fd7916535c482e~mv2.png/v1/fill/w_395,h_526,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4075-transformed.png"
    },
    {
      title: "Agendamento Inteligente",
      icon: <CalendarClock className="w-8 h-8" />,
      features: [
        "Agende em poucos cliques com interface simples e intuitiva.",
        "Confirmação automática por WhatsApp — sem ligações manuais.",
        "Lembretes automáticos para clientes e equipe antes do horário.",
        "Reagendamento com apenas 1 toque direto na plataforma.",
        "Relatórios de histórico de agendamentos e frequência de clientes.",
        "Suporte a vários colaboradores simultâneos com kanban por profissional.",
        "Integração com cadastro de clientes e mensagens personalizáveis."
      ],
      image: "https://static.wixstatic.com/media/6bae68_de1cff7c101840689c80e5e61e7bffae~mv2.png/v1/fill/w_731,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/M82%20-%20Copy.png"
    },
    {
      title: "API de Integração",
      icon: <Plug className="w-8 h-8" />,
      features: [
        "Conecte seus sistemas externos ao ERP e OS digital da QRZ.",
        "Dados em tempo real — estoque, financeiro, clientes e agendamentos.",
        "Documentação completa em Swagger com endpoints prontos para uso.",
        "Gestão inteligente com dados consolidados de múltiplas fontes.",
        "Arquitetura escalável para acompanhar o crescimento do seu negócio.",
        "Integração omnichannel — WhatsApp, web, apps e ERP em uma só plataforma."
      ],
      image: "https://static.wixstatic.com/media/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png/v1/fill/w_887,h_491,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png"
    }
  ];

  // Diferenciais
  const differentiators = [
    {
      title: "OS aprovada por WhatsApp em tempo real",
      description: "Seu cliente recebe a ordem de serviço no celular e aprova ou recusa com um clique. Sem papel, sem espera, sem retrabalho.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Agendamentos com confirmação automática",
      description: "O sistema envia lembretes e confirmações por WhatsApp para clientes e equipe, reduzindo faltas e otimizando sua agenda.",
      icon: <CalendarClock className="w-6 h-6" />
    },
    {
      title: "Cobranças recorrentes sem inadimplência",
      description: "Automatize a cobrança de mensalidades, planos e contratos. Pix, cartão e boleto integrados com alertas de atraso.",
      icon: <Receipt className="w-6 h-6" />
    },
    {
      title: "NFe + NFSe integradas",
      description: "Emita notas fiscais de produto e serviço diretamente pelo sistema, vinculadas à OS ou à cobrança. Sem bitributação, sem erro.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Operação em nuvem sem servidor",
      description: "Acesse de qualquer lugar, a qualquer momento. Sem investimento em servidores locais, com backups automáticos e segurança bancária.",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      title: "Suporte especializado e treinamento",
      description: "Equipe dedicada para implantação, treinamento e suporte contínuo via WhatsApp. Sem fidelidade ou metas obrigatórias.",
      icon: <Bell className="w-6 h-6" />
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Como funciona a <strong>Ordem de Serviço digital</strong>?",
      answer: "Você cadastra o cliente e o equipamento/serviço, adiciona peças e mão de obra, e o sistema gera a OS completa. Ela é enviada por WhatsApp para aprovação do cliente em tempo real. Após aprovação, você pode emitir a nota fiscal e o cliente acompanha o status por QR Code."
    },
    {
      question: "Como funciona o <strong>agendamento inteligente</strong>?",
      answer: "O módulo de agendamento permite que você crie horários disponíveis por colaborador, e o sistema envia confirmações e lembretes automáticos por WhatsApp. O cliente pode reagendar com um toque, e você acompanha tudo em uma visão kanban organizada por profissional."
    },
    {
      question: "Como funcionam as <strong>cobranças recorrentes</strong>?",
      answer: "Você configura o valor, a periodicidade (mensal, semanal, etc.) e o método de pagamento (Pix, cartão ou boleto). O sistema envia automaticamente a cobrança via WhatsApp no dia programado e acompanha os pagamentos, alertando sobre inadimplências."
    },
    {
      question: "O sistema emite <strong>NFSe</strong> (nota fiscal de serviço)?",
      answer: "Sim! O QRZ Serviços possui emissor completo de NFe (produtos) e NFSe (serviços) integrado. As notas podem ser vinculadas diretamente à ordem de serviço ou à cobrança recorrente, eliminando a emissão manual."
    },
    {
      question: "O sistema funciona em modo <strong>híbrido</strong>?",
      answer: "Sim! O sistema opera de forma híbrida. Possui capacidade de operar offline em determinados módulos, dependendo dos equipamentos e infraestrutura da sua empresa. Para entender quais módulos podem operar offline na sua operação, agende uma call com nosso time."
    },
    {
      question: "Quanto tempo leva a <strong>implantação</strong>?",
      answer: "A implantação é extremamente ágil — a base do sistema fica online em cerca de <strong>24 horas</strong>. Oferecemos treinamento completo para sua equipe e suporte durante todo o processo de adaptação, sem custo adicional."
    }
  ];

  // Reusable animations
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
          NAVBAR DEDICADA SERVIÇOS
      ══════════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0a1628]/50 backdrop-blur-md border-qrz-blue/20' : 'bg-[#0a1628]/95 backdrop-blur-md border-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3">
            <img src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png" alt="QRZ Serviços" className="h-8 md:h-10 cursor-pointer" />
            <span className="text-white font-bold text-lg md:text-xl">Serv<span className="text-qrz-orange">iços</span></span>
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
              alt="QRZ Serviços Logo"
              className="h-20 md:h-32 w-auto object-contain drop-shadow-2xl"
            />
            <span className="text-white font-bold text-3xl md:text-5xl">Serv<span className="text-qrz-orange">iços</span></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold font-montserrat text-white max-w-4xl mx-auto mb-6 leading-tight"
          >
            Gestão Inteligente para{' '}
            <span className="text-qrz-orange">Prestadores de Serviço</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 text-base md:text-xl font-medium max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            OS digital com aprovação por WhatsApp, agendamentos com confirmação automática, cobranças recorrentes e emissão de NFe + NFSe — tudo em uma única plataforma.
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
              href="https://wa.me/5527999936682?text=Olá! Gostaria de conhecer o QRZ Serviços"
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
              EXPLORAR SOLUÇÕES
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DOR / SOLUÇÃO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white" id="beneficios">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">

            {/* Esquerda: Dor */}
            <motion.div {...fadeUp(0.1)} className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-qrz-dark leading-tight">
                Seu serviço merece ser profissional — <br className="hidden md:block" /><span className="text-qrz-orange">e não depender de papel e planilha</span>
              </h2>

              <div className="bg-red-50/70 rounded-2xl p-6 md:p-8 border border-red-100 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  Você já passou por isso?
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Ordens de serviço no papel que somem ou ficam ilegíveis",
                    "Clientes esquecendo o horário do agendamento",
                    "Inadimplência descontrolada sem cobrança automática",
                    "Emissão manual de notas fiscais com erros e retrabalho"
                  ].map((dor, i) => (
                    <li key={`dor-${i}`} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{dor}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                  <p className="text-red-800 font-medium">
                    <span className="font-bold">A verdade é simples:</span> Se a gestão é manual, o prejuízo é certo.
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
                  Com o QRZ Serviços, tudo muda:
                </h3>

                <ul className="space-y-4 mb-8 relative z-10">
                  {[
                    "OS digital enviada e aprovada por WhatsApp",
                    "Agendamento com confirmação automática",
                    "Cobranças recorrentes com Pix, cartão e boleto",
                    "NFe + NFSe integradas ao fluxo de trabalho",
                    "Gestão completa em nuvem, de qualquer lugar"
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
                    Foque no que realmente importa: entregar um serviço de qualidade e fazer seu negócio crescer.
                  </p>
                </div>

                <a
                  href="https://wa.me/5527999936682"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-6 rounded-lg transition-all shadow-lg shadow-qrz-orange/20 hover:shadow-qrz-orange/40 text-[9px] min-[390px]:text-[11px] sm:text-sm md:text-lg relative z-10 whitespace-nowrap"
                >
                  QUERO PROFISSIONALIZAR MEU SERVIÇO
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
          <h3 className="text-xl md:text-2xl font-bold text-center text-qrz-dark mb-2">Marcas que confiam na QRZ</h3>
        </div>
        <div className="relative flex overflow-x-hidden group bg-white">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          <div className="animate-marquee flex flex-row items-center whitespace-nowrap py-4" style={{ width: 'max-content' }}>
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
                      alt={`Parceiro QRZ ${index + 1}`}
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
           @keyframes marquee {
             0% { transform: translateX(0%); }
             100% { transform: translateX(-50%); }
           }
           .animate-marquee {
             width: fit-content;
             animation: marquee 40s linear infinite;
           }
           .animate-marquee:hover {
             animation-play-state: paused;
           }
         `}} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEGMENTOS ATENDIDOS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="segmentos" className="py-16 md:py-20 bg-gradient-to-b from-[#0a1628] to-qrz-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
                <span className="text-qrz-orange">Atendemos</span> Diversos Segmentos
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Nossa solução é adaptável para diferentes tipos de prestadores de serviço
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[
                { name: "Prestadores de Serviços", icon: "🔧" },
                { name: "Oficinas Mecânicas", icon: "🚗" },
                { name: "Clínicas & Consultórios", icon: "🏥" },
                { name: "Academias & Estúdios", icon: "🏋️" },
                { name: "Escolas & Cursos", icon: "🎓" },
                { name: "Salões & Estética", icon: "💇" },
                { name: "Imobiliárias", icon: "🏠" },
                { name: "Eventos & Produtoras", icon: "🎪" },
                { name: "Igrejas & Associações", icon: "⛪" },
                { name: "Condomínios & Adm.", icon: "🏢" },
                { name: "Transportadoras & Logística", icon: "🚚" },
                { name: "Assistências Técnicas", icon: "🖥️" }
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
                Nossa plataforma é altamente customizável e pode ser adaptada para atender necessidades específicas do seu negócio.
              </p>
              <a
                href="https://wa.me/5527999936682?text=Olá! Gostaria de saber se o QRZ Serviços atende meu segmento específico"
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
          MÓDULOS E FUNCIONALIDADES - Alternando posição de imagens
      ══════════════════════════════════════════════════════════════════ */}
      <section id="solucoes" className="py-16 md:py-20 bg-gradient-to-b from-qrz-dark to-[#0a1628]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Soluções Principais
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Conheça todos os módulos que compõem o <strong>QRZ Serviços</strong>
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
              O que torna o <strong>QRZ Serviços</strong> a melhor escolha para seu negócio
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
                  <h3 className="text-lg font-bold text-white">{diff.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{diff.description}</p>
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
              Tire suas dúvidas sobre o <strong>QRZ Serviços</strong>, implantação, valores e funcionalidades
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
                Nossa equipe está pronta para esclarecer todas as suas perguntas e mostrar como o <strong>QRZ Serviços</strong> pode transformar seu negócio.
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
              Profissionalize seus serviços
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Entre em contato agora mesmo e descubra como o <strong>QRZ Serviços</strong> pode organizar sua operação, eliminar inadimplência e encantar seus clientes.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/5527999936682?text=Olá! Gostaria de saber mais sobre o QRZ Serviços"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-10 rounded-lg transition-all duration-300 text-[8.5px] min-[390px]:text-[10px] sm:text-[13px] md:text-lg shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              AGENDAR MINHA DEMONSTRAÇÃO GRATUITA
            </a>
          </motion.div>

          <motion.div {...fadeIn(0.4)} className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-lg">
              <strong>QRZ Serviços</strong>
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

export default Servicos;
