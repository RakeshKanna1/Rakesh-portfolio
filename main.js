// ==========================================================================
// RAKESH KANNA - PREMIUM PORTFOLIO INTERACTIVE SCRIPTS
// ==========================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  init3DMeshBackground();
  initSpotlightAndTiltCards();
  initMagneticElements();
  initScrollProgressBar();
  initTextDecryptEffect();
  initProjectsFilter();
  initStatsCounter();
  initMobileMenu();
  initActiveNavLink();
  initScrollAnimations();
  initContactForm();
});

/* ==========================================================================
   0. SCREEN LOADER OVERLAY
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader-overlay');
  const bar = document.getElementById('loader-bar');
  const percentEl = document.getElementById('loader-percentage');
  
  if (!loader || !bar || !percentEl) return;

  let progress = 0;
  const interval = setInterval(() => {
    // Staggered incremental progress loader
    progress += Math.floor(Math.random() * 15) + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Load completed - Fade out loader and trigger hero reveals
      setTimeout(() => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            loader.style.display = 'none';
            // Start the page entrances
            triggerHeroEntrance();
          }
        });
      }, 300);
    }
    
    bar.style.width = `${progress}%`;
    percentEl.textContent = `${progress}%`;
  }, 90);
}

/* ==========================================================================
   1. CUSTOM MORPHING CURSOR WITH LABELS
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  const cText = document.getElementById('cursor-text');
  
  if (!cursor || !dot || !cText) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
      isMoving = true;
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    const delay = 6; // slightly faster trail
    cursorX += (mouseX - cursorX) / delay;
    cursorY += (mouseY - cursorY) / delay;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
    isMoving = false;
  });

  // Track hover elements with morphing cursor label
  function refreshCursorHover() {
    const hoverElements = document.querySelectorAll('[data-cursor-text], a, button, input, textarea, .filter-tab');
    
    hoverElements.forEach(el => {
      el.removeEventListener('mouseenter', addHoverClass);
      el.removeEventListener('mouseleave', removeHoverClass);
      
      el.addEventListener('mouseenter', addHoverClass);
      el.addEventListener('mouseleave', removeHoverClass);
    });
  }
  
  function addHoverClass(e) {
    const textVal = e.currentTarget.getAttribute('data-cursor-text') || 'VIEW';
    cText.textContent = textVal;
    document.body.classList.add('hovering-link');
    
    // Scale dot down to zero
    gsap.to(dot, { scale: 0, duration: 0.15 });
  }
  
  function removeHoverClass() {
    document.body.classList.remove('hovering-link');
    cText.textContent = '';
    
    // Restore dot scale
    gsap.to(dot, { scale: 1, duration: 0.15 });
  }

  refreshCursorHover();
  window.refreshCursorHover = refreshCursorHover;
}

/* ==========================================================================
   2. INTERACTIVE 3D MESH WAVE GRID BACKGROUND
   ========================================================================== */
function init3DMeshBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Grid sizing
  const cols = 26;
  const rows = 26;
  const spacing = 50;
  const grid = [];
  const focalLength = 300; // perspective depth factor
  let time = 0;
  let mouse = { x: 0, y: 0, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    // Translate mouse coordinates to relative grid-center coordinates
    mouse.x = e.clientX - width / 2;
    mouse.y = e.clientY - height / 2;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Populate 3D grid points
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push({
        baseX: (c - cols / 2) * spacing,
        baseY: (r - rows / 2) * spacing,
        x: 0, y: 0, z: 0,
        indexC: c, indexR: r
      });
    }
  }

  function drawMesh() {
    ctx.clearRect(0, 0, width, height);
    time += 0.02;

    const rotX = 0.5; // Rotate grid slightly in 3D space
    const rotY = 0.3 + (mouse.active ? (mouse.x / width) * 0.2 : 0);

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    const projectedPoints = [];

    // Calculate 3D points
    grid.forEach(p => {
      // 3D mathematical sine waves
      const d = Math.hypot(p.baseX, p.baseY);
      let z = Math.sin(d / 120 - time * 1.5) * 20;

      // Mouse interactive gravity-well displacement
      if (mouse.active) {
        const distToMouse = Math.hypot(p.baseX - mouse.x, p.baseY - mouse.y);
        if (distToMouse < 220) {
          const attraction = (1 - distToMouse / 220) * 35;
          z -= attraction; // deform mesh downwards
        }
      }

      // Rotate around Y axis
      let x1 = p.baseX * cosY - z * sinY;
      let z1 = z * cosY + p.baseX * sinY;

      // Rotate around X axis
      let y2 = p.baseY * cosX - z1 * sinX;
      let z2 = z1 * cosX + p.baseY * sinX;

      // Translate 3D coordinates using perspective divide
      const scale = focalLength / (focalLength + z2 + 250);
      const projX = x1 * scale + width / 2;
      const projY = y2 * scale + height / 2;

      projectedPoints.push({ x: projX, y: projY, scale, r: p.indexR, c: p.indexC });
    });

    // Draw lines connecting points (forming a wireframe mesh grid)
    for (let i = 0; i < projectedPoints.length; i++) {
      const p1 = projectedPoints[i];

      // Draw dot
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, Math.max(p1.scale * 1.8, 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 212, ${Math.max(p1.scale * 0.35, 0.05)})`;
      ctx.fill();

      // Connect to right neighbor
      if (p1.c < cols - 1) {
        const p2 = projectedPoints[i + 1];
        drawLine(p1, p2);
      }

      // Connect to bottom neighbor
      if (p1.r < rows - 1) {
        const p2 = projectedPoints[i + cols];
        drawLine(p1, p2);
      }
    }

    requestAnimationFrame(drawMesh);
  }

  function drawLine(p1, p2) {
    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    // Hide extremely stretched borders
    if (dist > spacing * 2.5) return;

    const avgScale = (p1.scale + p2.scale) / 2;
    const alpha = Math.max(avgScale * 0.1, 0.01);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
    ctx.lineWidth = 0.55;
    ctx.stroke();
  }

  drawMesh();
}

/* ==========================================================================
   3. SPOTLIGHT & 3D TILT EFFECT
   ========================================================================== */
function initSpotlightAndTiltCards() {
  const cards = document.querySelectorAll('.card-spotlight');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = -(y - centerY) / (centerY / 8); 
      const tiltY = (x - centerX) / (centerX / 8);

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   4. MAGNETIC BUTTONS & BUTTON PULL
   ========================================================================== */
function initMagneticElements() {
  const magneticItems = document.querySelectorAll('.btn, .social-pills a, .brand, .contact-icon');

  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(item, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.45)'
      });
    });
  });
}

/* ==========================================================================
   5. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================================================
   6. TEXT DECRYPT CYpher EFFECT
   ========================================================================== */
function initTextDecryptEffect() {
  const elements = document.querySelectorAll('.decrypt-effect');

  const decrypt = (el) => {
    const targetText = el.getAttribute('data-text') || el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*()_-+=';
    const totalSteps = 15;
    let step = 0;

    const interval = setInterval(() => {
      let result = '';
      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === ' ') {
          result += ' ';
          continue;
        }

        const progress = step / totalSteps;
        if (i / targetText.length < progress) {
          result += targetText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result;
      step++;

      if (step > totalSteps) {
        clearInterval(interval);
        el.textContent = targetText;
      }
    }, 45);
  };

  elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      decrypt(el);
    });
  });
  
  // Make decrypt accessible globally
  window.decryptText = decrypt;
}

/* ==========================================================================
   7. PROJECTS FILTER SYSTEM
   ========================================================================== */
function initProjectsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          gsap.fromTo(card, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
          );
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
      
      setTimeout(() => ScrollTrigger.refresh(), 450);
    });
  });
}

/* ==========================================================================
   8. STATS NUMBER COUNT TICKER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2;
        
        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: targetValue,
          duration: duration,
          ease: 'power1.out',
          onUpdate: () => {
            el.textContent = Math.floor(countObj.val) + (el.textContent.includes('+') || targetValue >= 100 ? '+' : '');
          }
        });
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   9. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-menu-open');
    });
  });
}

/* ==========================================================================
   10. ACTIVE NAV LINK ON SCROLL
   ========================================================================== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   11. GSAP SCROLL REVEALS & PAGE ENTRANCE
   ========================================================================== */
function initScrollAnimations() {
  // Initially set up opacity for reveals
  gsap.set('.site-header', { y: -40, opacity: 0 });
  gsap.set('.availability-badge', { y: 20, opacity: 0 });
  gsap.set('.hero-title .greeting', { y: 20, opacity: 0 });
  gsap.set('.hero-title .name', { y: 30, opacity: 0 });
  gsap.set('.hero-subtitle', { y: 20, opacity: 0 });
  gsap.set('.hero-description', { y: 20, opacity: 0 });
  gsap.set('.hero-actions', { y: 20, opacity: 0 });
  gsap.set('.profile-meta span', { y: 15, opacity: 0 });
  gsap.set('.hero-visual', { scale: 0.95, opacity: 0 });

  // Section reveals
  const revealSections = document.querySelectorAll('.section');
  revealSections.forEach(sec => {
    const title = sec.querySelector('.section-title');
    const eyebrow = sec.querySelector('.section-eyebrow');
    const elements = sec.querySelectorAll('.about-grid, .skills-grid, .projects-grid, .timeline, .contact-grid');

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top bottom-=80px',
        once: true
      }
    });

    if (eyebrow) revealTl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
    if (title) revealTl.fromTo(title, { opacity: 0, y: 20, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, '-=0.25');
    if (elements.length) revealTl.fromTo(elements, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.3');
  });
}

function triggerHeroEntrance() {
  // Animate header and decrypt hero name
  gsap.to('.site-header', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  });

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  heroTl.to('.availability-badge', { y: 0, opacity: 1, duration: 0.6 }, 0.1)
        .to('.hero-title .greeting', { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
        .to('.hero-title .name', { 
          y: 0, 
          opacity: 1, 
          duration: 0.7,
          onComplete: () => {
            const heroTitleName = document.querySelector('.hero-title .name');
            if (heroTitleName && window.decryptText) {
              window.decryptText(heroTitleName);
            }
          }
        }, '-=0.4')
        .to('.hero-subtitle', { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .to('.hero-description', { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .to('.hero-actions', { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
        .to('.profile-meta span', { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, '-=0.3')
        .to('.hero-visual', { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.2)' }, 0.3);
}

/* ==========================================================================
   12. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const errorElements = form.querySelectorAll('.error-msg');
    errorElements.forEach(err => err.textContent = '');
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (!name.value.trim()) {
      document.getElementById('name-error').textContent = 'Name is required.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      document.getElementById('email-error').textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      document.getElementById('email-error').textContent = 'Please enter a valid email.';
      isValid = false;
    }

    if (!message.value.trim()) {
      document.getElementById('message-error').textContent = 'Message details are required.';
      isValid = false;
    }

    if (!isValid) return;

    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('span');
    const spinner = submitBtn.querySelector('.submit-spinner');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    spinner.style.display = 'inline-block';

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      spinner.style.display = 'none';
      
      const successBanner = document.getElementById('success-message');
      successBanner.style.display = 'block';
      form.reset();

      setTimeout(() => {
        gsap.to(successBanner, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            successBanner.style.display = 'none';
            successBanner.style.opacity = '1';
          }
        });
      }, 5000);

    }, 1800);
  });
}
