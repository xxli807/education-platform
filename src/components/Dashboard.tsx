import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import {
  Calculate as MathIcon,
  MenuBook as EnglishIcon,
  Science as ScienceIcon,
  Psychology as ThinkingIcon,
  EmojiEvents as TrophyIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { User } from '../types';
import { db } from '../db/database';
import type { MathSessionResult, ScienceSessionResult, ThinkingSessionResult } from '../db/database';

interface DashboardProps {
  user: User;
  onLogout?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();
  const [lastMath, setLastMath] = useState<MathSessionResult | null>(null);
  const [lastScience, setLastScience] = useState<ScienceSessionResult | null>(null);
  const [lastThinking, setLastThinking] = useState<ThinkingSessionResult | null>(null);
  const [englishCount, setEnglishCount] = useState({ comprehension: 0, writing: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const mathResults = await db.mathSessionResults
          .where('userId')
          .equals('lucas')
          .reverse()
          .sortBy('completedAt');
        if (mathResults.length > 0) setLastMath(mathResults[0]);

        const scienceResults = await db.scienceSessionResults
          .where('userId')
          .equals('lucas')
          .reverse()
          .sortBy('completedAt');
        if (scienceResults.length > 0) setLastScience(scienceResults[0]);

        const thinkingResults = await db.thinkingSessionResults
          .where('userId')
          .equals('lucas')
          .reverse()
          .sortBy('completedAt');
        if (thinkingResults.length > 0) setLastThinking(thinkingResults[0]);

        const compCount = await db.comprehensionAnswers
          .where('userId')
          .equals('lucas')
          .count();
        const writingCount = await db.writingTasks
          .where('userId')
          .equals('lucas')
          .count();
        setEnglishCount({ comprehension: compCount, writing: writingCount });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      }
    };
    loadStats();
  }, []);

  const cardStyle = {
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  };

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
            radial-gradient(circle at 15% 20%, rgba(0, 200, 83, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(33, 150, 243, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 40%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating pixel-art style decorations */}
      <Box sx={{
        position: 'absolute', top: 30, left: '5%', fontSize: '3rem', opacity: 0.15,
        animation: 'float 6s ease-in-out infinite',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'⚔️'}
      </Box>
      <Box sx={{
        position: 'absolute', top: 80, right: '8%', fontSize: '2.5rem', opacity: 0.15,
        animation: 'float 5s ease-in-out infinite 1s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'🛡️'}
      </Box>
      <Box sx={{
        position: 'absolute', bottom: 60, left: '10%', fontSize: '2.5rem', opacity: 0.12,
        animation: 'float 7s ease-in-out infinite 2s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'💎'}
      </Box>
      <Box sx={{
        position: 'absolute', bottom: 100, right: '12%', fontSize: '2rem', opacity: 0.12,
        animation: 'float 5.5s ease-in-out infinite 0.5s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'⭐'}
      </Box>
      <Box sx={{
        position: 'absolute', top: '40%', left: '3%', fontSize: '2rem', opacity: 0.1,
        animation: 'float 6.5s ease-in-out infinite 3s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'🧱'}
      </Box>
      <Box sx={{
        position: 'absolute', top: '35%', right: '4%', fontSize: '2.5rem', opacity: 0.1,
        animation: 'float 8s ease-in-out infinite 1.5s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}>
        {'🏰'}
      </Box>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 1,
            background: 'linear-gradient(90deg, #ffd54f, #ff8a65, #ce93d8, #64b5f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            letterSpacing: '1px',
          }}
        >
          Hello, {user.username}! 👋
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#b0bec5',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Choose Your Quest, Hero! ⚡
        </Typography>
      </Box>

      {/* Subject Cards */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 1 }}
      >
        {/* Math Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #1a0000 0%, #4a1010 40%, #8b1a1a 100%)',
              border: '3px solid #ef5350',
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: '#ff8a80',
                boxShadow: '0 12px 36px rgba(239,83,80,0.3)',
              },
            }}
            onClick={() => navigate('/math')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <MathIcon sx={{ fontSize: 56, color: '#ff8a80', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#ffcdd2', fontWeight: 'bold', mb: 1, letterSpacing: '1px' }}
              >
                Math Fun
              </Typography>
              <Typography sx={{ color: '#ef9a9a', mb: 2, fontSize: '0.95rem' }}>
                Addition, subtraction, multiplication & division!
              </Typography>
              {lastMath ? (
                <Box>
                  <Chip
                    icon={lastMath.score === 100 ? <TrophyIcon sx={{ color: '#ffd54f !important' }} /> : undefined}
                    label={`Last: ${lastMath.correctCount}/${lastMath.totalQuestions} (${lastMath.score}%)`}
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: lastMath.score === 100 ? 'rgba(76,175,80,0.3)' : 'rgba(255,249,196,0.2)',
                      color: '#fff',
                      mb: 0.5,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                    <Chip
                      label={lastMath.difficulty}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: 'rgba(255,205,210,0.2)', color: '#ffcdd2' }}
                    />
                    <Chip
                      icon={<TimerIcon sx={{ fontSize: '0.9rem !important', color: '#ffcdd2 !important' }} />}
                      label={formatTime(lastMath.timeTakenSeconds)}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: 'rgba(255,205,210,0.2)', color: '#ffcdd2' }}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#ef9a9a', fontStyle: 'italic' }}>
                  No quests yet - begin your adventure! ⚔️
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* English Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #001030 0%, #0d3b66 40%, #1565c0 100%)',
              border: '3px solid #42a5f5',
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: '#82b1ff',
                boxShadow: '0 12px 36px rgba(66,165,245,0.3)',
              },
            }}
            onClick={() => navigate('/english')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <EnglishIcon sx={{ fontSize: 56, color: '#82b1ff', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#bbdefb', fontWeight: 'bold', mb: 1, letterSpacing: '1px' }}
              >
                English Adventure
              </Typography>
              <Typography sx={{ color: '#90caf9', mb: 2, fontSize: '0.95rem' }}>
                Reading, writing, and vocabulary!
              </Typography>
              {englishCount.comprehension > 0 || englishCount.writing > 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={`📖 ${englishCount.comprehension} answers`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: 'rgba(187,222,251,0.2)', color: '#bbdefb' }}
                  />
                  <Chip
                    label={`✍️ ${englishCount.writing} writings`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: 'rgba(187,222,251,0.2)', color: '#bbdefb' }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#90caf9', fontStyle: 'italic' }}>
                  No scrolls yet - start your quest! 📜
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Science Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #002000 0%, #1b5e20 40%, #388e3c 100%)',
              border: '3px solid #66bb6a',
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: '#a5d6a7',
                boxShadow: '0 12px 36px rgba(102,187,106,0.3)',
              },
            }}
            onClick={() => navigate('/science')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <ScienceIcon sx={{ fontSize: 56, color: '#a5d6a7', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#c8e6c9', fontWeight: 'bold', mb: 1, letterSpacing: '1px' }}
              >
                Science Quest
              </Typography>
              <Typography sx={{ color: '#a5d6a7', mb: 2, fontSize: '0.95rem' }}>
                Explore plants, animals, space & more!
              </Typography>
              {lastScience ? (
                <Chip
                  icon={lastScience.score === 100 ? <TrophyIcon sx={{ color: '#ffd54f !important' }} /> : undefined}
                  label={`Last: ${lastScience.correctCount}/${lastScience.totalQuestions} (${lastScience.score}%)`}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: lastScience.score === 100 ? 'rgba(76,175,80,0.3)' : 'rgba(255,249,196,0.2)',
                    color: '#fff',
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ color: '#a5d6a7', fontStyle: 'italic' }}>
                  No potions brewed yet - explore! 🧪
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Thinking Skills Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #1a0030 0%, #4a1070 40%, #7b1fa2 100%)',
              border: '3px solid #ce93d8',
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: '#e040fb',
                boxShadow: '0 12px 36px rgba(206,147,216,0.3)',
              },
            }}
            onClick={() => navigate('/thinking')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <ThinkingIcon sx={{ fontSize: 56, color: '#e1bee7', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#f3e5f5', fontWeight: 'bold', mb: 1, letterSpacing: '1px' }}
              >
                Thinking Skills
              </Typography>
              <Typography sx={{ color: '#ce93d8', mb: 2, fontSize: '0.95rem' }}>
                Sequences, patterns, analogies & logic!
              </Typography>
              {lastThinking ? (
                <Box>
                  <Chip
                    icon={lastThinking.score === 100 ? <TrophyIcon sx={{ color: '#ffd54f !important' }} /> : undefined}
                    label={`Last: ${lastThinking.correctCount}/${lastThinking.totalQuestions} (${lastThinking.score}%)`}
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: lastThinking.score === 100 ? 'rgba(76,175,80,0.3)' : 'rgba(243,229,245,0.15)',
                      color: '#fff',
                      mb: 0.5,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                    <Chip
                      icon={<TimerIcon sx={{ fontSize: '0.9rem !important', color: '#e1bee7 !important' }} />}
                      label={formatTime(lastThinking.timeTakenSeconds)}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: 'rgba(225,190,231,0.2)', color: '#e1bee7' }}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#ce93d8', fontStyle: 'italic' }}>
                  No challenges yet - start thinking! 🧠
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
