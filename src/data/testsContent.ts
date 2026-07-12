// Content for the "Tests" card — transcribed from the
// "Excel Revise in a Month — Year 2 NAPLAN*-style Tests" workbook photos.
//
// Rules followed (per request):
//  - Only the question CONTENT is captured. Answer keys are intentionally left out.
//  - Reading comprehension is multiple-choice (radio selection), no text entry.
//  - Writing tasks use a large textarea so kids have room to write.
//  - Multiple-choice questions show the options but do NOT mark a correct answer.
//
// Transcription progress: Week 1 done. Weeks 2-4 + Sample Tests to follow.

export type TestQuestion =
  | { type: 'mcq'; n?: string; prompt: string; options: string[] }
  | {
      type: 'short';
      n?: string;
      prompt: string;
      /** Example words shown under the prompt (e.g. "cake, carrot"). */
      example?: string;
      /** How many answer boxes to render (defaults to 1). */
      inputs?: number;
      /**
       * Answer is digits only → show the numeric keypad on touch devices.
       * Overrides the block-level default. Leave off for answers needing
       * letters, commas, colons, "/", "$" etc. — the iOS keypad has none.
       */
      numeric?: boolean;
    }
  | { type: 'long'; n?: string; prompt: string }
  | {
      // Spelling dictation: a "Listen" button speaks the word (text-to-speech)
      // and the child writes it. `word` is spoken aloud only, never shown.
      type: 'dictation';
      n?: string;
      prompt: string;
      word: string;
    };

export interface TestBlock {
  /** Subject + topic heading, e.g. "Real Test". */
  heading: string;
  /** Optional intro / instruction line shown under the heading. */
  instructions?: string;
  /** Optional reading passage shown before the questions. */
  passage?: string;
  /** Optional monospace ASCII diagram of a visual pattern (sticks, straws, etc.). */
  diagram?: string;
  /** Optional multi-line note / planning tips shown full-width above the questions. */
  note?: string;
  /** Default for the block's short questions: digits-only answers → numeric keypad. */
  numeric?: boolean;
  questions: TestQuestion[];
}

export interface TestDay {
  day: string; // e.g. "Day 1"
  title: string; // subject focus for the day
  blocks: TestBlock[];
}

export interface TestWeek {
  week: number;
  label: string; // e.g. "Week 1"
  /** Day-by-day topic list from the week's overview page. */
  overview: string[];
  days: TestDay[];
}

/** A workbook (e.g. "Year 2 Book 1") containing several weeks of tests. */
export interface TestBook {
  label: string;
  weeks: TestWeek[];
}

const year2Book1Weeks: TestWeek[] = [
  {
    week: 1,
    label: 'Week 1',
    overview: [
      'Day 1 — Number and Algebra: Numbers and place value',
      'Day 2 — Number and Algebra: Patterns and number sentences',
      'Day 3 — Spelling: Hard and soft c and g, and consonant digraphs; Grammar and Punctuation: Nouns and noun groups',
      'Day 4 — Reading: Understanding reports',
      'Day 5 — Writing: Descriptions',
    ],
    days: [
      // ─────────────────────────── DAY 1 ───────────────────────────
      {
        day: 'Day 1',
        title: 'Number and Algebra — Numbers and place value',
        blocks: [
          {
            heading: 'Test Your Skills — Numbers in words',
            instructions: 'Write these numbers in words.',
            questions: [
              { type: 'short', n: '1', prompt: '76' },
              { type: 'short', n: '2', prompt: '128' },
              { type: 'short', n: '3', prompt: '315' },
              { type: 'short', n: '4', prompt: '490' },
            ],
          },
          {
            heading: 'Test Your Skills — Ordering numbers',
            numeric: true,
            instructions: 'Put these numbers in order from lowest to highest.',
            questions: [
              { type: 'short', n: '5', prompt: '83, 87, 72, 79', inputs: 4 },
              {
                type: 'short',
                n: '6',
                prompt: '127, 172, 165, 158, 136',
                inputs: 5,
              },
              { type: 'short', n: '7', prompt: '504, 54, 450, 405', inputs: 4 },
            ],
          },
          {
            heading: 'Test Your Skills — Number lines',
            numeric: true,
            instructions:
              'Fill in the three missing numbers on each number line.',
            questions: [
              { type: 'short', n: '8', prompt: '49, 50, __, __, __, 54, 55' },
              { type: 'short', n: '9', prompt: '70, __, 72, __, 74, __, 76' },
              {
                type: 'short',
                n: '10',
                prompt: '20, 30, __, __, __, __, __, 80',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Missing numbers',
            numeric: true,
            instructions: 'Fill in the missing numbers.',
            questions: [
              { type: 'short', n: '11', prompt: '8 + __ = 10' },
              { type: 'short', n: '12', prompt: '32 = 2 + __' },
              { type: 'short', n: '13', prompt: '8 + 32 = 10 + __' },
              { type: 'short', n: '14', prompt: '19 + 17 = 20 + __' },
              { type: 'short', n: '15', prompt: '78 + 16 = 80 + __' },
              { type: 'short', n: '16', prompt: '22 − 9 = __ − 10' },
              { type: 'short', n: '17', prompt: '82 − 47 = 85 − __' },
            ],
          },
          {
            heading: 'Test Your Skills — Place value',
            numeric: true,
            instructions: 'Write the numbers.',
            questions: [
              { type: 'short', n: '15', prompt: 'forty-seven' },
              { type: 'short', n: '16', prompt: 'one hundred and sixty-four' },
              { type: 'short', n: '17', prompt: 'two hundred and seventeen' },
              { type: 'short', n: '18', prompt: 'eight hundred and seventy' },
              { type: 'short', n: '19', prompt: 'nine hundred and nine' },
              { type: 'short', n: '20', prompt: '200 + 60 + 5' },
              { type: 'short', n: '21', prompt: '700 + 40 + 8' },
              { type: 'short', n: '22', prompt: '609 + 7' },
            ],
          },
          {
            heading: 'Test Your Skills — Partitioning',
            numeric: true,
            instructions: 'Fill in the blanks.',
            questions: [
              {
                type: 'short',
                n: '11',
                prompt: '628 = 6 hundreds, __ tens and __ ones',
              },
              {
                type: 'short',
                n: '12',
                prompt: '573 = __ hundreds, __ tens and __ ones',
              },
              {
                type: 'short',
                n: '13',
                prompt: '402 = __ hundreds, __ tens and __ ones',
              },
              {
                type: 'short',
                n: '14',
                prompt: '360 = __ hundreds, __ tens and __ ones',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions:
              'For some questions you write the answer in the box. For others, circle the correct answer.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Write five hundred and ninety-four as a number.',
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which is the number 408?',
                options: [
                  'four hundred and eighty',
                  'four hundred and eight',
                  'forty-eight',
                  'eight hundred and four',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Which equals 831?',
                options: [
                  '8 + 3 + 1',
                  '100 + 30 + 8',
                  '800 + 3 + 10',
                  '800 + 30 + 1',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Which numbers are in order from lowest to highest?',
                options: [
                  '219, 135, 372, 348',
                  '135, 219, 372, 348',
                  '372, 348, 219, 135',
                  '348, 372, 135, 219',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: '400 + 50 + 7 =',
                options: ['400 507', '40 057', '457', '40 507'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which is the same as 98 + 8?',
                options: ['100 + 6', '100 + 7', '100 + 8', '100 + 10'],
              },
              {
                type: 'mcq',
                n: '14',
                prompt: 'Which is not the same as 9 + 7?',
                options: ['10 + 8', '6 + 10', '7 + 9', '8 + 8'],
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Write the numbers 603, 360, 630 and 306 in order from largest to smallest.',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 2 ───────────────────────────
      {
        day: 'Day 2',
        title: 'Number and Algebra — Patterns and number sentences',
        blocks: [
          {
            heading: 'Test Your Skills — Shape patterns',
            numeric: true,
            instructions:
              'Here is a pattern of shapes: □ ○ △ ◇ ◆ □ □ ○ △ ◇ □ □ ○ □ …',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'How many different shapes are used in the pattern?',
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Which shape will come next in the pattern?',
                numeric: false,
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'How many shapes altogether are being repeated each time?',
              },
              {
                type: 'short',
                n: '4',
                prompt: 'How many ○ are used for each △?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Diamond shapes made with sticks',
            numeric: true,
            instructions:
              'Here is a pattern of diamond shapes made with sticks. Each diamond is made from 4 sticks. Count the sticks in each shape.',
            diagram: [
              'Shape 1     Shape 2       Shape 3',
              '  /\\         /\\  /\\         /\\  /\\  /\\',
              '  \\/         \\/  \\/         \\/  \\/  \\/',
            ].join('\n'),
            questions: [
              {
                type: 'short',
                n: '5',
                prompt: 'How many sticks are used in Shape 1?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'How many sticks are used in Shape 2?',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'How many sticks are used in Shape 3?',
              },
              {
                type: 'short',
                n: '8',
                prompt: 'How many extra sticks are needed each time?',
              },
              {
                type: 'short',
                n: '9',
                prompt: 'How many sticks will be needed for Shape 4?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Straws pattern',
            numeric: true,
            instructions:
              'Here is a pattern of triangles made with straws. Each new triangle shares one side with the last. Count the straws in each shape.',
            diagram: [
              'Shape 1   Shape 2    Shape 3     Shape 4',
              '  /\\       /\\/\\       /\\/\\/\\      /\\/\\/\\/\\',
              '  --       ----       ------      --------',
            ].join('\n'),
            questions: [
              {
                type: 'short',
                n: '10',
                prompt: 'How many straws are used for Shape 1?',
              },
              {
                type: 'short',
                n: '11',
                prompt: 'How many straws are used for Shape 2?',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'How many straws are used for Shape 3?',
              },
              {
                type: 'short',
                n: '14',
                prompt: 'How many extra straws are used for each shape?',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'How many straws will be needed for Shape 5?',
              },
              {
                type: 'short',
                n: '16',
                prompt: 'How many straws will be needed for Shape 6?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Number patterns',
            numeric: true,
            instructions:
              'Write down the next number in each pattern (these patterns add the same number each time).',
            questions: [
              { type: 'short', n: '1', prompt: '2, 6, 10, 14, __' },
              { type: 'short', n: '2', prompt: '3, 7, 11, 15, 19, __' },
              { type: 'short', n: '3', prompt: '44, 48, 52, 56, __' },
              { type: 'short', n: '4', prompt: '32, 29, 26, 23, __' },
              { type: 'short', n: '5', prompt: '98, 95, 92, 89, __' },
            ],
          },
          {
            heading: 'Test Your Skills — Building a pattern',
            numeric: true,
            instructions:
              'A pattern is formed by adding 3 each time. The first number is 4.',
            questions: [
              { type: 'short', n: '6', prompt: 'What is the second number?' },
              { type: 'short', n: '7', prompt: 'What is the third number?' },
              { type: 'short', n: '8', prompt: 'What is the fifth number?' },
            ],
          },
          {
            heading: 'Test Your Skills — What is being added or subtracted?',
            numeric: true,
            instructions:
              'What number is being added each time in these patterns?',
            questions: [
              { type: 'short', n: '9', prompt: '5, 7, 9, 11, 13' },
              { type: 'short', n: '10', prompt: '2, 7, 12, 17, 22, 27' },
              { type: 'short', n: '11', prompt: '35, 45, 55, 65' },
              {
                type: 'short',
                n: '12',
                prompt: 'What is being subtracted? 176, 174, 172, 170, 168',
              },
              {
                type: 'short',
                n: '13',
                prompt: 'What is being subtracted? 35, 31, 27, 23, 19, 15',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Missing numbers in patterns',
            numeric: true,
            instructions: 'Fill in the missing number in each pattern.',
            questions: [
              { type: 'short', n: '17', prompt: '3, 6, 9, 12, __, 18, 21, 24' },
              { type: 'short', n: '18', prompt: '__, 8, 15, 22, 29, 36' },
              { type: 'short', n: '19', prompt: '32, 28, __, 20, 16, 12' },
            ],
          },
          {
            heading: 'Test Your Skills — Number sentences',
            numeric: true,
            instructions:
              'Fill in the numbers to make these number sentences true.',
            questions: [
              { type: 'short', n: '20', prompt: '5 + __ = 12' },
              { type: 'short', n: '21', prompt: '__ + 8 = 10' },
              { type: 'short', n: '22', prompt: '6 + __ = 4 + 6' },
              { type: 'short', n: '23', prompt: '9 − __ = 4' },
              { type: 'short', n: '24', prompt: '10 − __ = 7' },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'short',
                n: '4',
                prompt:
                  'What number comes next in this pattern? 25, 30, 35, 40, __',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'A pattern adds 7 each time: 1, 8, ?, 22, 29. What is the missing number?',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Write a number in the box to make this true: 42 − __ = 37',
              },
              { type: 'short', n: '7', prompt: '27 + 25 = __' },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'What is the next number in this pattern? 68, 60, 52, ?',
                options: ['42', '44', '46', '48'],
              },
              { type: 'short', n: '9', prompt: '56 − 34 = __' },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Dan is making a pattern with cards. The first shape has 5 cards, the second has 8 cards and the third has 11 cards. How many cards will the next shape have?',
                options: ['12', '13', '14', '15'],
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Add 100 to find the next number in this pattern: 742, 842, 942, __',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Write a number in the box to make this true: 38 + __ = 70',
              },
              { type: 'short', n: '15', prompt: '43 − 18 = __' },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'What number comes next in this pattern? 43, 49, 55, 61, ?',
                options: ['67', '68', '69', '70'],
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Place numbers in each box to make a pattern. Begin with 6 and add 4 each time: 6, __, __, 18',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 3 ───────────────────────────
      {
        day: 'Day 3',
        title: 'Spelling, and Grammar & Punctuation',
        blocks: [
          {
            heading: 'Spelling — Hard and soft c and g',
            instructions: 'Write five words of your own in each group.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Hard c',
                example: 'cake, carrot',
                inputs: 5,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Soft c',
                example: 'cell, dance',
                inputs: 5,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Hard g',
                example: 'goat, grape',
                inputs: 5,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Soft g',
                example: 'danger, giraffe',
                inputs: 5,
              },
            ],
          },
          {
            heading: 'Spelling — Consonant digraphs',
            instructions: 'Write two words that use each pair of letters.',
            questions: [
              { type: 'short', n: '1', prompt: 'sh', inputs: 2 },
              { type: 'short', n: '2', prompt: 'ch', inputs: 2 },
              { type: 'short', n: '3', prompt: 'ck', inputs: 2 },
              { type: 'short', n: '4', prompt: 'th', inputs: 2 },
              { type: 'short', n: '5', prompt: 'ph', inputs: 2 },
              { type: 'short', n: '6', prompt: 'wh', inputs: 2 },
            ],
          },
          {
            heading: 'Spelling — Real Test (dictation)',
            instructions:
              'Press Listen to hear each word in its sentence, then write the word in the box.',
            questions: [
              {
                type: 'dictation',
                n: '1',
                prompt: 'Be ______ with the kitten.',
                word: 'careful',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: "The emu's egg is ______.",
                word: 'huge',
              },
              {
                type: 'dictation',
                n: '3',
                prompt: "It's ______ to ride a bike without a helmet.",
                word: 'dangerous',
              },
              {
                type: 'dictation',
                n: '4',
                prompt: '______ Tree Frog lives in treetops.',
                word: 'Giant',
              },
              {
                type: 'dictation',
                n: '5',
                prompt: 'We need to ______ the trip.',
                word: 'cancel',
              },
              {
                type: 'dictation',
                n: '6',
                prompt: 'Make some carrot ______.',
                word: 'juice',
              },
              {
                type: 'dictation',
                n: '7',
                prompt: 'Regular ______ is important.',
                word: 'exercise',
              },
              {
                type: 'dictation',
                n: '8',
                prompt: 'This curry is too ______.',
                word: 'spicy',
              },
              {
                type: 'dictation',
                n: '9',
                prompt: '______ sing.',
                word: 'cicadas',
              },
              {
                type: 'dictation',
                n: '10',
                prompt: 'Jack and Jill carried the ______.',
                word: 'bucket',
              },
              {
                type: 'dictation',
                n: '11',
                prompt: 'The ______ was bigger than me.',
                word: 'elephant',
              },
              {
                type: 'dictation',
                n: '12',
                prompt: 'Pick up the dirty ______.',
                word: 'sock',
              },
              {
                type: 'dictation',
                n: '13',
                prompt: 'Do you like your ______ dinner?',
                word: 'chicken',
              },
              {
                type: 'dictation',
                n: '14',
                prompt: 'My story is about a fire-breathing ______.',
                word: 'dragon',
              },
              {
                type: 'dictation',
                n: '15',
                prompt: 'Mum will drive me ______ to school after soccer.',
                word: 'back',
              },
              {
                type: 'dictation',
                n: '16',
                prompt: 'I asked Dad to make chocolate ______.',
                word: 'fudge',
              },
              {
                type: 'dictation',
                n: '17',
                prompt: 'I am ______ to see the dentist tomorrow.',
                word: 'going',
              },
              {
                type: 'dictation',
                n: '18',
                prompt: 'There are twenty-six letters in the ______.',
                word: 'alphabet',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word',
            instructions:
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '19',
                prompt: 'Our *klass* is performing in the school concert.',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'We are going to sing and play musical *consert*.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'We play *musikal* instruments.',
              },
              {
                type: 'short',
                n: '22',
                prompt: 'Our teacher is *hapy* with our singing.',
              },
              {
                type: 'short',
                n: '23',
                prompt: 'She *sed* that this is our chance to shine.',
              },
              {
                type: 'short',
                n: '24',
                prompt: 'This is our *chans* to shine.',
              },
              { type: 'short', n: '25', prompt: 'Zac will use a *microfone*.' },
              {
                type: 'short',
                n: '26',
                prompt: 'to *introdus* our performance.',
              },
              { type: 'short', n: '27', prompt: 'I hope we are *fantastik*.' },
              {
                type: 'short',
                n: '28',
                prompt: 'Eric is talking on the *telefone*.',
              },
              { type: 'short', n: '29', prompt: '*Frow* the ball to the dog.' },
              {
                type: 'short',
                n: '30',
                prompt: 'The ball rolled under a *busch*.',
              },
              { type: 'short', n: '31', prompt: '*Were* is the key?' },
              { type: 'short', n: '32', prompt: 'The *clok* has stopped.' },
              {
                type: 'short',
                n: '33',
                prompt: 'We had to *wip* the cream for the cake.',
              },
              {
                type: 'short',
                n: '34',
                prompt: 'Tim had a *foto* of his puppy.',
              },
              {
                type: 'short',
                n: '35',
                prompt: 'The pen cost *free* dollars.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Nouns',
            instructions: 'Circle (write) the common noun in each row.',
            questions: [
              { type: 'short', n: '1', prompt: 'happy · sad · lonely · dog' },
              {
                type: 'short',
                n: '2',
                prompt: 'creepy · crocodile · silly · hungry',
              },
              { type: 'short', n: '3', prompt: 'dull · yellow · beach · slow' },
              {
                type: 'short',
                n: '4',
                prompt: 'muddy · road · icy · slippery',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Proper nouns',
            instructions:
              'Write these proper nouns with the correct punctuation (capital letters).',
            questions: [
              { type: 'short', n: '1', prompt: 'australia' },
              { type: 'short', n: '2', prompt: 'harry' },
              { type: 'short', n: '3', prompt: 'tasmania' },
              { type: 'short', n: '4', prompt: 'new zealand' },
              { type: 'short', n: '5', prompt: 'isobelle' },
              { type: 'short', n: '6', prompt: 'glen street state school' },
              { type: 'short', n: '7', prompt: 'roald dahl' },
              { type: 'short', n: '8', prompt: 'jeannie baker' },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Adjectives',
            instructions:
              'Circle an appropriate adjective to fill the gap in each sentence.',
            questions: [
              {
                type: 'mcq',
                n: '6',
                prompt: 'Fleas are ______ insects.',
                options: ['colourful', 'tidy', 'delicious', 'gigantic'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Adult cicadas have ______ lives.',
                options: ['hairy', 'green', 'angry', 'short'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Male cicadas are ______ singers.',
                options: ['dangerous', 'yellow', 'loud', 'creamy'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'Cicadas have ______ antennae.',
                options: ['horrid', 'childish', 'short', 'naughty'],
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Possession',
            instructions:
              'Write a word from the box to show possession. (box: my, your, their, her, his)',
            questions: [
              {
                type: 'short',
                n: '14',
                prompt: 'Jo and Tim washed ______ dog.',
              },
              { type: 'short', n: '15', prompt: 'I finished ______ homework.' },
              {
                type: 'short',
                n: '16',
                prompt: '"Tidy ______ room," said Dad.',
              },
              {
                type: 'short',
                n: '17',
                prompt: 'Matilda left ______ hat at school.',
              },
              { type: 'short', n: '18', prompt: 'Dad brushed ______ teeth.' },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Real Test',
            questions: [
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which sentence is written correctly?',
                options: [
                  'Michael lives in sydney.',
                  'Michael lives in Sydney.',
                  'michael lives in Sydney.',
                  'michael lives in sydney.',
                ],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which sentence is written correctly?',
                options: [
                  'Suri saw animals at taronga zoo.',
                  'suri saw animals at Taronga Zoo.',
                  'Suri saw animals at Taronga Zoo.',
                  'Suri saw animals at Taronga zoo.',
                ],
              },
              {
                type: 'mcq',
                n: '18',
                prompt: 'Henry has ______ swimming lesson tomorrow.',
                options: ['has', 'an', 'her', 'them'],
              },
              {
                type: 'mcq',
                n: '19',
                prompt: '______ children have a reading test now.',
                options: ['a', 'an', 'The', 'This'],
              },
              {
                type: 'mcq',
                n: '20',
                prompt: 'A cicada is ______ interesting insect.',
                options: ['a', 'an', 'these', 'him'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'Cicada summer: I found a large Black Prince ______.',
                options: ['pencil', 'hair', 'backyard', 'cicada'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt: 'It had a beautiful, black and brown ______.',
                options: ['backyard', 'flower', 'shell', 'foot'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt: 'Cicadas suck ______ from plants.',
                options: ['potatoes', 'apples', 'trees', 'juice'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt: 'They have two pairs of ______ for flying.',
                options: ['legs', 'heads', 'eggs', 'wings'],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 4 ───────────────────────────
      {
        day: 'Day 4',
        title: 'Reading — Understanding reports',
        blocks: [
          {
            heading: 'Reading: Magpies',
            instructions: 'Read the report, then choose the correct answer.',
            passage:
              'Magpies are very common in Australia. They live in bushland and in towns and cities. All magpies have black and white feathers.\n\nMagpies are known as songbirds. They love to sing. Magpies are good mimics — they are able to copy the sounds they hear. Magpies can sound like other birds and even barking dogs.\n\nMagpies live in family groups. A family group can be parents, children and grandchildren. Older children help to feed younger brothers and sisters and teach them how to find their own food. Magpies protect their nests from intruders. In nesting season male magpies might swoop at people to protect their nests. The female lays two to five eggs at a time. Baby magpies beg loudly and constantly for food.\n\nMagpies eat worms, snails, lizards, frogs, spiders and insects. Magpies mostly peck for food on the ground. They also eat grains.\n\nMagpies are protected in Australia. It is against the law to hurt magpies in any way.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Which sentence is true?',
                options: [
                  'Magpies only live in the bush.',
                  'Magpies are white.',
                  'Magpies are common in Australia.',
                  'Magpies only live in cities.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Where do magpies mostly find their food?',
                options: [
                  'on the ground',
                  'in the water',
                  'in the trees',
                  'in cities',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Magpie nests can be found',
                options: [
                  'in trees.',
                  'in caves.',
                  'on the ground.',
                  'in roofs.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Which of the following will a magpie eat?',
                options: ['apples', 'fish', 'snails', 'grass'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'What do baby magpies do to get food?',
                options: [
                  'swoop at people',
                  'beg loudly',
                  'sing',
                  'find it themselves',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Why do magpies swoop at people?',
                options: [
                  'because they are hungry',
                  'because they don’t like people',
                  'because they are protecting their nests',
                  'because they are songbirds',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Another good title for this text could be',
                options: [
                  'All about baby magpies.',
                  'Travelling in Australia.',
                  'Australian animals.',
                  'An interesting Australian bird.',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Important sites',
            instructions: 'Read the report, then choose the correct answer.',
            passage:
              'There are Aboriginal sites all over Australia. These are special places.\n\nSome Aboriginal sites are sacred. They might be sacred because important traditional ceremonies are held there. They might be burial sites. Sacred sites are often connected to stories of The Dreaming. People often believe that sacred sites are protected by ancestor spirits. Some Aboriginal people think that visitors should not be allowed to enter any sacred sites.\n\nOther important Aboriginal sites are not sacred. Local Aboriginal elders allow visitors onto these sites. One such site is the Birrigai rock shelter near Canberra. Birrigai is a large rock ledge. Up to twelve people can stand under it. Aboriginal people used the rock shelter a long time ago. Many tourists visit the Birrigai rock shelter site, and schoolchildren visit on school excursions.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Aboriginal sites are found',
                options: [
                  'all around Australia.',
                  'only in Canberra.',
                  'in traditional places.',
                  'in watercourses.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Another word for site is',
                options: ['seeing.', 'place.', 'sight.', 'home.'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Many Aboriginal people believe that sacred sites are protected by',
                options: [
                  'ancestor spirits.',
                  'experts.',
                  'tourists.',
                  'schoolchildren.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Where is the Birrigai rock shelter?',
                options: [
                  'a rock shelter',
                  'Canberra',
                  'The Dreaming',
                  'an Aboriginal site',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Who allows visitors onto sites?',
                options: [
                  'a school',
                  'the local Aboriginal elders',
                  'their parents',
                  'the government',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'This report was most likely written for',
                options: ['girls.', 'teachers.', 'boys.', 'children.'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Another good title for this text could be',
                options: [
                  'Holiday places.',
                  'Aboriginal sites.',
                  'The Dreaming.',
                  'School excursions.',
                ],
              },
            ],
          },
          {
            heading: 'Reading: School champion (biography)',
            instructions: 'Read the biography, then choose the correct answer.',
            passage:
              'Judy Chen goes to my school. She is a champion swimmer, and she is my hero. Judy started swimming in races when she was six years old. She swims with a club called Little Dolphins. Judy has won many swimming events for our school. She hopes to compete in the Olympics one day.',
            questions: [
              {
                type: 'mcq',
                n: '2',
                prompt: 'Little Dolphins is the name of',
                options: [
                  'a dolphin species.',
                  'a swimming club.',
                  'a racing club.',
                  'a surf carnival.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Judy started swimming in races when',
                options: [
                  'she was four.',
                  'she was six.',
                  'she started school.',
                  'she was a baby.',
                ],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 5 ───────────────────────────
      {
        day: 'Day 5',
        title: 'Writing — Descriptions',
        blocks: [
          {
            heading: 'Writing text 1 — Describe an animal',
            instructions:
              'Before you start, read the Tips for writing descriptions.\n\nToday you are going to write a description. Your purpose is to describe an animal to readers of your own age.\n\nYou can describe any animal you choose. It can be an animal that you like or are frightened of. It can be an animal that you dislike, a zoo animal, a farm animal, a wild animal, a pet, or an animal that you have seen on television.\n\nMake sure your description helps readers to build a picture of the animal in their own minds.',
            note: 'Before you start to write, think about the animal and picture it in your mind:\n• What does it look like?\n• How does it move?\n• What does it do?\n• How does it behave?\n• What sounds does it make?\n\nRemember to:\n• plan your writing\n• write in paragraphs — each paragraph should describe one aspect of the animal\n• use noun groups and adjectives to describe the animal\n• write in sentences\n• check spelling and punctuation\n• write as neatly as you can so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              {
                type: 'long',
                n: '1',
                prompt: 'Write your description of an animal.',
              },
            ],
          },
          {
            heading: 'Writing text 2 — Describe a place',
            instructions:
              'Before you start, read the Tips for writing descriptions.\n\nToday you are going to write a description. Your purpose is to describe a place to readers of your own age.\n\nYou can describe any type of place you choose. It can be real or imaginary. It can be a place you visit, or a place you would never visit. This place could be the setting for a story set in outer space, a scary story, or your own home or neighbourhood. It’s up to you.\n\nMake sure your description tells your readers all about this place. Describe the place using your senses (sight, sound, smell, touch). Help your readers imagine what this place is like.',
            note: 'Before you start to write, think about the place and picture it in your mind:\n• What can you see?\n• How does it make you feel? (e.g. safe, happy, scared, worried, excited)\n• What sounds can you hear?\n• What can you smell?\n\nRemember to:\n• plan your writing\n• write in paragraphs — each paragraph should be about one main idea\n• use words to describe the place\n• write in sentences — use capital letters and full stops\n• check spelling and punctuation\n• write as neatly as you can so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              {
                type: 'long',
                n: '1',
                prompt: 'Write your description of a place.',
              },
            ],
          },
          {
            heading: 'Writing text 3 — Letter or email to a penfriend',
            instructions:
              'Today you are going to write a letter or email to a new penfriend. The penfriend might be living in Australia or in another country. Your purpose is to tell your new penfriend about yourself and your life.\n\nYou can describe your family and where you live. You should describe things your penfriend might find interesting about you.',
            note: 'Before you start to write, think about:\n• the introduction\n• how to describe yourself, your family and your home\n• the concluding statement\n\nRemember to:\n• plan your writing\n• write in paragraphs\n• write in sentences\n• check spelling and punctuation\n• write as neatly as you can so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              {
                type: 'long',
                n: '1',
                prompt: 'Write your letter or email to your new penfriend.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 2,
    label: 'Week 2',
    overview: [
      'Day 1 — Number and Algebra: Adding, subtracting, multiplying and dividing',
      'Day 2 — Number and Algebra: Fractions and money',
      'Day 3 — Spelling: Two- and three-letter consonant blends, silent consonants and vowel digraphs; Grammar and Punctuation: Verbs; commas in lists and direct speech',
      'Day 4 — Reading: Understanding procedures',
      'Day 5 — Writing: Procedures; recounts',
    ],
    days: [
      // ─────────────────────────── DAY 1 ───────────────────────────
      {
        day: 'Day 1',
        title:
          'Number and Algebra — Adding, subtracting, multiplying and dividing',
        blocks: [
          {
            heading: 'Test Your Skills — Related number facts',
            numeric: true,
            instructions: 'Fill in the blanks.',
            questions: [
              { type: 'short', n: '1', prompt: '5 + __ = 7' },
              { type: 'short', n: '2', prompt: '7 − __ = 5' },
              { type: 'short', n: '3', prompt: '7 − 5 = __' },
              { type: 'short', n: '4', prompt: '6 + __ = 9' },
              { type: 'short', n: '5', prompt: '9 − 6 = __' },
              { type: 'short', n: '6', prompt: '9 − __ = 6' },
              { type: 'short', n: '7', prompt: '5 + 3 = __' },
              { type: 'short', n: '8', prompt: '8 − __ = 3' },
              { type: 'short', n: '9', prompt: '8 − 3 = __' },
            ],
          },
          {
            heading: 'Test Your Skills — Counting problems',
            numeric: true,
            questions: [
              {
                type: 'short',
                n: '10',
                prompt: 'Here are some nails. How many nails are there?',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'If 6 more nails are added, how many nails will there be?',
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Here are some paperclips. How many paperclips are there?',
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'If 5 paperclips are taken away, how many paperclips will be left?',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Jill has 5 stickers and Selma has 8 stickers. How many stickers do they have altogether?',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'How many more stickers does Selma have than Jill?',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Selma gives 2 of her stickers to Jill. How many stickers does Jill have now?',
              },
              {
                type: 'short',
                n: '17',
                prompt: 'How many stickers does Selma have now?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Making numbers easier',
            numeric: true,
            instructions: 'Fill in the blanks.',
            questions: [
              { type: 'short', n: '18', prompt: '32 + 18 = 30 + __' },
              { type: 'short', n: '19', prompt: '67 + 47 = 70 + __' },
              { type: 'short', n: '20', prompt: '82 − 19 = __ − 20' },
              { type: 'short', n: '21', prompt: '55 − 38 = __ − 40' },
            ],
          },
          {
            heading: 'Test Your Skills — Multiplication and division',
            numeric: true,
            instructions: 'Fill in the blanks and answer the questions.',
            questions: [
              { type: 'short', n: '1', prompt: '3 + 3 + 3 + 3 = __ × 3' },
              { type: 'short', n: '2', prompt: '7 + 7 + 7 + 7 = __ × 7' },
              {
                type: 'short',
                n: '3',
                prompt: '2 + 2 + 2 + 2 + 2 + 2 + 2 = __ × 2',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Here is a pack of drinks. How many drinks are in the pack?',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'How many drinks would be in 2 packs?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'The number of drinks in 5 packs would be 5 × __',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Here are some pencils. How many pencils are there?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'If 2 boys share the pencils, how many will they each have?',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'If 3 girls share the pencils, how many will they each have?',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'If 4 children share the pencils, how many will they each have?',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions:
              'Which one of these would be used to work out the answer to each problem? Choose A 6 + 2, B 6 − 2, C 6 × 2 or D 6 ÷ 2.',
            questions: [
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Suzy has 6 books. She gives 2 books to Max. How many books does Suzy have now?',
                options: ['6 + 2', '6 − 2', '6 × 2', '6 ÷ 2'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Pat and Kim share 6 books equally. How many books does Pat get?',
                options: ['6 + 2', '6 − 2', '6 × 2', '6 ÷ 2'],
              },
              {
                type: 'mcq',
                n: '13',
                prompt:
                  'Zac has 2 piles of books. There are 6 books in each pile. How many books does Zac have?',
                options: ['6 + 2', '6 − 2', '6 × 2', '6 ÷ 2'],
              },
              {
                type: 'mcq',
                n: '14',
                prompt:
                  'Mia has 6 books. Jon has 2 books. How many more books does Mia have than Jon?',
                options: ['6 + 2', '6 − 2', '6 × 2', '6 ÷ 2'],
              },
              {
                type: 'mcq',
                n: '15',
                prompt:
                  'Sam has 6 books. Billy has 2 books. How many books do they have altogether?',
                options: ['6 + 2', '6 − 2', '6 × 2', '6 ÷ 2'],
              },
              {
                type: 'mcq',
                n: '16',
                prompt:
                  'Will put all his blocks into 3 equal stacks. Each stack has 6 blocks. How can Will find the total number of blocks?',
                options: ['6 + 3', '6 − 3', '6 × 3', '6 ÷ 3'],
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Rose has 37 books. Mary has 56 books. How many books do Rose and Mary have altogether?',
                options: ['91', '93', '81', '83'],
              },
              {
                type: 'mcq',
                n: '18',
                prompt:
                  'Tennis balls are sold in packs of 4. Sam needs 11 tennis balls. What is the least number of packs Sam needs?',
                options: ['2', '3', '4', '5'],
              },
              {
                type: 'mcq',
                n: '19',
                prompt:
                  'Jay has 30 toy trucks. He puts the trucks into rows, with 5 trucks in each row. Which shows how to work out the number of rows needed?',
                options: ['30 + 5', '30 − 5', '30 × 5', '30 ÷ 5'],
              },
              {
                type: 'short',
                n: '20',
                prompt:
                  'Tim is putting pies in boxes. Each box holds 4 pies. How many boxes will Tim need for 20 pies?',
              },
              {
                type: 'short',
                n: '21',
                prompt: '18 + 37 has the same value as 20 + __',
              },
              {
                type: 'short',
                n: '22',
                prompt:
                  '$30 is shared equally among 6 boys. How much will each boy get? $__',
              },
              {
                type: 'short',
                n: '23',
                prompt:
                  'Bill has 83 spanners. Jed has 27 spanners. How many more spanners does Bill have than Jed?',
              },
              {
                type: 'mcq',
                n: '24',
                prompt:
                  'Each plate has 4 cakes. There are 3 plates. Which shows one way to work out the total number of cakes?',
                options: ['4 + 3', '4 + 4 + 4 + 4', '4 × 3', '3 + 3 + 3'],
              },
              {
                type: 'mcq',
                n: '25',
                prompt: 'Which gives the same answer as 9 + 9?',
                options: ['7 + 9', '10 + 8', '8 + 6', '12 + 10'],
              },
              {
                type: 'short',
                n: '26',
                prompt:
                  'Some boys share these 18 marbles. Each boy gets 3 marbles. How many boys share the marbles?',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 2 ───────────────────────────
      {
        day: 'Day 2',
        title: 'Number and Algebra — Fractions and money',
        blocks: [
          {
            heading: 'Test Your Skills — Fractions',
            instructions:
              'Here are some toy cars. Answer the questions, then write the fraction shaded.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Jack owns half of the cars. How many cars does Jack own?',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Will owns one-quarter of the cars. How many does Will own?',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Ed owns one-eighth of the cars. How many does Ed own?',
              },
              {
                type: 'short',
                n: '4',
                prompt: 'What fraction of the first bar is shaded?',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'What fraction of the second bar is shaded?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'What fraction of the third bar is shaded?',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'What fraction of the fourth bar is shaded?',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Here are some oranges. How many halves can each orange be cut into?',
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'If all the oranges are cut into halves, how many halves will there be?',
              },
              {
                type: 'short',
                n: '13',
                prompt: 'How many quarters can each orange be cut into?',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'If all the oranges are cut into quarters, how many quarters will there be?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Money',
            instructions:
              'Look at the coins and notes, then answer the questions.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Here are some coins. Which coin has the largest value?',
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Which coin has the smallest value?',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'What is the value of the coin between the 20-cent and the 5-cent coins?',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Which coin is worth more than the first coin but less than the last coin?',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'Look at these two coins. Which coin is worth more?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'What is the value of the two coins together?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Look at these three coins. Which coin is worth the most?',
              },
              {
                type: 'short',
                n: '8',
                prompt: 'Which coin is worth the least?',
              },
              {
                type: 'short',
                n: '9',
                prompt: 'What is the value of the three coins altogether?',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Look at this money (notes). Which note is worth the most?',
              },
              {
                type: 'short',
                n: '11',
                prompt: 'Which note is worth the least?',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'What is the total value of this money?',
              },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'Ed has these pencils. He gives half of the pencils to Nick. How many pencils does Ed give to Nick?',
                options: ['4', '6', '12', '24'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Kylie has only these coins. How much money does she have?',
                options: ['40 cents', '$4.35', '$5.35', '$40'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Max cut some oranges into quarters. He has 8 quarters. How many oranges did Max cut?',
                options: ['2', '4', '8', '32'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Which shape has one-eighth shaded?',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Jake cut these apples into quarters. How many quarters did Jake have?',
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Kevin has only these coins. He buys a ruler for 75 cents. How much money does Kevin have left?',
                options: ['$1.35', '$1.30', '$1.25', '36 cents'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which shape has one-half shaded?',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Toby makes a cake. He needs one and a half cups of sugar. This scoop holds half a cup. How many scoops of sugar does Toby need?',
                options: ['1', '1½', '2', '3'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Sue has this money in her purse ($50, $20, $20, $10, $5). How much money is this?',
                options: ['$85', '$95', '$105', '$115'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Jill has these balloons. She gives half the balloons to Luke. Then Jill gives half of the balloons that are left to Alice. How many balloons will Jill have after giving balloons to Luke and Alice?',
                options: ['2', '3', '4', '6'],
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Ellen has these coins. She buys a banana. Now she has the coins shown left. How much was the banana? __ cents',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 3 ───────────────────────────
      {
        day: 'Day 3',
        title: 'Spelling, and Grammar & Punctuation',
        blocks: [
          {
            heading: 'Spelling — Consonant blends',
            instructions: 'Make a word that ends with each pair of letters.',
            questions: [
              { type: 'short', n: '1', prompt: 'A word ending in “st”' },
              { type: 'short', n: '2', prompt: 'A word ending in “mp”' },
              { type: 'short', n: '3', prompt: 'A word ending in “nd”' },
              { type: 'short', n: '4', prompt: 'A word ending in “nk”' },
              { type: 'short', n: '5', prompt: 'A word ending in “sk”' },
              { type: 'short', n: '6', prompt: 'A word ending in “lt”' },
              { type: 'short', n: '7', prompt: 'A word ending in “ft”' },
            ],
          },
          {
            heading: 'Spelling — Beginning blends',
            instructions: 'Write a word that starts with each blend.',
            questions: [
              { type: 'short', n: '1', prompt: 'A word starting with “bl”' },
              { type: 'short', n: '2', prompt: 'A word starting with “cr”' },
              { type: 'short', n: '3', prompt: 'A word starting with “fr”' },
              { type: 'short', n: '4', prompt: 'A word starting with “sl”' },
            ],
          },
          {
            heading: 'Spelling — Silent letters',
            instructions: 'Add the missing silent letter to finish each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'We__nesday' },
              { type: 'short', n: '2', prompt: 'shou__d' },
              { type: 'short', n: '3', prompt: 'autum__' },
              { type: 'short', n: '4', prompt: '__nuckle' },
              { type: 'short', n: '5', prompt: 'li__ten' },
              { type: 'short', n: '6', prompt: 'i__land' },
              { type: 'short', n: '7', prompt: 'si__t (as in eyesight)' },
            ],
          },
          {
            heading: 'Spelling — Vowel digraphs',
            instructions:
              'Write a word with the same pair of vowels and the same vowel sound as each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'school' },
              { type: 'short', n: '2', prompt: 'eat' },
              { type: 'short', n: '3', prompt: 'blue' },
              { type: 'short', n: '4', prompt: 'boot' },
              { type: 'short', n: '5', prompt: 'rain' },
              { type: 'short', n: '6', prompt: 'meet' },
            ],
          },
          {
            heading: 'Spelling — Real Test (dictation)',
            instructions:
              'Press Listen to hear each word in its sentence, then write the word in the box.',
            questions: [
              {
                type: 'dictation',
                n: '1',
                prompt: 'The gorilla began to ______ down from the tree.',
                word: 'climb',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: 'Her ______ scraped on the ground.',
                word: 'knuckles',
              },
              {
                type: 'dictation',
                n: '3',
                prompt: 'The dog followed the ______ of the cat.',
                word: 'scent',
              },
              {
                type: 'dictation',
                n: '4',
                prompt: '______ wants to play chess?',
                word: 'who',
              },
              {
                type: 'dictation',
                n: '5',
                prompt: 'I get my new reading glasses on ______.',
                word: 'Wednesday',
              },
              {
                type: 'dictation',
                n: '6',
                prompt: 'I wish I ______ go to Jenna’s after school.',
                word: 'could',
              },
              {
                type: 'dictation',
                n: '7',
                prompt: 'Some trees lose their leaves in ______.',
                word: 'autumn',
              },
              {
                type: 'dictation',
                n: '8',
                prompt: 'I borrowed a book about Kangaroo ______.',
                word: 'Island',
              },
              {
                type: 'dictation',
                n: '9',
                prompt: 'Ya-ya is ______ the baby a jumper.',
                word: 'knitting',
              },
              {
                type: 'dictation',
                n: '10',
                prompt: 'Grandpa said his ______ is sore.',
                word: 'knee',
              },
              {
                type: 'dictation',
                n: '11',
                prompt: 'I dressed up as a ______ for Halloween.',
                word: 'ghost',
              },
              {
                type: 'dictation',
                n: '12',
                prompt: 'Please use a ______ to tidy your hair.',
                word: 'comb',
              },
              {
                type: 'dictation',
                n: '13',
                prompt:
                  'King Arthur is said to have pulled a ______ from a stone.',
                word: 'sword',
              },
              {
                type: 'dictation',
                n: '14',
                prompt: 'Do you ______ what time the movie starts?',
                word: 'know',
              },
              {
                type: 'dictation',
                n: '15',
                prompt: 'I heard the brakes on the car ______.',
                word: 'squeal',
              },
              {
                type: 'dictation',
                n: '16',
                prompt: 'You must ______ to the instructions.',
                word: 'listen',
              },
              {
                type: 'dictation',
                n: '17',
                prompt: 'Be gentle or the cat will ______ you.',
                word: 'scratch',
              },
              {
                type: 'dictation',
                n: '18',
                prompt: 'Recycle ______ cans.',
                word: 'steel',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word',
            instructions:
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling.',
            questions: [
              { type: 'short', n: '19', prompt: 'We ate *samon* sandwiches.' },
              {
                type: 'short',
                n: '20',
                prompt: '“Our boat *sanks*,” said Luis.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Ben *whent* to the library at lunchtime.',
              },
              {
                type: 'short',
                n: '22',
                prompt: '“I ate the *hole* mango,” said Petra.',
              },
              { type: 'short', n: '23', prompt: '*Lisen* to the teacher.' },
              {
                type: 'short',
                n: '24',
                prompt: 'The children played on the *beech*.',
              },
              {
                type: 'short',
                n: '25',
                prompt: 'The story was about *nights* who fought battles.',
              },
              { type: 'short', n: '26', prompt: 'My shoes are too *tite*.' },
              {
                type: 'short',
                n: '27',
                prompt: 'It takes one *our* to drive to Grandpa’s.',
              },
              {
                type: 'short',
                n: '28',
                prompt: 'The jumper might *shringk* in the wash.',
              },
              { type: 'short', n: '29', prompt: 'Rose sprained her *rist*.' },
              {
                type: 'short',
                n: '30',
                prompt: 'Henry stomped through the puddle in his *boowts*.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'We had swimming races in the *pule*.',
              },
              {
                type: 'short',
                n: '32',
                prompt: 'I used *gloo* to stick the foil onto my collage.',
              },
              {
                type: 'short',
                n: '33',
                prompt: 'You *shoud* walk your dog every day.',
              },
              {
                type: 'short',
                n: '34',
                prompt: 'I *mite* go to the park later.',
              },
              {
                type: 'short',
                n: '35',
                prompt: '*Thinck* about your spelling.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Verbs',
            instructions: 'Write the correct doing verb in each space.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Nan ______ his horse to school today. (ride / rode / riding)',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Denni ______ an apple every day. (eats / eaten / eating)',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Angus can ______ fifty metres. (swam / swimming / swim)',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'The children have ______ their homework. (finish / finishing / finished)',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Helper verb: My clever dog ______ count to three. (must / has / can / did)',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Helper verb: We ______ learn our spelling for the test.',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Helper verb: Dad ______ try to fix my bike yesterday.',
              },
              {
                type: 'short',
                n: '8',
                prompt: 'Helper verb: Mum ______ eaten all the strawberries.',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Thinking verb: Mum is ______ about Grandma. (believes / worried / like / loves)',
              },
              {
                type: 'short',
                n: '10',
                prompt: 'Thinking verb: I ______ walking our dog.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Which sentence is correct?',
                options: [
                  'The dog swimming in the pond yesterday.',
                  'The dog swim in the pond yesterday.',
                  'The dog swam in the pond yesterday.',
                  'The dog will swimming in the pond yesterday.',
                ],
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Choose are/was/were: The ducks ______ swimming in the pond, right now.',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Choose are/was/were: A duck ______ swimming in the pond yesterday.',
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Which correctly completes this sentence? “Tomorrow we ______ to the library.”',
                options: ['will go', 'be going', 'went', 'had gone'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Which sentence is correct?',
                options: [
                  'The children is collecting autumn leaves.',
                  'The children are collecting autumn leaves.',
                  'The children was collecting autumn leaves.',
                  'The children will collecting autumn leaves.',
                ],
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'A comma has been left out of this sentence. Where should the comma go? “Dad bought rice cashews, chicken, broccoli and onions for the stir fry.”',
                options: [
                  'after rice',
                  'after chicken',
                  'after broccoli',
                  'no comma needed',
                ],
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Which word completes this sentence? “Billy counted his pencils and ______ that some were missing.”',
                options: ['seen', 'saw', 'sawn', 'see'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Which word completes this sentence? “Let’s read a book,” ______ Mum.',
                options: ['talk', 'suggested', 'asked', 'speaking'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Which word completes this sentence? “Helen ______ she is tired.”',
                options: ['sayed', 'saying', 'say', 'said'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Which word group completes this sentence? “Pets quickly become sick if ______ in a hot car.”',
                options: ['lefted', 'left', 'being left', 'leaved'],
              },
              {
                type: 'mcq',
                n: '13',
                prompt: 'Which of these is a complete sentence?',
                options: [
                  'Go to the library.',
                  'Five fat frogs.',
                  'My friend’s house.',
                  'Mum and Dad.',
                ],
              },
              {
                type: 'short',
                n: '14',
                prompt: 'Choose are/is/has/am: My name ______ Petra.',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'Choose are/is/has/am: I ______ eight years old.',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Choose are/is/has/am: Children in Dunedoo ______ lucky.',
              },
              {
                type: 'short',
                n: '17',
                prompt: 'Choose are/is/has/am: Dunedoo ______ great schools.',
              },
              {
                type: 'mcq',
                n: '18',
                prompt: 'Which of these is a complete sentence?',
                options: [
                  'Fabien and Tina.',
                  'Yesterday, at midnight.',
                  'Wendy ran in the race.',
                  'Bread and honey.',
                ],
              },
              {
                type: 'mcq',
                n: '19',
                prompt: 'Which sentence tells about the past?',
                options: [
                  'I went to the park.',
                  'I want to go to the park.',
                  'I will go to the park.',
                  'I am going to the park.',
                ],
              },
              {
                type: 'short',
                n: '20',
                prompt:
                  'Start the command (Beat/Add/Bake/Pour): ______ the flour to the mixture.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Start the command: ______ the eggs until smooth.',
              },
              {
                type: 'short',
                n: '22',
                prompt: 'Start the command: ______ the juice into a glass.',
              },
              {
                type: 'short',
                n: '23',
                prompt:
                  'Start the command: ______ in a hot oven for 30 minutes.',
              },
              {
                type: 'mcq',
                n: '24',
                prompt: 'Which sentence has the correct punctuation?',
                options: [
                  '“I love stories about aliens said Frankie.”',
                  '“I love stories, about aliens” said Frankie.',
                  '“I love stories about aliens,” said Frankie.',
                  '“I love stories about aliens”, said Frankie.',
                ],
              },
              {
                type: 'mcq',
                n: '25',
                prompt:
                  'Choose the correct word: “Yuki does not ______ peanuts.”',
                options: ['eating', 'ate', 'eaten', 'eat'],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 4 ───────────────────────────
      {
        day: 'Day 4',
        title: 'Reading — Understanding procedures',
        blocks: [
          {
            heading: 'Reading: Hair-growth Tonic (recipe)',
            instructions: 'Read the recipe, then choose the correct answer.',
            passage:
              'Hair-growth Tonic\n\nTonic makes hair grow thick and fast. Not suitable for babies.\n\nIngredients\n• 1 tablespoon tomato sauce\n• 1 cup coconut oil\n• 1 teaspoon grated ginger\n• 1 teaspoon grated garlic\n\nMethod\n1. Mix together all ingredients.\n2. Pour mixture through a strainer.\n3. Discard any lumpy bits.\n4. Pour tonic into a clean bottle.\n5. Shake well before each use.\n6. Store Hair-growth Tonic in fridge.\n\nInstructions for use: Massage into affected area (bald spots) daily until signs of hair growth. Only for use on heads. Especially avoid getting tonic on soles of feet.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'This kind of text is a',
                options: ['story.', 'recount.', 'report.', 'recipe.'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Which word from the text means ‘throw away’?',
                options: ['massage', 'discard', 'pour', 'avoid'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'What sort of oil is used to make the tonic?',
                options: ['tomato', 'olive', 'coconut', 'hair-growth oil'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'How should the tonic be used?',
                options: [
                  'Massage onto head.',
                  'Massage onto any hairless skin.',
                  'Massage over legs.',
                  'Store in fridge.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'A strainer',
                options: [
                  'collects lumpy bits.',
                  'pulls your muscles.',
                  'separates coconut from the shell.',
                  'is used for storing liquids.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Where should the tonic be stored?',
                options: [
                  'overnight',
                  'in the fridge',
                  'daily',
                  'until signs of hair growth',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Who would use the tonic?',
                options: [
                  'babies',
                  'people with hairy feet',
                  'bald people',
                  'hungry people',
                ],
              },
            ],
          },
          {
            heading: 'Reading: How to train a pet mouse',
            instructions:
              'Read the instructions, then choose the correct answer.',
            passage:
              'How to train a pet mouse\n\nTraining a pet mouse will take time and patience. The more time you spend, the more easily it will learn tricks.\n\nMice are timid, so handle your mouse gently and often. Rub your hands in the mouse bedding so that your hands smell more like the mouse and it gets used to you.\n\nMice love treats such as millet, oats or sunflower seeds. Reward your mouse with a treat each time you handle it. Make a clicking noise with your tongue each time you give the treat. Eventually your mouse will learn that the clicking sound means a treat is coming, and it will come straight to you when you make the sound.\n\nReward all good behaviour with food treats. Keep training sessions short.\n\nNote: Mice are sociable and like to live with other mice. Single mice get bored and lonely.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'These instructions are for',
                options: [
                  'people with pet mice.',
                  'vets.',
                  'teachers.',
                  'children.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Which treats do mice prefer?',
                options: ['toys', 'chips', 'oats', 'rewards'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'What does ‘sociable’ mean in the text?',
                options: ['friendly', 'bored', 'active', 'lonely'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Trained mice learn that a clicking sound means',
                options: [
                  'stand up.',
                  'there’s a food treat.',
                  'the mouse needs a reward.',
                  'a mouse is in training.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Why does training a mouse take time and patience?',
                options: [
                  'Mice are timid.',
                  'Mice can’t stand up and beg.',
                  'Mice are sociable.',
                  'Mice like to eat all the time.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Why do pet mice sometimes get lonely?',
                options: [
                  'Their home is too big for them.',
                  'They aren’t taught enough tricks.',
                  'Their owner doesn’t handle them enough.',
                  'They don’t have other mice to live with.',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Why would you rub your hands on the mouse bedding?',
                options: [
                  'to get mouse germs',
                  'to warm the bedding',
                  'to make you smell like a mouse',
                  'to feel if the bedding is wet',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Rules for young chimpanzees',
            instructions: 'Read the rules, then choose the correct answer.',
            passage:
              'Rules for young chimpanzees\n\n• Stay out of the way of the alpha male.\n• Greet other chimps with a kiss and a hug.\n• Listen out for hooting and barking sounds in the morning. These sounds mean that food has been found.\n• Eat fruit, leaves, termites, vegetables, eggs, nuts, honey and wild pig when you can catch one.\n• Use grass and leaves to build ground nests for afternoon naps.\n• Rest during the hottest part of the day.\n• Build nests high in trees for night sleeping, safe from hungry leopards.\n• Help your friends and family with grooming; remove dirt and ticks.\n• Stay close to your mother until you are at least four years old.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Chimps make this sound when they find food.',
                options: ['growling', 'barking', 'grunting', 'hissing'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Chimpanzees are eaten by',
                options: ['alpha males.', 'leopards.', 'termites.', 'ticks.'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'At night chimpanzees sleep',
                options: [
                  'in nests on the ground.',
                  'in grass and leaves.',
                  'in nests high in trees.',
                  'with friends.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Young chimps need to stay out of the way of',
                options: [
                  'missing a meal.',
                  'friends who play tricks.',
                  'hot days.',
                  'the alpha male.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Why do chimps build nests on the ground?',
                options: [
                  'for afternoon naps',
                  'to catch pigs',
                  'for sleeping at night',
                  'to hide from dangers',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Young chimpanzees should follow the rules so that',
                options: [
                  'they have food.',
                  'they make friends.',
                  'they learn how to be safe and happy.',
                  'they will be clean.',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Chimps eat',
                options: [
                  'plants only.',
                  'leopards.',
                  'eggs and plants.',
                  'a variety of plant and animal foods.',
                ],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 5 ───────────────────────────
      {
        day: 'Day 5',
        title: 'Writing — Procedures and recounts',
        blocks: [
          {
            heading: 'Writing text 1 — A recipe (procedure)',
            instructions:
              'Today you are going to write a recipe. Your purpose is to write an imaginative recipe for readers of your own age.\n\nYou can create something everyone would like. It could be a magical recipe, or a special recipe for a food you eat or would like to eat. Include any warnings, special advice or instructions for users of your recipe.',
            note: 'Before you start to write, think about:\n• the goal of the recipe\n• how it will be used\n• the ingredients needed\n• the steps needed to make the recipe (method)\n\nRemember to:\n• plan your writing\n• write the steps as commands\n• be specific with ingredients and amounts\n• use action verbs\n• write in sentences\n• check spelling and punctuation\n• write as neatly as you can so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [{ type: 'long', n: '1', prompt: 'Write your recipe.' }],
          },
          {
            heading: 'Writing text 2 — Instructions (procedure)',
            instructions:
              'Today you are going to write a set of instructions. The instructions can be for how to do anything you choose — how to make or build something, how to use a piece of equipment, or how to care for a pet.\n\nWrite about something you are very familiar with. Imagine you are writing the instructions for children of your own age who have never done this before. Your readers will need very clear instructions to tell them what to do.',
            note: 'Before you start to write, think about:\n• the activity you will write the instructions for\n• the heading or goal of the instructions\n• the equipment needed\n• the steps needed\n\nRemember to:\n• plan your writing\n• write the steps as commands using action verbs\n• write the steps in sequence — use numbering\n• check your punctuation and spelling\n• write neatly so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              { type: 'long', n: '1', prompt: 'Write your instructions.' },
            ],
          },
          {
            heading: 'Writing text 3 — A recount',
            instructions:
              'Today you are going to write a recount. Your purpose is to tell readers of your own age about something that happened. It might be about something you did — a school excursion, a classroom experiment that you ran, a game you played, or something you did at school. Make sure you recount the events in time order.',
            note: 'Before you start to write, think about the event or activity:\n• What happened first?\n• What happened next?\n• What happened last?\n• How did you feel about events?\n\nRemember to:\n• plan your writing\n• make sure ideas are grouped in paragraphs\n• use past-tense verbs\n• use pronouns to refer to yourself and others\n• write in sentences\n• check spelling and punctuation\n• write neatly so that readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              { type: 'long', n: '1', prompt: 'Write your recount.' },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 3,
    label: 'Week 3',
    overview: [
      'Day 1 — Measurement and Geometry: Measurement and shape',
      'Day 2 — Measurement and Geometry: Time and mass',
      'Day 3 — Spelling: Long vowels, “qu”, common contractions and vowel consonant blends; Grammar and Punctuation: Types of sentences; joining sentences and sentence punctuation',
      'Day 4 — Reading: Understanding narratives',
      'Day 5 — Writing: Narratives',
    ],
    days: [
      // ─────────────────────────── DAY 1 ───────────────────────────
      {
        day: 'Day 1',
        title: 'Measurement and Geometry — Measurement and shape',
        blocks: [
          {
            heading: 'Test Your Skills — Choosing instruments',
            instructions:
              'Which instrument would you use to measure each? (ruler, scales, measuring cup, clock, thermometer)',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'How long a cake takes to bake',
              },
              { type: 'short', n: '2', prompt: 'The mass of flour for a cake' },
              {
                type: 'short',
                n: '3',
                prompt: 'The amount of milk for a cake',
              },
              { type: 'short', n: '4', prompt: 'How long the cake is' },
              { type: 'short', n: '5', prompt: 'How hot it is in the kitchen' },
            ],
          },
          {
            heading: 'Test Your Skills — Comparing length and capacity',
            instructions:
              'Here are some ribbons (bar chart) and some jugs of juice. Answer the questions.',
            questions: [
              {
                type: 'short',
                n: '6',
                prompt: 'What colour is the longest ribbon?',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'What colour is the shortest ribbon?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Which ribbon is longer than the pink ribbon but shorter than the red ribbon?',
              },
              {
                type: 'short',
                n: '9',
                prompt: 'Which jug has the most juice in it?',
              },
              {
                type: 'short',
                n: '10',
                prompt: 'Which jug has the least amount of juice in it?',
              },
              {
                type: 'short',
                n: '11',
                prompt: 'Which two jugs have the same amount of juice?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — 2D and 3D shapes',
            instructions: 'Look at the shapes and prisms, then answer.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Look at these shapes. How many are triangles?',
              },
              { type: 'short', n: '2', prompt: 'How many are circles?' },
              { type: 'short', n: '3', prompt: 'How many are rectangles?' },
              {
                type: 'short',
                n: '4',
                prompt:
                  'This is a rectangular prism. How many faces does it have?',
              },
              { type: 'short', n: '5', prompt: 'What shape are its faces?' },
              {
                type: 'short',
                n: '6',
                prompt: 'How many corners does it have?',
              },
              { type: 'short', n: '7', prompt: 'How many edges does it have?' },
              {
                type: 'short',
                n: '8',
                prompt:
                  'This is a triangular prism. How many faces does it have?',
              },
              {
                type: 'short',
                n: '9',
                prompt: 'How many faces are triangles?',
              },
              {
                type: 'short',
                n: '10',
                prompt: 'How many faces are rectangles?',
              },
              {
                type: 'short',
                n: '11',
                prompt: 'How many corners does it have?',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'How many edges does it have?',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions: 'Choose the correct answer.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Which dog is the tallest? (see pictures)',
                options: ['Dog A', 'Dog B', 'Dog C', 'Dog D'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'What is this 3D shape? (a can/cylinder shape)',
                options: ['pyramid', 'cone', 'cube', 'cylinder'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'This is a square pyramid. How many faces does it have?',
                options: ['4', '5', '6', '8'],
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Cass is putting stamps on a card. How many stamps like these will fit on the card altogether?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Which number is in the circle and in the triangle, but not in the square? (Venn diagram)',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Luke built this cube from small blocks. How many blocks did Luke need?',
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'How many of these shapes are rectangles?',
                options: ['2', '3', '4', 'more than 4'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'This bucket holds 20 litres when full. There is some milk in the bucket. About how much milk is in the bucket?',
                options: ['16 litres', '11 litres', '6 litres', '1 litre'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'This is a rectangular prism. How many edges does it have?',
                options: ['6', '8', '10', '12'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Which shape has the most squares coloured? (grid shapes)',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 2 ───────────────────────────
      {
        day: 'Day 2',
        title: 'Measurement and Geometry — Time and mass',
        blocks: [
          {
            heading: 'Test Your Skills — Telling the time',
            instructions: 'What time is shown on each clock? Write the time.',
            questions: [
              { type: 'short', n: '1', prompt: 'Clock 1' },
              { type: 'short', n: '2', prompt: 'Clock 2' },
              { type: 'short', n: '3', prompt: 'Clock 3' },
              { type: 'short', n: '4', prompt: 'Clock 4' },
              { type: 'short', n: '5', prompt: 'Clock 5' },
              { type: 'short', n: '6', prompt: 'Clock 6' },
              { type: 'short', n: '7', prompt: 'Clock 7' },
              { type: 'short', n: '8', prompt: 'Clock 8' },
              { type: 'short', n: '9', prompt: 'Clock 9' },
              { type: 'short', n: '10', prompt: 'Clock 10' },
              { type: 'short', n: '11', prompt: 'Clock 11' },
              { type: 'short', n: '12', prompt: 'Clock 12' },
            ],
          },
          {
            heading: 'Test Your Skills — Calendar (May)',
            instructions: 'Look at the May calendar. Answer the questions.',
            questions: [
              {
                type: 'short',
                n: '13',
                prompt: 'What day of the week is 2 May?',
              },
              {
                type: 'short',
                n: '14',
                prompt: 'What day of the week is 10 May?',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'What day of the week is 29 May?',
              },
              {
                type: 'short',
                n: '16',
                prompt: 'What is the date of the first Friday in May?',
              },
              {
                type: 'short',
                n: '17',
                prompt: 'What is the date of the second Sunday in May?',
              },
              {
                type: 'short',
                n: '18',
                prompt: 'What is the date of the last Tuesday in May?',
              },
              {
                type: 'short',
                n: '19',
                prompt: 'What is the date of the third Monday in May?',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'What is the date exactly 2 weeks after 7 May?',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'What is the date exactly 1 week before 19 May?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Months and seasons',
            instructions:
              'Answer the questions about months, seasons and time.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'List in order the 12 months of the year.',
              },
              { type: 'short', n: '2', prompt: 'How many days are in April?', numeric: true },
              { type: 'short', n: '3', prompt: 'How many days are in June?', numeric: true },
              { type: 'short', n: '4', prompt: 'How many days are in August?', numeric: true },
              {
                type: 'short',
                n: '5',
                prompt: 'How many days are in October?',
                numeric: true,
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'True or false: The three summer months are November, December and January.',
              },
              { type: 'short', n: '7', prompt: 'What season is January in?' },
              { type: 'short', n: '8', prompt: 'What season is July in?' },
              { type: 'short', n: '9', prompt: 'What season is October in?' },
              { type: 'short', n: '10', prompt: 'What season is March in?' },
              {
                type: 'short',
                n: '11',
                prompt:
                  'How long is it from 9 o’clock in the morning until 3 o’clock in the afternoon?',
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'How long is it from quarter to seven until quarter past seven?',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions: 'Choose the correct answer.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'What time is shown on this clock? (a clock)',
                options: [
                  'quarter past five',
                  'quarter to five',
                  'quarter past four',
                  'quarter to four',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Oliver was born on 18 July 2012. On what day of the week was Oliver born? (July 2012 calendar)',
                options: ['Saturday', 'Tuesday', 'Wednesday', 'Sunday'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which of these is used to measure mass?',
                options: [
                  'a thermometer',
                  'a set of scales',
                  'a ruler',
                  'a clock',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'The minute hand is missing from this clock. What time is it?',
                options: [
                  '8 o’clock',
                  'half past eight',
                  'quarter to eight',
                  '9 o’clock',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Jo is getting married in Sydney next September. What season will it be?',
                options: ['spring', 'summer', 'autumn', 'winter'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'How long is a quarter of an hour?',
                options: [
                  '15 minutes',
                  '15 seconds',
                  '25 minutes',
                  '25 seconds',
                ],
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'This is a calendar for September. What is the date of the third Saturday?',
                options: ['13', '20', '21', '27'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'Which of these months has 31 days?',
                options: ['February', 'April', 'October', 'November'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Which shows the objects in order from lowest mass to highest mass? (balance pictures)',
                options: ['Order A', 'Order B', 'Order C', 'Order D'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Ben gets to work at 9 o’clock in the morning and leaves work at 4 o’clock in the afternoon. How many hours is Ben at work?',
                options: ['5', '6', '7', '8'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  '25 December is Christmas Day. What is the date exactly three weeks before Christmas?',
                options: [
                  '4 December',
                  '10 December',
                  '22 December',
                  '11 December',
                ],
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Circle the letter on the object that has the greater mass. (A or B)',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Circle the letter on the object that has the greater mass. (C or D)',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 3 ───────────────────────────
      {
        day: 'Day 3',
        title: 'Spelling, and Grammar & Punctuation',
        blocks: [
          {
            heading: 'Spelling — Long vowels (silent e)',
            instructions:
              'These words all end in a silent e. Add the missing long vowel to each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'm__ke' },
              { type: 'short', n: '2', prompt: 'b__te' },
              { type: 'short', n: '3', prompt: 't__be' },
              { type: 'short', n: '4', prompt: 'th__me' },
              { type: 'short', n: '5', prompt: 'h__pe' },
              { type: 'short', n: '6', prompt: 'c__be' },
              { type: 'short', n: '7', prompt: 'g__me' },
              { type: 'short', n: '8', prompt: 'r__pe' },
              { type: 'short', n: '9', prompt: 'n__ce' },
              { type: 'short', n: '10', prompt: 'c__te' },
            ],
          },
          {
            heading: 'Spelling — Silent e pictures',
            instructions:
              'Write a label for each drawing. Each answer has a silent e.',
            questions: [
              { type: 'short', n: '1', prompt: 'An aircraft that flies' },
              { type: 'short', n: '2', prompt: 'A reptile with no legs' },
              { type: 'short', n: '3', prompt: 'A dish you eat dinner from' },
              {
                type: 'short',
                n: '4',
                prompt: 'Something with two wheels you ride',
              },
            ],
          },
          {
            heading: 'Spelling — “qu” words',
            instructions: 'Add “qu” to finish each word.',
            questions: [
              { type: 'short', n: '1', prompt: 's__ash' },
              { type: 'short', n: '2', prompt: 's__elch' },
              { type: 'short', n: '3', prompt: '__iet' },
              { type: 'short', n: '4', prompt: '__ite' },
              { type: 'short', n: '5', prompt: '__ake' },
              { type: 'short', n: '6', prompt: '__een' },
              { type: 'short', n: '7', prompt: '__estion' },
            ],
          },
          {
            heading: 'Spelling — Contractions',
            instructions: 'Write these words as contractions.',
            questions: [
              { type: 'short', n: '1', prompt: 'do not' },
              { type: 'short', n: '2', prompt: 'it is' },
              { type: 'short', n: '3', prompt: 'I am' },
              { type: 'short', n: '4', prompt: 'he is' },
              { type: 'short', n: '5', prompt: 'did not' },
              { type: 'short', n: '6', prompt: 'we are' },
              { type: 'short', n: '7', prompt: 'you are' },
              { type: 'short', n: '8', prompt: 'she is' },
            ],
          },
          {
            heading: 'Spelling — Vowel/consonant blends',
            instructions:
              'Choose the correct letters (or, ar, ay, ow) to make each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'f__r' },
              { type: 'short', n: '2', prompt: 'st__re' },
              { type: 'short', n: '3', prompt: 'sh__er' },
              { type: 'short', n: '4', prompt: 'bef__re' },
              { type: 'short', n: '5', prompt: 'pl__' },
              { type: 'short', n: '6', prompt: 'f__m' },
              { type: 'short', n: '7', prompt: 'sh__t' },
              { type: 'short', n: '8', prompt: 'al__m' },
              { type: 'short', n: '9', prompt: 'p__er' },
              { type: 'short', n: '10', prompt: 'Mond__' },
            ],
          },
          {
            heading: 'Spelling — Real Test (dictation)',
            instructions:
              'Press Listen to hear each word in its sentence, then write the word in the box.',
            questions: [
              {
                type: 'dictation',
                n: '1',
                prompt: 'I cooked and ______ a cake for Mum’s birthday.',
                word: 'made',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: 'We ______ to see you soon.',
                word: 'hope',
              },
              {
                type: 'dictation',
                n: '3',
                prompt: 'I only made one ______ in the test.',
                word: 'mistake',
              },
              {
                type: 'dictation',
                n: '4',
                prompt: 'Let’s ______ a fruit salad.',
                word: 'make',
              },
              {
                type: 'dictation',
                n: '5',
                prompt: '______ your brain in the test.',
                word: 'use',
              },
              {
                type: 'dictation',
                n: '6',
                prompt: 'Ben won a ______ for spelling.',
                word: 'prize',
              },
              {
                type: 'dictation',
                n: '7',
                prompt: 'I walked ______ from school.',
                word: 'home',
              },
              {
                type: 'dictation',
                n: '8',
                prompt: 'Be kind to animals or they might ______ you.',
                word: 'bite',
              },
              {
                type: 'dictation',
                n: '9',
                prompt: 'It’s ______ for bed.',
                word: 'time',
              },
              {
                type: 'dictation',
                n: '10',
                prompt: 'Put the lid on the ______ of toothpaste.',
                word: 'tube',
              },
              {
                type: 'dictation',
                n: '11',
                prompt: 'Dad and I flew the ______ today.',
                word: 'kite',
              },
              {
                type: 'dictation',
                n: '12',
                prompt: 'Please shut the ______.',
                word: 'gate',
              },
              {
                type: 'dictation',
                n: '13',
                prompt: 'You have a lovely ______.',
                word: 'smile',
              },
              {
                type: 'dictation',
                n: '14',
                prompt: 'Our teacher ______ like us to talk during a test.',
                word: 'doesn’t',
              },
              {
                type: 'dictation',
                n: '15',
                prompt: 'Sometimes I ______ with my sister.',
                word: 'quarrel',
              },
              {
                type: 'dictation',
                n: '16',
                prompt: 'I ______ like to eat squishy bananas.',
                word: 'don’t',
              },
              {
                type: 'dictation',
                n: '17',
                prompt: 'Hold the ______ as you climb.',
                word: 'rope',
              },
              {
                type: 'dictation',
                n: '18',
                prompt: 'I will do gym this ______.',
                word: 'Saturday',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word',
            instructions:
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '19',
                prompt: 'I kicked my toe on the *ston*.',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'I *hat* the taste of oysters.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Hold your hands by your *sid*.',
              },
              {
                type: 'short',
                n: '22',
                prompt: '*Sav* your money in the bank.',
              },
              { type: 'short', n: '23', prompt: 'The bread was *stail*.' },
              {
                type: 'short',
                n: '24',
                prompt: 'I *choos* Fred to be my partner.',
              },
              {
                type: 'short',
                n: '25',
                prompt: 'I saw some dairy *cowns* on the farm.',
              },
              {
                type: 'short',
                n: '26',
                prompt: 'We had *rela* races for sport.',
              },
              {
                type: 'short',
                n: '27',
                prompt: 'Ned *kwit* the team when he hurt his foot.',
              },
              { type: 'short', n: '28', prompt: 'I heard the duck *kwack*.' },
              {
                type: 'short',
                n: '29',
                prompt: 'The story was about a king and *kween*.',
              },
              {
                type: 'short',
                n: '30',
                prompt: 'You need to be *kwick* with the lunch orders.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'There was an *earthkwake* in Mexico.',
              },
              {
                type: 'short',
                n: '32',
                prompt:
                  'The teacher asked the children to keep *kwiet* during the concert.',
              },
              { type: 'short', n: '33', prompt: 'I *dont* like hot dogs.' },
              {
                type: 'short',
                n: '34',
                prompt: '*Its* time for our library lesson.',
              },
              { type: 'short', n: '35', prompt: '*Youre* a great goalkeeper.' },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Sentences and punctuation',
            instructions: 'Answer each question.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Choose . ? or ! : “Be careful ___” shouted Mum.',
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Choose . ? or ! : Allan ate yoghurt and fruit ___',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Choose . ? or ! : Where is the softball ___',
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Choose . ? or ! : Today is Monday ___',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'Write a statement to answer: What is your name?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'Write a statement to answer: How old are you?',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Write a statement to answer: Where do you live?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Write a statement to answer: What is your favourite food?',
              },
              {
                type: 'short',
                n: '9',
                prompt: 'Write a question for the answer: “I live in Belrose.”',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Write a question for the answer: “I don’t have any pets.”',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Write a question for the answer: “I play soccer.”',
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Write fact or opinion: Charlotte’s Web is a great story.',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Write fact or opinion: There are twelve months in a year.',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'Write fact or opinion: Bees make honey.',
              },
              {
                type: 'short',
                n: '16',
                prompt: 'Write fact or opinion: I love honey on toast.',
              },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Rewrite using speech marks: Can we go to the zoo? asked Harriet.',
              },
              {
                type: 'short',
                n: '18',
                prompt: 'Rewrite using speech marks: Stop that! yelled Liam.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Which of the following is a sentence?',
                options: [
                  'Grandma’s garden.',
                  'Joe and his stepmother.',
                  'Grandma lives with her stepfather.',
                  'A timber house.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Which word completes this sentence? “Rina was early for school ___ she helped the teacher.”',
                options: ['so', 'but', 'then', 'because'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which sentence has the correct punctuation?',
                options: [
                  'Grandpa lives with us?',
                  'Grandpa lives in Wagga Wagga.',
                  'Where does your grandfather live.',
                  'Grandpa was born in Athens?',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Choose the correct word and punctuation: “Did you invite your parents to the ___”',
                options: ['Concert!', 'Concert.', 'concert?', 'concert'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Choose the correct word and punctuation: “Look out, ___”',
                options: ['Nan', 'Nan.', 'Nan?', 'Nan!'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Which word completes this sentence? “Sachin is becoming a good cricket player ___ he practises every day.”',
                options: ['so', 'then', 'but', 'because'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Choose the correct punctuation mark: A car was coming. Mark shouted, “Careful ___”',
                options: [',', '.', '?', '!'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which sentence has the correct punctuation?',
                options: [
                  'Where is your brother.',
                  'Where is your brother!',
                  'Where is your brother?',
                  'Where is your brother',
                ],
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'Which sentence has incorrect punctuation?',
                options: [
                  'Where is Kenny.',
                  'Why is Nia here?',
                  'Where is your homework?',
                  'Are you ready?',
                ],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Which word should start with a capital letter? “I think aadrika is a good name for an elephant.”',
                options: ['I', 'think', 'aadrika', 'elephant'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Which word should start with a capital letter? “The zoo in sydney has elephants and giraffes.”',
                options: ['zoo', 'sydney', 'elephants', 'giraffes'],
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Where should the missing full stop go? “Tim had soccer practice yesterday ___ Today he does gymnastics.”',
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Where should the missing full stop go? “It is raining today ___ I hope it will be sunny tomorrow.”',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Where should speech marks go? Will you help me practise goal kicking? asked Jessica.',
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Where should speech marks go? Stop! Don’t cross the road yet, shouted Keith.',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Where should the exclamation mark go? Yuk shrieked Julia. That tasted terrible.',
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Which words complete this sentence? “He was late ___.”',
                options: [
                  'but the bus was late',
                  'because the bus was late',
                  'although the bus was late',
                  'and the bus was late',
                ],
              },
              {
                type: 'mcq',
                n: '18',
                prompt:
                  'Which word completes this sentence? “___ the classroom was so hot, the teacher read to the class under a tree.”',
                options: ['Until', 'Because', 'Although', 'And'],
              },
              {
                type: 'mcq',
                n: '19',
                prompt:
                  'Which word completes this sentence? “___ it was raining, Sara decided to walk to the park.”',
                options: ['Until', 'Because', 'Although', 'Since'],
              },
              {
                type: 'mcq',
                n: '20',
                prompt:
                  'Which word completes this sentence? “___ it stopped raining, the dogs had to stay indoors.”',
                options: ['Until', 'Because', 'Although', 'Since'],
              },
              {
                type: 'short',
                n: '21',
                prompt:
                  'Add a word (because/and/until/so): Kate ran to school ___ she’d have time to play.',
              },
              {
                type: 'short',
                n: '22',
                prompt:
                  'Add a word (because/and/until/so): Cal ran to school ___ he wanted to race Frankie.',
              },
              {
                type: 'short',
                n: '23',
                prompt:
                  'Add a word (because/and/until/so): Matilda ran ___ she ran out of breath.',
              },
              {
                type: 'short',
                n: '24',
                prompt:
                  'Add a word (because/and/until/so): Jin ran to the corner ___ then he walked the rest of the way.',
              },
              {
                type: 'mcq',
                n: '25',
                prompt:
                  'Which sentence is closest in meaning to: “Yusuf’s cat is very tiny. It is called Alpa which is a Hindu word meaning ‘little’.”',
                options: [
                  'Yusuf has a tiny cat called Alpa.',
                  'Alpa is a Hindu word for Yusuf’s cat.',
                  'Yusuf’s tiny cat is called Alpa, which means ‘little’ in Hindu.',
                  'Yusuf’s cat is tiny and called Alpa.',
                ],
              },
            ],
          },
        ],
      },
      // ─────────────────────────── DAY 4 ───────────────────────────
      {
        day: 'Day 4',
        title: 'Reading — Understanding narratives',
        blocks: [
          {
            heading: 'Reading: The spoilt prince',
            instructions: 'Read the narrative, then choose the correct answer.',
            passage:
              'The spoilt prince\n\nOnce upon a time in a kingdom far, far away there lived a king and queen and their son, Johan. The king and queen were kind and good, but Johan was not kind or good. He was very rude and lazy. He demanded that the cook make him cakes. He was mean to everyone, even his parents.\n\nOn Johan’s 21st birthday the king and queen announced that it was time for Johan to marry. They sent letters to princesses in kingdoms all around, inviting them to meet the prince.\n\nPrincesses came from far and wide, but Prince Johan refused to marry anyone. He was rude to all the princesses. He said that he wanted to live with his parents forever.\n\nThe princesses didn’t want to marry a mean and rude prince anyway. So they went on a holiday together to New Zealand. They had fun snow skiing and whale watching.\n\nThe prince never married. He lived happily ever after in his parents’ castle. And, as for the princesses, they went on holidays to New Zealand as often as they could, without Johan.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Johan lived',
                options: [
                  'in New Zealand.',
                  'in a kingdom.',
                  'in a village.',
                  'with princesses.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Which words best describe Johan?',
                options: [
                  'loud and angry',
                  'a very nice person',
                  'kind and good',
                  'mean and rude',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'What is the main purpose of the text?',
                options: [
                  'to explain how princes find wives',
                  'to tell about holidays in New Zealand',
                  'to describe life in the past',
                  'to tell a story to entertain',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Why didn’t the princesses want to marry Johan?',
                options: [
                  'He ate too many special cakes.',
                  'He wasn’t a nice person.',
                  'He didn’t want to go to New Zealand.',
                  'They didn’t like Johan’s parents.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: '“Demanded” in the story means',
                options: ['begged for.', 'insisted on.', 'hoped.', 'needed.'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Which words in the story tell you how Johan felt in the end?',
                options: [
                  'The prince never married.',
                  'He lived happily ever after.',
                  'He wanted to live with his parents forever.',
                  'They had fun snow skiing and whale watching.',
                ],
              },
            ],
          },
          {
            heading: 'Reading: A conversation with Grandma',
            instructions: 'Read the narrative, then choose the correct answer.',
            passage:
              'A conversation with Grandma\n\nCynthia and her grandmother, Zumu, were talking one afternoon.\n\n“Where were you born, Zumu?” Cynthia asked.\n\n“I was born in a farming village in China,” replied her grandmother. “It’s an important area now.”\n\n“What was it like there?” Cynthia wanted to know.\n\n“It’s too far away,” said Zumu.\n\n“Will you take me to see where you were born?” Cynthia asked.\n\n“No, Cynthia. It is too far away,” said Zumu.\n\n“I want to go!” Cynthia declared in a sulky voice. She slumped her shoulders.\n\n“You can go when you are grown up. You can take yourself,” said Zumu.\n\n“That’s a long time!” Cynthia declared. She wanted Zumu to give in and agree to take her to China.\n\n“You must be patient,” declared Zumu.\n\n“Oh! You always tell me to be patient,” Cynthia declared. “I will go to China one day.”',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Zumu was born in',
                options: [
                  'Australia.',
                  'a hospital.',
                  'China.',
                  'the countryside.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Zumu is Cynthia’s',
                options: ['grandfather.', 'mother.', 'father.', 'grandmother.'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'The best word to describe Cynthia is',
                options: ['beautiful.', 'old.', 'silly.', 'determined.'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Cynthia wants to go to China',
                options: [
                  'to have a holiday.',
                  'to see whale farms.',
                  'to see wheat farms.',
                  'to spend time with Zumu.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Cynthia slumps her shoulders because',
                options: [
                  'she wants Zumu to feel sorry for her.',
                  'her shoulders were sore.',
                  'China is far away.',
                  'she is tired.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Which word best describes Zumu in the text?',
                options: ['sulky', 'patient', 'bossy', 'quick-tempered'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'At the end of the conversation Cynthia',
                options: [
                  'thinks Zumu will take her to China.',
                  'is unhappy that she will not go to China.',
                  'thinks Zumu is mean.',
                  'declares she will go to China one day.',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Stuck',
            instructions: 'Read the narrative, then choose the correct answer.',
            passage:
              'Stuck\n\n“Pongo, come on down. Come on, Puss Puss,” called Jenny. Pongo had climbed a tree and Jenny wanted him to come down. Pongo had been in the tree for ages, and Jenny was worried that Pongo didn’t know how to get down.\n\nJenny went inside the house to get Pongo’s favourite food. She waved the chicken at Pongo, then she placed the chicken on the ground. “Come and get some yummy chicken,” she called. Pongo just looked at her.\n\nNow Jenny was really getting worried. She went and told her mother that the cat was stuck. Her mother said she’d have a look. But when Jenny and her mother went outside, there was Pongo on the ground, eating the chicken.\n\n“Oh, Pongo,” said Jenny. “You are such a trickster!”',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'What is Pongo?',
                options: ['a bird', 'a monkey', 'a cat', 'a snake'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'What is Jenny’s problem in the text?',
                options: [
                  'Pongo has climbed a tree.',
                  'Jenny thinks Pongo can’t get down from the tree.',
                  'Jenny has a tall tree in her backyard.',
                  'Jenny’s father isn’t at home.',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Pongo’s favourite food is',
                options: ['anything.', 'Puss Puss.', 'chicken.', 'leaves.'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Who does Jenny ask for help?',
                options: ['her father', 'no-one', 'her mother', 'Pongo'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'How does Jenny feel at the end of the text?',
                options: ['bored', 'upset', 'worried', 'happy'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Another title for the text could be',
                options: [
                  'Tricky Pongo.',
                  'Chicken for dinner.',
                  'Mum to the rescue.',
                  'The tall tree.',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Choose a word that could replace “worried” in the text.',
                options: ['angry', 'concerned', 'shocked', 'delighted'],
              },
            ],
          },
        ],
      },
      // ─────────────────────────── DAY 5 ───────────────────────────
      {
        day: 'Day 5',
        title: 'Writing — Narratives',
        blocks: [
          {
            heading: 'Writing — A narrative',
            instructions:
              'Today you are going to write a narrative (a story). Your purpose is to entertain readers of your own age.\n\nYour story can be realistic, a fantasy or an adventure. It can be set in the past, the present or the future, and can have imaginary or real-life characters.',
            note: 'Before you start to write, plan your story:\n• the orientation — introduce the main character(s) and tell when and where the story is set\n• the complication — the problem in the story\n• the events — what happens, building up to the climax\n• the resolution — how the problem is solved and how the story ends\n\nRemember to:\n• use noun groups to give descriptions\n• use verbs that tell what a character is feeling\n• use adverbs to tell when and where events take place\n• try alliteration and onomatopoeia (sound words like whoosh, crack)\n• proofread your writing and check spelling and punctuation.',
            questions: [
              { type: 'long', n: '1', prompt: 'Write your narrative.' },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 4,
    label: 'Week 4',
    overview: [
      'Day 1 — Measurement and Geometry: Location and transformation',
      'Day 2 — Statistics and Probability: Chance and data',
      'Day 3 — Spelling: Singular and plural nouns, prefixes and suffixes; Grammar and Punctuation: Personal pronouns, HOW adverbs and adjectives that compare',
      'Day 4 — Reading: Understanding persuasive texts',
      'Day 5 — Writing: Persuasive texts',
    ],
    days: [
      // ─────────────────────────── DAY 1 ───────────────────────────
      {
        day: 'Day 1',
        title: 'Measurement and Geometry — Location and transformation',
        blocks: [
          {
            heading: 'Test Your Skills — Location (grid and map)',
            instructions:
              'Use the grid (columns A–D, rows 1–4), the picture of friends and the map of Red Rock to answer.',
            questions: [
              { type: 'short', n: '1', prompt: 'What is found at B3?' },
              { type: 'short', n: '2', prompt: 'What is found at C4?' },
              { type: 'short', n: '3', prompt: 'What is found at D1?' },
              { type: 'short', n: '4', prompt: 'What is found at A2?' },
              { type: 'short', n: '5', prompt: 'Where is the post office?' },
              { type: 'short', n: '6', prompt: 'Where is the fruit shop?' },
              { type: 'short', n: '7', prompt: 'Where is the library?' },
              { type: 'short', n: '8', prompt: 'Where is the skate park?' },
              {
                type: 'short',
                n: '9',
                prompt: 'Who is standing in front of Jo?',
              },
              { type: 'short', n: '10', prompt: 'Who is standing behind Dan?' },
              {
                type: 'short',
                n: '11',
                prompt: 'Who is standing between Kim and Bill?',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Who is second from the right in the back row?',
              },
              {
                type: 'short',
                n: '13',
                prompt: 'Who is third from the left in the front row?',
              },
              { type: 'short', n: '14', prompt: 'On what road is the bank?' },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Zac leaves the bank and turns left. What is the next road he will come to?',
              },
              {
                type: 'short',
                n: '16',
                prompt: 'On what road is the post office?',
              },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Sue leaves the post office and turns right. What is the next road she will come to?',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Position and movement',
            instructions:
              'Use the grid (columns A–G, rows 1–5) with the arrow → to answer.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'What is the position of the arrow →?',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'What will the new position be if → moves one square to the right?',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'What will the new position be if → moves two squares up?',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'What will the new position be if → moves three squares left?',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'What will the new position be if → moves one square down?',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'How many squares and in which direction does → move from its starting point to F2?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'How many squares and in which direction does → move from its starting point to D5?',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions:
              'Choose the correct answer. (Most questions use pictures in the book.)',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'This is a plan of Jan’s farm. What is between the cow paddock and the shed?',
                options: [
                  'the house',
                  'the dam',
                  'the cattle yard',
                  'the stables',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Which of these shapes will look the same when flipped over the dotted line? (choose all that apply)',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which shape is at F2 on the grid?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Elly turns this card (the letter F) half a turn. What does it look like now?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Cam slides his counter 3 squares right. Which shows Cam’s counter after the slide?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Lucy folded paper on the dotted line and cut out a shape. Which shows Lucy’s paper when opened out?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Some tools are on a board. The hammer is at B2. Where is the saw?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'What will this arrow look like after a quarter turn in a clockwise direction?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'Billy made a shape. Which of these is Billy’s shape?',
                options: ['A', 'B', 'C', 'D'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Nat is second from the left in this picture. Which one is Nat?',
                options: ['A', 'B', 'C', 'D'],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 2 ───────────────────────────
      {
        day: 'Day 2',
        title: 'Statistics and Probability — Chance and data',
        blocks: [
          {
            heading: 'Test Your Skills — Reading a table (races won)',
            instructions:
              'A table shows how many races each student won (Max 7, Ben 6, Bella 5, Tara 4, Jack 2).',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'How many races did Bella win?',
                numeric: true,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Which student won the most races?',
              },
              { type: 'short', n: '3', prompt: 'Who won 4 races?' },
              {
                type: 'short',
                n: '4',
                prompt: 'How many races did Max and Jack win altogether?',
                numeric: true,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'How many more races did Ben win than Tara?',
                numeric: true,
              },
            ],
          },
          {
            heading: 'Test Your Skills — Graphs',
            instructions:
              'Use the column graph of favourite fruit and the picture graphs of favourite football team and favourite zoo animals.',
            questions: [
              {
                type: 'short',
                n: '6',
                prompt: 'Favourite fruit: How many students voted for apple?',
                numeric: true,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Which fruit did exactly 5 students vote for?',
              },
              {
                type: 'short',
                n: '8',
                prompt: 'Which fruit was the most popular?',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'How many students voted for peach and plum altogether?',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'How many more students voted for banana than for peach?',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Favourite football team (key: 1 picture = 2 votes): How many votes did the Lions get?',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Which team got exactly 5 votes?',
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Favourite zoo animals (key: 1 paw = 1 student): How many students chose elephant?',
              },
              {
                type: 'short',
                n: '14',
                prompt: 'Which animal was chosen by the most students?',
              },
              {
                type: 'short',
                n: '15',
                prompt: 'How many more students chose gorilla than koala?',
                numeric: true,
              },
            ],
          },
          {
            heading: 'Test Your Skills — Chance',
            instructions:
              'Use likely, unlikely, impossible or certain to describe the chance of rolling a normal dice (faces 1–6). Then read the tally marks and spinner.',
            questions: [
              { type: 'short', n: '1', prompt: 'Chance of rolling a 1' },
              {
                type: 'short',
                n: '2',
                prompt: 'Chance of rolling less than 1',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Chance of rolling more than 1',
              },
              { type: 'short', n: '4', prompt: 'Chance of rolling a 7' },
              {
                type: 'short',
                n: '5',
                prompt: 'Chance of rolling less than 7',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'This spinner is spun. Which colour (green/white/blue/red) is it most likely to stop on?',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Which colour is it least likely to stop on?',
              },
            ],
          },
          {
            heading: 'Real Test',
            instructions:
              'Choose the correct answer (most questions use graphs/pictures in the book).',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Favourite movies (Good Times 7, Old Dogs 10, Red and Blue 8, Kangaroos 13): How many more students voted for Kangaroos than for Old Dogs?',
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'A dish holds jelly beans. Which describes the chance of taking a green jelly bean from this dish?',
                options: ['impossible', 'unlikely', 'likely', 'certain'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'A graph shows the hours Mr Lee spent at work this week. On which day did Mr Lee spend exactly 5 hours at work?',
                options: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'A graph shows the colour of cars in a car park. Which is correct? (choose all that apply)',
                options: [
                  'More black cars than silver cars.',
                  'More red cars than black cars.',
                  'More white cars than blue cars.',
                  'More silver cars than blue cars.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Students voted for class captain (tally chart). How many students voted for Mia?',
                options: ['4', '5', '6', '7'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'On which number is this spinner (1, 2, 3, 4) most likely to stop?',
                options: ['1', '2', '3', '4'],
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'A table shows boys and girls in each class (2K: 13 boys, 14 girls; 2P: 15 boys, 11 girls; 2Y: 12 boys, 12 girls). How many children are in 2P?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'A picture graph shows cherries eaten (key: 1 picture = 2 cherries). How many cherries did Jill eat?',
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Three dice are rolled and the numbers added together. Which total is impossible?',
                options: ['1', '5', '9', '11'],
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Students counted birds (Sid 8, Dana 5, Ruby 2, Nat 9, Eli 4, Sam 6). How many birds did Sid and Eli count altogether?',
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 3 ───────────────────────────
      {
        day: 'Day 3',
        title: 'Spelling, and Grammar & Punctuation',
        blocks: [
          {
            heading: 'Spelling — Plural nouns',
            instructions: 'Write the plural of each noun.',
            questions: [
              { type: 'short', n: '1', prompt: 'bird' },
              { type: 'short', n: '2', prompt: 'peach' },
              { type: 'short', n: '3', prompt: 'body' },
              { type: 'short', n: '4', prompt: 'child' },
              { type: 'short', n: '5', prompt: 'man' },
              { type: 'short', n: '6', prompt: 'sheep' },
              { type: 'short', n: '7', prompt: 'mango' },
              { type: 'short', n: '8', prompt: 'mouse' },
              { type: 'short', n: '9', prompt: 'woman' },
              { type: 'short', n: '10', prompt: 'potato' },
            ],
          },
          {
            heading: 'Spelling — Singular nouns',
            instructions: 'Write the singular of each noun.',
            questions: [
              { type: 'short', n: '1', prompt: 'races' },
              { type: 'short', n: '2', prompt: 'dingoes' },
              { type: 'short', n: '3', prompt: 'toothbrushes' },
              { type: 'short', n: '4', prompt: 'doctors' },
              { type: 'short', n: '5', prompt: 'geese' },
              { type: 'short', n: '6', prompt: 'fairies' },
            ],
          },
          {
            heading: 'Spelling — Prefix “un”',
            instructions:
              'Use the prefix “un” to write the opposite of each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'cover' },
              { type: 'short', n: '2', prompt: 'available' },
              { type: 'short', n: '3', prompt: 'clean' },
              { type: 'short', n: '4', prompt: 'eaten' },
              { type: 'short', n: '5', prompt: 'usual' },
              { type: 'short', n: '6', prompt: 'tidy' },
              { type: 'short', n: '7', prompt: 'believable' },
              { type: 'short', n: '8', prompt: 'finished' },
            ],
          },
          {
            heading: 'Spelling — Suffixes',
            instructions: 'Add the suffix to make a new word.',
            questions: [
              { type: 'short', n: '1', prompt: 'help + ful' },
              { type: 'short', n: '2', prompt: 'help + less' },
              { type: 'short', n: '3', prompt: 'help + ing' },
              { type: 'short', n: '4', prompt: 'hope + ful' },
              { type: 'short', n: '5', prompt: 'hope + less' },
              { type: 'short', n: '6', prompt: 'hope + ing' },
            ],
          },
          {
            heading: 'Spelling — Real Test (dictation)',
            instructions:
              'Press Listen to hear each word in its sentence, then write the word in the box.',
            questions: [
              {
                type: 'dictation',
                n: '1',
                prompt: 'I cooked the ______ for dinner.',
                word: 'potatoes',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: 'I mixed lots of ______ in the salad.',
                word: 'tomatoes',
              },
              {
                type: 'dictation',
                n: '3',
                prompt: 'I love ______.',
                word: 'cherries',
              },
              {
                type: 'dictation',
                n: '4',
                prompt: 'Ten ______ attended the meeting.',
                word: 'women',
              },
              {
                type: 'dictation',
                n: '5',
                prompt: 'My ______ hurt after the race.',
                word: 'feet',
              },
              {
                type: 'dictation',
                n: '6',
                prompt: 'Both of my ______ cried at the same time.',
                word: 'babies',
              },
              {
                type: 'dictation',
                n: '7',
                prompt: 'The fruit shop sells nice ______.',
                word: 'mangoes',
              },
              {
                type: 'dictation',
                n: '8',
                prompt: 'Five ______ ran to the fence.',
                word: 'sheep',
              },
              {
                type: 'dictation',
                n: '9',
                prompt: 'Boys and girls sat on separate ______.',
                word: 'benches',
              },
              {
                type: 'dictation',
                n: '10',
                prompt: 'The dentist looked at my ______ today.',
                word: 'teeth',
              },
              {
                type: 'dictation',
                n: '11',
                prompt: 'The ______ ran around the bush at dusk.',
                word: 'dingoes',
              },
              {
                type: 'dictation',
                n: '12',
                prompt: 'The ______ waddled next to the creek.',
                word: 'geese',
              },
              {
                type: 'dictation',
                n: '13',
                prompt: 'The ______ ate all the cheese.',
                word: 'mice',
              },
              {
                type: 'dictation',
                n: '14',
                prompt: 'I went in a number of ______ at the sports carnival.',
                word: 'races',
              },
              {
                type: 'dictation',
                n: '15',
                prompt: 'The duckling was ______ against the current.',
                word: 'helpless',
              },
              {
                type: 'dictation',
                n: '16',
                prompt: 'We bought two ______ of bread for the picnic.',
                word: 'loaves',
              },
              {
                type: 'dictation',
                n: '17',
                prompt: 'Dad said to be ______ of people’s opinions.',
                word: 'respectful',
              },
              {
                type: 'dictation',
                n: '18',
                prompt: 'The pod of ______ swam along the coast.',
                word: 'whales',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word',
            instructions:
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '19',
                prompt: 'This chair is *uncomfatable*.',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'My shoes always come *undun*.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Kethy’s work was *unfinisht*.',
              },
              {
                type: 'short',
                n: '22',
                prompt: 'The teacher said to *unfowld* the paper.',
              },
              {
                type: 'short',
                n: '23',
                prompt: 'Be *carefull* crossing the road.',
              },
              {
                type: 'short',
                n: '24',
                prompt: 'Kara is *helpin* Mindi with her story.',
              },
              {
                type: 'short',
                n: '25',
                prompt: 'Kara was *careliss* with her bike.',
              },
              {
                type: 'short',
                n: '26',
                prompt: 'My sister is *hopeliss* at cleaning her room.',
              },
              {
                type: 'short',
                n: '27',
                prompt: 'The *gardner* mowed the grass.',
              },
              { type: 'short', n: '28', prompt: 'The *runer* hurt her foot.' },
              {
                type: 'short',
                n: '29',
                prompt: 'The *cyclest* fell off his bike.',
              },
              {
                type: 'short',
                n: '30',
                prompt: 'Mum bought flowers from the *florest*.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'My *dentest* rides her bike to work.',
              },
              {
                type: 'short',
                n: '32',
                prompt: 'Our local *bakor* makes delicious bread rolls.',
              },
              {
                type: 'short',
                n: '33',
                prompt: 'The doctor looked at my *tonsels*.',
              },
              {
                type: 'short',
                n: '34',
                prompt: 'The *plumba* fixed our leaking roof.',
              },
              { type: 'short', n: '35', prompt: 'Mr Chen is my *teacha*.' },
            ],
          },
          {
            heading:
              'Grammar & Punctuation — Adverbs, pronouns and comparatives',
            instructions: 'Answer each question.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Write the opposite adverb of: slowly',
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Write the opposite adverb of: quietly',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Write the opposite adverb of: sadly',
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Write the opposite adverb of: angrily',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Choose a pronoun: Tim and Elli are in the library. ___ are reading. (I / Them / Us / We)',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Write the HOW adverb correctly: The lizard flicked its tongue out *quick*.',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Write the HOW adverb correctly: Possums climb *good*.',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Write the HOW adverb correctly: The turtle crawled *slow*.',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Write the HOW adverb correctly: The parrot cracked the seed *easy*.',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Write the HOW adverb correctly: The turtle snapped *hungry* at the fish.',
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Choose the word: Which painting is ___? (colour fullest / the most colourful / colour-fuller / colouring)',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Choose the adjective: “My bag is ___ than yours,” said Frank. (heavy / heaviest / heavier)',
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Personal pronoun: Shane is my best friend. ___ play soccer together.',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Personal pronoun: Pass the ball to Leanne so ___ can kick the goal.',
              },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Personal pronoun: The children had worked well so the teacher gave ___ a surprise.',
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Personal pronoun: The dog was barking so I told ___ to be quiet.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Real Test',
            questions: [
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'That is Jack’s book. Give it to him. In this sentence the word “it” is used instead of',
                options: ['Jack', 'him', 'the book', 'a handshake'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'These shoes are full of mud. Clean them. In this sentence the word “them” is used instead of',
                options: ['mud', 'Jack', 'these shoes', 'cleaning'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which word tells how you would pat a kitten?',
                options: ['outside', 'then', 'in the dark', 'gently'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'Choose a word: I asked Kia to come to the park with ___.',
                options: ['him', 'They', 'I', 'me'],
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Choose a word: Liam sits next to me so I help ___ with maths.',
                options: ['him', 'They', 'I', 'me'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Choose a word: Koalas are marsupials. ___ eat eucalyptus leaves.',
                options: ['him', 'They', 'I', 'me'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt: 'Choose a word: My name is Zac. ___ live in Padstow.',
                options: ['him', 'They', 'I', 'me'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Which word completes the sentence? “Some people like cats ___ than dogs.”',
                options: ['best', 'better', 'more better', 'good'],
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Choose a word: That elephant is ___ than the green balloon. (big / bigger / biggest)',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Choose a word: The blue balloon is the ___ of them all.',
              },
              {
                type: 'mcq',
                n: '15',
                prompt:
                  'Which completes the sentence? “This yoghurt tastes ___ than that yoghurt.”',
                options: ['best', 'better', 'more good', 'more best'],
              },
              {
                type: 'mcq',
                n: '16',
                prompt:
                  'Which word completes the sentence? “My sister ran ___ in the race.”',
                options: ['great', 'well', 'good', 'wonderful'],
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Which word completes the sentence? “A carpet snake lived ___ in our roof.”',
                options: ['quiet', 'silent', 'quietly', 'quitly'],
              },
              {
                type: 'mcq',
                n: '18',
                prompt: 'Which sentence is correct?',
                options: [
                  'Stack the books carefully on the shelf.',
                  'Stack the books carefully at the shelf.',
                  'Stack the books careful over the shelf.',
                  'Stack the books towards the shelf careful.',
                ],
              },
              {
                type: 'mcq',
                n: '20',
                prompt:
                  'Which words complete the sentence? “I am ___ runner in the class,” said Paulo.',
                options: ['fastest', 'more fast', 'fast', 'faster'],
              },
              {
                type: 'mcq',
                n: '21',
                prompt:
                  'Which word completes the sentence? “The kookaburra sang ___.”',
                options: ['loud', 'silently', 'loudly', 'happy'],
              },
              {
                type: 'mcq',
                n: '22',
                prompt:
                  'Which word completes the sentence? “Can I come to the park with ___?”',
                options: ['them', 'him', 'she', 'you'],
              },
              {
                type: 'mcq',
                n: '23',
                prompt:
                  'Which word completes the sentence? “This pencil belongs to Lara. Give it to ___.”',
                options: ['you', 'her', 'us', 'I'],
              },
              {
                type: 'mcq',
                n: '24',
                prompt: 'Which sentence is correct?',
                options: [
                  'The magpies flew swift.',
                  'The magpies flew good.',
                  'The magpies flew swiftly.',
                  'The magpies flew softly.',
                ],
              },
              {
                type: 'mcq',
                n: '25',
                prompt:
                  'Which word completes the sentence? “Mum said the battery was ___.”',
                options: ['deader', 'dead', 'deadest', 'deadly'],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 4 ───────────────────────────
      {
        day: 'Day 4',
        title: 'Reading — Understanding persuasive texts',
        blocks: [
          {
            heading: 'Reading: Get rid of possums',
            instructions:
              'Read the persuasive text, then choose the correct answer.',
            passage:
              'Get rid of possums\n\nPossums are very common in Australia. They live in the bush and in towns. Possums like to live in hollow trees, but they also make their homes in the roofs of houses. Once a possum makes its home in your roof, it can be hard to get rid of it.\n\nPossums are nocturnal, so they sleep during the day and are active at night. A possum in your roof will keep you awake because it is noisy — it runs around in the roof at night.\n\nPossums can also be territorial. They do not like other possums in their space. I do not think possums should be able to live inside your roof. Once you have removed a possum, cover any holes so it cannot get back in. Then build a possum house in a backyard tree so the possum has somewhere else to live.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'Where is a good place for a possum to live in the wild?',
                options: [
                  'in a roof',
                  'a hollow tree',
                  'inside a house',
                  'in a pond',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'What does “territorial” mean?',
                options: [
                  'They protect their own space.',
                  'They sleep during the day.',
                  'They are very noisy.',
                  'They live in trees.',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: '“Nocturnal” means possums are',
                options: [
                  'awake at night.',
                  'asleep at night.',
                  'found in the bush.',
                  'always quiet.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'How does the writer feel when possums live in roofs?',
                options: ['glad', 'pleased', 'annoyed', 'excited'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'The best way to stop a possum getting back in is to',
                options: [
                  'cover the holes in your roof.',
                  'feed the possum.',
                  'leave the possum alone.',
                  'open the windows.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'What is the writer’s purpose?',
                options: [
                  'to describe possums',
                  'to tell scary stories about possums',
                  'to argue that possums should not get back inside your roof',
                  'to explain how possums sleep',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Where should you build a possum house?',
                options: [
                  'in your roof',
                  'in a backyard tree',
                  'in the forest',
                  'in the bush',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Circuses are NOT good for animals',
            instructions: 'Read the argument, then choose the correct answer.',
            passage:
              'Circuses are NOT good for animals.\n\nLions, tigers and elephants don’t belong in circuses. They need room to roam in the wild. I feel sorry for animals in circuses. They should not be kept in cages.\n\nIt’s not right to use animals such as horses in circuses. The horses wouldn’t like it. I don’t think it’s all right to use animals to do tricks. That’s not fair. Some people think that being driven around in a truck for hours and hours is fine. It is not — circuses should not have animals at all.\n\nI don’t think circuses should use any animals. In Circus Oz, the Flying Fruit Fly Circus and Cirque du Soleil there are no animals. I love these kinds of circuses. The humans do the tricks and perform. My favourite act is the flying trapeze. I also love trampolining, juggling and stilt walking — much fun to watch.\n\nAnimal circuses are cruel. Some countries don’t let circuses use lions, tigers or elephants. I am happy about that.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'What does the writer think about circuses that use animals?',
                options: [
                  'It’s a good thing.',
                  'It’s wrong.',
                  'It’s fun.',
                  'It’s entertainment.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'The writer says elephants belong in',
                options: ['zoos.', 'the wild.', 'cages.', 'circuses.'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'How does the writer feel about circuses with human performers?',
                options: [
                  'He doesn’t like them.',
                  'He loves them.',
                  'He thinks it’s wrong.',
                  'It’s not fair.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'The Flying Fruit Fly Circus has performing',
                options: ['lions.', 'dogs and horses.', 'humans.', 'flies.'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'The writer’s favourite circus act is',
                options: [
                  'the flying trapeze.',
                  'elephants.',
                  'juggling.',
                  'the clown.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'The word “cruel” means',
                options: ['entertaining.', 'unkind.', 'pleasant.', 'foolish.'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'What is the purpose of the text?',
                options: [
                  'to give an opinion about circuses',
                  'to convince people to see the circus',
                  'to describe the best circus acts',
                  'to explain what circuses do',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Apple Power (advertisement)',
            instructions:
              'Read the advertisement, then choose the correct answer.',
            passage:
              'Be a winner with APPLE POWER!\n\nCrisp, crunchy, juicy, shiny green or red apples.\n\nAll you need to do is eat an apple a day, and the benefits will be:\n• a healthy body — helping you WIN at sports\n• better teeth — a WINNING smile\n• a healthy brain — WIN all those computer games\n• more friends — a WINNING personality\n• think of the planet — apples have sustainable packaging: eat the skin or recycle it. No waste!\n\nSo why wait? Go and get an apple NOW!',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'How often does the text tell you to eat an apple?',
                options: [
                  'once a day',
                  'twice a day',
                  'win of the planet',
                  'think of the planet',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Who is the advertisement for?',
                options: ['parents', 'children', 'pirates', 'farmers'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'The text says eating apples will help you win',
                options: [
                  'apple power.',
                  'a smile.',
                  'a brain.',
                  'at sports and computer games.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'The text says this to make you want to',
                options: [
                  'eat an apple.',
                  'know what apples look like.',
                  'show what apples are made of.',
                  'show that apples are healthy.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'The text says a winning personality will get you',
                options: [
                  'a winning attitude.',
                  'extra apples.',
                  'more friends.',
                  'a better smile.',
                ],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'An apple has sustainable packaging because',
                options: [
                  'its skin can be eaten.',
                  'its skin can be eaten or recycled.',
                  'its skin is shiny.',
                  'it makes readers think of the planet.',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which sentence is true about the advertisement?',
                options: [
                  'It’s trying to make parents buy apples.',
                  'It’s trying to make children want to eat more apples.',
                  'It proves that apples are good for you.',
                  'It shows that apples make you a happier person.',
                ],
              },
            ],
          },
        ],
      },

      // ─────────────────────────── DAY 5 ───────────────────────────
      {
        day: 'Day 5',
        title: 'Writing — Persuasive texts',
        blocks: [
          {
            heading: 'Writing text 1 — Television is bad for children',
            instructions:
              'Today you are going to write an argument. Your purpose is to persuade readers to agree with you about the topic.\n\nThe topic is: Television is bad for children.\n\nDo you agree? Is it bad for children to watch television? Do you think television advertisements are bad for children? Do you think children spend too much time watching television? Think about children, your friends and your family.',
            note: 'Before you start to write, think about the topic:\n• Do you agree or disagree?\n• What will you say in the introduction to let your readers know what you think?\n• What are the arguments and reasons for your opinion?\n• How will the conclusion sum up all your ideas?\n\nRemember to:\n• plan your writing\n• use a new paragraph for each idea\n• think about words that will make your arguments sound convincing\n• write in sentences\n• check spelling and punctuation\n• write neatly so that your readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              { type: 'long', n: '1', prompt: 'Write your argument.' },
            ],
          },
          {
            heading: 'Writing text 2 — People eat too much junk food',
            instructions:
              'Today you are going to write an argument. Your purpose is to give your opinion about the topic and persuade readers to agree with you.\n\nThe topic is: People eat too much junk food.\n\nPeople often call this kind of food “junk food” because it is not good for us to eat too much of it. Many people like to eat burgers, fries, cakes, lollies and soft drinks. Most people think we should not eat too much of these foods. What do you think?',
            note: 'Before you start to write, think about the topic:\n• Do you agree or disagree?\n• What will you say in the introduction to let your readers know what you think?\n• What are the arguments and reasons for your opinion?\n• How will the conclusion sum up all your ideas?\n\nRemember to:\n• plan your writing\n• use a new paragraph for each idea\n• think about words that will make your arguments sound convincing\n• write in sentences\n• check spelling and punctuation\n• write neatly so that your readers can understand your writing\n• ask a parent or teacher to read and check your finished work.',
            questions: [
              { type: 'long', n: '1', prompt: 'Write your argument.' },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 0,
    label: 'Sample Tests',
    overview: [],
    days: [],
  },
];

export const testBooks: TestBook[] = [
  { label: 'Year 2 Book 1', weeks: year2Book1Weeks },
  // Future workbooks (e.g. "Year 2 Book 2") get added here.
];
