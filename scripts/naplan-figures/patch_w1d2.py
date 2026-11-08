"""Week 1 Day 2 fixes (checked against book photos IMG_9908-9911). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, set_blocks, relink_legacy, list_headings

c = Content(); W, D = 1, 2
r = lambda old, new: c.replace_in_day(W, D, old, new)

# Test Your Skills 1: correct shape pattern, real pictures for sticks/straws, missing Q13
r("""              'Here is a pattern of shapes: □ ○ △ ◇ ◆ □ □ ○ △ ◇ □ □ ○ □ …',""",
  """              'Here is a pattern of shapes.',
            image: 'tests/w1d2-tys1-shapes.svg',""")
r("""              'Here is a pattern of diamond shapes made with sticks. Each diamond is made from 4 sticks. Count the sticks in each shape.',
            diagram: [
              'Shape 1     Shape 2       Shape 3',
              '  /\\\\         /\\\\  /\\\\         /\\\\  /\\\\  /\\\\',
              '  \\\\/         \\\\/  \\\\/         \\\\/  \\\\/  \\\\/',
            ].join('\\n'),""", """              'Here is a pattern of diamond shapes made with sticks.',
            image: 'tests/w1d2-tys1-diamonds.svg',
            imageWidth: 460,""")
r("""              'Here is a pattern of triangles made with straws. Each new triangle shares one side with the last. Count the straws in each shape.',
            diagram: [
              'Shape 1   Shape 2    Shape 3     Shape 4',
              '  /\\\\       /\\\\/\\\\       /\\\\/\\\\/\\\\      /\\\\/\\\\/\\\\/\\\\',
              '  --       ----       ------      --------',
            ].join('\\n'),""", """              'Here is a pattern made with straws.',
            image: 'tests/w1d2-tys1-houses.svg',
            imageWidth: 560,""")
r("""                prompt: 'How many straws are used for Shape 3?',
              },""", """                prompt: 'How many straws are used for Shape 3?',
              },
              """ + q("short", "13", "How many straws are used for Shape 4?") + ",")
# Test Your Skills 2
r("""              'Write down the next number in each pattern (these patterns add the same number each time).',""",
  """              'Questions 1–3 are made by adding 4 each time. Questions 4–5 are formed by taking away 3 each time. Write down the next number in each pattern.',""")
r("prompt: '10 − __ = 7'", "prompt: '__ − 3 = 7'")
next_numbers = block("Test Your Skills 2 — Next number in each pattern", [
    q("short", "14", "12, 14, 16, 18, __"),
    q("short", "15", "5, 10, 15, 20, 25, __"),
    q("short", "16", "90, 80, 70, 60, __"),
], instructions="Write down the next number in each pattern.", numeric=True)
# Real Test
r("""              {
                type: 'short',
                n: '4',
                prompt:
                  'What number comes next in this pattern? 25, 30, 35, 40, __',
              },""", ",\n              ".join([
    q("short", "1", "17 + 8 = __", numeric=True),
    q("short", "2", "25, 30, 35, 40, 45, ? What number comes next in this pattern? __", numeric=True),
    q("short", "3", "Write a number in the box to make this number sentence correct: 32 + __ = 48", numeric=True),
    q("mcq", "4", "Alice puts beads on a string. The beads make a pattern. Which bead comes next in the pattern?", ["A", "B", "C", "D"], row=True,
      figure="w1d2-rt-q4", alt="Beads repeat: small dark diamond, large white diamond, circle, dark square. The string ends with a small dark diamond. Choices: A circle, B large white diamond, C dark square, D large dark diamond.", width=460),
]) + ",")
relink_legacy("Week 1/Day 2/Real Test/4", "Week 1/Day 2/Real Test/2")
r("""                options: ['12', '13', '14', '15'],
              },""", """                options: ['12', '13', '14', '15'],
                figure: 'tests/w1d2-rt-q10.svg',
                figureAlt: 'Cards in columns: 5 cards, then 8 cards, then 11 cards',
                figureWidth: 400,
              },
              """ + q("mcq", "11", "The first number is missing in this pattern: ?, 31, 35, 39, 43. What is the first number?", ["27", "28", "29", "30"]) + ",")
r("""                  'Add 100 to find the next number in this pattern: 742, 842, 942, __',
              },""", """                  'Add 100 to find the next number in this pattern: 742, 842, 942, __',
              },
              """ + q("mcq", "13", "Here is a pattern. How many □ are needed for each ◆?", ["1", "2", "3", "5"],
                      figure="w1d2-rt-q13", alt="A pattern: star, square, square, dark diamond, square, square, square, then it repeats.", width=520) + ",")
r("""              { type: 'short', n: '15', prompt: '43 − 18 = __' },""", """              { type: 'short', n: '15', prompt: '43 − 18 = __' },
              """ + q("mcq", "16", "Zane uses sticks to make a pattern. The first shape uses 3 sticks. The second shape uses 9 sticks. The third shape uses 18 sticks and the fourth shape uses 30 sticks. How many sticks will Zane need for the fifth shape?",
                      ["36", "39", "42", "45"], figure="w1d2-rt-q16", alt="Triangles made of sticks: 1 triangle, then 3, then 6, then 10 triangles.", width=480) + ",")
r("options: ['67', '68', '69', '70'],", "options: ['67', '69', '65', '68'],")
r("""                  'Place numbers in each box to make a pattern. Begin with 6 and add 4 each time: 6, __, __, 18',""",
  """                  'Place numbers in each box to make a pattern. Begin with 6 and add 4 each time.',
                inputs: 4,""")
heads = list_headings(c, W, D)
i = heads.index("Test Your Skills — What is being added or subtracted?")
set_blocks(c, W, D, heads[:i + 1] + [{"src": next_numbers}] + heads[i + 1:])
c.save(); print("Week 1 Day 2 patched")
