import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;
      
      const elements = containerRef.current.querySelectorAll('.split-item');
      if (!elements.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: containerRef
    }
  );

  const style = {
    textAlign,
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };
  const Tag = tag || 'p';

  return (
    <Tag ref={containerRef} style={style} className={`split-parent ${className}`}>
      {items.map((item, index) => {
        const content = item === ' ' ? '\u00A0' : item;
        return (
          <span
            key={index}
            className="split-item"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
              whiteSpace: item === ' ' ? 'pre' : 'normal'
            }}
          >
            {content}
            {splitType === 'words' && index < items.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
