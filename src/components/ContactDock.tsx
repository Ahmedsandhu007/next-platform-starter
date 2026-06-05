"use client";

import { useState } from "react";
import { Headset, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/content";
import { ChatPanel } from "@/components/ChatPanel";

/**
 * Floating contact speed-dial (bottom-right). Fans out "Call us" and
 * "Live chat" on hover (desktop) or tap (touch). Live chat opens the
 * scripted assistant panel.
 */
export function ContactDock() {
  const [dockOpen, setDockOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  const fanVisible = dockOpen
    ? "visible translate-y-0 opacity-100"
    : "invisible translate-y-2 opacity-0";

  return (
    <>
      <div className="group fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Fan-out actions */}
        <div
          className={`mb-3 flex flex-col items-end gap-3 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${fanVisible}`}
        >
          {/* Live chat */}
          <button
            type="button"
            onClick={() => {
              setChatOpen(true);
              setDockOpen(false);
            }}
            className="flex items-center gap-3"
          >
            <span className="border border-line bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm">
              Live chat
            </span>
            <span className="grid h-11 w-11 place-items-center bg-ink text-white transition-colors hover:bg-bronze">
              <MessageCircle className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            </span>
          </button>

          {/* Call us */}
          <a href={phoneHref} className="flex items-center gap-3">
            <span className="border border-line bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm">
              Call us
            </span>
            <span className="grid h-11 w-11 place-items-center bg-ink text-white transition-colors hover:bg-bronze">
              <Phone className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            </span>
          </a>
        </div>

        {/* Main button */}
        <button
          type="button"
          onClick={() => setDockOpen((v) => !v)}
          aria-expanded={dockOpen}
          aria-haspopup="true"
          aria-label={dockOpen ? "Close contact options" : "Contact options"}
          className="grid h-14 w-14 place-items-center bg-ink text-white shadow-lg transition-colors duration-300 hover:bg-bronze"
        >
          {dockOpen ? <X className="h-6 w-6" /> : <Headset className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>

      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
