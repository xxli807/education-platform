"""Week 1 Day 4 fixes: verbatim passages and the School champion questions (book IMG_9918-9920). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, J, _blocks_array, heading_of, relink_legacy

c = Content(); W, D = 1, 4

MAGPIES = ("Magpies are very common in Australia. They live in bushland and towns and cities. All magpies have black and white feathers.\n\n"
  "Magpies are known as songbirds. They love to sing. Magpies are also good mimics. They are able to copy the sounds they hear. Magpies can sound like other birds and even barking dogs.\n\n"
  "Magpies live in family groups. A family group can be parents, children and grandchildren. Older children help to feed younger brothers and sisters and teach them how to find their own food. Magpies protect their nests from intruders. In nesting season male magpies might swoop at people to protect their nests. Magpies nest in trees. The female lays two to five eggs at a time. Baby magpies beg loudly and constantly for food. Magpies eat worms, snails, lizards, frogs, spiders and insects. Magpies mostly peck for food on the ground. They also eat grains.\n\n"
  "Magpies are protected in Australia. It is against the law to hurt magpies in any way.")
SITES = ("There are Aboriginal sites all over Australia. These are special places.\n\n"
  "Some Aboriginal sites are sacred. They might be sacred because important traditional ceremonies were held there. They might be burial sites. Sacred sites are often connected to stories of The Dreaming. Many Aboriginals believe that sacred sites are protected by ancestor spirits. Some Aboriginals think that visitors should not be allowed to enter any sacred sites.\n\n"
  "Other important Aboriginal sites are not sacred. Local Aboriginal elders allow visitors onto these sites. One such site is Birrigai rock shelter. Birrigai is a large rock ledge. Up to twelve people can stand under it. Many experts think Birrigai rock shelter is the oldest Aboriginal site in Canberra. Aboriginal people used the rock shelter long, long ago. Many tourists visit the Birrigai rock shelter site. Schoolchildren visit on school excursions.")
JUDY = ("Judy Chen is in Year 6 at our school. She is a champion swimmer. She is my hero.\n\n"
  "Judy was born in a coastal town in Queensland. She started swimming in races when she was four. She joined her local Nippers when she was six. She loves competing in swimming events. She also loves just having fun in the pool or in the surf.\n\n"
  "Judy’s favourite swimming stroke is butterfly, which she calls ‘fly’. Judy has won all the butterfly events at our school swimming carnival for the last four years. She also swims for a local swimming club called ‘Little Dolphins’. The name of the club suits the way Judy swims. In the butterfly kick you keep your feet together and move them up and down just like a dolphin. Judy streaks through the water with her butterfly kick.\n\n"
  "Judy hopes to compete in the Olympics when she is older. I think she will make it. I hope she does.")

def set_passage(heading, text):
    _, _, items = _blocks_array(c, W, D)
    it = next(i for i in items if heading_of(i) == heading)
    m = re.search(r"passage:\s*\n?\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")", it)
    new = it[:m.start(1)] + J(text) + it[m.end(1):]
    c.s = c.s.replace(it, new, 1)

set_passage("Reading: Magpies", MAGPIES)
set_passage("Reading: Important sites", SITES)
c.replace_in_day(W, D, """                options: [
                  'a school',
                  'the local Aboriginal elders',
                  'their parents',
                  'the government',
                ],""", """                options: [
                  'a school',
                  'their parents',
                  'the local Aboriginal elders',
                  'the government',
                ],""")
# School champion: book passage and all seven questions (old 2 and 5 had different options — drop their saved answers)
_, _, items = _blocks_array(c, W, D)
it = next(i for i in items if heading_of(i) == "Reading: School champion (biography)")
new = ("{\n" + f"heading: 'Reading: School champion (biography)',\ninstructions: 'Read School champion, then choose the correct answer.',\npassage: {J(JUDY)},\nquestions: [\n" + ",\n".join([
    q("mcq", "1", "Judy started swimming in races when she was", ["six.", "four.", "born.", "in Year 6."]),
    q("mcq", "2", "How is Judy like a dolphin?", ["She wins swimming races.", "She can fly through the water.", "She loves playing in the water.", "She kicks her feet up and down for the butterfly kick."]),
    q("mcq", "3", "Little Dolphins is the name of", ["a dolphin species.", "a racing club.", "a swimming club.", "a surf carnival."]),
    q("mcq", "4", "Judy has been winning school swimming events", ["for six years.", "for three years.", "for four years.", "this year."]),
    q("mcq", "5", "Judy is best described as a person who is", ["energetic.", "timid.", "lazy.", "lonely."]),
    q("mcq", "6", "Which idea best matches this text?", ["If you love something, you will most likely be good at it.", "Winning is everything.", "Dolphins are great swimmers.", "Nippers helps you win swimming races."]),
    q("short", "7", "Write the numbers 1 to 4 to show the order of events in Judy’s life.  __ Judy is now in Year 6.   __ Judy was born.   __ Judy joined Nippers.   __ Judy started swimming in races.", numeric=True),
]) + ",\n],\n}")
c.s = c.s.replace(it, new, 1)
for n in ("2", "5"):
    relink_legacy(f"Week 1/Day 4/Reading: School champion (biography)/{n}", f"retired/Week 1/Day 4/School champion/{n}")
c.save(); print("Week 1 Day 4 patched")
