import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Service, ServiceProject } from '../types';

interface ServiceDetailOverlayProps {
  service: Service;
  onClose: () => void;
}

export const ServiceDetailOverlay: React.FC<ServiceDetailOverlayProps> = ({ service, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<ServiceProject | null>(null);

  // Fallback if no projects exist
  const hasProjects = service.projects && service.projects.length > 0;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex-shrink-0 w-full h-24 md:h-32 flex items-center justify-between px-8 md:px-16 border-b border-gray-100 bg-white z-50">
        <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">Portfolio</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{service.title}</h2>
        </div>
        
        <button 
          onClick={onClose}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
        >
           <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            // DETAILED PROJECT VIEW
            <ProjectDetailView 
                key="detail" 
                project={selectedProject} 
                onBack={() => setSelectedProject(null)} 
            />
          ) : (
            // GRID VIEW
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full overflow-y-auto"
            >
               {hasProjects ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-gray-100 p-1px">
                    {service.projects!.map((project) => (
                        <div 
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="bg-white aspect-[4/3] md:aspect-square relative group cursor-pointer overflow-hidden flex items-center justify-center p-8"
                        >
                            {/* Hover Reveal Image */}
                            <motion.div 
                                className="absolute inset-0 z-0 bg-gray-50"
                                whileHover={{ scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                            </motion.div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2">{project.client}</span>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-white font-display text-3xl tracking-tighter">{project.title}</h3>
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <span className="font-display text-4xl mb-4 tracking-tight">Coming Soon</span>
                    <p className="font-light">Projects for this category are being curated.</p>
                 </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProjectDetailView: React.FC<{ project: ServiceProject; onBack: () => void }> = ({ project, onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex flex-col md:flex-row bg-white overflow-hidden"
        >
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-gray-50 p-8 md:p-16 flex items-center justify-center relative">
                 <div className="w-full h-full shadow-2xl relative overflow-hidden">
                    <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                 </div>
                 
                 <button 
                    onClick={onBack}
                    className="absolute top-8 left-8 md:hidden px-6 py-3 bg-white text-black font-mono text-xs uppercase border border-gray-200 z-20"
                 >
                    Back to Gallery
                 </button>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-24 overflow-y-auto">
                <button 
                    onClick={onBack}
                    className="self-start hidden md:flex items-center gap-2 mb-12 px-6 py-3 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest"
                >
                    <ArrowRight size={14} className="rotate-180" /> Back to Gallery
                </button>

                <div className="mb-8">
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-gray-500">{project.client} &mdash; {project.year}</span>
                    <h2 className="font-display text-6xl md:text-8xl font-bold mt-4 mb-8 leading-[0.9] tracking-tighter">{project.title}</h2>
                </div>

                <div className="w-12 h-1 bg-black mb-8"></div>

                <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed max-w-md">
                    {project.description}
                </p>

                <div className="mt-12 flex gap-4">
                     <div className="px-4 py-2 bg-gray-100 rounded text-xs font-mono uppercase tracking-widest text-gray-500">Brand Identity</div>
                     <div className="px-4 py-2 bg-gray-100 rounded text-xs font-mono uppercase tracking-widest text-gray-500">Vector Art</div>
                </div>
            </div>
        </motion.div>
    );
};