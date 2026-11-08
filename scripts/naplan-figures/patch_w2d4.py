"""Week 2 Day 4: verbatim passages (book IMG_9952-9954). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, J, _blocks_array, heading_of

c = Content(); W, D = 2, 4

MOUSE = ("How to train a pet mouse\n\nMice are timid so training will take time and patience.\n\n"
  "1. Make sure your mouse is happy to be handled. The more you handle your mouse the more easily it will learn tricks. "
  "You can rub your hands on the mouse bedding so that you smell more mouse-like until the mouse gets used to you.\n"
  "2. Reward your mouse with its favourite food treat each time you handle it. Try treats such as millet, oats or sunflower seeds.\n"
  "3. Make a clicking noise with your tongue each time you give the mouse a treat. It will learn that the clicking sound means a treat. "
  "Eventually it will come straight to you whenever you make the sound.\n"
  "4. Reward all good behaviour with food treats.\n5. Keep training sessions short.\n\n"
  "Note: Mice are sociable and like to live with other mice. Single mice get bored and lonely.")
CHIMPS = ("Rules for young chimpanzees\n\n• Stay out of the way of the alpha male.\n• Greet other chimps with a kiss and a hug.\n"
  "• Listen out for happy, barking sounds in the morning. These sounds mean that food has been found.\n"
  "• Eat fruit, leaves, termites, vegetables, eggs, nuts, honey and wild pig when you can catch one.\n"
  "• Use grass and leaves to build ground nests, for afternoon naps.\n• Rest during the hottest part of the day.\n"
  "• Build nests high in trees for night sleeping, safe from hungry leopards.\n"
  "• Help your friends and family with grooming; remove dirt and ticks.\n• Stay close to your mother until you are at least four years old.")

def set_passage(heading, text):
    _, _, items = _blocks_array(c, W, D)
    it = next(i for i in items if heading_of(i) == heading)
    m = re.search(r"passage:\s*\n?\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")", it)
    c.s = c.s.replace(it, it[:m.start(1)] + J(text) + it[m.end(1):], 1)

set_passage("Reading: How to train a pet mouse", MOUSE)
set_passage("Reading: Rules for young chimpanzees", CHIMPS)
c.replace_in_day(W, D, "'Store in fridge.'", "'Store Hair-growth Tonic in fridge.'")
c.save(); print("ok")
