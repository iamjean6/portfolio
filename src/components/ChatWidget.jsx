import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] font-sans flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-72 md:w-80 h-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all origin-bottom-right">
          {/* Header */}
          <div className="bg-white/10 p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-white font-bold tracking-wide">Let's chat!</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            <div className="bg-white/10 text-white/90 text-sm p-3 rounded-2xl rounded-tl-none w-10/12 self-start backdrop-blur-md border border-white/5">
              Hi! I'm Jean. Leave a message and I'll get back to you!
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
};

export default ChatWidget;
