import React, { useState, useCallback, useEffect } from 'react';
import { Check, Building2, Phone, Mail, Calculator, Plus, Minus, Settings2, Smartphone, MonitorSmartphone, Printer, Zap, ArrowRight, Wallet, CheckCircle2, ChevronRight, CreditCard, CalendarDays, X, Percent, Gift, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Pricing Tables ─── */
const ERP_TIERS = [
  { label: 'Até R$ 50k', max: 50000, erp: 297, delivery: 97, erpCost: 55, deliveryCost: 0 },
  { label: 'R$ 50k a R$ 100k', max: 100000, erp: 497, delivery: 145.5, erpCost: 55, deliveryCost: 0 },
  { label: 'R$ 100k a R$ 200k', max: 200000, erp: 597, delivery: 291, erpCost: 55, deliveryCost: 0 },
  { label: 'R$ 200k a R$ 300k', max: 300000, erp: 797, delivery: 388, erpCost: 55, deliveryCost: 0 },
  { label: 'R$ 300k a R$ 400k', max: 400000, erp: 997, delivery: 388, erpCost: 55, deliveryCost: 0 },
  { label: 'Acima de R$ 400k', max: Infinity, erp: 1197, delivery: 388, erpCost: 55, deliveryCost: 0 },
];

interface FixedModule {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  hasQuantity: boolean;
  icon: React.ReactNode;
}

const FIXED_MODULES: FixedModule[] = [
  { id: 'delivery', name: 'QRZ Delivery', description: 'Delivery próprio integrado', price: 0, cost: 0, hasQuantity: false, icon: <Smartphone className="w-5 h-5" /> },
  { id: 'whatsapp', name: 'QRZ Zap', description: 'Automação via WhatsApp', price: 115, cost: 25, hasQuantity: false, icon: <Zap className="w-5 h-5" /> },
  { id: 'crm', name: 'CRM/Cashback/Clube', description: 'Fidelização e marketing', price: 125, cost: 55, hasQuantity: false, icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: 'tef', name: 'TEF / SiTEF', description: 'PDV com PIN PAD PPC 930', price: 199.9, cost: 100, hasQuantity: true, icon: <CreditCard className="w-5 h-5" /> },
  { id: 'totem', name: 'Totem', description: 'Autoatendimento', price: 199, cost: 50, hasQuantity: true, icon: <MonitorSmartphone className="w-5 h-5" /> },
  { id: 'pos', name: 'SmartPOS', description: 'Maquininha integrada', price: 24.9, cost: 7, hasQuantity: true, icon: <Calculator className="w-5 h-5" /> },
  { id: 'tablet', name: 'Tablet Garçom', description: 'Pedido na mesa', price: 50, cost: 7, hasQuantity: true, icon: <Smartphone className="w-5 h-5" /> },
  { id: 'etiqueta', name: 'Etiquetas', description: 'Produção com validade', price: 49.9, cost: 0, hasQuantity: false, icon: <Printer className="w-5 h-5" /> },
];

interface Integration {
  id: string;
  name: string;
  price: number;
  cost: number;
  included?: boolean;
  colorClass: string;
  logoText: string;
}

const INTEGRATIONS: Integration[] = [
  { id: 'ifood', name: 'iFood', price: 0, cost: 0, included: true, colorClass: 'bg-[#ea1d2c] text-white border-[#ea1d2c]', logoText: 'ifood' },
  { id: 'deliverymuch', name: 'Delivery Much', price: 300, cost: 0, colorClass: 'bg-white text-[#b81212] border-gray-200', logoText: 'delivery\nmuch' },
  { id: 'deliveryapp', name: 'Delivery App', price: 300, cost: 0, colorClass: 'bg-[#f47920] text-white border-[#f47920]', logoText: 'DELIVERY\nAPP' },
  { id: 'decheff', name: 'deCheff', price: 300, cost: 0, colorClass: 'bg-white text-black border-gray-200', logoText: 'deCheff' },
  { id: 'vendizap', name: 'Vendizap', price: 300, cost: 0, colorClass: 'bg-[#820ad1] text-white border-[#820ad1]', logoText: 'vendizap' },
  { id: 'saipos', name: 'Saipos', price: 300, cost: 0, colorClass: 'bg-white text-[#2a77a1] border-gray-200', logoText: 'Saipos' },
  { id: 'alloy', name: 'Alloy', price: 300, cost: 0, colorClass: 'bg-white text-black border-gray-200', logoText: 'alloy' },
  { id: '99food', name: '99Food', price: 300, cost: 0, colorClass: 'bg-[#ffcc00] text-black border-[#ffcc00]', logoText: '99\nFood' },
  { id: 'rappi', name: 'Rappi', price: 300, cost: 0, colorClass: 'bg-[#ff441f] text-white border-[#ff441f]', logoText: 'Rappi' },
];

/* ─── Helpers ─── */
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string) => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phone.replace(/\s/g, ''));

const phoneMask = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/* ─── Component ─── */
const BudgetSimulator: React.FC = () => {
  const [hasLead, setHasLead] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lead Data
  const [restaurant, setRestaurant] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Config Data
  const [tierIndex, setTierIndex] = useState(0);
  const [planDuration, setPlanDuration] = useState<'mensal' | 'semestral' | 'anual'>('mensal');
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({});
  const [moduleQty, setModuleQty] = useState<Record<string, number>>({ totem: 1, pos: 1, tablet: 1, tef: 1 });
  const [selectedIntegrations, setSelectedIntegrations] = useState<Record<string, boolean>>({ ifood: true });

  // Exit Intent State
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  /* ─── Validation & Lead Submission ─── */
  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!restaurant.trim() || restaurant.trim().length < 3) e.restaurant = 'Informe o nome do restaurante';
    if (!validatePhone(phone)) e.phone = 'Informe um telefone válido';
    if (!validateEmail(email)) e.email = 'Informe um e-mail válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [restaurant, phone, email]);

  const handleStartSimulation = async () => {
    setTouched({ restaurant: true, phone: true, email: true });
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await fetch('https://formsubmit.co/ajax/contato@qrztech.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🔥 Novo Lead Iniciou Simulação: ${restaurant}`,
          Nome_do_Restaurante: restaurant,
          Telefone: phone,
          Email: email,
          Origem: 'Simulador de Orçamento QRZ Food (Acesso Inicial)'
        })
      });
    } catch (error) {
      console.error('Erro ao enviar lead inicial:', error);
    }

    setIsSubmitting(false);
    setHasLead(true);
  };

  /* ─── Price Calculation ─── */
  const tier = ERP_TIERS[tierIndex];
  
  // MENSAL BASE
  const monthlyErp = tier.erp;
  const monthlyDelivery = selectedModules.delivery ? tier.delivery : 0;
  const monthlyCostErp = tier.erpCost;
  const monthlyCostDelivery = selectedModules.delivery ? tier.deliveryCost : 0;

  const monthlyModulesPrice = FIXED_MODULES.reduce((sum, m) => {
    if (m.id === 'delivery') return sum; 
    if (!selectedModules[m.id]) return sum;
    const qty = m.hasQuantity ? (moduleQty[m.id] || 1) : 1;
    return sum + m.price * qty;
  }, 0);

  const monthlyModulesCost = FIXED_MODULES.reduce((sum, m) => {
    if (m.id === 'delivery') return sum; 
    if (!selectedModules[m.id]) return sum;
    const qty = m.hasQuantity ? (moduleQty[m.id] || 1) : 1;
    return sum + m.cost * qty;
  }, 0);

  const rawMonthlyTotal = monthlyErp + monthlyDelivery + monthlyModulesPrice;
  const monthlyCostTotal = monthlyCostErp + monthlyCostDelivery + monthlyModulesCost;

  // DISCOUNTS
  const discountRate = planDuration === 'anual' ? 0.10 : planDuration === 'semestral' ? 0.05 : 0;
  const discountValue = rawMonthlyTotal * discountRate;
  const finalMonthlyTotal = rawMonthlyTotal - discountValue;
  
  // Annual Economy
  const annualEconomy = discountValue * 12;

  // PROFITS
  const monthlyProfit = finalMonthlyTotal - monthlyCostTotal;
  const monthlyMargin = finalMonthlyTotal > 0 ? ((monthlyProfit / finalMonthlyTotal) * 100).toFixed(1) : '0.0';

  // SETUP
  const hasLoyalty = planDuration === 'semestral' || planDuration === 'anual';
  const erpSetup = monthlyErp; 
  
  const integrationsSetup = INTEGRATIONS.reduce((sum, integ) => {
    if (!selectedIntegrations[integ.id]) return sum;
    return sum + integ.price;
  }, 0);

  const rawInitialInvestment = erpSetup + integrationsSetup;
  const initialInvestment = hasLoyalty ? 0 : rawInitialInvestment;

  const initialCost = hasLoyalty ? 0 : INTEGRATIONS.reduce((sum, integ) => {
    if (!selectedIntegrations[integ.id]) return sum;
    return sum + integ.cost;
  }, 0);

  const initialProfit = initialInvestment - initialCost;
  const initialMargin = initialInvestment > 0 ? ((initialProfit / initialInvestment) * 100).toFixed(1) : '0.0';

  /* ─── Quantity handler ─── */
  const adjustQty = (id: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setModuleQty(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  /* ─── Exit Intent Logic ─── */
  useEffect(() => {
    if (!hasLead || hasSeenPopup || isSubmitted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
        setHasSeenPopup(true);
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 200 && lastScrollY - window.scrollY > 50) {
        setShowExitPopup(true);
        setHasSeenPopup(true);
      }
      lastScrollY = window.scrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasLead, hasSeenPopup, isSubmitted]);

  const handleExitIntentOffer = (duration: 'anual' | 'semestral') => {
    setPlanDuration(duration);
    setShowExitPopup(false);
  };

  /* ─── WhatsApp CTA with Bastidores Email ─── */
  const getWhatsAppMsg = () => {
    const selModsText = FIXED_MODULES.filter(m => selectedModules[m.id])
      .map(m => m.hasQuantity ? `${m.name} (${moduleQty[m.id] || 1}x)` : m.name)
      .join(', ') || 'Nenhum';

    const selIntegsText = INTEGRATIONS.filter(i => selectedIntegrations[i.id])
      .map(i => i.name)
      .join(', ') || 'Nenhuma';

    return `Olá! Acabei de fazer uma simulação no site QRZ Food 🍔

📋 *Dados:*
• Restaurante: ${restaurant}
• Faturamento: ${tier.label}
• Plano: ${planDuration.toUpperCase()} ${discountRate > 0 ? `(${discountRate * 100}% OFF)` : ''}

🛒 *Configuração:*
• Módulos: ${selModsText}
• Integrações: ${selIntegsText}

💰 *Estimativa:*
• Mensal: ${fmt(finalMonthlyTotal)}
• Setup Inicial: ${fmt(initialInvestment)} ${hasLoyalty ? '(ISENTO)' : ''}

Gostaria de falar com um especialista sobre essa proposta!`;
  };

  const handleTalkToSpecialist = async () => {
    setIsSendingLead(true);

    const selModsText = FIXED_MODULES.filter(m => selectedModules[m.id])
      .map(m => m.hasQuantity ? `${m.name} (${moduleQty[m.id] || 1}x)` : m.name)
      .join(', ') || 'Nenhum';

    const selIntegsText = INTEGRATIONS.filter(i => selectedIntegrations[i.id])
      .map(i => i.name)
      .join(', ') || 'Nenhuma';

    try {
      await fetch('https://formsubmit.co/ajax/contato@qrztech.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `💰 FECHAMENTO DE ORÇAMENTO: ${restaurant}`,
          Restaurante: restaurant,
          Telefone: phone,
          Email: email,
          Faturamento: tier.label,
          Plano: planDuration.toUpperCase(),
          Modulos: selModsText,
          Integracoes: selIntegsText,
          "--- ": "----------------",
          "MENSALIDADE BRUTA": fmt(rawMonthlyTotal),
          "DESCONTO APLICADO": `-${fmt(discountValue)} (${discountRate * 100}%)`,
          "MENSALIDADE CLIENTE (LIQUIDA)": fmt(finalMonthlyTotal),
          "SEU CUSTO MENSAL": fmt(monthlyCostTotal),
          "SEU LUCRO MENSAL": `${fmt(monthlyProfit)} (Margem: ${monthlyMargin}%)`,
          "----": "----------------",
          "SETUP CLIENTE": fmt(initialInvestment),
          "SEU CUSTO SETUP": fmt(initialCost),
          "SEU LUCRO SETUP": `${fmt(initialProfit)} (Margem: ${initialMargin}%)`,
        })
      });
    } catch (error) {
      console.error('Erro ao enviar bastidores:', error);
    }

    setIsSendingLead(false);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      
      {/* ──────── EXIT INTENT POPUP ──────── */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-qrz-dark/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full relative border border-gray-100"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-qrz-orange p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
                <Gift className="w-16 h-16 text-white mx-auto mb-4 relative z-10 drop-shadow-md" />
                <h3 className="text-2xl font-black text-white relative z-10">Não feche a página ainda!</h3>
                <p className="text-orange-100 mt-2 font-medium relative z-10">Temos uma condição especial só para você, <strong className="text-white">{restaurant}</strong>.</p>
              </div>

              <div className="p-8 text-center">
                <p className="text-gray-600 mb-6">
                  Vimos que sua configuração fechou em <strong className="text-qrz-dark text-lg line-through">{fmt(rawMonthlyTotal)}/mês</strong>. 
                  <br/>Que tal fechar agora mesmo e garantir um <strong>desconto vitalício</strong> na sua mensalidade e ficar isento de Setup?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleExitIntentOffer('anual')}
                    className="w-full bg-qrz-dark hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-qrz-orange" /> Quero 10% OFF Vitalício
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Plano Anual</span>
                  </button>
                  
                  <button
                    onClick={() => handleExitIntentOffer('semestral')}
                    className="w-full bg-orange-50 hover:bg-orange-100 border-2 border-qrz-orange text-qrz-orange font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      Quero 5% OFF Vitalício
                    </span>
                    <span className="bg-qrz-orange/10 px-3 py-1 rounded-full text-sm">Plano Semestral</span>
                  </button>

                  <button
                    onClick={() => setShowExitPopup(false)}
                    className="w-full text-gray-400 font-semibold py-3 px-6 hover:text-gray-600 transition-colors text-sm underline"
                  >
                    Não, quero continuar pagando mais caro no mensal.
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!hasLead ? (
          /* ──────── LEAD GATE ──────── */
          <motion.div
            key="lead-gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-2xl mx-auto flex flex-col md:flex-row"
          >
            <div className="bg-qrz-dark p-8 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-qrz-orange/20 rounded-full blur-3xl"></div>
              <Calculator className="w-12 h-12 text-qrz-orange mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Descubra seu investimento ideal</h3>
              <p className="text-gray-400 text-sm relative z-10">Preencha seus dados rápidos para liberar o simulador e montar sua proposta na hora.</p>
            </div>
            
            <div className="p-8 md:w-3/5">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <Building2 className="w-3 h-3 inline mr-1 text-qrz-orange" /> Nome do restaurante *
                  </label>
                  <input
                    type="text"
                    value={restaurant}
                    onChange={e => { setRestaurant(e.target.value); if (touched.restaurant) validate(); }}
                    onBlur={() => { setTouched(t => ({ ...t, restaurant: true })); validate(); }}
                    placeholder="Ex: Burger House"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-qrz-dark bg-gray-50 transition-all focus:bg-white focus:outline-none focus:ring-0 ${
                      touched.restaurant && errors.restaurant ? 'border-red-400' : 'border-gray-200 focus:border-qrz-orange'
                    }`}
                  />
                  {touched.restaurant && errors.restaurant && <p className="text-red-500 text-xs mt-1 font-medium">{errors.restaurant}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <Phone className="w-3 h-3 inline mr-1 text-qrz-orange" /> Telefone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(phoneMask(e.target.value)); if (touched.phone) validate(); }}
                    onBlur={() => { setTouched(t => ({ ...t, phone: true })); validate(); }}
                    placeholder="(27) 99999-9999"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-qrz-dark bg-gray-50 transition-all focus:bg-white focus:outline-none focus:ring-0 ${
                      touched.phone && errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-qrz-orange'
                    }`}
                  />
                  {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <Mail className="w-3 h-3 inline mr-1 text-qrz-orange" /> E-mail *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (touched.email) validate(); }}
                    onBlur={() => { setTouched(t => ({ ...t, email: true })); validate(); }}
                    placeholder="contato@seurestaurante.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-qrz-dark bg-gray-50 transition-all focus:bg-white focus:outline-none focus:ring-0 ${
                      touched.email && errors.email ? 'border-red-400' : 'border-gray-200 focus:border-qrz-orange'
                    }`}
                  />
                  {touched.email && errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              <button
                onClick={handleStartSimulation}
                disabled={isSubmitting}
                className="mt-8 w-full bg-qrz-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-qrz-orange/20 hover:shadow-xl hover:shadow-qrz-orange/30 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Iniciando...' : 'Iniciar Simulação'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </motion.div>
        ) : isSubmitted ? (
          /* ──────── SUCCESS / THANK YOU VIEW ──────── */
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-16 text-center max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-qrz-dark mb-4">
              Obrigado pelo interesse, <span className="text-qrz-orange">{restaurant}</span>!
            </h2>
            
            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
              Nossa equipe recebeu suas informações e a sua configuração desejada. Alguém do nosso time entrará em contato com você muito em breve.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-md mx-auto mb-10">
              <p className="text-gray-700 font-medium mb-4">Se preferir adiantar o atendimento, chame nossa equipe agora mesmo no WhatsApp:</p>
              
              <a
                href={`https://wa.me/5527999936682?text=${encodeURIComponent(getWhatsAppMsg())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" /> Falar no WhatsApp
              </a>
              <p className="text-sm text-gray-500 mt-4">(27) 99999-36682</p>
            </div>
          </motion.div>
        ) : (
          /* ──────── DASHBOARD SIMULATOR ──────── */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Left Column - Controls */}
            <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-8">
              <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-qrz-dark flex items-center gap-2">
                    <Settings2 className="w-6 h-6 text-qrz-orange" /> Configure seu sistema
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Olá, <span className="font-semibold text-qrz-orange">{restaurant}</span>! Ajuste as opções abaixo.</p>
                </div>
              </div>

              {/* Faturamento e Planos */}
              <div className="mb-10 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100">
                <div className="mb-8">
                  <label className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <span className="font-bold text-qrz-dark">Faixa de Faturamento Mensal</span>
                    <span className="bg-orange-50 text-qrz-orange px-3 py-1 rounded-full text-sm font-bold border border-orange-100 w-fit">
                      {tier.label}
                    </span>
                  </label>
                  <div className="relative pt-2">
                    <input
                      type="range"
                      min={0} max={5} step={1}
                      value={tierIndex}
                      onChange={e => setTierIndex(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-qrz-orange focus:outline-none focus:ring-4 focus:ring-qrz-orange/20"
                    />
                    <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-2 px-1 font-medium">
                      <span className="hidden sm:inline">&lt; 50k</span>
                      <span className="hidden sm:inline">50-100k</span>
                      <span className="hidden sm:inline">100-200k</span>
                      <span className="hidden sm:inline">200-300k</span>
                      <span className="hidden sm:inline">300-400k</span>
                      <span className="hidden sm:inline">+ 400k</span>
                      
                      <span className="sm:hidden">&lt; 50k</span>
                      <span className="sm:hidden">100-200k</span>
                      <span className="sm:hidden">+ 400k</span>
                    </div>
                  </div>
                </div>

                {/* Duração do Plano */}
                <div>
                  <label className="font-bold text-qrz-dark mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-qrz-orange" /> Modelo de Contratação
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <button
                      onClick={() => setPlanDuration('mensal')}
                      className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center h-full ${
                        planDuration === 'mensal' ? 'border-qrz-orange bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className={`font-bold text-sm mb-1 ${planDuration === 'mensal' ? 'text-qrz-orange' : 'text-gray-600'}`}>Mensal</span>
                      <span className="text-[11px] font-medium text-gray-500 leading-tight">Livre de Fidelidade<br/>Com Taxa de Setup</span>
                    </button>
                    
                    <button
                      onClick={() => setPlanDuration('semestral')}
                      className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center h-full ${
                        planDuration === 'semestral' ? 'border-qrz-orange bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-qrz-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        5% OFF NO TOTAL
                      </div>
                      <span className={`font-bold text-sm mb-1 ${planDuration === 'semestral' ? 'text-qrz-orange' : 'text-gray-600'}`}>Semestral</span>
                      <span className="text-[11px] font-medium text-gray-500 leading-tight">Sem Taxa de Setup<br/>Com Fidelidade</span>
                    </button>
                    
                    <button
                      onClick={() => setPlanDuration('anual')}
                      className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center h-full ${
                        planDuration === 'anual' ? 'border-qrz-orange bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-qrz-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        10% OFF NO TOTAL
                      </div>
                      <span className={`font-bold text-sm mb-1 ${planDuration === 'anual' ? 'text-qrz-orange' : 'text-gray-600'}`}>Anual</span>
                      <span className="text-[11px] font-medium text-gray-500 leading-tight">Sem Taxa de Setup<br/>Com Fidelidade</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Módulos */}
              <div className="mb-10">
                <h4 className="font-bold text-qrz-dark mb-4">Módulos Extras Mensais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIXED_MODULES.map(m => {
                    const active = !!selectedModules[m.id];
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedModules(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                        className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          active ? 'border-qrz-orange bg-orange-50/50 shadow-md shadow-qrz-orange/10' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-qrz-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {m.icon}
                          </div>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors border-2 ${
                            active ? 'border-qrz-orange bg-qrz-orange' : 'border-gray-200 bg-white'
                          }`}>
                            {active && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                        <div>
                          <h5 className={`font-bold text-sm ${active ? 'text-qrz-dark' : 'text-gray-700'}`}>{m.name}</h5>
                          <p className="text-xs text-gray-500 mt-1">{m.description}</p>
                        </div>

                        {/* Quantity Controls */}
                        <AnimatePresence>
                          {m.hasQuantity && active && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-3 border-t border-orange-200/50 flex items-center justify-between overflow-hidden"
                            >
                              <span className="text-xs font-semibold text-qrz-orange">Quantidade</span>
                              <div className="flex items-center gap-3 bg-white rounded-lg border border-orange-200 p-1">
                                <button onClick={(e) => adjustQty(m.id, -1, e)} className="w-6 h-6 rounded-md bg-orange-50 text-qrz-orange flex items-center justify-center hover:bg-qrz-orange hover:text-white transition-colors">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-sm w-4 text-center text-qrz-dark">{moduleQty[m.id] || 1}</span>
                                <button onClick={(e) => adjustQty(m.id, 1, e)} className="w-6 h-6 rounded-md bg-orange-50 text-qrz-orange flex items-center justify-center hover:bg-qrz-orange hover:text-white transition-colors">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Integrações (App Icons View) */}
              <div>
                <h4 className="font-bold text-qrz-dark mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  Integrações de Delivery
                  <span className="text-xs font-normal text-gray-500">Taxa única de Setup</span>
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {INTEGRATIONS.map(integ => {
                    const active = !!selectedIntegrations[integ.id];
                    return (
                      <button
                        key={integ.id}
                        onClick={() => {
                          if (integ.included) return;
                          setSelectedIntegrations(prev => ({ ...prev, [integ.id]: !prev[integ.id] }));
                        }}
                        className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all border-2 ${integ.colorClass} ${
                          active
                            ? 'ring-4 ring-qrz-orange/30 ring-offset-2 scale-105 shadow-xl z-10'
                            : 'opacity-90 hover:opacity-100 hover:scale-[1.02] shadow-sm'
                        } ${integ.included ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {active && (
                          <div className="absolute -top-2 -right-2 bg-qrz-orange text-white rounded-full p-1 shadow-md z-20">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-black text-center leading-tight text-xs sm:text-[13px] tracking-tight relative z-10" style={{ whiteSpace: 'pre-line' }}>
                          {integ.logoText}
                        </span>
                        
                        {integ.included && (
                          <span className="absolute bottom-1.5 bg-black/20 text-white text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                            Incluso
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Summary */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-28 bg-qrz-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 sm:p-8 pb-6 relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-qrz-orange/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
                    <Wallet className="w-5 h-5 text-qrz-orange" /> Resumo do Plano
                  </h4>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-5 relative z-10">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Mensalidade Estimada</p>
                    
                    {discountRate > 0 ? (
                      <div>
                        <div className="flex items-center gap-2 mb-1 opacity-70">
                          <span className="text-lg sm:text-xl font-bold text-gray-400 line-through">{fmt(rawMonthlyTotal)}</span>
                          <span className="bg-qrz-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            -{discountRate * 100}%
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-black text-green-400">{fmt(finalMonthlyTotal)}</span>
                          <span className="text-gray-400 font-medium">/mês</span>
                        </div>
                        <p className="text-green-400/90 text-[11px] sm:text-xs mt-2 font-bold bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                          🎉 Economia total de {fmt(annualEconomy)} no ano!
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">{fmt(finalMonthlyTotal)}</span>
                        <span className="text-gray-400 font-medium">/mês</span>
                      </div>
                    )}
                  </div>

                  <div className="px-1 relative z-10 space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Implantação / Setup</p>
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-lg ${hasLoyalty ? 'text-green-400' : 'text-white'}`}>
                            {hasLoyalty ? 'ISENTO' : fmt(initialInvestment)}
                          </p>
                          {hasLoyalty && <span className="text-xs text-gray-400 line-through">{fmt(rawInitialInvestment)}</span>}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase bg-white/5 px-2 py-1 rounded">Única</span>
                    </div>

                    <div className="pt-2 space-y-3">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-qrz-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          ERP QRZ Food ({planDuration.charAt(0).toUpperCase() + planDuration.slice(1)})
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-qrz-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          {Object.values(selectedModules).filter(Boolean).length} Módulo(s) mensal(is) extra(s)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-qrz-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          {Object.values(selectedIntegrations).filter(Boolean).length} Integração(ões) de delivery
                        </span>
                      </div>
                    </div>

                    {/* Cancellation Warning */}
                    <AnimatePresence>
                      {hasLoyalty && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                            <p className="text-xs text-red-200 font-medium leading-relaxed">
                              *Plano com isenção de Setup. Sujeito a multa de 30% sobre as parcelas restantes em caso de cancelamento antecipado.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-6 bg-black/20 mt-auto border-t border-white/5">
                  <button
                    onClick={handleTalkToSpecialist}
                    disabled={isSendingLead}
                    className="w-full bg-qrz-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-qrz-orange/20 hover:shadow-xl hover:shadow-qrz-orange/30 flex items-center justify-center gap-2 group text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSendingLead ? 'Gerando proposta...' : 'Falar com Especialista'}
                    {!isSendingLead && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  <p className="text-gray-500 text-xs text-center mt-4">
                    Nossa equipe revisará seu perfil para oferecer a melhor proposta comercial.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetSimulator;
