"use client";

import type { ReactNode } from "react";

/** Shared admin form primitives, reused across CMS editors. */

export const fieldClass =
  "w-full rounded-none border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-bronze focus-visible:outline-none focus:ring-1 focus:ring-bronze";
export const labelClass = "mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink";

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
  onRemove: () => void;
  removeTitle: string;
}) {
  return (
    <div className="flex shrink-0 gap-1">
      <MiniBtn title="Move up" onClick={() => onMove(index - 1)} disabled={index === 0}>
        ↑
      </MiniBtn>
      <MiniBtn title="Move down" onClick={() => onMove(index + 1)} disabled={index === count - 1}>
        ↓
      </MiniBtn>
      <MiniBtn title={removeTitle} onClick={onRemove} danger>
        ✕
      </MiniBtn>
    </div>
  );
}

export function StringList({
  items,
  onChange,
  multiline = false,
  addLabel = "Add item",
  placeholder = "",
}: {
  items: string[];
  onChange: (next: string[]) => void;
  multiline?: boolean;
  addLabel?: string;
  placeholder?: string;
}) {
  const set = (i: number, value: string) => onChange(items.map((it, idx) => (idx === i ? value : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (from: number, to: number) => onChange(moveItem(items, from, to));

  return (
    <div className="space-y-2">
      {items.length === 0 && <p className="text-xs italic text-muted">None yet.</p>}
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <textarea
              value={item}
              placeholder={placeholder}
              rows={2}
              onChange={(e) => set(i, e.target.value)}
              className={`${fieldClass} resize-y`}
            />
          ) : (
            <input value={item} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} className={fieldClass} />
          )}
          <div className="pt-0.5">
            <RowControls index={i} count={items.length} onMove={(to) => move(i, to)} onRemove={() => remove(i)} removeTitle="Remove" />
          </div>
        </div>
      ))}
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
