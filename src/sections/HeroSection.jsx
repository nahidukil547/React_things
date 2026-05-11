import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import GlowRing from '../components/GlowRing';
import { getTimePeriod } from '../utils/timeUtils';
import MainPhoto from '../assets/Image/MainPhoto.png';

// ─── Typewriter phases ──────────────────────────────────────────────────────
const PHASES = [
  { text: 'Hi',               style: 'body',   typeMs: 120, holdMs: 820, eraseMs: 70  },
  { text: 'I am',             style: 'muted',  typeMs: 105, holdMs: 780, eraseMs: 65  },
  { text: 'Nahid Hasan Ukil', style: 'accent', typeMs: 78,  holdMs: null, eraseMs: null },
];

// Delay before very first character is typed (lets entrance animation settle)
const INITIAL_DELAY = 900;
// Pause (ms) between erasing one phase and typing the next
const BETWEEN_PAUSE = 320;

export default function HeroSection({ loaderDone }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Single heading ref + cursor ref
  const headingRef   = useRef(null);
  const cursorRef    = useRef(null);

  // Section refs (unchanged)
  const subtitleRef  = useRef(null);
  const descRef      = useRef(null);
  const ctaRef       = useRef(null);
  const badgesRef    = useRef(null);
  const imageWrapRef = useRef(null);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [textStyle, setTextStyle]         = useState('body'); // 'body' | 'muted' | 'accent'
  const [typingDone, setTypingDone]       = useState(false);

  // Image state
  const [imageHovered, setImageHovered] = useState(false);
  const [glowPulse, setGlowPulse]       = useState(false);

  // Bottom bar ref
  const bottomBarRef = useRef(null);

  // ── Cursor blink (runs the whole time until typing is done) ────────────
  const blinkRef = useRef(null);
  useEffect(() => {
    if (!cursorRef.current) return;
    blinkRef.current = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.52,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });
    return () => blinkRef.current?.kill();
  }, []);

  // ── Fade cursor out after name finishes ────────────────────────────────
  useEffect(() => {
    if (!typingDone || !cursorRef.current) return;
    blinkRef.current?.kill();
    const t = setTimeout(() => {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' });
    }, 1100);
    return () => clearTimeout(t);
  }, [typingDone]);

  // ── Animate bottom bar in after typing done ────────────────────────────
  useEffect(() => {
    if (!typingDone || !bottomBarRef.current) return;
    const t = setTimeout(() => {
      gsap.to(bottomBarRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
    }, 600);
    return () => clearTimeout(t);
  }, [typingDone]);

  // ── Glow pulse when name fully typed ───────────────────────────────────
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => {
      setGlowPulse(true);
      const rings = imageWrapRef.current?.querySelectorAll('.glow-ring-outer');
      if (rings?.length) {
        gsap.fromTo(rings, { scale: 1 }, {
          scale: 1.2, duration: 0.65, ease: 'power2.out',
          yoyo: true, repeat: 1,
          onComplete: () => setGlowPulse(false),
        });
      }
      gsap.fromTo(headingRef.current,
        { textShadow: '0 0 20px rgba(232,109,4,0.35)' },
        {
          textShadow: '0 0 55px rgba(232,109,4,1), 0 0 90px rgba(232,109,4,0.55)',
          duration: 0.65, ease: 'power2.out', yoyo: true, repeat: 1,
        }
      );
    }, 280);
    return () => clearTimeout(t);
  }, [typingDone]);

  // ── Section reveal (triggered once "I am" finishes typing) ────────────
  const sectionRevealedRef = useRef(false);

  const triggerSectionReveal = useCallback(() => {
    if (sectionRevealedRef.current) return;
    sectionRevealedRef.current = true;
    const tl = gsap.timeline();
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(descRef.current,     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
      .to(
        badgesRef.current ? [...badgesRef.current.children] : [],
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

  // ── State-machine typewriter (starts only after loader is gone) ──────────
  useEffect(() => {
    if (!loaderDone) return;
    let timer = null;

    // type → hold → erase → next phase, recursively
    const runPhase = (phaseIdx, charCount, erasing) => {
      const phase = PHASES[phaseIdx];
      if (!phase) return;

      if (!erasing) {
        // ── Typing forward ──────────────────────────────────────────────
        const next = charCount + 1;
        setDisplayedText(phase.text.slice(0, next));
        setTextStyle(phase.style);

        if (next < phase.text.length) {
          timer = setTimeout(() => runPhase(phaseIdx, next, false), phase.typeMs);
        } else {
          // Fully typed — kick off rest of section reveal after "I am" phase
          if (phaseIdx === 1) triggerSectionReveal();

          if (phase.holdMs === null) {
            // Last phase — done
            setTypingDone(true);
          } else {
            // Hold then start erasing
            timer = setTimeout(() => runPhase(phaseIdx, next, true), phase.holdMs);
          }
        }
      } else {
        // ── Erasing ─────────────────────────────────────────────────────
        const next = charCount - 1;
        setDisplayedText(phase.text.slice(0, next));

        if (next > 0) {
          timer = setTimeout(() => runPhase(phaseIdx, next, true), phase.eraseMs);
        } else {
          // Fully erased — move to next phase
          timer = setTimeout(() => runPhase(phaseIdx + 1, 0, false), BETWEEN_PAUSE);
        }
      }
    };

    timer = setTimeout(() => runPhase(0, 0, false), INITIAL_DELAY);
    return () => clearTimeout(timer);
  }, [triggerSectionReveal, loaderDone]);

  // ── Set all elements invisible immediately on mount ────────────────────
  useEffect(() => {
    gsap.set(headingRef.current,   { opacity: 0, y: 36 });
    gsap.set(imageWrapRef.current, { opacity: 0, x: 30, scale: 0.92 });
    gsap.set(bottomBarRef.current, { opacity: 0, y: 24 });
    gsap.set(
      [subtitleRef.current, descRef.current, ctaRef.current,
       ...(badgesRef.current ? [...badgesRef.current.children] : [])],
      { opacity: 0, y: 22 }
    );
  }, []);

  // ── Entrance animations — fire only after loader finishes ───────────────
  useEffect(() => {
    if (!loaderDone) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' });
    tl.to(imageWrapRef.current, {
      opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
      onComplete: () => gsap.set(imageWrapRef.current, { clearProps: 'transform' }),
    }, 0.25);
    return () => tl.kill();
  }, [loaderDone]);

  // ── Image hover handlers ────────────────────────────────────────────────
  const handleImageEnter = useCallback(() => {
    setImageHovered(true);
    gsap.to(imageWrapRef.current?.querySelector('.profile-img'), {
      scale: 1.04, duration: 0.4, ease: 'power2.out',
    });
  }, []);

  const handleImageLeave = useCallback(() => {
    setImageHovered(false);
    gsap.to(imageWrapRef.current?.querySelector('.profile-img'), {
      scale: 1, duration: 0.5, ease: 'power2.inOut',
    });
  }, []);

  // ── Derive text color from current phase ────────────────────────────────
  const textColor =
    textStyle === 'accent' ? '#e86d04'
    : textStyle === 'muted'
      ? (isDark ? 'rgba(255,247,241,0.45)' : 'rgba(11,11,11,0.4)')
      : (isDark ? '#fff7f1' : '#0b0b0b');

  const headingGlow =
    textStyle === 'accent'
      ? (isDark ? '0 0 40px rgba(232,109,4,0.4)' : '0 0 20px rgba(232,109,4,0.2)')
      : 'none';

  const techBadges = ['Python', 'Django', 'React.js', 'PostgreSQL', 'AWS S3'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '80px' }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-0">

            {/* Pre-title tag */}
            <div className="flex items-center gap-3 mb-7">
              <span style={{
                display: 'inline-block', width: 32, height: 1,
                background: '#e86d04', boxShadow: '0 0 8px #e86d04',
              }} />
              <span style={{
                color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>
                Portfolio 2025
              </span>
            </div>

            {/* ── Cinematic Typewriter Heading ───────────────────────────── */}
            {/*
                Single display zone. Cycles: "Hi" → erase → "I am" → erase
                → "Nahid Hasan Ukil" (stays). Fixed min-height prevents
                layout shift as text length changes between phases.
            */}
            <div
              ref={headingRef}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                minHeight: 'clamp(3.6rem, 9vw, 7rem)', // holds layout during phase changes
                display: 'flex',
                alignItems: 'center',
                willChange: 'transform, opacity',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(3rem, 3.5vw, 6rem)',
                  color: textColor,
                  textShadow: headingGlow,
                  transition: 'color 0.25s ease, text-shadow 0.25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.03em',
                }}
              >
                {displayedText}

                {/* Blinking cursor — always rendered, GSAP controls opacity */}
                <span
                  ref={cursorRef}
                  style={{
                    display: 'inline-block',
                    width: '0.055em',
                    height: '0.82em',
                    background: '#e86d04',
                    borderRadius: '2px',
                    marginLeft: '0.05em',
                    verticalAlign: 'middle',
                    flexShrink: 0,
                    boxShadow: '0 0 12px rgba(232,109,4,0.9)',
                  }}
                />
              </span>
            </div>
            {/* ── end heading ───────────────────────────────────────────── */}

            {/* Subtitle */}
            <div ref={subtitleRef} style={{ marginBottom: '1.5rem' }}>
              <h2 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                fontWeight: 500,
                color: isDark ? 'rgba(255,247,241,0.65)' : 'rgba(11,11,11,0.6)',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.02em',
                margin: 0,
              }}>
                Full-Stack Python Developer
              </h2>
            </div>

            {/* Description */}
            <p ref={descRef} style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              lineHeight: 1.75,
              color: isDark ? 'rgba(255,247,241,0.55)' : 'rgba(11,11,11,0.55)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '2rem',
              maxWidth: '30rem',
            }}>
              Full-Stack Python Developer with 1.5+ years building AI-powered
              platforms, SaaS products, and scalable REST APIs — specialized in
              Django · DRF · React.js · PostgreSQL · AWS S3.
            </p>

            {/* Tech Badges */}
            <div ref={badgesRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {techBadges.map((badge) => (
                <span key={badge} style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(232,109,4,0.3)',
                  background: isDark ? 'rgba(232,109,4,0.08)' : 'rgba(232,109,4,0.07)',
                  color: '#e86d04',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 28px', borderRadius: '12px',
                  fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em',
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg, #e86d04, #ff9a3c)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 28px rgba(232,109,4,0.4)',
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, duration: 0.2, ease: 'power2.out' })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1,    duration: 0.2, ease: 'power2.out' })}
              >
                GET IN TOUCH
              </button>

              <button
                onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 28px', borderRadius: '12px',
                  fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em',
                  fontFamily: 'Space Grotesk, sans-serif',
                  border: '1px solid rgba(232,109,4,0.4)',
                  background: 'transparent', color: '#e86d04', cursor: 'pointer',
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, backgroundColor: 'rgba(232,109,4,0.1)', duration: 0.2, ease: 'power2.out' })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1,    backgroundColor: 'transparent',          duration: 0.2, ease: 'power2.out' })}
              >
                VIEW WORK
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: '2rem',
              marginTop: '2.5rem', paddingTop: '2rem',
              borderTop: `1px solid ${isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
            }}>
              {[
                { value: getTimePeriod(), label: 'Experience' },
                { value: '10+', label: 'Projects'   },
                { value: '2+',  label: 'Companies'  },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{
                    fontSize: '1.5rem', fontWeight: 900, color: '#e86d04',
                    fontFamily: 'Space Grotesk, sans-serif',
                    textShadow: isDark ? '0 0 20px rgba(232,109,4,0.4)' : 'none',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '11px', letterSpacing: '0.08em', marginTop: '2px',
                    color: isDark ? 'rgba(255,247,241,0.35)' : 'rgba(11,11,11,0.35)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Image showcase ────────────────────────────── */}
          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 pt-16 lg:pt-0">
            <div
              ref={imageWrapRef}
              className="relative flex items-center justify-center float-y"
              style={{ width: 'min(380px, calc(100vw - 48px))', height: 'min(380px, calc(100vw - 48px))' }}
              onMouseEnter={handleImageEnter}
              onMouseLeave={handleImageLeave}
            >
              <GlowRing isHovered={imageHovered || glowPulse} />

              <div
                className="relative z-10 rounded-full overflow-hidden profile-img"
                style={{
                  width: '74%', height: '74%',
                  border: '2px solid rgba(232,109,4,0.5)',
                  boxShadow: (imageHovered || glowPulse)
                    ? '0 0 55px rgba(232,109,4,0.65), 0 0 110px rgba(232,109,4,0.3), inset 0 0 30px rgba(232,109,4,0.12)'
                    : '0 0 30px rgba(232,109,4,0.4), 0 0 60px rgba(232,109,4,0.2)',
                  transition: 'box-shadow 0.5s ease',
                }}
              >
                <img
                  src={MainPhoto}
                  alt="Nahid Hasan Ukil"
                  className="w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              {/* Floating badge — top right */}
              <div className="absolute top-6 right-0 sm:-right-4 z-20 px-3 py-2 rounded-xl glass" style={{
                border: '1px solid rgba(232,109,4,0.3)',
                background: isDark ? 'rgba(5,5,21,0.85)' : 'rgba(255,247,241,0.85)',
                boxShadow: '0 0 20px rgba(232,109,4,0.2)',
              }}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: isDark ? '#fff7f1' : '#0b0b0b', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Available
                  </span>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute bottom-10 left-0 sm:-left-6 z-20 px-3 py-2 rounded-xl glass" style={{
                border: '1px solid rgba(232,109,4,0.3)',
                background: isDark ? 'rgba(5,5,21,0.85)' : 'rgba(255,247,241,0.85)',
                boxShadow: '0 0 20px rgba(232,109,4,0.2)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}>
                  🚀 Open to Work
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar — appears after animation, sticks to viewport bottom ── */}
      <div
        ref={bottomBarRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0,
          transform: 'translateY(24px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 48px 32px',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {/* Left — quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'all' }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/nahidukil547' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nahid-hasanukil-a3bb43297' },
            { label: 'Email',    href: 'mailto:nahidukil547@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                color: isDark ? 'rgba(255,247,241,0.38)' : 'rgba(11,11,11,0.38)',
                fontFamily: 'Space Grotesk, sans-serif',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e86d04'; }}
              onMouseLeave={e => { e.currentTarget.style.color = isDark ? 'rgba(255,247,241,0.38)' : 'rgba(11,11,11,0.38)'; }}
            >
              <span style={{ width: 18, height: 1, background: 'currentColor', display: 'inline-block' }} />
              {label}
            </a>
          ))}
        </div>

        {/* Center — scroll indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 1, height: 52,
            background: 'linear-gradient(to bottom, transparent, #e86d04)',
            boxShadow: '0 0 8px rgba(232,109,4,0.5)',
          }} />
          <span style={{
            fontSize: '10px', letterSpacing: '0.3em',
            color: isDark ? 'rgba(255,247,241,0.45)' : 'rgba(11,11,11,0.4)',
            fontFamily: 'Space Grotesk, sans-serif',
            marginTop: 2,
          }}>
            SCROLL
          </span>
        </div>

        {/* Right — tagline */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
        }}>
          <span style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,247,241,0.28)' : 'rgba(11,11,11,0.28)',
            fontFamily: 'Space Grotesk, sans-serif',
          }}>
            Based in Bangladesh
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif',
            opacity: 0.7,
          }}>
            Open to Remote
          </span>
          <div style={{
            width: 32, height: 1,
            background: 'linear-gradient(to right, transparent, #e86d04)',
            boxShadow: '0 0 6px rgba(232,109,4,0.4)',
          }} />
        </div>
      </div>
    </section>
  );
}
