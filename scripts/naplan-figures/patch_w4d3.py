"""Week 4 Day 3: spelling and grammar in book order with missing items (book IMG_0010-0016). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, _blocks_array, heading_of, remap, relink_legacy

c = Content(); W, D = 4, 3
B = "Week 4/Day 3/"
PL, SG, UN, SF = "Spelling — Plural nouns", "Spelling — Singular nouns", "Spelling — Prefix “un”", "Spelling — Suffixes"
plurals = block(PL, [q("short", i + 1, w) for i, w in enumerate("bird peach body child man sheep mango whale bench baby mouse woman fish potato teacher lunch chilli foot tooth rice tomato".split())],
                instructions="Answer the questions below and then use a dictionary to check your spelling. Write the plurals of these nouns.")
singular = block(SG, [q("short", i + 1, w) for i, w in enumerate("races doctors toothbrushes geese days dingoes people fairies puppies shoes foxes ponies".split())],
                 instructions="Write the singular for these nouns.")
un = block(UN, [q("short", i + 1, w) for i, w in enumerate("cover available clean eaten usual tidy believable finished decided dress likely done".split())],
           instructions="Use the prefix ‘un’ to write opposites for these words.")
suffix = block(SF, [q("short", i + 1, f"{w} + {s}") for i, (s, w) in enumerate([(s, w) for s in ("ful", "less", "ing") for w in ("help", "hope", "care")])],
               instructions="Add the suffixes to the following words. Write the new words.")
DICT = [("Li chopped the ______ for dinner.", "potatoes"), ("Maya put lots of ______ in the salad.", "tomatoes"), ("I love ______.", "cherries"),
        ("Ten ______ attended the meeting.", "women"), ("Both of my ______ hurt after the race.", "feet"), ("All the ______ cried at the same time.", "babies"),
        ("The fruit shop sells nice ______.", "mangoes"), ("Five ______ ran to the fence.", "sheep"), ("Boys and girls sat on separate ______.", "benches"),
        ("The dentist looked at my ______ today.", "teeth"), ("The ______ ran around the bush at dusk.", "dingoes"), ("The ______ waddled next to the creek.", "geese"),
        ("The ______ ate all the cheese.", "mice"), ("I went in a number of ______ at the sports carnival.", "races"), ("The duckling was ______ against the current.", "helpless"),
        ("We bought two ______ of bread for the picnic.", "loaves"), ("Dad said to be ______ of people’s opinions.", "respectful"), ("The pod of ______ swam along the coast.", "whales")]
dictation = block("Spelling — Real Test (dictation)", [q("dictation", i + 1, p, word=w) for i, (p, w) in enumerate(DICT)],
                  instructions="Press Listen to hear each word in its sentence, then write the word in the box.")
FIND1, FIND2 = "Spelling — Find the incorrect word", "Spelling — Find the incorrect word yourself"
find1 = block(FIND1, [q("short", 19 + i, p) for i, p in enumerate(["That chair is *unncomfortable*.", "My shoes always come *unndone*.", "Katy’s work was *unfinisht*.",
    "The teacher said to *unnfold* the paper.", "Be *carefull* crossing the road.", "Kara is *helpping* Mindi with her story.", "The child was *careliss* with her bike.",
    "My sister is *hopeliss* at cleaning her room."])], instructions="Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.")
find2 = block(FIND2, [q("short", 27 + i, p) for i, p in enumerate(["The gardnor mowed the grass.", "The runnor hurt her foot.", "The cyclest fell off his bike.",
    "Mum bought flowers from the florest.", "My dentest rides her bike to work.", "Our local bakor makes delicious bread rolls.", "The docter looked at my tonsils.",
    "The plumba fixed our leaking roof.", "Mr Chen is my teacha."])], instructions="Each line has one word that is incorrect. Find it and write the correct spelling.")

GT, RT = "Grammar & Punctuation — Adverbs, pronouns and comparatives", "Grammar & Punctuation — Real Test"
OPP = "Choose an adverb from the box (loudly, happily, quickly, kindly) that means the opposite of: "
HOW = "The HOW adverb is written incorrectly. Write it correctly: "
PRON = "Write a personal pronoun from the box (she, them, it, We) to complete the sentence: "
gtys = block(GT, [q("short", 1, OPP + "slowly"), q("short", 2, OPP + "quietly"), q("short", 3, OPP + "sadly"), q("short", 4, OPP + "angrily"),
    q("mcq", 5, "Choose a pronoun to complete the sentence. “Tim and Elli are in the library. ______ are reading.”", ["They", "Them", "Us", "We"]),
    q("short", 6, HOW + "The lizard flicked its tongue out *quick*."), q("short", 7, HOW + "Possums climb *good*."), q("short", 8, HOW + "The turtle crawled *slow*."),
    q("short", 9, HOW + "The parrot cracked the seed *easy*."), q("short", 10, HOW + "The turtle snapped *hungry* at the fish."),
    q("short", 11, HOW + "The page was *bad* torn."), q("short", 12, HOW + "The lorikeet squawked *loud*."),
    q("mcq", 13, "Choose a word or words to complete the sentence. “Which painting is ______?”", ["colour fullest", "the most colourful", "colour-fuller", "colouring"]),
    q("mcq", 14, "Choose an adjective to complete the sentence. “My bag is ______ than yours,” said Frank.", ["heavy", "heaviest", "heavily", "heavier"]),
    q("short", 15, PRON + "Shane is my best friend. ______ play soccer together."), q("short", 16, PRON + "Pass the ball to Leanne so ______ can kick the goal."),
    q("short", 17, PRON + "The children had worked well so the teacher gave ______ a surprise."), q("short", 18, PRON + "The dog was barking so I told ______ to be quiet.")])
WB = "Which word best completes the sentence? "
BOX = "Choose a word from the box (him, They, I, me) to complete the sentence: "
BIG = "Choose a word from the box (biggest, big, bigger) for the sentence: "
WC = "Which word correctly completes the sentence? "
real = block(RT, [
    q("mcq", 1, WB + "“The goanna walked ______.”", ["lost", "loud", "soft", "softly"]),
    q("mcq", 2, WB + "“The beetle munched ______.”", ["noisily", "thickly", "thinly", "crunching"]),
    q("mcq", 3, WB + "“Smile ______ for the class photo.”", ["wrongly", "nicely", "hopefully", "loudly"]),
    q("mcq", 4, WB + "“Hit the nail ______ with the hammer.”", ["fast", "carefully", "hungrily", "quick"]),
    q("mcq", 5, "That is Jack’s book. Give it to him. In this sentence the word “it” is used instead of", ["Jack.", "him.", "the book.", "a handshake."]),
    q("mcq", 6, "These shoes are full of mud. Clean them. In this sentence the word “them” is used instead of", ["mud.", "Jack.", "these shoes.", "cleaning."]),
    q("mcq", 7, "Which word or words tell how you would pat a kitten?", ["outside", "then", "in the dark", "gently"]),
    q("short", 8, BOX + "I asked Kia to come to the park with ______."), q("short", 9, BOX + "Liam sits next to me so I help ______ with maths."),
    q("short", 10, BOX + "Koalas are marsupials. ______ eat eucalyptus leaves."), q("short", 11, BOX + "My name is Zac. ______ live in Padstow."),
    q("mcq", 12, WC + "“Some people like cats ______ than dogs.”", ["best", "better", "more better", "good"]),
    q("short", 13, BIG + "That elephant is ______."), q("short", 14, BIG + "The red balloon is ______ than the green balloon."),
    q("short", 15, BIG + "The blue balloon is the ______ of them all."),
    q("mcq", 16, "Which word or words correctly complete the sentence? “This yoghurt tastes ______ than that yoghurt.”", ["best", "better", "more best", "more good"]),
    q("mcq", 17, WC + "“My sister ran ______ in the race.”", ["great", "well", "good", "wonderful"]),
    q("mcq", 18, WC + "“A carpet snake lived ______ in our roof.”", ["quiet", "silent", "quietly", "quitly"]),
    q("mcq", 19, "Which sentence is correct?", ["Stack the books carefully on the shelf.", "Stack the books carefully at the shelf.", "Stack the books careful over the shelf.", "Stack the books towards the shelf careful."]),
    q("mcq", 20, "Which word or words correctly complete the sentence? “I am the ______ runner in the class,” said Paulo.", ["fastest", "faster", "most fast", "more fast"]),
    q("mcq", 21, WC + "“The kookaburra sang ______.”", ["loud", "loudly", "silently", "happy"]),
    q("mcq", 22, WC + "“Are you going to the park? Can I come with ______?”", ["them", "him", "she", "you"]),
    q("mcq", 23, WC + "“This pencil belongs to Lara. Give it to ______.”", ["you", "her", "us", "I"]),
    q("mcq", 24, "Which sentence is correct?", ["The magpies flew swift.", "The magpies flew good.", "The magpies flew swiftly.", "The magpies flew softly."]),
    q("mcq", 25, WC + "“Mum said the battery was ______.”", ["deader", "dead", "deadest", "deadly"])])
start, end, items = _blocks_array(c, W, D)
assert len(items) == 8, [heading_of(i) for i in items]
c.s = c.s[:start] + "\n" + ",\n".join([plurals, singular, un, suffix, dictation, find1, find2, gtys, real]) + ",\n" + c.s[end:]
c.save()
remap(f"{B}{PL}/", {8: 11, 9: 12, 10: 14})
remap(f"{B}{SG}/", {2: 6, 4: 2, 5: 4, 6: 8})
remap(f"{B}{SF}/", {2: 4, 3: 7, 4: 2, 6: 8})
for n in range(27, 36):
    relink_legacy(f"{B}{FIND1}/{n}", f"{B}{FIND2}/{n}")
remap(f"{B}{GT}/", {5: "retired", 13: "retired", 14: "retired"})
remap(f"{B}{RT}/", {8: "retired", 9: "retired", 10: "retired", 11: "retired", 13: "retired", 14: 15, 18: 19, 17: 18, 16: 17, 15: "retired", 20: "retired", 21: "retired"})
print("ok")
