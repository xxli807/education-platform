import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supportedSubject } from '../models';

export interface SectionProps {
  name: supportedSubject;
  children: ReactNode;
}

const subjectConfig: Record<supportedSubject, { emoji: string; glow: string }> = {
  Math: { emoji: '⚔️', glow: 'rgba(239,83,80,0.15)' },
  English: { emoji: '📜', glow: 'rgba(66,165,245,0.15)' },
  Science: { emoji: '🧪', glow: 'rgba(102,187,106,0.15)' },
  Thinking: { emoji: '🧠', glow: 'rgba(206,147,216,0.15)' },
};

function SectionContainer({ name, children }: SectionProps) {
  const navigate = useNavigate();
  const handleBackToDashboard = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const config = subjectConfig[name];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
        background: `
          linear-gradient(135deg, rgba(16, 20, 45, 0.92) 0%, rgba(25, 55, 95, 0.88) 50%, rgba(40, 20, 60, 0.92) 100%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 48px,
            rgba(100, 200, 255, 0.03) 48px,
            rgba(100, 200, 255, 0.03) 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(100, 200, 255, 0.03) 48px,
            rgba(100, 200, 255, 0.03) 50px
          )
        `,
        backgroundColor: '#0a0e1a',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 20%, ${config.glow} 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, ${config.glow} 0%, transparent 40%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating decorations */}
      {['⭐', '💎', '🧱', '🏰'].map((emoji, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${15 + i * 22}%`,
            [i % 2 === 0 ? 'left' : 'right']: `${3 + i * 2}%`,
            fontSize: '2rem',
            opacity: 0.1,
            animation: `float ${5 + i}s ease-in-out infinite ${i * 0.8}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
            pointerEvents: 'none',
          }}
        >
          {emoji}
        </Box>
      ))}

      {/* Back Button */}
      <Box sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={handleBackToDashboard}
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            color: '#b0bec5',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
              color: '#fff',
            },
          }}
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          mb: 3,
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(90deg, #ffd54f, #ff8a65, #ce93d8, #64b5f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
        }}
      >
        {config.emoji} Hello Lucas, {name} Quest {config.emoji}
      </Typography>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export default SectionContainer;
