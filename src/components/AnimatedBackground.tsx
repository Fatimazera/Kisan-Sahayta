
'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedBackground Component
 * Renders a high-quality sequence of WebP frames onto a canvas to create a smooth,
 * cinematic background video effect. Optimized for performance and responsiveness.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 191;
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Preload sequence
    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, '0');
        img.src = `https://uyjvjmfdungodykkmrph.supabase.co/storage/v1/object/public/tree-animation/frame_${frameNum}_delay-0.041s.webp`;
        img.onload = () => {
          loadedCount++;
          // Start playing once enough frames are buffered for a smooth initial experience
          if (loadedCount > 25 && !hasStarted) {
            setHasStarted(true);
          }
        };
        images.push(img);
      }
      imagesRef.current = images;
    };

    loadImages();

    return () => {
      imagesRef.current = [];
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let frameIndex = 0;
    let animationFrameId: number;
    let lastTime = 0;
    const frameDelay = 41; // ~24 FPS based on filename "0.041s"

    const animate = (time: number) => {
      if (time - lastTime >= frameDelay) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imagesRef.current[frameIndex];

        if (canvas && ctx && img && img.complete) {
          // Adjust canvas size to window if needed
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          // Object-fit: cover logic for canvas
          const imgRatio = img.width / img.height;
          const canvasRatio = width / height;
          
          let drawWidth, drawHeight, x, y;

          if (canvasRatio > imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
            x = 0;
            y = (height - drawHeight) / 2;
          } else {
            drawWidth = height * imgRatio;
            drawHeight = height;
            x = (width - drawWidth) / 2;
            y = 0;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, x, y, drawWidth, drawHeight);
          
          frameIndex = (frameIndex + 1) % frameCount;
        }
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: hasStarted ? 1 : 0, 
          transition: 'opacity 1.5s ease-in-out',
          filter: 'brightness(0.7) contrast(1.1)'
        }}
      />
      {!hasStarted && (
        <div className="absolute inset-0 bg-black animate-pulse flex items-center justify-center">
           <div className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">Initializing Cinematic Experience...</div>
        </div>
      )}
    </div>
  );
}
