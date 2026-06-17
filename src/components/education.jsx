import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { id: 1, type: 'Degree', title: 'B.Sc. Computer Science', date: '2018 - 2022', desc: 'Core modules in Data Structures, Algorithms, Software Engineering, and AI.', img: '/img/placeholder1.jpg' },
  { id: 2, type: 'Certificate', title: 'Google Cloud Data Engineer', date: '2023', desc: 'Professional certification demonstrating proficiency in designing and building data processing systems.', img: '/img/placeholder2.jpg' },
  { id: 3, type: 'Certificate', title: 'AWS Solutions Architect', date: '2023', desc: 'Associate level certification covering core AWS services and best practices.', img: '/img/placeholder3.jpg' },
  { id: 4, type: 'Specialization', title: 'DeepLearning.AI TensorFlow', date: '2022', desc: 'Advanced neural network architectures and deep learning applications.', img: '/img/placeholder4.jpg' },
  { id: 5, type: 'Bootcamp', title: 'React Native & Redux', date: '2021', desc: 'Intensive mobile development bootcamp focusing on cross-platform apps.', img: '/img/placeholder5.jpg' },
  { id: 6, type: 'Course', title: 'Advanced CSS and Sass', date: '2020', desc: 'Mastery of modern CSS layouts, animations, and preprocessors.', img: '/img/placeholder6.jpg' },
  { id: 7, type: 'Course', title: 'Machine Learning A-Z', date: '2020', desc: 'Comprehensive guide to ML algorithms in Python and R.', img: '/img/placeholder7.jpg' },
  { id: 8, type: 'Course', title: 'Node.js Developer', date: '2019', desc: 'Backend development, REST APIs, and database integration.', img: '/img/placeholder8.jpg' },
  { id: 9, type: 'Diploma', title: 'High School Diploma', date: '2014 - 2018', desc: 'Focus on Mathematics and Physical Sciences.', img: '/img/placeholder9.jpg' }
];

const Education = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      if (isMobile) {
        // MOBILE LOGIC: Paginate 9 individual cards
        const cards = gsap.utils.toArray('.edu-card');
        
        // Hide all cards except the first one initially
        gsap.set(cards.slice(1), { autoAlpha: 0, xPercent: 100 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 80}%`, // Gives plenty of scroll distance for 9 cards
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            // Slide current out, next one in
            tl.to(card, { autoAlpha: 0, xPercent: -50, duration: 1, ease: "power2.inOut" })
              .to(cards[i+1], { autoAlpha: 1, xPercent: 0, duration: 1, ease: "power2.inOut" }, "<")
              // Small reading pause
              .to({}, { duration: 0.5 });
          }
        });
      } else {
        // DESKTOP LOGIC: Simple clean grid, no complex GSAP that might hide items
        gsap.set('.edu-card', { autoAlpha: 1, xPercent: 0, yPercent: 0 }); // ensure visibility
      }
    });
  }, { scope: containerRef });

  return (
    <section id="education" ref={containerRef} className="relative w-full bg-[#f4f4f4] text-[#111] py-12 md:py-24 overflow-hidden min-h-screen flex flex-col items-center">
      
      {/* Editorial Header */}
      <div className="w-full max-w-7xl px-6 md:px-12 mb-8 md:mb-16">
        <div className="border-b-4 border-[#111] pb-4 flex justify-between items-end">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none m-0">Education</h1>
          <span className="hidden md:block text-sm uppercase tracking-widest font-bold">Certificates & Degrees</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-7xl px-6 md:px-12 flex-1 relative">
        {/* On mobile: full height container for absolute stacking. On desktop: auto-flowing 3-column grid */}
        <div className="w-full h-[500px] md:h-auto md:grid md:grid-cols-3 gap-8 relative md:static">
          
          {educationData.map((item) => (
            <div 
              key={item.id} 
              className="edu-card flex flex-col border border-[#111]/20 bg-white p-4 md:p-6 shadow-[4px_4px_0_#111] hover:shadow-[8px_8px_0_#111] hover:-translate-y-1 transition-all duration-300 absolute inset-0 md:relative md:inset-auto"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-[#111]/10 pb-2 mb-4">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[#111] rounded-full">{item.type}</span>
                <span className="text-xs font-mono text-[#111]/60">{item.date}</span>
              </div>
              
              {/* Card Image Placeholder */}
              <div className="w-full h-40 md:h-48 bg-zinc-200 mb-4 border border-[#111]/10 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 shrink-0">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] to-transparent mix-blend-overlay"></div>
                  <div className="w-full h-full flex items-center justify-center font-black text-[#111]/10 text-6xl select-none">{item.id}</div>
              </div>
              
              {/* Card Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2 uppercase shrink-0">{item.title}</h3>
                <p className="text-sm md:text-base text-[#111]/70 leading-relaxed font-serif overflow-y-auto">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
      
      {/* Mobile Pagination Indicator */}
      <div className="md:hidden absolute bottom-6 flex gap-2 z-10 items-center text-xs font-bold tracking-widest uppercase">
         Swipe / Scroll to view more
      </div>

    </section>
  );
};

export default Education;
