import { BadgeCheck, Users, FileCheck, Plus } from 'lucide-react';

/**
 * AIEngineeringCard
 * 
 * Fills the parent GSAP box (w-[220px] md:w-[440px] h-[320px] md:h-[420px])
 * completely. No outer wrapper needed — the GSAP div IS the sizing box.
 */
const AIEngineeringCard = () => {
  return (
    // fill the GSAP container 100%
    <div className="relative w-full h-full overflow-hidden rounded-[42px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

      {/* Background Image — replace src with your real asset */}
      <img
        src="/img/ai.jpg"
        alt="AI Engineering"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Glassmorphism Content Card pinned to the bottom */}
      <div className="absolute bottom-3 left-3 right-3">

          {/* Title */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl text-red-700 md:text-2xl font-grunge font-semibold leading-none ">
              AI Engineering
            </h2>
            <BadgeCheck className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 flex-shrink-0" />
          </div>

          {/* Description */}
          <p className="mt-2 md:mt-3 text-xs md:text-sm font-blogger leading-relaxed text-navy-600/80 line-clamp-2">
            Building intelligent agents, fine-tuning LLMs, and deploying production-grade AI systems.
          </p>

          {/* Footer */}
          <div className="mt-3 md:mt-5 flex items-center justify-between">

            {/* Stats */}
            <div className=" hidden md:flex md:gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-white/60" />
                <span className="text-sm md:text-base font-medium text-white">LLMs</span>
              </div>
              <div className="flex items-center gap-1">
                <FileCheck className="h-4 w-4 text-white/60" />
                <span className="text-sm md:text-base font-medium text-white">Agents</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="flex font-grunge italic bg-blue-800 items-center gap-1 rounded-full  px-8 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-semibold shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition hover:scale-105 active:scale-95 text-black">
              View
              <Plus className="h-4 w-4 italic" />
            </button>
          </div>

        </div>
      </div>
   
  );
};

export default AIEngineeringCard;
