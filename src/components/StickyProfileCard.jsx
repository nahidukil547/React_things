import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);
const NAV_SECTIONS = [
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'about',      label: 'About',      icon: '👤' },
  { id: 'contact',    label: 'Contact',    icon: '✉️' },
];

function MiniAvatar({ isDark }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={isDark ? '#1e1e3f' : '#f5ede5'} />
          <stop offset="100%" stopColor={isDark ? '#0a0a1f' : '#e8ddd5'} />
        </radialGradient>
        <radialGradient id="cSkinGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#f4c59a" />
          <stop offset="100%" stopColor="#d4956a" />
        </radialGradient>
        <radialGradient id="cGlowC" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(232,109,4,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#cBodyGrad)" />
      <circle cx="100" cy="100" r="100" fill="url(#cGlowC)" />
      <path d="M40 200 Q50 150 100 145 Q150 150 160 200 Z" fill="#e86d04" opacity="0.9" />
      <path d="M60 200 Q65 160 100 155 Q135 160 140 200 Z" fill={isDark ? '#0a0a1f' : '#f5ede5'} opacity="0.7" />
      <rect x="88" y="125" width="24" height="25" rx="8" fill="url(#cSkinGrad)" />
      <ellipse cx="100" cy="100" rx="42" ry="46" fill="url(#cSkinGrad)" />
      <path d="M58 90 Q62 55 100 52 Q138 55 142 90 Q138 68 100 65 Q62 68 58 90 Z" fill="#2d1b00" />
      <ellipse cx="85"    cy="98" rx="5"  ry="5.5"  fill="#fff" />
      <ellipse cx="115"   cy="98" rx="5"  ry="5.5"  fill="#fff" />
      <ellipse cx="85.5"  cy="99" rx="3"  ry="3.5"  fill="#1a1a1a" />
      <ellipse cx="115.5" cy="99" rx="3"  ry="3.5"  fill="#1a1a1a" />
      <ellipse cx="86"    cy="98" rx="1"  ry="1"    fill="#fff" />
      <ellipse cx="116"   cy="98" rx="1"  ry="1"    fill="#fff" />
      <path d="M78  90 Q85  87 92  90" stroke="#2d1b00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 90 Q115 87 122 90" stroke="#2d1b00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M97 105 Q100 112 103 105" stroke="#c4854a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M88 116 Q100 124 112 116" stroke="#c4854a" strokeWidth="2"   fill="none" strokeLinecap="round" />
      <circle cx="100" cy="100" r="100" fill="url(#cGlowC)" />
    </svg>
  );
}

export default function StickyProfileCard({ activeSection }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardRef    = useRef(null);
  const glowBgRef  = useRef(null);
  const ringRef    = useRef(null);
  const ring2Ref   = useRef(null);
  const triggerRef = useRef(null);
  const imgGlowRef = useRef(null);

  // ── Ambient glow blob pulse ────────────────────────────────────────────
  useEffect(() => {
    const a = gsap.to(glowBgRef.current, {
      opacity: 0.85, scale: 1.12,
      duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
    return () => a.kill();
  }, []);

  // ── Outer ring rotation (clockwise) ───────────────────────────────────
  useEffect(() => {
    const a = gsap.to(ringRef.current, {
      rotation: 360, duration: 11, ease: 'none', repeat: -1,
      transformOrigin: 'center center',
    });
    return () => a.kill();
  }, []);

  // ── Inner ring counter-rotation ───────────────────────────────────────
  useEffect(() => {
    const a = gsap.to(ring2Ref.current, {
      rotation: -360, duration: 17, ease: 'none', repeat: -1,
      transformOrigin: 'center center',
    });
    return () => a.kill();
  }, []);

  // ── Image inner glow pulse ─────────────────────────────────────────────
  useEffect(() => {
    const a = gsap.to(imgGlowRef.current, {
      opacity: 0.9, scale: 1.08,
      duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
    return () => a.kill();
  }, []);

  // ── "Born from hero image" ScrollTrigger animation ────────────────────
  //   On enter  : card animates FROM the hero profile image position
  //   On leaveBack: card animates BACK toward the hero image position
  useEffect(() => {
    const card = cardRef.current;

    // Start hidden
    gsap.set(card, { opacity: 0, scale: 0.88, x: 0, y: 0, filter: 'blur(8px)' });

    // Cache hero image's absolute (document-relative) position after the hero
    // entrance animation clears its GSAP transform (~1.5s). This lets us
    // compute the correct viewport position at any scroll depth.
    let heroDoc = null; // { top, left, width, height } in document coords
    const cacheTimer = setTimeout(() => {
      const el = document.querySelector('#home .profile-img');
      if (!el) return;
      const r = el.getBoundingClientRect();
      heroDoc = {
        top:    r.top    + window.scrollY,
        left:   r.left   + window.scrollX,
        width:  r.width,
        height: r.height,
      };
    }, 1600); // after hero entrance anim + float-y CSS takes over

    // Convert cached doc position to current viewport coords
    const getHeroViewportRect = () => {
      if (!heroDoc) {
        // Fallback: read live
        return document.querySelector('#home .profile-img')?.getBoundingClientRect() ?? null;
      }
      return {
        top:    heroDoc.top    - window.scrollY,
        left:   heroDoc.left   - window.scrollX,
        width:  heroDoc.width,
        height: heroDoc.height,
      };
    };

    const animateIn = () => {
      // Ensure card is at neutral transform before measuring
      gsap.set(card, { x: 0, y: 0, scale: 1 });
      const imgRect  = getHeroViewportRect();
      const cardRect = card.getBoundingClientRect();

      if (imgRect && cardRect.width > 0) {
        const dx = (imgRect.left + imgRect.width  / 2) - (cardRect.left + cardRect.width  / 2);
        const dy = (imgRect.top  + imgRect.height / 2) - (cardRect.top  + cardRect.height / 2);
        const startScale = Math.min((imgRect.width / cardRect.width) * 0.9, 1.5);

        gsap.fromTo(
          card,
          { opacity: 0, x: dx, y: dy, scale: startScale, filter: 'blur(10px)' },
          { opacity: 1, x: 0,  y: 0,  scale: 1,          filter: 'blur(0px)',
            duration: 1.0, ease: 'power3.out' }
        );
      } else {
        gsap.fromTo(
          card,
          { opacity: 0, x: -60, scale: 0.88, filter: 'blur(8px)' },
          { opacity: 1, x: 0,   scale: 1,    filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
        );
      }
    };

    const animateOut = () => {
      const imgRect  = getHeroViewportRect();
      const cardRect = card.getBoundingClientRect();

      if (imgRect && cardRect.width > 0) {
        const dx = (imgRect.left + imgRect.width  / 2) - (cardRect.left + cardRect.width  / 2);
        const dy = (imgRect.top  + imgRect.height / 2) - (cardRect.top  + cardRect.height / 2);
        const endScale = Math.min((imgRect.width / cardRect.width) * 0.85, 1.4);

        gsap.to(card, {
          opacity: 0, x: dx, y: dy, scale: endScale, filter: 'blur(10px)',
          duration: 0.65, ease: 'power2.in',
          onComplete: () => gsap.set(card, { x: 0, y: 0, scale: 0.88, filter: 'blur(8px)' }),
        });
      } else {
        gsap.to(card, {
          opacity: 0, x: -60, scale: 0.88, filter: 'blur(8px)',
          duration: 0.55, ease: 'power2.in',
        });
      }
    };

    triggerRef.current = ScrollTrigger.create({
      trigger: '#home',
      start: 'bottom 58%',
      onEnter:     animateIn,
      onLeaveBack: animateOut,
    });

    return () => {
      clearTimeout(cacheTimer);
      triggerRef.current?.kill();
    };
  }, []);

  // ── Card hover: intensify glow ─────────────────────────────────────────
  const onCardEnter = useCallback(() => {
    gsap.to(glowBgRef.current, { opacity: 1, scale: 1.22, duration: 0.4, ease: 'power2.out' });
  }, []);
  const onCardLeave = useCallback(() => {
    gsap.to(glowBgRef.current, { opacity: 0.55, scale: 1, duration: 0.55, ease: 'power2.inOut' });
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── Theme-derived tokens ───────────────────────────────────────────────
  const cardBg     = isDark ? 'rgba(5,5,21,0.8)'        : 'rgba(255,247,241,0.85)';
  const borderClr  = isDark ? 'rgba(232,109,4,0.28)'    : 'rgba(232,109,4,0.32)';
  const shadow     = isDark
    ? '0 0 50px rgba(232,109,4,0.12), 0 28px 70px rgba(0,0,0,0.6)'
    : '0 0 35px rgba(232,109,4,0.1),  0 24px 52px rgba(0,0,0,0.08)';
  const mutedTxt   = isDark ? 'rgba(255,247,241,0.45)'  : 'rgba(11,11,11,0.45)';
  const divider    = isDark
    ? 'linear-gradient(to right,transparent,rgba(255,247,241,0.1),transparent)'
    : 'linear-gradient(to right,transparent,rgba(11,11,11,0.09),transparent)';
  const bodyTxt    = isDark ? '#fff7f1' : '#0b0b0b';

  return (
    <div
      ref={cardRef}
      style={{ position: 'relative', willChange: 'transform, opacity, filter' }}
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
    >
        {/* ── Ambient glow blob ───────────────────────────────────────────── */}
        <div
          ref={glowBgRef}
          style={{
            position: 'absolute', inset: '-28px', borderRadius: '32px', zIndex: 0,
            background: 'radial-gradient(circle at 50% 32%, rgba(232,109,4,0.28) 0%, transparent 68%)',
            filter: 'blur(28px)', opacity: 0.55, pointerEvents: 'none',
          }}
        />

        {/* ── Card body ───────────────────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: '24px',
          padding: '36px 40px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
          background: cardBg,
          border: `1px solid ${borderClr}`,
          boxShadow: shadow,
          overflow: 'hidden',
        }}>

          {/* Decorative corner glow top-right */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 150, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,109,4,0.18) 0%, transparent 70%)',
            filter: 'blur(16px)', pointerEvents: 'none',
          }} />

          {/* ── Avatar block ──────────────────────────────────────────────── */}
          <div style={{
            position: 'relative', width: 172, height: 172,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Wide ambient halo */}
            <div style={{
              position: 'absolute', inset: '-18px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,109,4,0.2) 0%, transparent 70%)',
              filter: 'blur(18px)',
            }} />
            {/* Outer dashed rotating ring */}
            <div ref={ringRef} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1.5px dashed rgba(232,109,4,0.55)',
              boxShadow: '0 0 16px rgba(232,109,4,0.22)',
            }} />
            {/* Inner counter-rotating ring */}
            <div ref={ring2Ref} style={{
              position: 'absolute', inset: '12px', borderRadius: '50%',
              border: '1px solid rgba(232,109,4,0.22)',
            }} />
            {/* Inner ambient glow */}
            <div ref={imgGlowRef} style={{
              position: 'absolute', inset: '22px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,109,4,0.22) 0%, transparent 70%)',
              filter: 'blur(10px)', opacity: 0.6,
            }} />
            {/* Photo */}
            <div style={{
              width: 124, height: 124, borderRadius: '50%',
              overflow: 'hidden', position: 'relative', zIndex: 1,
              border: '2.5px solid rgba(232,109,4,0.6)',
              boxShadow: '0 0 28px rgba(232,109,4,0.5), 0 0 56px rgba(232,109,4,0.2)',
            }}>
              <MiniAvatar isDark={isDark} />
            </div>
          </div>

          {/* ── Name & title ──────────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
              fontSize: '1.35rem', color: bodyTxt,
              letterSpacing: '-0.02em', marginBottom: '6px',
              textShadow: isDark ? '0 0 30px rgba(255,247,241,0.1)' : 'none',
            }}>
              Nahid Hasan Ukil
            </div>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              fontSize: '11px', color: '#e86d04',
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              Software Engineer
            </div>
          </div>

          {/* ── Status badge ──────────────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 16px', borderRadius: '999px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.25)',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e', boxShadow: '0 0 9px #22c55e',
              animation: 'glowPulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '11px', fontWeight: 600, color: '#22c55e',
              fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.04em',
            }}>
              Available for work
            </span>
          </div>

          {/* ── Divider ───────────────────────────────────────────────────── */}
          <div style={{ width: '100%', height: 1, background: divider }} />

          {/* ── Navigation ────────────────────────────────────────────────── */}
          <div style={{ width: '100%' }}>
            <div style={{
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
              color: mutedTxt, fontFamily: 'Space Grotesk, sans-serif',
              textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '6px',
            }}>
              Sections
            </div>
            {NAV_SECTIONS.map(({ id, label, icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    width: '100%', padding: '10px 12px', borderRadius: '12px',
                    border: 'none', cursor: 'pointer', marginBottom: '4px',
                    background: isActive
                      ? (isDark ? 'rgba(232,109,4,0.12)' : 'rgba(232,109,4,0.09)')
                      : 'transparent',
                    outline: isActive ? '1px solid rgba(232,109,4,0.2)' : '1px solid transparent',
                    transition: 'background 0.22s, outline 0.22s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background =
                      isDark ? 'rgba(255,247,241,0.05)' : 'rgba(11,11,11,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Indicator */}
                  <span style={{
                    display: 'inline-block',
                    width:  isActive ? 18 : 7,
                    height: isActive ? 2.5 : 7,
                    borderRadius: isActive ? '2px' : '50%',
                    background: '#e86d04',
                    boxShadow: isActive ? '0 0 10px rgba(232,109,4,0.85)' : 'none',
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.38,
                    transition: 'all 0.3s ease',
                  }} />
                  <span style={{ fontSize: '13px', marginRight: 'auto' }}>{icon}</span>
                  <span style={{
                    fontSize: '12.5px', fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#e86d04' : mutedTxt,
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.03em',
                    transition: 'color 0.22s',
                    flex: 1, textAlign: 'left',
                  }}>
                    {label}
                  </span>
                  {isActive && (
                    <span style={{
                      fontSize: '9px', fontWeight: 700, color: '#e86d04',
                      fontFamily: 'Space Grotesk, sans-serif',
                      letterSpacing: '0.1em',
                      background: 'rgba(232,109,4,0.12)',
                      padding: '2px 6px', borderRadius: '4px',
                    }}>NOW</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── CTA button ────────────────────────────────────────────────── */}
          <button
            onClick={() => scrollTo('contact')}
            style={{
              width: '100%', padding: '13px 0',
              borderRadius: '13px', border: 'none', cursor: 'pointer',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: '12px', letterSpacing: '0.14em',
              color: '#fff', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #e86d04 0%, #ff9a3c 100%)',
              boxShadow: '0 0 28px rgba(232,109,4,0.38), 0 4px 20px rgba(232,109,4,0.25)',
              transition: 'box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
              e.currentTarget.style.boxShadow = '0 0 40px rgba(232,109,4,0.55), 0 6px 28px rgba(232,109,4,0.35)';
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.inOut' });
              e.currentTarget.style.boxShadow = '0 0 28px rgba(232,109,4,0.38), 0 4px 20px rgba(232,109,4,0.25)';
            }}
          >
            Let's Work Together →
          </button>

          {/* ── Bottom edge glow line ─────────────────────────────────────── */}
          <div style={{
            position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1.5px',
            background: 'linear-gradient(to right, transparent, rgba(232,109,4,0.65), transparent)',
            borderRadius: '1px', filter: 'blur(1px)',
          }} />
        </div>
    </div>
  );
}
