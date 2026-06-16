import React from 'react';

const ProjectCard2 = ({ zIndex }) => {
  return (
    <div className={`project-placeholder-card absolute inset-0 w-full h-full bg-[#e8e4db] text-[#111] z-[${zIndex}] flex flex-col p-4 md:p-12 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10`}>
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 min-h-0 pt-4 md:pt-8">
          {/* LEFT COLUMN: Image  */}
          <div className="w-full h-48 sm:h-64 md:h-full md:w-5/12 lg:w-1/4 flex flex-col shrink-0">
            <div className="w-full flex-1 min-h-0 bg-zinc-300 shadow-xl border border-black/10">
              <img src="/img/jordo.jpg" alt="Portrait" className="w-full h-full object-cover grayscale contrast-125 brightness-90" />
            </div>
          </div>

          {/* RIGHT COLUMN: Text + Vertical Name */}
          <div className="flex-1 flex flex-row gap-2 md:gap-8 pt-4 md:pt-0">
            {/* Paragraphs */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden pr-2 md:pr-4">
              <h2 className="text-2xl sm:text-2xl text-purple-600 md:text-3xl lg:text-5xl font-oldlondon-alt md:mb-6 tracking-wide font-bold text-black shrink-0">alphonsosportsai</h2>
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
  );
};

export default ProjectCard2;
