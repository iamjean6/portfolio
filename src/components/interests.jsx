import { memo, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { Particles } from './Particles';
import { Cpu, BrainCircuit, Database, Palette, Code2, TerminalSquare } from 'lucide-react';
import IntroCard from '../cards/IntroCard';
import DefaultCard from '../cards/DefaultCard';
import SingleDoodleArrow from './SliderArrows';
import AIEngineeringCard from '../cards/AIEngineeringCard';
import DataScienceCard from '../cards/DataScienceCard';
import WebDesignCard from '../cards/WebDesignCard';
import SWECard from '../cards/SWECard';
import DevOpsCard from '../cards/DevOpsCard';


gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  // index 0 → IntroCard (no bgType/bgSrc needed, handled separately)
  { title: "Machine Learning",      icon: <Cpu className="w-6 h-6" />,           iconColor: "text-blue-500",    desc: "Building predictive models and deep learning architectures.",          bgType: 'image', bgSrc: '' },
  { title: "AI Engineering",        icon: <BrainCircuit className="w-6 h-6" />,  iconColor: "text-purple-500",  desc: "Developing intelligent agents and deploying LLMs.",                   bgType: 'video', bgSrc: '' },
  { title: "Data Science",          icon: <Database className="w-6 h-6" />,       iconColor: "text-emerald-500", desc: "Extracting actionable insights from massive datasets.",                bgType: 'image', bgSrc: '' },
  { title: "Web Design",            icon: <Palette className="w-6 h-6" />,        iconColor: "text-pink-500",    desc: "Crafting beautiful, responsive, and highly interactive interfaces.",   bgType: 'image', bgSrc: '' },
  { title: "Software Engineering",  icon: <Code2 className="w-6 h-6" />,          iconColor: "text-amber-500",   desc: "Architecting scalable, robust backend and frontend systems.",          bgType: 'video', bgSrc: '' },
  { title: "DevOps Engineering",    icon: <TerminalSquare className="w-6 h-6" />, iconColor: "text-rose-500",    desc: "Streamlining deployment pipelines and CI/CD.",                        bgType: 'image', bgSrc: '' },
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
          preventOverlaps: true,
          fastScrollEnd: true,
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
          preventOverlaps: true,
          fastScrollEnd: true,
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
            const cardWidth = 480; // Card is 440px, so 480 gives a gap
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

      {/* LEFT arrow - absolutely positioned on the left edge */}
      <div className={`absolute left-2 md:left-8 top-[55%] -translate-y-1/2 z-20 transition-opacity duration-500 ${showArrows ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <SingleDoodleArrow
          direction="prev"
          onClick={handlePrev}
          disabled={activeIndex === 0}
        />
      </div>

      {/* RIGHT arrow - absolutely positioned on the right edge */}
      <div className={`absolute right-2 md:right-8 top-[55%] -translate-y-1/2 z-20 transition-opacity duration-500 ${showArrows ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <SingleDoodleArrow
          direction="next"
          onClick={handleNext}
          disabled={activeIndex >= (isMobile ? projectsData.length - 1 : projectsData.length - 2)}
        />
      </div>

      <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center pointer-events-none">
        {projectsData.map((data, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            // Responsive width and height for mobile. Pushed down to top-[55%]
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[440px] h-[320px] md:h-[420px] pointer-events-auto group opacity-0"
          >
            {index === 0 ? <IntroCard />
              : index === 1 ? <AIEngineeringCard />
              : index === 2 ? <DataScienceCard />
              : index === 3 ? <WebDesignCard /> 
              : index === 4 ? <SWECard />
              : index === 5 ? <DevOpsCard />
              : <DefaultCard data={data} />}
          </div>
        ))}
      </div>
   </section>
  );
};

export default memo(Interests);