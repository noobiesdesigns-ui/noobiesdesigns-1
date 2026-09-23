import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionProps, Service } from '../../types';
import s1 from '/assets/s1.png';
import s2 from '/assets/s2.png';
import s3 from '/assets/s3.png';
import s4 from '/assets/s4.png';
import scaderIcon from '../../assets/branding icon/scader.png';
import scaderImage1 from '../../assets/branding/scader/1.jpg';
import scaderImage2 from '../../assets/branding/scader/2.jpg';
import scaderImage3 from '../../assets/branding/scader/3.jpg';
import scaderImage4 from '../../assets/branding/scader/4.jpg';
import scaderImage5 from '../../assets/branding/scader/5.jpg';
import scaderImage6 from '../../assets/branding/scader/6.jpg';
import scaderImage7 from '../../assets/branding/scader/7.jpg';
import forestAndRayIcon from '../../assets/branding icon/Forest and Ray.png';
import forestAndRayImage1 from '../../assets/branding/forest and ray/1.jpg';
import forestAndRayImage2 from '../../assets/branding/forest and ray/2.jpg';
import forestAndRayImage3 from '../../assets/branding/forest and ray/3.jpg';
import forestAndRayImage4 from '../../assets/branding/forest and ray/4.jpg';
import forestAndRayImage5 from '../../assets/branding/forest and ray/5.jpg';
import forestAndRayImage6 from '../../assets/branding/forest and ray/6.jpg';
import payanaIcon from '../../assets/branding icon/payana overseas solutions.png';
import payanaImage1 from '../../assets/branding/payan overseas solutions/1.jpg';
import payanaImage2 from '../../assets/branding/payan overseas solutions/2.jpg';
import payanaImage3 from '../../assets/branding/payan overseas solutions/3.jpg';
import payanaImage4 from '../../assets/branding/payan overseas solutions/4.jpg';
import payanaImage5 from '../../assets/branding/payan overseas solutions/5.jpg';
import payanaImage6 from '../../assets/branding/payan overseas solutions/6.jpg';

export const serviceData: Service[] = [
  {
    id: '01',
    title: 'Brand Identity',
    description: 'Crafting cohesive visual systems — logos, type, colour and tone — that make brands impossible to forget.',
    image: s1,
    projects: [{
      id: 'payana-overseas-solutions',
      title: 'Payana Overseas Solutions',
      client: 'Payana Overseas Solutions',
      year: '2024',
      description: 'A complete brand identity system for Payana Overseas Solutions.',
      imageUrl: payanaIcon,
      galleryImages: [payanaImage1, payanaImage2, payanaImage3, payanaImage4, payanaImage5, payanaImage6]
    }, {
      id: 'forest-and-ray',
      title: 'Forest and Ray',
      client: 'Forest and Ray',
      year: '2024',
      description: 'A complete brand identity system for Forest and Ray.',
      imageUrl: forestAndRayIcon,
      galleryImages: [forestAndRayImage1, forestAndRayImage2, forestAndRayImage3, forestAndRayImage4, forestAndRayImage5, forestAndRayImage6]
    }, {
      id: 'scader',
      title: 'Scader',
      client: 'Scader',
      year: '2024',
      description: 'A complete brand identity system for Scader.',
      imageUrl: scaderIcon,
      galleryImages: [scaderImage1, scaderImage2, scaderImage3, scaderImage4, scaderImage5, scaderImage6, scaderImage7]
    }]
  },
  {
    id: '02',
    title: 'Video Editing',
    description: 'Cutting and composing footage into polished, story-driven films that hold attention from first frame to last.',
    image: s2,
    projects: []
  },
  {
    id: '03',
    title: 'Social Media',
    description: 'Creating scroll-stopping visuals and content tailored for social platforms, campaigns and digital communities.',
    image: s3,
    projects: []
  },
  {
    id: '04',
    title: 'Visual Design',
    description: 'Translating ideas into refined, purposeful graphics — from print collateral to digital assets.',
    image: s4,
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
            className="flex-1 h-full border-r border-gray-200 min-w-[70vw] md:min-w-[20vw] lg:min-w-[22vw]
                       flex flex-col justify-between p-6 md:p-10 pb-20 md:pb-10
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
                  Works
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
                  Works
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
