
import { MessageSquare } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5527999936682"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat no WhatsApp"
    >
      <MessageSquare className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppButton;
