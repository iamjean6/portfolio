import { memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { Disc3 } from 'lucide-react';
import { Particles } from './Particles';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // 1. Spinning Disc Animation
    gsap.to(".spinning-disc", {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=400%",
        scrub: 1, 
      }
    });

    // 2. Sliding Door Animation (Shrinks to the LEFT on ALL screens)
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "50%", // ALWAYS shrink width, never height
      ease: "power3.inOut"     
    });
  });

  return (
    // Main Pinning Container
    <div id='about' className="relative w-full h-screen bg-neutral-950 text-white overflow-hidden">
      
      {/* 1. Right Side Content */}
      <div className='absolute top-0 right-0 w-1/2 h-full flex flex-col justify-start  p-4 md:p-8 lg:p-16 box-border'>
        
        {/* === Interactive Particles Background === */}
        <Particles
          className="absolute inset-0 pointer-events-auto"
          quantity={100}
          ease={80}
          color="#ffffff" // White particles for dark background
          refresh
        />
        

        {/* Content Wrapper */}
        <div className='relative z-10 pt-6 md:pt-0'>
          
          <h2 className='text-3xl md:text-6xl lg:text-7xl font-bold font-blackwood uppercase mb-4 md:mb-8 tracking-wide'>
            About Me
          </h2>

          {/* === MOBILE SUMMARY (Visible ONLY on phones) === */}
          <div className='block md:hidden'>
            <p className='text-xs sm:text-sm font-blogger leading-relaxed opacity-80'>
              I am a passionate designer specializing in intuitive interfaces and visually stunning digital experiences. Rooted in empathy, my approach ensures every project—from websites to brand identities—meets unique user needs while exploring the cutting-edge intersection of art and technology.
            </p>
          </div>
          
          {/* === DESKTOP LIST ITEMS (Visible ONLY on tablets/desktop) === */}
          {/* List Item 1 */}
          <div className='hidden md:flex gap-3 mb-6 items-start'>
            <h3 className='font-changa text-3xl md:text-6xl font-bold leading-none m-0 text-transparent [-webkit-text-stroke:1px_white]'>
              1.
            </h3>
            <p className='text-sm font-blogger md:text-base leading-relaxed opacity-80 pt-1 md:pt-2'>
              I'm a passionate designer with a knack for crafting visually stunning and user-friendly digital experiences. With a background in graphic design and a love for technology, I specialize in creating intuitive interfaces that not only look great but also provide seamless functionality.
            </p>
          </div>
          
          {/* List Item 2 */}
          <div className='hidden md:flex gap-3 mb-6 items-start'>
            <h3 className='font-changa text-3xl md:text-6xl font-bold leading-none m-0 text-transparent [-webkit-text-stroke:1px_white]'>
              2.
            </h3>
            <p className='text-sm font-blogger md:text-base leading-relaxed opacity-80 pt-1 md:pt-2'>
              My approach to design is rooted in empathy, ensuring that every project I work on is tailored to meet the unique needs of its users. Whether it's designing a website, an app, or a brand identity, I strive to bring creativity and innovation to every project I undertake.
            </p>
          </div>
          
          {/* List Item 3 */}
          <div className='hidden md:flex gap-3 mb-6 items-start'>
            <h3 className='font-changa text-3xl md:text-6xl font-bold leading-none m-0 text-transparent [-webkit-text-stroke:1px_white]'>
              3.
            </h3>
            <p className='text-sm font-blogger md:text-base leading-relaxed opacity-80 pt-1 md:pt-2'>
              When I'm not designing, I enjoy exploring the intersection of art and technology, seeking out new tools and techniques to refine my craft and deliver the most impactful and engaging user experiences possible.
            </p>
          </div>

        </div>
      </div>
      
      {/* 2. Left Side Image Mask (Starts full screen) */}
      <div className='mask-clip-path absolute top-0 left-0 w-full h-full z-10 overflow-hidden'>
        <img src="/img/aesthetic.jpg" alt="Background" className='w-full h-full object-cover' />
      </div>

    </div>
  );
};

export default memo(About);