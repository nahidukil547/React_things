import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useEffect(() => {
    gsap.to(orb1.current, {
      x: 60,
      y: -40,
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.to(orb2.current, {
      x: -50,
      y: 60,
      duration: 10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    });
    gsap.to(orb3.current, {
      x: 40,
      y: 30,
      duration: 12,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 4,
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(232,109,4,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,109,4,0.3) 1px, transparent 1px)'
            : 'linear-gradient(rgba(232,109,4,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(232,109,4,0.2) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient orbs */}
      <div
        ref={orb1}
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          right: '-5%',
          background: isDark
            ? 'radial-gradient(circle, rgba(232,109,4,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,109,4,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2}
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '10%',
          left: '-10%',
          background: isDark
            ? 'radial-gradient(circle, rgba(232,109,4,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,109,4,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        ref={orb3}
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: '40%',
          left: '40%',
          background: isDark
            ? 'radial-gradient(circle, rgba(255,60,0,0.03) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,109,4,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Noise texture overlay */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      )}
    </div>
  );
}
