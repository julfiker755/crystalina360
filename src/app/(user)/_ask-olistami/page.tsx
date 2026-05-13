"use client"
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, UserRound } from 'lucide-react';
import favLogo from "@/assets/icon.png"
import { ImgBox } from '@/components/reuseable/Img-box';
import { useAiChatMutation } from '@/redux/api/authApi';
import { helpers } from '@/lib';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { motion } from "motion/react";
import { useIsMobile } from '@/hooks/useIsMobile';

interface Message {
  role: "user" | "model";
  text: string;
  data?: Event[];
}

interface Event {
  id: string;
  img?: string;
  event_title?: string;
  event_description?: string;
}
export default function AskOlistami() {
  const { user } = useAppSelector((state: any) => state.auth);
  const [isSuggestions, setIsSuggestions] = useState(true)
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am your Olistami AI assistant. How can I help you today?",
      data: [],
    },
  ]);

  const [aiChat] = useAiChatMutation();


  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // 2. useEffect এ scrollTop দিয়ে scroll করুন
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }


    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile]);


  const handleSendMessage = async (msg: any) => {
    const trimmedMessage = msg.trim();
    if (!trimmedMessage || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: trimmedMessage }]);
    setChatInput("");


    try {
      setIsLoading(true)
      setIsSuggestions(false)
      const data = helpers.fromData({ message: trimmedMessage });
      const res = await aiChat(data).unwrap();

      if (res?.status) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: res.message || "Here is what I found:",
            data: res.data,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I encountered an error connecting to the AI service.",
        },
      ]);
    } finally {
      setIsLoading(false)
    }
  };


  const renderMessage = (msg: Message, idx: number) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={idx}
        className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex gap-1  max-w-[90%] ${isUser ? "flex-row-reverse" : ""}`}
        >
          <div

          >
            {isUser ? (

              <div className="size-10 rounded-full flex items-center shadow-xs justify-center border">
                <UserRound className="w-6 h-6 text-gray-400" />

              </div>
            ) : (
              <div className="size-10 rounded-full flex items-center shadow-xs justify-center border">
                <ImgBox className='size-6' src={favLogo} alt='img' />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div
              className={`px-3 text-base mt-1`}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>

            {/* Events */}
            {msg.data && msg.data.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                {msg.data.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-md shadow-sm overflow-hidden"
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.event_title}
                        className="w-full h-32 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="p-3 space-y-2">
                      <h5 className="font-bold text-sm text-[#4A3E37] line-clamp-1">
                        {item.event_title}
                      </h5>
                      {item.event_description && (
                        <p className="text-[11px] line-clamp-3 text-[#8E8279] leading-relaxed">
                          {item.event_description}
                        </p>
                      )}
                      {user?.email ? (
                        <Link
                          href={`/events/${item.id}`}
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full border border-border/40 text-[#4A3E37] py-2 rounded-lg text-xs font-bold  transition-colors"
                        >
                          View Details
                          <ExternalLink size={12} />
                        </Link>
                      ) : (
                        <button className="flex items-center justify-center gap-2 w-full border border-border/40  text-[#4A3E37] py-2 rounded-lg text-xs font-bold  transition-colors">
                          Sign in to access
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] w-screen">
      {/* Header */}
      <div className="text-center mb-10  mt-13 slide-up">
        <h1 className="text-5xl  text-gray-800 mb-3 tracking-tight">
          Your Personal Wellness Concierge
        </h1>
        <p className="text-gray-500 text-lg md:text-xl">
          Find your perfect match — the right expert or service for your goals.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="w-full lg:max-w-4xl mb-10 bg-white rounded-4xl lg:border border-wellness-border overflow-hidden flex flex-col h-[600px] slide-up [animation-delay:200ms]">

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide sm:p-8 md:p-10 space-y-12 scroll-smooth"
        >
          {messages.map(renderMessage)}


          {isSuggestions && (
            <div className="mt-3 space-y-3 px-8 md:px-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Suggestions</p>
              <div className="flex flex-col gap-3">
                {[
                  "I find it hard to focus at work.",
                  "Social situations make me very uncomfortable.",
                  "I often feel overwhelmed by small tasks."
                ].map((item: any, sIdx: any) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(item)}
                    className="w-fit px-6 py-3 rounded-2xl cursor-pointer border border-wellness-border hover:border-wellness-accent hover:bg-rose-50/30 text-gray-600 text-left transition-all duration-200 active:scale-[0.98]"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsSuggestions(false)} className="mt-2 text-wellness-accent text-figma-primary font-medium cursor-pointer underline underline-offset-4 decoration-wellness-accent/30 hover:decoration-wellness-accent text-sm transition-all">
                Skip to Suggestions
              </button>
            </div>
          )}


          {isLoading && (
            <div className="flex gap-6 fade-in">
              <div className="size-10 rounded-full flex items-center shadow-xs justify-center border">
                <ImgBox className='size-6' src={favLogo} alt='img' />
              </div>
              <WaveAnimation />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-8 pt-5 pb-7">
          <div className="relative group">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
              placeholder="Ask me anything..."
              className="w-full bg-white border border-wellness-border rounded-full py-3 px-8 pr-16 text-lg focus:outline-none focus:border-wellness-accent  transition-all placeholder:text-gray-300"
            />
            <button
              onClick={() => handleSendMessage(chatInput)}
              disabled={isLoading || !chatInput.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-figma-primary text-white size-10 rounded-full bg-wellness-accent/10 text-wellness-accent flex items-center cursor-pointer justify-center hover:bg-wellness-accent  disabled:hover:text-wellness-accent transition-all duration-300 transform active:scale-95"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}


const WaveAnimation = () => {
  const DevElement = (
    <div
      className={`flex items-center gap-0.5 opacity-100 transition-opacity duration-300`}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <span
          key={i}
          className="block w-0.5 bg-primary rounded-full"
          style={{
            height: `${10 + Math.sin(i * 1.2) * 8}px`,
            animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center space-x-2">
      {DevElement}
      {DevElement}
    </div>
  );

}