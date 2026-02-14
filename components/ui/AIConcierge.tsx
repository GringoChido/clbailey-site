"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useTranslations } from "next-intl";

/*
 * Showroom Manager — dark-mode sidebar concierge.
 * #0D0D0D background, gold (#C5A47E) accents.
 * Gallery Manager persona. Captures City/ZIP.
 */

export default function AIConcierge() {
  const t = useTranslations("concierge");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  const getMessageText = (m: (typeof messages)[0]) => {
    if (m.parts) {
      return m.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("");
    }
    return "";
  };

  return (
    <>
      {/* Floating Button — Ink with gold icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0D0D0D] text-[#C5A47E] rounded-full flex items-center justify-center transition-all hover:bg-[#1A1A1A]"
        aria-label={t("openLabel")}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Dark Sidebar Panel */}
      {open && (
        <div
          className="fixed top-0 right-0 bottom-0 z-50 w-[400px] max-w-[100vw] bg-[#0D0D0D] flex flex-col animate-fade-in"
        >
          {/* Header */}
          <div className="px-10 py-8 border-b border-white/5 bg-[#0A0A0A]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl tracking-[0.3em] uppercase font-light text-white">
                  {t("title")}
                </h3>
                <p className="text-[9px] tracking-[0.3em] text-[#C5A47E] uppercase mt-2 italic font-bold">
                  {t("subtitle")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-600 hover:text-white hover:rotate-90 transition-all"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
            {/* Welcome message — always show first */}
            {messages.length === 0 && (
              <div className="flex gap-8">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#C5A47E]/20 bg-neutral-900">
                  {/* Bot icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A47E" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div className="text-sm leading-relaxed font-light text-neutral-400">
                  {t("welcome")}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-8 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar icon */}
                <div
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border ${
                    m.role === "assistant"
                      ? "border-[#C5A47E]/20 bg-neutral-900"
                      : "border-neutral-700 bg-white"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A47E" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div
                  className={`max-w-[75%] text-sm leading-relaxed font-light ${
                    m.role === "user"
                      ? "text-right text-neutral-300"
                      : "text-neutral-400"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{getMessageText(m)}</p>
                </div>
              </div>
            ))}
            {/* Gold spinning loader */}
            {isLoading &&
              messages.length > 0 &&
              getMessageText(messages[messages.length - 1]) === "" && (
                <div className="flex gap-8">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/5 bg-neutral-900">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C5A47E"
                      strokeWidth="2"
                      className="animate-spin"
                    >
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                  </div>
                </div>
              )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-10 py-8 border-t border-white/5 bg-[#0A0A0A]"
          >
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full bg-transparent border-b border-neutral-800 py-5 pr-12 text-sm focus:outline-none focus:border-[#C5A47E] transition-all font-light placeholder-neutral-700 text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#C5A47E] transition-colors text-neutral-700 disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
