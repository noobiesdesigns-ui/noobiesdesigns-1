import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Contact } from './components/sections/Contact';
import { ServiceDetailOverlay } from './components/ServiceDetailOverlay';
import SwarmCursor from './components/SwarmCursor';
import { serviceData } from './components/sections/Services';




const App: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentSectionId, setCurrentSectionId] = useState('home');
  const [contentWidth, setContentWidth] = useState(0);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
    const unsubscribe = springX.on("change", (latest) => {
      if (windowWidth === 0) return;
      const absX = Math.abs(latest);
      const isMobile = windowWidth < 768;

      let activeId = 'home';

      // Exact Breakpoint Logic to prevent delays
      // Desktop: Home, About, Services, Contact
      // Mobile: Home, About, Services, Contact

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

      // Force contact if at the very end
      if (contentWidth > 0 && absX >= (contentWidth - windowWidth - 50)) {
        activeId = 'contact';
      }

      setCurrentSectionId(activeId);
    });
    return () => unsubscribe();
  }, [springX, windowWidth, contentWidth]);

  useEffect(() => {
    if (contentWidth === 0 || windowWidth === 0 || activeServiceId) return;

    const maxScroll = -(contentWidth - windowWidth);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      currentX.current -= delta * 0.8;
      currentX.current = Math.max(Math.min(currentX.current, 0), maxScroll);
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

      const newX = lastTouchX.current + movement * 1.5;
      currentX.current = Math.max(Math.min(newX, 0), maxScroll);
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
  }, [windowWidth, contentWidth, x, activeServiceId]);

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

  const activeServiceData = serviceData.find(s => s.id === activeServiceId);

  return (
    <div className="relative bg-[#f6f3ee] text-black font-sans selection:bg-black selection:text-white w-full h-full overflow-hidden fixed inset-0 z-0">
          <SwarmCursor
            color="#000000"
            accentColor="#000000"
            count={10}
            size={2.2}
            merge={0.28}
            glow={0.12}
            opacity={0.95}
            spread={72}
            separation={0.7}
            speed={1.5}
            wander={0.28}
            trail={0.9}
            enabled={true}
          />

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
                <About x={springX} />
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