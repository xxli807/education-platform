"""Week 3 Day 1: every picture, missing TYS 12-20 and Real Test Q3, Q5 (book IMG_9961-9968). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, add_fig, insert_after, _blocks_array, heading_of, set_blocks, relink_legacy

c = Content(); W, D = 3, 1
B = "Week 3/Day 1/"
fig = lambda snip, name, alt, width=None: add_fig(c, W, D, snip, name, alt, width)
INST = "Test Your Skills — Choosing instruments"

# --- TYS1 instruments: book order, letters A-E from the picture ---
inst = block(INST, [q("short", 1, "how long a cake tin is."), q("short", 2, "the mass of flour to put in a cake."),
                    q("short", 3, "the amount of milk to put in a cake."), q("short", 4, "how long the cake is in the oven."),
                    q("short", 5, "how hot it is in the kitchen.")],
             instructions="Write down the letter beside the instrument you would use to measure", image="w3d1-tys1-instruments", image_width=460)
_, _, items = _blocks_array(c, W, D)
old = next(i for i in items if heading_of(i) == INST)
c.s = c.s.replace(old, inst, 1)

c.replace_in_day(W, D, "'Here are some ribbons (bar chart) and some jugs of juice. Answer the questions.'", "'Here are some ribbons. What colour is'")
c.replace_in_day(W, D, "'What colour is the longest ribbon?'", "'the longest ribbon?'")
c.replace_in_day(W, D, "'What colour is the shortest ribbon?'", "'the shortest ribbon?'")
c.replace_in_day(W, D, "'Which ribbon is longer than the pink ribbon but shorter than the red ribbon?'",
                 "'the ribbon that is longer than the pink ribbon but shorter than the red ribbon?'")
fig("'the longest ribbon?'", "w3d1-tys1-ribbons", "Ribbons: red is long, yellow is the shortest, blue is the longest, pink is short, green is between pink and red", 300)
c.replace_in_day(W, D, "'Which jug has the most juice in it?'",
                 "'These jugs all hold different amounts when full. The number of litres can be seen. Which jug has the most juice in it?'")
fig("Which jug has the most juice", "w3d1-tys1-jugs", "Jug A filled to 1 L. Jug B filled to just above 2 L. Jug C filled to below 1 L. Jug D filled to 1 L.", 430)
SHAPES = "Test Your Skills — Which shape?"
shapes = block(SHAPES, [q("short", 12, "Which shape is a circle?", figure="w3d1-tys1-shapes", alt="Shape A triangle, B square, C circle, D rectangle", width=400),
                        q("short", 13, "Which shape is a triangle?"), q("short", 14, "Which shape is a square?")],
               instructions="Look at these shapes.")

# --- TYS2 ---
c.replace_in_day(W, D, "'Look at the shapes and prisms, then answer.'", "'Look at these shapes. How many of the shapes are'")
c.replace_in_day(W, D, "'Look at these shapes. How many are triangles?'", "'triangles?'")
c.replace_in_day(W, D, "'How many are circles?'", "'circles?'")
c.replace_in_day(W, D, "'How many are rectangles?'", "'rectangles?'")
fig("'triangles?'", "w3d1-tys2-shapes", "Eleven flat shapes: 4 triangles, 2 circles, 3 rectangles, a parallelogram and an octagon", 440)
fig("This is a rectangular prism. How many faces", "w3d1-tys2-rect-prism", "A rectangular prism", 200)
fig("This is a triangular prism. How many faces", "w3d1-tys2-tri-prism", "A triangular prism", 170)
OBJ = "Test Your Skills — 3D objects, pavers and blocks"
objs = block(OBJ, [
    q("short", 13, "cube"), q("short", 14, "cone"), q("short", 15, "cylinder"), q("short", 16, "pyramid"),
    q("short", 17, "Three pavers have been put on this space. How many pavers altogether will fit on the space?",
      figure="w3d1-tys2-pavers", alt="A space for 4 by 3 pavers with 3 pavers already in place", width=200, numeric=True),
    q("short", 18, "How many more pavers will fit on the space?", numeric=True),
    q("short", 19, "These rectangular prisms were built with blocks like this. How many blocks were needed for prism 19?",
      figure="w3d1-tys2-blocks", alt="Prism 19: 2 blocks wide, 3 high and 3 deep. Prism 20: 4 blocks wide, 2 high and 2 deep.", width=300, numeric=True),
    q("short", 20, "How many blocks were needed for prism 20?", numeric=True)],
    instructions="Choose the object that matches each name (write the letter).", image="w3d1-tys2-solids", image_width=380)

# --- Real Test, book order ---
RT = "Real Test"
real = block(RT, [
    q("mcq", 1, "Which dog is the tallest?", ["Dog A", "Dog B", "Dog C", "Dog D"], figure="w3d1-rt-q1", alt="Four dogs: A long and low, B medium, C tallest, D small", width=440),
    q("mcq", 2, "What is this 3D shape?", ["pyramid", "cone", "cube", "cylinder"], figure="w3d1-rt-q2", alt="A cylinder lying on its side", width=160),
    q("short", 3, "Choose all the shapes that are triangles. Write the letters.", figure="w3d1-rt-q3",
      alt="A trapezium, B triangle, C arrow, D right-angled triangle, E long thin triangle, F hexagon", width=520),
    q("mcq", 4, "This is a square pyramid. How many faces does it have?", ["4", "5", "6", "8"], figure="w3d1-rt-q4", alt="A square pyramid", width=210),
    q("mcq", 5, "Which would you use to measure length?", ["A", "B", "C", "D"], figure="w3d1-rt-q5",
      alt="A stopwatch, B bathroom scales, C tape measure, D kitchen scales", width=400, row=True),
    q("short", 6, "Cass is putting stamps on a card. How many stamps like these will fit on the card altogether?", figure="w3d1-rt-q6",
      alt="A card marked into 5 columns and 3 rows, with 4 pig stamps in place", width=320, numeric=True),
    q("short", 7, "Which number is in the circle and in the triangle, but not in the square?", figure="w3d1-rt-q7",
      alt="A circle, a triangle and a square overlapping, with the numbers 1 to 8 in different parts", width=290, numeric=True),
    q("short", 8, "Luke built this cube from blocks like this. How many blocks did Luke need?", figure="w3d1-rt-q8",
      alt="A cube 3 blocks wide, 3 high and 3 deep", width=260, numeric=True),
    q("mcq", 9, "How many of these shapes are rectangles?", ["2", "3", "4", "more than 4"], figure="w3d1-rt-q9",
      alt="A triangle, rectangle, circle, parallelogram, triangle, parallelogram, rectangle and oval", width=400),
    q("mcq", 10, "This bucket holds 20 litres when full. There is some milk in the bucket. About how much milk is in the bucket?",
      ["16 litres", "11 litres", "6 litres", "1 litre"], figure="w3d1-rt-q10", alt="A bucket a little more than half full of milk", width=130),
    q("mcq", 11, "This is a rectangular prism. How many edges does it have?", ["6", "8", "10", "12"], figure="w3d1-rt-q11", alt="A rectangular prism", width=210),
    q("mcq", 12, "Which shape has the most squares coloured?", ["Shape A", "Shape B", "Shape C", "Shape D"], figure="w3d1-rt-q12",
      alt="Four grids with a coloured rectangle in each: A 7 by 3, B 5 by 4, C 9 by 2, D 3 by 5", width=520),
])
_, _, items = _blocks_array(c, W, D)
old = next(i for i in items if heading_of(i) == RT)
c.s = c.s.replace(old, real, 1)
order = [heading_of(i) for i in _blocks_array(c, W, D)[2]]
order.insert(order.index("Test Your Skills — Comparing length and capacity") + 1, {"src": shapes})
order.insert(order.index("Test Your Skills — 2D and 3D shapes") + 1, {"src": objs})
set_blocks(c, W, D, order)
c.save()

# old Q1 was the baking-time question (book Q4) and old Q4 the cake-length question (book Q1)
relink_legacy(f"{B}{INST}/1", "tmp-swap"); relink_legacy(f"{B}{INST}/4", f"{B}{INST}/1"); relink_legacy("tmp-swap", f"{B}{INST}/4")
print("ok")
