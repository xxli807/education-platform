"""Week 4 Day 2: tables, graphs, spinners and dice drawn; questions in book order (book IMG_0002-0008). Applied once."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from patch_util import Content, q, block, _blocks_array, remap, relink_legacy

c = Content(); W, D = 4, 2
B = "Week 4/Day 2/"
T1, G1, CH, RT = "Test Your Skills — Reading a table (races won)", "Test Your Skills — Graphs", "Test Your Skills — Chance", "Real Test"
tys_table = block(T1, [
    q("short", 1, "How many races did Bella win?", figure="w4d2-tys1-races", alt="Races won: Max 3, Ben 7, Bella 5, Tara 4, Jack 2", width=250, numeric=True),
    q("short", 2, "Which student won exactly 4 races?"), q("short", 3, "Who won the most races?"),
    q("short", 4, "How many races did Max and Jack win altogether?", numeric=True),
    q("short", 5, "How many more races did Ben win than Tara?", numeric=True)],
    instructions="This table shows the number of races some students won at a swimming carnival.")
graphs = block(G1, [
    q("short", 6, "Some students voted for their favourite fruit. How many voted for apple?", figure="w4d2-tys1-fruit",
      alt="Column graph of favourite fruit: apple 9, banana 12, orange 7, peach 5, plum 1", width=380, numeric=True),
    q("short", 7, "Which fruit did exactly 7 students vote for?"), q("short", 8, "Which fruit was the most popular?"),
    q("short", 9, "How many students voted for peach and plum altogether?", numeric=True),
    q("short", 10, "How many more students voted for banana than for peach?", numeric=True),
    q("short", 11, "Some students chose their favourite animal at the zoo. How many students chose elephant?", figure="w4d2-tys1-zoo",
      alt="Picture graph, each paw is 1 student: lion 5, tiger 3, elephant 4, koala 6, gorilla 7", width=330, numeric=True),
    q("short", 12, "Which animal did exactly 5 students choose?"), q("short", 13, "Which animal was chosen by the most students?"),
    q("short", 14, "How many students chose lion and tiger altogether?", numeric=True),
    q("short", 15, "How many more students chose gorilla than koala?", numeric=True)])
DICE = "Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets "
chance = block(CH, [
    q("short", 1, "Students voted for their favourite football team. How many votes did the Lions get?", figure="w4d2-tys2-football",
      alt="Picture graph, each football is 2 votes: Rams 3 balls, Sharks 5, Bears 2 and a half, Lions 4, Bulls 4 and a half", width=330, numeric=True),
    q("short", 2, "How many votes does half a football stand for?", figure="w4d2-tys2-half-ball", alt="Half a football", width=30, numeric=True),
    q("short", 3, "How many votes did the Bulls get?", numeric=True), q("short", 4, "Which team got exactly 5 votes?"),
    q("short", 5, "This spinner is spun. Which colour is most likely?", figure="w4d2-tys2-spinner",
      alt="Spinner: white is the biggest part, then green, then blue, and red is the smallest", width=160),
    q("short", 6, "Which colour is least likely?"),
    q("short", 7, "This is a dice. It has the numbers from 1 to 6 on its faces, one number on each face. " + DICE + "1.", figure="w4d2-tys2-dice", alt="A dice", width=80),
    q("short", 8, DICE + "less than 1."), q("short", 9, DICE + "more than 1."), q("short", 10, DICE + "7."), q("short", 11, DICE + "less than 7."),
    q("short", 12, "What number does tally 12 show?", figure="w4d2-tys2-tally", alt="Tally marks: 12 shows 3 marks, 13 shows a bundle of 5, 14 shows a bundle of 5 and 4 more, 15 shows four bundles of 5", width=200, numeric=True),
    q("short", 13, "What number does tally 13 show?", numeric=True), q("short", 14, "What number does tally 14 show?", numeric=True),
    q("short", 15, "What number does tally 15 show?", numeric=True)])
real = block(RT, [
    q("short", 1, "Some students voted for their favourite movies. How many more students voted for Kangaroos than voted for Old Dogs?",
      figure="w4d2-rt-q1", alt="Favourite movie votes: Good Times 7, Old Dogs 10, Red and Blue 8, Kangaroos 13", width=280, numeric=True),
    q("mcq", 2, "This dish holds some jelly beans. Which describes the chance of taking a green jelly bean from this dish?", ["impossible", "unlikely", "likely", "certain"],
      figure="w4d2-rt-q2", alt="A dish of 10 jelly beans: 3 black, 4 red, 2 yellow, 1 green", width=340),
    q("mcq", 3, "This graph shows the number of hours Mr Lee spent at work this week. On what day did Mr Lee spend exactly 5 hours at work?",
      ["Monday", "Tuesday", "Wednesday", "Friday"], figure="w4d2-rt-q3", alt="Picture graph, each clock is 1 hour: Monday 3, Tuesday 5, Wednesday 3 and a half, Thursday 7, Friday 6", width=300),
    q("short", 4, "This graph shows the number of cars of different colours in a car park. Which is correct? Select all possible answers (write the letters).\n"
      "A There were more black cars than silver cars.\nB There were more red cars than black cars.\nC There were more blue cars than white cars.\nD There were more silver cars than blue cars.",
      figure="w4d2-rt-q4", alt="Column graph of car colours: white 12, red 6, blue 5, silver 8, black 3", width=380),
    q("mcq", 5, "Some students voted for class captain. How many students voted for Mia?", ["0", "4", "5", "6"],
      figure="w4d2-rt-q5", alt="Tally chart: Ahmed 7, Billy 4, Mia 5, Jenny 3, Xavier 6", width=220),
    q("mcq", 6, "On which number is this spinner most likely to stop?", ["1", "2", "3", "4"], figure="w4d2-rt-q6",
      alt="Spinner: 3 is half of it, 1 is a quarter, 2 and 4 are small parts", width=130, row=True),
    q("short", 7, "This table shows the number of boys and girls in three classes. How many children are in 2P?", figure="w4d2-rt-q7",
      alt="Class 2K: 13 boys, 14 girls. 2P: 15 boys, 11 girls. 2Y: 12 boys, 12 girls.", width=250, numeric=True),
    q("short", 8, "This graph shows the number of cherries some students ate. How many cherries did Jill eat?", figure="w4d2-rt-q8",
      alt="Picture graph, each cherry picture is 2 cherries: Mike 3 and a half, Jill 6, Alice 2 and a half, Roy 4 and a half", width=270, numeric=True),
    q("mcq", 9, "These dice are rolled and the numbers added together. Which is impossible?", ["1", "5", "9", "11"], figure="w4d2-rt-q9", alt="Two dice", width=130, row=True),
    q("short", 10, "Some students counted birds. How many birds did Sid and Eli count altogether?", figure="w4d2-rt-q10",
      alt="Birds counted: Sid 8, Dana 5, Ruby 2, Nat 9, Eli 4, Sam 6", width=420, numeric=True)])
start, end, items = _blocks_array(c, W, D)
assert len(items) == 4
c.s = c.s[:start] + "\n" + ",\n".join([tys_table, graphs, chance, real]) + ",\n" + c.s[end:]
c.save()
remap(f"{B}{T1}/", {2: 3, 3: 2})
remap(f"{B}{CH}/", {1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 5, 7: 6})
remap(f"{B}{G1}/", {7: "retired", 11: "tmp11", 12: "tmp12", 13: 11, 14: 13})
relink_legacy(f"{B}{G1}/tmp11", f"{B}{CH}/1")
relink_legacy(f"{B}{G1}/tmp12", f"{B}{CH}/4")
remap(f"{B}{RT}/", {4: "retired", 5: "retired"})
print("ok")
