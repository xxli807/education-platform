import { palette, withAlpha } from '../theme/palette';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

/** The slice of a Play-Zone round the giraffe scene needs. */
export interface GiraffeRound {
  display: string;
  prompt: string;
  options: string[];
  answer: string;
}

/** Leaf spots inside the tree crown (percent / px within the scene). */
const LEAF_POS = [
  { left: '48%', top: 52 },
  { left: '67%', top: 26 },
  { left: '86%', top: 56 },
  { left: '70%', top: 110 },
];

/** Where a munched leaf flies to — the giraffe's mouth (head of the emoji). */
const MOUTH = { left: '24%', top: 200 };

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

/**
 * Animated giraffe-under-a-tree scene for the Year 1 first-letter game.
 * Each leaf carries a letter; tapping the right one sends the leaf flying
 * into the giraffe's mouth (munch! sparkles), a wrong leaf just shakes while
 * the right one glows. Round flow stays with the parent — this is the fun.
 */
function GiraffeTree({
  round,
  picked,
  roundNum,
  muted,
  onPick,
}: {
  round: GiraffeRound;
  picked: string | null;
  roundNum: number;
  muted: boolean;
  onPick: (opt: string) => void;
}) {
  const reveal = picked !== null;
  const pickedIdx = picked === null ? -1 : round.options.indexOf(picked);
  const answerIdx = round.options.indexOf(round.answer);
  const success = reveal && pickedIdx === answerIdx;
  const [emoji, word] = round.display.split('\n');

  // say the task out loud at the start of each round
  useEffect(() => {
    if (muted) return;
    speak(`${word}! Feed the giraffe the letter ${round.answer}!`);
    // re-run per round only — word/answer change with roundNum
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
        background: `linear-gradient(180deg, ${palette.cyan25} 0%, ${palette.blue25} 55%, ${palette.green25} 100%)`,
      }}
    >
      <style>{`
        @keyframes giraffeSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes munchBounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.18) rotate(-5deg); }
          60% { transform: scale(0.95) rotate(4deg); }
          100% { transform: scale(1); }
        }
        @keyframes shakeNo {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-9deg); }
          75% { transform: rotate(9deg); }
        }
        @keyframes leafShake {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-7px) rotate(-6deg); }
          75% { transform: translateX(7px) rotate(6deg); }
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes sparkleUp {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          100% { transform: translateY(-40px) scale(1.4); opacity: 0; }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(36px); }
        }
      `}</style>

      {/* clouds + sun */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 10,
          left: '6%',
          fontSize: '2rem',
          opacity: 0.9,
          animation: 'cloudDrift 8s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }}
      >
        ☁️
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 8,
          left: '30%',
          fontSize: '1.7rem',
          pointerEvents: 'none',
        }}
      >
        🌤️
      </Box>

      {/* grass */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: `linear-gradient(180deg, ${palette.green350}, ${palette.green550})`,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '38%',
          fontSize: '1.3rem',
        }}
      >
        🌼
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 44,
          left: '4%',
          fontSize: '1.3rem',
        }}
      >
        🌷
      </Box>

      {/* tree: trunk + crown */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: '65%',
          bottom: 44,
          width: 30,
          height: 170,
          borderRadius: '10px',
          background: `linear-gradient(90deg, ${palette.brown175}, ${palette.brown400})`,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 6,
          left: '40%',
          right: -30,
          height: 180,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at 45% 35%, ${palette.green400}, ${palette.green650})`,
          boxShadow: `inset 0 -14px 24px ${withAlpha(palette.black, 0.2)}`,
        }}
      />

      {/* task sign */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 14,
          maxWidth: '34%',
          px: 2,
          py: 1,
          borderRadius: '18px',
          bgcolor: withAlpha(palette.white, 0.94),
          border: `4px solid ${palette.amber625}`,
          boxShadow: `0 6px 14px ${withAlpha(palette.black, 0.18)}`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <Typography
          key={roundNum}
          sx={{ fontSize: { xs: '2.2rem', sm: '2.8rem' }, lineHeight: 1.1 }}
        >
          {emoji}
        </Typography>
        <Typography
          sx={{
            fontWeight: 900,
            color: palette.slate950,
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            lineHeight: 1.1,
          }}
        >
          {word}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            color: palette.purple675,
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
          }}
        >
          {round.prompt}
        </Typography>
      </Box>

      {/* leaves (the answer options) */}
      {round.options.map((opt, i) => {
        const isAnswer = i === answerIdx;
        const isPicked = i === pickedIdx;
        const eaten = success && isPicked;
        const wrongPick = reveal && isPicked && !isAnswer;
        return (
          <Box
            key={`${roundNum}-${opt}`}
            role="button"
            tabIndex={reveal ? -1 : 0}
            aria-label={`Feed the giraffe the leaf ${opt}`}
            onClick={() => onPick(opt)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPick(opt);
              }
            }}
            sx={{
              position: 'absolute',
              left: eaten ? MOUTH.left : LEAF_POS[i].left,
              top: eaten ? MOUTH.top : LEAF_POS[i].top,
              transform: 'translateX(-50%)',
              width: { xs: 64, sm: 76 },
              height: { xs: 52, sm: 60 },
              // leaf shape: rounded with a pointy stem corner
              borderRadius: '50% 12px 50% 50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: reveal ? 'default' : 'pointer',
              userSelect: 'none',
              fontWeight: 900,
              fontSize: { xs: '1.5rem', sm: '1.8rem' },
              color: palette.green950,
              background: `linear-gradient(150deg, ${palette.green125}, ${palette.green325})`,
              border: `3px solid ${reveal && isAnswer ? palette.amber450 : palette.green650}`,
              boxShadow:
                reveal && isAnswer
                  ? `0 0 20px ${withAlpha(palette.amber450, 0.9)}, 0 4px 0 ${withAlpha(palette.black, 0.2)}`
                  : `0 4px 0 ${withAlpha(palette.black, 0.2)}`,
              transition:
                'left 0.6s ease-in, top 0.6s ease-in, opacity 0.25s ease 0.55s, box-shadow 0.2s',
              opacity: eaten ? 0 : 1,
              animation: wrongPick
                ? 'leafShake 0.4s ease 2'
                : reveal && isAnswer && !eaten
                  ? 'glowPulse 0.8s ease infinite'
                  : 'none',
              zIndex: 1,
              '&:hover': reveal
                ? {}
                : { transform: 'translateX(-50%) translateY(-4px)' },
              '&:focus-visible': {
                outline: `4px solid ${palette.purple675}`,
                outlineOffset: 3,
              },
            }}
          >
            {opt}
          </Box>
        );
      })}

      {/* the giraffe */}
      <Box
        key={roundNum}
        aria-hidden
        sx={{
          position: 'absolute',
          left: '10%',
          bottom: 34,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <Box
          key={pickedIdx}
          sx={{
            fontSize: { xs: '6.5rem', sm: '8rem' },
            lineHeight: 1,
            filter: `drop-shadow(0 8px 6px ${withAlpha(palette.black, 0.25)})`,
            transformOrigin: '50% 90%',
            animation: success
              ? 'munchBounce 0.7s ease 0.55s both'
              : reveal
                ? 'shakeNo 0.45s ease 2'
                : 'giraffeSway 3s ease-in-out infinite',
          }}
        >
          🦒
        </Box>
        {success && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: -6,
                left: '58%',
                fontSize: '1.5rem',
                animation: 'sparkleUp 0.8s ease 0.7s both',
              }}
            >
              😋
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 6,
                left: '20%',
                fontSize: '1.3rem',
                animation: 'sparkleUp 0.9s ease 0.85s both',
              }}
            >
              ✨
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default GiraffeTree;
