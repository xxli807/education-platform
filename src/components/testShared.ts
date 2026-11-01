import { createContext, useContext } from 'react';
import { palette } from '../theme/palette';

// Colours, answer store and helpers shared by the worksheet-style test pages.

// Approximate light-theme colours (all from the central palette).
export const C = {
  pageBg: palette.gray25,
  panel: palette.white,
  border: palette.gray400,
  text: palette.slate950,
  heading: palette.blue875,
  accent: palette.blue825,
  subBg: palette.gray25,
  noteBg: palette.amber25,
  noteBorder: palette.amber625,
};

/** Shared answer store so every input can read/write its saved value. */
export const AnswersContext = createContext<{
  get: (id: string) => string;
  set: (id: string, value: string) => void;
  /** Answers are final (e.g. the test was finished) — inputs are disabled. */
  locked?: boolean;
}>({ get: () => '', set: () => {} });
export const useAnswers = () => useContext(AnswersContext);

/** Option letters for multiple-choice answers. */
export const LETTERS = 'ABCDEFG';
