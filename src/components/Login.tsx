import { palette, withAlpha } from '../theme/palette';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLoginMutation } from '../hooks/useAuth';

// ─── Minecraft block palette ──────────────────────────────────────────────────
const BLOCK_COLORS: Record<string, string> = {
  grass: palette.green475,
  grassTop: palette.green275,
  dirt: palette.brown175,
  dirtDark: palette.brown400,
  stone: palette.gray775,
  stoneDk: palette.gray950,
  sand: palette.gold25,
  sandDk: palette.gold325,
  water: palette.blue750,
  waterLt: palette.blue550,
  wood: palette.brown325,
  woodDk: palette.brown475,
  leaves: palette.green700,
  leavesDk: palette.green800,
  diamond: palette.cyan200,
  gold: palette.amber700,
  sky: palette.cyan575,
  skyLt: palette.blue225,
  cloud: palette.gray200,
  lava: palette.orange900,
  lavaDk: palette.orange950,
};

type BlockType =
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'sand'
  | 'water'
  | 'wood'
  | 'leaves'
  | 'diamond'
  | 'gold'
  | 'sky'
  | 'cloud'
  | 'lava'
  | 'air';

interface Block {
  type: BlockType;
  x: number;
  y: number;
  size: number;
  brightness: number; // 0-1 face shading
}

const BLOCK_SIZE = 48;

function getBlockColors(type: BlockType): [string, string] | null {
  switch (type) {
    case 'grass':
      return [BLOCK_COLORS.grassTop, BLOCK_COLORS.grass];
    case 'dirt':
      return [BLOCK_COLORS.dirt, BLOCK_COLORS.dirtDark];
    case 'stone':
      return [BLOCK_COLORS.stone, BLOCK_COLORS.stoneDk];
    case 'sand':
      return [BLOCK_COLORS.sand, BLOCK_COLORS.sandDk];
    case 'water':
      return [BLOCK_COLORS.water, BLOCK_COLORS.waterLt];
    case 'wood':
      return [BLOCK_COLORS.wood, BLOCK_COLORS.woodDk];
    case 'leaves':
      return [BLOCK_COLORS.leaves, BLOCK_COLORS.leavesDk];
    case 'diamond':
      return [BLOCK_COLORS.diamond, palette.cyan775];
    case 'gold':
      return [BLOCK_COLORS.gold, palette.gold650];
    case 'sky':
      return [BLOCK_COLORS.sky, BLOCK_COLORS.skyLt];
    case 'cloud':
      return [BLOCK_COLORS.cloud, palette.gray575];
    case 'lava':
      return [BLOCK_COLORS.lava, BLOCK_COLORS.lavaDk];
    default:
      return null;
  }
}

// Generates a Minecraft-like terrain column
function generateTerrain(cols: number, rows: number): Block[][] {
  const grid: Block[][] = [];
  const r = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  for (let col = 0; col < cols; col++) {
    const column: Block[] = [];
    const surfaceRow = r(Math.floor(rows * 0.35), Math.floor(rows * 0.55));
    const hasTree = Math.random() < 0.18;
    const treeRow = surfaceRow - 1;
    const treeHeight = r(2, 4);
    const hasWater = !hasTree && Math.random() < 0.1;

    for (let row = 0; row < rows; row++) {
      let type: BlockType = 'air';

      if (row < surfaceRow - 1) {
        type = 'sky';
      } else if (row === surfaceRow - 1) {
        if (hasTree && treeRow === row) type = 'wood';
        else type = 'sky';
      } else if (row === surfaceRow) {
        type = hasWater ? 'water' : 'grass';
      } else if (row <= surfaceRow + 2) {
        type = 'dirt';
      } else if (row <= surfaceRow + 5) {
        type = Math.random() < 0.15 ? 'diamond' : 'stone';
      } else {
        type = Math.random() < 0.06 ? 'lava' : 'stone';
      }

      // Tree trunk
      if (hasTree && row >= surfaceRow - treeHeight && row <= surfaceRow - 1) {
        type = 'wood';
      }

      // Tree leaves crown
      if (
        hasTree &&
        row >= surfaceRow - treeHeight - 2 &&
        row < surfaceRow - treeHeight + 1
      ) {
        type = 'leaves';
      }

      column.push({
        type,
        x: col * BLOCK_SIZE,
        y: row * BLOCK_SIZE,
        size: BLOCK_SIZE,
        brightness: 0.85 + Math.random() * 0.15,
      });
    }
    grid.push(column);
  }
  return grid;
}

function drawBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  offsetX: number
) {
  if (block.type === 'air' || block.type === 'sky') return;
  const colors = getBlockColors(block.type);
  if (!colors) return;

  const [face, shade] = colors;
  const s = block.size;
  const x = block.x - offsetX;
  const y = block.y;

  // Main face
  ctx.fillStyle = face;
  ctx.fillRect(x, y, s, s);

  // Pixel-art-style texture overlay
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = palette.black;
  for (let py = 0; py < s; py += s / 4) {
    for (let px = 0; px < s; px += s / 4) {
      if (Math.random() > 0.7) {
        ctx.fillRect(x + px, y + py, s / 4, s / 4);
      }
    }
  }
  ctx.globalAlpha = 1;

  // Top-left highlight
  ctx.fillStyle = withAlpha(palette.white, 0.2);
  ctx.fillRect(x, y, s, 3);
  ctx.fillRect(x, y, 3, s);

  // Bottom-right shadow
  ctx.fillStyle = withAlpha(palette.black, 0.2);
  ctx.fillRect(x, y + s - 3, s, 3);
  ctx.fillRect(x + s - 3, y, 3, s);

  // Shade tint for depth
  ctx.fillStyle = shade + '44';
  ctx.fillRect(x + s * 0.5, y + s * 0.5, s * 0.5, s * 0.5);

  // 1px black grid border
  ctx.strokeStyle = withAlpha(palette.black, 0.4);
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
}

// ─── Canvas Minecraft background (static) ────────────────────────────────────
function MinecraftCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cols = Math.ceil(canvas.width / BLOCK_SIZE) + 1;
      const rows = Math.ceil(canvas.height / BLOCK_SIZE) + 1;
      const grid = generateTerrain(cols, rows);

      // Sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.65);
      grad.addColorStop(0, palette.navy650);
      grad.addColorStop(0.3, palette.navy400);
      grad.addColorStop(0.6, palette.navy250);
      grad.addColorStop(1, palette.blue950);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Static stars
      for (let i = 0; i < 120; i++) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.5;
        const sr = Math.random() * 1.5 + 0.3;
        ctx.globalAlpha = 0.4 + Math.random() * 0.6;
        ctx.fillStyle = palette.white;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Terrain blocks
      grid.forEach(column => {
        column.forEach(block => {
          if (block.type !== 'sky') drawBlock(ctx, block, 0);
        });
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        imageRendering: 'pixelated',
      }}
    />
  );
}

// ─── Login component ──────────────────────────────────────────────────────────
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');
  const loginMutation = useLoginMutation();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = () => {
    setError('');
    if (!username.trim() || !password.trim()) {
      triggerShake();
      return;
    }
    loginMutation.mutate(
      { username: username.trim(), password },
      {
        onError: err => {
          setError(err instanceof Error ? err.message : 'Login failed.');
          setPassword('');
          triggerShake();
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @keyframes blockShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px ${withAlpha(palette.cyan200, 0.53)}, 0 0 40px ${withAlpha(palette.cyan200, 0.27)}; }
          50%       { box-shadow: 0 0 35px ${withAlpha(palette.cyan200, 0.8)}, 0 0 70px ${withAlpha(palette.cyan200, 0.4)}; }
        }
        @keyframes titleBob {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes creeper {
          0%   { opacity: 0; transform: scale(0.5); }
          10%  { opacity: 1; transform: scale(1.1); }
          90%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
      `}</style>

      {/* Minecraft world canvas */}
      <MinecraftCanvas />

      {/* Login card */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          px: 2,
        }}
      >
        <Box
          onKeyDown={handleKeyDown}
          sx={{
            width: '100%',
            maxWidth: 420,
            animation: shake
              ? 'blockShake 0.5s ease'
              : 'glowPulse 3s ease-in-out infinite',
            // Minecraft-style outer border: double frame
            border: `4px solid ${palette.cyan200}`,
            borderRadius: '4px',
            outline: `4px solid ${palette.navy325}`,
            outlineOffset: '2px',
            bgcolor: withAlpha(palette.navy950, 0.92),
            backdropFilter: 'blur(8px)',
            overflow: 'hidden',
          }}
        >
          {/* Header bar — Minecraft inventory title style */}
          <Box
            sx={{
              background: `linear-gradient(180deg, ${palette.indigo475} 0%, ${palette.indigo950} 100%)`,
              borderBottom: `3px solid ${palette.cyan200}`,
              px: 3,
              py: 2,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Pixelated diamond icon */}
            <Box
              sx={{
                fontSize: '3rem',
                mb: 0.5,
                animation: 'titleBob 2.5s ease-in-out infinite',
                display: 'inline-block',
              }}
            >
              💎
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Press Start 2P", "Courier New", monospace',
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                fontWeight: 900,
                background: `linear-gradient(90deg, ${palette.cyan200}, ${palette.green275}, ${palette.amber700}, ${palette.cyan200})`,
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                letterSpacing: '0.05em',
                lineHeight: 1.4,
                mt: 0.5,
              }}
            >
              KIDS LEARNING
              <br />
              PORTAL
            </Typography>
            <Typography
              sx={{
                color: palette.green275,
                fontSize: '0.75rem',
                mt: 1,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
              }}
            >
              ▶ ENTER YOUR PROFILE
            </Typography>
          </Box>

          {/* Form body */}
          <Box sx={{ px: 3, py: 3 }}>
            {/* Username field */}
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: palette.green200,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  mb: 0.5,
                  letterSpacing: '0.1em',
                }}
              >
                👤 USERNAME
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your name..."
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '2px',
                    bgcolor: withAlpha(palette.black, 0.5),
                    color: palette.green25,
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    '& fieldset': {
                      borderColor: palette.green725,
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': { borderColor: palette.green275 },
                    '&.Mui-focused fieldset': {
                      borderColor: palette.cyan200,
                      borderWidth: '2px',
                    },
                  },
                  '& input::placeholder': {
                    color: palette.green725,
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Password field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: palette.green200,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  mb: 0.5,
                  letterSpacing: '0.1em',
                }}
              >
                🔑 PASSWORD
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Secret password..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '2px',
                    bgcolor: withAlpha(palette.black, 0.5),
                    color: palette.green25,
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    '& fieldset': {
                      borderColor: palette.green725,
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': { borderColor: palette.green275 },
                    '&.Mui-focused fieldset': {
                      borderColor: palette.cyan200,
                      borderWidth: '2px',
                    },
                  },
                  '& input::placeholder': {
                    color: palette.green725,
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Login button — Minecraft green button style */}
            {error && (
              <Typography
                role="alert"
                sx={{
                  color: palette.orange900,
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  textAlign: 'center',
                  mb: 1.5,
                  letterSpacing: '0.05em',
                }}
              >
                ⚠ {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loginMutation.isPending}
              sx={{
                borderRadius: '2px',
                py: 1.5,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                letterSpacing: '0.05em',
                fontWeight: 900,
                textTransform: 'none',
                background: `linear-gradient(180deg, ${palette.green400} 0%, ${palette.green625} 50%, ${palette.green775} 100%)`,
                border: `2px solid ${palette.green925}`,
                borderTop: `2px solid ${palette.green275}`,
                borderLeft: `2px solid ${palette.green275}`,
                color: palette.white,
                boxShadow: `3px 3px 0 ${palette.green925}, inset 0 1px 0 ${withAlpha(palette.white, 0.2)}`,
                '&:hover': {
                  background: `linear-gradient(180deg, ${palette.green325} 0%, ${palette.green550} 50%, ${palette.green625} 100%)`,
                  transform: 'translate(-1px, -1px)',
                  boxShadow: `4px 4px 0 ${palette.green925}, inset 0 1px 0 ${withAlpha(palette.white, 0.2)}`,
                },
                '&:active': {
                  transform: 'translate(2px, 2px)',
                  boxShadow: `1px 1px 0 ${palette.green925}`,
                },
                transition: 'all 0.1s',
              }}
            >
              {loginMutation.isPending ? '⏳ CHECKING...' : '▶ START ADVENTURE!'}
            </Button>

            {/* Minecraft-style hint */}
            <Typography
              sx={{
                color: palette.green725,
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                textAlign: 'center',
                mt: 2,
                letterSpacing: '0.05em',
              }}
            >
              🎓 Year 2 Learning Adventure
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
