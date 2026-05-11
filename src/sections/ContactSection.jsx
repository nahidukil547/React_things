import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: '🐙', label: 'GitHub', handle: '@nahidukil547', href: 'https://github.com/nahidukil547' },
  { icon: '💼', label: 'LinkedIn', handle: 'Nahid Hasan Ukil', href: 'https://www.linkedin.com/in/nahid-hasan-ukil-a3bb43297/' },
  { icon: '📧', label: 'Email', handle: 'nahidukil547@gmail.com', href: 'mailto:nahidukil547@gmail.com' },
  { icon: '🌐', label: 'Portfolio', handle: 'nahidhasanukil.vercel.app', href: 'https://nahidhasanukil.vercel.app' },
];

export default function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const socialsRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      }
    );
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      }
    );
    gsap.fromTo(
      [...(socialsRef.current?.children || [])],
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: socialsRef.current, start: 'top 85%' },
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormState({ name: '', email: '', subject: '', message: '' });
      },
    });
  };

  const inputStyle = {
    background: isDark ? 'rgba(255,247,241,0.04)' : 'rgba(11,11,11,0.04)',
    border: `1px solid ${isDark ? 'rgba(255,247,241,0.1)' : 'rgba(11,11,11,0.1)'}`,
    color: isDark ? '#fff7f1' : '#0b0b0b',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = 'rgba(232,109,4,0.5)';
    e.target.style.boxShadow = '0 0 0 3px rgba(232,109,4,0.1)';
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = isDark ? 'rgba(255,247,241,0.1)' : 'rgba(11,11,11,0.1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-16 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: '#e86d04', boxShadow: '0 0 8px #e86d04' }}
            />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Let's Connect
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: isDark ? '#fff7f1' : '#0b0b0b',
              letterSpacing: '-0.03em',
            }}
          >
            Get In{' '}
            <span
              style={{
                color: '#e86d04',
                textShadow: isDark ? '0 0 40px rgba(232,109,4,0.4)' : 'none',
              }}
            >
              Touch
            </span>
          </h2>
          <p
            className="text-base max-w-lg"
            style={{
              color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Have a project in mind or want to discuss opportunities?
            I'm always open to new challenges and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form - 3 cols */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-xs font-semibold mb-2 tracking-wider"
                    style={{ color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)', fontFamily: 'Space Grotesk' }}
                  >
                    NAME
                  </label>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold mb-2 tracking-wider"
                    style={{ color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)', fontFamily: 'Space Grotesk' }}
                  >
                    EMAIL
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-xs font-semibold mb-2 tracking-wider"
                  style={{ color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)', fontFamily: 'Space Grotesk' }}
                >
                  SUBJECT
                </label>
                <input
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="Project collaboration, Job opportunity..."
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-xs font-semibold mb-2 tracking-wider"
                  style={{ color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)', fontFamily: 'Space Grotesk' }}
                >
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={6}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-300"
                style={{
                  background: submitted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #e86d04, #ff9a3c)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  boxShadow: submitted
                    ? '0 0 30px rgba(34,197,94,0.4)'
                    : '0 0 30px rgba(232,109,4,0.35)',
                }}
                onMouseEnter={(e) => {
                  if (!submitted) gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                }}
              >
                {submitted ? '✓ MESSAGE SENT!' : 'SEND MESSAGE →'}
              </button>
            </form>
          </div>

          {/* Social Links - 2 cols */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3
                className="text-sm font-bold mb-6 tracking-wider"
                style={{
                  color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                FIND ME ON
              </h3>
              <div ref={socialsRef} className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group"
                    style={{
                      background: isDark ? 'rgba(255,247,241,0.03)' : 'rgba(11,11,11,0.03)',
                      border: `1px solid ${isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        x: 6,
                        borderColor: 'rgba(232,109,4,0.3)',
                        duration: 0.25,
                        ease: 'power2.out',
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        x: 0,
                        borderColor: isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)',
                        duration: 0.25,
                        ease: 'power2.out',
                      });
                    }}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <div>
                      <div
                        className="text-xs font-bold tracking-wider"
                        style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {social.label.toUpperCase()}
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: isDark ? 'rgba(255,247,241,0.6)' : 'rgba(11,11,11,0.6)',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {social.handle}
                      </div>
                    </div>
                    <span
                      className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#e86d04' }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div
              className="mt-8 rounded-2xl p-6"
              style={{
                background: 'rgba(232,109,4,0.06)',
                border: '1px solid rgba(232,109,4,0.25)',
                boxShadow: '0 0 30px rgba(232,109,4,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
                />
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: '#22c55e', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  AVAILABLE FOR HIRE
                </span>
              </div>
              <p
                className="text-sm"
                style={{
                  color: isDark ? 'rgba(255,247,241,0.6)' : 'rgba(11,11,11,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                }}
              >
                Open to full-time roles, contract work, and exciting freelance projects.
                Response time is typically within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div
        className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-4"
        style={{ borderTop: `1px solid ${isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}` }}
      >
        <span
          className="text-xs"
          style={{
            color: isDark ? 'rgba(255,247,241,0.3)' : 'rgb(6 5 5 / 90%)',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          © 2026 Nahid Hasan Ukil. Crafted with passion.
        </span>
        <span
          className="text-xs"
          style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          React · GSAP · TailwindCSS
        </span>
      </div>
    </section>
  );
}
