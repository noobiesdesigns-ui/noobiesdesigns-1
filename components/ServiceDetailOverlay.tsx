import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Service, ServiceProject } from '../types';
import { BrandIdentityOverlay } from './BrandIdentityOverlay';
import socialPost1 from '../assets/social media posts/1.png';
import socialPost9 from '../assets/social media posts/9.png';
import socialPost13 from '../assets/social media posts/13.png';
import socialPost14 from '../assets/social media posts/14.png';
import socialPost17 from '../assets/social media posts/17.png';
import socialPost18 from '../assets/social media posts/18.png';
import socialPost27 from '../assets/social media posts/27.png';
import socialPost31 from '../assets/social media posts/31.png';
import socialPost39 from '../assets/social media posts/39.png';
import socialPost40 from '../assets/social media posts/40.png';
import socialPost44 from '../assets/social media posts/44.png';
import socialPost50 from '../assets/social media posts/50.png';
import socialPost51 from '../assets/social media posts/51.png';
import socialPost52 from '../assets/social media posts/52.png';
import socialPost56 from '../assets/social media posts/56.png';
import socialPost57 from '../assets/social media posts/57.png';
import socialPost58 from '../assets/social media posts/58.png';
import socialPost75 from '../assets/social media posts/75.png';
import socialPostDsdfsdf from '../assets/social media posts/dsdfsdf.png';
import socialPostSdfdsvsfd from '../assets/social media posts/sdfdsvsfd.png';
import reelCoverSnaplytics from '../assets/reel covers/snaplytics.io_instagram_thumbnail_DZegKpbtV5n.jpg';
import reelCover726838855 from '../assets/reel covers/726838855_18060492314741752_2718278623074495896_n.jpg';
import reelCover661593827 from '../assets/reel covers/661593827_18073071464295543_445262152570833245_n.jpg';
import reelCover652742535 from '../assets/reel covers/652742535_18046914248741752_6610784003975472703_n.jpg';
import reelCover652593000 from '../assets/reel covers/652593000_18046914131741752_1148492912039269994_n.jpg';
import reelCover651918924 from '../assets/reel covers/651918924_18046913765741752_817288942557313455_n.jpg';
import reelCover626297538 from '../assets/reel covers/626297538_18043027061741752_4458403491227254441_n.jpg';

interface ServiceDetailOverlayProps {
  service: Service;
  onClose: () => void;
}

// ─── Video Data (Pure MP4 local videos — zero HUD) ──────────────────────────
const talkingHeadReels = [
  { id: 'th-1', src: '/videos/reel_1.mp4' },
  { id: 'th-2', src: '/videos/reel_2.mp4' },
  { id: 'th-3', src: '/videos/reel_3.mp4' },
  { id: 'th-4', src: '/videos/reel_4.mp4' },
  { id: 'th-5', src: '/videos/reel_instagram_1.mp4' },
  { id: 'th-6', src: '/videos/reel_instagram_2.mp4' },
];

const motionGraphicReels = [
  { id: 'mg-1', src: '/videos/motion/1.mp4' },
  { id: 'mg-2', src: '/videos/motion/2.mp4' },
  { id: 'mg-3', src: '/videos/motion/3.mp4' },
];

const productShowcaseReels = [
  { id: 'ps-1', src: '/videos/product_instagram_1.mp4' },
  { id: 'ps-2', src: '/videos/product_instagram_2.mp4' },
  { id: 'ps-3', src: '/videos/product_instagram_3.mp4' },
  { id: 'ps-4', src: '/videos/product_instagram_4.mp4' },
];

const instagramPosts = [
  { id: 'post-1', src: socialPost1 },
  { id: 'post-9', src: socialPost9 },
  { id: 'post-13', src: socialPost13 },
  { id: 'post-14', src: socialPost14 },
  { id: 'post-17', src: socialPost17 },
  { id: 'post-18', src: socialPost18 },
  { id: 'post-27', src: socialPost27 },
  { id: 'post-31', src: socialPost31 },
  { id: 'post-39', src: socialPost39 },
  { id: 'post-40', src: socialPost40 },
  { id: 'post-44', src: socialPost44 },
  { id: 'post-50', src: socialPost50 },
  { id: 'post-51', src: socialPost51 },
  { id: 'post-52', src: socialPost52 },
  { id: 'post-56', src: socialPost56 },
  { id: 'post-57', src: socialPost57 },
  { id: 'post-58', src: socialPost58 },
  { id: 'post-75', src: socialPost75 },
  { id: 'post-dsdfsdf', src: socialPostDsdfsdf },
  { id: 'post-sdfdsvsfd', src: socialPostSdfdsvsfd },
];

const reelCovers = [
  { id: 'reel-cover-snaplytics', src: reelCoverSnaplytics },
  { id: 'reel-cover-726838855', src: reelCover726838855 },
  { id: 'reel-cover-661593827', src: reelCover661593827 },
  { id: 'reel-cover-652742535', src: reelCover652742535 },
  { id: 'reel-cover-652593000', src: reelCover652593000 },
  { id: 'reel-cover-651918924', src: reelCover651918924 },
  { id: 'reel-cover-626297538', src: reelCover626297538 },
];

const shuffleArray = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

// ─── Pure Video Card (Zero HUD, Autoplay, Loop, Audio Isolation) ─────────────
interface PureVideoCardProps {
  id: string;
  src: string;
  isActive: boolean;
  anyActive: boolean;
  onSelect: () => void;
  onEnded: () => void;
  index: number;
}

const PureVideoCard: React.FC<PureVideoCardProps> = ({
  src,
  isActive,
  anyActive,
  onSelect,
  onEnded,
  index,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;
      video.play().catch(() => {});
    } else if (anyActive) {
      video.pause();
    } else {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    }
  }, [isActive, anyActive]);

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.muted = false;
          video.loop = false;
          video.play().catch(() => {});
        }
        onSelect();
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: anyActive && !isActive ? 0.35 : 1,
        scale: 1,
        y: 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className={`relative cursor-pointer flex-shrink-0 group rounded-2xl md:rounded-3xl overflow-hidden bg-black transition-all duration-300 ${
        isActive
          ? 'shadow-2xl z-10'
          : 'shadow-lg hover:shadow-xl'
      }`}
      style={{
        width: 'clamp(180px, 20vw, 270px)',
        aspectRatio: '9/16',
      }}
    >
      {/* Pure clean video — ZERO HUD */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop={!isActive}
        muted={!isActive}
        playsInline
        preload="auto"
        onEnded={onEnded}
        className="w-full h-full object-cover"
      />

      {/* Subtle audio indicator on hover or when unmuted */}
      <div
        className={`absolute top-3 right-3 transition-opacity duration-200 pointer-events-none ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white text-xs">
          {isActive ? '🔊' : '🔇'}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Video Editing overlay content ──────────────────────────────────────────
const VideoEditingContent: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [talkingHeadOrder] = useState(() => shuffleArray(talkingHeadReels));
  const [motionGraphicOrder] = useState(() => shuffleArray(motionGraphicReels));
  const [productShowcaseOrder] = useState(() => shuffleArray(productShowcaseReels));
  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
    didDrag: false,
  });

  const handleRowPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    dragState.current = {
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
      isDragging: true,
      didDrag: false,
    };
  };

  const handleRowPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.isDragging) return;

    const row = event.currentTarget;
    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > 4) {
      state.didDrag = true;
      event.preventDefault();
    }
    row.scrollLeft = state.scrollLeft - distance;
  };

  const handleRowPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragState.current.isDragging = false;

    if (dragState.current.didDrag) {
      window.setTimeout(() => {
        dragState.current.didDrag = false;
      }, 0);
    }
  };

  const handleRowClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.didDrag) {
      event.stopPropagation();
      dragState.current.didDrag = false;
    }
  };

  const handleSelect = (id: string) => {
    setActiveVideoId((prev) => (prev === id ? null : id));
  };

  const handleEnded = () => {
    setActiveVideoId(null);
  };

  const handleBackgroundClick = () => {
    if (activeVideoId !== null) {
      setActiveVideoId(null);
    }
  };

  const anyActive = activeVideoId !== null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="w-full h-full bg-white flex flex-col overflow-y-auto overflow-x-hidden"
    >

      {/* ══ CATEGORY 01: TALKING HEAD ══ */}
      <div className="flex-shrink-0 px-6 md:px-16 pt-8 md:pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1"
        >
          Category 01
        </motion.p>

        {/* HEADLINE: "Talking" Coolvetica · "Head" Birds of Paradise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 leading-none mb-6"
        >
          <span
            className="font-coolvetica text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Talking
          </span>
          <span
            className="font-birds text-accent leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400 }}
          >
            Head
          </span>
        </motion.div>

        <div className="w-full h-px bg-gray-200 mb-8" />
      </div>

      {/* REELS ROW — PURE VIDEO, ZERO HUD */}
      <div className="flex-shrink-0 px-6 md:px-16 pb-12">
        <div
          onPointerDown={handleRowPointerDown}
          onPointerMove={handleRowPointerMove}
          onPointerUp={handleRowPointerUp}
          onPointerCancel={handleRowPointerUp}
          onClickCapture={handleRowClickCapture}
          className="flex w-full min-w-0 flex-nowrap cursor-grab select-none items-center justify-start gap-4 overflow-x-auto pb-4 touch-pan-x no-scrollbar active:cursor-grabbing md:gap-6"
        >
          {talkingHeadOrder.map((reel, i) => (
            <PureVideoCard
              key={reel.id}
              id={reel.id}
              src={reel.src}
              isActive={activeVideoId === reel.id}
              anyActive={anyActive}
              onSelect={() => handleSelect(reel.id)}
              onEnded={handleEnded}
              index={i}
            />
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">
          Drag to slide · Click to watch
        </p>
      </div>

      {/* ══ CATEGORY 02: MOTION GRAPHIC ══ */}
      <div className="flex-shrink-0 px-6 md:px-16 pt-8 border-t border-gray-100 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1"
        >
          Category 02
        </motion.p>

        {/* HEADLINE: "Motion" Coolvetica · "Graphic" Birds of Paradise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 leading-none mb-6"
        >
          <span
            className="font-coolvetica text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Motion
          </span>
          <span
            className="font-birds text-accent leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400 }}
          >
            Graphic
          </span>
        </motion.div>

        <div className="w-full h-px bg-gray-200 mb-8" />

        {/* MOTION VIDEOS ROW — PURE VIDEO, ZERO HUD */}
        <div
          onPointerDown={handleRowPointerDown}
          onPointerMove={handleRowPointerMove}
          onPointerUp={handleRowPointerUp}
          onPointerCancel={handleRowPointerUp}
          onClickCapture={handleRowClickCapture}
          className="flex w-full min-w-0 flex-nowrap cursor-grab select-none items-center justify-start gap-4 overflow-x-auto pb-4 touch-pan-x no-scrollbar active:cursor-grabbing md:justify-center md:gap-6"
        >
          {motionGraphicOrder.map((reel, i) => (
            <PureVideoCard
              key={reel.id}
              id={reel.id}
              src={reel.src}
              isActive={activeVideoId === reel.id}
              anyActive={anyActive}
              onSelect={() => handleSelect(reel.id)}
              onEnded={handleEnded}
              index={i}
            />
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">
          Drag to slide · Click to watch
        </p>
      </div>

      {/* ══ CATEGORY 03: PRODUCT SHOWCASE ══ */}
      <div className="flex-shrink-0 px-6 md:px-16 pt-8 border-t border-gray-100 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1"
        >
          Category 03
        </motion.p>

        {/* HEADLINE: "Product" Coolvetica · "Showcase" Birds of Paradise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 leading-none mb-6"
        >
          <span
            className="font-coolvetica text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Product
          </span>
          <span
            className="font-birds text-accent leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400 }}
          >
            Showcase
          </span>
        </motion.div>

        <div className="w-full h-px bg-gray-200 mb-8" />

        <div
          onPointerDown={handleRowPointerDown}
          onPointerMove={handleRowPointerMove}
          onPointerUp={handleRowPointerUp}
          onPointerCancel={handleRowPointerUp}
          onClickCapture={handleRowClickCapture}
          className="flex w-full min-w-0 flex-nowrap cursor-grab select-none items-center justify-start gap-4 overflow-x-auto pb-4 touch-pan-x no-scrollbar active:cursor-grabbing md:justify-center md:gap-6"
        >
          {productShowcaseOrder.map((reel, i) => (
            <PureVideoCard
              key={reel.id}
              id={reel.id}
              src={reel.src}
              isActive={activeVideoId === reel.id}
              anyActive={anyActive}
              onSelect={() => handleSelect(reel.id)}
              onEnded={handleEnded}
              index={i}
            />
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">
          Drag to slide · Click to watch
        </p>
      </div>

    </div>
  );
};

const InstagramPostsContent: React.FC = () => {
  const [shuffledPosts] = useState(() => shuffleArray(instagramPosts));
  const [shuffledReelCovers] = useState(() => shuffleArray(reelCovers));
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
    didDrag: false,
  });

  const handleRowPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    dragState.current = {
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
      isDragging: true,
      didDrag: false,
    };
    row.setPointerCapture(event.pointerId);
  };

  const handleRowPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.isDragging) return;

    const row = event.currentTarget;
    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > 4) {
      state.didDrag = true;
      event.preventDefault();
    }
    row.scrollLeft = state.scrollLeft - distance;
  };

  const handleRowPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
    dragState.current.isDragging = false;
  };

  const handleRowClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.didDrag) {
      event.stopPropagation();
      dragState.current.didDrag = false;
    }
  };

  const renderImageRow = (items: typeof instagramPosts, label: string, altPrefix: string) => (
    <div className="flex-shrink-0 px-6 md:px-16 pb-12">
      <div
        onPointerDown={handleRowPointerDown}
        onPointerMove={handleRowPointerMove}
        onPointerUp={handleRowPointerUp}
        onPointerCancel={handleRowPointerUp}
        onClickCapture={handleRowClickCapture}
        className="flex w-full min-w-0 flex-nowrap cursor-grab select-none items-center justify-start gap-4 overflow-x-auto pb-4 touch-pan-x no-scrollbar active:cursor-grabbing md:gap-6"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.035 }}
            className="relative flex-shrink-0 overflow-hidden bg-gray-100 shadow-lg"
            onClick={() => setSelectedImage({ src: item.src, alt: `${altPrefix} ${index + 1}` })}
            style={{
              width: label === 'Reel Covers' ? 'min(270px, calc(100vw - 48px))' : 'clamp(220px, 24vw, 340px)',
              aspectRatio: label === 'Reel Covers' ? '9/16' : '4/5',
            }}
          >
            <img
              src={item.src}
              alt={`${altPrefix} ${index + 1}`}
              className={`w-full h-full ${label === 'Reel Covers' ? 'object-contain' : 'object-cover'}`}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">
        Drag to slide · Scroll to explore
      </p>
    </div>
  );

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex-shrink-0 px-6 md:px-16 pt-8 md:pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1"
        >
          Social Media / 01
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 leading-none mb-6"
        >
          <span
            className="font-coolvetica text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Instagram
          </span>
          <span
            className="font-birds text-accent leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400 }}
          >
            Posts
          </span>
        </motion.div>
        <div className="w-full h-px bg-gray-200 mb-8" />
      </div>

      {renderImageRow(shuffledPosts, 'Instagram Posts', 'Instagram post')}

      <div className="flex-shrink-0 px-6 md:px-16 pt-2 md:pt-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1"
        >
          Social Media / 02
        </motion.p>
        <div className="flex flex-wrap items-baseline gap-x-4 leading-none mb-6">
          <span
            className="font-coolvetica text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Reel
          </span>
          <span
            className="font-birds text-accent leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400 }}
          >
            Covers
          </span>
        </div>
        <div className="w-full h-px bg-gray-200 mb-8" />
      </div>

      {renderImageRow(shuffledReelCovers, 'Reel Covers', 'Reel cover')}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Full-screen image viewer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-full max-w-full object-contain"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Close full-screen image viewer"
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-accent hover:text-white md:right-8 md:top-8"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main overlay ────────────────────────────────────────────────────────────
export const ServiceDetailOverlay: React.FC<ServiceDetailOverlayProps> = ({ service, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<ServiceProject | null>(null);
  const isVideoEditing = service.id === '02';
  const isSocialMedia = service.id === '03';
  const hasProjects    = service.projects && service.projects.length > 0;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-white flex flex-col overflow-hidden"
    >
      {/* ── Top bar ── */}
      <div className="flex-shrink-0 w-full flex items-center justify-between px-6 md:px-16 border-b border-gray-100 bg-white z-50"
           style={{ height: '72px' }}>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Portfolio</span>
          <h2 className="font-display text-lg md:text-2xl font-bold tracking-tight text-black leading-none">{service.title}</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200
                     flex items-center justify-center text-black group
                     hover:bg-black hover:text-white hover:border-black transition-all duration-300"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 w-full relative overflow-hidden min-h-0">
        {selectedProject?.galleryImages && (
          <BrandIdentityOverlay
            project={{
              id: 0,
              title: selectedProject.title,
              category: service.title,
              imageUrl: selectedProject.imageUrl,
              year: selectedProject.year,
              client: selectedProject.client,
              description: selectedProject.description,
              galleryImages: selectedProject.galleryImages,
              isBrandIdentity: true
            }}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {isVideoEditing ? (
          <VideoEditingContent />
        ) : isSocialMedia ? (
          <InstagramPostsContent />
        ) : (
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <ProjectDetailView key="detail" project={selectedProject} onBack={() => setSelectedProject(null)} />
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }} className="w-full h-full overflow-y-auto">
                {hasProjects ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-100">
                    {service.projects!.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProject(p)}
                        className="bg-white aspect-[4/3] relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2">{p.client}</span>
                          <div className="flex justify-between items-end">
                            <h3 className="text-white font-display text-3xl tracking-tighter">{p.title}</h3>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"><ArrowRight size={16} /></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <span className="font-display text-4xl mb-4 tracking-tight">Coming Soon</span>
                    <p className="font-light">Projects for this category are being curated.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

// ─── Project detail ──────────────────────────────────────────────────────────
const ProjectDetailView: React.FC<{ project: ServiceProject; onBack: () => void }> = ({ project, onBack }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.6 }} className="w-full h-full flex flex-col md:flex-row bg-white overflow-hidden">
    <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-gray-50 p-8 md:p-16 flex items-center justify-center relative">
      <div className="w-full h-full shadow-2xl overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
      </div>
      <button onClick={onBack} className="absolute top-8 left-8 md:hidden px-6 py-3 bg-white text-black font-mono text-xs uppercase border border-gray-200 z-20">Back</button>
    </div>
    <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-24 overflow-y-auto">
      <button onClick={onBack} className="self-start hidden md:flex items-center gap-2 mb-12 px-6 py-3 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest">
        <ArrowRight size={14} className="rotate-180" /> Back
      </button>
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-gray-500">{project.client} &mdash; {project.year}</span>
      <h2 className="font-display text-6xl md:text-8xl font-bold mt-4 mb-8 leading-[0.9] tracking-tighter">{project.title}</h2>
      <div className="w-12 h-1 bg-black mb-8" />
      <p className="text-gray-600 font-light text-lg md:text-xl leading-relaxed max-w-md">{project.description}</p>
    </div>
  </motion.div>
);