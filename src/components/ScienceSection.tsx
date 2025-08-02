import { useState } from 'react';
import { Container, Typography, Card, CardContent, TextField, Button, List } from '@mui/material';
import { scienceQuestions } from '../data/scienceQuestions';

function ScienceSection() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckAnswers = () => {
    setShowAnswers(true);
  };

  const handleMoreQuestions = () => {
    setAnswers({});
    setShowAnswers(false);
  };

  return (
    <Container maxWidth="md" className="min-h-screen bg-gradient-to-r from-green-200 to-teal-200 py-8">
      <Typography variant="h3" className="text-center text-green-600 font-bold mb-8">
        Science Quest Zone
      </Typography>
      <List>
        {scienceQuestions.map((question) => (
          <Card key={question.id} className="mb-4 bg-white">
            <CardContent>
              <Typography variant="h6" className="text-green-600 mb-2">
                {question.text}
              </Typography>
              <TextField
                label="Your Answer"
                variant="outlined"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="mb-2"
                InputProps={{ className: 'bg-green-50' }}
              />
              {showAnswers && (
                <Typography className={answers[question.id]?.toLowerCase() === question.answer.toString().toLowerCase() ? 'text-green-600' : 'text-red-600'}>
                  Answer: {question.answer} {answers[question.id]?.toLowerCase() === question.answer.toString().toLowerCase() ? '(Correct)' : '(Incorrect)'}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </List>
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
    </Container>
  );
}

export default ScienceSection;