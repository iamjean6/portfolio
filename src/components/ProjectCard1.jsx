import React from 'react';

const ProjectCard1 = ({ zIndex }) => {
  return (
    <div className={`project-placeholder-card absolute inset-0 w-full h-full bg-[#1a1a1a] z-[${zIndex}] flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-2 md:p-8 overflow-hidden gap-2 md:gap-8`}>
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
                  <img src="/img/github.svg" alt="Github" />
                </div>
                <span className="text-xs font-changa md:text-lg text-zinc-400">Github</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-purple-400">
                  <img src="/img/vitejs.svg" alt="VITE" />
                </div>
                <span className="text-xs font-changa md:text-lg text-zinc-400">ReactJs</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-orange-400">
                  <img src="/img/nodejs-icon.svg" alt="" />
                </div>
                <span className="text-xs font-changa md:text-lg text-zinc-400">Node.Js</span>
              </div> 
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-800 rounded flex items-center justify-center text-[9px] md:text-xs font-bold text-orange-400">
                  <img src="/img/mongodb-icon-1.svg" alt="" />
                </div>
                <span className="text-xs font-changa md:text-lg text-zinc-400">MongoDB</span>
              </div> 
            </div>
          </div>

          {/* 2. SOFTWARE SKILLS */}
          <div className=" hidden md:rounded-2xl md:bg-white/5 md:flex md:flex-col md:justify-center md:shadow-lg hover:bg-white/10 transition-colors stagger-item opacity-0">
            <img src="/img/Cap.jpg" alt="" className='object-cover rounded-2xl h-full w-full' />
          </div>

          {/* 3. SKILLS */}
          <div className=" p-3 md:p-6 flex flex-col justify-center shadow-lg hover:bg-white/10 transition-colors stagger-item opacity-0">
            <h3 className=" pb-2 mb-1 text-lg md:text-xl font-bold font-oldlondon tracking-widest uppercase text-white/50">Skills</h3>
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
  );
};

export default ProjectCard1;
