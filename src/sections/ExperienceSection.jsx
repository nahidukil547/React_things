import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { key: 'software',   label: 'Software',   icon: '💻' },
  { key: 'marketing',    label: 'Marketing',    icon: '📢' },
  { key: 'teaching',     label: 'Teaching',     icon: '📚' },
  { key: 'volunteering', label: 'Volunteering', icon: '🌍' },
  { key: 'hardware',     label: 'Hardware',     icon: '🔧' },
];

const allExperiences = {
  software: [
    {
      role: 'Full-Stack Developer',
      company: 'OPZO Technologies',
      period: 'Sep 2025 – Present',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      description:
        'Designing and developing scalable ERP modules — Sales, Supply Chain, Inventory, and Permission Systems — using Python and Django. Building RESTful APIs for complex business workflows (CS → PR → PO → TR → TP). Optimizing critical PostgreSQL queries through indexing and schema redesign. Collaborating in Agile sprints via Jira.',
      skills: ['Python', 'Django', 'DRF', 'PostgreSQL', 'REST API', 'Linux'],
      highlight: true,
    },
    
  ],
  marketing: [
    {
      role: 'Digital Marketing Analyst',
      company: 'Izaan School of Engineering',
      period: 'Feb 2023 – Sep 2025',
      type: 'Remote',
      location: 'Texas, USA',
      description:
        'Edited and produced promotional and educational videos for marketing and YouTube. Executed targeted email marketing campaigns to boost student enrolment. Managed and grew brand presence across Facebook, Instagram, and LinkedIn. Performed SEO for website pages and blog content. Handled Meta Ads Manager and email marketing tools.',
      skills: ['SEO', 'Email Marketing', 'Meta Ads', 'Social Media', 'Video Production'],
      highlight: false,
    },
    {
      role: 'Digital Marketing Manager',
      company: 'Dot Digital',
      period: 'Feb 2022 – Dec 2022',
      type: 'Full-time',
      location: 'Dhaka, Bangladesh',
      description:
        'Conducted keyword research and optimized web content for on-page SEO to improve organic visibility. Performed technical SEO audits, fixed crawl errors, and improved site structure. Managed social media campaigns across Facebook, Pinterest, and LinkedIn. Led a small team of junior marketers and implemented lead generation strategies through forms, landing pages, and outreach.',
      skills: ['SEO', 'Social Media', 'Email Marketing', 'Lead Generation', 'Team Leadership'],
      highlight: false,
    },
  ],
  teaching: [
    {
      role: 'Teacher',
      company: 'Talimul Quran Nurania Hafizia Madrasha',
      period: 'Feb 2023 – Sep 2023',
      type: 'Part-time',
      location: 'Chandpur, Bangladesh',
      description:
        'Delivered structured lessons in an Islamic educational institution, mentoring students in Quranic studies and foundational academic subjects. Maintained a disciplined learning environment through consistent lesson planning, student engagement, and progress tracking.',
      skills: ['Teaching', 'Mentoring', 'Lesson Planning', 'Communication', 'Patience'],
      highlight: false,
    },
  ],
  volunteering: [
    {
      role: 'Rover Scout & Joti Joto Member',
      company: 'Bangladesh Scouts',
      period: '2019 – 2022',
      type: 'Volunteer',
      location: 'Chandpur, Bangladesh',
      description:
        'Active member of the Bangladesh Scouts movement as both a Rover Scout and Joti Joto member. Participated in community service initiatives, leadership development programs, camping expeditions, and national scouting events. Developed strong teamwork, discipline, and civic responsibility through 3 years of dedicated voluntary service.',
      skills: ['Leadership', 'Community Service', 'Teamwork', 'Event Planning', 'Discipline'],
      highlight: false,
    },
  ],
  hardware: [
    {
      role: 'Hardware Engineer',
      company: 'My Computer Service',
      period: 'Sep 2019 – Jan 2022',
      type: 'Full-time',
      location: 'Chandpur, Bangladesh',
      description:
        'Diagnosed and repaired desktop and laptop hardware issues — motherboard, RAM, HDD/SSD, GPU, and peripheral components. Assembled custom PC builds and performed OS installations and driver configuration. Provided technical support and networking setup for clients across Chandpur district.',
      skills: ['PC Assembly', 'Hardware Repair', 'Troubleshooting', 'Networking', 'OS Installation'],
      highlight: false,
    },
  ],
};

export default function ExperienceSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('software');

  const sectionRef      = useRef(null);
  const titleRef        = useRef(null);
  const tabsRef         = useRef(null);
  const cardsContainerRef = useRef(null);

  // ── Section title — scroll-triggered once ─────────────────────────────
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
      tabsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: tabsRef.current, start: 'top 88%' },
      }
    );
  }, []);

  // ── Animate cards in whenever activeTab changes ────────────────────────
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const cards = [...container.children];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out' }
    );
  }, [activeTab]);

  // ── Tab click: fade out → switch ──────────────────────────────────────
  const handleTabClick = (key) => {
    if (key === activeTab) return;
    const container = cardsContainerRef.current;
    if (!container) { setActiveTab(key); return; }
    const cards = [...container.children];
    gsap.to(cards, {
      opacity: 0, y: -18, duration: 0.2, ease: 'power2.in',
      onComplete: () => setActiveTab(key),
    });
  };

  const experiences = allExperiences[activeTab];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen pt-24 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div ref={titleRef} className="mb-10">
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
            <span style={{ color: '#e86d04', textShadow: isDark ? '0 0 40px rgba(232,109,4,0.4)' : 'none' }}>
              Experience
            </span>
          </h2>
          <p
            className="text-base max-w-lg"
            style={{ color: isDark ? 'rgba(255,247,241,0.5)' : 'rgba(11,11,11,0.5)', fontFamily: 'Inter, sans-serif' }}
          >
            A diverse track record across engineering, marketing, teaching, volunteering, and hardware.
          </p>
        </div>

        {/* ── Tab Navbar ─────────────────────────────────────────────────── */}
        <div ref={tabsRef} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {TABS.map(({ key, label, icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 20px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    fontFamily: 'Space Grotesk, sans-serif',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    border: isActive
                      ? '1px solid #e86d04'
                      : `1px solid ${isDark ? 'rgba(255,247,241,0.12)' : 'rgba(11,11,11,0.12)'}`,
                    background: isActive
                      ? 'linear-gradient(135deg, #e86d04, #ff9a3c)'
                      : isDark ? 'rgba(255,247,241,0.04)' : 'rgba(11,11,11,0.04)',
                    color: isActive
                      ? '#fff'
                      : isDark ? 'rgba(255,247,241,0.6)' : 'rgba(11,11,11,0.55)',
                    boxShadow: isActive ? '0 0 20px rgba(232,109,4,0.35)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) gsap.to(e.currentTarget, { scale: 1.06, duration: 0.2, ease: 'power2.out' });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' });
                  }}
                >
                  <span style={{ fontSize: '13px' }}>{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
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

          <div ref={cardsContainerRef} className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 top-7 w-4 h-4 rounded-full hidden md:flex items-center justify-center z-10"
                  style={{
                    background: exp.highlight ? '#e86d04' : isDark ? '#050515' : 'rgb(234 245 252)',
                    border: '2px solid #e86d04',
                    boxShadow: exp.highlight ? '0 0 16px rgba(232,109,4,0.6)' : 'none',
                  }}
                >
                  {exp.highlight && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-default"
                  style={{
                    background: isDark
                      ? exp.highlight ? 'rgba(232,109,4,0.08)' : 'rgba(255,247,241,0.03)'
                      : exp.highlight ? 'rgba(232,109,4,0.06)' : 'rgba(11,11,11,0.03)',
                    border: `1px solid ${exp.highlight ? 'rgba(232,109,4,0.3)' : isDark ? 'rgba(255,247,241,0.08)' : 'rgba(11,11,11,0.08)'}`,
                    boxShadow: exp.highlight ? '0 0 30px rgba(232,109,4,0.1)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { y: -4, boxShadow: '0 10px 40px rgba(232,109,4,0.15)', duration: 0.3, ease: 'power2.out' });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { y: 0, boxShadow: exp.highlight ? '0 0 30px rgba(232,109,4,0.1)' : 'none', duration: 0.3, ease: 'power2.out' });
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg md:text-xl font-bold mb-1"
                        style={{ color: isDark ? '#fff7f1' : '#0b0b0b', fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: '#e86d04' }}>
                          {exp.company}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(232,109,4,0.1)', color: '#e86d04', border: '1px solid rgba(232,109,4,0.2)', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {exp.type}
                        </span>
                        {exp.location && (
                          <span
                            className="text-xs"
                            style={{ color: isDark ? 'rgba(255,247,241,0.35)' : 'rgba(11,11,11,0.35)', fontFamily: 'Inter, sans-serif' }}
                          >
                            📍 {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium shrink-0"
                      style={{ color: isDark ? 'rgba(255,247,241,0.4)' : 'rgba(11,11,11,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: isDark ? 'rgba(255,247,241,0.6)' : 'rgba(11,11,11,0.6)', fontFamily: 'Inter, sans-serif' }}
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
