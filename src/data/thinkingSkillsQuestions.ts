import { Question } from '../types';

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

function makeMCQ(correct: string, wrongs: string[]): string[] {
  const unique = [...new Set(wrongs.filter(w => w !== correct))];
  const picked = shuffle(unique).slice(0, 3);
  while (picked.length < 3) picked.push('?');
  return shuffle([correct, ...picked]);
}

// ─── Number Sequences ────────────────────────────────────────────────────────
function generateNumberSequence(): Question {
  const type = rand(0, 5);
  let terms: number[];
  let next: number;

  switch (type) {
    case 0: {
      const step = rand(2, 10);
      const start = rand(1, 20);
      terms = [0, 1, 2, 3].map(i => start + i * step);
      next = start + 4 * step;
      break;
    }
    case 1: {
      const step = rand(2, 9);
      const start = rand(30, 80);
      terms = [0, 1, 2, 3].map(i => start - i * step);
      next = start - 4 * step;
      break;
    }
    case 2: {
      const start = rand(1, 5);
      terms = [start, start * 2, start * 4, start * 8];
      next = start * 16;
      break;
    }
    case 3: {
      const stepA = rand(2, 4);
      const stepB = rand(5, 8);
      const start = rand(1, 10);
      terms = [start, start + stepA, start + stepA + stepB, start + 2 * stepA + stepB];
      next = start + 2 * stepA + 2 * stepB;
      break;
    }
    case 4: {
      const start = rand(1, 3);
      terms = [start, start * 3, start * 9, start * 27];
      next = start * 81;
      break;
    }
    default: {
      // halving
      const start = rand(3, 6) * 16;
      terms = [start, start / 2, start / 4, start / 8];
      next = start / 16;
      break;
    }
  }

  const spread = Math.max(2, Math.round(Math.abs(next) * 0.1) + 2);
  const wrongs = new Set<number>();
  let tries = 0;
  while (wrongs.size < 3 && tries < 50) {
    const delta = rand(1, spread) * (Math.random() < 0.5 ? 1 : -1);
    const c = next + delta;
    if (c !== next) wrongs.add(c);
    tries++;
  }

  return {
    id: 0,
    text: `What comes next in the sequence?\n${terms.join(', ')}, ___`,
    answer: String(next),
    options: makeMCQ(String(next), [...wrongs].map(String)),
  };
}

// ─── Tile / Repeating Patterns ───────────────────────────────────────────────
const TILE_SETS = [
  ['🔴', '🔵', '🟢'],
  ['🔴', '🟡', '🔵'],
  ['🟣', '🟠', '🟢'],
  ['⭐', '🔵', '🔴'],
  ['▲', '●', '■'],
  ['★', '♦', '●'],
  ['▲', '■', '★'],
];

function generateTilePattern(): Question {
  const tileSet = TILE_SETS[rand(0, TILE_SETS.length - 1)];
  const patternLen = rand(2, Math.min(3, tileSet.length));
  const pattern = shuffle(tileSet).slice(0, patternLen);

  // Show between patternLen+2 and patternLen*2+1 tiles
  const showCount = rand(patternLen + 2, patternLen * 2 + 1);
  const sequence = Array.from({ length: showCount }, (_, i) => pattern[i % patternLen]);
  const correct = pattern[showCount % patternLen];
  const wrongs = tileSet.filter(s => s !== correct).slice(0, 3);

  return {
    id: 0,
    text: `What comes next in the pattern?\n${sequence.join(' ')}  ___`,
    answer: correct,
    options: makeMCQ(correct, wrongs),
  };
}

// ─── Word Analogies ──────────────────────────────────────────────────────────
const WORD_ANALOGIES: { text: string; answer: string; opts: string[] }[] = [
  { text: 'Bird is to nest as bee is to ___', answer: 'hive', opts: ['hive', 'honey', 'flower', 'wing'] },
  { text: 'Finger is to hand as toe is to ___', answer: 'foot', opts: ['foot', 'nail', 'leg', 'shoe'] },
  { text: 'Doctor is to hospital as teacher is to ___', answer: 'school', opts: ['school', 'book', 'lesson', 'student'] },
  { text: 'Cat is to kitten as dog is to ___', answer: 'puppy', opts: ['puppy', 'cub', 'foal', 'lamb'] },
  { text: 'Fish is to water as bird is to ___', answer: 'sky', opts: ['sky', 'nest', 'feather', 'tree'] },
  { text: 'Book is to read as song is to ___', answer: 'sing', opts: ['sing', 'write', 'listen', 'dance'] },
  { text: 'Eyes are to seeing as ears are to ___', answer: 'hearing', opts: ['hearing', 'smelling', 'tasting', 'feeling'] },
  { text: 'Summer is to hot as winter is to ___', answer: 'cold', opts: ['cold', 'rainy', 'windy', 'dark'] },
  { text: 'Cow is to milk as hen is to ___', answer: 'eggs', opts: ['eggs', 'meat', 'feathers', 'wool'] },
  { text: 'Day is to sun as night is to ___', answer: 'moon', opts: ['moon', 'stars', 'dark', 'sleep'] },
  { text: 'Puppy is to dog as kitten is to ___', answer: 'cat', opts: ['cat', 'rabbit', 'hamster', 'mouse'] },
  { text: 'Knife is to cut as pen is to ___', answer: 'write', opts: ['write', 'draw', 'paint', 'read'] },
  { text: 'Rain is to umbrella as cold is to ___', answer: 'coat', opts: ['coat', 'gloves', 'hat', 'scarf'] },
  { text: 'Ship is to sea as plane is to ___', answer: 'sky', opts: ['sky', 'cloud', 'airport', 'air'] },
  { text: 'Apple is to fruit as carrot is to ___', answer: 'vegetable', opts: ['vegetable', 'food', 'plant', 'root'] },
  { text: 'Two is to four as three is to ___', answer: 'six', opts: ['six', 'five', 'seven', 'nine'] },
  { text: 'Glove is to hand as sock is to ___', answer: 'foot', opts: ['foot', 'leg', 'toe', 'shoe'] },
  { text: 'Hot is to cold as tall is to ___', answer: 'short', opts: ['short', 'small', 'tiny', 'low'] },
  { text: 'Begin is to end as start is to ___', answer: 'finish', opts: ['finish', 'stop', 'end', 'close'] },
  { text: 'Lion is to roar as dog is to ___', answer: 'bark', opts: ['bark', 'meow', 'growl', 'howl'] },
  { text: 'Painter is to brush as writer is to ___', answer: 'pen', opts: ['pen', 'canvas', 'ink', 'paper'] },
  { text: 'Foot is to shoe as hand is to ___', answer: 'glove', opts: ['glove', 'ring', 'sock', 'bracelet'] },
  { text: 'Teacher is to classroom as chef is to ___', answer: 'kitchen', opts: ['kitchen', 'restaurant', 'menu', 'food'] },
  { text: 'Bee is to sting as snake is to ___', answer: 'bite', opts: ['bite', 'hiss', 'squeeze', 'poison'] },
  { text: 'Fast is to slow as loud is to ___', answer: 'quiet', opts: ['quiet', 'soft', 'small', 'gentle'] },
];

function generateWordAnalogy(): Question {
  const t = WORD_ANALOGIES[rand(0, WORD_ANALOGIES.length - 1)];
  return { id: 0, text: t.text, answer: t.answer, options: shuffle(t.opts) };
}

// ─── Odd One Out ─────────────────────────────────────────────────────────────
const ODD_ONE_OUT: { words: string[]; answer: string }[] = [
  { words: ['apple', 'banana', 'carrot', 'mango'], answer: 'carrot' },
  { words: ['happy', 'joyful', 'sad', 'cheerful'], answer: 'sad' },
  { words: ['cat', 'dog', 'eagle', 'rabbit'], answer: 'eagle' },
  { words: ['red', 'blue', 'green', 'chair'], answer: 'chair' },
  { words: ['robin', 'trout', 'sparrow', 'eagle'], answer: 'trout' },
  { words: ['circle', 'triangle', 'square', 'cube'], answer: 'cube' },
  { words: ['January', 'March', 'July', 'Monday'], answer: 'Monday' },
  { words: ['Sydney', 'Melbourne', 'Brisbane', 'France'], answer: 'France' },
  { words: ['swim', 'run', 'jump', 'tall'], answer: 'tall' },
  { words: ['piano', 'guitar', 'drums', 'pencil'], answer: 'pencil' },
  { words: ['Mars', 'Jupiter', 'Saturn', 'Moon'], answer: 'Moon' },
  { words: ['rose', 'daisy', 'tulip', 'oak'], answer: 'oak' },
  { words: ['2', '4', '6', '7'], answer: '7' },
  { words: ['five', 'ten', 'fifteen', 'twelve'], answer: 'twelve' },
  { words: ['cup', 'plate', 'bowl', 'spoon'], answer: 'spoon' },
  { words: ['lion', 'tiger', 'cheetah', 'elephant'], answer: 'elephant' },
  { words: ['north', 'south', 'east', 'up'], answer: 'up' },
  { words: ['gold', 'silver', 'bronze', 'wood'], answer: 'wood' },
  { words: ['snail', 'turtle', 'cheetah', 'sloth'], answer: 'cheetah' },
  { words: ['dentist', 'teacher', 'doctor', 'nurse'], answer: 'teacher' },
  { words: ['knee', 'elbow', 'shoulder', 'nose'], answer: 'nose' },
  { words: ['boots', 'sandals', 'sneakers', 'hat'], answer: 'hat' },
  { words: ['milk', 'juice', 'water', 'rice'], answer: 'rice' },
  { words: ['flute', 'violin', 'trumpet', 'drum'], answer: 'drum' },
  { words: ['shark', 'whale', 'dolphin', 'parrot'], answer: 'parrot' },
  { words: ['Australia', 'England', 'China', 'Sydney'], answer: 'Sydney' },
  { words: ['sun', 'moon', 'star', 'cloud'], answer: 'cloud' },
  { words: ['cold', 'warm', 'hot', 'large'], answer: 'large' },
  { words: ['3', '6', '9', '11'], answer: '11' },
  { words: ['eagle', 'penguin', 'robin', 'fish'], answer: 'fish' },
];

function generateOddOneOut(): Question {
  const t = ODD_ONE_OUT[rand(0, ODD_ONE_OUT.length - 1)];
  return {
    id: 0,
    text: `Which one does NOT belong?\n${t.words.join('   •   ')}`,
    answer: t.answer,
    options: shuffle(t.words),
  };
}

// ─── Letter Patterns ─────────────────────────────────────────────────────────
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateLetterPattern(): Question {
  const type = rand(0, 3);
  let seq: string[];
  let next: string;

  switch (type) {
    case 0: {
      // every 2nd letter: A C E G ___
      const start = rand(0, 14);
      seq = [0, 1, 2, 3].map(i => ALPHA[start + i * 2]);
      next = ALPHA[start + 4 * 2] ?? ALPHA[25];
      break;
    }
    case 1: {
      // every 3rd letter: A D G J ___
      const start = rand(0, 8);
      seq = [0, 1, 2, 3].map(i => ALPHA[start + i * 3]);
      next = ALPHA[start + 4 * 3] ?? ALPHA[25];
      break;
    }
    case 2: {
      // backwards every 2nd: Z X V T ___
      const start = rand(16, 25);
      seq = [0, 1, 2, 3].map(i => ALPHA[start - i * 2]);
      next = ALPHA[start - 4 * 2] ?? ALPHA[0];
      break;
    }
    default: {
      // growing gaps: A B D G ___  (gaps: +1, +2, +3, +4)
      const start = rand(0, 4);
      const positions = [start, start + 1, start + 3, start + 6, start + 10];
      seq = positions.slice(0, 4).map(i => ALPHA[Math.min(i, 25)]);
      next = ALPHA[Math.min(positions[4], 25)];
      break;
    }
  }

  const nextIdx = ALPHA.indexOf(next);
  const candidates = [-2, -1, 1, 2]
    .map(d => nextIdx + d)
    .filter(i => i >= 0 && i < 26 && ALPHA[i] !== next)
    .map(i => ALPHA[i]);

  return {
    id: 0,
    text: `What letter comes next?\n${seq.join(', ')}, ___`,
    answer: next,
    options: makeMCQ(next, candidates),
  };
}

// ─── Figure Matrix (text-described) ──────────────────────────────────────────
const SIZES = ['Small', 'Medium', 'Large'];
const SHAPES = ['circle', 'square', 'triangle', 'star', 'diamond'];

function generateFigureMatrix(): Question {
  const shuffledShapes = shuffle(SHAPES);
  const [s1, s2, s3] = shuffledShapes;

  const correct = `Large ${s3}`;
  const wrongs = [`Small ${s3}`, `Large ${s1}`, `Medium ${s3}`];

  return {
    id: 0,
    text: [
      'Complete the pattern grid:',
      `${SIZES[0]} ${s1}  →  ${SIZES[1]} ${s1}  →  ${SIZES[2]} ${s1}`,
      `${SIZES[0]} ${s2}  →  ${SIZES[1]} ${s2}  →  ${SIZES[2]} ${s2}`,
      `${SIZES[0]} ${s3}  →  ${SIZES[1]} ${s3}  →  ___`,
    ].join('\n'),
    answer: correct,
    options: makeMCQ(correct, wrongs),
  };
}

// ─── Input / Output (Function Machine) ───────────────────────────────────────
function generateFunctionMachine(): Question {
  const type = rand(0, 3);
  let pairs: { in: number; out: number }[];
  let inputFinal: number;
  let correct: number;
  let ruleDesc: string;

  switch (type) {
    case 0: {
      // out = in × 2 + offset
      const mult = 2;
      const offset = rand(1, 5);
      const start = rand(1, 8);
      pairs = [
        { in: start, out: start * mult + offset },
        { in: start + 1, out: (start + 1) * mult + offset },
        { in: start + 2, out: (start + 2) * mult + offset },
      ];
      inputFinal = start + 4;
      correct = inputFinal * mult + offset;
      ruleDesc = '';
      break;
    }
    case 1: {
      // out = in + fixed
      const add = rand(3, 15);
      const start = rand(5, 20);
      pairs = [
        { in: start, out: start + add },
        { in: start + 3, out: start + 3 + add },
        { in: start + 7, out: start + 7 + add },
      ];
      inputFinal = start + 10;
      correct = inputFinal + add;
      ruleDesc = '';
      break;
    }
    case 2: {
      // out = in × 3
      const start = rand(2, 6);
      pairs = [
        { in: start, out: start * 3 },
        { in: start + 1, out: (start + 1) * 3 },
        { in: start + 2, out: (start + 2) * 3 },
      ];
      inputFinal = start + 5;
      correct = inputFinal * 3;
      ruleDesc = '';
      break;
    }
    default: {
      // out = in × in (square)
      const vals = [rand(2, 4), rand(5, 6), rand(7, 8)];
      pairs = vals.map(v => ({ in: v, out: v * v }));
      inputFinal = rand(3, 5);
      correct = inputFinal * inputFinal;
      ruleDesc = '';
      break;
    }
  }

  const rows = pairs.map(p => `  ${p.in}  →  ${p.out}`).join('\n');
  const text = `What is the output?\nIN  →  OUT\n${rows}\n  ${inputFinal}  →  ___${ruleDesc}`;

  const wrongs = new Set<number>();
  let t = 0;
  while (wrongs.size < 3 && t++ < 30) {
    const d = rand(1, Math.max(3, Math.round(correct * 0.15) + 2)) * (Math.random() < 0.5 ? 1 : -1);
    const c = correct + d;
    if (c !== correct && c > 0) wrongs.add(c);
  }

  return {
    id: 0,
    text,
    answer: String(correct),
    options: makeMCQ(String(correct), [...wrongs].map(String)),
  };
}

// ─── Master generator ─────────────────────────────────────────────────────────
const GENERATORS = {
  numberSequence: generateNumberSequence,
  tilePattern: generateTilePattern,
  wordAnalogy: generateWordAnalogy,
  oddOneOut: generateOddOneOut,
  letterPattern: generateLetterPattern,
  figureMatrix: generateFigureMatrix,
  functionMachine: generateFunctionMachine,
} as const;

export type ThinkingCategory = 'mixed' | keyof typeof GENERATORS;

export const CATEGORY_LABELS: Record<Exclude<ThinkingCategory, 'mixed'>, string> = {
  numberSequence: '🔢 Number Sequences',
  tilePattern: '🎨 Tile Patterns',
  wordAnalogy: '💬 Word Analogies',
  oddOneOut: '🔍 Odd One Out',
  letterPattern: '🔤 Letter Patterns',
  figureMatrix: '🔲 Figure Matrix',
  functionMachine: '⚙️ Function Machine',
};

export function generateThinkingQuestions(category: ThinkingCategory, count = 12): Question[] {
  const keys = Object.keys(GENERATORS) as (keyof typeof GENERATORS)[];
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const gen =
      category === 'mixed'
        ? GENERATORS[keys[i % keys.length]]
        : GENERATORS[category];
    const q = gen();
    q.id = i + 1;
    questions.push(q);
  }

  // For mixed, shuffle so categories aren't always in the same order
  if (category === 'mixed') {
    return shuffle(questions).map((q, idx) => ({ ...q, id: idx + 1 }));
  }
  return questions;
}
