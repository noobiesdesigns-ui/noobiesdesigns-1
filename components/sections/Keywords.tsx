import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { SectionProps } from "../../types";

const keys = [
  { char: "N", top: "25%", left: "15%", depth: 0.1, rotate: -25, zIndex: 10 },
  { char: "O", top: "65%", left: "25%", depth: 0.6, rotate: 15, zIndex: 30 },
  { char: "O", top: "30%", left: "38%", depth: 0.2, rotate: -10, zIndex: 20 },
  { char: "B", top: "55%", left: "50%", depth: 0.8, rotate: 45, zIndex: 40 },
  { char: "I", top: "75%", left: "62%", depth: 0.4, rotate: -20, zIndex: 20 },
  { char: "E", top: "20%", left: "72%", depth: 0.3, rotate: 30, zIndex: 10 },
  { char: "S", top: "60%", left: "85%", depth: 0.7, rotate: -15, zIndex: 30 },
];

export const Keywords: React.FC<SectionProps> = ({ x }) => {
  return (
    <section className="w-full h-full bg-white relative overflow-hidden border-l border-gray-100 flex items-center justify-center">
      <div className="relative w-full h-full max-w-[90vw] mx-auto">
        {keys.map((item, index) => (
          <KeyCap
            key={index}
            char={item.char}
            top={item.top}
            left={item.left}
            depth={item.depth}
            baseRotation={item.rotate}
            zIndex={item.zIndex}
            x={x}
          />
        ))}
      </div>
    </section>
  );
};

interface KeyCapProps {
  char: string;
  top: string;
  left: string;
  depth: number;
  baseRotation: number;
  zIndex: number;
  x: MotionValue<number>;
}

const KeyCap: React.FC<KeyCapProps> = ({
  char,
  top,
  left,
  depth,
  baseRotation,
  zIndex,
  x,
}) => {
  // FORCE TypeScript to treat the callback value as a number
  const parallaxX = useTransform(x, (latest: number) => latest * depth * 0.03);

  const rotate = useTransform(
    x,
    (latest: number) => baseRotation + latest * 0.005
  );

  return (
    <motion.div
      style={{
        top,
        left,
        zIndex,
        x: parallaxX,
        rotate,
      }}
      className="absolute w-24 h-24 md:w-40 md:h-40 flex items-center justify-center will-change-transform"
    >
      <div className="w-full h-full bg-[#1a1a1a] rounded-2xl md:rounded-[2rem] shadow-[20px_20px_60px_rgba(0,0,0,0.3)] border-b-[6px] border-r-[6px] md:border-b-[10px] md:border-r-[10px] border-black flex items-center justify-center transform transition-transform hover:scale-110 duration-500 cursor-default group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl md:rounded-[2rem] pointer-events-none"></div>

        <div className="absolute inset-[3px] rounded-2xl md:rounded-[1.8rem] border border-white/10 pointer-events-none"></div>

        <span className="font-display font-bold text-4xl md:text-7xl text-white group-hover:text-gray-200 transition-colors select-none drop-shadow-lg tracking-tighter">
          {char}
        </span>
      </div>
    </motion.div>
  );
};
