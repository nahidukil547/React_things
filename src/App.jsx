import { useEffect, useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import SectionTracker from './components/SectionTracker';
import StickyProfileCard from './components/StickyProfileCard';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['home', 'experience', 'about', 'contact'];

// ── Compact mobile top bar (shown below hero on small screens) ─────────────
function MobileProfileBar({ activeSection, isDark }) {
  const barRef   = useRef(null);
  const trigRef  = useRef(null);

  useEffect(() => {
    gsap.set(barRef.current, { opacity: 0, y: -20 });
    trigRef.current = ScrollTrigger.create({
      trigger: '#home',
      start: 'bottom 60%',
      onEnter:     () => gsap.to(barRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(barRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }),
    });
    return () => trigRef.current?.kill();
  }, []);

  const label = SECTIONS.slice(1).find(s => s === activeSection) ?? '';

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: isDark ? 'rgba(5,5,21,0.82)' : 'rgba(255,247,241,0.88)',
        borderBottom: '1px solid rgba(232,109,4,0.18)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          border: '1.5px solid rgba(232,109,4,0.5)',
          boxShadow: '0 0 10px rgba(232,109,4,0.35)',
          overflow: 'hidden', flexShrink: 0,
          background: isDark
            ? 'linear-gradient(135deg, #0d0d2b, #1a0a00)'
            : 'linear-gradient(135deg, #f0e8e0, #ffe8d0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px',
        }}>
          👤
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px', color: isDark ? '#fff7f1' : '#0b0b0b' }}>
            Nahid Hasan Ukil
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', color: '#e86d04', letterSpacing: '0.12em' }}>
            SOFTWARE ENGINEER
          </div>
        </div>
      </div>
      {label && (
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '10px', fontWeight: 600,
          color: '#e86d04', letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 12, height: 2, borderRadius: 1, background: '#e86d04', boxShadow: '0 0 6px #e86d04', display: 'inline-block' }} />
          {label}
        </div>
      )}
    </div>
  );
}

function Portfolio() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + window.innerHeight / 3;
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div style={{
      background: isDark ? '#050515' : '#fff7f1',
      color: isDark ? '#fff7f1' : '#0b0b0b',
      minHeight: '100vh',
      transition: 'background 0.5s ease, color 0.5s ease',
      position: 'relative',
    }}>
      <AnimatedBackground />
      <Navbar activeSection={activeSection} />

      {/* Mobile profile bar — always mounted, ScrollTrigger controls visibility */}
      <div className="lg:hidden">
        <MobileProfileBar activeSection={activeSection} isDark={isDark} />
      </div>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* ── Full-width Hero ──────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Post-hero 2-column layout — desktop: 33% gap 2% 65% ──────── */}
        <div className="post-hero-grid">
          {/* Left spacer — reserves space for the fixed card on desktop */}
          <div className="hidden lg:block" />

          {/* Right — scrollable sections */}
          <div style={{ minWidth: 0 }}>
            <ExperienceSection />
            <AboutSection />
            <ContactSection />
          </div>
        </div>
      </main>

      {/* ── Fixed bottom-left profile card — desktop only ─────────────── */}
      <div
        className="hidden lg:block"
        style={{
          position: 'fixed',
          bottom: -5,
          left: 16,
          zIndex: 50,
          width: 'calc(33vw - 32px)',
        }}
      >
        <StickyProfileCard activeSection={activeSection} />
      </div>

      <SectionTracker activeSection={activeSection} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
