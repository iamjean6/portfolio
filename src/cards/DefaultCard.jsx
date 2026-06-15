import React from 'react';

/**
 * DefaultCard - used for all non-intro cards.
 * data.bgType: 'video' | 'image'  (defaults to nothing if bgSrc is not set)
 * data.bgSrc:  path to the video or image file
 */
const DefaultCard = ({ data }) => {
  return (
    <div className="relative w-full h-full bg-neutral-900 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer group">

      {/* --- Background Layer: Video OR Image --- */}
      {data.bgSrc && data.bgType === 'video' && (
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0"
          src={data.bgSrc}
        />
      )}
      {data.bgSrc && data.bgType === 'image' && (
        <img
          src={data.bgSrc}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0"
        />
      )}

      {/* Dark overlay so text always stays readable */}
      <div className="absolute inset-0 bg-neutral-900/60 z-[1]" />

      {/* Top Bar */}
      <div className="relative z-[2] flex justify-between items-start">
        <div className={`p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md ${data.iconColor}`}>
          {data.icon}
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 border border-dashed border-white/20 rounded-lg md:rounded-xl flex items-center justify-center text-[8px] md:text-[10px] text-white/40 uppercase tracking-widest font-mono">
          Lottie
        </div>
      </div>

      {/* Middle */}
      <div className="relative z-[2] flex flex-col gap-1 md:gap-2 mt-auto mb-2 md:mb-4">
        <h3 className="text-lg md:text-xl font-bold text-white font-alfa leading-tight">
          {data.title}
        </h3>
        <div className="h-[2px] w-6 md:w-8 bg-white/20 my-1 md:my-2 rounded-full" />
        <p className="text-[10px] md:text-xs text-white/60 font-sans leading-relaxed line-clamp-3 md:line-clamp-none">
          {data.desc}
        </p>
      </div>

      {/* Bottom */}
      <button className="relative z-[2] w-full py-2 md:py-3 bg-white text-black font-bold rounded-lg md:rounded-xl text-xs md:text-sm hover:bg-neutral-200 transition-colors uppercase tracking-wider font-changa">
        View Projects
      </button>
    </div>
  );
};

export default DefaultCard;
