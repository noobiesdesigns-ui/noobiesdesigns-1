import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Contact } from './components/sections/Contact';
import { ServiceDetailOverlay } from './components/ServiceDetailOverlay';
import { serviceData } from './components/sections/Services';

const App: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentSectionId, setCurrentSectionId] = useState('home');
  const [contentWidth, setContentWidth] = useState(0);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [aboutFillProgress, setAboutFillProgress] = useState(0);
  const [aboutScrollLock, setAboutScrollLock] = useState(false);
  const [aboutReadyForInteraction, setAboutReadyForInteraction] = useState(false);
  const [aboutInteractionState, setAboutInteractionState] = useState<'idle' | 'forward' | 'reverse'>('idle');

  const containerRef = useRef<HTMLDivElement>(null);
  const aboutFillRef = useRef(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 45, damping: 25, mass: 1 });

  const touchStart = useRef(0);
  const touchStartY = useRef(0);
  const lastTouchX = useRef(0);
  const currentX = useRef(0);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth);
      }
    };

    handleResize();
    setTimeout(handleResize, 500);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progressWidth = useTransform(springX, (latest) => {
    if (contentWidth === 0 || windowWidth === 0) return '0%';
    const max = contentWidth - windowWidth;
    if (max <= 0) return '0%';
    const progress = Math.abs(latest) / max;
    return `${Math.min(progress * 100, 100)}%`;
  });

  useEffect(() => {
    const unsubscribe = springX.on('change', (latest) => {
      if (windowWidth === 0) return;

      const absX = Math.abs(latest);
      const isMobile = windowWidth < 768;
      let activeId = 'home';

      if (isMobile) {
        if (absX < windowWidth * 0.9) activeId = 'home';
        else if (absX < windowWidth * 1.9) activeId = 'about';
        else if (absX < windowWidth * 6.6) activeId = 'services';
        else activeId = 'contact';
      } else {
        if (absX < windowWidth * 0.9) activeId = 'home';
        else if (absX < windowWidth * 1.9) activeId = 'about';
        else if (absX < windowWidth * 3.3) activeId = 'services';
        else activeId = 'contact';
      }

      if (contentWidth > 0 && absX >= contentWidth - windowWidth - 50) {
        activeId = 'contact';
      }

      setCurrentSectionId(activeId);
    });

    return () => unsubscribe();
  }, [springX, windowWidth, contentWidth]);

  useEffect(() => {
    if (currentSectionId !== 'about') {
      if (aboutFillRef.current >= 1) {
        setAboutFillProgress(1);
        aboutFillRef.current = 1;
      } else {
        aboutFillRef.current = 0;
        setAboutFillProgress(0);
      }

      setAboutScrollLock(false);
      setAboutInteractionState('idle');
      setAboutReadyForInteraction(false);
      return;
    }

    if (aboutFillRef.current >= 1) {
      setAboutReadyForInteraction(true);
      setAboutFillProgress(1);
      aboutFillRef.current = 1;
      return;
    }

    setAboutReadyForInteraction(true);

    const start = aboutFillRef.current;
    let rafId = 0;
    let startTime = 0;
    const duration = 900;

    const animateFill = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextProgress = start + (1 - start) * eased;

      aboutFillRef.current = nextProgress;
      setAboutFillProgress(nextProgress);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(animateFill);
        return;
      }

      aboutFillRef.current = 1;
      setAboutFillProgress(1);
      setAboutScrollLock(false);
      setAboutInteractionState('idle');
    };

    rafId = window.requestAnimationFrame(animateFill);

    return () => window.cancelAnimationFrame(rafId);
  }, [currentSectionId]);

  useEffect(() => {
    if (!aboutScrollLock) return;

    if (aboutInteractionState === 'forward' && aboutFillProgress >= 1) {
      aboutFillRef.current = 1;
      setAboutFillProgress(1);
      setAboutScrollLock(false);
      setAboutInteractionState('idle');
      return;
    }
  }, [aboutFillProgress, aboutInteractionState, aboutScrollLock]);

  useEffect(() => {
    if (contentWidth === 0 || windowWidth === 0 || activeServiceId) return;

    const maxScroll = -(contentWidth - windowWidth);
    const aboutEntryX = -windowWidth;
    const clampX = (value: number) => Math.max(Math.min(value, 0), maxScroll);

    const releaseAboutInteraction = () => {
      setAboutScrollLock(false);
      setAboutInteractionState('idle');
    };

    const consumeAboutFill = (delta: number) => {
      const nextProgress = Math.max(
        aboutFillRef.current,
        Math.min(Math.max(aboutFillRef.current + delta * 0.0015, 0), 1)
      );
      aboutFillRef.current = nextProgress;
      setAboutFillProgress(nextProgress);

      if (nextProgress >= 1) {
        aboutFillRef.current = 1;
        setAboutFillProgress(1);
        releaseAboutInteraction();
        return true;
      }

      if (nextProgress <= 0) {
        aboutFillRef.current = 0;
        setAboutFillProgress(0);
        releaseAboutInteraction();
        return true;
      }

      return false;
    };

    const clampToAboutBoundary = (nextPosition: number) => {
      if (aboutScrollLock || currentSectionId === 'about') return false;

      const approachingAbout =
        (currentX.current > aboutEntryX && nextPosition <= aboutEntryX) ||
        (currentX.current < aboutEntryX && nextPosition >= aboutEntryX);

      if (!approachingAbout) return false;

      currentX.current = aboutEntryX;
      x.set(currentX.current);
      return true;
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY || e.deltaX;

      if (aboutScrollLock || aboutInteractionState !== 'idle') {
        e.preventDefault();
        const handled = consumeAboutFill(delta);
        if (handled) {
          const remainingDelta = delta * 0.8;
          currentX.current -= remainingDelta;
          currentX.current = clampX(currentX.current);
          x.set(currentX.current);
        }
        return;
      }

      if (currentSectionId === 'about' && aboutReadyForInteraction && Math.abs(delta) > 0) {
        const direction = delta > 0 ? 'forward' : 'reverse';
        const progress = aboutFillRef.current;
        const withinBounds = direction === 'forward' ? progress < 1 : false;

        if (withinBounds) {
          e.preventDefault();
          setAboutScrollLock(true);
          setAboutInteractionState(direction);
          const handled = consumeAboutFill(delta);
          if (handled) {
            const remainingDelta = delta * 0.8;
            currentX.current -= remainingDelta;
            currentX.current = clampX(currentX.current);
            x.set(currentX.current);
          }
          return;
        }
      }

      const nextPosition = currentX.current - delta * 0.8;
      if (clampToAboutBoundary(nextPosition)) {
        e.preventDefault();
        return;
      }

      currentX.current = clampX(nextPosition);
      x.set(currentX.current);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      lastTouchX.current = currentX.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - touchStart.current;
      const deltaY = e.touches[0].clientY - touchStartY.current;
      const movement = deltaX + (deltaY * 1.2);

      if (aboutScrollLock || aboutInteractionState !== 'idle') {
        e.preventDefault();
        const handled = consumeAboutFill(movement * 0.02);
        if (handled) {
          const remainingMovement = movement * 0.8;
          const newX = lastTouchX.current + remainingMovement * 1.5;
          currentX.current = clampX(newX);
          x.set(currentX.current);
        }
        return;
      }

      if (currentSectionId === 'about' && aboutReadyForInteraction && Math.abs(movement) > 0) {
        const direction = movement > 0 ? 'forward' : 'reverse';
        const progress = aboutFillRef.current;
        const withinBounds = direction === 'forward' ? progress < 1 : false;

        if (withinBounds) {
          e.preventDefault();
          setAboutScrollLock(true);
          setAboutInteractionState(direction);
          const handled = consumeAboutFill(movement * 0.02);
          if (handled) {
            const remainingMovement = movement * 0.8;
            const newX = lastTouchX.current + remainingMovement * 1.5;
            currentX.current = clampX(newX);
            x.set(currentX.current);
          }
          return;
        }
      }

      const newX = lastTouchX.current + movement * 1.5;
      if (clampToAboutBoundary(newX)) {
        e.preventDefault();
        return;
      }

      currentX.current = clampX(newX);
      x.set(currentX.current);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [windowWidth, contentWidth, x, activeServiceId, currentSectionId, aboutScrollLock, aboutInteractionState, aboutReadyForInteraction, aboutFillProgress]);

  const scrollToSection = (index: number) => {
    if (activeServiceId) setActiveServiceId(null);

    let multiplier = 0;
    const isMobile = windowWidth < 768;

    if (index === 0) multiplier = 0;
    if (index === 1) multiplier = 1.0;
    if (index === 2) multiplier = 2.0;
    if (index === 3) multiplier = isMobile ? 6.6 : 3.3;

    const target = -1 * multiplier * window.innerWidth;
    const maxScroll = -(contentWidth - windowWidth);
    const safeTarget = Math.max(target, maxScroll);

    currentX.current = safeTarget;
    x.set(safeTarget);
  };

  const handleServiceClick = (serviceId: string) => {
    setActiveServiceId(serviceId);
  };

  const activeServiceData = serviceData.find((s) => s.id === activeServiceId);

  return (
    <div className="relative bg-[#f6f3ee] text-black font-sans selection:bg-black selection:text-white w-full h-full overflow-hidden fixed inset-0 z-0">
      <motion.div className="relative z-20 w-full h-full">
        <div className="fixed top-0 left-0 h-1 bg-gray-100 w-full z-[100]">
          <motion.div
            className="h-full bg-accent"
            style={{ width: progressWidth }}
          />
        </div>

        <Navigation
          items={navItems}
          currentSection={currentSectionId}
          onNavigate={scrollToSection}
        />

        <motion.div
          ref={containerRef}
          style={{ x: springX }}
          className="flex h-full w-max will-change-transform"
        >
          <div id="home" className="w-screen h-screen flex-shrink-0 relative">
            <Home x={springX} />
          </div>

          <div id="about" className="w-screen h-screen flex-shrink-0 relative">
            <About x={springX} fillProgress={aboutFillProgress} isReady={aboutReadyForInteraction} />
          </div>

          <div id="services" className="w-[425vw] md:w-[125vw] h-screen flex-shrink-0 relative">
            <Services x={springX} onServiceClick={handleServiceClick} />
          </div>

          <div id="contact" className="w-screen h-screen flex-shrink-0 relative">
            <Contact x={springX} />
          </div>
        </motion.div>

        <AnimatePresence>
          {activeServiceId && activeServiceData && (
            <ServiceDetailOverlay
              service={activeServiceData}
              onClose={() => setActiveServiceId(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;