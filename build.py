#!/usr/bin/env python3
"""Build script: generates index.html, tools.html, and publications.html
from YAML data files, BibTeX, and Jinja2 templates."""
import re
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup


def md_filter(text):
    """Convert **bold** and [link](url) to HTML."""
    result = str(text)
    result = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', result)
    # Handle URLs with balanced parentheses (e.g. S2666-3899(24)00053-9)
    result = re.sub(r'\[(.+?)\]\(((?:[^()]*|\([^()]*\))*)\)', r'<a href="\2">\1</a>', result)
    return Markup(result)

try:
    from pybtex.database import parse_file
except ImportError:
    print("ERROR: pybtex not installed. Run: pip install pybtex")
    raise SystemExit(1)

DATA_DIR = Path("data")
TEMPLATE_DIR = Path("templates")
BIB_PATH = DATA_DIR / "publications.bib"


def load_yaml(name):
    path = DATA_DIR / f"{name}.yaml"
    with open(path) as f:
        return yaml.safe_load(f)


# --- BibTeX helpers (kept from original) ---

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


def parse_publications():
    if not BIB_PATH.exists():
        print(f"WARNING: {BIB_PATH} not found, skipping publications")
        return []

    bib = parse_file(str(BIB_PATH))
    entries = sorted(
        bib.entries.items(),
        key=lambda x: get_field(x[1], "year", "0000"),
        reverse=True,
    )

    pubs = []
    for key, entry in entries:
        pubs.append({
            "title": get_field(entry, "title"),
            "authors": format_authors(entry.persons),
            "venue": get_venue(entry),
            "year": get_field(entry, "year"),
            "pub_type": get_pub_type(entry),
            "url": get_field(entry, "url"),
            "pdf": get_field(entry, "pdf"),
            "code": get_field(entry, "code"),
            "dataset": get_field(entry, "dataset"),
            "doi": get_field(entry, "doi"),
        })
    return pubs


def main():
    # Load YAML data
    hero = load_yaml("hero")
    nav = load_yaml("nav")
    news = load_yaml("news")
    research = load_yaml("research")
    presentations = load_yaml("presentations")
    education = load_yaml("education")
    awards = load_yaml("awards")
    hobbies = load_yaml("hobbies")
    tools_data = load_yaml("tools")

    # Parse publications from BibTeX
    publications = parse_publications()

    # Set up Jinja2
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        keep_trailing_newline=True,
    )
    env.filters['md'] = md_filter

    shared = {"hero": hero, "nav": nav}

    # Render index.html
    tmpl = env.get_template("index.tmpl.html")
    output = tmpl.render(
        **shared,
        news=news,
        research=research,
        presentations=presentations,
        education=education,
        awards=awards,
        hobbies=hobbies,
    )
    Path("index.html").write_text(output)
    print("Generated index.html")

    # Render tools.html
    tmpl = env.get_template("tools.tmpl.html")
    output = tmpl.render(**shared, tools_data=tools_data)
    Path("tools.html").write_text(output)
    print("Generated tools.html")

    # Render publications.html
    tmpl = env.get_template("publications.tmpl.html")
    output = tmpl.render(**shared, publications=publications)
    Path("publications.html").write_text(output)
    print(f"Generated publications.html with {len(publications)} publications")


if __name__ == "__main__":
    main()
