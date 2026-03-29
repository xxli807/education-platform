import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as WrongIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timer as TimerIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Question } from '../types';
import { db } from '../db/database';
import type { MathSessionResult } from '../db/database';
import {
  Difficulty,
  generateWordProblem,
  generateMissingNumberProblem,
  generateHalfProblem,
} from '../data/mathQuestions';
import SectionContainer from './SectionContainer';
import YouTubeReward from './Video';

const encouragingCorrect = [
  'Awesome! 🌟',
  'You got it! ⭐',
  'Super star! 🎉',
  'Brilliant! 🧠',
  'Amazing! 🚀',
  'Perfect! 💯',
];

const encouragingIncorrect = [
  'Almost! The answer is',
  'Good try! It\'s actually',
  'So close! The answer is',
  'Nice effort! It\'s',
];

function getRandomEncouragement(correct: boolean): string {
  const list = correct ? encouragingCorrect : encouragingIncorrect;
  return list[Math.floor(Math.random() * list.length)];
}

function generateMathQuestions(difficulty: Difficulty): Question[] {
  const questions: Question[] = [];
  const totalQuestions = 16;

  for (let i = 1; i <= totalQuestions; i++) {
    if (difficulty === 'challenge') {
      // Challenge: mix in word problems, missing-number, and half problems
      if (i <= 4) {
        const wp = generateWordProblem();
        wp.id = i;
        questions.push(wp);
        continue;
      } else if (i <= 6) {
        const mp = generateMissingNumberProblem();
        mp.id = i;
        questions.push(mp);
        continue;
      } else if (i <= 8) {
        const hp = generateHalfProblem();
        hp.id = i;
        questions.push(hp);
        continue;
      }
    }

    const operationIndex = Math.floor(Math.random() * 4);
    let num1 = 0;
    let num2 = 0;
    let text: string;
    let answer = 0;

    switch (operationIndex) {
      case 0: // Addition
        if (difficulty === 'challenge') {
          num1 = Math.floor(Math.random() * 900) + 100;
          num2 = Math.floor(Math.random() * 900) + 100;
        } else if (difficulty === 'advanced') {
          num1 = Math.floor(Math.random() * 100) + 1;
          num2 = Math.floor(Math.random() * 100) + 1;
        } else {
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 20) + 1;
        }
        text = `What is ${num1} + ${num2}?`;
        answer = num1 + num2;
        break;

      case 1: // Subtraction
        if (difficulty === 'challenge') {
          num1 = Math.floor(Math.random() * 900) + 100;
          num2 = Math.floor(Math.random() * num1) + 1;
        } else if (difficulty === 'advanced') {
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * num1) + 1;
        } else {
          num1 = Math.floor(Math.random() * 20) + 10;
          num2 = Math.floor(Math.random() * num1);
        }
        text = `What is ${num1} - ${num2}?`;
        answer = num1 - num2;
        break;

      case 2: { // Multiplication
        if (difficulty === 'challenge') {
          num1 = Math.floor(Math.random() * 20) + 2;
          num2 = Math.floor(Math.random() * 9) + 2;
        } else if (difficulty === 'advanced') {
          num1 = Math.floor(Math.random() * 12) + 2;
          num2 = Math.floor(Math.random() * 12) + 1;
        } else {
          const timesTableOptions = [2, 3, 5, 10];
          num1 = timesTableOptions[Math.floor(Math.random() * timesTableOptions.length)];
          num2 = Math.floor(Math.random() * 10) + 1;
        }
        text = `What is ${num1} × ${num2}?`;
        answer = num1 * num2;
        break;
      }

      case 3: { // Division
        if (difficulty === 'challenge') {
          num2 = Math.floor(Math.random() * 11) + 2;
          const multiplier = Math.floor(Math.random() * 12) + 2;
          num1 = num2 * multiplier;
        } else if (difficulty === 'advanced') {
          num2 = Math.floor(Math.random() * 11) + 2;
          const multiplier = Math.floor(Math.random() * 10) + 2;
          num1 = num2 * multiplier;
        } else {
          num2 = Math.floor(Math.random() * 5) + 2;
          const multiplier = Math.floor(Math.random() * 5) + 1;
          num1 = num2 * multiplier;
        }
        text = `What is ${num1} ÷ ${num2}?`;
        answer = num1 / num2;
        break;
      }

      default:
        text = 'Error: Invalid operation';
        break;
    }

    // For advanced difficulty, convert some regular questions to two-step
    if (difficulty === 'advanced' && i % 4 === 0) {
      const num3 = Math.floor(Math.random() * 20) + 1;
      const op2 = Math.random() > 0.5 ? '+' : '-';
      if (op2 === '+') {
        text = `What is ${num1} + ${num2} + ${num3}?`;
        answer = num1 + num2 + num3;
      } else {
        const base = num1 + num2;
        const sub = Math.floor(Math.random() * Math.min(base, 20)) + 1;
        text = `What is ${num1} + ${num2} - ${sub}?`;
        answer = base - sub;
      }
    }

    questions.push({ id: i, text, answer });
  }

  return questions;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function MathSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>('standard');
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateMathQuestions('standard')
  );
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<MathSessionResult[]>([]);
  const [feedbackMessages, setFeedbackMessages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const results = await db.mathSessionResults
      .where('userId')
      .equals('lucas')
      .reverse()
      .sortBy('completedAt');
    setHistory(results.slice(0, 10));
  };

  const handleDifficultyChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newDifficulty: Difficulty | null) => {
      if (newDifficulty) {
        setDifficulty(newDifficulty);
        setQuestions(generateMathQuestions(newDifficulty));
        setAnswers({});
        setShowAnswers(false);
        setAllCorrect(false);
        setStartTime(Date.now());
        setTimeTaken(null);
        setFeedbackMessages({});
      }
    },
    []
  );

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleMoreQuestions = useCallback(() => {
    setQuestions(generateMathQuestions(difficulty));
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    setStartTime(Date.now());
    setTimeTaken(null);
    setFeedbackMessages({});
  }, [difficulty]);

  const isEveryAnswerCorrect = useMemo(() => {
    if (!questions.length) return false;
    return questions.every(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === q.answer;
    });
  }, [answers, questions]);

  const correctCount = useMemo(() => {
    return questions.filter(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === q.answer;
    }).length;
  }, [answers, questions]);

  const handleCheckAnswers = useCallback(async () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setTimeTaken(elapsed);
    setShowAnswers(true);
    setAllCorrect(isEveryAnswerCorrect);

    // Generate feedback messages
    const messages: { [key: number]: string } = {};
    questions.forEach(q => {
      const isCorrect =
        answers[q.id] !== undefined &&
        answers[q.id] !== '' &&
        Number(answers[q.id]) === q.answer;
      messages[q.id] = getRandomEncouragement(isCorrect);
    });
    setFeedbackMessages(messages);

    // Save to IndexedDB
    const count = questions.filter(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === q.answer;
    }).length;

    const questionsData = JSON.stringify(
      questions.map(q => ({
        text: q.text,
        correctAnswer: q.answer,
        userAnswer: answers[q.id] || '',
        isCorrect: Number(answers[q.id]) === q.answer,
      }))
    );

    await db.mathSessionResults.add({
      difficulty,
      totalQuestions: questions.length,
      correctCount: count,
      score: Math.round((count / questions.length) * 100),
      timeTakenSeconds: elapsed,
      questionsData,
      completedAt: new Date(),
      userId: 'lucas',
    });

    loadHistory();
  }, [startTime, isEveryAnswerCorrect, questions, answers, difficulty]);

  const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.02)' },
  };

  return (
    <SectionContainer name="Math">
      {/* Difficulty Selector */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#e91e63', fontWeight: 'bold' }}>
          🎯 Choose Your Level
        </Typography>
        <ToggleButtonGroup
          value={difficulty}
          exclusive
          onChange={handleDifficultyChange}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '20px !important',
              px: 3,
              py: 1,
              mx: 0.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              border: '2px solid !important',
            },
          }}
        >
          <ToggleButton
            value="standard"
            sx={{
              '&.Mui-selected': { bgcolor: '#fff3e0', color: '#e65100', borderColor: '#e65100 !important' },
            }}
          >
            ⭐ Standard
          </ToggleButton>
          <ToggleButton
            value="advanced"
            sx={{
              '&.Mui-selected': { bgcolor: '#e3f2fd', color: '#1565c0', borderColor: '#1565c0 !important' },
            }}
          >
            🌟 Advanced
          </ToggleButton>
          <ToggleButton
            value="challenge"
            sx={{
              '&.Mui-selected': { bgcolor: '#fce4ec', color: '#c62828', borderColor: '#c62828 !important' },
            }}
          >
            🔥 Challenge
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Score Summary (after checking) */}
      {showAnswers && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: allCorrect
              ? 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)'
              : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: allCorrect ? '#fff' : '#333' }}>
            {allCorrect
              ? '🎉 AMAZING! You\'re a superstar! 🌟'
              : `${correctCount}/${questions.length} correct! Keep going! 💪`}
          </Typography>
          {timeTaken !== null && (
            <Chip
              icon={<TimerIcon />}
              label={`Time: ${formatTime(timeTaken)}`}
              sx={{ mt: 1, fontSize: '1rem', py: 2, px: 1, bgcolor: 'rgba(255,255,255,0.7)' }}
            />
          )}
        </Box>
      )}

      {/* Question Grid */}
      <Grid container spacing={3}>
        {questions.map(question => {
          const isCorrect =
            showAnswers &&
            answers[question.id] !== undefined &&
            answers[question.id] !== '' &&
            Number(answers[question.id]) === question.answer;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={question.id}>
              <Card
                sx={{
                  ...cardStyle,
                  bgcolor: showAnswers
                    ? isCorrect
                      ? '#e8f5e9'
                      : '#ffebee'
                    : '#fff8e1',
                  border: showAnswers
                    ? isCorrect
                      ? '2px solid #4caf50'
                      : '2px solid #ef5350'
                    : '2px solid #ffca28',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#e91e63',
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.1rem',
                      minHeight: '3em',
                    }}
                  >
                    {question.text}
                  </Typography>
                  <TextField
                    label="Your Answer"
                    variant="outlined"
                    type="number"
                    value={answers[question.id] || ''}
                    onChange={e => handleAnswerChange(question.id, e.target.value)}
                    sx={{
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#fffde7',
                      },
                    }}
                    fullWidth
                  />
                  {showAnswers && (
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
            bgcolor: '#e91e63',
            '&:hover': { bgcolor: '#c2185b' },
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
            bgcolor: '#ff9800',
            '&:hover': { bgcolor: '#f57c00' },
            textTransform: 'none',
          }}
        >
          🔄 More Questions
        </Button>
      </Box>

      {/* YouTube Reward */}
      <YouTubeReward
        visible={allCorrect}
        title="Great job! All answers are correct 🎉"
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
            color: '#e91e63',
            fontSize: '1rem',
          }}
        >
          📊 Recent Results ({history.length})
        </Button>
        <Collapse in={showHistory}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {history.map(result => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                <Card sx={{ ...cardStyle, bgcolor: '#fce4ec' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={result.difficulty}
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          bgcolor:
                            result.difficulty === 'challenge'
                              ? '#ef5350'
                              : result.difficulty === 'advanced'
                                ? '#42a5f5'
                                : '#ffa726',
                          color: '#fff',
                        }}
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
                        {result.correctCount}/{result.totalQuestions} ({result.score}%)
                      </Typography>
                    </Box>
                    <Chip
                      icon={<TimerIcon />}
                      label={formatTime(result.timeTakenSeconds)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {history.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: '#999', textAlign: 'center', py: 2 }}>
                  No results yet. Complete a session to see your history! 📝
                </Typography>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Box>
    </SectionContainer>
  );
}

export default MathSection;
