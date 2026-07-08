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
