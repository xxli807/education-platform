import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as WrongIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { scienceQuestions } from '../data/scienceQuestions';
import { db } from '../db/database';
import type { ScienceSessionResult } from '../db/database';
import SectionContainer from './SectionContainer';
import YouTubeReward from './Video';

const encouragingCorrect = [
  'Awesome! 🌟',
  'You got it! ⭐',
  'Super star! 🎉',
  'Brilliant! 🧠',
  'Amazing! 🚀',
];

const encouragingIncorrect = [
  'Almost! The answer is',
  'Good try! It\'s actually',
  'So close! The answer is',
];

function getRandomEncouragement(correct: boolean): string {
  const list = correct ? encouragingCorrect : encouragingIncorrect;
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomQuestions(count: number) {
  const shuffled = [...scienceQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function ScienceSection() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState(getRandomQuestions(10));
  const [allCorrect, setAllCorrect] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ScienceSessionResult[]>([]);
  const [feedbackMessages, setFeedbackMessages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const results = await db.scienceSessionResults
      .where('userId')
      .equals('lucas')
      .reverse()
      .sortBy('completedAt');
    setHistory(results.slice(0, 10));
  };

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleCheckAnswers = useCallback(async () => {
    setShowAnswers(true);

    const correctCount = questions.filter(q => {
      const val = answers[q.id];
      return val?.toLowerCase() === q.answer.toString().toLowerCase();
    }).length;

    setAllCorrect(correctCount === questions.length);

    // Generate feedback messages
    const messages: { [key: number]: string } = {};
    questions.forEach(q => {
      const isCorrect =
        answers[q.id]?.toLowerCase() === q.answer.toString().toLowerCase();
      messages[q.id] = getRandomEncouragement(isCorrect);
    });
    setFeedbackMessages(messages);

    // Save to IndexedDB
    const questionsData = JSON.stringify(
      questions.map(q => ({
        text: q.text,
        correctAnswer: q.answer,
        userAnswer: answers[q.id] || '',
        isCorrect:
          answers[q.id]?.toLowerCase() === q.answer.toString().toLowerCase(),
      }))
    );

    await db.scienceSessionResults.add({
      totalQuestions: questions.length,
      correctCount,
      score: Math.round((correctCount / questions.length) * 100),
      questionsData,
      completedAt: new Date(),
      userId: 'lucas',
    });

    loadHistory();
  }, [questions, answers]);

  const handleMoreQuestions = useCallback(() => {
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    setQuestions(getRandomQuestions(10));
    setFeedbackMessages({});
  }, []);

  const correctCount = showAnswers
    ? questions.filter(q =>
        answers[q.id]?.toLowerCase() === q.answer.toString().toLowerCase()
      ).length
    : 0;

  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.02)' },
  };

  return (
    <SectionContainer name="Science">
      {/* Score Summary */}
      {showAnswers && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: allCorrect
              ? 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)'
              : 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: allCorrect ? '#fff' : '#333' }}
          >
            {allCorrect
              ? '🎉 AMAZING! You\'re a science superstar! 🔬'
              : `${correctCount}/${questions.length} correct! Great effort! 🧪`}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {questions.map(question => {
          const isCorrect =
            showAnswers &&
            answers[question.id]?.toLowerCase() ===
              question.answer.toString().toLowerCase();

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={question.id}>
              <Card
                sx={{
                  ...cardStyle,
                  bgcolor: showAnswers
                    ? isCorrect
                      ? '#e8f5e9'
                      : '#ffebee'
                    : '#e8f5e9',
                  border: showAnswers
                    ? isCorrect
                      ? '2px solid #4caf50'
                      : '2px solid #ef5350'
                    : '2px solid #81c784',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#2e7d32',
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.1rem',
                      minHeight: '3em',
                    }}
                  >
                    🔬 {question.text}
                  </Typography>
                  <TextField
                    label="Your Answer"
                    variant="outlined"
                    value={answers[question.id] || ''}
                    onChange={e =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    sx={{
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#f1f8e9',
                      },
                    }}
                    fullWidth
                  />
                  {showAnswers && (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {isCorrect ? (
                        <CheckIcon sx={{ color: '#4caf50' }} />
                      ) : (
                        <WrongIcon sx={{ color: '#ef5350' }} />
                      )}
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          color: isCorrect ? '#2e7d32' : '#c62828',
                        }}
                      >
                        {isCorrect
                          ? feedbackMessages[question.id]
                          : `${feedbackMessages[question.id]} ${question.answer}`}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          onClick={handleCheckAnswers}
          sx={{
            borderRadius: '25px',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            bgcolor: '#4caf50',
            '&:hover': { bgcolor: '#388e3c' },
            textTransform: 'none',
          }}
        >
          ✅ Check Answers
        </Button>
        <Button
          variant="contained"
          onClick={handleMoreQuestions}
          sx={{
            borderRadius: '25px',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            bgcolor: '#009688',
            '&:hover': { bgcolor: '#00796b' },
            textTransform: 'none',
          }}
        >
          🔄 More Questions
        </Button>
      </Box>

      {/* YouTube Reward */}
      <YouTubeReward
        visible={allCorrect}
        title="Great job! All science answers are correct 🎉"
        description="Enjoy your reward: search for a ~5 minute YouTube video to watch."
        minDurationSec={5 * 60}
        maxDurationSec={10 * 60}
        className="mt-4"
      />

      {/* History Section */}
      <Box sx={{ mt: 4 }}>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          startIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: '#2e7d32',
            fontSize: '1rem',
          }}
        >
          📊 Recent Results ({history.length})
        </Button>
        <Collapse in={showHistory}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {history.map(result => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                <Card sx={{ ...cardStyle, bgcolor: '#e8f5e9' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Chip
                        label="Science"
                        size="small"
                        sx={{ fontWeight: 'bold', bgcolor: '#4caf50', color: '#fff' }}
                      />
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        {new Date(result.completedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {result.score === 100 ? (
                        <TrophyIcon sx={{ color: '#ffc107' }} />
                      ) : (
                        <StarIcon sx={{ color: '#ff9800' }} />
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {result.correctCount}/{result.totalQuestions} (
                        {result.score}%)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {history.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  sx={{ color: '#999', textAlign: 'center', py: 2 }}
                >
                  No results yet. Complete a session to see your history! 🔬
                </Typography>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Box>
    </SectionContainer>
  );
}

export default ScienceSection;
