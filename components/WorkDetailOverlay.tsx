import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface WorkDetailOverlayProps {
  project: Project;
  onClose: () => void;
}

export const WorkDetailOverlay: React.FC<WorkDetailOverlayProps> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-white flex flex-col md:flex-row overflow-hidden"
    >
      {/* Close Button - Fixed */}
      <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 group shadow-lg md:shadow-none"
        >
           <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Left / Top: Hero Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-gray-100 relative shrink-0">
        <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for mobile visibility of floating elements if needed */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent md:hidden"></div>
      </div>

      {/* Right / Bottom: Content */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-start md:justify-center p-8 md:p-24 overflow-y-auto relative z-10 -mt-12 md:mt-0 rounded-t-3xl md:rounded-none shadow-2xl md:shadow-none">
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
         >
             <div className="flex items-center gap-4 mb-4 md:mb-8 pt-4 md:pt-0">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-gray-500">
                    {project.category}
                </span>
             </div>

             {/* Main Title - Ensure padding/margin prevents clipping */}
             <h2 className="font-display text-5xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter mb-4 md:mb-4 relative z-20">
                {project.title}
             </h2>

             <div className="flex flex-wrap gap-4 mb-8 md:mb-12">
                <span className="font-mono text-xs md:text-sm border border-gray-200 rounded-full px-3 py-1 md:px-4 md:py-2 text-gray-500">
                    Client: {project.client || 'Confidential'}
                </span>
                <span className="font-mono text-xs md:text-sm border border-gray-200 rounded-full px-3 py-1 md:px-4 md:py-2 text-gray-500">
                    Year: {project.year}
                </span>
             </div>

             <div className="w-full h-[1px] bg-gray-200 mb-8 md:mb-12"></div>

             <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 md:mb-6">The Challenge</h3>
             <p className="text-gray-600 font-light text-base md:text-xl leading-relaxed max-w-xl mb-8 md:mb-12">
                {project.description || 'Detailed project description goes here. This section explains the challenges faced and the solutions implemented during the design process.'}
             </p>

             {project.tags && (
                 <div className="flex flex-wrap gap-2 mb-12">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 text-xs font-mono uppercase tracking-wider text-gray-400">
                            {tag}
                        </span>
                    ))}
                 </div>
             )}

             <button 
                onClick={onClose}
                className="group flex items-center gap-4 text-black hover:text-accent transition-colors duration-300 pb-8 md:pb-0"
             >
                <span className="font-display text-lg font-bold uppercase tracking-widest">Back to Projects</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-300" />
             </button>
         </motion.div>
      </div>
    </motion.div>
  );
};