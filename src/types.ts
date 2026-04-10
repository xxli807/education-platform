export interface User {
    username: string;
  }

  export interface Question {
    id: number;
    text: string;
    answer: string | number;
    options?: string[];   // if present, render as multiple-choice
  }

  export interface ReadingPage {
    id: number;
    title: string;
    text: string;
    comprehensionQuestions: string[];
    vocabulary?: { word: string; definition: string }[];
    yearLevel?: 2 | 3;
  }
