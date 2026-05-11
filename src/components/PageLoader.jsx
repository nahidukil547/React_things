import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import mainLogo from '../assets/Image/mainLogo.png';

export default function PageLoader({ onComplete, isDark }) {
  const overlayRef   = useRef(null);
  const logoRef      = useRef(null);
  const glowRef      = useRef(null);
  const ring1Ref     = useRef(null);
  const ring2Ref     = useRef(null);
  const ring3Ref     = useRef(null);
  const nameRef      = useRef(null);
  const subtitleRef  = useRef(null);

  const bg        = isDark ? '#050515' : 'rgb(234 245 252)';
  const textColor = isDark ? '#fff7f1' : '#0b0b0b';

  useEffect(() => {
    // ── Continuous ring rotations (start immediately, killed on unmount) ──
    const rotations = [
      gsap.to(ring1Ref.current, { rotation: 360,  duration: 4,   ease: 'none', repeat: -1, transformOrigin: 'center center' }),
      gsap.to(ring2Ref.current, { rotation: -360, duration: 7,   ease: 'none', repeat: -1, transformOrigin: 'center center' }),
      gsap.to(ring3Ref.current, { rotation: 360,  duration: 2.4, ease: 'none', repeat: -1, transformOrigin: 'center center' }),
    ];

    // ── Ambient glow pulse ────────────────────────────────────────────────
    const glowPulse = gsap.to(glowRef.current, {
      opacity: 0.85, scale: 1.35,
      duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1,
    });

    // ── Initial hidden states ─────────────────────────────────────────────
    gsap.set(
      [logoRef.current, ring1Ref.current, ring2Ref.current, ring3Ref.current,
       nameRef.current, subtitleRef.current],
      { opacity: 0 }
    );
    gsap.set(logoRef.current,     { scale: 0.72 });
    gsap.set(nameRef.current,     { y: 18 });
    gsap.set(subtitleRef.current, { y: 12 });
    gsap.set(glowRef.current,     { opacity: 0, scale: 0.55 });

    // ── Main timeline ─────────────────────────────────────────────────────
    // 0.0s : overlay visible (just bg + grid)
    // 0.5s : logo + rings fade in
    // 1.0s : name & subtitle slide up
    // 1.0s–4.0s : rings rotate + glow pulses (3s active)
    // 4.0s : start fade-out of content
    // 4.5s : overlay fades to transparent
    // ~5.0s : onComplete → loader unmounts
    const tl = gsap.timeline({ onComplete });

    tl
      // — logo & glow appear —
      .to(glowRef.current,  { opacity: 0.5, scale: 1, duration: 0.65, ease: 'power2.out' }, 0.5)
      .to(ring1Ref.current, { opacity: 1,   duration: 0.4, ease: 'power2.out' }, 0.5)
      .to(ring2Ref.current, { opacity: 1,   duration: 0.4, ease: 'power2.out' }, 0.6)
      .to(ring3Ref.current, { opacity: 1,   duration: 0.4, ease: 'power2.out' }, 0.7)
      .to(logoRef.current,  { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.52)
      // — name slides up —
      .to(nameRef.current,     { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.95)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, 1.1)

      // — 3 s of ring animation happens here (timeline holds at 4.0s label) —

      // — fade out text —
      .to([nameRef.current, subtitleRef.current],
          { opacity: 0, y: -14, duration: 0.4, ease: 'power2.in' }, 3.9)
      // — fade out logo + rings —
      .to([logoRef.current, ring1Ref.current, ring2Ref.current, ring3Ref.current, glowRef.current],
          { opacity: 0, scale: 0.82, duration: 0.55, ease: 'power2.in' }, 4.15)
      // — fade out entire overlay —
      .to(overlayRef.current, { opacity: 0, duration: 0.45, ease: 'power1.in' }, 4.55);

    return () => {
      tl.kill();
      rotations.forEach(r => r.kill());
      glowPulse.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle grid (matches site background) ─────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: isDark
            ? 'linear-gradient(rgba(232,109,4,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(232,109,4,0.3) 1px,transparent 1px)'
            : 'linear-gradient(rgba(232,109,4,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(232,109,4,0.2) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.05,
        }}
      />

      {/* ── Large ambient orb behind everything ────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,109,4,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Logo + rings ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: 210, height: 210,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Ambient inner glow */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: -50,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,109,4,0.30) 0%, transparent 65%)',
            filter: 'blur(22px)',
            pointerEvents: 'none',
          }}
        />

        {/* Outer dashed rotating ring */}
        <div
          ref={ring1Ref}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '1.5px dashed rgba(232,109,4,0.6)',
            boxShadow: '0 0 20px rgba(232,109,4,0.18)',
          }}
        />

        {/* Middle solid counter-rotating ring */}
        <div
          ref={ring2Ref}
          style={{
            position: 'absolute', inset: 20,
            borderRadius: '50%',
            border: '1px solid rgba(232,109,4,0.28)',
          }}
        />

        {/* Inner spinner ring (partial border = spinner look) */}
        <div
          ref={ring3Ref}
          style={{
            position: 'absolute', inset: 38,
            borderRadius: '50%',
            border: '2.5px solid transparent',
            borderTopColor: '#e86d04',
            borderRightColor: 'rgba(232,109,4,0.35)',
            boxShadow: '0 0 14px rgba(232,109,4,0.45)',
          }}
        />

        {/* Logo photo */}
        <div
          ref={logoRef}
          style={{
            width: 108, height: 108,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative', zIndex: 1,
            border: '2.5px solid rgba(232,109,4,0.68)',
            boxShadow: '0 0 32px rgba(232,109,4,0.55), 0 0 64px rgba(232,109,4,0.22)',
            flexShrink: 0,
          }}
        >
          <img
            src={mainLogo}
            alt="Nahid Hasan Ukil"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* ── Name ───────────────────────────────────────────────────────── */}
      <div
        ref={nameRef}
        style={{
          marginTop: 30,
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.15rem, 4vw, 1.55rem)',
          color: textColor,
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        Nahid Hasan Ukil
      </div>

      {/* ── Subtitle ───────────────────────────────────────────────────── */}
      <div
        ref={subtitleRef}
        style={{
          marginTop: 9,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          color: '#e86d04',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        Full-Stack Python Developer
      </div>
    </div>
  );
}
