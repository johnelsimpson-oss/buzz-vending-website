# Publish Checklist — getting this site live at buzzvending.co.uk

Work through this in order. Items marked **(you)** need a real-world decision or
account that only you can make — I can't complete those for you.

## 1. Domain

- [ ] **(you)** Confirm `buzzvending.co.uk` is still free and buy it at a registrar
      (Cloudflare Registrar, 123-reg, Namecheap, GoDaddy — a few pounds a year).
      A DNS check on 3 Aug 2026 found no records for it, which is a good sign,
      but that's not proof — check at the registrar before relying on it.
- [ ] If you end up on a *different* domain instead, run this from inside
      `website/` to swap it everywhere in one pass (canonical tags, sitemap,
      robots.txt, Open Graph, JSON-LD):
      ```bash
      grep -rl "www.buzzvending.co.uk" . | xargs sed -i '' 's|www\.buzzvending\.co\.uk|your-new-domain.co.uk|g'
      ```

## 2. Fill in what the site is honestly still missing

- [ ] **(you)** `privacy.html` line 87 — replace *"[Add registered company name,
      company number and registered address before publishing.]"* with the real
      details.
- [ ] **(you)** `privacy.html` line 82 — replace *"[add date before publishing]"*
      with today's date.
- [ ] **(you)** `privacy.html` — confirm your ICO registration position (see the
      comment above the "Last reviewed" line) and that the page reflects it —
      most businesses processing personal data electronically need to register:
      https://ico.org.uk/for-organisations/data-protection-fee/
- [ ] **(you)** `about.html` — re-read it and confirm every claim is true by the
      time this goes live: registered food business, insured, stock-rotation
      practice. Nothing on the site invents numbers or testimonials — keep it
      that way.
- [ ] **(you)** Decide if the "15+ people on site" free-machine threshold is
      still right (it's consistent across `index.html` and
      `free-vending-machines.html`, sourced from
      `automation/config/location_categories.json`). Change it in both files if not.
- [ ] **(you)** Decide whether to show a business phone number. Currently the
      site only shows `hello@buzzvending.co.uk` (header, `contact.html`, footer).
      A phone number tends to lift enquiries from facilities managers — add it
      in all three places if you want one.

## 3. Wire up the enquiry form

Right now `contact.html` opens the visitor's email app (`action="mailto:hello@buzzvending.co.uk"`,
line 102) — works everywhere, zero setup, but loses anyone without a configured
mail client.

- [ ] **(you)** Sign up free at https://formspree.io, create a form pointed at
      `hello@buzzvending.co.uk`, and get your endpoint ID.
- [ ] Replace the `action` on line 102 of `contact.html`:
      ```html
      action="https://formspree.io/f/YOUR_REAL_ID"
      ```
      (Full instructions are already in the HTML comment directly above that
      form, lines 85–100.)
- [ ] Or, if hosting on Netlify instead: add `netlify` and `name="contact"` to
      the `<form>` tag and skip Formspree entirely — Netlify Forms captures
      submissions with no third party.

## 4. Choose a host and deploy

- [ ] **(you)** Pick a host — **Cloudflare Pages** is the natural fit since the
      dashboard already runs on Cloudflare (one account, free SSL, fast in the
      UK), or **Netlify** (drag-and-drop at https://app.netlify.com/drop) as
      the other easy option.
- [ ] Create the project and upload/connect the `apps/website` folder (no
      build step needed — it's plain HTML).
- [ ] **(you)** In the host's dashboard, add your domain and follow their DNS
      instructions (usually changing nameservers, or adding a couple of DNS
      records at your registrar). SSL provisions automatically once DNS
      propagates.

## 5. After it's live

- [ ] **(you)** Set up a Google Business Profile — for local search this
      matters more than the website itself.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] As the route grows, add more area pages (copy an existing area page,
      swap town names and local detail, add it to `sitemap.xml` and the
      footer nav on every page).

---

*Generated 2026-08-04 from a check of the actual file contents — line numbers
above were correct as of that check but will drift if you edit the files.
See `README.md` in this folder for the fuller reference on structure, editing
conventions, and SEO notes.*
