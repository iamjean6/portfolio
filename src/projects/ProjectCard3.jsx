import React from 'react';

const ProjectCard3 = ({ zIndex }) => {
  return (
    <div 
      className="project-placeholder-card absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-neutral-900"
      style={{ zIndex }}
    >
      <div className="w-full max-w-7xl h-full flex flex-col p-4 md:p-8 gap-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-700 pb-4 w-full">
          <div>
            <h4 className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-2">Project 03</h4>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Rizzen Blog</h2>
          </div>
          <a 
            href="https://frontend-production-df3c.up.railway.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-colors flex items-center gap-2"
          >
            Visit Live App
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>

        {/* Bento Box Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
          
          {/* Main Screenshot/Description */}
          <div className="md:col-span-2 bg-neutral-800 rounded-3xl overflow-hidden flex flex-col border border-neutral-700 relative group">
             {/* Placeholder Image */}
             <div className="h-40 md:h-1/2 w-full bg-gradient-to-br from-blue-900/50 to-neutral-900 relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-neutral-600 font-mono text-xl tracking-widest">APP_SCREENSHOT_PLACEHOLDER.JPG</span>
               </div>
             </div>
             {/* Text Content */}
             <div className="p-4 md:p-6 flex-1 flex flex-col justify-center bg-neutral-800 z-10 border-t border-neutral-700">
                <p className="text-neutral-300 text-base md:text-lg font-serif leading-relaxed">
                  A highly scalable, full-stack blogging platform architected for performance and accessibility. Users can write, publish, and consume content natively.
                </p>
             </div>
          </div>

          {/* Tech Stack Column */}
          <div className="flex flex-col gap-4">
            
            {/* Core Tech */}
            <div className="flex-1 bg-neutral-800 rounded-3xl p-4 border border-neutral-700 flex flex-col justify-center">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4 border-b border-neutral-600 pb-2">Core Architecture</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md font-mono text-xs md:text-sm border border-blue-500/30">React</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-md font-mono text-xs md:text-sm border border-green-500/30">Node.js</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-md font-mono text-xs md:text-sm border border-red-500/30">Redis Cache</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-md font-mono text-xs md:text-sm border border-orange-500/30">AWS S3 Storage</span>
              </div>
            </div>

            {/* AI & Accessibility */}
            <div className="flex-1 bg-neutral-800 rounded-3xl p-4 border border-neutral-700 flex flex-col justify-center">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4 border-b border-neutral-600 pb-2">AI Integration</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Platform accessibility is powered by advanced machine learning models to dynamically process content.
              </p>
              <div className="flex flex-col gap-2">
                <div className="w-full bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-white font-bold text-sm">Google TTS</span>
                  <span className="text-green-400 text-xs font-mono">ACTIVE</span>
                </div>
                <div className="w-full bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-white font-bold text-sm">Google ADK</span>
                  <span className="text-green-400 text-xs font-mono">ACTIVE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectCard3;
