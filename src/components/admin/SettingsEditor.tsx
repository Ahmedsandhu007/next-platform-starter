"use client";

import type { Office, SiteSettings } from "@/lib/cms/siteSchema";
import { AddButton, fieldClass, Labeled, moveItem, RowControls, StringList } from "@/components/admin/fields";
import { ImageField } from "@/components/admin/ImageField";
import { Card, EditorHeader, LoadGate, SaveBtn, StatusBanners, useObjectEditor } from "@/components/admin/objectEditor";

const OFFICE_FIELDS: { key: keyof Office; label: string }[] = [
  { key: "city", label: "City / office name" },
  { key: "addressLine", label: "Address" },
  { key: "postcode", label: "Postcode" },
  { key: "phone", label: "Phone — for call links (e.g. +44 161 222 3120)" },
  { key: "phoneDisplay", label: "Phone — shown on the page (e.g. 0161 222 3120)" },
];

export function SettingsEditor() {
  const { data, mutate, load, loadError, saving, saved, saveError, issues, save } =
    useObjectEditor<SiteSettings>("settings");

  const setContact = (key: keyof SiteSettings["contact"], value: string) =>
    mutate((d) => ({ ...d, contact: { ...d.contact, [key]: value } }));
  const setSocial = (key: keyof SiteSettings["social"], value: string) =>
    mutate((d) => ({ ...d, social: { ...d.social, [key]: value } }));
  const setOffice = (i: number, next: Office) =>
    mutate((d) => ({ ...d, offices: d.offices.map((o, idx) => (idx === i ? next : o)) }));

  return (
    <div className="pb-16">
      <EditorHeader title="Site & contact details" file="settings.json" saving={saving} onSave={save} />
      <StatusBanners saved={saved} saveError={saveError} issues={issues} />

      <LoadGate load={load} loadError={loadError}>
        {data && (
          <>
            <Card title="Business identity" description="Your firm name, registration and the description search engines show.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Labeled label="Business name">
                  <input value={data.name} onChange={(e) => mutate((d) => ({ ...d, name: e.target.value }))} className={fieldClass} />
                </Labeled>
                <Labeled label="Short name (logo / abbreviations)">
                  <input value={data.shortName} onChange={(e) => mutate((d) => ({ ...d, shortName: e.target.value }))} className={fieldClass} />
                </Labeled>
                <Labeled label="Company number">
                  <input value={data.companyNumber} onChange={(e) => mutate((d) => ({ ...d, companyNumber: e.target.value }))} className={fieldClass} />
                </Labeled>
                <Labeled label="Website URL" hint="https://…">
                  <input value={data.url} onChange={(e) => mutate((d) => ({ ...d, url: e.target.value }))} className={fieldClass} />
                </Labeled>
              </div>
              <Labeled label="Description" hint="Used for SEO + structured data">
                <textarea
                  value={data.description}
                  rows={3}
                  onChange={(e) => mutate((d) => ({ ...d, description: e.target.value }))}
                  className={`${fieldClass} resize-y`}
                />
              </Labeled>
              <div>
                <span className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink">
                  Pillars (shown beneath the logo)
                </span>
                <StringList
                  items={data.pillars}
                  onChange={(pillars) => mutate((d) => ({ ...d, pillars }))}
                  addLabel="Add pillar"
                  placeholder="e.g. Tax"
                />
              </div>
            </Card>

            <Card
              title="Hero image"
              description="The cut-out photo on the home-page hero. Leave empty to use the built-in default. PNG with a transparent background works best."
            >
              <ImageField
                label="Hero cut-out"
                dir="hero"
                value={data.heroImage}
                onChange={(path) => mutate((d) => ({ ...d, heroImage: path }))}
              />
            </Card>

            <Card
              title="Primary contact"
              description="Used in the header, the call buttons and search-engine data. This is your main (Manchester) office."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Labeled label="Phone — for call links" hint="e.g. +44 161 222 3120">
                  <input value={data.contact.phone} onChange={(e) => setContact("phone", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Phone — shown on the page" hint="e.g. 0161 222 3120">
                  <input value={data.contact.phoneDisplay} onChange={(e) => setContact("phoneDisplay", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Email">
                  <input value={data.contact.email} onChange={(e) => setContact("email", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Opening hours">
                  <input value={data.contact.hours} onChange={(e) => setContact("hours", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Address">
                  <input value={data.contact.addressLine} onChange={(e) => setContact("addressLine", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="City">
                  <input value={data.contact.city} onChange={(e) => setContact("city", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Postcode">
                  <input value={data.contact.postcode} onChange={(e) => setContact("postcode", e.target.value)} className={fieldClass} />
                </Labeled>
              </div>
            </Card>

            <Card title="Offices" description="Shown in the footer and on the contact page. The first office should match your primary contact above.">
              <div className="space-y-4">
                {data.offices.map((office, i) => (
                  <div key={i} className="border border-line bg-cream/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">Office {i + 1}</span>
                      <RowControls
                        index={i}
                        count={data.offices.length}
                        onMove={(to) => mutate((d) => ({ ...d, offices: moveItem(d.offices, i, to) }))}
                        onRemove={() => mutate((d) => ({ ...d, offices: d.offices.filter((_, idx) => idx !== i) }))}
                        removeTitle="Remove office"
                      />
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {OFFICE_FIELDS.map(({ key, label }) => (
                        <Labeled key={key} label={label}>
                          <input value={office[key]} onChange={(e) => setOffice(i, { ...office, [key]: e.target.value })} className={fieldClass} />
                        </Labeled>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <AddButton
                label="Add office"
                onClick={() =>
                  mutate((d) => ({
                    ...d,
                    offices: [...d.offices, { city: "", addressLine: "", postcode: "", phone: "", phoneDisplay: "" }],
                  }))
                }
              />
            </Card>

            <Card title="Social links" description="Used by the social icons in the header, footer and side rail.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Labeled label="LinkedIn URL">
                  <input value={data.social.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Twitter / X URL">
                  <input value={data.social.twitter} onChange={(e) => setSocial("twitter", e.target.value)} className={fieldClass} />
                </Labeled>
                <Labeled label="Facebook URL">
                  <input value={data.social.facebook} onChange={(e) => setSocial("facebook", e.target.value)} className={fieldClass} />
                </Labeled>
              </div>
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
