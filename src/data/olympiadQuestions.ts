import { Question } from '../types';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type OlympiadGenerator = () => { text: string; answer: number; options?: string[] };

function buildOptions(correct: number, spread = 5): string[] {
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const delta = rand(1, spread) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = correct + delta;
    if (candidate !== correct && candidate >= 0 && !wrong.has(candidate)) {
      wrong.add(candidate);
    }
  }
  return [correct, ...wrong].map(String).sort(() => Math.random() - 0.5);
}

const arithmeticPattern: OlympiadGenerator = () => {
  const start = rand(1, 9);
  const step = rand(2, 7);
  const seq = [start, start + step, start + 2 * step, start + 3 * step];
  const answer = start + 4 * step;
  return {
    text: `Find the next number in the pattern: ${seq.join(', ')}, ?`,
    answer,
    options: buildOptions(answer, step + 2),
  };
};

const doublingPattern: OlympiadGenerator = () => {
  const start = rand(2, 6);
  const seq = [start, start * 2, start * 4, start * 8];
  const answer = start * 16;
  return {
    text: `What comes next? ${seq.join(', ')}, ?`,
    answer,
    options: buildOptions(answer, 10),
  };
};

const squarePattern: OlympiadGenerator = () => {
  const start = rand(1, 4);
  const seq = [start * start, (start + 1) * (start + 1), (start + 2) * (start + 2), (start + 3) * (start + 3)];
  const answer = (start + 4) * (start + 4);
  return {
    text: `Spot the rule and find the next number: ${seq.join(', ')}, ?`,
    answer,
    options: buildOptions(answer, 8),
  };
};

const triangularPattern: OlympiadGenerator = () => {
  const tri = (n: number) => (n * (n + 1)) / 2;
  const start = rand(1, 4);
  const seq = [tri(start), tri(start + 1), tri(start + 2), tri(start + 3)];
  const answer = tri(start + 4);
  return {
    text: `What is the next number? ${seq.join(', ')}, ?`,
    answer,
    options: buildOptions(answer, 6),
  };
};

const fibonacciPattern: OlympiadGenerator = () => {
  let a = rand(1, 3);
  let b = rand(1, 4);
  const seq = [a, b];
  for (let i = 0; i < 3; i++) {
    const next = a + b;
    seq.push(next);
    a = b;
    b = next;
  }
  const answer = a + b;
  return {
    text: `Each number is the sum of the two before it. What's next? ${seq.join(', ')}, ?`,
    answer,
    options: buildOptions(answer, 5),
  };
};

const digitSumRiddle: OlympiadGenerator = () => {
  const lo = rand(2, 7) * 10;
  const hi = lo + 10;
  const candidates: number[] = [];
  for (let n = lo; n <= hi; n++) {
    candidates.push(n);
  }
  const target = pick(candidates);
  const digitSum = String(target)
    .split('')
    .reduce((s, d) => s + Number(d), 0);
  return {
    text: `I'm thinking of a number between ${lo} and ${hi}. Its digits add up to ${digitSum}. What is the smallest such number?`,
    answer: candidates.find(n =>
      String(n)
        .split('')
        .reduce((s, d) => s + Number(d), 0) === digitSum
    )!,
  };
};

const halfAndAddRiddle: OlympiadGenerator = () => {
  const start = rand(2, 9) * 4; // ensure divisible
  const give = start / 2;
  const left = start - give;
  return {
    text: `Lucas had ${start} marbles. He gave half of them to his friend. How many does Lucas have left?`,
    answer: left,
  };
};

const reverseWordProblem: OlympiadGenerator = () => {
  const left = rand(8, 25);
  const givenAway = left;
  const start = left + givenAway;
  return {
    text: `After giving away half of her stickers, Mia has ${left} stickers left. How many did she start with?`,
    answer: start,
  };
};

const ageProblem: OlympiadGenerator = () => {
  const myAge = rand(7, 10);
  const diff = rand(2, 4);
  const yearsLater = rand(3, 6);
  const sisterFutureAge = myAge - diff + yearsLater;
  return {
    text: `Lucas is ${myAge} years old. His sister is ${diff} years younger. In ${yearsLater} years, how old will his sister be?`,
    answer: sisterFutureAge,
  };
};

const sumPairProblem: OlympiadGenerator = () => {
  const a = rand(2, 9);
  const b = rand(2, 9);
  const c = rand(2, 9);
  return {
    text: `If A + B = ${a + b}, B + C = ${b + c}, and A + C = ${a + c}, what is C?`,
    answer: c,
    options: buildOptions(c, 4),
  };
};

const handshakeProblem: OlympiadGenerator = () => {
  const n = rand(4, 7);
  const total = (n * (n - 1)) / 2;
  return {
    text: `${n} friends meet up. If each one shakes hands with every other person exactly once, how many handshakes happen in total?`,
    answer: total,
    options: buildOptions(total, 5),
  };
};

const countingByGroups: OlympiadGenerator = () => {
  const legsPerSpider = 8;
  const spiders = rand(3, 8);
  const ants = rand(2, 6);
  const total = spiders * legsPerSpider + ants * 6;
  return {
    text: `In a jar there are ${spiders} spiders and ${ants} ants. Spiders have 8 legs and ants have 6 legs. How many legs in total?`,
    answer: total,
  };
};

const remainderRiddle: OlympiadGenerator = () => {
  const perGroup = rand(4, 8);
  const groups = rand(3, 6);
  // the left-over must be smaller than the bag size, or it isn't a remainder
  const left = rand(1, perGroup - 1);
  const total = groups * perGroup + left;
  return {
    text: `${total} sweets are shared into bags of ${perGroup}. How many sweets are left over?`,
    answer: left,
  };
};

const equationRiddle: OlympiadGenerator = () => {
  const x = rand(2, 12);
  const m = rand(2, 5);
  const c = rand(1, 9);
  return {
    text: `Find the missing number: ${m} × ? + ${c} = ${m * x + c}`,
    answer: x,
    options: buildOptions(x, 4),
  };
};

const generators: OlympiadGenerator[] = [
  arithmeticPattern,
  doublingPattern,
  squarePattern,
  triangularPattern,
  fibonacciPattern,
  digitSumRiddle,
  halfAndAddRiddle,
  reverseWordProblem,
  ageProblem,
  sumPairProblem,
  handshakeProblem,
  countingByGroups,
  remainderRiddle,
  equationRiddle,
];

export function generateOlympiadQuestions(count = 12): Question[] {
  const shuffled = [...generators].sort(() => Math.random() - 0.5);
  const out: Question[] = [];
  for (let i = 0; i < count; i++) {
    const gen = shuffled[i % shuffled.length];
    const { text, answer, options } = gen();
    out.push({ id: i + 1, text, answer, options });
  }
  return out;
}
