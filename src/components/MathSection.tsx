import {
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Question } from '../types';
import SectionContainer from './SectionContainer';
import YouTubeReward from './Video';

function generateMathQuestions(): Question[] {
  const questions: Question[] = [];

  for (let i = 1; i <= 16; i++) {
    // Randomly select operation (add, subtract, multiply, divide)
    const operationIndex = Math.floor(Math.random() * 4);
    // Initialize with default values to prevent "used before assigned" errors
    let num1 = 0;
    let num2 = 0;
    let text = '';
    let answer = 0;

    switch (operationIndex) {
      case 0: // Addition
        // Numbers up to 20 for addition
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        text = `What is ${num1} + ${num2}?`;
        answer = num1 + num2;
        break;

      case 1: // Subtraction
        // Ensure no negative answers for subtraction
        num1 = Math.floor(Math.random() * 20) + 10; // Minimum 10
        num2 = Math.floor(Math.random() * num1); // Ensure num2 < num1
        text = `What is ${num1} - ${num2}?`;
        answer = num1 - num2;
        break;

      case 2: // Multiplication
        // Focus on small times tables (2, 3, 5, 10) for Year 2
        const timesTableOptions = [2, 3, 5, 10];
        num1 =
          timesTableOptions[
            Math.floor(Math.random() * timesTableOptions.length)
          ];
        num2 = Math.floor(Math.random() * 10) + 1; // Up to 10
        text = `What is ${num1} × ${num2}?`;
        answer = num1 * num2;
        break;

      case 3: // Division
        // Simple division with no remainders
        num2 = Math.floor(Math.random() * 5) + 2; // Divisors 2-6
        // Generate a multiple of num2 for clean division
        const multiplier = Math.floor(Math.random() * 5) + 1; // 1-5
        num1 = num2 * multiplier;
        text = `What is ${num1} ÷ ${num2}?`;
        answer = num1 / num2;
        break;

      default:
        // This won't ever execute because operationIndex is 0-3,
        // but TypeScript needs this for type safety
        text = 'Error: Invalid operation';
        break;
    }

    questions.push({ id: i, text, answer });
  }

  return questions;
}

function MathSection() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    setQuestions(generateMathQuestions());
  }, []);

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleMoreQuestions = useCallback(() => {
    setQuestions(generateMathQuestions());
    setAnswers({});
    setShowAnswers(false);
  }, []);

  const isEveryAnswerCorrect = useMemo(() => {
    if (!questions.length) return false;
    return questions.every(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === q.answer;
    });
  }, [answers, questions]);

  const handleCheckAnswers = useCallback(() => {
    setShowAnswers(true);
    setAllCorrect(isEveryAnswerCorrect);
  }, [isEveryAnswerCorrect]);

  return (
    <SectionContainer name="Math">
      <Grid2 container spacing={4}>
        {questions.map(question => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={question.id}>
            <Card className="bg-white">
              <CardContent>
                <Typography variant="h6" className="text-red-600 mb-2">
                  {question.text}
                </Typography>
                <TextField
                  label="Your Answer"
                  variant="outlined"
                  type="number"
                  value={answers[question.id] || ''}
                  onChange={e =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="mb-2"
                  InputProps={{ className: 'bg-yellow-50' }}
                />
                {showAnswers && (
                  // <div
                  // className={
                  // answers[question.id]?.toString() ===
                  // question.answer.toString()
                  //   ? '!text-green-600 !font-bold mb-[3px] mt-[3px]'
                  //   : '!text-red-600 !font-bold mb-[3px] mt-[3px]'
                  // }
                  // >
                  <div className="!text-red-600 !font-bold mt-[30px] ">
                    Answer: {question.answer}{' '}
                    {answers[question.id]?.toString() ===
                    question.answer.toString()
                      ? '(Correct)'
                      : '(Incorrect)'}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <div className="mt-[20px] mb-[20px]">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckAnswers}
          className="bg-red-500 hover:bg-red-600 text-white !mr-5"
        >
          Check Answers
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMoreQuestions}
          className="bg-orange-500 hover:bg-orange-600 text-white !ml-[10px]"
        >
          More Questions
        </Button>

        <YouTubeReward
          visible={allCorrect}
          title="Great job! All answers are correct 🎉"
          description="Enjoy your reward: search for a ~5 minute YouTube video to watch."
          minDurationSec={1 * 60}
          maxDurationSec={15 * 60}
          className="mt-4"
        />
      </div>
    </SectionContainer>
  );
}

export default MathSection;
