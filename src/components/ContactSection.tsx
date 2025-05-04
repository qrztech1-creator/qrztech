
import { Phone, Mail, Instagram, MessageSquare } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(27) 99993-6682",
      link: "https://wa.me/5527999936682"
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
    <section id="contact" className="py-10 bg-gradient-to-b from-qrz-dark to-black">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title inline-block after:left-1/4 after:w-1/2">Contato</h2>
          <p className="text-lg mt-6 text-gray-300 max-w-3xl mx-auto">
            Entre em contato conosco para discutir como podemos ajudar a transformar seu negócio com nossas soluções tecnológicas.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-4 group p-6 rounded-lg hover:bg-gray-900/50 transition-all"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-qrz-blue/20 text-qrz-blue-light group-hover:bg-qrz-orange/20 group-hover:text-qrz-orange transition-all">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">{item.title}</h4>
                    <p className="text-white font-medium text-lg group-hover:text-qrz-orange transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-800 text-center">
              <h4 className="text-white font-medium mb-3">Horário de Atendimento:</h4>
              <p className="text-gray-400">Segunda a Sexta: 08:00 - 18:00</p>
            </div>
            
            <div className="mt-10 text-center">
              <a 
                href="https://wa.me/5527999936682" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary inline-flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Fale Conosco pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
