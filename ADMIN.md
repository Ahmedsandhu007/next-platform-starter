# MMR CMS — content editing guide

A lightweight admin at **`/admin`** lets you edit most of the site's content —
your site-wide details and text, the home-page reviews, and the detail pages
(Services, Industries and "How we help"). **Saving stores your change as a draft —
it does not touch the live site or trigger a build.** When you're ready, click
**Publish changes** on the dashboard to push everything live at once (~1–2 minutes).
Batching many edits into a single publish keeps Netlify build usage low.

The public site is unaffected by the CMS: it still reads content at build time,
so if the CMS is not configured the marketing site builds and runs exactly as
before.

---

## What you can edit

The dashboard groups everything into **Site-wide**, **Home page** and **Detail pages**.

**Site-wide → Site & contact details** (`settings.json`)

- **Business identity** — name, short name, company number, website URL and the SEO description
- **Hero image** — upload the home-page hero cut-out (leave empty to use the built-in default)
- **Primary contact** — phone (call-link + display), email, address and opening hours
- **Offices** — the address + phone for each office (add / remove / reorder)
- **Social links** — LinkedIn, Twitter/X and Facebook

**Site-wide → Section text & headings** (`copy.json`)

- Every eyebrow, heading, subtitle, paragraph and button label across the site,
  grouped by section (Hero, Services, Why MMR, FAQ, Footer, …)
  with a jump-nav at the top. Includes the breadcrumb / banner title / SEO listing
  for each sub-page.

**Site-wide → Section items** (`sections.json`)

- The card / list content for the main sections: **Services**, **Industries**,
  **Why MMR** reasons, **Approach** value props, **How we work** steps, **FAQs**,
  the **trust badges** strip and the contact-form **business types**.
- Each card picks its icon (and, where used, its illustration) from a dropdown of
  the available options, so you can't choose one the site can't draw.
- Services, Industries and Approach cards are tied to their detail pages, so their
  web addresses (slugs) and the number of cards are locked — you edit the content
  and reorder them. The other lists can be added to, removed from and reordered.

**Site-wide → Navigation & menus** (`nav.json`)

- The top navigation links, their dropdowns and the two-pane mega-menus — labels,
  web addresses (hrefs), category names and the items inside each (title,
  description, icon, link). Icons are chosen from a dropdown. The top-level links
  are fixed in number (the header layout depends on it) but you can edit and
  reorder them, and add / remove / reorder categories and items within a dropdown.

**Site-wide → Legal pages** (`legal.json`)

- The Privacy, Terms and Cookie pages — breadcrumb, title, intro, "last reviewed"
  date, SEO listing, and the body sections (heading + paragraphs + optional
  bullets, add / remove / reorder). The web addresses (slugs) are locked. *These
  are standard templates — have your solicitor review the wording before relying
  on it.*

**Home page → Google reviews** (`reviews.json`)

- Section heading + intro, the rating summary, and each review (text, star rating
  and an optional uploaded photo).

**Detail pages** — for each of the 16 Services / Industries / "How we help" pages:

- **Basics** — page title, eyebrow, intro (the URL/slug is fixed and shown read-only)
- **Search engine listing** — meta title & description (with length hints)
- **What's included** — the highlights list
- **Body sections** — heading + paragraphs + optional bullets (add / remove / reorder)
- **FAQs** — question + answer (add / remove / reorder)

Everything is validated before it saves, so a malformed entry can't break the build.

---

## One-time setup

### 1. Create a GitHub token

Create a **fine-grained personal access token** that can commit to the site repo:

1. GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
2. **Repository access:** only the deploy repo (`Ahmedsandhu007/next-platform-starter`).
3. **Permissions:** *Repository permissions → Contents → Read and write*.
4. Generate and copy the token (you won't see it again).

### 2. Set the environment variables

| Variable | What it is |
|---|---|
| `ADMIN_PASSWORD` | The password you type at `/admin/login`. |
| `ADMIN_SESSION_SECRET` | A long random string that signs the login cookie. |
| `GITHUB_TOKEN` | The fine-grained token from step 1. |
| `GITHUB_REPO` | `Ahmedsandhu007/next-platform-starter` |
| `GITHUB_BRANCH` | `main` — the **published** branch Netlify builds. |
| `GITHUB_DRAFT_BRANCH` | `cms-draft` (default) — where **Save** commits go; never built. Created automatically. |

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Production (Netlify):** Site configuration → Environment variables → add them all.
After adding them, trigger a redeploy so they take effect.

> **Important — this is what saves build credits:** in Netlify, set **Site
> configuration → Build & deploy → Branch deploys → "Deploy only the production
> branch"**. That ensures commits to the `cms-draft` branch (i.e. every CMS *Save*)
> do **not** trigger a build — only **Publish changes** does. Draft commits are
> also tagged `[skip ci]` as a backstop.

**Local development:** copy `.env.example` to `.env.local` and fill in the values.
Tip: for local testing, point `GITHUB_REPO`/`GITHUB_BRANCH` at a branch you don't
mind test commits landing on.

---

## Using the CMS

1. Go to **`/admin`** and sign in with `ADMIN_PASSWORD`.
2. Pick a page from the dashboard.
3. Edit the fields. Use the ↑ / ↓ buttons to reorder list items, ✕ to remove,
   and the "+ Add" buttons to add.
4. Click **Save** — your change is stored as a **draft**; the live site is unchanged.
5. Edit as many pages / sections as you like — each Save adds to the same draft.
6. When you're ready, open the **Dashboard** and click **Publish changes** — this
   pushes everything live in a single build (~1–2 minutes). A badge in the top bar
   shows how many unpublished changes are waiting.

**Drafts & publishing.** Saves commit to a separate `cms-draft` branch, so they
never build the site. **Publish changes** merges that branch into `main` (one commit,
one build). On the dashboard you can also **Discard** to throw away all unpublished
drafts and revert to the live version. If you try to log out with unpublished
changes, you'll be asked whether to **publish**, **keep the draft**, or **discard**.

Each save creates a commit named `CMS: update <file>.json (<page title>) [skip ci]`,
so there's a full history and any change can be reverted in GitHub if needed.

---

## Security notes

- `/admin` is `noindex` and gated by middleware — every page and API call requires
  a valid signed session cookie (8-hour expiry); otherwise you're redirected to login.
- The password is compared in constant time and never stored; only the signed,
  httpOnly session cookie is set.
- The GitHub token lives only in server environment variables — it is never sent
  to the browser.

---

## Logos

The official accreditation logos (ICAEW / ACCA / AAT) are not bundled. To swap in
the real artwork, see **`public/brand/README.txt`**.

---

## Contact form enquiries

The contact form needs **no database** — Netlify Forms stores every submission and
can email it to you. To choose **where enquiries are emailed**, and to optionally
switch on **reCAPTCHA** spam protection or a **visitor auto-reply**, see
**[`FORMS.md`](FORMS.md)**.

---

## Troubleshooting

- **"CMS not configured" on the login page** → `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
  are missing from the environment.
- **"Saving is disabled" on the dashboard** → `GITHUB_TOKEN` / `GITHUB_REPO` are missing.
- **Save fails with a GitHub error** → the token lacks *Contents: Read and write*,
  has expired, or `GITHUB_REPO` / `GITHUB_BRANCH` is wrong.
- **Edit saved but the site looks unchanged** → expected — saves are drafts. Click
  **Publish changes** on the dashboard, then wait ~1–2 minutes for the build.
- **Published but still unchanged** → the build hasn't finished (check Netlify
  deploys), or you're viewing a cached page — hard-refresh.
- **Publish says "merge conflict"** → the published branch changed outside the CMS.
  Use **Discard** to reset the draft to live, then re-apply your edits.

## Scope / future

The whole-site CMS is now complete — everything below is editable, all backed by
JSON files in `src/content/` and committed through the same registry + object-editor
pattern:

- **16 detail pages** (`services.json`, `industries-1/2.json`, `approach.json`)
- **Google reviews** (`reviews.json`)
- **Site & contact details** (`settings.json`) and **section text** (`copy.json`)
- **Section item lists** (`sections.json` — services, industries, why, approach,
  process, FAQs, trust badges, business types)
- **Navigation & menus** (`nav.json`) and **legal pages** (`legal.json`)

The only content still hard-coded is structural/visual scaffolding (illustrations,
the icon set itself, layout) — appropriately developer-owned.
