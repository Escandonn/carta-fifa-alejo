import { useEffect, useRef } from 'react';

// Preload images outside of component to ensure they load early and only once
const preloadImages = () => {
  if (typeof window !== 'undefined') {
    for (let i = 1; i <= 7; i++) {
      const img = new Image();
      img.src = `fotogramas-alejo/${i}.png`;
    }
    for (let i = 1; i <= 10; i++) {
      const img = new Image();
      img.src = `saludo/${i}.png`;
    }
  }
};
preloadImages();

export default function WalkingSprite() {
  const imgRef = useRef(null);

  useEffect(() => {
    let animationTimer = 0;
    const moveSpeed = 1.5;
    const saludoRepeatsPerStop = 3;
    let animationFrameId;

    let frame = 1;
    let xPos = -150;
    let state = 'walking';
    let saludoCount = 0;

    const animate = () => {
      animationTimer++;
      const isMobile = window.innerWidth <= 640;

      if (state === 'walking') {
        if (!isMobile) {
          xPos += moveSpeed;
          if (xPos > window.innerWidth) xPos = -180;
        } else {
          xPos = window.innerWidth / 2; // Center horizontally on mobile
        }

        if (animationTimer % 10 === 0) {
          frame++;
          if (frame > 7) {
            state = 'greeting';
            saludoCount = 0;
            frame = 1;
          }
        }
      } else if (state === 'greeting') {
        if (isMobile) {
          xPos = window.innerWidth / 2; // Keep centered on mobile
        }
        if (animationTimer % 10 === 0) {
          frame++;
          if (frame > 10) {
            saludoCount++;
            if (saludoCount >= saludoRepeatsPerStop) {
              state = 'walking';
            }
            frame = 1;
          }
        }
      }

      if (imgRef.current) {
        if (isMobile) {
          imgRef.current.style.transform = 'translateX(-50%)';
          imgRef.current.style.left = `${xPos}px`;
        } else {
          imgRef.current.style.transform = 'none';
          imgRef.current.style.left = `${xPos}px`;
        }

        const folder = state === 'walking' ? 'fotogramas-alejo' : 'saludo';
        const newSrc = `${folder}/${frame}.png`;
        
        if (imgRef.current.getAttribute('src') !== newSrc) {
          imgRef.current.src = newSrc;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <img 
      ref={imgRef}
      id="walking-sprite" 
      src="fotogramas-alejo/1.png"
      alt="Animación" 
      className="fixed bottom-[50px] z-50 pointer-events-none transition-opacity duration-[2000ms] w-[150px] max-sm:w-[180px] max-sm:bottom-[30px]"
    />
  );
}
