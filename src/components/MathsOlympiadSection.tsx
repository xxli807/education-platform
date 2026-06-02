import { Box, Button, IconButton, TextField, Typography, Collapse } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  nextOlympiadProblem,
  OLYMPIAD_CATEGORIES,
  type OlympiadCategory,
  type OlympiadProblem,
} from '../data/olympiadJuniorProblems';

function MathsOlympiadSection() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<OlympiadCategory>(() => {
    const saved = localStorage.getItem('olympiadCategory');
    return (saved as OlympiadCategory) || 'mix';
  });
  const [problem, setProblem] = useState<OlympiadProblem>(() => nextOlympiadProblem(
    (localStorage.getItem('olympiadCategory') as OlympiadCategory) || 'mix'
  ));
  const [revealed, setRevealed] = useState(false);
  const [attempt, setAttempt] = useState('');
  const [scratch, setScratch] = useState('');
  const [showScratch, setShowScratch] = useState(false);
  const [solved, setSolved] = useState(() => Number(localStorage.getItem('olympiadSolved') || '0'));

  const changeCategory = useCallback((cat: OlympiadCategory) => {
    setCategory(cat);
    localStorage.setItem('olympiadCategory', cat);
    setProblem(nextOlympiadProblem(cat));
    setRevealed(false);
    setAttempt('');
    setScratch('');
  }, []);

  const nextProblem = useCallback(() => {
    setProblem(nextOlympiadProblem(category));
    setRevealed(false);
    setAttempt('');
    setScratch('');
  }, [category]);

  const reveal = useCallback(() => {
    setRevealed(true);
    const n = solved + 1;
    setSolved(n);
    localStorage.setItem('olympiadSolved', String(n));
  }, [solved]);

  const catMeta = useMemo(
    () => OLYMPIAD_CATEGORIES.find(c => c.id === problem.category),
    [problem.category]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        background: `
          linear-gradient(135deg, rgba(20,16,8,0.96) 0%, rgba(40,30,10,0.92) 50%, rgba(30,20,8,0.96) 100%),
          radial-gradient(circle at 15% 15%, rgba(255,213,79,0.12) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(255,152,0,0.1) 0%, transparent 40%)
        `,
        backgroundColor: '#0a0e1a',
      }}
    >
      {/* floating medals */}
      {['🏅', '🥇', '⭐', '🧠', '🏆'].map((e, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: 'absolute',
            top: `${12 + i * 18}%`,
            [i % 2 ? 'right' : 'left']: `${3 + i * 2}%`,
            fontSize: '2.2rem',
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        >
          {e}
        </Box>
      ))}

      {/* Top bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={() => navigate({ to: '/' })}
          aria-label="Back to dashboard"
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            color: '#ffd54f',
            border: '2px solid rgba(255,213,79,0.4)',
            borderRadius: '14px',
            '&:hover': { bgcolor: 'rgba(255,213,79,0.15)' },
          }}
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            bgcolor: 'rgba(255,213,79,0.12)', border: '2px solid rgba(255,213,79,0.4)',
            borderRadius: '999px', px: 2, py: 0.5,
          }}
        >
          <Typography sx={{ fontWeight: 900, color: '#ffd54f' }}>🏅 {solved} solved</Typography>
        </Box>
      </Box>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(90deg, #ffd54f, #ffb300, #ff8f00, #ffd54f)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
          }}
        >
          🏅 Maths Olympiad
        </Typography>
        <Typography sx={{ color: '#ffe082', fontWeight: 700, fontSize: '1.1rem', fontStyle: 'italic', mt: 0.5 }}>
          Unleash the Maths Olympian in You!
        </Typography>
        <Typography sx={{ color: '#bcaaa4', fontWeight: 600, fontSize: '0.9rem' }}>
          Junior level · Year 2–3 · take your time and show your working
        </Typography>
      </Box>

      {/* Category selector */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3, position: 'relative', zIndex: 1 }}>
        {OLYMPIAD_CATEGORIES.map(c => {
          const sel = category === c.id;
          return (
            <Box
              key={c.id}
              role="button"
              tabIndex={0}
              aria-pressed={sel}
              onClick={() => changeCategory(c.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); changeCategory(c.id); } }}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                borderRadius: '999px',
                px: 2.2,
                py: 0.9,
                fontWeight: 800,
                fontSize: '0.9rem',
                color: sel ? '#1a1206' : '#ffd54f',
                background: sel ? 'linear-gradient(150deg, #ffd54f, #ffb300)' : 'rgba(255,213,79,0.08)',
                border: `2px solid ${sel ? '#ffd54f' : 'rgba(255,213,79,0.3)'}`,
                transition: 'all 0.15s',
                '&:hover': { background: sel ? 'linear-gradient(150deg, #ffe082, #ffc107)' : 'rgba(255,213,79,0.18)' },
                '&:focus-visible': { outline: '3px solid #ffd54f', outlineOffset: 2 },
              }}
            >
              {c.emoji} {c.label}
            </Box>
          );
        })}
      </Box>

      {/* Problem card */}
      <Box
        sx={{
          maxWidth: 760,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
          bgcolor: 'rgba(255,255,255,0.05)',
          border: '2px solid rgba(255,213,79,0.35)',
          borderRadius: '20px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
          p: { xs: 2.5, sm: 4 },
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography sx={{ color: catMeta ? '#ffb300' : '#ffd54f', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1.5 }}>
          {catMeta?.emoji} {catMeta?.label}
        </Typography>

        <Typography
          sx={{
            color: '#fff8e1',
            fontWeight: 700,
            fontSize: { xs: '1.15rem', sm: '1.35rem' },
            lineHeight: 1.5,
            whiteSpace: 'pre-line',
          }}
        >
          {problem.question}
        </Typography>

        {/* optional grid */}
        {problem.grid && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
            <Box sx={{ display: 'inline-block', border: '2px solid rgba(255,213,79,0.4)', borderRadius: '12px', overflow: 'hidden' }}>
              {problem.grid.map((row, ri) => (
                <Box key={ri} sx={{ display: 'flex' }}>
                  {row.map((cell, ci) => (
                    <Box
                      key={ci}
                      sx={{
                        width: { xs: 52, sm: 64 },
                        height: { xs: 52, sm: 64 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        color: cell === '?' ? '#ff8a65' : '#fff8e1',
                        bgcolor: ci === row.length - 1 ? 'rgba(255,213,79,0.12)' : 'transparent',
                        borderRight: ci < row.length - 1 ? '1px solid rgba(255,213,79,0.25)' : 'none',
                        borderBottom: ri < problem.grid!.length - 1 ? '1px solid rgba(255,213,79,0.25)' : 'none',
                      }}
                    >
                      {cell}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* self-check answer box */}
        <TextField
          fullWidth
          value={attempt}
          onChange={e => setAttempt(e.target.value)}
          placeholder="Write your answer here (optional)…"
          sx={{
            mt: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              bgcolor: 'rgba(0,0,0,0.3)',
              color: '#fff8e1',
              fontWeight: 700,
              '& fieldset': { borderColor: 'rgba(255,213,79,0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255,213,79,0.5)' },
              '&.Mui-focused fieldset': { borderColor: '#ffd54f' },
            },
            '& input::placeholder': { color: '#8d7b5f', opacity: 1 },
          }}
        />

        {/* scratch pad */}
        <Box sx={{ mt: 1.5 }}>
          <Button
            onClick={() => setShowScratch(s => !s)}
            startIcon={<EditNoteIcon />}
            sx={{ color: '#bcaaa4', textTransform: 'none', fontWeight: 700, fontSize: '0.85rem' }}
          >
            {showScratch ? 'Hide working pad' : 'Show working pad'}
          </Button>
          <Collapse in={showScratch}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={scratch}
              onChange={e => setScratch(e.target.value)}
              placeholder="Scribble your working here…"
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  color: '#cfd8dc',
                  fontFamily: 'monospace',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                },
                '& textarea::placeholder': { color: '#6d6050', opacity: 1 },
              }}
            />
          </Collapse>
        </Box>

        {/* actions */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
          {!revealed && (
            <Button
              onClick={reveal}
              startIcon={<LightbulbIcon />}
              variant="contained"
              sx={{
                borderRadius: '999px', px: 3, py: 1.2, fontWeight: 900, textTransform: 'none',
                color: '#1a1206', background: 'linear-gradient(150deg, #ffd54f, #ffb300)',
                boxShadow: '0 4px 14px rgba(255,179,0,0.4)',
                '&:hover': { background: 'linear-gradient(150deg, #ffe082, #ffc107)' },
              }}
            >
              Reveal Answer
            </Button>
          )}
          <Button
            onClick={nextProblem}
            startIcon={<RefreshIcon />}
            variant="outlined"
            sx={{
              borderRadius: '999px', px: 3, py: 1.2, fontWeight: 900, textTransform: 'none',
              color: '#ffd54f', borderColor: 'rgba(255,213,79,0.5)', borderWidth: 2,
              '&:hover': { borderColor: '#ffd54f', bgcolor: 'rgba(255,213,79,0.1)', borderWidth: 2 },
            }}
          >
            Next Problem
          </Button>
        </Box>

        {/* answer + working */}
        <Collapse in={revealed}>
          <Box
            sx={{
              mt: 3,
              p: 2.5,
              borderRadius: '16px',
              bgcolor: 'rgba(76,175,80,0.12)',
              border: '2px solid rgba(129,199,132,0.5)',
            }}
          >
            <Typography sx={{ color: '#a5d6a7', fontWeight: 900, fontSize: '1.2rem', mb: 1 }}>
              ✅ Answer: {problem.answer}
            </Typography>
            <Typography sx={{ color: '#c8e6c9', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.5 }}>
              How to solve it
            </Typography>
            <Typography sx={{ color: '#e8f5e9', fontSize: '1rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {problem.working}
            </Typography>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}

export default MathsOlympiadSection;
