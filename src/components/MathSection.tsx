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

    // Add MCQ options for ~40% of advanced and challenge questions
    const useMCQ = (difficulty === 'advanced' || difficulty === 'challenge') && Math.random() < 0.4;
    questions.push({ id: i, text, answer, options: useMCQ ? mathOptions(Number(answer)) : undefined });
  }

  return questions;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

// ─── MCQ option generator for math ───────────────────────────────────────────
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

// Dark theme styles
const darkCard = {
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

// ─── Whiteboard (floating, top-right) ────────────────────────────────────────
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

  // Size canvas whenever it becomes visible and fill with white background
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
    // small delay so the expand animation has settled
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

  // Add document-level drag handlers
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
      {/* Collapsed pill / toggle button */}
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

      {/* Expanded panel */}
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
          {/* Header */}
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

          {/* Canvas */}
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

function MathSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    const saved = localStorage.getItem('mathDifficulty');
    return (saved as Difficulty) || 'standard';
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('mathQuestions');
    const savedDifficulty = localStorage.getItem('mathDifficulty') as Difficulty || 'standard';
    return saved ? JSON.parse(saved) : generateMathQuestions(savedDifficulty);
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

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('mathDifficulty', difficulty);
  }, [difficulty]);

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

  const handleDifficultyChange = useCallback(
    (_: React.SyntheticEvent, newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
      const newQuestions = generateMathQuestions(newDifficulty);
      setQuestions(newQuestions);
      setAnswers({});
      setShowAnswers(false);
      setAllCorrect(false);
      const newStartTime = Date.now();
      setStartTime(newStartTime);
      setTimeTaken(null);
      setFeedbackMessages({});
      // Clear localStorage for new session
      localStorage.removeItem('mathAnswers');
      localStorage.removeItem('mathShowAnswers');
      localStorage.removeItem('mathAllCorrect');
      localStorage.removeItem('mathTimeTaken');
      localStorage.removeItem('mathFeedbackMessages');
    },
    []
  );

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleMoreQuestions = useCallback(() => {
    const newQuestions = generateMathQuestions(difficulty);
    setQuestions(newQuestions);
    setAnswers({});
    setShowAnswers(false);
    setAllCorrect(false);
    const newStartTime = Date.now();
    setStartTime(newStartTime);
    setTimeTaken(null);
    setFeedbackMessages({});
    // Clear localStorage for new session
    localStorage.removeItem('mathAnswers');
    localStorage.removeItem('mathShowAnswers');
    localStorage.removeItem('mathAllCorrect');
    localStorage.removeItem('mathTimeTaken');
    localStorage.removeItem('mathFeedbackMessages');
  }, [difficulty]);

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

  return (
    <SectionContainer name="Math">
      {/* Difficulty Selector */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#ff8a80', fontWeight: 'bold' }}>
          🎯 Choose Your Level
        </Typography>
        <ToggleButtonGroup
          value={difficulty}
          exclusive
          onChange={handleDifficultyChange}
          sx={{
            gap: 1,
            '& .MuiToggleButton-root': {
              borderRadius: '12px',
              border: '2px solid rgba(239,83,80,0.3)',
              color: '#ff8a80',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              px: 3,
              py: 1.2,
              transition: 'all 0.3s',
              '&:hover': { bgcolor: 'rgba(239,83,80,0.1)' },
              '&.Mui-selected': {
                bgcolor: 'rgba(239,83,80,0.2)',
                borderColor: '#ef5350',
                color: '#ff8a80',
                '&:hover': { bgcolor: 'rgba(239,83,80,0.3)' },
              },
            },
          }}
        >
          <ToggleButton value="standard">⭐ Standard</ToggleButton>
          <ToggleButton value="advanced">🌟 Advanced</ToggleButton>
          <ToggleButton value="challenge">🔥 Challenge</ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
      <Grid container spacing={3}>
        {questions.map(question => {
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
                      fontSize: '1.1rem',
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
                            result.difficulty === 'challenge'
                              ? 'rgba(239,83,80,0.3)'
                              : result.difficulty === 'advanced'
                                ? 'rgba(66,165,245,0.3)'
                                : 'rgba(255,167,38,0.3)',
                          color: '#fff',
                        }}
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
          subtitle={`Difficulty: ${reviewResult.difficulty}`}
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
