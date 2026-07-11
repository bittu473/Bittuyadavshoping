import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

const PRESETS = [
  { q: "Are the Quantum inks EU REACH compliant?", a: "Yes, absolutely! All Quantum Gold Label inks (like Rock Lobster and Hi Papi) are 100% EU REACH compliant, sterile certified, organic, and vegan. They are legal for use across Europe and India." },
  { q: "What is the warranty on Micromaster PMU machine?", a: "The Micromaster Wireless PMU Machine comes with an official 2-Year BITTU YADAV warranty. This covers any internal motor instability or digital OLED display defects. We also provide replacement batteries if needed." },
  { q: "How long does shipping take to India?", a: "Since we ship via insured priority air courier, delivery typically takes 4 to 6 business days. Orders over €290 qualify for free priority delivery!" },
  { q: "Can I adjust the needle depth mid-session?", a: "Yes, both the Micromaster Wireless and the Mast Flip series allow instant click-grip depth adjustments. You can twist the textured ring to tweak needle protrusion from 0mm to 4mm with absolute micro-feedback." }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! Welcome to BITTU YADAV PMU Shop Support. How can I help you find the perfect machines, cartridges, or REACH compliant pigments today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Find if user query matches any preset keyword
    setTimeout(() => {
      let matchedAnswer = "Thank you for contacting BITTU YADAV Shop! A premium care specialist will review your inquiry shortly. If you are asking about order delivery or reach compliance, you can click on the quick support options below for instant clinical answers.";
      
      const queryLower = textToSend.toLowerCase();
      for (const preset of PRESETS) {
        if (queryLower.includes(preset.q.toLowerCase().substring(0, 15)) || 
            queryLower.includes("ink") && preset.q.includes("ink") ||
            queryLower.includes("reach") && preset.q.includes("REACH") ||
            queryLower.includes("warranty") && preset.q.includes("warranty") ||
            queryLower.includes("shipping") && preset.q.includes("shipping") ||
            queryLower.includes("adjust") && preset.q.includes("adjust")) {
          matchedAnswer = preset.a;
          break;
        }
      }

      const assistantMsg: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: matchedAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end" id="support-chat-widget">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer group"
        >
          <span className="text-xs font-semibold tracking-wide font-sans group-hover:underline">Chat with us 👋</span>
          <MessageSquare className="w-4 h-4 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[460px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></div>
              <div>
                <h4 className="font-serif font-bold text-xs tracking-wide">BY Concierge Assistant</h4>
                <span className="text-[9px] text-brand-100 font-mono tracking-wider uppercase">Active Support Desk</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-brand-100 hover:text-white transition-colors cursor-pointer"
              title="Close support chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`p-3 rounded-lg leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-800 text-white rounded-tr-none'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto items-start max-w-[80%] flex flex-col">
                <div className="p-3 bg-white text-gray-400 border border-gray-100 rounded-lg rounded-tl-none shadow-sm flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Preset Buttons */}
          <div className="p-3 border-t border-gray-100 bg-white space-y-1.5 text-left max-h-[110px] overflow-y-auto scrollbar-none">
            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Frequently Asked Questions:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(preset.q)}
                  className="text-[10px] bg-brand-50 hover:bg-brand-100 text-brand-800 px-2 py-1 rounded border border-brand-100 transition-colors text-left cursor-pointer"
                >
                  {preset.q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2">
            <input
              type="text"
              placeholder="Type your clinical question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-brand-500"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-1.5 bg-brand-800 hover:bg-brand-700 text-white rounded-md transition-colors cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
