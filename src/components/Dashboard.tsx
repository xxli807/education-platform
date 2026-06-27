import { palette, withAlpha } from '../theme/palette';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Calculate as MathIcon,
  MenuBook as EnglishIcon,
  Science as ScienceIcon,
  Psychology as ThinkingIcon,
  EmojiEvents as TrophyIcon,
  Timer as TimerIcon,
  TaskAlt as HolidayIcon,
  SportsEsports as PlayIcon,
  MilitaryTech as OlympiadIcon,
  Assignment as TestsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useCurrentUser, useLogoutMutation } from '../hooks/useAuth';
import { db } from '../db/database';
import type {
  MathSessionResult,
  ScienceSessionResult,
  ThinkingSessionResult,
} from '../db/database';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function Dashboard() {
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const [lastMath, setLastMath] = useState<MathSessionResult | null>(null);
  const [lastScience, setLastScience] = useState<ScienceSessionResult | null>(
    null
  );
  const [lastThinking, setLastThinking] =
    useState<ThinkingSessionResult | null>(null);
  const [englishCount, setEnglishCount] = useState({
    comprehension: 0,
    writing: 0,
  });
  const playStars = Number(localStorage.getItem('playTotalStars') || '0');
  const olympiadSolved = Number(localStorage.getItem('olympiadSolved') || '0');

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
    boxShadow: `0 8px 24px ${withAlpha(palette.black, 0.25)}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: `0 12px 36px ${withAlpha(palette.black, 0.3)}`,
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
          linear-gradient(135deg, ${withAlpha(palette.navy725, 0.92)} 0%, ${withAlpha(palette.navy25, 0.88)} 50%, ${withAlpha(palette.purple875, 0.92)} 100%),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 48px,
            ${withAlpha(palette.blue300, 0.03)} 48px,
            ${withAlpha(palette.blue300, 0.03)} 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            ${withAlpha(palette.blue300, 0.03)} 48px,
            ${withAlpha(palette.blue300, 0.03)} 50px
          )
        `,
        backgroundColor: palette.navy950,
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
            radial-gradient(circle at 15% 20%, ${withAlpha(palette.green500, 0.12)} 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, ${withAlpha(palette.blue475, 0.12)} 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, ${withAlpha(palette.purple550, 0.1)} 0%, transparent 40%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating pixel-art style decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: 30,
          left: '5%',
          fontSize: '3rem',
          opacity: 0.15,
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'⚔️'}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: '8%',
          fontSize: '2.5rem',
          opacity: 0.15,
          animation: 'float 5s ease-in-out infinite 1s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'🛡️'}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 60,
          left: '10%',
          fontSize: '2.5rem',
          opacity: 0.12,
          animation: 'float 7s ease-in-out infinite 2s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'💎'}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          right: '12%',
          fontSize: '2rem',
          opacity: 0.12,
          animation: 'float 5.5s ease-in-out infinite 0.5s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'⭐'}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '3%',
          fontSize: '2rem',
          opacity: 0.1,
          animation: 'float 6.5s ease-in-out infinite 3s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'🧱'}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          right: '4%',
          fontSize: '2.5rem',
          opacity: 0.1,
          animation: 'float 8s ease-in-out infinite 1.5s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        {'🏰'}
      </Box>

      {/* Header with Logout Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 1,
              background: `linear-gradient(90deg, ${palette.amber450}, ${palette.orange400}, ${palette.purple225}, ${palette.blue350})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              letterSpacing: '1px',
            }}
          >
            Hello, {user?.username}! 👋
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: palette.slate200,
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            Choose Your Quest, Hero! ⚡
          </Typography>
        </Box>
        <IconButton
          onClick={handleLogout}
          sx={{
            bgcolor: withAlpha(palette.red425, 0.2),
            color: palette.red425,
            border: `2px solid ${palette.red425}`,
            borderRadius: '12px',
            p: 1.5,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: withAlpha(palette.red425, 0.3),
              transform: 'scale(1.05)',
            },
          }}
          title="Logout"
        >
          <LogoutIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* Subject Cards */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 1 }}
      >
        {/* Play & Learn Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${palette.magenta475} 0%, ${palette.orange700} 50%, ${palette.amber950} 100%)`,
              border: `3px solid ${palette.amber525}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.amber275,
                boxShadow: `0 12px 36px ${withAlpha(palette.orange700, 0.4)}`,
              },
            }}
            onClick={() => navigate({ to: '/play' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <PlayIcon sx={{ fontSize: 56, color: palette.amber275, mb: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  color: palette.amber100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Play &amp; Learn 🎪
              </Typography>
              <Typography
                sx={{ color: palette.orange75, mb: 2, fontSize: '0.95rem' }}
              >
                ABC &amp; counting games — learn while you play!
              </Typography>
              {playStars > 0 ? (
                <Chip
                  label={`⭐ ${playStars} stars earned!`}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: withAlpha(palette.white, 0.25),
                    color: palette.white,
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.orange75, fontStyle: 'italic' }}
                >
                  Tap to start playing! 🎈
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Math Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${palette.red950} 0%, ${palette.red850} 40%, ${palette.red750} 100%)`,
              border: `3px solid ${palette.red425}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.red225,
                boxShadow: `0 12px 36px ${withAlpha(palette.red425, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/math' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <MathIcon sx={{ fontSize: 56, color: palette.red225, mb: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  color: palette.red25,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Math Fun
              </Typography>
              <Typography
                sx={{ color: palette.red125, mb: 2, fontSize: '0.95rem' }}
              >
                Addition, subtraction, multiplication & division!
              </Typography>
              {lastMath ? (
                <Box>
                  <Chip
                    icon={
                      lastMath.score === 100 ? (
                        <TrophyIcon
                          sx={{ color: `${palette.amber450} !important` }}
                        />
                      ) : undefined
                    }
                    label={`Last: ${lastMath.correctCount}/${lastMath.totalQuestions} (${lastMath.score}%)`}
                    sx={{
                      fontWeight: 'bold',
                      bgcolor:
                        lastMath.score === 100
                          ? withAlpha(palette.green425, 0.3)
                          : withAlpha(palette.amber200, 0.2),
                      color: palette.white,
                      mb: 0.5,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      label={lastMath.difficulty}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        bgcolor: withAlpha(palette.red25, 0.2),
                        color: palette.red25,
                      }}
                    />
                    <Chip
                      icon={
                        <TimerIcon
                          sx={{
                            fontSize: '0.9rem !important',
                            color: `${palette.red25} !important`,
                          }}
                        />
                      }
                      label={formatTime(lastMath.timeTakenSeconds)}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        bgcolor: withAlpha(palette.red25, 0.2),
                        color: palette.red25,
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.red125, fontStyle: 'italic' }}
                >
                  No quests yet - begin your adventure! ⚔️
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Maths Olympiad Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${palette.brown725} 0%, ${palette.brown575} 40%, ${palette.gold950} 100%)`,
              border: `3px solid ${palette.amber450}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.amber275,
                boxShadow: `0 12px 36px ${withAlpha(palette.amber450, 0.35)}`,
              },
            }}
            onClick={() => navigate({ to: '/olympiad' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <OlympiadIcon
                sx={{ fontSize: 56, color: palette.amber450, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: palette.amber25,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Maths Olympiad 🏅
              </Typography>
              <Typography
                sx={{ color: palette.amber350, mb: 2, fontSize: '0.95rem' }}
              >
                Unleash the maths olympian in you!
              </Typography>
              {olympiadSolved > 0 ? (
                <Chip
                  icon={
                    <TrophyIcon
                      sx={{ color: `${palette.amber450} !important` }}
                    />
                  }
                  label={`${olympiadSolved} problems explored`}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: withAlpha(palette.amber450, 0.2),
                    color: palette.amber25,
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.amber350, fontStyle: 'italic' }}
                >
                  Pattern, grid & logic puzzles — Junior level 🧠
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
              background: `linear-gradient(135deg, ${palette.navy875} 0%, ${palette.navy100} 40%, ${palette.blue825} 100%)`,
              border: `3px solid ${palette.blue425}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.indigo25,
                boxShadow: `0 12px 36px ${withAlpha(palette.blue425, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/english' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <EnglishIcon
                sx={{ fontSize: 56, color: palette.indigo25, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: palette.blue100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                English Adventure
              </Typography>
              <Typography
                sx={{ color: palette.blue150, mb: 2, fontSize: '0.95rem' }}
              >
                Reading, writing, and vocabulary!
              </Typography>
              {englishCount.comprehension > 0 || englishCount.writing > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 0.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Chip
                    label={`📖 ${englishCount.comprehension} answers`}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: withAlpha(palette.blue100, 0.2),
                      color: palette.blue100,
                    }}
                  />
                  <Chip
                    label={`✍️ ${englishCount.writing} writings`}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: withAlpha(palette.blue100, 0.2),
                      color: palette.blue100,
                    }}
                  />
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.blue150, fontStyle: 'italic' }}
                >
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
              background: `linear-gradient(135deg, ${palette.green950} 0%, ${palette.green850} 40%, ${palette.green575} 100%)`,
              border: `3px solid ${palette.green350}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.green125,
                boxShadow: `0 12px 36px ${withAlpha(palette.green350, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/science' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <ScienceIcon
                sx={{ fontSize: 56, color: palette.green125, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: palette.green100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Science Quest
              </Typography>
              <Typography
                sx={{ color: palette.green125, mb: 2, fontSize: '0.95rem' }}
              >
                Explore plants, animals, space & more!
              </Typography>
              {lastScience ? (
                <Chip
                  icon={
                    lastScience.score === 100 ? (
                      <TrophyIcon
                        sx={{ color: `${palette.amber450} !important` }}
                      />
                    ) : undefined
                  }
                  label={`Last: ${lastScience.correctCount}/${lastScience.totalQuestions} (${lastScience.score}%)`}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor:
                      lastScience.score === 100
                        ? withAlpha(palette.green425, 0.3)
                        : withAlpha(palette.amber200, 0.2),
                    color: palette.white,
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.green125, fontStyle: 'italic' }}
                >
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
              background: `linear-gradient(135deg, ${palette.purple950} 0%, ${palette.purple825} 40%, ${palette.purple625} 100%)`,
              border: `3px solid ${palette.purple225}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.magenta175,
                boxShadow: `0 12px 36px ${withAlpha(palette.purple225, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/thinking' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <ThinkingIcon
                sx={{ fontSize: 56, color: palette.purple150, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: palette.purple100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Thinking Skills
              </Typography>
              <Typography
                sx={{ color: palette.purple225, mb: 2, fontSize: '0.95rem' }}
              >
                Sequences, patterns, analogies & logic!
              </Typography>
              {lastThinking ? (
                <Box>
                  <Chip
                    icon={
                      lastThinking.score === 100 ? (
                        <TrophyIcon
                          sx={{ color: `${palette.amber450} !important` }}
                        />
                      ) : undefined
                    }
                    label={`Last: ${lastThinking.correctCount}/${lastThinking.totalQuestions} (${lastThinking.score}%)`}
                    sx={{
                      fontWeight: 'bold',
                      bgcolor:
                        lastThinking.score === 100
                          ? withAlpha(palette.green425, 0.3)
                          : withAlpha(palette.purple100, 0.15),
                      color: palette.white,
                      mb: 0.5,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      icon={
                        <TimerIcon
                          sx={{
                            fontSize: '0.9rem !important',
                            color: `${palette.purple150} !important`,
                          }}
                        />
                      }
                      label={formatTime(lastThinking.timeTakenSeconds)}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        bgcolor: withAlpha(palette.purple150, 0.2),
                        color: palette.purple150,
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: palette.purple225, fontStyle: 'italic' }}
                >
                  No challenges yet - start thinking! 🧠
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Holiday Plans Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${palette.teal950} 0%, ${palette.green875} 40%, ${palette.teal875} 100%)`,
              border: `3px solid ${palette.teal450}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.teal175,
                boxShadow: `0 12px 36px ${withAlpha(palette.teal450, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/holiday-todo' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <HolidayIcon
                sx={{ fontSize: 56, color: palette.teal175, mb: 1 }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: palette.teal100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Holiday Plans
              </Typography>
              <Typography
                sx={{ color: palette.teal175, mb: 2, fontSize: '0.95rem' }}
              >
                Plan your holiday activities! 🏖️
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: palette.teal175, fontStyle: 'italic' }}
              >
                Create and manage your holiday todo lists
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tests Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${palette.navy575} 0%, ${palette.blue875} 40%, ${palette.indigo475} 100%)`,
              border: `3px solid ${palette.blue425}`,
              '&:hover': {
                ...cardStyle['&:hover'],
                borderColor: palette.blue225,
                boxShadow: `0 12px 36px ${withAlpha(palette.blue425, 0.3)}`,
              },
            }}
            onClick={() => navigate({ to: '/tests' })}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <TestsIcon sx={{ fontSize: 56, color: palette.blue225, mb: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  color: palette.blue100,
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Tests 📝
              </Typography>
              <Typography
                sx={{ color: palette.blue225, mb: 2, fontSize: '0.95rem' }}
              >
                NAPLAN-style practice tests, week by week!
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: palette.blue225, fontStyle: 'italic' }}
              >
                Tap to start a test ✏️
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
