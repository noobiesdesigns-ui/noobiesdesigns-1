import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';

export const About: React.FC<SectionProps> = ({ x }) => {
  return (
    <section className="w-full h-full bg-white text-black relative flex items-center px-8 md:px-24 border-l border-gray-100 overflow-hidden">
      <div className="max-w-[90vw] w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative items-center h-full">
        
        <div className="md:col-span-8 z-10 flex flex-col justify-center h-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    {/* Decorative line orange */}
                    <div className="w-12 h-[2px] bg-accent"></div>
                    {/* Label orange */}
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent">Our Mission</span>
                </div>
                
                {/* Heading */}
                <h2 className="font-display text-3xl md:text-5xl lg:text-[4.5rem] font-medium leading-[1.15] mb-12 tracking-tight">
                    Redefine the digital landscape by crafting 
                    <span className="font-curly text-5xl md:text-[6rem] font-normal lowercase ml-2 text-accent">elegant</span>, 
                    human-centered experiences that seamlessly blend beauty and functionality.
                </h2>
            </motion.div>

            {/* Bottom Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black pt-8">
                <div>
                    <h3 className="font-display text-lg md:text-xl font-bold mb-2">Strategic Vision</h3>
                    <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                        We blend analytical thinking with artistic intuition to create systems that scale and perform.
                    </p>
                </div>
                <div>
                    <h3 className="font-display text-lg md:text-xl font-bold mb-2">Aesthetic Precision</h3>
                    <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                        Every pixel serves a purpose. We believe in the power of negative space and bold typography.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};