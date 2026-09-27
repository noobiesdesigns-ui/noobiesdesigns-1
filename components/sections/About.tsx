import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../types';

type AboutProps = SectionProps & {
  fillProgress?: number;
  isReady?: boolean;
};

export const About: React.FC<AboutProps> = ({ x, fillProgress = 0, isReady = true }) => {
  const words = ['I', 'create', 'visuals,', 'experiences', 'and', 'stories', 'that', 'make', 'people', 'look', 'twice.'];
  const progress = Math.min(Math.max(fillProgress, 0), 1);
  const visibleProgress = isReady ? progress : 0;

  const getWordProgress = (index: number) => {
    const start = index / words.length;
    const end = (index + 1) / words.length;
    return Math.min(Math.max((visibleProgress - start) / Math.max(end - start, 0.0001), 0), 1);
  };

  return (
    <section
      className="
        w-full
        h-full
        bg-transparent
        text-black
        relative
        flex
        items-center
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        border-l
        border-gray-100
        overflow-hidden
        font-coolvetica
        pt-2
        md:pt-4
        pb-2
        md:pb-4
      "
    >
      <div className="w-full h-full relative">
        <div className="z-10 flex flex-col justify-center h-full py-4 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="
              mb-4
              md:mb-5
              flex
              items-center
              gap-3
              md:gap-4
            "
          >
            <span className="h-px w-10 md:w-12 bg-[#f97316]" />

            <span
              className="
                font-poppins
                font-bold
                text-[0.62rem]
                md:text-[0.72rem]
                uppercase
                tracking-[0.24em]
                text-[#f97316]
              "
            >
              About
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="
              font-coolvetica
              font-normal
              text-black
              text-left
              text-[clamp(2.7rem,10vw,7.5rem)]
              leading-[0.88]
              tracking-normal
              mb-6
              md:mb-8
              w-full
              max-w-full
              md:max-w-[78vw]
              md:ml-[4vw]
            "
          >
            <span className="relative block w-full max-w-full md:max-w-[78vw]">
              {words.map((word, index) => {
                const localFill = getWordProgress(index);

                return (
                  <span
                    key={`${word}-${index}`}
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                      marginRight: '0.22em',
                      marginBottom: '0.08em',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'block',
                        color: 'transparent',
                        WebkitTextStroke: '1.4px rgba(0, 0, 0, 0.96)',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {word}
                    </span>

                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'block',
                        color: 'transparent',
                        background: '#000',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        clipPath: `inset(0 ${100 - localFill * 100}% 0 0)`,
                      }}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </span>
          </motion.h2>

          <div
            className="
              w-full
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
              md:gap-16
              lg:gap-24
              pt-5
              md:pt-6
              border-t
              border-black/10
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
              className="w-full"
            >
              <h3
                className="
                  font-poppins
                  font-bold
                  text-[0.72rem]
                  md:text-[0.82rem]
                  uppercase
                  tracking-[0.18em]
                  mb-2
                  md:mb-3
                  text-[#f97316]
                "
              >
                What I Do
              </h3>

              <p
                className="
                  text-black/75
                  font-coolvetica
                  font-normal
                  text-[1rem]
                  md:text-[1.12rem]
                  leading-[1.6]
                  max-w-none
                  md:max-w-[34rem]
                "
              >
                I work across video, design, UI/UX, branding and content
                creation, bringing different creative disciplines together
                to build work that feels intentional, distinctive and alive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5,
              }}
              className="
                w-full
                md:flex
                md:justify-end
              "
            >
              <div className="w-full md:max-w-[34rem]">
                <h3
                  className="
                    font-poppins
                    font-bold
                    text-[0.72rem]
                    md:text-[0.82rem]
                    uppercase
                    tracking-[0.18em]
                    mb-2
                    md:mb-3
                    text-[#f97316]
                  "
                >
                  How I Think
                </h3>

                <p
                  className="
                    text-black/75
                    font-coolvetica
                    font-normal
                    text-[1rem]
                    md:text-[1.12rem]
                    leading-[1.6]
                    max-w-none
                    md:max-w-[34rem]
                  "
                >
                  I care about the details, the story and the feeling behind
                  the work. Whether it's a brand, interface, video or piece
                  of content, I want every element to have a reason to exist.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};