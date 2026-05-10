import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const navLinks = ['Home', 'Experience', 'About', 'Contact'];

export default function Navbar({ activeSection }) {
  const navRef = useRef(null);
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const scrollTo = (section) => {
    const el = document.getElementById(section.toLowerCase().replace(' ', '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: isDark
          ? 'rgba(5, 5, 21, 0.7)'
          : 'rgba(255, 247, 241, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isDark ? 'rgba(232,109,4,0.15)' : 'rgba(232,109,4,0.2)'}`,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: 'linear-gradient(135deg, #e86d04, #ff9a3c)',
            boxShadow: '0 0 16px rgba(232,109,4,0.5)',
          }}
        >
          N
        </div>
        <span
          className="font-semibold text-lg tracking-wide"
          style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Nahid
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = activeSection === link.toLowerCase().replace(' ', '-');
          return (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium tracking-wider transition-all duration-300 relative group"
              style={{
                color: isActive ? '#e86d04' : isDark ? '#fff7f1' : '#0b0b0b',
                opacity: isActive ? 1 : 0.7,
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {link.toUpperCase()}
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                style={{
                  background: '#e86d04',
                  width: isActive ? '100%' : '0%',
                  boxShadow: '0 0 8px rgba(232,109,4,0.8)',
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Right: Theme + Mobile Menu */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#e86d04',
              transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : '',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#e86d04',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: '#e86d04',
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 glass py-6 flex flex-col items-center gap-6 md:hidden"
          style={{
            background: isDark ? 'rgba(5,5,21,0.95)' : 'rgba(255,247,241,0.95)',
            borderBottom: '1px solid rgba(232,109,4,0.2)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium tracking-widest"
              style={{
                color: activeSection === link.toLowerCase() ? '#e86d04' : isDark ? '#fff7f1' : '#0b0b0b',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {link.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
