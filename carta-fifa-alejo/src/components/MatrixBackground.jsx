import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeMatrix();

    const binChars = ['0', '1'];
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = Array.from({ length: columns }).fill(1);

    let animationFrameId;

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(1, 5, 1, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binChars[Math.floor(Math.random() * binChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    const handleResize = () => {
      resizeMatrix();
      columns = canvas.width / fontSize;
      drops = Array.from({ length: columns }).fill(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
