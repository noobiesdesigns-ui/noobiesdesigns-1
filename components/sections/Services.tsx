import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionProps, Service } from '../../types';

export const serviceData: Service[] = [
  {
    id: '01',
    title: 'Logo Design',
    description: 'Crafting memorable, timeless marks that capture the pure essence of your business.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop',
    projects: []
  },
  {
    id: '02',
    title: 'UX/UI Design',
    description: 'Transforming complex systems into intuitive, visually refined digital interfaces.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop',
    projects: []
  },
  {
    id: '03',
    title: 'Branding Identity',
    description: 'Building cohesive visual systems and scalable brand languages from strategy to execution.',
    image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2000&auto=format&fit=crop',
    projects: []
  },
  {
    id: '04',
    title: 'Web & App Design',
    description: 'Creating immersive digital experiences designed for clarity, engagement, and growth.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop',
    projects: []
  },
];

export const Services: React.FC<SectionProps> = ({ x, onServiceClick }) => {
  return (
    <section className="w-full h-full bg-white flex items-center border-l border-gray-100 overflow-hidden">

      <div className="flex h-full w-full">
        {serviceData.map((service, index) => (
          <div
            key={service.id}
            onClick={() => onServiceClick && onServiceClick(service.id)}
            className="flex-1 h-full border-r border-gray-200 min-w-[85vw] md:min-w-[25vw] 
                       flex flex-col justify-between p-6 md:p-12 pb-24 md:pb-12 
                       group hover:bg-neutral-50 transition-all duration-500 
                       relative overflow-hidden cursor-pointer"
          >

            {/* ⭐ MOBILE BACKGROUND SCROLL REVEAL */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none md:hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/40 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                transition={{ duration: 0.8 }}
              />
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 1.5 }}
              />
            </motion.div>

            {/* ⭐ DESKTOP BACKGROUND HOVER */}
            <div
              className="
                absolute inset-0 hidden md:block z-0 pointer-events-none
                opacity-0 group-hover:opacity-100
                transition-opacity duration-700 ease-in-out
              "
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover 
                           transition-transform duration-[1.5s] ease-out
                           group-hover:scale-110"
              />
            </div>

            {/* ⭐ TITLE AREA */}
            <div className="w-full flex justify-between items-start border-b border-gray-200
                            group-hover:border-white/30 pb-6 md:pb-8 mt-16 md:mt-24 
                            relative z-10">

              {/* 📱 MOBILE TITLE — scroll → white */}
              <div className="flex flex-col md:hidden">
                <motion.span
                  initial={{ color: "#000" }}
                  whileInView={{ color: "#fff" }}
                  transition={{ duration: 0.5 }}
                  className="text-[10px] font-mono uppercase tracking-widest mb-2"
                >
                  Service
                </motion.span>

                <motion.h3
                  initial={{ y: "100%", color: "#000" }}
                  whileInView={{ y: 0, color: "#fff" }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-2xl font-medium leading-tight tracking-tight"
                >
                  {service.title}
                </motion.h3>
              </div>

              {/* 💻 DESKTOP TITLE — hover → white */}
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-mono uppercase tracking-widest text-accent mb-2
                                 group-hover:text-white/70 transition-colors duration-300">
                  Service
                </span>

                <h3 className="font-display text-4xl font-medium leading-tight tracking-tight 
                               text-black group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Desktop Arrow */}
              <ArrowUpRight
                className="
                  hidden md:block text-black opacity-0
                  group-hover:opacity-100 group-hover:text-white
                  transition-all duration-300 transform
                  group-hover:translate-x-1 group-hover:-translate-y-1
                "
              />
            </div>

            {/* ⭐ NUMBER (separated mobile/desktop) */}
            <div className="relative flex-1 flex items-center justify-center z-10 overflow-hidden">

              {/* 📱 MOBILE NUMBER */}
              <motion.span
                className="md:hidden font-sans font-light text-[6rem] leading-none tracking-tighter"
                initial={{ opacity: 0, color: "#000" }}
                whileInView={{ opacity: 1, color: "#fff" }}
                transition={{ duration: 0.6 }}
              >
                {index + 1}
              </motion.span>

              {/* 💻 DESKTOP NUMBER */}
              <span
                className="hidden md:block font-sans font-light text-[10rem] leading-none 
                           tracking-tighter mix-blend-overlay opacity-90
                           group-hover:text-white group-hover:opacity-20
                           transition-all duration-500"
              >
                {index + 1}
              </span>
            </div>

            {/* ⭐ DESCRIPTION */}
            {/* MOBILE scroll effect */}
            <motion.p
              className="md:hidden font-light text-sm leading-relaxed max-w-xs"
              initial={{ color: "#444" }}
              whileInView={{ color: "#fff" }}
              transition={{ duration: 0.6 }}
            >
              {service.description}
            </motion.p>

            {/* DESKTOP hover effect */}
            <p
              className="hidden md:block font-light text-base leading-relaxed max-w-xs 
                         text-gray-600 group-hover:text-white/90 transition-colors duration-500"
            >
              {service.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};
