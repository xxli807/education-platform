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
  Tab,
  Tabs,
  TextField,
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
import Whiteboard from './Whiteboard';
import SessionReviewDialog, {
  type ReviewQuestion,
} from './SessionReviewDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import React, { useCallback, useEffect, useState } from 'react';
import { Question } from '../types';
import { db } from '../db/database';
import type { MathSessionResult } from '../db/database';
import {
  Difficulty,
  generateWordProblem,
  generateMissingNumberProblem,
  generateHalfProblem,
} from '../data/mathQuestions';
import { generateOlympiadQuestions } from '../data/olympiadQuestions';
import { formatSavedDateTime } from '../utils/formatDate';
import SectionContainer from './SectionContainer';

type MathMode = 'practice' | 'olympiad' | 'multiplication' | 'division';

const PRACTICE_PER_GROUP = 8;
const OLYMPIAD_COUNT = 12;

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
  "Good try! It's actually",
  'So close! The answer is',
  "Nice effort! It's",
];

function getRandomEncouragement(correct: boolean): string {
  const list = correct ? encouragingCorrect : encouragingIncorrect;
  return list[Math.floor(Math.random() * list.length)];
}

function generateLevelQuestions(
  difficulty: Difficulty,
  count: number,
  startId: number
): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const indexWithinLevel = i + 1;

    if (difficulty === 'challenge') {
      if (indexWithinLevel === 1 || indexWithinLevel === 2) {
        const wp = generateWordProblem();
        wp.id = id;
        questions.push(wp);
        continue;
      } else if (indexWithinLevel === 3) {
        const mp = generateMissingNumberProblem();
        mp.id = id;
        questions.push(mp);
        continue;
      } else if (indexWithinLevel === 4) {
        const hp = generateHalfProblem();
        hp.id = id;
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
      case 0:
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

      case 1:
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

      case 2: {
        if (difficulty === 'challenge') {
          num1 = Math.floor(Math.random() * 20) + 2;
          num2 = Math.floor(Math.random() * 9) + 2;
        } else if (difficulty === 'advanced') {
          num1 = Math.floor(Math.random() * 12) + 2;
          num2 = Math.floor(Math.random() * 12) + 1;
        } else {
          const timesTableOptions = [2, 3, 5, 10];
          num1 =
            timesTableOptions[
              Math.floor(Math.random() * timesTableOptions.length)
            ];
          num2 = Math.floor(Math.random() * 10) + 1;
        }
        text = `What is ${num1} × ${num2}?`;
        answer = num1 * num2;
        break;
      }

      case 3: {
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

    if (difficulty === 'advanced' && indexWithinLevel % 4 === 0) {
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

    const useMCQ =
      (difficulty === 'advanced' || difficulty === 'challenge') &&
      Math.random() < 0.4;
    questions.push({
      id,
      text,
      answer,
      options: useMCQ ? mathOptions(Number(answer)) : undefined,
    });
  }

  return questions;
}

function generatePracticeQuestions(): Question[] {
  return [
    ...generateLevelQuestions('standard', PRACTICE_PER_GROUP, 1),
    ...generateLevelQuestions(
      'advanced',
      PRACTICE_PER_GROUP,
      1 + PRACTICE_PER_GROUP
    ),
    ...generateLevelQuestions(
      'challenge',
      PRACTICE_PER_GROUP,
      1 + PRACTICE_PER_GROUP * 2
    ),
  ];
}

// Full times table 2×2 → 9×9, in order (commutative pairs repeat the facts).
function generateMultiplicationQuestions(): Question[] {
  const qs: Question[] = [];
  let id = 1;
  for (let a = 2; a <= 9; a++) {
    for (let b = 2; b <= 9; b++) {
      qs.push({ id: id++, text: `${a} × ${b}`, answer: a * b });
    }
  }
  return qs;
}

// Inverse division facts, biggest first: 81 ÷ 9 down to 4 ÷ 2.
function generateDivisionQuestions(): Question[] {
  const facts: { dividend: number; divisor: number; quotient: number }[] = [];
  for (let q = 2; q <= 9; q++) {
    for (let d = 2; d <= 9; d++) {
      facts.push({ dividend: q * d, divisor: d, quotient: q });
    }
  }
  facts.sort((x, y) => y.dividend - x.dividend || y.divisor - x.divisor);
  return facts.map((f, i) => ({
    id: i + 1,
    text: `${f.dividend} ÷ ${f.divisor}`,
    answer: f.quotient,
  }));
}

// Fisher–Yates shuffle, then renumber ids 1..n to match the new order.
function shuffleQuestions(qs: Question[]): Question[] {
  const a = [...qs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.map((q, i) => ({ ...q, id: i + 1 }));
}

// `randomize` shuffles the drill order (used by "More Questions"); the first
// view of Times Tables / Division stays in its natural 2×2→9×9 / 81÷9→4÷2 order.
function questionsForMode(m: MathMode, randomize = false): Question[] {
  switch (m) {
    case 'olympiad':
      return generateOlympiadQuestions(OLYMPIAD_COUNT);
    case 'multiplication': {
      const qs = generateMultiplicationQuestions();
      return randomize ? shuffleQuestions(qs) : qs;
    }
    case 'division': {
      const qs = generateDivisionQuestions();
      return randomize ? shuffleQuestions(qs) : qs;
    }
    default:
      return generatePracticeQuestions();
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function mathOptions(correct: number): string[] {
  const ans = Number(correct);
  const wrong = new Set<number>();
  const spread = Math.max(3, Math.round(Math.abs(ans) * 0.15) + 2);
  while (wrong.size < 3) {
    const delta =
      Math.floor(Math.random() * spread * 2 + 1) *
      (Math.random() < 0.5 ? 1 : -1);
    const candidate = ans + delta;
    if (candidate !== ans && !wrong.has(candidate)) wrong.add(candidate);
  }
  return [ans, ...[...wrong]].map(String).sort(() => Math.random() - 0.5);
}

const darkCard = {
  borderRadius: '16px',
  boxShadow: `0 4px 16px ${withAlpha(palette.black, 0.4)}`,
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

type SectionKey =
  | 'standard'
  | 'advanced'
  | 'challenge'
  | 'olympiad'
  | 'multiplication'
  | 'division';

const PRACTICE_SECTIONS: {
  key: Difficulty;
  label: string;
  emoji: string;
  color: string;
  range: [number, number];
}[] = [
  {
    key: 'standard',
    label: 'Standard',
    emoji: '⭐',
    color: palette.orange275,
    range: [1, PRACTICE_PER_GROUP],
  },
  {
    key: 'advanced',
    label: 'Advanced',
    emoji: '🌟',
    color: palette.blue425,
    range: [PRACTICE_PER_GROUP + 1, PRACTICE_PER_GROUP * 2],
  },
  {
    key: 'challenge',
    label: 'Challenge',
    emoji: '🔥',
    color: palette.red425,
    range: [PRACTICE_PER_GROUP * 2 + 1, PRACTICE_PER_GROUP * 3],
  },
];

const sectionsForMode = (m: MathMode): SectionKey[] =>
  m === 'practice' ? ['standard', 'advanced', 'challenge'] : [m];

function MathSection() {
  const [mode, setMode] = useState<MathMode>(() => {
    const saved = localStorage.getItem('mathMode') as MathMode | null;
    return saved &&
      ['practice', 'olympiad', 'multiplication', 'division'].includes(saved)
      ? saved
      : 'practice';
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('mathQuestions');
    if (saved) return JSON.parse(saved);
    const savedMode =
      (localStorage.getItem('mathMode') as MathMode | null) || 'practice';
    return questionsForMode(savedMode);
  });
  const [answers, setAnswers] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('mathAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  // per-section reveal / timing (keys: standard|advanced|challenge|olympiad)
  const [revealed, setRevealed] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('mathRevealed');
    return saved ? JSON.parse(saved) : {};
  });
  const [sectionStart, setSectionStart] = useState<Record<string, number>>(
    () => {
      const saved = localStorage.getItem('mathSectionStart');
      if (saved) return JSON.parse(saved);
      const m =
        localStorage.getItem('mathMode') === 'olympiad'
          ? 'olympiad'
          : 'practice';
      const now = Date.now();
      const o: Record<string, number> = {};
      sectionsForMode(m as MathMode).forEach(k => {
        o[k] = now;
      });
      return o;
    }
  );
  const [sectionTime, setSectionTime] = useState<Record<string, number | null>>(
    () => {
      const saved = localStorage.getItem('mathSectionTime');
      return saved ? JSON.parse(saved) : {};
    }
  );
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<MathSessionResult[]>([]);
  const [reviewResult, setReviewResult] = useState<MathSessionResult | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<MathSessionResult | null>(
    null
  );
  const [feedbackMessages, setFeedbackMessages] = useState<{
    [key: number]: string;
  }>(() => {
    const saved = localStorage.getItem('mathFeedbackMessages');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('mathMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('mathQuestions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('mathAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('mathRevealed', JSON.stringify(revealed));
  }, [revealed]);

  useEffect(() => {
    localStorage.setItem('mathSectionStart', JSON.stringify(sectionStart));
  }, [sectionStart]);

  useEffect(() => {
    localStorage.setItem('mathSectionTime', JSON.stringify(sectionTime));
  }, [sectionTime]);

  useEffect(() => {
    localStorage.setItem(
      'mathFeedbackMessages',
      JSON.stringify(feedbackMessages)
    );
  }, [feedbackMessages]);

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget?.id) return;
    await db.mathSessionResults.delete(deleteTarget.id);
    setDeleteTarget(null);
    loadHistory();
  };

  const loadHistory = async () => {
    const results = await db.mathSessionResults
      .where('userId')
      .equals('lucas')
      .reverse()
      .sortBy('completedAt');
    setHistory(results.slice(0, 10));
  };

  // Count how many of the given questions are answered correctly.
  const countCorrect = useCallback(
    (qs: Question[]) =>
      qs.filter(q => {
        const val = answers[q.id];
        return (
          val !== undefined &&
          val !== null &&
          val !== '' &&
          Number(val) === Number(q.answer)
        );
      }).length,
    [answers]
  );

  // Start a fresh session for the given mode (resets every section).
  const resetSession = useCallback((nextQuestions: Question[], m: MathMode) => {
    setQuestions(nextQuestions);
    setAnswers({});
    setFeedbackMessages({});
    setRevealed({});
    setSectionTime({});
    const now = Date.now();
    const starts: Record<string, number> = {};
    sectionsForMode(m).forEach(k => {
      starts[k] = now;
    });
    setSectionStart(starts);
  }, []);

  const handleModeChange = useCallback(
    (_: React.SyntheticEvent, newMode: MathMode | null) => {
      if (!newMode || newMode === mode) return;
      setMode(newMode);
      resetSession(questionsForMode(newMode), newMode);
    },
    [mode, resetSession]
  );

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  // Questions belonging to a section key.
  const questionsForSection = useCallback(
    (key: SectionKey): Question[] => {
      const sec = PRACTICE_SECTIONS.find(s => s.key === key);
      // single-section modes (olympiad / multiplication / division) span every question
      if (!sec) return questions;
      return questions.filter(
        q => q.id >= sec.range[0] && q.id <= sec.range[1]
      );
    },
    [questions]
  );

  // Check answers for a single section: reveal, give feedback, record the time,
  // and save a history result tagged with that section's difficulty.
  const checkSection = useCallback(
    async (key: SectionKey) => {
      const qs = questionsForSection(key);
      if (!qs.length) return;
      const start = sectionStart[key] ?? Date.now();
      const elapsed = Math.round((Date.now() - start) / 1000);

      setSectionTime(prev => ({ ...prev, [key]: elapsed }));
      setRevealed(prev => ({ ...prev, [key]: true }));
      setFeedbackMessages(prev => {
        const next = { ...prev };
        qs.forEach(q => {
          const ok =
            answers[q.id] !== undefined &&
            answers[q.id] !== '' &&
            Number(answers[q.id]) === Number(q.answer);
          next[q.id] = getRandomEncouragement(ok);
        });
        return next;
      });

      const count = countCorrect(qs);
      const questionsData = JSON.stringify(
        qs.map(q => ({
          text: q.text,
          correctAnswer: q.answer,
          userAnswer: answers[q.id] || '',
          isCorrect: Number(answers[q.id]) === Number(q.answer),
        }))
      );

      await db.mathSessionResults.add({
        difficulty: key === 'olympiad' ? 'olympiad' : key,
        totalQuestions: qs.length,
        correctCount: count,
        score: Math.round((count / qs.length) * 100),
        timeTakenSeconds: elapsed,
        questionsData,
        completedAt: new Date(),
        userId: 'lucas',
      });

      loadHistory();
    },
    [questionsForSection, sectionStart, answers, countCorrect]
  );

  // Get fresh questions for a single section without touching the others.
  const regenerateSection = useCallback(
    (key: SectionKey) => {
      // single-section modes (olympiad / multiplication / division) reset the whole
      // set; "More Questions" randomizes the drill order each time
      if (key !== 'standard' && key !== 'advanced' && key !== 'challenge') {
        resetSession(questionsForMode(key, true), key);
        return;
      }
      const sec = PRACTICE_SECTIONS.find(s => s.key === key)!;
      const fresh = generateLevelQuestions(
        sec.key,
        PRACTICE_PER_GROUP,
        sec.range[0]
      );
      setQuestions(prev =>
        prev.map(q =>
          q.id >= sec.range[0] && q.id <= sec.range[1]
            ? fresh[q.id - sec.range[0]]
            : q
        )
      );
      const clearRange = <T,>(obj: Record<number, T>) => {
        const next = { ...obj };
        for (let id = sec.range[0]; id <= sec.range[1]; id++) delete next[id];
        return next;
      };
      setAnswers(prev => clearRange(prev));
      setFeedbackMessages(prev => clearRange(prev));
      setRevealed(prev => ({ ...prev, [key]: false }));
      setSectionTime(prev => ({ ...prev, [key]: null }));
      setSectionStart(prev => ({ ...prev, [key]: Date.now() }));
    },
    [resetSession]
  );

  const renderQuestionCard = (question: Question, revealed: boolean) => {
    const isCorrect =
      revealed &&
      answers[question.id] !== undefined &&
      answers[question.id] !== '' &&
      Number(answers[question.id]) === Number(question.answer);
    return (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={question.id}>
        <Card
          sx={{
            ...darkCard,
            bgcolor: revealed
              ? isCorrect
                ? withAlpha(palette.green425, 0.15)
                : withAlpha(palette.red425, 0.15)
              : withAlpha(palette.white, 0.06),
            border: revealed
              ? isCorrect
                ? `2px solid ${palette.green425}`
                : `2px solid ${palette.red425}`
              : `2px solid ${withAlpha(palette.white, 0.12)}`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color: palette.orange150,
                fontWeight: 'bold',
                mb: 2,
                fontSize: '1.05rem',
                lineHeight: 1.4,
              }}
            >
              {question.text}
            </Typography>
            {question.options ? (
              <FormControl fullWidth>
                <Select
                  value={answers[question.id] || ''}
                  onChange={e =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  disabled={revealed}
                  displayEmpty
                  renderValue={value => (value ? value : '-- Please select')}
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
                        answers[question.id] && revealed
                          ? answers[question.id] === String(question.answer)
                            ? palette.green350
                            : palette.red425
                          : withAlpha(palette.white, 0.2),
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: palette.amber450,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: palette.amber450,
                    },
                    '& .MuiSelect-icon': { color: palette.orange150 },
                    '&.Mui-disabled': {
                      opacity: 1,
                      color: answers[question.id]
                        ? answers[question.id] === String(question.answer)
                          ? palette.green125
                          : palette.red125
                        : palette.slate400,
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: palette.navy575,
                        border: `1px solid ${withAlpha(palette.white, 0.2)}`,
                        borderRadius: '10px',
                      },
                    },
                  }}
                >
                  {question.options.map(opt => {
                    const isThisCorrect =
                      revealed && opt === String(question.answer);
                    return (
                      <MenuItem
                        key={opt}
                        value={opt}
                        sx={{
                          color: isThisCorrect
                            ? palette.green350
                            : palette.slate25,
                        }}
                      >
                        {isThisCorrect ? '✅ ' : ''}
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
                type="number"
                // iOS ignores type="number" for keyboard choice; inputMode brings up the digit pad
                slotProps={{
                  htmlInput: { inputMode: 'numeric', pattern: '[0-9]*' },
                }}
                value={answers[question.id] || ''}
                onChange={e => handleAnswerChange(question.id, e.target.value)}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: withAlpha(palette.white, 0.06),
                    color: palette.white,
                    '& fieldset': {
                      borderColor: withAlpha(palette.white, 0.2),
                    },
                    '&:hover fieldset': {
                      borderColor: withAlpha(palette.white, 0.4),
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: palette.orange275,
                    },
                  },
                  '& .MuiInputLabel-root': { color: palette.slate400 },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: palette.orange275,
                  },
                }}
                fullWidth
              />
            )}
            {revealed && (
              <Box
                sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
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
  };

  return (
    <SectionContainer name="Math">
      {/* Mode Tabs */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={mode}
          onChange={handleModeChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            maxWidth: '100%',
            '& .MuiTabs-indicator': {
              backgroundColor: palette.red425,
              height: 3,
              borderRadius: '3px',
            },
            '& .MuiTabs-scrollButtons.Mui-disabled': { opacity: 0.3 },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: palette.slate400,
              minHeight: 48,
              px: 3,
              '&.Mui-selected': { color: palette.red225 },
            },
          }}
        >
          <Tab value="practice" label="🎯 Practice Mix" />
          <Tab value="multiplication" label="✖️ Times Tables" />
          <Tab value="division" label="➗ Division" />
          <Tab value="olympiad" label="🏆 Competitions" />
        </Tabs>
      </Box>

      {/* Olympiad Banner */}
      {mode === 'olympiad' && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${withAlpha(palette.amber775, 0.18)} 0%, ${withAlpha(palette.red425, 0.18)} 100%)`,
            border: `2px solid ${withAlpha(palette.amber450, 0.45)}`,
            textAlign: 'center',
            boxShadow: `0 0 24px ${withAlpha(palette.amber450, 0.18)}`,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: palette.amber450, mb: 1 }}
          >
            🏆 Maths Olympiad
          </Typography>
          <Typography
            sx={{
              color: palette.amber25,
              fontSize: '1.05rem',
              fontStyle: 'italic',
            }}
          >
            Unleash the maths olympian in you!
          </Typography>
          <Typography
            sx={{ color: palette.amber350, fontSize: '0.95rem', mt: 1 }}
          >
            Patterns, puzzles, and tricky problems. Take your time. Show your
            working on the whiteboard.
          </Typography>
        </Box>
      )}

      {/* Times Tables Banner */}
      {mode === 'multiplication' && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${withAlpha(palette.purple350, 0.18)} 0%, ${withAlpha(palette.blue425, 0.18)} 100%)`,
            border: `2px solid ${withAlpha(palette.purple350, 0.45)}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: palette.purple225, mb: 1 }}
          >
            ✖️ Times Tables
          </Typography>
          <Typography sx={{ color: palette.purple150, fontSize: '1.05rem' }}>
            Every fact from <strong>2 × 2</strong> all the way to{' '}
            <strong>9 × 9</strong>. Practise them until they're automatic!
          </Typography>
        </Box>
      )}

      {/* Division Banner */}
      {mode === 'division' && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${withAlpha(palette.teal450, 0.18)} 0%, ${withAlpha(palette.green350, 0.18)} 100%)`,
            border: `2px solid ${withAlpha(palette.teal450, 0.45)}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: palette.teal300, mb: 1 }}
          >
            ➗ Division Facts
          </Typography>
          <Typography sx={{ color: palette.teal100, fontSize: '1.05rem' }}>
            The times tables in reverse — from <strong>81 ÷ 9</strong> down to{' '}
            <strong>4 ÷ 2</strong>. Keep practising!
          </Typography>
        </Box>
      )}

      {/* Question Grids */}
      {mode === 'practice' ? (
        <Box>
          {PRACTICE_SECTIONS.map(section => {
            const sectionQuestions = questions.filter(
              q => q.id >= section.range[0] && q.id <= section.range[1]
            );
            const isRevealed = !!revealed[section.key];
            const correct = countCorrect(sectionQuestions);
            const total = sectionQuestions.length;
            const tTaken = sectionTime[section.key];
            const allRight = isRevealed && correct === total;
            return (
              <Box key={section.key} sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: section.color,
                    fontWeight: 'bold',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span>{section.emoji}</span>
                  <span>{section.label}</span>
                </Typography>

                {isRevealed && (
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '14px',
                      background: allRight
                        ? `linear-gradient(135deg, ${withAlpha(palette.green425, 0.25)} 0%, ${withAlpha(palette.green575, 0.35)} 100%)`
                        : `linear-gradient(135deg, ${withAlpha(palette.orange450, 0.18)} 0%, ${withAlpha(palette.red425, 0.18)} 100%)`,
                      border: allRight
                        ? `2px solid ${palette.green425}`
                        : `2px solid ${withAlpha(palette.orange450, 0.4)}`,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        color: allRight ? palette.green125 : palette.orange150,
                      }}
                    >
                      {allRight
                        ? `🎉 All ${total} correct! Superstar! 🌟`
                        : `${correct}/${total} correct — keep going! 💪`}
                    </Typography>
                    {tTaken != null && (
                      <Chip
                        icon={
                          <TimerIcon
                            sx={{ color: `${palette.amber450} !important` }}
                          />
                        }
                        label={`Time: ${formatTime(tTaken)}`}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: withAlpha(palette.white, 0.1),
                          color: palette.gray400,
                        }}
                      />
                    )}
                  </Box>
                )}

                <Grid container spacing={3}>
                  {sectionQuestions.map(q => renderQuestionCard(q, isRevealed))}
                </Grid>

                <Box
                  sx={{ mt: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}
                >
                  <Button
                    variant="contained"
                    onClick={() => checkSection(section.key)}
                    disabled={isRevealed}
                    sx={{
                      borderRadius: '25px',
                      px: 3.5,
                      py: 1.3,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      bgcolor: section.color,
                      '&:hover': {
                        bgcolor: section.color,
                        filter: 'brightness(0.92)',
                      },
                      '&.Mui-disabled': {
                        bgcolor: withAlpha(palette.white, 0.12),
                        color: withAlpha(palette.white, 0.4),
                      },
                    }}
                  >
                    ✅ Check {section.label}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => regenerateSection(section.key)}
                    sx={{
                      borderRadius: '25px',
                      px: 3.5,
                      py: 1.3,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      color: section.color,
                      borderColor: section.color,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: section.color,
                        borderWidth: 2,
                        bgcolor: withAlpha(palette.white, 0.05),
                      },
                    }}
                  >
                    🔄 New {section.label} Questions
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        (() => {
          const key = mode as SectionKey;
          const isRevealed = !!revealed[key];
          const correct = countCorrect(questions);
          const total = questions.length;
          const tTaken = sectionTime[key];
          const allRight = isRevealed && correct === total;
          return (
            <Box>
              {isRevealed && (
                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: '16px',
                    background: allRight
                      ? `linear-gradient(135deg, ${withAlpha(palette.green425, 0.3)} 0%, ${withAlpha(palette.green575, 0.4)} 100%)`
                      : `linear-gradient(135deg, ${withAlpha(palette.orange450, 0.2)} 0%, ${withAlpha(palette.red425, 0.2)} 100%)`,
                    border: allRight
                      ? `2px solid ${palette.green425}`
                      : `2px solid ${withAlpha(palette.orange450, 0.4)}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: allRight ? palette.green125 : palette.orange150,
                    }}
                  >
                    {allRight
                      ? "🎉 AMAZING! You're a superstar! 🌟"
                      : `${correct}/${total} correct! Keep going! 💪`}
                  </Typography>
                  {tTaken != null && (
                    <Chip
                      icon={
                        <TimerIcon
                          sx={{ color: `${palette.amber450} !important` }}
                        />
                      }
                      label={`Time: ${formatTime(tTaken)}`}
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
              <Grid container spacing={3}>
                {questions.map(q => renderQuestionCard(q, isRevealed))}
              </Grid>
              <Box
                sx={{ mt: 3, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}
              >
                <Button
                  variant="contained"
                  onClick={() => checkSection(key)}
                  disabled={isRevealed}
                  sx={{
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    bgcolor: palette.pink950,
                    '&:hover': { bgcolor: palette.magenta950 },
                    boxShadow: `0 4px 15px ${withAlpha(palette.pink950, 0.3)}`,
                    '&.Mui-disabled': {
                      bgcolor: withAlpha(palette.white, 0.12),
                      color: withAlpha(palette.white, 0.4),
                    },
                  }}
                >
                  ✅ Check Answers
                </Button>
                <Button
                  variant="contained"
                  onClick={() => regenerateSection(key)}
                  sx={{
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    bgcolor: palette.orange450,
                    '&:hover': { bgcolor: palette.orange650 },
                    boxShadow: `0 4px 15px ${withAlpha(palette.orange450, 0.3)}`,
                  }}
                >
                  🔄 More Questions
                </Button>
              </Box>
            </Box>
          );
        })()
      )}

      {/* Whiteboard */}
      <Whiteboard />

      {/* History Section */}
      <Box sx={{ mt: 4 }}>
        <Button
          onClick={() => setShowHistory(!showHistory)}
          startIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: palette.red225,
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
                    border: `2px solid ${withAlpha(palette.red425, 0.3)}`,
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
                        label={result.difficulty}
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          bgcolor:
                            result.difficulty === 'olympiad'
                              ? withAlpha(palette.amber450, 0.3)
                              : result.difficulty === 'challenge'
                                ? withAlpha(palette.red425, 0.3)
                                : result.difficulty === 'advanced'
                                  ? withAlpha(palette.blue425, 0.3)
                                  : result.difficulty === 'mixed'
                                    ? withAlpha(palette.purple350, 0.3)
                                    : result.difficulty === 'multiplication'
                                      ? withAlpha(palette.purple225, 0.3)
                                      : result.difficulty === 'division'
                                        ? withAlpha(palette.teal300, 0.3)
                                        : withAlpha(palette.orange275, 0.3),
                          color: palette.white,
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
                            color: palette.red225,
                            border: `1px solid ${withAlpha(palette.red425, 0.35)}`,
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            '&:hover': {
                              bgcolor: withAlpha(palette.red425, 0.1),
                              borderColor: palette.red425,
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
                  No results yet. Complete a session to see your history! 📝
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
          title="⚔️ Math Session Review"
          subtitle={`Mode: ${reviewResult.difficulty}`}
          accentColor={palette.red425}
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
            ? `Delete the ${deleteTarget.difficulty} session from ${new Date(deleteTarget.completedAt).toLocaleDateString()}? This cannot be undone.`
            : undefined
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </SectionContainer>
  );
}

export default MathSection;
