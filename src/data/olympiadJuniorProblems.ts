// Junior Maths Olympiad problem bank (≈ Year 2/3, SASMO/AMO Junior style).
// Parameterized generators are correct by construction; curated logic puzzles
// have hand-checked answers and worked solutions.

export type OlympiadCategory = 'patterns' | 'grids' | 'logic' | 'word' | 'mix';

export interface OlympiadProblem {
  category: Exclude<OlympiadCategory, 'mix'>;
  question: string;
  /** optional grid to render as a table */
  grid?: string[][];
  answer: string;
  working: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── Number patterns (find the next two) ──────────────────────────────────────
function patternMultiplyIncreasing(): OlympiadProblem {
  const s = rand(2, 4);
  const seq = [s];
  for (let f = 2; f <= 6; f++) seq.push(seq[seq.length - 1] * f);
  const shown = seq.slice(0, 4);
  return {
    category: 'patterns',
    question: `Find the next two numbers in the pattern:\n${shown.join(',  ')},  ___ ,  ___`,
    answer: `${seq[4]}, ${seq[5]}`,
    working: `Each number is multiplied by the next counting number (×2, ×3, ×4, ×5, ×6).\n${seq[3]} × 5 = ${seq[4]}\n${seq[4]} × 6 = ${seq[5]}`,
  };
}

function patternGrowingDifference(): OlympiadProblem {
  const s = rand(1, 6);
  const d0 = rand(1, 3);
  const seq = [s];
  const diffs: number[] = [];
  let diff = d0;
  for (let i = 0; i < 5; i++) {
    diffs.push(diff);
    seq.push(seq[seq.length - 1] + diff);
    diff++;
  }
  const shown = seq.slice(0, 4);
  return {
    category: 'patterns',
    question: `Find the next two numbers:\n${shown.join(',  ')},  ___ ,  ___`,
    answer: `${seq[4]}, ${seq[5]}`,
    working: `The gaps grow by 1 each time: +${diffs.join(', +')}.\n${seq[3]} + ${diffs[3]} = ${seq[4]}\n${seq[4]} + ${diffs[4]} = ${seq[5]}`,
  };
}

function patternFibonacci(): OlympiadProblem {
  const a = rand(1, 4);
  const b = rand(2, 6);
  const seq = [a, b];
  for (let i = 0; i < 4; i++) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  const shown = seq.slice(0, 4);
  return {
    category: 'patterns',
    question: `Each number is the sum of the two before it. Find the next two:\n${shown.join(',  ')},  ___ ,  ___`,
    answer: `${seq[4]}, ${seq[5]}`,
    working: `Add the two previous numbers.\n${seq[2]} + ${seq[3]} = ${seq[4]}\n${seq[3]} + ${seq[4]} = ${seq[5]}`,
  };
}

function patternSquares(): OlympiadProblem {
  const start = rand(1, 3);
  const ns = Array.from({ length: 6 }, (_, i) => start + i);
  const seq = ns.map(n => n * n);
  const shown = seq.slice(0, 4);
  return {
    category: 'patterns',
    question: `Find the next two numbers:\n${shown.join(',  ')},  ___ ,  ___`,
    answer: `${seq[4]}, ${seq[5]}`,
    working: `These are square numbers (a number times itself).\n${ns[4]} × ${ns[4]} = ${seq[4]}\n${ns[5]} × ${ns[5]} = ${seq[5]}`,
  };
}

function patternDoublePlusOne(): OlympiadProblem {
  const s = rand(1, 3);
  const seq = [s];
  for (let i = 0; i < 5; i++) seq.push(seq[seq.length - 1] * 2 + 1);
  const shown = seq.slice(0, 4);
  return {
    category: 'patterns',
    question: `Find the next two numbers:\n${shown.join(',  ')},  ___ ,  ___`,
    answer: `${seq[4]}, ${seq[5]}`,
    working: `Each number is doubled, then add 1 (×2, then +1).\n${seq[3]} × 2 + 1 = ${seq[4]}\n${seq[4]} × 2 + 1 = ${seq[5]}`,
  };
}

const PATTERN_GENS = [
  patternMultiplyIncreasing,
  patternGrowingDifference,
  patternFibonacci,
  patternSquares,
  patternDoublePlusOne,
];

// ─── Grid patterns (find the ?) ───────────────────────────────────────────────
function gridRowSum(): OlympiadProblem {
  const rows = Array.from({ length: 3 }, () => {
    const a = rand(1, 9), b = rand(1, 9), c = rand(1, 9);
    return [a, b, c, a + b + c];
  });
  const ans = rows[2][3];
  const grid = rows.map((row, i) =>
    i < 2 ? row.map(String) : [String(row[0]), String(row[1]), String(row[2]), '?']
  );
  return {
    category: 'grids',
    question: 'In each row the last number follows the same rule. Find the missing number (?).',
    grid,
    answer: String(ans),
    working: `The last number is the sum of the first three in the row.\nRow 3: ${rows[2][0]} + ${rows[2][1]} + ${rows[2][2]} = ${ans}`,
  };
}

function gridRowProduct(): OlympiadProblem {
  const rows = Array.from({ length: 3 }, () => {
    const a = rand(2, 6), b = rand(2, 6);
    return [a, b, a * b];
  });
  const ans = rows[2][2];
  const grid = rows.map((row, i) =>
    i < 2 ? row.map(String) : [String(row[0]), String(row[1]), '?']
  );
  return {
    category: 'grids',
    question: 'Find the missing number (?) using the same rule in every row.',
    grid,
    answer: String(ans),
    working: `The last number is the first two multiplied together.\nRow 3: ${rows[2][0]} × ${rows[2][1]} = ${ans}`,
  };
}

function gridMixedOp(): OlympiadProblem {
  const rows = Array.from({ length: 3 }, () => {
    const a = rand(2, 6), b = rand(2, 6), c = rand(1, 9);
    return [a, b, c, a * b + c];
  });
  const ans = rows[2][3];
  const grid = rows.map((row, i) =>
    i < 2 ? row.map(String) : [String(row[0]), String(row[1]), String(row[2]), '?']
  );
  return {
    category: 'grids',
    question: 'Each row uses the same rule. Find the missing number (?).',
    grid,
    answer: String(ans),
    working: `Rule: multiply the first two, then add the third.\nRow 3: ${rows[2][0]} × ${rows[2][1]} + ${rows[2][2]} = ${ans}`,
  };
}

const GRID_GENS = [gridRowSum, gridRowProduct, gridMixedOp];

// ─── Word problems (multi-step) ───────────────────────────────────────────────
function wordAnimalLegs(): OlympiadProblem {
  // build forwards so the answer is a whole number
  const cows = rand(3, 8);
  const hens = rand(3, 8);
  const total = cows + hens;
  const legs = cows * 4 + hens * 2;
  return {
    category: 'word',
    question: `A farm has ${total} animals — cows and hens. Altogether they have ${legs} legs. How many cows are there?`,
    answer: String(cows),
    working: `If all ${total} were hens, that's ${total} × 2 = ${total * 2} legs.\nThere are ${legs} − ${total * 2} = ${legs - total * 2} extra legs.\nEach cow adds 2 extra legs, so cows = ${legs - total * 2} ÷ 2 = ${cows}.`,
  };
}

function wordConsecutiveSum(): OlympiadProblem {
  const middle = rand(5, 30);
  const sum = (middle - 1) + middle + (middle + 1);
  return {
    category: 'word',
    question: `Three numbers in a row (consecutive) add up to ${sum}. What is the middle number?`,
    answer: String(middle),
    working: `The middle number is the total shared into 3 equal parts.\n${sum} ÷ 3 = ${middle}.\nCheck: ${middle - 1} + ${middle} + ${middle + 1} = ${sum}.`,
  };
}

function wordSharingRemainder(): OlympiadProblem {
  const kids = rand(3, 6);
  const each = rand(4, 9);
  const left = rand(1, kids - 1);
  const total = kids * each + left;
  return {
    category: 'word',
    question: `${total} sweets are shared equally among ${kids} children. Each child gets the same amount and some are left over. How many sweets are left over?`,
    answer: String(left),
    working: `${total} ÷ ${kids} = ${each} each, with ${left} left over.\n(${kids} × ${each} = ${kids * each}, and ${total} − ${kids * each} = ${left}.)`,
  };
}

function wordHandshakes(): OlympiadProblem {
  const n = rand(4, 8);
  const ans = (n * (n - 1)) / 2;
  return {
    category: 'word',
    question: `${n} friends meet. Each one shakes hands with every other person exactly once. How many handshakes happen?`,
    answer: String(ans),
    working: `Each of the ${n} people shakes ${n - 1} hands, but every handshake is counted twice.\n${n} × ${n - 1} ÷ 2 = ${ans}.`,
  };
}

function wordDoublingDays(): OlympiadProblem {
  const start = rand(2, 4);
  const days = 4;
  const seq = [start];
  for (let i = 1; i < days; i++) seq.push(seq[i - 1] * 2);
  return {
    category: 'word',
    question: `A plant is ${start} cm tall and doubles its height each day. How tall is it after ${days - 1} more days?`,
    answer: `${seq[days - 1]} cm`,
    working: `Double each day: ${seq.join(' → ')}.\nAfter ${days - 1} days it is ${seq[days - 1]} cm.`,
  };
}

const WORD_GENS = [wordAnimalLegs, wordConsecutiveSum, wordSharingRemainder, wordHandshakes, wordDoublingDays];

// ─── Curated logic puzzles (answers hand-checked) ─────────────────────────────
const LOGIC_PUZZLES: OlympiadProblem[] = [
  {
    category: 'logic',
    question: 'How can you put 55 balls into 10 boxes so that each box has a different number of balls?',
    answer: 'Put 1, 2, 3, 4, 5, 6, 7, 8, 9 and 10 balls in the boxes.',
    working: 'You need 10 different whole numbers that add up to 55.\n1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55.\nSo the boxes hold 1 to 10 balls.',
  },
  {
    category: 'logic',
    question: 'I am a 2-digit number. My digits add up to 12, and I am the SMALLEST number that works. What am I?',
    answer: '39',
    working: 'To be smallest, make the tens digit as small as possible.\nTens = 3 needs ones = 9 (3 + 9 = 12). That gives 39.\n(Tens = 1 or 2 cannot work: 1 needs 11, 2 needs 10 — not single digits.)',
  },
  {
    category: 'logic',
    question: 'What is the smallest number that can be divided exactly by 2, 3, 4, 5 and 6 (no remainder)?',
    answer: '60',
    working: 'Find the smallest number all of them divide into.\n4 needs it to be a multiple of 4, and it must also be a multiple of 3 and 5.\n4 × 3 × 5 = 60, and 60 ÷ 2, ÷3, ÷4, ÷5, ÷6 are all whole numbers.',
  },
  {
    category: 'logic',
    question: 'In the numbers from 1 to 100, how many times is the digit "1" written?',
    answer: '21 times',
    working: 'Ones place: 1, 11, 21, … , 91 → 10 ones.\nTens place: 10, 11, …, 19 → 10 ones.\nThe number 100 has one more "1".\n10 + 10 + 1 = 21.',
  },
  {
    category: 'logic',
    question: 'Two numbers add up to 15 and multiply to make 56. What are the two numbers?',
    answer: '7 and 8',
    working: 'Look for two numbers with sum 15 and product 56.\n7 + 8 = 15 and 7 × 8 = 56. ✓',
  },
  {
    category: 'logic',
    question: 'A frog is at the bottom of a 10 m well. Each day it climbs up 3 m, but each night it slips back 2 m. On which day does it get out?',
    answer: 'Day 8',
    working: 'It gains 1 m each full day-night (3 up, 2 down).\nAfter 7 days and nights it is at 7 m.\nOn day 8 it climbs 3 m to reach 10 m and escapes before slipping back.',
  },
  {
    category: 'logic',
    question: 'How many squares of any size are there on a 3 × 3 grid of squares?',
    answer: '14',
    working: 'Small 1×1 squares: 9.\n2×2 squares: 4.\n3×3 square: 1.\n9 + 4 + 1 = 14.',
  },
  {
    category: 'logic',
    question: 'Place the numbers 1 to 9 in a 3 × 3 magic square so every row, column and diagonal adds to the same total. What is that total?',
    answer: '15',
    working: 'The numbers 1 to 9 add up to 45.\nThere are 3 rows that share the total equally: 45 ÷ 3 = 15.\nSo each row, column and diagonal must add to 15.',
  },
  {
    category: 'logic',
    question: 'With 3 straight cuts across a round pizza, what is the greatest number of pieces you can make?',
    answer: '7 pieces',
    working: 'Each new cut can cross all the earlier cuts to add the most pieces.\n1 cut → 2, 2 cuts → 4, 3 cuts → 7 pieces.',
  },
  {
    category: 'logic',
    question: 'Today is Monday. What day of the week will it be in 100 days?',
    answer: 'Wednesday',
    working: 'Days repeat every 7. 100 ÷ 7 = 14 remainder 2.\nSo it is 2 days after Monday → Wednesday.',
  },
  {
    category: 'logic',
    question: 'Half of a number, plus 6, equals 14. What is the number?',
    answer: '16',
    working: 'Work backwards. Take away 6: 14 − 6 = 8 (this is half the number).\nDouble it: 8 × 2 = 16.',
  },
  {
    category: 'logic',
    question: 'A clock strikes the number of the hour (1 chime at 1 o\'clock, 2 at 2 o\'clock, …). How many times does it chime in 12 hours?',
    answer: '78 times',
    working: 'Add 1 + 2 + 3 + … + 12.\nPair them: (1+12) + (2+11) + … = 13 × 6 = 78.',
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────
const GENS_BY_CATEGORY: Record<'patterns' | 'grids' | 'word', Array<() => OlympiadProblem>> = {
  patterns: PATTERN_GENS,
  grids: GRID_GENS,
  word: WORD_GENS,
};

export function nextOlympiadProblem(category: OlympiadCategory): OlympiadProblem {
  if (category === 'logic') return pick(LOGIC_PUZZLES);
  if (category === 'mix') {
    const all: OlympiadCategory[] = ['patterns', 'grids', 'logic', 'word'];
    return nextOlympiadProblem(pick(all));
  }
  return pick(GENS_BY_CATEGORY[category])();
}

export const OLYMPIAD_CATEGORIES: { id: OlympiadCategory; label: string; emoji: string }[] = [
  { id: 'mix', label: 'Mixed', emoji: '🎲' },
  { id: 'patterns', label: 'Number Patterns', emoji: '🔢' },
  { id: 'grids', label: 'Grid Puzzles', emoji: '🔳' },
  { id: 'logic', label: 'Logic & Puzzles', emoji: '🧩' },
  { id: 'word', label: 'Word Problems', emoji: '📝' },
];
