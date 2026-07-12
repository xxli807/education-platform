import { palette, withAlpha } from '../theme/palette';
import { createContext, Fragment, useContext, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  testBooks,
  type TestQuestion,
  type TestBlock,
  type TestDay,
} from '../data/testsContent';

const STORAGE_KEY = 'testsAnswers';
const HEADER_OFFSET = 172; // height of the sticky top panel (used for sticky passage)

// Approximate light-theme colours (all from the central palette).
const C = {
  pageBg: palette.gray25,
  panel: palette.white,
  border: palette.gray400,
  text: palette.slate950,
  heading: palette.blue875,
  accent: palette.blue825,
  subBg: palette.gray25,
  noteBg: palette.amber25,
  noteBorder: palette.amber625,
};

/** Shared answer store so every input can read/write its saved value. */
const AnswersContext = createContext<{
  get: (id: string) => string;
  set: (id: string, value: string) => void;
}>({ get: () => '', set: () => {} });
const useAnswers = () => useContext(AnswersContext);

const inputFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: palette.white,
    color: C.text,
    '& fieldset': { borderColor: palette.slate200 },
    '&:hover fieldset': { borderColor: palette.slate400 },
    '&.Mui-focused fieldset': { borderColor: C.accent },
  },
};

const BLANK_RE = /_{2,}/;

/** iPads/phones show the digit keypad for inputs marked this way. */
const numericInputProps = { inputMode: 'numeric' as const, pattern: '[0-9]*' };

function NumberBadge({ n }: { n: string }) {
  return (
    <Box component="span" sx={{ color: C.accent, fontWeight: 700, mr: 1 }}>
      {n}.
    </Box>
  );
}

/** A single small inline input used in place of a `__` blank. */
function BlankInput({ id, numeric }: { id: string; numeric?: boolean }) {
  const { get, set } = useAnswers();
  const value = get(id);
  return (
    <TextField
      variant="outlined"
      size="small"
      value={value}
      onChange={e => set(id, e.target.value)}
      slotProps={numeric ? { htmlInput: numericInputProps } : undefined}
      sx={{
        mx: 0.5,
        ...inputFieldSx,
        '& .MuiOutlinedInput-input': {
          textAlign: 'center',
          py: 0.5,
          // Grow with the answer so long words like "thousands" fit.
          width: `${Math.min(Math.max(value.length + 2, 8), 32)}ch`,
        },
      }}
    />
  );
}

/** Renders a prompt that contains `__` blanks as text with one input per blank. */
function InlineBlanks({
  prompt,
  qid,
  numeric,
}: {
  prompt: string;
  qid: string;
  numeric?: boolean;
}) {
  const parts = prompt.split(/_{2,}/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part && (
            <Typography
              component="span"
              sx={{ color: C.text, fontSize: '1rem' }}
            >
              {part}
            </Typography>
          )}
          {i < parts.length - 1 && (
            <BlankInput id={`${qid}-b${i}`} numeric={numeric} />
          )}
        </Fragment>
      ))}
    </>
  );
}

function QuestionView({
  q,
  qid,
  blockNumeric,
}: {
  q: TestQuestion;
  qid: string;
  blockNumeric?: boolean;
}) {
  const { get, set } = useAnswers();
  const inlineBlanks = q.type === 'short' && BLANK_RE.test(q.prompt);
  // question-level flag wins over the block default
  const numeric =
    q.type === 'short' ? (q.numeric ?? blockNumeric ?? false) : false;

  return (
    <Box sx={{ mb: 2 }}>
      {inlineBlanks ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mb: 1,
          }}
        >
          {q.n ? <NumberBadge n={q.n} /> : null}
          <InlineBlanks prompt={q.prompt} qid={qid} numeric={numeric} />
        </Box>
      ) : (
        <Typography
          sx={{ color: C.text, fontSize: '1rem', mb: 1, fontWeight: 500 }}
        >
          {q.n ? <NumberBadge n={q.n} /> : null}
          {q.prompt}
        </Typography>
      )}

      {q.type === 'mcq' && (
        <RadioGroup
          sx={{ pl: 2 }}
          value={get(qid)}
          onChange={(_, v) => set(qid, v)}
        >
          {q.options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={String(i)}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: palette.slate400,
                    '&.Mui-checked': { color: C.accent },
                  }}
                />
              }
              label={
                <Typography sx={{ color: C.text, fontSize: '0.95rem' }}>
                  {opt}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      )}

      {q.type === 'short' && !inlineBlanks && (
        <Box>
          {q.example && (
            <Typography
              sx={{
                color: palette.gray950,
                fontStyle: 'italic',
                fontSize: '0.95rem',
                mb: 0.75,
              }}
            >
              e.g. {q.example}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Array.from({ length: q.inputs ?? 1 }).map((_, i) => {
              const id = (q.inputs ?? 1) > 1 ? `${qid}-${i}` : qid;
              return (
                <TextField
                  key={i}
                  variant="outlined"
                  size="small"
                  placeholder="Your answer"
                  value={get(id)}
                  onChange={e => set(id, e.target.value)}
                  slotProps={
                    numeric ? { htmlInput: numericInputProps } : undefined
                  }
                  sx={{
                    width: (q.inputs ?? 1) > 1 ? 200 : 320,
                    ...inputFieldSx,
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}

      {q.type === 'long' && (
        <TextField
          variant="outlined"
          multiline
          minRows={8}
          fullWidth
          placeholder="Write your answer here…"
          value={get(qid)}
          onChange={e => set(qid, e.target.value)}
          sx={{
            ...inputFieldSx,
            '& .MuiOutlinedInput-root': {
              ...inputFieldSx['& .MuiOutlinedInput-root'],
              fontSize: '1rem',
              lineHeight: 1.8,
              alignItems: 'flex-start',
            },
            // Let the child drag the box taller; also auto-grows as they type.
            '& textarea': { resize: 'vertical', overflow: 'auto' },
          }}
        />
      )}

      {q.type === 'dictation' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
            mt: 0.5,
          }}
        >
          <Button
            onClick={() =>
              speak(
                `${q.word}. ${q.prompt.replace(/_{2,}/, q.word)}. ${q.word}.`
              )
            }
            startIcon={<VolumeUpIcon />}
            variant="outlined"
            size="small"
            sx={{
              color: C.accent,
              borderColor: withAlpha(C.accent, 0.6),
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': {
                borderColor: C.accent,
                bgcolor: withAlpha(C.accent, 0.08),
              },
            }}
          >
            Listen
          </Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Write the word"
            value={get(qid)}
            onChange={e => set(qid, e.target.value)}
            sx={{ width: 220, ...inputFieldSx }}
          />
        </Box>
      )}
    </Box>
  );
}

/** Speak text aloud using the browser's built-in text-to-speech. */
function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function BlockView({ block, blockId }: { block: TestBlock; blockId: string }) {
  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: '16px',
        bgcolor: C.panel,
        border: `1px solid ${C.border}`,
        boxShadow: `0 1px 3px ${withAlpha(palette.black, 0.06)}`,
      }}
    >
      <Typography
        sx={{
          color: C.heading,
          fontWeight: 800,
          fontSize: '1.05rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          mb: block.instructions || block.passage || block.note ? 1 : 2,
        }}
      >
        {block.heading}
      </Typography>

      {block.instructions && (
        <Typography
          sx={{
            color: palette.gray950,
            fontStyle: 'italic',
            fontSize: '1rem',
            mb: 2,
            whiteSpace: 'pre-line',
          }}
        >
          {block.instructions}
        </Typography>
      )}

      {block.note && (
        <Box
          sx={{
            p: 2,
            mb: 2,
            borderRadius: '12px',
            bgcolor: C.noteBg,
            border: `1px solid ${C.noteBorder}`,
          }}
        >
          <Typography
            sx={{
              color: C.text,
              fontSize: '1rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
            }}
          >
            {block.note}
          </Typography>
        </Box>
      )}

      {block.passage ? (
        // Reading layout: content on the left (sticky), questions on the right
        // so the child can re-read the passage while answering.
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 3 },
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: '100%',
              flex: { md: '0 0 45%' },
              maxWidth: { md: '45%' },
              p: 2,
              borderRadius: '12px',
              bgcolor: C.subBg,
              border: `1px solid ${C.border}`,
              position: { md: 'sticky' },
              top: { md: 8 },
              maxHeight: { md: `calc(100dvh - ${HEADER_OFFSET + 24}px)` },
              overflowY: { md: 'auto' },
            }}
          >
            <Typography
              sx={{
                color: C.text,
                fontSize: '1.05rem',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {block.passage}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, width: '100%', minWidth: 0 }}>
            {block.questions.map((q, i) => (
              <QuestionView key={i} q={q} qid={`${blockId}.${i}`} blockNumeric={block.numeric} />
            ))}
          </Box>
        </Box>
      ) : (
        <>
          {block.diagram && (
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: '12px',
                bgcolor: C.subBg,
                border: `1px solid ${C.border}`,
                overflowX: 'auto',
              }}
            >
              <Typography
                component="pre"
                sx={{
                  color: C.heading,
                  fontFamily: 'monospace',
                  fontSize: '1.05rem',
                  lineHeight: 1.5,
                  m: 0,
                  whiteSpace: 'pre',
                }}
              >
                {block.diagram}
              </Typography>
            </Box>
          )}

          {block.questions.map((q, i) => (
            <QuestionView key={i} q={q} qid={`${blockId}.${i}`} blockNumeric={block.numeric} />
          ))}
        </>
      )}
    </Box>
  );
}

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
        <Box sx={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
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
