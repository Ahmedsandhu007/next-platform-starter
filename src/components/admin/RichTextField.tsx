"use client";

import { useRef, useState, type ReactNode } from "react";
import { Bold, Italic, Underline as UnderlineIcon, Link2, X } from "lucide-react";
import { searchDocs } from "@/lib/searchIndex";
import { limitFor } from "@/lib/cms/limits";

// Inlined (rather than imported from ./fields) so the shared Field can use
// RichTextField without an import cycle.
const fieldClass =
  "w-full rounded-none border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-bronze focus-visible:outline-none focus:ring-1 focus:ring-bronze";

/** Internal-page options for the link picker, de-duped by URL, grouped. */
const seen = new Set<string>();
const PAGES = searchDocs
  .filter((d) => (seen.has(d.url) ? false : (seen.add(d.url), true)))
  .map((d) => ({ label: d.title, href: d.url, group: d.group }));
const GROUPS = Array.from(new Set(PAGES.map((p) => p.group)));

function ToolBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      // Keep the textarea focused/selected while the button is pressed.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded text-muted transition-colors hover:bg-white hover:text-bronze"
    >
      {children}
    </button>
  );
}

/**
 * Textarea + a Bold / Italic / Underline / Link toolbar that writes safe Markdown
 * (the renderer maps it — internal links to next/link, external to a new tab, and
 * <u> via a sanitized whitelist). The Link button offers an internal-page picker
 * AND an external URL, so editors can drop either into any paragraph.
 */
export function RichTextField({
  value,
  onChange,
  role,
  max,
  rows = 3,
  placeholder,
  hideCount = false,
}: {
  value: string;
  onChange: (v: string) => void;
  role?: string;
  max?: number;
  rows?: number;
  placeholder?: string;
  /** Hide the built-in character counter (e.g. when the wrapping Field shows one). */
  hideCount?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [tab, setTab] = useState<"internal" | "external">("internal");
  const [linkText, setLinkText] = useState("");
  const [internalHref, setInternalHref] = useState(PAGES[0]?.href ?? "/");
  const [externalHref, setExternalHref] = useState("https://");
  const sel = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  const limit = max ?? (role ? limitFor(role) : 400);
  const over = value.length > limit;

  function applyWrap(before: string, after: string) {
    const ta = ref.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const chosen = value.slice(s, e) || "text";
    const next = value.slice(0, s) + before + chosen + after + value.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = s + before.length;
      ta.selectionEnd = s + before.length + chosen.length;
    });
  }

  function openLink() {
    const ta = ref.current;
    if (ta) sel.current = { start: ta.selectionStart, end: ta.selectionEnd };
    setLinkText(value.slice(sel.current.start, sel.current.end));
    setTab("internal");
    setLinkOpen(true);
  }

  function insertLink() {
    const href = (tab === "internal" ? internalHref : externalHref).trim();
    if (!href || href === "https://") return;
    const { start, end } = sel.current;
    const text = (linkText || value.slice(start, end) || "link text").trim();
    const md = `[${text}](${href})`;
    const next = value.slice(0, start) + md + value.slice(end);
    onChange(next);
    setLinkOpen(false);
    setExternalHref("https://");
    const ta = ref.current;
    if (ta) {
      requestAnimationFrame(() => {
        ta.focus();
        const pos = start + md.length;
        ta.selectionStart = ta.selectionEnd = pos;
      });
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-0.5 rounded-t border border-b-0 border-line bg-cream/60 px-1.5 py-1">
        <ToolBtn title="Bold" onClick={() => applyWrap("**", "**")}>
          <Bold className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn title="Italic" onClick={() => applyWrap("_", "_")}>
          <Italic className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn title="Underline" onClick={() => applyWrap("<u>", "</u>")}>
          <UnderlineIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolBtn>
        <span className="mx-1 h-4 w-px bg-line" aria-hidden />
        <ToolBtn title="Insert link" onClick={openLink}>
          <Link2 className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolBtn>
      </div>

      <textarea
        ref={ref}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} resize-y rounded-t-none ${over ? "border-red-400 focus:border-red-500 focus:ring-red-400" : ""}`}
      />
      {!hideCount && (
        <div className="mt-0.5 flex justify-end">
          <span className={`text-[0.68rem] tabular-nums ${over ? "font-semibold text-red-600" : "text-muted/70"}`}>
            {value.length}/{limit}
          </span>
        </div>
      )}

      {linkOpen && (
        <div className="absolute left-0 right-0 top-9 z-20 rounded border border-line bg-white p-3 shadow-xl">
          <div className="flex items-center gap-3 border-b border-line pb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em]">
            <button
              type="button"
              onClick={() => setTab("internal")}
              className={tab === "internal" ? "text-bronze" : "text-muted hover:text-ink"}
            >
              Internal page
            </button>
            <button
              type="button"
              onClick={() => setTab("external")}
              className={tab === "external" ? "text-bronze" : "text-muted hover:text-ink"}
            >
              External URL
            </button>
            <button type="button" onClick={() => setLinkOpen(false)} className="ml-auto text-muted hover:text-ink" aria-label="Close">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <input
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text"
              className={fieldClass}
            />
            {tab === "internal" ? (
              <select value={internalHref} onChange={(e) => setInternalHref(e.target.value)} className={fieldClass}>
                {GROUPS.map((g) => (
                  <optgroup key={g} label={g}>
                    {PAGES.filter((p) => p.group === g).map((p) => (
                      <option key={p.href} value={p.href}>
                        {p.label} — {p.href}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <input
                value={externalHref}
                onChange={(e) => setExternalHref(e.target.value)}
                placeholder="https://example.com"
                className={fieldClass}
              />
            )}
            <button
              type="button"
              onClick={insertLink}
              className="w-full bg-ink px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-bronze"
            >
              Insert link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
