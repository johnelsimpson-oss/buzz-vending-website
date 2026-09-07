# Buzz Vending — public website

A self-contained static website. No build step, no framework, no WordPress,
no monthly platform cost. Every page is plain HTML sharing one stylesheet and
one small JavaScript file.

Positioned as a **London & Kent** operator, focused on **snack and drink
vending**. There is deliberately no coffee-machine content.

---

## Before you publish — checklist

**Full step-by-step version (domain, hosting, DNS, post-launch) is in `PUBLISH_CHECKLIST.md` in this folder — start there.** The table below covers just the content items.

These are the only things that genuinely need your input.

| # | What | Where |
|---|---|---|
| 1 | **Decide the free-machine threshold.** Currently "around 15+ people on site", taken from the "avoid businesses with fewer than 15 employees" rule in `config/location_categories.json`. Raise it if you want to filter harder. | `index.html`, `free-vending-machines.html` (search for `15`) |
| 2 | **Add a phone number**, if you want one. The site currently drives everything to `hello@buzzvending.co.uk`. A phone number typically lifts enquiries from facilities managers. | header, `contact.html`, footer |
| 3 | **Complete the privacy notice** — company name, number, registered address, review date, and confirm your ICO registration position. | `privacy.html` (marked `[add ... before publishing]`) |
| 4 | **Point the form at a real endpoint** (see below), or leave it on mailto. | `contact.html` |
| 5 | **Confirm the claims are true of you** before going live — registered food business, insured, date rotation. | `about.html` |
| 6 | **Buy the domain** `buzzvending.co.uk` if you haven't. Every canonical URL, the sitemap and robots.txt assume it. | see "Changing the domain" |

Nothing on the site invents customer numbers, testimonials, years in business
or review scores. That is intentional — those are the claims that get a new
operator caught out.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — offer, services, site types, how it works, FAQs |
| `free-vending-machines.html` | The core offer: what's free, who qualifies, who provides what |
| `snack-drink-vending.html` | Product range, machine types, restocking approach |
| `contactless-payments.html` | Cashless payments and what it means for the host site |
| `vending-machines-london.html` | London landing page (boroughs, site types, local FAQs) |
| `vending-machines-kent.html` | Kent landing page (towns, site types, local FAQs) |
| `about.html` | Who you are, how you work, the compliance basics |
| `contact.html` | Enquiry form and direct contact details |
| `thank-you.html` | Post-submission page (`noindex`) |
| `privacy.html` | UK GDPR privacy notice — **needs completing** |
| `404.html` | Not-found page |
| `robots.txt`, `sitemap.xml` | Search engine basics |

`assets/css/style.css` — all styling.
`assets/js/main.js` — nav, scroll reveals, sticky mobile CTA, form handling.
`assets/img/` — logo, favicon and social share card, generated from `../logos/`.

---

## Running it locally

```bash
python3 -m http.server 4321 --directory website
```

Then open <http://localhost:4321>. Or just double-click `index.html` — it works
straight from the filesystem too.

---

## Publishing it

Any static host works. The two easiest, both free at this scale:

**Cloudflare Pages** — create a project, drag the `website` folder in, point
your domain at it. Free SSL, fast in the UK.

**Netlify** — same idea, drag-and-drop at <https://app.netlify.com/drop>.

Traditional cPanel hosting works too: upload the contents of `website/` into
`public_html`.

---

## The enquiry form

Out of the box the form builds a pre-filled email and opens the visitor's mail
app addressed to `hello@buzzvending.co.uk`. That works everywhere with zero
setup, but you lose anyone who doesn't have a mail client configured.

To get enquiries delivered straight to your inbox instead:

1. Sign up free at <https://formspree.io> and create a form that forwards to
   `hello@buzzvending.co.uk`.
2. In `contact.html`, change the form's `action` to your endpoint:
   ```html
   <form data-enquiry action="https://formspree.io/f/YOUR_ID" method="post">
   ```
3. That's it. `main.js` detects the non-mailto action and lets the form post
   normally; the hidden `_next` field returns visitors to `thank-you.html`.

On Netlify, add `netlify` and `name="contact"` to the `<form>` tag instead and
Netlify Forms will capture submissions with no third party.

A hidden honeypot field (`_gotcha`) already silently drops obvious bots.

---

## Changing the domain

The domain appears in canonical tags, Open Graph tags, JSON-LD, `sitemap.xml`
and `robots.txt`. To change it in one pass:

```bash
cd website && grep -rl "www.buzzvending.co.uk" . | xargs sed -i '' 's|www\.buzzvending\.co\.uk|your-new-domain.co.uk|g'
```

---

## Editing content

Everything is plain HTML — open a file, find the words, change them.

A few conventions worth knowing:

- `<span class="hl">word</span>` draws the yellow marker highlight.
- `class="reveal"` fades an element in on scroll; `data-delay="120"` staggers it.
- `class="eyebrow"` is the small hex-bulleted label above a heading.
- `<ul class="ticks">` is the checkmark list; `<ul class="pills">` the rounded tags.
- `data-n="1"` on a `.step` sets the number in the hexagon.

The header and footer are repeated in each file rather than shared. If you
change a nav link, change it in every page — or run a `sed` across `*.html`.

---

## SEO notes

Each page has a unique title, meta description and canonical URL. The homepage
carries `LocalBusiness` structured data, the area pages carry `Service` data,
and `free-vending-machines.html` carries `FAQPage` data.

Once live, the highest-value next steps are:

1. **Google Business Profile** — for local search this outweighs the website.
2. **Submit the sitemap** in Google Search Console.
3. **Add more area pages** as the route grows. Copy an area page, swap the town
   names and local detail, and add it to `sitemap.xml` and the footer. Genuinely
   different local content ranks; near-duplicate pages don't.

---

## Accessibility & performance

Skip link, keyboard-navigable menu, visible focus rings, semantic headings,
alt text on images, `prefers-reduced-motion` honoured throughout, and AA
contrast on body text. No tracking scripts, no cookie banner needed.

The only external request is the Google Fonts stylesheet. To make the site
fully self-contained, download Figtree, drop the woff2 files in
`assets/fonts/`, replace the `<link>` with an `@font-face` block, and remove
the Google Fonts paragraph from `privacy.html`.
