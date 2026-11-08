"""Week 3 Day 4: verbatim passages + missing Q3 (book IMG_9985-9987). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, J, q, _blocks_array, heading_of, insert_after

c = Content(); W, D = 3, 4
PRINCE = ("The spoilt prince\n\nOnce upon a time in a kingdom far, far away there lived a king and queen and their son, Johan. "
  "The king and queen were kind and good but Johan was not kind or good. He was lazy and rude. He demanded that the cook make him special cakes. "
  "He was mean to everyone, even his parents.\n\nOn Johan’s 21st birthday the king and queen announced that it was time for Johan to marry. "
  "They sent letters to princesses in kingdoms all around, inviting them to meet the prince.\n\n"
  "Princesses came from far and wide but Prince Johan refused to marry anyone. He was rude to all the princesses. He said that he wanted to live with his parents forever.\n\n"
  "The princesses didn’t want to marry a mean and rude prince, anyway. So, they went on a holiday together to New Zealand. They had fun snow skiing and whale watching.\n\n"
  "The prince never married. He lived happily ever after in his parents’ castle. And, as for his parents, they went on holidays to New Zealand as often as they could, without Johan.")
GRANDMA = ("A conversation with Grandma\n\nCynthia and her grandmother were talking one afternoon.\n\n"
  "“Where were you born, Zumu?” Cynthia asked.\n\n“I was born in a farming village in China,” replied her grandmother.\n\n"
  "“What was it like there?” Cynthia asked.\n\n“Beautiful,” said Zumu. “It’s an important wheat-growing area now.”\n\n"
  "“Will you take me to see where you were born?”\n\n“No, Cynthia. It is too far away,” said Zumu.\n\n"
  "“How far away is it?” Cynthia wanted to know.\n\n“Too far,” replied Zumu.\n\n“I want to go!” Cynthia demanded.\n\n"
  "“You can go when you are grown up. You can take yourself,” said Zumu.\n\n"
  "“That’s a long time!” Cynthia declared in a sulky voice. She slumped her shoulders. She pretended she might cry. She wanted Zumu to give in and agree to take her to China.\n\n"
  "“You must be patient,” declared Zumu.\n\n“Oh! You always tell me to be patient,” Cynthia declared. “I will go to China one day.”")
STUCK = ("Stuck\n\n“Pongo,” called Jenny. “Pongo, come on down. Come on, Puss Puss.”\n\n"
  "Pongo had climbed a tree and Jenny wanted him to come down. Pongo had been in the tree for ages. Jenny was worried that Pongo didn’t know how to get back down. "
  "Jenny went inside the house to get some chicken, Pongo’s favourite food. She waved the chicken at Pongo, then she placed the chicken on the ground.\n\n"
  "“Come and get some yummy chicken,” she called. Pongo just looked at her.\n\n"
  "Now Jenny was really getting worried. She went inside and told her mother that the cat was stuck in a tree. Her mother said she’d have a look. "
  "But when Jenny and her mother went outside, there was Pongo, on the ground, eating the chicken.\n\n“Oh, Pongo,” said Jenny. “You are such a tricker!”")

def set_passage(heading, text):
    _, _, items = _blocks_array(c, W, D)
    it = next(i for i in items if heading_of(i) == heading)
    m = re.search(r"passage:\s*\n?\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")", it)
    c.s = c.s.replace(it, it[:m.start(1)] + J(text) + it[m.end(1):], 1)

set_passage("Reading: The spoilt prince", PRINCE)
set_passage("Reading: A conversation with Grandma", GRANDMA)
set_passage("Reading: Stuck", STUCK)
insert_after(c, W, D, "'Which words best describe Johan?'", q("long", 3, "Why do you think Johan’s parents decided it was time for Johan to marry?"))
c.save(); print("ok")
