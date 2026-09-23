import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';

interface BrandIdentityOverlayProps {
  project: Project;
  onClose: () => void;
}

export const BrandIdentityOverlay: React.FC<BrandIdentityOverlayProps> = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const imageSources = project.galleryImages ?? [];

    const preloadImages = Promise.all(
      imageSources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    );

    const minimumDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 2400);
    });

    Promise.all([preloadImages, minimumDelay]).then(() => {
      if (!cancelled) {
        window.setTimeout(() => setIsLoading(false), 150);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [project.id, project.galleryImages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-[3px] p-3 md:p-8 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[min(96vw,1400px)] h-[96vh] overflow-hidden bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={`Close ${project.title} brand identity`}
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-white/95 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
        >
          <X size={22} />
        </button>

        {isLoading ? (
          <div className="flex h-full items-center justify-center bg-[#f5f1eb] text-black">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-black/15 border-t-black" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/60">Loading</div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-0 overflow-y-auto scroll-smooth overscroll-contain bg-gray-100">
            <div className="flex flex-col gap-3 md:gap-5 p-3 md:p-6">
              {project.galleryImages?.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.title} brand identity ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover bg-white shadow-sm"
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};