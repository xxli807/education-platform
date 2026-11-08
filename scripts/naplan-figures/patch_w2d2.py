"""Week 2 Day 2 fixes: every picture, missing TYS 8-10 and Real Test Q5 (book IMG_9935-9942). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, add_fig, insert_after

c = Content(); W, D = 2, 2
edit = lambda old, new: c.replace_in_day(W, D, old, new)
fig = lambda snip, name, alt, width=None: add_fig(c, W, D, snip, name, alt, width)

# --- Test Your Skills 1 (fractions) ---
edit("'Jack owns half of the cars. How many cars does Jack own?'",
     "'Here are some toy cars. Jack owns half of the cars. How many cars does Jack own?'")
fig("Jack owns half of the cars.", "w2d2-tys1-cars", "Eight toy cars in two rows of 4", 280)
WORDS = {4: "first", 5: "second", 6: "third", 7: "fourth"}
ALT = {4: "A rectangle cut into 2 equal parts, 1 shaded", 5: "A rectangle cut into 4 equal parts, 1 shaded",
       6: "A rectangle cut into 8 equal parts, 1 shaded", 7: "A rectangle cut into 2 equal parts, 1 shaded",
       8: "A rectangle cut into 4 equal parts, 3 shaded", 9: "A rectangle cut into 8 equal parts, 4 shaded",
       10: "A rectangle cut into 8 equal parts, 3 shaded"}
for n, w in WORDS.items():
    fig(f"of the {w} bar is shaded?", f"w2d2-tys1-q{n}", ALT[n], 160)
    edit(f"'What fraction of the {w} bar is shaded?'", "'What fraction is shaded?'")
src = ",\n".join(q("short", n, "What fraction is shaded?", figure=f"w2d2-tys1-q{n}", alt=ALT[n], width=160) for n in (8, 9, 10))
insert_after(c, W, D, "w2d2-tys1-q7.svg", src)
fig("Here are some oranges.", "w2d2-tys1-oranges", "Four oranges", 300)

# --- Test Your Skills 2 (money) ---
fig("Here are some coins. Which coin", "w2d2-tys2-coins", "Coins: 50c, 20c, 10c, 5c, $1, $2", 360)
fig("Look at these two coins.", "w2d2-tys2-two-coins", "Two coins: 50c and 20c", 140)
fig("Look at these three coins.", "w2d2-tys2-three-coins", "Three coins: 5c, 10c and $1", 180)
edit("'Look at this money (notes). Which note is worth the most?'",
     "'Look at this money. Which note is worth the most?'")
fig("Look at this money. Which", "w2d2-tys2-notes", "Notes: $50, $5, $10 and $20", 260)

# --- Real Test ---
fig("Ed has these pencils.", "w2d2-rt-q1", "Twelve pencils in three bundles of 4", 380)
fig("Kylie has only these coins.", "w2d2-rt-q2", "Coins: $2, 20c, 5c, $2, $1, 10c", 170)
fig("Max cut some oranges", "w2d2-rt-q3", "An orange marked into quarters", 80)
fig("Which shape has one-eighth shaded?", "w2d2-rt-q4", "Shape A: 1 of 10 strips shaded. B: circle, 1 of 8 slices shaded. C: 1 of 7 slices shaded. D: 1 of 6 slices shaded.", 520)
insert_after(c, W, D, "w2d2-rt-q4.svg", q(
    "short", 5, "Which coins are in order from highest value to lowest? Choose all possible answers. Write the letters.",
    figure="w2d2-rt-q5", alt="A: 20c, $2, $1. B: $2, $1, 50c. C: 20c, 10c, $2. D: $1, 10c, 5c.", width=220))
fig("Jake cut these apples into quarters.", "w2d2-rt-q6", "Three apples", 240)
fig("Kevin has only these coins.", "w2d2-rt-q7", "Coins: 50c, 20c, 10c, 5c, $1, 20c, 5c", 230)
fig("Which shape has one-half shaded?", "w2d2-rt-q8", "Shape A: triangle with its small top part shaded. B: 1 of 4 strips shaded. C: 1 of 3 parts shaded. D: circle with 4 of 8 slices shaded.", 470)
edit("'Sue has this money in her purse ($50, $20, $20, $10, $5). How much money is this?'",
     "'Sue has this money in her purse. How much money is this?'")
fig("Sue has this money in her purse.", "w2d2-rt-q10", "Notes: $50, $20, $20, $10, $5", 260)
fig("Jill has these balloons.", "w2d2-rt-q11", "A bunch of 12 balloons", 200)
edit("Now she has the coins shown left.", "Now she has these coins left.")
fig("Ellen has these coins.", "w2d2-rt-q12", "Ellen's coins: 50c, 5c, 5c, 5c, 50c, 20c. Coins left: 50c and 5c.", 330)
c.save()
print("ok")
