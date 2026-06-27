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
  Replay as ReplayIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import SessionReviewDialog, {
  type ReviewQuestion,
} from './SessionReviewDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Question } from '../types';
import { db } from '../db/database';
import type { ThinkingSessionResult } from '../db/database';
import {
  ThinkingCategory,
  CATEGORY_LABELS,
  generateThinkingQuestions,
} from '../data/thinkingSkillsQuestions';
import SectionContainer from './SectionContainer';
import { formatSavedDateTime } from '../utils/formatDate';

const CORRECT_MSGS = [
  'Brilliant! 🧠',
  'Awesome thinking! ⭐',
  'You got it! 🌟',
  'Super smart! 🎉',
  'Great reasoning! 💡',
  'Perfect! 💯',
];
const WRONG_MSGS = [
  'Almost! The answer is',
  "Good try! It's actually",
  'So close! The answer is',
  "Nice effort! It's",
];

function getMsg(correct: boolean) {
  const list = correct ? CORRECT_MSGS : WRONG_MSGS;
  return list[Math.floor(Math.random() * list.length)];
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins === 0 ? `${secs}s` : `${mins}m ${secs}s`;
}

const darkCard = {
  borderRadius: '16px',
  boxShadow: `0 4px 16px ${withAlpha(palette.black, 0.4)}`,
  transition: 'transform 0.2s',
};

const CATEGORIES: ThinkingCategory[] = [
  'mixed',
  'numberSequence',
  'tilePattern',
  'wordAnalogy',
  'oddOneOut',
  'letterPattern',
  'figureMatrix',
  'functionMachine',
];

const CATEGORY_DISPLAY: Record<ThinkingCategory, string> = {
  mixed: '🎲 Mixed',
  ...CATEGORY_LABELS,
};

function ThinkingSection() {
  const [category, setCategory] = useState<ThinkingCategory | null>(() => {
    const saved = localStorage.getItem('thinkingCategory');
    return (saved as ThinkingCategory) || 'mixed';
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('thinkingQuestions');
    return saved ? JSON.parse(saved) : generateThinkingQuestions('mixed', 8);
  });
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('thinkingAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [showAnswers, setShowAnswers] = useState(() => {
    const saved = localStorage.getItem('thinkingShowAnswers');
    return saved ? JSON.parse(saved) : false;
  });
  const [allCorrect, setAllCorrect] = useState(() => {
    const saved = localStorage.getItem('thinkingAllCorrect');
    return saved ? JSON.parse(saved) : false;
  });
  const [startTime, setStartTime] = useState<number>(() => {
    const saved = localStorage.getItem('thinkingStartTime');
    return saved ? parseInt(saved) : Date.now();
  });
  const [timeTaken, setTimeTaken] = useState<number | null>(() => {
    const saved = localStorage.getItem('thinkingTimeTaken');
    return saved ? parseInt(saved) : null;
  });
  const [feedbackMessages, setFeedbackMessages] = useState<
    Record<number, string>
  >(() => {
    const saved = localStorage.getItem('thinkingFeedbackMessages');
    return saved ? JSON.parse(saved) : {};
  });
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ThinkingSessionResult[]>([]);
  const [reviewResult, setReviewResult] =
    useState<ThinkingSessionResult | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<ThinkingSessionResult | null>(null);

  useEffect(() => {
    loadHistory();
    // Load initial questions with 'mixed' category
    setQuestions(generateThinkingQuestions('mixed'));
  }, []);

  useEffect(() => {
    localStorage.setItem('thinkingCategory', category ?? 'mixed');
  }, [category]);

  useEffect(() => {
    localStorage.setItem('thinkingQuestions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('thinkingAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('thinkingShowAnswers', JSON.stringify(showAnswers));
  }, [showAnswers]);

  useEffect(() => {
    localStorage.setItem('thinkingAllCorrect', JSON.stringify(allCorrect));
  }, [allCorrect]);

  useEffect(() => {
    localStorage.setItem('thinkingStartTime', startTime.toString());
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem('thinkingTimeTaken', timeTaken?.toString() || '');
  }, [timeTaken]);

  useEffect(() => {
    localStorage.setItem(
      'thinkingFeedbackMessages',
      JSON.stringify(feedbackMessages)
    );
  }, [feedbackMessages]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget?.id) return;
    await db.thinkingSessionResults.delete(deleteTarget.id);
    setDeleteTarget(null);
    loadHistory();
  };

  const loadHistory = async () => {
    const results = await db.thinkingSessionResults
      .where('userId')
      .equals('lucas')
      .reverse()
      .sortBy('completedAt');
    setHistory(results.slice(0, 10));
  };

  const handleCategoryChange = useCallback((val: ThinkingCategory) => {
    setCategory(val);
    setQuestions(generateThinkingQuestions(val));
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    const newStartTime = Date.now();
    setStartTime(newStartTime);
    setTimeTaken(null);
    setFeedbackMessages({});
    localStorage.removeItem('thinkingAnswers');
    localStorage.removeItem('thinkingShowAnswers');
    localStorage.removeItem('thinkingAllCorrect');
    localStorage.removeItem('thinkingTimeTaken');
    localStorage.removeItem('thinkingFeedbackMessages');
  }, []);

  const handleSelect = useCallback(
    (id: number, opt: string) => {
      if (showAnswers) return;
      setAnswers(prev => ({ ...prev, [id]: opt }));
    },
    [showAnswers]
  );

  const isCorrect = useCallback(
    (q: Question) => {
      const val = answers[q.id];
      if (!val) return false;
      return val.trim().toLowerCase() === String(q.answer).trim().toLowerCase();
    },
    [answers]
  );

  const correctCount = useMemo(
    () => questions.filter(isCorrect).length,
    [questions, isCorrect]
  );

  const isEveryCorrect = useMemo(
    () => questions.length > 0 && questions.every(isCorrect),
    [questions, isCorrect]
  );

  const handleCheckAnswers = useCallback(async () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setTimeTaken(elapsed);
    setShowAnswers(true);
    setAllCorrect(isEveryCorrect);

    const messages: Record<number, string> = {};
    questions.forEach(q => {
      messages[q.id] = getMsg(isCorrect(q));
    });
    setFeedbackMessages(messages);

    const count = questions.filter(isCorrect).length;
    const questionsData = JSON.stringify(
      questions.map(q => ({
        text: q.text,
        correctAnswer: q.answer,
        userAnswer: answers[q.id] || '',
        isCorrect: isCorrect(q),
      }))
    );

    await db.thinkingSessionResults.add({
      category: category!,
      totalQuestions: questions.length,
      correctCount: count,
      score: Math.round((count / questions.length) * 100),
      timeTakenSeconds: elapsed,
      questionsData,
      completedAt: new Date(),
      userId: 'lucas',
    });
    loadHistory();
  }, [startTime, isEveryCorrect, questions, isCorrect, category]);

  const handleMoreQuestions = useCallback(() => {
    if (!category) return;
    setQuestions(generateThinkingQuestions(category));
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    const newStartTime = Date.now();
    setStartTime(newStartTime);
    setTimeTaken(null);
    setFeedbackMessages({});
    localStorage.removeItem('thinkingAnswers');
    localStorage.removeItem('thinkingShowAnswers');
    localStorage.removeItem('thinkingAllCorrect');
    localStorage.removeItem('thinkingTimeTaken');
    localStorage.removeItem('thinkingFeedbackMessages');
  }, [category]);

  return (
    <SectionContainer name="Thinking">
      {/* Category selector */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{ mb: 1.5, color: palette.purple225, fontWeight: 'bold' }}
        >
          🧠 Choose Your Challenge
        </Typography>
        <FormControl sx={{ minWidth: 280 }}>
          <Select
            value={category ?? ''}
            displayEmpty
            onChange={e =>
              e.target.value &&
              handleCategoryChange(e.target.value as ThinkingCategory)
            }
            sx={{
              borderRadius: '14px',
              bgcolor: withAlpha(palette.white, 0.06),
              color: category ? palette.white : palette.slate575,
              fontWeight: 'bold',
              fontSize: '1rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: withAlpha(palette.purple225, 0.4),
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: palette.purple225,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: palette.purple225,
              },
              '& .MuiSelect-icon': { color: palette.purple225 },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: palette.navy575,
                  border: `1px solid ${withAlpha(palette.purple225, 0.3)}`,
                  borderRadius: '12px',
                },
              },
            }}
          >
            <MenuItem
              value=""
              disabled
              sx={{ color: palette.slate575, fontStyle: 'italic' }}
            >
              — please select —
            </MenuItem>
            {CATEGORIES.map(cat => (
              <MenuItem
                key={cat}
                value={cat}
                sx={{ color: palette.purple225, fontWeight: 'bold' }}
              >
                {CATEGORY_DISPLAY[cat]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!category && (
        <Typography
          sx={{
            textAlign: 'center',
            color: palette.slate775,
            mt: 4,
            fontSize: '1.1rem',
          }}
        >
          👆 Pick a challenge above to start thinking!
        </Typography>
      )}

      {category && questions.length > 0 && (
        <>
          {/* Score summary */}
          {showAnswers && (
            <Box
              sx={{
                mb: 3,
                p: 3,
                borderRadius: '16px',
                background: allCorrect
                  ? `linear-gradient(135deg, ${withAlpha(palette.green425, 0.3)} 0%, ${withAlpha(palette.green575, 0.4)} 100%)`
                  : `linear-gradient(135deg, ${withAlpha(palette.purple225, 0.2)} 0%, ${withAlpha(palette.purple550, 0.2)} 100%)`,
                border: allCorrect
                  ? `2px solid ${palette.green425}`
                  : `2px solid ${withAlpha(palette.purple225, 0.4)}`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: allCorrect ? palette.green125 : palette.purple225,
                }}
              >
                {allCorrect
                  ? "🎉 AMAZING! You're a thinking superstar! 🌟"
                  : `${correctCount}/${questions.length} correct! Great thinking! 💪`}
              </Typography>
              {timeTaken !== null && (
                <Chip
                  icon={
                    <TimerIcon
                      sx={{ color: `${palette.amber450} !important` }}
                    />
                  }
                  label={`Time: ${formatTime(timeTaken)}`}
                  sx={{
                    mt: 1,
                    fontSize: '1rem',
                    py: 2,
                    px: 1,
                    bgcolor: withAlpha(palette.white, 0.1),
                    color: palette.gray400,
                  }}
                />
              )}
            </Box>
          )}

          {/* Question grid */}
          <Grid container spacing={3}>
            {questions.map(q => {
              const correct = showAnswers && isCorrect(q);
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={q.id}>
                  <Card
                    sx={{
                      ...darkCard,
                      bgcolor: showAnswers
                        ? correct
                          ? withAlpha(palette.green425, 0.15)
                          : withAlpha(palette.red425, 0.15)
                        : withAlpha(palette.white, 0.06),
                      border: showAnswers
                        ? correct
                          ? `2px solid ${palette.green425}`
                          : `2px solid ${palette.red425}`
                        : `2px solid ${withAlpha(palette.purple225, 0.2)}`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <CardContent>
                      {/* Question number badge */}
                      <Chip
                        label={`Q${q.id}`}
                        size="small"
                        sx={{
                          mb: 1,
                          bgcolor: withAlpha(palette.purple225, 0.2),
                          color: palette.purple225,
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: palette.gray400,
                          fontWeight: 600,
                          mb: 2,
                          fontSize: '0.95rem',
                          whiteSpace: 'pre-line',
                          lineHeight: 1.6,
                        }}
                      >
                        {q.text}
                      </Typography>

                      {/* MCQ options */}
                      {q.options && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.8,
                          }}
                        >
                          {q.options.map((opt, idx) => {
                            const selected = answers[q.id] === opt;
                            const isThisCorrect =
                              showAnswers &&
                              opt.trim().toLowerCase() ===
                                String(q.answer).trim().toLowerCase();
                            const isThisWrong =
                              showAnswers && selected && !isThisCorrect;
                            const label = String.fromCharCode(65 + idx); // A, B, C, D
                            return (
                              <Button
                                key={opt}
                                fullWidth
                                variant={selected ? 'contained' : 'outlined'}
                                disabled={showAnswers}
                                onClick={() => handleSelect(q.id, opt)}
                                sx={{
                                  borderRadius: '10px',
                                  textTransform: 'none',
                                  fontWeight: 'bold',
                                  fontSize: '0.9rem',
                                  justifyContent: 'flex-start',
                                  px: 1.5,
                                  py: 0.8,
                                  borderColor: isThisCorrect
                                    ? palette.green350
                                    : isThisWrong
                                      ? palette.red425
                                      : selected
                                        ? palette.purple225
                                        : withAlpha(palette.white, 0.15),
                                  bgcolor: isThisCorrect
                                    ? withAlpha(palette.green425, 0.25)
                                    : isThisWrong
                                      ? withAlpha(palette.red425, 0.2)
                                      : selected
                                        ? withAlpha(palette.purple225, 0.25)
                                        : withAlpha(palette.white, 0.04),
                                  color: isThisCorrect
                                    ? palette.green125
                                    : isThisWrong
                                      ? palette.red125
                                      : selected
                                        ? palette.white
                                        : palette.slate25,
                                  boxShadow: 'none',
                                  '&:hover': {
                                    bgcolor: withAlpha(palette.purple225, 0.12),
                                    borderColor: palette.purple225,
                                  },
                                  '&.Mui-disabled': {
                                    color: isThisCorrect
                                      ? palette.green125
                                      : isThisWrong
                                        ? palette.red125
                                        : palette.slate575,
                                    borderColor: isThisCorrect
                                      ? palette.green350
                                      : isThisWrong
                                        ? palette.red425
                                        : withAlpha(palette.white, 0.08),
                                    bgcolor: isThisCorrect
                                      ? withAlpha(palette.green425, 0.25)
                                      : isThisWrong
                                        ? withAlpha(palette.red425, 0.2)
                                        : 'transparent',
                                  },
                                }}
                              >
                                <Box
                                  component="span"
                                  sx={{
                                    color: palette.slate200,
                                    mr: 1,
                                    fontWeight: 900,
                                  }}
                                >
                                  {label}.
                                </Box>
                                {isThisCorrect && showAnswers
                                  ? '✅ '
                                  : isThisWrong
                                    ? '❌ '
                                    : ''}
                                {opt}
                              </Button>
                            );
                          })}
                        </Box>
                      )}

                      {/* Feedback */}
                      {showAnswers && (
                        <Box
                          sx={{
                            mt: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          {correct ? (
                            <CheckIcon
                              sx={{
                                color: palette.green350,
                                fontSize: '1.1rem',
                              }}
                            />
                          ) : (
                            <WrongIcon
                              sx={{ color: palette.red425, fontSize: '1.1rem' }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '0.85rem',
                              color: correct
                                ? palette.green125
                                : palette.red125,
                            }}
                          >
                            {correct
                              ? feedbackMessages[q.id]
                              : `${feedbackMessages[q.id]} ${q.answer}`}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Action buttons */}
          <Box sx={{ mt: 3, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleCheckAnswers}
              disabled={showAnswers}
              sx={{
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                bgcolor: palette.purple625,
                '&:hover': { bgcolor: palette.purple675 },
                textTransform: 'none',
                boxShadow: `0 4px 15px ${withAlpha(palette.purple625, 0.4)}`,
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
                bgcolor: palette.orange450,
                '&:hover': { bgcolor: palette.orange650 },
                textTransform: 'none',
                boxShadow: `0 4px 15px ${withAlpha(palette.orange450, 0.3)}`,
              }}
            >
              🔄 New Questions
            </Button>
          </Box>
        </>
      )}

      {/* History */}
      <Box sx={{ mt: 4 }}>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          startIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: palette.purple225,
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
                    border: `2px solid ${withAlpha(palette.purple225, 0.3)}`,
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
                        label={
                          CATEGORY_DISPLAY[
                            result.category as ThinkingCategory
                          ] ?? result.category
                        }
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          bgcolor: withAlpha(palette.purple225, 0.25),
                          color: palette.purple225,
                          fontSize: '0.7rem',
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      <Chip
                        icon={
                          <TimerIcon
                            sx={{ color: `${palette.slate400} !important` }}
                          />
                        }
                        label={formatTime(result.timeTakenSeconds)}
                        size="small"
                        sx={{
                          bgcolor: withAlpha(palette.white, 0.08),
                          color: palette.slate200,
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.8 }}>
                        <Button
                          size="small"
                          startIcon={
                            <ReplayIcon
                              sx={{ fontSize: '0.9rem !important' }}
                            />
                          }
                          onClick={() => setReviewResult(result)}
                          sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            color: palette.purple225,
                            border: `1px solid ${withAlpha(palette.purple225, 0.35)}`,
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            '&:hover': {
                              bgcolor: withAlpha(palette.purple225, 0.1),
                              borderColor: palette.purple225,
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
                  No results yet. Start thinking! 🧠
                </Typography>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Box>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        description={
          deleteTarget
            ? `Delete the thinking skills session from ${new Date(deleteTarget.completedAt).toLocaleDateString()}? This cannot be undone.`
            : undefined
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
      {reviewResult && (
        <SessionReviewDialog
          open={!!reviewResult}
          onClose={() => setReviewResult(null)}
          title="🧠 Thinking Skills Review"
          subtitle={
            CATEGORY_DISPLAY[reviewResult.category as ThinkingCategory] ??
            reviewResult.category
          }
          accentColor={palette.purple225}
          questions={
            JSON.parse(reviewResult.questionsData || '[]') as ReviewQuestion[]
          }
          score={reviewResult.score}
          correctCount={reviewResult.correctCount}
          totalQuestions={reviewResult.totalQuestions}
          date={new Date(reviewResult.completedAt)}
        />
      )}
    </SectionContainer>
  );
}

export default ThinkingSection;
