import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionTracker({ activeSection }) {
  const trackerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    gsap.fromTo(
      trackerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
    );
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={trackerRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full glass"
      style={{
        border: '1px solid rgba(232,109,4,0.2)',
        background: isDark
          ? 'rgba(5,5,21,0.7)'
          : 'rgba(255,247,241,0.7)',
        boxShadow: '0 4px 30px rgba(232,109,4,0.1)',
      }}
    >
      {sections.map((section, i) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="relative flex items-center gap-2 group"
            title={section.label}
          >
            {isActive ? (
              /* Active: vertical glowing line */
              <div className="relative flex items-center justify-center">
                <div
                  className="w-0.5 h-6 rounded-full"
                  style={{
                    background: '#e86d04',
                    boxShadow: '0 0 12px #e86d04, 0 0 24px rgba(232,109,4,0.5)',
                  }}
                />
                <div
                  className="absolute w-1 h-8 rounded-full opacity-30"
                  style={{
                    background: '#e86d04',
                    filter: 'blur(4px)',
                  }}
                />
              </div>
            ) : (
              /* Inactive: small dot */
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                  background: isDark
                    ? 'rgba(255,247,241,0.3)'
                    : 'rgba(11,11,11,0.3)',
                }}
              />
            )}
            {/* Label tooltip on hover */}
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              style={{
                background: isDark ? 'rgba(232,109,4,0.9)' : 'rgba(232,109,4,0.9)',
                color: '#fff',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
