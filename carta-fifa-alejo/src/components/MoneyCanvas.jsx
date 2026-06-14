import { useEffect, useRef } from 'react';

export default function MoneyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 380;
    canvas.height = 590;
    
    const particles = [];
    const symbols = ['$', '€', '£', '👁', '∆'];
    
    for(let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.3,
        size: 10 + Math.random() * 15,
        symbol: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }

    let animationFrameId;

    const drawMoney = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.fillStyle = `rgba(0, 255, 102, ${p.opacity})`;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.symbol, p.x, p.y);
        p.y += p.speed;
        if (p.y > canvas.height + 20) { 
          p.y = -20; 
          p.x = Math.random() * canvas.width; 
        }
      });
      animationFrameId = requestAnimationFrame(drawMoney);
    };

    drawMoney();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
}
