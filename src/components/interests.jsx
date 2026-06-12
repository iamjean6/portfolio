import { memo, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { Particles } from './Particles';
import { Cpu, BrainCircuit, Database, Palette, Code2, TerminalSquare, ChevronLeft, ChevronRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { title: "Machine Learning", icon: <Cpu className="w-6 h-6" />, iconColor: "text-blue-500", desc: "Building predictive models and deep learning architectures." },
  { title: "AI Engineering", icon: <BrainCircuit className="w-6 h-6" />, iconColor: "text-purple-500", desc: "Developing intelligent agents and deploying LLMs." },
  { title: "Data Science", icon: <Database className="w-6 h-6" />, iconColor: "text-emerald-500", desc: "Extracting actionable insights from massive datasets." },
  { title: "Web Design", icon: <Palette className="w-6 h-6" />, iconColor: "text-pink-500", desc: "Crafting beautiful, responsive, and highly interactive interfaces." },
  { title: "Software Engineering", icon: <Code2 className="w-6 h-6" />, iconColor: "text-amber-500", desc: "Architecting scalable, robust backend and frontend systems." },
  { title: "DevOps Engineering", icon: <TerminalSquare className="w-6 h-6" />, iconColor: "text-rose-500", desc: "Streamlining deployment pipelines and CI/CD." },
];

const Interests = () => {
    const sectionRef = useRef(null);
    const [canHover, setCanHover] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const cardsRef = useRef([]);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP ANIMATION
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, 
          start: "top top",
          end: "+=400%", 
          scrub: 1,
          pin: true,
          onLeave: () => setCanHover(true),      
          onEnterBack: () => {
            setCanHover(false);
            setIsHovered(false); 
          },
        }
      });

      cardsRef.current.forEach((card, index) => {
        gsap.set(card, { x: window.innerWidth, y: 0, opacity: 0, rotation: 15, scale: 0.8 });
        tl.to(card, { x: 0, opacity: 1, scale: 1.05, rotation: 0, duration: 1, ease: "power2.out" });
        tl.to(card, { scale: 1, duration: 0.3 });
        const xOffset = -window.innerWidth * 0.35 + (index * 20); 
        const stackRotation = -8 + (index * 3); 
        tl.to(card, { x: xOffset, rotation: stackRotation, duration: 1.2, ease: "power2.inOut" });
      });
    });

    // MOBILE ANIMATION
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, 
          start: "top top",
          end: "+=300%", // Slightly shorter scroll for mobile
          scrub: 1,
          pin: true,
          onLeave: () => setCanHover(true),      
          onEnterBack: () => {
            setCanHover(false);
            setIsHovered(false); 
          },
        }
      });

      cardsRef.current.forEach((card, index) => {
        gsap.set(card, { x: window.innerWidth, y: 0, opacity: 0, rotation: 10, scale: 0.8 });
        tl.to(card, { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "power2.out" });
        tl.to(card, { scale: 1, duration: 0.5 });
        // Stack perfectly in the center instead of pushing off to the left
        const stackRotation = -4 + (index * 2); 
        tl.to(card, { x: 0, y: 0, rotation: stackRotation, scale: 0.95, duration: 1, ease: "power2.inOut" });
      });
    });

    return () => mm.revert(); // Clean up matchMedia
  }, { scope: sectionRef, dependencies: [] });

  // Handle Slider/Hover animations dynamically
  useEffect(() => {
    if (!canHover) return;

    if (isMobile) {
      // MOBILE COVER FLOW SLIDER (1 card visible)
      cardsRef.current.forEach((card, index) => {
        if (index === activeIndex) {
          gsap.to(card, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 10, duration: 0.6, ease: "back.out(1.2)", overwrite: "auto" });
        } else if (index < activeIndex) {
          // Tucked behind to the left
          gsap.to(card, { x: -40, y: 0, rotation: -10, scale: 0.85, opacity: 0, zIndex: 5, duration: 0.6, overwrite: "auto" });
        } else {
          // Tucked behind to the right
          gsap.to(card, { x: 40, y: 0, rotation: 10, scale: 0.85, opacity: 0, zIndex: 5, duration: 0.6, overwrite: "auto" });
        }
      });
    } else {
      // DESKTOP FAN OUT (2 cards visible)
      if (!isHovered) {
        cardsRef.current.forEach((card, index) => {
          const xOffset = -window.innerWidth * 0.35 + (index * 20);
          const rotation = -8 + (index * 3);
          gsap.to(card, { x: xOffset, y: 0, rotation: rotation, scale: 1, opacity: 1, zIndex: index, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        });
      } else {
        cardsRef.current.forEach((card, index) => {
          const isVisible = index >= activeIndex && index < activeIndex + 2; 
          
          if (isVisible) {
            const visibleIndex = index - activeIndex; 
            const cardWidth = 480; // Card is 340px, so 440 gives a beautiful 100px gap!
            const totalWidth = 2 * cardWidth; // 2 cards total
            const startX = -totalWidth / 2 + cardWidth / 2;
            const xPos = startX + (visibleIndex * cardWidth);
            gsap.to(card, { x: xPos, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 10, duration: 0.6, ease: "back.out(1.2)", overwrite: "auto" });
          } else if (index < activeIndex) {
            gsap.to(card, { x: -window.innerWidth * 0.6, rotation: -15, opacity: 0, scale: 0.8, duration: 0.6, overwrite: "auto" });
          } else {
            gsap.to(card, { x: window.innerWidth * 0.6, rotation: 15, opacity: 0, scale: 0.8, duration: 0.6, overwrite: "auto" });
          }
        });
      }
    }
  }, [isHovered, activeIndex, isMobile, canHover]);

  const handleMouseEnter = () => {
    if (canHover && !isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovered(false);
  };

  const handleNext = () => {
    const maxIndex = isMobile ? projectsData.length - 1 : projectsData.length - 2; 
    if (activeIndex < maxIndex) setActiveIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  // Determine if arrows should be visible
  const showArrows = (isMobile && canHover) || (!isMobile && isHovered);

  return (
   <section id='interests' ref={sectionRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='relative w-full h-screen bg-neutral-950 overflow-hidden flex items-center justify-center'>
     <Particles
        className="absolute inset-0 pointer-events-auto"
        quantity={100}
        ease={80}
        color="#ffffff" 
        refresh
      />
      <h2 className="absolute z-10 top-8 md:top-12 text-3xl md:text-6xl font-blackwood text-white uppercase tracking-widest opacity-80">
        Interests & Focus
      </h2>

      {/* Slider Navigation Arrows - Pushed down to top-[55%] */}
      <div className={`absolute inset-x-0 top-[55%] -translate-y-1/2 flex justify-between px-2 md:px-12 z-20 transition-opacity duration-500 pointer-events-none ${showArrows ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handlePrev} 
          disabled={activeIndex === 0}
          className="p-2 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white disabled:opacity-0 disabled:cursor-not-allowed pointer-events-auto transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={handleNext} 
          disabled={activeIndex >= (isMobile ? projectsData.length - 1 : projectsData.length - 2)}
          className="p-2 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white disabled:opacity-0 disabled:cursor-not-allowed pointer-events-auto transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center pointer-events-none">
        {projectsData.map((data, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            // Responsive width and height for mobile. Pushed down to top-[55%]
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[440px] h-[320px] md:h-[420px] bg-neutral-900 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-between shadow-2xl overflow-hidden pointer-events-auto cursor-pointer group opacity-0"
          >
            {/* Background Video Layer */}
            <video 
              autoPlay loop muted playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10"
              src="/path-to-your-video.mp4" 
            />
            {/* Top Bar */}
            <div className="flex justify-between items-start">
              <div className={`p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md ${data.iconColor}`}>
                {data.icon}
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 border border-dashed border-white/20 rounded-lg md:rounded-xl flex items-center justify-center text-[8px] md:text-[10px] text-white/40 uppercase tracking-widest font-mono">
                Lottie
              </div>
            </div>
            {/* Middle */}
            <div className="flex flex-col gap-1 md:gap-2 mt-auto mb-2 md:mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white font-alfa leading-tight">
                {data.title}
              </h3>
              <div className="h-[2px] w-6 md:w-8 bg-white/20 my-1 md:my-2 rounded-full"></div>
              <p className="text-[10px] md:text-xs text-white/60 font-sans leading-relaxed line-clamp-3 md:line-clamp-none">
                {data.desc}
              </p>
            </div>
            {/* Bottom */}
            <button className="w-full py-2 md:py-3 bg-white text-black font-bold rounded-lg md:rounded-xl text-xs md:text-sm hover:bg-neutral-200 transition-colors uppercase tracking-wider font-changa">
              View Projects
            </button>
          </div>
        ))}
      </div>
   </section>
  );
};

export default memo(Interests);