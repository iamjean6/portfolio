import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const sectionData = [
  { id: 'home', nextLabel: 'About Me' },
  { id: 'about', nextLabel: 'Interests' },
  { id: 'interests', nextLabel: 'Education' },
  { id: 'education', nextLabel: 'Projects' },
  { id: 'projects', nextLabel: 'Almost there...' },
  { id: 'footer', nextLabel: 'End of Portfolio ✨', isEnd: true }
];

export default function ScrollIndicator() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    // We use IntersectionObserver to track which section is currently on screen
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      // Trigger when a section takes up at least 30% of the viewport.
      // This helps account for pinned sections taking up a lot of scroll space.
      threshold: 0.3 
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionData.findIndex(section => section.id === entry.target.id);
          if (index !== -1) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections defined in our array
    sectionData.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const currentSection = sectionData[currentSectionIndex];

  // If we couldn't find the section, don't render anything
  if (!currentSection) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none mix-blend-difference">
      <div className={`
        flex items-center gap-2 px-6 py-3 
        bg-white/10 backdrop-blur-md 
        border border-white/20 
        rounded-full shadow-2xl
        transition-all duration-500 ease-in-out
        ${currentSection.isEnd ? 'bg-white/20' : ''}
      `}>
        <span className="text-white font-changa uppercase tracking-widest text-xs md:text-sm font-semibold whitespace-nowrap">
          {currentSection.isEnd ? currentSection.nextLabel : `Next: ${currentSection.nextLabel}`}
        </span>
        
        {!currentSection.isEnd && (
          <ArrowDown className="w-4 h-4 text-white animate-bounce" />
        )}
      </div>
    </div>
  );
}
