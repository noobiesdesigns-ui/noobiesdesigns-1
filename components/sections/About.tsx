import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';

const AccentWord: React.FC<{ children: string }> = ({ children }) => (
  <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
    <span
      style={{
        fontFamily: "'Aston Script', cursive",
        fontWeight: 400,
        color: '#111111',
        display: 'inline-block',
      }}
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
            <h2 className="font-coolvetica text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.6] mb-12 tracking-tight">
              I create{' '}
              <AccentWord>visuals</AccentWord>,{' '}
              <AccentWord>experiences</AccentWord>{' '}
              and{' '}
              <AccentWord>stories</AccentWord>{' '}
              that make people look twice.
            </h2>
          </motion.div>

          {/* Bottom Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div>
              <h3 className="font-display text-lg md:text-xl font-bold mb-2 text-black">WHAT I DO</h3>
              <p className="text-black/70 font-light text-sm md:text-base leading-relaxed">
                I work across video, design, UI/UX, branding and content creation, bringing different creative disciplines together to build work that feels intentional, distinctive and alive.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg md:text-xl font-bold mb-2 text-black">HOW I THINK</h3>
              <p className="text-black/70 font-light text-sm md:text-base leading-relaxed">
                I care about the details, the story and the feeling behind the work. Whether it's a brand, interface, video or piece of content, I want every element to have a reason to exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};