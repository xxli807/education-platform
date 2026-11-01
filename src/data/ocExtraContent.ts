// "OC Extra Practice" card — three ORIGINAL practice sets written for this app
// in the style of the NSW OC test (not official papers). Same layout and time
// limits as the official practice tests: Reading 40 min (33), Maths 40 min
// (35), Thinking Skills 30 min (30).
//
// Quality checks behind every answer key: each computable maths/thinking
// answer was recomputed by a script, and every question was solved blind by a
// separate reviewer and compared with the key; ambiguous wording was rewritten.

import type { OcCollection } from './ocTypes';

export const ocExtra: OcCollection = {
  title: '✨ OC Extra Practice',
  storageKey: 'ocExtraAnswers',
  source:
    'Original OC-style practice sets written for this app — not official NSW papers. Every answer has been checked twice.',
  practices: [
    {
      label: 'Set 1',
      papers: [
        {
          id: 'reading',
          title: 'Reading',
          emoji: '📖',
          minutes: 40,
          answers: 'BCADCBCDBABADCABBCABCDAEGDABCADBC',
          blocks: [
            {
              heading: 'The Lighthouse Key',
              instructions:
                'Read the extract below from a short story, then answer the questions.\nFor questions 1 – 6, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                "Eleven-year-old Poppy is spending the winter holidays with her great-uncle Arthur, who once kept the lighthouse on Gull Point.\n\nThe key was heavier than Poppy expected. It hung from a nail beside the kitchen door, brown with rust and as long as her hand, and Uncle Arthur's eyes followed it every time she walked past.\n\n‘That opens the lighthouse,’ he said on her third morning, without looking up from his crossword. ‘Not that there's anything in there now but gulls and memories.’\n\nPoppy had already decided she would see inside. The lighthouse stood at the end of a narrow spit of rock, white paint peeling like sunburnt skin. From the cottage window it looked close enough to touch, but Uncle Arthur said the path was only safe when the tide was out.\n\n‘The sea doesn't forgive people who forget about it,’ he said, tapping the tide chart pinned above the stove. ‘Low water's at two o'clock today. You'd have until about half past three.’\n\nIt was not quite permission, but it was not a no, either.\n\nAt ten past two Poppy picked her way along the spit, the key bumping against her hip in her coat pocket. Rock pools glittered on either side, and a crab sidled away from her shadow. The lock fought her at first. She had to lean her whole weight against the key before it turned with a groan, and the door swung inward on air that smelled of salt and old oil.\n\nInside, a staircase curled upward like the inside of a shell. Poppy counted the steps as she climbed — ninety-six — and arrived, breathless, in the lamp room at the top. The great lens sat in the middle, dusty but whole, its rings of glass catching the grey light and throwing small rainbows across the walls. Scratched into the window frame were initials and dates: A.H. 1961, A.H. 1974, A.H. 1988. Uncle Arthur had been marking something, year after year.\n\nShe was so busy tracing the letters with her finger that she did not notice the light changing. When she finally looked down, the rock pools had disappeared. Water was sliding across the spit in long, silver tongues.\n\nPoppy's heart thudded. She ran down all ninety-six steps, but by the time she reached the door the path was a sheet of moving water, ankle-deep and getting deeper.\n\nThen she saw him: Uncle Arthur, standing on the cottage steps, one hand raised. He did not shout or wave her across. He simply pointed upward — back towards the lamp room — and held up three fingers.\n\nIt took her a moment to understand. Three hours. The tide would turn and fall again, and the lighthouse would keep her dry until it did. She climbed back up, slower this time, and sat beside the lens while the sea pressed against the rocks below.\n\nIt was nearly dark when the path reappeared. Uncle Arthur was waiting at the end of it with a torch and a thermos of cocoa.\n\n‘I carved my first initials up there the night I got stuck,’ he said, handing her the cup. ‘Nineteen sixty-one. My father let me sit there until I'd learned my lesson.’ He paused. ‘You'd better bring a pocketknife next time.’",
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    "Why does Uncle Arthur's gaze follow the key when Poppy walks past it?",
                  options: [
                    'He is worried she might lose it.',
                    'He suspects she is curious about the lighthouse.',
                    'He wants her to fetch it for him.',
                    'He has forgotten what it opens.',
                  ],
                  explanation:
                    'He watches the key because he can tell Poppy is interested in the lighthouse — the story later shows she has already decided to see inside.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'The words ‘It was not quite permission, but it was not a no, either’ suggest that',
                  options: [
                    'Poppy misunderstood what her uncle said.',
                    "Uncle Arthur was annoyed by Poppy's questions.",
                    'Uncle Arthur gave Poppy the information she needed without directly telling her she could go.',
                    'Poppy decided to disobey her uncle.',
                  ],
                  explanation:
                    'Arthur tells her the tide times and how long she would have, which lets her go safely, but he never actually says ‘yes’.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'What distracts Poppy so that she does not notice the tide coming in?',
                  options: [
                    'the initials and dates scratched into the window frame',
                    'the rainbows thrown by the lens',
                    'counting the steps of the staircase',
                    'the crab in the rock pool',
                  ],
                  explanation:
                    '‘She was so busy tracing the letters with her finger that she did not notice the light changing.’',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt: 'Uncle Arthur holds up three fingers to tell Poppy',
                  options: [
                    'that she has three minutes to run across.',
                    'to climb three flights of stairs.',
                    "that he will come for her at three o'clock.",
                    'to wait about three hours until the tide goes out again.',
                  ],
                  explanation:
                    'Poppy works it out: ‘Three hours. The tide would turn and fall again.’',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    "At the end of the extract, Uncle Arthur's words show that he",
                  options: [
                    'is angry that Poppy put herself in danger.',
                    'plans to lock the lighthouse so she cannot go back.',
                    'sees her adventure as similar to his own when he was young.',
                    'is disappointed that she did not carve her initials.',
                  ],
                  explanation:
                    'He tells her about getting stuck himself in 1961 and suggests she bring a pocketknife — he sees her experience as like his own first one.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'Which description best fits how Uncle Arthur is presented throughout the extract?',
                  options: [
                    'careless',
                    'quietly wise',
                    'strict and unkind',
                    'easily frightened',
                  ],
                  explanation:
                    'He warns her about the tide, stays calm when she is stranded, guides her with a simple signal and waits with cocoa — calm and wise rather than strict or careless.',
                },
              ],
            },
            {
              heading: 'The Great Barrier Reef',
              instructions:
                'For questions 7 – 14, read the text below and decide which answer best fits each gap. Circle the one correct answer (A, B, C or D).',
              passage:
                'Stretching for more than 2300 kilometres along the Queensland coast, the Great Barrier Reef is the largest living structure on Earth. It is so vast that astronauts can (7) ________ it from space. Yet the reef is built by creatures smaller than a fingernail: coral polyps, which (8) ________ themselves to rocks and slowly build limestone skeletons that pile up over thousands of years.\n\nThe reef is home to an astonishing (9) ________ of species, including more than 1500 kinds of fish. Many of these species (10) ________ on the coral for food and shelter.\n\nUnfortunately, the reef is under (11) ________. When the ocean becomes too warm, corals lose the tiny algae that give them colour and energy, and turn a ghostly white. This process, (12) ________ as bleaching, can kill large areas of coral if the warm water lasts too long.\n\nScientists are working hard to (13) ________ the damage. Some are growing young corals in nurseries, while others are searching for heat-resistant corals that might help the reef (14) ________ in a warmer world.',
              questions: [
                {
                  type: 'mcq',
                  n: '7',
                  prompt: '',
                  options: ['glance', 'peer', 'glimpse', 'stare'],
                  row: true,
                  explanation:
                    '‘glimpse it from space’ — see it briefly. ‘glance’, ‘peer’ and ‘stare’ all need ‘at’ (glance at it), so only ‘glimpse’ fits.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt: '',
                  options: ['adhere', 'cling', 'hold', 'attach'],
                  row: true,
                  explanation:
                    '‘attach themselves to rocks’. ‘adhere’ and ‘cling’ cannot take ‘themselves’ (you adhere to / cling to something), and ‘hold themselves to’ has a different meaning.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt: '',
                  options: ['amount', 'variety', 'deal', 'mass'],
                  row: true,
                  explanation:
                    '‘an astonishing variety of species’ — many different kinds. ‘amount’, ‘deal’ and ‘mass’ are used for things you cannot count, not for species.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt: '',
                  options: ['rely', 'insist', 'trust', 'base'],
                  row: true,
                  explanation:
                    '‘rely on the coral for food and shelter’ means need it. ‘insist on’ means demand, ‘trust on’ is not English, and ‘base on’ needs an object (base something on).',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt: '',
                  options: ['risk', 'threat', 'danger', 'harm'],
                  row: true,
                  explanation:
                    'The fixed phrase is ‘under threat’. We say ‘at risk’ and ‘in danger’, not ‘under’ them.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt: '',
                  options: ['known', 'called', 'named', 'titled'],
                  row: true,
                  explanation:
                    '‘known as bleaching’ — only ‘known’ is followed by ‘as’ in this way (‘called bleaching’ would need no ‘as’).',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt: '',
                  options: ['recover', 'rescue', 'revive', 'repair'],
                  row: true,
                  explanation:
                    'We ‘repair damage’. You cannot recover, rescue or revive ‘the damage’ — those words are about the thing that was damaged.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt: '',
                  options: ['outlast', 'overcome', 'survive', 'withstand'],
                  row: true,
                  explanation:
                    '‘help the reef survive in a warmer world’. ‘outlast’, ‘overcome’ and ‘withstand’ all need an object (withstand the heat), so they do not fit before ‘in a warmer world’.',
                },
              ],
            },
            {
              heading: 'The Old Gum Tree',
              instructions:
                'Read the poem below, then answer the questions.\nFor questions 15 – 19, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                '1\nAt the bottom of our paddock\nstands a gum tree, bent and grey,\nwith its arms held out to heaven\nas if it had something to say.\n\n2\nIn summer it throws shadows\nlike a blanket on the ground,\nand the cattle crowd beneath it\nwithout making a sound.\n\n3\nIn storms it creaks and grumbles\nlike an old man in his chair,\nbut it never once has fallen,\nthough the wind has torn its hair.\n\n4\nMy grandfather once climbed it\nwhen the tree and he were young;\nnow he leans on it for comfort\nand its branches hold his tongue.\n\n5\nWhen I am old, I wonder,\nwill it still be standing there,\nwith its arms held out to heaven\nand the sky caught in its hair?',
              questions: [
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    'In verse 1, the poet describes the tree as if it were',
                  options: [
                    'a person.',
                    'a cloud.',
                    'a building.',
                    'an animal.',
                  ],
                  explanation:
                    'The tree has ‘arms held out to heaven’ and seems to have ‘something to say’ — it is described like a person (personification).',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt: 'In verse 2, the cattle crowd under the tree because',
                  options: [
                    'they are frightened of the storm.',
                    'it gives them shade.',
                    'they are eating its leaves.',
                    'the farmer has fenced them in.',
                  ],
                  explanation:
                    "The tree's shadows are ‘like a blanket on the ground’ in summer, so the cattle gather in its shade.",
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt: 'What does verse 3 suggest about the tree?',
                  options: [
                    'It is about to fall down.',
                    'It is noisy but strong.',
                    'It is angry with the wind.',
                    'It has lost all its leaves.',
                  ],
                  explanation:
                    'It ‘creaks and grumbles’ (noisy) but ‘never once has fallen’ (strong).',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'In verse 4, the line ‘its branches hold his tongue’ suggests that the grandfather',
                  options: [
                    'has been hurt by the tree.',
                    'is too old to speak.',
                    'becomes quiet and thoughtful there.',
                    'is telling the tree a secret.',
                  ],
                  explanation:
                    'To ‘hold your tongue’ is to stay silent; leaning on the tree, the grandfather becomes quiet and reflective.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt: 'How does the last verse connect to the first verse?',
                  options: [
                    "It repeats the image of the tree's arms held out to heaven.",
                    'It describes a different tree.',
                    'It explains why the tree is grey.',
                    'It tells us the tree has been cut down.',
                  ],
                  explanation:
                    'Verse 5 repeats ‘with its arms held out to heaven’ from verse 1, linking the start and end of the poem.',
                },
              ],
            },
            {
              heading: 'The Platypus Puzzle',
              instructions:
                'Read the text below then answer the questions. Six sentences have been removed from the text. Choose from the sentences (A – G) the one which fits each gap (20 – 25). There is one extra sentence which you do not need to use.',
              note: "A.  Instead, it finds its food using its bill.\nB.  They thought someone had sewn a duck's bill onto the body of a beaver as a joke.\nC.  A female usually lays two small, leathery eggs and curls around them to keep them warm.\nD.  Male platypuses have a sharp spur on each back ankle that can deliver a painful sting.\nE.  To manage this, they store food in pouches in their cheeks while they hunt and eat it at the surface.\nF.  Platypuses are also found in Tasmania.\nG.  Droughts, dams and pollution have all damaged the streams they depend on.",
              passage:
                "When the first platypus specimen arrived in England in 1799, scientists were baffled. (20) ________ One scientist even tried to cut off the bill with scissors, looking for the stitches he was sure were there.\n\nToday we know the platypus is very real, and even stranger than those early scientists imagined. It is one of only a few mammals in the world that lay eggs. (21) ________ The babies, called puggles, then drink milk that seeps from patches on their mother's skin, because the platypus has no nipples.\n\nThe platypus is also one of the few venomous mammals. (22) ________ The venom is not deadly to humans, but people who have been stung say the pain can last for weeks.\n\nPerhaps the most remarkable thing about the platypus is how it hunts. It closes its eyes, ears and nose when it dives. (23) ________ Thousands of tiny sensors in the bill detect the electrical signals given off by the muscles of shrimps, worms and insect larvae hiding in the mud.\n\nPlatypuses must eat about a quarter of their body weight every day. (24) ________ The food is then ground up between hard pads, because adult platypuses have no teeth.\n\nSadly, platypus numbers have fallen in many rivers. (25) ________ Scientists are now asking people to report sightings so that they can track where platypuses still live.",
              questions: [
                {
                  type: 'mcq',
                  n: '20',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'The scientists were ‘baffled’, and the next sentence about cutting off the bill to find ‘stitches’ shows they thought the animal had been sewn together as a joke (B).',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'After ‘lay eggs’ comes how the eggs are laid and kept warm (C), before ‘The babies … then drink milk’.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    '‘one of the few venomous mammals’ is followed by how the venom is delivered — the spur (D) — before ‘The venom is not deadly’.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'With its eyes, ears and nose closed, it must find food another way: ‘Instead, it finds its food using its bill’ (A); the next sentence explains the sensors in the bill.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'Eating a quarter of its body weight is managed by storing food in cheek pouches (E); ‘The food is then ground up’ follows on.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    '‘numbers have fallen’ is explained by droughts, dams and pollution (G). F (Tasmania) is the extra sentence.',
                },
              ],
            },
            {
              heading: 'Extracts',
              instructions:
                'Read the four extracts below on the theme of space. For questions 26 – 33, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                "EXTRACT A\nWhen I was seven, my father woke me at midnight and carried me out to the back paddock in a blanket. ‘Look up,’ he said. I had seen stars before, of course, but never like this — so many that the sky seemed dusty with them, the Milky Way spilling across it like spilt sugar. He named the constellations he knew, and made up names for the ones he didn't. I have since looked through some of the world's largest telescopes, but none of them has ever made me feel as small, or as happy, as that night in the paddock.\n\nEXTRACT B\nThe International Space Station travels around the Earth at about 28 000 kilometres per hour, completing an orbit roughly every 90 minutes. This means the astronauts on board see around sixteen sunrises and sixteen sunsets every day. To keep their body clocks steady, they follow a strict schedule based on Greenwich Mean Time, and they use shades over the windows when they sleep.\n\nEXTRACT C\nLiving in space sounds glamorous, but daily life can be surprisingly difficult. Without gravity, liquids form floating blobs, so astronauts drink through straws from sealed pouches. Washing hair requires a special no-rinse shampoo. Even sleeping has its challenges: astronauts zip themselves into sleeping bags attached to the wall so they do not drift into equipment during the night. Many say the hardest part is the lack of fresh food.\n\nEXTRACT D\nFor thousands of years, Aboriginal and Torres Strait Islander peoples have read the night sky as a calendar. The appearance of certain stars at dawn signalled when it was time to collect emu eggs, or when particular fish would be running in the rivers. The dark shapes within the Milky Way, rather than the stars themselves, form the Emu in the Sky — one of the best known of these star stories.",
              questions: [
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    'Which extract… describes how people used the stars to know when to gather certain foods?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: stars at dawn signalled when to collect emu eggs or when fish would be running.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt: 'Which extract… describes a childhood memory?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'A: ‘When I was seven, my father woke me at midnight…’',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'Which extract… explains why astronauts see many sunrises in a day?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: the station orbits every 90 minutes, giving about sixteen sunrises a day.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    'Which extract… mentions practical problems of everyday life in space?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'C: floating liquids, washing hair, sleeping bags fixed to the wall.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'Which extract… compares an early experience with later scientific equipment?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'A: the writer says no large telescope has matched the feeling of that night in the paddock.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt:
                    'Which extract… refers to shapes made by dark areas rather than by stars?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: ‘The dark shapes within the Milky Way, rather than the stars themselves, form the Emu in the Sky’.',
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'Which extract… mentions a way of keeping a regular sleep pattern?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: astronauts follow a strict schedule and use window shades when they sleep.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'Which extract… suggests that something people imagine to be exciting can be hard in reality?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'C: ‘Living in space sounds glamorous, but daily life can be surprisingly difficult.’',
                },
              ],
            },
          ],
        },
        {
          id: 'maths',
          title: 'Mathematical Reasoning',
          emoji: '🔢',
          minutes: 40,
          answers: 'BADBEADCDBEDBECAABDEBDAAECDEBACCABE',
          blocks: [
            {
              heading: 'Questions 1 – 35',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Tara has 4 packets of 18 stickers and 12 loose stickers. She shares all of them equally among 7 friends. How many stickers does each friend get?',
                  options: ['11', '12', '13', '14', '15'],
                  explanation:
                    '4 × 18 = 72, and 72 + 12 = 84 stickers. 84 ÷ 7 = 12, so each friend gets 12.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'What number is 5 thousands, 14 hundreds, 3 tens and 26 ones?',
                  options: ['6456', '6466', '6546', '51 456', '54 326'],
                  explanation: '5000 + 1400 + 30 + 26 = 6456.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'A movie started at 6:45 pm and lasted 1 hour 50 minutes. After it finished, the family took 25 minutes to drive home. What time did they get home?',
                  options: [
                    '8:35 pm',
                    '8:50 pm',
                    '8:55 pm',
                    '9:00 pm',
                    '9:10 pm',
                  ],
                  explanation:
                    '6:45 pm + 1 h 50 min = 8:35 pm. 8:35 pm + 25 min = 9:00 pm.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'Mia ate 1/4 of a pizza and Ben ate 1/3 of the same pizza. What fraction of the pizza is left?',
                  options: ['1/3', '5/12', '1/2', '7/12', '2/3'],
                  explanation:
                    '1/4 + 1/3 = 3/12 + 4/12 = 7/12 eaten. 1 − 7/12 = 5/12 is left.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt: 'Which number is a multiple of both 6 and 8?',
                  options: ['54', '56', '60', '64', '72'],
                  explanation:
                    'Multiples of both 6 and 8 are multiples of 24: 24, 48, 72, … Only 72 is in the list. (54 and 60 are multiples of 6 only; 56 and 64 of 8 only.)',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'A rectangle has an area of 36 square centimetres. One of its sides is 4 cm long. What is its perimeter?',
                  options: ['26 cm', '28 cm', '30 cm', '36 cm', '40 cm'],
                  explanation:
                    'The other side is 36 ÷ 4 = 9 cm. Perimeter = 4 + 9 + 4 + 9 = 26 cm.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'In this sequence, each number is found by doubling the previous number and adding 1.\n2, 5, 11, 23, 47, …\nWhat is the next number?',
                  options: ['71', '89', '94', '95', '98'],
                  explanation: '47 × 2 + 1 = 95.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    'Pens cost $1.35 each, or $4.80 for a pack of 4. What is the lowest price for exactly 10 pens?',
                  options: ['$11.70', '$12.00', '$12.30', '$12.90', '$13.50'],
                  explanation:
                    'Try the options: 10 single pens = $13.50; 1 pack + 6 singles = $4.80 + $8.10 = $12.90; 2 packs + 2 singles = $9.60 + $2.70 = $12.30. The lowest is $12.30.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    'A bag holds 3 red, 5 blue and 4 green marbles. Ella takes out one red marble and keeps it. She then picks one marble from the bag without looking. What is the chance that it is green?',
                  options: ['1/4', '3/11', '1/3', '4/11', '5/12'],
                  explanation:
                    'After the red marble is removed there are 11 marbles left, and 4 of them are green. The chance is 4/11.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    'What is the smaller angle between the hour hand and the minute hand of a clock at 3:30?',
                  options: ['60°', '75°', '85°', '90°', '105°'],
                  explanation:
                    'The minute hand points at 6 (180°). The hour hand is halfway between 3 and 4: 90° + 15° = 105°. The angle between them is 180° − 105° = 75°.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'I think of a number. I multiply it by 4, then subtract 7. The answer is 45. What number did I think of?',
                  options: ['8', '10', '11', '12', '13'],
                  explanation: 'Work backwards: 45 + 7 = 52, and 52 ÷ 4 = 13.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt:
                    'A shop recorded how many apples it sold each day.\nThe average (mean) for the five days was 25 apples. How many apples were sold on Friday?',
                  options: ['25', '28', '30', '32', '35'],
                  table: 'Mon  Tue  Wed  Thu  Fri\n 24   18   30   21    ?',
                  explanation:
                    'Five days with a mean of 25 is 5 × 25 = 125 apples. Mon–Thu = 24 + 18 + 30 + 21 = 93. Friday = 125 − 93 = 32.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'Sam has a 2.5 kg bag of flour. Each cake uses 650 g. He bakes 3 cakes. How much flour is left?',
                  options: [
                    '450 g',
                    '550 g',
                    '650 g',
                    '1 kg 550 g',
                    '1 kg 850 g',
                  ],
                  explanation:
                    '3 × 650 g = 1950 g. 2.5 kg = 2500 g. 2500 − 1950 = 550 g.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt:
                    'Three identical cubes are glued face to face in a straight row. How many square faces of the cubes can be seen on the outside of the shape (including the bottom)?',
                  options: ['10', '11', '12', '13', '14'],
                  explanation:
                    'Three cubes have 18 faces. Each of the 2 joins hides 2 faces, so 4 faces are hidden. 18 − 4 = 14.',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    'The sum of three consecutive whole numbers is 84. What is the largest of the three numbers?',
                  options: ['27', '28', '29', '30', '31'],
                  explanation:
                    'The middle number is 84 ÷ 3 = 28, so the numbers are 27, 28 and 29. The largest is 29.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    'There are 40 students in a group. 3/5 of them walk to school. 1/4 of the rest ride bikes. How many students ride bikes?',
                  options: ['4', '6', '8', '10', '16'],
                  explanation:
                    '3/5 of 40 = 24 walk. The rest is 40 − 24 = 16. 1/4 of 16 = 4 ride bikes.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'Lena buys 3 books at $7.85 each. She pays with $30. How much change should she get?',
                  options: ['$6.45', '$6.55', '$7.15', '$7.45', '$16.45'],
                  explanation: '3 × $7.85 = $23.55. $30.00 − $23.55 = $6.45.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'Matchsticks are used to make a row of squares. 1 square uses 4 matchsticks, 2 squares use 7 and 3 squares use 10. How many matchsticks are needed for a row of 12 squares?',
                  options: ['36', '37', '40', '48', '49'],
                  explanation:
                    'Each new square adds 3 matchsticks to the first 4. For 12 squares: 4 + 11 × 3 = 37.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'A tap fills a 12-litre bucket in 3 minutes. At the same rate, how long will it take to fill a 100-litre tank?',
                  options: [
                    '12 minutes',
                    '15 minutes',
                    '20 minutes',
                    '25 minutes',
                    '33 minutes',
                  ],
                  explanation:
                    'The tap gives 12 ÷ 3 = 4 litres per minute. 100 ÷ 4 = 25 minutes.',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt: 'Which number is closest to 3.5?',
                  options: ['3.48', '3.6', '3.55', '3.45', '3.505'],
                  explanation:
                    'Differences from 3.5: 3.48 → 0.02, 3.6 → 0.1, 3.55 → 0.05, 3.45 → 0.05, 3.505 → 0.005. The closest is 3.505.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    '1 March is a Wednesday. March has 31 days. What day of the week is 1 April?',
                  options: [
                    'Friday',
                    'Saturday',
                    'Sunday',
                    'Monday',
                    'Tuesday',
                  ],
                  explanation:
                    '1 April is 31 days after 1 March. 31 = 4 weeks + 3 days, so it is 3 days after Wednesday: Saturday.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'A rectangle measures 10 cm by 8 cm. A smaller rectangle, 4 cm by 3 cm, is cut out of one corner. What is the perimeter of the shape that is left?',
                  options: ['29 cm', '30 cm', '32 cm', '36 cm', '39 cm'],
                  explanation:
                    'Cutting a rectangle from a corner removes two edges (4 cm and 3 cm) but adds two new edges of the same lengths. So the perimeter is unchanged: 10 + 8 + 10 + 8 = 36 cm.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'A two-digit number has digits that add up to 11. Its ones digit is 3 more than its tens digit. What is the number?',
                  options: ['47', '56', '65', '74', '83'],
                  explanation:
                    'Tens digit t and ones digit t + 3 add to 11, so 2t + 3 = 11 and t = 4. The number is 47.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt: 'What is 51 × 19?',
                  options: ['969', '979', '989', '1019', '1069'],
                  explanation: '51 × 19 = 51 × 20 − 51 = 1020 − 51 = 969.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    'In a class of 30 students, the ratio of boys to girls is 2 : 3. How many more girls than boys are there?',
                  options: ['2', '3', '4', '5', '6'],
                  explanation:
                    '2 + 3 = 5 parts, so each part is 30 ÷ 5 = 6 students. Boys = 12, girls = 18. 18 − 12 = 6 more girls.',
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    'Sam has only 20c and 50c coins. He has 9 coins altogether, worth $3.00. How many 50c coins does he have?',
                  options: ['2', '3', '4', '5', '6'],
                  explanation:
                    'If all 9 were 20c coins they would be worth $1.80. Each swap of a 20c for a 50c adds 30c. $3.00 − $1.80 = $1.20, and $1.20 ÷ 30c = 4. So he has 4 fifty-cent coins (and 5 twenty-cent coins).',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'A whole number rounds to 3700 when rounded to the nearest hundred, and to 3650 when rounded to the nearest ten. Which of these could it be?',
                  options: ['3645', '3647', '3649', '3652', '3655'],
                  explanation:
                    'Rounding to 3650 (nearest ten) means 3645–3654. Rounding to 3700 (nearest hundred) means 3650–3749. Both are true only for 3650–3654, so 3652.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'A closed box (with a lid) measuring 5 cm by 4 cm by 3 cm is completely filled with 1 cm cubes. How many of the cubes touch at least one face of the box, including the bottom and the lid?',
                  options: ['47', '48', '50', '52', '54'],
                  explanation:
                    'There are 5 × 4 × 3 = 60 cubes. The cubes that touch no side form an inner block of 3 × 2 × 1 = 6. 60 − 6 = 54.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    'This pattern continues: 1, 4, 9, 16, 25, … What is the 12th number in the pattern?',
                  options: ['121', '144', '156', '169', '196'],
                  explanation:
                    'These are square numbers: the nth number is n × n. The 12th is 12 × 12 = 144.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    '3 apples and 2 oranges weigh 800 g. 1 apple and 2 oranges weigh 480 g. How much does one apple weigh?',
                  options: ['160 g', '180 g', '200 g', '240 g', '320 g'],
                  explanation:
                    'The difference between the two groups is 2 apples, which weigh 800 − 480 = 320 g. One apple weighs 160 g.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt:
                    'On a map, 1 cm stands for 5 km. Two towns are 7.5 cm apart on the map. How far apart are they really?',
                  options: ['12.5 km', '35 km', '37.5 km', '40 km', '75 km'],
                  explanation: '7.5 × 5 = 37.5 km.',
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'How many whole numbers from 1 to 100 contain the digit 7 at least once?',
                  options: ['17', '18', '19', '20', '21'],
                  explanation:
                    'Ones digit 7: 7, 17, …, 97 (10 numbers). Tens digit 7: 70–79 (10 numbers). 77 is counted twice, so 10 + 10 − 1 = 19.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'Five friends share $47. Each gets a whole number of dollars and no two friends get the same amount. What is the largest amount the friend with the least money could have?',
                  options: ['$7', '$8', '$9', '$10', '$11'],
                  explanation:
                    'To make the smallest share as big as possible, make the shares as close as possible: x, x+1, x+2, x+3, x+4 add to 5x + 10 ≤ 47, so x ≤ 7. With $7, $8, $9, $10 and $13 (total $47) it works. $8 would need at least 8+9+10+11+12 = $50.',
                },
                {
                  type: 'mcq',
                  n: '34',
                  prompt:
                    'A 24-hour digital clock shows 12:51. In how many minutes will the clock next show a time whose digits read the same forwards and backwards (like 11:11)?',
                  options: ['30', '40', '50', '60', '70'],
                  explanation:
                    'Times that read the same both ways look like 12:21, 13:31, 14:41, … The next one after 12:51 is 13:31, which is 40 minutes later.',
                },
                {
                  type: 'mcq',
                  n: '35',
                  prompt:
                    'Adult tickets cost $12 and child tickets cost $7. A group of 10 people paid $95 altogether. How many adults were in the group?',
                  options: ['1', '2', '3', '4', '5'],
                  explanation:
                    'If all 10 were children: 10 × $7 = $70. Each adult adds $5 more. $95 − $70 = $25, and $25 ÷ $5 = 5 adults.',
                },
              ],
            },
          ],
        },
        {
          id: 'thinking',
          title: 'Thinking Skills',
          emoji: '🧠',
          minutes: 30,
          answers: 'ADABCBDBBADAADCCBCDDBDDCABAACB',
          blocks: [
            {
              heading: 'Questions 1 – 30',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Five children stand in a line, one behind another.\n• Ana is somewhere in front of Ben.\n• Ben is directly in front of Dev.\n• Cal is directly behind Dev.\n• Eve is last.\nWho is first in the line?',
                  options: ['Ana', 'Ben', 'Cal', 'Dev'],
                  explanation:
                    'Ben, Dev and Cal stand together in that order, and Eve is fifth. Ana must be in front of Ben, so the line is Ana, Ben, Dev, Cal, Eve.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'Ms Lee says: “Students who read for 20 minutes every night become better spellers.”\nWhich one of these statements, if true, best supports what Ms Lee says?',
                  options: [
                    'Some students prefer reading comics to novels.',
                    'Spelling tests at the school are held every Friday.',
                    'Ms Lee has always enjoyed reading.',
                    'In a study, students who read every night improved their spelling more than similar students who did not.',
                  ],
                  explanation:
                    'Only D gives evidence that nightly reading is linked to spelling improving, compared with similar students who did not read.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'At the town pool, everyone who swims in the deep end must have passed the swimming test. Some children who have passed the test are under 8 years old.\nKira: “If Tom is swimming in the deep end, he must have passed the test.”\nLeo: “Mia has passed the test, so she must be swimming in the deep end.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Kira only',
                    'Leo only',
                    'Both Kira and Leo',
                    'Neither Kira nor Leo',
                  ],
                  explanation:
                    'Kira is right: anyone in the deep end has passed. Leo is wrong: passing the test allows you to swim in the deep end but does not mean you are doing so.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'In a secret code, each letter is replaced by the letter two places after it in the alphabet. For example, CAT is written as ECV.\nWhat word is written as IQQF?',
                  options: ['FOOD', 'GOOD', 'HOOD', 'WOOD'],
                  explanation:
                    'Move each letter two places back: I → G, Q → O, Q → O, F → D. The word is GOOD.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    '“Our team will win on Saturday because our best player is back from injury.”\nWhich assumption has been made?',
                  options: [
                    'The other team has some injured players.',
                    "Saturday's game will be played at home.",
                    'Having the best player back is enough to make the team win.',
                    'The team lost its last game.',
                  ],
                  explanation:
                    "The speaker jumps from ‘our best player is back’ to ‘we will win’, so they assume the player's return is enough for a win.",
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'Jake has swimming every 3 days and piano every 4 days. He had both on Monday 1st June. On what date will he next have both on the same day?',
                  options: ['12th June', '13th June', '24th June', '25th June'],
                  explanation:
                    'Both happen together every 12 days (the lowest common multiple of 3 and 4). 1st + 12 days = 13th June.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'All the books on the top shelf are mysteries. Some mysteries are funny. None of the funny books are long.\nWhich one of these must be true?',
                  options: [
                    'All the books on the top shelf are funny.',
                    'No books on the top shelf are long.',
                    'Some long books are mysteries.',
                    'Some funny books are mysteries.',
                  ],
                  explanation:
                    'If some mysteries are funny, then some funny books are mysteries. The others might be true but do not have to be: the top-shelf mysteries may not be funny, so some of them could be long.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    "Raj says: “Every time I wear my red socks, my team wins. So my red socks make my team win.”\nWhich one of these shows the mistake in Raj's reasoning?",
                  options: [
                    'He has not said how many games his team has played.',
                    'He thinks that because two things happen together, one must cause the other.',
                    'He should wear his red socks to every game.',
                    'His team might lose next week.',
                  ],
                  explanation:
                    "Raj's socks and his team's wins happen at the same time, but that does not show the socks cause the wins.",
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    "Emma and Finn's ages add up to 22. Emma is 4 years older than Finn. How old will Finn be in 5 years' time?",
                  options: ['13', '14', '15', '18'],
                  explanation:
                    'If Finn is f, then f + (f + 4) = 22, so f = 9. In 5 years Finn will be 14.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    'The library is open Monday to Friday. On Wednesdays it closes at 1 pm; on the other days it closes at 5 pm. Story time is only held on days when the library is open after 3 pm.\nNoah: “There is never story time on a Wednesday.”\nIvy: “There is story time every weekday except Wednesday.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Noah only',
                    'Ivy only',
                    'Both Noah and Ivy',
                    'Neither Noah nor Ivy',
                  ],
                  explanation:
                    'Noah is right: on Wednesdays the library is not open after 3 pm. Ivy is wrong: story time can only be on the other days, but we are not told it is held on all of them.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'A large cube is painted red on all six faces. It is then cut into 27 equal small cubes. How many of the small cubes have red paint on exactly two faces?',
                  options: ['4', '6', '8', '12'],
                  explanation:
                    'Small cubes with exactly two painted faces sit in the middle of each edge of the large cube. A cube has 12 edges, with one such small cube on each, so 12.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt:
                    '“Sunny Bay beach is cleaner than Rocky Point, because fewer bottles were picked up at Sunny Bay during Clean-Up Day.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'The Sunny Bay clean-up lasted only half an hour, but the Rocky Point clean-up lasted all day.',
                    'Rocky Point is a popular beach for fishing.',
                    'Plastic bottles are harmful to sea animals.',
                    'There are more bins at Sunny Bay than at Rocky Point.',
                  ],
                  explanation:
                    'If Sunny Bay was only cleaned for half an hour, fewer bottles could have been found simply because less time was spent looking — not because the beach is cleaner.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'Pencils cost 30c and erasers cost 45c. Zoe spent exactly $2.40 and bought more erasers than pencils. How many pencils did she buy?',
                  options: ['2', '3', '4', '5'],
                  explanation:
                    '30 × pencils + 45 × erasers = 240. The possible pairs are 5 pencils and 2 erasers, or 2 pencils and 4 erasers. She bought more erasers than pencils, so 2 pencils.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt:
                    'Ravi always walks to school when it is not raining. Today Ravi did not walk to school.\nWhich one of these must be true?',
                  options: [
                    'Ravi caught the bus today.',
                    'Ravi was sick today.',
                    'It is not raining today.',
                    'It is raining today.',
                  ],
                  explanation:
                    'If it were not raining, Ravi would have walked. He did not walk, so it must be raining.',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    "Pia, Quinn, Rob and Sam sit around a square table, one on each side, all facing the middle. Pia sits opposite Quinn. Rob sits on Pia's left.\nWho sits on Quinn's left?",
                  options: ['Pia', 'Rob', 'Sam', 'Nobody'],
                  explanation:
                    "Rob is on Pia's left, so Sam is on Pia's right. Quinn faces Pia, so Quinn's left is on Pia's right side: that is Sam.",
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    'Claim: “The school should plant more trees in the playground to keep students cool.”\nWhich one of these, if true, best supports the claim?',
                  options: [
                    'Trees can grow very tall.',
                    'Some students like to climb trees.',
                    'On hot days, the ground under trees is several degrees cooler than open ground.',
                    'Many trees lose their leaves in autumn.',
                  ],
                  explanation:
                    'Only C shows that trees actually make the playground cooler.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'What letter comes next in this series?\nA, C, F, J, O, …',
                  options: ['T', 'U', 'V', 'W'],
                  explanation:
                    'The gaps grow by one each time: A (+2) C (+3) F (+4) J (+5) O (+6) U.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'In a game, a goal scores 2 points and a behind scores 1 point. Jess scored 9 points.\nAmy: “Jess must have scored at least one behind.”\nBo: “Jess scored no more than 4 goals.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Amy only',
                    'Bo only',
                    'Both Amy and Bo',
                    'Neither Amy nor Bo',
                  ],
                  explanation:
                    'Goals give an even number of points, so to reach 9 (odd) Jess needs at least one behind — Amy is right. 5 goals would already be 10 points, so Jess scored at most 4 goals — Bo is right.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'A box holding 6 identical books weighs 2.6 kg. The same box holding 4 of the books weighs 1.8 kg. How much does the empty box weigh?',
                  options: ['50 g', '100 g', '150 g', '200 g'],
                  explanation:
                    '2 books weigh 2.6 − 1.8 = 0.8 kg, so one book weighs 0.4 kg. 6 books weigh 2.4 kg, so the box weighs 2.6 − 2.4 = 0.2 kg = 200 g.',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt:
                    "Lily says: “I got full marks on the spelling test, so I must be the best speller in the class.”\nWhich one of these best shows the mistake in Lily's reasoning?",
                  options: [
                    'Lily practised her spelling every night.',
                    'Lily might not like spelling.',
                    'Some spelling tests have more words than others.',
                    'Other students may also have got full marks.',
                  ],
                  explanation:
                    'If others also got full marks, Lily cannot conclude she is the best — she could be equal best.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    'Amir, Bella and Chen take turns walking a dog: Amir on day 1, Bella on day 2, Chen on day 3, then Amir again on day 4, and so on.\nWho walks the dog on day 50?',
                  options: [
                    'Amir',
                    'Bella',
                    'Chen',
                    'It is impossible to tell',
                  ],
                  explanation:
                    'The pattern repeats every 3 days. 50 = 16 × 3 + 2, so day 50 is like day 2: Bella.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'No cats at the animal shelter are older than 10. Some cats at the shelter are black. Tigger is a cat at the shelter.\nWhich one of these must be true?',
                  options: [
                    'Tigger is black.',
                    'Tigger is younger than 5.',
                    'Some black cats at the shelter are older than 10.',
                    'Tigger is not older than 10.',
                  ],
                  explanation:
                    "Every cat at the shelter is 10 or younger, and Tigger is one of them. We do not know Tigger's colour or exact age.",
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'Six players each shake hands once with every other player. How many handshakes are there altogether?',
                  options: ['10', '12', '14', '15'],
                  explanation:
                    'The first player shakes 5 hands, the next 4 new hands, then 3, 2, 1: 5 + 4 + 3 + 2 + 1 = 15.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt:
                    "A bus leaves the depot every 20 minutes, starting at 6:00 am. The trip to the beach takes 35 minutes.\nMia: “If I catch the 7:40 bus, I'll be at the beach by 8:15.”\nJai: “A bus leaves the depot at 9:20.”\nIf the information is true, whose reasoning is correct?",
                  options: [
                    'Mia only',
                    'Jai only',
                    'Both Mia and Jai',
                    'Neither Mia nor Jai',
                  ],
                  explanation:
                    '7:40 + 35 minutes = 8:15, so Mia is right. Buses leave at :00, :20 and :40 past each hour, so there is a 9:20 bus — Jai is right too.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    "Kai, Lou and Max each have one pet: a dog, a cat or a fish. Kai is allergic to animals with fur. Lou's pet never barks.\nWho has the dog?",
                  options: ['Max', 'Kai', 'Lou', 'It is impossible to tell'],
                  explanation:
                    "Dogs and cats have fur, so Kai has the fish. Lou's pet does not bark, so Lou has the cat. That leaves the dog for Max.",
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    '“Our homework club improves maths results: students who went to the club scored higher in the maths test than students who did not.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'The club meets twice a week in the library.',
                    'The students who chose to join the club already had higher maths scores before it started.',
                    'Some students did homework at home instead.',
                    'The maths test had 30 questions.',
                  ],
                  explanation:
                    'If the club students were already better at maths, their higher scores may have nothing to do with the club.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'A square sheet of paper is folded in half, and then folded in half again. One hole is punched through all the layers. When the paper is unfolded, how many holes are there?',
                  options: ['4', '6', '8', '16'],
                  explanation:
                    'Folding in half twice makes 4 layers, and the punch goes through every layer, so there are 4 holes.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'If it is a school day, Ella catches the 8:10 train. Whenever Ella catches the 8:10 train, she buys a juice at the station. Today Ella did not buy a juice at the station.\nWhich one of these must be true?',
                  options: [
                    'Today is not a school day.',
                    'Ella missed the train today.',
                    'The station shop was closed.',
                    'Ella caught a later train.',
                  ],
                  explanation:
                    'A school day would mean the 8:10 train, which would mean a juice. No juice means no 8:10 train, which means it is not a school day.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    'In this pattern, each number is the sum of the two numbers before it.\n3, 4, 7, 11, 18, …\nWhat is the 8th number in the pattern?',
                  options: ['55', '65', '76', '123'],
                  explanation:
                    'Continue the pattern: 3, 4, 7, 11, 18, 29, 47, 76. The 8th number is 76.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'In a class vote, each of the 25 students voted for exactly one place: the zoo, the museum or the beach. The zoo got more votes than each of the other two places.\nAnn: “The zoo must have got at least 10 votes.”\nBen: “The beach must have got fewer than 13 votes.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Ann only',
                    'Ben only',
                    'Both Ann and Ben',
                    'Neither Ann nor Ben',
                  ],
                  explanation:
                    'The zoo could have won 9–8–8, so Ann is wrong. The beach had fewer votes than the zoo, and together they had at most 25, so the beach had at most 12 — Ben is right.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Set 2',
      papers: [
        {
          id: 'reading',
          title: 'Reading',
          emoji: '📖',
          minutes: 40,
          answers: 'BACDABCABDACDBBCDABDGAFCEBACDCDAB',
          blocks: [
            {
              heading: 'The Night Market',
              instructions:
                'Read the extract below from a short story, then answer the questions.\nFor questions 1 – 6, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                "Every Thursday, ten-year-old Amira helps her mother run a dumpling stall at the night market.\n\nBy seven o'clock the queue at the dumpling stall stretched past the juice bar and curled around the lantern pole. Amira's mother moved like a machine — fold, pinch, steam, fold, pinch, steam — while Amira took the orders and the money.\n\n‘Two boxes of pork, one vegetable,’ said a tall man in a cycling jacket. He handed her a fifty-dollar note. Amira counted his change the way her mother had taught her, out loud and starting from the price. ‘Twenty-four … twenty-five, thirty, forty, fifty.’ The man smiled, tucked the coins and notes into his pocket without looking, and wandered off towards the stage where a band was setting up.\n\nIt was only when the next customer paid that Amira's stomach dropped. The twenty-dollar notes were in the wrong section of the cash tin — on top of the tens. One of the ‘tens’ she had counted out was really a twenty. He had walked away with ten dollars that weren't his.\n\nShe glanced at her mother, who was lifting a bamboo steamer through a cloud of white. Ten dollars was the profit on five boxes of dumplings. It was a whole evening of folding for Amira's little brother, who earned twenty cents a dumpling and was saving for a skateboard.\n\n‘Mum,’ she began, but a woman with three children was already ordering, and the queue was growing restless.\n\nFor the next hour Amira served customers with half her mind. With the other half she searched the crowd for a cycling jacket. Twice she thought she saw it — once near the face-painting tent, once in the line for churros — but both times it was someone else.\n\nAt nine, when the queue finally thinned, she told her mother everything. She expected a frown. Instead her mother wiped her hands on her apron and was quiet for a moment.\n\n‘You counted out loud?’\n\nAmira nodded.\n\n‘Then you did the right thing the wrong way, once,’ her mother said. ‘The tin was in a muddle. That's my fault as much as yours.’ She sorted the notes back into their sections, smoothing each one flat. ‘Ten dollars is a lesson, not a disaster.’\n\nThey were packing the folding tables into the van when a voice called out behind them.\n\n‘Excuse me — the dumpling girl?’\n\nIt was the cyclist. He was holding a ten-dollar note between two fingers, a little sheepishly, as though it might bite.\n\n‘I only noticed when I went to buy a drink,’ he said. ‘I had more than I should have. I've been looking for your stall for half an hour — the lanterns all look the same after dark.’\n\nAmira took the note. She wanted to say a dozen things at once, but what came out was, ‘Would you like a dumpling? They're a bit cold.’\n\nHe laughed and accepted the last vegetable dumpling, and ate it standing by the van while her mother tied down the tarpaulin.\n\nOn the drive home Amira's mother said, ‘You know, I'd happily have paid ten dollars for you to learn that lesson.’ She glanced across, smiling. ‘But I suppose it's nice to learn a different one for free.’",
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    "The description of Amira's mother moving ‘like a machine’ suggests that she is",
                  options: [
                    'tired and unhappy.',
                    'working quickly and with practised skill.',
                    'not paying attention to the customers.',
                    'making mistakes because she is rushing.',
                  ],
                  explanation:
                    '‘fold, pinch, steam’ repeated like a machine shows fast, practised, rhythmic work.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    "Why does Amira's stomach ‘drop’ when the next customer pays?",
                  options: [
                    'She realises she has given the cyclist too much change.',
                    'She sees that the cash tin is almost empty.',
                    'The customer is rude to her.',
                    'She notices the dumplings have run out.',
                  ],
                  explanation:
                    'She sees the twenties on top of the tens and realises she gave the cyclist a twenty instead of a ten.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    "Why does the writer mention Amira's little brother and his skateboard?",
                  options: [
                    'to show that Amira is jealous of her brother',
                    'to explain why the family runs the stall',
                    'to show how much ten dollars means to the family',
                    'to suggest that her brother made the mistake',
                  ],
                  explanation:
                    'Ten dollars is ‘a whole evening of folding’ for her brother — it shows how valuable the money is to them.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'When Amira finally tells her mother what happened, her mother',
                  options: [
                    'is angry that Amira did not tell her sooner.',
                    'says they must call the police.',
                    'blames the cyclist for being dishonest.',
                    'accepts some of the blame and stays calm.',
                  ],
                  explanation:
                    "‘The tin was in a muddle. That's my fault as much as yours … Ten dollars is a lesson, not a disaster.’",
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    'The cyclist holds the note ‘as though it might bite’. This suggests he feels',
                  options: [
                    'a little embarrassed about returning it.',
                    'angry about having to come back.',
                    "frightened of Amira's mother.",
                    'proud of himself for being honest.',
                  ],
                  explanation:
                    'He holds it ‘a little sheepishly’ — he is slightly embarrassed.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    "What is the ‘different’ lesson that Amira's mother refers to at the end?",
                  options: [
                    'that you should always count change out loud',
                    'that many people are honest and will put a mistake right',
                    'that cold dumplings should not be given away',
                    'that cash tins must be kept tidy',
                  ],
                  explanation:
                    'The first lesson would have cost ten dollars; instead the cyclist returned the money, teaching her that people can be honest — a lesson ‘for free’.',
                },
              ],
            },
            {
              heading: 'The Coathanger',
              instructions:
                'For questions 7 – 14, read the text below and decide which answer best fits each gap. Circle the one correct answer (A, B, C or D).',
              passage:
                'When it opened in 1932, the Sydney Harbour Bridge was the widest long-span bridge in the world. Sydneysiders soon gave it the (7) ________ ‘the Coathanger’, because of the shape of its great steel arch.\n\nBuilding the bridge was an enormous (8) ________. More than 1400 people worked on it, and around six million rivets were (9) ________ into place by hand. Workers heated each rivet until it glowed red, then tossed it to a mate who caught it in a metal bucket — a job that (10) ________ great skill and a steady nerve.\n\nThe two halves of the arch were built out from each shore. (11) ________ they could meet, each half was held back by huge steel cables anchored in tunnels. In August 1930 the two halves finally touched, and the gap was (12) ________.\n\nToday the bridge carries trains, cars, bicycles and people on foot. Climbers can even (13) ________ to the very top of the arch, where they are rewarded (14) ________ breathtaking views of the harbour.',
              questions: [
                {
                  type: 'mcq',
                  n: '7',
                  prompt: '',
                  options: ['signature', 'surname', 'nickname', 'heading'],
                  row: true,
                  explanation:
                    'A ‘nickname’ is an informal name like ‘the Coathanger’. The other words do not describe this kind of name.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt: '',
                  options: ['undertaking', 'intention', 'occasion', 'attempt'],
                  row: true,
                  explanation:
                    '‘an enormous undertaking’ means a huge job or project. An intention or attempt is not something you build, and an ‘occasion’ is an event.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt: '',
                  options: ['battered', 'hammered', 'crushed', 'smashed'],
                  row: true,
                  explanation:
                    'Rivets are ‘hammered into place’. Battered, crushed and smashed mean damaged or broken.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt: '',
                  options: ['insisted', 'relied', 'depended', 'required'],
                  row: true,
                  explanation:
                    '‘a job that required great skill’. ‘insisted’, ‘relied’ and ‘depended’ would all need ‘on’ after them.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt: '',
                  options: ['Until', 'Unless', 'Although', 'Because'],
                  row: true,
                  explanation:
                    '‘Until they could meet, each half was held back’ — the cables held them back up to the time they met. The other words do not make sense here.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt: '',
                  options: ['ended', 'stopped', 'closed', 'completed'],
                  row: true,
                  explanation:
                    'A gap is ‘closed’. You do not end, stop or complete a gap.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt: '',
                  options: ['raise', 'lift', 'heighten', 'ascend'],
                  row: true,
                  explanation:
                    '‘ascend to the very top’ means climb up to it. ‘raise’, ‘lift’ and ‘heighten’ mean making something else higher, so they do not fit.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt: '',
                  options: ['for', 'with', 'of', 'to'],
                  row: true,
                  explanation:
                    'You are ‘rewarded with’ the thing you receive. ‘rewarded for’ gives the reason, which does not fit here.',
                },
              ],
            },
            {
              heading: 'Rain on the Tin Roof',
              instructions:
                'Read the poem below, then answer the questions.\nFor questions 15 – 19, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                '1\nIt starts with one fat drop, then two,\na tapping at the door,\nas if the sky has thought of something\nit forgot before.\n\n2\nThen all at once the clouds let go\nand drum with all their might;\nthe roof becomes a thousand drums\nthat thunder through the night.\n\n3\nMy sister hides beneath her quilt,\nthe dog creeps under chairs,\nbut I lie wide awake and count\nthe music on the stairs.\n\n4\nFor months the dam was cracked and dry,\nthe paddocks brown as bread;\ntonight the gutters gurgle songs\nof green fields up ahead.\n\n5\nBy morning, all is hushed and bright,\nthe tank is brimming full,\nand every leaf holds up a jewel\ntoo beautiful to pull.',
              questions: [
                {
                  type: 'mcq',
                  n: '15',
                  prompt: 'In verse 1, the rain is described as if the sky',
                  options: [
                    'is angry with the people below.',
                    'has suddenly remembered something.',
                    'is trying to get into the house.',
                    'is crying.',
                  ],
                  explanation:
                    '‘as if the sky has thought of something / it forgot before’ — like suddenly remembering.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt: 'Verse 2 mainly creates a feeling of',
                  options: [
                    'calm and quiet.',
                    'sadness.',
                    'great noise and power.',
                    'confusion.',
                  ],
                  explanation:
                    'The clouds ‘drum with all their might’ and the roof becomes ‘a thousand drums / that thunder’ — loud and powerful.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'How is the speaker different from the sister and the dog in verse 3?',
                  options: [
                    'The speaker is frightened too.',
                    'The speaker is asleep.',
                    'The speaker goes outside.',
                    'The speaker enjoys listening to the rain.',
                  ],
                  explanation:
                    'The sister hides and the dog creeps away, but the speaker lies awake and counts ‘the music’ — enjoying it.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt: 'Verse 4 suggests that the rain is welcome because',
                  options: [
                    'the land had been very dry for a long time.',
                    'the dam had broken.',
                    'the family wanted to go swimming.',
                    'the gutters needed cleaning.',
                  ],
                  explanation:
                    '‘For months the dam was cracked and dry, / the paddocks brown as bread’ — after a long dry time the rain promises ‘green fields’.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt: 'In verse 5, the ‘jewel’ held up by every leaf is',
                  options: [
                    'a flower.',
                    'a raindrop.',
                    'an insect.',
                    'a piece of ice.',
                  ],
                  explanation:
                    "After the night's rain, each leaf holds a shining drop of water, compared to a jewel.",
                },
              ],
            },
            {
              heading: 'The Dance of the Honeybee',
              instructions:
                'Read the text below then answer the questions. Six sentences have been removed from the text. Choose from the sentences (A – G) the one which fits each gap (20 – 25). There is one extra sentence which you do not need to use.',
              note: 'A.  The direction of the straight run shows the direction of the food compared with the sun.\nB.  Honey has been found in ancient Egyptian tombs, still good enough to eat.\nC.  The other bees sniff her carefully so that they can recognise it later.\nD.  The answer is that she dances.\nE.  Before that, many scientists had refused to believe that such small insects could share such detailed information.\nF.  The longer the bee waggles, the further away the food is.\nG.  This tells the watching bees that the food is close, but not exactly in which direction.',
              passage:
                'A honeybee that finds a good patch of flowers has a problem: how can she tell the thousands of other bees in her hive where the food is? (20) ________ It took a scientist named Karl von Frisch many years to work out what these movements mean.\n\nWhen the flowers are close to the hive, the bee performs a ‘round dance’, running in small circles. (21) ________ They simply fly out and search the area nearby.\n\nFor food that is further away, the bee does something far more remarkable. She performs a ‘waggle dance’, running in a straight line while shaking her body from side to side, then looping back to start again. (22) ________ A dance pointing straight up, for example, means ‘fly towards the sun’.\n\nThe length of the waggle tells the other bees how far to fly. (23) ________ Bees that follow the dance count these waggles and set off with a good idea of the distance.\n\nThe dancer also carries the scent of the flowers on her body. (24) ________ Once they reach the right area, they use that smell to find the exact flowers.\n\nVon Frisch was awarded the Nobel Prize in 1973 for his discovery. (25) ________ Today, scientists are even studying the waggle dance to learn which flowers bees prefer, which can help farmers and gardeners protect them.',
              questions: [
                {
                  type: 'mcq',
                  n: '20',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'The question ‘how can she tell…?’ is answered by ‘The answer is that she dances’ (D); the next sentence refers to ‘these movements’.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'After the round dance comes what it tells the bees — food is close, direction unknown (G) — so ‘They simply fly out and search the area nearby’.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'The paragraph explains direction: the straight run shows the direction compared with the sun (A), followed by the example of a dance pointing up.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    '‘The length of the waggle tells … how far’ is explained by ‘The longer the bee waggles, the further away the food is’ (F), then bees ‘count these waggles’.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'The scent on her body is sniffed so they can recognise it (C); ‘that smell’ in the next sentence refers back to it.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    '‘Before that’ looks back to before the prize, when his idea was doubted (E) — a contrast with the recognition that followed. B (honey in tombs) is the extra sentence.',
                },
              ],
            },
            {
              heading: 'Extracts',
              instructions:
                'Read the four extracts below on the theme of music. For questions 26 – 33, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                "EXTRACT A\nMy grandmother gave me her violin when I turned eight. It was older than my mother, with a crack along one side that had been glued so carefully you could barely see it. For the first year, everything I played sounded like a cat on a fence. I wanted to give up a dozen times. But every Sunday Grandma sat in the front row of our lounge room and clapped as if she were at the Opera House, and slowly, scratch by scratch, the squeaks turned into songs.\n\nEXTRACT B\nSound is made when something vibrates. When a guitar string is plucked, it moves back and forth very quickly, pushing on the air around it and sending waves of pressure to our ears. Shorter, tighter or thinner strings vibrate faster and make higher notes. This is why the thin strings on a guitar sound higher than the thick ones, and why pressing a string against the neck, which shortens the part that vibrates, raises the note.\n\nEXTRACT C\nThe yidaki, often called the didgeridoo, comes from the Yolŋu people of north-east Arnhem Land. Traditionally it is made from a eucalyptus branch hollowed out by termites. Players use a technique called circular breathing — breathing in through the nose while pushing air out through the mouth — so that the deep, humming sound never stops. In many communities there are cultural rules about who may play it and when.\n\nEXTRACT D\nThe Year 5 concert on Friday was a triumph. The choir's opening song had parents wiping their eyes, and the recorder group, despite one or two wobbly notes, finished to enormous applause. The highlight, though, was Jasper's drum solo, which he had written himself. Next year the school hopes to raise enough money to buy instruments for every student who wants to learn.",
              questions: [
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    'Which extract… explains why some notes sound higher than others?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: shorter, tighter or thinner strings vibrate faster and make higher notes.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'Which extract… describes someone who encouraged a beginner?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'A: Grandma clapped every Sunday ‘as if she were at the Opera House’.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'Which extract… mentions that playing an instrument is guided by customs about who may play?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'C: ‘there are cultural rules about who may play it and when’.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    'Which extract… reports on a performance by a group of students?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: the Year 5 concert with the choir, recorder group and drum solo.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'Which extract… describes an instrument made with the help of insects?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation: 'C: a branch ‘hollowed out by termites’.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt: 'Which extract… mentions a plan to raise money?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: the school hopes to raise money to buy instruments.',
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'Which extract… describes an instrument that had been repaired?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'A: the violin had a crack that ‘had been glued so carefully you could barely see it’.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'Which extract… describes what happens when a player shortens part of a string?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: pressing a string against the neck shortens the vibrating part and raises the note.',
                },
              ],
            },
          ],
        },
        {
          id: 'maths',
          title: 'Mathematical Reasoning',
          emoji: '🔢',
          minutes: 40,
          answers: 'BDEBACADECDEAAEEBEAAADEBBBDCCCDCCBB',
          blocks: [
            {
              heading: 'Questions 1 – 35',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'A school has 438 students. 179 of them go on an excursion. How many students stay at school?',
                  options: ['249', '259', '261', '341', '617'],
                  explanation: '438 − 179 = 259.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'In the number 47 382, what is the value of the digit 7?',
                  options: ['7', '70', '700', '7000', '70 000'],
                  explanation:
                    'The 7 is in the thousands place, so its value is 7000.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'A packet holds 24 biscuits. How many biscuits are there in 15 packets?',
                  options: ['240', '300', '336', '348', '360'],
                  explanation: '24 × 15 = 24 × 10 + 24 × 5 = 240 + 120 = 360.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt: 'Which fraction is equal to 3/4?',
                  options: ['6/9', '9/12', '12/15', '15/18', '21/24'],
                  explanation:
                    '9/12: divide top and bottom by 3 to get 3/4. (6/9 = 2/3, 12/15 = 4/5, 15/18 = 5/6, 21/24 = 7/8.)',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    'A train leaves at 10:48 am and arrives at 1:15 pm the same day. How long is the trip?',
                  options: [
                    '2 h 27 min',
                    '2 h 33 min',
                    '2 h 37 min',
                    '3 h 27 min',
                    '3 h 33 min',
                  ],
                  explanation:
                    '10:48 am to 12:48 pm is 2 hours. 12:48 pm to 1:15 pm is 27 minutes. Total 2 h 27 min.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'Ice creams cost $3.40 each. Ollie has $20. What is the greatest number of ice creams he can buy?',
                  options: ['3', '4', '5', '6', '7'],
                  explanation:
                    '5 ice creams cost $17.00. 6 would cost $20.40, which is too much. So 5.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'In this sequence each number is half the one before it.\n64, 32, 16, 8, …\nWhat is the 7th number?',
                  options: ['1', '2', '4', '6', '8'],
                  explanation: '64, 32, 16, 8, 4, 2, 1. The 7th number is 1.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    'A square has an area of 49 square centimetres. What is its perimeter?',
                  options: ['7 cm', '14 cm', '24.5 cm', '28 cm', '49 cm'],
                  explanation:
                    '7 × 7 = 49, so each side is 7 cm. Perimeter = 4 × 7 = 28 cm.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    'The table shows how the students in a class travel to school.\nWhat fraction of the class come by car?',
                  options: ['1/10', '1/5', '3/10', '1/3', '2/5'],
                  table: 'Walk  Bus  Car  Bike\n  6    9   12    3',
                  explanation:
                    'There are 6 + 9 + 12 + 3 = 30 students. 12 of the 30 come by car: 12/30 = 2/5.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    '86 students are going on an excursion. Each bus holds 24 students. What is the smallest number of buses needed?',
                  options: ['2', '3', '4', '5', '6'],
                  explanation:
                    '3 buses hold 72 students — not enough. 4 buses hold 96, enough for 86. So 4 buses.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'Two angles together make a straight line. One of them is 37°. What is the other angle?',
                  options: ['43°', '53°', '137°', '143°', '323°'],
                  explanation:
                    'Angles on a straight line add to 180°. 180° − 37° = 143°.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt: 'What is 2.4 + 0.75 + 1.05?',
                  options: ['3.2', '3.85', '4.1', '4.15', '4.2'],
                  explanation: '2.4 + 0.75 = 3.15, and 3.15 + 1.05 = 4.2.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'How many 250 mL cups can be completely filled from a 3.5 litre bottle of juice?',
                  options: ['14', '15', '16', '35', '140'],
                  explanation: '3.5 L = 3500 mL. 3500 ÷ 250 = 14 cups.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt:
                    'Using each of the digits 5, 0, 8 and 2 exactly once, what is the smallest 4-digit number that can be made?',
                  options: ['2058', '2085', '2508', '5028', '8520'],
                  explanation:
                    'A 4-digit number cannot start with 0, so start with the smallest non-zero digit, 2. Then put the rest in order: 0, 5, 8. The number is 2058.',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt: 'Which of these numbers is the largest?',
                  options: ['0.6', '0.59', '0.6011', '0.61', '0.611'],
                  explanation:
                    'Compare place by place: 0.611 has 6 tenths, 1 hundredth and 1 thousandth, which is more than 0.61, 0.6011, 0.6 and 0.59.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    'How many lines of symmetry does a regular hexagon have?',
                  options: ['2', '3', '4', '5', '6'],
                  explanation:
                    'A regular hexagon has 6 lines of symmetry: 3 through opposite corners and 3 through the middles of opposite sides.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'Today is Tuesday. What day of the week will it be in 100 days?',
                  options: [
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  explanation:
                    '100 = 14 weeks + 2 days. Two days after Tuesday is Thursday.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    "Lucy is 3 times as old as her brother. In 4 years' time she will be twice as old as him. How old is Lucy now?",
                  options: ['6', '8', '9', '10', '12'],
                  explanation:
                    'If her brother is b, Lucy is 3b. In 4 years: 3b + 4 = 2(b + 4), so b = 4. Lucy is 12.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'A garden is 12 m long and 7 m wide. A path 1 m wide runs all the way around the inside edge of the garden. What is the area of the path?',
                  options: ['34 m²', '36 m²', '38 m²', '50 m²', '84 m²'],
                  explanation:
                    'Whole garden: 12 × 7 = 84 m². The part inside the path is 10 m by 5 m = 50 m². Path = 84 − 50 = 34 m².',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt:
                    'A spinner has 8 equal sections numbered 1 to 8. What is the chance of spinning a number greater than 5?',
                  options: ['3/8', '1/2', '5/8', '3/4', '7/8'],
                  explanation:
                    'The numbers greater than 5 are 6, 7 and 8: 3 out of 8 sections. The chance is 3/8.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    'Tickets cost $15 for adults and $8 for children. A family of 2 adults and 3 children pays with a $100 note. How much change do they get?',
                  options: ['$46', '$54', '$56', '$64', '$66'],
                  explanation:
                    '2 × $15 = $30 and 3 × $8 = $24. Total $54. $100 − $54 = $46.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'Which number is a factor of 84 but NOT a factor of 63?',
                  options: ['3', '7', '9', '12', '21'],
                  explanation:
                    '84 ÷ 12 = 7, but 63 ÷ 12 is not a whole number. 3, 7 and 21 divide both numbers, and 9 does not divide 84.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'Dots are arranged in a growing pattern. The 1st shape has 3 dots, the 2nd has 6, the 3rd has 10 and the 4th has 15. The pattern continues in the same way. How many dots does the 7th shape have?',
                  options: ['28', '30', '32', '35', '36'],
                  explanation:
                    'The number added grows by one each time: +3, +4, +5. Continue: 15 + 6 = 21, 21 + 7 = 28, 28 + 8 = 36.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt:
                    'Max spent 2/5 of an hour reading and 1/4 of an hour drawing. How many minutes did he spend altogether?',
                  options: ['29', '39', '40', '45', '65'],
                  explanation:
                    '2/5 of 60 minutes = 24 minutes. 1/4 of 60 minutes = 15 minutes. 24 + 15 = 39 minutes.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    'Two whole numbers multiply to make 36 and add to make 13. What is the difference between them?',
                  options: ['3', '5', '6', '9', '13'],
                  explanation:
                    'The numbers are 9 and 4 (9 × 4 = 36 and 9 + 4 = 13). The difference is 9 − 4 = 5.',
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    'A fish tank is 50 cm long, 30 cm wide and 40 cm high. It is filled with water to a depth of 30 cm. How many litres of water are in the tank? (1 litre = 1000 cubic centimetres)',
                  options: ['4.5 L', '45 L', '60 L', '450 L', '600 L'],
                  explanation:
                    'Volume of water = 50 × 30 × 30 = 45 000 cm³. 45 000 ÷ 1000 = 45 L.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'Kim walks 4 km in 1 hour. At the same speed, how long does she take to walk 1.5 km?',
                  options: [
                    '18 min',
                    '20 min',
                    '22 min',
                    '22 min 30 s',
                    '25 min',
                  ],
                  explanation:
                    '4 km in 60 minutes means 1 km in 15 minutes. 1.5 km takes 15 + 7.5 = 22.5 minutes = 22 min 30 s.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'The mean (average) of four numbers is 15. Three of the numbers are 12, 18 and 9. What is the fourth number?',
                  options: ['17', '19', '21', '24', '27'],
                  explanation:
                    'Four numbers with a mean of 15 add to 60. 12 + 18 + 9 = 39. 60 − 39 = 21.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt: 'Which is the best estimate of 398 × 51?',
                  options: ['2000', '15 000', '20 000', '25 000', '200 000'],
                  explanation:
                    '398 is close to 400 and 51 is close to 50. 400 × 50 = 20 000. (The exact answer is 20 298.)',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'Using only 10c, 20c and 50c coins, how many different ways can you make exactly 60c? (The order of the coins does not matter.)',
                  options: ['3', '4', '5', '6', '7'],
                  explanation:
                    'With a 50c coin: 50 + 10 (1 way). Without: 20+20+20, 20+20+10+10, 20+10+10+10+10, and six 10c coins (4 ways). Total 5.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt:
                    'A rectangle is twice as long as it is wide. Its perimeter is 48 cm. What is its area?',
                  options: [
                    '96 cm²',
                    '112 cm²',
                    '120 cm²',
                    '128 cm²',
                    '144 cm²',
                  ],
                  explanation:
                    'Width w, length 2w: 2(w + 2w) = 48, so 6w = 48 and w = 8 cm. Length = 16 cm. Area = 16 × 8 = 128 cm².',
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'When it is 2 pm in Sydney, it is 5 am the same day in London. A plane leaves London at 9 pm London time and the flight takes 22 hours. What time is it in Sydney when the plane lands?',
                  options: ['7 pm', '10 pm', '4 am', '6 am', '7 am'],
                  explanation:
                    'Sydney is 9 hours ahead of London. Landing is 9 pm + 22 h = 7 pm London time, which is 7 pm + 9 h = 4 am Sydney time.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'How many three-digit numbers have digits that add up to 4?',
                  options: ['8', '9', '10', '11', '12'],
                  explanation:
                    'Hundreds digit 1: the other two add to 3 (103, 112, 121, 130) — 4 numbers. Hundreds 2: 202, 211, 220 — 3. Hundreds 3: 301, 310 — 2. Hundreds 4: 400 — 1. Total 10.',
                },
                {
                  type: 'mcq',
                  n: '34',
                  prompt:
                    'Ann and Bo share $56 in the ratio 3 : 5. How much more money does Bo get than Ann?',
                  options: ['$7', '$14', '$21', '$28', '$35'],
                  explanation:
                    '3 + 5 = 8 parts, so each part is $56 ÷ 8 = $7. Ann gets $21 and Bo gets $35. Bo gets $14 more.',
                },
                {
                  type: 'mcq',
                  n: '35',
                  prompt:
                    'A frog is at the bottom of a well 10 m deep. Each day it climbs up 3 m, but each night it slips back 2 m. Once it reaches the top, it climbs out and stays there. On which day does it first reach the top?',
                  options: ['7th', '8th', '9th', '10th', '11th'],
                  explanation:
                    'After each full day and night it is 1 m higher. At the end of night 7 it is 7 m up. On day 8 it climbs 3 m and reaches 10 m — the top.',
                },
              ],
            },
          ],
        },
        {
          id: 'thinking',
          title: 'Thinking Skills',
          emoji: '🧠',
          minutes: 30,
          answers: 'CDAAADDACBCBDDCACADBBDBCBBDBCC',
          blocks: [
            {
              heading: 'Questions 1 – 30',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Ben is taller than Cara. Dan is shorter than Cara. Eli is taller than Ben.\nWho is the shortest?',
                  options: ['Ben', 'Cara', 'Dan', 'Eli'],
                  explanation:
                    'From tallest to shortest: Eli, Ben, Cara, Dan. Dan is the shortest.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'Claim: “Students should have a longer lunch break because it helps them concentrate in afternoon lessons.”\nWhich one of these, if true, best supports the claim?',
                  options: [
                    'Most students enjoy playing at lunchtime.',
                    'The canteen would sell more food with a longer lunch break.',
                    'Some teachers eat lunch in the staffroom.',
                    'Teachers at schools with longer lunch breaks say students pay more attention in afternoon lessons.',
                  ],
                  explanation:
                    'Only D links a longer lunch break with better concentration in the afternoon.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'Every member of the chess club also plays in the school band. Nobody in the school band is in Year 2.\nAva: “No one in Year 2 is in the chess club.”\nSid: “Everyone in the school band is in the chess club.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Ava only',
                    'Sid only',
                    'Both Ava and Sid',
                    'Neither Ava nor Sid',
                  ],
                  explanation:
                    'Chess club members are all in the band, and no band members are in Year 2, so no chess club members are in Year 2 — Ava is right. Sid has it backwards: the band may have members who are not in the chess club.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'In a code, each letter is replaced by its position in the alphabet, so RED is written 18-5-4.\nWhich word is written 7-15-12-4?',
                  options: ['GOLD', 'GOAL', 'BOLD', 'COLD'],
                  explanation: '7 = G, 15 = O, 12 = L, 4 = D: GOLD.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    '“We should take the bus to the museum instead of walking, because the bus will get us there faster.”\nWhich assumption has been made?',
                  options: [
                    'Getting to the museum quickly is important.',
                    'Walking is good exercise.',
                    'The museum opens at 10 am.',
                    'Buses are cheaper than walking.',
                  ],
                  explanation:
                    'The speaker gives speed as the reason to choose the bus, so they assume that getting there quickly matters.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'A clock gains 5 minutes every hour. It is set to the correct time at 8:00 am. What time will it show when the real time is 2:00 pm?',
                  options: ['1:30 pm', '2:05 pm', '2:25 pm', '2:30 pm'],
                  explanation:
                    'From 8:00 am to 2:00 pm is 6 hours. The clock gains 6 × 5 = 30 minutes, so it shows 2:30 pm.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'Every student who scored more than 80 in the test received a certificate.\nWhich one of these must be true?',
                  options: [
                    'Everyone who received a certificate scored more than 80.',
                    'Mei received a certificate, so she scored more than 80.',
                    'Some students scored exactly 80.',
                    'Any student who did not receive a certificate scored 80 or less.',
                  ],
                  explanation:
                    'If a student had scored more than 80, they would have received a certificate. So anyone without a certificate cannot have scored more than 80. Certificates might also have been given for other reasons, so A and B do not have to be true.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    '“Most people in my street have a dog, so most people in Australia must have a dog.”\nWhich one of these best shows the mistake in this reasoning?',
                  options: [
                    'One street may not be typical of the whole country.',
                    'Some dogs live on farms.',
                    'Cats are also popular pets.',
                    'The speaker might not own a dog.',
                  ],
                  explanation:
                    'A single street is far too small and may be very different from the rest of Australia, so it cannot show what most Australians do.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    "In 5 years' time, Tom will be twice as old as he was 4 years ago. How old is Tom now?",
                  options: ['9', '12', '13', '18'],
                  explanation:
                    'If Tom is t: t + 5 = 2(t − 4), so t + 5 = 2t − 8 and t = 13. Check: in 5 years he is 18; 4 years ago he was 9; 18 = 2 × 9.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    "The canteen sells pies only on Mondays and Thursdays. It sells sushi every day except Monday. (The canteen is open Monday to Friday.)\nGus: “If you can buy a pie today, you can't buy sushi today.”\nHana: “On Thursdays you can buy both a pie and sushi.”\nIf the information is true, whose reasoning is correct?",
                  options: [
                    'Gus only',
                    'Hana only',
                    'Both Gus and Hana',
                    'Neither Gus nor Hana',
                  ],
                  explanation:
                    'Pies are sold on Thursday, and so is sushi, so Gus is wrong and Hana is right.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'A large cube is painted on all six faces and then cut into 64 equal small cubes (4 × 4 × 4). How many small cubes have paint on exactly one face?',
                  options: ['8', '16', '24', '36'],
                  explanation:
                    'Cubes with one painted face are in the middle of each face, not on an edge. Each face has a 2 × 2 middle = 4 cubes, and there are 6 faces: 24.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt:
                    '“The new playground equipment has made students more active. Far fewer students sat in the library at lunchtime this term than last term.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'The new equipment was very expensive.',
                    'The library was closed for repairs for three weeks this term.',
                    'Students enjoy using the new equipment.',
                    'The equipment was installed by a local company.',
                  ],
                  explanation:
                    'If the library was closed for three weeks, fewer students would have sat there for that reason alone — so the lower number does not show that the equipment made students more active.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'Four friends share a bag of lollies. Ann takes half of them. Bea takes half of what is left. Cy takes half of what is then left. Dee gets the last 6 lollies. How many lollies were in the bag?',
                  options: ['12', '24', '36', '48'],
                  explanation:
                    "Work backwards: Dee's 6 is half of what was left before Cy, so there were 12. Before Bea there were 24. Before Ann there were 48.",
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt:
                    'If the oval is wet, sport is held in the hall. Today sport was held on the oval.\nWhich one of these must be true?',
                  options: [
                    'It rained yesterday.',
                    'Sport will be on the oval tomorrow.',
                    'The hall was being used for something else.',
                    'The oval was not wet today.',
                  ],
                  explanation:
                    'A wet oval would have meant sport in the hall. Sport was not in the hall, so the oval was not wet.',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    'Jo faces north and walks 3 blocks. She turns right and walks 2 blocks, turns right again and walks 3 blocks, then turns left and walks 1 block.\nWhich direction is she facing now?',
                  options: ['North', 'South', 'East', 'West'],
                  explanation:
                    'Facing north, a right turn faces east, another right faces south, then a left turn faces east again.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    "Claim: “Reading aloud to younger students helps the older students' own reading.”\nWhich one of these, if true, best supports the claim?",
                  options: [
                    'Older students who read aloud to younger classes improved their reading scores more than classmates who did not.',
                    'Younger students enjoy picture books.',
                    'The library has many books for younger readers.',
                    'Older students are usually taller than younger students.',
                  ],
                  explanation:
                    'Only A shows the older readers themselves improving more than similar students who did not read aloud.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'What letter comes next in this series?\nB, E, H, K, …',
                  options: ['L', 'M', 'N', 'O'],
                  explanation:
                    'Each letter is 3 places after the one before: K + 3 = N.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'A number from 1 to 20 is chosen. It is a multiple of 3, and it is even.\nLia: “The number must be a multiple of 6.”\nTy: “The number must be 6 or 12.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Lia only',
                    'Ty only',
                    'Both Lia and Ty',
                    'Neither Lia nor Ty',
                  ],
                  explanation:
                    'Even multiples of 3 up to 20 are 6, 12 and 18 — all multiples of 6, so Lia is right. Ty forgot 18.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'On a balance scale, 2 cubes balance 3 balls, and 1 ball balances 2 marbles. How many marbles balance 4 cubes?',
                  options: ['6', '8', '10', '12'],
                  explanation:
                    '4 cubes = 6 balls (double both sides), and 6 balls = 12 marbles.',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt:
                    "Jack says: “I have never seen a koala in our park, so there are no koalas in our park.”\nWhich one of these best shows the mistake in Jack's reasoning?",
                  options: [
                    'Koalas sleep for most of the day.',
                    'Not seeing something does not prove it is not there.',
                    'Koalas eat gum leaves.',
                    'Jack may not like koalas.',
                  ],
                  explanation:
                    'Jack may simply have missed the koalas; never having seen one does not prove there are none.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    'Lights flash in this order: red, green, blue, yellow, red, green, blue, yellow, … What colour is the 30th flash?',
                  options: ['Red', 'Green', 'Blue', 'Yellow'],
                  explanation:
                    'The pattern repeats every 4 flashes. 30 = 7 × 4 + 2, so the 30th flash is like the 2nd: green.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'Some students in class 4B play soccer. All students who play soccer train on Tuesdays.\nWhich one of these must be true?',
                  options: [
                    'All students in 4B train on Tuesdays.',
                    'Only soccer players train on Tuesdays.',
                    'No students in 4B play netball.',
                    'Some students in 4B train on Tuesdays.',
                  ],
                  explanation:
                    'The 4B students who play soccer must train on Tuesdays, so some 4B students train on Tuesdays. The others do not have to be true.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'An ice-cream shop has 4 flavours. How many different cups with two scoops of two DIFFERENT flavours can be made? (The order of the scoops does not matter.)',
                  options: ['4', '6', '8', '12'],
                  explanation:
                    'Call the flavours A, B, C, D. The pairs are AB, AC, AD, BC, BD, CD: 6.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt:
                    'Trains leave the station at 15 minutes and 45 minutes past every hour, from 6:15 am until 9:45 pm.\nRaf: “There is a train at 12:45 pm.”\nSue: “If I arrive at 7:50 am, I will wait 25 minutes for the next train.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Raf only',
                    'Sue only',
                    'Both Raf and Sue',
                    'Neither Raf nor Sue',
                  ],
                  explanation:
                    '12:45 pm is 45 minutes past the hour, so there is a train — Raf is right. After 7:50 the next train is 8:15, 25 minutes later — Sue is right.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    'Ana, Bo and Cy came 1st, 2nd and 3rd in a race. Ana did not come first. Bo did not come last. Cy finished behind Ana.\nWho came first?',
                  options: ['Ana', 'Bo', 'Cy', 'It is impossible to tell'],
                  explanation:
                    'Ana was not first, and Cy finished behind Ana, so Ana was 2nd and Cy was 3rd. That leaves 1st for Bo.',
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    '“Students who eat breakfast get better school results, so eating breakfast must cause better results.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'Breakfast is often called the most important meal of the day.',
                    'Students who eat breakfast also tend to get more sleep, which is known to improve school results.',
                    'Some students eat toast for breakfast.',
                    'School results are sent home twice a year.',
                  ],
                  explanation:
                    'If breakfast-eaters also sleep more, the better results could come from the sleep rather than the breakfast.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'How many squares of any size are there on a 3 × 3 grid of small squares?',
                  options: ['9', '10', '13', '14'],
                  explanation:
                    '9 small 1 × 1 squares, 4 squares of size 2 × 2 and 1 square of size 3 × 3: 9 + 4 + 1 = 14.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'All the red buses go to the city. Bus 42 does not go to the city.\nWhich one of these must be true?',
                  options: [
                    'Bus 42 is blue.',
                    'Bus 42 is not red.',
                    'Some red buses do not go to the city.',
                    'Bus 42 goes to the beach.',
                  ],
                  explanation:
                    'If bus 42 were red it would go to the city. It does not, so it is not red. We do not know its actual colour or where it goes.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt: 'What number comes next?\n1, 2, 4, 7, 11, 16, …',
                  options: ['20', '21', '22', '23'],
                  explanation:
                    'The gaps are 1, 2, 3, 4, 5, so the next gap is 6: 16 + 6 = 22.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'Five children have 1, 2, 3, 4 and 5 marbles — a different number each. Tia has more marbles than Uma, and Uma has more than Val.\nKim: “Tia has at least 3 marbles.”\nLeo: “Val has at most 3 marbles.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Kim only',
                    'Leo only',
                    'Both Kim and Leo',
                    'Neither Kim nor Leo',
                  ],
                  explanation:
                    'Val has at least 1, so Uma has at least 2 and Tia at least 3 — Kim is right. Tia has at most 5, so Uma at most 4 and Val at most 3 — Leo is right.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Set 3',
      papers: [
        {
          id: 'reading',
          title: 'Reading',
          emoji: '📖',
          minutes: 40,
          answers: 'BCADABBDCADBACBCDABDBGFAEBDCAABDC',
          blocks: [
            {
              heading: 'The Last Leg',
              instructions:
                'Read the extract below from a short story, then answer the questions.\nFor questions 1 – 6, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                "Hugo is not the fastest swimmer in Year 5, so he is surprised when his teacher asks him to swim in the class relay at the school carnival.\n\n‘Ari's got the flu,’ said Mr Okafor, holding out a yellow swimming cap. ‘You're our fourth swimmer. Last leg.’\n\nHugo stared at the cap as if it were a live crab. The last leg was for the fastest swimmer, the one who could catch up if the team was behind. Everybody knew that. Everybody, apparently, except Mr Okafor.\n\n‘I'm not —’ he began.\n\n‘You finished every lap at training this term,’ said Mr Okafor. ‘Every single one. That's what I need.’ And he walked off to argue with the timekeepers before Hugo could explain all the reasons this was a terrible idea.\n\nThe pool smelled of chlorine and sunscreen. Parents packed the grandstand under a sea of coloured umbrellas, and the noise rose and fell like surf. Hugo sat on the bench beside Mei, who swam first and who was so calm she was eating a mandarin.\n\n‘What if I lose it for us?’ he whispered.\n\nMei offered him a segment. ‘Then we lose,’ she said. ‘It's a relay, not a trial.’ She shrugged, as if it were the simplest thing in the world.\n\nWhen the whistle went, Mei shot off the blocks and came back in second place. Toby kept them second. Priya, who had practised her tumble turns until her ears ached, pulled them into the lead by half a body length — and then Hugo was crouched on the block, the yellow cap squeezing his ears, and Priya's fingertips touched the wall beneath him.\n\nHe dived.\n\nFor the first ten metres he was flying. Then he made the mistake of looking sideways. A boy in a red cap was level with him, then a hand ahead, then a whole arm. Hugo's chest burned. His legs felt as though they were filling with sand. The crowd's roar turned into a long, blurry hum.\n\nEvery lap, he told himself. You finished every lap.\n\nHe did not catch the red cap. He touched the wall second, gasping, and hung on the rope with his eyes shut, waiting for someone to be disappointed.\n\nInstead, Priya's face appeared over the edge of the pool, upside down and grinning. ‘Second!’ she shouted. ‘We've never come better than fourth!’\n\nHugo looked up at the scoreboard. Second place. Their class had never been on the podium before, not once in four years.\n\nLater, while they waited for their ribbons, Mr Okafor sat down on the end of the bench.\n\n‘You looked across,’ he said.\n\nHugo's face went hot. ‘I know. I lost time.’\n\n‘About a second,’ Mr Okafor agreed. ‘Next year you'll keep your eyes on the black line.’ He stood up, then paused. ‘Next year,’ he repeated, and walked away before Hugo could argue.",
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Hugo stares at the cap ‘as if it were a live crab’. This suggests that he',
                  options: [
                    'is excited to be chosen.',
                    'feels nervous and does not want to take it.',
                    'thinks the cap is the wrong colour.',
                    'is surprised that Ari is sick.',
                  ],
                  explanation:
                    'Looking at it like a live crab — something that might pinch — shows he is uneasy and reluctant to take on the job.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt: 'Why did Mr Okafor choose Hugo for the last leg?',
                  options: [
                    'Hugo was the fastest swimmer left.',
                    'Hugo had asked to swim in the relay.',
                    'Hugo always kept going and finished every lap at training.',
                    'Mei suggested Hugo to him.',
                  ],
                  explanation:
                    "‘You finished every lap at training this term … That's what I need.’",
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    "Mei's words ‘It's a relay, not a trial’ suggest that she thinks",
                  options: [
                    'Hugo should not worry too much because it is a team event, not a test of him alone.',
                    'the relay is not important.',
                    'the team will definitely lose.',
                    'Hugo should practise more before the race.',
                  ],
                  explanation:
                    'She means a relay is something the team does together — Hugo is not being judged on his own.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'What mistake did Hugo make during his leg of the race?',
                  options: [
                    'He dived in too early.',
                    'He forgot to do a tumble turn.',
                    'He stopped to rest on the rope.',
                    'He looked sideways at another swimmer.',
                  ],
                  explanation:
                    '‘Then he made the mistake of looking sideways’ — Mr Okafor later says this cost him about a second.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    'When Hugo touches the wall, he expects his teammates to be',
                  options: [
                    'disappointed in him.',
                    'proud of him.',
                    'angry with Mr Okafor.',
                    'worried about Ari.',
                  ],
                  explanation:
                    'He hangs on the rope ‘waiting for someone to be disappointed’.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt: 'At the end, why does Mr Okafor repeat ‘Next year’?',
                  options: [
                    'He wants Hugo to know he will not be chosen again.',
                    'He is telling Hugo he expects him to swim in the relay again next year.',
                    'He has forgotten what he was saying.',
                    'He is warning Hugo that the race will be harder next year.',
                  ],
                  explanation:
                    'By repeating ‘Next year’ and walking away before Hugo can argue, he makes it clear he plans to choose Hugo again.',
                },
              ],
            },
            {
              heading: 'The Story of Chocolate',
              instructions:
                'For questions 7 – 14, read the text below and decide which answer best fits each gap. Circle the one correct answer (A, B, C or D).',
              passage:
                'Chocolate comes from the seeds of the cacao tree, which grows only in hot, wet places (7) ________ the equator. The ancient Maya and Aztec peoples roasted the seeds and ground them (8) ________ a paste, which they mixed with water and chilli to make a frothy drink. Cacao seeds were so precious that people even used them (9) ________ money.\n\nWhen Spanish explorers brought chocolate to Europe in the 1500s, people added sugar to make it less (10) ________. For centuries it remained a drink (11) ________ mainly by the rich. It was not (12) ________ 1847 that a British company made the first solid chocolate bar.\n\nToday, around five million tonnes of cacao beans are grown each year, (13) ________ of them in West Africa. Yet many cacao farmers earn very little money, (14) ________ how much chocolate the world eats.',
              questions: [
                {
                  type: 'mcq',
                  n: '7',
                  prompt: '',
                  options: ['close', 'near', 'nearby', 'next'],
                  row: true,
                  explanation:
                    '‘near the equator’. ‘close’ and ‘next’ would need ‘to’ (close to, next to), and ‘nearby’ is not used before a noun like this.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt: '',
                  options: ['onto', 'upon', 'within', 'into'],
                  row: true,
                  explanation:
                    'You grind something ‘into’ a paste — it changes into that form.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt: '',
                  options: ['by', 'of', 'as', 'at'],
                  row: true,
                  explanation:
                    '‘used them as money’ means used them in the role of money.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt: '',
                  options: ['bitter', 'bitterly', 'bitterness', 'embitter'],
                  row: true,
                  explanation:
                    'After ‘make it less’ we need an adjective: ‘less bitter’. ‘bitterly’ is an adverb, ‘bitterness’ a noun and ‘embitter’ a verb.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt: '',
                  options: ['enjoying', 'enjoyable', 'enjoyment', 'enjoyed'],
                  row: true,
                  explanation:
                    '‘a drink enjoyed mainly by the rich’ — the drink was enjoyed by them, so we need ‘enjoyed’.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt: '',
                  options: ['since', 'until', 'before', 'after'],
                  row: true,
                  explanation:
                    'The fixed phrase is ‘It was not until 1847 that…’, meaning this did not happen before 1847.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt: '',
                  options: ['most', 'much', 'more', 'mostly'],
                  row: true,
                  explanation:
                    '‘most of them in West Africa’ — the greater part of the beans. ‘much of them’ and ‘more of them’ do not fit, and ‘mostly’ is not followed by ‘of’.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt: '',
                  options: ['although', 'however', 'despite', 'even'],
                  row: true,
                  explanation:
                    '‘despite how much chocolate the world eats’. ‘although’ would need a full clause after it, and ‘however’ and ‘even’ do not join the ideas correctly.',
                },
              ],
            },
            {
              heading: 'City at Night',
              instructions:
                'Read the poem below, then answer the questions.\nFor questions 15 – 19, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                '1\nWhen the sun slips down behind the towers\nand the office lights go out,\nthe city pulls its blanket up\nand turns itself about.\n\n2\nThe trains still rattle in their tunnels\nlike worms beneath the ground,\nand somewhere in a hundred kitchens\nplates make a clattering sound.\n\n3\nThe streetlights hum like sleepy bees,\nthe traffic lights still blink\ntheir red and green and amber eyes\nat no one, I should think.\n\n4\nA lonely dog barks once, twice,\na siren sings and fades,\nand up above, the moon looks down\nthrough gaps in the window shades.\n\n5\nThe city never sleeps, they say,\nbut I have heard it sigh —\nit rests its head on the harbour\nand closes half an eye.',
              questions: [
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    'In verse 1, the city ‘pulls its blanket up’. This suggests that the city',
                  options: [
                    'is getting cold.',
                    'is settling down for the night like a person going to bed.',
                    'is being covered by clouds.',
                    'is closing its shops early.',
                  ],
                  explanation:
                    'Pulling up a blanket and turning over is what a person does when settling down to sleep — the city is described like a person going to bed.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt: 'In verse 2, the trains are compared to',
                  options: ['bees.', 'eyes.', 'worms.', 'plates.'],
                  explanation:
                    '‘The trains still rattle in their tunnels / like worms beneath the ground’.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'The words ‘at no one, I should think’ in verse 3 suggest that',
                  options: [
                    'the traffic lights are broken.',
                    'the speaker is driving a car.',
                    'the speaker is angry with the traffic lights.',
                    'the streets are empty, so the lights blink for nobody.',
                  ],
                  explanation:
                    'The lights keep changing even though no one is there to see them — the streets are empty.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt: 'Which phrase best describes the mood of verse 4?',
                  options: [
                    'quiet and a little lonely',
                    'busy and exciting',
                    'frightening and dangerous',
                    'happy and cheerful',
                  ],
                  explanation:
                    'A ‘lonely dog’ barks only once or twice and a siren ‘fades’ — a quiet, slightly lonely mood.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'How does the last verse challenge the saying ‘The city never sleeps’?',
                  options: [
                    'It says the city is very noisy at night.',
                    'It suggests the city does rest, if only a little.',
                    'It says the city is asleep all day.',
                    'It agrees that the city never rests.',
                  ],
                  explanation:
                    'The speaker has ‘heard it sigh’ as it rests its head and ‘closes half an eye’ — it does rest a little.',
                },
              ],
            },
            {
              heading: 'The Wonderful Wombat',
              instructions:
                'Read the text below then answer the questions. Six sentences have been removed from the text. Choose from the sentences (A – G) the one which fits each gap (20 – 25). There is one extra sentence which you do not need to use.',
              note: "A.  They leave them on top of rocks and logs to mark their territory.\nB.  Unlike a kangaroo's pouch, a wombat's pouch faces backwards.\nC.  Wombats are marsupials that live only in Australia.\nD.  For example, they are much faster than they look.\nE.  Wildlife groups are working to treat sick wombats and reduce road deaths.\nF.  A single wombat can leave around 100 of these little cubes in one night.\nG.  It is covered by a tough plate of cartilage under thick skin.",
              passage:
                "Wombats may look like slow, sleepy teddy bears, but they are some of the most surprising animals in Australia. (20) ________ Over short distances they can run at about 40 kilometres per hour — about as fast as an Olympic sprinter.\n\nWombats are expert diggers. Using their strong front claws, they dig long burrows that can stretch for up to 30 metres underground. (21) ________ This means that when a mother wombat is digging, soil is not thrown into her pouch and onto her baby, called a joey.\n\nA wombat's bottom is also unusual. (22) ________ If a predator such as a dingo follows a wombat into its burrow, the wombat can block the tunnel with its rump. The attacker finds itself facing a wall that is very hard to bite.\n\nPerhaps the strangest fact of all is that wombats produce cube-shaped poo. (23) ________ Scientists discovered that the shape is formed by the way the walls of the wombat's intestine stretch in different places.\n\nWombats use these cubes to send messages. (24) ________ Because the cubes do not roll away easily, they stay in place where other wombats will find and sniff them.\n\nSadly, many wombats are hit by cars at night, and a skin disease called mange has made many sick. (25) ________ Some wildlife carers even raise orphaned joeys by hand until they are old enough to return to the bush.",
              questions: [
                {
                  type: 'mcq',
                  n: '20',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'The opening says wombats are ‘surprising’; ‘For example, they are much faster than they look’ (D) gives the first example, then the speed of 40 km/h.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'Digging is linked to the pouch facing backwards (B); ‘This means that … soil is not thrown into her pouch’ follows on.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    "‘A wombat's bottom is also unusual’ is explained by the tough plate of cartilage (G), which is why it is hard to bite.",
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'After ‘cube-shaped poo’ comes how many cubes a wombat leaves (F), then how scientists explained the shape.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    '‘Wombats use these cubes to send messages’ is followed by where they leave them to mark territory (A), and why the cubes stay there.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt: '',
                  options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                  row: true,
                  explanation:
                    'After the dangers comes what people are doing to help (E); the next sentence gives another example. C (marsupials) is the extra sentence.',
                },
              ],
            },
            {
              heading: 'Extracts',
              instructions:
                'Read the four extracts below on the theme of journeys. For questions 26 – 33, choose the option (A, B, C or D) which you think best answers the question.',
              passage:
                'EXTRACT A\nThe train left Sydney on a grey Tuesday and, three days later, rolled into Perth under a sky so blue it hurt my eyes. In between lay the Nullarbor Plain — hour after hour of flat red earth and grey saltbush, without a single tree. On the second morning I woke at dawn to see a mob of camels standing beside the line, watching us pass as if we were the strangest thing they had ever seen. I spent the whole trip with my nose pressed to the window.\n\nEXTRACT B\nEach year, the bar-tailed godwit makes one of the longest non-stop flights of any bird. After feeding in Alaska, it flies around 12 000 kilometres across the Pacific Ocean to New Zealand and eastern Australia without landing even once. The journey takes about nine days. Before setting off, the bird eats so much that it almost doubles its weight, and parts of its body used for digestion shrink to make it lighter.\n\nEXTRACT C\nFor tens of thousands of years, Aboriginal peoples have travelled across Australia using songlines. A songline is a route described in song, story and dance, naming waterholes, landmarks and places of meaning in the order a traveller would reach them. By learning the song, a person could find their way across hundreds of kilometres of country. Songlines also connect different groups, whose songs may each hold part of a longer journey.\n\nEXTRACT D\nPlanning a long car trip with children? Pack plenty of water and healthy snacks, and plan a stop every two hours so everyone can stretch their legs. Download audiobooks or podcasts before you leave, as phone reception can disappear in remote areas. Most importantly, check the weather and road conditions on the morning you depart — outback roads can close quickly after heavy rain.',
              questions: [
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    'Which extract… describes a journey of an animal that does not stop to rest?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: the godwit flies about 12 000 km ‘without landing even once’.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt: 'Which extract… gives advice to travellers?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: pack water and snacks, plan stops, check the weather and roads.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'Which extract… explains how songs helped people to find their way?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'C: ‘By learning the song, a person could find their way across hundreds of kilometres of country.’',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    "Which extract… describes the writer's own experience of a journey?",
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    "A: the writer's train trip from Sydney to Perth.",
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'Which extract… mentions animals watching the traveller?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'A: camels stood by the line ‘watching us pass’.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt:
                    'Which extract… mentions changes to the body to prepare for a journey?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'B: the bird almost doubles its weight and parts of its digestive system shrink.',
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'Which extract… warns that a route might become impossible to use?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'D: ‘outback roads can close quickly after heavy rain’.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'Which extract… describes knowledge that is shared between different groups of people?',
                  options: ['A', 'B', 'C', 'D'],
                  row: true,
                  explanation:
                    'C: songlines connect different groups whose songs each hold part of a longer journey.',
                },
              ],
            },
          ],
        },
        {
          id: 'maths',
          title: 'Mathematical Reasoning',
          emoji: '🔢',
          minutes: 40,
          answers: 'BAEBDCADEEBBACADCEBEDCEAAEDDADCBCBA',
          blocks: [
            {
              heading: 'Questions 1 – 35',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Jun buys 6 packs of 8 juice boxes. 13 juice boxes are drunk at a party. How many are left?',
                  options: ['33', '35', '37', '43', '61'],
                  explanation: '6 × 8 = 48 juice boxes. 48 − 13 = 35.',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'Which shows ‘four thousand and six’ written as a number?',
                  options: ['4006', '4060', '4600', '40 006', '400 006'],
                  explanation:
                    'Four thousands, no hundreds, no tens and six ones: 4006.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt: 'What is 1/3 of 2/5 of 60?',
                  options: ['4', '5', '6', '7', '8'],
                  explanation: '2/5 of 60 = 24. 1/3 of 24 = 8.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    'A bus leaves at 7:35 am. The trip takes 48 minutes. What time does the bus arrive?',
                  options: [
                    '8:13 am',
                    '8:23 am',
                    '8:33 am',
                    '8:43 am',
                    '9:23 am',
                  ],
                  explanation:
                    '7:35 + 25 minutes = 8:00. The remaining 23 minutes make it 8:23 am.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt: 'What is 7851 rounded to the nearest hundred?',
                  options: ['7700', '7800', '7850', '7900', '8000'],
                  explanation:
                    '7851 is between 7800 and 7900. The tens digit is 5, so it rounds up to 7900.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'A regular octagon has sides that are each 7 cm long. What is its perimeter?',
                  options: ['49 cm', '54 cm', '56 cm', '63 cm', '64 cm'],
                  explanation: 'An octagon has 8 equal sides. 8 × 7 = 56 cm.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'Which of these shapes has 4 sides and exactly one pair of parallel sides?',
                  options: [
                    'trapezium',
                    'square',
                    'rhombus',
                    'kite',
                    'parallelogram',
                  ],
                  explanation:
                    'A trapezium has exactly one pair of parallel sides. Squares, rhombuses and parallelograms have two pairs; a kite has none.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    'In this sequence, each number is found by doubling the previous number and subtracting 2.\n5, 8, 14, 26, 50, …\nWhat is the next number?',
                  options: ['74', '94', '96', '98', '100'],
                  explanation: '50 × 2 − 2 = 98.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    'Ella saves $4.50 every week. What is the smallest number of weeks it will take her to save at least $60?',
                  options: ['10', '11', '12', '13', '14'],
                  explanation:
                    'After 13 weeks she has 13 × $4.50 = $58.50, which is not enough. After 14 weeks she has $63. So 14 weeks.',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    'Two coins are tossed at the same time. What is the chance of getting one head and one tail?',
                  options: ['1/8', '1/4', '1/3', '3/8', '1/2'],
                  explanation:
                    'The equally likely outcomes are HH, HT, TH and TT. Two of the four (HT and TH) give one head and one tail: 2/4 = 1/2.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'A right-angled triangle has two shorter sides of 6 cm and 8 cm, which meet at the right angle. What is its area?',
                  options: ['14 cm²', '24 cm²', '28 cm²', '40 cm²', '48 cm²'],
                  explanation:
                    'The triangle is half of a 6 cm by 8 cm rectangle. 6 × 8 = 48, and half of 48 is 24 cm².',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt:
                    'Five students scored 7, 9, 6, 9 and 4 in a quiz. What was their mean (average) score?',
                  options: ['6', '7', '8', '9', '35'],
                  explanation: '7 + 9 + 6 + 9 + 4 = 35. 35 ÷ 5 = 7.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'A ribbon 3 m long is cut into as many pieces of 45 cm as possible. How many pieces are there, and how much ribbon is left over?',
                  options: [
                    '6 pieces, 30 cm left',
                    '6 pieces, 15 cm left',
                    '7 pieces, 15 cm left',
                    '6 pieces, 45 cm left',
                    '5 pieces, 75 cm left',
                  ],
                  explanation:
                    '3 m = 300 cm. 6 × 45 = 270 cm, and 7 × 45 = 315 cm is too much. 300 − 270 = 30 cm left.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt: 'How many even numbers are there between 25 and 75?',
                  options: ['23', '24', '25', '26', '50'],
                  explanation:
                    'The even numbers run from 26 to 74. That is (74 − 26) ÷ 2 + 1 = 25 numbers.',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt: 'Which fraction is between 1/2 and 3/4?',
                  options: ['5/8', '2/5', '3/8', '7/8', '4/5'],
                  explanation:
                    '1/2 = 4/8 and 3/4 = 6/8, so 5/8 is between them. 2/5 and 3/8 are less than 1/2; 7/8 and 4/5 are more than 3/4.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    'A cake needs to bake for 1 hour 25 minutes. It goes into the oven at 4:50 pm. When will it be ready?',
                  options: [
                    '5:25 pm',
                    '6:05 pm',
                    '6:10 pm',
                    '6:15 pm',
                    '6:25 pm',
                  ],
                  explanation:
                    '4:50 pm + 1 hour = 5:50 pm. 5:50 pm + 25 minutes = 6:15 pm.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'A jug holds 1.2 litres. A glass holds 150 mL. How many glasses can be filled from 3 full jugs?',
                  options: ['8', '18', '24', '36', '80'],
                  explanation:
                    '3 jugs hold 3 × 1.2 = 3.6 L = 3600 mL. 3600 ÷ 150 = 24 glasses.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'I am a two-digit number. I am a multiple of 7. My digits add up to 10. My tens digit is larger than my ones digit. What number am I?',
                  options: ['28', '46', '64', '82', '91'],
                  explanation:
                    'Multiples of 7 whose digits add to 10 are 28 and 91. Only 91 has a tens digit bigger than its ones digit.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    'Two angles of a triangle are 48° and 67°. What is the size of the third angle?',
                  options: ['55°', '65°', '75°', '115°', '245°'],
                  explanation:
                    'The angles of a triangle add to 180°. 180° − 48° − 67° = 65°.',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt:
                    'A recipe for 4 people uses 300 g of rice. How much rice is needed for 10 people?',
                  options: ['500 g', '600 g', '650 g', '700 g', '750 g'],
                  explanation:
                    'For 1 person: 300 ÷ 4 = 75 g. For 10 people: 10 × 75 = 750 g.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    'A strip is made of 4 squares in a row. How many rectangles of any size can be found in the strip? (A square also counts as a rectangle.)',
                  options: ['4', '7', '8', '10', '16'],
                  explanation:
                    'Rectangles 1 square long: 4. Two squares long: 3. Three long: 2. Four long: 1. Total 4 + 3 + 2 + 1 = 10.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'Notebooks cost $3 and pens cost $2. Ari spends exactly $17 and buys at least one notebook and at least one pen. How many pens could she have bought?',
                  options: ['2', '3', '4', '5', '6'],
                  explanation:
                    'The possible buys are 1 notebook + 7 pens, 3 notebooks + 4 pens, or 5 notebooks + 1 pen. Of the options, only 4 pens is possible.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'A car travels 180 km in 2 hours 15 minutes at a steady speed. What is its speed?',
                  options: [
                    '60 km/h',
                    '72 km/h',
                    '75 km/h',
                    '78 km/h',
                    '80 km/h',
                  ],
                  explanation:
                    '2 hours 15 minutes = 2.25 hours. 180 ÷ 2.25 = 80 km/h. (Check: 80 km in each hour gives 160 km, plus 20 km in the extra quarter hour.)',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt: 'What number is 2 ones, 3 tenths and 4 hundredths?',
                  options: ['2.34', '2.43', '3.42', '4.32', '23.4'],
                  explanation:
                    '2 ones = 2, 3 tenths = 0.3, 4 hundredths = 0.04. 2 + 0.3 + 0.04 = 2.34.',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    'Square tables are pushed together in a row. One table seats 4 people (one on each side). Two tables seat 6 people, and three tables seat 8 people. How many tables are needed to seat exactly 26 people?',
                  options: ['12', '13', '14', '24', '25'],
                  explanation:
                    'Each extra table adds 2 seats: 4, 6, 8, … so n tables seat 2n + 2 people. 2n + 2 = 26 gives n = 12 tables.',
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt: 'What is 125 × 16?',
                  options: ['1250', '1600', '1800', '1900', '2000'],
                  explanation: '125 × 8 = 1000, so 125 × 16 = 2000.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'When a number is divided by 6, the answer is 14 with a remainder of 5. What is the number?',
                  options: ['84', '85', '86', '89', '90'],
                  explanation: '6 × 14 = 84, and 84 + 5 = 89.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt: 'How many edges does a triangular prism have?',
                  options: ['5', '6', '8', '9', '12'],
                  explanation:
                    'It has two triangles (3 edges each = 6) joined by 3 edges along its length: 6 + 3 = 9.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt:
                    'Ivy read 1/3 of her book on Monday and 1/4 of it on Tuesday. She has 60 pages left to read. How many pages are in the book?',
                  options: ['144', '156', '180', '240', '360'],
                  explanation:
                    'She has read 1/3 + 1/4 = 7/12, so 5/12 is left. 5/12 of the book is 60 pages, so 1/12 is 12 pages and the whole book is 144 pages.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'How many days are there from 25 June to 10 August, counting 10 August but not counting 25 June? (June has 30 days and July has 31 days.)',
                  options: ['43', '44', '45', '46', '47'],
                  explanation:
                    '26–30 June is 5 days, July is 31 days and 1–10 August is 10 days. 5 + 31 + 10 = 46.',
                },
                {
                  type: 'mcq',
                  n: '31',
                  prompt:
                    'A square has the same perimeter as a rectangle that measures 10 cm by 6 cm. What is the area of the square?',
                  options: ['36 cm²', '60 cm²', '64 cm²', '81 cm²', '256 cm²'],
                  explanation:
                    "The rectangle's perimeter is 10 + 6 + 10 + 6 = 32 cm. The square's side is 32 ÷ 4 = 8 cm. Area = 8 × 8 = 64 cm².",
                },
                {
                  type: 'mcq',
                  n: '32',
                  prompt:
                    'A number machine doubles a number and then adds 5. The machine gives out 37. What number was put in?',
                  options: ['14', '16', '18', '21', '69'],
                  explanation: 'Work backwards: 37 − 5 = 32, and 32 ÷ 2 = 16.',
                },
                {
                  type: 'mcq',
                  n: '33',
                  prompt:
                    'A bag holds 18 counters. Each counter is red or blue. There are twice as many red counters as blue counters. One counter is picked without looking. What is the chance that it is blue?',
                  options: ['1/6', '1/4', '1/3', '1/2', '2/3'],
                  explanation:
                    'Red is twice blue, so blue is 1 part out of 3: 18 ÷ 3 = 6 blue and 12 red. The chance of blue is 6/18 = 1/3.',
                },
                {
                  type: 'mcq',
                  n: '34',
                  prompt:
                    'Sam walks along the streets of a grid. He walks 5 blocks east, 3 blocks north, 2 blocks west and 7 blocks south. What is the shortest number of blocks he could now walk along the streets to get back to his start?',
                  options: ['5', '7', '9', '12', '17'],
                  explanation:
                    'Overall he is 5 − 2 = 3 blocks east and 7 − 3 = 4 blocks south of the start. Walking back along the streets takes 3 + 4 = 7 blocks.',
                },
                {
                  type: 'mcq',
                  n: '35',
                  prompt:
                    'Three consecutive odd numbers add up to 87. What is the smallest of the three?',
                  options: ['27', '29', '31', '33', '35'],
                  explanation:
                    'The middle number is 87 ÷ 3 = 29, so the numbers are 27, 29 and 31. The smallest is 27.',
                },
              ],
            },
          ],
        },
        {
          id: 'thinking',
          title: 'Thinking Skills',
          emoji: '🧠',
          minutes: 30,
          answers: 'BDACABDBABDDBACCBCCDCACABDDBCA',
          blocks: [
            {
              heading: 'Questions 1 – 30',
              questions: [
                {
                  type: 'mcq',
                  n: '1',
                  prompt:
                    'Five cars finished a race.\n• The white car finished first.\n• The yellow car finished last.\n• The red car finished ahead of the blue car.\n• The green car finished directly behind the red car.\nWhich car finished third?',
                  options: ['Red', 'Green', 'Blue', 'Yellow'],
                  explanation:
                    'Places 2–4 are for red, green and blue. Red is ahead of blue and green is right behind red, so the order is red (2nd), green (3rd), blue (4th).',
                },
                {
                  type: 'mcq',
                  n: '2',
                  prompt:
                    'Claim: “The council should build a bike path along the river because many people would use it.”\nWhich one of these, if true, best supports the claim?',
                  options: [
                    'Bike paths are expensive to build.',
                    'The river floods every few years.',
                    'Some people prefer to walk.',
                    "In a survey, more than half the town's residents said they would ride on a river bike path every week.",
                  ],
                  explanation:
                    'Only D gives evidence that many people would actually use the path.',
                },
                {
                  type: 'mcq',
                  n: '3',
                  prompt:
                    'All the students in the art club are in Year 5 or Year 6. Some of the art club students also play netball.\nElla: “Some netball players are in Year 5 or Year 6.”\nFinn: “All the Year 6 students are in the art club.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Ella only',
                    'Finn only',
                    'Both Ella and Finn',
                    'Neither Ella nor Finn',
                  ],
                  explanation:
                    'The art club students who play netball are in Year 5 or 6, so some netball players are — Ella is right. Nothing says every Year 6 student joined the art club — Finn is wrong.',
                },
                {
                  type: 'mcq',
                  n: '4',
                  prompt:
                    "In a code, A = 1, B = 2, C = 3 and so on. A word's code is the total of its letters. For example, CAB = 3 + 1 + 2 = 6.\nWhat is the code for BEAD?",
                  options: ['10', '11', '12', '13'],
                  explanation:
                    'B = 2, E = 5, A = 1, D = 4. 2 + 5 + 1 + 4 = 12.',
                },
                {
                  type: 'mcq',
                  n: '5',
                  prompt:
                    'Mum says: “We should buy the bigger box of cereal, because it will save us money.”\nWhich assumption has Mum made?',
                  options: [
                    'The bigger box costs less for each gram of cereal than the smaller box.',
                    'The family likes this kind of cereal.',
                    'The smaller box is easier to carry.',
                    'Cereal is a healthy breakfast.',
                  ],
                  explanation:
                    'The bigger box only saves money if its cereal is cheaper per gram, so that is what Mum is assuming.',
                },
                {
                  type: 'mcq',
                  n: '6',
                  prompt:
                    'A candle is 15 cm tall when it is lit at 6:00 pm. It burns down by 2 cm every hour. How tall is it at 10:30 pm?',
                  options: ['4 cm', '6 cm', '7 cm', '9 cm'],
                  explanation:
                    'From 6:00 pm to 10:30 pm is 4.5 hours. It burns 4.5 × 2 = 9 cm, leaving 15 − 9 = 6 cm.',
                },
                {
                  type: 'mcq',
                  n: '7',
                  prompt:
                    'Every player in the team trains on Saturday. Kat does not train on Saturday.\nWhich one of these must be true?',
                  options: [
                    'Kat trains on Sunday.',
                    'Kat does not like the team.',
                    'Some players do not train on Saturday.',
                    'Kat is not in the team.',
                  ],
                  explanation:
                    'If Kat were in the team she would train on Saturday. She does not, so she is not in the team.',
                },
                {
                  type: 'mcq',
                  n: '8',
                  prompt:
                    "“My sister got sick after eating at the café, so the café's food must be bad.”\nWhich one of these best shows the mistake in this reasoning?",
                  options: [
                    'The café might be expensive.',
                    'Her sister may have become sick for a different reason.',
                    'Some people do not like café food.',
                    'The café might close early.',
                  ],
                  explanation:
                    'Getting sick after eating there does not prove the food caused it — something else could have made her sick.',
                },
                {
                  type: 'mcq',
                  n: '9',
                  prompt:
                    "A father is 30 years older than his son. In 5 years' time, the father will be 4 times as old as the son. How old is the son now?",
                  options: ['5', '6', '10', '15'],
                  explanation:
                    'Son s, father s + 30. In 5 years: s + 35 = 4(s + 5), so 3s = 15 and s = 5. (Father 35; in 5 years 40 = 4 × 10.)',
                },
                {
                  type: 'mcq',
                  n: '10',
                  prompt:
                    'In a shop, all the blue shirts are size small or size medium. All the size small shirts are on the top shelf.\nPat: “Every blue shirt is on the top shelf.”\nQuin: “If a shirt is not on the top shelf, it is not size small.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Pat only',
                    'Quin only',
                    'Both Pat and Quin',
                    'Neither Pat nor Quin',
                  ],
                  explanation:
                    'Medium blue shirts do not have to be on the top shelf, so Pat is wrong. Every small shirt is on the top shelf, so a shirt that is not there cannot be small — Quin is right.',
                },
                {
                  type: 'mcq',
                  n: '11',
                  prompt:
                    'A staircase is built from cubes. The bottom row has 4 cubes, the next row has 3, then 2, then 1 at the top. How many cubes are used?',
                  options: ['6', '8', '9', '10'],
                  explanation: '4 + 3 + 2 + 1 = 10 cubes.',
                },
                {
                  type: 'mcq',
                  n: '12',
                  prompt:
                    '“Playing chess makes children better at maths, because the chess club members got the highest maths results in the school.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'The chess club meets on Fridays.',
                    'Chess sets are cheap to buy.',
                    'Some maths teachers play chess.',
                    'Only students who were already top maths students were allowed to join the chess club.',
                  ],
                  explanation:
                    'If the members were already top at maths before joining, their high results do not show that chess made them better.',
                },
                {
                  type: 'mcq',
                  n: '13',
                  prompt:
                    'A jar holds fewer than 30 lollies. If they are shared equally among 4 children, 3 are left over. If they are shared equally among 5 children, 4 are left over. How many lollies are in the jar?',
                  options: ['15', '19', '23', '24'],
                  explanation:
                    'Numbers under 30 that leave 3 when divided by 4: 3, 7, 11, 15, 19, 23, 27. Of these, only 19 leaves 4 when divided by 5.',
                },
                {
                  type: 'mcq',
                  n: '14',
                  prompt:
                    'Whenever the team wins, the coach buys pizza. The coach did not buy pizza on Saturday.\nWhich one of these must be true?',
                  options: [
                    'The team did not win on Saturday.',
                    'The team lost on Saturday.',
                    'The coach does not like pizza.',
                    'The team did not play on Saturday.',
                  ],
                  explanation:
                    'A win would have meant pizza. No pizza means the team did not win. (They may have lost, drawn or not played, so B and D do not have to be true.)',
                },
                {
                  type: 'mcq',
                  n: '15',
                  prompt:
                    'Leo is facing west. He turns 90° clockwise, then turns 180°, then turns 90° anticlockwise.\nWhich way is he facing now?',
                  options: ['North', 'South', 'East', 'West'],
                  explanation:
                    'West → 90° clockwise → north → 180° → south → 90° anticlockwise → east.',
                },
                {
                  type: 'mcq',
                  n: '16',
                  prompt:
                    'Claim: “The school vegetable garden has helped students eat more vegetables.”\nWhich one of these, if true, best supports the claim?',
                  options: [
                    'The garden is next to the library.',
                    'Carrots are the easiest vegetable to grow.',
                    'Since the garden started, students have been choosing vegetables at lunch twice as often as before.',
                    'Some parents help in the garden.',
                  ],
                  explanation:
                    'Only C shows students eating more vegetables since the garden began.',
                },
                {
                  type: 'mcq',
                  n: '17',
                  prompt:
                    'What letter comes next in this series?\nZ, X, U, Q, L, …',
                  options: ['E', 'F', 'G', 'H'],
                  explanation:
                    'The letters go back by 2, 3, 4, 5 and then 6 places. Six letters before L is F.',
                },
                {
                  type: 'mcq',
                  n: '18',
                  prompt:
                    'A number between 10 and 30 is a multiple of 4, and its digits add up to 6.\nMax: “The number is 24.”\nNia: “The number is a multiple of 8.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Max only',
                    'Nia only',
                    'Both Max and Nia',
                    'Neither Max nor Nia',
                  ],
                  explanation:
                    'The multiples of 4 between 10 and 30 are 12, 16, 20, 24 and 28. Only 24 has digits that add to 6, so Max is right. 24 is a multiple of 8, so Nia is right too.',
                },
                {
                  type: 'mcq',
                  n: '19',
                  prompt:
                    '3 apples weigh the same as 2 pears. 4 pears weigh the same as 1 melon. How many apples weigh the same as 2 melons?',
                  options: ['6', '8', '12', '16'],
                  explanation:
                    '2 melons = 8 pears. 2 pears = 3 apples, so 8 pears = 12 apples.',
                },
                {
                  type: 'mcq',
                  n: '20',
                  prompt:
                    "Ben says: “My new shoes make me run faster, because I won the race the first time I wore them.”\nWhich one of these best shows the mistake in Ben's reasoning?",
                  options: [
                    'Shoes can be expensive.',
                    'Ben might not like his old shoes.',
                    'Running is good exercise.',
                    'Ben may have won for another reason, such as the other runners being slower that day.',
                  ],
                  explanation:
                    'One win while wearing the shoes does not show the shoes caused it — there could be other reasons.',
                },
                {
                  type: 'mcq',
                  n: '21',
                  prompt:
                    'Ann, Bea, Cal, Dom and Eve sit in a circle in that order. A ball is passed around the circle: Ann → Bea → Cal → Dom → Eve → Ann → … Ann starts with the ball.\nWho has the ball after 23 passes?',
                  options: ['Bea', 'Cal', 'Dom', 'Eve'],
                  explanation:
                    'Every 5 passes the ball returns to Ann. 23 = 4 × 5 + 3, so after 23 passes it has moved 3 places on from Ann: Dom.',
                },
                {
                  type: 'mcq',
                  n: '22',
                  prompt:
                    'No reptiles at the zoo are kept outdoors. All the lizards at the zoo are reptiles.\nWhich one of these must be true?',
                  options: [
                    'None of the lizards at the zoo are kept outdoors.',
                    'All the animals kept indoors are lizards.',
                    'Some reptiles at the zoo are kept outdoors.',
                    'The zoo has no snakes.',
                  ],
                  explanation:
                    'Every lizard at the zoo is a reptile, and no reptile there is kept outdoors, so no lizard is kept outdoors.',
                },
                {
                  type: 'mcq',
                  n: '23',
                  prompt:
                    'Ava has 3 tops, 2 skirts and 2 pairs of shoes. An outfit is one top, one skirt and one pair of shoes. How many different outfits can she make?',
                  options: ['7', '10', '12', '18'],
                  explanation:
                    '3 tops × 2 skirts = 6 combinations, and each can be worn with 2 pairs of shoes: 6 × 2 = 12.',
                },
                {
                  type: 'mcq',
                  n: '24',
                  prompt:
                    'Movie sessions start at 10:00 am and then every 2 hours 15 minutes. The last session starts at 7:00 pm.\nUna: “There is a session at 2:30 pm.”\nVic: “There are 6 sessions each day.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Una only',
                    'Vic only',
                    'Both Una and Vic',
                    'Neither Una nor Vic',
                  ],
                  explanation:
                    'The sessions are 10:00 am, 12:15 pm, 2:30 pm, 4:45 pm and 7:00 pm. There is a 2:30 session (Una is right), but only 5 sessions (Vic is wrong).',
                },
                {
                  type: 'mcq',
                  n: '25',
                  prompt:
                    "Ria, Sol and Tam each like a different sport: tennis, swimming or soccer.\n• Ria does not like being in water.\n• Ria's sport is not played with a racquet.\n• Sol's sport uses a ball.\n• Tam does not like soccer.\nWho likes tennis?",
                  options: ['Ria', 'Sol', 'Tam', 'It is impossible to tell'],
                  explanation:
                    'Ria is not swimming and not tennis (a racquet sport), so Ria plays soccer. Tam does not like soccer and it is taken anyway, and Sol needs a ball sport, so Sol plays tennis and Tam swims.',
                },
                {
                  type: 'mcq',
                  n: '26',
                  prompt:
                    '“The new traffic lights have made the road safer, because there were fewer accidents on it this year than last year.”\nWhich one of these, if true, most weakens this argument?',
                  options: [
                    'Traffic lights use a lot of electricity.',
                    'Some drivers do not like waiting at traffic lights.',
                    'The traffic lights are red, amber and green.',
                    'The road was closed for repairs for four months this year.',
                  ],
                  explanation:
                    'If the road was closed for four months, there would be fewer accidents anyway — so the drop does not show the lights made it safer.',
                },
                {
                  type: 'mcq',
                  n: '27',
                  prompt:
                    'A triangle has two straight lines drawn from its top corner down to its bottom side, dividing the bottom side into three parts. How many triangles of any size are there in the picture?',
                  options: ['3', '4', '5', '6'],
                  explanation:
                    'Every triangle has its top at the corner and its base between two of the 4 points on the bottom side. Choosing 2 of 4 points can be done 6 ways: 3 small, 2 middle-sized and 1 large triangle.',
                },
                {
                  type: 'mcq',
                  n: '28',
                  prompt:
                    'If it is Wednesday, Mr Lim teaches art. Mr Lim is not teaching art today.\nWhich one of these must be true?',
                  options: [
                    'Mr Lim is sick today.',
                    'Today is not Wednesday.',
                    'Mr Lim teaches art on Thursdays.',
                    'Another teacher is teaching art.',
                  ],
                  explanation:
                    'On a Wednesday Mr Lim would be teaching art. He is not, so today cannot be Wednesday.',
                },
                {
                  type: 'mcq',
                  n: '29',
                  prompt: 'What number comes next?\n2, 6, 12, 20, 30, …',
                  options: ['36', '40', '42', '44'],
                  explanation:
                    'The gaps are 4, 6, 8, 10, so the next gap is 12: 30 + 12 = 42.',
                },
                {
                  type: 'mcq',
                  n: '30',
                  prompt:
                    'There are 20 students in a class. 12 have a dog and 9 have a cat. Every student has at least one of these pets.\nKai: “Exactly one student has both a dog and a cat.”\nLu: “8 students have a dog but no cat.”\nIf the information is true, whose reasoning is correct?',
                  options: [
                    'Kai only',
                    'Lu only',
                    'Both Kai and Lu',
                    'Neither Kai nor Lu',
                  ],
                  explanation:
                    '12 + 9 = 21, but there are only 20 students, so exactly 1 student is counted twice — Kai is right. So 12 − 1 = 11 have a dog but no cat — Lu is wrong.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
