# MMR CMS — content editing guide

A lightweight admin at **`/admin`** lets you edit the site's detail pages
(Services, Industries and "How we help"). Saving commits the change to the
GitHub repo, which triggers a Netlify rebuild — your edit is live in about
**1–2 minutes**.

The public site is unaffected by the CMS: it still reads content at build time,
so if the CMS is not configured the marketing site builds and runs exactly as
before.

---

## What you can edit

For each of the 17 detail pages:

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
| `GITHUB_BRANCH` | `main` |

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Production (Netlify):** Site configuration → Environment variables → add all five.
After adding them, trigger a redeploy so they take effect.

**Local development:** copy `.env.example` to `.env.local` and fill in the values.
Tip: for local testing, point `GITHUB_REPO`/`GITHUB_BRANCH` at a branch you don't
mind test commits landing on.

---

## Using the CMS

1. Go to **`/admin`** and sign in with `ADMIN_PASSWORD`.
2. Pick a page from the dashboard.
3. Edit the fields. Use the ↑ / ↓ buttons to reorder list items, ✕ to remove,
   and the "+ Add" buttons to add.
4. Click **Save & publish**.
5. Wait ~1–2 minutes for the rebuild, then refresh the live page.

Each save creates a commit named `CMS: update <file>.json (<page title>)`, so
there's a full history and any change can be reverted in GitHub if needed.

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

## Troubleshooting

- **"CMS not configured" on the login page** → `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
  are missing from the environment.
- **"Saving is disabled" on the dashboard** → `GITHUB_TOKEN` / `GITHUB_REPO` are missing.
- **Save fails with a GitHub error** → the token lacks *Contents: Read and write*,
  has expired, or `GITHUB_REPO` / `GITHUB_BRANCH` is wrong.
- **Edit saved but the site looks unchanged** → the rebuild hasn't finished yet
  (check Netlify deploys), or you're viewing a cached page — hard-refresh.

## Scope / future

v1 edits the 17 detail-page JSON files in `src/content/`. Other content
(`content.ts` — site config, section copy, menus, testimonials) is not yet
editable here; it can be added as a follow-up using the same pattern.
