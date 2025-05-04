
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5527999936682"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-transparent text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat no WhatsApp"
    >
      <img 
        src="public/lovable-uploads/f4ba622f-d3db-4ff3-8c00-b4781c82f84c.png" 
        alt="WhatsApp" 
        className="w-full h-full"
      />
    </a>
  );
};

export default WhatsAppButton;
