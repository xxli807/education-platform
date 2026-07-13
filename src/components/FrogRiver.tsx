import { palette, withAlpha } from '../theme/palette';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

/** The slice of a Play-Zone round the river scene needs. */
export interface FrogRound {
  display: string;
  prompt: string;
  options: string[];
  answer: string;
}

/** Stone spots along the river, staggered like a real crossing (percent / px). */
const STONE_POS = [
  { left: '24%', bottom: 30 },
  { left: '45%', bottom: 88 },
  { left: '66%', bottom: 34 },
  { left: '87%', bottom: 92 },
];

const FROG_START = { left: '5%', bottom: 26 };

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

/**
 * Animated frog-crossing-the-river scene used by the Year 1 letter and
 * counting games. Each stepping stone carries an answer option; tapping one
 * makes the frog leap onto it. Round flow (locking, scoring, auto-advance)
 * stays with the parent — this component is only the fun.
 */
function FrogRiver({
  round,
  picked,
  roundNum,
  mode,
  muted,
  onPick,
}: {
  round: FrogRound;
  picked: string | null;
  roundNum: number;
  mode: 'letters' | 'numbers';
  muted: boolean;
  onPick: (opt: string) => void;
}) {
  const reveal = picked !== null;
  const pickedIdx = picked === null ? -1 : round.options.indexOf(picked);
  const answerIdx = round.options.indexOf(round.answer);
  const frogSpot = pickedIdx >= 0 ? STONE_POS[pickedIdx] : FROG_START;
  const success = reveal && pickedIdx === answerIdx;

  // say the task out loud at the start of each round
  useEffect(() => {
    if (muted) return;
    speak(
      mode === 'letters'
        ? `${round.answer}! Hop to the little ${round.answer}!`
        : 'Count them, then hop to that number!'
    );
    // re-run per round only — round.answer changes with roundNum
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundNum, muted]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 330, sm: 380 },
        borderRadius: '28px',
        border: `5px solid ${palette.white}`,
        boxShadow: `0 12px 30px ${withAlpha(palette.black, 0.15)}`,
        overflow: 'hidden',
        mb: 3,
        background: `linear-gradient(180deg, ${palette.cyan25} 0%, ${palette.blue150} 35%, ${palette.blue350} 100%)`,
      }}
    >
      <style>{`
        @keyframes frogHop {
          0% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-90px) scale(1.08) rotate(-6deg); }
          80% { transform: translateY(4px) scaleY(0.82) scaleX(1.15); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes frogIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes rippleRing {
          0% { transform: scale(0.7); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes splashUp {
          0% { transform: translateY(0) scale(0.4); opacity: 1; }
          100% { transform: translateY(-46px) scale(1.5); opacity: 0; }
        }
        @keyframes stoneSink {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes driftAcross {
          0% { transform: translateX(0); }
          100% { transform: translateX(40px); }
        }
        /* keep translateX(-50%): the animation transform replaces the static one */
        @keyframes signBob {
          0%, 100% { transform: translateX(-50%) rotate(-1.5deg); }
          50% { transform: translateX(-50%) rotate(1.5deg); }
        }
      `}</style>

      {/* river banks */}
      {['left', 'right'].map(side => (
        <Box
          key={side}
          aria-hidden
          sx={{
            position: 'absolute',
            bottom: -26,
            [side]: -34,
            width: 120,
            height: 84,
            borderRadius: '50%',
            background: `linear-gradient(180deg, ${palette.green350}, ${palette.green550})`,
            boxShadow: `inset 0 6px 8px ${withAlpha(palette.white, 0.3)}`,
          }}
        />
      ))}
      <Box
        aria-hidden
        sx={{ position: 'absolute', bottom: 40, left: 6, fontSize: '1.5rem' }}
      >
        🌾
      </Box>
      <Box
        aria-hidden
        sx={{ position: 'absolute', bottom: 46, right: 8, fontSize: '1.5rem' }}
      >
        🌱
      </Box>

      {/* drifting friends */}
      {[
        { e: '🦆', pos: { bottom: 6, left: '22%' }, size: '1.6rem' },
        { e: '🌸', pos: { bottom: 4, left: '52%' }, size: '1.3rem' },
        { e: '☁️', pos: { top: 8, left: '12%' }, size: '2rem' },
      ].map((d, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: 'absolute',
            ...d.pos,
            fontSize: d.size,
            opacity: 0.85,
            animation: `driftAcross ${6 + i * 2}s ease-in-out infinite alternate`,
            pointerEvents: 'none',
          }}
        >
          {d.e}
        </Box>
      ))}

      {/* task sign */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '72%',
          px: 2.5,
          py: 1,
          borderRadius: '18px',
          bgcolor: withAlpha(palette.white, 0.92),
          border: `4px solid ${palette.amber625}`,
          boxShadow: `0 6px 14px ${withAlpha(palette.black, 0.18)}`,
          textAlign: 'center',
          animation: 'signBob 5s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <Typography
          key={roundNum}
          sx={{
            fontWeight: 900,
            color: palette.slate950,
            lineHeight: 1.25,
            wordBreak: 'break-word',
            fontSize:
              mode === 'numbers' && round.display.length > 12
                ? { xs: '1.15rem', sm: '1.5rem' }
                : { xs: '2.2rem', sm: '2.8rem' },
          }}
        >
          {round.display}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            color: palette.purple675,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
          }}
        >
          {round.prompt}
        </Typography>
      </Box>

      {/* stepping stones (the answer options) */}
      {round.options.map((opt, i) => {
        const isAnswer = i === answerIdx;
        const isPicked = i === pickedIdx;
        const sunk = reveal && isPicked && !isAnswer;
        return (
          <Box
            key={`${roundNum}-${opt}`}
            role="button"
            tabIndex={reveal ? -1 : 0}
            aria-label={`Hop to ${opt}`}
            onClick={() => onPick(opt)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPick(opt);
              }
            }}
            sx={{
              position: 'absolute',
              left: STONE_POS[i].left,
              bottom: STONE_POS[i].bottom,
              transform: 'translateX(-50%)',
              width: { xs: 84, sm: 104 },
              height: { xs: 58, sm: 68 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: reveal ? 'default' : 'pointer',
              userSelect: 'none',
              fontWeight: 900,
              fontSize: { xs: '1.6rem', sm: '1.9rem' },
              color: palette.white,
              textShadow: `1px 2px 0 ${withAlpha(palette.black, 0.35)}`,
              background:
                reveal && isAnswer
                  ? `radial-gradient(ellipse at 35% 30%, ${palette.green400}, ${palette.green650})`
                  : `radial-gradient(ellipse at 35% 30%, ${palette.gray400}, ${palette.slate575})`,
              boxShadow:
                reveal && isAnswer
                  ? `0 6px 0 ${palette.green775}, 0 0 22px ${withAlpha(palette.green400, 0.8)}`
                  : `0 6px 0 ${withAlpha(palette.black, 0.3)}`,
              animation: sunk ? 'stoneSink 0.5s ease forwards' : 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
              zIndex: 1,
              '&:hover': reveal
                ? {}
                : { transform: 'translateX(-50%) translateY(-4px)' },
              '&:focus-visible': {
                outline: `4px solid ${palette.purple675}`,
                outlineOffset: 3,
              },
              // soft ripple ring around every stone
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -10,
                borderRadius: '50%',
                border: `2px solid ${withAlpha(palette.white, 0.55)}`,
                animation: `rippleRing 2.6s ease-out ${i * 0.5}s infinite`,
                pointerEvents: 'none',
              },
            }}
          >
            {opt}
            {reveal && isAnswer && (
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: -14,
                  right: -4,
                  fontSize: '1.5rem',
                  animation: 'splashUp 0.8s ease both',
                }}
              >
                🎉
              </Box>
            )}
          </Box>
        );
      })}

      {/* the frog — remounts at the start pad each round, leaps on pick */}
      <Box
        key={roundNum}
        aria-hidden
        sx={{
          position: 'absolute',
          left: frogSpot.left,
          bottom: frogSpot.bottom + 26,
          transform: 'translateX(-50%)',
          transition:
            'left 0.65s cubic-bezier(0.45, 0, 0.4, 1), bottom 0.65s cubic-bezier(0.45, 0, 0.4, 1)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <Box
          key={pickedIdx}
          sx={{
            fontSize: { xs: '2.6rem', sm: '3.2rem' },
            lineHeight: 1,
            filter: `drop-shadow(0 6px 4px ${withAlpha(palette.black, 0.3)})`,
            animation:
              pickedIdx >= 0
                ? 'frogHop 0.65s ease both'
                : 'frogIdle 1.6s ease-in-out infinite',
          }}
        >
          🐸
        </Box>
        {success && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1.6rem',
              animation: 'splashUp 0.7s ease 0.55s both',
            }}
          >
            💦
          </Box>
        )}
      </Box>

    </Box>
  );
}

export default FrogRiver;
