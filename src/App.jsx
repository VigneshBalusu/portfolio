import React from 'react'
import { useEffect, useRef, useState } from 'react';
import {
  Github, Linkedin, Mail, Phone, ExternalLink, Code2,
  Layout, Server, Palette, Briefcase, ChevronDown, Menu, X,
  MapPin, Calendar, Star, Terminal, Globe, Brain, Cpu, Lightbulb
} from 'lucide-react';
import './index.css';

/* ─────────────────────────────────────────
   DATA — Vignesh Balusu's resume info
───────────────────────────────────────── */
const ME = {
  name: 'Vignesh Balusu',
  title: 'Full Stack Developer',
  email: 'vignesbalusuu@gmail.com',
  phone: '+91 9059379789',
  github: 'https://github.com/Vigneshbalusu',
  linkedin: 'https://www.linkedin.com/in/balusu-vignesh-905828258/',
  location: 'India',
};

const SKILLS = [
  {
    icon: <Terminal size={36} strokeWidth={2.5} />,
    title: 'Programming Languages',
    color: '#FFE600',          /* yellow */
    items: ['Python', 'Java', 'C'],
  },
  {
    icon: <Globe size={36} strokeWidth={2.5} />,
    title: 'Web Development',
    color: '#00E5FF',          /* cyan */
    items: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: <Brain size={36} strokeWidth={2.5} />,
    title: 'AI & Data Science',
    color: '#7C3AED',          /* purple */
    items: ['Machine Learning', 'Computer Vision', 'Numpy and Pandas'],
  },
  {
    icon: <Cpu size={36} strokeWidth={2.5} />,
    title: 'Applied AI / LLM Engineering',
    color: '#00FF88',          /* mint green */
    items: ['LangChain', 'RAG', 'Agentic AI (n8n)', 'Embeddings and Vector DB'],
  },
  {
    icon: <Lightbulb size={36} strokeWidth={2.5} />,
    title: 'Soft Skills',
    color: '#FF6B2B',          /* orange */
    items: ['Problem Solving', 'Consistency', 'Time Management', 'Adaptability'],
  },
];

const PROJECTS = [
  {
    title: 'Aurora Intel',
    tag: 'AI / Data Intelligence',
    tagColor: '#FFE600',
    description:
      'An AI-powered intelligence dashboard that aggregates and analyzes data in real time. Features smart insights, interactive data visualizations, and a sleek modern interface built for decision makers.',
    tech: ['React', 'Node.js', 'API', 'MongoDB', 'Netlify'],
    github: 'https://github.com/VigneshBalusu/AURORA-INTEL',
    live: 'https://auroraintel.netlify.app/',
    image: '/chatbot.jpeg',
    accent: '#FFE600',
    cardBg: '#FFF9C4',   /* soft yellow */
  },
  {
    title: 'Weather Peeks',
    tag: 'Weather / API',
    tagColor: '#00E5FF',
    description:
      'A clean, real-time weather app that fetches live meteorological data using public weather APIs. Displays current conditions, forecasts, humidity, wind speed, and location-based search.',
    tech: ['HTML', 'CSS', 'JS', 'Weather API', 'Geolocation', 'Netlify'],
    github: 'https://github.com/VigneshBalusu/weather-web',
    live: 'https://weatherpeeks.netlify.app/',
    image: '/weather logo.jpg',
    accent: '#00E5FF',
    cardBg: '#EEFFCD',   /* soft lime */
  },
  {
    title: 'PatternSense',
    tag: 'ML / Pattern Recognition',
    tagColor: '#FF90E8',
    description:
      'A machine learning application for pattern recognition and classification. Uses trained models to detect and classify patterns from input data with a clean, interactive UI for uploading and visualizing results.',
    tech: ['Python', 'Scikit-learn', 'HTML', 'CSS', 'Flask', 'Render'],
    github: 'https://github.com/VigneshBalusu/Pattern-Sense',
    live: 'https://pattern-sense-1qe4.onrender.com/',
    image: '/patternsense.png',
    accent: '#FF90E8',
    cardBg: '#FFE8FB',   /* soft pink */
  },
  {
    title: 'RCE Agent',
    tag: 'AI / RAG / Automation',
    cardBg: '#E8FFE8',   /* soft green */
    tagColor: '#FFE600',
    description:
      'An intelligent college query assistant powered by n8n workflow automation and RAG (Retrieval-Augmented Generation). Uses a vector database to retrieve accurate, context-aware answers to college-related queries in real time.',
    tech: ['n8n', 'RAG', 'Vector DB', 'LLM API', 'React', 'Node.js', 'Netlify'],
    github: 'https://github.com/VigneshBalusu/RCE_AGENT',
    live: 'https://rce-agent.netlify.app',
    image: '/logo.webp',
    accent: '#FFE600',
  },
];

const EXPERIENCE = [
  {
    role: 'DL Intern',
    company: 'Smart Bridge',
    period: 'May 2025 – July 2025',
    location: 'India',
    color: '#FFE600',
    certificate: 'https://drive.google.com/file/d/1sdPGzWOULicA2PPukR_AK3dLoChTZY19/view',
    bullets: [
      'Learnt about Basics of Deep Learning and neural network architectures',
      'Developed a Fabric Recognition model using image classification techniques',
    ],
  },
  {
    role: 'ML / CV Intern',
    company: 'Tech Skish',
    period: 'Oct 2024',
    location: 'India',
    color: '#FF90E8',
    certificate: 'https://drive.google.com/file/d/1HV-RFmEgKOcNK385lqEJmNMFrVhJI7eo/view',
    bullets: [
      'Assisted in developing NLP models for text processing and classification tasks',
      'Applied Computer Vision techniques to Image Classification pipelines',
    ],
  },
  {
    role: 'AI-ML-DS Intern',
    company: 'APSCHE Black Bucks',
    period: 'May 2024 – June 2024',
    location: 'India',
    color: '#00FF88',
    certificate: 'https://drive.google.com/file/d/1-mpQsdubR5fhUMLvlui-Npqt1jeBV2hv/view',
    bullets: [
      'Learnt core Machine Learning concepts — supervised & unsupervised learning',
      'Developed a Cricket Score Prediction model achieving 82% accuracy',
    ],
  },
];

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Reveal = ({ children, style = {} }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={style}>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAGNETIC TEXT — cursor-proximity 3D tilt
───────────────────────────────────────── */
function MagneticText({ children, as: Tag = 'h2', style = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: 0 });
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxD = 350;
      if (dist < maxD) {
        const t = 1 - dist / maxD;
        setTilt({ x: (dy / r.height) * 18 * t, y: -(dx / r.width) * 18 * t, glow: t });
      } else {
        setTilt({ x: 0, y: 0, glow: 0 });
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <Tag
      ref={ref}
      style={{
        ...style,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.12s ease',
        textShadow: tilt.glow > 0.05
          ? `0 0 ${40 * tilt.glow}px rgba(255,230,0,${0.55 * tilt.glow}), 0 0 ${75 * tilt.glow}px rgba(255,144,232,${0.3 * tilt.glow})`
          : (style.textShadow || 'none'),
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────
   TICKER TAPE
───────────────────────────────────────── */
const TICKER_ITEMS = [
  'PYTHON', 'JAVA', 'HTML', 'CSS', 'JAVASCRIPT',
  'MACHINE LEARNING', 'COMPUTER VISION', 'LANGCHAIN', 'RAG', 'AGENTIC AI',
  'LLM ENGINEERING', 'NUMPY', 'PANDAS', 'EMBEDDINGS', 'VECTOR DB',
];
function TickerTape() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '4px solid #000',
        borderBottom: '4px solid #000',
        background: '#000',
        padding: '14px 0',
      }}
    >
      <div className="ticker-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.12em',
              color: i % 2 === 0 ? '#FFE600' : '#fff',
              marginRight: '3rem',
            }}
          >
            ★ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const navLinkStyle = {
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: '#000',
    padding: '6px 0',
    borderBottom: '3px solid transparent',
    transition: 'border-color 0.15s ease',
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#fff',
        borderBottom: '4px solid #000',
        boxShadow: scrolled ? '0 4px 0 0 #000' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontWeight: 900,
            fontSize: '1.4rem',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#000',
          }}
        >
          VB<span style={{ color: '#7C3AED' }}>.</span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.target.style.borderBottomColor = '#000')}
              onMouseLeave={(e) => (e.target.style.borderBottomColor = 'transparent')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{
              ...navLinkStyle,
              padding: '12px 0',
              borderBottom: '2px solid #eee',
              display: 'block',
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href={ME.github}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#000',
            color: '#FFE600',
            border: '3px solid #000',
            fontWeight: 800,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          <Github size={18} strokeWidth={2.5} /> GitHub
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger  { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#FFE600',
        borderBottom: '4px solid #000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right,#00000012 1px,transparent 1px),linear-gradient(to bottom,#00000012 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />

      {/* Big decorative "01" */}
      <span
        style={{
          position: 'absolute',
          right: '-0.02em',
          bottom: '-0.1em',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '3px rgba(0,0,0,0.10)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >

      </span>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div
            style={{
              display: 'inline-block',
              background: '#000',
              color: '#FFE600',
              padding: '6px 18px',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            ★ Available for Hire
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.1s' }}>
          <MagneticText
            as="h1"
            style={{
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 7.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            I Build<br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '4px #000',
              }}
            >
              Digital
            </span>{' '}
            <br />
            Experiences
          </MagneticText>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.2s' }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
              maxWidth: '600px',
              marginBottom: '2.5rem',
              lineHeight: 1.55,
            }}
          >
            Hi, I'm <strong>{ME.name}</strong> — AI &amp; Automation Engineer.
            <br />
            I build ML systems, Generative AI apps &amp; agentic workflows
            <br />
            that solve real-world problems.
          </p>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.3s' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: '#000',
                color: '#FFE600',
                border: '4px solid #000',
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '8px 8px 0 0 #7C3AED',
              }}
              className="btn-press"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px,4px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 0 #7C3AED';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 0 #7C3AED';
              }}
            >
              View My Work <ExternalLink size={20} strokeWidth={2.5} />
            </a>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: '#fff',
                color: '#000',
                border: '4px solid #000',
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '8px 8px 0 0 #000',
              }}
              className="btn-press"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px,4px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 0 #000';
              }}
            >
              <Mail size={20} strokeWidth={2.5} /> Contact Me
            </a>
            <a
              href={ME.github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 24px',
                background: 'transparent',
                color: '#000',
                border: '4px solid #000',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '8px 8px 0 0 #000',
              }}
              className="btn-press"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px,4px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 0 #000';
              }}
            >
              <Github size={22} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.45s' }}>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            {[
              { num: '4+', label: 'Projects Built' },
              // { num: '2+', label: 'Years Experience' },
              { num: '100%', label: 'Commitment' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          animation: 'bounce 1.6s infinite',
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={20} strokeWidth={3} />
      </div>
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────── */
function Skills() {
  return (
    <section
      id="skills"
      style={{
        background: '#FF90E8',
        borderBottom: '4px solid #000',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right,#00000010 1px,transparent 1px),linear-gradient(to bottom,#00000010 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: '3.5rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: '#000',
                color: '#FF90E8',
                padding: '4px 14px',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Expertise
            </div>
            <MagneticText
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
                borderBottom: '6px solid #000',
                paddingBottom: '0.5rem',
                display: 'inline-block',
              }}
            >
              My Skills
            </MagneticText>
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.title} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div
                style={{
                  background: '#fff',
                  border: '4px solid #000',
                  boxShadow: '10px 10px 0 0 #000',
                  padding: '2.2rem',
                  height: '100%',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                  cursor: 'default',
                }}
                className="card-press"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(4px,4px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = '10px 10px 0 0 #000';
                }}
              >
                {/* Icon badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px',
                    background: skill.color,
                    border: '4px solid #000',
                    boxShadow: '4px 4px 0 0 #000',
                    marginBottom: '1.5rem',
                  }}
                >
                  {skill.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 900,
                    fontSize: '1.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    marginBottom: '1.2rem',
                  }}
                >
                  {skill.title}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          background: '#000',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────── */
function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: '#B8FF57',
        borderBottom: '4px solid #000',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right,#00000010 1px,transparent 1px),linear-gradient(to bottom,#00000010 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: '3.5rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: '#000',
                color: '#00E5FF',
                padding: '4px 14px',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Selected Work
            </div>
            <MagneticText
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
                borderBottom: '6px solid #000',
                paddingBottom: '0.5rem',
                display: 'inline-block',
              }}
            >
              Projects
            </MagneticText>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {PROJECTS.map((proj, i) => (
            <Reveal key={proj.title} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                  gap: '0',
                  border: '4px solid #000',
                  boxShadow: '12px 12px 0 0 #000',
                  background: '#fff',
                }}
                className="project-grid"
              >
                {/* Image Container */}
                <div
                  style={{
                    background: proj.accent,
                    borderRight: i % 2 === 0 ? '4px solid #000' : 'none',
                    borderLeft: i % 2 !== 0 ? '4px solid #000' : 'none',
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    order: i % 2 === 0 ? 0 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        inset: 0,
                      }}
                    />
                  ) : (
                    /* Fallback placeholder when no image */
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      padding: '2rem',
                    }}>
                      <Code2 size={72} strokeWidth={1.5} style={{ opacity: 0.4 }} />
                      <span style={{
                        fontWeight: 900,
                        fontSize: '1rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: '#000',
                        color: proj.accent,
                        padding: '6px 14px',
                      }}>
                        {proj.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div
                  style={{
                    padding: '2.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    order: i % 2 === 0 ? 1 : 0,
                    background: proj.cardBg || '#fff',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        background: proj.tagColor,
                        border: '2px solid #000',
                        padding: '3px 12px',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                      }}
                    >
                      {proj.tag}
                    </div>
                    <h3
                      style={{
                        fontWeight: 900,
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        marginBottom: '1rem',
                      }}
                    >
                      {proj.title}
                    </h3>
                    <p style={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.7, color: '#222', marginBottom: '1.5rem' }}>
                      {proj.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: '#f0f0f0',
                            border: '2px solid #000',
                            padding: '3px 10px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: '#000',
                        color: '#fff',
                        border: '3px solid #000',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        letterSpacing: '0.06em',
                        boxShadow: '4px 4px 0 0 #555',
                      }}
                      className="btn-press"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px,2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0 0 #555';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0,0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0 0 #555';
                      }}
                    >
                      <Github size={17} strokeWidth={2.5} /> GitHub
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: '#fff',
                        color: '#000',
                        border: '3px solid #000',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        letterSpacing: '0.06em',
                        boxShadow: '4px 4px 0 0 #000',
                      }}
                      className="btn-press"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px,2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0 0 #000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0,0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
                      }}
                    >
                      <ExternalLink size={17} strokeWidth={2.5} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .project-grid { grid-template-columns: 1fr !important; }
          .project-grid > div { order: unset !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   EXPERIENCE SECTION
───────────────────────────────────────── */
function Experience() {
  return (
    <section
      id="experience"
      style={{
        background: '#ff26007d',
        borderBottom: '4px solid #000',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right,#00000008 1px,transparent 1px),linear-gradient(to bottom,#00000008 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: '3.5rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: '#000',
                color: '#fff',
                padding: '4px 14px',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Career
            </div>
            <MagneticText
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
                borderBottom: '6px solid #000',
                paddingBottom: '0.5rem',
                display: 'inline-block',
              }}
            >
              Experience
            </MagneticText>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div
                style={{
                  border: '4px solid #000',
                  boxShadow: '10px 10px 0 0 #000',
                  display: 'grid',
                  gridTemplateColumns: '280px 1fr',
                  overflow: 'hidden',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                }}
                className="card-press exp-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(4px,4px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = '10px 10px 0 0 #000';
                }}
              >
                {/* Left accent */}
                <div
                  style={{
                    background: exp.color,
                    borderRight: '4px solid #000',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '0.8rem',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <Calendar size={16} strokeWidth={2.5} /> {exp.period}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    <MapPin size={16} strokeWidth={2.5} /> {exp.location}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      background: '#000',
                      color: exp.color,
                      padding: '4px 10px',
                      marginTop: '0.5rem',
                    }}
                  >
                    <Briefcase size={15} strokeWidth={2.5} /> {exp.company}
                  </div>
                </div>

                {/* Right content */}
                <div style={{ padding: '2rem', background: '#fff' }}>
                  <h3
                    style={{
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      marginBottom: '1.2rem',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          color: '#111',
                        }}
                      >
                        <Star
                          size={14}
                          strokeWidth={2.5}
                          fill="#000"
                          style={{ marginTop: '5px', flexShrink: 0 }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.certificate && (
                    <a
                      href={exp.certificate}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 18px',
                        background: exp.color,
                        color: '#000',
                        border: '3px solid #000',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        textDecoration: 'none',
                        boxShadow: '4px 4px 0 0 #000',
                        transition: 'transform 0.1s, box-shadow 0.1s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px,2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0 0 #000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0,0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
                      }}
                    >
                      <ExternalLink size={14} strokeWidth={2.5} /> View Certificate
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .exp-card { grid-template-columns: 1fr !important; }
          .exp-card > div:first-child { border-right: none !important; border-bottom: 4px solid #000; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT / FOOTER SECTION
───────────────────────────────────────── */
function Contact() {
  const headingRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 350;
      if (dist < maxDist) {
        const t = 1 - dist / maxDist;
        setTilt({ x: (dy / rect.height) * 18 * t, y: -(dx / rect.width) * 18 * t, glow: t });
      } else {
        setTilt({ x: 0, y: 0, glow: 0 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="contact"
      style={{
        background: '#7C3AED',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right,#ffffff15 1px,transparent 1px),linear-gradient(to bottom,#ffffff15 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div
            style={{
              display: 'inline-block',
              background: '#FFE600',
              color: '#000',
              padding: '4px 14px',
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: '3px solid #000',
              marginBottom: '1.5rem',
            }}
          >
            Let's Connect
          </div>
        </Reveal>

        {/* Magnetic heading */}
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <h2
            ref={headingRef}
            style={{
              fontWeight: 900,
              fontSize: 'clamp(3rem, 9vw, 6.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginBottom: '1.5rem',
              WebkitTextStroke: '3px #fff',
              color: 'transparent',
              transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.12s ease',
              textShadow: tilt.glow > 0.05
                ? `0 0 ${40 * tilt.glow}px rgba(255,230,0,${0.6 * tilt.glow}), 0 0 ${80 * tilt.glow}px rgba(255,144,232,${0.3 * tilt.glow})`
                : 'none',
              willChange: 'transform',
              cursor: 'default',
            }}
          >
            Get In
            <br />
            Touch
          </h2>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.2s' }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: '1.2rem',
              color: '#e0d0ff',
              marginBottom: '3rem',
              lineHeight: 1.6,
            }}
          >
            I'm open to full-time roles, freelance projects, and exciting collaborations.
            <br />
            Let's build something bold together.
          </p>
        </Reveal>

        <Reveal style={{ transitionDelay: '0.3s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem' }}>
            {/* Email */}
            <a
              href={`mailto:${ME.email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                background: '#FFE600',
                color: '#000',
                border: '4px solid #000',
                fontWeight: 900,
                fontSize: '1.1rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '8px 8px 0 0 #000',
                width: '100%',
                maxWidth: '460px',
                justifyContent: 'center',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px,4px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 0 #000';
              }}
            >
              <Mail size={22} strokeWidth={2.5} /> {ME.email}
            </a>

            {/* Phone */}
            <a
              href={`tel:${ME.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                background: '#218eb6ff',
                color: '#fff',
                border: '4px solid #000',
                boxShadow: '8px 8px 0 0 #000',
                fontWeight: 900,
                fontSize: '1.1rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                width: '100%',
                maxWidth: '460px',
                justifyContent: 'center',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px,4px)';
                e.currentTarget.style.boxShadow = '4px 4px 0 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0,0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 0 #000';
              }}
            >
              <Phone size={22} strokeWidth={2.5} /> {ME.phone}
            </a>
          </div>
        </Reveal>

        {/* Social Icons */}
        <Reveal style={{ transitionDelay: '0.4s' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              {
                href: ME.github,
                icon: <Github size={28} strokeWidth={2.5} />,
                label: 'GitHub',
                bg: '#FFE600',
                fg: '#000',
                sh: '#000',
              },
              {
                href: ME.linkedin,
                icon: <Linkedin size={28} strokeWidth={2.5} />,
                label: 'LinkedIn',
                bg: '#00E5FF',
                fg: '#000',
                sh: '#000',
              },
              {
                href: `mailto:${ME.email}`,
                icon: <Mail size={28} strokeWidth={2.5} />,
                label: 'Email',
                bg: '#FF90E8',
                fg: '#000',
                sh: '#000',
              },
              {
                href: `tel:${ME.phone}`,
                icon: <Phone size={28} strokeWidth={2.5} />,
                label: 'Call',
                bg: '#00FF88',
                fg: '#000',
                sh: '#000',
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                title={s.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px 26px',
                  background: s.bg,
                  color: s.fg,
                  border: '4px solid #000',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: `6px 6px 0 0 ${s.sh}`,
                  minWidth: '100px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-3px,-6px) scale(1.08)';
                  e.currentTarget.style.boxShadow = `10px 10px 0 0 ${s.sh}`;
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0,0) scale(1)';
                  e.currentTarget.style.boxShadow = `6px 6px 0 0 ${s.sh}`;
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Footer bottom */}
        <Reveal style={{ transitionDelay: '0.5s' }}>
          <div
            style={{
              borderTop: '4px solid rgba(255,255,255,0.25)',
              paddingTop: '2rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#d0baff',
            }}
          >
            Designed &amp; Built by{' '}
            <span style={{ color: '#FFE600' }}>{ME.name}</span> · 2026 ·{' '}
            <a
              href="https://github.com/vigneshBalusu/Portfolio"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#FFE600', textDecoration: 'underline' }}
            >
              View Source
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TickerTape />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}