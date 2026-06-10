"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Review, ReviewsData } from "@/lib/cms/schemas";
import { AddButton, fieldClass, Labeled, labelClass, moveItem, RowControls } from "@/components/admin/fields";
import { ImageField } from "@/components/admin/ImageField";

function StarSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={`text-2xl leading-none transition-colors hover:text-[#fbbc05] ${n <= value ? "text-[#fbbc05]" : "text-line"}`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-xs text-muted">{value}/5</span>
    </div>
  );
}

export function ReviewsEditor() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [load, setLoad] = useState<"loading" | "ready" | "error">("loading");
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/content/reviews", { cache: "no-store" });
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (!res.ok) {
          const d = (await res.json().catch(() => ({}))) as { message?: string };
          if (active) {
            setLoad("error");
            setLoadError(d.message ?? `Failed to load reviews (${res.status}).`);
          }
          return;
        }
        const body = (await res.json()) as { data: ReviewsData };
        if (active) {
          setData(body.data);
          setLoad("ready");
        }
      } catch {
        if (active) {
          setLoad("error");
          setLoadError("Network error while loading reviews.");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  function mutate(producer: (prev: ReviewsData) => ReviewsData) {
    setData((prev) => (prev ? producer(prev) : prev));
    setSaved(false);
  }
  const setReview = (i: number, next: Review) =>
    mutate((d) => ({ ...d, reviews: d.reviews.map((r, idx) => (idx === i ? next : r)) }));

  async function save() {
    if (!data) return;
    setSaving(true);
    setSaveError("");
    setIssues([]);
    try {
      const res = await fetch("/api/admin/content/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const d = (await res.json().catch(() => ({}))) as { message?: string; errors?: string[] };
      if (res.ok) {
        setSaved(true);
        return;
      }
      if (res.status === 422 && Array.isArray(d.errors)) {
        setIssues(d.errors);
        setSaveError("Please fix the issues below, then save again.");
        return;
      }
      setSaveError(d.message ?? `Save failed (${res.status}).`);
    } catch {
      setSaveError("Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  if (load === "loading") return <p className="text-sm text-muted">Loading reviews…</p>;
  if (load === "error" || !data) {
    return (
      <div>
        <Back />
        <div className="mt-4 border border-red-300 bg-red-50 p-4 text-sm text-red-800">{loadError}</div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Back />
          <h1 className="mt-2 font-display text-2xl font-extrabold text-ink">Google reviews</h1>
          <p className="mt-1 font-mono text-xs text-muted">reviews.json</p>
        </div>
        <SaveBtn saving={saving} onClick={save} />
      </div>

      {saved && (
        <div className="mt-5 border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
          Saved. Your changes will be live in about 1–2 minutes, once the site rebuilds.
        </div>
      )}
      {(saveError || issues.length > 0) && (
        <div className="mt-5 border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {saveError && <p className="font-semibold">{saveError}</p>}
          {issues.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs">
              {issues.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Card title="Section heading">
        <Labeled label="Eyebrow">
          <input value={data.eyebrow} onChange={(e) => mutate((d) => ({ ...d, eyebrow: e.target.value }))} className={fieldClass} />
        </Labeled>
        <Labeled label="Title">
          <input value={data.title} onChange={(e) => mutate((d) => ({ ...d, title: e.target.value }))} className={fieldClass} />
        </Labeled>
        <Labeled label="Intro">
          <textarea value={data.intro} rows={3} onChange={(e) => mutate((d) => ({ ...d, intro: e.target.value }))} className={`${fieldClass} resize-y`} />
        </Labeled>
      </Card>

      <Card title="Rating summary">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Score (e.g. 4.9)">
            <input value={data.rating.score} onChange={(e) => mutate((d) => ({ ...d, rating: { ...d.rating, score: e.target.value } }))} className={fieldClass} />
          </Labeled>
          <Labeled label="Out of (e.g. 5)">
            <input value={data.rating.outOf} onChange={(e) => mutate((d) => ({ ...d, rating: { ...d.rating, outOf: e.target.value } }))} className={fieldClass} />
          </Labeled>
          <Labeled label="Review count">
            <input
              type="number"
              value={data.rating.count}
              onChange={(e) => mutate((d) => ({ ...d, rating: { ...d.rating, count: Number(e.target.value) || 0 } }))}
              className={fieldClass}
            />
          </Labeled>
          <Labeled label="Platform (e.g. Google)">
            <input value={data.rating.platform} onChange={(e) => mutate((d) => ({ ...d, rating: { ...d.rating, platform: e.target.value } }))} className={fieldClass} />
          </Labeled>
        </div>
      </Card>

      <Card title="Reviews">
        <div className="space-y-4">
          {data.reviews.map((rev, i) => (
            <div key={i} className="border border-line bg-cream/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Review {i + 1}</span>
                <RowControls
                  index={i}
                  count={data.reviews.length}
                  onMove={(to) => mutate((d) => ({ ...d, reviews: moveItem(d.reviews, i, to) }))}
                  onRemove={() => mutate((d) => ({ ...d, reviews: d.reviews.filter((_, idx) => idx !== i) }))}
                  removeTitle="Remove review"
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Labeled label="Name">
                  <input value={rev.name} onChange={(e) => setReview(i, { ...rev, name: e.target.value })} className={fieldClass} />
                </Labeled>
                <Labeled label="Role / company">
                  <input value={rev.role ?? ""} onChange={(e) => setReview(i, { ...rev, role: e.target.value })} className={fieldClass} />
                </Labeled>
                <Labeled label="Date">
                  <input value={rev.date} onChange={(e) => setReview(i, { ...rev, date: e.target.value })} className={fieldClass} />
                </Labeled>
                <Labeled label="Initials (fallback avatar)">
                  <input value={rev.initials} maxLength={3} onChange={(e) => setReview(i, { ...rev, initials: e.target.value.toUpperCase() })} className={fieldClass} />
                </Labeled>
              </div>
              <div className="mt-3">
                <span className={labelClass}>Rating</span>
                <StarSelect value={rev.rating} onChange={(v) => setReview(i, { ...rev, rating: v })} />
              </div>
              <div className="mt-3">
                <ImageField label="Reviewer photo (optional)" dir="reviews" round value={rev.image ?? ""} onChange={(path) => setReview(i, { ...rev, image: path })} />
              </div>
              <div className="mt-3">
                <Labeled label="Quote">
                  <textarea value={rev.quote} rows={3} onChange={(e) => setReview(i, { ...rev, quote: e.target.value })} className={`${fieldClass} resize-y`} />
                </Labeled>
              </div>
            </div>
          ))}
        </div>
        <AddButton
          label="Add review"
          onClick={() => mutate((d) => ({ ...d, reviews: [...d.reviews, { name: "", role: "", date: "", quote: "", rating: 5, image: "", initials: "" }] }))}
        />
      </Card>

      <div className="mt-8 flex items-center gap-4">
        <SaveBtn saving={saving} onClick={save} />
        {saved && <span className="text-sm text-emerald-700">Saved ✓</span>}
      </div>
    </div>
  );
}

function Back() {
  return (
    <Link href="/admin" className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze hover:underline">
      ← All content
    </Link>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border border-line bg-white p-5 sm:p-6">
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="bg-ink px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-60"
    >
      {saving ? "Saving…" : "Save & publish"}
    </button>
  );
}
