// src/components/Intro.tsx
import React, { useEffect, useRef, useState } from "react";
import introVideo from "../assets/intro.mp4";

type IntroProps = {
  onFinish: () => void;
};

export const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const handleEnded = () => {
    setFading(true);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (fading && e.target === wrapperRef.current) {
      onFinish();
    }
  };

  return (
    <div
      ref={wrapperRef}
      onTransitionEnd={handleTransitionEnd}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 700ms ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="
          w-full h-full
          object-contain md:object-cover
          max-h-[100svh]
        "
      />
    </div>
  );
};

export default Intro;
