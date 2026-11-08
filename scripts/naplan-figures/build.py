"""Regenerate every redrawn workbook picture into public/tests/.

Each entry is named after where it lives in the book: w<week>d<day>-<section>-q<n>.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from figs import (Frag, bead_string, blocks, blocks_key, caption, card_columns,  # noqa: E402
                  choices, ear_tag, hstack, number_line, save, shape_icon, shape_row,
                  star_rows, stick_diamonds, stick_triangle_pyramid, straw_houses, vstack,
                  objects, scattered, candelabras, bookshelf, plates, coins, note, frac_grid,
                  frac_wheel, frac_triangle_top, fruit, balloons, text, clue,
                  iso_blocks, rect_prism, tri_prism, square_pyramid, solid, shape2d, jug, ribbons,
                  instrument, dog, stamp_card, shaded_grid, bucket, venn_cts, labelled,
                  clock, calendar, balance, chip_row, clue2, label_grid, plane_icon, face, red_rock_map,
                  flip_panel, block_arrow, thin_arrow, polyomino, counter_grid, card_glyph, farm_plan, tool_board, picto,
                  table, tally, column_graph, picture_graph, spinner, dice, jelly_dish)

FIGS = {}


def fig(name):
    def deco(fn):
        FIGS[name] = fn
        return fn
    return deco


# ---------------- Week 1 Day 1: numbers and place value ----------------

@fig("w1d1-key")
def _():
    return blocks_key()


@fig("w1d1-tys1-q2")
def _():
    return blocks(0, 3, 5)


@fig("w1d1-tys1-q3")
def _():
    return blocks(1, 2, 3)


@fig("w1d1-tys1-q4")
def _():
    return blocks(2, 4, 0)


@fig("w1d1-tys1-q5")
def _():
    return blocks(3, 0, 4)


@fig("w1d1-rt-q2")
def _():
    return choices([blocks(0, 5, 6), blocks(0, 5, 5), blocks(0, 6, 6), blocks(0, 6, 5)])


@fig("w1d1-rt-q4")
def _():
    return number_line(50, 64, labels=(50, 55, 60), length=440, arrow_at=63)


@fig("w1d1-rt-q9")
def _():
    return star_rows([10, 10, 10, 10, 7])


@fig("w1d1-rt-q10")
def _():
    return blocks(1, 1, 7)


@fig("w1d1-rt-q12")
def _():
    return ear_tag("149")


@fig("w1d1-rt-q14")
def _():
    return number_line(70, 95, labels=(70, 80, 90), length=460,
                       arrows={"A": 85, "B": 87, "C": 88, "D": 95})


# ---------------- Week 1 Day 2: patterns and number sentences ----------------

@fig("w1d2-tys1-shapes")
def _():
    return shape_row(["square", "circle", "triangle", "circle", "ddiamond"] * 3 + ["square", "circle"])


@fig("w1d2-tys1-diamonds")
def _():
    return hstack([caption(stick_diamonds(n), f"Shape {n}") for n in (1, 2, 3)], gap=40)


@fig("w1d2-tys1-houses")
def _():
    return hstack([caption(straw_houses(n), f"Shape {n}") for n in (1, 2, 3, 4)], gap=36)


@fig("w1d2-rt-q4")
def _():
    beads = ["sdiamond", "diamond", "circle", "dsquare"] * 3 + ["sdiamond"]
    one = lambda k: Frag(shape_icon(k, 16, 16, 30), 32, 32)
    return vstack([bead_string(beads), choices([one("circle"), one("diamond"), one("dsquare"), one("ddiamond")], gap=50)], gap=26)


@fig("w1d2-rt-q10")
def _():
    return hstack([caption(card_columns(c), f"{sum(c)} cards") for c in ([2, 1, 2], [3, 2, 3], [4, 3, 4])], gap=40)


@fig("w1d2-rt-q13")
def _():
    return shape_row(["burst", "square", "square", "ddiamond", "square", "square", "square"] * 2 + ["burst"])


@fig("w1d2-rt-q16")
def _():
    return hstack([caption(stick_triangle_pyramid(n), f"{s} sticks") for n, s in ((1, 3), (2, 9), (3, 18), (4, 30))], gap=30)


# ---------------- Week 2 Day 1: + − × ÷ ----------------

@fig("w2d1-tys1-nails")
def _():
    return scattered("nail", 9, 5)


@fig("w2d1-tys1-paperclips")
def _():
    return scattered("paperclip", 13, 5, jitter=4)


@fig("w2d1-tys2-drinks")
def _():
    return objects("can", [3, 3], gap=4, row_gap=4)


@fig("w2d1-tys2-pencils")
def _():
    return hstack([objects("pencil", [1] * 6, row_gap=6), objects("pencil", [1] * 6, row_gap=6)], gap=24)


@fig("w2d1-rt-q1")
def _():
    return objects("pencil", [1] * 9, row_gap=5)


@fig("w2d1-rt-q4")
def _():
    balls = objects("ball", [4], gap=4)
    return Frag(f"<rect x='0' y='0' width='{balls.w + 16}' height='{balls.h + 16}' fill='#e6eef2' stroke='#1f3b4d' stroke-width='2'/>" + f"<g transform='translate(8,8)'>{balls.svg}</g>", balls.w + 16, balls.h + 16)


@fig("w2d1-rt-q9")
def _():
    return candelabras(3)


@fig("w2d1-rt-q10")
def _():
    return bookshelf(3, 8)


@fig("w2d1-rt-q12")
def _():
    return plates(3, 4)


@fig("w2d1-rt-q14")
def _():
    return scattered("marble", 18, 6, jitter=10, gap=12)


@fig("w2d1-rt-q15")
def _():
    rows = {"A": [2, 2], "B": [2, 3], "C": [2, 2, 2], "D": [3, 3, 2]}
    from figs import text
    lines = []
    for k, layout in rows.items():
        cars = objects("car", [layout], gap=4)
        lines.append(Frag(text(10, 18, k, 17, weight="bold") + f"<g transform='translate(34,0)'>{cars.svg}</g>", cars.w + 34, cars.h))
    return vstack(lines, gap=14)



# ---------------- Week 2 Day 2: fractions and money ----------------

def _row_shaded(cols, k):
    return {(0, c) for c in range(k)}


FRAC_TYS = {
    4: frac_grid(2, 1, {(0, 0)}, cw=150, ch=36),
    5: frac_grid(1, 4, {(0, 0)}, cw=38, ch=70),
    6: frac_grid(2, 4, {(0, 0)}, cw=38, ch=36),
    7: frac_grid(1, 2, {(0, 0)}, cw=76, ch=70),
    8: frac_grid(1, 4, _row_shaded(4, 3), cw=38, ch=70),
    9: frac_grid(2, 4, {(0, 0), (0, 2), (1, 1), (1, 3)}, cw=38, ch=36),
    10: frac_grid(2, 4, _row_shaded(4, 3), cw=38, ch=36),
}
for _n, _f in FRAC_TYS.items():
    fig(f"w2d2-tys1-q{_n}")(lambda f=_f: f)


@fig("w2d2-tys1-cars")
def _():
    return objects("car", [4, 4], gap=14, row_gap=14)


@fig("w2d2-tys1-oranges")
def _():
    return hstack([fruit("orange")] * 4, gap=12)


@fig("w2d2-tys2-coins")
def _():
    return coins(["50c", "20c", "10c", "5c", "$1", "$2"])


@fig("w2d2-tys2-two-coins")
def _():
    return coins(["50c", "20c"], gap=16)


@fig("w2d2-tys2-three-coins")
def _():
    return coins(["5c", "10c", "$1"], gap=16)


@fig("w2d2-tys2-notes")
def _():
    return vstack([hstack([note(50), note(5)], gap=12), hstack([note(10), note(20)], gap=12)], gap=12)


@fig("w2d2-rt-q1")
def _():
    bundle = objects("pencil", [1] * 4, row_gap=4)
    return hstack([bundle] * 3, gap=20)


@fig("w2d2-rt-q2")
def _():
    return vstack([coins(["$2", "20c", "5c"]), coins(["$2", "$1", "10c"])], gap=10)


@fig("w2d2-rt-q3")
def _():
    return fruit("orange", cut=True)


@fig("w2d2-rt-q4")
def _():
    return choices([frac_grid(1, 10, {(0, 0)}, cw=12, ch=96), frac_wheel(8, {2}),
                    frac_wheel(7, {0}, polygon=True), frac_wheel(6, {1}, polygon=True)], gap=36)


@fig("w2d2-rt-q5")
def _():
    rows = {"A": ["20c", "$2", "$1"], "B": ["$2", "$1", "50c"], "C": ["20c", "10c", "$2"], "D": ["$1", "10c", "5c"]}
    out = []
    for k, vals in rows.items():
        c = coins(vals, gap=12)
        out.append(Frag(text(10, c.h / 2 + 6, k, 17, weight="bold") + f"<g transform='translate(32,0)'>{c.svg}</g>", c.w + 32, c.h))
    return vstack(out, gap=12)


@fig("w2d2-rt-q6")
def _():
    return hstack([fruit("apple")] * 3, gap=14)


@fig("w2d2-rt-q7")
def _():
    return vstack([coins(["50c", "20c", "10c", "5c"]), coins(["$1", "20c", "5c"])], gap=10)


@fig("w2d2-rt-q8")
def _():
    return choices([frac_triangle_top(), frac_grid(1, 4, {(0, 1)}, cw=26, ch=86),
                    frac_grid(3, 1, {(0, 0)}, cw=50, ch=30), frac_wheel(8, {0, 2, 4, 6}, r=44)], gap=36)


@fig("w2d2-rt-q10")
def _():
    return vstack([hstack([note(50), note(20)], gap=12), hstack([note(20)], gap=12),
                   hstack([note(10), note(5)], gap=12)], gap=12, align="center")


@fig("w2d2-rt-q11")
def _():
    return balloons(12)


@fig("w2d2-rt-q12")
def _():
    before = coins(["50c", "5c", "5c", "5c", "50c", "20c"], gap=8)
    after = coins(["50c", "5c"], gap=8)
    return vstack([caption(before, "Ellen's coins"), caption(after, "Coins left after buying the banana")], gap=18)



# ---------------- Week 2 Day 3: spelling picture clues ----------------

for _k in ("fly", "stamp", "hand", "skunk", "bell", "mask", "belt", "cat"):
    fig(f"w2d3-clue-{_k}")(lambda k=_k: clue(k))



# ---------------- Week 3 Day 1: measurement and shape ----------------

@fig("w3d1-tys1-instruments")
def _():
    return choices([instrument(k) for k in ("kitchen-scales", "thermometer", "timer", "jug", "ruler")], letters="ABCDE", gap=26, per_row=5)


@fig("w3d1-tys1-ribbons")
def _():
    return ribbons([("Red", 230), ("Yellow", 130), ("Blue", 290), ("Pink", 170), ("Green", 205)])


@fig("w3d1-tys1-jugs")
def _():
    return choices([jug(1, 1, [1], h=70), jug(4, 2.3, [2, 4], h=100), jug(2, 0.5, [1, 2], h=80), jug(5, 1, [1, 2, 3, 4, 5], h=110)], gap=22)


@fig("w3d1-tys1-shapes")
def _():
    return choices([shape2d("triangle", 90, "#7fb9d6"), shape2d("square", 70, "#7fb9d6"), shape2d("circle", 76, "#7fb9d6"),
                    shape2d("rect-wide", 70, "#7fb9d6")], gap=30)


@fig("w3d1-tys2-shapes")
def _():
    row1 = hstack([shape2d("triangle", 70), shape2d("rect-tall", 60), shape2d("right-triangle", 70), shape2d("circle", 56),
                   shape2d("rect-thin", 50), shape2d("tall-triangle", 60)], gap=18, valign="middle")
    row2 = hstack([shape2d("rect-flat", 60), shape2d("parallelogram", 60), shape2d("scalene", 50), shape2d("circle", 34),
                   shape2d("octagon", 54)], gap=18, valign="middle")
    return vstack([row1, row2], gap=18)


@fig("w3d1-tys2-rect-prism")
def _():
    return rect_prism(140, 45, 40, 26)


@fig("w3d1-tys2-tri-prism")
def _():
    return tri_prism(100, 90, 55, 32)


@fig("w3d1-tys2-solids")
def _():
    return choices([solid("cylinder"), solid("cone"), solid("pyramid"), solid("cube")], gap=30)


@fig("w3d1-tys2-pavers")
def _():
    return frac_grid(3, 4, {(0, 0), (0, 1), (1, 0)}, cw=48, ch=30)


@fig("w3d1-tys2-blocks")
def _():
    one = iso_blocks(1, 1, 1, s=22)
    return vstack([caption(one, "One block"),
                   hstack([caption(iso_blocks(2, 3, 3), "19"), caption(iso_blocks(4, 2, 2), "20")], gap=50)], gap=16)


@fig("w3d1-rt-q1")
def _():
    return choices([dog(14, 46), dog(44, 50), dog(64, 62), dog(24, 28)], gap=24)


@fig("w3d1-rt-q2")
def _():
    return solid("cylinder-side", 70)


@fig("w3d1-rt-q3")
def _():
    return choices([shape2d("trapezium", 60), shape2d("triangle", 60), shape2d("arrow", 52), shape2d("right-triangle", 60).__class__(
        "<polygon points='0,60 70,60 0,0' fill='white' stroke='#1f3b4d' stroke-width='2' stroke-linejoin='round'/>", 70, 60),
        shape2d("scalene", 50), shape2d("hexagon", 60)], letters="ABCDEF", gap=26, per_row=6)


@fig("w3d1-rt-q4")
def _():
    return square_pyramid()


@fig("w3d1-rt-q5")
def _():
    return choices([instrument("stopwatch"), instrument("bathroom-scales"), instrument("tape-measure"), instrument("kitchen-scales")], gap=30)


@fig("w3d1-rt-q6")
def _():
    return stamp_card(5, 3, [(0, 0), (0, 1), (0, 2), (1, 0)])


@fig("w3d1-rt-q7")
def _():
    return venn_cts()


@fig("w3d1-rt-q8")
def _():
    return hstack([caption(iso_blocks(1, 1, 1), "One block"), iso_blocks(3, 3, 3)], gap=40)


@fig("w3d1-rt-q9")
def _():
    row1 = hstack([shape2d("triangle", 70), shape2d("rect-wide", 60), shape2d("circle", 60), shape2d("parallelogram", 60)], gap=18, valign="middle")
    row2 = hstack([shape2d("tall-triangle", 60), shape2d("parallelogram", 52), shape2d("rect-tall", 58), shape2d("ellipse", 60)], gap=18, valign="middle")
    return vstack([row1, row2], gap=18)


@fig("w3d1-rt-q10")
def _():
    return bucket(0.55)


@fig("w3d1-rt-q11")
def _():
    return rect_prism(150, 55, 45, 28)


@fig("w3d1-rt-q12")
def _():
    return choices([shaded_grid(10, 6, 1, 1, 7, 3), shaded_grid(7, 8, 1, 2, 5, 4), shaded_grid(11, 5, 1, 1, 9, 2), shaded_grid(6, 8, 1, 1, 3, 5)], gap=20)



# ---------------- Week 3 Day 2: time and mass ----------------

for _n, (_h, _m) in enumerate([(5, 0), (7, 0), (11, 0), (3, 30), (9, 30), (1, 30), (12, 15), (7, 15), (10, 15), (1, 45), (5, 45), (8, 45)], 1):
    fig(f"w3d2-tys1-clock{_n}")(lambda h=_h, m=_m: clock(h, m))


@fig("w3d2-tys1-may")
def _():
    return calendar("MAY", 3, 31)


@fig("w3d2-tys2-balances")
def _():
    return hstack([caption(balance(("blue", "A"), ("grey", "B"), "left"), "A or B"),
                   caption(balance(("grey", "C"), ("blue", "D"), "right"), "C or D")], gap=30)


@fig("w3d2-rt-q1")
def _():
    return clock(4, 45, r=56)


@fig("w3d2-rt-q2")
def _():
    return calendar("July 2012", 0, 31)


@fig("w3d2-rt-q3")
def _():
    return choices([clock(4, 50, r=34), instrument("thermometer"), instrument("tape-measure"), instrument("kitchen-scales")], gap=34)


@fig("w3d2-rt-q4")
def _():
    return clock(8, 0, r=56, minute_hand=False)


@fig("w3d2-rt-q5")
def _():
    return hstack([caption(clock(h, m, r=44), f"Clock {i}") for i, (h, m) in enumerate([(5, 45), (6, 45), (5, 15), (6, 15)], 1)], gap=22)


@fig("w3d2-rt-q8")
def _():
    return calendar("September", 1, 30)


@fig("w3d2-rt-q10")
def _():
    scales = hstack([balance(("blue", None), ("grey", None), "left"), balance(("blue", None), ("dark", None), "right")], gap=30)
    opts = choices([chip_row(["blue", "grey", "dark"]), chip_row(["grey", "dark", "blue"]), chip_row(["dark", "blue", "grey"]),
                    chip_row(["grey", "blue", "dark"])], gap=40)
    return vstack([scales, opts], gap=24)


@fig("w3d2-rt-q12")
def _():
    return calendar("December", 4, 31)



# ---------------- Week 3 Day 3: silent e pictures ----------------

for _k in ("plane", "plate", "snake", "bike"):
    fig(f"w3d3-clue-{_k}")(lambda k=_k: clue2(k))



# ---------------- Week 4 Day 1: location and transformation ----------------

_P = "fill='#7fb9d6' stroke='#1f3b4d' stroke-width='2' stroke-linejoin='round'"


def _poly(pts, fill=_P):
    return f"<polygon points='{pts}' {fill}/>"


def _mx(pts, axis=120):  # mirror x across a vertical line
    return " ".join(f"{axis - float(x)},{y}" for x, y in (p.split(",") for p in pts.split()))


def _my(pts, axis=110):
    return " ".join(f"{x},{axis - float(y)}" for x, y in (p.split(",") for p in pts.split()))


@fig("w4d1-tys1-grid")
def _():
    return label_grid({"A4": "bank", "B4": "butcher", "C4": "bakery", "D4": "post\noffice", "A3": "fruit\nshop", "B3": "chemist", "C3": "doctor",
                       "D3": "dentist", "A2": "school", "B2": "park", "C2": "library", "D2": "church", "A1": "pool", "B1": "skate\npark",
                       "C1": "gym", "D1": "garage"}, 4, 4)


@fig("w4d1-tys1-friends")
def _():
    back = hstack([caption(face(k, 56), n) for k, n in (("girl", "Jo"), ("girl", "Kim"), ("woman", "Lee"), ("man", "Bill"))], gap=24)
    front = hstack([caption(face(k, 60), n) for k, n in (("woman", "Helen"), ("oldman", "Dan"), ("girl", "Jane"), ("boy", "Bob"))], gap=20)
    return vstack([caption(back, "Back row"), caption(front, "Front row")], gap=14)


@fig("w4d1-tys1-map")
def _():
    return red_rock_map()


@fig("w4d1-tys2-grid")
def _():
    return label_grid({"D2": plane_icon()}, 7, 5, cw=44, ch=36)


_CORNER = "20,34 46,34 46,12 56,12 56,44 20,44"


@fig("w4d1-tys2-q8")
def _():
    first = flip_panel(_poly(_CORNER))
    slide = " ".join(f"{float(x) + 44},{y}" for x, y in (p.split(",") for p in _CORNER.split()))
    half = " ".join(f"{184 - float(x) - 64},{56 - float(y)}" for x, y in (p.split(",") for p in _CORNER.split()))
    vflip = " ".join(f"{x},{56 - float(y)}" for x, y in (p.split(",") for p in slide.split()))
    opts = [flip_panel(_poly(_CORNER), mirror=_poly(slide)), flip_panel(_poly(_CORNER), mirror=_poly(_mx(_CORNER))),
            flip_panel(_poly(_CORNER), mirror=_poly(half)), flip_panel(_poly(_CORNER), mirror=_poly(vflip))]
    return vstack([first, choices(opts, gap=24, per_row=2)], gap=20)


_TRI = "14,46 46,46 46,14"


@fig("w4d1-tys2-q9")
def _():
    first = flip_panel(_poly(_TRI), w=60, h=110, axis="h")
    bottoms = ["14,64 14,96 46,96", "14,64 46,64 30,96", "14,96 46,96 46,64", _my(_TRI)]
    return hstack([first, choices([flip_panel(_poly(_TRI), w=60, h=110, axis="h", mirror=_poly(b)) for b in bottoms], gap=24)], gap=40, valign="bottom")


@fig("w4d1-tys2-arrows")
def _():
    return vstack([caption(block_arrow(0), "This arrow is being turned."), choices([block_arrow(a) for a in (-90, 180, 90, 0)], gap=24)], gap=16, align="center")


@fig("w4d1-rt-q1")
def _():
    return farm_plan()


@fig("w4d1-rt-q2")
def _():
    tri = "18,46 52,46 35,12"
    example = hstack([flip_panel(_poly(tri)), Frag("<path d='M4 28 L40 28 M30 20 L40 28 L30 36' fill='none' stroke='#1a7fa6' stroke-width='3'/>", 44, 56),
                      flip_panel(_poly(tri), mirror=_poly(_mx(tri)))], gap=10, valign="middle")
    shapes = ["18,10 52,10 40,28 52,46 18,46", "18,22 36,22 36,10 46,10 46,46 36,46 36,34 18,34",
              "28,10 42,10 52,20 52,36 42,46 28,46 18,36 18,20", "18,46 52,46 52,10",
              "18,10 26,10 26,24 44,24 44,10 52,10 52,46 44,46 44,32 26,32 26,46 18,46", "30,10 40,10 40,36 52,36 52,46 18,46 18,36 30,36"]
    return vstack([caption(example, "This shape looks the same when it is flipped over the dotted line."),
                   choices([flip_panel(_poly(sh)) for sh in shapes], letters="ABCDEF", gap=28, per_row=3)], gap=22)


@fig("w4d1-rt-q3")
def _():
    grid = label_grid({"B4": picto("smiley"), "E3": picto("flag"), "E2": picto("cup"), "F2": picto("bowtie")}, 7, 5, cw=40, ch=34)
    return vstack([grid, choices([picto(k) for k in ("smiley", "bowtie", "cup", "flag")], gap=40)], gap=18)


@fig("w4d1-rt-q4")
def _():
    return vstack([caption(card_glyph("orig"), "Elly’s card"), choices([card_glyph(k) for k in ("F", "orig", "mirror", "half")], gap=30)], gap=16, align="center")


@fig("w4d1-rt-q5")
def _():
    return vstack([caption(counter_grid(11, 5, (2, 5)), "Before the slide"),
                   choices([counter_grid(11, 5, at) for at in ((3, 8), (2, 8), (3, 2), (2, 2))], gap=26, per_row=2)], gap=18)


@fig("w4d1-rt-q6")
def _():
    paper = Frag("<rect x='0' y='0' width='100' height='60' fill='#cfe8f3' stroke='#1f3b4d' stroke-width='1.8'/>"
                 "<line x1='50' y1='0' x2='50' y2='60' stroke='#1f3b4d' stroke-width='1.6' stroke-dasharray='4 4'/>", 100, 60)
    folded = Frag("<rect x='0' y='0' width='50' height='60' fill='#cfe8f3' stroke='#1f3b4d' stroke-width='1.8'/>"
                  "<polygon points='50,18 40,26 40,46 50,46' fill='white' stroke='#1f3b4d' stroke-width='1.8'/>"
                  "<line x1='50' y1='0' x2='50' y2='60' stroke='#1f3b4d' stroke-width='1.6' stroke-dasharray='4 4'/>", 50, 60)
    W = "fill='white' stroke='#1f3b4d' stroke-width='1.8'"
    def opened(*holes):
        return Frag("<rect x='0' y='0' width='100' height='60' fill='#cfe8f3' stroke='#1f3b4d' stroke-width='1.8'/>"
                    + "".join(f"<polygon points='{h}' {W}/>" for h in holes)
                    + "<line x1='50' y1='0' x2='50' y2='60' stroke='#1f3b4d' stroke-width='1.6' stroke-dasharray='4 4'/>", 100, 60)
    opts = [opened("30,22 38,22 38,44 30,44", "100,20 90,24 90,40 100,44"), opened("50,18 60,26 60,46 40,46 40,26"),
            opened("32,28 38,20 44,28 44,46 32,46"), opened("50,14 60,22 60,40 50,48 40,40 40,22")]
    return vstack([hstack([caption(paper, "Lucy’s paper"), caption(folded, "Folded and cut")], gap=40), choices(opts, gap=26, per_row=2)], gap=20)


@fig("w4d1-rt-q7")
def _():
    return tool_board()


@fig("w4d1-rt-q8")
def _():
    bent = lambda turn: Frag(f"<g transform='rotate({turn} 30 30)'><path d='M14 50 L14 14 L44 14' fill='none' stroke='#1a7fa6' stroke-width='4'/>"
                             "<polygon points='44,6 56,14 44,22' fill='#1a7fa6'/></g>", 60, 60)
    example = hstack([caption(bent(0), "This arrow"), caption(bent(90), "after a quarter turn clockwise")], gap=30)
    return vstack([example, caption(thin_arrow(-45), "What will this arrow look like?"),
                   choices([thin_arrow(a) for a in (-45, 135, -135, 45)], gap=30)], gap=18, align="center")


@fig("w4d1-rt-q9")
def _():
    billy = polyomino([(0, 0), (0, 1), (0, 2), (1, 2), (1, 3), (2, 3)], shaded=[(0, 1)], dot=(0, 2))
    opts = [polyomino([(0, 0), (0, 1), (1, 1), (1, 2), (2, 2), (3, 2)], shaded=[(2, 2)], dot=(0, 1)),
            polyomino([(0, 0), (1, 0), (1, 1), (2, 1), (2, 2), (2, 3)], shaded=[(2, 2)], dot=(2, 1)),
            polyomino([(0, 0), (0, 1), (0, 2), (1, 2), (1, 3), (2, 2)], shaded=[(0, 1)], dot=(1, 2)),
            polyomino([(0, 1), (0, 2), (0, 3), (1, 0), (1, 1), (2, 0)], shaded=[(0, 2)], dot=(1, 1))]
    return vstack([caption(billy, "Billy’s shape"), choices(opts, gap=34)], gap=20)


@fig("w4d1-rt-q10")
def _():
    row = hstack([face(k, 56) for k in ("oldman", "boy", "girl", "oldwoman", "beard")], gap=14)
    return vstack([row, choices([face(k, 56) for k in ("boy", "beard", "girl", "oldwoman")], gap=34)], gap=22)



# ---------------- Week 4 Day 2: chance and data ----------------

@fig("w4d2-tys1-races")
def _():
    return table([["Name", "Number of races"], ["Max", "3"], ["Ben", "7"], ["Bella", "5"], ["Tara", "4"], ["Jack", "2"]], [90, 150])


@fig("w4d2-tys1-fruit")
def _():
    return column_graph([("Apple", 9), ("Banana", 12), ("Orange", 7), ("Peach", 5), ("Plum", 1)], "Favourite fruit", 12, label_every=1, bw=44, scale=16)


@fig("w4d2-tys1-zoo")
def _():
    return picture_graph("paw", [("Lion", 5), ("Tiger", 3), ("Elephant", 4), ("Koala", 6), ("Gorilla", 7)], "Favourite zoo animals", "1 student", vertical=True)


@fig("w4d2-tys2-football")
def _():
    return picture_graph("ball", [("Rams", 3), ("Sharks", 5), ("Bears", 2.5), ("Lions", 4), ("Bulls", 4.5)], "Favourite football team", "2 votes")


@fig("w4d2-tys2-half-ball")
def _():
    from figs import icon
    return icon("ball", half=True)


@fig("w4d2-tys2-dice")
def _():
    return dice(5, 70)


@fig("w4d2-tys2-spinner")
def _():
    return spinner([("white", 0.42, "white"), ("red", 0.12, "#e3eaee"), ("blue", 0.2, "#7fb9d6"), ("green", 0.26, "#cfe8f3")], r=70)


@fig("w4d2-tys2-tally")
def _():
    return vstack([Frag("".join([]), 0, 0)] + [hstack([Frag(f"<text x='0' y='16' font-size='15' font-weight='bold' fill='#1a7fa6' font-family='Helvetica, Arial, sans-serif'>{n}</text>", 30, 20), tally(t)], gap=4)
                                               for n, t in ((12, 3), (13, 5), (14, 9), (15, 20))], gap=14)


@fig("w4d2-rt-q1")
def _():
    return table([["Movie", "Number of votes"], ["Good Times", "7"], ["Old Dogs", "10"], ["Red and Blue", "8"], ["Kangaroos", "13"]], [130, 140], title="Favourite movie")


@fig("w4d2-rt-q2")
def _():
    return jelly_dish(["black", "red", "yellow", "green", "red", "yellow", "red", "black", "black", "red"])


@fig("w4d2-rt-q3")
def _():
    return picture_graph("clock", [("Monday", 3), ("Tuesday", 5), ("Wednesday", 3.5), ("Thursday", 7), ("Friday", 6)], "Hours Mr Lee spent at work", "1 hour")


@fig("w4d2-rt-q4")
def _():
    return column_graph([("White", 12), ("Red", 6), ("Blue", 5), ("Silver", 8), ("Black", 3)], "Colour of cars in car park", 12, ylabel="Number of cars", label_every=2, bw=44, scale=16)


@fig("w4d2-rt-q5")
def _():
    return table([["Name", "Tally"], ["Ahmed", tally(7)], ["Billy", tally(4)], ["Mia", tally(5)], ["Jenny", tally(3)], ["Xavier", tally(6)]], [90, 110])


@fig("w4d2-rt-q6")
def _():
    return spinner([("1", 0.25, "#cfe8f3"), ("2", 0.125, "#e3eaee"), ("3", 0.5, "#7fb9d6"), ("4", 0.125, "white")])


@fig("w4d2-rt-q7")
def _():
    return table([["Class", "Boys", "Girls"], ["2K", "13", "14"], ["2P", "15", "11"], ["2Y", "12", "12"]], [80, 80, 80])


@fig("w4d2-rt-q8")
def _():
    return picture_graph("cherry", [("Mike", 3.5), ("Jill", 6), ("Alice", 2.5), ("Roy", 4.5)], "Number of cherries eaten", "2 cherries", vertical=True)


@fig("w4d2-rt-q9")
def _():
    return hstack([dice(5), dice(6)], gap=12)


@fig("w4d2-rt-q10")
def _():
    return table([["Name", "Sid", "Dana", "Ruby", "Nat", "Eli", "Sam"], ["Birds", "8", "5", "2", "9", "4", "6"]], [70] + [56] * 6)


if __name__ == "__main__":
    only = set(sys.argv[1:])
    for name, fn in FIGS.items():
        if only and name not in only:
            continue
        path = save(name, fn())
        print(path)
