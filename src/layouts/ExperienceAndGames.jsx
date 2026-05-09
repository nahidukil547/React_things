import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "../components/Home/ExperienceCard";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceAndGames() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const scrollEl = scrollRef.current;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".exp-card");

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          end: () => "+=" + scrollEl.offsetWidth,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-black text-white overflow-hidden">
      <h1 className="text-4xl font-bold text-center py-10">
        Experience & Games
      </h1>

      <div
        ref={scrollRef}
        className=""
      >
        <ExperienceCard />
      </div>
    </section>
  );
}