import { palette, withAlpha } from '../theme/palette';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import { testBooks, type TestDay } from '../data/testsContent';
import { AnswersContext, C } from './testShared';
import { BlockView } from './testViews';

const STORAGE_KEY = 'testsAnswers';

function DayView({ day, dayId }: { day: TestDay; dayId: string }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          color: C.text,
          fontWeight: 900,
          mb: 2,
          pb: 1,
          borderBottom: `2px solid ${C.accent}`,
        }}
      >
        {day.day}: {day.title}
      </Typography>
      {day.blocks.map((block, i) => (
        <BlockView key={i} block={block} blockId={`${dayId}.${i}`} />
      ))}
    </Box>
  );
}

function TestsSection() {
  const navigate = useNavigate();
  const [book, setBook] = useState(0);
  const [tab, setTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });
  const [savedFlash, setSavedFlash] = useState(false);

  const weeks = testBooks[book].weeks;
  const week = weeks[tab];

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);
  };

  const ctx = {
    get: (id: string) => answers[id] ?? '',
    set: (id: string, value: string) =>
      setAnswers(prev => ({ ...prev, [id]: value })),
  };

  return (
    <AnswersContext.Provider value={ctx}>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: C.pageBg,
        }}
      >
        {/* Fixed top panel — stays in place while the content below scrolls */}
        <Box
          sx={{
            flexShrink: 0,
            zIndex: 10,
            bgcolor: palette.white,
            borderBottom: `1px solid ${C.border}`,
            boxShadow: `0 2px 8px ${withAlpha(palette.black, 0.08)}`,
            px: { xs: 2, sm: 4, md: 6 },
            pt: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <IconButton
              onClick={() => navigate({ to: '/' })}
              sx={{
                bgcolor: C.pageBg,
                color: C.text,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                '&:hover': { bgcolor: palette.gray400 },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: C.heading, flex: 1 }}
            >
              📝 Tests
            </Typography>
            {savedFlash && (
              <Typography
                sx={{
                  color: palette.green500,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                Saved ✓
              </Typography>
            )}
            <Button
              onClick={handleSave}
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{
                bgcolor: C.accent,
                color: palette.white,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '12px',
                '&:hover': { bgcolor: C.heading },
              }}
            >
              Save
            </Button>
          </Box>

          {/* Book tabs (e.g. Year 2 Book 1) */}
          <Tabs
            value={book}
            onChange={(_, v) => {
              setBook(v);
              setTab(0);
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 40,
              borderBottom: `1px solid ${C.border}`,
              '& .MuiTab-root': {
                color: C.text,
                fontWeight: 800,
                textTransform: 'none',
                minHeight: 40,
              },
              '& .Mui-selected': { color: `${C.heading} !important` },
              '& .MuiTabs-indicator': { backgroundColor: C.heading },
            }}
          >
            {testBooks.map(b => (
              <Tab key={b.label} label={b.label} />
            ))}
          </Tabs>

          {/* Week tabs for the selected book */}
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: C.text,
                fontWeight: 700,
                textTransform: 'none',
              },
              '& .Mui-selected': { color: `${C.accent} !important` },
              '& .MuiTabs-indicator': { backgroundColor: C.accent },
            }}
          >
            {weeks.map(w => (
              <Tab key={w.label} label={w.label} />
            ))}
          </Tabs>
        </Box>

        {/* Scrollable content — this is the only region that scrolls */}
        <Box
          sx={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <Box
            sx={{
              px: { xs: 2, sm: 4, md: 6 },
              py: 3,
              maxWidth: 980,
              mx: 'auto',
            }}
          >
            {week.overview.length > 0 && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: '14px',
                  bgcolor: withAlpha(C.accent, 0.06),
                  border: `1px solid ${withAlpha(C.accent, 0.3)}`,
                }}
              >
                <Typography sx={{ color: C.heading, fontWeight: 800, mb: 1 }}>
                  What we cover this week
                </Typography>
                {week.overview.map((line, i) => (
                  <Typography
                    key={i}
                    sx={{ color: C.text, fontSize: '0.95rem', mb: 0.3 }}
                  >
                    • {line}
                  </Typography>
                ))}
              </Box>
            )}

            {week.days.length === 0 ? (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: palette.gray950,
                  fontStyle: 'italic',
                  mt: 6,
                }}
              >
                Content for {week.label} is coming soon. ✏️
              </Typography>
            ) : (
              week.days.map((day, i) => (
                <DayView key={i} day={day} dayId={`${book}.${tab}.${i}`} />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </AnswersContext.Provider>
  );
}

export default TestsSection;
