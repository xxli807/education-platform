import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import {
  Calculate as MathIcon,
  MenuBook as EnglishIcon,
  Science as ScienceIcon,
  EmojiEvents as TrophyIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { User } from '../types';
import { db } from '../db/database';
import type { MathSessionResult, ScienceSessionResult } from '../db/database';

interface DashboardProps {
  user: User;
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
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    },
    minHeight: '220px',
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #bbdefb 50%, #f3e5f5 100%)',
        py: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            color: '#7b1fa2',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          Hello, {user.username}! 👋
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: '#555', fontWeight: 500 }}
        >
          Let's Learn Something Amazing Today! 🚀
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Math Card */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
              border: '3px solid #ef9a9a',
            }}
            onClick={() => navigate('/math')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <MathIcon sx={{ fontSize: 48, color: '#e91e63', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#c62828', fontWeight: 'bold', mb: 1 }}
              >
                Math Fun
              </Typography>
              <Typography sx={{ color: '#555', mb: 2 }}>
                Addition, subtraction, multiplication & division!
              </Typography>
              {lastMath ? (
                <Box>
                  <Chip
                    icon={lastMath.score === 100 ? <TrophyIcon /> : undefined}
                    label={`Last: ${lastMath.correctCount}/${lastMath.totalQuestions} (${lastMath.score}%)`}
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: lastMath.score === 100 ? '#a5d6a7' : '#fff9c4',
                      mb: 0.5,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
                    <Chip
                      label={lastMath.difficulty}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: '#ffcdd2' }}
                    />
                    <Chip
                      icon={<TimerIcon sx={{ fontSize: '0.9rem !important' }} />}
                      label={formatTime(lastMath.timeTakenSeconds)}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: '#ffcdd2' }}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                  No sessions yet - let's start! ⭐
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* English Card */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              border: '3px solid #90caf9',
            }}
            onClick={() => navigate('/english')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <EnglishIcon sx={{ fontSize: 48, color: '#1565c0', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#0d47a1', fontWeight: 'bold', mb: 1 }}
              >
                English Adventure
              </Typography>
              <Typography sx={{ color: '#555', mb: 2 }}>
                Reading, writing, and vocabulary!
              </Typography>
              {englishCount.comprehension > 0 || englishCount.writing > 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={`📖 ${englishCount.comprehension} answers`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: '#bbdefb' }}
                  />
                  <Chip
                    label={`✍️ ${englishCount.writing} writings`}
                    size="small"
                    sx={{ fontWeight: 'bold', bgcolor: '#bbdefb' }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                  No submissions yet - let's read! 📚
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Science Card */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
              border: '3px solid #a5d6a7',
            }}
            onClick={() => navigate('/science')}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <ScienceIcon sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 1 }}
              >
                Science Quest
              </Typography>
              <Typography sx={{ color: '#555', mb: 2 }}>
                Explore plants, animals, space & more!
              </Typography>
              {lastScience ? (
                <Chip
                  icon={lastScience.score === 100 ? <TrophyIcon /> : undefined}
                  label={`Last: ${lastScience.correctCount}/${lastScience.totalQuestions} (${lastScience.score}%)`}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: lastScience.score === 100 ? '#a5d6a7' : '#fff9c4',
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                  No sessions yet - let's explore! 🔬
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
