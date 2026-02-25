"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useTranslations } from "next-intl";

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
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gray-900 text-[#C5A47E] rounded-full flex items-center justify-center transition-colors hover:bg-gray-800"
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

      {/* Sidebar Panel */}
      {open && (
        <div className="fixed top-0 right-0 bottom-0 z-50 w-[400px] max-w-[100vw] bg-gray-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium tracking-wide text-white">
                  {t("title")}
                </h3>
                <p className="text-xs text-[#C5A47E] uppercase tracking-widest mt-1 font-semibold">
                  {t("subtitle")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A47E" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div className="text-sm leading-relaxed text-gray-400">
                  {t("welcome")}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${
                    m.role === "assistant"
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A47E" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div
                  className={`max-w-[75%] text-sm leading-relaxed ${
                    m.role === "user"
                      ? "text-right text-gray-300"
                      : "text-gray-400"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{getMessageText(m)}</p>
                </div>
              </div>
            ))}
            {isLoading &&
              messages.length > 0 &&
              getMessageText(messages[messages.length - 1]) === "" && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800">
                    <svg
                      width="14"
                      height="14"
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
            className="px-8 py-6 border-t border-gray-800"
          >
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full bg-transparent border-b border-gray-700 py-4 pr-12 text-sm focus:outline-none focus:border-[#C5A47E] transition-colors placeholder-gray-600 text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#C5A47E] transition-colors text-gray-600 disabled:opacity-30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
