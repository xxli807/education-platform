"""Week 1 Day 3 fixes (book photos IMG_9912-9917). Applied once."""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, set_blocks, list_headings, _blocks_array, heading_of

c = Content(); W, D = 1, 3
r = lambda old, new: c.replace_in_day(W, D, old, new)

r("options: ['colourful', 'tidy', 'delicious', 'gigantic'],", "options: ['colourful', 'tiny', 'delicious', 'gigantic'],")
r("options: ['hairy', 'green', 'angry', 'short'],", "options: ['short', 'hairy', 'green', 'angry'],")
r("prompt: 'We are going to sing and play musical *consert*.',", "prompt: 'Our class is performing in the school *consert*.',")
r("instructions: 'Write five words of your own in each group.',",
  "instructions: 'Add extra examples of your own to each column. Examples — hard c: cake, crunch, carrot, camel; soft c: cell, excel, dance, pencil; hard g: goat, going, grape, dragon; soft g: danger, emergency, germ, giraffe.',")

noun_groups = block("Grammar & Punctuation — Noun groups", [
    q("short", "10", "The red apples taste best."),
    q("short", "11", "I saw a frog."),
    q("short", "12", "I read an exciting book."),
    q("short", "13", "The tiny creature crawled slowly past."),
], instructions="Circle the noun group in each sentence (write the noun group in the box).")

wc = "Which word correctly completes this sentence?"
rt = [
    q("mcq", "1", f"{wc} Cicadas are ______.", ["insects", "books", "home", "trees"]),
    q("mcq", "2", f"{wc} We played ______ at lunchtime.", ["games", "sandwiches", "books", "library"]),
    q("mcq", "3", f"{wc} The children ate ______ for afternoon tea.", ["pretty", "ugly", "fruit", "my"]),
    q("mcq", "4", f"{wc} I have spelling ______.", ["funny", "homework", "sad", "angry"]),
    q("mcq", "5", f"{wc} The dog jumped onto the old ______ chair.", ["my", "your", "wooden", "new"]),
    q("mcq", "6", f"{wc} The bats flew into their ______ cave.", ["car", "table", "hungry", "dark"]),
    q("mcq", "7", "Which sentence is written correctly?", ["Michael lives in sydney.", "Michael lives in Sydney", "Michael lives in Sydney.", "michael lives in Sydney."]),
    q("mcq", "8", "Which sentence is written correctly?", ["Suri saw animals at Taronga Zoo", "suri saw animals at taronga Zoo.", "Suri saw animals at Taronga Zoo.", "Suri saw animals. at Taronga Zoo."]),
    q("mcq", "9", "Cicada summer: I found a large Black Prince ______.", ["pencil", "hair", "backyard", "cicada"]),
    q("mcq", "10", "It had a beautiful, black and brown ______.", ["backyard", "flower", "shell", "foot"]),
    q("mcq", "11", "Cicadas suck ______ from plants.", ["potatoes", "apples", "trees", "juice"]),
    q("mcq", "12", "They have two pairs of ______ for flying.", ["legs", "heads", "eggs", "wings"]),
    q("mcq", "13", "Choose a word to describe taste. Nanna cooks ______ cakes.", ["yellow", "delicious", "red", "blue"]),
    q("mcq", "14", "Which of the following correctly completes this sentence? The dog chewed on an ______ bone.", ["huge", "enormous", "big", "large"]),
    q("mcq", "15", f"{wc} ______ kind of cicada do you like best?", ["This", "That", "Those", "Which"]),
    q("mcq", "16", f"{wc} Kathy said, “This is ______ book.”", ["which", "she’s", "she", "my"]),
    q("mcq", "17", f"{wc} Year 2 children have ______ spelling test tomorrow.", ["their", "you’re", "my", "his"]),
    q("mcq", "18", "Choose the correct word. Henry has ______ swimming lesson tomorrow.", ["a", "an", "her", "them"]),
    q("mcq", "19", "Choose the correct word. ______ children have a reading test now.", ["A", "An", "The", "This"]),
    q("mcq", "20", "Choose the correct word. A cicada is ______ interesting insect.", ["a", "an", "these", "him"]),
    q("mcq", "21", "Magpies: A ______ of magpies lives …", ["family", "birds", "trees", "street"]),
    q("mcq", "22", "… in the ______ near my home.", ["river", "caves", "ocean", "trees"]),
    q("mcq", "23", "The baby ______ are always hungry.", ["trees", "eggs", "birds", "nest"]),
    q("mcq", "24", "The ______ bring …", ["babies", "parents", "trees", "fish"]),
    q("mcq", "25", "… the babies ______ all day long.", ["nest", "food", "lollies", "flowers"]),
]
# rebuild the grammar Real Test block with the book's questions in order
start, end, items = _blocks_array(c, W, D)
for it in items:
    if heading_of(it) == "Grammar & Punctuation — Real Test":
        new = block("Grammar & Punctuation — Real Test", rt,
                    instructions="Questions 9–12: read the text Cicada summer and choose the best word for each gap. Questions 21–25: the writing about magpies has gaps — choose the best noun for each gap.")
        c.s = c.s.replace(it, new, 1)
        break
heads = list_headings(c, W, D)
i = heads.index("Grammar & Punctuation — Adjectives")
set_blocks(c, W, D, heads[:i + 1] + [{"src": noun_groups}] + heads[i + 1:])
c.save(); print("Week 1 Day 3 patched")
