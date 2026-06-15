import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const techStackData = [
  { id: 'python', name: "PYTHON", category: "Data Science & AI", useCases: "Data Analysis, ML, Scripting", desc: "My go-to language for building predictive models, wrangling massive datasets, and rapidly prototyping AI architectures.", img: "/img/python-5.svg" },
  { id: 'react', name: "REACT", category: "Web Development", useCases: "Frontend, UI/UX, SPA", desc: "The foundation of my interactive web applications. I use it to craft highly dynamic and responsive user interfaces.", img: "/img/vitejs.svg" },
  { id: 'node', name: "NODE.JS", category: "Software Eng", useCases: "Backend, APIs, Microservices", desc: "Powering the backend. It allows me to build scalable, event-driven APIs and robust microservices efficiently.", img: "/img/nodejs-icon.svg" },
  { id: 'postgres', name: "POSTGRES", category: "Database", useCases: "Relational DB, Analytics", desc: "My trusted relational database for complex queries, data integrity, and handling high-volume analytical workloads.", img: "/img/postgresql-inc.svg" },
  {id:'mongodb', name: "MONGODB", category: "Database", useCases: "NoSQL DB, Flexible Schemas", desc: "Perfect for projects that require flexible data models. It allows me to iterate quickly without worrying about rigid schemas.", img: "/img/mongodb-icon-1.svg" },
  { id: 'docker', name: "DOCKER", category: "DevOps", useCases: "Containerization, CI/CD", desc: "Ensures my environments are perfectly reproducible. From local development to production deployment without a hitch.", img: "/img/docker.svg" },
  {id: 'aws', name: "AWS", category: "Cloud Computing", useCases: "Cloud Infrastructure, Serverless", desc: "My cloud provider of choice for deploying scalable applications, leveraging serverless architectures, and managing cloud infrastructure.", img: "/img/aws-2.svg" },
  {id:'git', name: "GIT", category: "Version Control", useCases: "Source Code Management, Collaboration", desc: "The backbone of my development workflow. It allows me to manage code versions, collaborate seamlessly, and maintain a clean project history.", img: "/img/git.svg" },
  {id:'adk', name:"GOOGLE ADK", category: " AI Development", useCases: "AI development and infrastructure", desc: "Helps me build production ready AI infrastructure", img: "/img/ADK.webp" },
  {id:'vertexai', name:"VERTEX AI", category: " AI Development", useCases: "AI deployment, scaling and management", desc: "My trusted serverless cloud provider for deploying, monitoring and deploying my AI infrastructure", img: "/img/Vertex AI.svg" },
]
;

const Projects = () => {
  const containerRef = useRef(null);
  const techStackSceneRef = useRef(null);
  const projectsSceneRef = useRef(null);
  const progressBarRef = useRef(null);
  const card2Ref = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions;
      
      const techItems = gsap.utils.toArray('.tech-item');

      // 1. Set Initial States
      gsap.set(techItems, { autoAlpha: 0 });
      gsap.set(techItems[0], { autoAlpha: 1 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // ==========================================
      // SCENE 1: TECH STACK TIMELINE
      // ==========================================
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: techStackSceneRef.current,
          start: "top top",
          end: "+=700%", 
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      // Progress bar animation
      tl1.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        duration: techItems.length - 1
      }, 0);

      // Stagger items
      techItems.forEach((item, index) => {
        // Less vertical travel on mobile so it doesn't fly off screen
        const yOffset = isMobile ? 10 : 15; 
        
        if (index !== 0) {
          tl1.fromTo(item, 
            { autoAlpha: 0, yPercent: yOffset },
            { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power4.in", force3D: true },
            index - 0.3 
          );
        }
        
        if (index !== techItems.length - 1) {
          tl1.to(item, 
            { autoAlpha: 0, yPercent: -yOffset, duration: 0.5, ease: "power4.out", force3D: true },
            index + 0.4
          );
        }
      });

      // ==========================================
      // SCENE 2: PROJECTS STACKING TIMELINE
      // ==========================================
      const projectCards = gsap.utils.toArray('.project-placeholder-card');
      
      // Set all cards after the first one to be pushed down exactly 1 viewport height
      if(projectCards.length > 1) {
        gsap.set(projectCards.slice(1), { yPercent: 100 });
      }

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSceneRef.current,
          start: "top top",
          end: "+=600%", // Massive scroll area to give time to read
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      // Animate each card sliding UP over the previous one with reading pauses
      projectCards.forEach((card, index) => {
        if (index !== 0) {
          // Pause (empty timeline space) so the user reads the pinned content before it moves
          tl2.to({}, { duration: 0.8 });
          
          // Slide the card up like a stacking paper
          tl2.to(card, {
            yPercent: 0,
            duration: 1.2,
            ease: "power3.inOut",
          });
          
          // Pause again after it slides up
          tl2.to({}, { duration: 0.2 });
        }
      });

      // ==========================================
      // SCENE 2: CARD 1 STAGGER ANIMATION ONLY
      // ==========================================
      const card1 = document.querySelector('.project-placeholder-card');
      if (card1) {
        const staggerItems = card1.querySelectorAll('.stagger-item');
        gsap.set(staggerItems, { y: 30, opacity: 0 });
        gsap.to(staggerItems, {
          scrollTrigger: {
            trigger: card1,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 1,
          ease: "power2.out"
        });
      }

      // ==========================================
      // SCENE 2: CARD 2 — WORD-BY-WORD REVEAL
      // ==========================================
      if (card2Ref.current) {
        const paragraphs = card2Ref.current.querySelectorAll('.split-text-target');

        // Helper: recursively walk the DOM and wrap only TEXT NODES word by word
        // This preserves all child <span> elements (brand colors) intact
        function splitTextNodes(node) {
          // If it's a plain text node with actual words, split it
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (!text.trim()) return; // skip whitespace-only nodes

            const fragment = document.createDocumentFragment();
            text.split(/(\s+)/).forEach((token) => {
              if (/^\s+$/.test(token)) {
                // Preserve whitespace as-is
                fragment.appendChild(document.createTextNode(token));
              } else if (token) {
                // Wrap each word in an animated span
                const inner = document.createElement('span');
                inner.className = 'word';
                inner.style.cssText = 'opacity: 0;';
                inner.textContent = token;
                fragment.appendChild(inner);
              }
            });
            node.parentNode.replaceChild(fragment, node);
          } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT') {
            // Recursively process child nodes (but skip script tags)
            // We clone the childNodes list because we'll be mutating it
            Array.from(node.childNodes).forEach(splitTextNodes);
          }
        }

        paragraphs.forEach((para) => {
          splitTextNodes(para);
        });

        const wordEls = card2Ref.current.querySelectorAll('.word');
        const footerEl = card2Ref.current.querySelector('.stagger-item');

        // 1. Typewriter for all words
        gsap.to(wordEls, {
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          duration: 0.01,
          stagger: 0.06, // 20ms per word — fast typewriter effect
          ease: 'none',
        });

        // 2. Fade in the footer
        if (footerEl) {
          gsap.to(footerEl, {
            scrollTrigger: {
              trigger: card2Ref.current,
              start: 'top top',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            duration: 1,
            delay: 0.5, // Fades in slightly after typewriter starts
            ease: 'power2.out',
          });
        }
      }

    });

  }, { scope: containerRef });

  return (
    <StyledSection id="projects" ref={containerRef}>
      {/* SCENE 1: TECH STACK */}
      <div ref={techStackSceneRef} className="scene-tech-stack">
        <div className="tech-content-wrapper relative z-10 w-full h-full ">

          {/* CONTEXT HEADER: Stays pinned and visible */}
          <div className="w-full flex justify-between items-center pb-2 md:pb-4 mb-4 md:mb-8 border-b-4 border-[#35322a]">
            <h2 className="text-xl md:text-4xl font-aristotelica font-bold text-yellow-700 text-[#35322a] uppercase tracking-widest">
              My Arsenal //
            </h2>
            <span className="text-xl md:text-base text-[#35322a] font-galantic font-bold tracking-widest">01. TECH STACK</span>
          </div>
          
          <div className="tech-columns mb-4 relative w-full h-[600px] md:h-[500px]">
            {techStackData.map((tech, index) => (
              <div 
                key={tech.id}
                className="tech-item absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between will-change-transform will-change-opacity"
              >
                {/* LEFT SIDE: Texts */}
                <div className="tech-left flex-1 flex flex-col justify-center gap-4 md:gap-6 md:pr-8 text-center md:text-left">
                  
                  {/* Name with Hardware Accelerated CSS Text Shadow */}
                  <div className="tech-name-container w-full h-[60px] md:h-[120px] flex items-center justify-center md:justify-start">
                    <h2 className="name-text">
                      {tech.name}
                    </h2>
                  </div>

                  {/* Standardized CSS Typography for Meta Info (Fixes SVG lag!) */}
                  <div className="tech-meta flex flex-col gap-4">
                    <div className="meta-block">
                      <span className="text-xs font-boldwinn font-bold uppercase tracking-widest text-[#35322a]/60 block mb-1">Category</span>
                      <h3 className="text-2xl md:text-3xl font-grunge text-[#e8180a] uppercase tracking-wide">
                        {tech.category}
                      </h3>
                    </div>
                    
                    <div className="meta-block">
                      <span className="text-xs font-bold font-boldwinn uppercase tracking-widest text-[#35322a]/60 block mb-1">Primary Use Cases</span>
                      <h3 className="text-xl font-grunge md:text-2xl font-bold text-[#4296f5] uppercase tracking-tight">
                        {tech.useCases}
                      </h3>
                    </div>
                  </div>

                  {/* Explanatory Description */}
                  <div className="tech-description mt-2 p-4 bg-[#35322a]/5 border-l-4 border-[#35322a]">
                    <p className="text-[#35322a] text-lg font-blogger  md:text-base font-medium leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>

                </div>

                {/* RIGHT SIDE: Big Icon */}
                <div className="tech-right flex-1 flex justify-center items-center mt-4 md:mt-0">
                  <div className="tech-icon-wrapper w-32 h-32 md:w-80 md:h-80 border-2 md:border-4 border-[#35322a] rounded-xl md:rounded-2xl p-4 md:p-8 bg-white/40 shadow-[6px_6px_0_#35322a] md:shadow-[12px_12px_0_#35322a] transition-transform duration-300 md:hover:-translate-y-2 md:hover:shadow-[16px_16px_0_#35322a]">
                    <img src={tech.img} alt={tech.name} className="w-full h-full object-contain filter transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="progress-container relative z-20 w-full max-w-xl md:max-w-3xl mt-12 mx-auto h-3 bg-[#35322a]/10 overflow-hidden border-2 border-[#35322a] rounded-full">
            <div 
              ref={progressBarRef}
              className="progress-fill h-full bg-[#35322a] w-full" 
            />
          </div>

        </div>
      </div>

      {/* SCENE 2: PROJECTS (STACKING PAPER) */}
      <div ref={projectsSceneRef} className="scene-projects w-full h-screen relative overflow-hidden bg-black">

        {/* Project Card 1: LDP KENYA */}
        <div className="project-placeholder-card absolute inset-0 w-full h-full bg-[#1a1a1a] z-10 flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-2 md:p-8 overflow-hidden gap-2 md:gap-8">
          
          <div className="w-full max-w-6xl h-full flex flex-col justify-center">
            
            {/* TOP SECTION: Flex Layout */}
            <div className="flex flex-col md:flex-row w-full gap-2 md:gap-8 shrink-0 items-center md:items-start stagger-item opacity-0">
              
              {/* PHOTO (Fully Rounded) */}
              <div className="w-20 h-20 md:w-56 md:h-56 shrink-0 bg-white rounded-full overflow-hidden border-2 md:border-4 border-white/10 flex items-center justify-center p-1 md:p-2 shadow-2xl">
                <img src="/img/logo.webp" alt="LDP Kenya" className="w-full h-full object-contain" />
              </div>

              {/* HEADER & DESCRIPTION */}
              <div className="flex flex-col gap-2 md:gap-6 flex-1 text-center md:text-left justify-center md:pt-4">
                <h1 className="text-2xl md:text-6xl xl:text-7xl font-grunge leading-none text-[#d1d1d1] m-0 tracking-tight uppercase drop-shadow-lg">
                  <a href="https://www.ldp-kenya.com/" target='_blank' rel="noopener noreferrer" className="hover:text-white transition-colors">
                    ldp-kenya.com
                  </a>
                </h1>
                
                <p className="text-[16px] md:text-lg font-blogger leading-tight md:leading-relaxed text-zinc-400 max-w-4xl">
                  Worked as the lead developer on the LDP-KENYA website, a political party's online platform. Used modern web technologies to create a responsive, user-friendly site that effectively communicated the party's message and engaged supporters. 
                  Implemented features such as event calendars, news updates, and volunteer sign-up forms to enhance user interaction and support the party's outreach efforts.
                </p>
                
                {/* BUTTONS */}
                <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2 justify-center md:justify-start">
                  
                  <div className="bg-green-400 text-[#111] px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-[#ff7a3d] transition-colors shadow-lg">
                     <a href="https://www.ldp-kenya.com/" target="_blank" rel="noopener noreferrer" className='font-grunge underline' >
                    Visit site
                  </a>
                  </div>
                 
                  <a href="#" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-6 py-1.5 md:px-8 md:py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-white/20 transition-colors shadow-lg flex items-center gap-2 md:gap-3">
                    <div className='h-5 w-5 md:h-7 md:w-7 rounded-full overflow-hidden flex items-center justify-center p-0.5 md:p-1'>
                      <img src="img/github.svg" alt="GitHub" className='h-full w-full object-contain' />
                    </div>
                    <span className="uppercase text-black font-galantic tracking-wider">GITHUB</span>
                  </a>
                </div>
              </div>

            </div>

            {/* BOTTOM SECTION: 4 Bento Cards Grid */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 pt-2 md:pt-8 min-h-0">
              
              {/* 1. EDUCATION */}
              <div className="border border-white/10 rounded-2xl p-3 md:p-6 bg-red-400/10 flex flex-col justify-center shadow-lg hover:bg-white/10 transition-colors stagger-item opacity-0">
                <h3 className=" pb-2 mb-3 text-sm md:text-lg font-bold tracking-widest uppercase font-oldlondon text-white/50 text-center">Tech STACK</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-blue-400">
                      <img src="/img/github.svg" alt="Github" srcset="" />
                      </div>
                      <span className="text-xs font-changa md:text-lg text-zinc-400">Github</span>
                    </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-purple-400">
                      <img src="/img/vitejs.svg" alt="VITE" srcset="" />
                      </div>
                      <span className="text-xs font-changa md:text-lg text-zinc-400">ReactJs</span>
                        </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-orange-400">
                     <img src="/img/nodejs-icon.svg" alt="" srcset="" />
                      </div>
                      <span className="text-xs font-changa md:text-lg text-zinc-400">Node.Js</span>
                      </div> 
                          <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-orange-400">
                     <img src="/img/mongodb-icon-1.svg" alt="" srcset="" />
                      </div>
                      <span className="text-xs font-changa md:text-lg text-zinc-400">MongoDB</span>
                      </div> 
                      </div>
              </div>

              {/* 2. SOFTWARE SKILLS */}
              <div className=" hidden md:rounded-2xl   md:bg-white/5 md:flex md:flex-col md:justify-center md:shadow-lg hover:bg-white/10 transition-colors stagger-item opacity-0">
               <img src="/img/Cap.jpg" alt="" srcset="" className='object-cover rounded-2xl h-full w-full' />
              </div>

              {/* 3. SKILLS */}
              <div className=" p-3 md:p-6  flex flex-col justify-center shadow-lg hover:bg-white/10 transition-colors stagger-item opacity-0">
                <h3 className=" pb-2 mb-1 text-lg md:text-xl font-bold font-oldlondon tracking-widest  uppercase text-white/50">Skills</h3>
                <ul className="text-zinc-300 text-[16px] md:text-sm flex flex-col gap-1 md:gap-1">
                  <li className="flex items-center gap-2"><span className="text-[#f26422] text-xl font-blogger">•</span> System Design</li>
                  <li className="flex items-center gap-2"><span className="text-[#f26422] text-xl font-blogger">•</span> RestAPIs</li>
                  <li className="flex items-center gap-2"><span className="text-[#f26422] text-xl font-blogger">•</span> Agentic Development</li>
                  <li className="flex items-center gap-2"><span className="text-[#f26422] text-xl font-blogger">•</span> Frontend Development</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Project Card 2: Editorial Layout */}
        <div ref={card2Ref} className="project-placeholder-card absolute inset-0 w-full h-full bg-[#e8e4db] text-[#111] z-20 flex flex-col p-4 md:p-12 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10">
          
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
            
            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 min-h-0 pt-4 md:pt-8">
              
              {/* LEFT COLUMN: Image  */}
              <div className="w-full h-48 sm:h-64 md:h-full md:w-5/12 lg:w-1/4 flex flex-col shrink-0">
                {/* Image */}
                <div className="w-full flex-1 min-h-0 bg-zinc-300 shadow-xl border border-black/10">
                  {/* Using Cap.jpg as a placeholder for the portrait */}
                  <img src="/img/jordo.jpg" alt="Portrait" className="w-full h-full object-cover grayscale contrast-125 brightness-90" />
                </div>
              </div>

              {/* RIGHT COLUMN: Text + Vertical Name */}
              <div className="flex-1 flex flex-row gap-2 md:gap-8 pt-4 md:pt-0">
                
                {/* Paragraphs */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden pr-2 md:pr-4">
                  <h2 className="text-2xl sm:text-2xl text-purple-600 md:text-3xl lg:text-5xl font-oldlondon-alt  md:mb-6 tracking-wide font-bold text-black shrink-0">alphonsosportsai</h2>
                  <div className="flex flex-col gap-2 md:gap-4 text-[10px] sm:text-[11px] md:text-sm xl:text-[13px] font-serif leading-snug md:leading-relaxed text-justify font-bold text-black overflow-hidden">
                    <p className="split-text-target"> 
                      <span className='animate-pulse font-bold' style={{color: '#7c3aed'}}>Alphonsosportsai</span>{' '}
                      is an AI powered chatbot built and designed by yours truly to provide sports information and insights on training, nutrition and performance. It leverages{' '}
                      <span className='animate-pulse font-grunge text-[14px]' style={{background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900}}>GOOGLE ADK</span>{' '}
                      and{' '}
                      <span className='animate-pulse font-grunge text-[14px] ' style={{color: '#1a73e8', fontWeight: 900}}>Vertex AI</span>{' '}
                      to deliver accurate and up-to-date information to athletes, coaches, and sports enthusiasts. The chatbot is designed to be user-friendly and accessible.
                    </p>
                    <p className="split-text-target">
                      The agent is built using a combination of good AI and software engineering system design principles to ensure its both effective and efficient. The app is scalable and can handle a large number of users, making it a valuable resource for anyone looking to improve their sports performance.
                    </p>
                    <p className="split-text-target">
                      The tech stack includes{' '}
                      <span className='font-galantic text-[14px] ' style={{background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900}}>GOOGLE ADK</span>{' '}
                      for building the AI infrastructure,{' '}
                      <span className='font-aristotelica text-[14px] '  style={{color: '#1a73e8', fontWeight: 900}}>Vertex AI</span>{' '}
                      for deployment and scaling,{' '}
                      <span className='font-grunge text-[14px] '  style={{color: '#339933', fontWeight: 900}}>Node.js</span>{' '}
                      for backend development,{' '}
                      <span style={{color: '#61DAFB', fontWeight: 900, textShadow: '0 0 8px #61DAFB55'}}>React</span>{' '}
                      for frontend development,{' '}
                      <span className='font-righteous text-[14px] ' style={{color: '#47A248', fontWeight: 900}}>MongoDB</span>{' '}
                      for database management and{' '}
                      <span className='font-vend text-[14px] '  style={{color: '#e22a1dff', fontWeight: 900}}>Redis</span>{' '}
                      for caching. The chatbot is designed to be highly responsive and provide accurate information in real-time.
                    </p>
                  </div>
                </div>

                {/* Vertical Name */}
                <div className="shrink-0 border-l border-[#111] pl-2 md:pl-6 flex justify-center pb-2 md:pb-8">
                  <h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[2rem] font-righteous tracking-widest uppercase font-bold text-black" 
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    JEAN POWELL
                  </h1>
                </div>
                
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-4 md:mt-8 pt-2 md:pt-4 border-t-[1.5px] border-[#111] flex justify-between items-center font-serif text-xs md:text-sm stagger-item opacity-0 shrink-0">
              <p className="tracking-widest"><a href="http://www.alphonsosportsai.com" target="_blank" rel="noopener noreferrer">www.alphonsosportsai.com</a></p>
              <p className="font-bold font-vend text-lg md:text-2xl">project 02</p>
            </div>

          </div>
        </div>

        {/* Placeholder Card 3 */}
        <div className="project-placeholder-card absolute inset-0 w-full h-full bg-zinc-700 z-30 flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-4xl md:text-7xl font-blackwood text-white/20 uppercase tracking-widest">
            PROJECT 03
          </h2>
          <p className="text-white/40 mt-4">(This slides over Project 02)</p>
        </div>

      </div>

    </StyledSection>
  );
};

const StyledSection = styled.section`
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:900');

  /* Container background from your design */
  background: #ebe7e0;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 10;

  .scene-tech-stack {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    z-index: 10;
  }

  .tech-content-wrapper {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }

  /* Specific sizing for the different text levels using CSS instead of SVG */
  .name-text {
    font-size: 60px;
    @media (min-width: 768px) {
      font-size: 120px;
    }
    font-family: 'Playfair Display', 'Georgia', serif;
    font-weight: 900;
    color: #ebe7e0;
    -webkit-text-stroke: 2px #35322a;
    text-shadow: 
      1px 1px 0 #35322a,
      2px 2px 0 #35322a,
      3px 3px 0 #35322a,
      4px 4px 0 #35322a,
      5px 5px 0 #35322a,
      6px 6px 0 #35322a,
      7px 7px 0 #35322a,
      8px 8px 0 #35322a;
    letter-spacing: 0.02em;
    line-height: 1;
    margin: 0;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
`;

export default Projects;
