import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import ProjectIntroCard from '../projects/ProjectIntroCard';
import ProjectCard1 from '../projects/ProjectCard1';
import ProjectCard2 from '../projects/ProjectCard2';
import ProjectCard3 from '../projects/ProjectCard3';
import ProjectCard4 from '../projects/ProjectCard4';
import ProjectCardSkeleton from '../projects/ProjectCardSkeleton';

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
  {id: 'jesus', name:"JESUS", category: "Faith", useCases: "Spiritual Guidance, Strength, and Hope", desc: "My unwavering source of strength, hope, and guidance in all aspects of life. (John 3:30) ", img: "/img/christ.jpg" }
]
;

const Projects = () => {
  const containerRef = useRef(null);
  const techStackSceneRef = useRef(null);
  const projectsSceneRef = useRef(null);
  const progressBarRef = useRef(null);

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
          end: "+=800%", // Massive scroll area to give time to read
          scrub: 1,
          pin: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      // Helper to split text nodes for Card 2
      function splitTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text.trim()) return;
          const fragment = document.createDocumentFragment();
          text.split(/(\s+)/).forEach((token) => {
            if (/^\s+$/.test(token)) {
              fragment.appendChild(document.createTextNode(token));
            } else if (token) {
              const inner = document.createElement('span');
              inner.className = 'word';
              inner.style.cssText = 'opacity: 0;';
              inner.textContent = token;
              fragment.appendChild(inner);
            }
          });
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT') {
          Array.from(node.childNodes).forEach(splitTextNodes);
        }
      }

      // Pre-process Card 2 text splitting
      const paragraphs = projectsSceneRef.current.querySelectorAll('.split-text-target');
      paragraphs.forEach((para) => {
        splitTextNodes(para);
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

          // CARD 1 STAGGER ANIMATION
          if (index === 1) {
            const staggerItems = card.querySelectorAll('.stagger-item');
            gsap.set(staggerItems, { y: 30, opacity: 0 });
            tl2.to(staggerItems, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out"
            });
          }

          // CARD 2 TYPEWRITER ANIMATION
          if (index === 2) {
            const wordEls = card.querySelectorAll('.word');
            const footerEl = card.querySelector('.stagger-item');
            
            tl2.to(wordEls, {
              opacity: 1,
              duration: 1.5, // overall duration of typing in the timeline
              stagger: 0.05,
              ease: "none"
            });
            
            if (footerEl) {
              tl2.to(footerEl, { opacity: 1, duration: 0.5 }, "<0.5");
            }
          }
          
          // Pause again after animations finish before next card slides up
          tl2.to({}, { duration: 0.2 });
        }
      });
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
        <ProjectIntroCard zIndex={10} />
        <ProjectCard1 zIndex={20} />
        <ProjectCard2 zIndex={30} />
        <ProjectCard3 zIndex={40} />
        <ProjectCard4 zIndex={50} />

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
