"""Small SVG toolkit for redrawing the pictures in the NAPLAN-style workbook.

The workbook photos carry handwritten answers (and a printed answer strip), so
pictures are redrawn as clean diagrams instead of cropped. Each helper returns
an SVG fragment plus its size; `save()` wraps fragments into a file under
public/tests/.

Run `python3 scripts/naplan-figures/build.py` to regenerate every figure.
"""

from __future__ import annotations

import math
import os
from dataclasses import dataclass

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "tests")

INK = "#1f3b4d"       # outlines and text
FILL = "#cfe8f3"      # block / shape fill
ACCENT = "#1a7fa6"    # arrows, highlights
SHADE = "#7fb9d6"     # shaded parts
FONT = "font-family='Helvetica, Arial, sans-serif'"


@dataclass
class Frag:
    svg: str
    w: float
    h: float


def text(x, y, s, size=16, anchor="middle", weight="normal", fill=INK):
    s = str(s).replace("&", "&amp;").replace("<", "&lt;")
    return (f"<text x='{x:.1f}' y='{y:.1f}' font-size='{size}' text-anchor='{anchor}' "
            f"font-weight='{weight}' fill='{fill}' {FONT}>{s}</text>")


def group(frag: Frag, dx=0, dy=0) -> str:
    return f"<g transform='translate({dx:.1f},{dy:.1f})'>{frag.svg}</g>"


def save(name: str, frag: Frag, pad=8) -> str:
    os.makedirs(OUT_DIR, exist_ok=True)
    w, h = frag.w + 2 * pad, frag.h + 2 * pad
    svg = (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w:.0f} {h:.0f}' "
           f"width='{w:.0f}' height='{h:.0f}'><rect width='100%' height='100%' fill='white'/>"
           f"{group(frag, pad, pad)}</svg>")
    path = os.path.join(OUT_DIR, f"{name}.svg")
    with open(path, "w") as f:
        f.write(svg)
    return f"tests/{name}.svg"


# ---------- layout helpers ----------

def hstack(frags: list[Frag], gap=16, valign="bottom") -> Frag:
    h = max(f.h for f in frags)
    x, parts = 0.0, []
    for f in frags:
        dy = {"bottom": h - f.h, "top": 0, "middle": (h - f.h) / 2}[valign]
        parts.append(group(f, x, dy))
        x += f.w + gap
    return Frag("".join(parts), x - gap, h)


def vstack(frags: list[Frag], gap=12, align="left") -> Frag:
    w = max(f.w for f in frags)
    y, parts = 0.0, []
    for f in frags:
        dx = {"left": 0, "center": (w - f.w) / 2}[align]
        parts.append(group(f, dx, y))
        y += f.h + gap
    return Frag("".join(parts), w, y - gap)


def labelled(frag: Frag, label: str, size=17) -> Frag:
    """Put a bold choice letter (A, B, C, D) above a picture."""
    lab = text(frag.w / 2, size, label, size=size, weight="bold")
    return Frag(lab + group(frag, 0, size + 8), frag.w, frag.h + size + 8)


def choices(frags: list[Frag], letters="ABCD", gap=28, per_row=4) -> Frag:
    """Labelled answer pictures, in rows of `per_row`."""
    items = [labelled(f, letters[i]) for i, f in enumerate(frags)]
    rows = [hstack(items[i:i + per_row], gap=gap) for i in range(0, len(items), per_row)]
    return vstack(rows, gap=22)


def caption(frag: Frag, s: str, size=15) -> Frag:
    """Text centred under a picture; widens the frame if the text is wider."""
    tw = len(str(s)) * size * 0.58
    w = max(frag.w, tw)
    return Frag(group(frag, (w - frag.w) / 2) + text(w / 2, frag.h + size + 6, s, size=size), w, frag.h + size + 10)


# ---------- base-ten (place value) blocks ----------

U = 9  # size of one small cube in px


def _cube(x, y):
    return f"<rect x='{x:.1f}' y='{y:.1f}' width='{U}' height='{U}' fill='{FILL}' stroke='{INK}' stroke-width='1'/>"


def flat(x=0, y=0) -> str:
    out = [f"<rect x='{x}' y='{y}' width='{10 * U}' height='{10 * U}' fill='{FILL}' stroke='{INK}' stroke-width='1.5'/>"]
    for i in range(1, 10):
        out.append(f"<line x1='{x + i * U}' y1='{y}' x2='{x + i * U}' y2='{y + 10 * U}' stroke='{INK}' stroke-width='0.6'/>")
        out.append(f"<line x1='{x}' y1='{y + i * U}' x2='{x + 10 * U}' y2='{y + i * U}' stroke='{INK}' stroke-width='0.6'/>")
    return "".join(out)


def rod(x=0, y=0) -> str:
    out = [f"<rect x='{x}' y='{y}' width='{U}' height='{10 * U}' fill='{FILL}' stroke='{INK}' stroke-width='1.5'/>"]
    for i in range(1, 10):
        out.append(f"<line x1='{x}' y1='{y + i * U}' x2='{x + U}' y2='{y + i * U}' stroke='{INK}' stroke-width='0.6'/>")
    return "".join(out)


def blocks(hundreds=0, tens=0, ones=0) -> Frag:
    """Hundreds flats, then tens rods, then a column of ones cubes."""
    parts, x = [], 0.0
    H = 10 * U
    for _ in range(hundreds):
        parts.append(flat(x, 0)); x += 10 * U + 10
    if tens:
        for _ in range(tens):
            parts.append(rod(x, 0)); x += U + 4
        x += 8
    for i in range(ones):
        col, row = divmod(i, 10)
        parts.append(_cube(x + col * (U + 4), H - (row + 1) * (U + 3)))
    if ones:
        x += (math.ceil(ones / 10)) * (U + 4)
    return Frag("".join(parts), max(x, U), H)


def blocks_key() -> Frag:
    """The '[flat] = 100   [rod] = 10   [cube] = 1' key from the book."""
    parts = [flat(0, 0), text(10 * U + 30, 52, "= 100", 16),
             rod(10 * U + 66, 0), text(10 * U + 66 + U + 26, 52, "= 10", 16),
             _cube(10 * U + 66 + U + 60, 44), text(10 * U + 66 + U + 60 + U + 18, 52, "= 1", 16)]
    return Frag("".join(parts), 10 * U + 66 + U + 60 + U + 36, 10 * U)


# ---------- number lines ----------

def number_line(start, end, labels=(), length=420, arrow_at=None, arrows=None,
                minor=1, label_size=16, extend_right=0.0, boxes=()) -> Frag:
    """Ticks every `minor` from start to end. `labels` are the numbers printed under
    the line; `arrow_at` draws one down-arrow; `arrows` = {"A": value, ...} draws
    lettered arrows; `boxes` draws empty answer boxes under those values."""
    top = 34 if (arrow_at is not None or arrows) else 6
    y = top + 14
    span = end - start
    scale = length / (span + extend_right)
    xof = lambda v: (v - start) * scale
    parts = [f"<line x1='0' y1='{y}' x2='{length}' y2='{y}' stroke='{INK}' stroke-width='2'/>"]
    v = start
    while v <= end + 1e-9:
        big = any(abs(v - l) < 1e-9 for l in labels)
        parts.append(f"<line x1='{xof(v):.1f}' y1='{y - (9 if big else 6)}' x2='{xof(v):.1f}' y2='{y + (9 if big else 6)}' stroke='{INK}' stroke-width='{2 if big else 1.2}'/>")
        v += minor
    for l in labels:
        parts.append(text(xof(l), y + 30, l, label_size))
    for b in boxes:
        parts.append(f"<rect x='{xof(b) - 16:.1f}' y='{y + 14}' width='32' height='24' fill='white' stroke='{INK}' stroke-width='1.5'/>")
    def down_arrow(x, lab=None):
        s = f"<line x1='{x:.1f}' y1='{top - 22}' x2='{x:.1f}' y2='{y - 6}' stroke='{ACCENT}' stroke-width='2.5'/>"
        s += f"<polygon points='{x - 6:.1f},{y - 14} {x + 6:.1f},{y - 14} {x:.1f},{y - 4}' fill='{ACCENT}'/>"
        if lab:
            s += text(x, top - 24, lab, 15, weight="bold")
        return s
    if arrow_at is not None:
        parts.append(down_arrow(xof(arrow_at)))
    for lab, val in (arrows or {}).items():
        parts.append(down_arrow(xof(val), lab))
    return Frag("".join(parts), length, y + (44 if boxes else 36))


# ---------- arrays / counting pictures ----------

def star(cx, cy, r=11, fill=FILL):
    pts = []
    for k in range(10):
        ang = math.pi / 2 + k * math.pi / 5
        rr = r if k % 2 == 0 else r * 0.45
        pts.append(f"{cx + rr * math.cos(ang):.1f},{cy - rr * math.sin(ang):.1f}")
    return f"<polygon points='{' '.join(pts)}' fill='{fill}' stroke='{INK}' stroke-width='1.2'/>"


def star_rows(counts, gap=30) -> Frag:
    parts = []
    for r, n in enumerate(counts):
        for c in range(n):
            parts.append(star(14 + c * gap, 14 + r * gap))
    return Frag("".join(parts), max(counts) * gap, len(counts) * gap)


# ---------- small illustrations ----------

def ear_tag(label) -> Frag:
    """A calf ear tag with its number (Week 1 Day 1, Real Test Q12)."""
    s = (f"<path d='M20 10 Q60 0 100 10 L110 70 Q60 82 10 70 Z' fill='{SHADE}' stroke='{INK}' stroke-width='2'/>"
         f"<circle cx='60' cy='18' r='5' fill='white' stroke='{INK}' stroke-width='1.5'/>"
         + text(60, 56, label, 26, weight="bold", fill="white"))
    return caption(Frag(s, 120, 82), "This calf's tag")


# ---------- pattern pieces ----------

DARK = "#1a6f94"


def shape_icon(kind, x, y, s=26):
    """One pattern symbol centred at (x, y)."""
    h = s / 2
    st = f"stroke='{INK}' stroke-width='2'"
    if kind == "square":
        return f"<rect x='{x - h + 2:.1f}' y='{y - h + 2:.1f}' width='{s - 4}' height='{s - 4}' fill='white' {st}/>"
    if kind == "dsquare":
        return f"<rect x='{x - h + 3:.1f}' y='{y - h + 3:.1f}' width='{s - 6}' height='{s - 6}' fill='{DARK}' {st}/>"
    if kind == "circle":
        return f"<circle cx='{x:.1f}' cy='{y:.1f}' r='{h - 2:.1f}' fill='white' {st}/>"
    if kind == "triangle":
        return f"<polygon points='{x:.1f},{y - h + 1:.1f} {x + h - 1:.1f},{y + h - 3:.1f} {x - h + 1:.1f},{y + h - 3:.1f}' fill='white' {st}/>"
    if kind in ("diamond", "ddiamond", "sdiamond"):
        r = h - 1 if kind != "sdiamond" else h * 0.55
        fill = "white" if kind == "diamond" else DARK
        return f"<polygon points='{x:.1f},{y - r:.1f} {x + r:.1f},{y:.1f} {x:.1f},{y + r:.1f} {x - r:.1f},{y:.1f}' fill='{fill}' {st}/>"
    if kind == "burst":
        out = []
        for k in range(8):
            a = k * math.pi / 4
            out.append(f"<line x1='{x:.1f}' y1='{y:.1f}' x2='{x + (h - 1) * math.cos(a):.1f}' y2='{y + (h - 1) * math.sin(a):.1f}' stroke='{INK}' stroke-width='2.2'/>")
        return "".join(out)
    raise ValueError(kind)


def shape_row(kinds, s=28, gap=6, dots=True) -> Frag:
    parts = [shape_icon(k, s / 2 + i * (s + gap), s / 2, s) for i, k in enumerate(kinds)]
    w = len(kinds) * (s + gap)
    if dots:
        parts.append(text(w + 14, s / 2 + 6, "…", 22, weight="bold")); w += 30
    return Frag("".join(parts), w, s)


def _stick(x1, y1, x2, y2):
    return f"<line x1='{x1:.1f}' y1='{y1:.1f}' x2='{x2:.1f}' y2='{y2:.1f}' stroke='{ACCENT}' stroke-width='5' stroke-linecap='round'/>"


def stick_diamonds(n, r=26) -> Frag:
    """n diamonds of 4 sticks touching corner to corner."""
    parts = []
    for i in range(n):
        cx = r + i * 2 * r
        pts = [(cx, 0), (cx + r, r), (cx, 2 * r), (cx - r, r)]
        for a, b in zip(pts, pts[1:] + pts[:1]):
            # leave a small gap at the corners like separate sticks
            ax, ay = a[0] + (b[0] - a[0]) * 0.08, a[1] + (b[1] - a[1]) * 0.08
            bx, by = b[0] - (b[0] - a[0]) * 0.08, b[1] - (b[1] - a[1]) * 0.08
            parts.append(_stick(ax, ay, bx, by))
    return Frag("".join(parts), n * 2 * r, 2 * r)


def straw_houses(n, w=34, wall=36, roof=24) -> Frag:
    """n separate straw 'houses' (2 roof + 2 walls + 1 floor = 5 straws each)."""
    parts = []
    for i in range(n):
        x = i * (w + 12)
        parts += [_stick(x + 2, roof + 2, x + w / 2, 2), _stick(x + w / 2, 2, x + w - 2, roof + 2),
                  _stick(x + 2, roof + 6, x + 2, roof + wall), _stick(x + w - 2, roof + 6, x + w - 2, roof + wall),
                  _stick(x + 5, roof + wall + 3, x + w - 5, roof + wall + 3)]
    return Frag("".join(parts), n * (w + 12) - 12, roof + wall + 6)


def stick_triangle_pyramid(rows, side=26) -> Frag:
    """Triangles made of sticks: `rows` rows of upward triangles (1, 3, 6, 10 small triangles…)."""
    hgt = side * math.sqrt(3) / 2
    W = rows * side
    parts = []
    for r in range(rows):           # row r has r+1 upward triangles
        y0 = r * hgt
        for k in range(r + 1):
            x0 = W / 2 - (r + 1) * side / 2 + k * side
            a, b, c = (x0 + side / 2, y0), (x0 + side, y0 + hgt), (x0, y0 + hgt)
            for p, q2 in ((a, b), (b, c), (c, a)):
                ax, ay = p[0] + (q2[0] - p[0]) * 0.1, p[1] + (q2[1] - p[1]) * 0.1
                bx, by = q2[0] - (q2[0] - p[0]) * 0.1, q2[1] - (q2[1] - p[1]) * 0.1
                parts.append(_stick(ax, ay, bx, by))
    return Frag("".join(parts), W, rows * hgt)


def card_columns(cols, cw=22, ch=32) -> Frag:
    """Playing cards stacked in columns, bottom-aligned (e.g. [2, 1, 2] = 5 cards)."""
    H = max(cols) * (ch + 4)
    parts = []
    for i, n in enumerate(cols):
        for k in range(n):
            x, y = i * (cw + 6), H - (k + 1) * (ch + 4)
            parts.append(f"<rect x='{x}' y='{y}' width='{cw}' height='{ch}' rx='3' fill='{FILL}' stroke='{INK}' stroke-width='1.5'/>"
                         f"<rect x='{x + 4}' y='{y + 4}' width='{cw - 8}' height='{ch - 8}' rx='2' fill='none' stroke='{SHADE}' stroke-width='1'/>")
    return Frag("".join(parts), len(cols) * (cw + 6) - 6, H)


def bead_string(kinds, s=22) -> Frag:
    """Beads threaded on a string."""
    w = len(kinds) * (s + 4) + 40
    parts = [f"<line x1='0' y1='{s / 2}' x2='{w}' y2='{s / 2}' stroke='{INK}' stroke-width='2'/>"]
    parts += [shape_icon(k, 20 + s / 2 + i * (s + 4), s / 2, s) for i, k in enumerate(kinds)]
    return Frag("".join(parts), w, s)


# ---------- counting objects ----------

def obj(kind, x, y):
    """A small object icon with its top-left near (x, y). Returns (svg, w, h)."""
    st = f"stroke='{INK}' stroke-width='1.6'"
    if kind == "nail":
        return (f"<rect x='{x}' y='{y}' width='16' height='5' rx='2' fill='{SHADE}' {st}/>"
                f"<polygon points='{x + 6},{y + 5} {x + 10},{y + 5} {x + 9},{y + 50} {x + 8},{y + 56} {x + 7},{y + 50}' fill='#e6eef2' {st}/>", 16, 56)
    if kind == "paperclip":
        return (f"<path d='M{x + 6} {y + 44} L{x + 6} {y + 10} Q{x + 6} {y + 2} {x + 13} {y + 2} Q{x + 20} {y + 2} {x + 20} {y + 10} "
                f"L{x + 20} {y + 46} Q{x + 20} {y + 54} {x + 12} {y + 54} Q{x + 3} {y + 54} {x + 3} {y + 46} L{x + 3} {y + 16} "
                f"Q{x + 3} {y + 12} {x + 6} {y + 12}' fill='none' stroke='{INK}' stroke-width='2'/>"
                f"<path d='M{x + 14} {y + 14} L{x + 14} {y + 42}' stroke='{INK}' stroke-width='2'/>", 24, 56)
    if kind == "can":
        return (f"<rect x='{x}' y='{y + 6}' width='30' height='44' fill='{SHADE}' {st}/>"
                f"<ellipse cx='{x + 15}' cy='{y + 6}' rx='15' ry='6' fill='#e6eef2' {st}/>"
                + text(x + 15, y + 34, "Fizz", 11, weight="bold", fill="white"), 30, 52)
    if kind == "pencil":
        return (f"<rect x='{x}' y='{y}' width='90' height='10' fill='{SHADE}' {st}/>"
                f"<rect x='{x - 8}' y='{y}' width='8' height='10' fill='{INK}'/>"
                f"<polygon points='{x + 90},{y} {x + 104},{y + 5} {x + 90},{y + 10}' fill='#f3d9a4' {st}/>", 112, 10)
    if kind == "ball":
        return (f"<circle cx='{x + 22}' cy='{y + 22}' r='21' fill='{FILL}' {st}/>"
                f"<path d='M{x + 6} {y + 9} Q{x + 22} {y + 22} {x + 6} {y + 36}' fill='none' stroke='white' stroke-width='3'/>"
                f"<path d='M{x + 38} {y + 9} Q{x + 22} {y + 22} {x + 38} {y + 36}' fill='none' stroke='white' stroke-width='3'/>", 44, 44)
    if kind == "book":
        return (f"<rect x='{x}' y='{y}' width='12' height='40' fill='{SHADE}' {st}/>"
                f"<line x1='{x + 2}' y1='{y + 8}' x2='{x + 10}' y2='{y + 8}' stroke='white' stroke-width='1.5'/>", 12, 40)
    if kind == "cake":
        return (f"<path d='M{x} {y + 14} L{x + 26} {y + 14} L{x + 22} {y + 32} L{x + 4} {y + 32} Z' fill='{SHADE}' {st}/>"
                f"<path d='M{x - 1} {y + 15} Q{x + 13} {y - 6} {x + 27} {y + 15} Z' fill='#f6e3ef' {st}/>"
                f"<circle cx='{x + 13}' cy='{y + 2}' r='3' fill='{DARK}'/>", 26, 32)
    if kind == "marble":
        return (f"<circle cx='{x + 12}' cy='{y + 12}' r='11' fill='{DARK}' {st}/>"
                f"<circle cx='{x + 8}' cy='{y + 8}' r='3' fill='white' opacity='0.7'/>", 24, 24)
    if kind == "car":
        return (f"<path d='M{x} {y + 18} L{x + 4} {y + 10} L{x + 14} {y + 10} L{x + 20} {y + 2} L{x + 36} {y + 2} L{x + 44} {y + 10} "
                f"L{x + 52} {y + 12} L{x + 52} {y + 18} Z' fill='{DARK}' {st}/>"
                f"<circle cx='{x + 13}' cy='{y + 19}' r='4' fill='white' {st}/><circle cx='{x + 41}' cy='{y + 19}' r='4' fill='white' {st}/>", 52, 24)
    raise ValueError(kind)


def objects(kind, layout, gap=8, row_gap=10) -> Frag:
    """`layout` = list of row counts, or list of lists of counts to put small gaps between groups."""
    parts, y, W = [], 0, 0
    for row in layout:
        groups = row if isinstance(row, list) else [row]
        x, h = 0, 0
        for g in groups:
            for _ in range(g):
                svg, w, hh = obj(kind, x, y)
                parts.append(svg); x += w + gap; h = max(h, hh)
            x += 3 * gap
        W = max(W, x - 4 * gap); y += h + row_gap
    return Frag("".join(parts), W, y - row_gap)


def scattered(kind, n, cols, jitter=8, gap=10) -> Frag:
    """n objects in a loose, slightly scattered grid (like a pile on a page)."""
    parts, W, H = [], 0, 0
    for i in range(n):
        r, cidx = divmod(i, cols)
        dx = ((i * 37) % (2 * jitter + 1)) - jitter
        dy = ((i * 53) % (2 * jitter + 1)) - jitter
        svg, w, h = obj(kind, cidx * (0 + gap) + cidx * 26 + dx + jitter, r * (h if False else 0) + r * 62 + dy + jitter)
        parts.append(svg); W = max(W, cidx * (26 + gap) + w + 2 * jitter); H = max(H, r * 62 + h + 2 * jitter)
    return Frag("".join(parts), W, H)


def candelabras(n, candles=5) -> Frag:
    parts = []
    for k in range(n):
        ox = k * 150
        parts.append(f"<rect x='{ox + 66}' y='70' width='8' height='40' fill='{SHADE}' stroke='{INK}' stroke-width='1.5'/>"
                     f"<rect x='{ox + 40}' y='108' width='60' height='8' rx='3' fill='{SHADE}' stroke='{INK}' stroke-width='1.5'/>"
                     f"<path d='M{ox + 10} 52 Q{ox + 70} 90 {ox + 130} 52' fill='none' stroke='{INK}' stroke-width='3'/>")
        for c in range(candles):
            cx = ox + 10 + c * 30
            parts.append(f"<rect x='{cx - 4}' y='22' width='8' height='30' fill='white' stroke='{INK}' stroke-width='1.5'/>"
                         f"<path d='M{cx} 8 Q{cx + 6} 16 {cx} 21 Q{cx - 6} 16 {cx} 8' fill='#f2b134' stroke='{INK}' stroke-width='1'/>")
    return Frag("".join(parts), n * 150 - 10, 118)


def bookshelf(rows=3, per_row=8) -> Frag:
    W = per_row * 15 + 30
    parts = [f"<rect x='0' y='0' width='{W}' height='{rows * 52 + 14}' fill='#f3ead9' stroke='{INK}' stroke-width='2'/>"]
    for r in range(rows):
        y = 10 + r * 52
        for b in range(per_row):
            svg, _, _ = obj("book", 15 + b * 15, y)
            parts.append(svg)
        parts.append(f"<line x1='0' y1='{y + 42}' x2='{W}' y2='{y + 42}' stroke='{INK}' stroke-width='3'/>")
    return Frag("".join(parts), W, rows * 52 + 14)


def plates(n=3, per=4) -> Frag:
    parts = []
    for k in range(n):
        ox = k * 150
        parts.append(f"<ellipse cx='{ox + 65}' cy='44' rx='66' ry='10' fill='white' stroke='{INK}' stroke-width='1.8'/>")
        for c in range(per):
            svg, _, _ = obj("cake", ox + 6 + c * 30, 8)
            parts.append(svg)
    return Frag("".join(parts), n * 150 - 18, 56)


# ---------- money ----------

# Radii roughly follow the real coins (5c smallest silver, $2 smaller than $1).
COIN_R = {"5c": 17, "10c": 21, "20c": 25, "50c": 28, "$1": 23, "$2": 19}
GOLD, GOLD_DARK, SILVER = "#f3d98b", "#8a6a12", "#e3eaee"


def coin(value) -> Frag:
    r = COIN_R[value]
    gold = value.startswith("$")
    fill, ink = (GOLD, GOLD_DARK) if gold else (SILVER, INK)
    if value == "50c":  # twelve-sided
        import math
        pts = " ".join(f"{r + r * math.cos(math.pi / 6 * k + math.pi / 12):.1f},{r + r * math.sin(math.pi / 6 * k + math.pi / 12):.1f}" for k in range(12))
        body = f"<polygon points='{pts}' fill='{fill}' stroke='{ink}' stroke-width='1.8'/>"
    else:
        body = f"<circle cx='{r}' cy='{r}' r='{r}' fill='{fill}' stroke='{ink}' stroke-width='1.8'/>"
    ring = f"<circle cx='{r}' cy='{r}' r='{r - 4}' fill='none' stroke='{ink}' stroke-width='0.8' opacity='0.5'/>"
    size = max(13, int(r * 0.66))
    return Frag(body + ring + text(r, r + size * 0.36, value, size, weight="bold", fill=ink), 2 * r, 2 * r)


def coins(values, gap=10) -> Frag:
    return hstack([coin(v) for v in values], gap=gap, valign="middle")


def note(value) -> Frag:
    w, h = 116, 58
    return Frag(f"<rect x='0' y='0' width='{w}' height='{h}' rx='4' fill='{FILL}' stroke='{INK}' stroke-width='1.8'/>"
                f"<rect x='5' y='5' width='{w - 10}' height='{h - 10}' rx='3' fill='none' stroke='{SHADE}' stroke-width='1.5'/>"
                + text(w / 2, h / 2 + 9, f"${value}", 24, weight="bold")
                + text(w - 12, 17, str(value), 10, weight="bold"), w, h)


# ---------- fractions ----------

def frac_grid(rows, cols, shaded, cw=34, ch=34) -> Frag:
    """Rectangle cut into rows×cols equal parts; `shaded` = set of (row, col)."""
    parts = []
    for r in range(rows):
        for c in range(cols):
            fill = SHADE if (r, c) in shaded else "white"
            parts.append(f"<rect x='{c * cw}' y='{r * ch}' width='{cw}' height='{ch}' fill='{fill}' stroke='{INK}' stroke-width='2'/>")
    return Frag("".join(parts), cols * cw, rows * ch)


def frac_wheel(n, shaded, r=48, polygon=False) -> Frag:
    """Circle (or regular n-gon) cut into n equal slices; `shaded` = slice indexes."""
    import math
    pt = lambda k: (r + r * math.sin(2 * math.pi * k / n), r - r * math.cos(2 * math.pi * k / n))
    parts = []
    for k in range(n):
        (x1, y1), (x2, y2) = pt(k), pt(k + 1)
        edge = f"L{x2:.1f} {y2:.1f}" if polygon else f"A{r} {r} 0 0 1 {x2:.1f} {y2:.1f}"
        fill = SHADE if k in shaded else "white"
        parts.append(f"<path d='M{r} {r} L{x1:.1f} {y1:.1f} {edge} Z' fill='{fill}' stroke='{INK}' stroke-width='2' stroke-linejoin='round'/>")
    return Frag("".join(parts), 2 * r, 2 * r)


def frac_triangle_top(w=100, h=86) -> Frag:
    """Triangle with a line across half its height; the small top triangle is shaded."""
    return Frag(f"<polygon points='0,{h} {w},{h} {w / 2},0' fill='white' stroke='{INK}' stroke-width='2'/>"
                f"<polygon points='{w / 4},{h / 2} {3 * w / 4},{h / 2} {w / 2},0' fill='{SHADE}' stroke='{INK}' stroke-width='2'/>", w, h)


# ---------- fruit, balloons ----------

def fruit(kind, cut=False) -> Frag:
    s = 70
    if kind == "orange":
        body = (f"<circle cx='35' cy='37' r='31' fill='#f2a33a' stroke='{INK}' stroke-width='1.8'/>"
                f"<circle cx='35' cy='9' r='2.5' fill='{INK}'/>")
        if cut:
            body += (f"<line x1='35' y1='6' x2='35' y2='68' stroke='{INK}' stroke-width='2' stroke-dasharray='5 3'/>"
                     f"<line x1='4' y1='37' x2='66' y2='37' stroke='{INK}' stroke-width='2' stroke-dasharray='5 3'/>")
    else:  # apple
        body = (f"<path d='M35 18 C20 6 2 14 4 36 C6 58 22 70 35 64 C48 70 64 58 66 36 C68 14 50 6 35 18 Z' fill='#d8473a' stroke='{INK}' stroke-width='1.8'/>"
                f"<path d='M35 18 Q36 8 42 2' fill='none' stroke='{INK}' stroke-width='3'/>")
    return Frag(body, s, s)


def balloons(n) -> Frag:
    import math
    parts, cx, top = [], 110, 0
    pos = []
    per = [4, 5, 3] if n == 12 else [n]
    y = 24
    for row, k in enumerate(per):
        for i in range(k):
            pos.append((cx + (i - (k - 1) / 2) * 40 + (8 if row % 2 else 0), y))
        y += 34
    for x, y in pos:
        parts.append(f"<line x1='{x}' y1='{y + 20}' x2='{cx}' y2='190' stroke='{INK}' stroke-width='1'/>")
    for x, y in pos:
        parts.append(f"<ellipse cx='{x}' cy='{y}' rx='17' ry='20' fill='{SHADE}' stroke='{INK}' stroke-width='1.6'/>"
                     f"<ellipse cx='{x - 6}' cy='{y - 7}' rx='4' ry='6' fill='white' opacity='0.6'/>")
    return Frag("".join(parts), 230, 192)


# ---------- picture clues (spelling) ----------

def clue(kind) -> Frag:
    """A 64×64 line-drawing clue picture."""
    st = f"stroke='{INK}' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'"
    if kind == "fly":
        svg = (f"<ellipse cx='20' cy='26' rx='13' ry='9' fill='{FILL}' opacity='0.8' {st} transform='rotate(-30 20 26)'/>"
               f"<ellipse cx='44' cy='26' rx='13' ry='9' fill='{FILL}' opacity='0.8' {st} transform='rotate(30 44 26)'/>"
               f"<ellipse cx='32' cy='38' rx='8' ry='14' fill='{INK}'/><circle cx='32' cy='22' r='6' fill='{INK}'/>"
               + "".join(f"<line x1='{32 + d * 6}' y1='{y}' x2='{32 + d * 16}' y2='{y + 8}' {st}/>" for d in (-1, 1) for y in (34, 40, 46)))
    elif kind == "stamp":
        holes = "".join(f"<circle cx='{x}' cy='{y}' r='2.5' fill='white'/>" for x in range(10, 56, 7) for y in (6, 58)) + \
                "".join(f"<circle cx='{x}' cy='{y}' r='2.5' fill='white'/>" for x in (6, 58) for y in range(13, 53, 7))
        svg = (f"<rect x='6' y='6' width='52' height='52' fill='{SHADE}' {st}/>{holes}"
               f"<rect x='14' y='14' width='36' height='36' fill='white' {st}/><circle cx='32' cy='28' r='7' fill='{FILL}' {st}/>"
               f"<path d='M20 48 Q32 34 44 48' fill='{FILL}' {st}/>")
    elif kind == "hand":
        fingers = "".join(f"<rect x='{x}' y='{y}' width='9' height='{h}' rx='4.5' fill='{FILL}' {st}/>" for x, y, h in ((16, 12, 30), (26, 6, 34), (36, 8, 32), (46, 14, 26)))
        svg = fingers + (f"<path d='M14 34 L14 50 Q16 62 32 62 Q50 62 54 46 L55 34 Z' fill='{FILL}' {st}/>"
                         f"<rect x='3' y='30' width='9' height='24' rx='4.5' fill='{FILL}' {st} transform='rotate(-35 8 42)'/>")
    elif kind == "skunk":
        svg = (f"<path d='M44 44 Q62 30 52 10 Q46 2 40 12 Q50 22 38 36 Z' fill='{INK}' {st}/>"
               f"<path d='M46 30 Q54 20 48 10' fill='none' stroke='white' stroke-width='3'/>"
               f"<ellipse cx='28' cy='44' rx='18' ry='11' fill='{INK}'/><path d='M14 40 Q28 32 42 40' fill='none' stroke='white' stroke-width='4'/>"
               f"<circle cx='12' cy='40' r='8' fill='{INK}'/><circle cx='9' cy='38' r='1.6' fill='white'/>"
               f"<line x1='20' y1='52' x2='20' y2='58' {st}/><line x1='36' y1='52' x2='36' y2='58' {st}/>"
               + "".join(f"<path d='M{x} 8 q3 -4 0 -6' fill='none' stroke='{INK}' stroke-width='1.4'/>" for x in (10, 18, 26)))
    elif kind == "bell":
        svg = (f"<path d='M32 8 Q16 10 16 34 L12 48 L52 48 L48 34 Q48 10 32 8 Z' fill='{GOLD}' {st}/>"
               f"<circle cx='32' cy='54' r='5' fill='{GOLD_DARK}'/><circle cx='32' cy='6' r='3' fill='none' {st}/>"
               f"<path d='M6 26 Q2 32 6 38 M58 26 Q62 32 58 38' fill='none' {st}/>")
    elif kind == "mask":
        svg = (f"<path d='M4 24 Q32 14 60 24 Q62 44 46 46 Q38 46 32 38 Q26 46 18 46 Q2 44 4 24 Z' fill='{SHADE}' {st}/>"
               f"<ellipse cx='19' cy='32' rx='7' ry='5' fill='white' {st}/><ellipse cx='45' cy='32' rx='7' ry='5' fill='white' {st}/>")
    elif kind == "belt":
        svg = (f"<rect x='2' y='24' width='60' height='16' rx='3' fill='{SHADE}' {st}/>"
               f"<rect x='16' y='18' width='20' height='28' rx='3' fill='none' stroke='{GOLD_DARK}' stroke-width='4'/>"
               f"<line x1='26' y1='32' x2='40' y2='32' stroke='{GOLD_DARK}' stroke-width='3'/>"
               + "".join(f"<circle cx='{x}' cy='32' r='2' fill='{INK}'/>" for x in (46, 52, 58)))
    elif kind == "cat":
        svg = (f"<path d='M12 26 L14 6 L26 18 Q32 16 38 18 L50 6 L52 26 Q56 46 32 52 Q8 46 12 26 Z' fill='white' {st}/>"
               f"<circle cx='24' cy='30' r='3' fill='{INK}'/><circle cx='40' cy='30' r='3' fill='{INK}'/>"
               f"<path d='M29 38 L35 38 L32 41 Z' fill='{INK}'/><path d='M32 41 Q28 46 25 43 M32 41 Q36 46 39 43' fill='none' {st}/>"
               f"<path d='M4 36 L22 38 M4 44 L22 41 M60 36 L42 38 M60 44 L42 41' fill='none' stroke='{INK}' stroke-width='1.3'/>")
    else:
        raise ValueError(kind)
    return Frag(svg, 64, 64)


# ---------- measurement & 3D shapes ----------

_S = f"stroke='{INK}' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'"


def iso_blocks(w, h, d, s=22) -> Frag:
    """A w×h×d stack of cubes drawn with a slanted (oblique) view: front, top and right faces."""
    dx, dy = s * 0.5, s * 0.45
    oy = d * dy
    parts = []
    for z in range(d - 1, -1, -1):  # right side, back to front
        for j in range(h):
            x = w * s + z * dx; y = oy + (h - 1 - j) * s - z * dy
            parts.append(f"<polygon points='{x},{y} {x + dx},{y - dy} {x + dx},{y + s - dy} {x},{y + s}' fill='{DARK}' {_S}/>")
    for z in range(d - 1, -1, -1):  # top, back to front
        for i in range(w):
            x = i * s + z * dx; y = oy - z * dy
            parts.append(f"<polygon points='{x},{y} {x + s},{y} {x + s + dx},{y - dy} {x + dx},{y - dy}' fill='{FILL}' {_S}/>")
    for i in range(w):
        for j in range(h):
            parts.append(f"<rect x='{i * s}' y='{oy + j * s}' width='{s}' height='{s}' fill='{SHADE}' {_S}/>")
    return Frag("".join(parts), w * s + d * dx, oy + h * s)


def rect_prism(W=120, H=50, dx=40, dy=28, dashed=True) -> Frag:
    hid = f"stroke='{INK}' stroke-width='1.6' stroke-dasharray='5 4'" if dashed else _S
    f = [(0, dy), (W, dy), (W, dy + H), (0, dy + H)]
    b = [(x + dx, y - dy) for x, y in f]
    P = lambda pts: " ".join(f"{x},{y}" for x, y in pts)
    svg = (f"<line x1='{b[3][0]}' y1='{b[3][1]}' x2='{b[0][0]}' y2='{b[0][1]}' {hid}/>"
           f"<line x1='{b[3][0]}' y1='{b[3][1]}' x2='{b[2][0]}' y2='{b[2][1]}' {hid}/>"
           f"<line x1='{b[3][0]}' y1='{b[3][1]}' x2='{f[3][0]}' y2='{f[3][1]}' {hid}/>"
           f"<polygon points='{P([f[0], b[0], b[1], f[1]])}' fill='none' {_S}/>"
           f"<polygon points='{P([f[1], b[1], b[2], f[2]])}' fill='none' {_S}/>"
           f"<polygon points='{P(f)}' fill='none' {_S}/>")
    return Frag(svg, W + dx, H + dy)


def tri_prism(W=90, H=80, dx=50, dy=30) -> Frag:
    f = [(0, dy + H), (W, dy + H), (W / 2, dy)]
    b = [(x + dx, y - dy) for x, y in f]
    hid = f"stroke='{INK}' stroke-width='1.6' stroke-dasharray='5 4'"
    svg = (f"<line x1='{b[0][0]}' y1='{b[0][1]}' x2='{b[1][0]}' y2='{b[1][1]}' {hid}/>"
           f"<line x1='{b[0][0]}' y1='{b[0][1]}' x2='{b[2][0]}' y2='{b[2][1]}' {hid}/>"
           f"<line x1='{b[0][0]}' y1='{b[0][1]}' x2='{f[0][0]}' y2='{f[0][1]}' {hid}/>"
           f"<line x1='{f[1][0]}' y1='{f[1][1]}' x2='{b[1][0]}' y2='{b[1][1]}' {_S}/>"
           f"<line x1='{f[2][0]}' y1='{f[2][1]}' x2='{b[2][0]}' y2='{b[2][1]}' {_S}/>"
           f"<line x1='{b[1][0]}' y1='{b[1][1]}' x2='{b[2][0]}' y2='{b[2][1]}' {_S}/>"
           f"<polygon points='{' '.join(f'{x},{y}' for x, y in f)}' fill='none' {_S}/>")
    return Frag(svg, W + dx, H + dy)


def square_pyramid(W=150, H=110, dx=60, dy=34) -> Frag:
    a, b_, c, d = (0, H + dy), (W, H + dy), (W + dx, H), (dx, H)
    apex = ((W + dx) / 2, 0)
    hid = f"stroke='{INK}' stroke-width='1.6' stroke-dasharray='5 4'"
    L = lambda p, q, st=_S: f"<line x1='{p[0]}' y1='{p[1]}' x2='{q[0]}' y2='{q[1]}' {st}/>"
    svg = L(d, a, hid) + L(d, c, hid) + L(d, apex, hid) + L(a, b_) + L(b_, c) + L(a, apex) + L(b_, apex) + L(c, apex)
    return Frag(svg, W + dx, H + dy)


def solid(kind, s=70, fill=FILL) -> Frag:
    if kind == "cylinder":
        return Frag(f"<path d='M0 12 L0 {s - 4} A{s / 2} 12 0 0 0 {s} {s - 4} L{s} 12' fill='{fill}' {_S}/>"
                    f"<ellipse cx='{s / 2}' cy='12' rx='{s / 2}' ry='12' fill='white' {_S}/>", s, s + 8)
    if kind == "cylinder-side":  # lying down
        w, h = s * 1.8, s
        return Frag(f"<path d='M14 0 L{w} 0 A16 {h / 2} 0 0 1 {w} {h} L14 {h}' fill='{fill}' {_S}/>"
                    f"<ellipse cx='14' cy='{h / 2}' rx='14' ry='{h / 2}' fill='{SHADE}' {_S}/>", w + 16, h)
    if kind == "cone":
        return Frag(f"<path d='M0 {s - 4} L{s / 2} 0 L{s} {s - 4} A{s / 2} 10 0 0 1 0 {s - 4} Z' fill='{fill}' {_S}/>"
                    f"<path d='M0 {s - 4} A{s / 2} 10 0 0 0 {s} {s - 4}' fill='none' stroke='{INK}' stroke-width='1.4' stroke-dasharray='4 3'/>", s, s + 8)
    if kind == "pyramid":
        p = square_pyramid(W=s * 0.8, H=s * 0.8, dx=s * 0.35, dy=s * 0.2)
        return p
    if kind == "cube":
        k, dd = s * 0.75, s * 0.25
        return Frag(f"<rect x='0' y='{dd}' width='{k}' height='{k}' fill='{fill}' {_S}/>"
                    f"<polygon points='0,{dd} {dd},0 {k + dd},0 {k},{dd}' fill='white' {_S}/>"
                    f"<polygon points='{k},{dd} {k + dd},0 {k + dd},{k} {k},{k + dd}' fill='{SHADE}' {_S}/>", k + dd, k + dd)
    raise ValueError(kind)


def poly(points, fill="white", w=None, h=None) -> Frag:
    xs, ys = [p[0] for p in points], [p[1] for p in points]
    return Frag(f"<polygon points='{' '.join(f'{x},{y}' for x, y in points)}' fill='{fill}' {_S}/>",
                w or max(xs), h or max(ys))


def shape2d(kind, s=60, fill="white") -> Frag:
    """Common flat shapes sized roughly s px."""
    if kind == "circle":
        return Frag(f"<circle cx='{s / 2}' cy='{s / 2}' r='{s / 2 - 1}' fill='{fill}' {_S}/>", s, s)
    if kind == "ellipse":
        return Frag(f"<ellipse cx='{s * 0.8}' cy='{s * 0.3}' rx='{s * 0.8 - 1}' ry='{s * 0.3 - 1}' fill='{fill}' {_S}/>", s * 1.6, s * 0.6)
    pts = {
        "triangle": [(0, s * 0.8), (s, s * 0.8), (s * 0.5, 0)],
        "right-triangle": [(0, s), (0, 0), (s * 0.7, 0)],
        "scalene": [(0, 0), (s * 1.3, s * 0.15), (s * 1.6, s * 0.75)],
        "obtuse": [(0, s * 0.9), (s * 1.2, s * 0.9), (s * 0.2, 0)],
        "square": [(0, 0), (s, 0), (s, s), (0, s)],
        "rect-wide": [(0, 0), (s * 1.6, 0), (s * 1.6, s * 0.75), (0, s * 0.75)],
        "rect-tall": [(0, 0), (s * 0.7, 0), (s * 0.7, s * 1.2), (0, s * 1.2)],
        "rect-thin": [(0, 0), (s * 0.45, 0), (s * 0.45, s), (0, s)],
        "rect-flat": [(0, 0), (s * 1.8, 0), (s * 1.8, s * 0.4), (0, s * 0.4)],
        "parallelogram": [(s * 0.35, 0), (s * 1.6, 0), (s * 1.25, s * 0.6), (0, s * 0.6)],
        "trapezium": [(0, 0), (s * 0.9, s * 0.15), (s * 0.9, s * 0.7), (0, s * 0.95)],
        "arrow": [(0, s * 0.3), (s * 0.9, s * 0.3), (s * 0.9, s * 0.1), (s * 1.4, s * 0.5), (s * 0.9, s * 0.9), (s * 0.9, s * 0.7), (0, s * 0.7)],
        "hexagon": [(s * 0.25, 0), (s * 0.75, 0), (s, s * 0.45), (s * 0.75, s * 0.9), (s * 0.25, s * 0.9), (0, s * 0.45)],
        "octagon": [(s * 0.3, 0), (s * 0.7, 0), (s, s * 0.3), (s, s * 0.7), (s * 0.7, s), (s * 0.3, s), (0, s * 0.7), (0, s * 0.3)],
        "tall-triangle": [(0, 0), (s * 0.5, s * 0.6), (0, s * 1.2)],
    }[kind]
    return poly(pts, fill)


def jug(cap, level, marks, h=90) -> Frag:
    """Measuring jug holding `cap` litres, filled to `level` litres; `marks` = litre labels shown."""
    w = 40 + cap * 9
    y_of = lambda L: h - (h - 14) * L / cap
    liquid = f"<rect x='2' y='{y_of(level)}' width='{w - 4}' height='{h - y_of(level) - 2}' fill='{SHADE}'/>"
    ticks = "".join(f"<line x1='{w - 22}' y1='{y_of(m)}' x2='{w - 8}' y2='{y_of(m)}' stroke='{INK}' stroke-width='1.6'/>"
                    + text(w - 26, y_of(m) + 4, f"{m}L", 11, anchor="end") for m in marks)
    body = (f"<path d='M0 4 L{w} 4 L{w} {h} L0 {h} Z' fill='none' {_S}/>"
            f"<path d='M{w} 18 Q{w + 20} 18 {w + 20} {h / 2} Q{w + 20} {h - 20} {w} {h - 20}' fill='none' {_S}/>")
    return Frag(liquid + ticks + body, w + 22, h)


def ribbons(rows) -> Frag:
    parts, y = [], 0
    for name, length in rows:
        parts.append(f"<rect x='0' y='{y}' width='{length}' height='26' fill='{SHADE}' {_S}/>" + text(8, y + 18, name, 14, anchor="start"))
        y += 34
    return Frag("".join(parts), max(l for _, l in rows), y - 8)


def instrument(kind) -> Frag:
    if kind == "kitchen-scales":
        return Frag(f"<path d='M8 14 Q34 30 60 14 Z' fill='{FILL}' {_S}/><rect x='30' y='20' width='8' height='8' fill='{INK}'/>"
                    f"<rect x='6' y='28' width='56' height='40' rx='8' fill='{SHADE}' {_S}/><circle cx='34' cy='48' r='13' fill='white' {_S}/>"
                    f"<line x1='34' y1='48' x2='41' y2='40' {_S}/>", 68, 70)
    if kind == "thermometer":
        return Frag(f"<rect x='14' y='2' width='16' height='70' rx='8' fill='white' {_S}/><circle cx='22' cy='66' r='9' fill='#d8473a' {_S}/>"
                    f"<rect x='19' y='24' width='6' height='42' fill='#d8473a'/>"
                    + "".join(f"<line x1='30' y1='{y}' x2='36' y2='{y}' stroke='{INK}' stroke-width='1.4'/>" for y in range(10, 60, 8)), 44, 76)
    if kind == "timer":
        return Frag(f"<circle cx='34' cy='38' r='28' fill='white' {_S}/><rect x='28' y='4' width='12' height='8' fill='{INK}'/>"
                    + "".join(f"<line x1='{34 + 22 * __import__('math').sin(a * 0.5236):.1f}' y1='{38 - 22 * __import__('math').cos(a * 0.5236):.1f}' "
                              f"x2='{34 + 27 * __import__('math').sin(a * 0.5236):.1f}' y2='{38 - 27 * __import__('math').cos(a * 0.5236):.1f}' stroke='{INK}' stroke-width='1.6'/>" for a in range(12))
                    + f"<line x1='34' y1='38' x2='34' y2='18' {_S}/><line x1='34' y1='38' x2='46' y2='44' {_S}/>", 68, 68)
    if kind == "stopwatch":
        return Frag(f"<circle cx='34' cy='40' r='27' fill='{FILL}' {_S}/><circle cx='34' cy='40' r='20' fill='white' {_S}/>"
                    f"<rect x='29' y='4' width='10' height='10' fill='{INK}'/><line x1='34' y1='40' x2='40' y2='24' {_S}/>"
                    f"<rect x='52' y='12' width='8' height='6' fill='{INK}' transform='rotate(45 56 15)'/>", 68, 70)
    if kind == "jug":
        return jug(1, 0.6, [], h=64)
    if kind == "ruler":
        return Frag(f"<rect x='0' y='0' width='110' height='22' fill='#f3e2b3' {_S}/>"
                    + "".join(f"<line x1='{x}' y1='0' x2='{x}' y2='{10 if (x - 5) % 20 == 0 else 6}' stroke='{INK}' stroke-width='1.3'/>" for x in range(5, 110, 10)), 110, 22)
    if kind == "bathroom-scales":
        return Frag(f"<rect x='2' y='2' width='76' height='62' rx='12' fill='white' {_S}/><rect x='12' y='18' width='56' height='38' rx='6' fill='{SHADE}' {_S}/>"
                    f"<rect x='28' y='6' width='24' height='9' fill='{FILL}' {_S}/>", 80, 66)
    if kind == "tape-measure":
        return Frag(f"<rect x='34' y='2' width='40' height='44' rx='8' fill='{SHADE}' {_S}/><circle cx='54' cy='24' r='8' fill='white' {_S}/>"
                    f"<polygon points='36,40 0,64 6,70 40,46' fill='#f3e2b3' {_S}/>"
                    + "".join(f"<line x1='{30 - k * 6}' y1='{44 + k * 4}' x2='{33 - k * 6}' y2='{48 + k * 4}' stroke='{INK}' stroke-width='1.2'/>" for k in range(5)), 76, 72)
    raise ValueError(kind)


def dog(height, length) -> Frag:
    """Side-on dog; `height` is shoulder height in px."""
    leg = max(8, height - 22)
    by = 10
    body = f"<rect x='16' y='{by}' width='{length}' height='20' rx='10' fill='{SHADE}' {_S}/>"
    legs = "".join(f"<rect x='{x}' y='{by + 14}' width='7' height='{leg}' rx='3' fill='{SHADE}' {_S}/>" for x in (22, 32, length, length + 6))
    head = (f"<circle cx='{length + 22}' cy='{by - 2}' r='11' fill='{SHADE}' {_S}/>"
            f"<path d='M{length + 30} {by - 4} L{length + 40} {by} L{length + 30} {by + 4}' fill='{SHADE}' {_S}/>"
            f"<path d='M{length + 16} {by - 10} L{length + 14} {by + 4} L{length + 20} {by - 4}' fill='{DARK}' {_S}/>"
            f"<circle cx='{length + 25}' cy='{by - 5}' r='1.8' fill='{INK}'/>")
    tail = f"<path d='M18 {by + 6} Q4 {by - 6} 6 {by - 14}' fill='none' {_S}/>"
    W = length + 42
    return Frag(f"<g transform='translate(0,14)'>{tail}{legs}{body}{head}</g>", W, by + 14 + leg + 14)


def pig(x, y) -> str:
    return (f"<ellipse cx='{x + 30}' cy='{y + 24}' rx='20' ry='13' fill='#f6d5dc' {_S}/>"
            f"<circle cx='{x + 12}' cy='{y + 18}' r='9' fill='#f6d5dc' {_S}/><ellipse cx='{x + 5}' cy='{y + 20}' rx='3.5' ry='3' fill='white' {_S}/>"
            f"<path d='M{x + 12} {y + 10} L{x + 14} {y + 4} L{x + 18} {y + 11}' fill='#f6d5dc' {_S}/>"
            + "".join(f"<line x1='{x + lx}' y1='{y + 34}' x2='{x + lx}' y2='{y + 42}' {_S}/>" for lx in (20, 26, 36, 42))
            + f"<path d='M{x + 50} {y + 20} q6 -4 3 -8' fill='none' {_S}/>")


def stamp_card(cols, rows, stamps, cw=64, ch=52) -> Frag:
    W, H = cols * cw, rows * ch
    grid = "".join(f"<line x1='{c * cw}' y1='0' x2='{c * cw}' y2='{H}' stroke='{INK}' stroke-width='1.4' stroke-dasharray='5 4'/>" for c in range(1, cols)) + \
           "".join(f"<line x1='0' y1='{r * ch}' x2='{W}' y2='{r * ch}' stroke='{INK}' stroke-width='1.4' stroke-dasharray='5 4'/>" for r in range(1, rows))
    pigs = "".join(pig(c * cw + 2, r * ch + 3) for r, c in stamps)
    return Frag(f"<rect x='0' y='0' width='{W}' height='{H}' fill='white' stroke='{INK}' stroke-width='2.5'/>" + grid + pigs, W, H)


def shaded_grid(cols, rows, x0, y0, w, h, cell=16) -> Frag:
    return frac_grid(rows, cols, {(r, c) for r in range(y0, y0 + h) for c in range(x0, x0 + w)}, cw=cell, ch=cell)


def bucket(level=0.55) -> Frag:
    top, bot, h = 110, 80, 90
    ly = 10 + h * (1 - level)
    lw = bot + (top - bot) * (1 - (ly - 10) / h)
    return Frag(f"<path d='M0 10 L{top} 10 L{top - (top - bot) / 2} {10 + h} L{(top - bot) / 2} {10 + h} Z' fill='{FILL}' {_S}/>"
                f"<ellipse cx='{top / 2}' cy='{ly}' rx='{lw / 2}' ry='6' fill='white' {_S}/>"
                f"<ellipse cx='{top / 2}' cy='10' rx='{top / 2}' ry='9' fill='none' {_S}/>"
                f"<path d='M4 18 Q{top / 2} 70 {top - 4} 18' fill='none' stroke='{INK}' stroke-width='2.5'/>", top, h + 16)


def venn_cts() -> Frag:
    """Circle, triangle and square overlapping, with numbers placed in the regions."""
    nums = {1: (42, 95), 2: (120, 44), 3: (134, 92), 4: (100, 145), 5: (232, 158), 6: (195, 104), 7: (252, 34), 8: (201, 32)}
    svg = (f"<polygon points='40,170 270,170 170,10' fill='none' {_S}/>"
           f"<rect x='110' y='20' width='105' height='100' fill='none' {_S}/>"
           f"<circle cx='90' cy='95' r='66' fill='none' {_S}/>"
           + "".join(text(x, y + 6, n, 16, weight="bold") for n, (x, y) in nums.items()))
    return Frag(svg, 272, 172)


# ---------- time & mass ----------

def clock(h, m, r=46, minute_hand=True) -> Frag:
    import math
    parts = [f"<circle cx='{r}' cy='{r}' r='{r - 2}' fill='#eaf4f9' stroke='{INK}' stroke-width='2.5'/>"]
    for k in range(1, 13):
        a = math.radians(k * 30)
        parts.append(text(r + (r - 13) * math.sin(a), r - (r - 13) * math.cos(a) + 4.5, k, 12))
    for k in range(60):
        if k % 5:
            a = math.radians(k * 6)
            parts.append(f"<circle cx='{r + (r - 5) * math.sin(a):.1f}' cy='{r - (r - 5) * math.cos(a):.1f}' r='0.8' fill='{INK}'/>")
    ha = math.radians((h % 12) * 30 + m * 0.5)
    parts.append(f"<line x1='{r}' y1='{r}' x2='{r + r * 0.48 * math.sin(ha):.1f}' y2='{r - r * 0.48 * math.cos(ha):.1f}' stroke='{INK}' stroke-width='5' stroke-linecap='round'/>")
    if minute_hand:
        ma = math.radians(m * 6)
        parts.append(f"<line x1='{r}' y1='{r}' x2='{r + r * 0.74 * math.sin(ma):.1f}' y2='{r - r * 0.74 * math.cos(ma):.1f}' stroke='{INK}' stroke-width='3' stroke-linecap='round'/>")
    parts.append(f"<circle cx='{r}' cy='{r}' r='3.5' fill='{INK}'/>")
    return Frag("".join(parts), 2 * r, 2 * r)


def calendar(title, start, days, cw=40, ch=28, mark=None) -> Frag:
    """Month grid; `start` = 0 for Sunday … 6 for Saturday."""
    W = 7 * cw
    parts = [f"<rect x='0' y='0' width='{W}' height='30' fill='{ACCENT}'/>", text(W / 2, 21, title, 16, weight="bold", fill="white")]
    for i, d in enumerate(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]):
        parts.append(text(i * cw + cw / 2, 50, d, 12, weight="bold", fill=ACCENT))
    rows = (start + days + 6) // 7
    for d in range(1, days + 1):
        k = start + d - 1
        parts.append(text((k % 7) * cw + cw / 2, 78 + (k // 7) * ch, d, 15))
    H = 60 + rows * ch + 6
    parts.append(f"<rect x='0' y='0' width='{W}' height='{H}' fill='none' stroke='{ACCENT}' stroke-width='2.5'/>")
    return Frag("".join(parts), W, H)


def mass_chip(kind) -> str:
    """Little object for a balance pan: 'grey' small, 'blue' medium, 'dark' large."""
    w, h, fill = {"grey": (16, 9, "#9aa5ab"), "blue": (24, 11, SHADE), "dark": (30, 13, "#2b3a42")}[kind]
    return w, h, fill


def balance(left, right, heavier) -> Frag:
    """Pan balance with an object in each pan; the heavier side ('left'/'right') sits lower."""
    tilt = 14 if heavier == "left" else -14
    cx, top = 110, 30
    lx, ly = cx - 80, top + tilt
    rx, ry = cx + 80, top - tilt
    def pan(x, y, kind, label):
        w, h, fill = mass_chip(kind)
        out = (f"<path d='M{x - 26} {y + 6} L{x - 26} {y + 50} L{x + 26} {y + 50} L{x + 26} {y + 6} Q{x} {y - 6} {x - 26} {y + 6}' fill='none' {_S}/>"
               f"<rect x='{x - w / 2}' y='{y + 50 - h}' width='{w}' height='{h}' rx='4' fill='{fill}' {_S}/>")
        if label:
            out += text(x, y + 32, label, 15, weight="bold")
        return out
    return Frag(f"<line x1='{lx}' y1='{ly + 6}' x2='{rx}' y2='{ry + 6}' stroke='{INK}' stroke-width='3'/>"
                f"<line x1='{cx}' y1='{top + 6}' x2='{cx}' y2='118' stroke='{INK}' stroke-width='3'/>"
                f"<polygon points='{cx - 40},126 {cx + 40},126 {cx + 30},116 {cx - 30},116' fill='{FILL}' {_S}/>"
                f"<circle cx='{cx}' cy='{top + 6}' r='4' fill='white' {_S}/>"
                + pan(lx, ly, left[0], left[1]) + pan(rx, ry, right[0], right[1]), 2 * cx, 128)


def chip_row(kinds) -> Frag:
    x, parts = 0, []
    for k in kinds:
        w, h, fill = mass_chip(k)
        parts.append(f"<rect x='{x}' y='{14 - h}' width='{w}' height='{h}' rx='4' fill='{fill}' {_S}/>")
        x += w + 8
    return Frag("".join(parts), x - 8, 14)


def clue2(kind) -> Frag:
    """More 64-80px clue pictures (silent e words)."""
    if kind == "plane":
        return Frag(f"<path d='M4 40 Q10 30 30 32 L66 32 Q78 34 78 40 Q78 46 66 48 L30 48 Q10 50 4 40 Z' fill='{FILL}' {_S}/>"
                    f"<polygon points='34,34 50,6 58,6 50,34' fill='{SHADE}' {_S}/><polygon points='34,46 50,74 58,74 50,46' fill='{SHADE}' {_S}/>"
                    f"<polygon points='68,34 76,18 80,18 78,36' fill='{SHADE}' {_S}/>"
                    + "".join(f"<circle cx='{x}' cy='39' r='2.5' fill='white' {_S}/>" for x in (22, 30, 38)), 82, 78)
    if kind == "plate":
        return Frag(f"<ellipse cx='40' cy='40' rx='38' ry='28' fill='white' {_S}/><ellipse cx='40' cy='40' rx='24' ry='16' fill='{FILL}' {_S}/>", 80, 70)
    if kind == "snake":
        return Frag(f"<path d='M6 60 Q20 40 34 60 Q48 80 62 60 Q72 46 66 32' fill='none' stroke='{INK}' stroke-width='10' stroke-linecap='round'/>"
                    f"<path d='M6 60 Q20 40 34 60 Q48 80 62 60 Q72 46 66 32' fill='none' stroke='#7fc28e' stroke-width='6' stroke-linecap='round'/>"
                    f"<ellipse cx='66' cy='26' rx='9' ry='7' fill='#7fc28e' {_S}/><circle cx='68' cy='24' r='1.6' fill='{INK}'/>"
                    f"<path d='M74 28 L80 30 M80 30 L84 27 M80 30 L84 33' stroke='#d8473a' stroke-width='1.6' fill='none'/>", 86, 76)
    if kind == "bike":
        return Frag(f"<circle cx='18' cy='50' r='15' fill='none' {_S}/><circle cx='66' cy='50' r='15' fill='none' {_S}/>"
                    f"<path d='M18 50 L34 26 L58 26 L66 50 M34 26 L44 50 L58 26 M44 50 L18 50 M30 20 L40 20 M58 26 L56 16 L64 14' fill='none' {_S}/>", 84, 68)
    raise ValueError(kind)


# ---------- location & transformation ----------

def label_grid(cells, cols, rows, cw=78, ch=40, size=12) -> Frag:
    """Grid with letter columns along the bottom and number rows up the side; `cells` = {'B3': 'chemist', ...}."""
    ox, parts = 22, []
    for r in range(rows):
        y = (rows - 1 - r) * ch
        parts.append(text(10, y + ch / 2 + 5, r + 1, 14, weight="bold"))
        for c in range(cols):
            parts.append(f"<rect x='{ox + c * cw}' y='{y}' width='{cw}' height='{ch}' fill='white' stroke='{INK}' stroke-width='1.6'/>")
    for c in range(cols):
        parts.append(text(ox + c * cw + cw / 2, rows * ch + 18, "ABCDEFG"[c], 14, weight="bold"))
    for key, val in cells.items():
        c, r = "ABCDEFG".index(key[0]), int(key[1:]) - 1
        x, y = ox + c * cw + cw / 2, (rows - 1 - r) * ch + ch / 2
        if isinstance(val, Frag):
            parts.append(group(val, x - val.w / 2, y - val.h / 2))
        else:
            lines = str(val).split("\n")
            for i, ln in enumerate(lines):
                parts.append(text(x, y + 5 + (i - (len(lines) - 1) / 2) * (size + 1), ln, size))
    return Frag("".join(parts), ox + cols * cw, rows * ch + 24)


def plane_icon() -> Frag:
    return Frag(f"<path d='M2 10 L22 10 M14 3 L19 10 L14 17 M4 6 L6 10 L4 14' fill='none' stroke='{INK}' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>", 24, 20)


def face(kind, s=60) -> Frag:
    """Simple head drawings: 'oldman', 'boy', 'girl', 'oldwoman', 'beard', 'woman', 'man'."""
    skin = "#fbe3cf"
    hair = {"oldman": "white", "boy": "#c9a46a", "girl": "#3a2a20", "oldwoman": "white", "beard": "#6b4a2b", "woman": "#c9a46a", "man": "#3a2a20"}[kind]
    p = [f"<ellipse cx='{s / 2}' cy='{s / 2 + 2}' rx='{s * 0.36}' ry='{s * 0.42}' fill='{skin}' {_S}/>"]
    if kind == "girl":
        p.insert(0, f"<path d='M{s * 0.1} {s * 0.7} Q{s * 0.08} {s * 0.05} {s / 2} {s * 0.08} Q{s * 0.92} {s * 0.05} {s * 0.9} {s * 0.7} Z' fill='{hair}' {_S}/>")
        p.append(f"<path d='M{s * 0.18} {s * 0.38} Q{s / 2} {s * 0.05} {s * 0.82} {s * 0.38} Q{s / 2} {s * 0.22} {s * 0.18} {s * 0.38} Z' fill='{hair}'/>")
    elif kind in ("oldman", "beard", "man"):
        p.append(f"<path d='M{s * 0.16} {s * 0.38} Q{s / 2} {s * 0.02} {s * 0.84} {s * 0.38}' fill='none' stroke='{hair if kind != 'oldman' else INK}' stroke-width='{5 if kind != 'oldman' else 1.5}'/>")
    else:
        p.append(f"<path d='M{s * 0.15} {s * 0.42} Q{s * 0.2} {s * 0.02} {s / 2} {s * 0.06} Q{s * 0.8} {s * 0.02} {s * 0.85} {s * 0.42} Q{s * 0.7} {s * 0.2} {s / 2} {s * 0.2} Q{s * 0.3} {s * 0.2} {s * 0.15} {s * 0.42} Z' fill='{hair}' {_S}/>")
    if kind in ("oldman", "oldwoman"):
        p.append(f"<circle cx='{s * 0.38}' cy='{s * 0.5}' r='{s * 0.09}' fill='none' {_S}/><circle cx='{s * 0.62}' cy='{s * 0.5}' r='{s * 0.09}' fill='none' {_S}/>"
                 f"<line x1='{s * 0.47}' y1='{s * 0.5}' x2='{s * 0.53}' y2='{s * 0.5}' {_S}/>")
    p.append(f"<circle cx='{s * 0.38}' cy='{s * 0.5}' r='2.4' fill='{INK}'/><circle cx='{s * 0.62}' cy='{s * 0.5}' r='2.4' fill='{INK}'/>")
    if kind == "beard":
        p.append(f"<path d='M{s * 0.16} {s * 0.55} Q{s * 0.2} {s * 1.02} {s / 2} {s * 1.0} Q{s * 0.8} {s * 1.02} {s * 0.84} {s * 0.55} Q{s / 2} {s * 0.8} {s * 0.16} {s * 0.55} Z' fill='{hair}' {_S}/>")
    elif kind == "boy":
        p.append(f"<path d='M{s * 0.36} {s * 0.7} Q{s / 2} {s * 0.84} {s * 0.64} {s * 0.7} Z' fill='white' {_S}/><rect x='{s * 0.46}' y='{s * 0.7}' width='{s * 0.08}' height='{s * 0.06}' fill='{INK}'/>")
    else:
        p.append(f"<path d='M{s * 0.38} {s * 0.72} Q{s / 2} {s * 0.8} {s * 0.62} {s * 0.72}' fill='none' {_S}/>")
    return Frag("".join(p), s, s * 1.04)


def red_rock_map() -> Frag:
    road, blk = "#ffffff", FILL
    W, H = 420, 210
    p = [f"<rect x='0' y='0' width='{W}' height='{H}' fill='{road}'/>"]
    for x, y, w, h in ((0, 0, 100, 50), (130, 0, 210, 50), (370, 0, 50, 140), (0, 76, 100, 106), (130, 76, 210, 92), (0, 196, 100, 14), (130, 196, 210, 14), (370, 168, 50, 42)):
        p.append(f"<rect x='{x}' y='{y}' width='{w}' height='{h}' fill='{blk}' stroke='{INK}' stroke-width='1.6'/>")
    p += [text(235, 68, "Main Rd", 14), text(235, 188, "Red Rock Rd", 14),
          f"<text x='121' y='60' font-size='14' fill='{INK}' {FONT} transform='rotate(-90 121 60)' text-anchor='middle'>Hill Rd</text>",
          f"<text x='361' y='60' font-size='14' fill='{INK}' {FONT} transform='rotate(-90 361 60)' text-anchor='middle'>Park Rd</text>",
          f"<rect x='290' y='100' width='44' height='40' fill='white' stroke='{INK}' stroke-width='2'/>", text(255, 116, "Post", 13), text(255, 132, "Office", 13),
          f"<rect x='272' y='196' width='60' height='14' fill='white' stroke='{INK}' stroke-width='2'/>", text(302, 208, "Bank", 12, weight="bold")]
    return Frag("".join(p), W, H)


def flip_panel(svg_shape, w=120, h=56, axis="v", mirror=None) -> Frag:
    """Shape on a card with a dotted fold line; `mirror` adds a second shape on the other side."""
    if axis == "v":
        line = f"<line x1='{w / 2}' y1='0' x2='{w / 2}' y2='{h}' stroke='{INK}' stroke-width='1.6' stroke-dasharray='4 4'/>"
    else:
        line = f"<line x1='0' y1='{h / 2}' x2='{w}' y2='{h / 2}' stroke='{INK}' stroke-width='1.6' stroke-dasharray='4 4'/>"
    return Frag(f"<rect x='0' y='0' width='{w}' height='{h}' fill='{FILL}' stroke='{INK}' stroke-width='1.8'/>" + svg_shape + (mirror or "") + line, w, h)


def block_arrow(angle=0, L=70) -> Frag:
    """Thick arrow pointing right, rotated by `angle` degrees clockwise."""
    pts = f"0,12 {L - 22},12 {L - 22},2 {L},20 {L - 22},38 {L - 22},28 0,28"
    return Frag(f"<g transform='translate({L / 2},{L / 2}) rotate({angle}) translate({-L / 2},-20)'><polygon points='{pts}' fill='{FILL}' {_S}/></g>", L, L)


def thin_arrow(angle, L=60) -> Frag:
    import math
    a = math.radians(angle)
    cx = cy = L / 2
    dx, dy = math.cos(a) * L * 0.42, math.sin(a) * L * 0.42
    x2, y2 = cx + dx, cy + dy
    hx1, hy1 = x2 - 12 * math.cos(a - 0.45), y2 - 12 * math.sin(a - 0.45)
    hx2, hy2 = x2 - 12 * math.cos(a + 0.45), y2 - 12 * math.sin(a + 0.45)
    return Frag(f"<line x1='{cx - dx:.1f}' y1='{cy - dy:.1f}' x2='{x2:.1f}' y2='{y2:.1f}' stroke='{ACCENT}' stroke-width='4' stroke-linecap='round'/>"
                f"<polygon points='{x2:.1f},{y2:.1f} {hx1:.1f},{hy1:.1f} {hx2:.1f},{hy2:.1f}' fill='{ACCENT}'/>", L, L)


def polyomino(cells, shaded=(), dot=None, s=26) -> Frag:
    p = []
    for r, c in cells:
        fill = SHADE if (r, c) in shaded else "white"
        p.append(f"<rect x='{c * s}' y='{r * s}' width='{s}' height='{s}' fill='{fill}' stroke='{ACCENT}' stroke-width='2'/>")
    if dot:
        p.append(f"<circle cx='{dot[1] * s + s / 2}' cy='{dot[0] * s + s / 2}' r='{s * 0.18}' fill='{INK}'/>")
    return Frag("".join(p), (max(c for _, c in cells) + 1) * s, (max(r for r, _ in cells) + 1) * s)


def counter_grid(cols, rows, at, s=18) -> Frag:
    p = [f"<rect x='{c * s}' y='{r * s}' width='{s}' height='{s}' fill='#eaf4f9' stroke='{ACCENT}' stroke-width='1.3'/>" for r in range(rows) for c in range(cols)]
    r, c = at
    p.append(f"<rect x='{c * s + 3}' y='{r * s + 6}' width='{s - 6}' height='{s - 12}' rx='2' fill='{INK}'/>")
    return Frag("".join(p), cols * s, rows * s)


def card_glyph(kind) -> Frag:
    """Tall card with an F-like glyph. kind: 'orig' (upside-down F), 'F', 'mirror', 'half'."""
    w, h = 50, 90
    g = {"F": "M16 78 L16 12 L36 12 M16 44 L32 44",
         "orig": "M16 12 L16 78 L36 78 M16 46 L32 46",
         "mirror": "M34 12 L34 78 L14 78 M34 46 L18 46",
         "half": "M34 78 L34 12 L14 12 M34 44 L18 44"}[kind]
    return Frag(f"<rect x='0' y='0' width='{w}' height='{h}' fill='{FILL}' stroke='{INK}' stroke-width='1.8'/>"
                f"<path d='{g}' fill='none' stroke='{INK}' stroke-width='4' stroke-linecap='square'/>", w, h)


def farm_plan() -> Frag:
    W, H = 360, 200
    p = [f"<rect x='0' y='0' width='{W}' height='{H}' fill='#f3f8ea' stroke='{INK}' stroke-width='2'/>",
         f"<line x1='120' y1='0' x2='120' y2='{H}' stroke='{INK}' stroke-width='2'/>",
         f"<line x1='120' y1='100' x2='{W}' y2='100' stroke='{INK}' stroke-width='2'/>",
         f"<rect x='10' y='10' width='40' height='34' fill='{FILL}' {_S}/>", text(30, 60, "shed", 13),
         f"<rect x='60' y='10' width='50' height='40' fill='white' stroke='{INK}' stroke-width='1.6' stroke-dasharray='4 3'/>", text(85, 28, "cattle", 12), text(85, 42, "yard", 12),
         f"<polygon points='15,140 45,118 75,140' fill='{SHADE}' {_S}/><rect x='20' y='140' width='50' height='34' fill='{FILL}' {_S}/>", text(45, 192, "house", 13),
         text(240, 50, "cow paddock", 15),
         f"<ellipse cx='310' cy='92' rx='26' ry='10' fill='{SHADE}' {_S}/>", text(310, 97, "dam", 12),
         f"<rect x='136' y='120' width='60' height='52' fill='{FILL}' {_S}/>", text(166, 190, "stables", 13),
         text(285, 152, "horse paddock", 15)]
    return Frag("".join(p), W, H)


def tool_board() -> Frag:
    tools = {"D1": "saw", "B2": "hammer", "D3": "spanner", "C4": "pliers"}
    cw, ch, ox, oy = 80, 46, 22, 20
    p = []
    for c in range(4):
        p.append(text(ox + c * cw + cw / 2, 14, "ABCD"[c], 14, weight="bold"))
    for r in range(4):
        p.append(text(10, oy + r * ch + ch / 2 + 5, r + 1, 14, weight="bold"))
        for c in range(4):
            p.append(f"<rect x='{ox + c * cw}' y='{oy + r * ch}' width='{cw}' height='{ch}' fill='white' stroke='{INK}' stroke-width='1.6'/>")
    for key, t in tools.items():
        c, r = "ABCD".index(key[0]), int(key[1]) - 1
        x, y = ox + c * cw + 10, oy + r * ch + 12
        if t == "saw":
            p.append(f"<path d='M{x} {y} L{x + 58} {y + 6} L{x + 58} {y + 16} L{x} {y + 20} Z' fill='#e3eaee' {_S}/><rect x='{x - 6}' y='{y - 2}' width='12' height='24' rx='3' fill='{SHADE}' {_S}/>")
        elif t == "hammer":
            p.append(f"<rect x='{x + 10}' y='{y + 8}' width='48' height='7' rx='3' fill='#c9a46a' {_S}/><rect x='{x}' y='{y}' width='14' height='22' rx='2' fill='#9aa5ab' {_S}/>")
        elif t == "spanner":
            p.append(f"<rect x='{x + 10}' y='{y + 7}' width='46' height='8' rx='4' fill='#9aa5ab' {_S}/><path d='M{x + 12} {y + 2} A10 10 0 1 0 {x + 12} {y + 20} L{x + 6} {y + 13} L{x + 6} {y + 9} Z' fill='#9aa5ab' {_S}/>")
        else:
            p.append(f"<path d='M{x} {y + 6} L{x + 22} {y + 11} L{x} {y + 16} Z' fill='#9aa5ab' {_S}/><path d='M{x + 22} {y + 11} Q{x + 40} {y} {x + 58} {y + 2} M{x + 22} {y + 11} Q{x + 40} {y + 22} {x + 58} {y + 20}' fill='none' stroke='{ACCENT}' stroke-width='5' stroke-linecap='round'/>")
    return Frag("".join(p), ox + 4 * cw, oy + 4 * ch)


def picto(kind, s=26) -> Frag:
    """Small grid symbols: smiley, flag, cup, bowtie."""
    if kind == "smiley":
        return Frag(f"<circle cx='13' cy='13' r='11' fill='{SHADE}' {_S}/><circle cx='9' cy='10' r='1.6' fill='{INK}'/><circle cx='17' cy='10' r='1.6' fill='{INK}'/><path d='M8 16 Q13 20 18 16' fill='none' {_S}/>", s, s)
    if kind == "flag":
        return Frag(f"<line x1='5' y1='2' x2='5' y2='24' {_S}/><path d='M5 4 L22 4 L18 10 L22 16 L5 16' fill='white' {_S}/>", s, s)
    if kind == "cup":
        return Frag(f"<path d='M3 4 Q13 14 23 4 Q20 18 13 18 Q6 18 3 4 Z' fill='{SHADE}' {_S}/><line x1='13' y1='18' x2='13' y2='24' {_S}/>", s, s)
    if kind == "bowtie":
        return Frag(f"<path d='M13 13 Q4 0 3 8 Q2 14 13 13 Q4 26 3 18 M13 13 Q22 0 23 8 Q24 14 13 13 Q22 26 23 18' fill='{SHADE}' {_S}/>", s, s)
    raise ValueError(kind)


# ---------- data displays ----------

def table(rows, col_w, title=None, rh=28, size=14) -> Frag:
    """Simple table: rows[0] is the header row. `col_w` = list of column widths."""
    W = sum(col_w)
    p, y = [], 0
    if title:
        p.append(f"<rect x='0' y='0' width='{W}' height='{rh}' fill='{ACCENT}'/>" + text(W / 2, rh - 9, title, size, weight="bold", fill="white"))
        y = rh
    for i, row in enumerate(rows):
        x = 0
        for j, cell in enumerate(row):
            fill = FILL if i == 0 else "white"
            p.append(f"<rect x='{x}' y='{y}' width='{col_w[j]}' height='{rh}' fill='{fill}' stroke='{INK}' stroke-width='1.4'/>")
            if isinstance(cell, Frag):
                p.append(group(cell, x + 8, y + (rh - cell.h) / 2))
            else:
                p.append(text(x + 8, y + rh - 9, cell, size, anchor="start", weight="bold" if i == 0 else "normal"))
            x += col_w[j]
        y += rh
    return Frag("".join(p), W, y)


def tally(n) -> Frag:
    p, x = [], 0
    while n > 0:
        k = min(5, n)
        for i in range(min(k, 4)):
            p.append(f"<line x1='{x + i * 6}' y1='2' x2='{x + i * 6}' y2='18' stroke='{INK}' stroke-width='2'/>")
        if k == 5:
            p.append(f"<line x1='{x - 3}' y1='14' x2='{x + 21}' y2='5' stroke='{INK}' stroke-width='2'/>")
        x += 34; n -= k
    return Frag("".join(p), max(x - 10, 4), 20)


def column_graph(data, title, ymax, ylabel="Number of students", step=1, label_every=1, bw=40, gap=18, scale=14) -> Frag:
    ox, H = 46, ymax * scale
    p = [text(ox + (len(data) * (bw + gap)) / 2, 14, title, 15, weight="bold")]
    top = 26
    for v in range(0, ymax + 1, step):
        y = top + H - v * scale
        p.append(f"<line x1='{ox - 5}' y1='{y}' x2='{ox}' y2='{y}' stroke='{INK}' stroke-width='1.4'/>")
        if v % label_every == 0:
            p.append(text(ox - 9, y + 4, v, 11, anchor="end"))
    p.append(f"<line x1='{ox}' y1='{top}' x2='{ox}' y2='{top + H}' stroke='{INK}' stroke-width='1.6'/>"
             f"<line x1='{ox}' y1='{top + H}' x2='{ox + len(data) * (bw + gap) + gap}' y2='{top + H}' stroke='{INK}' stroke-width='1.6'/>")
    for i, (name, v) in enumerate(data):
        x = ox + gap + i * (bw + gap)
        p.append(f"<rect x='{x}' y='{top + H - v * scale}' width='{bw}' height='{v * scale}' fill='{SHADE}' stroke='{INK}' stroke-width='1.4'/>")
        p.append(text(x + bw / 2, top + H + 18, name, 12))
    p.append(f"<text x='12' y='{top + H / 2}' font-size='12' fill='{INK}' {FONT} text-anchor='middle' transform='rotate(-90 12 {top + H / 2})'>{ylabel}</text>")
    return Frag("".join(p), ox + len(data) * (bw + gap) + gap, top + H + 26)


def icon(kind, half=False) -> Frag:
    s = 22
    body = {"paw": f"<ellipse cx='11' cy='14' rx='6' ry='5' fill='{ACCENT}'/>" + "".join(f"<circle cx='{x}' cy='{y}' r='2.6' fill='{ACCENT}'/>" for x, y in ((4, 7), (9, 4), (14, 4), (19, 7))),
            "ball": f"<ellipse cx='11' cy='11' rx='10' ry='7' fill='{SHADE}' {_S}/><line x1='7' y1='11' x2='15' y2='11' stroke='white' stroke-width='1.6'/>",
            "clock": f"<circle cx='11' cy='11' r='9' fill='white' {_S}/><path d='M11 5 L11 11 L15 11' fill='none' stroke='{INK}' stroke-width='1.6'/>",
            "cherry": f"<circle cx='10' cy='15' r='6' fill='{DARK}' {_S}/><path d='M10 9 Q12 3 17 1' fill='none' stroke='{INK}' stroke-width='1.6'/>"}[kind]
    if half:
        body = f"<clipPath id='h{kind}'><rect x='0' y='0' width='11' height='{s}'/></clipPath><g clip-path='url(#h{kind})'>{body}</g>"
    return Frag(body, s, s)


def picture_graph(kind, data, title, key, vertical=False) -> Frag:
    """`data` = [(label, count)] where count may end in .5."""
    rows = []
    for name, n in data:
        icons = [icon(kind) for _ in range(int(n))] + ([icon(kind, half=True)] if n % 1 else [])
        rows.append((name, icons))
    p = []
    if not vertical:
        lw, y = 90, 28
        p.append(text(lw + 80, 16, title, 14, weight="bold"))
        for name, icons in rows:
            p.append(text(lw - 8, y + 16, name, 13, anchor="end"))
            for i, ic in enumerate(icons):
                p.append(group(ic, lw + i * 26, y))
            y += 28
        W = lw + max(len(i) for _, i in rows) * 26 + 10
        k = icon(kind)
        p.append(group(k, lw, y + 6) + text(lw + 28, y + 22, f"= {key}", 13, anchor="start"))
        return Frag("".join(p), max(W, lw + 80 + len(title) * 4.5, lw + 140), y + 34)
    cw, top = 64, 26
    hmax = max(len(i) for _, i in rows)
    p.append(text(len(rows) * cw / 2, 14, title, 14, weight="bold"))
    for j, (name, icons) in enumerate(rows):
        x = j * cw + (cw - 22) / 2
        for i, ic in enumerate(icons):
            p.append(group(ic, x, top + (hmax - 1 - i) * 24))
        p.append(text(j * cw + cw / 2, top + hmax * 24 + 16, name, 13))
    y = top + hmax * 24 + 28
    p.append(group(icon(kind), 0, y) + text(28, y + 16, f"= {key}", 13, anchor="start"))
    return Frag("".join(p), len(rows) * cw, y + 26)


def spinner(sectors, r=60) -> Frag:
    """`sectors` = [(label, fraction, fill)] clockwise from the top."""
    import math
    p, a = [], 0.0
    for label, f, fill in sectors:
        a2 = a + f * 2 * math.pi
        x1, y1 = r + r * math.sin(a), r - r * math.cos(a)
        x2, y2 = r + r * math.sin(a2), r - r * math.cos(a2)
        large = 1 if f > 0.5 else 0
        p.append(f"<path d='M{r} {r} L{x1:.1f} {y1:.1f} A{r} {r} 0 {large} 1 {x2:.1f} {y2:.1f} Z' fill='{fill}' {_S}/>")
        m = (a + a2) / 2
        p.append(text(r + r * 0.6 * math.sin(m), r - r * 0.6 * math.cos(m) + 5, label, 13, weight="bold"))
        a = a2
    return Frag("".join(p), 2 * r, 2 * r)


def dice(n=5, s=56) -> Frag:
    pos = {1: [(2, 2)], 2: [(1, 1), (3, 3)], 3: [(1, 1), (2, 2), (3, 3)], 4: [(1, 1), (3, 1), (1, 3), (3, 3)],
           5: [(1, 1), (3, 1), (2, 2), (1, 3), (3, 3)], 6: [(1, 1), (3, 1), (1, 2), (3, 2), (1, 3), (3, 3)]}[n]
    return Frag(f"<rect x='1' y='1' width='{s - 2}' height='{s - 2}' rx='9' fill='white' {_S}/>"
                + "".join(f"<circle cx='{x * s / 4}' cy='{y * s / 4}' r='{s * 0.08}' fill='{ACCENT}'/>" for x, y in pos), s, s)


def jelly_dish(beans) -> Frag:
    p = [f"<ellipse cx='170' cy='70' rx='166' ry='50' fill='white' {_S}/>"]
    cols = {"black": "#2b3a42", "red": "#d8473a", "yellow": "#f3d98b", "green": "#7fc28e"}
    for i, b in enumerate(beans):
        x, y = 50 + (i % 5) * 58, 44 + (i // 5) * 36
        tc = "white" if b in ("black", "red") else INK
        p.append(f"<ellipse cx='{x}' cy='{y}' rx='27' ry='13' fill='{cols[b]}' {_S}/>" + text(x, y + 4, b, 11, weight="bold", fill=tc))
    return Frag("".join(p), 340, 122)
