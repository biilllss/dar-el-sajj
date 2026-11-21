# Dar el Sajj · دار الصاج

One-page site for **Dar el Sajj**, a *fictional* casual Lebanese shawarma and sajj spot with two branches (Hamra and Jounieh). Visitors build an order and send it to the branch on WhatsApp.

> Concept project by **Mawqe3 Studio**. The restaurant, phone number and social links are placeholders. Photos from [Unsplash](https://unsplash.com).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui components (Button, Sheet, Tabs) on Radix
- `next/font`: Bricolage Grotesque (headings), Manrope (body), Cairo (Arabic)
- `next/image` with a custom loader that lets Unsplash's CDN do the resizing

## Features

- English / Arabic toggle with a fully mirrored RTL layout (logical CSS properties only)
- Live "Open now / Closed" per branch, computed in Beirut time
- Menu tabs, quantity steppers, cart drawer with pickup/delivery, branch, name, address and notes
- Order message built in the current language and sent through a `wa.me` link
- Fade-up on scroll and a cart bounce, both off with `prefers-reduced-motion`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Make it real

Everything a client would change is in one place:

| File | What |
| --- | --- |
| `lib/config.ts` | `WHATSAPP_NUMBER`, `SITE_URL`, `DELIVERY_FEE`, `BRANCHES` (hours) |
| `lib/translations.ts` | Every visible string, EN + AR, including menu names and descriptions |
| `lib/menu.ts` | Prices, categories, best-seller flags |
| `lib/images.ts` | Unsplash photo IDs |

## Structure

```
app/            layout (fonts, metadata), page, global CSS, icon, robots, sitemap
components/     one file per section, plus ui/ (shadcn primitives)
lib/            config, menu, translations, cart state, i18n, WhatsApp message, hours
```

## Deploy

Push to GitHub and import the repo in Vercel. No environment variables are needed. Set `SITE_URL` in `lib/config.ts` to the final domain so Open Graph tags and the sitemap are correct.

## Security notes

- Static front end, no backend, no API keys. `.env*` is git-ignored.
- No `dangerouslySetInnerHTML`. The order message (including name, address and notes) is passed through `encodeURIComponent` before it goes into the WhatsApp link.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are set in `next.config.ts`.
- `/public` is intentionally absent: no stray files are served.
