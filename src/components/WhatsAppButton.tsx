const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5527999936682"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-transparent text-white shadow-lg"
      aria-label="Chat no WhatsApp"
    >
      <img
        src="https://i.postimg.cc/T2y1hdhY/Print-Glyph-Green.png"
        alt="WhatsApp"
        className="w-full h-full"
      />
    </a>
  );
};

export default WhatsAppButton;
