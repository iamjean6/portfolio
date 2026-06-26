import React from 'react';

const ProjectCard4 = ({ zIndex }) => {
  return (
    <div 
      className="project-placeholder-card absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden bg-neutral-950 text-white"
      style={{ zIndex }}
    >
      <div className="w-full max-w-7xl h-full flex flex-col p-4 md:p-8 gap-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-emerald-900/50 pb-2 w-full">
          <div>
            <h4 className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-1">Project 04 // Data Science</h4>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              2025 Diet Analysis
            </h2>
          </div>
          
          {/* GitHub CTA */}
          <a 
            href="https://github.com/jean153/2025-diet-analysis.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-4 group"
          >
            <img src="/img/github.svg" alt="GitHub" className="w-8 h-8 filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 font-mono">VIEW REPOSITORY</span>
              <span className="font-bold text-white tracking-wide">Source Code & Notebooks</span>
            </div>
          </a>
        </div>

        {/* Analytical Dashboard Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
          
          {/* Left Column: Methodology & Sourcing */}
          <div className="md:col-span-4 flex flex-col gap-4">
            
            {/* Sourcing */}
            <div className="md:bg-neutral-900 md:rounded-2xl md:p-4 md:border hidden md:border-neutral-800">
              <h3 className="text-emerald-500 font-mono text-xs tracking-widest uppercase mb-4">Data Collection</h3>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-6 font-serif">
                Raw dietary intake data was rigorously logged and exported daily using the MyFitnessPal ecosystem to ensure high-fidelity macro and micronutrient tracking.
              </p>
              <div className="flex gap-4 items-center p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <img src="/img/fitnesspal.png" alt="MyFitnessPal" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-md bg-white p-1" />
                <span className="text-neutral-500 text-lg md:text-xl font-light">+</span>
                <img src="/img/google-play-5.svg" alt="Google Play" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
              </div>
            </div>

            {/* Methodology */}
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex-1">
              <h3 className="text-emerald-500 font-mono text-xs tracking-widest uppercase mb-4">Analytical Methods</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="text-white font-bold uppercase tracking-wide text-sm">Data Cleaning</span>
                  <span className="text-neutral-500 text-xs font-serif mt-1">Imputing missing values and normalizing variance in raw JSON exports.</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-white font-bold uppercase tracking-wide text-sm">Regression Analysis</span>
                  <span className="text-neutral-500 text-xs font-serif mt-1">Modeling the correlation between specific macro ratios and daily energy levels.</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-white font-bold uppercase tracking-wide text-sm">Rolling Means</span>
                  <span className="text-neutral-500 text-xs font-serif mt-1">Smoothing daily caloric fluctuations to identify long-term metabolic trends.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Visualizations & Story */}
          <div className="md:col-span-8 flex flex-col gap-4">
            
            {/* The Story */}
            <div className="bg-neutral-900 rounded-2xl p-4 md:p-6 border border-neutral-800">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase">The 2026 Strategy</h3>
              <p className="text-neutral-400 font-serif leading-relaxed text-sm md:text-base">
                By visualizing the rolling means of protein intake against sleep quality and applying regression to caloric deficits, the data revealed a clear story: consistency in specific micronutrient timing drastically out-performed raw caloric restriction. This analysis forms the exact dietary protocol I will deploy for peak performance in 2026.
              </p>
            </div>

            {/* Placeholder Charts */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Chart 1 */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 z-10">
                  <span className="text-white font-bold text-sm">Regression Model</span>
                  <span className="text-emerald-500 font-mono text-xs">R² = 0.84</span>
                </div>
                {/* CSS Art Chart Placeholder */}
                <div className="flex-1 flex items-end gap-2 z-10 opacity-30">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
              </div>

              {/* Chart 2 */}
              <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 z-10">
                  <span className="text-white font-bold text-sm">7-Day Rolling Mean</span>
                  <span className="text-teal-400 font-mono text-xs">TREND: +2.4%</span>
                </div>
                 {/* CSS Line Chart Placeholder */}
                 <div className="flex-1 relative z-10 w-full h-full flex items-center justify-center opacity-40">
                    <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                      <polyline fill="none" stroke="#2dd4bf" strokeWidth="2" points="0,40 20,35 40,45 60,20 80,25 100,10" />
                    </svg>
                 </div>
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectCard4;
