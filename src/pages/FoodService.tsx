import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Check, Cloud, Smartphone, Tablet, QrCode, Monitor, Printer, Users, BarChart, Shield, Zap, MessageCircle, ShoppingCart, CreditCard, Package, Wallet, Bell, Star, TrendingUp, ChevronDown, Play, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FoodService = () => {
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
    const duration = 800; // smooth 0.8s slide
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
    document.title = "QRZ Food - Sistema para Restaurantes";
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

  // Imagens do PDF (URLs fornecidas)
  const images = {
    autoatendimentoTotem: "https://static.wixstatic.com/media/6bae68_de1cff7c101840689c80e5e61e7bffae~mv2.png/v1/fill/w_731,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/M82%20-%20Copy.png",
    autoatendimentoBanner: "https://static.wixstatic.com/media/6bae68_ef8d310f77114892bf26c12d94f608a6~mv2.png/v1/fill/w_334,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dwauto22.png",
    cardapioDigital: "https://static.wixstatic.com/media/6bae68_f1f20600cc5b42e5a25ffcab408bd6dc~mv2.png/v1/fill/w_584,h_414,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cardapio2.png",
    cardapioQrCode: "https://static.wixstatic.com/media/6bae68_7bbc978bb3254a998957cb554bfe0bd4~mv2.png/v1/fill/w_463,h_600,al_c,lg_1,q_85,enc_avif,quality_auto/5cad2ef01e-removebg-preview.png",
    marcasAceitas: "https://static.wixstatic.com/media/6bae68_87bb8a6ba4594b2daa54074b93f5049b~mv2.png/v1/fill/w_932,h_48,al_c,lg_1,q_85,enc_avif,quality_auto/marcaspng.png",
    smartPOS: "https://static.wixstatic.com/media/6bae68_2c5706f8d6fc44d496fd7916535c482e~mv2.png/v1/fill/w_395,h_526,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4075-transformed.png",
    maquinaGertec: "https://static.wixstatic.com/media/6bae68_453fd3cb08a84e46b297b9b539e8e8a0~mv2.png/v1/fill/w_307,h_464,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Maquina-Gertec_auto_x2.png",
    kdsSenhas: "https://static.wixstatic.com/media/6bae68_b9d5e871ddf443418b5a50e229d723dc~mv2.png/v1/fill/w_470,h_337,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/senhas.png",
    erpInterface: "https://static.wixstatic.com/media/6bae68_2e6d6567c7f0461eb7b60bb69c21ae8d~mv2.png/v1/fill/w_731,h_668,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/dw-office-new.png",
    pdvWindows: "https://static.wixstatic.com/media/6bae68_79f77811f7e2458e990262fa9cc0b570~mv2.png/v1/fill/w_600,h_441,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pdvwindowsmaquina.png",
    solucoesPrincipais: "https://static.wixstatic.com/media/6bae68_a805cec5fe5047d889e8bfa787b86123~mv2.png/v1/fill/w_1278,h_587,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/solucoes.png",
    plataformasDelivery: "https://static.wixstatic.com/media/6bae68_5562f987188249159fcc06597c25ae5e~mv2.png/v1/fill/w_1278,h_111,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/deliveries2.png",
    solucoesSecundarias: "https://static.wixstatic.com/media/6bae68_02cdf3add72f4d2896990c3dd546d4bb~mv2.png/v1/fill/w_1278,h_399,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/solucoes2.png",
    maquininhas: "https://static.wixstatic.com/media/6bae68_d76dd8e831e94a228f9024c3d1d97a3b~mv2.png/v1/fill/w_912,h_197,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled-3_edited_edited.png",
    impressoes: "https://static.wixstatic.com/media/6bae68_b345ba2df7ac4a77a5d3b9a950ec0fa0~mv2.png/v1/fill/w_754,h_566,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/impressao.png",
    pdvMercadinho: "https://static.wixstatic.com/media/6bae68_52dd1fdfa4234e71adcaa33550930221~mv2.png/v1/fill/w_508,h_474,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pdvwindowsmaquinatef.png",
    infraestrutura: "https://static.wixstatic.com/media/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png/v1/fill/w_887,h_491,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/6bae68_9eb48ea4bae94823a973e3f52df50ec2~mv2.png",
    appAndroid: "https://static.wixstatic.com/media/6bae68_de1cff7c101840689c80e5e61e7bffae~mv2.png/v1/fill/w_731,h_615,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/M82%20-%20Copy.png",
    clubeFidelidade: "/clube_fidelidade.png",
    mercadinhoModule: [
      "https://static.wixstatic.com/media/6bae68_2b0556e8b4f4464fbd3e714c274e2bfa~mv2.png",
      "https://static.wixstatic.com/media/6bae68_7a6b0b0fbefd4afa8a2ef3d4d6f55fce~mv2.png/v1/fit/w_699,h_460,q_90,enc_avif,quality_auto/6bae68_7a6b0b0fbefd4afa8a2ef3d4d6f55fce~mv2.png",
      "https://static.wixstatic.com/media/6bae68_93f246031da64da3b091904e63f99247~mv2.png/v1/fit/w_666,h_460,q_90,enc_avif,quality_auto/6bae68_93f246031da64da3b091904e63f99247~mv2.png"
    ]
  };

  // Módulos principais conforme PDF
  const modules = [
    {
      title: "Gestão SaaS/ERP em nuvem",
      icon: <Cloud className="w-8 h-8" />,
      features: [
        "Estoque - controla produtos, variações, compras, fichas técnicas e custo de mercadoria vendida (CMV). Permite importação de XML e pareamento de estoque.",
        "Fiscal - emissor completo de NFCe e NFe, integrado a TEF/Sitef e SmartPOS.",
        "Financeiro - contas a pagar e receber, conciliação bancária, plano de contas e demonstração de resultados (DRE).",
        "Relatórios e dashboards - indicadores em tempo real, exportação para Excel e acesso via API.",
        "API de integração - endpoints com documentação em Swagger para integrar sistemas ou aplicativos ao PDV, estoque e financeiro."
      ],
      image: images.erpInterface
    },
    {
      title: "PDV - Frente de caixa (Windows/Android/SmartPOS)",
      icon: <Monitor className="w-8 h-8" />,
      features: [
        "Operação rápida - atalhos e tela otimizada para balcão, comandas ou código de barras.",
        "Integração de pagamentos - aceita dinheiro, cartão, Pix e carteiras digitais.",
        "Fechamento de caixa - realiza suprimentos, sangrias e conferência de caixa.",
        "SmartPOS - permite realizar pedidos e pagamentos diretamente na maquininha com conexão 4G/wifi, ideal para mesas, eventos e atendimento móvel.",
        "A maquininha pode imprimir notas fiscais e tickets de produção na própria cozinha e opera sem necessidade de computador."
      ],
      image: images.pdvWindows
    },
    {
      title: "Autoatendimento (totem, tablet, SmartPOS ou QR Code)",
      icon: <Tablet className="w-8 h-8" />,
      features: [
        "Funcionamento 24 horas - basta ligar o equipamento para começar; não precisa de operador.",
        "Intuitivo e personalizável - interface simples com apenas alguns toques e possibilidade de personalizar imagens, cores e aparência.",
        "Integração total - o sistema emite automaticamente a nota fiscal na aprovação do pagamento e envia o pedido para a cozinha.",
        "Múltiplos formatos - disponível em totens, tablets de mesa, máquinas SmartPOS ou QR Code nas mesas.",
        "Pagamentos - aceita Pix, cartão de crédito/débito e vouchers. A impressão de senha/ingresso é automática.",
        "Aumento de ticket - permite sugerir combos e adicionais para turbinar o faturamento."
      ],
      image: images.autoatendimentoTotem
    },
    {
      title: "Cardápio digital (tablet ou QR Code)",
      icon: <QrCode className="w-8 h-8" />,
      features: [
        "Interface amigável - os consumidores navegam de forma simples e intuitiva; é possível incluir fotos e vídeos dos pratos.",
        "Funcionamento autônomo - opera sem necessidade de colaboradores, reduzindo custos.",
        "Customizável - o restaurante pode personalizar a aparência e criar combos.",
        "Integração com a cozinha e ERP - o cardápio emite a nota fiscal automaticamente e envia o pedido à cozinha.",
        "Pesquisa de satisfação e chamada de garçom - permite criar pesquisas de satisfação em tempo real."
      ],
      image: images.cardapioDigital
    },
    {
      title: "Controle de mesas, fila e reservas",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Visão em tempo real das mesas com número, capacidade, status e nome do cliente.",
        "Fila de espera digital - controle a ordem de chegada e acompanhe o tempo de espera.",
        "Reservas com tempo controlado - reserva ativa com contador regressivo de até 10 minutos.",
        "Chamada automática - quando uma mesa é liberada, o sistema identifica um cliente na fila e envia notificação por WhatsApp.",
        "Integração com PDV - as mesas e reservas se comunicam com o PDV e o ERP."
      ],
      image: images.autoatendimentoBanner
    },
    {
      title: "PDV móvel / caixa móvel",
      icon: <Smartphone className="w-8 h-8" />,
      features: [
        "Venda em qualquer lugar - use a máquina para registrar pedidos e pagamentos no salão ou em eventos.",
        "Flexível - pode emitir notas fiscais, tickets, ler comandas ou pulseiras.",
        "Módulos adicionais - gestão em nuvem, autoatendimento e frente de caixa integrados na mesma maquininha.",
        "Impressão - permite imprimir notas ou pedidos na cozinha ou na própria maquininha."
      ],
      image: images.smartPOS
    },
    {
      title: "Aplicativo para Android, tablets e maquininhas",
      icon: <Smartphone className="w-8 h-8" />,
      features: [
        "Multiplataforma - funciona em smartphones Android, tablets e maquininhas SmartPOS.",
        "Operação flexível - use como PDV móvel, autoatendimento ou cardápio digital.",
        "Integração total - conectado ao ERP, emite nota fiscal e envia pedidos para cozinha automaticamente.",
        "Pagamentos diversos - aceita Pix, cartão, dinheiro e carteiras digitais.",
        "Customização - personalize interface, produtos, combos e promoções."
      ],
      image: images.appAndroid
    },
    {
      title: "Monitor de cozinha (KDS)",
      icon: <Printer className="w-8 h-8" />,
      features: [
        "Cozinha sem papel - pedidos são exibidos em monitores; não há necessidade de imprimir tickets.",
        "Controle de produção - monitore o tempo de preparo por produto com cronômetros e indicadores.",
        "Painel de senhas - despache os itens na tela e deixe que o monitor de senhas chame o cliente."
      ],
      image: images.kdsSenhas
    },
    {
      title: "Cardápio digital + delivery integrado",
      icon: <Package className="w-8 h-8" />,
      features: [
        "Fotos, modais e combos - cardápio com fotos, opções de personalização e combos.",
        "Área do cliente - o consumidor acompanha pedidos e histórico de compras.",
        "Regras de entrega - defina taxas e regiões de entrega.",
        "Integração com PDV/estoque - todos os pedidos alimentam o estoque e o financeiro.",
        "Bot de WhatsApp - notifica status de entrega e pedido aceito."
      ],
      image: images.maquinaGertec
    },
    {
      title: "Mercadinhos, Balanças e Etiquetas",
      icon: <ShoppingCart className="w-8 h-8" />,
      features: [
        "Integração perfeita com balanças para produtos vendidos por peso.",
        "Geração de etiquetas com código de barras prontas para gôndolas e prateleiras.",
        "Leitura rápida no PDV - agilidade total para supermercados, mercadinhos e padarias.",
        "Gestão de estoque focada para volume alto de SKUs e perecíveis."
      ],
      image: images.mercadinhoModule
    },
    {
      title: "Clube de Fidelidade & CRM",
      icon: <Star className="w-8 h-8" />,
      features: [
        "Programa de pontos e cashback integrado automaticamente a cada compra.",
        "CRM com integração ao WhatsApp para disparar mensagens e campanhas para clientes inativos.",
        "Segmentação inteligente de clientes com base em hábitos de consumo.",
        "Estimula a recompra e turbina a receita do estabelecimento de forma passiva."
      ],
      customNode: (
        <div className="w-full flex flex-col h-full bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl shadow-green-500/10 border border-green-100 items-center justify-center p-8 lg:p-12 text-center group">
          <div className="bg-green-500 text-white p-4 rounded-full mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
            <Star className="w-12 h-12 fill-current" />
          </div>
          <h4 className="text-3xl font-bold text-qrz-dark mb-3">Eba!</h4>
          <p className="text-xl md:text-2xl font-bold text-green-600 mb-2">30% de cashback</p>
          <p className="text-gray-500 font-medium text-lg">no meu restaurante favorito 🍔</p>
        </div>
      ),
      image: images.clubeFidelidade
    }
  ];

  // Diferenciais conforme PDF
  const differentiators = [
    {
      title: "Suporte presencial no primeiro dia",
      description: "A <strong>QRZ Food</strong> destaca-se por oferecer suporte presencial no primeiro dia de abertura do restaurante, acompanhando a implantação do sistema e garantindo que a operação funcione sem falhas.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Operação sem servidor local",
      description: "O PDV funciona online e offline e sincroniza com a nuvem quando a conexão retorna.",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      title: "Escalabilidade",
      description: "A plataforma atende diversos segmentos (restaurantes, bares, cafeterias, sorveterias, padarias, hamburguerias e mais), podendo evoluir junto com o negócio.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Integração omnichannel",
      description: "Conecta salão, autoatendimento, delivery, WhatsApp e gestão em nuvem.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Atualizações e segurança",
      description: "A estrutura em nuvem garante atualizações automáticas e segurança bancária.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Suporte gratuito e humanizado",
      description: "O suporte é oferecido presencialmente, via WhatsApp e materiais de ajuda, sem metas obrigatórias.",
      icon: <Bell className="w-6 h-6" />
    }
  ];

  // Vídeos reais dos clientes - horizontais (landscape)
  const clientVideosHorizontal = [
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_8e14a52c77264505b2b4fae4de238400/480p/mp4/file.mp4" },
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_54748428701a48338e7e0f04a6873ca1/720p/mp4/file.mp4" },
  ];

  // Vídeos reais dos clientes - verticais (portrait)
  const clientVideosVertical = [
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_fc4cb673e40c4464af26ed947aeed269/480p/mp4/file.mp4" },
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_e547ff7891ae46b89281e523f977c22c/480p/mp4/file.mp4" },
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_3b911c8a14a1490289b731cde931fbbf/480p/mp4/file.mp4" },
    { title: "Resultados Reais", url: "https://video.wixstatic.com/video/6bae68_e361a89e345d4a1eb7285a9d8f98513c/480p/mp4/file.mp4" },
  ];

  // Vídeos de módulos - horizontais (landscape)
  const moduleVideosHorizontal = [
    { title: "PDV - Frente de Caixa (Windows)", url: "https://video.wixstatic.com/video/6bae68_1f8cf5b6e62a4bd5afea58de3dbe40da/1080p/mp4/file.mp4" },
    { title: "Cardápio Digital", url: "https://video.wixstatic.com/video/6bae68_ef6c0ae4ff954b84a2d9adbd293dd17a/480p/mp4/file.mp4" },
  ];

  // Vídeos de módulos - verticais (portrait)
  const moduleVideosVertical = [
    { title: "Robô WhatsApp", url: "https://video.wixstatic.com/video/6bae68_8483695eb71848a9a00011914b79795f/1080p/mp4/file.mp4" },
    { title: "App Entregas", url: "https://video.wixstatic.com/video/6bae68_8102a819c0d64eb59f19c90731b43eeb/1080p/mp4/file.mp4" },
    { title: "PDV Android", url: "https://video.wixstatic.com/video/6bae68_5ca806e3f54d48519b8e7287c11a390b/720p/mp4/file.mp4" },
    { title: "SmartPOS (APP para Maquininha)", url: "https://video.wixstatic.com/video/6bae68_d490d98bbdb94764b5fa2a14edbfd582/720p/mp4/file.mp4" },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Como funciona o sistema <strong>QRZ Food</strong>?",
      answer: "O <strong>QRZ Food</strong> é um sistema completo para gestão de restaurantes que funciona tanto online quanto offline. Inclui PDV, smartPOS integrado na maquininha, gestão na nuvem, delivery digital, integração com marketplaces (iFood, Rappi, etc.) e muito mais. Tudo em uma única plataforma unificada."
    },
    {
      question: "O sistema funciona sem internet?",
      answer: "Sim! Nosso PDV funciona em modo offline. Você pode continuar registrando pedidos, imprimindo comandas e controlando o caixa normalmente. Quando a internet voltar, todos os dados são automaticamente sincronizados com a nuvem, sem perda de informações."
    },
    {
      question: "E se acabar a energia?",
      answer: "Tablets e terminais SmartPOS possuem bateria interna de longa duração. Mesmo durante quedas de energia, você continua atendendo normalmente utilizando nosso sistema na maquininha ou tablet, sem perder vendas ou dados."
    },
    {
      question: "Quanto tempo leva para implantar o sistema <strong>QRZ Food</strong>?",
      answer: "A implantação acontece de forma extremamente ágil: a base do sistema já está online em cerca de <strong>24 horas</strong>. Caso seja necessária a compra ou envio de hardwares/equipamentos físicos, o prazo variará de acordo com o frete."
    },
    {
      question: "Qual é o investimento necessário?",
      answer: "Oferecemos planos flexíveis que se adaptam ao tamanho do seu negócio. Os valores variam conforme o número de pontos de venda, funcionalidades necessárias e volume de transações. Entre em contato para receber uma proposta personalizada sem compromisso."
    },
    {
      question: "O sistema é seguro?",
      answer: "Totalmente seguro! Utilizamos criptografia de ponta a ponta, backups automáticos diários e compliance com as principais normas de segurança. Seus dados e transações estão sempre protegidos com segurança de nível bancário."
    },
    {
      question: "Funciona em tablets e smartphones?",
      answer: "Sim! O sistema é 100% responsivo e funciona perfeitamente em tablets, smartphones, computadores e terminais POS. Também oferecemos aplicativos nativos para Android com funcionalidades específicas para garçons e gestores."
    },
    {
      question: "Como é o suporte técnico?",
      answer: "Oferecemos suporte técnico especializado via WhatsApp, com equipe dedicada para resolver qualquer problema rapidamente. Também oferecemos suporte presencial no primeiro dia de operação e treinamentos contínuos para sua equipe. Sem fidelidade ou metas obrigatórias."
    },
    {
      question: "Integra com maquininhas de cartão?",
      answer: "Sim! Nossa solução SmartPOS transforma sua maquininha de cartão em um terminal completo com PDV integrado. Aceitamos todas as principais bandeiras e oferecemos TEF/SiTEF com as melhores taxas do mercado."
    },
    {
      question: "Integra com iFood, Rappi e outros marketplaces?",
      answer: "Sim! Temos integração direta com iFood, Neemo, Rappi e Delivery Much. Os pedidos são puxados automaticamente para o PDV, eliminando digitação manual e erros. O estoque e financeiro são atualizados em tempo real."
    },
    {
      question: "Preciso de um servidor local?",
      answer: "Não! Nossa operação é 100% em nuvem. Basta ligar os equipamentos e conectar à internet para começar a vender. O sistema funciona de forma híbrida (online/offline), sem necessidade de investir em servidores locais."
    },
    {
      question: "Posso usar o sistema em mais de uma unidade?",
      answer: "Sim! A plataforma é multi-loja. Você pode gerenciar todas as suas unidades a partir de um único painel, com dados consolidados de vendas, estoque e financeiro. Ideal para redes e franquias."
    }
  ];

  // Reusable fast fade animation (once only)
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
          NAVBAR DEDICADA FOOD
      ══════════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0a1628]/50 backdrop-blur-md border-qrz-blue/20' : 'bg-[#0a1628]/95 backdrop-blur-md border-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
            <img src="https://i.postimg.cc/X7znNcFg/qrzfood.png" alt="QRZ Food" className="h-8 md:h-10 cursor-pointer" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-semibold text-gray-300">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-qrz-orange cursor-pointer transition-colors">Início</a>
            <a href="#solucoes" onClick={(e) => handleNavClick(e, 'solucoes')} className="hover:text-qrz-orange cursor-pointer transition-colors">Soluções</a>
            <a href="#resultados" onClick={(e) => handleNavClick(e, 'resultados')} className="hover:text-qrz-orange cursor-pointer transition-colors">Resultados</a>
            <a href="#depoimentos" onClick={(e) => handleNavClick(e, 'depoimentos')} className="hover:text-qrz-orange cursor-pointer transition-colors">Depoimentos</a>
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
                <a href="#resultados" onClick={(e) => handleNavClick(e, 'resultados')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">Resultados</a>
                <a href="#depoimentos" onClick={(e) => handleNavClick(e, 'depoimentos')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">Depoimentos</a>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-gray-200 font-medium py-3 hover:text-qrz-orange transition-colors border-b border-white/5">FAQ</a>
                <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="bg-qrz-orange text-white flex items-center justify-center font-bold uppercase py-3 px-2 rounded-lg transition-all mt-4 w-full text-[11px] min-[360px]:text-sm whitespace-nowrap">
                  FALAR COM ESPECIALISTA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION - Luzes e sombras para profundidade
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
            className="flex justify-center mb-6"
          >
            <img
              src="https://i.postimg.cc/X7znNcFg/qrzfood.png"
              alt="QRZ Food Logo"
              className="h-28 md:h-40 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 text-base md:text-xl font-medium max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            <strong>Seu negócio não pode parar!</strong> Tenha um sistema completo, seguro e que funciona mesmo sem internet ou energia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5527999936682?text=Olá! Gostaria de agendar uma demonstração do QRZ Food"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-8 rounded-lg transition-all duration-300 shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:shadow-qrz-orange/40 text-[10px] min-[360px]:text-[12px] sm:text-sm md:text-base whitespace-nowrap flex items-center justify-center w-full md:w-auto"
            >
              AGENDAR DEMONSTRAÇÃO GRATUITA
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#solucoes"
              onClick={(e) => handleNavClick(e, 'solucoes')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-8 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 text-[10px] min-[360px]:text-[12px] sm:text-sm md:text-base whitespace-nowrap flex items-center justify-center w-full md:w-auto mt-2 md:mt-0"
            >
              EXPLORAR O SISTEMA COMPLETO
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          NUNCA PARE DE VENDER - Logo após o hero
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white" id="beneficios">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">

            {/* Esquerda: Dor */}
            <motion.div {...fadeUp(0.1)} className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-qrz-dark leading-tight">
                Seu negócio não pode parar — <br className="hidden md:block" /><span className="text-qrz-orange">nem por falta de internet ou energia</span>
              </h2>

              <div className="bg-red-50/70 rounded-2xl p-6 md:p-8 border border-red-100 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  Você já passou por isso?
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Sistema travando na hora de fechar o caixa",
                    "Perda de pedidos por falha de conexão",
                    "Atendimento lento e clientes irritados",
                    "Falta de controle sobre vendas e estoque"
                  ].map((dor, i) => (
                    <li key={`dor-${i}`} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{dor}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                  <p className="text-red-800 font-medium">
                    <span className="font-bold">A verdade é simples:</span> Se o sistema para, seu faturamento para junto.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direita: Benefícios e Solução */}
            <motion.div {...fadeUp(0.2)} className="md:w-1/2 w-full">
              <div className="bg-gradient-to-br from-[#0a1628] to-qrz-dark rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-qrz-blue/10 rounded-full blur-[40px] -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-qrz-orange/10 rounded-full blur-[40px] -ml-10 -mb-10" />

                <h3 className="text-xl md:text-2xl font-bold mb-8 text-white relative z-10">
                  Com o QRZ Food, você nunca fica na mão:
                </h3>

                <ul className="space-y-4 mb-8 relative z-10">
                  {[
                    "Funciona mesmo sem internet",
                    "Continuidade mesmo sem energia",
                    "Segurança total na operação",
                    "Controle completo em tempo real",
                    "Da operação à gestão, tudo em um só sistema"
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
                  className="flex items-center justify-center w-full bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-6 rounded-lg transition-all shadow-lg shadow-qrz-orange/20 hover:shadow-qrz-orange/40 text-[10px] min-[360px]:text-[12px] sm:text-sm md:text-lg relative z-10 whitespace-nowrap"
                >
                  QUERO AUTOMATIZAR MEU NEGÓCIO
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
          <h3 className="text-xl md:text-2xl font-bold text-center text-qrz-dark mb-2">Marcas que confiam na QRZ Food</h3>
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
                  "https://i.postimg.cc/CMDW70kg/logo-branco-clinica-praia-da-costa.png"
                ].map((logo, index) => (
                  <div key={`logo-${i}-${index}`} className="flex-none mx-8 md:mx-12 w-24 md:w-32 flex items-center justify-center transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100 h-16 md:h-20">
                    <img
                      src={logo}
                      alt={`Parceiro QRZ Food ${index + 1}`}
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
          ATENDEMOS DIVERSOS SEGMENTOS - Movido para cima
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a1628] to-qrz-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
                <span className="text-qrz-orange">Atendemos</span> Diversos Segmentos
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Nossa solução é adaptável para diferentes tipos de estabelecimentos do setor alimentício
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[
                { name: "Restaurantes", icon: "🍽️" },
                { name: "Bares", icon: "🍻" },
                { name: "Cafeterias", icon: "☕" },
                { name: "Sorveterias", icon: "🍦" },
                { name: "Hamburguerias", icon: "🍔" },
                { name: "Padarias", icon: "🥐" },
                { name: "Lanchonetes", icon: "🥪" },
                { name: "Fast-food", icon: "🍟" },
                { name: "Eventos", icon: "🎪" },
                { name: "Food trucks", icon: "🚚" },
                { name: "Conveniências", icon: "🏪" },
                { name: "Açougues", icon: "🥩" },
                { name: "Mercadinhos", icon: "🛒" },
                { name: "Churrascarias", icon: "🔥" },
                { name: "Açaiterias", icon: "🍧" },
                { name: "Cantinas", icon: "🏫" }
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
                href="https://wa.me/5527999936682?text=Olá! Gostaria de saber se o QRZ Food atende meu segmento específico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 px-2 md:px-8 rounded-lg transition-all duration-300 text-[10px] min-[360px]:text-[12px] sm:text-sm whitespace-nowrap"
              >
                CONSULTAR SEGMENTO
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VISÃO GERAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
                Visão Geral
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Sistema totalmente híbrido, operando online e offline, com sincronização na nuvem, e não exige servidor local — basta ligar os equipamentos para começar a vender.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mb-8">
              <img src={images.solucoesPrincipais} alt="Soluções QRZ Food" className="rounded-2xl shadow-lg w-full" />
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="mb-8">
              <img src={images.solucoesSecundarias} alt="Mais soluções QRZ Food" className="rounded-2xl shadow-lg w-full" />
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="mb-8">
              <img src={images.plataformasDelivery} alt="Plataformas de delivery integradas" className="rounded-2xl shadow-lg w-full" />
            </motion.div>

            {/* Integração com Marketplaces & Operação Híbrida */}
            <motion.div {...fadeUp(0.4)} className="bg-gradient-to-r from-qrz-blue/10 to-qrz-orange/10 rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-qrz-dark">Integração com Marketplaces</h3>
                  <p className="text-gray-700 mb-4">
                    Integração com iFood, Neemo, Rappi e Delivery Much permite que os pedidos sejam puxados automaticamente para o PDV.
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-qrz-blue/10 p-2 rounded-lg"><Check className="w-5 h-5 text-qrz-blue" /></div>
                    <span className="font-semibold text-qrz-dark">Pedidos automáticos</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-qrz-dark">Operação Híbrida: Online e Offline</h3>
                  <p className="text-gray-700 mb-4">
                    Nossa atuação é híbrida tanto online quanto offline. O sistema não para - você vai conseguir vender mesmo sem internet. Quando a conexão retorna, tudo sincroniza automaticamente.
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="bg-qrz-orange/10 p-2 rounded-lg"><Check className="w-5 h-5 text-qrz-orange" /></div>
                    <span className="font-semibold text-qrz-dark">Venda sem internet</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          INFRAESTRUTURA BÁSICA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
                <span className="text-qrz-orange">Infraestrutura</span> Básica
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Tudo que você precisa para começar a operar com eficiência e segurança
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div {...fadeUp(0.1)}>
                <img
                  src={images.infraestrutura}
                  alt="Infraestrutura QRZ Food"
                  className="rounded-2xl shadow-lg w-full"
                />
              </motion.div>

              <motion.div {...fadeUp(0.2)}>
                <div className="space-y-4">
                  {[
                    "Operação sem servidor local (híbrido on/offline)",
                    "Até 7 impressoras de produção por departamento ou KDS",
                    "Delivery Digital web + puxada automática de marketplaces (iFood/Neemo/Rappi etc.)",
                    "Comandas NFC e tickets para eventos, leitura de ingressos",
                    "Integração com balanças e etiquetas EAN-13",
                    "TEF / SiTEF e SmartPOS como smartTEF",
                    "Dashboards e relatórios exportáveis",
                    "WhatsApp integrado para avisos, fila e status de preparo"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-qrz-orange/10 p-2 rounded-lg flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-qrz-orange" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="https://wa.me/5527999936682"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-qrz-blue hover:bg-qrz-blue/90 text-white font-bold uppercase py-3 px-2 md:px-8 rounded-lg transition-all duration-300 shadow-lg text-[10px] min-[360px]:text-[12px] sm:text-sm whitespace-nowrap"
                  >
                    SOLICITAR INFRAESTRUTURA COMPLETA
                  </a>
                </div>
              </motion.div>
            </div>
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
              Conheça todos os módulos que compõem a solução <strong>QRZ Food</strong>
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
                  <div className={`flex flex-col ${module.image ? (isEven ? 'lg:flex-row' : 'lg:flex-row-reverse') : ''} items-start gap-6 md:gap-8`}>
                    <div className={`${module.image ? 'lg:w-1/2' : 'w-full'}`}>
                      <div className="flex items-center mb-6">
                        <div className="bg-qrz-blue/20 p-3 rounded-xl mr-4">
                          <div className="text-qrz-blue">{module.icon}</div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{module.title}</h3>
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

                    {module.customNode ? (
                      <div className="lg:w-1/2 flex items-stretch justify-center w-full min-h-[300px]">
                        {module.customNode}
                      </div>
                    ) : module.image && (
                      <div className="lg:w-1/2 flex items-center justify-center w-full">
                        {Array.isArray(module.image) ? (
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {module.image.map((imgSrc, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={imgSrc}
                                alt={`${module.title} ${imgIdx + 1}`}
                                className={`rounded-lg shadow-lg object-contain w-full ${imgIdx === 0 ? 'col-span-2' : 'col-span-1'} max-h-[300px] bg-white/5 mx-auto`}
                              />
                            ))}
                          </div>
                        ) : (
                          <img
                            src={module.image as string}
                            alt={module.title}
                            className="rounded-lg shadow-lg max-w-full max-h-96 object-contain"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CLIENTES EM TEMPO REAL - Vídeos reais
      ══════════════════════════════════════════════════════════════════ */}
      <section id="resultados" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
                <span className="text-qrz-orange">Clientes</span> Utilizando em Tempo Real
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Veja exemplos reais de nossos clientes utilizando o sistema <strong>QRZ Food</strong> em diferentes módulos
              </p>
            </motion.div>

            {/* Vídeos de resultados reais */}
            <motion.div {...fadeUp(0.1)}>
              <h3 className="text-xl md:text-2xl font-bold text-qrz-dark mb-8">Vídeos de Resultados Reais</h3>

              {/* Linha de Horizontais (lado a lado) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                {clientVideosHorizontal.map((video, index) => (
                  <div key={`ch-${index}`} className="flex flex-col h-full">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video flex items-center justify-center">
                      <video
                        className="w-full h-full"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={video.url} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                ))}
              </div>

              {/* Linha de Verticais (lado a lado) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {clientVideosVertical.map((video, index) => (
                  <div key={`cv-${index}`} className="flex flex-col h-full">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-[9/16] flex items-center justify-center">
                      <video
                        className="h-full w-full"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={video.url} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vídeos de módulos */}
            <motion.div {...fadeUp(0.2)}>
              <h3 className="text-xl md:text-2xl font-bold text-qrz-dark mb-8">Demonstrações dos Módulos</h3>

              {/* Linha de Verticais (lado a lado) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {moduleVideosVertical.map((video, index) => (
                  <div key={`mv-${index}`} className="flex flex-col h-full gap-3">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-[9/16] flex items-center justify-center">
                      <video
                        className="h-full w-full"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={video.url} type="video/mp4" />
                      </video>
                    </div>
                    <h4 className="font-bold text-qrz-dark text-sm text-center px-1">{video.title}</h4>
                  </div>
                ))}
              </div>

              {/* Linha de Horizontais (lado a lado) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                {moduleVideosHorizontal.map((video, index) => (
                  <div key={`mh-${index}`} className="flex flex-col h-full gap-3">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video flex items-center justify-center">
                      <video
                        className="w-full h-full"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={video.url} type="video/mp4" />
                      </video>
                    </div>
                    <h4 className="font-bold text-qrz-dark text-sm md:text-base text-center">{video.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Imagem PDV Mercadinho */}
              <motion.div {...fadeUp(0.2)} className="text-center">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex-grow flex items-center justify-center">
                    <img
                      src={images.pdvMercadinho}
                      alt="PDV para mercadinho com leitor de código de barras"
                      className="mx-auto w-full object-contain max-h-[350px]"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-700 font-semibold text-sm md:text-base">PDV completo para mercadinhos com leitor de código de barras integrado</p>
                  </div>
                </div>
              </motion.div>

              {/* Imagem de impressões */}
              <motion.div {...fadeUp(0.3)} className="text-center">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex-grow flex items-center justify-center">
                    <img
                      src={images.impressoes}
                      alt="Sistema de impressões para produção, evento e delivery"
                      className="mx-auto w-full object-contain max-h-[350px]"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-700 font-semibold text-sm md:text-base">Sistema completo de impressões para produção, eventos e delivery e muito mais opções!</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Estatísticas */}
            <motion.div {...fadeUp(0.3)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-qrz-orange/5 to-qrz-orange/10 rounded-xl p-6 text-center border border-qrz-orange/20">
                <div className="text-4xl font-bold text-qrz-orange mb-2">124+</div>
                <div className="text-gray-600 font-medium">Projetos Entregues</div>
              </div>
              <div className="bg-gradient-to-br from-qrz-blue/5 to-qrz-blue/10 rounded-xl p-6 text-center border border-qrz-blue/20">
                <div className="text-4xl font-bold text-qrz-blue mb-2">30+</div>
                <div className="text-gray-600 font-medium">Clientes Ativos</div>
              </div>
              <div className="bg-gradient-to-br from-qrz-blue-light/5 to-qrz-blue-light/10 rounded-xl p-6 text-center border border-qrz-blue-light/20">
                <div className="text-4xl font-bold text-qrz-blue-light mb-2">7+</div>
                <div className="text-gray-600 font-medium">Anos de Expertise</div>
              </div>
            </motion.div>
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
              O que torna a <strong>QRZ Food</strong> a melhor escolha para o seu restaurante
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
          API QRZ FOOD
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
                API QRZ Food
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Conecte seu negócio a um ecossistema completo de automação comercial!
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-qrz-dark">
                    Integre com facilidade seu sistema, aplicativo ou plataforma diretamente ao nosso PDV e soluções de gestão.
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Tenha acesso a dados em tempo real, segurança bancária e a robustez de um ERP feito para bares, restaurantes, cafeterias, sorveterias, hamburguerias e muito mais.
                  </p>

                  <div className="space-y-4">
                    {[
                      { title: "⚡ Automação em Tempo Real", desc: "Dados sempre atualizados, sem retrabalho e sem atrasos." },
                      { title: "📊 Gestão Inteligente", desc: "Acompanhe vendas, estoque, clientes e fluxo de caixa diretamente pela API." },
                      { title: "💡 Escalabilidade", desc: "Construa novas soluções sobre o nosso sistema e leve inovação ao seu negócio." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-qrz-blue/10 p-2 rounded-lg mr-4 flex-shrink-0">
                          <Zap className="w-5 h-5 text-qrz-blue" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base mb-1 text-qrz-dark">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    {[
                      { title: "🔗 Conexão Total", desc: "Integre seu software ao nosso PDV, estoque, financeiro, cardápio digital e muito mais." },
                      { title: "🛠️ Facilidade para Desenvolvedores", desc: "Documentação completa em Swagger, com endpoints claros e prontos para uso." },
                      { title: "📱 Omnichannel", desc: "Conecte com PDV, autoatendimento, cardápio digital, WhatsApp e gestão em nuvem." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-qrz-orange/10 p-2 rounded-lg mr-4 flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-qrz-orange" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base mb-1 text-qrz-dark">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 bg-qrz-dark/5 rounded-xl border border-qrz-blue/20">
                    <h4 className="font-bold text-base mb-2 text-qrz-dark">Integração Completa</h4>
                    <p className="text-gray-600 text-sm">
                      Nossa API permite integração com diversos sistemas e plataformas, oferecendo flexibilidade total para seu negócio crescer e se adaptar às novas tecnologias.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PLANOS (Movido conforme solicitação)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="planos" className="py-16 md:py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
                O <span className="text-qrz-orange">KIT Móvel</span> ideal
              </h2>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-qrz-dark to-[#0d1f3c] rounded-2xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Decoração */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-qrz-orange/10 rounded-full blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-qrz-blue/10 rounded-full blur-[50px]" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img src="/kit_foodtruck.png" alt="Kit Móvel QRZ Food" className="w-[80%] md:w-full max-w-md object-contain rounded-xl drop-shadow-2xl mb-4 md:mb-0" />
                  </div>

                  <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">KIT Foodtruck Móvel</h3>
                    <p className="text-qrz-orange font-semibold text-lg mb-8">Plano focado para atender os foodtrucks</p>

                    <div className="space-y-4 mb-8">
                      <h4 className="text-white font-bold text-xl mb-4">O que está incluso:</h4>
                      {[
                        "1 Modem 5G",
                        "1 Switch 4 portas",
                        "Impressora Térmica"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-6 h-6 text-qrz-orange flex-shrink-0" />
                          <span className="text-gray-200 text-lg">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                          <strong className="text-yellow-400">Importante:</strong> O cliente precisa ter internet estável em um chip <strong className="text-white">dedicado</strong>. É possível usar do próprio plano, mas é necessário ter internet para não acabar, com boa estabilidade e comunicação. A provedora de internet não é nossa responsabilidade.
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/5527999936682?text=Olá! Tenho interesse no KIT Foodtruck Móvel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-10 rounded-xl transition-all duration-300 shadow-lg shadow-qrz-orange/30 text-[11px] min-[360px]:text-[13px] sm:text-sm md:text-lg w-full md:w-auto text-center hover:scale-105 whitespace-nowrap"
                    >
                      QUERO ESSE SISTEMA NO MEU NEGÓCIO
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DEPOIMENTOS 
      ══════════════════════════════════════════════════════════════════ */}
      <section id="depoimentos" className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-qrz-dark">
              O que dizem nossos <span className="text-qrz-orange">Clientes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja como o QRZ Food tem transformado o dia a dia e o faturamento de diferentes negócios na prática.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Flames */}
            <motion.div {...fadeUp(0.1)} className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 relative group hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageCircle className="w-20 h-20 text-qrz-blue" />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                  <img src="https://i.postimg.cc/T158wV0c/fl.png" alt="Flames" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="font-bold text-qrz-dark text-lg">Flames</h4>
                  <div className="flex text-qrz-orange text-sm mt-1">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic relative z-10 leading-relaxed font-medium">
                "Depois que começamos a usar o sistema, nosso atendimento ficou muito mais rápido e organizado. Nunca mais perdemos pedidos ou tivemos problema no caixa. Hoje temos controle total da operação."
              </p>
            </motion.div>

            {/* Pimenta Nativa */}
            <motion.div {...fadeUp(0.2)} className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 relative group hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageCircle className="w-20 h-20 text-qrz-orange" />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                  <img src="https://i.postimg.cc/8cf85R4m/5.png" alt="Pimenta Nativa" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="font-bold text-qrz-dark text-lg">Pimenta Nativa</h4>
                  <div className="flex text-qrz-orange text-sm mt-1">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic relative z-10 leading-relaxed font-medium">
                "Antes era tudo manual e confuso. Agora conseguimos acompanhar vendas, estoque e pedidos em tempo real. O sistema trouxe muito mais segurança pra nossa rotina."
              </p>
            </motion.div>

            {/* TC Beauty */}
            <motion.div {...fadeUp(0.3)} className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 relative group hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageCircle className="w-20 h-20 text-qrz-blue" />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gray-50 p-2 flex items-center justify-center border border-gray-100">
                  <img src="https://i.postimg.cc/vBNFbqrq/4.png" alt="TC Beauty" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="font-bold text-qrz-dark text-lg">TC Beauty</h4>
                  <div className="flex text-qrz-orange text-sm mt-1">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic relative z-10 leading-relaxed font-medium">
                "A organização que ganhamos foi absurda. Conseguimos integrar vendas, estoque e financeiro em um só lugar. É um sistema completo que realmente funciona no dia a dia."
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.4)} className="text-center">
            <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-dark hover:bg-[#0a1628] text-white font-bold uppercase py-3 md:py-4 px-2 md:px-12 rounded-xl transition-all shadow-xl shadow-gray-300 hover:shadow-2xl hover:scale-105 text-[11px] min-[360px]:text-sm md:text-lg whitespace-nowrap">
              COMEÇAR AGORA
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CONSIDERAÇÕES FINAIS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a1628] to-qrz-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
                Considerações Finais
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                Por que escolher a <strong>QRZ Food</strong> para o seu restaurante
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="space-y-6">
                {[
                  "A <strong>QRZ Food</strong> é uma solução integrada que atende desde pequenos estabelecimentos até grandes redes de restaurantes. Com uma abordagem híbrida (online/offline), o sistema garante operação contínua mesmo em locais com instabilidade de internet.",
                  "A plataforma foi desenvolvida com foco na experiência do usuário, tanto para o restaurante quanto para o cliente final. Todos os módulos conversam entre si, eliminando retrabalho e garantindo que as informações estejam sempre sincronizadas.",
                  "Além da tecnologia, oferecemos suporte humanizado e presencial quando necessário, acompanhando a implantação e garantindo que o restaurante opere com eficiência desde o primeiro dia."
                ].map((text, index) => (
                  <p key={index} className="text-gray-300 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
                ))}

                <div className="bg-white/5 rounded-xl p-6 mt-6 border border-white/10">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Próximos passos</h3>
                  <ul className="space-y-3">
                    {[
                      "Agende uma demonstração personalizada",
                      "Receba uma proposta comercial detalhada",
                      "Planejamento da implantação com suporte presencial",
                      "Treinamento da equipe e início da operação"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-qrz-orange mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
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
              Tire suas dúvidas sobre o <strong>QRZ Food</strong>, implantação, valores e funcionalidades
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
                Nossa equipe está pronta para esclarecer todas as suas perguntas e mostrar como o <strong>QRZ Food</strong> pode transformar seu negócio.
              </p>
              <a href="https://wa.me/5527999936682" target="_blank" rel="noopener noreferrer" className="btn-primary font-bold uppercase inline-flex items-center justify-center gap-2 w-full md:w-auto text-[10px] min-[360px]:text-[12px] sm:text-sm md:text-base px-2 md:px-8 py-3 whitespace-nowrap">
                FALE CONOSCO NO WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA FINAL - Sem CTA de email
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-qrz-dark via-[#0d1f3c] to-qrz-blue/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">
              Pronto para transformar seu restaurante?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Entre em contato agora mesmo e descubra como a <strong>QRZ Food</strong> pode otimizar sua operação, aumentar seu faturamento e melhorar a experiência dos seus clientes.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/5527999936682?text=Olá! Gostaria de saber mais sobre o QRZ Food"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto bg-qrz-orange hover:bg-orange-600 text-white font-bold uppercase py-3 md:py-4 px-2 md:px-10 rounded-lg transition-all duration-300 text-[10px] min-[360px]:text-[11px] sm:text-[13px] md:text-lg shadow-lg shadow-qrz-orange/30 hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              AGENDAR MINHA DEMONSTRAÇÃO GRATUITA
            </a>
          </motion.div>

          <motion.div {...fadeIn(0.4)} className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-lg">
              <strong>QRZ Food</strong>
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

export default FoodService;
