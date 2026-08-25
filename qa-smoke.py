from pathlib import Path
import re

BASE = "https://themohamadaliuk-dotcom.github.io/randospino/"
PROJECT = "/randospino/"


def fail(message: str) -> None:
    raise SystemExit(message)


def check_source_navigation() -> None:
    bad = []
    pages = list(Path(".").glob("*/index.html"))
    for page in pages:
        text = page.read_text(encoding="utf-8")
        if "https://randospino.com" in text:
            bad.append(f"{page}: old randospino.com URL")
        if 'href="/"' in text or 'href="/#' in text:
            bad.append(f"{page}: root-relative Home/section link")
        for href in re.findall(r'href="([^"]+)"', text):
            if href.startswith("/") and not href.startswith(PROJECT):
                bad.append(f"{page}: unsafe absolute project path {href}")
        canonicals = re.findall(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', text, re.I)
        if canonicals and not canonicals[0].startswith(BASE):
            bad.append(f"{page}: canonical is {canonicals[0]}")
    if bad:
        fail("Navigation/SEO source errors:\n" + "\n".join(bad))


def check_routes_and_assets() -> None:
    home = Path("index.html").read_text(encoding="utf-8")
    routes = sorted(set(re.findall(r'href="\./([^"/#?]+)\/"', home)))
    missing = [str(Path(route) / "index.html") for route in routes if not (Path(route) / "index.html").exists()]
    if missing:
        fail("Homepage routes without pages: " + ", ".join(missing))

    if not Path("404.html").exists():
        fail("Missing 404.html")

    pages = list(Path(".").glob("*/index.html"))
    missing_assets = []
    for page in pages:
        text = page.read_text(encoding="utf-8")
        for attr in ("href", "src"):
            for value in re.findall(attr + r'="([^"]+)"', text):
                if value.startswith("../"):
                    clean = value.split("#", 1)[0].split("?", 1)[0]
                    target = page.parent / clean
                    if clean.endswith("/"):
                        target = target / "index.html"
                    if not target.exists():
                        missing_assets.append(f"{page}: {value}")
    if missing_assets:
        fail("Missing relative assets/routes:\n" + "\n".join(missing_assets))


def check_css() -> None:
    for css_name in ("style.css", "home-v3.css", "home-v6-finish.css", "wheel-v2.css", "rando-v1.css"):
        css = Path(css_name)
        if not css.exists():
            fail(f"Missing CSS file: {css_name}")
        text = css.read_text(encoding="utf-8")
        if text.count("{") != text.count("}"):
            fail(f"CSS brace mismatch: {css_name}")


def check_wheel() -> None:
    wheel = Path("wheel-spinner/index.html").read_text(encoding="utf-8")
    required = ("id=\"wheelItems\"", "id=\"wheelCanvas\"", "id=\"spinWheel\"")
    missing = [marker for marker in required if marker not in wheel]
    if missing:
        fail("Wheel Spinner missing: " + ", ".join(missing))


def main() -> None:
    check_source_navigation()
    check_routes_and_assets()
    check_css()
    check_wheel()
    print("RandoSpino smoke QA passed: navigation, routes, assets, SEO URLs, CSS and Wheel Spinner.")


if __name__ == "__main__":
    main()
