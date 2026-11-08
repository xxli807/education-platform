"""Week 4 Day 1: every picture, TYS2 Q8-13 added, Real Test in book form (book IMG_9994-0001). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, _blocks_array, heading_of, insert_after, add_fig, remap

c = Content(); W, D = 4, 1
B = "Week 4/Day 1/"
fig = lambda snip, name, alt, width=None: add_fig(c, W, D, snip, name, alt, width)
c.replace_in_day(W, D, "'Use the grid (columns A–D, rows 1–4), the picture of friends and the map of Red Rock to answer.'", "'Look at this grid.'")
fig("What is found at B3?", "w4d1-tys1-grid", "A grid with columns A to D and rows 1 to 4. Row 4: bank, butcher, bakery, post office. Row 3: fruit shop, chemist, doctor, dentist. Row 2: school, park, library, church. Row 1: pool, skate park, gym, garage.", 360)
c.replace_in_day(W, D, "'Who is standing in front of Jo?'", "'Here is a picture of some friends. Jo is standing on the left in the back row. Who is standing in front of Jo?'")
fig("Who is standing in front of Jo?", "w4d1-tys1-friends", "Back row from left: Jo, Kim, Lee, Bill. Front row from left: Helen, Dan, Jane, Bob.", 300)
c.replace_in_day(W, D, "'On what road is the bank?'", "'Here is a map of Red Rock. On what road is the bank?'")
fig("On what road is the bank?", "w4d1-tys1-map", "Map: Main Rd runs across the top and Red Rock Rd across the bottom. Hill Rd is on the left and Park Rd on the right. The post office faces Park Rd. The bank faces Red Rock Rd.", 420)
c.replace_in_day(W, D, "'Use the grid (columns A–G, rows 1–5) with the arrow → to answer.'", "'Look at the grid. The ✈ is the plane.'")
fig("What is the position of the arrow", "w4d1-tys2-grid", "A grid with columns A to G and rows 1 to 5, with a plane in one square", 330)
insert_after(c, W, D, "from its starting point to D5?", ",\n".join([
    q("short", 8, "Choose the diagram that shows the shape in the first picture flipped over the dotted line.", figure="w4d1-tys2-q8",
      alt="A corner shape beside a dotted line, and four answer cards A to D", width=300),
    q("short", 9, "Choose the diagram that shows the shape in the first picture flipped over the dotted line.", figure="w4d1-tys2-q9",
      alt="A triangle above a dotted line, and four answer cards A to D", width=380),
    q("short", 10, "This arrow is being turned. Write the letter that matches what the arrow will look like if it is turned a full turn.",
      figure="w4d1-tys2-arrows", alt="An arrow pointing right. A points up, B points left, C points down, D points right.", width=360),
    q("short", 11, "… half a turn."), q("short", 12, "… a quarter turn clockwise."), q("short", 13, "… a quarter turn anticlockwise.")]))

RT = "Real Test"
real = block(RT, [
    q("mcq", 1, "This is a plan of Jan’s farm. What is between the cow paddock and the shed?", ["house", "dam", "cattle yard", "stables"],
      figure="w4d1-rt-q1", alt="Farm plan: the shed and cattle yard are top left, the house bottom left, the cow paddock top right with a dam, the stables and horse paddock bottom right. The cattle yard is between the shed and the cow paddock.", width=380),
    q("short", 2, "Which of these shapes will look the same when flipped over the dotted line? Choose all possible answers (write the letters).",
      figure="w4d1-rt-q2", alt="Six shapes beside dotted lines: A notched rectangle, B sideways T, C octagon, D right-angled triangle, E letter H, F upside-down T", width=440),
    q("mcq", 3, "Which shape is at F2?", ["A", "B", "C", "D"], figure="w4d1-rt-q3", alt="A grid with a smiley, a flag, a cup and a bow tie", width=330, row=True),
    q("mcq", 4, "Elly turns this card half a turn. What does it look like now?", ["A", "B", "C", "D"], figure="w4d1-rt-q4",
      alt="A card with an upside-down F, and four answer cards", width=300, row=True),
    q("mcq", 5, "Cam is playing a game. He slides his counter 3 squares right. Which shows Cam’s counter after the slide?", ["A", "B", "C", "D"],
      figure="w4d1-rt-q5", alt="A grid with a counter, and four answer grids", width=400, row=True),
    q("mcq", 6, "Lucy folded this paper on the dotted line. She cut out a shape. Which is Lucy’s paper when opened out?", ["A", "B", "C", "D"],
      figure="w4d1-rt-q6", alt="Folded paper with a cut at the fold, and four opened-out papers", width=300, row=True),
    q("short", 7, "Some tools are on a board. The hammer is at B2. Where is the saw?", figure="w4d1-rt-q7",
      alt="A board with columns A to D and rows 1 to 4: a saw, a hammer, a spanner and pliers", width=360),
    q("mcq", 8, "This arrow looks like this after a quarter turn in a clockwise direction. What will the straight arrow look like after a quarter turn in a clockwise direction?",
      ["A", "B", "C", "D"], figure="w4d1-rt-q8", alt="Example bent arrow turned a quarter turn; a straight arrow pointing up and to the right; four answer arrows", width=320, row=True),
    q("mcq", 9, "Billy made this shape. Which of these is Billy’s shape?", ["A", "B", "C", "D"], figure="w4d1-rt-q9",
      alt="Billy’s shape made of squares, one shaded and one with a dot, and four answer shapes", width=420, row=True),
    q("mcq", 10, "Nat is second from the left in this picture. Which is Nat?", ["A", "B", "C", "D"], figure="w4d1-rt-q10",
      alt="Five faces in a row, and four answer faces", width=340, row=True),
])
_, _, items = _blocks_array(c, W, D)
old = next(i for i in items if heading_of(i) == RT)
c.s = c.s.replace(old, real, 1)
c.save()
remap(f"{B}{RT}/", {2: "retired", 7: "retired"})
print("ok")
