import React from 'react';

const ProjectCardSkeleton = ({ zIndex, title, subtitle, bgColor }) => {
  return (
    <div 
      className={`project-placeholder-card absolute inset-0 w-full h-full ${bgColor} flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}
      style={{ zIndex }}
    >
      <h2 className="text-4xl md:text-7xl font-blackwood text-white/20 uppercase tracking-widest">
        {title}
      </h2>
      <p className="text-white/40 mt-4">{subtitle}</p>
    </div>
  );
};

export default ProjectCardSkeleton;
