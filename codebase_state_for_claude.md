# 📁 Current State of Portfolio Upgrades

This document compiles all key files updated or created in the portfolio project, allowing you to easily review or paste the code directly.

## 📄 File: `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error reporter to reveal runtime crashes on-screen (dev mode only)
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const reportError = (message, source, lineno, colno, error) => {
    const container = document.getElementById('error-reporter') || document.createElement('div');
    container.id = 'error-reporter';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.backgroundColor = '#ef4444';
    container.style.color = '#ffffff';
    container.style.zIndex = '9999999';
    container.style.padding = '24px';
    container.style.fontFamily = 'monospace';
    container.style.fontSize = '14px';
    container.style.lineHeight = '1.5';
    container.style.whiteSpace = 'pre-wrap';
    container.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';
    
    container.innerHTML = `
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">🔴 Runtime Error Detected:</div>
      <div><strong>Message:</strong> ${message}</div>
      <div><strong>Source:</strong> ${source || 'Unknown'} (Line ${lineno || '?'}, Col ${colno || '?'})</div>
      ${error && error.stack ? `<div style="margin-top: 12px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; overflow-x: auto;"><strong>Stack:</strong><br/>${error.stack}</div>` : ''}
    `;
    
    if (!document.getElementById('error-reporter')) {
      document.body.appendChild(container);
    }
  };

  window.onerror = reportError;
  window.onunhandledrejection = (event) => {
    reportError(
      event.reason ? event.reason.message || String(event.reason) : 'Unhandled promise rejection',
      event.reason ? event.reason.fileName : '',
      event.reason ? event.reason.lineNumber : 0,
      event.reason ? event.reason.columnNumber : 0,
      event.reason
    );
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

## 📄 File: `src/App.jsx`

```jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './components/SpotlightCard/SpotlightCard';
import DecryptedText from './components/DecryptedText/DecryptedText';
import ShinyText from './components/ShinyText/ShinyText';
import Magnet from './components/Magnet/Magnet';
import TextPressure from './components/TextPressure/TextPressure';
import FuzzyText from './components/FuzzyText/FuzzyText';
import { CardContainer, CardBody, CardItem } from './components/ThreeDCard/ThreeDCard';
import { ChromaCardContainer, ChromaCardBody, ChromaCardItem } from './components/ChromaCard/ChromaCard';
import GlitchText from './components/GlitchText/GlitchText';
import GlassTiles from './components/GlassTiles/GlassTiles';
import LightRays from './components/LightRays/LightRays';
import LogoLoop from './components/LogoLoop/LogoLoop';
import SplitText from './components/SplitText/SplitText';
import CustomCursor from './components/CustomCursor/CustomCursor';
import rakeshPhoto from './assets/rakesh-photo.jpg';
import {
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiFigma,
  SiGit,
  SiGithub,
  SiMysql,
  SiPython,
  SiTailwindcss,
  SiVite,
  SiSupabase,
  SiFastapi,
  SiMongodb
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { DiVisualstudio } from 'react-icons/di';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { node: <SiReact color="#61DAFB" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs color="#ffffff" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiHtml5 color="#E34F26" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss color="#1572B6" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiTailwindcss color="#06B6D4" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite color="#646CFF" />, title: "Vite", href: "https://vite.dev" },
  { node: <SiSupabase color="#3ECF8E" />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFastapi color="#009688" />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiMongodb color="#47A248" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <FaJava color="#007396" />, title: "Java", href: "https://www.java.com" },
  { node: <SiPython color="#3776AB" />, title: "Python", href: "https://www.python.org" },
  { node: <SiMysql color="#4479A1" />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiFigma color="#F24E1E" />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiGit color="#F05032" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub color="#ffffff" />, title: "GitHub", href: "https://github.com" },
  { node: <DiVisualstudio color="#007ACC" />, title: "VS Code", href: "https://code.visualstudio.com" }
];

const featuredTools = [
  { node: <SiReact color="#61DAFB" />, title: "React", href: "https://react.dev", color: "rgba(97, 218, 251, 0.18)" },
  { node: <SiNextdotjs color="#ffffff" />, title: "Next.js", href: "https://nextjs.org", color: "rgba(255, 255, 255, 0.18)" },
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "rgba(247, 223, 30, 0.18)" },
  { node: <SiSupabase color="#3ECF8E" />, title: "Supabase", href: "https://supabase.com", color: "rgba(62, 207, 142, 0.18)" },
  { node: <SiTailwindcss color="#06B6D4" />, title: "Tailwind", href: "https://tailwindcss.com", color: "rgba(6, 182, 212, 0.18)" }
];

export default function App() {
  const projectsSectionRef = useRef(null);
  const projectsHeaderRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);

  const [glitchTrigger, setGlitchTrigger] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    
    let ctx = gsap.context(() => {
      // Trigger site name/logo glitch at the very beginning of page load
      setGlitchTrigger(true);

      // --- 1. Page Entrance Animations (Reveal one by one on load) ---
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl.fromTo('.site-header', 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }
      );

      entranceTl.fromTo('.hero-copy .eyebrow', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

      entranceTl.fromTo('.text-pressure-wrapper', 
        { y: 40, opacity: 0, scaleY: 0.8 }, 
        { y: 0, opacity: 1, scaleY: 1, duration: 0.8 },
        '-=0.4'
      );

      entranceTl.fromTo('.hero-text', 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );

      entranceTl.fromTo('.hero-actions', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      entranceTl.fromTo('.profile-meta span', 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      entranceTl.fromTo('.profile-card-container', 
        { y: 80, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.2)' },
        '-=0.7'
      );

      // Detect prefers-reduced-motion to fall back to simple opacity fades with no translateY
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const startY = prefersReducedMotion ? 0 : 50;

      // Adjust ScrollTrigger offset dynamically for mobile viewports (e.g. iPhone SE)
      const isMobile = !mediaQuery.matches;
      const scrollStartThreshold = isMobile ? 'top bottom-=40px' : 'top bottom-=100px';

      // Helper to generate consistent scroll-driven reveals (Goal 1)
      const createScrollReveal = (triggerSelector, targetsSelector, staggerAmount = 0.15) => {
        gsap.set(targetsSelector, { opacity: 0, y: startY });

        gsap.fromTo(targetsSelector,
          { y: startY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: staggerAmount,
            scrollTrigger: {
              trigger: triggerSelector,
              start: scrollStartThreshold,
              once: true
            }
          }
        );
      };

      // Helper for secondary headings to sharpen into focus (Blur Highlight) as part of scroll reveal
      const createHeadingReveal = (triggerSelector, headingSelector) => {
        gsap.set(headingSelector, { opacity: 0, y: startY, filter: 'blur(12px)' });

        gsap.fromTo(headingSelector,
          { y: startY, opacity: 0, filter: 'blur(12px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: triggerSelector,
              start: scrollStartThreshold,
              once: true
            }
          }
        );
      };

      // --- 2. Scroll-Driven Reveals (Goal 1 & Goal 2-2: triggered on entering viewport) ---
      // About Section
      createHeadingReveal('.about-section', '.about-section h2');
      createScrollReveal('.about-section', '.about-section .eyebrow, .about-section p', 0.2);

      // Projects Section Header
      createHeadingReveal('.projects-pin-section', '.projects-header-block h2');
      createScrollReveal('.projects-pin-section', '.projects-header-block .eyebrow, .projects-header-block .scroll-hint-label', 0.15);

      // Skills Section Heading & Glass Tiles
      createHeadingReveal('.skills-section', '.skills-section h2');
      createScrollReveal('.skills-section', '.skills-section .eyebrow', 0);
      createScrollReveal('.skills-section', '.skills-section .glass-tiles-container', 0);
      createScrollReveal('.skills-section', '.skills-section .logoloop', 0);
      createScrollReveal('.skills-section .skills-grid', '.skills-section .skill-3d-wrapper', 0.15);

      // Experience Section Heading
      createHeadingReveal('#experience', '#experience h2');
      createScrollReveal('#experience', '#experience .eyebrow', 0);
      createScrollReveal('#experience .timeline', '#experience article', 0.2);

      // Contact Section
      createHeadingReveal('.contact-section', '.contact-section h2');
      createScrollReveal('.contact-section', '.contact-section .eyebrow, .contact-section p, .contact-section .contact-actions', 0.15);

      // --- 3. Pinned Projects Scroll Timeline (Desktop Only) ---
      if (!mediaQuery.matches) return;

      const section = projectsSectionRef.current;
      const header = projectsHeaderRef.current;
      const p1 = project1Ref.current;
      const p2 = project2Ref.current;
      const p3 = project3Ref.current;
      const p4 = project4Ref.current;

      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=380%',
          scrub: true,
          pin: true,
        }
      });

      tl.to(header, { opacity: 0, y: -60, filter: 'blur(8px)', duration: 0.1 }, 0);

      tl.fromTo(p1, 
        { opacity: 0, y: 120, filter: 'blur(10px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.2 }, 
        0.05
      );
      tl.to(p1, { opacity: 0, y: -120, filter: 'blur(10px)', pointerEvents: 'none', duration: 0.15 }, 0.25);

      tl.fromTo(p2, 
        { opacity: 0, y: 120, filter: 'blur(10px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.2 }, 
        0.3
      );
      tl.to(p2, { opacity: 0, y: -120, filter: 'blur(10px)', pointerEvents: 'none', duration: 0.15 }, 0.5);

      tl.fromTo(p3, 
        { opacity: 0, y: 120, filter: 'blur(10px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.2 }, 
        0.55
      );
      tl.to(p3, { opacity: 0, y: -120, filter: 'blur(10px)', pointerEvents: 'none', duration: 0.15 }, 0.75);

      tl.fromTo(p4, 
        { opacity: 0, y: 120, filter: 'blur(10px)', pointerEvents: 'none' },
        { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.25 }, 
        0.8
      );
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      {/* LightRays Backdrop */}
      <div className="bg-lightrays-wrapper">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.0}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.01}
          distortion={0.01}
        />
      </div>
      <header className="site-header">
        <Magnet padding={25} magnetStrength={3}>
          <a className="brand" href="#top" aria-label="Rakesh Kanna home">
            <GlitchText text="RK" trigger={glitchTrigger} className="brand-mark" />
            <DecryptedText text="Rakesh Kanna" animateOn="hover" speed={45} />
          </a>
        </Magnet>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <DecryptedText text="Frontend Developer" animateOn="view" speed={40} />
            </p>
            
            {/* Dynamic mouse-scalable title pressure */}
            <div className="text-pressure-wrapper" style={{ position: 'relative', height: '110px', width: '100%', marginBottom: '18px', textAlign: 'left' }}>
              <TextPressure
                text="RAKESH KANNA"
                fontFamily="Outfit"
                fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap"
                textColor="#ffffff"
                minFontSize={36}
                flex={false}
              />
            </div>

            <h1>
              <SplitText
                text="I build clean React interfaces for the web."
                className="hero-subtitle-split"
                delay={40}
                duration={0.65}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.05}
                textAlign="left"
                tag="span"
              />
            </h1>
            <p className="hero-text">
              Computer Science Engineering student focused on React.js, JavaScript,
              responsive UI, and practical user experiences. I am looking for frontend
              developer internships and entry-level roles where I can contribute, learn,
              and ship real product work.
            </p>
            <div className="hero-actions">
              <Magnet padding={15} magnetStrength={5}>
                <a className="btn btn-primary" href="#work">View Work</a>
              </Magnet>
              <Magnet padding={15} magnetStrength={5}>
                <a className="btn btn-secondary" href="Rakesh_Kanna_Resume.pdf" download>Download Resume</a>
              </Magnet>
            </div>
            <div className="profile-meta" aria-label="Profile highlights">
              <span>BE CSE 2026</span>
              <span>CGPA 8.2</span>
              <span>React.js</span>
              <span>Pollachi, India</span>
            </div>
          </div>

          <aside className="profile-card-container">
            <CardContainer containerClassName="profile-3d-wrapper" className="w-full">
              <CardBody className="profile-card">
                <CardItem translateZ={50} className="photo-wrap">
                  {!imageError ? (
                    <img 
                      src={rakeshPhoto} 
                      alt="Rakesh Kanna M" 
                      onError={() => setImageError(true)} 
                    />
                  ) : (
                    <div className="profile-placeholder">
                      <span>RK</span>
                    </div>
                  )}
                </CardItem>
                <div className="profile-card-body">
                  <CardItem translateZ={40} className="role">
                    React Frontend Developer
                  </CardItem>
                  <CardItem translateZ={60} as="h2">
                    Rakesh Kanna M
                  </CardItem>
                  <CardItem translateZ={40} as="p">
                    Available for frontend internships and fresher roles.
                  </CardItem>
                  <div className="profile-links">
                    <CardItem translateZ={50} as="span">
                      <Magnet padding={15} magnetStrength={4}>
                        <a href="mailto:12k21rakeshkannam@gmail.com">Email</a>
                      </Magnet>
                    </CardItem>
                    <CardItem translateZ={50} as="span">
                      <Magnet padding={15} magnetStrength={4}>
                        <a href="https://github.com/Rakeshkanna1" target="_blank" rel="noreferrer">GitHub</a>
                      </Magnet>
                    </CardItem>
                    <CardItem translateZ={50} as="span">
                      <Magnet padding={15} magnetStrength={4}>
                        <a href="https://www.linkedin.com/in/rakesh-kanna-649b8b2b7/" target="_blank" rel="noreferrer">LinkedIn</a>
                      </Magnet>
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </aside>
        </section>

        <section className="intro-strip" aria-label="Short summary">
          <p>
            I like building interfaces that are simple to use, responsive on every screen,
            and easy for teams to maintain.
          </p>
          <div>
            <span>React Hooks</span>
            <span>REST APIs</span>
            <span>Responsive CSS</span>
          </div>
        </section>

        <section className="section about-section" id="about">
          <p className="eyebrow">About</p>
          <div className="about-grid">
            <h2>A frontend learner with a product mindset.</h2>
            <p>
              My current work centers on React applications, API-driven interfaces,
              and clean layouts. I care about making pages feel understandable, fast,
              and polished without adding unnecessary complexity. Alongside frontend,
              I have exposure to AWS from an internship and a foundation in Java,
              MySQL, OOP, and problem solving.
            </p>
          </div>
        </section>

        {/* Staged pin scroll projects section */}
        <section className="projects-pin-section" id="work" ref={projectsSectionRef}>
          <div className="projects-sticky-wrapper">
            
            <div className="projects-header-block" ref={projectsHeaderRef}>
              <p className="eyebrow">Selected Work</p>
              <h2>Projects</h2>
              <p className="scroll-hint-label">Scroll to browse projects one-by-one</p>
            </div>

            <div className="project-slides-wrap">
              <div className="project-slide-container" ref={project1Ref}>
                <ChromaCardContainer containerClassName="project-3d-wrapper" className="w-full">
                  <ChromaCardBody>
                    <SpotlightCard className="project-spotlight-card" spotlightColor="rgba(59, 130, 246, 0.12)">
                      <ChromaCardItem translateZ={40} className="project-number">
                        <FuzzyText fontSize="1.45rem" color="var(--clay)" hoverIntensity={0.6} baseIntensity={0.12} enableHover={true} glitchMode={true}>
                          01
                        </FuzzyText>
                      </ChromaCardItem>
                      <div className="project-content">
                        <h3>
                          <ChromaCardItem translateZ={60} style={{ display: 'inline-block' }}>
                            <ShinyText text="Rakexura Store" speed={3.5} shineColor="#a5f3fc" color="#ffffff" />
                          </ChromaCardItem>
                        </h3>
                        <ChromaCardItem translateZ={45} as="p">
                          A production-oriented game marketplace built with Next.js 15 App Router and React 19.
                          Integrates Supabase Auth, PostgreSQL, Storage, Realtime tables, Framer Motion transitions, and Zustand state management.
                        </ChromaCardItem>
                        <ChromaCardItem translateZ={50} className="project-tags">
                          <span>Next.js 15</span>
                          <span>Supabase</span>
                          <span>Tailwind CSS v4</span>
                          <span>Framer Motion</span>
                        </ChromaCardItem>
                      </div>
                    </SpotlightCard>
                  </ChromaCardBody>
                </ChromaCardContainer>
              </div>

              <div className="project-slide-container" ref={project2Ref}>
                <ChromaCardContainer containerClassName="project-3d-wrapper" className="w-full">
                  <ChromaCardBody>
                    <SpotlightCard className="project-spotlight-card" spotlightColor="rgba(59, 130, 246, 0.12)">
                      <ChromaCardItem translateZ={40} className="project-number">
                        <FuzzyText fontSize="1.45rem" color="var(--clay)" hoverIntensity={0.6} baseIntensity={0.12} enableHover={true} glitchMode={true}>
                          02
                        </FuzzyText>
                      </ChromaCardItem>
                      <div className="project-content">
                        <h3>
                          <ChromaCardItem translateZ={60} style={{ display: 'inline-block' }}>
                            <ShinyText text="Rakexura Price Tracker" speed={3.5} shineColor="#a5f3fc" color="#ffffff" />
                          </ChromaCardItem>
                        </h3>
                        <ChromaCardItem translateZ={45} as="p">
                          A FastAPI and React monorepo tracking marketplace game prices.
                          Features automated database scraping pipelines, MongoDB Atlas storage, and interactive price history graphs.
                        </ChromaCardItem>
                        <ChromaCardItem translateZ={50} className="project-tags">
                          <span>FastAPI</span>
                          <span>React & Vite</span>
                          <span>MongoDB</span>
                          <span>Tailwind CSS</span>
                        </ChromaCardItem>
                      </div>
                    </SpotlightCard>
                  </ChromaCardBody>
                </ChromaCardContainer>
              </div>

              <div className="project-slide-container" ref={project3Ref}>
                <ChromaCardContainer containerClassName="project-3d-wrapper" className="w-full">
                  <ChromaCardBody>
                    <SpotlightCard className="project-spotlight-card" spotlightColor="rgba(59, 130, 246, 0.12)">
                      <ChromaCardItem translateZ={40} className="project-number">
                        <FuzzyText fontSize="1.45rem" color="var(--clay)" hoverIntensity={0.6} baseIntensity={0.12} enableHover={true} glitchMode={true}>
                          03
                        </FuzzyText>
                      </ChromaCardItem>
                      <div className="project-content">
                        <h3>
                          <ChromaCardItem translateZ={60} style={{ display: 'inline-block' }}>
                            <ShinyText text="Rockstar Bot" speed={3.5} shineColor="#a5f3fc" color="#ffffff" />
                          </ChromaCardItem>
                        </h3>
                        <ChromaCardItem translateZ={45} as="p">
                          An automated Telegram bot that connects to the Gmail API using OAuth2, retrieves 2FA logins via custom email filters, and delivers them instantly to user groups.
                        </ChromaCardItem>
                        <ChromaCardItem translateZ={50} className="project-tags">
                          <span>Python</span>
                          <span>Telegram API</span>
                          <span>Gmail API</span>
                          <span>SQLite</span>
                        </ChromaCardItem>
                      </div>
                    </SpotlightCard>
                  </ChromaCardBody>
                </ChromaCardContainer>
              </div>

              <div className="project-slide-container" ref={project4Ref}>
                <ChromaCardContainer containerClassName="project-3d-wrapper" className="w-full">
                  <ChromaCardBody>
                    <SpotlightCard className="project-spotlight-card" spotlightColor="rgba(59, 130, 246, 0.12)">
                      <ChromaCardItem translateZ={40} className="project-number">
                        <FuzzyText fontSize="1.45rem" color="var(--clay)" hoverIntensity={0.6} baseIntensity={0.12} enableHover={true} glitchMode={true}>
                          04
                        </FuzzyText>
                      </ChromaCardItem>
                      <div className="project-content">
                        <h3>
                          <ChromaCardItem translateZ={60} style={{ display: 'inline-block' }}>
                            <ShinyText text="React Weather App" speed={3.5} shineColor="#a5f3fc" color="#ffffff" />
                          </ChromaCardItem>
                        </h3>
                        <ChromaCardItem translateZ={45} as="p">
                          A premium, dark-mode weather dashboard built with React 18 and Vite.
                          Features WebGL liquid Aurora background rendering, interactive particle overlays, and glassmorphic hover animations.
                        </ChromaCardItem>
                        <ChromaCardItem translateZ={50} className="project-tags">
                          <span>React & Vite</span>
                          <span>WebGL (OGL)</span>
                          <span>Glassmorphism</span>
                          <span>OpenWeatherMap API</span>
                        </ChromaCardItem>
                      </div>
                    </SpotlightCard>
                  </ChromaCardBody>
                </ChromaCardContainer>
              </div>
            </div>

          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools I work with</h2>
          </div>

          {/* Curated featured tools grid (Glass Tiles) */}
          <GlassTiles items={featuredTools} />

          <div style={{ margin: '32px 0 48px', overflow: 'hidden' }}>
            <LogoLoop
              logos={techLogos}
              speed={45}
              direction="left"
              logoHeight={40}
              gap={50}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#09090e"
              ariaLabel="Technology stack"
            />
          </div>

          <div className="skills-grid">
            <CardContainer containerClassName="skill-3d-wrapper" className="w-full">
              <CardBody className="skill-spotlight-card">
                <CardItem translateZ={40} as="h3">Frontend</CardItem>
                <CardItem translateZ={30} as="p">React.js, JavaScript, HTML5, CSS3, responsive design</CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer containerClassName="skill-3d-wrapper" className="w-full">
              <CardBody className="skill-spotlight-card">
                <CardItem translateZ={40} as="h3">Design and Tools</CardItem>
                <CardItem translateZ={30} as="p">Figma, Git, GitHub, VS Code</CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer containerClassName="skill-3d-wrapper" className="w-full">
              <CardBody className="skill-spotlight-card">
                <CardItem translateZ={40} as="h3">Programming</CardItem>
                <CardItem translateZ={30} as="p">Java, MySQL, OOP, data structures, problem solving</CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Education and internship</h2>
          </div>
          <div className="timeline">
            <article>
              <span>June 2024 to July 2024</span>
              <h3>Cloud Computing Intern, Gateway Solutions</h3>
              <p>
                Assisted with AWS-based cloud infrastructure deployment and resource
                optimization while learning real project workflows and team collaboration.
              </p>
            </article>
            <article>
              <span>Graduating 2026</span>
              <h3>BE Computer Science and Engineering</h3>
              <p>
                Dr. Mahalingam College of Engineering and Technology, Pollachi.
                Current CGPA: 8.2.
              </p>
            </article>
            <article>
              <span>NPTEL Swayam</span>
              <h3>Certifications</h3>
              <p>The Joy of Computing using Python and Soft Skills Certification.</p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let us build something useful.</h2>
            <p>
              Open to frontend developer internships, UI developer intern roles,
              and fresher software engineering opportunities.
            </p>
          </div>
          <div className="contact-actions">
            <Magnet padding={15} magnetStrength={4}>
              <a className="btn btn-primary" href="mailto:12k21rakeshkannam@gmail.com">Email Me</a>
            </Magnet>
            <Magnet padding={15} magnetStrength={4}>
              <a className="btn btn-secondary" href="tel:+916369628215">Call</a>
            </Magnet>
            <Magnet padding={15} magnetStrength={4}>
              <a className="text-link" href="https://github.com/Rakeshkanna1" target="_blank" rel="noreferrer">GitHub</a>
            </Magnet>
            <Magnet padding={15} magnetStrength={4}>
              <a className="text-link" href="https://www.linkedin.com/in/rakesh-kanna-649b8b2b7/" target="_blank" rel="noreferrer">LinkedIn</a>
            </Magnet>
          </div>
        </section>
      </main>

      <footer>
        <span>Rakesh Kanna M</span>
        <span>Frontend Developer</span>
      </footer>
    </div>
  );
}

```

---

## 📄 File: `src/index.css`

```css
:root {
  --ink: #f8fafc;
  --body: #cbd5e1;
  --muted: #64748b;
  --soft: #0b0f19;
  --paper: #030712;
  --white: #ffffff;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-strong: rgba(255, 255, 255, 0.06);
  --line: rgba(255, 255, 255, 0.08);
  --accent: #f8fafc;
  --accent-dark: #94a3b8;
  --clay: #e2e8f0;
  --navy: #e2e8f0;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: #09090e;
  font-family: "Inter", Arial, sans-serif;
  line-height: 1.65;
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Background Wrappers */
.bg-lightrays-wrapper {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.38;
}
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px clamp(20px, 6vw, 72px);
  background: rgba(3, 7, 18, 0.75);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  font-family: "Outfit", sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.5px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: #030712;
  background: var(--accent);
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 800;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--body);
  font-size: 0.94rem;
  font-weight: 600;
}

.nav-links a {
  transition: color 0.2s ease;
}

.nav-links a:hover,
.text-link:hover {
  color: var(--accent);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(310px, 410px);
  align-items: center;
  gap: clamp(34px, 7vw, 92px);
  min-height: calc(100vh - 77px);
  padding: clamp(46px, 8vw, 94px) clamp(20px, 6vw, 72px) 58px;
}

.hero-copy {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--accent);
  font-family: "Outfit", sans-serif;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  overflow-wrap: anywhere;
}

h1 {
  max-width: 780px;
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(2.45rem, 5.4vw, 4.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.8rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -1px;
}

h3 {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.hero-text {
  max-width: 680px;
  margin: 24px 0 0;
  color: var(--body);
  font-size: 1.08rem;
}

.hero-actions,
.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 11px 22px;
  border: 1px solid transparent;
  font-family: "Outfit", sans-serif;
  font-weight: 800;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  color: #0f1318;
  background: var(--accent);
  box-shadow: 0 4px 20px rgba(0, 245, 212, 0.2);
}

.btn-primary:hover {
  background: var(--accent-dark);
  box-shadow: 0 6px 24px rgba(0, 245, 212, 0.35);
}

.btn-secondary {
  color: var(--ink);
  background: transparent;
  border-color: var(--line);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.2);
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.profile-meta span,
.project-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  border-radius: 8px;
  padding: 7px 12px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  font-size: 0.88rem;
  font-weight: 600;
}

.profile-card {
  overflow: hidden;
  align-self: stretch;
  max-width: 430px;
  margin-left: auto;
  background: linear-gradient(180deg, var(--surface-strong), var(--surface));
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.photo-wrap {
  background: #030712;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  display: block;
}

.profile-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: linear-gradient(135deg, #111827, #1f2937);
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Outfit', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  user-select: none;
}

.photo-wrap img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.5s ease;
}

.profile-card:hover .photo-wrap img {
  transform: scale(1.03);
}

.profile-card-body {
  padding: 24px;
}

.profile-card-body .role {
  margin: 0 0 8px;
  color: var(--clay);
  font-family: "Outfit", sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-card-body h2 {
  font-size: 1.55rem;
}

.profile-card-body p:not(.role) {
  margin: 10px 0 0;
  color: var(--body);
}

.profile-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.profile-links a {
  color: var(--accent);
  font-weight: 700;
  transition: opacity 0.2s;
}

.profile-links a:hover {
  opacity: 0.8;
}

.intro-strip {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  margin: 0 clamp(20px, 6vw, 72px);
  padding: 24px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.intro-strip p {
  max-width: 760px;
  margin: 0;
  color: var(--navy);
  font-size: 1.04rem;
  font-weight: 700;
}

.intro-strip div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.intro-strip span {
  color: var(--body);
  font-size: 0.9rem;
  font-weight: 800;
}

.section {
  padding: clamp(48px, 7vw, 88px) clamp(20px, 6vw, 72px);
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1fr);
  gap: clamp(24px, 6vw, 82px);
}

.about-grid p {
  margin: 0;
  color: var(--body);
  font-size: 1.07rem;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
}

.project-list {
  display: grid;
  gap: 16px;
}

/* Custom layout mapping for SpotlightCards as project cards */
.project-spotlight-card {
  display: grid !important;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 24px;
  /* Merge glass frosted style */
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid var(--line) !important;
  border-radius: 12px !important;
  padding: 24px !important;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.project-spotlight-card:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 245, 212, 0.24) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.project-number {
  color: var(--clay);
  font-family: "Outfit", sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
}

.project-content p {
  max-width: 760px;
  margin: 10px 0 0;
  color: var(--body);
  font-size: 0.98rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}

.skills-section {
  background: rgba(3, 7, 18, 0.2);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* Custom styles for SpotlightCards inside skills list */
.skill-spotlight-card {
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid var(--line) !important;
  border-radius: 12px !important;
  padding: 28px !important;
  text-align: left;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.skill-spotlight-card:hover {
  transform: translateY(-3px);
  border-color: rgba(217, 70, 239, 0.2) !important;
}

.skill-spotlight-card h3 {
  margin-bottom: 12px;
  color: #ffffff;
}

.skills-grid p,
.timeline p,
.contact-section p {
  color: var(--body);
}

.skills-grid p {
  margin-bottom: 0;
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline article {
  display: grid;
  grid-template-columns: minmax(170px, 0.28fr) minmax(0, 1fr);
  gap: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 26px;
}

.timeline span {
  color: var(--clay);
  font-family: "Outfit", sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
}

.timeline h3 {
  grid-column: 2;
}

.timeline p {
  grid-column: 2;
  margin: 6px 0 0;
  color: var(--body);
}

.contact-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(270px, 0.58fr);
  gap: clamp(24px, 5vw, 66px);
  align-items: center;
  margin: clamp(24px, 5vw, 72px);
  padding: clamp(30px, 5vw, 58px);
  color: var(--ink);
  background:
    radial-gradient(circle at 10% 20%, rgba(217, 70, 239, 0.08), transparent 45%),
    rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid var(--line);
  backdrop-filter: blur(20px);
}

.contact-section .eyebrow {
  color: rgba(255, 255, 255, 0.76);
}

.contact-section p {
  color: rgba(255, 255, 255, 0.72);
}

.contact-section .btn-secondary {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.24);
}

.contact-section .text-link {
  color: var(--white);
  font-weight: 800;
}

footer {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 24px clamp(20px, 6vw, 72px);
  color: var(--body);
  border-top: 1px solid var(--line);
  font-weight: 700;
}

@media (max-width: 980px) {
  .hero,
  .about-grid,
  .contact-section {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    gap: 48px;
  }

  .profile-card {
    width: min(100%, 430px);
    margin: 0 auto;
  }

  .intro-strip,
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .intro-strip div {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .site-header {
    position: static;
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .hero {
    padding-top: 36px;
  }

  .project-spotlight-card,
  .timeline article {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .timeline h3,
  .timeline p {
    grid-column: auto;
  }

  .contact-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .contact-actions .btn,
  .contact-actions .text-link {
    width: 100%;
  }

  footer {
    flex-direction: column;
  }
}

@media (max-width: 430px) {
  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

/* Staged Scroll Projects Layout */
.projects-pin-section {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.projects-sticky-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 24px;
}

.projects-header-block {
  text-align: center;
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.scroll-hint-label {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 12px;
  font-weight: 500;
  animation: pulse-hint 2s infinite ease-in-out;
}

@keyframes pulse-hint {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.project-slides-wrap {
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 60vh;
  display: grid;
  place-items: center;
  margin-top: 10vh;
}

.project-slide-container {
  position: absolute;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.project-slide-container .project-spotlight-card {
  width: 100%;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .projects-pin-section {
    height: auto !important;
  }
  .projects-sticky-wrapper {
    position: relative !important;
    height: auto !important;
    padding: 48px 16px !important;
  }
  .projects-header-block {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    margin-bottom: 32px;
  }
  .project-slides-wrap {
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 16px;
    margin-top: 0 !important;
  }
  .project-slide-container {
    position: relative !important;
    width: 100% !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }
}


```

---

## 📄 File: `src/components/CustomCursor/CustomCursor.jsx`

```jsx
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

```

---

## 📄 File: `src/components/CustomCursor/CustomCursor.css`

```css
/* Custom Cursor styling */
.custom-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: normal;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-cursor-wrapper.visible {
  opacity: 1;
}

/* Hide default cursor site-wide */
html, body {
  cursor: none !important;
}

a, button, [role="button"], .cursor-target, input, textarea {
  cursor: none !important;
}

/* Inner dot */
.custom-cursor-dot {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  transform: translate3d(0, 0, 0);
}

/* Outer glass ring */
.custom-cursor-ring {
  position: absolute;
  top: -18px;
  left: -18px;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  background-color: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(1.5px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 5;
  transform: translate3d(0, 0, 0);
  transition: width 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              height 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              top 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              left 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.22s ease,
              border-color 0.22s ease;
}

/* Hover morph state */
.custom-cursor-wrapper.hovered .custom-cursor-ring {
  width: 48px;
  height: 48px;
  top: -24px;
  left: -24px;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
}

.custom-cursor-wrapper.hovered .custom-cursor-dot {
  transform: scale(0);
  transition: transform 0.2s ease;
}

@media (pointer: coarse) {
  /* Disable on touch devices */
  .custom-cursor-wrapper {
    display: none !important;
  }
  html, body, a, button, [role="button"], .cursor-target {
    cursor: auto !important;
  }
}

```

---

## 📄 File: `src/components/ChromaCard/ChromaCard.jsx`

```jsx
import React, { createContext, useContext, useRef, useState } from "react";
import "./ChromaCard.css";

const MouseEnterContext = createContext(undefined);

export const ChromaCardContainer = ({
  children,
  className = "",
  containerClassName = ""
}) => {
  const containerRef = useRef(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // rotation strength
    const y = (e.clientY - top - height / 2) / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEnter(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={`chroma-container-wrapper ${containerClassName}`}
        style={{
          perspective: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`chroma-container ${className} ${isMouseEnter ? "hovered" : ""}`}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
            position: "relative"
          }}
        >
          {/* Chromatic aberration glow layers */}
          <div className="chroma-layer red" />
          <div className="chroma-layer cyan" />
          <div className="chroma-layer yellow" />
          
          <div style={{ transformStyle: "preserve-3d", position: "relative", zIndex: 2 }}>
            {children}
          </div>
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const ChromaCardBody = ({
  children,
  className = ""
}) => {
  return (
    <div
      className={className}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </div>
  );
};

export const ChromaCardItem = ({
  as: Tag = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const contextValue = useContext(MouseEnterContext);
  const isMouseEnter = contextValue ? contextValue[0] : false;

  React.useEffect(() => {
    if (!ref.current) return;
    if (isMouseEnter) {
      ref.current.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEnter, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.2s ease-out",
        display: "block",
        ...rest.style
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

```

---

## 📄 File: `src/components/ChromaCard/ChromaCard.css`

```css
/* Chroma Card styling */
.chroma-container-wrapper {
  width: 100%;
}

.chroma-container {
  width: 100%;
  border-radius: 16px;
  overflow: visible;
}

/* Background layers for chromatic edge effect */
.chroma-layer {
  position: absolute;
  inset: -1px;
  border-radius: 16px;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: screen;
  transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

.chroma-layer.red {
  border: 1.5px solid rgba(239, 68, 68, 0.65);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.20);
}

.chroma-layer.cyan {
  border: 1.5px solid rgba(6, 182, 212, 0.65);
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.20);
}

.chroma-layer.yellow {
  border: 1.5px solid rgba(234, 179, 8, 0.65);
  box-shadow: 0 0 8px rgba(234, 179, 8, 0.20);
}

/* Hover active states */
.chroma-container.hovered .chroma-layer {
  opacity: 0.55;
}

.chroma-container.hovered .chroma-layer.red {
  transform: translate3d(-2px, -1.5px, 0);
}

.chroma-container.hovered .chroma-layer.cyan {
  transform: translate3d(2px, 1.5px, 0);
}

.chroma-container.hovered .chroma-layer.yellow {
  transform: translate3d(0px, -2px, 0);
}

```

---

## 📄 File: `src/components/GlitchText/GlitchText.jsx`

```jsx
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

```

---

## 📄 File: `src/components/GlitchText/GlitchText.css`

```css
.glitch-text {
  position: relative;
  display: inline-block;
  color: #ffffff;
}

.glitch-text.glitching::before,
.glitch-text.glitching::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #09090e; /* Matte black background to mask trail */
  color: #ffffff;
  overflow: hidden;
}

.glitch-text.glitching::before {
  left: 2px;
  text-shadow: -1.5px 0 rgba(239, 68, 68, 0.95); /* matching silver/matte red split */
  clip: rect(10px, 9999px, 45px, 0);
  animation: glitch-anim 0.35s infinite linear alternate-reverse;
}

.glitch-text.glitching::after {
  left: -2px;
  text-shadow: -1.5px 0 rgba(6, 182, 212, 0.95), 0 1px rgba(6, 182, 212, 0.95); /* cyan split */
  clip: rect(50px, 9999px, 120px, 0);
  animation: glitch-anim-2 0.35s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(12px, 9999px, 50px, 0); }
  20% { clip: rect(25px, 9999px, 8px, 0); }
  40% { clip: rect(60px, 9999px, 70px, 0); }
  60% { clip: rect(8px, 9999px, 45px, 0); }
  80% { clip: rect(80px, 9999px, 30px, 0); }
  100% { clip: rect(35px, 9999px, 75px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(35px, 9999px, 15px, 0); }
  20% { clip: rect(8px, 9999px, 80px, 0); }
  40% { clip: rect(70px, 9999px, 35px, 0); }
  60% { clip: rect(25px, 9999px, 50px, 0); }
  80% { clip: rect(3px, 9999px, 60px, 0); }
  100% { clip: rect(60px, 9999px, 8px, 0); }
}

```

---

## 📄 File: `src/components/GlassTiles/GlassTiles.jsx`

```jsx
import React from 'react';
import './GlassTiles.css';

export default function GlassTiles({ items = [] }) {
  return (
    <div className="glass-tiles-container">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-tile"
        >
          <div className="glass-tile-glow" style={{ backgroundColor: item.color }} />
          <div className="glass-tile-content">
            <span className="glass-tile-icon" style={{ color: item.color }}>
              {item.node}
            </span>
            <span className="glass-tile-title">{item.title}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

```

---

## 📄 File: `src/components/GlassTiles/GlassTiles.css`

```css
.glass-tiles-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns for React, Next.js, FastAPI, Supabase, Tailwind */
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
}

.glass-tile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  text-decoration: none;
  color: #ffffff;
  overflow: hidden;
  transition: border-color 0.25s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.25s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.glass-tile:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
}

.glass-tile-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 1;
}

.glass-tile:hover .glass-tile-glow {
  opacity: 0.18;
}

.glass-tile-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2;
}

.glass-tile-icon {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.glass-tile:hover .glass-tile-icon {
  transform: scale(1.15);
}

.glass-tile-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 1023px) {
  .glass-tiles-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 639px) {
  .glass-tiles-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

```

---

