"use client";

import { useState, useRef, useEffect } from "react";
import type { Notification } from "@/lib/salesforce/types";

interface NotificationBellProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationBell({
  notifications,
  onNotificationClick,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-mid-gray hover:text-primary transition-colors duration-300"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        {/* Bell icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center font-[family-name:var(--font-label)] font-semibold">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-cloud z-50 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b border-cloud">
            <p className="metadata">Notifications</p>
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-body">No notifications</p>
            </div>
          ) : (
            <div>
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    onNotificationClick?.(n);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-cloud hover:bg-off-white transition-colors duration-200 ${
                    !n.read ? "bg-whisper" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!n.read && (
                      <span className="w-1.5 h-1.5 bg-primary flex-shrink-0 mt-1.5" />
                    )}
                    <div className={!n.read ? "" : "pl-3.5"}>
                      <p className="text-xs font-[family-name:var(--font-display)] text-primary leading-tight">
                        {n.title}
                      </p>
                      <p className="text-[11px] text-body mt-0.5 leading-relaxed">
                        {n.body}
                      </p>
                      <p className="text-[10px] text-silver mt-1">
                        {new Date(n.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
