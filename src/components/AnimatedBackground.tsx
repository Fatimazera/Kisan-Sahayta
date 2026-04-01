'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedBackground Component
 * Renders a high-quality sequence of 300 WebP frames onto a canvas to create a smooth,
 * cinematic background video effect. Optimized with preloading and frame-buffering.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 300;
  const [hasStarted, setHasStarted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, '0');
        // Construct the URL using the provided pattern
        img.src = `https://uyjvjmfdungodykkmrph.supabase.co/storage/v1/object/public/tree-animation/frame_${frameNum}_delay-0.041s.webp`;
        img.onload = () => {
          loadedCount++;
          const currentProgress = Math.floor((loadedCount / frameCount) * 100);
          setLoadProgress(currentProgress);
          
          // Start playing once a sufficient buffer (e.g., 60 frames or 20%) is loaded
          if (loadedCount > 60 && !hasStarted) {
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
    const frameDelay = 41; // ~24 FPS matching the 0.041s delay per frame

    const animate = (time: number) => {
      if (time - lastTime >= frameDelay) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false });
        const img = imagesRef.current[frameIndex];

        if (canvas && ctx && img && img.complete) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          // Sync canvas size to viewport
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          // Cover logic (similar to object-fit: cover)
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

          // Optimized clear and draw
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: hasStarted ? 1 : 0, 
          transition: 'opacity 2.5s ease-in-out',
          filter: 'brightness(0.65) contrast(1.1) saturate(1.1)'
        }}
      />
      {!hasStarted && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-6">
           <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_15px_rgba(162,217,150,0.5)]" 
                style={{ width: `${loadProgress}%` }}
              />
           </div>
           <div className="text-white/40 text-[11px] font-bold tracking-[0.5em] uppercase animate-pulse">
              Buffering Experience... {loadProgress}%
           </div>
        </div>
      )}
    </div>
  );
}
