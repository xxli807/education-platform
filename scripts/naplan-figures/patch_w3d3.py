"""Week 3 Day 3: spelling + grammar rebuilt in book order (book IMG_9976-9983). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, _blocks_array, heading_of, relink_legacy, remap

c = Content(); W, D = 3, 3
B = "Week 3/Day 3/"

LONG = ["m__ke", "t__me", "b__te", "th__se", "h__pe", "t__be", "__pe", "sl__pe", "th__me", "r__be", "c__be", "__se", "c__ke", "g__me", "h__ke",
        "c__me", "r__pe", "n__ce", "r__ce", "h__se", "c__te", "d__se", "d__ce", "n__te", "pol__te", "__ce", "h__de", "r__te", "h__te", "k__te"]
long_v = block("Spelling — Long vowels (silent e)", [q("short", i + 1, w) for i, w in enumerate(LONG)],
               instructions="These words all end in a silent e. Add the missing vowel to each word.")
PICS = [("p", "plane", "An aeroplane"), ("p", "plate", "A plate"), ("s", "snake", "A snake"), ("b", "bike", "A bike")]
pics = block("Spelling — Silent e pictures", [q("short", i + 1, f"Starts with “{l}”", figure=f"w3d3-clue-{k}", alt=alt, width=84) for i, (l, k, alt) in enumerate(PICS)],
             instructions="Write a label for each drawing. Each answer has a silent e.")
QU = ["s__ash", "s__ish", "s__elch", "s__eeze", "__iet", "__ick", "__ite", "__ack", "__ake", "__arrel", "__een", "__estion"]
qu = block("Spelling — “qu” words", [q("short", i + 1, w) for i, w in enumerate(QU)], instructions="Add ‘qu’ to each word.")
contr = block("Spelling — Contractions", [q("short", i + 1, w) for i, w in enumerate(["do not", "it is", "I am", "he is", "did not", "we are", "you are", "she is"])],
              instructions="Write these words as contractions.")
BL = ["f__", "pl__", "p__er", "st__e", "f__m", "st__", "sh__er", "sh__t", "al__m", "bef__e", "Mond__", "h__", "__l", "h__d", "g__den"]
blends = block("Spelling — Vowel/consonant blends", [q("short", i + 1, w) for i, w in enumerate(BL)],
               instructions="Choose the correct letters from the box to make words.\nBox: or, ar, ay, ow")
DICT = [("Lee and I cooked a ______ for Mum’s birthday.", "cake"), ("We ______ to see you soon.", "hope"), ("I only ______ one mistake in the test.", "made"),
        ("Let’s ______ a fruit salad.", "make"), ("______ your brain in the test.", "use"), ("Ben won a ______ for spelling.", "prize"),
        ("I walked ______ from school.", "home"), ("Be kind to animals or they might ______ you.", "bite"), ("It’s ______ for bed.", "time"),
        ("Put the lid on the ______ of toothpaste.", "tube"), ("Dad and I flew the ______ today.", "kite"), ("Please shut the ______.", "gate"),
        ("You have a lovely ______.", "smile"), ("Our teacher ______ like us to talk during a test.", "doesn’t"), ("Sometimes I ______ with my sister.", "quarrel"),
        ("I ______ like to eat squishy bananas.", "don’t"), ("Hold the ______ as you climb.", "rope"), ("I will do gym this ______.", "Saturday")]
dictation = block("Spelling — Real Test (dictation)", [q("dictation", i + 1, p, word=w) for i, (p, w) in enumerate(DICT)],
                  instructions="Press Listen to hear each word in its sentence, then write the word in the box.")
UNDER = ["I kicked my toe on a *ston*.", "I *hayt* the taste of oysters.", "Keep your hands by your *sid*.", "*Sav* your money in the bank.",
         "The bread was *stal*.", "I *chos* Fred to be my partner.", "I saw some dairy *cowhs* on the farm.", "We had *rela* races for sport."]
find1 = block("Spelling — Find the incorrect word", [q("short", 19 + i, p) for i, p in enumerate(UNDER)],
              instructions="Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.")
FIND2 = "Spelling — Find the incorrect word yourself"
HIDDEN = ["Ned kwit the team when he hurt his foot.", "I heard the duck kwack.", "The story was about a king and kween.",
          "You need to be kwick with the lunch orders.", "There was an earthkwake in Mexico.", "The teacher asked the children to keep kwiet during the concert.",
          "I dont like hot dogs.", "Its’ time for our library lesson.", "Your’e a great goalkeeper."]
find2 = block(FIND2, [q("short", 27 + i, p) for i, p in enumerate(HIDDEN)],
              instructions="Each sentence has one word that is incorrect. Find it and write the correct spelling.")

GT = "Grammar & Punctuation — Sentences and punctuation"
P = "Choose a punctuation mark from the box ( ! ? . ): "
grammar_tys = block(GT, [
    q("short", 1, P + "“Be careful ___” shouted Mum."), q("short", 2, P + "Allan ate yoghurt and fruit ___"),
    q("short", 3, P + "Where is the softball ___"), q("short", 4, P + "Today is Monday ___"),
    q("short", 5, "Write a statement to answer this question about yourself: What is your name?"),
    q("short", 6, "Write a statement to answer this question about yourself: How old are you?"),
    q("short", 7, "Write a statement to answer this question about yourself: Where do you live?"),
    q("short", 8, "Write a statement to answer this question about yourself: What is your favourite food?"),
    q("short", 9, "Write a question for this answer: “I live in Belrose.”"),
    q("short", 10, "Write a question for this answer: “My favourite animal is a …”"),
    q("short", 11, "Write a question for this answer: “I don’t have any pets.”"),
    q("short", 12, "Write a question for this answer: “I play soccer.”"),
    q("short", 13, "Write fact or opinion: Charlotte’s Web is a great story."), q("short", 14, "Write fact or opinion: There are twelve months in a year."),
    q("short", 15, "Write fact or opinion: Bees make honey."), q("short", 16, "Write fact or opinion: I love honey on toast."),
    q("short", 17, "Rewrite the sentence correctly using speech marks: Can we go to the zoo? asked Harriet."),
    q("short", 18, "Rewrite the sentence correctly using speech marks: Stop that! yelled Liam.")])

RT = "Grammar & Punctuation — Real Test"
BOX = "Add a word from the box (because, and, until, so) to complete the sentence: "
real = block(RT, [
    q("mcq", 1, "Which of the following is a sentence?", ["Grandma’s garden.", "Joe and his stepmother.", "Rina lives with her stepfather.", "a timber house."]),
    q("mcq", 2, "Which words correctly complete this sentence? “Lina was early for school ______.”",
      ["but she helped the teacher", "so she helped the teacher", "then she helped the teacher", "because she helped the teacher"]),
    q("mcq", 3, "Which sentence has the correct punctuation?", ["Grandpa lives with us?", "Grandpa lives in Wagga Wagga?", "Where does your grandfather live?", "Grandpa was born in Athens?"]),
    q("mcq", 4, "Choose the correct word and punctuation mark to fill the gap. “Did you invite your parents to the ______”", ["Concert!", "Concert.", "concert?", "concert"]),
    q("mcq", 5, "Choose the correct word and punctuation mark to fill the gap. “Look out, ______”", ["Nan", "Nan.", "Nan?", "Nan!"]),
    q("mcq", 6, "Which words correctly complete this sentence? “Sachin is becoming a good cricket player ______.”",
      ["so he practises every day", "then he practises every day", "but he practises every day", "because he practises every day"]),
    q("mcq", 7, "Choose the correct punctuation mark to fill the gap. A car was coming. Mark shouted, “Careful ___”", [".", ",", "?", "!"]),
    q("mcq", 8, "Which sentence has the correct punctuation?", ["Where is your brother.", "Where is your brother!", "Where is your brother?", "Where is your brother"]),
    q("mcq", 9, "Which sentence has incorrect punctuation?", ["Where is Kenny.", "Why is Nia here?", "Where is your homework?", "Are you ready?"]),
    q("mcq", 10, "Which word should start with a capital letter? “I think aadrika is a good name for an elephant.”", ["aadrika", "good", "name", "elephant"]),
    q("mcq", 11, "Which word should start with a capital letter? “The zoo in sydney has elephants and giraffes.”", ["sydney", "elephants", "and", "giraffes"]),
    q("mcq", 12, "Where should the missing full stop go?\nTim had soccer (A) practice (B) yesterday (C) Today (D) he does gymnastics.", ["A", "B", "C", "D"], row=True),
    q("mcq", 13, "Where should the missing full stop go?\nIt is raining (A) today (B) I hope (C) it will be (D) sunny tomorrow.", ["A", "B", "C", "D"], row=True),
    q("short", 14, "Where should the two speech marks ( “ ” ) go? Write two letters.\n(A) Will you help me practise (B) goal kicking? (C) asked Jessica. (D)"),
    q("short", 15, "Where should the two speech marks ( “ ” ) go? Write two letters.\n(A) Stop! (B) Don’t cross (C) the road yet, (D) shouted Keith."),
    q("mcq", 16, "Where should the exclamation mark ( ! ) go?\n“Yuk (A) ” shrieked Julia (B) . (C) “That (D) tasted terrible.”", ["A", "B", "C", "D"], row=True),
    q("mcq", 17, "Which words correctly complete this sentence? “He was late home ______.”",
      ["but the bus was late", "because the bus was late", "although the bus was late", "and the bus was late"]),
    q("mcq", 18, "Which word correctly completes this sentence? “______ the classroom was so hot, the teacher read to the class under a tree.”", ["Until", "Because", "Although", "And"]),
    q("mcq", 19, "Which word correctly completes this sentence? “______ it was raining, Sara decided to walk to the park.”", ["Until", "Because", "Although", "Since"]),
    q("mcq", 20, "Which word correctly completes this sentence? “______ it stopped raining, the dogs had to stay indoors.”", ["Until", "Because", "Although", "Since"]),
    q("short", 21, BOX + "Kate ran to school ______ she’d have time to play."),
    q("short", 22, BOX + "Carl ran to school ______ he wanted to race Frankie."),
    q("short", 23, BOX + "Matilda ran ______ she ran out of breath."),
    q("short", 24, BOX + "Jin ran to the corner ______ then he walked the rest of the way."),
    q("mcq", 25, "Which sentence below is closest in meaning to these sentences? “Yusuf’s cat is very tiny. It is called Alpa which is a Hindu word meaning ‘little’.”",
      ["Yusuf has a tiny cat called Alpa.", "Alpa is a Hindu word for Yusuf’s cat.", "Yusuf’s tiny cat is called Alpa which means ‘little’ in Hindu.", "Yusuf’s cat is tiny and called Alpa."]),
])

start, end, items = _blocks_array(c, W, D)
assert [heading_of(i) for i in items] == ["Spelling — Long vowels (silent e)", "Spelling — Silent e pictures", "Spelling — “qu” words", "Spelling — Contractions",
    "Spelling — Vowel/consonant blends", "Spelling — Real Test (dictation)", "Spelling — Find the incorrect word", GT, RT], [heading_of(i) for i in items]
allb = [long_v, pics, qu, contr, blends, dictation, find1, find2, grammar_tys, real]
c.s = c.s[:start] + "\n" + ",\n".join(allb) + ",\n" + c.s[end:]
c.save()

remap(f"{B}Spelling — Long vowels (silent e)/", {2: 3, 3: 6, 4: 9, 6: 11, 7: 14, 8: 17, 9: 18, 10: 21})
remap(f"{B}Spelling — “qu” words/", {2: 3, 3: 5, 4: 7, 5: 9, 6: 11, 7: 12})
remap(f"{B}Spelling — Vowel/consonant blends/", {1: "retired", 2: "retired", 4: "retired", 3: 7, 5: 2, 6: 5, 7: 8, 8: 9, 9: 3, 10: 11})
remap(f"{B}Spelling — Real Test (dictation)/", {1: "retired", 3: "retired"})
for n in range(27, 36):
    relink_legacy(f"{B}Spelling — Find the incorrect word/{n}", f"{B}{FIND2}/{n}")
# grammar TYS: old 11/12 were the pets/soccer questions (now 11/12 again); old had no 10
remap(f"{B}{RT}/", {n: "retired" for n in (2, 3, 7, 10, 11, 12, 13, 14, 15, 16)})
print("ok")
