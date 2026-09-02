"use client";

import { useState } from "react";

interface ChatMessage {
  id: string;
  sender: "user" | "support";
  message: string;
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "support", message: "Welcome to Ceylon Gem Atelier. How can we assist you today?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), sender: "user", message: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTimeout(() => {
      const supportMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: "support", message: "Thank you for your message. A team member will respond shortly.", timestamp: new Date() };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-96 max-w-full bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 rounded-[20px] shadow-[0_18px_50px_rgba(28,27,26,0.12)] flex flex-col h-96 overflow-hidden">
          <div className="bg-[var(--color-graphite)] text-[var(--color-ivory)] px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-serif text-base tracking-[0.08em] uppercase">Live Chat</h3>
              <p className="text-[10px] uppercase tracking-[0.12em] opacity-80">We typically reply in minutes</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Close chat">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-3 py-2 rounded-[14px] text-sm leading-relaxed ${msg.sender === "user" ? "bg-[var(--color-sapphire)] text-[var(--color-ivory)]" : "bg-[var(--color-parchment)] text-[var(--color-graphite)]"}`}>{msg.message}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-stone)]/20 p-3 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="flex-1 px-3 py-2 border border-[var(--color-stone)]/40 text-sm focus:outline-none focus:border-[var(--color-graphite)] rounded-md" />
            <button onClick={handleSend} className="px-3 py-2 bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-sapphire)] transition-all text-sm rounded-md">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_16px_40px_rgba(28,27,26,0.18)] transition-all duration-300 ${isOpen ? "bg-[var(--color-graphite)] text-[var(--color-ivory)]" : "bg-[var(--color-sapphire)] text-[var(--color-ivory)] hover:bg-[var(--color-graphite)]"}`} title="Open live chat" aria-label={isOpen ? "Close live chat" : "Open live chat"}>
        {isOpen ? <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg> : <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18.5V7.2A2.2 2.2 0 0 1 7.2 5h9.6A2.2 2.2 0 0 1 19 7.2v6.6A2.2 2.2 0 0 1 16.8 16H9l-4 2.5Z" /><path d="M8.5 10.2h7M8.5 13h4.5" /></svg>}
      </button>
    </div>
  );
}
