import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python / Django', level: 92 },
  { name: 'Django REST Framework', level: 88 },
  { name: 'PostgreSQL', level: 85 },
  { name: 'React.js / Next.js', level: 78 },
  { name: 'JavaScript (ES6+)', level: 75 },
  { name: 'AWS S3 / Cloud', level: 65 },
];

const interests = [
  { icon: '⚡', label: 'API Performance' },
  { icon: '🤖', label: 'AI Integration' },
  { icon: '🏗️', label: 'SaaS Architecture' },
  { icon: '🗄️', label: 'Database Optimization' },
  { icon: '☁️', label: 'Cloud & DevOps' },
  { icon: '🔐', label: 'Auth & Security' },
];

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const barsRef = useRef([]);
  const interestsRef = useRef(null);

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
      contentRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
      }
    );

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const fill = bar.querySelector('.skill-fill');
      const level = skills[i]?.level || 0;
      gsap.fromTo(
        fill,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        }
      );
    });

    if (interestsRef.current) {
      gsap.fromTo(
        [...interestsRef.current.children],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: interestsRef.current, start: 'top 85%' },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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
              Who I Am
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
            About{' '}
            <span
              style={{
                color: '#e86d04',
                textShadow: isDark ? '0 0 40px rgba(232,109,4,0.4)' : 'none',
              }}
            >
              Me
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Bio */}
          <div ref={contentRef}>
            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background: isDark ? 'rgba(255,247,241,0.03)' : 'rgba(11,11,11,0.03)',
                border: `1px solid ${isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{
                  color: '#e86d04',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                The Developer
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{
                  color: isDark ? 'rgba(255,247,241,0.65)' : 'rgba(11,11,11,0.65)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                I'm a Full-Stack Python Developer with 1.5+ years of production
                experience building AI-powered platforms, SaaS products, and scalable
                REST APIs. Currently at OPZO Technologies developing ERP modules with
                Django and DRF; previously at Izaan School of Engineering where I built
                a complete LMS platform and Talent Hunting Portal from the ground up.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: isDark ? 'rgba(255,247,241,0.65)' : 'rgba(11,11,11,0.65)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                I enjoy solving real backend problems — optimizing slow queries,
                designing clean REST APIs, and integrating AI features into production
                systems. I thrive in remote-friendly, fast-moving startup environments
                with clear async communication.
              </p>
            </div>

            {/* Interests */}
            <h3
              className="text-base font-bold mb-4"
              style={{
                color: isDark ? '#fff7f1' : '#0b0b0b',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Areas of Interest
            </h3>
            <div ref={interestsRef} className="grid grid-cols-2 gap-3">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                  style={{
                    background: isDark ? 'rgba(255,247,241,0.03)' : 'rgba(11,11,11,0.03)',
                    border: `1px solid ${isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -3,
                      borderColor: 'rgba(232,109,4,0.3)',
                      duration: 0.25,
                      ease: 'power2.out',
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      borderColor: isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)',
                      duration: 0.25,
                      ease: 'power2.out',
                    });
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: isDark ? 'rgba(255,247,241,0.7)' : 'rgba(11,11,11,0.7)',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Skills */}
          <div>
            <h3
              className="text-base font-bold mb-6"
              style={{
                color: isDark ? '#fff7f1' : '#0b0b0b',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Technical Skills
            </h3>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  ref={(el) => (barsRef.current[i] = el)}
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isDark ? 'rgba(255,247,241,0.8)' : 'rgba(11,11,11,0.8)',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{
                      background: isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)',
                    }}
                  >
                    <div
                      className="skill-fill h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #e86d04, #ff9a3c)',
                        boxShadow: '0 0 8px rgba(232,109,4,0.5)',
                        width: '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education / Certifications */}
            <div
              className="mt-10 rounded-2xl p-6"
              style={{
                background: isDark ? 'rgba(232,109,4,0.05)' : 'rgba(232,109,4,0.04)',
                border: '1px solid rgba(232,109,4,0.2)',
              }}
            >
              <h3
                className="text-base font-bold mb-4"
                style={{ color: '#e86d04', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Education & Certifications
              </h3>
              {[
                { title: 'B.S. Computer Engineering', sub: 'Canadian University of Bangladesh • 2024', icon: '🎓' },
                { title: 'Diploma, Computer Science Eng.', sub: 'Bangladesh Skill Development Institute • 2019–2023', icon: '📜' },
                { title: 'AI/ML Integration', sub: 'Google Gemini API in live e-commerce prod', icon: '🤖' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 mb-3 last:mb-0"
                >
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{
                        color: isDark ? '#fff7f1' : '#0b0b0b',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        color: isDark ? 'rgba(255,247,241,0.4)' : 'rgba(11,11,11,0.4)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
