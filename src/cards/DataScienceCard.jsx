import { Database, BarChart2, Layers, ArrowRight } from 'lucide-react';
/**
 * DataScienceCard
 * Layout: all content centered horizontally, anchored close to the bottom.
 */
const DataScienceCard = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[42px] bg-neutral-900">
      {/* Background image — swap src with your real asset */}
      <video 
      autoPlay
       loop 
       muted 
       playsInline 
       className="absolute inset-0 h-full w-full object-cover"
        src="/videos/numbers.mp4" /> 

      {/* Subtle top-down vignette so bottom content pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      {/* ── CONTENT — centered, anchored near the bottom ── */}
      <div className="absolute bottom-4 md:bottom-6 inset-x-0 flex flex-col items-center text-center px-4 md:px-5 gap-2 md:gap-3">
        {/* Icon badge */}
        <div className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl   text-emerald-400 mb-0 md:mb-1">
          <Database className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        {/* Title */}
        <h3 className="text-base md:text-2xl font-bold text-white tracking-tight leading-tight">
          Data Science
        </h3>
        {/* Decorative divider */}
        <div className="w-10 h-[2px] rounded-full bg-emerald-500/60" />
        {/* Paragraph — hidden on mobile, visible on desktop */}
        <p className="hidden md:block text-xs md:text-sm text-white/60 leading-relaxed max-w-[80%]">
          Extracting actionable insights from massive datasets — through statistical modelling,
          data wrangling, and rich visualisations that turn raw numbers into clear decisions.
        </p>
        {/* Mini stats row */}
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5 text-white/50">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">Analytics</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/50">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">Pipelines</span>
          </div>
        </div>
        {/* CTA */}
        <button className="mt-1 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-2 text-xs md:text-sm font-semibold text-emerald-300 transition-all hover:scale-105 active:scale-95">
          View Projects
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default DataScienceCard;