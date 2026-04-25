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
import SessionReviewDialog, { type ReviewQuestion } from './SessionReviewDialog';
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
import YouTubeReward from './Video';

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
  'Good try! It\'s actually',
  'So close! The answer is',
  'Nice effort! It\'s',
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
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
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
  const [feedbackMessages, setFeedbackMessages] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('thinkingFeedbackMessages');
    return saved ? JSON.parse(saved) : {};
  });
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ThinkingSessionResult[]>([]);
  const [reviewResult, setReviewResult] = useState<ThinkingSessionResult | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ThinkingSessionResult | null>(null);

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
    localStorage.setItem('thinkingFeedbackMessages', JSON.stringify(feedbackMessages));
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

  const handleSelect = useCallback((id: number, opt: string) => {
    if (showAnswers) return;
    setAnswers(prev => ({ ...prev, [id]: opt }));
  }, [showAnswers]);

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
        <Typography variant="h6" sx={{ mb: 1.5, color: '#ce93d8', fontWeight: 'bold' }}>
          🧠 Choose Your Challenge
        </Typography>
        <FormControl sx={{ minWidth: 280 }}>
          <Select
            value={category ?? ''}
            displayEmpty
            onChange={e => e.target.value && handleCategoryChange(e.target.value as ThinkingCategory)}
            sx={{
              borderRadius: '14px',
              bgcolor: 'rgba(255,255,255,0.06)',
              color: category ? '#fff' : '#78909c',
              fontWeight: 'bold',
              fontSize: '1rem',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(206,147,216,0.4)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ce93d8' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ce93d8' },
              '& .MuiSelect-icon': { color: '#ce93d8' },
            }}
            MenuProps={{ PaperProps: { sx: { bgcolor: '#1a1f35', border: '1px solid rgba(206,147,216,0.3)', borderRadius: '12px' } } }}
          >
            <MenuItem value="" disabled sx={{ color: '#78909c', fontStyle: 'italic' }}>— please select —</MenuItem>
            {CATEGORIES.map(cat => (
              <MenuItem key={cat} value={cat} sx={{ color: '#ce93d8', fontWeight: 'bold' }}>
                {CATEGORY_DISPLAY[cat]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {!category && (
        <Typography sx={{ textAlign: 'center', color: '#546e7a', mt: 4, fontSize: '1.1rem' }}>
          👆 Pick a challenge above to start thinking!
        </Typography>
      )}

      {category && questions.length > 0 && (<>
      {/* Score summary */}
      {showAnswers && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: allCorrect
              ? 'linear-gradient(135deg, rgba(76,175,80,0.3) 0%, rgba(56,142,60,0.4) 100%)'
              : 'linear-gradient(135deg, rgba(206,147,216,0.2) 0%, rgba(156,39,176,0.2) 100%)',
            border: allCorrect ? '2px solid #4caf50' : '2px solid rgba(206,147,216,0.4)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: allCorrect ? '#a5d6a7' : '#ce93d8' }}>
            {allCorrect
              ? '🎉 AMAZING! You\'re a thinking superstar! 🌟'
              : `${correctCount}/${questions.length} correct! Great thinking! 💪`}
          </Typography>
          {timeTaken !== null && (
            <Chip
              icon={<TimerIcon sx={{ color: '#ffd54f !important' }} />}
              label={`Time: ${formatTime(timeTaken)}`}
              sx={{ mt: 1, fontSize: '1rem', py: 2, px: 1, bgcolor: 'rgba(255,255,255,0.1)', color: '#e0e0e0' }}
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
                      ? 'rgba(76,175,80,0.15)'
                      : 'rgba(239,83,80,0.15)'
                    : 'rgba(255,255,255,0.06)',
                  border: showAnswers
                    ? correct
                      ? '2px solid #4caf50'
                      : '2px solid #ef5350'
                    : '2px solid rgba(206,147,216,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent>
                  {/* Question number badge */}
                  <Chip
                    label={`Q${q.id}`}
                    size="small"
                    sx={{ mb: 1, bgcolor: 'rgba(206,147,216,0.2)', color: '#ce93d8', fontWeight: 'bold', fontSize: '0.75rem' }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#e0e0e0',
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                      {q.options.map((opt, idx) => {
                        const selected = answers[q.id] === opt;
                        const isThisCorrect = showAnswers && opt.trim().toLowerCase() === String(q.answer).trim().toLowerCase();
                        const isThisWrong = showAnswers && selected && !isThisCorrect;
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
                                ? '#66bb6a'
                                : isThisWrong
                                  ? '#ef5350'
                                  : selected
                                    ? '#ce93d8'
                                    : 'rgba(255,255,255,0.15)',
                              bgcolor: isThisCorrect
                                ? 'rgba(76,175,80,0.25)'
                                : isThisWrong
                                  ? 'rgba(239,83,80,0.2)'
                                  : selected
                                    ? 'rgba(206,147,216,0.25)'
                                    : 'rgba(255,255,255,0.04)',
                              color: isThisCorrect
                                ? '#a5d6a7'
                                : isThisWrong
                                  ? '#ef9a9a'
                                  : selected
                                    ? '#fff'
                                    : '#cfd8dc',
                              boxShadow: 'none',
                              '&:hover': {
                                bgcolor: 'rgba(206,147,216,0.12)',
                                borderColor: '#ce93d8',
                              },
                              '&.Mui-disabled': {
                                color: isThisCorrect ? '#a5d6a7' : isThisWrong ? '#ef9a9a' : '#78909c',
                                borderColor: isThisCorrect ? '#66bb6a' : isThisWrong ? '#ef5350' : 'rgba(255,255,255,0.08)',
                                bgcolor: isThisCorrect
                                  ? 'rgba(76,175,80,0.25)'
                                  : isThisWrong
                                    ? 'rgba(239,83,80,0.2)'
                                    : 'transparent',
                              },
                            }}
                          >
                            <Box component="span" sx={{ color: '#b0bec5', mr: 1, fontWeight: 900 }}>
                              {label}.
                            </Box>
                            {isThisCorrect && showAnswers ? '✅ ' : isThisWrong ? '❌ ' : ''}
                            {opt}
                          </Button>
                        );
                      })}
                    </Box>
                  )}

                  {/* Feedback */}
                  {showAnswers && (
                    <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {correct ? (
                        <CheckIcon sx={{ color: '#66bb6a', fontSize: '1.1rem' }} />
                      ) : (
                        <WrongIcon sx={{ color: '#ef5350', fontSize: '1.1rem' }} />
                      )}
                      <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem', color: correct ? '#a5d6a7' : '#ef9a9a' }}>
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
            bgcolor: '#7b1fa2',
            '&:hover': { bgcolor: '#6a1b9a' },
            textTransform: 'none',
            boxShadow: '0 4px 15px rgba(123,31,162,0.4)',
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
            boxShadow: '0 4px 15px rgba(255,152,0,0.3)',
          }}
        >
          🔄 New Questions
        </Button>
      </Box>

      {/* YouTube reward */}
      <YouTubeReward
        visible={allCorrect}
        title="Incredible thinking! All answers are correct 🎉"
        description="Enjoy your reward: search for a ~5 minute YouTube video to watch."
        minDurationSec={5 * 60}
        maxDurationSec={10 * 60}
        className="mt-4"
      />
      </>)}

      {/* History */}
      <Box sx={{ mt: 4 }}>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          startIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: '#ce93d8',
            fontSize: '1rem',
          }}
        >
          📊 Recent Results ({history.length})
        </Button>
        <Collapse in={showHistory}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {history.map(result => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                <Card sx={{ ...darkCard, bgcolor: 'rgba(255,255,255,0.06)', border: '2px solid rgba(206,147,216,0.3)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={CATEGORY_DISPLAY[result.category as ThinkingCategory] ?? result.category}
                        size="small"
                        sx={{ fontWeight: 'bold', bgcolor: 'rgba(206,147,216,0.25)', color: '#ce93d8', fontSize: '0.7rem' }}
                      />
                      <Typography variant="body2" sx={{ color: '#90a4ae' }}>
                        {new Date(result.completedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {result.score === 100 ? (
                        <TrophyIcon sx={{ color: '#ffd54f' }} />
                      ) : (
                        <StarIcon sx={{ color: '#ffa726' }} />
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
                        {result.correctCount}/{result.totalQuestions} ({result.score}%)
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Chip
                        icon={<TimerIcon sx={{ color: '#90a4ae !important' }} />}
                        label={formatTime(result.timeTakenSeconds)}
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#b0bec5' }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.8 }}>
                        <Button
                          size="small"
                          startIcon={<ReplayIcon sx={{ fontSize: '0.9rem !important' }} />}
                          onClick={() => setReviewResult(result)}
                          sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            color: '#ce93d8',
                            border: '1px solid rgba(206,147,216,0.35)',
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            '&:hover': { bgcolor: 'rgba(206,147,216,0.1)', borderColor: '#ce93d8' },
                          }}
                        >
                          Review
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DeleteOutlineIcon sx={{ fontSize: '0.9rem !important' }} />}
                          onClick={() => setDeleteTarget(result)}
                          sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            color: '#78909c',
                            border: '1px solid rgba(120,144,156,0.3)',
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            '&:hover': { bgcolor: 'rgba(239,83,80,0.1)', color: '#ef9a9a', borderColor: '#ef5350' },
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
                <Typography sx={{ color: '#78909c', textAlign: 'center', py: 2 }}>
                  No results yet. Start thinking! 🧠
                </Typography>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </Box>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        description={deleteTarget ? `Delete the thinking skills session from ${new Date(deleteTarget.completedAt).toLocaleDateString()}? This cannot be undone.` : undefined}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
      {reviewResult && (
        <SessionReviewDialog
          open={!!reviewResult}
          onClose={() => setReviewResult(null)}
          title="🧠 Thinking Skills Review"
          subtitle={CATEGORY_DISPLAY[reviewResult.category as ThinkingCategory] ?? reviewResult.category}
          accentColor="#ce93d8"
          questions={JSON.parse(reviewResult.questionsData || '[]') as ReviewQuestion[]}
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
