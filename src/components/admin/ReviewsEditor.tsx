"use client";

import type { Review, ReviewsData } from "@/lib/cms/schemas";
import { AddButton, fieldClass, Labeled, labelClass, moveItem, RowControls } from "@/components/admin/fields";
import { ImageField } from "@/components/admin/ImageField";
import { Card, EditorHeader, LoadGate, SaveBtn, StatusBanners, useObjectEditor } from "@/components/admin/objectEditor";

function StarSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={`text-2xl leading-none transition-colors hover:text-[#ee5935] ${n <= value ? "text-[#ee5935]" : "text-line"}`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-xs text-muted">{value}/5</span>
    </div>
  );
}

export function ReviewsEditor() {
  const { data, mutate, load, loadError, saving, saved, saveError, issues, save } =
    useObjectEditor<ReviewsData>("reviews");

  const setReview = (i: number, next: Review) =>
    mutate((d) => ({ ...d, reviews: d.reviews.map((r, idx) => (idx === i ? next : r)) }));

  return (
    <div className="pb-16">
      <EditorHeader title="Google reviews" file="reviews.json" saving={saving} onSave={save} />
      <StatusBanners saved={saved} saveError={saveError} issues={issues} />

      <LoadGate load={load} loadError={loadError}>
        {data && (
          <>
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
          </>
        )}
      </LoadGate>
    </div>
  );
}
