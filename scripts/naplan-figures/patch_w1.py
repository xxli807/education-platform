"""Week 1 fixes: missing picture questions, wrong options, typos (checked against the book photos)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, set_blocks, relink_legacy

c = Content()

# ---------- Week 1 Day 1 ----------
W, D = 1, 1
tys1_blocks = block("Test Your Skills 1 — Counting and base-ten blocks", [
    q("short", "1", "Write down the next five numbers: 854, 855, 856, …", inputs=5, numeric=True),
    q("short", "2", "Write the number shown by the blocks.", numeric=True, figure="w1d1-tys1-q2", alt="3 tens rods and 5 ones cubes", width=200),
    q("short", "3", "Write the number shown by the blocks.", numeric=True, figure="w1d1-tys1-q3", alt="1 hundred flat, 2 tens rods and 3 ones cubes", width=260),
    q("short", "4", "Write the number shown by the blocks.", numeric=True, figure="w1d1-tys1-q4", alt="2 hundreds flats and 4 tens rods", width=320),
    q("short", "5", "Write the number shown by the blocks.", numeric=True, figure="w1d1-tys1-q5", alt="3 hundreds flats and 4 ones cubes", width=380),
], instructions="Use the key: a flat is 100, a rod is 10 and a small cube is 1.", image="w1d1-key")
tys1_tens = block("Test Your Skills 1 — Write the numbers", [
    q("short", "6", "4 tens and 5 ones", numeric=True),
    q("short", "7", "7 hundreds, 5 tens and 2 ones", numeric=True),
    q("short", "8", "8 hundreds, 1 ten and 6 ones", numeric=True),
    q("short", "9", "2 hundreds, 0 tens and 5 ones", numeric=True),
    q("short", "10", "9 hundreds, 8 tens and 0 ones", numeric=True),
], instructions="Write the numbers.")
c.replace_in_day(W, D, "prompt: '609 + 7'", "prompt: '600 + 7'")
# Real Test
c.replace_in_day(W, D, """                options: [
                  '219, 135, 372, 348',
                  '135, 219, 372, 348',
                  '372, 348, 219, 135',
                  '348, 372, 135, 219',
                ],""", """                options: [
                  '219, 135, 372, 348',
                  '135, 219, 372, 348',
                  '135, 219, 348, 372',
                  '135, 372, 348, 219',
                ],""")
c.replace_in_day(W, D, "options: ['400 507', '40 057', '457', '40 507'],", "options: ['400 507', '40 057', '40 507', '457'],")
c.replace_in_day(W, D, """                prompt: 'Write five hundred and ninety-four as a number.',
              },""", """                prompt: 'Write five hundred and ninety-four as a number.',
              },
              """ + q("mcq", "2", "Which shows the number 56?", ["A", "B", "C", "D"], figure="w1d1-rt-q2",
                      alt="A: 5 tens and 6 ones. B: 5 tens and 5 ones. C: 6 tens and 6 ones. D: 6 tens and 5 ones.", width=560, row=True) + ",")
c.replace_in_day(W, D, """                  'eight hundred and four',
                ],
              },""", """                  'eight hundred and four',
                ],
              },
              """ + q("short", "4", "What number is the arrow pointing to on the number line?", numeric=True,
                      figure="w1d1-rt-q4", alt="A number line from 50 with marks every 1, labelled 50, 55 and 60. The arrow points 3 marks past 60.", width=480) + ",")
c.replace_in_day(W, D, """                options: ['100 + 6', '100 + 7', '100 + 8', '100 + 10'],
              },""", """                options: ['100 + 6', '100 + 7', '100 + 8', '100 + 10'],
              },
              """ + ",\n              ".join([
    q("short", "9", "How many stars are shown?", numeric=True, figure="w1d1-rt-q9", alt="Rows of stars: four rows of 10 and one row of 7", width=340),
    q("short", "10", "What is this number?", numeric=True, figure="w1d1-rt-q10", alt="1 hundred flat, 1 tens rod and 7 ones cubes", width=200),
    q("mcq", "11", "Which number is closest to 30?", ["25", "28", "34", "39"]),
    q("short", "12", "Calves on a farm are given a number when they are born. This calf's tag shows 149. What number will be given to the calf that is born next after this one?", numeric=True,
      figure="w1d1-rt-q12", alt="An ear tag showing 149", width=150),
]) + ",")
c.replace_in_day(W, D, """                n: '14',
                prompt: 'Which is not the same as 9 + 7?',""", """                n: '13',
                prompt: 'Which is not the same as 9 + 7?',""")
relink_legacy("Week 1/Day 1/Real Test/14", "Week 1/Day 1/Real Test/13")
c.replace_in_day(W, D, """                options: ['10 + 8', '6 + 10', '7 + 9', '8 + 8'],
              },""", """                options: ['10 + 8', '6 + 10', '7 + 9', '8 + 8'],
              },
              """ + q("mcq", "14", "Which arrow points to 87 on the number line?", ["A", "B", "C", "D"], row=True,
                      figure="w1d1-rt-q14", alt="A number line from 70 to 95 labelled 70, 80 and 90, with arrows A, B, C and D.", width=500) + ",")
c.replace_in_day(W, D, """                  'Write the numbers 603, 360, 630 and 306 in order from largest to smallest.',""",
                 """                  'Write the numbers 603, 360, 630 and 306 in order from largest to smallest.',
                inputs: 4,
                numeric: true,""")
set_blocks(c, W, D, [{"src": tys1_blocks}, {"src": tys1_tens},
                     "Test Your Skills — Partitioning", "Test Your Skills — Place value",
                     "Test Your Skills — Numbers in words", "Test Your Skills — Ordering numbers",
                     "Test Your Skills — Number lines", "Test Your Skills — Missing numbers", "Real Test"])
# Test Your Skills 2 — number line and two-step missing numbers (book has two boxes)
c.replace_in_day(W, D, "prompt: '20, 30, __, __, __, __, __, 80',", "prompt: '20, 30, __, __, 60, 70, __',")
for old, new in [("'8 + 32 = 10 + __'", "'8 + 32 = 10 + __ = __'"),
                 ("'19 + 17 = 20 + __'", "'19 + 17 = 20 + __ = __'"),
                 ("'78 + 16 = 80 + __'", "'78 + 16 = 80 + __ = __'"),
                 ("'22 − 9 = __ − 10'", "'22 − 9 = __ − 10 = __'"),
                 ("'82 − 47 = 85 − __'", "'82 − 47 = __ − 50 = __'")]:
    c.replace_in_day(W, D, f"prompt: {old}", f"prompt: {new}")
c.save()
print("Week 1 Day 1 patched")
