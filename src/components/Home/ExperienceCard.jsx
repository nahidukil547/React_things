import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ExperienceCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".card-img-right", {
        x: 100,
        opacity: 0,
        duration: 1,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full h-screen flex items-center justify-center bg-black text-white relative overflow-hidden"
    >
      {/* LEFT IMAGE */}
      <div className="card-img-left absolute left-10 w-[300px] h-[400px] rounded-3xl overflow-hidden transform -rotate-6 shadow-2xl">
        <img
          src="https://picsum.photos/400/600?random=1"
          alt="left"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT IMAGE */}
      <div className="card-img-right absolute right-10 w-[300px] h-[400px] rounded-3xl overflow-hidden transform rotate-6 shadow-2xl">
        <img
          src="https://picsum.photos/400/600?random=2"
          alt="right"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="card-content text-center z-10">
        <h1 className="text-5xl font-bold mb-4">Trampoline</h1>
        <p className="text-gray-400 mb-6">Ready to Bounce?</p>

        <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
          Know More
        </button>
      </div>
    </div>
  );
}