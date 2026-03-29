export interface User {
    username: string;
  }

  export interface Question {
    id: number;
    text: string;
    answer: string | number;
  }

  export interface ReadingPage {
    id: number;
    title: string;
    text: string;
    comprehensionQuestions: string[];
    vocabulary?: { word: string; definition: string }[];
  }
