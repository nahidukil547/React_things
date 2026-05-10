import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const isDark = theme === 'dark';

  const handleClick = () => {
    gsap.to(iconRef.current, {
      rotation: '+=180',
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
    gsap.to(btnRef.current, {
      scale: 0.9,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: toggleTheme,
    });
  };

  useEffect(() => {
    const btn = btnRef.current;
    const onEnter = () => {
      gsap.to(btn, { scale: 1.08, duration: 0.2, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };
    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="relative flex items-center gap-2 px-3 py-2 rounded-xl glass"
      style={{
        border: '1px solid rgba(232,109,4,0.3)',
        background: isDark
          ? 'rgba(232,109,4,0.08)'
          : 'rgba(232,109,4,0.1)',
        boxShadow: '0 0 20px rgba(232,109,4,0.15)',
      }}
      title="Toggle Theme"
    >
      <span ref={iconRef} className="text-base leading-none select-none">
        {isDark ? '☀️' : '🌙'}
      </span>
      <span
        className="text-xs font-medium tracking-wider hidden sm:block"
        style={{
          color: '#e86d04',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        {isDark ? 'LIGHT' : 'DARK'}
      </span>
      {/* Glow dot */}
      <span
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        style={{
          background: '#e86d04',
          boxShadow: '0 0 8px #e86d04',
        }}
      />
    </button>
  );
}
