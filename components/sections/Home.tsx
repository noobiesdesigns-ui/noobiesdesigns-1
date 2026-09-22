import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionProps } from '../../types';

export const Home: React.FC<SectionProps> = ({ x }) => {
  const parallaxText = useTransform(x, [0, -1000], [0, -200]);

  return (
    <section className="w-full h-full flex flex-col justify-center md:justify-end p-8 md:p-20 bg-transparent relative overflow-hidden">
      <div className="absolute top-12 right-12 opacity-20 hidden md:block text-black/80">
        <span className="font-display font-bold text-6xl">25-26</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center md:items-end pb-20 md:pb-32">
        <div className="w-full max-w-none z-10 -ml-[2vw] md:-ml-[3vw]">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-coolvetica font-normal text-[9vw] md:text-[7rem] lg:text-[8rem] leading-[0.82] text-black tracking-[-0.035em] whitespace-nowrap"
          >
            MOHAMED SHAFIQ
            <span className="ml-0 block font-serif italic font-normal tracking-normal text-accent text-[0.32em] md:text-[0.28em] leading-none mt-1">
              Creative Designer
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Footer / Scroll Hint */}
      <div className="flex flex-col md:flex-row items-end justify-between w-full border-t border-black pt-8 absolute bottom-24 md:bottom-8 left-0 px-8 md:px-20">
         <div className="flex gap-12 text-xs md:text-sm font-mono uppercase tracking-widest text-black/70">
          <span className="text-accent">BASED IN INDIA</span>
         </div>

         <div className="flex items-center gap-4 mt-8 md:mt-0 group cursor-pointer text-black">
            <span className="font-display text-lg uppercase font-bold group-hover:mr-4 transition-all duration-300">Scroll for more</span>
            <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
         </div>
      </div>
    </section>
  );
};