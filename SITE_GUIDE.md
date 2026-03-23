# Site Maintenance Guide

How to maintain and update `kmhuynh.github.io`.

## Overview

This site is built from structured data plus Jinja templates.

Most content changes should be made in `data/*.yaml` or `data/publications.bib`, then regenerated with:

```bash
python3 build.py
```

The generated files are:

```text
index.html
tools.html
publications.html
```

Do not treat those generated HTML files as the main source of truth. Re-running `build.py` will overwrite manual edits there.

## Source Of Truth

```text
data/hero.yaml                 Hero section, page title, meta description, profile links
data/nav.yaml                  Navigation shared across pages
data/news.yaml                 News list and tags
data/research.yaml             Featured research highlight cards
data/presentations.yaml        Talks and poster entries
data/education.yaml            Education timeline
data/awards.yaml               Awards list
data/hobbies.yaml              Beyond-the-lab cards
data/tools.yaml                Tools page, datasets, citation text
data/publications.bib          Full publication list

templates/index.tmpl.html      Homepage layout
templates/tools.tmpl.html      Tools page layout
templates/publications.tmpl.html Publications page layout

css/style.css                  All styling, colors, layout, responsive behavior
js/main.js                     Theme toggle, mobile nav, filters, back-to-top
build.py                       Renders templates into final HTML files

img/headshot.jpg               Profile photo
img/favicon.png                Browser tab icon
static/resume.pdf              CV linked by the site
```

Notes:

- `static/uploads/resume.pdf` also exists, but the current pages link to `static/resume.pdf`.
- Text rendered through the custom `md` filter supports simple `**bold**` and `[link](url)` formatting, not full Markdown.

## First-Time Setup

Install the Python dependencies once:

```bash
python3 -m pip install jinja2 pyyaml pybtex
```

## Typical Workflow

For most content edits:

```bash
# 1. Edit the relevant data file or template

# 2. Regenerate the site
python3 build.py

# 3. Preview locally
python3 -m http.server 8000

# 4. Open http://localhost:8000
# Use Cmd+Shift+R for a hard refresh if needed
```

When a rebuild is needed:

- `data/*`
- `templates/*`
- `build.py`

When a rebuild is not needed:

- `css/style.css`
- `js/main.js`
- `img/*`
- `static/*`

## Common Updates

### Bio, Title, Meta Description, Hero Links

Edit `data/hero.yaml`.

Example:

```yaml
name: Khoi Huynh
meta_title: Postdoctoral Researcher
meta_description: "Short description for search engines and social sharing."
title: Postdoctoral Researcher in Radiology · UNC Chapel Hill
photo: img/headshot.jpg
bio:
  - >
    First paragraph with **bold text** and a [link](https://example.com).
  - >
    Second paragraph.
links:
  - text: Google Scholar
    url: https://scholar.google.com/...
    class: primary
  - text: CV (PDF)
    url: static/resume.pdf
```

Tips:

- `bio` is a list of paragraphs.
- `links` become the buttons in the hero section.
- `photo` controls the hero headshot path.

### Navigation

Edit `data/nav.yaml`, then rebuild.

Example:

```yaml
- text: About
  hash: "#about"
- text: Papers
  url: publications.html
- text: Tools
  url: tools.html
```

Use `hash` for homepage sections and `url` for full pages or files.

### News

Edit `data/news.yaml`, then rebuild.

Newest items should stay at the top.

Example:

```yaml
- date: Jun 2026
  tag: accepted
  text: New paper accepted at Journal Name
  url: https://link-to-paper
```

Current tags used by the site:

- `accepted`
- `award`
- `talk`
- `newrole`

If you add a new tag category, update all three places:

1. `templates/index.tmpl.html` filter buttons
2. `css/style.css` tag colors for `.tag-<name>`
3. `data/news.yaml` entries using that tag

### Research Highlights

Edit `data/research.yaml`, then rebuild.

Example:

```yaml
- title: Your Paper Title
  image: img/research/your-paper-thumb.jpg
  image_alt: Short accessible description of the thumbnail
  authors: "**K. Huynh**, Co-Author 1, Co-Author 2"
  venue: Journal Name, 2026
  links:
    - text: PDF
      url: https://link-to-pdf
    - text: Code
      url: https://github.com/example/repo
```

Thumbnail fields are optional. If `image` is omitted, the card renders as text-only.

If a card has both `image` and a `PDF` link in `links`, clicking the image opens that PDF.

Recommended image workflow:

1. Put the image file in `img/research/`
2. Set `image` to that relative path in `data/research.yaml`
3. Set `image_alt` to a short, meaningful description
4. Run `python3 build.py`

Attribution note: the right-side thumbnail card idea for highlights/presentations was adapted from [trucnnth.github.io](https://github.com/trucnnth/trucnnth.github.io).

### Presentations And Talks

Edit `data/presentations.yaml`, then rebuild.

Example:

```yaml
- title: Precision Cortex Tractography for the Developing Brain
  authors: "**K. Huynh**, S. Ahmad, G. Lin, P.-T. Yap"
  tags: [oral]
  links:
    - text: PDF
      url: https://link-to-pdf
  venues:
    - type: oral
      text: "ISMRM 2025 Annual Meeting · Hawaii, USA · May 2025"
```

Supported patterns:

- `tags` drives filtering and can contain multiple values, such as `[oral, poster]`
- `links` can include `disabled: true` for placeholder buttons
- `venues[].type` is styled by CSS and currently supports `oral`, `poster`, and `invited`

### Education

Edit `data/education.yaml`, then rebuild.

Example:

```yaml
- year: 2026
  degree: PhD Biomedical Engineering
  school: UNC Chapel Hill
```

### Awards

Edit `data/awards.yaml`, then rebuild.

Keep items in reverse chronological order.

Example:

```yaml
- year: 2026
  title: Award Name
  org: Organization or details
```

### Hobbies / Beyond The Lab

Edit `data/hobbies.yaml`, then rebuild.

Example:

```yaml
- emoji: "🎸"
  name: Guitar
  description: Casual fingerstyle practice
```

Optional linked card:

```yaml
- emoji: "🏔"
  name: National Parks
  description: "9 / 63 with Truc Nguyen ->"
  link: https://example.com
```

### Tools And Datasets

Edit `data/tools.yaml`, then rebuild.

Structure:

```yaml
intro: "Open-source contributions to advance neuroimaging research."
contact_email: kmhuynh@med.unc.edu

tools:
  - name: Tool Name
    status: active
    description: >
      Description of the tool.
    language: Python
    links:
      - text: GitHub
        url: https://github.com/example/repo

datasets:
  - name: Dataset Name
    description: >
      Description of the dataset.
    links:
      - text: OSF
        url: https://osf.io/example

citation: >
  Citation text shown at the bottom of the page.
```

Current tool status values:

- `active`
- `coming`
- `dev`

## Publications

The publications page is generated from `data/publications.bib`.

To add or edit a publication:

1. Update `data/publications.bib`
2. Run `python3 build.py`

Example entry:

```bibtex
@article{huynh2026newpaper,
  author = {Khoi Minh Huynh and Co-Author One and Co-Author Two},
  title = {Your New Paper Title},
  journal = {Journal Name},
  year = {2026},
  url = {https://link-to-paper},
  pdf = {https://link-to-pdf},
  code = {https://github.com/your-repo},
  dataset = {https://osf.io/example},
  doi = {10.1234/example},
  keywords = {journal}
}
```

Recognized publication categories:

- `journal`
- `conference`
- `workshop`
- `abstract`

How category is chosen:

- `keywords` is checked first
- if no recognized keyword is present, `build.py` falls back to BibTeX type
- unrecognized entries become `other` and appear under `All` only

Useful optional fields:

- `url`
- `pdf`
- `code`
- `dataset`
- `doi`

## Styling And Behavior

### Colors, spacing, typography, layout

Edit `css/style.css`.

The main theme variables are at the top of the file in `:root` and `[data-theme="dark"]`.

### Interactive behavior

Edit `js/main.js`.

Current behaviors include:

- dark/light theme toggle
- mobile navigation
- news filtering and "show all"
- publication and talk filtering
- back-to-top button

### Layout changes

If you want to change page structure, edit the relevant template:

- `templates/index.tmpl.html`
- `templates/tools.tmpl.html`
- `templates/publications.tmpl.html`

Then rebuild with `python3 build.py`.

## Images And Downloadable Files

### Update profile photo

Replace `img/headshot.jpg`, or change the `photo` field in `data/hero.yaml`.

### Update favicon

Replace `img/favicon.png`.

### Update CV

Replace `static/resume.pdf`.

If you want the duplicate copy to stay in sync as well, also replace:

```text
static/uploads/resume.pdf
```

## Deployment

This repository is already the deployment repository for `kmhuynh.github.io`.

Normal workflow:

```bash
git add -A
git commit -m "update site content"
git push origin master
```

GitHub Actions behavior:

- `.github/workflows/build.yml` runs on pushes to `main` or `master`
- it triggers when `data/**`, `templates/**`, or `build.py` change
- it installs dependencies, runs `python build.py`, and commits regenerated HTML if needed

That means:

- for data/template changes, you can rebuild locally before pushing, and GitHub Actions will also keep generated files in sync
- for CSS, JS, image, or PDF updates, no build step is required
- there is no longer any need to copy files from another local repository

## Quick Reference

| Task | File to edit | Rebuild needed? |
|------|--------------|-----------------|
| Change bio, title, hero buttons, SEO text | `data/hero.yaml` | Yes |
| Change navigation | `data/nav.yaml` | Yes |
| Add news item | `data/news.yaml` | Yes |
| Add featured paper | `data/research.yaml` | Yes |
| Add talk or poster | `data/presentations.yaml` | Yes |
| Add education entry | `data/education.yaml` | Yes |
| Add award | `data/awards.yaml` | Yes |
| Add hobby card | `data/hobbies.yaml` | Yes |
| Edit tools or datasets page | `data/tools.yaml` | Yes |
| Add publication to full list | `data/publications.bib` | Yes |
| Change layout or markup | `templates/*.tmpl.html` | Yes |
| Change colors or styling | `css/style.css` | No |
| Change interactive behavior | `js/main.js` | No |
| Update profile photo | `img/headshot.jpg` or `data/hero.yaml` | No |
| Update CV PDF | `static/resume.pdf` | No |
| Inspect generated output | `index.html`, `tools.html`, `publications.html` | Generated by build |
