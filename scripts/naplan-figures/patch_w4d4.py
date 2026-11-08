"""Week 4 Day 4: real possum text + questions, verbatim circus and apple texts (book IMG_0018-0020). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, J, q, block, _blocks_array, heading_of, remap

c = Content(); W, D = 4, 4
B = "Week 4/Day 4/"
OLD_P, NEW_P = "Reading: Get rid of possums", "Reading: Be kind to possums"
POSSUM = ("Be kind to possums\n\nBrush-tailed possums are common in Australia. They live in the bush and in people’s backyards. They prefer to live in hollow trees but they also make their homes in people’s roofs. "
  "Many people don’t like having a possum in the roof.\n\nSometimes people trap the possum in the roof and set it free somewhere else. But this is a problem for the possum. "
  "Possums are territorial, which means they have an area that they call their own. They do not let new possums come into their area. They chase away any new possums. "
  "Possums usually die when people move them out of their own territory. They starve. I think that is very sad.\n\n"
  "If you have an unwelcome possum in your roof, the best thing to do is to build a possum-house in a tree in your own backyard. You can attract the possum to the possum-house using bananas. "
  "Possums love bananas. Once the possum is out of your roof and in its new house you can cover over any holes in your roof. Then it won’t be able to get back inside your roof.")
possum = block(NEW_P, [
    q("mcq", 1, "The word ‘common’ in the text means", ["there are many of them.", "there are only a few of them.", "they only live in Australia.", "they are rare."]),
    q("mcq", 2, "The best place for a possum to live is in", ["a roof.", "a hollow tree.", "a possum-house.", "a zoo."]),
    q("mcq", 3, "What does ‘Possums are territorial’ mean?", ["Possums don’t like sharing their area with new possums.", "Possums have homes everywhere.",
        "Possums always live alone.", "Possums can’t find a new place to live and so they die."]),
    q("mcq", 4, "Where should you build a possum-house?", ["in a neighbour’s roof", "in a backyard tree", "in the forest", "in your roof"]),
    q("mcq", 5, "How does the writer feel when possums are moved out of their own territory?", ["sad", "pleased", "angry", "hungry"]),
    q("mcq", 6, "The text says you should cover over holes in your roof", ["so rain can’t get in.", "so the possum can’t get out.", "so the possum dies of starvation.", "so the possum can’t get back inside."]),
    q("mcq", 7, "What is the writer’s purpose in the text?", ["to describe possums", "to tell how to catch a possum", "to give opinions about possums", "to tell you how to make a possum-house"])],
    instructions="Read the text, then choose the correct answer.")
possum = possum.replace("questions: [", f"passage: {J(POSSUM)},\nquestions: [", 1)
_, _, items = _blocks_array(c, W, D)
old = next(i for i in items if heading_of(i) == OLD_P)
c.s = c.s.replace(old, possum, 1)

CIRCUS = ("Circuses are NOT good for animals\n\nI don’t like circuses that use animals.\n\n"
  "I feel sorry for the animals in circuses. Lions, tigers and elephants don’t belong in circuses. They need room to roam around. They should not be kept in cages. They should not be made to do tricks. They belong in the wild.\n\n"
  "Some people think that it’s all right to use animals such as horses in circuses. I disagree. Circuses drive around from one place to the next. The horses wouldn’t like being driven around in a truck for hours and hours. That’s not fair.\n\n"
  "I don’t think circuses should use any animals at all. Circuses should just have human performers. In Circus Oz, the Flying Fruit Fly Circus and Cirque du Soleil the humans do the tricks and perform. "
  "I love these kinds of circuses. I love the trapeze, trampolining, juggling and stilt walking. My favourite act is the flying trapeze. It is so much fun to watch.\n\n"
  "Human circuses are entertaining. Animal circuses are cruel. Some countries don’t let circuses use lions, tigers or elephants. I am happy about that.\n\nSanjay, age 10")
APPLE = ("Be a winner with APPLE POWER\n\ncrisp\ncrunchy\njuicy\nshiny\ngreen\nor red\napples\n\n"
  "“So kids — what are you waiting for? Go bite into an apple NOW!”\n\n"
  "All you need to do is eat an apple a day and the benefits will be\n• a healthy body helping you WIN at sports\n• better teeth — a WINNING smile\n"
  "• a healthy brain — WIN all those computer games\n• more friends — a WINNING personality\n\n"
  "Think of the planet\nApples have sustainable packaging — eat the skin or recycle it: No waste.")
def set_passage(heading, text):
    _, _, items = _blocks_array(c, W, D)
    it = next(i for i in items if heading_of(i) == heading)
    m = re.search(r"passage:\s*\n?\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")", it)
    c.s = c.s.replace(it, it[:m.start(1)] + J(text) + it[m.end(1):], 1)
AP = "Reading: Apple Power (advertisement)"
set_passage("Reading: Circuses are NOT good for animals", CIRCUS)
set_passage(AP, APPLE)
r = lambda o, n: c.replace_in_day(W, D, o, n)
r("'How often does the text tell you to eat an apple?'", "'What does the text tell people to do every day?'")
r("'once a day',", "'Be a winner.',"); r("'twice a day',", "'Eat an apple.',"); r("'win of the planet',", "'Win games.',"); r("'think of the planet',", "'Think of the planet.',")
r("options: ['parents', 'children', 'pirates', 'farmers']", "options: ['parents', 'children', 'apples', 'pirates']")
r("'The text says this to make you want to'", "'“crisp, crunchy, juicy” — The text says this'")
r("'eat an apple.',", "'to make you want to eat an apple.',"); r("'know what apples look like.',", "'to tell you what apples look like.',")
r("'show what apples are made of.',", "'to show that apples are healthy.',"); r("'show that apples are healthy.',", "'to show what apples are made of.',")
c.save()
remap(f"{B}{OLD_P}/", {n: "retired" for n in range(1, 8)})
remap(f"{B}{AP}/", {4: "retired"})
print("ok")
