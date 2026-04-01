
'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedBackground Component
 * Renders a high-quality sequence of 480 WebP frames onto a canvas to create a smooth,
 * cinematic background video effect. Optimized with preloading and frame-buffering.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 480;
  const [hasStarted, setHasStarted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let isMounted = true;

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, '0');
        img.src = `https://uyjvjmfdungodykkmrph.supabase.co/storage/v1/object/public/tree-animation/frame_${frameNum}_delay-0.041s.webp`;
        
        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          const currentProgress = Math.floor((loadedCount / frameCount) * 100);
          setLoadProgress(currentProgress);
          
          // Start playing once a sufficient buffer (e.g., 30 frames) is loaded to show something early
          if (loadedCount >= 30 && !hasStarted) {
            setHasStarted(true);
          }
        };

        img.onerror = () => {
          if (!isMounted) return;
          loadedCount++;
        };

        images.push(img);
      }
      imagesRef.current = images;
    };

    loadImages();

    return () => {
      isMounted = false;
      imagesRef.current = [];
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let frameIndex = 0;
    let animationFrameId: number;
    let lastTime = 0;
    const frameDelay = 41; // ~24 FPS

    const animate = (time: number) => {
      if (time - lastTime >= frameDelay) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Sync canvas size to viewport
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        const img = imagesRef.current[frameIndex];
        
        if (img && img.complete && img.naturalWidth > 0) {
          const width = canvas.width;
          const height = canvas.height;
          
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

          ctx.drawImage(img, x, y, drawWidth, drawHeight);
          frameIndex = (frameIndex + 1) % frameCount;
        } else {
          // If a frame isn't ready, skip or loop back to find a valid one
          // This keeps the animation "alive" even if some frames are slow
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
          transition: 'opacity 2s ease-in-out',
          filter: 'brightness(0.7) contrast(1.05)'
        }}
      />
      {!hasStarted && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-6">
           <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out" 
                style={{ width: `${loadProgress}%` }}
              />
           </div>
           <div className="text-white/30 text-[10px] font-bold tracking-[0.5em] uppercase">
              Initializing Experience... {loadProgress}%
           </div>
        </div>
      )}
    </div>
  );
}
