"""Week 2 Day 1 fixes: pictures, missing Real Test questions, book numbering (book IMG_9928-9934). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, J, _blocks_array, heading_of, set_blocks, relink_legacy

c = Content(); W, D = 2, 1
OP = "Test Your Skills — Choose the operation"

def edit(old, new):
    c.replace_in_day(W, D, old, new)

def add_fig(n_prompt_line, figure, alt, width=None):
    """Append figure fields to the question whose prompt source contains `n_prompt_line`."""
    extra = f"figure: 'tests/{figure}.svg', figureAlt: {J(alt)}," + (f" figureWidth: {width}," if width else "")
    a, b = c.day_span(W, D)
    seg = c.s[a:b]
    i = seg.index(n_prompt_line)
    start = seg.rindex("{", 0, i)
    end = start + (lambda s: __import__('patch_util')._match_brace(s, 0))(seg[start:])
    obj = seg[start:end]
    new = obj[:-1].rstrip().rstrip(",") + ", " + extra + " }"
    c.s = c.s[:a] + seg[:start] + new + seg[end:] + c.s[b:]

# --- Test Your Skills 1 ---
edit("{ type: 'short', n: '7', prompt: '5 + 3 = __' }", "{ type: 'short', n: '7', prompt: '__ + 3 = 8' }")
add_fig("Here are some nails.", "w2d1-tys1-nails", "Nine nails", 300)
add_fig("Here are some paperclips.", "w2d1-tys1-paperclips", "Thirteen paperclips", 220)

# --- Test Your Skills 2 ---
edit("prompt: '3 + 3 + 3 + 3 = __ × 3'", "prompt: '3 + 3 + 3 + 3 + 3 = __ × 3'")
edit("prompt: '2 + 2 + 2 + 2 + 2 + 2 + 2 = __ × 2'", "prompt: '2 + 2 + 2 + 2 + 2 + 2 + 2 = __ × __'")
edit("prompt: 'The number of drinks in 5 packs would be 5 × __'", "prompt: 'The number of drinks in 5 packs would be 5 × __ = __'")
add_fig("Here is a pack of drinks.", "w2d1-tys2-drinks", "A pack of 6 drink cans: 2 rows of 3", 130)
add_fig("Here are some pencils.", "w2d1-tys2-pencils", "Twelve pencils in two columns of 6", 300)

# --- Real Test: move 11-15 into their own Test Your Skills block, then rebuild in book order ---
_, _, items = _blocks_array(c, W, D)
rt = next(i for i in items if heading_of(i) == "Real Test")
qs = rt[rt.index("questions: [") + len("questions: ["):]
objs, j = [], 0
mb = __import__('patch_util')._match_brace
while True:
    k = qs.find("{", j)
    if k == -1: break
    e = mb(qs, k); objs.append(qs[k:e]); j = e
by_n = {re.search(r"n: '(\d+)'", o).group(1): o for o in objs}
assert sorted(by_n, key=int) == [str(i) for i in range(11, 27)], sorted(by_n)

def renum(n_old, n_new, **figs):
    o = re.sub(r"n: '\d+'", f"n: '{n_new}'", by_n[n_old], count=1)
    if figs:
        o = o[:-1].rstrip().rstrip(",") + f", figure: 'tests/{figs['figure']}.svg', figureAlt: {J(figs['alt'])}" + (f", figureWidth: {figs['width']}" if figs.get('width') else "") + " }"
    return o

op_block = block(OP, [by_n[str(n)] for n in range(11, 16)], numeric=None,
                 instructions="Which one of these would be used to work out the answer to each problem? Choose A 6 + 2, B 6 − 2, C 6 × 2 or D 6 ÷ 2.")

q2 = renum("16", 2).replace("options: ['6 + 3', '6 − 3', '6 × 3', '6 ÷ 3']", "options: ['6 ÷ 3', '6 + 3', '6 × 3', '6 − 3']")
assert "6 ÷ 3', '6 + 3'" in q2
real = [
    q("mcq", 1, "Molly had these pencils. She gave 3 to Ken. How many pencils did Molly have left?", ["3", "4", "5", "6"],
      figure="w2d1-rt-q1", alt="Nine pencils", width=140),
    q2,
    renum("17", 3),
    renum("18", 4, figure="w2d1-rt-q4", alt="A pack of 4 tennis balls", width=220),
    renum("19", 5), renum("20", 6), renum("21", 7), renum("22", 8),
    q("short", 9, "What numbers go in the boxes to show the number of candles in the picture? __ × 5 candles = __ candles",
      figure="w2d1-rt-q9", alt="Three candle holders, each with 5 candles", width=420, numeric=True),
    q("mcq", 10, "Here are 3 rows of 8 books. This is the same as 6 rows of how many books?", ["4", "6", "8", "16"],
      figure="w2d1-rt-q10", alt="A bookshelf with 3 rows of 8 books", width=170),
    renum("23", 11),
    renum("24", 12, figure="w2d1-rt-q12", alt="Three plates, each with 4 cakes", width=420),
    renum("25", 13),
    renum("26", 14, figure="w2d1-rt-q14", alt="Eighteen marbles", width=260),
    q("mcq", 15, "Two girls each play with 3 toy cars. Which shows the number of cars the girls play with?", ["A", "B", "C", "D"],
      figure="w2d1-rt-q15", alt="A: 4 cars. B: 5 cars. C: 6 cars. D: 8 cars.", width=420, row=True),
]
real_block = block("Real Test", real)

order = [h for h in [heading_of(i) for i in items] if h != "Real Test"]
c.s = c.s.replace(rt, "{ heading: 'Real Test__TMP', questions: [] }", 1)
set_blocks(c, W, D, order + [{"src": op_block}, "Real Test__TMP"])
c.s = c.s.replace("{ heading: 'Real Test__TMP', questions: [] }", real_block, 1)
c.save()

base = "Week 2/Day 1/"
for n in range(11, 16):
    relink_legacy(f"{base}Real Test/{n}", f"{base}{OP}/{n}")
for old, new in [(16, 2), (17, 3), (18, 4), (19, 5), (20, 6), (21, 7), (22, 8), (23, 11), (24, 12), (25, 13), (26, 14)]:
    relink_legacy(f"{base}Real Test/{old}", f"{base}Real Test/{new}")
print("ok")
