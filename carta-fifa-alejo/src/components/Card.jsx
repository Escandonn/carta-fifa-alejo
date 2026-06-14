import MoneyCanvas from './MoneyCanvas';

export default function Card() {
  return (
    <div className="relative w-[380px] h-[590px] bg-black/90 border border-[#0d1a00] overflow-hidden z-20 
      shadow-[0_0_40px_rgba(0,255,80,0.2)] animate-breathe transition-transform duration-300 ease-in-out
      max-sm:scale-85 max-sm:-mt-[50px] max-h-[650px]:scale-75
      bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,100,0.05)_0%,transparent_80%),url('https://www.transparenttextures.com/patterns/money.png')] bg-cover"
    >
      <MoneyCanvas />

      <img src="image.png" className="absolute top-[60px] left-[10%] -translate-x-1/2 w-[280px] opacity-10 z-10 sepia saturate-[5] hue-rotate-90 animate-eyeFade" />

      <img src="https://pngimg.com/uploads/hands/hands_PNG905.png" className="absolute w-[160px] z-[25] opacity-30 grayscale contrast-125 drop-shadow-[0_0_5px_#00ff66] animate-handMove bottom-[120px] left-[-20px] rotate-[40deg]" />

      <img src="https://pngimg.com/uploads/hands/hands_PNG905.png" className="absolute w-[160px] z-[25] opacity-30 grayscale contrast-125 drop-shadow-[0_0_5px_#00ff66] animate-handMove bottom-[120px] right-[-20px] -rotate-[40deg] -scale-x-100" />

      <div className="absolute top-[70px] left-[35px] text-[#00ff66] z-[30] drop-shadow-[0_0_10px_rgba(0,255,100,0.4)]">
        <span className="text-[65px] block leading-[0.8]">99</span>
        <span className="text-[24px] block text-white tracking-[2px]">ORDEN</span>
      </div>

      <img src="img1.PNG" alt="Jugador" className="absolute top-[60px] right-[5px] w-[260px] h-[310px] object-contain z-[20] drop-shadow-[0_5px_15px_#000]" />

      <div className="absolute top-[355px] w-full text-center text-white text-[22px] uppercase z-[30] tracking-[5px] drop-shadow-[0_0_8px_#00ff66]">
        Alejandro Escandon
      </div>

      <div className="absolute bottom-[95px] w-[80%] left-[10%] flex justify-around text-[#00ff66] z-[30]">
        <div className="text-center">
          <span className="text-[22px] block font-bold">99</span>
          <span className="text-[14px] block text-[#444]">LUX</span>
        </div>
        <div className="w-[1px] bg-gradient-to-b from-transparent via-[#1a3300] to-transparent"></div>
        <div className="text-center">
          <span className="text-[22px] block font-bold">99</span>
          <span className="text-[14px] block text-[#444]">INF</span>
        </div>
        <div className="w-[1px] bg-gradient-to-b from-transparent via-[#1a3300] to-transparent"></div>
        <div className="text-center">
          <span className="text-[22px] block font-bold">99</span>
          <span className="text-[14px] block text-[#444]">SEC</span>
        </div>
      </div>
    </div>
  );
}
