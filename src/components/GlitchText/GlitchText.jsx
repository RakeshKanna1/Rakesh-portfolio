import { useState, useEffect } from 'react';
import './GlitchText.css';

export default function GlitchText({ text, className = '', trigger = false }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <span className={`glitch-text ${isGlitching ? 'glitching' : ''} ${className}`} data-text={text}>
      {text}
    </span>
  );
}
