# Pavotu portfolio – local copy

Static local copy of [pavotu.com](https://www.pavotu.com), scraped and rebuilt so it works offline with no external dependencies except where noted.

## What’s included

- **Pages:** `index.html`, `work.html` (full Selected Work, one page with all 10 projects), `lord-abbett.html`, `ibm.html`, `pearson.html`, `resume.html`
- **Assets:** `assets/css/style.css`, `assets/images/` (favicon, logo, and all work-page images from the original site: CFO_AI.jpg, LA_fundfinder.jpeg, ibm1.jpeg, pearson1.jpeg, copd1.jpeg, intel1.jpeg, td-audit.jpeg, glg-service.jpeg, brand-asset-management1.jpeg, signup-pixacore.jpg), `assets/pdf/` (all PDFs from Lord Abbett + selected work)
- **Content:** Home hero, skills, portfolio grid, experience timeline, contact; full Selected Work page matching [pavotu.com/work](https://www.pavotu.com/work) with all project copy and original images; Lord Abbett, IBM, Pearson subpages with local links

## How to view

Open `index.html` in a browser, or run a local server, e.g.:

```bash
cd pavotu-local
python3 -m http.server 8000
# then open http://localhost:8000
```

## What’s not included (Wix-only)

- Exact Wix layout/animations.
- Resume PDF (hosted on Wix; resume page links to pavotu.com).
- INTEL, TD Ameritrade, Gerson Lehrman project subpages (sections exist on **work.html**; “see work samples” links to pavotu.com where no local PDF).
- Contact form submission (form is present but does not submit anywhere).

## PDFs stored locally

- Lord Abbett: IA sample, data sample, component library sample, mobile sample.
- Work: Fiserv, COPD, Corporate Voice, The Children’s Place.

All paths in the HTML are relative; no CDN or frameworks required.
