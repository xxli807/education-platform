import { palette, withAlpha } from '../theme/palette';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Select,
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
  Replay as ReplayIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import SessionReviewDialog, {
  type ReviewQuestion,
} from './SessionReviewDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import React, { useCallback, useEffect, useState } from 'react';
import {
  type ScienceQuestion,
  type YearLevel,
  getRandomQuestionsByYear,
  getRandomQuestionsByTopic,
  getTopicsForYear,
} from '../data/scienceQuestions';
import { db } from '../db/database';
import type { ScienceSessionResult } from '../db/database';
import SectionContainer from './SectionContainer';
import { formatSavedDateTime } from '../utils/formatDate';

const encouragingCorrect = [
  'Awesome! 🌟',
  'You got it! ⭐',
  'Super star! 🎉',
  'Brilliant! 🧠',
  'Amazing! 🚀',
];

const encouragingIncorrect = [
  'Almost! The answer is',
  "Good try! It's actually",
  'So close! The answer is',
];

function getRandomEncouragement(correct: boolean): string {
  const list = correct ? encouragingCorrect : encouragingIncorrect;
  return list[Math.floor(Math.random() * list.length)];
}

const darkCard = {
  borderRadius: '16px',
  boxShadow: `0 4px 16px ${withAlpha(palette.black, 0.4)}`,
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

const darkTextField = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: withAlpha(palette.white, 0.06),
    color: palette.white,
    '& fieldset': { borderColor: withAlpha(palette.white, 0.2) },
    '&:hover fieldset': { borderColor: withAlpha(palette.white, 0.4) },
    '&.Mui-focused fieldset': { borderColor: palette.green350 },
  },
  '& .MuiInputLabel-root': { color: palette.slate400 },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.green350 },
};

function ScienceSection() {
  const [yearLevel, setYearLevel] = useState<YearLevel>(() => {
    const saved = localStorage.getItem('scienceYearLevel');
    return saved ? (parseInt(saved) as YearLevel) : 2;
  });
  const [selectedTopic, setSelectedTopic] = useState<string>(() => {
    const saved = localStorage.getItem('scienceSelectedTopic');
    return saved || 'all';
  });
  const [answers, setAnswers] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('scienceAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [showAnswers, setShowAnswers] = useState(() => {
    const saved = localStorage.getItem('scienceShowAnswers');
    return saved ? JSON.parse(saved) : false;
  });
  const [questions, setQuestions] = useState<ScienceQuestion[]>(() => {
    const saved = localStorage.getItem('scienceQuestions');
    const savedYear = localStorage.getItem('scienceYearLevel');
    const year = savedYear ? (parseInt(savedYear) as YearLevel) : 2;
    return saved ? JSON.parse(saved) : getRandomQuestionsByYear(year, 10);
  });
  const [allCorrect, setAllCorrect] = useState(() => {
    const saved = localStorage.getItem('scienceAllCorrect');
    return saved ? JSON.parse(saved) : false;
  });
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ScienceSessionResult[]>([]);
  const [reviewResult, setReviewResult] = useState<ScienceSessionResult | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<ScienceSessionResult | null>(
    null
  );
  const [feedbackMessages, setFeedbackMessages] = useState<{
    [key: number]: string;
  }>(() => {
    const saved = localStorage.getItem('scienceFeedbackMessages');
    return saved ? JSON.parse(saved) : {};
  });

  const topics = yearLevel ? getTopicsForYear(yearLevel) : [];

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem('scienceYearLevel', yearLevel.toString());
  }, [yearLevel]);

  useEffect(() => {
    localStorage.setItem('scienceSelectedTopic', selectedTopic);
  }, [selectedTopic]);

  useEffect(() => {
    localStorage.setItem('scienceAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('scienceShowAnswers', JSON.stringify(showAnswers));
  }, [showAnswers]);

  useEffect(() => {
    localStorage.setItem('scienceQuestions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('scienceAllCorrect', JSON.stringify(allCorrect));
  }, [allCorrect]);

  useEffect(() => {
    localStorage.setItem(
      'scienceFeedbackMessages',
      JSON.stringify(feedbackMessages)
    );
  }, [feedbackMessages]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget?.id) return;
    await db.scienceSessionResults.delete(deleteTarget.id);
    setDeleteTarget(null);
    loadHistory();
  };

  const loadHistory = async () => {
    const results = await db.scienceSessionResults
      .where('userId')
      .equals('lucas')
      .reverse()
      .sortBy('completedAt');
    setHistory(results.slice(0, 10));
  };

  const loadQuestions = useCallback((year: YearLevel, topic: string) => {
    if (topic === 'all') {
      setQuestions(getRandomQuestionsByYear(year, 10));
    } else {
      setQuestions(getRandomQuestionsByTopic(year, topic, 10));
    }
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    setFeedbackMessages({});
  }, []);

  const handleYearChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newYear: YearLevel | null) => {
      if (newYear) {
        setYearLevel(newYear);
        setSelectedTopic('all');
        loadQuestions(newYear, 'all');
        localStorage.removeItem('scienceAnswers');
        localStorage.removeItem('scienceShowAnswers');
        localStorage.removeItem('scienceAllCorrect');
        localStorage.removeItem('scienceFeedbackMessages');
      }
    },
    [loadQuestions]
  );

  const handleTopicChange = useCallback(
    (topic: string) => {
      if (!yearLevel) return;
      setSelectedTopic(topic);
      loadQuestions(yearLevel, topic);
      localStorage.removeItem('scienceAnswers');
      localStorage.removeItem('scienceShowAnswers');
      localStorage.removeItem('scienceAllCorrect');
      localStorage.removeItem('scienceFeedbackMessages');
    },
    [yearLevel, loadQuestions]
  );

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

    const messages: { [key: number]: string } = {};
    questions.forEach(q => {
      const isCorrect =
        answers[q.id]?.toLowerCase() === q.answer.toString().toLowerCase();
      messages[q.id] = getRandomEncouragement(isCorrect);
    });
    setFeedbackMessages(messages);

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
    loadQuestions(yearLevel, selectedTopic);
  }, [yearLevel, selectedTopic, loadQuestions]);

  const correctCount = showAnswers
    ? questions.filter(
        q => answers[q.id]?.toLowerCase() === q.answer.toString().toLowerCase()
      ).length
    : 0;

  return (
    <SectionContainer name="Science">
      {/* Year Level and Topic Selectors */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: palette.green125, fontWeight: 'bold' }}
        >
          🎓 Choose Your Year Level & Topic
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={yearLevel}
              onChange={e =>
                handleYearChange(
                  null as any,
                  Number(e.target.value) as YearLevel
                )
              }
              sx={{
                borderRadius: '14px',
                bgcolor: withAlpha(palette.white, 0.06),
                color: palette.white,
                fontWeight: 'bold',
                fontSize: '0.95rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: withAlpha(palette.green350, 0.4),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.green350,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.green350,
                },
                '& .MuiSelect-icon': { color: palette.green125 },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: palette.navy575,
                    border: `1px solid ${withAlpha(palette.green350, 0.3)}`,
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <MenuItem
                value={2}
                sx={{ color: palette.green350, fontWeight: 'bold' }}
              >
                ⭐ Year 2
              </MenuItem>
              <MenuItem
                value={3}
                sx={{ color: palette.purple225, fontWeight: 'bold' }}
              >
                🌟 Year 3
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 220 }}>
            <Select
              value={selectedTopic}
              onChange={e => handleTopicChange(e.target.value as string)}
              sx={{
                borderRadius: '14px',
                bgcolor: withAlpha(palette.white, 0.06),
                color: palette.white,
                fontWeight: 'bold',
                fontSize: '0.95rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: withAlpha(palette.green350, 0.4),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.green350,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.green350,
                },
                '& .MuiSelect-icon': { color: palette.green125 },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: palette.navy575,
                    border: `1px solid ${withAlpha(palette.green350, 0.3)}`,
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <MenuItem
                value="all"
                sx={{ color: palette.green125, fontWeight: 'bold' }}
              >
                🔬 All Topics
              </MenuItem>
              {topics.map(topic => (
                <MenuItem
                  key={topic}
                  value={topic}
                  sx={{ color: palette.slate25, fontWeight: 'bold' }}
                >
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Score Summary */}
      {showAnswers && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: allCorrect
              ? `linear-gradient(135deg, ${withAlpha(palette.green425, 0.3)} 0%, ${withAlpha(palette.green575, 0.4)} 100%)`
              : `linear-gradient(135deg, ${withAlpha(palette.teal600, 0.2)} 0%, ${withAlpha(palette.teal450, 0.2)} 100%)`,
            border: allCorrect
              ? `2px solid ${palette.green425}`
              : `2px solid ${withAlpha(palette.teal600, 0.4)}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: allCorrect ? palette.green125 : palette.teal175,
            }}
          >
            {allCorrect
              ? "🎉 AMAZING! You're a science superstar! 🔬"
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
                  ...darkCard,
                  bgcolor: showAnswers
                    ? isCorrect
                      ? withAlpha(palette.green425, 0.15)
                      : withAlpha(palette.red425, 0.15)
                    : withAlpha(palette.white, 0.06),
                  border: showAnswers
                    ? isCorrect
                      ? `2px solid ${palette.green425}`
                      : `2px solid ${palette.red425}`
                    : `2px solid ${withAlpha(palette.white, 0.12)}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent>
                  <Chip
                    label={question.topic}
                    size="small"
                    sx={{
                      mb: 1,
                      bgcolor: withAlpha(palette.green425, 0.2),
                      color: palette.green125,
                      fontSize: '0.7rem',
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: palette.green125,
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.1rem',
                    }}
                  >
                    🔬 {question.text}
                  </Typography>
                  {question.options ? (
                    <FormControl fullWidth>
                      <Select
                        value={answers[question.id] || ''}
                        onChange={e =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        disabled={showAnswers}
                        displayEmpty
                        renderValue={value =>
                          value ? value : '-- Please select'
                        }
                        sx={{
                          borderRadius: '10px',
                          bgcolor: withAlpha(palette.white, 0.06),
                          color: answers[question.id]
                            ? palette.white
                            : palette.slate400,
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor:
                              answers[question.id] && showAnswers
                                ? answers[question.id].toLowerCase() ===
                                  question.answer.toLowerCase()
                                  ? palette.green350
                                  : palette.red425
                                : withAlpha(palette.white, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: palette.green125,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: palette.green125,
                          },
                          '& .MuiSelect-icon': { color: palette.green125 },
                          '&.Mui-disabled': {
                            opacity: 1,
                            color: answers[question.id]
                              ? answers[question.id].toLowerCase() ===
                                question.answer.toLowerCase()
                                ? palette.green125
                                : palette.red125
                              : palette.slate400,
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: palette.navy575,
                              border: `1px solid ${withAlpha(palette.green350, 0.3)}`,
                              borderRadius: '10px',
                            },
                          },
                        }}
                      >
                        {question.options.map(opt => {
                          const isThisCorrect =
                            showAnswers &&
                            opt.toLowerCase() === question.answer.toLowerCase();
                          return (
                            <MenuItem
                              key={opt}
                              value={opt}
                              sx={{
                                color:
                                  isThisCorrect && showAnswers
                                    ? palette.green350
                                    : palette.slate25,
                              }}
                            >
                              {isThisCorrect && showAnswers ? '✅ ' : ''}
                              {opt}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      label="Your Answer"
                      variant="outlined"
                      value={answers[question.id] || ''}
                      onChange={e =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      sx={{ ...darkTextField, mb: 1 }}
                      fullWidth
                    />
                  )}
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
                        <CheckIcon sx={{ color: palette.green350 }} />
                      ) : (
                        <WrongIcon sx={{ color: palette.red425 }} />
                      )}
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          color: isCorrect ? palette.green125 : palette.red125,
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
            bgcolor: palette.green425,
            '&:hover': { bgcolor: palette.green575 },
            textTransform: 'none',
            boxShadow: `0 4px 15px ${withAlpha(palette.green425, 0.3)}`,
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
            bgcolor: palette.teal600,
            '&:hover': { bgcolor: palette.teal800 },
            textTransform: 'none',
            boxShadow: `0 4px 15px ${withAlpha(palette.teal600, 0.3)}`,
          }}
        >
          🔄 More Questions
        </Button>
      </Box>

      {/* History Section */}
      <Box sx={{ mt: 4 }}>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          startIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: palette.green125,
            fontSize: '1rem',
          }}
        >
          📊 Recent Results ({history.length})
        </Button>
        <Collapse in={showHistory}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {history.map(result => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                <Card
                  sx={{
                    ...darkCard,
                    bgcolor: withAlpha(palette.white, 0.06),
                    border: `2px solid ${withAlpha(palette.green425, 0.3)}`,
                  }}
                >
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
                        sx={{
                          fontWeight: 'bold',
                          bgcolor: withAlpha(palette.green425, 0.3),
                          color: palette.green125,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: palette.slate400 }}
                      >
                        {formatSavedDateTime(result.completedAt)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {result.score === 100 ? (
                        <TrophyIcon sx={{ color: palette.amber450 }} />
                      ) : (
                        <StarIcon sx={{ color: palette.orange275 }} />
                      )}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: palette.gray400 }}
                      >
                        {result.correctCount}/{result.totalQuestions} (
                        {result.score}%)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 0.8,
                        mt: 1,
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={
                          <ReplayIcon sx={{ fontSize: '0.9rem !important' }} />
                        }
                        onClick={() => setReviewResult(result)}
                        sx={{
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          color: palette.green125,
                          border: `1px solid ${withAlpha(palette.green425, 0.35)}`,
                          px: 1.2,
                          py: 0.4,
                          minWidth: 0,
                          '&:hover': {
                            bgcolor: withAlpha(palette.green425, 0.1),
                            borderColor: palette.green350,
                          },
                        }}
                      >
                        Review
                      </Button>
                      <Button
                        size="small"
                        startIcon={
                          <DeleteOutlineIcon
                            sx={{ fontSize: '0.9rem !important' }}
                          />
                        }
                        onClick={() => setDeleteTarget(result)}
                        sx={{
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          color: palette.slate575,
                          border: `1px solid ${withAlpha(palette.slate575, 0.3)}`,
                          px: 1.2,
                          py: 0.4,
                          minWidth: 0,
                          '&:hover': {
                            bgcolor: withAlpha(palette.red425, 0.1),
                            color: palette.red125,
                            borderColor: palette.red425,
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {history.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  sx={{ color: palette.slate575, textAlign: 'center', py: 2 }}
                >
                  No results yet. Complete a session to see your history! 🔬
                </Typography>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Box>
      {reviewResult && (
        <SessionReviewDialog
          open={!!reviewResult}
          onClose={() => setReviewResult(null)}
          title="🧪 Science Session Review"
          accentColor={palette.green350}
          questions={
            JSON.parse(reviewResult.questionsData || '[]') as ReviewQuestion[]
          }
          score={reviewResult.score}
          correctCount={reviewResult.correctCount}
          totalQuestions={reviewResult.totalQuestions}
          date={new Date(reviewResult.completedAt)}
        />
      )}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        description={
          deleteTarget
            ? `Delete the science session from ${new Date(deleteTarget.completedAt).toLocaleDateString()}? This cannot be undone.`
            : undefined
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </SectionContainer>
  );
}

export default ScienceSection;
