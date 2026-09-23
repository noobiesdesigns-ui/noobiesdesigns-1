import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionProps } from '../../types';

export const Home: React.FC<SectionProps> = ({ x }) => {
  return (
    <section className="w-full h-full flex flex-col justify-center md:justify-end p-6 md:p-20 bg-transparent relative overflow-hidden">
      <div className="absolute top-12 right-12 opacity-20 hidden md:block text-black/80 z-10">
        <span className="font-display font-bold text-6xl">25-26</span>
      </div>

      <div className="flex-1 flex items-center md:items-end pb-20 md:pb-24 relative z-10">
        <div className="w-full max-w-none -ml-[1vw] md:-ml-[2vw]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8"
          >
            <h1 className="font-coolvetica font-normal text-black tracking-[-0.08em] text-left leading-[0.74] flex flex-col items-center md:items-start justify-start md:text-left text-center w-full">
              <div
                className="block align-middle mt-20 md:mt-20 text-[clamp(4.2rem,18vw,250px)] md:text-[250px]"
                style={{ fontFamily: '"Coolvetica", "Arial Black", sans-serif', fontWeight: 400, color: '#000000' }}
              >
                MOHAMED
              </div>
              <div
                className="block align-middle mt-1 text-[calc(clamp(4.2rem,18vw,250px)*1.4)] md:text-[350px]"
                style={{ fontFamily: '"Coolvetica", "Arial Black", sans-serif', fontWeight: 400, color: '#000000' }}
              >
                SHAFIQ
              </div>
            </h1>

            <div className="flex flex-row items-center justify-center gap-2 md:flex-col md:items-end md:text-right text-black leading-[0.86] md:pb-3 mt-4 md:mt-0">
              <span className="font-serif italic font-normal text-[7vw] sm:text-[5.6vw] md:text-[2.5rem] lg:text-[3.1rem] text-accent block">Creative</span>
              <span className="font-serif italic font-normal text-[7vw] sm:text-[5.6vw] md:text-[2.5rem] lg:text-[3.1rem] text-accent block">Designer</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-end w-full border-t border-black pt-8 absolute bottom-10 md:bottom-10 left-0 px-8 md:px-20 z-10">
         <div className="flex items-center gap-4 mt-2 md:mt-0 group cursor-pointer text-black">
            <span className="font-display text-lg uppercase font-bold group-hover:mr-4 transition-all duration-300">Scroll for more</span>
            <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
         </div>
      </div>
    </section>
  );
};