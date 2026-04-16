import React, { useEffect } from 'react';

const Varejo = () => {
  useEffect(() => {
    document.title = "QRZ Store - Sistema para Varejo";
  }, []);

  return (
    <div className="w-full h-screen m-0 p-0 overflow-hidden bg-white">
      <iframe 
        src="/page-varejo.html"  
        className="w-full h-full border-none"
        title="QRZ Store"
      />
    </div>
  );
};

export default Varejo;
