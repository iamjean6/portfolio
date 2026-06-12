import { Menu, X } from 'lucide-react';
import { memo, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Homepage = () => {
  const container = useRef();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useGSAP(() => {
    if (!fontsLoaded) return; // Prevent GSAP from splitting text before custom fonts are ready

    const split1 = new SplitText('.split-text-target-1', { type: 'lines, words, chars' });
    const split2 = new SplitText('.split-text-target-2', { type: 'lines, words, chars' }); 

    // 1. Text Swap Timeline
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tall-scroll-container", 
        start: "top top",           
        end: "+=150%", // EXACTLY 1.5 screens of scrolling
        scrub: 1,                   
      }
    });

    textTl.to(split1.chars, {
      y: -50,         
      opacity: 0,     
      stagger: 0.01,
      duration: 0.5,
      ease: "power2.inOut"
    });
    
    textTl.set(".split-text-target-2", { opacity: 1, pointerEvents: "auto" }, "<");

    textTl.from(split2.chars, {
      y: 50,          
      opacity: 0,     
      stagger: 0.02,
      duration: 0.8,
      ease: "power2.out"
    }, "<0.2"); 

    // 2. Cards Animation
    gsap.from(".animate-from-left", {
      scrollTrigger: {
        trigger: ".tall-scroll-container",
        start: "top top",
        end: "+=150%", // EXACTLY 1.5 screens of scrolling
        scrub: 1,
      },
      x: -150, 
      y: 150,
      opacity: 0,
      ease: "power3.out"
    });

    // 3. Socials Animation
    gsap.from(".animate-from-right", {
      scrollTrigger: {
        trigger: ".tall-scroll-container",
        start: "top top",
        end: "+=150%", // EXACTLY 1.5 screens of scrolling
        scrub: 1,
      },
      x: 150, 
      opacity: 0,
      ease: "power3.out"
    });

  }, { scope: container, dependencies: [fontsLoaded] }); 

  return (
    // Added explicit style height to strictly enforce 300vh and prevent layout collapsing
    <div className="tall-scroll-container relative w-full font-sans" style={{ height: '300vh' }}>
      <div ref={container} className="sticky top-0 h-screen w-full" style={{overflow: 'clip'}}>
        {/* 1. Hero Image */}
        <img 
          src="/img/Cap.jpg" 
          alt="Hero Portrait" 
          className="absolute inset-0 w-full h-full object-cover -z-10 overflow-hidden"
        />

        {/* 2. Top Left Nav (Glassmorphism Pill) */}
        <nav className="hidden absolute md:top-8 md:left-8 md:flex md:gap-4 md:gap-6 md:bg-white/10 md:backdrop-blur-md md:px-4 md:px-6 md:py-2 md:rounded-full md:border md:border-white/20 md:items-center md:z-10">
          <a href="#" className="bg-white text-black px-4 py-1 rounded-full no-underline font-semibold text-xs md:text-sm">Home</a>
          <a href="#" className="flex text-white no-underline items-center opacity-80 text-sm hover:opacity-100 transition-opacity">Cases</a>
          <a href="#" className="block text-white no-underline opacity-80 text-sm hover:opacity-100 transition-opacity">Service</a>
          <a href="#" className="block text-white no-underline opacity-80 text-sm hover:opacity-100 transition-opacity">About</a>
        </nav>

        {/* 3. Top Right Hamburger Menu */}
        <div className="absolute top-10 right-8 flex flex-col gap-[6px] cursor-pointer z-10 hover:opacity-80 transition-opacity">
          <Menu className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>

        {/* 4. Center Left Main Typography */}
        <div className="absolute top-[40%] md:top-1/2 left-4 md:left-8 -translate-y-1/2 max-w-[90vw] md:max-w-[700px] z-10">
          <p className="text-[0.7rem] md:text-[0.9rem] mb-2 md:mb-4 border-l-2 border-white/50 pl-2 md:pl-3 opacity-80 uppercase tracking-widest">Creative agency</p>
          <div className="relative w-full">
            {/* Initial Text */}
            <h1 className="split-text-target-1 text-4xl sm:text-5xl md:text-6xl  font-bold font-vend leading-[1.05] uppercase tracking-[-0.02em]">
              Design that<br />captivates today<br />& inspires<br />tomorrow.
            </h1>
            
            {/* Second Text (Appears on Scroll) */}
            <h1 className="split-text-target-2 absolute top-0 left-0 w-full font-vend text-4xl sm:text-5xl md:text-6xl  font-bold leading-[1.05] uppercase tracking-[-0.02em] opacity-0 pointer-events-none">
              Building<br />digital<br />experiences<br />for the future.
            </h1>
          </div>
        </div>

        {/* 5. Center Right Secondary Text */}
        <div className="hidden lg:block absolute top-1/2 right-8 -translate-y-1/2 text-right z-10">
          <h2 className="text-xl font-semibold  font-alfa uppercase mb-4 tracking-[0.05em] leading-snug">Branding<br />Art Direction<br />Digital Identity</h2>
          <p className="text-[0.85rem] font-alfa opacity-60 max-w-[200px] ml-auto">Architecting bold visual languages for growth</p>
        </div>

        {/* 6. Bottom Left Glass Cards */}
        <div className="animate-from-left absolute bottom-6 sm:bottom-4 left-8 md:left-8 flex flex-col sm:flex-row gap-1 z-10">
          
          <div className=" border border-white/10 rounded-full  p-4 md:p-6 w-24 h-24 md:h-28 md:w-28 flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <img src="/img/pfp.jpg" alt="" srcset="" className='w-full h-full rounded-full' />
          </div>
          <div className=" h-20 w-20 md:h-28 md:w-28 border border-white/10 rounded-full  p-4 md:p-6   flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <p className="text-lg md:text-lg  font-bold italic font-grunge">JEAN POWELL</p>
          </div>
        </div>

        {/* 7. Bottom Right Socials Pill */}
        <div className="animate-from-right absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 md:gap-5 bg-white/5 backdrop-blur-xl border border-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full items-center z-10">
          <div className="cursor-pointer hover:opacity-80 transition-opacity w-5 h-5 md:h-8 md:w-8">
              <img src="img/ig.svg" alt="Instagram" className='object-cover w-full h-full' />
          </div>
          <div className="cursor-pointer hover:opacity-80 transition-opacity w-5 h-5 md:h-8 md:w-8">
              <img src='/img/facebook.svg' alt="Facebook" className='object-cover h-full w-full' />
          </div>
          <div className="cursor-pointer w-5 h-5 md:h-8 md:w-8 hover:opacity-80 transition-opacity">
              <img src="/img/linkedin.svg" alt="LinkedIn" className='object-cover w-full h-full' />
          </div>
          <div className="cursor-pointer w-5 h-5 md:h-8 md:w-8 hover:opacity-80 transition-opacity">
              <img src="/img/gmail.svg" alt="Email" className='object-cover w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Homepage);