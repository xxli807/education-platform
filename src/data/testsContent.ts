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

/** Optional picture shown under any question's text (a diagram from the book). */
export interface TestFigure {
  /** Path relative to the public folder, e.g. 'tests/w1d1-q2.svg'. */
  figure?: string;
  /** Describes the picture for screen readers. */
  figureAlt?: string;
  /** Max display width in px (default 420). */
  figureWidth?: number;
}

export type TestQuestion = TestFigure &
  (
    | {
        type: 'mcq';
        n?: string;
        prompt: string;
        options: string[];
        /** Lay the options out in one line (short words or bare A–E letters). */
        row?: boolean;
        /**
         * Picture of the whole question (relative to the public folder) shown
         * instead of the prompt text; options then render as a row of letters.
         */
        image?: string;
        /** Small monospace table shown under the prompt (e.g. data for a maths question). */
        table?: string;
        /** Worked explanation shown after the test is finished. */
        explanation?: string;
        /** Picture of a worked explanation (relative to the public folder). */
        explanationImage?: string;
      }
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
      }
  );

export interface TestBlock {
  /** Subject + topic heading, e.g. "Real Test". */
  heading: string;
  /** Optional intro / instruction line shown under the heading. */
  instructions?: string;
  /** Optional reading passage shown before the questions. */
  passage?: string;
  /** Optional monospace ASCII diagram of a visual pattern (sticks, straws, etc.). */
  diagram?: string;
  /** Optional picture shown above the questions (e.g. a scanned reading passage). */
  image?: string;
  /** Max display width of `image` in px (default 640). */
  imageWidth?: number;
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
            heading: 'Test Your Skills 1 — Counting and base-ten blocks',
            instructions:
              'Use the key: a flat is 100, a rod is 10 and a small cube is 1.',
            image: 'tests/w1d1-key.svg',
            imageWidth: 300,
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Write down the next five numbers: 854, 855, 856, …',
                inputs: 5,
                numeric: true,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Write the number shown by the blocks.',
                numeric: true,
                figure: 'tests/w1d1-tys1-q2.svg',
                figureAlt: '3 tens rods and 5 ones cubes',
                figureWidth: 200,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Write the number shown by the blocks.',
                numeric: true,
                figure: 'tests/w1d1-tys1-q3.svg',
                figureAlt: '1 hundred flat, 2 tens rods and 3 ones cubes',
                figureWidth: 260,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Write the number shown by the blocks.',
                numeric: true,
                figure: 'tests/w1d1-tys1-q4.svg',
                figureAlt: '2 hundreds flats and 4 tens rods',
                figureWidth: 320,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'Write the number shown by the blocks.',
                numeric: true,
                figure: 'tests/w1d1-tys1-q5.svg',
                figureAlt: '3 hundreds flats and 4 ones cubes',
                figureWidth: 380,
              },
            ],
          },
          {
            heading: 'Test Your Skills 1 — Write the numbers',
            instructions: 'Write the numbers.',
            questions: [
              {
                type: 'short',
                n: '6',
                prompt: '4 tens and 5 ones',
                numeric: true,
              },
              {
                type: 'short',
                n: '7',
                prompt: '7 hundreds, 5 tens and 2 ones',
                numeric: true,
              },
              {
                type: 'short',
                n: '8',
                prompt: '8 hundreds, 1 ten and 6 ones',
                numeric: true,
              },
              {
                type: 'short',
                n: '9',
                prompt: '2 hundreds, 0 tens and 5 ones',
                numeric: true,
              },
              {
                type: 'short',
                n: '10',
                prompt: '9 hundreds, 8 tens and 0 ones',
                numeric: true,
              },
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
              { type: 'short', n: '22', prompt: '600 + 7' },
            ],
          },
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
                prompt: '20, 30, __, __, 60, 70, __',
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
              { type: 'short', n: '13', prompt: '8 + 32 = 10 + __ = __' },
              { type: 'short', n: '14', prompt: '19 + 17 = 20 + __ = __' },
              { type: 'short', n: '15', prompt: '78 + 16 = 80 + __ = __' },
              { type: 'short', n: '16', prompt: '22 − 9 = __ − 10 = __' },
              { type: 'short', n: '17', prompt: '82 − 47 = __ − 50 = __' },
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
                n: '2',
                prompt: 'Which shows the number 56?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w1d1-rt-q2.svg',
                figureAlt:
                  'A: 5 tens and 6 ones. B: 5 tens and 5 ones. C: 6 tens and 6 ones. D: 6 tens and 5 ones.',
                figureWidth: 560,
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
                type: 'short',
                n: '4',
                prompt:
                  'What number is the arrow pointing to on the number line?',
                numeric: true,
                figure: 'tests/w1d1-rt-q4.svg',
                figureAlt:
                  'A number line from 50 with marks every 1, labelled 50, 55 and 60. The arrow points 3 marks past 60.',
                figureWidth: 480,
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
                  '135, 219, 348, 372',
                  '135, 372, 348, 219',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: '400 + 50 + 7 =',
                options: ['400 507', '40 057', '40 507', '457'],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which is the same as 98 + 8?',
                options: ['100 + 6', '100 + 7', '100 + 8', '100 + 10'],
              },
              {
                type: 'short',
                n: '9',
                prompt: 'How many stars are shown?',
                numeric: true,
                figure: 'tests/w1d1-rt-q9.svg',
                figureAlt: 'Rows of stars: four rows of 10 and one row of 7',
                figureWidth: 340,
              },
              {
                type: 'short',
                n: '10',
                prompt: 'What is this number?',
                numeric: true,
                figure: 'tests/w1d1-rt-q10.svg',
                figureAlt: '1 hundred flat, 1 tens rod and 7 ones cubes',
                figureWidth: 200,
              },
              {
                type: 'mcq',
                n: '11',
                prompt: 'Which number is closest to 30?',
                options: ['25', '28', '34', '39'],
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  "Calves on a farm are given a number when they are born. This calf's tag shows 149. What number will be given to the calf that is born next after this one?",
                numeric: true,
                figure: 'tests/w1d1-rt-q12.svg',
                figureAlt: 'An ear tag showing 149',
                figureWidth: 150,
              },
              {
                type: 'mcq',
                n: '13',
                prompt: 'Which is not the same as 9 + 7?',
                options: ['10 + 8', '6 + 10', '7 + 9', '8 + 8'],
              },
              {
                type: 'mcq',
                n: '14',
                prompt: 'Which arrow points to 87 on the number line?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w1d1-rt-q14.svg',
                figureAlt:
                  'A number line from 70 to 95 labelled 70, 80 and 90, with arrows A, B, C and D.',
                figureWidth: 500,
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Write the numbers 603, 360, 630 and 306 in order from largest to smallest.',
                inputs: 4,
                numeric: true,
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
            instructions: 'Here is a pattern of shapes.',
            image: 'tests/w1d2-tys1-shapes.svg',
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
              'Here is a pattern of diamond shapes made with sticks.',
            image: 'tests/w1d2-tys1-diamonds.svg',
            imageWidth: 460,
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
            instructions: 'Here is a pattern made with straws.',
            image: 'tests/w1d2-tys1-houses.svg',
            imageWidth: 560,
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
                n: '13',
                prompt: 'How many straws are used for Shape 4?',
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
              'Questions 1–3 are made by adding 4 each time. Questions 4–5 are formed by taking away 3 each time. Write down the next number in each pattern.',
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
            heading: 'Test Your Skills 2 — Next number in each pattern',
            instructions: 'Write down the next number in each pattern.',
            numeric: true,
            questions: [
              { type: 'short', n: '14', prompt: '12, 14, 16, 18, __' },
              { type: 'short', n: '15', prompt: '5, 10, 15, 20, 25, __' },
              { type: 'short', n: '16', prompt: '90, 80, 70, 60, __' },
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
              { type: 'short', n: '24', prompt: '__ − 3 = 7' },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              { type: 'short', n: '1', prompt: '17 + 8 = __', numeric: true },
              {
                type: 'short',
                n: '2',
                prompt:
                  '25, 30, 35, 40, 45, ? What number comes next in this pattern? __',
                numeric: true,
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Write a number in the box to make this number sentence correct: 32 + __ = 48',
                numeric: true,
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Alice puts beads on a string. The beads make a pattern. Which bead comes next in the pattern?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w1d2-rt-q4.svg',
                figureAlt:
                  'Beads repeat: small dark diamond, large white diamond, circle, dark square. The string ends with a small dark diamond. Choices: A circle, B large white diamond, C dark square, D large dark diamond.',
                figureWidth: 460,
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
                figure: 'tests/w1d2-rt-q10.svg',
                figureAlt:
                  'Cards in columns: 5 cards, then 8 cards, then 11 cards',
                figureWidth: 400,
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'The first number is missing in this pattern: ?, 31, 35, 39, 43. What is the first number?',
                options: ['27', '28', '29', '30'],
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Add 100 to find the next number in this pattern: 742, 842, 942, __',
              },
              {
                type: 'mcq',
                n: '13',
                prompt: 'Here is a pattern. How many □ are needed for each ◆?',
                options: ['1', '2', '3', '5'],
                figure: 'tests/w1d2-rt-q13.svg',
                figureAlt:
                  'A pattern: star, square, square, dark diamond, square, square, square, then it repeats.',
                figureWidth: 520,
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
                n: '16',
                prompt:
                  'Zane uses sticks to make a pattern. The first shape uses 3 sticks. The second shape uses 9 sticks. The third shape uses 18 sticks and the fourth shape uses 30 sticks. How many sticks will Zane need for the fifth shape?',
                options: ['36', '39', '42', '45'],
                figure: 'tests/w1d2-rt-q16.svg',
                figureAlt:
                  'Triangles made of sticks: 1 triangle, then 3, then 6, then 10 triangles.',
                figureWidth: 480,
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'What number comes next in this pattern? 43, 49, 55, 61, ?',
                options: ['67', '69', '65', '68'],
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Place numbers in each box to make a pattern. Begin with 6 and add 4 each time.',
                inputs: 4,
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
            instructions:
              'Add extra examples of your own to each column. Examples — hard c: cake, crunch, carrot, camel; soft c: cell, excel, dance, pencil; hard g: goat, going, grape, dragon; soft g: danger, emergency, germ, giraffe.',
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
                prompt: 'Our class is performing in the school *consert*.',
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
                options: ['colourful', 'tiny', 'delicious', 'gigantic'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Adult cicadas have ______ lives.',
                options: ['short', 'hairy', 'green', 'angry'],
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
            heading: 'Grammar & Punctuation — Noun groups',
            instructions:
              'Circle the noun group in each sentence (write the noun group in the box).',
            questions: [
              { type: 'short', n: '10', prompt: 'The red apples taste best.' },
              { type: 'short', n: '11', prompt: 'I saw a frog.' },
              { type: 'short', n: '12', prompt: 'I read an exciting book.' },
              {
                type: 'short',
                n: '13',
                prompt: 'The tiny creature crawled slowly past.',
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
            instructions:
              'Questions 9–12: read the text Cicada summer and choose the best word for each gap. Questions 21–25: the writing about magpies has gaps — choose the best noun for each gap.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'Which word correctly completes this sentence? Cicadas are ______.',
                options: ['insects', 'books', 'home', 'trees'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Which word correctly completes this sentence? We played ______ at lunchtime.',
                options: ['games', 'sandwiches', 'books', 'library'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Which word correctly completes this sentence? The children ate ______ for afternoon tea.',
                options: ['pretty', 'ugly', 'fruit', 'my'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Which word correctly completes this sentence? I have spelling ______.',
                options: ['funny', 'homework', 'sad', 'angry'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Which word correctly completes this sentence? The dog jumped onto the old ______ chair.',
                options: ['my', 'your', 'wooden', 'new'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Which word correctly completes this sentence? The bats flew into their ______ cave.',
                options: ['car', 'table', 'hungry', 'dark'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which sentence is written correctly?',
                options: [
                  'Michael lives in sydney.',
                  'Michael lives in Sydney',
                  'Michael lives in Sydney.',
                  'michael lives in Sydney.',
                ],
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which sentence is written correctly?',
                options: [
                  'Suri saw animals at Taronga Zoo',
                  'suri saw animals at taronga Zoo.',
                  'Suri saw animals at Taronga Zoo.',
                  'Suri saw animals. at Taronga Zoo.',
                ],
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
              {
                type: 'mcq',
                n: '13',
                prompt:
                  'Choose a word to describe taste. Nanna cooks ______ cakes.',
                options: ['yellow', 'delicious', 'red', 'blue'],
              },
              {
                type: 'mcq',
                n: '14',
                prompt:
                  'Which of the following correctly completes this sentence? The dog chewed on an ______ bone.',
                options: ['huge', 'enormous', 'big', 'large'],
              },
              {
                type: 'mcq',
                n: '15',
                prompt:
                  'Which word correctly completes this sentence? ______ kind of cicada do you like best?',
                options: ['This', 'That', 'Those', 'Which'],
              },
              {
                type: 'mcq',
                n: '16',
                prompt:
                  'Which word correctly completes this sentence? Kathy said, “This is ______ book.”',
                options: ['which', 'she’s', 'she', 'my'],
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Which word correctly completes this sentence? Year 2 children have ______ spelling test tomorrow.',
                options: ['their', 'you’re', 'my', 'his'],
              },
              {
                type: 'mcq',
                n: '18',
                prompt:
                  'Choose the correct word. Henry has ______ swimming lesson tomorrow.',
                options: ['a', 'an', 'her', 'them'],
              },
              {
                type: 'mcq',
                n: '19',
                prompt:
                  'Choose the correct word. ______ children have a reading test now.',
                options: ['A', 'An', 'The', 'This'],
              },
              {
                type: 'mcq',
                n: '20',
                prompt:
                  'Choose the correct word. A cicada is ______ interesting insect.',
                options: ['a', 'an', 'these', 'him'],
              },
              {
                type: 'mcq',
                n: '21',
                prompt: 'Magpies: A ______ of magpies lives …',
                options: ['family', 'birds', 'trees', 'street'],
              },
              {
                type: 'mcq',
                n: '22',
                prompt: '… in the ______ near my home.',
                options: ['river', 'caves', 'ocean', 'trees'],
              },
              {
                type: 'mcq',
                n: '23',
                prompt: 'The baby ______ are always hungry.',
                options: ['trees', 'eggs', 'birds', 'nest'],
              },
              {
                type: 'mcq',
                n: '24',
                prompt: 'The ______ bring …',
                options: ['babies', 'parents', 'trees', 'fish'],
              },
              {
                type: 'mcq',
                n: '25',
                prompt: '… the babies ______ all day long.',
                options: ['nest', 'food', 'lollies', 'flowers'],
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
              'Magpies are very common in Australia. They live in bushland and towns and cities. All magpies have black and white feathers.\n\nMagpies are known as songbirds. They love to sing. Magpies are also good mimics. They are able to copy the sounds they hear. Magpies can sound like other birds and even barking dogs.\n\nMagpies live in family groups. A family group can be parents, children and grandchildren. Older children help to feed younger brothers and sisters and teach them how to find their own food. Magpies protect their nests from intruders. In nesting season male magpies might swoop at people to protect their nests. Magpies nest in trees. The female lays two to five eggs at a time. Baby magpies beg loudly and constantly for food. Magpies eat worms, snails, lizards, frogs, spiders and insects. Magpies mostly peck for food on the ground. They also eat grains.\n\nMagpies are protected in Australia. It is against the law to hurt magpies in any way.',
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
              'There are Aboriginal sites all over Australia. These are special places.\n\nSome Aboriginal sites are sacred. They might be sacred because important traditional ceremonies were held there. They might be burial sites. Sacred sites are often connected to stories of The Dreaming. Many Aboriginals believe that sacred sites are protected by ancestor spirits. Some Aboriginals think that visitors should not be allowed to enter any sacred sites.\n\nOther important Aboriginal sites are not sacred. Local Aboriginal elders allow visitors onto these sites. One such site is Birrigai rock shelter. Birrigai is a large rock ledge. Up to twelve people can stand under it. Many experts think Birrigai rock shelter is the oldest Aboriginal site in Canberra. Aboriginal people used the rock shelter long, long ago. Many tourists visit the Birrigai rock shelter site. Schoolchildren visit on school excursions.',
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
                  'their parents',
                  'the local Aboriginal elders',
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
            instructions:
              'Read School champion, then choose the correct answer.',
            passage:
              'Judy Chen is in Year 6 at our school. She is a champion swimmer. She is my hero.\n\nJudy was born in a coastal town in Queensland. She started swimming in races when she was four. She joined her local Nippers when she was six. She loves competing in swimming events. She also loves just having fun in the pool or in the surf.\n\nJudy’s favourite swimming stroke is butterfly, which she calls ‘fly’. Judy has won all the butterfly events at our school swimming carnival for the last four years. She also swims for a local swimming club called ‘Little Dolphins’. The name of the club suits the way Judy swims. In the butterfly kick you keep your feet together and move them up and down just like a dolphin. Judy streaks through the water with her butterfly kick.\n\nJudy hopes to compete in the Olympics when she is older. I think she will make it. I hope she does.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Judy started swimming in races when she was',
                options: ['six.', 'four.', 'born.', 'in Year 6.'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'How is Judy like a dolphin?',
                options: [
                  'She wins swimming races.',
                  'She can fly through the water.',
                  'She loves playing in the water.',
                  'She kicks her feet up and down for the butterfly kick.',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Little Dolphins is the name of',
                options: [
                  'a dolphin species.',
                  'a racing club.',
                  'a swimming club.',
                  'a surf carnival.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Judy has been winning school swimming events',
                options: [
                  'for six years.',
                  'for three years.',
                  'for four years.',
                  'this year.',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Judy is best described as a person who is',
                options: ['energetic.', 'timid.', 'lazy.', 'lonely.'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'Which idea best matches this text?',
                options: [
                  'If you love something, you will most likely be good at it.',
                  'Winning is everything.',
                  'Dolphins are great swimmers.',
                  'Nippers helps you win swimming races.',
                ],
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Write the numbers 1 to 4 to show the order of events in Judy’s life.  __ Judy is now in Year 6.   __ Judy was born.   __ Judy joined Nippers.   __ Judy started swimming in races.',
                numeric: true,
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
              { type: 'short', n: '7', prompt: '__ + 3 = 8' },
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
                figure: 'tests/w2d1-tys1-nails.svg',
                figureAlt: 'Nine nails',
                figureWidth: 300,
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
                figure: 'tests/w2d1-tys1-paperclips.svg',
                figureAlt: 'Thirteen paperclips',
                figureWidth: 220,
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
              { type: 'short', n: '1', prompt: '3 + 3 + 3 + 3 + 3 = __ × 3' },
              { type: 'short', n: '2', prompt: '7 + 7 + 7 + 7 = __ × 7' },
              {
                type: 'short',
                n: '3',
                prompt: '2 + 2 + 2 + 2 + 2 + 2 + 2 = __ × __',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Here is a pack of drinks. How many drinks are in the pack?',
                figure: 'tests/w2d1-tys2-drinks.svg',
                figureAlt: 'A pack of 6 drink cans: 2 rows of 3',
                figureWidth: 130,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'How many drinks would be in 2 packs?',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'The number of drinks in 5 packs would be 5 × __ = __',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Here are some pencils. How many pencils are there?',
                figure: 'tests/w2d1-tys2-pencils.svg',
                figureAlt: 'Twelve pencils in two columns of 6',
                figureWidth: 300,
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
            heading: 'Test Your Skills — Choose the operation',
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
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'Molly had these pencils. She gave 3 to Ken. How many pencils did Molly have left?',
                options: ['3', '4', '5', '6'],
                figure: 'tests/w2d1-rt-q1.svg',
                figureAlt: 'Nine pencils',
                figureWidth: 140,
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Will put all his blocks into 3 equal stacks. Each stack has 6 blocks. How can Will find the total number of blocks?',
                options: ['6 ÷ 3', '6 + 3', '6 × 3', '6 − 3'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Rose has 37 books. Mary has 56 books. How many books do Rose and Mary have altogether?',
                options: ['91', '93', '81', '83'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Tennis balls are sold in packs of 4. Sam needs 11 tennis balls. What is the least number of packs Sam needs?',
                options: ['2', '3', '4', '5'],
                figure: 'tests/w2d1-rt-q4.svg',
                figureAlt: 'A pack of 4 tennis balls',
                figureWidth: 220,
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Jay has 30 toy trucks. He puts the trucks into rows, with 5 trucks in each row. Which shows how to work out the number of rows needed?',
                options: ['30 + 5', '30 − 5', '30 × 5', '30 ÷ 5'],
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Tim is putting pies in boxes. Each box holds 4 pies. How many boxes will Tim need for 20 pies?',
              },
              {
                type: 'short',
                n: '7',
                prompt: '18 + 37 has the same value as 20 + __',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  '$30 is shared equally among 6 boys. How much will each boy get? $__',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'What numbers go in the boxes to show the number of candles in the picture?\n__ × 5 candles = __ candles',
                numeric: true,
                figure: 'tests/w2d1-rt-q9.svg',
                figureAlt: 'Three candle holders, each with 5 candles',
                figureWidth: 420,
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Here are 3 rows of 8 books. This is the same as 6 rows of how many books?',
                options: ['4', '6', '8', '16'],
                figure: 'tests/w2d1-rt-q10.svg',
                figureAlt: 'A bookshelf with 3 rows of 8 books',
                figureWidth: 170,
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Bill has 83 spanners. Jed has 27 spanners. How many more spanners does Bill have than Jed?',
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Each plate has 4 cakes. There are 3 plates. Which shows one way to work out the total number of cakes?',
                options: ['4 + 3', '4 + 4 + 4 + 4', '4 × 3', '3 + 3 + 3'],
                figure: 'tests/w2d1-rt-q12.svg',
                figureAlt: 'Three plates, each with 4 cakes',
                figureWidth: 420,
              },
              {
                type: 'mcq',
                n: '13',
                prompt: 'Which gives the same answer as 9 + 9?',
                options: ['7 + 9', '10 + 8', '8 + 6', '12 + 10'],
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Some boys share these 18 marbles. Each boy gets 3 marbles. How many boys share the marbles?',
                figure: 'tests/w2d1-rt-q14.svg',
                figureAlt: 'Eighteen marbles',
                figureWidth: 260,
              },
              {
                type: 'mcq',
                n: '15',
                prompt:
                  'Two girls each play with 3 toy cars. Which shows the number of cars the girls play with?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w2d1-rt-q15.svg',
                figureAlt: 'A: 4 cars. B: 5 cars. C: 6 cars. D: 8 cars.',
                figureWidth: 560,
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
                  'Here are some toy cars. Jack owns half of the cars. How many cars does Jack own?',
                figure: 'tests/w2d2-tys1-cars.svg',
                figureAlt: 'Eight toy cars in two rows of 4',
                figureWidth: 280,
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
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q4.svg',
                figureAlt: 'A rectangle cut into 2 equal parts, 1 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q5.svg',
                figureAlt: 'A rectangle cut into 4 equal parts, 1 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '6',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q6.svg',
                figureAlt: 'A rectangle cut into 8 equal parts, 1 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q7.svg',
                figureAlt: 'A rectangle cut into 2 equal parts, 1 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '8',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q8.svg',
                figureAlt: 'A rectangle cut into 4 equal parts, 3 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '9',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q9.svg',
                figureAlt: 'A rectangle cut into 8 equal parts, 4 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '10',
                prompt: 'What fraction is shaded?',
                figure: 'tests/w2d2-tys1-q10.svg',
                figureAlt: 'A rectangle cut into 8 equal parts, 3 shaded',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Here are some oranges. How many halves can each orange be cut into?',
                figure: 'tests/w2d2-tys1-oranges.svg',
                figureAlt: 'Four oranges',
                figureWidth: 300,
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
                figure: 'tests/w2d2-tys2-coins.svg',
                figureAlt: 'Coins: 50c, 20c, 10c, 5c, $1, $2',
                figureWidth: 420,
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
                figure: 'tests/w2d2-tys2-two-coins.svg',
                figureAlt: 'Two coins: 50c and 20c',
                figureWidth: 170,
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
                figure: 'tests/w2d2-tys2-three-coins.svg',
                figureAlt: 'Three coins: 5c, 10c and $1',
                figureWidth: 220,
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
                prompt: 'Look at this money. Which note is worth the most?',
                figure: 'tests/w2d2-tys2-notes.svg',
                figureAlt: 'Notes: $50, $5, $10 and $20',
                figureWidth: 260,
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
                figure: 'tests/w2d2-rt-q1.svg',
                figureAlt: 'Twelve pencils in three bundles of 4',
                figureWidth: 380,
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Kylie has only these coins. How much money does she have?',
                options: ['40 cents', '$4.35', '$5.35', '$40'],
                figure: 'tests/w2d2-rt-q2.svg',
                figureAlt: 'Coins: $2, 20c, 5c, $2, $1, 10c',
                figureWidth: 230,
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Max cut some oranges into quarters. He has 8 quarters. How many oranges did Max cut?',
                options: ['2', '4', '8', '32'],
                figure: 'tests/w2d2-rt-q3.svg',
                figureAlt: 'An orange marked into quarters',
                figureWidth: 80,
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Which shape has one-eighth shaded?',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
                figure: 'tests/w2d2-rt-q4.svg',
                figureAlt:
                  'Shape A: 1 of 10 strips shaded. B: circle, 1 of 8 slices shaded. C: 1 of 7 slices shaded. D: 1 of 6 slices shaded.',
                figureWidth: 520,
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Which coins are in order from highest value to lowest? Choose all possible answers. Write the letters.',
                figure: 'tests/w2d2-rt-q5.svg',
                figureAlt:
                  'A: 20c, $2, $1. B: $2, $1, 50c. C: 20c, 10c, $2. D: $1, 10c, 5c.',
                figureWidth: 260,
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Jake cut these apples into quarters. How many quarters did Jake have?',
                figure: 'tests/w2d2-rt-q6.svg',
                figureAlt: 'Three apples',
                figureWidth: 240,
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Kevin has only these coins. He buys a ruler for 75 cents. How much money does Kevin have left?',
                options: ['$1.35', '$1.30', '$1.25', '36 cents'],
                figure: 'tests/w2d2-rt-q7.svg',
                figureAlt: 'Coins: 50c, 20c, 10c, 5c, $1, 20c, 5c',
                figureWidth: 290,
              },
              {
                type: 'mcq',
                n: '8',
                prompt: 'Which shape has one-half shaded?',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
                figure: 'tests/w2d2-rt-q8.svg',
                figureAlt:
                  'Shape A: triangle with its small top part shaded. B: 1 of 4 strips shaded. C: 1 of 3 parts shaded. D: circle with 4 of 8 slices shaded.',
                figureWidth: 470,
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
                  'Sue has this money in her purse. How much money is this?',
                options: ['$85', '$95', '$105', '$115'],
                figure: 'tests/w2d2-rt-q10.svg',
                figureAlt: 'Notes: $50, $20, $20, $10, $5',
                figureWidth: 260,
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Jill has these balloons. She gives half the balloons to Luke. Then Jill gives half of the balloons that are left to Alice. How many balloons will Jill have after giving balloons to Luke and Alice?',
                options: ['2', '3', '4', '6'],
                figure: 'tests/w2d2-rt-q11.svg',
                figureAlt: 'A bunch of 12 balloons',
                figureWidth: 200,
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'Ellen has these coins. She buys a banana. Now she has these coins left. How much was the banana? __ cents',
                figure: 'tests/w2d2-rt-q12.svg',
                figureAlt:
                  "Ellen's coins: 50c, 5c, 5c, 5c, 50c, 20c. Coins left: 50c and 5c.",
                figureWidth: 330,
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
            instructions:
              'Choose letters from the box to make words that end with the letters below. Use the pictures to help.\nBox: ma, ha, cla, sti, pe, so, sta, be',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'A word ending in “st”',
                figure: 'tests/w2d3-clue-fly.svg',
                figureAlt: 'A fly',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'A word ending in “mp”',
                figure: 'tests/w2d3-clue-stamp.svg',
                figureAlt: 'A stamp',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'A word ending in “nd”',
                figure: 'tests/w2d3-clue-hand.svg',
                figureAlt: 'A hand',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'A word ending in “nk”',
                figure: 'tests/w2d3-clue-skunk.svg',
                figureAlt: 'A smelly skunk',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'A word ending in “ng”',
                figure: 'tests/w2d3-clue-bell.svg',
                figureAlt: 'A ringing bell',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '6',
                prompt: 'A word ending in “sk”',
                figure: 'tests/w2d3-clue-mask.svg',
                figureAlt: 'A mask',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'A word ending in “lt”',
                figure: 'tests/w2d3-clue-belt.svg',
                figureAlt: 'A belt',
                figureWidth: 64,
              },
              {
                type: 'short',
                n: '8',
                prompt: 'A word ending in “ft”',
                figure: 'tests/w2d3-clue-cat.svg',
                figureAlt: 'A soft cat',
                figureWidth: 64,
              },
            ],
          },
          {
            heading: 'Spelling — Beginning blends',
            instructions: 'Write words that start with the following letters.',
            questions: [
              { type: 'short', n: '1', prompt: 'A word starting with “bl”' },
              { type: 'short', n: '2', prompt: 'A word starting with “cr”' },
              { type: 'short', n: '3', prompt: 'A word starting with “fr”' },
              { type: 'short', n: '4', prompt: 'A word starting with “sl”' },
              { type: 'short', n: '5', prompt: 'A word starting with “tr”' },
              { type: 'short', n: '6', prompt: 'A word starting with “scr”' },
              { type: 'short', n: '7', prompt: 'A word starting with “shr”' },
              { type: 'short', n: '8', prompt: 'A word starting with “thr”' },
            ],
          },
          {
            heading: 'Spelling — Rhyming words with silent letters',
            instructions:
              'Write rhyming words for the words with silent letters.',
            questions: [
              { type: 'short', n: '1', prompt: '(silent b) thumb → cr__' },
              { type: 'short', n: '2', prompt: '(silent ‘gh’) flight → n__' },
              { type: 'short', n: '3', prompt: '(silent l) would → c__' },
            ],
          },
          {
            heading: 'Spelling — Silent letters',
            instructions:
              'Add the missing silent letters from the box to finish each word.\nBox: d, n, s, k, k, gh, t, l',
            questions: [
              { type: 'short', n: '1', prompt: 'We__nesday' },
              { type: 'short', n: '2', prompt: 'shou__d' },
              { type: 'short', n: '3', prompt: 'autum__' },
              { type: 'short', n: '4', prompt: '__nuckle' },
              { type: 'short', n: '5', prompt: 'i__land' },
              { type: 'short', n: '6', prompt: 'lis__en' },
              { type: 'short', n: '7', prompt: '__nock' },
              { type: 'short', n: '8', prompt: 'si__t' },
            ],
          },
          {
            heading: 'Spelling — Vowel digraphs',
            instructions:
              'Write words with the same pairs of vowels and the same vowel sounds as each word below.',
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
                prompt: '“______ down from the tree,” called Dad.',
                word: 'climb',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: 'The gorilla’s ______ scraped on the ground.',
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
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.',
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
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word yourself',
            instructions:
              'Each sentence has one word that is incorrect. Find it and write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '28',
                prompt: 'The jumper might shringk in the wash.',
              },
              { type: 'short', n: '29', prompt: 'Rose sprained her rist.' },
              {
                type: 'short',
                n: '30',
                prompt: 'Henry stomped through the puddle in his boowts.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'We had swimming races in the pule.',
              },
              {
                type: 'short',
                n: '32',
                prompt: 'I used gloo to stick the foil onto my collage.',
              },
              {
                type: 'short',
                n: '33',
                prompt: 'You shoud walk your dog every day.',
              },
              {
                type: 'short',
                n: '34',
                prompt: 'I mite go to the park later.',
              },
              { type: 'short', n: '35', prompt: 'Thinck about your spelling.' },
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
                  'Tran ______ his horse to school today. (ride, rode, riding)',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Denni ______ an apple every day. (eats, eaten, eating)',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Angus can ______ fifty metres. (swam, swimming, swim)',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'The children have ______ their homework. (finish, finishing, finished)',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Helper verbs',
            instructions:
              'Choose a helper verb from the box for each sentence.\nBox: must, has, can, did',
            questions: [
              {
                type: 'short',
                n: '5',
                prompt: 'My clever dog ______ count to three.',
              },
              {
                type: 'short',
                n: '6',
                prompt: 'We ______ learn our spelling for the test.',
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Dad ______ try to fix my bike yesterday.',
              },
              {
                type: 'short',
                n: '8',
                prompt: 'Mum ______ eaten all the strawberries.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Thinking verbs',
            instructions:
              'Choose a thinking verb from the box to complete each sentence.\nBox: believes, worried, like, loves',
            questions: [
              { type: 'short', n: '9', prompt: 'Mum is ______ about Grandma.' },
              { type: 'short', n: '10', prompt: 'I ______ walking our dog.' },
              {
                type: 'short',
                n: '11',
                prompt: 'Grandpa ______ to watch tennis.',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'David ______ the tooth fairy will visit tonight.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Saying verbs',
            instructions:
              'Choose a saying verb from the box to complete each sentence.\nBox: barked, called, quacked, grunted',
            questions: [
              {
                type: 'short',
                n: '13',
                prompt: '“Jump in the pond!” ______ the mother duck.',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  '“It’s so much fun!” ______ the children from the Ferris wheel.',
              },
              {
                type: 'short',
                n: '15',
                prompt: '“Stay out of my cave!” ______ the Troll.',
              },
              {
                type: 'short',
                n: '16',
                prompt: '“Woof woof!” ______ the dog.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Lists and time order',
            questions: [
              {
                type: 'mcq',
                n: '17',
                prompt: 'Which sentence is punctuated correctly?',
                options: [
                  'Tina bought eggs flour sugar oats and walnuts',
                  'Tina bought eggs flour sugar oats and walnuts.',
                  'Tina bought eggs, flour, sugar, oats and walnuts.',
                  'Tina bought eggs, flour, sugar, oats, and, walnuts.',
                ],
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Number the sentences in time order, 1–3, starting with what happens first (1).\n__ Then I cleaned my teeth.\n__ I had dinner.\n__ After that I went to bed.',
                numeric: true,
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
                  'The frog jump over the lily pad.',
                  'The frog jumping over the lily pad.',
                  'The frog jumper over the lily pad.',
                  'The frog jumped over the lily pad.',
                ],
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Choose a word from the box (were, was, are, is): The ducks ______ swimming in the pond yesterday.',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Choose a word from the box (were, was, are, is): The duck ______ swimming in the pond yesterday.',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Choose a word from the box (were, was, are, is): A duck ______ swimming in the pond, right now.',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Choose a word from the box (were, was, are, is): Ducks ______ swimming in the pond, right now.',
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Which of the following correctly completes this sentence? “Tomorrow we ______ to the library.”',
                options: ['will go', 'be going', 'went', 'had gone'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which sentence is correct?',
                options: [
                  'The children is collecting autumn leaves.',
                  'The children were collecting autumn leaves.',
                  'The children was collecting autumn leaves.',
                  'The children will collecting autumn leaves.',
                ],
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'A comma ( , ) has been left out of this sentence. Where should the comma go?\nDad bought (A) rice, cashews, chicken (B) broccoli (C) and (D) onions for the stir fry.',
                options: [
                  'A — after “bought”',
                  'B — after “chicken”',
                  'C — after “broccoli”',
                  'D — after “and”',
                ],
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Which word correctly completes this sentence? “Billy counted his pencils and ______ that some were missing.”',
                options: ['seen', 'saw', 'sawn', 'see'],
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Which word correctly completes this sentence? “Let’s read a book,” ______ Mum.',
                options: ['talk', 'suggested', 'asked', 'speaking'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Which word correctly completes this sentence? “Helen ______ she is tired.”',
                options: ['sayed', 'saying', 'say', 'said'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Which word or word group correctly completes this sentence? “Pets quickly become sick if ______ in a hot car.”',
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
                prompt:
                  'Choose a word from the box (are, is, has, am): My name ______ Petra.',
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Choose a word from the box (are, is, has, am): I ______ eight years old.',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Choose a word from the box (are, is, has, am): Children in Dunedoo ______ lucky.',
              },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Choose a word from the box (are, is, has, am): Dunedoo ______ great schools.',
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
                  'Choose a doing verb from the box to start the command (Beat, Add, Bake, Pour): ______ the flour to the mixture.',
              },
              {
                type: 'short',
                n: '21',
                prompt:
                  'Choose a doing verb from the box to start the command (Beat, Add, Bake, Pour): ______ the eggs until smooth.',
              },
              {
                type: 'short',
                n: '22',
                prompt:
                  'Choose a doing verb from the box to start the command (Beat, Add, Bake, Pour): ______ the juice into a glass.',
              },
              {
                type: 'short',
                n: '23',
                prompt:
                  'Choose a doing verb from the box to start the command (Beat, Add, Bake, Pour): ______ in a hot oven for 30 minutes.',
              },
              {
                type: 'mcq',
                n: '24',
                prompt: 'Which sentence has the correct punctuation?',
                options: [
                  '“I love stories about aliens said Frankie.”',
                  '“I love stories, about aliens” said Frankie.',
                  '“I love stories about aliens,” said Frankie.',
                  '“I love stories about aliens,” said, Frankie',
                ],
              },
              {
                type: 'mcq',
                n: '25',
                prompt:
                  'Choose the correct word to complete this sentence. “Yuki does not ______ peanuts.”',
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
                  'Store Hair-growth Tonic in fridge.',
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
              'How to train a pet mouse\n\nMice are timid so training will take time and patience.\n\n1. Make sure your mouse is happy to be handled. The more you handle your mouse the more easily it will learn tricks. You can rub your hands on the mouse bedding so that you smell more mouse-like until the mouse gets used to you.\n2. Reward your mouse with its favourite food treat each time you handle it. Try treats such as millet, oats or sunflower seeds.\n3. Make a clicking noise with your tongue each time you give the mouse a treat. It will learn that the clicking sound means a treat. Eventually it will come straight to you whenever you make the sound.\n4. Reward all good behaviour with food treats.\n5. Keep training sessions short.\n\nNote: Mice are sociable and like to live with other mice. Single mice get bored and lonely.',
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
              'Rules for young chimpanzees\n\n• Stay out of the way of the alpha male.\n• Greet other chimps with a kiss and a hug.\n• Listen out for happy, barking sounds in the morning. These sounds mean that food has been found.\n• Eat fruit, leaves, termites, vegetables, eggs, nuts, honey and wild pig when you can catch one.\n• Use grass and leaves to build ground nests, for afternoon naps.\n• Rest during the hottest part of the day.\n• Build nests high in trees for night sleeping, safe from hungry leopards.\n• Help your friends and family with grooming; remove dirt and ticks.\n• Stay close to your mother until you are at least four years old.',
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
              'Write down the letter beside the instrument you would use to measure',
            image: 'tests/w3d1-tys1-instruments.svg',
            imageWidth: 460,
            questions: [
              { type: 'short', n: '1', prompt: 'how long a cake tin is.' },
              {
                type: 'short',
                n: '2',
                prompt: 'the mass of flour to put in a cake.',
              },
              {
                type: 'short',
                n: '3',
                prompt: 'the amount of milk to put in a cake.',
              },
              {
                type: 'short',
                n: '4',
                prompt: 'how long the cake is in the oven.',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'how hot it is in the kitchen.',
              },
            ],
          },
          {
            heading: 'Test Your Skills — Comparing length and capacity',
            instructions: 'Here are some ribbons. What colour is',
            questions: [
              {
                type: 'short',
                n: '6',
                prompt: 'the longest ribbon?',
                figure: 'tests/w3d1-tys1-ribbons.svg',
                figureAlt:
                  'Ribbons: red is long, yellow is the shortest, blue is the longest, pink is short, green is between pink and red',
                figureWidth: 300,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'the shortest ribbon?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'the ribbon that is longer than the pink ribbon but shorter than the red ribbon?',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'These jugs all hold different amounts when full. The number of litres can be seen. Which jug has the most juice in it?',
                figure: 'tests/w3d1-tys1-jugs.svg',
                figureAlt:
                  'Jug A filled to 1 L. Jug B filled to just above 2 L. Jug C filled to below 1 L. Jug D filled to 1 L.',
                figureWidth: 430,
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
            heading: 'Test Your Skills — Which shape?',
            instructions: 'Look at these shapes.',
            questions: [
              {
                type: 'short',
                n: '12',
                prompt: 'Which shape is a circle?',
                figure: 'tests/w3d1-tys1-shapes.svg',
                figureAlt: 'Shape A triangle, B square, C circle, D rectangle',
                figureWidth: 400,
              },
              { type: 'short', n: '13', prompt: 'Which shape is a triangle?' },
              { type: 'short', n: '14', prompt: 'Which shape is a square?' },
            ],
          },
          {
            heading: 'Test Your Skills — 2D and 3D shapes',
            instructions: 'Look at these shapes. How many of the shapes are',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'triangles?',
                figure: 'tests/w3d1-tys2-shapes.svg',
                figureAlt:
                  'Eleven flat shapes: 4 triangles, 2 circles, 3 rectangles, a parallelogram and an octagon',
                figureWidth: 440,
              },
              { type: 'short', n: '2', prompt: 'circles?' },
              { type: 'short', n: '3', prompt: 'rectangles?' },
              {
                type: 'short',
                n: '4',
                prompt:
                  'This is a rectangular prism. How many faces does it have?',
                figure: 'tests/w3d1-tys2-rect-prism.svg',
                figureAlt: 'A rectangular prism',
                figureWidth: 200,
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
                figure: 'tests/w3d1-tys2-tri-prism.svg',
                figureAlt: 'A triangular prism',
                figureWidth: 170,
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
            heading: 'Test Your Skills — 3D objects, pavers and blocks',
            instructions:
              'Choose the object that matches each name (write the letter).',
            image: 'tests/w3d1-tys2-solids.svg',
            imageWidth: 380,
            questions: [
              { type: 'short', n: '13', prompt: 'cube' },
              { type: 'short', n: '14', prompt: 'cone' },
              { type: 'short', n: '15', prompt: 'cylinder' },
              { type: 'short', n: '16', prompt: 'pyramid' },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Three pavers have been put on this space. How many pavers altogether will fit on the space?',
                numeric: true,
                figure: 'tests/w3d1-tys2-pavers.svg',
                figureAlt:
                  'A space for 4 by 3 pavers with 3 pavers already in place',
                figureWidth: 200,
              },
              {
                type: 'short',
                n: '18',
                prompt: 'How many more pavers will fit on the space?',
                numeric: true,
              },
              {
                type: 'short',
                n: '19',
                prompt:
                  'These rectangular prisms were built with blocks like this. How many blocks were needed for prism 19?',
                numeric: true,
                figure: 'tests/w3d1-tys2-blocks.svg',
                figureAlt:
                  'Prism 19: 2 blocks wide, 3 high and 3 deep. Prism 20: 4 blocks wide, 2 high and 2 deep.',
                figureWidth: 300,
              },
              {
                type: 'short',
                n: '20',
                prompt: 'How many blocks were needed for prism 20?',
                numeric: true,
              },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'Which dog is the tallest?',
                options: ['Dog A', 'Dog B', 'Dog C', 'Dog D'],
                figure: 'tests/w3d1-rt-q1.svg',
                figureAlt:
                  'Four dogs: A long and low, B medium, C tallest, D small',
                figureWidth: 440,
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'What is this 3D shape?',
                options: ['pyramid', 'cone', 'cube', 'cylinder'],
                figure: 'tests/w3d1-rt-q2.svg',
                figureAlt: 'A cylinder lying on its side',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Choose all the shapes that are triangles. Write the letters.',
                figure: 'tests/w3d1-rt-q3.svg',
                figureAlt:
                  'A trapezium, B triangle, C arrow, D right-angled triangle, E long thin triangle, F hexagon',
                figureWidth: 520,
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'This is a square pyramid. How many faces does it have?',
                options: ['4', '5', '6', '8'],
                figure: 'tests/w3d1-rt-q4.svg',
                figureAlt: 'A square pyramid',
                figureWidth: 210,
              },
              {
                type: 'mcq',
                n: '5',
                prompt: 'Which would you use to measure length?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w3d1-rt-q5.svg',
                figureAlt:
                  'A stopwatch, B bathroom scales, C tape measure, D kitchen scales',
                figureWidth: 400,
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Cass is putting stamps on a card. How many stamps like these will fit on the card altogether?',
                numeric: true,
                figure: 'tests/w3d1-rt-q6.svg',
                figureAlt:
                  'A card marked into 5 columns and 3 rows, with 4 pig stamps in place',
                figureWidth: 320,
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Which number is in the circle and in the triangle, but not in the square?',
                numeric: true,
                figure: 'tests/w3d1-rt-q7.svg',
                figureAlt:
                  'A circle, a triangle and a square overlapping, with the numbers 1 to 8 in different parts',
                figureWidth: 290,
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Luke built this cube from blocks like this. How many blocks did Luke need?',
                numeric: true,
                figure: 'tests/w3d1-rt-q8.svg',
                figureAlt: 'A cube 3 blocks wide, 3 high and 3 deep',
                figureWidth: 260,
              },
              {
                type: 'mcq',
                n: '9',
                prompt: 'How many of these shapes are rectangles?',
                options: ['2', '3', '4', 'more than 4'],
                figure: 'tests/w3d1-rt-q9.svg',
                figureAlt:
                  'A triangle, rectangle, circle, parallelogram, triangle, parallelogram, rectangle and oval',
                figureWidth: 400,
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'This bucket holds 20 litres when full. There is some milk in the bucket. About how much milk is in the bucket?',
                options: ['16 litres', '11 litres', '6 litres', '1 litre'],
                figure: 'tests/w3d1-rt-q10.svg',
                figureAlt: 'A bucket a little more than half full of milk',
                figureWidth: 130,
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'This is a rectangular prism. How many edges does it have?',
                options: ['6', '8', '10', '12'],
                figure: 'tests/w3d1-rt-q11.svg',
                figureAlt: 'A rectangular prism',
                figureWidth: 210,
              },
              {
                type: 'mcq',
                n: '12',
                prompt: 'Which shape has the most squares coloured?',
                options: ['Shape A', 'Shape B', 'Shape C', 'Shape D'],
                figure: 'tests/w3d1-rt-q12.svg',
                figureAlt:
                  'Four grids with a coloured rectangle in each: A 7 by 3, B 5 by 4, C 9 by 2, D 3 by 5',
                figureWidth: 520,
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
              {
                type: 'short',
                n: '1',
                prompt: 'Clock 1',
                figure: 'tests/w3d2-tys1-clock1.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Clock 2',
                figure: 'tests/w3d2-tys1-clock2.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Clock 3',
                figure: 'tests/w3d2-tys1-clock3.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Clock 4',
                figure: 'tests/w3d2-tys1-clock4.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '5',
                prompt: 'Clock 5',
                figure: 'tests/w3d2-tys1-clock5.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '6',
                prompt: 'Clock 6',
                figure: 'tests/w3d2-tys1-clock6.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Clock 7',
                figure: 'tests/w3d2-tys1-clock7.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '8',
                prompt: 'Clock 8',
                figure: 'tests/w3d2-tys1-clock8.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '9',
                prompt: 'Clock 9',
                figure: 'tests/w3d2-tys1-clock9.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '10',
                prompt: 'Clock 10',
                figure: 'tests/w3d2-tys1-clock10.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '11',
                prompt: 'Clock 11',
                figure: 'tests/w3d2-tys1-clock11.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Clock 12',
                figure: 'tests/w3d2-tys1-clock12.svg',
                figureAlt: 'A clock face',
                figureWidth: 110,
              },
            ],
          },
          {
            heading: 'Test Your Skills — Calendar (May)',
            instructions: 'Look at this calendar.',
            questions: [
              {
                type: 'short',
                n: '13',
                prompt: 'What day of the week is 2 May?',
                figure: 'tests/w3d2-tys1-may.svg',
                figureAlt:
                  'Calendar for May: 1 May is a Wednesday and the month has 31 days',
                figureWidth: 300,
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
              {
                type: 'short',
                n: '2',
                prompt: 'How many days are in April?',
                numeric: true,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'How many days are in June?',
                numeric: true,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'How many days are in August?',
                numeric: true,
              },
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
              {
                type: 'short',
                n: '13',
                prompt:
                  'Circle the letter on the object that has the greater mass: A or B?',
                figure: 'tests/w3d2-tys2-balances.svg',
                figureAlt:
                  'Left balance: pan A is lower than pan B. Right balance: pan D is lower than pan C.',
                figureWidth: 470,
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Circle the letter on the object that has the greater mass: C or D?',
              },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'What time is shown on this clock?',
                options: [
                  'quarter past five',
                  'quarter to five',
                  'quarter past four',
                  'quarter to four',
                ],
                figure: 'tests/w3d2-rt-q1.svg',
                figureAlt:
                  'A clock with the long hand on 9 and the short hand nearly at 5',
                figureWidth: 120,
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Oliver was born on 18 July 2012. On what day of the week was Oliver born?',
                options: ['Saturday', 'Tuesday', 'Wednesday', 'Sunday'],
                figure: 'tests/w3d2-rt-q2.svg',
                figureAlt: 'Calendar for July 2012: 1 July is a Sunday',
                figureWidth: 300,
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which of these is used to measure mass?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w3d2-rt-q3.svg',
                figureAlt:
                  'A clock, B thermometer, C tape measure, D kitchen scales',
                figureWidth: 380,
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
                figure: 'tests/w3d2-rt-q4.svg',
                figureAlt: 'A clock with only the short hand, pointing at 8',
                figureWidth: 120,
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Write the correct time below each clock. Choose from these times:\n3:25, 5:15, 9:35, 5:03, 9:25, 6:45, 6:15, 3:30, 5:45, 6:30',
                inputs: 4,
                figure: 'tests/w3d2-rt-q5.svg',
                figureAlt: 'Four clocks',
                figureWidth: 440,
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
                figure: 'tests/w3d2-rt-q8.svg',
                figureAlt: 'Calendar for September: 1 September is a Monday',
                figureWidth: 300,
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
                  'Which shows the objects in order from lowest mass to highest mass?',
                options: ['Order A', 'Order B', 'Order C', 'Order D'],
                figure: 'tests/w3d2-rt-q10.svg',
                figureAlt:
                  'First balance: the blue object is heavier than the small grey one. Second balance: the dark object is heavier than the blue one. Orders: A blue, grey, dark. B grey, dark, blue. C dark, blue, grey. D grey, blue, dark.',
                figureWidth: 470,
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
                figure: 'tests/w3d2-rt-q12.svg',
                figureAlt: 'Calendar for December: 1 December is a Thursday',
                figureWidth: 300,
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
              'These words all end in a silent e. Add the missing vowel to each word.',
            questions: [
              { type: 'short', n: '1', prompt: 'm__ke' },
              { type: 'short', n: '2', prompt: 't__me' },
              { type: 'short', n: '3', prompt: 'b__te' },
              { type: 'short', n: '4', prompt: 'th__se' },
              { type: 'short', n: '5', prompt: 'h__pe' },
              { type: 'short', n: '6', prompt: 't__be' },
              { type: 'short', n: '7', prompt: '__pe' },
              { type: 'short', n: '8', prompt: 'sl__pe' },
              { type: 'short', n: '9', prompt: 'th__me' },
              { type: 'short', n: '10', prompt: 'r__be' },
              { type: 'short', n: '11', prompt: 'c__be' },
              { type: 'short', n: '12', prompt: '__se' },
              { type: 'short', n: '13', prompt: 'c__ke' },
              { type: 'short', n: '14', prompt: 'g__me' },
              { type: 'short', n: '15', prompt: 'h__ke' },
              { type: 'short', n: '16', prompt: 'c__me' },
              { type: 'short', n: '17', prompt: 'r__pe' },
              { type: 'short', n: '18', prompt: 'n__ce' },
              { type: 'short', n: '19', prompt: 'r__ce' },
              { type: 'short', n: '20', prompt: 'h__se' },
              { type: 'short', n: '21', prompt: 'c__te' },
              { type: 'short', n: '22', prompt: 'd__se' },
              { type: 'short', n: '23', prompt: 'd__ce' },
              { type: 'short', n: '24', prompt: 'n__te' },
              { type: 'short', n: '25', prompt: 'pol__te' },
              { type: 'short', n: '26', prompt: '__ce' },
              { type: 'short', n: '27', prompt: 'h__de' },
              { type: 'short', n: '28', prompt: 'r__te' },
              { type: 'short', n: '29', prompt: 'h__te' },
              { type: 'short', n: '30', prompt: 'k__te' },
            ],
          },
          {
            heading: 'Spelling — Silent e pictures',
            instructions:
              'Write a label for each drawing. Each answer has a silent e.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'Starts with “p”',
                figure: 'tests/w3d3-clue-plane.svg',
                figureAlt: 'An aeroplane',
                figureWidth: 84,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Starts with “p”',
                figure: 'tests/w3d3-clue-plate.svg',
                figureAlt: 'A plate',
                figureWidth: 84,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'Starts with “s”',
                figure: 'tests/w3d3-clue-snake.svg',
                figureAlt: 'A snake',
                figureWidth: 84,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Starts with “b”',
                figure: 'tests/w3d3-clue-bike.svg',
                figureAlt: 'A bike',
                figureWidth: 84,
              },
            ],
          },
          {
            heading: 'Spelling — “qu” words',
            instructions: 'Add ‘qu’ to each word.',
            questions: [
              { type: 'short', n: '1', prompt: 's__ash' },
              { type: 'short', n: '2', prompt: 's__ish' },
              { type: 'short', n: '3', prompt: 's__elch' },
              { type: 'short', n: '4', prompt: 's__eeze' },
              { type: 'short', n: '5', prompt: '__iet' },
              { type: 'short', n: '6', prompt: '__ick' },
              { type: 'short', n: '7', prompt: '__ite' },
              { type: 'short', n: '8', prompt: '__ack' },
              { type: 'short', n: '9', prompt: '__ake' },
              { type: 'short', n: '10', prompt: '__arrel' },
              { type: 'short', n: '11', prompt: '__een' },
              { type: 'short', n: '12', prompt: '__estion' },
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
              'Choose the correct letters from the box to make words.\nBox: or, ar, ay, ow',
            questions: [
              { type: 'short', n: '1', prompt: 'f__' },
              { type: 'short', n: '2', prompt: 'pl__' },
              { type: 'short', n: '3', prompt: 'p__er' },
              { type: 'short', n: '4', prompt: 'st__e' },
              { type: 'short', n: '5', prompt: 'f__m' },
              { type: 'short', n: '6', prompt: 'st__' },
              { type: 'short', n: '7', prompt: 'sh__er' },
              { type: 'short', n: '8', prompt: 'sh__t' },
              { type: 'short', n: '9', prompt: 'al__m' },
              { type: 'short', n: '10', prompt: 'bef__e' },
              { type: 'short', n: '11', prompt: 'Mond__' },
              { type: 'short', n: '12', prompt: 'h__' },
              { type: 'short', n: '13', prompt: '__l' },
              { type: 'short', n: '14', prompt: 'h__d' },
              { type: 'short', n: '15', prompt: 'g__den' },
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
                prompt: 'Lee and I cooked a ______ for Mum’s birthday.',
                word: 'cake',
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
                prompt: 'I only ______ one mistake in the test.',
                word: 'made',
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
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.',
            questions: [
              {
                type: 'short',
                n: '19',
                prompt: 'I kicked my toe on a *ston*.',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'I *hayt* the taste of oysters.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Keep your hands by your *sid*.',
              },
              {
                type: 'short',
                n: '22',
                prompt: '*Sav* your money in the bank.',
              },
              { type: 'short', n: '23', prompt: 'The bread was *stal*.' },
              {
                type: 'short',
                n: '24',
                prompt: 'I *chos* Fred to be my partner.',
              },
              {
                type: 'short',
                n: '25',
                prompt: 'I saw some dairy *cowhs* on the farm.',
              },
              {
                type: 'short',
                n: '26',
                prompt: 'We had *rela* races for sport.',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word yourself',
            instructions:
              'Each sentence has one word that is incorrect. Find it and write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '27',
                prompt: 'Ned kwit the team when he hurt his foot.',
              },
              { type: 'short', n: '28', prompt: 'I heard the duck kwack.' },
              {
                type: 'short',
                n: '29',
                prompt: 'The story was about a king and kween.',
              },
              {
                type: 'short',
                n: '30',
                prompt: 'You need to be kwick with the lunch orders.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'There was an earthkwake in Mexico.',
              },
              {
                type: 'short',
                n: '32',
                prompt:
                  'The teacher asked the children to keep kwiet during the concert.',
              },
              { type: 'short', n: '33', prompt: 'I dont like hot dogs.' },
              {
                type: 'short',
                n: '34',
                prompt: 'Its’ time for our library lesson.',
              },
              { type: 'short', n: '35', prompt: 'Your’e a great goalkeeper.' },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Sentences and punctuation',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Choose a punctuation mark from the box ( ! ? . ): “Be careful ___” shouted Mum.',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Choose a punctuation mark from the box ( ! ? . ): Allan ate yoghurt and fruit ___',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Choose a punctuation mark from the box ( ! ? . ): Where is the softball ___',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Choose a punctuation mark from the box ( ! ? . ): Today is Monday ___',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'Write a statement to answer this question about yourself: What is your name?',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'Write a statement to answer this question about yourself: How old are you?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Write a statement to answer this question about yourself: Where do you live?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Write a statement to answer this question about yourself: What is your favourite food?',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Write a question for this answer: “I live in Belrose.”',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Write a question for this answer: “My favourite animal is a …”',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Write a question for this answer: “I don’t have any pets.”',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Write a question for this answer: “I play soccer.”',
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
                  'Rewrite the sentence correctly using speech marks: Can we go to the zoo? asked Harriet.',
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Rewrite the sentence correctly using speech marks: Stop that! yelled Liam.',
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
                  'Rina lives with her stepfather.',
                  'a timber house.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Which words correctly complete this sentence? “Lina was early for school ______.”',
                options: [
                  'but she helped the teacher',
                  'so she helped the teacher',
                  'then she helped the teacher',
                  'because she helped the teacher',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which sentence has the correct punctuation?',
                options: [
                  'Grandpa lives with us?',
                  'Grandpa lives in Wagga Wagga?',
                  'Where does your grandfather live?',
                  'Grandpa was born in Athens?',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Choose the correct word and punctuation mark to fill the gap. “Did you invite your parents to the ______”',
                options: ['Concert!', 'Concert.', 'concert?', 'concert'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Choose the correct word and punctuation mark to fill the gap. “Look out, ______”',
                options: ['Nan', 'Nan.', 'Nan?', 'Nan!'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Which words correctly complete this sentence? “Sachin is becoming a good cricket player ______.”',
                options: [
                  'so he practises every day',
                  'then he practises every day',
                  'but he practises every day',
                  'because he practises every day',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt:
                  'Choose the correct punctuation mark to fill the gap. A car was coming. Mark shouted, “Careful ___”',
                options: ['.', ',', '?', '!'],
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
                options: ['aadrika', 'good', 'name', 'elephant'],
              },
              {
                type: 'mcq',
                n: '11',
                prompt:
                  'Which word should start with a capital letter? “The zoo in sydney has elephants and giraffes.”',
                options: ['sydney', 'elephants', 'and', 'giraffes'],
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Where should the missing full stop go?\nTim had soccer (A) practice (B) yesterday (C) Today (D) he does gymnastics.',
                options: ['A', 'B', 'C', 'D'],
                row: true,
              },
              {
                type: 'mcq',
                n: '13',
                prompt:
                  'Where should the missing full stop go?\nIt is raining (A) today (B) I hope (C) it will be (D) sunny tomorrow.',
                options: ['A', 'B', 'C', 'D'],
                row: true,
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Where should the two speech marks ( “ ” ) go? Write two letters.\n(A) Will you help me practise (B) goal kicking? (C) asked Jessica. (D)',
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Where should the two speech marks ( “ ” ) go? Write two letters.\n(A) Stop! (B) Don’t cross (C) the road yet, (D) shouted Keith.',
              },
              {
                type: 'mcq',
                n: '16',
                prompt:
                  'Where should the exclamation mark ( ! ) go?\n“Yuk (A) ” shrieked Julia (B) . (C) “That (D) tasted terrible.”',
                options: ['A', 'B', 'C', 'D'],
                row: true,
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Which words correctly complete this sentence? “He was late home ______.”',
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
                  'Which word correctly completes this sentence? “______ the classroom was so hot, the teacher read to the class under a tree.”',
                options: ['Until', 'Because', 'Although', 'And'],
              },
              {
                type: 'mcq',
                n: '19',
                prompt:
                  'Which word correctly completes this sentence? “______ it was raining, Sara decided to walk to the park.”',
                options: ['Until', 'Because', 'Although', 'Since'],
              },
              {
                type: 'mcq',
                n: '20',
                prompt:
                  'Which word correctly completes this sentence? “______ it stopped raining, the dogs had to stay indoors.”',
                options: ['Until', 'Because', 'Although', 'Since'],
              },
              {
                type: 'short',
                n: '21',
                prompt:
                  'Add a word from the box (because, and, until, so) to complete the sentence: Kate ran to school ______ she’d have time to play.',
              },
              {
                type: 'short',
                n: '22',
                prompt:
                  'Add a word from the box (because, and, until, so) to complete the sentence: Carl ran to school ______ he wanted to race Frankie.',
              },
              {
                type: 'short',
                n: '23',
                prompt:
                  'Add a word from the box (because, and, until, so) to complete the sentence: Matilda ran ______ she ran out of breath.',
              },
              {
                type: 'short',
                n: '24',
                prompt:
                  'Add a word from the box (because, and, until, so) to complete the sentence: Jin ran to the corner ______ then he walked the rest of the way.',
              },
              {
                type: 'mcq',
                n: '25',
                prompt:
                  'Which sentence below is closest in meaning to these sentences? “Yusuf’s cat is very tiny. It is called Alpa which is a Hindu word meaning ‘little’.”',
                options: [
                  'Yusuf has a tiny cat called Alpa.',
                  'Alpa is a Hindu word for Yusuf’s cat.',
                  'Yusuf’s tiny cat is called Alpa which means ‘little’ in Hindu.',
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
              'The spoilt prince\n\nOnce upon a time in a kingdom far, far away there lived a king and queen and their son, Johan. The king and queen were kind and good but Johan was not kind or good. He was lazy and rude. He demanded that the cook make him special cakes. He was mean to everyone, even his parents.\n\nOn Johan’s 21st birthday the king and queen announced that it was time for Johan to marry. They sent letters to princesses in kingdoms all around, inviting them to meet the prince.\n\nPrincesses came from far and wide but Prince Johan refused to marry anyone. He was rude to all the princesses. He said that he wanted to live with his parents forever.\n\nThe princesses didn’t want to marry a mean and rude prince, anyway. So, they went on a holiday together to New Zealand. They had fun snow skiing and whale watching.\n\nThe prince never married. He lived happily ever after in his parents’ castle. And, as for his parents, they went on holidays to New Zealand as often as they could, without Johan.',
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
                type: 'long',
                n: '3',
                prompt:
                  'Why do you think Johan’s parents decided it was time for Johan to marry?',
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
              'A conversation with Grandma\n\nCynthia and her grandmother were talking one afternoon.\n\n“Where were you born, Zumu?” Cynthia asked.\n\n“I was born in a farming village in China,” replied her grandmother.\n\n“What was it like there?” Cynthia asked.\n\n“Beautiful,” said Zumu. “It’s an important wheat-growing area now.”\n\n“Will you take me to see where you were born?”\n\n“No, Cynthia. It is too far away,” said Zumu.\n\n“How far away is it?” Cynthia wanted to know.\n\n“Too far,” replied Zumu.\n\n“I want to go!” Cynthia demanded.\n\n“You can go when you are grown up. You can take yourself,” said Zumu.\n\n“That’s a long time!” Cynthia declared in a sulky voice. She slumped her shoulders. She pretended she might cry. She wanted Zumu to give in and agree to take her to China.\n\n“You must be patient,” declared Zumu.\n\n“Oh! You always tell me to be patient,” Cynthia declared. “I will go to China one day.”',
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
              'Stuck\n\n“Pongo,” called Jenny. “Pongo, come on down. Come on, Puss Puss.”\n\nPongo had climbed a tree and Jenny wanted him to come down. Pongo had been in the tree for ages. Jenny was worried that Pongo didn’t know how to get back down. Jenny went inside the house to get some chicken, Pongo’s favourite food. She waved the chicken at Pongo, then she placed the chicken on the ground.\n\n“Come and get some yummy chicken,” she called. Pongo just looked at her.\n\nNow Jenny was really getting worried. She went inside and told her mother that the cat was stuck in a tree. Her mother said she’d have a look. But when Jenny and her mother went outside, there was Pongo, on the ground, eating the chicken.\n\n“Oh, Pongo,” said Jenny. “You are such a tricker!”',
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
            instructions: 'Look at this grid.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'What is found at B3?',
                figure: 'tests/w4d1-tys1-grid.svg',
                figureAlt:
                  'A grid with columns A to D and rows 1 to 4. Row 4: bank, butcher, bakery, post office. Row 3: fruit shop, chemist, doctor, dentist. Row 2: school, park, library, church. Row 1: pool, skate park, gym, garage.',
                figureWidth: 360,
              },
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
                prompt:
                  'Here is a picture of some friends. Jo is standing on the left in the back row. Who is standing in front of Jo?',
                figure: 'tests/w4d1-tys1-friends.svg',
                figureAlt:
                  'Back row from left: Jo, Kim, Lee, Bill. Front row from left: Helen, Dan, Jane, Bob.',
                figureWidth: 300,
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
              {
                type: 'short',
                n: '14',
                prompt: 'Here is a map of Red Rock. On what road is the bank?',
                figure: 'tests/w4d1-tys1-map.svg',
                figureAlt:
                  'Map: Main Rd runs across the top and Red Rock Rd across the bottom. Hill Rd is on the left and Park Rd on the right. The post office faces Park Rd. The bank faces Red Rock Rd.',
                figureWidth: 420,
              },
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
            instructions: 'Look at the grid.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'What is the position of the arrow ✈?',
                figure: 'tests/w4d1-tys2-grid.svg',
                figureAlt:
                  'A grid with columns A to G and rows 1 to 5, with a plane in one square',
                figureWidth: 330,
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'What will the new position be if ✈ moves one square to the right?',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'What will the new position be if ✈ moves two squares up?',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'What will the new position be if ✈ moves three squares left?',
              },
              {
                type: 'short',
                n: '5',
                prompt:
                  'What will the new position be if ✈ moves one square down?',
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'How many squares and in which direction does ✈ move from its starting point to F2?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'How many squares and in which direction does ✈ move from its starting point to D5?',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Choose the diagram that shows the shape in the first picture flipped over the dotted line.',
                figure: 'tests/w4d1-tys2-q8.svg',
                figureAlt:
                  'A corner shape beside a dotted line, and four answer cards A to D',
                figureWidth: 300,
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Choose the diagram that shows the shape in the first picture flipped over the dotted line.',
                figure: 'tests/w4d1-tys2-q9.svg',
                figureAlt:
                  'A triangle above a dotted line, and four answer cards A to D',
                figureWidth: 380,
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'This arrow is being turned. Write the letter that matches what the arrow will look like if it is turned a full turn.',
                figure: 'tests/w4d1-tys2-arrows.svg',
                figureAlt:
                  'An arrow pointing right. A points up, B points left, C points down, D points right.',
                figureWidth: 360,
              },
              { type: 'short', n: '11', prompt: '… half a turn.' },
              { type: 'short', n: '12', prompt: '… a quarter turn clockwise.' },
              {
                type: 'short',
                n: '13',
                prompt: '… a quarter turn anticlockwise.',
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
                  'This is a plan of Jan’s farm. What is between the cow paddock and the shed?',
                options: ['house', 'dam', 'cattle yard', 'stables'],
                figure: 'tests/w4d1-rt-q1.svg',
                figureAlt:
                  'Farm plan: the shed and cattle yard are top left, the house bottom left, the cow paddock top right with a dam, the stables and horse paddock bottom right. The cattle yard is between the shed and the cow paddock.',
                figureWidth: 380,
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Which of these shapes will look the same when flipped over the dotted line? Choose all possible answers (write the letters).',
                figure: 'tests/w4d1-rt-q2.svg',
                figureAlt:
                  'Six shapes beside dotted lines: A notched rectangle, B sideways T, C octagon, D right-angled triangle, E letter H, F upside-down T',
                figureWidth: 440,
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'Which shape is at F2?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q3.svg',
                figureAlt: 'A grid with a smiley, a flag, a cup and a bow tie',
                figureWidth: 330,
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Elly turns this card half a turn. What does it look like now?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q4.svg',
                figureAlt:
                  'A card with an upside-down F, and four answer cards',
                figureWidth: 300,
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Cam is playing a game. He slides his counter 3 squares right. Which shows Cam’s counter after the slide?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q5.svg',
                figureAlt: 'A grid with a counter, and four answer grids',
                figureWidth: 400,
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'Lucy folded this paper on the dotted line. She cut out a shape. Which is Lucy’s paper when opened out?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q6.svg',
                figureAlt:
                  'Folded paper with a cut at the fold, and four opened-out papers',
                figureWidth: 300,
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'Some tools are on a board. The hammer is at B2. Where is the saw?',
                figure: 'tests/w4d1-rt-q7.svg',
                figureAlt:
                  'A board with columns A to D and rows 1 to 4: a saw, a hammer, a spanner and pliers',
                figureWidth: 360,
              },
              {
                type: 'mcq',
                n: '8',
                prompt:
                  'This arrow looks like this after a quarter turn in a clockwise direction. What will the straight arrow look like after a quarter turn in a clockwise direction?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q8.svg',
                figureAlt:
                  'Example bent arrow turned a quarter turn; a straight arrow pointing up and to the right; four answer arrows',
                figureWidth: 320,
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'Billy made this shape. Which of these is Billy’s shape?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q9.svg',
                figureAlt:
                  'Billy’s shape made of squares, one shaded and one with a dot, and four answer shapes',
                figureWidth: 420,
              },
              {
                type: 'mcq',
                n: '10',
                prompt:
                  'Nat is second from the left in this picture. Which is Nat?',
                options: ['A', 'B', 'C', 'D'],
                row: true,
                figure: 'tests/w4d1-rt-q10.svg',
                figureAlt: 'Five faces in a row, and four answer faces',
                figureWidth: 340,
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
              'This table shows the number of races some students won at a swimming carnival.',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt: 'How many races did Bella win?',
                numeric: true,
                figure: 'tests/w4d2-tys1-races.svg',
                figureAlt: 'Races won: Max 3, Ben 7, Bella 5, Tara 4, Jack 2',
                figureWidth: 250,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'Which student won exactly 4 races?',
              },
              { type: 'short', n: '3', prompt: 'Who won the most races?' },
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
            questions: [
              {
                type: 'short',
                n: '6',
                prompt:
                  'Some students voted for their favourite fruit. How many voted for apple?',
                numeric: true,
                figure: 'tests/w4d2-tys1-fruit.svg',
                figureAlt:
                  'Column graph of favourite fruit: apple 9, banana 12, orange 7, peach 5, plum 1',
                figureWidth: 380,
              },
              {
                type: 'short',
                n: '7',
                prompt: 'Which fruit did exactly 7 students vote for?',
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
                numeric: true,
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'How many more students voted for banana than for peach?',
                numeric: true,
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Some students chose their favourite animal at the zoo. How many students chose elephant?',
                numeric: true,
                figure: 'tests/w4d2-tys1-zoo.svg',
                figureAlt:
                  'Picture graph, each paw is 1 student: lion 5, tiger 3, elephant 4, koala 6, gorilla 7',
                figureWidth: 330,
              },
              {
                type: 'short',
                n: '12',
                prompt: 'Which animal did exactly 5 students choose?',
              },
              {
                type: 'short',
                n: '13',
                prompt: 'Which animal was chosen by the most students?',
              },
              {
                type: 'short',
                n: '14',
                prompt: 'How many students chose lion and tiger altogether?',
                numeric: true,
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
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Students voted for their favourite football team. How many votes did the Lions get?',
                numeric: true,
                figure: 'tests/w4d2-tys2-football.svg',
                figureAlt:
                  'Picture graph, each football is 2 votes: Rams 3 balls, Sharks 5, Bears 2 and a half, Lions 4, Bulls 4 and a half',
                figureWidth: 330,
              },
              {
                type: 'short',
                n: '2',
                prompt: 'How many votes does half a football stand for?',
                numeric: true,
                figure: 'tests/w4d2-tys2-half-ball.svg',
                figureAlt: 'Half a football',
                figureWidth: 44,
              },
              {
                type: 'short',
                n: '3',
                prompt: 'How many votes did the Bulls get?',
                numeric: true,
              },
              {
                type: 'short',
                n: '4',
                prompt: 'Which team got exactly 5 votes?',
              },
              {
                type: 'short',
                n: '5',
                prompt: 'This spinner is spun. Which colour is most likely?',
                figure: 'tests/w4d2-tys2-spinner.svg',
                figureAlt:
                  'Spinner: white is the biggest part, then green, then blue, and red is the smallest',
                figureWidth: 160,
              },
              {
                type: 'short',
                n: '6',
                prompt: 'Which colour is least likely?',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'This is a dice. It has the numbers from 1 to 6 on its faces, one number on each face. Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets 1.',
                figure: 'tests/w4d2-tys2-dice.svg',
                figureAlt: 'A dice',
                figureWidth: 80,
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets less than 1.',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets more than 1.',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets 7.',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Jess rolls this dice in a game. Choose one of these words — likely, unlikely, impossible, certain — to describe the chance that Jess gets less than 7.',
              },
              {
                type: 'short',
                n: '12',
                prompt: 'What number does tally 12 show?',
                numeric: true,
                figure: 'tests/w4d2-tys2-tally.svg',
                figureAlt:
                  'Tally marks: 12 shows 3 marks, 13 shows a bundle of 5, 14 shows a bundle of 5 and 4 more, 15 shows four bundles of 5',
                figureWidth: 200,
              },
              {
                type: 'short',
                n: '13',
                prompt: 'What number does tally 13 show?',
                numeric: true,
              },
              {
                type: 'short',
                n: '14',
                prompt: 'What number does tally 14 show?',
                numeric: true,
              },
              {
                type: 'short',
                n: '15',
                prompt: 'What number does tally 15 show?',
                numeric: true,
              },
            ],
          },
          {
            heading: 'Real Test',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Some students voted for their favourite movies. How many more students voted for Kangaroos than voted for Old Dogs?',
                numeric: true,
                figure: 'tests/w4d2-rt-q1.svg',
                figureAlt:
                  'Favourite movie votes: Good Times 7, Old Dogs 10, Red and Blue 8, Kangaroos 13',
                figureWidth: 280,
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'This dish holds some jelly beans. Which describes the chance of taking a green jelly bean from this dish?',
                options: ['impossible', 'unlikely', 'likely', 'certain'],
                figure: 'tests/w4d2-rt-q2.svg',
                figureAlt:
                  'A dish of 10 jelly beans: 3 black, 4 red, 2 yellow, 1 green',
                figureWidth: 340,
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'This graph shows the number of hours Mr Lee spent at work this week. On what day did Mr Lee spend exactly 5 hours at work?',
                options: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
                figure: 'tests/w4d2-rt-q3.svg',
                figureAlt:
                  'Picture graph, each clock is 1 hour: Monday 3, Tuesday 5, Wednesday 3 and a half, Thursday 7, Friday 6',
                figureWidth: 300,
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'This graph shows the number of cars of different colours in a car park. Which is correct? Select all possible answers (write the letters).\nA There were more black cars than silver cars.\nB There were more red cars than black cars.\nC There were more blue cars than white cars.\nD There were more silver cars than blue cars.',
                figure: 'tests/w4d2-rt-q4.svg',
                figureAlt:
                  'Column graph of car colours: white 12, red 6, blue 5, silver 8, black 3',
                figureWidth: 380,
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Some students voted for class captain. How many students voted for Mia?',
                options: ['0', '4', '5', '6'],
                figure: 'tests/w4d2-rt-q5.svg',
                figureAlt:
                  'Tally chart: Ahmed 7, Billy 4, Mia 5, Jenny 3, Xavier 6',
                figureWidth: 220,
              },
              {
                type: 'mcq',
                n: '6',
                prompt: 'On which number is this spinner most likely to stop?',
                options: ['1', '2', '3', '4'],
                row: true,
                figure: 'tests/w4d2-rt-q6.svg',
                figureAlt:
                  'Spinner: 3 is half of it, 1 is a quarter, 2 and 4 are small parts',
                figureWidth: 130,
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'This table shows the number of boys and girls in three classes. How many children are in 2P?',
                numeric: true,
                figure: 'tests/w4d2-rt-q7.svg',
                figureAlt:
                  'Class 2K: 13 boys, 14 girls. 2P: 15 boys, 11 girls. 2Y: 12 boys, 12 girls.',
                figureWidth: 250,
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'This graph shows the number of cherries some students ate. How many cherries did Jill eat?',
                numeric: true,
                figure: 'tests/w4d2-rt-q8.svg',
                figureAlt:
                  'Picture graph, each cherry picture is 2 cherries: Mike 3 and a half, Jill 6, Alice 2 and a half, Roy 4 and a half',
                figureWidth: 270,
              },
              {
                type: 'mcq',
                n: '9',
                prompt:
                  'These dice are rolled and the numbers added together. Which is impossible?',
                options: ['1', '5', '9', '11'],
                row: true,
                figure: 'tests/w4d2-rt-q9.svg',
                figureAlt: 'Two dice',
                figureWidth: 130,
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Some students counted birds. How many birds did Sid and Eli count altogether?',
                numeric: true,
                figure: 'tests/w4d2-rt-q10.svg',
                figureAlt:
                  'Birds counted: Sid 8, Dana 5, Ruby 2, Nat 9, Eli 4, Sam 6',
                figureWidth: 420,
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
            instructions:
              'Answer the questions below and then use a dictionary to check your spelling. Write the plurals of these nouns.',
            questions: [
              { type: 'short', n: '1', prompt: 'bird' },
              { type: 'short', n: '2', prompt: 'peach' },
              { type: 'short', n: '3', prompt: 'body' },
              { type: 'short', n: '4', prompt: 'child' },
              { type: 'short', n: '5', prompt: 'man' },
              { type: 'short', n: '6', prompt: 'sheep' },
              { type: 'short', n: '7', prompt: 'mango' },
              { type: 'short', n: '8', prompt: 'whale' },
              { type: 'short', n: '9', prompt: 'bench' },
              { type: 'short', n: '10', prompt: 'baby' },
              { type: 'short', n: '11', prompt: 'mouse' },
              { type: 'short', n: '12', prompt: 'woman' },
              { type: 'short', n: '13', prompt: 'fish' },
              { type: 'short', n: '14', prompt: 'potato' },
              { type: 'short', n: '15', prompt: 'teacher' },
              { type: 'short', n: '16', prompt: 'lunch' },
              { type: 'short', n: '17', prompt: 'chilli' },
              { type: 'short', n: '18', prompt: 'foot' },
              { type: 'short', n: '19', prompt: 'tooth' },
              { type: 'short', n: '20', prompt: 'rice' },
              { type: 'short', n: '21', prompt: 'tomato' },
            ],
          },
          {
            heading: 'Spelling — Singular nouns',
            instructions: 'Write the singular for these nouns.',
            questions: [
              { type: 'short', n: '1', prompt: 'races' },
              { type: 'short', n: '2', prompt: 'doctors' },
              { type: 'short', n: '3', prompt: 'toothbrushes' },
              { type: 'short', n: '4', prompt: 'geese' },
              { type: 'short', n: '5', prompt: 'days' },
              { type: 'short', n: '6', prompt: 'dingoes' },
              { type: 'short', n: '7', prompt: 'people' },
              { type: 'short', n: '8', prompt: 'fairies' },
              { type: 'short', n: '9', prompt: 'puppies' },
              { type: 'short', n: '10', prompt: 'shoes' },
              { type: 'short', n: '11', prompt: 'foxes' },
              { type: 'short', n: '12', prompt: 'ponies' },
            ],
          },
          {
            heading: 'Spelling — Prefix “un”',
            instructions:
              'Use the prefix ‘un’ to write opposites for these words.',
            questions: [
              { type: 'short', n: '1', prompt: 'cover' },
              { type: 'short', n: '2', prompt: 'available' },
              { type: 'short', n: '3', prompt: 'clean' },
              { type: 'short', n: '4', prompt: 'eaten' },
              { type: 'short', n: '5', prompt: 'usual' },
              { type: 'short', n: '6', prompt: 'tidy' },
              { type: 'short', n: '7', prompt: 'believable' },
              { type: 'short', n: '8', prompt: 'finished' },
              { type: 'short', n: '9', prompt: 'decided' },
              { type: 'short', n: '10', prompt: 'dress' },
              { type: 'short', n: '11', prompt: 'likely' },
              { type: 'short', n: '12', prompt: 'done' },
            ],
          },
          {
            heading: 'Spelling — Suffixes',
            instructions:
              'Add the suffixes to the following words. Write the new words.',
            questions: [
              { type: 'short', n: '1', prompt: 'help + ful' },
              { type: 'short', n: '2', prompt: 'hope + ful' },
              { type: 'short', n: '3', prompt: 'care + ful' },
              { type: 'short', n: '4', prompt: 'help + less' },
              { type: 'short', n: '5', prompt: 'hope + less' },
              { type: 'short', n: '6', prompt: 'care + less' },
              { type: 'short', n: '7', prompt: 'help + ing' },
              { type: 'short', n: '8', prompt: 'hope + ing' },
              { type: 'short', n: '9', prompt: 'care + ing' },
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
                prompt: 'Li chopped the ______ for dinner.',
                word: 'potatoes',
              },
              {
                type: 'dictation',
                n: '2',
                prompt: 'Maya put lots of ______ in the salad.',
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
                prompt: 'Both of my ______ hurt after the race.',
                word: 'feet',
              },
              {
                type: 'dictation',
                n: '6',
                prompt: 'All the ______ cried at the same time.',
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
              'Each sentence has one word that is incorrect (shown in *stars*). Write the correct spelling of that word.',
            questions: [
              {
                type: 'short',
                n: '19',
                prompt: 'That chair is *unncomfortable*.',
              },
              {
                type: 'short',
                n: '20',
                prompt: 'My shoes always come *unndone*.',
              },
              {
                type: 'short',
                n: '21',
                prompt: 'Katy’s work was *unfinisht*.',
              },
              {
                type: 'short',
                n: '22',
                prompt: 'The teacher said to *unnfold* the paper.',
              },
              {
                type: 'short',
                n: '23',
                prompt: 'Be *carefull* crossing the road.',
              },
              {
                type: 'short',
                n: '24',
                prompt: 'Kara is *helpping* Mindi with her story.',
              },
              {
                type: 'short',
                n: '25',
                prompt: 'The child was *careliss* with her bike.',
              },
              {
                type: 'short',
                n: '26',
                prompt: 'My sister is *hopeliss* at cleaning her room.',
              },
            ],
          },
          {
            heading: 'Spelling — Find the incorrect word yourself',
            instructions:
              'Each line has one word that is incorrect. Find it and write the correct spelling.',
            questions: [
              {
                type: 'short',
                n: '27',
                prompt: 'The gardnor mowed the grass.',
              },
              { type: 'short', n: '28', prompt: 'The runnor hurt her foot.' },
              {
                type: 'short',
                n: '29',
                prompt: 'The cyclest fell off his bike.',
              },
              {
                type: 'short',
                n: '30',
                prompt: 'Mum bought flowers from the florest.',
              },
              {
                type: 'short',
                n: '31',
                prompt: 'My dentest rides her bike to work.',
              },
              {
                type: 'short',
                n: '32',
                prompt: 'Our local bakor makes delicious bread rolls.',
              },
              {
                type: 'short',
                n: '33',
                prompt: 'The docter looked at my tonsils.',
              },
              {
                type: 'short',
                n: '34',
                prompt: 'The plumba fixed our leaking roof.',
              },
              { type: 'short', n: '35', prompt: 'Mr Chen is my teacha.' },
            ],
          },
          {
            heading:
              'Grammar & Punctuation — Adverbs, pronouns and comparatives',
            questions: [
              {
                type: 'short',
                n: '1',
                prompt:
                  'Choose an adverb from the box (loudly, happily, quickly, kindly) that means the opposite of: slowly',
              },
              {
                type: 'short',
                n: '2',
                prompt:
                  'Choose an adverb from the box (loudly, happily, quickly, kindly) that means the opposite of: quietly',
              },
              {
                type: 'short',
                n: '3',
                prompt:
                  'Choose an adverb from the box (loudly, happily, quickly, kindly) that means the opposite of: sadly',
              },
              {
                type: 'short',
                n: '4',
                prompt:
                  'Choose an adverb from the box (loudly, happily, quickly, kindly) that means the opposite of: angrily',
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'Choose a pronoun to complete the sentence. “Tim and Elli are in the library. ______ are reading.”',
                options: ['They', 'Them', 'Us', 'We'],
              },
              {
                type: 'short',
                n: '6',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The lizard flicked its tongue out *quick*.',
              },
              {
                type: 'short',
                n: '7',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: Possums climb *good*.',
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The turtle crawled *slow*.',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The parrot cracked the seed *easy*.',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The turtle snapped *hungry* at the fish.',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The page was *bad* torn.',
              },
              {
                type: 'short',
                n: '12',
                prompt:
                  'The HOW adverb is written incorrectly. Write it correctly: The lorikeet squawked *loud*.',
              },
              {
                type: 'mcq',
                n: '13',
                prompt:
                  'Choose a word or words to complete the sentence. “Which painting is ______?”',
                options: [
                  'colour fullest',
                  'the most colourful',
                  'colour-fuller',
                  'colouring',
                ],
              },
              {
                type: 'mcq',
                n: '14',
                prompt:
                  'Choose an adjective to complete the sentence. “My bag is ______ than yours,” said Frank.',
                options: ['heavy', 'heaviest', 'heavily', 'heavier'],
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Write a personal pronoun from the box (she, them, it, We) to complete the sentence: Shane is my best friend. ______ play soccer together.',
              },
              {
                type: 'short',
                n: '16',
                prompt:
                  'Write a personal pronoun from the box (she, them, it, We) to complete the sentence: Pass the ball to Leanne so ______ can kick the goal.',
              },
              {
                type: 'short',
                n: '17',
                prompt:
                  'Write a personal pronoun from the box (she, them, it, We) to complete the sentence: The children had worked well so the teacher gave ______ a surprise.',
              },
              {
                type: 'short',
                n: '18',
                prompt:
                  'Write a personal pronoun from the box (she, them, it, We) to complete the sentence: The dog was barking so I told ______ to be quiet.',
              },
            ],
          },
          {
            heading: 'Grammar & Punctuation — Real Test',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt:
                  'Which word best completes the sentence? “The goanna walked ______.”',
                options: ['lost', 'loud', 'soft', 'softly'],
              },
              {
                type: 'mcq',
                n: '2',
                prompt:
                  'Which word best completes the sentence? “The beetle munched ______.”',
                options: ['noisily', 'thickly', 'thinly', 'crunching'],
              },
              {
                type: 'mcq',
                n: '3',
                prompt:
                  'Which word best completes the sentence? “Smile ______ for the class photo.”',
                options: ['wrongly', 'nicely', 'hopefully', 'loudly'],
              },
              {
                type: 'mcq',
                n: '4',
                prompt:
                  'Which word best completes the sentence? “Hit the nail ______ with the hammer.”',
                options: ['fast', 'carefully', 'hungrily', 'quick'],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'That is Jack’s book. Give it to him. In this sentence the word “it” is used instead of',
                options: ['Jack.', 'him.', 'the book.', 'a handshake.'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'These shoes are full of mud. Clean them. In this sentence the word “them” is used instead of',
                options: ['mud.', 'Jack.', 'these shoes.', 'cleaning.'],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'Which word or words tell how you would pat a kitten?',
                options: ['outside', 'then', 'in the dark', 'gently'],
              },
              {
                type: 'short',
                n: '8',
                prompt:
                  'Choose a word from the box (him, They, I, me) to complete the sentence: I asked Kia to come to the park with ______.',
              },
              {
                type: 'short',
                n: '9',
                prompt:
                  'Choose a word from the box (him, They, I, me) to complete the sentence: Liam sits next to me so I help ______ with maths.',
              },
              {
                type: 'short',
                n: '10',
                prompt:
                  'Choose a word from the box (him, They, I, me) to complete the sentence: Koalas are marsupials. ______ eat eucalyptus leaves.',
              },
              {
                type: 'short',
                n: '11',
                prompt:
                  'Choose a word from the box (him, They, I, me) to complete the sentence: My name is Zac. ______ live in Padstow.',
              },
              {
                type: 'mcq',
                n: '12',
                prompt:
                  'Which word correctly completes the sentence? “Some people like cats ______ than dogs.”',
                options: ['best', 'better', 'more better', 'good'],
              },
              {
                type: 'short',
                n: '13',
                prompt:
                  'Choose a word from the box (biggest, big, bigger) for the sentence: That elephant is ______.',
              },
              {
                type: 'short',
                n: '14',
                prompt:
                  'Choose a word from the box (biggest, big, bigger) for the sentence: The red balloon is ______ than the green balloon.',
              },
              {
                type: 'short',
                n: '15',
                prompt:
                  'Choose a word from the box (biggest, big, bigger) for the sentence: The blue balloon is the ______ of them all.',
              },
              {
                type: 'mcq',
                n: '16',
                prompt:
                  'Which word or words correctly complete the sentence? “This yoghurt tastes ______ than that yoghurt.”',
                options: ['best', 'better', 'more best', 'more good'],
              },
              {
                type: 'mcq',
                n: '17',
                prompt:
                  'Which word correctly completes the sentence? “My sister ran ______ in the race.”',
                options: ['great', 'well', 'good', 'wonderful'],
              },
              {
                type: 'mcq',
                n: '18',
                prompt:
                  'Which word correctly completes the sentence? “A carpet snake lived ______ in our roof.”',
                options: ['quiet', 'silent', 'quietly', 'quitly'],
              },
              {
                type: 'mcq',
                n: '19',
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
                  'Which word or words correctly complete the sentence? “I am the ______ runner in the class,” said Paulo.',
                options: ['fastest', 'faster', 'most fast', 'more fast'],
              },
              {
                type: 'mcq',
                n: '21',
                prompt:
                  'Which word correctly completes the sentence? “The kookaburra sang ______.”',
                options: ['loud', 'loudly', 'silently', 'happy'],
              },
              {
                type: 'mcq',
                n: '22',
                prompt:
                  'Which word correctly completes the sentence? “Are you going to the park? Can I come with ______?”',
                options: ['them', 'him', 'she', 'you'],
              },
              {
                type: 'mcq',
                n: '23',
                prompt:
                  'Which word correctly completes the sentence? “This pencil belongs to Lara. Give it to ______.”',
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
                  'Which word correctly completes the sentence? “Mum said the battery was ______.”',
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
            heading: 'Reading: Be kind to possums',
            instructions: 'Read the text, then choose the correct answer.',
            passage:
              'Be kind to possums\n\nBrush-tailed possums are common in Australia. They live in the bush and in people’s backyards. They prefer to live in hollow trees but they also make their homes in people’s roofs. Many people don’t like having a possum in the roof.\n\nSometimes people trap the possum in the roof and set it free somewhere else. But this is a problem for the possum. Possums are territorial, which means they have an area that they call their own. They do not let new possums come into their area. They chase away any new possums. Possums usually die when people move them out of their own territory. They starve. I think that is very sad.\n\nIf you have an unwelcome possum in your roof, the best thing to do is to build a possum-house in a tree in your own backyard. You can attract the possum to the possum-house using bananas. Possums love bananas. Once the possum is out of your roof and in its new house you can cover over any holes in your roof. Then it won’t be able to get back inside your roof.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'The word ‘common’ in the text means',
                options: [
                  'there are many of them.',
                  'there are only a few of them.',
                  'they only live in Australia.',
                  'they are rare.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'The best place for a possum to live is in',
                options: [
                  'a roof.',
                  'a hollow tree.',
                  'a possum-house.',
                  'a zoo.',
                ],
              },
              {
                type: 'mcq',
                n: '3',
                prompt: 'What does ‘Possums are territorial’ mean?',
                options: [
                  'Possums don’t like sharing their area with new possums.',
                  'Possums have homes everywhere.',
                  'Possums always live alone.',
                  'Possums can’t find a new place to live and so they die.',
                ],
              },
              {
                type: 'mcq',
                n: '4',
                prompt: 'Where should you build a possum-house?',
                options: [
                  'in a neighbour’s roof',
                  'in a backyard tree',
                  'in the forest',
                  'in your roof',
                ],
              },
              {
                type: 'mcq',
                n: '5',
                prompt:
                  'How does the writer feel when possums are moved out of their own territory?',
                options: ['sad', 'pleased', 'angry', 'hungry'],
              },
              {
                type: 'mcq',
                n: '6',
                prompt:
                  'The text says you should cover over holes in your roof',
                options: [
                  'so rain can’t get in.',
                  'so the possum can’t get out.',
                  'so the possum dies of starvation.',
                  'so the possum can’t get back inside.',
                ],
              },
              {
                type: 'mcq',
                n: '7',
                prompt: 'What is the writer’s purpose in the text?',
                options: [
                  'to describe possums',
                  'to tell how to catch a possum',
                  'to give opinions about possums',
                  'to tell you how to make a possum-house',
                ],
              },
            ],
          },
          {
            heading: 'Reading: Circuses are NOT good for animals',
            instructions: 'Read the argument, then choose the correct answer.',
            passage:
              'Circuses are NOT good for animals\n\nI don’t like circuses that use animals.\n\nI feel sorry for the animals in circuses. Lions, tigers and elephants don’t belong in circuses. They need room to roam around. They should not be kept in cages. They should not be made to do tricks. They belong in the wild.\n\nSome people think that it’s all right to use animals such as horses in circuses. I disagree. Circuses drive around from one place to the next. The horses wouldn’t like being driven around in a truck for hours and hours. That’s not fair.\n\nI don’t think circuses should use any animals at all. Circuses should just have human performers. In Circus Oz, the Flying Fruit Fly Circus and Cirque du Soleil the humans do the tricks and perform. I love these kinds of circuses. I love the trapeze, trampolining, juggling and stilt walking. My favourite act is the flying trapeze. It is so much fun to watch.\n\nHuman circuses are entertaining. Animal circuses are cruel. Some countries don’t let circuses use lions, tigers or elephants. I am happy about that.\n\nSanjay, age 10',
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
              'Be a winner with APPLE POWER\n\ncrisp\ncrunchy\njuicy\nshiny\ngreen\nor red\napples\n\n“So kids — what are you waiting for? Go bite into an apple NOW!”\n\nAll you need to do is eat an apple a day and the benefits will be\n• a healthy body helping you WIN at sports\n• better teeth — a WINNING smile\n• a healthy brain — WIN all those computer games\n• more friends — a WINNING personality\n\nThink of the planet\nApples have sustainable packaging — eat the skin or recycle it: No waste.',
            questions: [
              {
                type: 'mcq',
                n: '1',
                prompt: 'What does the text tell people to do every day?',
                options: [
                  'Be a winner.',
                  'Eat an apple.',
                  'Win games.',
                  'Think of the planet.',
                ],
              },
              {
                type: 'mcq',
                n: '2',
                prompt: 'Who is the advertisement for?',
                options: ['parents', 'children', 'apples', 'pirates'],
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
                prompt: '“crisp, crunchy, juicy” — The text says this',
                options: [
                  'to make you want to eat an apple.',
                  'to tell you what apples look like.',
                  'to show that apples are healthy.',
                  'to show what apples are made of.',
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
