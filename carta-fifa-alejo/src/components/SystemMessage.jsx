import { useState, useEffect } from 'react';

export default function SystemMessage() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = ">> BIENVENIDO AL SISTEMA, VISUALIZA LAS CARTAS Y ACCEDE A MAS INFORMACION.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="mt-8 md:mt-0 w-full flex flex-col items-center justify-center z-40 gap-3 pointer-events-none">

      {/* Botón Nuevo encima de la frase */}
      <button className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur-sm border-2 border-[#00ff66] text-[#00ff66] font-bold tracking-widest uppercase rounded-md hover:bg-[#00ff66] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,100,0.3)] hover:shadow-[0_0_25px_rgba(0,255,100,0.6)]">
        Acceder al Perfil
      </button>

      {/* Frase de Bienvenida */}
      <div className="bg-black/60 px-6 py-2 rounded-full border border-[#00ff66]/20 backdrop-blur-sm">
        <p className="font-mono text-[14px] md:text-[16px] text-[#00ff66] tracking-widest drop-shadow-[0_0_8px_#00ff66] text-center">
          {text}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 inline-block`}>
            █
          </span>
        </p>
      </div>

    </div>
  );
}
