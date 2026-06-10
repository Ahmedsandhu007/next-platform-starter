"use client";

import { useRef, useState } from "react";
import { labelClass } from "@/components/admin/fields";

/** Image field with in-CMS upload: picks a file, uploads it (committed to the repo),
 *  and stores the returned public path. Shows a preview; supports removal. */
export function ImageField({
  value,
  onChange,
  dir = "uploads",
  label = "Image",
  round = false,
}: {
  value: string;
  onChange: (path: string) => void;
  dir?: string;
  label?: string;
  round?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("uploading");
    setError("");
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("read failed"));
        reader.readAsDataURL(file);
      });
      const base64 = dataUrl.split(",")[1] ?? "";
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentBase64: base64, dir }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { path?: string; message?: string };
      if (res.ok && data.path) {
        onChange(data.path);
        setStatus("idle");
      } else {
        setStatus("error");
        setError(data.message ?? `Upload failed (${res.status}).`);
      }
    } catch {
      setStatus("error");
      setError("Upload error.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const shape = round ? "rounded-full" : "rounded-md";

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={`h-14 w-14 border border-line object-cover ${shape}`} />
        ) : (
          <span className={`grid h-14 w-14 place-items-center border border-dashed border-line text-[0.6rem] uppercase text-muted ${shape}`}>
            none
          </span>
        )}
        <div className="flex flex-col items-start gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={status === "uploading"}
            className="border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-bronze hover:text-bronze disabled:opacity-60"
          >
            {status === "uploading" ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-xs text-muted hover:text-red-700">
              Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onFile} className="hidden" />
      </div>
      {status === "error" && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
