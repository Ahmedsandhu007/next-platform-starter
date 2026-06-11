"use client";

import type { ReactNode } from "react";
import { limitFor } from "@/lib/cms/limits";

/** Shared admin form primitives, reused across CMS editors. */

export const fieldClass =
  "w-full rounded-none border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-bronze focus-visible:outline-none focus:ring-1 focus:ring-bronze";
export const labelClass = "mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink";

/** Live character counter — turns red once the value is over the limit. */
export function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max;
  return (
    <span className={`shrink-0 text-[0.68rem] tabular-nums ${over ? "font-semibold text-red-600" : "text-muted/70"}`}>
      {value.length}/{max}
    </span>
  );
}

/**
 * Text input / textarea with a live character counter + over-limit styling.
 * The limit comes from an explicit `max`, or the field `role` resolved against
 * the central CMS limits (so it always matches what the server will enforce).
 */
export function LimitedField({
  value,
  onChange,
  role,
  max,
  placeholder,
  multiline = false,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  role?: string;
  max?: number;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const limit = max ?? (role ? limitFor(role) : 400);
  const over = value.length > limit;
  const cls = `${fieldClass} ${over ? "border-red-400 focus:border-red-500 focus:ring-red-400" : ""}`;
  return (
    <div>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-y`}
        />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
      <div className="mt-0.5 flex justify-end">
        <CharCount value={value} max={limit} />
      </div>
    </div>
  );
}

export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function Labeled({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className={labelClass}>{label}</span>
        {hint && <span className="mb-1 text-[0.7rem] text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function MiniBtn({
  children,
  onClick,
  disabled,
  title,
  danger,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-7 w-7 shrink-0 place-items-center border text-xs transition-colors disabled:opacity-25 ${
        danger
          ? "border-line text-red-600 hover:border-red-400 hover:bg-red-50"
          : "border-line text-muted hover:border-bronze hover:text-bronze"
      }`}
    >
      {children}
    </button>
  );
}

export function RowControls({
  index,
  count,
  onMove,
  onRemove,
  removeTitle,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  /** Omit to make the row reorder-only (no remove button) — e.g. slug-locked lists. */
  onRemove?: () => void;
  removeTitle?: string;
}) {
  return (
    <div className="flex shrink-0 gap-1">
      <MiniBtn title="Move up" onClick={() => onMove(index - 1)} disabled={index === 0}>
        ↑
      </MiniBtn>
      <MiniBtn title="Move down" onClick={() => onMove(index + 1)} disabled={index === count - 1}>
        ↓
      </MiniBtn>
      {onRemove && (
        <MiniBtn title={removeTitle ?? "Remove"} onClick={onRemove} danger>
          ✕
        </MiniBtn>
      )}
    </div>
  );
}

export function StringList({
  items,
  onChange,
  multiline = false,
  addLabel = "Add item",
  placeholder = "",
  role,
  max,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  multiline?: boolean;
  addLabel?: string;
  placeholder?: string;
  /** Field role (e.g. "points", "bullets") — resolves the per-item character limit. */
  role?: string;
  /** Explicit per-item character limit (overrides `role`). */
  max?: number;
}) {
  const set = (i: number, value: string) => onChange(items.map((it, idx) => (idx === i ? value : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (from: number, to: number) => onChange(moveItem(items, from, to));
  const limit = max ?? (role ? limitFor(role) : undefined);

  return (
    <div className="space-y-2">
      {items.length === 0 && <p className="text-xs italic text-muted">None yet.</p>}
      {items.map((item, i) => {
        const over = limit !== undefined && item.length > limit;
        const cls = `${fieldClass} ${over ? "border-red-400" : ""}`;
        return (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              {multiline ? (
                <textarea
                  value={item}
                  placeholder={placeholder}
                  rows={2}
                  onChange={(e) => set(i, e.target.value)}
                  className={`${cls} resize-y`}
                />
              ) : (
                <input value={item} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} className={cls} />
              )}
              {limit !== undefined && (
                <div className="mt-0.5 flex justify-end">
                  <CharCount value={item} max={limit} />
                </div>
              )}
            </div>
            <div className="pt-0.5">
              <RowControls index={i} count={items.length} onMove={(to) => move(i, to)} onRemove={() => remove(i)} removeTitle="Remove" />
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze hover:underline"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 border border-dashed border-line px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-bronze transition-colors hover:border-bronze hover:bg-bronze-50"
    >
      + {label}
    </button>
  );
}
