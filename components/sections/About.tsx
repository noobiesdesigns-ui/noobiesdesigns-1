import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';

const AccentWord: React.FC<{ children: string }> = ({ children }) => (
  <span className="relative inline-block whitespace-nowrap align-middle">
    <span
      className="font-aston inline-block text-[#f97316] text-[1.08em] md:text-[1.2em] leading-none"
      style={{ transform: 'translateY(-0.06em)' }}
    >
      {children}
    </span>
  </span>
);

export const About: React.FC<SectionProps> = ({ x }) => {
  return (
    <section className="w-full h-full bg-transparent text-black relative flex items-center px-8 md:px-24 border-l border-gray-100 overflow-hidden">
      <div className="max-w-[90vw] w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative items-center h-full">
        <div className="md:col-span-8 z-10 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[#f97316]" />
              <span className="font-display text-[0.68rem] md:text-[0.75rem] font-bold uppercase tracking-[0.28em] text-[#f97316]">
                About
              </span>
            </div>

            <h2 className="font-display text-[2.3rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.2rem] leading-[0.9] tracking-[-0.06em] font-bold text-black mb-10 md:mb-12">
              I create{' '}
              <AccentWord>visuals</AccentWord>,{' '}
              <AccentWord>experiences</AccentWord>{' '}
              and{' '}
              <AccentWord>stories</AccentWord>{' '}
              that make people look twice.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 md:pt-8 border-t border-black/10">
            <div>
              <h3 className="font-display text-[0.72rem] md:text-[0.8rem] font-bold uppercase tracking-[0.24em] mb-3 text-[#f97316]">
                What I Do
              </h3>
              <p className="text-black/75 font-sans text-[0.95rem] md:text-[1.06rem] leading-[1.8] max-w-[32rem]">
                I work across video, design, UI/UX, branding and content creation, bringing different creative disciplines together to build work that feels intentional, distinctive and alive.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[0.72rem] md:text-[0.8rem] font-bold uppercase tracking-[0.24em] mb-3 text-[#f97316]">
                How I Think
              </h3>
              <p className="text-black/75 font-sans text-[0.95rem] md:text-[1.06rem] leading-[1.8] max-w-[32rem]">
                I care about the details, the story and the feeling behind the work. Whether it's a brand, interface, video or piece of content, I want every element to have a reason to exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};