# Site Maintenance Guide

How to modify and update your academic website at kmhuynh.github.io.

## File Structure

```
index.html              ← Homepage (edit this for most content changes)
publications.html       ← Auto-generated — DO NOT edit directly
tools.html              ← Tools & Resources page
css/style.css           ← All styling and colors
js/main.js              ← Theme toggle, filters, back-to-top (rarely need to touch)
img/headshot.jpg        ← Profile photo
img/favicon.png         ← Browser tab icon
static/resume.pdf       ← Downloadable CV
data/publications.bib   ← Publication data (edit this, then run build.py)
build.py                ← Generates publications.html from the .bib file
templates/publications.tmpl.html ← HTML template for publications page
```

## Preview Locally

```bash
cd /path/to/hugoblox-academic-cv
python3 -m http.server 8000
# Open http://localhost:8000 in browser
# Use Cmd+Shift+R to hard refresh after making changes
```

---

## Editing the Homepage (index.html)

### Change Your Bio

Edit the text inside `<p class="bio">` tags (around line 44-55):

```html
<p class="bio">
  Your updated bio text here.
</p>
```

### Change Your Title/Subtitle

Edit line 43:

```html
<p class="subtitle">Your New Title · Your Institution</p>
```

### Update Profile Photo

Replace `img/headshot.jpg` with your new photo. Keep the filename the same, or update the `src` in `index.html` line 41.

### Update CV PDF

Replace `static/resume.pdf` with your new CV file.

---

## Adding a News Item

Find the `<ul class="news-list">` section (around line 75). Add a new `<li>` at the TOP of the list (newest first):

```html
<li data-tag="accepted"><span class="news-date">Jun 2026</span><span><span class="news-tag tag-accepted">Accepted</span> Your paper title accepted at Journal Name</span></li>
```

**Available tags** (change both `data-tag` and the `tag-*` class):
- `accepted` → `tag-accepted` (gold badge)
- `award` → `tag-award` (green badge)
- `talk` → `tag-talk` (dark badge)

**To add a new tag category**, you'd need to:
1. Add a filter button in the `news-filters` div
2. Add CSS for the new tag color in `css/style.css`
3. Add the `data-tag` value to your news items

---

## Adding a Featured Publication (Research Highlights)

Find the `<!-- Research Highlights -->` section (around line 87). Add a new `pub-card` div:

```html
<div class="pub-card">
  <h3>Your Paper Title</h3>
  <p class="authors">K. Huynh, Co-Author 1, Co-Author 2</p>
  <p class="venue">Journal Name, 2026</p>
  <a href="https://link-to-paper" class="pub-link">Paper</a>
  <a href="https://link-to-pdf" class="pub-link">PDF</a>
  <a href="https://link-to-code" class="pub-link">Code</a>
</div>
```

Only include link buttons that apply (Paper, PDF, Code, Data).

---

## Adding a Presentation/Talk

Find the `<!-- Presentations & Talks -->` section (around line 104). Add a new `pres-card` div:

### Oral presentation (with PDF link):

```html
<div class="pres-card" data-tags="oral">
  <div class="pres-info">
    <div class="pres-title">Your Talk Title <span class="pres-links"><a href="https://link-to-pdf">PDF</a></span></div>
    <div class="pres-authors"><strong>K. Huynh</strong>, Co-Author 1, Co-Author 2</div>
    <div class="pres-venues">
      <div class="pres-venue-row"><span class="pres-type type-oral">Oral</span> Conference Name · City, Country · Month Year</div>
    </div>
  </div>
</div>
```

### Poster (no PDF yet):

```html
<div class="pres-card" data-tags="poster">
  <div class="pres-info">
    <div class="pres-title">Your Poster Title <span class="pres-links"><a href="#" class="disabled">PDF</a></span></div>
    <div class="pres-authors"><strong>K. Huynh</strong>, Co-Author 1</div>
    <div class="pres-venues">
      <div class="pres-venue-row"><span class="pres-type type-poster">Poster</span> Conference Name · City, Country · Month Year</div>
    </div>
  </div>
</div>
```

### Same talk at multiple venues:

```html
<div class="pres-card" data-tags="oral poster">
  <div class="pres-info">
    <div class="pres-title">Your Talk Title <span class="pres-links"><a href="https://link">PDF</a></span></div>
    <div class="pres-authors"><strong>K. Huynh</strong>, Co-Authors</div>
    <div class="pres-venues">
      <div class="pres-venue-row"><span class="pres-type type-oral">Oral</span> Symposium · City · Month Year</div>
      <div class="pres-venue-row"><span class="pres-type type-poster">Poster</span> Conference · City · Month Year</div>
    </div>
  </div>
</div>
```

**Type badges:** `type-oral` (gold), `type-poster` (dark), `type-invited` (green)

**Note:** When `data-tags` has multiple values (e.g., `"oral poster"`), the card shows up when filtering by either type.

---

## Adding an Award

Find the Awards section (around line 163). Add a new `award-item`:

```html
<div class="award-item"><span class="award-year">2026</span><div class="award-detail"><strong>Award Name</strong> — Organization or Details</div></div>
```

Keep awards in reverse chronological order (newest at top).

---

## Adding an Education Entry

```html
<div class="edu-item"><span class="edu-year">2026</span><div class="edu-detail"><strong>Degree Name</strong> — Institution</div></div>
```

---

## Adding a Hobby Card (Beyond the Lab)

Find the `life-grid` div (around line 181). Add a new card:

```html
<div class="life-card">
  <div class="emoji">🎸</div>
  <h3>Guitar</h3>
  <p>Short description</p>
</div>
```

---

## Updating Publications (Full List)

The publications page (`publications.html`) is AUTO-GENERATED. Do not edit it directly.

### To add a new publication:

1. Open `data/publications.bib`
2. Add a new BibTeX entry at the top:

```bibtex
@article{huynh2026newpaper,
  author = {Khoi Minh Huynh and Co-Author One and Co-Author Two},
  title = {Your New Paper Title},
  journal = {Journal Name},
  year = {2026},
  url = {https://link-to-paper},
  pdf = {https://link-to-pdf},
  code = {https://github.com/your-repo},
  doi = {10.1234/example},
  keywords = {journal}
}
```

**Entry types:** `@article` for journals, `@inproceedings` for conferences

**Keywords** (determines filter category): `journal`, `conference`, `workshop`, `abstract`

**Optional fields:** `url`, `pdf`, `code`, `dataset`, `doi` — only include what you have

3. Rebuild the publications page:

```bash
pip install pybtex  # only needed once
python3 build.py
```

This regenerates `publications.html` with the new entry.

---

## Editing the Tools Page (tools.html)

Open `tools.html` and edit the tool cards directly. Template for a new tool:

```html
<div class="tool-card">
  <span class="status status-active">Active</span>
  <h3>Tool Name</h3>
  <p>Description of what the tool does.</p>
  <p><strong>Language:</strong> Python</p>
  <a href="https://github.com/..." class="pub-link">GitHub</a>
  <a href="https://paper-link" class="pub-link">Paper</a>
</div>
```

**Status badges:** `status-active` (green), `status-coming` (gold), `status-dev` (dark)

---

## Changing Colors

Open `css/style.css` and edit the CSS variables at the top (lines 4-23 for light mode, 25-44 for dark mode):

```css
:root {
  --color-nav: #1D2E28;        /* Navigation bar background */
  --color-body-bg: #CBD5C0;    /* Page background */
  --color-accent: #C8A84E;     /* Gold accent (borders, hover) */
  --color-text: #1D2E28;       /* Main text color */
  --color-card-bg: #E8EDDF;    /* Card backgrounds */
  --color-muted: #5a6e62;      /* Secondary/muted text */
  --color-white: #E8EDDF;      /* Hobby card backgrounds */
}
```

Dark mode overrides are in the `[data-theme="dark"]` block.

---

## Changing Navigation Links

The navigation appears in 3 files. If you add/remove a nav link, update ALL of them:

1. `index.html` (line 27-33)
2. `tools.html` (line 21-27)
3. `templates/publications.tmpl.html` (line 21-27)

Then rebuild publications: `python3 build.py`

---

## Deploying Changes

After making edits:

```bash
# 1. Preview locally first
python3 -m http.server 8000
# Check http://localhost:8000

# 2. If you edited publications.bib, rebuild first
python3 build.py

# 3. Copy to deployment repo
SRC=~/repos/hugoblox-academic-cv
DST=~/repos/kmhuynh.github.io

# Copy all site files
cp $SRC/index.html $SRC/publications.html $SRC/tools.html $SRC/build.py $DST/
cp -r $SRC/css $SRC/js $SRC/img $SRC/static $SRC/data $SRC/templates $DST/
cp -r $SRC/.github $DST/

# 4. Commit and push
cd $DST
git add -A
git commit -m "update site content"
git push origin master

# Site updates at https://kmhuynh.github.io within 1-2 minutes
```

---

## Quick Reference

| Task | File to edit | Rebuild needed? |
|------|-------------|----------------|
| Change bio/title | `index.html` | No |
| Add news item | `index.html` | No |
| Add featured paper | `index.html` | No |
| Add talk/presentation | `index.html` | No |
| Add award | `index.html` | No |
| Add hobby card | `index.html` | No |
| Add publication to full list | `data/publications.bib` | Yes (`python3 build.py`) |
| Edit tools page | `tools.html` | No |
| Change colors | `css/style.css` | No |
| Update profile photo | Replace `img/headshot.jpg` | No |
| Update CV PDF | Replace `static/resume.pdf` | No |
| Change nav links | All 3 HTML files + rebuild | Yes |
