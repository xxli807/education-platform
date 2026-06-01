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
  EditNote as WhiteboardIcon,
  Delete as EraseIcon,
  Replay as ReplayIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import SessionReviewDialog, { type ReviewQuestion } from './SessionReviewDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

type MathMode = 'practice' | 'olympiad';

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
  'Good try! It\'s actually',
  'So close! The answer is',
  'Nice effort! It\'s',
];

function getRandomEncouragement(correct: boolean): string {
  const list = correct ? encouragingCorrect : encouragingIncorrect;
  return list[Math.floor(Math.random() * list.length)];
}

function generateLevelQuestions(difficulty: Difficulty, count: number, startId: number): Question[] {
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
          num1 = timesTableOptions[Math.floor(Math.random() * timesTableOptions.length)];
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

    const useMCQ = (difficulty === 'advanced' || difficulty === 'challenge') && Math.random() < 0.4;
    questions.push({ id, text, answer, options: useMCQ ? mathOptions(Number(answer)) : undefined });
  }

  return questions;
}

function generatePracticeQuestions(): Question[] {
  return [
    ...generateLevelQuestions('standard', PRACTICE_PER_GROUP, 1),
    ...generateLevelQuestions('advanced', PRACTICE_PER_GROUP, 1 + PRACTICE_PER_GROUP),
    ...generateLevelQuestions('challenge', PRACTICE_PER_GROUP, 1 + PRACTICE_PER_GROUP * 2),
  ];
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
    const delta = Math.floor(Math.random() * spread * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = ans + delta;
    if (candidate !== ans && !wrong.has(candidate)) wrong.add(candidate);
  }
  return [ans, ...[...wrong]].map(String).sort(() => Math.random() - 0.5);
}

const darkCard = {
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ top: 80, right: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, startTop: 0, startRight: 0 });
  const dragDistance = useRef(0);
  const DRAG_THRESHOLD = 10;

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e, canvas);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDraw = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const erase = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!expanded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
    const t = setTimeout(size, 50);
    window.addEventListener('resize', size);
    return () => { clearTimeout(t); window.removeEventListener('resize', size); };
  }, [expanded]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setPosition({
      top: Math.max(0, dragStart.current.startTop + deltaY),
      right: Math.max(0, dragStart.current.startRight - deltaX),
    });
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = {
      x: clientX,
      y: clientY,
      startTop: position.top,
      startRight: position.right,
    };
    dragDistance.current = 0;
  };

  const startMouseDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const startTouchDrag = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    };
    const onMouseUp = () => stopDrag();
    const onTouchEnd = () => stopDrag();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, stopDrag]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: position.top,
        right: position.right,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {!expanded && (
        <Box
          onMouseDown={startMouseDrag}
          onTouchStart={startTouchDrag}
          onClick={() => {
            if (dragDistance.current < DRAG_THRESHOLD) {
              setExpanded(true);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: '24px',
            bgcolor: 'rgba(10,14,26,0.92)',
            border: '2px solid rgba(255,213,79,0.6)',
            boxShadow: '0 0 12px rgba(255,213,79,0.3)',
            cursor: 'grab',
            userSelect: 'none',
            backdropFilter: 'blur(8px)',
            touchAction: 'none',
            '&:hover': {
              border: '2px solid #ffd54f',
              boxShadow: '0 0 20px rgba(255,213,79,0.5)',
            },
            transition: 'all 0.2s',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <WhiteboardIcon sx={{ color: '#ffd54f', fontSize: '1.2rem' }} />
          <Typography sx={{ color: '#ffd54f', fontWeight: 'bold', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
            ✏️ Whiteboard
          </Typography>
        </Box>
      )}

      {expanded && (
        <Box
          sx={{
            width: { xs: '80vw', sm: '45vw', md: '50vw' },
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgba(10,14,26,0.95)',
            border: '2px solid rgba(255,213,79,0.5)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(255,213,79,0.2)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >
          <Box
            onMouseDown={startMouseDrag}
            onTouchStart={startTouchDrag}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              borderBottom: '1px solid rgba(255,213,79,0.25)',
              bgcolor: 'rgba(255,213,79,0.07)',
              flexShrink: 0,
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
              '&:active': { cursor: 'grabbing' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WhiteboardIcon sx={{ color: '#ffd54f', fontSize: '1.1rem' }} />
              <Typography sx={{ color: '#ffd54f', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Whiteboard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                startIcon={<EraseIcon sx={{ fontSize: '1rem !important' }} />}
                onClick={erase}
                sx={{
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#ffd54f',
                  border: '1px solid rgba(255,213,79,0.4)',
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  '&:hover': { bgcolor: 'rgba(255,213,79,0.1)', borderColor: '#ffd54f' },
                }}
              >
                Clear
              </Button>
              <Button
                size="small"
                startIcon={<ExpandLessIcon sx={{ fontSize: '1rem !important' }} />}
                onClick={() => setExpanded(false)}
                sx={{
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#90a4ae',
                  border: '1px solid rgba(144,164,174,0.3)',
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  '&:hover': { bgcolor: 'rgba(144,164,174,0.1)', borderColor: '#90a4ae' },
                }}
              >
                Minimize
              </Button>
            </Box>
          </Box>

          <Box sx={{ touchAction: 'none', cursor: 'crosshair', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', flex: 1, display: 'block' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            <Typography sx={{ color: '#37474f', fontSize: '0.7rem', textAlign: 'center', pb: 0.5, flexShrink: 0 }}>
              draw with finger or mouse
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const PRACTICE_SECTIONS: { label: string; emoji: string; color: string; range: [number, number] }[] = [
  { label: 'Standard', emoji: '⭐', color: '#ffa726', range: [1, PRACTICE_PER_GROUP] },
  { label: 'Advanced', emoji: '🌟', color: '#42a5f5', range: [PRACTICE_PER_GROUP + 1, PRACTICE_PER_GROUP * 2] },
  { label: 'Challenge', emoji: '🔥', color: '#ef5350', range: [PRACTICE_PER_GROUP * 2 + 1, PRACTICE_PER_GROUP * 3] },
];

function MathSection() {
  const [mode, setMode] = useState<MathMode>(() => {
    const saved = localStorage.getItem('mathMode');
    return saved === 'olympiad' ? 'olympiad' : 'practice';
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('mathQuestions');
    if (saved) return JSON.parse(saved);
    const savedMode = localStorage.getItem('mathMode') === 'olympiad' ? 'olympiad' : 'practice';
    return savedMode === 'olympiad' ? generateOlympiadQuestions(OLYMPIAD_COUNT) : generatePracticeQuestions();
  });
  const [answers, setAnswers] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('mathAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [showAnswers, setShowAnswers] = useState(() => {
    const saved = localStorage.getItem('mathShowAnswers');
    return saved ? JSON.parse(saved) : false;
  });
  const [allCorrect, setAllCorrect] = useState(() => {
    const saved = localStorage.getItem('mathAllCorrect');
    return saved ? JSON.parse(saved) : false;
  });
  const [startTime, setStartTime] = useState<number>(() => {
    const saved = localStorage.getItem('mathStartTime');
    return saved ? parseInt(saved) : Date.now();
  });
  const [timeTaken, setTimeTaken] = useState<number | null>(() => {
    const saved = localStorage.getItem('mathTimeTaken');
    return saved ? parseInt(saved) : null;
  });
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<MathSessionResult[]>([]);
  const [reviewResult, setReviewResult] = useState<MathSessionResult | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MathSessionResult | null>(null);
  const [feedbackMessages, setFeedbackMessages] = useState<{ [key: number]: string }>(() => {
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
    localStorage.setItem('mathShowAnswers', JSON.stringify(showAnswers));
  }, [showAnswers]);

  useEffect(() => {
    localStorage.setItem('mathAllCorrect', JSON.stringify(allCorrect));
  }, [allCorrect]);

  useEffect(() => {
    localStorage.setItem('mathStartTime', startTime.toString());
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem('mathTimeTaken', timeTaken?.toString() || '');
  }, [timeTaken]);

  useEffect(() => {
    localStorage.setItem('mathFeedbackMessages', JSON.stringify(feedbackMessages));
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

  const resetSession = useCallback((nextQuestions: Question[]) => {
    setQuestions(nextQuestions);
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    setStartTime(Date.now());
    setTimeTaken(null);
    setFeedbackMessages({});
    localStorage.removeItem('mathAnswers');
    localStorage.removeItem('mathShowAnswers');
    localStorage.removeItem('mathAllCorrect');
    localStorage.removeItem('mathTimeTaken');
    localStorage.removeItem('mathFeedbackMessages');
  }, []);

  const handleModeChange = useCallback(
    (_: React.SyntheticEvent, newMode: MathMode | null) => {
      if (!newMode || newMode === mode) return;
      setMode(newMode);
      const nextQuestions =
        newMode === 'olympiad'
          ? generateOlympiadQuestions(OLYMPIAD_COUNT)
          : generatePracticeQuestions();
      resetSession(nextQuestions);
    },
    [mode, resetSession]
  );

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleMoreQuestions = useCallback(() => {
    const nextQuestions =
      mode === 'olympiad'
        ? generateOlympiadQuestions(OLYMPIAD_COUNT)
        : generatePracticeQuestions();
    resetSession(nextQuestions);
  }, [mode, resetSession]);

  const isEveryAnswerCorrect = useMemo(() => {
    if (!questions.length) return false;
    return questions.every(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === Number(q.answer);
    });
  }, [answers, questions]);

  const correctCount = useMemo(() => {
    return questions.filter(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === Number(q.answer);
    }).length;
  }, [answers, questions]);

  const handleCheckAnswers = useCallback(async () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setTimeTaken(elapsed);
    setShowAnswers(true);
    setAllCorrect(isEveryAnswerCorrect);

    const messages: { [key: number]: string } = {};
    questions.forEach(q => {
      const isCorrect =
        answers[q.id] !== undefined &&
        answers[q.id] !== '' &&
        Number(answers[q.id]) === Number(q.answer);
      messages[q.id] = getRandomEncouragement(isCorrect);
    });
    setFeedbackMessages(messages);

    const count = questions.filter(q => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === '') return false;
      return Number(val) === Number(q.answer);
    }).length;

    const questionsData = JSON.stringify(
      questions.map(q => ({
        text: q.text,
        correctAnswer: q.answer,
        userAnswer: answers[q.id] || '',
        isCorrect: Number(answers[q.id]) === Number(q.answer),
      }))
    );

    await db.mathSessionResults.add({
      difficulty: mode === 'olympiad' ? 'olympiad' : 'mixed',
      totalQuestions: questions.length,
      correctCount: count,
      score: Math.round((count / questions.length) * 100),
      timeTakenSeconds: elapsed,
      questionsData,
      completedAt: new Date(),
      userId: 'lucas',
    });

    loadHistory();
  }, [startTime, isEveryAnswerCorrect, questions, answers, mode]);

  const renderQuestionCard = (question: Question) => {
    const isCorrect =
      showAnswers &&
      answers[question.id] !== undefined &&
      answers[question.id] !== '' &&
      Number(answers[question.id]) === Number(question.answer);
    return (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={question.id}>
        <Card
          sx={{
            ...darkCard,
            bgcolor: showAnswers
              ? isCorrect
                ? 'rgba(76,175,80,0.15)'
                : 'rgba(239,83,80,0.15)'
              : 'rgba(255,255,255,0.06)',
            border: showAnswers
              ? isCorrect
                ? '2px solid #4caf50'
                : '2px solid #ef5350'
              : '2px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color: '#ffcc80',
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
                  onChange={e => handleAnswerChange(question.id, e.target.value)}
                  disabled={showAnswers}
                  displayEmpty
                  renderValue={(value) => value ? value : '-- Please select'}
                  sx={{
                    borderRadius: '10px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    color: answers[question.id] ? '#fff' : '#90a4ae',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: answers[question.id] && showAnswers
                        ? answers[question.id] === String(question.answer)
                          ? '#66bb6a'
                          : '#ef5350'
                        : 'rgba(255,255,255,0.2)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffd54f'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffd54f'
                    },
                    '& .MuiSelect-icon': { color: '#ffcc80' },
                    '&.Mui-disabled': {
                      opacity: 1,
                      color: answers[question.id]
                        ? answers[question.id] === String(question.answer)
                          ? '#a5d6a7'
                          : '#ef9a9a'
                        : '#90a4ae'
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: { bgcolor: '#1a1f35', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }
                    }
                  }}
                >
                  {question.options.map(opt => {
                    const isThisCorrect = showAnswers && opt === String(question.answer);
                    return (
                      <MenuItem key={opt} value={opt} sx={{ color: isThisCorrect && showAnswers ? '#66bb6a' : '#cfd8dc' }}>
                        {isThisCorrect && showAnswers ? '✅ ' : ''}{opt}
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
                value={answers[question.id] || ''}
                onChange={e => handleAnswerChange(question.id, e.target.value)}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#ffa726' },
                  },
                  '& .MuiInputLabel-root': { color: '#90a4ae' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#ffa726' },
                }}
                fullWidth
              />
            )}
            {showAnswers && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {isCorrect ? (
                  <CheckIcon sx={{ color: '#66bb6a' }} />
                ) : (
                  <WrongIcon sx={{ color: '#ef5350' }} />
                )}
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    color: isCorrect ? '#a5d6a7' : '#ef9a9a',
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
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#ef5350', height: 3, borderRadius: '3px' },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: '#90a4ae',
              minHeight: 48,
              px: 3,
              '&.Mui-selected': { color: '#ff8a80' },
            },
          }}
        >
          <Tab value="practice" label="🎯 Practice Mix" />
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
            background: 'linear-gradient(135deg, rgba(255,193,7,0.18) 0%, rgba(239,83,80,0.18) 100%)',
            border: '2px solid rgba(255,213,79,0.45)',
            textAlign: 'center',
            boxShadow: '0 0 24px rgba(255,213,79,0.18)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffd54f', mb: 1 }}>
            🏆 Maths Olympiad
          </Typography>
          <Typography sx={{ color: '#fff8e1', fontSize: '1.05rem', fontStyle: 'italic' }}>
            Unleash the maths olympian in you!
          </Typography>
          <Typography sx={{ color: '#ffe082', fontSize: '0.95rem', mt: 1 }}>
            Patterns, puzzles, and tricky problems. Take your time. Show your working on the whiteboard.
          </Typography>
        </Box>
      )}

      {/* Score Summary */}
      {showAnswers && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: allCorrect
              ? 'linear-gradient(135deg, rgba(76,175,80,0.3) 0%, rgba(56,142,60,0.4) 100%)'
              : 'linear-gradient(135deg, rgba(255,152,0,0.2) 0%, rgba(239,83,80,0.2) 100%)',
            border: allCorrect ? '2px solid #4caf50' : '2px solid rgba(255,152,0,0.4)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: allCorrect ? '#a5d6a7' : '#ffcc80' }}>
            {allCorrect
              ? '🎉 AMAZING! You\'re a superstar! 🌟'
              : `${correctCount}/${questions.length} correct! Keep going! 💪`}
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

      {/* Question Grid */}
      {mode === 'practice' ? (
        <Box>
          {PRACTICE_SECTIONS.map(section => {
            const sectionQuestions = questions.filter(
              q => q.id >= section.range[0] && q.id <= section.range[1]
            );
            return (
              <Box key={section.label} sx={{ mb: 4 }}>
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
                <Grid container spacing={3}>
                  {sectionQuestions.map(renderQuestionCard)}
                </Grid>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {questions.map(renderQuestionCard)}
        </Grid>
      )}

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
            boxShadow: '0 4px 15px rgba(233,30,99,0.3)',
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
          🔄 More Questions
        </Button>
      </Box>

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
            color: '#ff8a80',
            fontSize: '1rem',
          }}
        >
          📊 Recent Results ({history.length})
        </Button>
        <Collapse in={showHistory}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {history.map(result => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={result.id}>
                <Card sx={{ ...darkCard, bgcolor: 'rgba(255,255,255,0.06)', border: '2px solid rgba(239,83,80,0.3)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={result.difficulty}
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          bgcolor:
                            result.difficulty === 'olympiad'
                              ? 'rgba(255,213,79,0.3)'
                              : result.difficulty === 'challenge'
                                ? 'rgba(239,83,80,0.3)'
                                : result.difficulty === 'advanced'
                                  ? 'rgba(66,165,245,0.3)'
                                  : result.difficulty === 'mixed'
                                    ? 'rgba(186,104,200,0.3)'
                                    : 'rgba(255,167,38,0.3)',
                          color: '#fff',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#90a4ae' }}>
                        {formatSavedDateTime(result.completedAt)}
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
                            color: '#ff8a80',
                            border: '1px solid rgba(239,83,80,0.35)',
                            px: 1.2,
                            py: 0.4,
                            minWidth: 0,
                            '&:hover': { bgcolor: 'rgba(239,83,80,0.1)', borderColor: '#ef5350' },
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
          accentColor="#ef5350"
          questions={JSON.parse(reviewResult.questionsData || '[]') as ReviewQuestion[]}
          score={reviewResult.score}
          correctCount={reviewResult.correctCount}
          totalQuestions={reviewResult.totalQuestions}
          date={new Date(reviewResult.completedAt)}
        />
      )}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        description={deleteTarget ? `Delete the ${deleteTarget.difficulty} session from ${new Date(deleteTarget.completedAt).toLocaleDateString()}? This cannot be undone.` : undefined}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </SectionContainer>
  );
}

export default MathSection;
