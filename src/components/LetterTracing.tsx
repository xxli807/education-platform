import { palette, withAlpha } from '../theme/palette';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/** emoji + word shown above the tracing sheet for each letter */
const LETTER_WORDS: { emoji: string; word: string }[] = [
  { emoji: '🍎', word: 'Apple' },
  { emoji: '🐝', word: 'Bee' },
  { emoji: '🐱', word: 'Cat' },
  { emoji: '🐶', word: 'Dog' },
  { emoji: '🥚', word: 'Egg' },
  { emoji: '🐸', word: 'Frog' },
  { emoji: '🍇', word: 'Grapes' },
  { emoji: '🎩', word: 'Hat' },
  { emoji: '🍦', word: 'Ice cream' },
  { emoji: '🤹', word: 'Juggle' },
  { emoji: '🪁', word: 'Kite' },
  { emoji: '🦁', word: 'Lion' },
  { emoji: '🌙', word: 'Moon' },
  { emoji: '👃', word: 'Nose' },
  { emoji: '🐙', word: 'Octopus' },
  { emoji: '🐷', word: 'Pig' },
  { emoji: '👑', word: 'Queen' },
  { emoji: '🤖', word: 'Robot' },
  { emoji: '☀️', word: 'Sun' },
  { emoji: '🌳', word: 'Tree' },
  { emoji: '☂️', word: 'Umbrella' },
  { emoji: '🎻', word: 'Violin' },
  { emoji: '🐋', word: 'Whale' },
  { emoji: '🩻', word: 'X-ray' },
  { emoji: '🪀', word: 'Yo-yo' },
  { emoji: '🦓', word: 'Zebra' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** kid-friendly rounded font available on iPad (Chalkboard SE) and desktop */
const TRACE_FONT = '"Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif';

const PEN_COLORS = [
  palette.purple425,
  palette.pink650,
  palette.teal525,
  palette.orange525,
  palette.blue675,
];

function speakLetter(letter: string, word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(
    `${letter}! ${letter} is for ${word}.`
  );
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

/**
 * Paint the handwriting sheet: sky/middle/grass guide lines plus the big
 * faded letters (upper + lower case) for the child to trace over.
 */
function drawSheet(canvas: HTMLCanvasElement, letter: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.fillStyle = palette.white;
  ctx.fillRect(0, 0, w, h);

  // handwriting guide lines: top (sky), dashed middle, base (grass)
  const top = h * 0.2;
  const base = h * 0.68;
  const mid = (top + base) / 2;
  const margin = 14;

  const line = (y: number, color: string, dashed: boolean) => {
    ctx.beginPath();
    ctx.setLineDash(dashed ? [12, 10] : []);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(margin, y);
    ctx.lineTo(w - margin, y);
    ctx.stroke();
  };
  line(top, withAlpha(palette.blue350, 0.7), false);
  line(mid, withAlpha(palette.slate400, 0.7), true);
  line(base, withAlpha(palette.red425, 0.6), false);

  // big faded letters sized so capitals sit between the sky and grass lines
  const fontSize = (base - top) / 0.72;
  ctx.font = `${fontSize}px ${TRACE_FONT}`;
  ctx.textBaseline = 'alphabetic';
  ctx.setLineDash([10, 8]);

  const upper = letter;
  const lower = letter.toLowerCase();
  const gap = fontSize * 0.35;
  const wUpper = ctx.measureText(upper).width;
  const wLower = ctx.measureText(lower).width;
  let x = (w - (wUpper + gap + wLower)) / 2;

  for (const glyph of [upper, lower]) {
    ctx.fillStyle = withAlpha(palette.slate400, 0.22);
    ctx.fillText(glyph, x, base);
    ctx.strokeStyle = withAlpha(palette.slate575, 0.8);
    ctx.lineWidth = 2;
    ctx.strokeText(glyph, x, base);
    x += ctx.measureText(glyph).width + gap;
  }
  ctx.setLineDash([]);
}

function LetterTracing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [penColor, setPenColor] = useState(PEN_COLORS[0]);

  const letter = ALPHABET[index];
  const { emoji, word } = LETTER_WORDS[index];

  const resetSheet = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) drawSheet(canvas, ALPHABET[index]);
  }, [index]);

  // size the canvas to its box (retina-sharp) and repaint on letter change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawSheet(canvas, ALPHABET[index]);
    };
    size();
    window.addEventListener('resize', size);
    return () => window.removeEventListener('resize', size);
  }, [index]);

  // keep the chosen letter visible in the A–Z strip
  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [index]);

  const getPos = (e: React.PointerEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const pos = getPos(e, canvas);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 9;
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

  const goTo = (i: number) => setIndex((i + ALPHABET.length) % ALPHABET.length);

  return (
    <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 760, mx: 'auto' }}>
      {/* word banner */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.4rem', sm: '1.8rem' },
            color: palette.purple625,
            textShadow: `1px 1px 0 ${palette.white}`,
          }}
        >
          {emoji} {letter} is for {word}
        </Typography>
        <IconButton
          onClick={() => speakLetter(letter, word)}
          aria-label={`Hear the letter ${letter}`}
          sx={{
            color: palette.teal725,
            bgcolor: withAlpha(palette.white, 0.8),
            border: `3px solid ${palette.teal375}`,
            '&:hover': { bgcolor: palette.white },
          }}
        >
          <VolumeUpIcon />
        </IconButton>
      </Box>

      {/* tracing sheet with prev/next arrows */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => goTo(index - 1)}
          aria-label="Previous letter"
          sx={{
            bgcolor: withAlpha(palette.white, 0.8),
            color: palette.purple625,
            border: `3px solid ${palette.magenta25}`,
            '&:hover': { bgcolor: palette.white },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            height: { xs: 260, sm: 340 },
            borderRadius: '24px',
            border: `5px solid ${palette.white}`,
            boxShadow: `0 10px 26px ${withAlpha(palette.black, 0.15)}`,
            overflow: 'hidden',
            touchAction: 'none',
            cursor: 'crosshair',
            bgcolor: palette.white,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={stopDraw}
            onPointerLeave={stopDraw}
            onPointerCancel={stopDraw}
          />
        </Box>

        <IconButton
          onClick={() => goTo(index + 1)}
          aria-label="Next letter"
          sx={{
            bgcolor: withAlpha(palette.white, 0.8),
            color: palette.purple625,
            border: `3px solid ${palette.magenta25}`,
            '&:hover': { bgcolor: palette.white },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* pen colours + try again */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          mt: 2,
          flexWrap: 'wrap',
        }}
      >
        {PEN_COLORS.map(c => (
          <Box
            key={c}
            role="button"
            tabIndex={0}
            aria-label="Choose pen colour"
            onClick={() => setPenColor(c)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setPenColor(c);
              }
            }}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: c,
              cursor: 'pointer',
              border:
                penColor === c
                  ? `4px solid ${palette.slate950}`
                  : `4px solid ${palette.white}`,
              boxShadow: `0 3px 8px ${withAlpha(palette.black, 0.25)}`,
              transition: 'transform 0.15s',
              '&:hover': { transform: 'scale(1.15)' },
              '&:focus-visible': {
                outline: `3px solid ${palette.purple675}`,
                outlineOffset: 2,
              },
            }}
          />
        ))}
        <IconButton
          onClick={resetSheet}
          aria-label="Wipe and trace again"
          sx={{
            ml: 1,
            color: palette.orange575,
            bgcolor: withAlpha(palette.white, 0.8),
            border: `3px solid ${palette.amber625}`,
            '&:hover': { bgcolor: palette.white },
          }}
        >
          <ReplayIcon />
        </IconButton>
      </Box>

      {/* A–Z picker strip */}
      <Box
        ref={stripRef}
        sx={{
          display: 'flex',
          gap: 0.75,
          mt: 2,
          pb: 1,
          overflowX: 'auto',
          // never 'center': centring an overflowing flex row clips the
          // leading letters with no way to scroll back to them
          justifyContent: 'flex-start',
          '&::after, &::before': { content: '""', mx: 'auto' },
        }}
      >
        {ALPHABET.map((l, i) => (
          <Box
            key={l}
            role="button"
            tabIndex={0}
            aria-label={`Trace the letter ${l}`}
            onClick={() => goTo(i)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goTo(i);
              }
            }}
            sx={{
              flexShrink: 0,
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '1.05rem',
              cursor: 'pointer',
              userSelect: 'none',
              color: i === index ? palette.white : palette.purple625,
              background:
                i === index
                  ? `linear-gradient(150deg, ${palette.magenta325}, ${palette.purple475})`
                  : withAlpha(palette.white, 0.8),
              border: `2px solid ${i === index ? palette.purple475 : palette.magenta25}`,
              '&:hover': { transform: 'scale(1.1)' },
              transition: 'transform 0.12s',
              '&:focus-visible': {
                outline: `3px solid ${palette.purple675}`,
                outlineOffset: 1,
              },
            }}
          >
            {l}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LetterTracing;
