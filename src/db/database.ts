import Dexie, { type EntityTable } from 'dexie';

interface ComprehensionAnswer {
  id?: number;
  storyIndex: number;
  questionIndex: number;
  question: string;
  answer: string;
  storyTitle: string;
  submittedAt: Date;
  userId?: string;
}

interface WritingTask {
  id?: number;
  taskIndex: number;
  prompt: string;
  response: string;
  submittedAt: Date;
  userId?: string;
}

interface MathSessionResult {
  id?: number;
  difficulty: 'standard' | 'advanced' | 'challenge';
  totalQuestions: number;
  correctCount: number;
  score: number;
  timeTakenSeconds: number;
  questionsData: string;
  completedAt: Date;
  userId: string;
}

interface ScienceSessionResult {
  id?: number;
  totalQuestions: number;
  correctCount: number;
  score: number;
  questionsData: string;
  completedAt: Date;
  userId: string;
}

interface ThinkingSessionResult {
  id?: number;
  category: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  timeTakenSeconds: number;
  questionsData: string;
  completedAt: Date;
  userId: string;
}

interface JournalEntry {
  id?: number;
  date: string;        // 'YYYY-MM-DD'
  mood: string;        // emoji
  content: string;
  savedAt: Date;
  userId: string;
}

const db = new Dexie('EnglishLearningApp') as Dexie & {
  comprehensionAnswers: EntityTable<ComprehensionAnswer, 'id'>;
  writingTasks: EntityTable<WritingTask, 'id'>;
  mathSessionResults: EntityTable<MathSessionResult, 'id'>;
  scienceSessionResults: EntityTable<ScienceSessionResult, 'id'>;
  journalEntries: EntityTable<JournalEntry, 'id'>;
  thinkingSessionResults: EntityTable<ThinkingSessionResult, 'id'>;
};

db.version(1).stores({
  comprehensionAnswers: '++id, storyIndex, questionIndex, question, answer, storyTitle, submittedAt, userId',
  writingTasks: '++id, taskIndex, prompt, response, submittedAt, userId'
});

db.version(2).stores({
  comprehensionAnswers: '++id, storyIndex, questionIndex, question, answer, storyTitle, submittedAt, userId',
  writingTasks: '++id, taskIndex, prompt, response, submittedAt, userId',
  mathSessionResults: '++id, difficulty, score, completedAt, userId',
  scienceSessionResults: '++id, score, completedAt, userId'
});

db.version(3).stores({
  comprehensionAnswers: '++id, storyIndex, questionIndex, question, answer, storyTitle, submittedAt, userId',
  writingTasks: '++id, taskIndex, prompt, response, submittedAt, userId',
  mathSessionResults: '++id, difficulty, score, completedAt, userId',
  scienceSessionResults: '++id, score, completedAt, userId',
  journalEntries: '++id, date, savedAt, userId'
});

db.version(4).stores({
  comprehensionAnswers: '++id, storyIndex, questionIndex, question, answer, storyTitle, submittedAt, userId',
  writingTasks: '++id, taskIndex, prompt, response, submittedAt, userId',
  mathSessionResults: '++id, difficulty, score, completedAt, userId',
  scienceSessionResults: '++id, score, completedAt, userId',
  journalEntries: '++id, date, savedAt, userId',
  thinkingSessionResults: '++id, category, score, completedAt, userId'
});

export { db };
export type { ComprehensionAnswer, WritingTask, MathSessionResult, ScienceSessionResult, JournalEntry, ThinkingSessionResult };
