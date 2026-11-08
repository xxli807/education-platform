"""Week 3 Day 2: clocks, calendars, balances; Real Test Q5 added, balances moved to TYS2 (book IMG_9969-9974). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, add_fig, insert_after, _blocks_array, heading_of, relink_legacy

c = Content(); W, D = 3, 2
B = "Week 3/Day 2/"
fig = lambda snip, name, alt, width=None: add_fig(c, W, D, snip, name, alt, width)
TIMES = ["5 o’clock", "7 o’clock", "11 o’clock", "half past three", "half past nine", "half past one", "quarter past twelve",
         "quarter past seven", "quarter past ten", "quarter to two", "quarter to six", "quarter to nine"]
for n in range(12, 0, -1):
    c.replace_in_day(W, D, f"prompt: 'Clock {n}'", f"prompt: 'Clock {n}', figure: 'tests/w3d2-tys1-clock{n}.svg', figureAlt: 'A clock face', figureWidth: 110")
c.replace_in_day(W, D, "'Look at the May calendar. Answer the questions.'", "'Look at this calendar.'")
fig("What day of the week is 2 May?", "w3d2-tys1-may", "Calendar for May: 1 May is a Wednesday and the month has 31 days", 300)
MONTHS = "Test Your Skills — Months and seasons"
insert_after(c, W, D, "quarter to seven until quarter past seven", ",\n".join([
    q("short", 13, "Circle the letter on the object that has the greater mass: A or B?", figure="w3d2-tys2-balances",
      alt="Left balance: pan A is lower than pan B. Right balance: pan D is lower than pan C.", width=470),
    q("short", 14, "Circle the letter on the object that has the greater mass: C or D?")]))

RT = "Real Test"
real = block(RT, [
    q("mcq", 1, "What time is shown on this clock?", ["quarter past five", "quarter to five", "quarter past four", "quarter to four"],
      figure="w3d2-rt-q1", alt="A clock with the long hand on 9 and the short hand nearly at 5", width=120),
    q("mcq", 2, "Oliver was born on 18 July 2012. On what day of the week was Oliver born?", ["Saturday", "Tuesday", "Wednesday", "Sunday"],
      figure="w3d2-rt-q2", alt="Calendar for July 2012: 1 July is a Sunday", width=300),
    q("mcq", 3, "Which of these is used to measure mass?", ["A", "B", "C", "D"], figure="w3d2-rt-q3",
      alt="A clock, B thermometer, C tape measure, D kitchen scales", width=380, row=True),
    q("mcq", 4, "The minute hand is missing from this clock. What time is it?", ["8 o’clock", "half past eight", "quarter to eight", "9 o’clock"],
      figure="w3d2-rt-q4", alt="A clock with only the short hand, pointing at 8", width=120),
    q("short", 5, "Write the correct time below each clock. Choose from these times:\n3:25, 5:15, 9:35, 5:03, 9:25, 6:45, 6:15, 3:30, 5:45, 6:30",
      figure="w3d2-rt-q5", alt="Four clocks", width=440, inputs=4),
    q("mcq", 6, "Jo is getting married in Sydney next September. What season will it be?", ["spring", "summer", "autumn", "winter"]),
    q("mcq", 7, "How long is a quarter of an hour?", ["15 minutes", "15 seconds", "25 minutes", "25 seconds"]),
    q("mcq", 8, "This is a calendar for September. What is the date of the third Saturday?", ["13", "20", "21", "27"],
      figure="w3d2-rt-q8", alt="Calendar for September: 1 September is a Monday", width=300),
    q("mcq", 9, "Which of these months has 31 days?", ["February", "April", "October", "November"]),
    q("mcq", 10, "Which shows the objects in order from lowest mass to highest mass?", ["Order A", "Order B", "Order C", "Order D"],
      figure="w3d2-rt-q10", alt="First balance: the blue object is heavier than the small grey one. Second balance: the dark object is heavier than the blue one. Orders: A blue, grey, dark. B grey, dark, blue. C dark, blue, grey. D grey, blue, dark.", width=470),
    q("mcq", 11, "Ben gets to work at 9 o’clock in the morning and leaves work at 4 o’clock in the afternoon. How many hours is Ben at work?", ["5", "6", "7", "8"]),
    q("mcq", 12, "25 December is Christmas Day. What is the date exactly three weeks before Christmas?",
      ["4 December", "10 December", "22 December", "11 December"], figure="w3d2-rt-q12", alt="Calendar for December: 1 December is a Thursday", width=300),
])
_, _, items = _blocks_array(c, W, D)
old = next(i for i in items if heading_of(i) == RT)
c.s = c.s.replace(old, real, 1)
c.save()
relink_legacy(f"{B}{RT}/3", f"retired/{B}{RT}/3")  # options changed from words to pictures
relink_legacy(f"{B}{RT}/13", f"{B}{MONTHS}/13")
relink_legacy(f"{B}{RT}/14", f"{B}{MONTHS}/14")
print("ok")
