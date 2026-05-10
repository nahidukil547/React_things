import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'TechNova Inc.',
    period: '2023 – Present',
    type: 'Full-time',
    description:
      'Led development of a real-time data platform serving 2M+ users. Architected microservices infrastructure on AWS, reducing latency by 60%. Mentored a team of 6 engineers.',
    skills: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Redis'],
    highlight: true,
  },
  {
    role: 'Software Engineer',
    company: 'Velocity Labs',
    period: '2021 – 2023',
    type: 'Full-time',
    description:
      'Built high-performance mobile applications with React Native. Implemented CI/CD pipelines and automated testing frameworks. Delivered 12 successful product launches.',
    skills: ['React Native', 'TypeScript', 'GraphQL', 'MongoDB'],
    highlight: false,
  },
  {
    role: 'Frontend Developer',
    company: 'Pixel Studio',
    period: '2020 – 2021',
    type: 'Contract',
    description:
      'Developed interactive web applications for clients across fintech, healthcare, and e-commerce. Focused on performance optimization and accessibility standards.',
    skills: ['React', 'GSAP', 'Tailwind', 'Figma'],
    highlight: false,
  },
  {
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 – 2020',
    type: 'Full-time',
    description:
      'Contributed to the core product codebase. Implemented UI components, REST API integrations, and unit testing. Gained hands-on experience in agile development.',
    skills: ['JavaScript', 'Vue.js', 'Python', 'MySQL'],
    highlight: false,
  },
];

export default function ExperienceSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.05,
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
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
              Career Journey
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
            Work{' '}
            <span
              style={{
                color: '#e86d04',
                textShadow: isDark ? '0 0 40px rgba(232,109,4,0.4)' : 'none',
              }}
            >
              Experience
            </span>
          </h2>
          <p
            className="text-base max-w-lg"
            style={{
              color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            A track record of building impactful products and leading engineering teams.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, #e86d04, rgba(232,109,4,0.1))'
                : 'linear-gradient(to bottom, #e86d04, rgba(232,109,4,0.15))',
            }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 top-7 w-4 h-4 rounded-full hidden md:flex items-center justify-center z-10"
                  style={{
                    background: exp.highlight ? '#e86d04' : isDark ? '#050515' : '#fff7f1',
                    border: '2px solid #e86d04',
                    boxShadow: exp.highlight ? '0 0 16px rgba(232,109,4,0.6)' : 'none',
                  }}
                >
                  {exp.highlight && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-6 md:p-8 transition-all duration-300 group cursor-default"
                  style={{
                    background: isDark
                      ? exp.highlight
                        ? 'rgba(232,109,4,0.08)'
                        : 'rgba(255,247,241,0.03)'
                      : exp.highlight
                        ? 'rgba(232,109,4,0.06)'
                        : 'rgba(11,11,11,0.03)',
                    border: `1px solid ${exp.highlight ? 'rgba(232,109,4,0.3)' : isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
                    boxShadow: exp.highlight ? '0 0 30px rgba(232,109,4,0.1)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -4,
                      boxShadow: '0 10px 40px rgba(232,109,4,0.15)',
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      boxShadow: exp.highlight ? '0 0 30px rgba(232,109,4,0.1)' : 'none',
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg md:text-xl font-bold mb-1"
                        style={{
                          color: isDark ? '#fff7f1' : '#0b0b0b',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: '#e86d04' }}
                        >
                          {exp.company}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(232,109,4,0.1)',
                            color: '#e86d04',
                            border: '1px solid rgba(232,109,4,0.2)',
                            fontFamily: 'Space Grotesk, sans-serif',
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium shrink-0"
                      style={{
                        color: isDark ? 'rgba(255,247,241,0.4)' : 'rgba(11,11,11,0.4)',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{
                      color: isDark ? 'rgba(255,247,241,0.6)' : 'rgba(11,11,11,0.6)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          background: isDark ? 'rgba(255,247,241,0.06)' : 'rgba(11,11,11,0.05)',
                          color: isDark ? 'rgba(255,247,241,0.7)' : 'rgba(11,11,11,0.7)',
                          border: isDark ? '1px solid rgba(255,247,241,0.1)' : '1px solid rgba(11,11,11,0.1)',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
