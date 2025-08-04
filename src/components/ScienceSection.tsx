import {
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { scienceQuestions } from '../data/scienceQuestions';
import SectionContainer from './SectionContainer';

function getRandomQuestions(count: number) {
  const shuffled = [...scienceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function ScienceSection() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState(getRandomQuestions(10));

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckAnswers = () => {
    setShowAnswers(true);
  };

  const handleMoreQuestions = () => {
    setAnswers({});
    setShowAnswers(false);
    setQuestions(getRandomQuestions(10));
  };

  return (
    <SectionContainer name="Science">
      <Grid2 container spacing={3}>
        {questions.map(question => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={question.id}>
            <Card key={question.id} className="mb-4 bg-white">
              <CardContent>
                <Typography variant="h6" className="text-green-600 mb-2">
                  {question.text}
                </Typography>
                <TextField
                  label="Your Answer"
                  variant="outlined"
                  value={answers[question.id] || ''}
                  onChange={e =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="mb-2"
                  InputProps={{ className: 'bg-green-50' }}
                />
                {showAnswers && (
                  <Typography
                    className={
                      answers[question.id]?.toLowerCase() ===
                      question.answer.toString().toLowerCase()
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    Answer: {question.answer}{' '}
                    {answers[question.id]?.toLowerCase() ===
                    question.answer.toString().toLowerCase()
                      ? '(Correct)'
                      : '(Incorrect)'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckAnswers}
        className="bg-green-500 hover:bg-green-600 text-white mr-4"
      >
        Check Answers
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleMoreQuestions}
        className="bg-teal-500 hover:bg-teal-600 text-white"
      >
        More Questions
      </Button>
    </SectionContainer>
  );
}

export default ScienceSection;
