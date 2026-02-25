#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "site"

HREF_SRC = re.compile(r'(?:href|src)="([^"]+)"')


def is_ignored_ref(ref: str) -> bool:
    return (
        ref.startswith(("http://", "https://", "mailto:", "tel:", "javascript:"))
        or ref.startswith("#")
    )


def strip_anchor(ref: str) -> str:
    return ref.split("#", 1)[0]


def check_links():
    errors = []
    for html in SITE.rglob("*.html"):
        text = html.read_text(encoding="utf-8", errors="ignore")
        for match in HREF_SRC.findall(text):
            if is_ignored_ref(match):
                continue
            rel = strip_anchor(match)
            if not rel:
                continue
            target = (html.parent / rel).resolve()
            if not target.exists():
                errors.append(f"{html.relative_to(ROOT)} -> {match}")
    return errors


def check_mobile_nav_wiring():
    errors = []
    pages = [SITE / "index.html"] + sorted((SITE).glob("*/index.html"))
    for page in pages:
        text = page.read_text(encoding="utf-8", errors="ignore")
        if 'class="hamburger"' not in text:
            errors.append(f"{page.relative_to(ROOT)} missing hamburger trigger")
        if "main.js" not in text:
            errors.append(f"{page.relative_to(ROOT)} missing main.js include")
    return errors


def main() -> int:
    if not SITE.exists():
        print("ERROR: site/ directory not found")
        return 1

    errors = []
    errors.extend(check_links())
    errors.extend(check_mobile_nav_wiring())

    if errors:
        print("Site checks failed:")
        for err in errors:
            print(f"- {err}")
        return 1

    print("Site checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
