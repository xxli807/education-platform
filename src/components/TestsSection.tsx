import { palette, withAlpha } from '../theme/palette';
import { Fragment, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import { testBooks, type TestBlock, type TestDay } from '../data/testsContent';
import { legacyTestIds } from '../data/testsLegacyIds';
import { AnswersContext, C } from './testShared';
import { BlockView, Countdown } from './testViews';

// Answers are keyed by week/day/section/question number, so adding questions
// to a section never shifts saved answers onto the wrong question.
const STORAGE_KEY = 'testsAnswersV2';
// Older position-based answers (book.week.day.block.question[-suffix]).
const LEGACY_KEY = 'testsAnswers';

function loadAnswers(): Record<string, string> {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) return JSON.parse(current);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '{}');
    const moved: Record<string, string> = {};
    for (const [key, value] of Object.entries(legacy)) {
      const m = key.match(/^(\d+\.\d+\.\d+\.\d+\.\d+)(.*)$/);
      const stable = m && legacyTestIds[m[1]];
      if (stable) moved[stable + m[2]] = value as string;
    }
    return moved;
  } catch {
    return {};
  }
}

// When each timer was started (ms), keyed by week/day/section. Saved straight
// away so a timer keeps going if Lucas leaves the page.
const TIMERS_KEY = 'testsTimersV1';

function loadTimers(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(TIMERS_KEY) || '{}');
  } catch {
    return {};
  }
}

interface Section {
  key: string;
  label: string;
  minutes: number;
}

/**
 * The timed book page a block belongs to. Several blocks can share one page
 * (e.g. a maths day's Test Your Skills), so they share one timer. Times are
 * the ones printed on the book's stopwatch badges.
 */
function sectionOf(day: TestDay, block: TestBlock): Section {
  const h = block.heading;
  if (day.title.startsWith('Writing'))
    return { key: h, label: 'Writing', minutes: 40 };
  if (h.startsWith('Reading'))
    return { key: h, label: h.replace(/^Reading:\s*/, ''), minutes: 15 };
  const real = /Real Test|incorrect word/.test(h);
  const subject = h.startsWith('Spelling')
    ? 'Spelling'
    : h.startsWith('Grammar')
      ? 'Grammar'
      : '';
  const kind = real ? 'Real Test' : 'Test Your Skills';
  const label = subject ? `${subject} — ${kind}` : kind;
  return { key: label, label, minutes: subject && !real ? 15 : 20 };
}

function SectionTimer({
  section,
  startedAt,
  onStart,
  onReset,
}: {
  section: Section;
  startedAt?: number;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1.5,
        mb: 2,
        px: 2,
        py: 1.25,
        borderRadius: '14px',
        bgcolor: withAlpha(C.accent, 0.06),
        border: `1px dashed ${withAlpha(C.accent, 0.5)}`,
      }}
    >
      <Typography sx={{ color: C.heading, fontWeight: 800, flex: 1 }}>
        ⏱ {section.label} · {section.minutes} min
      </Typography>
      {startedAt ? (
        <>
          <Countdown deadline={startedAt + section.minutes * 60_000} />
          <Button
            onClick={onReset}
            size="small"
            sx={{ color: C.accent, fontWeight: 700, textTransform: 'none' }}
          >
            Reset
          </Button>
        </>
      ) : (
        <Button
          onClick={onStart}
          variant="contained"
          sx={{
            bgcolor: C.accent,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '12px',
            '&:hover': { bgcolor: C.heading },
          }}
        >
          Start timer
        </Button>
      )}
    </Box>
  );
}

function DayView({
  day,
  dayId,
  weekLabel,
  timers,
  setTimer,
}: {
  day: TestDay;
  dayId: string;
  weekLabel: string;
  timers: Record<string, number>;
  setTimer: (id: string, startedAt?: number) => void;
}) {
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
      {day.blocks.map((block, i) => {
        const section = sectionOf(day, block);
        const first =
          i === 0 || sectionOf(day, day.blocks[i - 1]).key !== section.key;
        const timerId = `${weekLabel}/${day.day}/${section.key}`;
        return (
          <Fragment key={i}>
            {first && (
              <SectionTimer
                section={section}
                startedAt={timers[timerId]}
                onStart={() => setTimer(timerId, Date.now())}
                onReset={() => setTimer(timerId)}
              />
            )}
            <BlockView
              block={block}
              blockId={`${dayId}.${i}`}
              questionId={(q, qi) =>
                `${weekLabel}/${day.day}/${block.heading}/${q.n ?? `#${qi}`}`
              }
            />
          </Fragment>
        );
      })}
    </Box>
  );
}

function TestsSection() {
  const navigate = useNavigate();
  const [book, setBook] = useState(0);
  const [tab, setTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(loadAnswers);
  const [savedFlash, setSavedFlash] = useState(false);
  const [timers, setTimers] = useState<Record<string, number>>(loadTimers);

  const weeks = testBooks[book].weeks;
  const week = weeks[tab];

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // storage full / private mode — answers stay in memory for this visit
    }
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);
  };

  const setTimer = (id: string, startedAt?: number) =>
    setTimers(prev => {
      const next = { ...prev };
      if (startedAt) next[id] = startedAt;
      else delete next[id];
      try {
        localStorage.setItem(TIMERS_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — the timer still runs for this visit
      }
      return next;
    });

  // The most recently started timer in this week, shown in the fixed header
  // so it stays in view while Lucas scrolls through the questions.
  const running = Object.entries(timers)
    .filter(([id]) => id.startsWith(`${week.label}/`))
    .sort((a, b) => b[1] - a[1])[0];
  const runningMinutes = running
    ? week.days
        .flatMap(d => d.blocks.map(b => ({ d, s: sectionOf(d, b) })))
        .find(({ d, s }) => running[0] === `${week.label}/${d.day}/${s.key}`)?.s
        .minutes
    : undefined;

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
            px: 1,
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
              noWrap
              sx={{ fontWeight: 900, color: C.heading, flex: 1, minWidth: 0 }}
            >
              📝 Tests
            </Typography>
            {running && runningMinutes && (
              <Countdown deadline={running[1] + runningMinutes * 60_000} />
            )}
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
              px: 1,
              py: 3,
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
                <DayView
                  key={i}
                  day={day}
                  dayId={`${book}.${tab}.${i}`}
                  weekLabel={week.label}
                  timers={timers}
                  setTimer={setTimer}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </AnswersContext.Provider>
  );
}

export default TestsSection;
