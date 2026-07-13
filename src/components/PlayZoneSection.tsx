import { palette, withAlpha } from '../theme/palette';
import {
  Box,
  Button,
  IconButton,
  Typography,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import LetterTracing from './LetterTracing';
import FrogRiver from './FrogRiver';
import GiraffeTree from './GiraffeTree';

// ─── Types ────────────────────────────────────────────────────────────────────
type Level = 'year1' | 'year2';

type GameId =
  // Year 1 (gentle)
  | 'letterTrace'
  | 'letterMatch'
  | 'beginningSound'
  | 'missingLetter'
  | 'countTap'
  | 'addUp'
  | 'giraffeLetters'
  | 'shapes'
  | 'numberBonds'
  // Year 2 (challenge)
  | 'quickMaths'
  | 'timesTables'
  | 'numberPattern'
  | 'missingNumber'
  | 'brainTeaser'
  | 'doubleHalf'
  | 'moneyMaths'
  | 'bonds100';

interface Round {
  /** big thing shown at the top of the card */
  display: string;
  /** instruction line */
  prompt: string;
  /** answer choices shown as big buttons */
  options: string[];
  /** the correct choice (must be one of options) */
  answer: string;
  /** render options in a larger font (letters/numbers) */
  bigOptions?: boolean;
  /** render the display in a smaller font (for word problems / sentences) */
  displaySmall?: boolean;
}

interface GameMeta {
  id: GameId;
  title: string;
  emoji: string;
  blurb: string;
  color: string;
  color2: string;
}

const ROUNDS_PER_GAME = 8;

const GAMES_Y1: GameMeta[] = [
  {
    id: 'letterTrace',
    title: 'ABC Tracing',
    emoji: '✍️',
    blurb: 'Trace big & little letters',
    color: palette.blue675,
    color2: palette.teal375,
  },
  {
    id: 'letterMatch',
    title: 'Froggy Letters',
    emoji: '🐸',
    blurb: 'Hop to the little letter!',
    color: palette.green550,
    color2: palette.teal375,
  },
  {
    id: 'beginningSound',
    title: 'First Sound',
    emoji: '🦁',
    blurb: 'What letter does it start with?',
    color: palette.amber625,
    color2: palette.orange325,
  },
  {
    id: 'missingLetter',
    title: 'Missing Letter',
    emoji: '🔡',
    blurb: 'Finish the alphabet',
    color: palette.purple425,
    color2: palette.magenta25,
  },
  {
    id: 'countTap',
    title: 'Froggy Counting',
    emoji: '🪷',
    blurb: 'Count, then hop the river!',
    color: palette.teal525,
    color2: palette.blue350,
  },
  {
    id: 'addUp',
    title: 'Add It Up',
    emoji: '➕',
    blurb: 'Add the yummy things',
    color: palette.teal525,
    color2: palette.teal375,
  },
  {
    id: 'giraffeLetters',
    title: 'Giraffe Munch',
    emoji: '🦒',
    blurb: 'Feed the giraffe yummy letters!',
    color: palette.amber625,
    color2: palette.gold650,
  },
  {
    id: 'shapes',
    title: 'Shape Spotter',
    emoji: '🔷',
    blurb: 'Name the shape',
    color: palette.orange525,
    color2: palette.amber625,
  },
  {
    id: 'numberBonds',
    title: 'Number Bonds',
    emoji: '🔟',
    blurb: 'Make 10 and 20',
    color: palette.orange825,
    color2: palette.orange525,
  },
];

const GAMES_Y2: GameMeta[] = [
  {
    id: 'quickMaths',
    title: 'Quick Maths',
    emoji: '⚡',
    blurb: 'Add & subtract big numbers',
    color: palette.blue675,
    color2: palette.cyan950,
  },
  {
    id: 'timesTables',
    title: 'Times Tables',
    emoji: '✖️',
    blurb: 'Multiply up to 12 × 12',
    color: palette.magenta25,
    color2: palette.purple425,
  },
  {
    id: 'numberPattern',
    title: 'Number Patterns',
    emoji: '🔢',
    blurb: 'What comes next?',
    color: palette.teal675,
    color2: palette.teal375,
  },
  {
    id: 'missingNumber',
    title: 'Missing Number',
    emoji: '🟰',
    blurb: 'Find the secret number',
    color: palette.orange825,
    color2: palette.orange525,
  },
  {
    id: 'brainTeaser',
    title: 'Brain Teasers',
    emoji: '🧠',
    blurb: 'Tricky word puzzles',
    color: palette.purple425,
    color2: palette.blue675,
  },
  {
    id: 'doubleHalf',
    title: 'Double or Half',
    emoji: '⚖️',
    blurb: 'Double it, halve it',
    color: palette.pink650,
    color2: palette.magenta25,
  },
  {
    id: 'moneyMaths',
    title: 'Money Maths',
    emoji: '💰',
    blurb: 'Coins, totals & change',
    color: palette.teal525,
    color2: palette.teal675,
  },
  {
    id: 'bonds100',
    title: 'Bonds to 100',
    emoji: '💯',
    blurb: 'Make 50 and 100',
    color: palette.magenta800,
    color2: palette.pink650,
  },
];

const GAMES_BY_LEVEL: Record<Level, GameMeta[]> = {
  year1: GAMES_Y1,
  year2: GAMES_Y2,
};
const ALL_GAMES = [...GAMES_Y1, ...GAMES_Y2];

// ─── Content pools ──────────────────────────────────────────────────────────
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// emoji → word starting with a letter (Year 2 friendly)
const PICTURE_WORDS: { emoji: string; word: string; letter: string }[] = [
  { emoji: '🍎', word: 'Apple', letter: 'A' },
  { emoji: '🐝', word: 'Bee', letter: 'B' },
  { emoji: '🐱', word: 'Cat', letter: 'C' },
  { emoji: '🐶', word: 'Dog', letter: 'D' },
  { emoji: '🥚', word: 'Egg', letter: 'E' },
  { emoji: '🐸', word: 'Frog', letter: 'F' },
  { emoji: '🍇', word: 'Grapes', letter: 'G' },
  { emoji: '🎩', word: 'Hat', letter: 'H' },
  { emoji: '🦔', word: 'Igloo', letter: 'I' },
  { emoji: '🤹', word: 'Juggle', letter: 'J' },
  { emoji: '🪁', word: 'Kite', letter: 'K' },
  { emoji: '🦁', word: 'Lion', letter: 'L' },
  { emoji: '🌙', word: 'Moon', letter: 'M' },
  { emoji: '👃', word: 'Nose', letter: 'N' },
  { emoji: '🐙', word: 'Octopus', letter: 'O' },
  { emoji: '🐷', word: 'Pig', letter: 'P' },
  { emoji: '👑', word: 'Queen', letter: 'Q' },
  { emoji: '🤖', word: 'Robot', letter: 'R' },
  { emoji: '☀️', word: 'Sun', letter: 'S' },
  { emoji: '🌳', word: 'Tree', letter: 'T' },
  { emoji: '☂️', word: 'Umbrella', letter: 'U' },
  { emoji: '🎻', word: 'Violin', letter: 'V' },
  { emoji: '🐋', word: 'Whale', letter: 'W' },
  { emoji: '🦊', word: 'Fox', letter: 'X' }, // x is hard; use as "boX"
  { emoji: '🪀', word: 'Yo-yo', letter: 'Y' },
  { emoji: '🦓', word: 'Zebra', letter: 'Z' },
];

const COUNT_EMOJIS = [
  '🐥',
  '🍓',
  '⭐',
  '🎈',
  '🐠',
  '🌸',
  '🦋',
  '🍩',
  '🚗',
  '🐞',
];

// very easy first words for the 4-year-old's giraffe game (emoji + word)
const EASY_WORDS: { emoji: string; word: string }[] = [
  { emoji: '🐱', word: 'cat' },
  { emoji: '🍎', word: 'apple' },
  { emoji: '🐶', word: 'dog' },
  { emoji: '☀️', word: 'sun' },
  { emoji: '⚽', word: 'ball' },
  { emoji: '🐟', word: 'fish' },
  { emoji: '🎩', word: 'hat' },
  { emoji: '🥚', word: 'egg' },
  { emoji: '🥛', word: 'milk' },
  { emoji: '⭐', word: 'star' },
  { emoji: '🌳', word: 'tree' },
  { emoji: '🦆', word: 'duck' },
  { emoji: '🐮', word: 'cow' },
  { emoji: '🐝', word: 'bee' },
  { emoji: '🐷', word: 'pig' },
  { emoji: '🚌', word: 'bus' },
  { emoji: '🔑', word: 'key' },
  { emoji: '🌙', word: 'moon' },
  { emoji: '🧦', word: 'sock' },
  { emoji: '🍌', word: 'banana' },
];

const SHAPES: { emoji: string; name: string }[] = [
  { emoji: '🔴', name: 'Circle' },
  { emoji: '🟦', name: 'Square' },
  { emoji: '🔺', name: 'Triangle' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '❤️', name: 'Heart' },
  { emoji: '🔷', name: 'Diamond' },
];

const CORRECT_CHEERS = [
  'Yay! 🎉',
  'Awesome! 🌟',
  'You got it! ⭐',
  'Super! 🚀',
  'Brilliant! 💫',
  'High five! ✋',
];
const WRONG_CHEERS = [
  'Try again! 💪',
  'Almost! 🙂',
  'Good try! 🌈',
  'Keep going! 👍',
];

// ─── Year 2 brain-teaser word problems (single numeric answer) ────────────────
const TEASERS: Array<() => { text: string; answer: number }> = [
  () => {
    const n = randInt(3, 8);
    return {
      text: `A spider has 8 legs. How many legs do ${n} spiders have?`,
      answer: 8 * n,
    };
  },
  () => {
    const n = randInt(3, 9);
    return {
      text: `Each car has 4 wheels. How many wheels are on ${n} cars?`,
      answer: 4 * n,
    };
  },
  () => {
    const a = randInt(25, 55),
      b = randInt(6, 15),
      c = randInt(6, 15);
    return {
      text: `Mia had ${a} stickers. She gave away ${b}, then got ${c} more. How many now?`,
      answer: a - b + c,
    };
  },
  () => {
    const per = randInt(3, 8),
      groups = randInt(2, 6);
    return {
      text: `${groups} friends share ${per * groups} sweets equally. How many does each get?`,
      answer: per,
    };
  },
  () => {
    const p = randInt(45, 90),
      r = randInt(12, 30);
    return {
      text: `A book has ${p} pages. Lucas read ${r}. How many pages are left?`,
      answer: p - r,
    };
  },
  () => {
    const even = randInt(11, 40) * 2;
    return { text: `What is half of ${even}?`, answer: even / 2 };
  },
  () => {
    const w = randInt(2, 6);
    return {
      text: `There are ${w} weeks. How many days is that?`,
      answer: w * 7,
    };
  },
  () => {
    const d = randInt(2, 9);
    return {
      text: `A pizza has 8 slices. How many slices are in ${d} pizzas?`,
      answer: 8 * d,
    };
  },
  () => {
    const cows = randInt(3, 9);
    return {
      text: `A farmer has ${cows} cows. How many legs altogether?`,
      answer: cows * 4,
    };
  },
  () => {
    const n = randInt(4, 7);
    return {
      text: `${n} children each have 2 hands with 5 fingers. How many fingers in total?`,
      answer: n * 10,
    };
  },
  () => {
    const start = randInt(2, 6);
    return {
      text: `A frog doubles its jumps each minute, starting at ${start}. How many jumps in the 3rd minute?`,
      answer: start * 4,
    };
  },
  () => {
    const rows = randInt(3, 6),
      each = randInt(3, 6);
    return {
      text: `A garden has ${rows} rows with ${each} flowers in each row. How many flowers?`,
      answer: rows * each,
    };
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const cheer = (ok: boolean) => pick(ok ? CORRECT_CHEERS : WRONG_CHEERS);

function uniqueOptions(
  correct: string,
  pool: string[],
  count: number
): string[] {
  const opts = new Set<string>([correct]);
  let guard = 0;
  while (opts.size < count && guard++ < 200) {
    opts.add(pick(pool));
  }
  return shuffle([...opts]);
}

// plausible numeric distractors clustered around the correct answer
function numberOptions(correct: number, spread: number): string[] {
  const opts = new Set<string>([String(correct)]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 200) {
    const delta = randInt(1, spread) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = correct + delta;
    if (candidate >= 0) opts.add(String(candidate));
  }
  return shuffle([...opts]);
}

// ─── Round generators ─────────────────────────────────────────────────────────
/** every game except the free-drawing tracing activity runs on quiz rounds */
type QuizGameId = Exclude<GameId, 'letterTrace'>;

function makeRound(game: QuizGameId): Round {
  switch (game) {
    case 'letterMatch': {
      const letter = pick(ALPHABET);
      const others = uniqueOptions(
        letter.toLowerCase(),
        ALPHABET.map(l => l.toLowerCase()),
        4
      );
      return {
        display: letter,
        prompt: `Hop to the little letter for "${letter}"`,
        options: others,
        answer: letter.toLowerCase(),
        bigOptions: true,
      };
    }
    case 'beginningSound': {
      const item = pick(PICTURE_WORDS);
      const options = uniqueOptions(item.letter, ALPHABET, 4);
      return {
        display: `${item.emoji}\n${item.word}`,
        prompt: 'Which letter does it start with?',
        options,
        answer: item.letter,
        bigOptions: true,
      };
    }
    case 'missingLetter': {
      // sometimes use lowercase letters for variety
      const lower = Math.random() < 0.5;
      const alpha = lower ? ALPHABET.map(l => l.toLowerCase()) : ALPHABET;
      // pick a start so we always have a middle gap: A B _ D
      const startIdx = randInt(0, alpha.length - 4);
      const seq = alpha.slice(startIdx, startIdx + 4);
      const gapPos = randInt(1, 2); // hide a middle letter
      const answer = seq[gapPos];
      const shown = seq.map((l, i) => (i === gapPos ? '_' : l)).join('  ');
      const options = uniqueOptions(answer, alpha, 4);
      return {
        display: shown,
        prompt: 'Which letter is missing?',
        options,
        answer,
        bigOptions: true,
      };
    }
    case 'countTap': {
      const n = randInt(2, 20);
      const emoji = pick(COUNT_EMOJIS);
      const options = uniqueOptions(
        String(n),
        Array.from({ length: 20 }, (_, i) => String(i + 1)),
        4
      );
      return {
        display: emoji.repeat(n),
        prompt: 'Count them, then hop to that number!',
        options,
        answer: String(n),
        bigOptions: true,
      };
    }
    case 'addUp': {
      const a = randInt(1, 5);
      const b = randInt(1, Math.min(5, 10 - a));
      const emoji = pick(COUNT_EMOJIS);
      const sum = a + b;
      const options = uniqueOptions(
        String(sum),
        Array.from({ length: 12 }, (_, i) => String(i + 1)),
        4
      );
      return {
        display: `${emoji.repeat(a)}  ➕  ${emoji.repeat(b)}`,
        prompt: `What is ${a} + ${b}?`,
        options,
        answer: String(sum),
        bigOptions: true,
      };
    }
    case 'giraffeLetters': {
      const item = pick(EASY_WORDS);
      const first = item.word[0];
      const options = uniqueOptions(
        first,
        ALPHABET.map(l => l.toLowerCase()),
        4
      );
      return {
        display: `${item.emoji}\n${item.word}`,
        prompt: `Which letter starts "${item.word}"?`,
        options,
        answer: first,
        bigOptions: true,
      };
    }
    case 'shapes': {
      const shape = pick(SHAPES);
      const options = shuffle([
        shape.name,
        ...shuffle(SHAPES.filter(s => s.name !== shape.name))
          .slice(0, 3)
          .map(s => s.name),
      ]);
      return {
        display: shape.emoji,
        prompt: 'What shape is this?',
        options,
        answer: shape.name,
      };
    }
    case 'numberBonds': {
      const total = pick([10, 10, 10, 20, 5]); // weight towards bonds of 10
      const a = randInt(1, total - 1);
      const answer = total - a;
      const options = uniqueOptions(
        String(answer),
        Array.from({ length: total + 1 }, (_, i) => String(i)),
        4
      );
      return {
        display: `${a}  +  ❓  =  ${total}`,
        prompt: `What goes with ${a} to make ${total}?`,
        options,
        answer: String(answer),
        bigOptions: true,
      };
    }

    // ─── Year 2 challenge games ───────────────────────────────────────────────
    case 'quickMaths': {
      const mode = randInt(0, 2);
      let text: string;
      let answer: number;
      if (mode === 0) {
        const a = randInt(11, 79);
        const b = randInt(11, 99 - a);
        text = `${a} + ${b}`;
        answer = a + b;
      } else if (mode === 1) {
        const a = randInt(30, 99);
        const b = randInt(11, a - 1);
        text = `${a} − ${b}`;
        answer = a - b;
      } else {
        const a = randInt(20, 50);
        const b = randInt(10, 30);
        const c = randInt(5, Math.min(25, a + b - 1));
        text = `${a} + ${b} − ${c}`;
        answer = a + b - c;
      }
      return {
        display: `${text} = ?`,
        prompt: 'Work it out!',
        options: numberOptions(answer, 8),
        answer: String(answer),
        bigOptions: true,
      };
    }
    case 'timesTables': {
      const a = randInt(2, 12);
      const b = randInt(2, 12);
      const answer = a * b;
      return {
        display: `${a} × ${b} = ?`,
        prompt: 'Times tables!',
        options: numberOptions(answer, Math.max(4, Math.round(answer * 0.2))),
        answer: String(answer),
        bigOptions: true,
      };
    }
    case 'numberPattern': {
      const kind = randInt(0, 2);
      let seq: number[];
      let next: number;
      if (kind === 0) {
        // arithmetic step
        const start = randInt(1, 9);
        const step = randInt(2, 9);
        seq = [start, start + step, start + 2 * step, start + 3 * step];
        next = start + 4 * step;
      } else if (kind === 1) {
        // doubling
        const start = randInt(2, 5);
        seq = [start, start * 2, start * 4, start * 8];
        next = start * 16;
      } else {
        // counting down
        const step = randInt(2, 6);
        const start = step * randInt(8, 14);
        seq = [start, start - step, start - 2 * step, start - 3 * step];
        next = start - 4 * step;
      }
      return {
        display: `${seq.join(',  ')},  ?`,
        prompt: 'What comes next?',
        options: numberOptions(next, 6),
        answer: String(next),
        bigOptions: true,
      };
    }
    case 'missingNumber': {
      const op = randInt(0, 3);
      let text: string;
      let answer: number;
      if (op === 0) {
        const x = randInt(2, 12);
        const b = randInt(2, 12);
        text = `? × ${b} = ${x * b}`;
        answer = x;
      } else if (op === 1) {
        const x = randInt(2, 12);
        const b = randInt(2, 12);
        text = `${b} × ? = ${x * b}`;
        answer = x;
      } else if (op === 2) {
        const a = randInt(5, 45);
        const b = randInt(5, 45);
        text = `? + ${b} = ${a + b}`;
        answer = a;
      } else {
        const q = randInt(2, 12);
        const b = randInt(2, 9);
        text = `? ÷ ${b} = ${q}`;
        answer = q * b;
      }
      return {
        display: text,
        prompt: 'Find the missing number',
        options: numberOptions(answer, 6),
        answer: String(answer),
        bigOptions: true,
      };
    }
    case 'brainTeaser': {
      const t = pick(TEASERS)();
      return {
        display: t.text,
        prompt: 'Solve the puzzle! 🧠',
        options: numberOptions(
          t.answer,
          Math.max(4, Math.round(t.answer * 0.2))
        ),
        answer: String(t.answer),
        displaySmall: true,
      };
    }
    case 'doubleHalf': {
      if (Math.random() < 0.5) {
        const n = randInt(11, 50);
        return {
          display: `Double ${n}`,
          prompt: 'Double it!',
          options: numberOptions(n * 2, 8),
          answer: String(n * 2),
          bigOptions: true,
        };
      }
      const even = randInt(10, 50) * 2;
      return {
        display: `Half of ${even}`,
        prompt: 'Halve it!',
        options: numberOptions(even / 2, 8),
        answer: String(even / 2),
        bigOptions: true,
      };
    }
    case 'moneyMaths': {
      const mode = randInt(0, 2);
      if (mode === 0) {
        const a = randInt(2, 9) * 5;
        const b = randInt(2, 9) * 5;
        return {
          display: `${a}c + ${b}c`,
          prompt: 'How many cents altogether?',
          options: numberOptions(a + b, 10),
          answer: String(a + b),
          bigOptions: true,
        };
      }
      if (mode === 1) {
        const spend = randInt(2, 19) * 5;
        return {
          display: `Pay 100c, spend ${spend}c`,
          prompt: 'How much change?',
          options: numberOptions(100 - spend, 10),
          answer: String(100 - spend),
          bigOptions: true,
        };
      }
      const total = randInt(3, 12) * 5;
      return {
        display: `${total}c in 5c coins`,
        prompt: 'How many 5c coins?',
        options: numberOptions(total / 5, 3),
        answer: String(total / 5),
        bigOptions: true,
      };
    }
    case 'bonds100': {
      const total = pick([100, 100, 50]);
      const a = randInt(1, total / 5 - 1) * 5;
      const answer = total - a;
      return {
        display: `${a}  +  ❓  =  ${total}`,
        prompt: `What goes with ${a} to make ${total}?`,
        options: numberOptions(answer, 15),
        answer: String(answer),
        bigOptions: true,
      };
    }
  }
}

// ─── Sound (Web Audio, no assets) ──────────────────────────────────────────────
function useChime(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  return useCallback(
    (ok: boolean) => {
      if (muted) return;
      try {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!ctxRef.current) ctxRef.current = new Ctx();
        const ctx = ctxRef.current;
        const now = ctx.currentTime;
        const notes = ok ? [523.25, 659.25, 783.99] : [311.13, 233.08];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = ok ? 'triangle' : 'sine';
          osc.frequency.value = freq;
          const t = now + i * 0.1;
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.2);
        });
      } catch {
        /* audio not available — ignore */
      }
    },
    [muted]
  );
}

// ─── Component ──────────────────────────────────────────────────────────────
function PlayZoneSection() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [roundNum, setRoundNum] = useState(0);
  const [stars, setStars] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(
    () => localStorage.getItem('playMuted') === '1'
  );
  const [level, setLevel] = useState<Level>(() =>
    localStorage.getItem('playLevel') === 'year2' ? 'year2' : 'year1'
  );

  const chime = useChime(muted);

  const totalStars = useMemo(() => {
    return Number(localStorage.getItem('playTotalStars') || '0');
  }, [finished]);

  const startGame = useCallback((id: GameId) => {
    setActiveGame(id);
    setStars(0);
    setRoundNum(1);
    setPicked(null);
    setFeedback(null);
    setFinished(false);
    setRound(id === 'letterTrace' ? null : makeRound(id));
  }, []);

  const nextRound = useCallback(() => {
    if (!activeGame || activeGame === 'letterTrace') return;
    if (roundNum >= ROUNDS_PER_GAME) {
      setFinished(true);
      // bank the stars earned this game
      const banked =
        Number(localStorage.getItem('playTotalStars') || '0') + stars;
      localStorage.setItem('playTotalStars', String(banked));
      return;
    }
    setRoundNum(n => n + 1);
    setPicked(null);
    setFeedback(null);
    setRound(makeRound(activeGame));
  }, [activeGame, roundNum, stars]);

  const handlePick = useCallback(
    (opt: string) => {
      if (!round || picked) return; // lock after first pick
      const ok = opt === round.answer;
      setPicked(opt);
      setFeedback(cheer(ok));
      chime(ok);
      if (ok) setStars(s => s + 1);
      // auto-advance after a beat so kids see the result
      window.setTimeout(
        () => {
          nextRound();
        },
        ok ? 900 : 1500
      );
    },
    [round, picked, chime, nextRound]
  );

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m;
      localStorage.setItem('playMuted', next ? '1' : '0');
      return next;
    });
  }, []);

  const backToHub = useCallback(() => {
    setActiveGame(null);
    setRound(null);
    setFinished(false);
  }, []);

  const changeLevel = useCallback((next: Level) => {
    setLevel(next);
    localStorage.setItem('playLevel', next);
  }, []);

  const meta = activeGame ? ALL_GAMES.find(g => g.id === activeGame)! : null;
  // these two render as the animated frog-river scene instead of answer cards
  const isFrogGame = activeGame === 'letterMatch' || activeGame === 'countTap';
  const isGiraffeGame = activeGame === 'giraffeLetters';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 3,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${palette.orange25} 0%, ${palette.pink25} 35%, ${palette.blue25} 70%, ${palette.teal25} 100%)`,
      }}
    >
      <style>{`
        @keyframes pop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes wobble { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes burst { 0% { transform: scale(0.3) translateY(0); opacity: 1; } 100% { transform: scale(1.4) translateY(-40px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001s !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      {/* floating background friends */}
      {['🎈', '🌈', '⭐', '🍭', '☁️', '🎨'].map((e, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: 'absolute',
            top: `${10 + ((i * 14) % 80)}%`,
            [i % 2 ? 'right' : 'left']: `${4 + ((i * 7) % 20)}%`,
            fontSize: { xs: '2rem', sm: '2.8rem' },
            opacity: 0.35,
            animation: `floaty ${5 + i}s ease-in-out infinite ${i * 0.6}s`,
            pointerEvents: 'none',
          }}
        >
          {e}
        </Box>
      ))}

      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={() => (activeGame ? backToHub() : navigate({ to: '/' }))}
          aria-label={activeGame ? 'Back to games' : 'Back to dashboard'}
          sx={{
            bgcolor: withAlpha(palette.white, 0.7),
            color: palette.purple625,
            border: `3px solid ${palette.magenta25}`,
            borderRadius: '16px',
            '&:hover': { bgcolor: palette.white, transform: 'scale(1.05)' },
          }}
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: withAlpha(palette.white, 0.75),
            border: `3px solid ${palette.amber625}`,
            borderRadius: '999px',
            px: 2,
            py: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              color: palette.orange575,
              fontSize: '1.2rem',
            }}
          >
            ⭐ {activeGame ? stars : totalStars}
          </Typography>
        </Box>

        <IconButton
          onClick={toggleMute}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          sx={{
            bgcolor: withAlpha(palette.white, 0.7),
            color: palette.teal725,
            border: `3px solid ${palette.teal375}`,
            borderRadius: '16px',
            '&:hover': { bgcolor: palette.white, transform: 'scale(1.05)' },
          }}
          size="large"
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Box>

      {/* ─── HUB ─── */}
      {!activeGame && (
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem' },
              mb: 0.5,
              color: palette.magenta325,
              textShadow: `2px 2px 0 ${palette.white}`,
              animation: 'wobble 4s ease-in-out infinite',
            }}
          >
            🎪 Play &amp; Learn
          </Typography>
          <Typography
            sx={{
              color: palette.purple475,
              fontWeight: 700,
              mb: 2,
              fontSize: '1.1rem',
            }}
          >
            Pick a game and learn while you play!
          </Typography>

          {/* Year level tabs */}
          <Box
            role="tablist"
            aria-label="Choose level"
            sx={{
              display: 'inline-flex',
              gap: 0.5,
              p: 0.5,
              mb: 3,
              borderRadius: '999px',
              bgcolor: withAlpha(palette.white, 0.6),
              border: `3px solid ${palette.white}`,
              boxShadow: `0 6px 16px ${withAlpha(palette.black, 0.12)}`,
            }}
          >
            {[
              {
                id: 'year1' as Level,
                label: '🐣 Year 1',
                sub: 'Little learners',
              },
              {
                id: 'year2' as Level,
                label: '🚀 Year 2',
                sub: 'Challenge mode',
              },
            ].map(t => {
              const selected = level === t.id;
              return (
                <Box
                  key={t.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={() => changeLevel(t.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      changeLevel(t.id);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    borderRadius: '999px',
                    px: { xs: 2.5, sm: 4 },
                    py: 1,
                    textAlign: 'center',
                    transition: 'all 0.15s',
                    color: selected ? palette.white : palette.purple475,
                    background: selected
                      ? `linear-gradient(150deg, ${palette.magenta325}, ${palette.purple475})`
                      : 'transparent',
                    boxShadow: selected
                      ? `0 4px 12px ${withAlpha(palette.magenta325, 0.4)}`
                      : 'none',
                    '&:focus-visible': {
                      outline: `3px solid ${palette.purple675}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      lineHeight: 1.1,
                    }}
                  >
                    {t.label}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: '0.72rem', opacity: 0.85 }}
                  >
                    {t.sub}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 3,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            {GAMES_BY_LEVEL[level].map((g, i) => (
              <Box
                key={g.id}
                role="button"
                tabIndex={0}
                onClick={() => startGame(g.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startGame(g.id);
                  }
                }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '28px',
                  p: 3,
                  color: palette.white,
                  background: `linear-gradient(150deg, ${g.color} 0%, ${g.color2} 100%)`,
                  border: `4px solid ${palette.white}`,
                  boxShadow: `0 10px 0 ${withAlpha(palette.black, 0.12)}, 0 14px 30px ${withAlpha(palette.black, 0.18)}`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  animation: `pop 0.4s ease ${i * 0.08}s both`,
                  '&:hover, &:focus-visible': {
                    transform: 'translateY(-6px) rotate(-1deg)',
                    boxShadow: `0 14px 0 ${withAlpha(palette.black, 0.12)}, 0 20px 38px ${withAlpha(palette.black, 0.22)}`,
                    outline: 'none',
                  },
                }}
              >
                <Typography sx={{ fontSize: '3.4rem', lineHeight: 1, mb: 1 }}>
                  {g.emoji}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    textShadow: `1px 1px 0 ${withAlpha(palette.black, 0.2)}`,
                  }}
                >
                  {g.title}
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, opacity: 0.95, fontSize: '0.95rem' }}
                >
                  {g.blurb}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ─── FINISHED ─── */}
      {activeGame && finished && meta && (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            mt: 4,
            animation: 'pop 0.5s ease both',
          }}
        >
          <Typography
            sx={{
              fontSize: '4.5rem',
              animation: 'floaty 3s ease-in-out infinite',
            }}
          >
            {stars >= ROUNDS_PER_GAME
              ? '🏆'
              : stars >= ROUNDS_PER_GAME / 2
                ? '🌟'
                : '🎈'}
          </Typography>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '2.2rem',
              color: palette.magenta325,
              textShadow: `2px 2px 0 ${palette.white}`,
            }}
          >
            {stars >= ROUNDS_PER_GAME
              ? "Perfect! You're a star!"
              : stars >= ROUNDS_PER_GAME / 2
                ? 'Great job!'
                : 'Well played!'}
          </Typography>
          <Typography
            sx={{
              fontWeight: 800,
              color: palette.orange575,
              fontSize: '1.6rem',
              my: 1,
            }}
          >
            You earned {stars} ⭐ in {meta.title}!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 2,
            }}
          >
            <PlayButton
              color={palette.teal375}
              onClick={() => startGame(meta.id)}
            >
              🔁 Play Again
            </PlayButton>
            <PlayButton color={palette.purple425} onClick={backToHub}>
              🎪 Pick Another
            </PlayButton>
          </Box>
        </Box>
      )}

      {/* ─── TRACING (free drawing, no rounds) ─── */}
      {activeGame === 'letterTrace' && <LetterTracing />}

      {/* ─── PLAYING ─── */}
      {activeGame && !finished && round && meta && (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 720,
            mx: 'auto',
            mt: 1,
          }}
        >
          {/* progress */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography sx={{ fontWeight: 800, color: meta.color }}>
                {meta.emoji} {meta.title}
              </Typography>
              <Typography sx={{ fontWeight: 800, color: palette.purple475 }}>
                Round {roundNum} / {ROUNDS_PER_GAME}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((roundNum - 1) / ROUNDS_PER_GAME) * 100}
              sx={{
                height: 14,
                borderRadius: 999,
                bgcolor: withAlpha(palette.white, 0.7),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${meta.color}, ${meta.color2})`,
                },
              }}
            />
          </Box>

          {isGiraffeGame ? (
            <GiraffeTree
              round={round}
              picked={picked}
              roundNum={roundNum}
              muted={muted}
              onPick={handlePick}
            />
          ) : isFrogGame ? (
            <FrogRiver
              round={round}
              picked={picked}
              roundNum={roundNum}
              mode={activeGame === 'letterMatch' ? 'letters' : 'numbers'}
              muted={muted}
              onPick={handlePick}
            />
          ) : (
            <>
              {/* question card */}
              <Box
                sx={{
                  bgcolor: withAlpha(palette.white, 0.85),
                  border: `5px solid ${palette.white}`,
                  borderRadius: '28px',
                  boxShadow: `0 12px 30px ${withAlpha(palette.black, 0.12)}`,
                  p: { xs: 2.5, sm: 4 },
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  key={roundNum}
                  sx={{
                    fontSize: round.displaySmall
                      ? { xs: '1.4rem', sm: '1.7rem' }
                      : { xs: '2.6rem', sm: '3.4rem' },
                    fontWeight: round.displaySmall ? 800 : 900,
                    lineHeight: 1.3,
                    whiteSpace: 'pre-line',
                    color: palette.slate950,
                    mb: 1,
                    animation: 'pop 0.35s ease both',
                    wordBreak: 'break-word',
                  }}
                >
                  {round.display}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: palette.purple675,
                    fontSize: '1.15rem',
                  }}
                >
                  {round.prompt}
                </Typography>
              </Box>

              {/* options */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                  gap: 2,
                }}
              >
                {round.options.map(opt => {
                  const isPicked = picked === opt;
                  const isAnswer = opt === round.answer;
                  const reveal = picked !== null;
                  let bg = `linear-gradient(150deg, ${palette.white} 0%, ${palette.purple25} 100%)`;
                  let border = palette.purple300;
                  let textColor = palette.purple750;
                  if (reveal && isAnswer) {
                    bg = `linear-gradient(150deg, ${palette.green175} 0%, ${palette.green500} 100%)`;
                    border = palette.green500;
                    textColor = palette.white;
                  } else if (reveal && isPicked && !isAnswer) {
                    bg = `linear-gradient(150deg, ${palette.red225} 0%, ${palette.red325} 100%)`;
                    border = palette.red325;
                    textColor = palette.white;
                  }
                  return (
                    <Box
                      key={opt}
                      role="button"
                      tabIndex={reveal ? -1 : 0}
                      aria-label={`Answer ${opt}`}
                      onClick={() => handlePick(opt)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handlePick(opt);
                        }
                      }}
                      sx={{
                        cursor: reveal ? 'default' : 'pointer',
                        userSelect: 'none',
                        borderRadius: '20px',
                        border: `4px solid ${border}`,
                        background: bg,
                        color: textColor,
                        py: { xs: 2, sm: 2.5 },
                        px: 1,
                        textAlign: 'center',
                        fontWeight: 900,
                        fontSize: round.bigOptions
                          ? { xs: '2rem', sm: '2.4rem' }
                          : { xs: '1.1rem', sm: '1.3rem' },
                        boxShadow:
                          reveal && isAnswer
                            ? `0 8px 0 ${palette.green650}`
                            : `0 6px 0 ${withAlpha(palette.black, 0.12)}`,
                        transition: 'transform 0.12s, box-shadow 0.12s',
                        position: 'relative',
                        minHeight: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation:
                          reveal && isAnswer ? 'pop 0.4s ease both' : 'none',
                        '&:hover': reveal
                          ? {}
                          : {
                              transform: 'translateY(-3px)',
                              boxShadow: `0 9px 0 ${withAlpha(palette.black, 0.12)}`,
                            },
                        '&:focus-visible': {
                          outline: `3px solid ${palette.purple675}`,
                          outlineOffset: 2,
                        },
                      }}
                    >
                      {opt}
                      {reveal && isAnswer && (
                        <Box
                          aria-hidden
                          sx={{
                            position: 'absolute',
                            top: -10,
                            right: -6,
                            fontSize: '1.6rem',
                            animation: 'burst 0.7s ease both',
                          }}
                        >
                          🎉
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </>
          )}

          {/* feedback */}
          <Box sx={{ minHeight: 48, mt: 2, textAlign: 'center' }}>
            {feedback && (
              <Typography
                key={feedback + roundNum}
                sx={{
                  display: 'inline-block',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  color:
                    picked === round.answer
                      ? palette.teal725
                      : palette.orange775,
                  animation: 'pop 0.3s ease both',
                }}
              >
                {feedback}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── Little reusable chunky button ────────────────────────────────────────────
function PlayButton({
  children,
  color,
  onClick,
}: {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '999px',
        px: 4,
        py: 1.5,
        fontWeight: 900,
        fontSize: '1.1rem',
        textTransform: 'none',
        color: palette.white,
        background: color,
        border: `3px solid ${palette.white}`,
        boxShadow: `0 6px 0 ${withAlpha(palette.black, 0.15)}`,
        '&:hover': {
          background: color,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 0 ${withAlpha(palette.black, 0.15)}`,
        },
        '&:active': {
          transform: 'translateY(2px)',
          boxShadow: `0 3px 0 ${withAlpha(palette.black, 0.15)}`,
        },
      }}
    >
      {children}
    </Button>
  );
}

export default PlayZoneSection;
