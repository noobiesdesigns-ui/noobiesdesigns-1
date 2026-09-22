import React from 'react';
import { motion } from 'framer-motion';
import { Project, SectionProps } from '../../types';
import work1 from '/assets/work1.png';
import work2 from '/assets/work2.png';
import work3 from '/assets/work3.png';
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

const projects: Project[] = [
    {
        id: 0,
        title: 'Scader',
        category: 'Brand Identity',
        imageUrl: scaderIcon,
        year: '2024',
        client: 'Scader',
        description: 'A complete brand identity system for Scader.',
        tags: ['Brand Identity', 'Strategy', 'Visual System'],
        isBrandIdentity: true,
        galleryImages: [scaderImage1, scaderImage2, scaderImage3, scaderImage4, scaderImage5, scaderImage6, scaderImage7]
    },
    {
        id: 1,
        title: 'Forest and Ray',
        category: 'Brand Identity',
        imageUrl: forestAndRayIcon,
        year: '2024',
        client: 'Forest and Ray',
        description: 'A complete brand identity system for Forest and Ray.',
        tags: ['Brand Identity', 'Strategy', 'Visual System'],
        isBrandIdentity: true,
        galleryImages: [forestAndRayImage1, forestAndRayImage2, forestAndRayImage3, forestAndRayImage4, forestAndRayImage5, forestAndRayImage6]
    },
    { 
        id: 2, 
        title: 'B2B Hub', 
        category: 'Logo Design', 
        imageUrl: work1, 
        year: '2022',
        client: 'Vts Private Limited',
        description: 'A sharp, modern logo for B2B Hub symbolizing business connection and professional growth.',
        tags: ['Logo', 'Minimalist', 'elegant']
    },
    { 
        id: 3, 
        title: 'Porfolio', 
        category: 'Web Design', 
        imageUrl: work2, 
        year: '2024',
        client: 'LogoBoi',
        description: 'A sleek personal portfolio website for a graphic designer, focused on bold layouts, clean grids, and smooth visual storytelling.',
        tags: ['UI/UX', 'Website', 'Elegant']
    },
    { 
        id: 4, 
        title: 'Vastraa', 
        category: 'App Design', 
        imageUrl: work3,
        year: '2024',
        client: 'Parul',
        description: 'A modern saree delivery app focused on smooth browsing, rich product visuals, and a seamless checkout experience tailored for fast, convenient shopping.',
        tags: ['Mobile App', 'UI/UX', 'Modern']
    },
];

export const Works: React.FC<SectionProps> = ({ x, onWorkClick }) => {
  return (
    <section className="w-full h-full bg-white flex items-center relative pl-20 md:pl-40 border-l border-gray-100">
      
      {/* Intro Text */}
      <div className="flex-shrink-0 w-screen md:w-[700px] h-full flex flex-col justify-center pr-8 md:pr-24 z-10 bg-white">
         <div className="mb-12">
             <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6 block">Selected Projects</span>
             <h2 className="font-display text-5xl md:text-[5.5rem] font-bold uppercase leading-[0.9] text-black mb-8 tracking-tight">
                Featured <br/>
                Work
             </h2>
             <p className="text-gray-600 text-lg md:text-xl font-light max-w-sm leading-relaxed">
                A curation of digital products that define brands and drive engagement.
             </p>
         </div>
      </div>

      {/* Projects Horizontal List */}
      <div className="flex items-center gap-8 md:gap-12 h-full py-20">
         {projects.map((project, index) => (
             <WorkItem 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => onWorkClick && onWorkClick(project)}
             />
         ))}
         
         <div className="w-[10vw]"></div>
      </div>
    </section>
  );
};

const WorkItem: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            className={`relative flex-shrink-0 w-[85vw] md:w-[35vw] group cursor-pointer ${isEven ? 'self-start mt-8 md:mt-12' : 'self-end mb-8 md:mb-12'}`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ margin: "-10%" }}
            onClick={onClick}
        >
            <div className={`w-full ${project.isBrandIdentity ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden relative mb-6 bg-gray-100`}>
                <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="flex justify-between items-start border-t border-black pt-4">
                <div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-1 tracking-tight">{project.title}</h3>
                    <span className="text-sm font-mono text-accent">{project.category}</span>
                </div>
                <span className="font-mono text-sm border border-black rounded-full px-3 py-1">{project.year}</span>
            </div>
        </motion.div>
    );
}