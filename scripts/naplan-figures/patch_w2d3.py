"""Week 2 Day 3: spelling + grammar rebuilt in book order (book IMG_9944-9950). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, _blocks_array, relink_legacy

c = Content(); W, D = 2, 3
B = "Week 2/Day 3/"

# --- Spelling: Test Your Skills ---
CLUES = [("st", "fly", "A fly"), ("mp", "stamp", "A stamp"), ("nd", "hand", "A hand"), ("nk", "skunk", "A smelly skunk"),
         ("ng", "bell", "A ringing bell"), ("sk", "mask", "A mask"), ("lt", "belt", "A belt"), ("ft", "cat", "A soft cat")]
blends = block("Spelling — Consonant blends",
    [q("short", i + 1, f"A word ending in “{end}”", figure=f"w2d3-clue-{k}", alt=alt, width=64) for i, (end, k, alt) in enumerate(CLUES)],
    instructions="Choose letters from the box to make words that end with the letters below. Use the pictures to help.\nBox: ma, ha, cla, sti, pe, so, sta, be")
starts = block("Spelling — Beginning blends",
    [q("short", i + 1, f"A word starting with “{s}”") for i, s in enumerate(["bl", "cr", "fr", "sl", "tr", "scr", "shr", "thr"])],
    instructions="Write words that start with the following letters.")
rhymes = block("Spelling — Rhyming words with silent letters",
    [q("short", 1, "(silent b) thumb → cr__"), q("short", 2, "(silent ‘gh’) flight → n__"), q("short", 3, "(silent l) would → c__")],
    instructions="Write rhyming words for the words with silent letters.")
silent = block("Spelling — Silent letters",
    [q("short", i + 1, p) for i, p in enumerate(["We__nesday", "shou__d", "autum__", "__nuckle", "i__land", "lis__en", "__nock", "si__t"])],
    instructions="Add the missing silent letters from the box to finish each word.\nBox: d, n, s, k, k, gh, t, l")
digraphs = block("Spelling — Vowel digraphs",
    [q("short", i + 1, w) for i, w in enumerate(["school", "eat", "blue", "boot", "rain", "meet"])],
    instructions="Write words with the same pairs of vowels and the same vowel sounds as each word below.")

DICT = [("“______ down from the tree,” called Dad.", "climb"), ("The gorilla’s ______ scraped on the ground.", "knuckles"),
        ("The dog followed the ______ of the cat.", "scent"), ("______ wants to play chess?", "who"),
        ("I get my new reading glasses on ______.", "Wednesday"), ("I wish I ______ go to Jenna’s after school.", "could"),
        ("Some trees lose their leaves in ______.", "autumn"), ("I borrowed a book about Kangaroo ______.", "Island"),
        ("Ya-ya is ______ the baby a jumper.", "knitting"), ("Grandpa said his ______ is sore.", "knee"),
        ("I dressed up as a ______ for Halloween.", "ghost"), ("Please use a ______ to tidy your hair.", "comb"),
        ("King Arthur is said to have pulled a ______ from a stone.", "sword"), ("Do you ______ what time the movie starts?", "know"),
        ("I heard the brakes on the car ______.", "squeal"), ("You must ______ to the instructions.", "listen"),
        ("Be gentle or the cat will ______ you.", "scratch"), ("Recycle ______ cans.", "steel")]
dictation = block("Spelling — Real Test (dictation)", [q("dictation", i + 1, p, word=w) for i, (p, w) in enumerate(DICT)],
    instructions="Press Listen to hear each word in its sentence, then write the word in the box.")
UNDER = ["We ate *samon* sandwiches.", "“Our boat *sanks*,” said Luis.", "Ben *whent* to the library at lunchtime.",
         "“I ate the *hole* mango,” said Petra.", "*Lisen* to the teacher.", "The children played on the *beech*.",
         "The story was about *nights* who fought battles.", "My shoes are too *tite*.", "It takes one *our* to drive to Grandpa’s."]
find1 = block("Spelling — Find the incorrect word", [q("short", 19 + i, p) for i, p in enumerate(UNDER)],
    instructions="Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.")
HIDDEN = ["The jumper might shringk in the wash.", "Rose sprained her rist.", "Henry stomped through the puddle in his boowts.",
          "We had swimming races in the pule.", "I used gloo to stick the foil onto my collage.", "You shoud walk your dog every day.",
          "I mite go to the park later.", "Thinck about your spelling."]
FIND2 = "Spelling — Find the incorrect word yourself"
find2 = block(FIND2, [q("short", 28 + i, p) for i, p in enumerate(HIDDEN)],
    instructions="Each sentence has one word that is incorrect. Find it and write the correct spelling.")

# --- Grammar: Test Your Skills ---
verbs = block("Grammar & Punctuation — Verbs", [
    q("short", 1, "Tran ______ his horse to school today. (ride, rode, riding)"),
    q("short", 2, "Denni ______ an apple every day. (eats, eaten, eating)"),
    q("short", 3, "Angus can ______ fifty metres. (swam, swimming, swim)"),
    q("short", 4, "The children have ______ their homework. (finish, finishing, finished)")],
    instructions="Write the correct doing verb in each space.")
HELP = "Grammar & Punctuation — Helper verbs"
helper = block(HELP, [q("short", 5, "My clever dog ______ count to three."), q("short", 6, "We ______ learn our spelling for the test."),
    q("short", 7, "Dad ______ try to fix my bike yesterday."), q("short", 8, "Mum ______ eaten all the strawberries.")],
    instructions="Choose a helper verb from the box for each sentence.\nBox: must, has, can, did")
THINK = "Grammar & Punctuation — Thinking verbs"
thinking = block(THINK, [q("short", 9, "Mum is ______ about Grandma."), q("short", 10, "I ______ walking our dog."),
    q("short", 11, "Grandpa ______ to watch tennis."), q("short", 12, "David ______ the tooth fairy will visit tonight.")],
    instructions="Choose a thinking verb from the box to complete each sentence.\nBox: believes, worried, like, loves")
saying = block("Grammar & Punctuation — Saying verbs", [
    q("short", 13, "“Jump in the pond!” ______ the mother duck."), q("short", 14, "“It’s so much fun!” ______ the children from the Ferris wheel."),
    q("short", 15, "“Stay out of my cave!” ______ the Troll."), q("short", 16, "“Woof woof!” ______ the dog.")],
    instructions="Choose a saying verb from the box to complete each sentence.\nBox: barked, called, quacked, grunted")
punct = block("Grammar & Punctuation — Lists and time order", [
    q("mcq", 17, "Which sentence is punctuated correctly?", ["Tina bought eggs flour sugar oats and walnuts",
        "Tina bought eggs flour sugar oats and walnuts.", "Tina bought eggs, flour, sugar, oats and walnuts.",
        "Tina bought eggs, flour, sugar, oats, and, walnuts."]),
    q("short", 18, "Number the sentences in time order, 1–3, starting with what happens first (1).\n__ Then I cleaned my teeth.\n__ I had dinner.\n__ After that I went to bed.", numeric=True)])

# --- Grammar: Real Test ---
RT = "Grammar & Punctuation — Real Test"
BOX1 = "Choose a word from the box (were, was, are, is): "
BOX2 = "Choose a word from the box (are, is, has, am): "
BOX3 = "Choose a doing verb from the box to start the command (Beat, Add, Bake, Pour): "
real = block(RT, [
    q("mcq", 1, "Which sentence is correct?", ["The frog jump over the lily pad.", "The frog jumping over the lily pad.",
        "The frog jumper over the lily pad.", "The frog jumped over the lily pad."]),
    q("short", 2, BOX1 + "The ducks ______ swimming in the pond yesterday."),
    q("short", 3, BOX1 + "The duck ______ swimming in the pond yesterday."),
    q("short", 4, BOX1 + "A duck ______ swimming in the pond, right now."),
    q("short", 5, BOX1 + "Ducks ______ swimming in the pond, right now."),
    q("mcq", 6, "Which of the following correctly completes this sentence? “Tomorrow we ______ to the library.”", ["will go", "be going", "went", "had gone"]),
    q("mcq", 7, "Which sentence is correct?", ["The children is collecting autumn leaves.", "The children were collecting autumn leaves.",
        "The children was collecting autumn leaves.", "The children will collecting autumn leaves."]),
    q("mcq", 8, "A comma ( , ) has been left out of this sentence. Where should the comma go?\nDad bought (A) rice, cashews, chicken (B) broccoli (C) and (D) onions for the stir fry.",
      ["A — after “bought”", "B — after “chicken”", "C — after “broccoli”", "D — after “and”"]),
    q("mcq", 9, "Which word correctly completes this sentence? “Billy counted his pencils and ______ that some were missing.”", ["seen", "saw", "sawn", "see"]),
    q("mcq", 10, "Which word correctly completes this sentence? “Let’s read a book,” ______ Mum.", ["talk", "suggested", "asked", "speaking"]),
    q("mcq", 11, "Which word correctly completes this sentence? “Helen ______ she is tired.”", ["sayed", "saying", "say", "said"]),
    q("mcq", 12, "Which word or word group correctly completes this sentence? “Pets quickly become sick if ______ in a hot car.”", ["lefted", "left", "being left", "leaved"]),
    q("mcq", 13, "Which of these is a complete sentence?", ["Go to the library.", "Five fat frogs.", "My friend’s house.", "Mum and Dad."]),
    q("short", 14, BOX2 + "My name ______ Petra."), q("short", 15, BOX2 + "I ______ eight years old."),
    q("short", 16, BOX2 + "Children in Dunedoo ______ lucky."), q("short", 17, BOX2 + "Dunedoo ______ great schools."),
    q("mcq", 18, "Which of these is a complete sentence?", ["Fabien and Tina.", "Yesterday, at midnight.", "Wendy ran in the race.", "Bread and honey."]),
    q("mcq", 19, "Which sentence tells about the past?", ["I went to the park.", "I want to go to the park.", "I will go to the park.", "I am going to the park."]),
    q("short", 20, BOX3 + "______ the flour to the mixture."), q("short", 21, BOX3 + "______ the eggs until smooth."),
    q("short", 22, BOX3 + "______ the juice into a glass."), q("short", 23, BOX3 + "______ in a hot oven for 30 minutes."),
    q("mcq", 24, "Which sentence has the correct punctuation?", ["“I love stories about aliens said Frankie.”",
        "“I love stories, about aliens” said Frankie.", "“I love stories about aliens,” said Frankie.", "“I love stories about aliens,” said, Frankie"]),
    q("mcq", 25, "Choose the correct word to complete this sentence. “Yuki does not ______ peanuts.”", ["eating", "ate", "eaten", "eat"]),
])

start, end, _ = _blocks_array(c, W, D)
allb = [blends, starts, rhymes, silent, digraphs, dictation, find1, find2, verbs, helper, thinking, saying, punct, real]
c.s = c.s[:start] + "\n" + ",\n".join(allb) + ",\n" + c.s[end:]
c.save()

R = lambda h, n: f"{B}{h}/{n}"
# consonant blends: -ng inserted as 5
for o, n in ((7, 8), (6, 7), (5, 6)):
    relink_legacy(R("Spelling — Consonant blends", o), R("Spelling — Consonant blends", n))
# silent letters: book order island, listen, knock, sight
S = "Spelling — Silent letters"
relink_legacy(R(S, 7), R(S, 8)); relink_legacy(R(S, 5), "tmp-swap"); relink_legacy(R(S, 6), R(S, 5)); relink_legacy("tmp-swap", R(S, 6))
for n in range(28, 36):
    relink_legacy(R("Spelling — Find the incorrect word", n), R(FIND2, n))
for n in (5, 6, 7, 8):
    relink_legacy(R("Grammar & Punctuation — Verbs", n), R(HELP, n))
for n in (9, 10):
    relink_legacy(R("Grammar & Punctuation — Verbs", n), R(THINK, n))
# grammar Real Test: old 1 (made-up), 6 and 8 (options changed) retired; others renumbered to the book
for n in (1, 6, 8):
    relink_legacy(R(RT, n), "retired/" + R(RT, n))
relink_legacy(R(RT, 5), R(RT, 6)); relink_legacy(R(RT, 3), R(RT, 5)); relink_legacy(R(RT, 4), R(RT, 3))
print("ok")
