"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import { siteConfig } from "@/lib/content";

type Msg = { from: "bot" | "user"; text: string };

const quickReplies = [
  { label: "Our services", key: "services" },
  { label: "Pricing", key: "pricing" },
  { label: "Switching to MMR", key: "switch" },
  { label: "Book a call", key: "contact" },
];

const greeting =
  "Hello, and welcome to MMR Accountants. I'm here to help with tax, advisory and payroll questions. What can I help you with today?";

/** Deterministic, on-page scripted replies — no backend required. */
function reply(input: string): string {
  const t = input.toLowerCase();
  if (/(price|pricing|cost|fee|how much|quote)/.test(t))
    return "We work on transparent fixed monthly fees built around exactly what you need — accounts, tax, payroll and advice. You'll always know the price before you commit. Share a few details on the contact page and we'll send a tailored quote within one business day.";
  if (/(switch|change|move|leave my)/.test(t))
    return "Switching is effortless — we handle the whole move for you. With your permission we contact your current accountant, request your records under professional clearance, and transfer everything across, usually within a few days.";
  if (/(service|do you|offer|help with|accounts|bookkeep)/.test(t))
    return "We cover bookkeeping & annual accounts, tax planning & returns, VAT & Making Tax Digital, payroll & pensions, company formation, and business advisory. Which area would you like to know more about?";
  if (/(vat|making tax)/.test(t))
    return "We handle VAT end to end — choosing the right scheme, preparing accurate quarterly returns and filing under Making Tax Digital, so you never miss a submission.";
  if (/(payroll|pension|paye|rti)/.test(t))
    return "Our fully managed RTI payroll covers payslips, auto-enrolment pensions, and P60s — your team is paid correctly and on time every month.";
  if (/(tax|corporation|self assess|dividend)/.test(t))
    return "We provide proactive corporation and personal tax planning — dividend strategy, allowances and reliefs — so you keep more of your profit and never face a surprise bill.";
  if (/(cloud|xero|quickbook|software)/.test(t))
    return "We're partners with Xero, QuickBooks, FreeAgent and Sage. We'll set up the best fit for you, migrate your data and keep everything reconciled in real time.";
  if (/(contact|call|phone|book|appointment|speak|talk|email)/.test(t))
    return `Of course. You can call us on ${siteConfig.contact.phoneDisplay}, email ${siteConfig.contact.email}, or use the contact page — we'll reply within one business day.`;
  if (/(hi|hello|hey|morning|afternoon)/.test(t))
    return "Hello! How can MMR help your business today? You can ask about our services, pricing, or switching across.";
  if (/(thank|cheers|great|ok|okay)/.test(t))
    return "You're very welcome. Is there anything else I can help you with?";
  return `That's a great question — one of our chartered accountants would be glad to help directly. Call ${siteConfig.contact.phoneDisplay} or drop your details on the contact page and we'll be in touch.`;
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: greeting }]);
  const [input, setInput] = useState("");
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "user", text: clean }, { from: "bot", text: reply(clean) }]);
    setInput("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="MMR Accountants chat assistant"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-50 flex h-[30rem] w-[calc(100vw-3rem)] max-w-sm flex-col border border-ink bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg leading-none text-white">MMR</span>
              <span className="h-6 w-px bg-white/30" aria-hidden />
              <div className="leading-tight">
                <p className="text-sm font-semibold">Assistant</p>
                <p className="flex items-center gap-1.5 text-[0.7rem] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden /> Online now
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close chat" className="text-white/70 transition-colors hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user" ? "bg-ink text-white" : "border border-line text-ink/85"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {quickReplies.map((q) => (
              <button
                key={q.key}
                type="button"
                onClick={() => send(q.label)}
                className="border border-line px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="w-full rounded-none border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-accent focus-visible:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-white transition-colors hover:bg-accent"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
