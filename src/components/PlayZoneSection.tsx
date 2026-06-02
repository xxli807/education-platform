import { Box, Button, IconButton, Typography, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

// ─── Types ────────────────────────────────────────────────────────────────────
type Level = 'year1' | 'year2';

type GameId =
  // Year 1 (gentle)
  | 'letterMatch'
  | 'beginningSound'
  | 'missingLetter'
  | 'countTap'
  | 'addUp'
  | 'rhyme'
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
  { id: 'letterMatch', title: 'Letter Match', emoji: '🔤', blurb: 'Match big & little letters', color: '#ff6f91', color2: '#ff9671' },
  { id: 'beginningSound', title: 'First Sound', emoji: '🦁', blurb: 'What letter does it start with?', color: '#ffc75f', color2: '#ff9671' },
  { id: 'missingLetter', title: 'Missing Letter', emoji: '🔡', blurb: 'Finish the alphabet', color: '#845ec2', color2: '#d65db1' },
  { id: 'countTap', title: 'Count It', emoji: '🐣', blurb: 'How many can you see?', color: '#00c9a7', color2: '#4ffbdf' },
  { id: 'addUp', title: 'Add It Up', emoji: '➕', blurb: 'Add the yummy things', color: '#4d8076', color2: '#00c9a7' },
  { id: 'rhyme', title: 'Rhyme Time', emoji: '🎵', blurb: 'Find words that rhyme', color: '#0089ba', color2: '#2c73d2' },
  { id: 'shapes', title: 'Shape Spotter', emoji: '🔷', blurb: 'Name the shape', color: '#ff8066', color2: '#ffc75f' },
  { id: 'numberBonds', title: 'Number Bonds', emoji: '🔟', blurb: 'Make 10 and 20', color: '#c34a36', color2: '#ff8066' },
];

const GAMES_Y2: GameMeta[] = [
  { id: 'quickMaths', title: 'Quick Maths', emoji: '⚡', blurb: 'Add & subtract big numbers', color: '#2c73d2', color2: '#0089ba' },
  { id: 'timesTables', title: 'Times Tables', emoji: '✖️', blurb: 'Multiply up to 12 × 12', color: '#d65db1', color2: '#845ec2' },
  { id: 'numberPattern', title: 'Number Patterns', emoji: '🔢', blurb: 'What comes next?', color: '#008f7a', color2: '#00c9a7' },
  { id: 'missingNumber', title: 'Missing Number', emoji: '🟰', blurb: 'Find the secret number', color: '#c34a36', color2: '#ff8066' },
  { id: 'brainTeaser', title: 'Brain Teasers', emoji: '🧠', blurb: 'Tricky word puzzles', color: '#845ec2', color2: '#2c73d2' },
  { id: 'doubleHalf', title: 'Double or Half', emoji: '⚖️', blurb: 'Double it, halve it', color: '#ff6f91', color2: '#d65db1' },
  { id: 'moneyMaths', title: 'Money Maths', emoji: '💰', blurb: 'Coins, totals & change', color: '#4d8076', color2: '#008f7a' },
  { id: 'bonds100', title: 'Bonds to 100', emoji: '💯', blurb: 'Make 50 and 100', color: '#b0306c', color2: '#ff6f91' },
];

const GAMES_BY_LEVEL: Record<Level, GameMeta[]> = { year1: GAMES_Y1, year2: GAMES_Y2 };
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

const COUNT_EMOJIS = ['🐥', '🍓', '⭐', '🎈', '🐠', '🌸', '🦋', '🍩', '🚗', '🐞'];

// words grouped by rhyme — answer comes from the same group, distractors from others
const RHYME_GROUPS: string[][] = [
  ['cat', 'hat', 'bat', 'mat', 'rat'],
  ['dog', 'log', 'frog', 'fog'],
  ['sun', 'run', 'bun', 'fun'],
  ['bee', 'tree', 'key', 'sea'],
  ['cake', 'lake', 'snake', 'rake'],
  ['star', 'car', 'jar', 'far'],
  ['night', 'light', 'kite', 'bite'],
  ['ball', 'wall', 'tall', 'fall'],
  ['ring', 'king', 'sing', 'wing'],
  ['bug', 'rug', 'mug', 'hug'],
  ['boat', 'coat', 'goat', 'float'],
  ['pig', 'wig', 'dig', 'big'],
];

const SHAPES: { emoji: string; name: string }[] = [
  { emoji: '🔴', name: 'Circle' },
  { emoji: '🟦', name: 'Square' },
  { emoji: '🔺', name: 'Triangle' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '❤️', name: 'Heart' },
  { emoji: '🔷', name: 'Diamond' },
];

const CORRECT_CHEERS = ['Yay! 🎉', 'Awesome! 🌟', 'You got it! ⭐', 'Super! 🚀', 'Brilliant! 💫', 'High five! ✋'];
const WRONG_CHEERS = ['Try again! 💪', 'Almost! 🙂', 'Good try! 🌈', 'Keep going! 👍'];

// ─── Year 2 brain-teaser word problems (single numeric answer) ────────────────
const TEASERS: Array<() => { text: string; answer: number }> = [
  () => { const n = randInt(3, 8); return { text: `A spider has 8 legs. How many legs do ${n} spiders have?`, answer: 8 * n }; },
  () => { const n = randInt(3, 9); return { text: `Each car has 4 wheels. How many wheels are on ${n} cars?`, answer: 4 * n }; },
  () => { const a = randInt(25, 55), b = randInt(6, 15), c = randInt(6, 15); return { text: `Mia had ${a} stickers. She gave away ${b}, then got ${c} more. How many now?`, answer: a - b + c }; },
  () => { const per = randInt(3, 8), groups = randInt(2, 6); return { text: `${groups} friends share ${per * groups} sweets equally. How many does each get?`, answer: per }; },
  () => { const p = randInt(45, 90), r = randInt(12, 30); return { text: `A book has ${p} pages. Lucas read ${r}. How many pages are left?`, answer: p - r }; },
  () => { const even = randInt(11, 40) * 2; return { text: `What is half of ${even}?`, answer: even / 2 }; },
  () => { const w = randInt(2, 6); return { text: `There are ${w} weeks. How many days is that?`, answer: w * 7 }; },
  () => { const d = randInt(2, 9); return { text: `A pizza has 8 slices. How many slices are in ${d} pizzas?`, answer: 8 * d }; },
  () => { const cows = randInt(3, 9); return { text: `A farmer has ${cows} cows. How many legs altogether?`, answer: cows * 4 }; },
  () => { const n = randInt(4, 7); return { text: `${n} children each have 2 hands with 5 fingers. How many fingers in total?`, answer: n * 10 }; },
  () => { const start = randInt(2, 6); return { text: `A frog doubles its jumps each minute, starting at ${start}. How many jumps in the 3rd minute?`, answer: start * 4 }; },
  () => { const rows = randInt(3, 6), each = randInt(3, 6); return { text: `A garden has ${rows} rows with ${each} flowers in each row. How many flowers?`, answer: rows * each }; },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const cheer = (ok: boolean) => pick(ok ? CORRECT_CHEERS : WRONG_CHEERS);

function uniqueOptions(correct: string, pool: string[], count: number): string[] {
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
function makeRound(game: GameId): Round {
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
        prompt: `Find the little letter for "${letter}"`,
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
      // pick a start so we always have a middle gap: A B _ D
      const startIdx = randInt(0, ALPHABET.length - 4);
      const seq = ALPHABET.slice(startIdx, startIdx + 4);
      const gapPos = randInt(1, 2); // hide a middle letter
      const answer = seq[gapPos];
      const shown = seq.map((l, i) => (i === gapPos ? '_' : l)).join('  ');
      const options = uniqueOptions(answer, ALPHABET, 4);
      return {
        display: shown,
        prompt: 'Which letter is missing?',
        options,
        answer,
        bigOptions: true,
      };
    }
    case 'countTap': {
      const n = randInt(2, 9);
      const emoji = pick(COUNT_EMOJIS);
      const options = uniqueOptions(
        String(n),
        Array.from({ length: 12 }, (_, i) => String(i + 1)),
        4
      );
      return {
        display: emoji.repeat(n),
        prompt: 'How many do you see?',
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
    case 'rhyme': {
      const group = pick(RHYME_GROUPS);
      const [target, answer] = shuffle(group);
      // distractors: words from other groups (don't rhyme with target)
      const otherWords = RHYME_GROUPS.filter(g => g !== group).flat();
      const options = shuffle([answer, ...shuffle(otherWords).slice(0, 3)]);
      return {
        display: `🎵 ${target}`,
        prompt: `Which word rhymes with "${target}"?`,
        options,
        answer,
      };
    }
    case 'shapes': {
      const shape = pick(SHAPES);
      const options = shuffle([
        shape.name,
        ...shuffle(SHAPES.filter(s => s.name !== shape.name)).slice(0, 3).map(s => s.name),
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
      return { display: `${text} = ?`, prompt: 'Work it out!', options: numberOptions(answer, 8), answer: String(answer), bigOptions: true };
    }
    case 'timesTables': {
      const a = randInt(2, 12);
      const b = randInt(2, 12);
      const answer = a * b;
      return { display: `${a} × ${b} = ?`, prompt: 'Times tables!', options: numberOptions(answer, Math.max(4, Math.round(answer * 0.2))), answer: String(answer), bigOptions: true };
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
      return { display: `${seq.join(',  ')},  ?`, prompt: 'What comes next?', options: numberOptions(next, 6), answer: String(next), bigOptions: true };
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
      return { display: text, prompt: 'Find the missing number', options: numberOptions(answer, 6), answer: String(answer), bigOptions: true };
    }
    case 'brainTeaser': {
      const t = pick(TEASERS)();
      return { display: t.text, prompt: 'Solve the puzzle! 🧠', options: numberOptions(t.answer, Math.max(4, Math.round(t.answer * 0.2))), answer: String(t.answer), displaySmall: true };
    }
    case 'doubleHalf': {
      if (Math.random() < 0.5) {
        const n = randInt(11, 50);
        return { display: `Double ${n}`, prompt: 'Double it!', options: numberOptions(n * 2, 8), answer: String(n * 2), bigOptions: true };
      }
      const even = randInt(10, 50) * 2;
      return { display: `Half of ${even}`, prompt: 'Halve it!', options: numberOptions(even / 2, 8), answer: String(even / 2), bigOptions: true };
    }
    case 'moneyMaths': {
      const mode = randInt(0, 2);
      if (mode === 0) {
        const a = randInt(2, 9) * 5;
        const b = randInt(2, 9) * 5;
        return { display: `${a}c + ${b}c`, prompt: 'How many cents altogether?', options: numberOptions(a + b, 10), answer: String(a + b), bigOptions: true };
      }
      if (mode === 1) {
        const spend = randInt(2, 19) * 5;
        return { display: `Pay 100c, spend ${spend}c`, prompt: 'How much change?', options: numberOptions(100 - spend, 10), answer: String(100 - spend), bigOptions: true };
      }
      const total = randInt(3, 12) * 5;
      return { display: `${total}c in 5c coins`, prompt: 'How many 5c coins?', options: numberOptions(total / 5, 3), answer: String(total / 5), bigOptions: true };
    }
    case 'bonds100': {
      const total = pick([100, 100, 50]);
      const a = randInt(1, total / 5 - 1) * 5;
      const answer = total - a;
      return { display: `${a}  +  ❓  =  ${total}`, prompt: `What goes with ${a} to make ${total}?`, options: numberOptions(answer, 15), answer: String(answer), bigOptions: true };
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
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  const [muted, setMuted] = useState(() => localStorage.getItem('playMuted') === '1');
  const [level, setLevel] = useState<Level>(() => (localStorage.getItem('playLevel') === 'year2' ? 'year2' : 'year1'));

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
    setRound(makeRound(id));
  }, []);

  const nextRound = useCallback(() => {
    if (!activeGame) return;
    if (roundNum >= ROUNDS_PER_GAME) {
      setFinished(true);
      // bank the stars earned this game
      const banked = Number(localStorage.getItem('playTotalStars') || '0') + stars;
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
      window.setTimeout(() => {
        nextRound();
      }, ok ? 900 : 1500);
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 3,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #fff1e6 0%, #ffe0f0 35%, #e3f2ff 70%, #e8fff4 100%)',
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
            top: `${10 + (i * 14) % 80}%`,
            [i % 2 ? 'right' : 'left']: `${4 + (i * 7) % 20}%`,
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={() => (activeGame ? backToHub() : navigate({ to: '/' }))}
          aria-label={activeGame ? 'Back to games' : 'Back to dashboard'}
          sx={{
            bgcolor: 'rgba(255,255,255,0.7)',
            color: '#7b1fa2',
            border: '3px solid #d65db1',
            borderRadius: '16px',
            '&:hover': { bgcolor: '#fff', transform: 'scale(1.05)' },
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
            bgcolor: 'rgba(255,255,255,0.75)',
            border: '3px solid #ffc75f',
            borderRadius: '999px',
            px: 2,
            py: 0.5,
          }}
        >
          <Typography sx={{ fontWeight: 900, color: '#ff8f00', fontSize: '1.2rem' }}>
            ⭐ {activeGame ? stars : totalStars}
          </Typography>
        </Box>

        <IconButton
          onClick={toggleMute}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          sx={{
            bgcolor: 'rgba(255,255,255,0.7)',
            color: '#00897b',
            border: '3px solid #00c9a7',
            borderRadius: '16px',
            '&:hover': { bgcolor: '#fff', transform: 'scale(1.05)' },
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
              color: '#d63384',
              textShadow: '2px 2px 0 #fff',
              animation: 'wobble 4s ease-in-out infinite',
            }}
          >
            🎪 Play &amp; Learn
          </Typography>
          <Typography sx={{ color: '#8e44ad', fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
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
              bgcolor: 'rgba(255,255,255,0.6)',
              border: '3px solid #fff',
              boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            }}
          >
            {([
              { id: 'year1' as Level, label: '🐣 Year 1', sub: 'Little learners' },
              { id: 'year2' as Level, label: '🚀 Year 2', sub: 'Challenge mode' },
            ]).map(t => {
              const selected = level === t.id;
              return (
                <Box
                  key={t.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={() => changeLevel(t.id)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); changeLevel(t.id); } }}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    borderRadius: '999px',
                    px: { xs: 2.5, sm: 4 },
                    py: 1,
                    textAlign: 'center',
                    transition: 'all 0.15s',
                    color: selected ? '#fff' : '#8e44ad',
                    background: selected ? 'linear-gradient(150deg, #d63384, #8e44ad)' : 'transparent',
                    boxShadow: selected ? '0 4px 12px rgba(214,51,132,0.4)' : 'none',
                    '&:focus-visible': { outline: '3px solid #6a1b9a', outlineOffset: 2 },
                  }}
                >
                  <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.1 }}>{t.label}</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.72rem', opacity: 0.85 }}>{t.sub}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
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
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startGame(g.id); } }}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '28px',
                  p: 3,
                  color: '#fff',
                  background: `linear-gradient(150deg, ${g.color} 0%, ${g.color2} 100%)`,
                  border: '4px solid #fff',
                  boxShadow: '0 10px 0 rgba(0,0,0,0.12), 0 14px 30px rgba(0,0,0,0.18)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  animation: `pop 0.4s ease ${i * 0.08}s both`,
                  '&:hover, &:focus-visible': {
                    transform: 'translateY(-6px) rotate(-1deg)',
                    boxShadow: '0 14px 0 rgba(0,0,0,0.12), 0 20px 38px rgba(0,0,0,0.22)',
                    outline: 'none',
                  },
                }}
              >
                <Typography sx={{ fontSize: '3.4rem', lineHeight: 1, mb: 1 }}>{g.emoji}</Typography>
                <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
                  {g.title}
                </Typography>
                <Typography sx={{ fontWeight: 600, opacity: 0.95, fontSize: '0.95rem' }}>{g.blurb}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ─── FINISHED ─── */}
      {activeGame && finished && meta && (
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', mt: 4, animation: 'pop 0.5s ease both' }}>
          <Typography sx={{ fontSize: '4.5rem', animation: 'floaty 3s ease-in-out infinite' }}>
            {stars >= ROUNDS_PER_GAME ? '🏆' : stars >= ROUNDS_PER_GAME / 2 ? '🌟' : '🎈'}
          </Typography>
          <Typography sx={{ fontWeight: 900, fontSize: '2.2rem', color: '#d63384', textShadow: '2px 2px 0 #fff' }}>
            {stars >= ROUNDS_PER_GAME ? 'Perfect! You\'re a star!' : stars >= ROUNDS_PER_GAME / 2 ? 'Great job!' : 'Well played!'}
          </Typography>
          <Typography sx={{ fontWeight: 800, color: '#ff8f00', fontSize: '1.6rem', my: 1 }}>
            You earned {stars} ⭐ in {meta.title}!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
            <PlayButton color="#00c9a7" onClick={() => startGame(meta.id)}>🔁 Play Again</PlayButton>
            <PlayButton color="#845ec2" onClick={backToHub}>🎪 Pick Another</PlayButton>
          </Box>
        </Box>
      )}

      {/* ─── PLAYING ─── */}
      {activeGame && !finished && round && meta && (
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 720, mx: 'auto', mt: 1 }}>
          {/* progress */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontWeight: 800, color: meta.color }}>{meta.emoji} {meta.title}</Typography>
              <Typography sx={{ fontWeight: 800, color: '#8e44ad' }}>Round {roundNum} / {ROUNDS_PER_GAME}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(roundNum - 1) / ROUNDS_PER_GAME * 100}
              sx={{
                height: 14, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.7)',
                '& .MuiLinearProgress-bar': { borderRadius: 999, background: `linear-gradient(90deg, ${meta.color}, ${meta.color2})` },
              }}
            />
          </Box>

          {/* question card */}
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.85)',
              border: '5px solid #fff',
              borderRadius: '28px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
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
                color: '#37474f',
                mb: 1,
                animation: 'pop 0.35s ease both',
                wordBreak: 'break-word',
              }}
            >
              {round.display}
            </Typography>
            <Typography sx={{ fontWeight: 700, color: '#6a1b9a', fontSize: '1.15rem' }}>
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
              let bg = 'linear-gradient(150deg, #ffffff 0%, #f3e9ff 100%)';
              let border = '#b39ddb';
              let textColor = '#4a148c';
              if (reveal && isAnswer) { bg = 'linear-gradient(150deg, #69f0ae 0%, #00c853 100%)'; border = '#00c853'; textColor = '#fff'; }
              else if (reveal && isPicked && !isAnswer) { bg = 'linear-gradient(150deg, #ff8a80 0%, #ff5252 100%)'; border = '#ff5252'; textColor = '#fff'; }
              return (
                <Box
                  key={opt}
                  role="button"
                  tabIndex={reveal ? -1 : 0}
                  aria-label={`Answer ${opt}`}
                  onClick={() => handlePick(opt)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(opt); } }}
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
                    fontSize: round.bigOptions ? { xs: '2rem', sm: '2.4rem' } : { xs: '1.1rem', sm: '1.3rem' },
                    boxShadow: reveal && isAnswer ? '0 8px 0 #00a040' : '0 6px 0 rgba(0,0,0,0.12)',
                    transition: 'transform 0.12s, box-shadow 0.12s',
                    position: 'relative',
                    minHeight: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: reveal && isAnswer ? 'pop 0.4s ease both' : 'none',
                    '&:hover': reveal ? {} : { transform: 'translateY(-3px)', boxShadow: '0 9px 0 rgba(0,0,0,0.12)' },
                    '&:focus-visible': { outline: '3px solid #6a1b9a', outlineOffset: 2 },
                  }}
                >
                  {opt}
                  {reveal && isAnswer && (
                    <Box aria-hidden sx={{ position: 'absolute', top: -10, right: -6, fontSize: '1.6rem', animation: 'burst 0.7s ease both' }}>🎉</Box>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* feedback */}
          <Box sx={{ minHeight: 48, mt: 2, textAlign: 'center' }}>
            {feedback && (
              <Typography
                key={feedback + roundNum}
                sx={{
                  display: 'inline-block',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  color: picked === round.answer ? '#00897b' : '#ef6c00',
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
function PlayButton({ children, color, onClick }: { children: React.ReactNode; color: string; onClick: () => void }) {
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
        color: '#fff',
        background: color,
        border: '3px solid #fff',
        boxShadow: `0 6px 0 rgba(0,0,0,0.15)`,
        '&:hover': { background: color, transform: 'translateY(-2px)', boxShadow: '0 8px 0 rgba(0,0,0,0.15)' },
        '&:active': { transform: 'translateY(2px)', boxShadow: '0 3px 0 rgba(0,0,0,0.15)' },
      }}
    >
      {children}
    </Button>
  );
}

export default PlayZoneSection;
