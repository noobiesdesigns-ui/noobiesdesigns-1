import React, { useState } from 'react';
import { NavItem } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  items: NavItem[];
  currentSection: string;
  onNavigate: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, currentSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-8 right-8 z-50 hidden md:flex flex-row gap-8 text-black">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(index)}
            className={`text-xs font-display uppercase tracking-[0.25em] relative group overflow-hidden h-4 ${
              currentSection === item.id ? 'font-bold opacity-100 text-accent' : 'font-normal opacity-70 hover:opacity-100'
            }`}
          >
             {/* Rolling Text Animation */}
             <div className="relative transition-transform duration-300 group-hover:-translate-y-full">
                <span className="block">{item.label}</span>
                <span className="absolute top-full left-0 block">{item.label}</span>
             </div>
          </button>
        ))}
      </nav>

      {/* Mobile Menu Trigger */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-8 right-8 z-[60] md:hidden text-black p-2"
      >
        <Menu size={32} />
      </button>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white text-black flex flex-col items-center justify-center"
          >
            <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300"
            >
                <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-8">
                {items.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        onClick={() => {
                            onNavigate(index);
                            setIsMobileMenuOpen(false);
                        }}
                        className={`text-4xl font-display font-bold uppercase tracking-wider hover:text-accent transition-colors ${
                            currentSection === item.id ? 'text-accent' : 'text-black'
                        }`}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </div>

            <div className="absolute bottom-12 text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
                Noobies Design
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};