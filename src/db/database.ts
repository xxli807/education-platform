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

const db = new Dexie('EnglishLearningApp') as Dexie & {
  comprehensionAnswers: EntityTable<ComprehensionAnswer, 'id'>;
  writingTasks: EntityTable<WritingTask, 'id'>;
};

// Schema definition
db.version(1).stores({
  comprehensionAnswers: '++id, storyIndex, questionIndex, question, answer, storyTitle, submittedAt, userId',
  writingTasks: '++id, taskIndex, prompt, response, submittedAt, userId'
});

export { db };
export type { ComprehensionAnswer, WritingTask };

