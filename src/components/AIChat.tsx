import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCcw, Paperclip, Mic, Image as ImageIcon, Copy, ThumbsUp, ThumbsDown, Redo } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { agriculturalAssistant } from '../services/geminiService';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm **HYPERBLOOM**, your digital farm assistant. How can I help you improve your farm today?\n\nYou can ask me about:\n* **Crop Management** (planting, irrigation, harvesting)\n* **Livestock Health** (vaccinations, common diseases)\n* **Pest Control** (identification and treatment)\n* **Weather Impacts** on your specific crops" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await agriculturalAssistant.getAdvice(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that. Could you try again?" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please check your internet and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col relative max-w-5xl mx-auto">
      {/* Chat Body */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-12 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-6 max-w-4xl mx-auto group",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'assistant' 
                  ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white" 
                  : "bg-earth-900 text-white"
              )}>
                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              
              <div className={cn(
                "flex-1 space-y-2",
                msg.role === 'user' ? "text-right" : "text-left"
              )}>
                <div className={cn(
                  "inline-block text-lg leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-earth-100 px-8 py-5 rounded-[2.5rem] text-earth-900 shadow-sm" 
                    : "text-earth-800"
                )}>
                  {msg.role === 'assistant' ? (
                    <div className="markdown-body prose prose-earth max-w-none prose-p:leading-relaxed prose-headings:text-earth-900 prose-strong:text-earth-900 prose-li:my-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-earth-400 hover:text-primary-500 transition-colors"><Copy size={16} /></button>
                    <button className="p-2 text-earth-400 hover:text-primary-500 transition-colors"><ThumbsUp size={16} /></button>
                    <button className="p-2 text-earth-400 hover:text-primary-500 transition-colors"><ThumbsDown size={16} /></button>
                    <button 
                      onClick={() => setMessages([{ role: 'assistant', content: "Hello! I'm HYPERBLOOM, your digital farm assistant. How can I help you improve your farm today?" }])}
                      className="p-2 text-earth-400 hover:text-primary-500 transition-colors"
                    >
                      <RefreshCcw size={16} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex gap-6 max-w-4xl mx-auto animate-pulse">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-primary-500 animate-spin" />
            </div>
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-4 bg-earth-100 rounded-full w-3/4"></div>
              <div className="h-4 bg-earth-100 rounded-full w-1/2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Input Box */}
      <div className="mt-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary-500/5 blur-3xl rounded-[3rem] group-focus-within:bg-primary-500/10 transition-all"></div>
          <div className="relative bg-white border border-earth-200 rounded-[2.5rem] shadow-2xl p-2 transition-all group-focus-within:border-primary-500/50 group-focus-within:ring-8 group-focus-within:ring-primary-500/5">
            <div className="flex items-end gap-2 p-2">
              <button className="p-4 text-earth-400 hover:text-primary-500 transition-colors rounded-full hover:bg-earth-50">
                <Paperclip size={22} />
              </button>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask HYPERBLOOM anything..."
                className="flex-1 bg-transparent border-none focus:ring-0 py-4 px-2 text-lg text-earth-900 placeholder-earth-400 resize-none max-h-48 no-scrollbar"
              />
              <div className="flex items-center gap-1">
                <button className="p-4 text-earth-400 hover:text-primary-500 transition-colors rounded-full hover:bg-earth-50">
                  <Mic size={22} />
                </button>
                <button className="p-4 text-earth-400 hover:text-primary-500 transition-colors rounded-full hover:bg-earth-50">
                  <ImageIcon size={22} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "p-4 rounded-full transition-all shadow-xl active:scale-95",
                    input.trim() && !isLoading 
                      ? "bg-primary-500 text-white shadow-primary-500/30" 
                      : "bg-earth-100 text-earth-300"
                  )}
                >
                  {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mt-6">
            HYPERBLOOM AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
