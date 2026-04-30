"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  ExternalLink,
  UserRound,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAiChatMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { helpers } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

// Message interface
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

export default function AIChatBox() {
  const t = useTranslations("user.home.ai");
  const { user } = useAppSelector((state: any) => state.auth);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am your Olistami AI assistant. How can I help you today?",
      data: [],
    },
  ]);

  console.log("messages", messages);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [aiChat] = useAiChatMutation();

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage || isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: trimmedMessage }]);
    setChatInput("");
    setIsTyping(true);

    try {
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
      setIsTyping(false);
    }
  };

  // Render a single message
  const renderMessage = (msg: Message, idx: number) => {
    const isUser = msg.role === "user";
    return (
      <div
        key={idx}
        className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex gap-2 max-w-[90%] ${isUser ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isUser ? "bg-[#A68B7C] text-white" : "bg-[#F5F1ED] text-[#4A3E37]"
            }`}
          >
            {isUser ? <UserRound size={16} /> : <Bot size={16} />}
          </div>

          <div className="flex flex-col gap-2">
            <div
              className={`p-3 rounded-2xl text-sm ${
                isUser
                  ? "bg-[#A68B7C] text-white rounded-tr-none"
                  : "bg-white border border-[#EAE2D9] text-[#4A3E37] rounded-tl-none"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>

            {/* Events */}
            {msg.data && msg.data.length > 0 && (
              <div className="grid grid-cols-1 gap-3 mt-2">
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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-[#EAE2D9] w-[350px] sm:w-[450px] h-[600px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#A68B7C] rounded-lg flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold">{t("header.title")}</h4>
                  <p className="text-xs">{t("header.text")}</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-white/10 cursor-pointer rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF9]">
              {messages.map(renderMessage)}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F1ED] text-[#4A3E37] flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white border border-[#EAE2D9] p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <WaveAnimation />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4  bg-[#FDFBF9] border-[#EAE2D9] flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t("placeholder")}
                className="flex-1 bg-[#FDFBF9] border border-[#EAE2D9] rounded-xl px-4 py-2 text-sm outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="bg-[#A68B7C] text-white p-2 rounded-xl  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#4A3E37] text-white p-4 cursor-pointer rounded-2xl shadow-2xl transition-all flex items-center gap-3 group fixed bottom-6 right-6"
        >
          <div className="relative">
            <MessageSquare size={24} />
            {!isChatOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#A68B7C] rounded-full border-2 border-[#4A3E37] animate-pulse" />
            )}
          </div>
          <span className="font-bold text-sm hidden sm:block">
            {t("title")}
          </span>
        </button>
      )}
    </div>
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
            height: `${8 + Math.sin(i * 1.2) * 6}px`,
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
};
