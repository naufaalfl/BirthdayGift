import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: Array<{
      x: number;
      y: number;
      particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        maxLife: number;
        color: string;
      }>;
    }> = [];

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];

    const createFirework = (x: number, y: number) => {
      const particles = [];
      const particleCount = 30 + Math.random() * 20;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 4;
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 60,
          maxLife: 60,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      fireworks.push({ x, y, particles });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((firework, fireworkIndex) => {
        firework.particles.forEach((particle, particleIndex) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.1; // gravity
          particle.life--;

          const alpha = particle.life / particle.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (particle.life <= 0) {
            firework.particles.splice(particleIndex, 1);
          }
        });

        if (firework.particles.length === 0) {
          fireworks.splice(fireworkIndex, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    // Create initial fireworks
    const createRandomFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.6;
      createFirework(x, y);
    };

    // Create fireworks at intervals
    const interval = setInterval(createRandomFirework, 500);
    
    // Create some initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(createRandomFirework, i * 200);
    }

    animate();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default Fireworks;