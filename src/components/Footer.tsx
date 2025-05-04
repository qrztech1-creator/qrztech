
import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          <div className="col-span-1 md:col-span-1">
            <img 
              src="https://i.postimg.cc/L5qzYQmh/logoqrz-Editado.png"
              alt="QRZ Tech Logo" 
              className="h-12 w-auto mb-6" 
            />
            <p className="text-gray-400 text-sm">
              Transformando operações manuais em processos automatizados e inteligentes.
            </p>
            <div className="flex mt-6 space-x-4">
              <a 
                href="https://instagram.com/qrztech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-qrz-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@qrztech.com" 
                className="text-gray-400 hover:text-qrz-orange transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Soluções</h3>
            <ul className="space-y-2">
              <li><a href="#solutions" className="text-gray-400 hover:text-qrz-orange text-sm">Automação com RPA</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-qrz-orange text-sm">Desenvolvimento Web</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-qrz-orange text-sm">Integração de APIs</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-qrz-orange text-sm">IA Aplicada</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-qrz-orange text-sm">Bancos de Dados</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-qrz-orange text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-qrz-orange text-sm">Sobre Nós</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-qrz-orange text-sm">Portfólio</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-qrz-orange text-sm">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-qrz-orange text-sm">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Espírito Santo, Brasil</li>
              <li>+55 (27) 99993-6682</li>
              <li>contato@qrztech.com</li>
              <li>thiago@qrztech.com</li>
              <li>admin@qrztech.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} QRZ Tech. Todos os direitos reservados.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="https://instagram.com/othiagoqrz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-qrz-orange text-sm"
            >
              @othiagoqrz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
