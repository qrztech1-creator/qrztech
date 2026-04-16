import React, { useEffect } from 'react';

const Servicos = () => {
  useEffect(() => {
    document.title = "QRZ Inv - Sistema para Serviços e Cobranças";
  }, []);

  return (
    <div className="w-full h-screen m-0 p-0 overflow-hidden bg-white">
      <iframe 
        src="/page-serv.html"  
        className="w-full h-full border-none"
        title="QRZ Inv"
      />
    </div>
  );
};

export default Servicos;
