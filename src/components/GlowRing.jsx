import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

export default function GlowRing({ isHovered }) {
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const ring3 = useRef(null);
  const innerGlow = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Continuous slow rotation
    gsap.to(ring1.current, {
      rotation: 360,
      duration: 12,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    });
    gsap.to(ring2.current, {
      rotation: -360,
      duration: 18,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    });
    // Pulse glow
    gsap.to(innerGlow.current, {
      opacity: 0.8,
      scale: 1.05,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    if (isHovered) {
      tl.to([ring1.current, ring2.current], {
        scale: 1.12,
        duration: 0.5,
        ease: 'power2.out',
      });
      tl.to(innerGlow.current, {
        opacity: 1,
        scale: 1.15,
        duration: 0.4,
        ease: 'power2.out',
      }, '<');
      tl.to(ring3.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.6,
        ease: 'power2.out',
      }, '<');
    } else {
      tl.to([ring1.current, ring2.current], {
        scale: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      tl.to(innerGlow.current, {
        opacity: 0.5,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');
      tl.to(ring3.current, {
        opacity: 0.3,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');
    }
  }, [isHovered]);

  useEffect(() => {
    gsap.to([ring1.current, ring2.current, innerGlow.current], {
      duration: 0.3,
      ease: 'power2.inOut',
    });
  }, [theme]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outermost ambient glow */}
      <div
        ref={ring3}
        className="absolute rounded-full opacity-30"
        style={{
          width: '130%',
          height: '130%',
          background: 'radial-gradient(circle, rgba(232,109,4,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Ring 1 - dashed rotating */}
      <div
        ref={ring1}
        className="absolute rounded-full glow-ring-outer"
        style={{
          width: '110%',
          height: '110%',
          border: '1.5px dashed rgba(232,109,4,0.4)',
          boxShadow: '0 0 20px rgba(232,109,4,0.2), inset 0 0 20px rgba(232,109,4,0.1)',
        }}
      />

      {/* Ring 2 - solid slow counter-rotate */}
      <div
        ref={ring2}
        className="absolute rounded-full"
        style={{
          width: '95%',
          height: '95%',
          border: '1px solid rgba(232,109,4,0.25)',
          boxShadow: '0 0 15px rgba(232,109,4,0.15)',
        }}
      />

      {/* Inner radial glow */}
      <div
        ref={innerGlow}
        className="absolute rounded-full opacity-50"
        style={{
          width: '85%',
          height: '85%',
          background: 'radial-gradient(circle at 40% 40%, rgba(255,120,0,0.35) 0%, rgba(232,109,4,0.15) 40%, transparent 75%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Bottom shadow glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full opacity-50"
        style={{
          width: '80%',
          height: '30px',
          background: 'rgba(232,109,4,0.4)',
          filter: 'blur(16px)',
          transform: 'translateX(-50%) translateY(10px)',
        }}
      />
    </div>
  );
}
