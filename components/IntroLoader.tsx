import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsZooming(true);
          // Wait for zoom animation to finish before unmounting
          setTimeout(onComplete, 1500); 
          return 100;
        }
        // Random increment for realistic feel
        return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-white overflow-hidden flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* 3D Perspective Container */}
      <div className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
        
        {/* LEFT TREE GROUP */}
        <motion.div
            className="absolute top-0 -left-[10%] w-[60%] h-full origin-left"
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            animate={{ 
                opacity: isZooming ? 0 : 1, 
                x: isZooming ? -1000 : 0, // Fly off screen to left
                z: isZooming ? 500 : 0,
                filter: 'blur(0px)'
            }}
            transition={{ 
                opacity: { duration: 1, delay: isZooming ? 0.2 : 0 },
                x: { duration: 1.5, ease: [0.7, 0, 0.84, 0] },
                filter: { duration: 2 }
            }}
        >
            {/* Using mix-blend-multiply to remove white background from image if any, creating silhouette */}
            <img 
                src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply opacity-80"
                alt="Trees Left"
            />
        </motion.div>

        {/* RIGHT TREE GROUP */}
        <motion.div
            className="absolute top-0 -right-[10%] w-[60%] h-full origin-right"
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ 
                opacity: isZooming ? 0 : 1, 
                x: isZooming ? 1000 : 0, // Fly off screen to right
                z: isZooming ? 500 : 0,
                filter: 'blur(0px)'
            }}
            transition={{ 
                opacity: { duration: 1, delay: isZooming ? 0.2 : 0 },
                x: { duration: 1.5, ease: [0.7, 0, 0.84, 0] },
                filter: { duration: 2 }
            }}
        >
            <img 
                src="https://images.unsplash.com/photo-1445217143695-467124038776?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply opacity-80"
                alt="Trees Right"
            />
        </motion.div>
        
        {/* CENTER FOG LAYER (For Depth) */}
        <motion.div
             className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-50"
             animate={{ opacity: isZooming ? 0 : 0.8 }}
             transition={{ duration: 0.5 }}
        />

      </div>

      {/* Progress / Text Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center mix-blend-difference"
        animate={{ 
            opacity: isZooming ? 0 : 1, 
            scale: isZooming ? 2 : 1,
            z: isZooming ? 1000 : 0 // Move camera Into text
        }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <span className="font-cursive text-white text-6xl md:text-8xl mb-4">noobies</span>
        <div className="flex items-center gap-4">
             <div className="w-32 h-[1px] bg-white/30 overflow-hidden">
                <motion.div 
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                />
             </div>
             <span className="font-mono text-white text-xs">{progress}%</span>
        </div>
      </motion.div>

    </motion.div>
  );
};