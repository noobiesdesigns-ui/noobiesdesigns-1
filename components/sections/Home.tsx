import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionProps } from '../../types';

export const Home: React.FC<SectionProps> = ({ x }) => {
  return (
    <section className="w-full h-full flex flex-col justify-center md:justify-end p-6 md:px-16 lg:px-20 bg-transparent relative overflow-hidden">

      {/* Year */}
      <div className="absolute top-12 right-12 opacity-20 hidden md:block text-black/80 z-10">
        <span className="font-display font-bold text-6xl">26-27</span>
      </div>

      <div className="flex-1 flex items-center md:items-end pb-14 md:pb-18 relative z-10">

        {/* FULL WIDTH CONTAINER */}
        <div className="w-full mx-0">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8"
          >

            {/* =========================
                MOHAMED SHAFIQ
            ========================== */}
            <h1
              className="
                font-coolvetica
                font-normal
                text-black
                tracking-[-0.08em]
                leading-[0.74]
                flex
                flex-col
                items-start
                justify-start
                text-left
                w-full
                overflow-visible
                self-start

                md:relative
                md:left-[-3vw]
                md:top-[-60px]
              "
            >

              {/* MOHAMED */}
              <motion.div
                initial={{ opacity: 0, y: 110 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1
                }}
                className="
                  block
                  text-[clamp(4.7rem,14.6vw,244px)]
                  md:text-[256px]
                "
                style={{
                  fontFamily: '"Coolvetica", "Arial Black", sans-serif',
                  fontWeight: 400,
                  color: '#000000'
                }}
              >
                MOHAMED
              </motion.div>

              {/* SHAFIQ */}
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.3,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }}
                className="
                  block
                  mt-1
                  text-[clamp(5.9rem,16.5vw,310px)]
                  md:text-[364px]
                "
                style={{
                  fontFamily: '"Coolvetica", "Arial Black", sans-serif',
                  fontWeight: 400,
                  color: '#000000'
                }}
              >
                SHAFIQ
              </motion.div>

            </h1>


            {/* =========================
                CREATIVE DESIGNER
            ========================== */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35
              }}
              className="
                flex
                flex-row
                items-center
                justify-center
                gap-2

                md:flex-col
                md:items-end
                md:text-right

                text-black
                leading-[0.86]

                md:relative
                md:top-[-60px]

                mt-4
                md:mt-0
                md:pb-3
              "
            >

              <span className="
                font-serif
                italic
                font-normal
                text-[7vw]
                sm:text-[5.6vw]
                md:text-[2.5rem]
                lg:text-[3.1rem]
                text-accent
                block
              ">
                Creative
              </span>

              <span className="
                font-serif
                italic
                font-normal
                text-[7vw]
                sm:text-[5.6vw]
                md:text-[2.5rem]
                lg:text-[3.1rem]
                text-accent
                block
              ">
                Designer
              </span>

            </motion.div>

          </motion.div>
        </div>
      </div>


      {/* =========================
          DESKTOP SCROLL INDICATOR
      ========================== */}
      <div className="
        hidden
        md:flex
        flex-col
        md:flex-row
        items-end
        justify-end
        w-full
        border-t
        border-black
        pt-8
        absolute
        bottom-10
        left-0
        px-8
        md:px-20
        z-10
      ">

        <div className="
          flex
          items-center
          gap-4
          mt-2
          md:mt-0
          group
          cursor-pointer
          text-black
        ">

          <span className="
            font-display
            text-lg
            uppercase
            font-bold
            group-hover:mr-4
            transition-all
            duration-300
          ">
            Scroll for more
          </span>

          <div className="
            w-12
            h-12
            rounded-full
            border
            border-black
            flex
            items-center
            justify-center
            group-hover:bg-black
            group-hover:text-white
            transition-all
            duration-300
          ">
            <ArrowRight
              size={20}
              className="group-hover:-rotate-45 transition-transform duration-300"
            />
          </div>

        </div>
      </div>


      {/* =========================
          MOBILE SCROLL INDICATOR
      ========================== */}
      <div className="md:hidden w-full pt-3 relative z-10">

        <div className="
          flex
          items-center
          justify-end
          gap-3
          sm:gap-4
          group
          cursor-pointer
          text-black
        ">

          <div className="
            h-px
            bg-black
            w-[32vw]
            max-w-[11rem]
          " />

          <span className="
            font-display
            text-[0.98rem]
            sm:text-lg
            uppercase
            font-bold
            whitespace-nowrap
            group-hover:tracking-[0.02em]
            transition-all
            duration-300
          ">
            Scroll for more
          </span>

          <div className="
            w-10
            h-10
            sm:w-11
            sm:h-11
            rounded-full
            border
            border-black
            flex
            items-center
            justify-center
            group-hover:bg-black
            group-hover:text-white
            transition-all
            duration-300
            shrink-0
          ">
            <ArrowRight
              size={16}
              className="group-hover:-rotate-45 transition-transform duration-300"
            />
          </div>

        </div>
      </div>

    </section>
  );
};