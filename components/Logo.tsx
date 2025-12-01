import React from 'react';

interface LogoProps {
  onClick: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div 
      className="fixed top-9 left-5 md:top-3 md:left-2 z-[60] select-none pointer-events-auto cursor-pointer"
      onClick={onClick}
    >
      <div className="w-24 md:w-32">
        <img 
          src="assets/logo.png"
          alt="Noobies Design"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};
