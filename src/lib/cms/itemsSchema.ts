/**
 * Shape + runtime validation for the editable section item lists (Phase 3):
 *   sections.json → services, industries, whyPoints, valueProps, processSteps,
 *                   faqs, partners, businessTypes.
 *
 * Icons and illustration keys are validated against the live allow-lists
 * (Icon.tsx / SpotArt.tsx) — a card with an unknown icon would crash the page
 * at render, so a bad save must be rejected here before it can be committed.
 *
 * Types are reused from content.ts via a type-only import (erased at runtime,
 * and content.ts does not import this module back — so there is no cycle).
 */
import type { Service, Industry, WhyPoint, ValueProp, ProcessStep, Faq } from "@/lib/content";
import { isIconName } from "@/components/ui/Icon";
import { isArtName } from "@/components/ui/SpotArt";

export type SectionsData = {
  services: Service[];
  industries: Industry[];
  whyPoints: WhyPoint[];
  valueProps: ValueProp[];
  processSteps: ProcessStep[];
  faqs: Faq[];
  partners: string[];
  businessTypes: string[];
};

export type ValidationResult = { ok: true } | { ok: false; errors: string[] };

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string";
const isNonEmpty = (v: unknown): v is string => isStr(v) && v.trim() !== "";
const isStrList = (v: unknown): boolean => Array.isArray(v) && v.length > 0 && v.every(isNonEmpty);

type ItemErrors = (item: Record<string, unknown>, label: string, errors: string[]) => void;

function reqStr(item: Record<string, unknown>, field: string, label: string, errors: string[]) {
  if (!isNonEmpty(item[field])) errors.push(`${label}.${field}: required, must be a non-empty string`);
}
function reqIcon(item: Record<string, unknown>, label: string, errors: string[]) {
  if (!isIconName(item.icon)) errors.push(`${label}.icon: "${String(item.icon)}" is not a known icon name`);
}
function reqArt(item: Record<string, unknown>, label: string, errors: string[]) {
  if (!isArtName(item.art)) errors.push(`${label}.art: "${String(item.art)}" is not a known illustration`);
}

/** Validate an array of objects with a per-item checker. Requires 1+ entries. */
function checkList(value: unknown, label: string, errors: string[], perItem: ItemErrors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${label}: required, must be a non-empty array`);
    return;
  }
  value.forEach((item, i) => {
    const l = `${label}[${i}]`;
    if (!isObj(item)) {
      errors.push(`${l}: must be an object`);
      return;
    }
    perItem(item, l, errors);
  });
}

export function validateSections(value: unknown): ValidationResult {
  if (!isObj(value)) return { ok: false, errors: ["sections: must be an object"] };
  const errors: string[] = [];

  checkList(value.services, "services", errors, (it, l) => {
    reqStr(it, "slug", l, errors);
    reqStr(it, "title", l, errors);
    reqStr(it, "description", l, errors);
    reqIcon(it, l, errors);
    reqArt(it, l, errors);
    if (!isStrList(it.points)) errors.push(`${l}.points: required, must be a non-empty list of strings`);
  });

  checkList(value.industries, "industries", errors, (it, l) => {
    reqStr(it, "slug", l, errors);
    reqStr(it, "title", l, errors);
    reqStr(it, "description", l, errors);
    reqIcon(it, l, errors);
  });

  checkList(value.whyPoints, "whyPoints", errors, (it, l) => {
    reqStr(it, "title", l, errors);
    reqStr(it, "description", l, errors);
    reqIcon(it, l, errors);
  });

  checkList(value.valueProps, "valueProps", errors, (it, l) => {
    reqStr(it, "slug", l, errors);
    reqStr(it, "title", l, errors);
    reqStr(it, "description", l, errors);
    reqArt(it, l, errors);
  });

  checkList(value.processSteps, "processSteps", errors, (it, l) => {
    reqStr(it, "step", l, errors);
    reqStr(it, "title", l, errors);
    reqStr(it, "description", l, errors);
    reqIcon(it, l, errors);
  });

  checkList(value.faqs, "faqs", errors, (it, l) => {
    reqStr(it, "question", l, errors);
    reqStr(it, "answer", l, errors);
  });

  if (!isStrList(value.partners)) errors.push("partners: required, must be a non-empty list of strings");
  if (!isStrList(value.businessTypes)) errors.push("businessTypes: required, must be a non-empty list of strings");

  return errors.length > 0 ? { ok: false, errors } : { ok: true };
}
