
import { MessageSquare } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5527999936682"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 animate-pulse-slow"
      aria-label="Chat no WhatsApp"
    >
      <div className="flex items-center justify-center bg-green-500 rounded-full w-full h-full">
        <img 
          src="/lovable-uploads/af7cd64c-d683-4519-88d8-00e4c84e3a4a.png" 
          alt="WhatsApp" 
          className="w-10 h-10"
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
