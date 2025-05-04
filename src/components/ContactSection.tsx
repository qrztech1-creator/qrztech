
import { useRef, useState } from "react";
import { Instagram, Mail, Phone, MessageSquare } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.'
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(27) 99993-6682",
      link: "tel:+5527999936682"
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@qrztech.com",
      link: "mailto:contato@qrztech.com"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@qrztech",
      link: "https://instagram.com/qrztech"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-qrz-dark to-black">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Contato</h2>
          <p className="text-lg mt-6 text-gray-300 max-w-3xl mx-auto">
            Entre em contato conosco para discutir como podemos ajudar a transformar seu negócio com nossas soluções tecnológicas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 font-montserrat text-white">Informações de Contato</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-qrz-blue/20 text-qrz-blue-light group-hover:bg-qrz-orange/20 group-hover:text-qrz-orange transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">{item.title}</h4>
                      <p className="text-white font-medium group-hover:text-qrz-orange transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h4 className="text-white font-medium mb-3">Horário de Atendimento:</h4>
                <p className="text-gray-400">Segunda a Sexta: 08:00 - 18:00</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-qrz-blue to-qrz-blue-light p-1 rounded-xl shadow-lg shadow-qrz-blue/10">
              <div className="bg-qrz-dark p-6 rounded-lg h-full flex items-center">
                <div className="text-center w-full">
                  <MessageSquare className="w-10 h-10 mx-auto mb-4 text-qrz-orange" />
                  <h3 className="text-xl font-bold mb-3 font-montserrat text-white">Precisando de suporte?</h3>
                  <p className="text-gray-300 mb-5">
                    Nossa equipe está pronta para ajudar com qualquer questão técnica ou dúvida.
                  </p>
                  <a href="mailto:suporte@qrztech.com" className="btn-primary">
                    Contato de Suporte
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 font-montserrat text-white">Envie uma Mensagem</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-qrz-orange/50 text-white"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-qrz-orange/50 text-white"
                      placeholder="seu-email@exemplo.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-qrz-orange/50 text-white"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-qrz-orange/50 text-white resize-none"
                    placeholder="Descreva seu projeto ou necessidade..."
                  />
                </div>
                
                {formStatus.message && (
                  <div className={`p-4 rounded-lg ${
                    formStatus.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-800' : 'bg-red-900/20 text-red-400 border border-red-800'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensagem'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
