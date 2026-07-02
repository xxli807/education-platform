import { Question } from '../types';

// Placeholder: Questions are generated dynamically in MathSection.tsx
export const mathQuestions: Question[] = [];

export type Difficulty = 'standard' | 'advanced' | 'challenge';

interface WordProblemTemplate {
  template: (a: number, b: number) => string;
  generate: () => { a: number; b: number; answer: number };
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const wordProblemTemplates: WordProblemTemplate[] = [
  {
    template: (a, b) =>
      `Lucas has ${a} apples. He gives ${b} to his friend. How many does he have left?`,
    generate: () => {
      const a = rand(20, 99);
      const b = rand(1, a - 1);
      return { a, b, answer: a - b };
    },
  },
  {
    template: (a, b) =>
      `There are ${a} children in the class. Each child has ${b} pencils. How many pencils in total?`,
    generate: () => {
      const a = rand(3, 12);
      const b = rand(2, 10);
      return { a, b, answer: a * b };
    },
  },
  {
    template: (a, b) =>
      `A baker made ${a} cupcakes. He sold ${b} of them. How many are left?`,
    generate: () => {
      const a = rand(30, 100);
      const b = rand(5, a - 1);
      return { a, b, answer: a - b };
    },
  },
  {
    template: (a, b) =>
      `Lucas read ${a} pages on Monday and ${b} pages on Tuesday. How many pages did he read in total?`,
    generate: () => {
      const a = rand(15, 80);
      const b = rand(15, 80);
      return { a, b, answer: a + b };
    },
  },
  {
    template: (a, b) =>
      `There are ${a} stickers shared equally among ${b} friends. How many stickers does each friend get?`,
    generate: () => {
      const b = rand(2, 10);
      const multiplier = rand(2, 12);
      const a = b * multiplier;
      return { a, b, answer: multiplier };
    },
  },
  {
    template: (a, b) =>
      `A shop has ${a} toys on ${b} shelves, with the same number on each shelf. How many toys on each shelf?`,
    generate: () => {
      const b = rand(2, 8);
      const perShelf = rand(3, 12);
      const a = b * perShelf;
      return { a, b, answer: perShelf };
    },
  },
  {
    template: (a, b) =>
      `Lucas saved $${a} last week and $${b} this week. How much has he saved in total?`,
    generate: () => {
      const a = rand(10, 50);
      const b = rand(10, 50);
      return { a, b, answer: a + b };
    },
  },
  {
    template: (a, b) =>
      `There are ${a} birds in a tree. ${b} more birds fly in. How many birds are there now?`,
    generate: () => {
      const a = rand(20, 80);
      const b = rand(10, 60);
      return { a, b, answer: a + b };
    },
  },
];

export function generateWordProblem(): Question {
  const template =
    wordProblemTemplates[rand(0, wordProblemTemplates.length - 1)];
  const { a, b, answer } = template.generate();
  return {
    id: 0,
    text: template.template(a, b),
    answer,
  };
}

export function generateMissingNumberProblem(): Question {
  const opType = rand(0, 3);
  let text: string;
  let answer: number;

  switch (opType) {
    case 0: {
      answer = rand(2, 50);
      const b = rand(1, 50);
      text = `? + ${b} = ${answer + b}`;
      break;
    }
    case 1: {
      answer = rand(10, 80);
      const b = rand(1, answer - 1);
      text = `? - ${b} = ${answer - b}`;
      break;
    }
    case 2: {
      answer = rand(2, 12);
      const b = rand(2, 12);
      text = `? × ${b} = ${answer * b}`;
      break;
    }
    default: {
      // ? ÷ b = quotient  →  the missing number is quotient × b
      const quotient = rand(2, 12);
      const b = rand(2, 12);
      answer = quotient * b;
      text = `? ÷ ${b} = ${quotient}`;
      break;
    }
  }

  return { id: 0, text: `Find the missing number: ${text}`, answer };
}

export function generateHalfProblem(): Question {
  const num = rand(4, 100) * 2; // ensure even
  return {
    id: 0,
    text: `What is half of ${num}?`,
    answer: num / 2,
  };
}
