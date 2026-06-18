import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { id: 1, type: 'Degree', title: 'B.Sc. Statistics and Comp Science', date: '2023 - Present', desc: 'Bachelors degree for the foundational knowledge of my data and computer science path. Currently enrolled at the Technical University of Mombasa.', img: '/img/placeholder1.jpg',link:''},
  { id: 2, type: 'Certificate', title: 'Data Science: Foundations using R', date: '2025', desc: 'Professional certification demonstrating proficiency in using R language to analyse data and train machine learning models.', img: '/img/johns-hopkins-university.svg',link:" https://www.coursera.org/account/accomplishments/specialization/SXIKTAN6QA0C?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n"  },
  { id: 3, type: 'Certificate', title: 'Google Data Analytics', date: '2025', desc: 'Intermediate level certification covering core data analysis techniques and best practices.', img: '/img/google.svg', link:"https://www.coursera.org/account/accomplishments/specialization/Q7J848P8KIV6?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n" },
  { id: 4, type: 'Certificate', title: 'Google Advanced Data Analytics', date: '2025', desc: 'Advanced data science techniques for training Machine Learning Models in python', img: '/img/google.svg', link:"https://www.coursera.org/account/accomplishments/specialization/XHR3CPIXA1OY?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n" },
  { id: 5, type: 'Certificate', title: 'Python for Everybody', date: '2025', desc: 'Beginner level certification teaching python fundamentals.', img: '/img/university-of-michigan-3.svg' , link:"https://www.coursera.org/account/accomplishments/specialization/9AUY1P8VAFK1?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n"},
  { id: 6, type: 'Bootcamp', title: 'Build with AI with Unstacked labs', date: '2025', desc: 'AI development fundamentals using Google ADK, Genkit and Vertex AI for building production ready AI applications', img: '/img/bwai.jpg',link:"" },
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
              <div className="w-full h-40 md:h-48 bg-zinc-200 mb-4 border border-[#111]/10 overflow-hidden relative  hover:grayscale-0 transition-all duration-500 shrink-0">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] to-transparent mix-blend-overlay"></div>
                  <img src={item.img} alt="" srcset="" className='w-full h-full object-cover' />
              </div>
              
              {/* Card Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <h3 className="text-xl md:text-2xl font-vend font-bold leading-tight mb-2 uppercase shrink-0">{item.title}</h3>
                <p className="text-sm md:text-base text-[#111]/70 leading-relaxed font-changa overflow-y-auto mb-6">{item.desc}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className=' underline text-blue-500 text-lg md:text-sm font-bold leading-relaxed font-galantic'>Click to view Certificate</a>
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
