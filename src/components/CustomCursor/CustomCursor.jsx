import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor({ targetSelector = 'a, button, [role="button"], .cursor-target' }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor site-wide
    document.documentElement.style.cursor = 'none';

    // GSAP quickSetters for high performance 120fps hardware-accelerated movement
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth spring physics for trail lag
    const onTick = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      ringPos.x += (mouse.x - ringPos.x) * dt;
      ringPos.y += (mouse.y - ringPos.y) * dt;
      setRingX(ringPos.x);
      setRingY(ringPos.y);
    };

    gsap.ticker.add(onTick);

    const handleMouseEnterTarget = () => setIsHovered(true);
    const handleMouseLeaveTarget = () => setIsHovered(false);

    const updateListeners = () => {
      const elements = document.querySelectorAll(targetSelector);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterTarget);
        el.addEventListener('mouseleave', handleMouseLeaveTarget);
      });
    };

    updateListeners();

    // Use MutationObserver to watch for dynamically loaded DOM elements
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      gsap.ticker.remove(onTick);
      document.documentElement.style.cursor = 'auto';
      observer.disconnect();

      const elements = document.querySelectorAll(targetSelector);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterTarget);
        el.removeEventListener('mouseleave', handleMouseLeaveTarget);
      });
    };
  }, [targetSelector, isVisible]);

  return (
    <div className={`custom-cursor-wrapper ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}>
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
