#!/usr/bin/env python3

from pathlib import Path
import re

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
FONT_PATH = ROOT / "source/fonts/InterVariable.ttf"
OUTPUT_DIR = ROOT / "public/brand"

INK = "#16181D"
PAPER = "#F7F3E8"
CAN_RED = "#F25F5C"
STRING_YELLOW = "#F6C945"
RADIO_BLUE = "#2256A8"
TIN = "#B9C0C8"
WHITE = "#FFFFFF"


def wordmark_path() -> str:
    variable_font = TTFont(FONT_PATH)
    font = instantiateVariableFont(variable_font, {"wght": 800}, inplace=False)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    metrics = font["hmtx"].metrics
    units_per_em = font["head"].unitsPerEm
    scale = 112 / units_per_em
    x = 170.0
    baseline = 130.0
    path_pen = SVGPathPen(glyph_set)

    for character in "talkcan":
        glyph_name = cmap[ord(character)]
        transform_pen = TransformPen(
            path_pen,
            (scale, 0, 0, -scale, x, baseline),
        )
        glyph_set[glyph_name].draw(transform_pen)
        x += metrics[glyph_name][0] * scale - 3

    return path_pen.getCommands()


def symbol_geometry(ink: str, can: str, tin: str, blue: str, red: str, yellow: str) -> str:
    return f'''<path fill="{tin}" d="M25 30c0-9 23-17 51-17s51 8 51 17v94c0 10-23 18-51 18s-51-8-51-18z"/>
<path fill="{can}" d="M33 33c12 6 28 9 43 9s31-3 43-9v87c-11 7-27 10-43 10s-32-3-43-10z"/>
<ellipse fill="{ink}" cx="76" cy="30" rx="43" ry="11"/>
<ellipse fill="{tin}" cx="76" cy="30" rx="35" ry="6"/>
<path fill="none" stroke="{ink}" stroke-linecap="round" stroke-width="7" d="M53 67h45M53 84h45M53 101h45M119 109h16l13-16M135 109l13 16"/>
<circle fill="{blue}" cx="149" cy="92" r="7"/>
<circle fill="{red}" cx="149" cy="126" r="7"/>
<circle fill="{yellow}" cx="135" cy="109" r="7"/>'''


def svg_document(view_box: str, title: str, body: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
  {body}
</svg>
'''


def write_assets() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    wordmark = wordmark_path()
    variants = {
        "talkcan-logo.svg": (INK, CAN_RED, TIN, RADIO_BLUE, CAN_RED, STRING_YELLOW),
        "talkcan-logo-reverse.svg": (WHITE, CAN_RED, TIN, RADIO_BLUE, CAN_RED, STRING_YELLOW),
        "talkcan-mark-dark.svg": (INK, INK, INK, INK, INK, INK),
        "talkcan-mark-light.svg": (WHITE, WHITE, WHITE, WHITE, WHITE, WHITE),
    }

    symbol = symbol_geometry(INK, CAN_RED, TIN, RADIO_BLUE, CAN_RED, STRING_YELLOW)
    (OUTPUT_DIR / "talkcan-symbol.svg").write_text(
        svg_document("0 0 160 160", "Talkcan", symbol),
        encoding="utf-8",
    )

    for filename, colors in variants.items():
        ink, can, tin, blue, red, yellow = colors
        geometry = symbol_geometry(ink, can, tin, blue, red, yellow)
        body = (
            f'<g transform="translate(0 10)">{geometry}</g>\n'
            f'  <path fill="{ink}" d="{wordmark}"/>'
        )
        (OUTPUT_DIR / filename).write_text(
            svg_document("0 0 640 180", "Talkcan", body),
            encoding="utf-8",
        )


def validate_assets() -> None:
    forbidden = re.compile(
        r"<(?:script|image|animate|set)\b|\bon\w+\s*=|(?:href|src)\s*=\s*[\"'](?:https?://|data:)",
        re.IGNORECASE,
    )
    for path in sorted(OUTPUT_DIR.glob("*.svg")):
        source = path.read_text(encoding="utf-8")
        if forbidden.search(source):
            raise RuntimeError(f"Unsafe SVG content in {path}")
        if "<text" in source or "font-family" in source:
            raise RuntimeError(f"External typography dependency in {path}")


if __name__ == "__main__":
    write_assets()
    validate_assets()
    print(f"Generated and validated {len(list(OUTPUT_DIR.glob('*.svg')))} SVG masters")
