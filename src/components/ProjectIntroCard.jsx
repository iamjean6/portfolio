import React from 'react';

const ProjectIntroCard = ({ zIndex }) => {
  return (
    <div className={`project-placeholder-card absolute inset-0 w-full h-full z-[${zIndex}] flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}>
      <img 
        src="/img/bg (3).jpg" 
        alt="Hero Portrait" 
        className="absolute inset-0 w-full h-full object-cover -z-10 overflow-hidden"
      />
      <h2 className="text-3xl text-center italic md:text-7xl font-changa font-black text-red-600 uppercase leading-none px-4">
        EDUCATION BACKGROUND AND PROFESIONAL/PERSONAL PROJECTS
      </h2>
      <p className="text-white/40 mt-4"></p>
    </div>
  );
};

export default ProjectIntroCard;
