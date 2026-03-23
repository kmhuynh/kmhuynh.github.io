#!/usr/bin/env python3
"""Build script: parses publications.bib and generates publications.html."""
import html
from pathlib import Path

try:
    from pybtex.database import parse_file
except ImportError:
    print("ERROR: pybtex not installed. Run: pip install pybtex")
    raise SystemExit(1)

BIB_PATH = Path("data/publications.bib")
TEMPLATE_PATH = Path("templates/publications.tmpl.html")
OUTPUT_PATH = Path("publications.html")


def get_field(entry, name, default=""):
    if name in entry.fields:
        return str(entry.fields[name])
    return default


def format_authors(persons):
    authors = persons.get("author", [])
    parts = []
    for person in authors:
        first = " ".join(person.first_names)
        last = " ".join(person.last_names)
        parts.append(f"{first} {last}".strip())
    return ", ".join(parts)


def get_pub_type(entry):
    kw = get_field(entry, "keywords", "").lower()
    if "journal" in kw:
        return "journal"
    if "conference" in kw:
        return "conference"
    if "workshop" in kw:
        return "workshop"
    if "abstract" in kw:
        return "abstract"
    if entry.type == "article":
        return "journal"
    if entry.type == "inproceedings":
        return "conference"
    return "other"


def get_venue(entry):
    for field in ("journal", "booktitle", "school", "note"):
        val = get_field(entry, field)
        if val:
            return val
    return ""


def build_entry_html(key, entry):
    title = html.escape(get_field(entry, "title"))
    authors = html.escape(format_authors(entry.persons))
    venue = html.escape(get_venue(entry))
    year = html.escape(get_field(entry, "year"))
    pub_type = get_pub_type(entry)

    links_html = ""
    url = get_field(entry, "url")
    pdf = get_field(entry, "pdf")
    code = get_field(entry, "code")
    dataset = get_field(entry, "dataset")
    doi = get_field(entry, "doi")

    if url:
        links_html += f'<a href="{html.escape(url)}" class="pub-link">Paper</a>'
    if pdf:
        links_html += f'<a href="{html.escape(pdf)}" class="pub-link">PDF</a>'
    if code:
        links_html += f'<a href="{html.escape(code)}" class="pub-link">Code</a>'
    if dataset:
        links_html += f'<a href="{html.escape(dataset)}" class="pub-link">Data</a>'
    if doi:
        links_html += f'<a href="https://doi.org/{html.escape(doi)}" class="pub-link">DOI</a>'

    return f"""    <div class="pub-item" data-tags="{pub_type}">
      <div class="title">{title}</div>
      <div class="authors">{authors}</div>
      <div class="venue">{venue}, {year}</div>
      {links_html}
    </div>"""


def main():
    if not BIB_PATH.exists():
        print(f"ERROR: {BIB_PATH} not found")
        raise SystemExit(1)

    bib = parse_file(str(BIB_PATH))

    entries = sorted(
        bib.entries.items(),
        key=lambda x: get_field(x[1], "year", "0000"),
        reverse=True,
    )

    counts = {"journal": 0, "conference": 0, "workshop": 0, "abstract": 0, "other": 0}
    html_parts = []
    for key, entry in entries:
        pub_type = get_pub_type(entry)
        counts[pub_type] = counts.get(pub_type, 0) + 1
        html_parts.append(build_entry_html(key, entry))

    total = sum(counts.values())
    publications_html = "\n".join(html_parts)

    filter_parts = [f'<button class="filter-btn active" data-filter="all">All ({total})</button>']
    for label, key in [("Journals", "journal"), ("Conferences", "conference"),
                       ("Workshops", "workshop"), ("Abstracts", "abstract")]:
        if counts.get(key, 0) > 0:
            filter_parts.append(
                f'<button class="filter-btn" data-filter="{key}">{label} ({counts[key]})</button>'
            )
    filter_html = "\n      ".join(filter_parts)

    template = TEMPLATE_PATH.read_text()
    output = template.replace("{{PUBLICATIONS}}", publications_html)
    output = output.replace("{{FILTER_COUNTS}}", filter_html)

    OUTPUT_PATH.write_text(output)
    print(f"Generated {OUTPUT_PATH} with {total} publications")
    for k, v in counts.items():
        if v > 0:
            print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
