import { useState, useEffect } from 'react';
import { Mouse, ChevronDown } from 'lucide-react';

export default function OnboardingOverlay() {
  // Check sessionStorage so it only shows once per session, not every single refresh
  const [isVisible, setIsVisible] = useState(() => {
    return !sessionStorage.getItem('onboardingDismissed');
  });

  useEffect(() => {
    // Lock the body scroll when the overlay is active
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleDismiss = () => {
    sessionStorage.setItem('onboardingDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/95 backdrop-blur-md text-white px-4 transition-opacity duration-500">
      <div className="flex flex-col items-center max-w-lg text-center space-y-8 animate-in fade-in zoom-in duration-700">
        
        {/* Animated Icon */}
        <div className="relative flex flex-col items-center justify-center w-28 h-28 rounded-full bg-white/5 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Mouse className="w-10 h-10 mb-2 opacity-80" strokeWidth={1.5} />
          <ChevronDown className="w-6 h-6 absolute bottom-4 animate-bounce text-white" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold font-vend tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Scroll to Explore
          </h2>
          <p className="text-white/70 font-blogger text-lg md:text-xl leading-relaxed max-w-md mx-auto">
            Welcome to my portfolio! This is a dynamic, scroll-driven experience. Please use your mouse wheel or swipe down to navigate through the sections.
          </p>
        </div>

        {/* Acknowledge Button */}
        <button 
          onClick={handleDismiss}
          className="mt-8 px-10 py-4 bg-white text-black font-changa font-bold uppercase tracking-[0.2em] text-sm rounded-full hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Got it, let's go!
        </button>
      </div>
    </div>
  );
}
