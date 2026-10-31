// Shapes shared by the OC-style test cards (official practice tests, older
// official sample test, original practice sets).

import type { TestBlock } from './testsContent';

export interface OcPaper {
  /** Stable key used in saved answers, e.g. 'maths' or 'part1'. */
  id: string;
  title: string;
  emoji: string;
  /** Time limit for the timed exam. */
  minutes: number;
  /** Answer key, one letter per question (question 1 first). */
  answers: string;
  blocks: TestBlock[];
}

export interface OcPractice {
  label: string;
  papers: OcPaper[];
}

export interface OcCollection {
  /** Page heading, e.g. '🎓 OC'. */
  title: string;
  /** localStorage key for answers, timers and finished flags. */
  storageKey: string;
  /** One line telling parents where the questions come from. */
  source: string;
  practices: OcPractice[];
}
