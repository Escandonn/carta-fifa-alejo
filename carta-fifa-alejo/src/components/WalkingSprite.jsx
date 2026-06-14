import { useEffect, useState } from 'react';

export default function WalkingSprite() {
  const [frame, setFrame] = useState(1);
  const [xPos, setXPos] = useState(-150);
  const [state, setState] = useState('walking');
  const [saludoCount, setSaludoCount] = useState(0);

  useEffect(() => {
    let animationTimer = 0;
    const moveSpeed = 1.5;
    const saludoRepeatsPerStop = 3;
    let animationFrameId;

    const animate = () => {
      animationTimer++;

      if (state === 'walking') {
        setXPos(prev => {
          let nextX = prev + moveSpeed;
          if (nextX > window.innerWidth) nextX = -180;
          return nextX;
        });

        if (animationTimer % 10 === 0) {
          setFrame(prev => {
            if (prev >= 7) {
              setState('greeting');
              setSaludoCount(0);
              return 1;
            }
            return prev + 1;
          });
        }
      } else if (state === 'greeting') {
        if (animationTimer % 10 === 0) {
          setFrame(prev => {
            if (prev >= 10) {
              setSaludoCount(count => {
                const nextCount = count + 1;
                if (nextCount >= saludoRepeatsPerStop) {
                  setState('walking');
                }
                return nextCount;
              });
              return 1;
            }
            return prev + 1;
          });
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  const src = state === 'walking' ? `fotogramas-alejo/${frame}.png` : `saludo/${frame}.png`;

  return (
    <img 
      id="walking-sprite" 
      src={src} 
      alt="Animación" 
      className="fixed bottom-[50px] z-50 pointer-events-none transition-opacity duration-[2000ms] w-[150px] max-sm:w-[180px] max-sm:bottom-[30px]"
      style={{ left: `${xPos}px` }}
    />
  );
}
