import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Jean's AI assistant. Ask me anything about their portfolio, experience, or projects!" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("https://portfolio-ai-proxy-307072703525.us-central1.run.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      // Add AI response to UI
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.log("Error communicating with AI:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Sorry, I'm having trouble connecting right now. Please try again later!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

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
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`text-sm p-3 rounded-2xl max-w-[85%] backdrop-blur-md border border-white/5 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/50 text-white rounded-tr-none self-end' 
                    : 'bg-white/10 text-white/90 rounded-tl-none self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="bg-white/10 text-white/60 text-sm p-3 rounded-2xl rounded-tl-none self-start backdrop-blur-md border border-white/5 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2 items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Type your message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:hover:bg-white"
            >
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
