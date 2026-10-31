import { palette, withAlpha } from '../theme/palette';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import { ocPractices, type OcPaper, type OcSubject } from '../data/ocContent';
import { AnswersContext, C, LETTERS } from './testShared';
import { BlockView } from './testViews';

const STORAGE_KEY = 'ocAnswers';

const SUBJECT_EMOJI: Record<OcSubject, string> = {
  reading: '📖',
  maths: '🔢',
  thinking: '🧠',
};

/** Every question of a paper in order, with the id its answer is saved under. */
function paperQuestions(paper: OcPaper, paperId: string) {
  return paper.blocks.flatMap((block, b) =>
    block.questions.map((q, i) => ({
      n: q.n ?? '',
      qid: `${paperId}.${b}.${i}`,
    }))
  );
}

const panelSx = {
  mb: 3,
  p: { xs: 2, sm: 3 },
  borderRadius: '16px',
  bgcolor: C.panel,
  border: `1px solid ${C.border}`,
};

const panelHeadingSx = {
  color: C.heading,
  fontWeight: 800,
  fontSize: '1.05rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  mb: 1.5,
};

const buttonSx = {
  textTransform: 'none',
  fontWeight: 700,
  borderRadius: '12px',
};

/**
 * End of the paper. Answers stay hidden until the child taps "Finish test";
 * that locks their choices and reveals the score plus the answer key.
 */
function FinishPanel({
  paper,
  paperId,
  answers,
  finished,
  onFinish,
  onRestart,
}: {
  paper: OcPaper;
  paperId: string;
  answers: Record<string, string>;
  finished: boolean;
  onFinish: () => void;
  onRestart: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const questions = paperQuestions(paper, paperId);
  const picked = (qid: string) =>
    answers[qid] ? LETTERS[Number(answers[qid])] : '';
  const blank = questions.filter(q => !picked(q.qid)).length;
  const correct = questions.filter(
    (q, i) => picked(q.qid) === paper.answers[i]
  ).length;

  if (!finished) {
    return (
      <Box sx={panelSx}>
        <Typography sx={panelHeadingSx}>Finish test</Typography>
        <Typography sx={{ color: C.text, mb: 2 }}>
          {blank === 0
            ? 'All questions answered.'
            : `${blank} question${blank === 1 ? '' : 's'} not answered yet.`}{' '}
          {confirming
            ? 'Finish now? You won’t be able to change your answers.'
            : 'When you finish, your answers are locked and you’ll see your score.'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {confirming ? (
            <>
              <Button
                onClick={() => {
                  // don't carry this confirm over into the "Start again" one
                  setConfirming(false);
                  onFinish();
                }}
                variant="contained"
                sx={{
                  ...buttonSx,
                  bgcolor: C.accent,
                  '&:hover': { bgcolor: C.heading },
                }}
              >
                Yes, finish
              </Button>
              <Button
                onClick={() => setConfirming(false)}
                variant="outlined"
                sx={{ ...buttonSx, color: C.accent, borderColor: C.accent }}
              >
                Keep working
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setConfirming(true)}
              variant="contained"
              sx={{
                ...buttonSx,
                bgcolor: C.accent,
                '&:hover': { bgcolor: C.heading },
              }}
            >
              Finish test
            </Button>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={panelSx}>
      <Typography sx={panelHeadingSx}>Answers</Typography>
      <Typography
        sx={{ color: C.text, fontWeight: 800, fontSize: '1.2rem', mb: 2 }}
      >
        Score: {correct} / {questions.length}
        {blank > 0 && (
          <Box
            component="span"
            sx={{ fontWeight: 500, fontSize: '0.95rem', ml: 1 }}
          >
            ({blank} not answered)
          </Box>
        )}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
          gap: 1,
          mb: 2.5,
        }}
      >
        {questions.map((q, i) => {
          const key = paper.answers[i];
          const mine = picked(q.qid);
          const tone = !mine
            ? palette.slate400
            : mine === key
              ? palette.green425
              : palette.red425;
          return (
            <Box
              key={q.qid}
              sx={{
                px: 1,
                py: 0.75,
                borderRadius: '10px',
                textAlign: 'center',
                border: `1px solid ${tone}`,
                bgcolor: withAlpha(tone, 0.1),
              }}
            >
              <Typography sx={{ color: C.text, fontWeight: 700 }}>
                {q.n}. {key} {mine === key ? '✓' : ''}
              </Typography>
              {mine !== key && (
                <Typography sx={{ color: palette.red550, fontSize: '0.8rem' }}>
                  {mine ? `you: ${mine}` : 'blank'}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {confirming ? (
          <>
            <Typography sx={{ color: C.text }}>
              Clear all answers and start this test again?
            </Typography>
            <Button
              onClick={() => {
                setConfirming(false);
                onRestart();
              }}
              variant="contained"
              sx={{
                ...buttonSx,
                bgcolor: palette.red550,
                '&:hover': { bgcolor: palette.red650 },
              }}
            >
              Yes, start again
            </Button>
            <Button
              onClick={() => setConfirming(false)}
              variant="outlined"
              sx={{ ...buttonSx, color: C.accent, borderColor: C.accent }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setConfirming(true)}
            variant="outlined"
            sx={{ ...buttonSx, color: C.accent, borderColor: C.accent }}
          >
            Start again
          </Button>
        )}
      </Box>
    </Box>
  );
}

function OCSection() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [practice, setPractice] = useState(0);
  const [subject, setSubject] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });
  const [savedFlash, setSavedFlash] = useState(false);

  const papers = ocPractices[practice].papers;
  const paper = papers[subject];
  // Keyed by label, not tab position, so reordering practices keeps answers.
  const paperId = `${ocPractices[practice].label}.${paper.subject}`;

  // Auto-save every pick: losing a half-done 40-minute paper to a reload or
  // the back button is worse than a few extra writes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // storage full / private mode — answers stay in memory for this visit
    }
  }, [answers]);

  const handleSave = () => {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);
  };

  const pickSubject = (i: number) => {
    setSubject(i);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // Finishing a paper is stored alongside its answers so it survives reloads.
  const finishedKey = `${paperId}.finished`;
  const finished = answers[finishedKey] === '1';

  const handleFinish = () =>
    setAnswers(prev => ({ ...prev, [finishedKey]: '1' }));

  const handleRestart = () =>
    setAnswers(prev =>
      Object.fromEntries(
        Object.entries(prev).filter(([k]) => !k.startsWith(`${paperId}.`))
      )
    );

  const ctx = {
    get: (id: string) => answers[id] ?? '',
    set: (id: string, value: string) => {
      if (!finished) setAnswers(prev => ({ ...prev, [id]: value }));
    },
    locked: finished,
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
            px: { xs: 1, sm: 1.5, md: 6 },
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
              🎓 OC
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

          {/* Practice test tabs */}
          <Tabs
            value={practice}
            onChange={(_, v) => {
              setPractice(v);
              pickSubject(0);
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: C.text,
                fontWeight: 800,
                textTransform: 'none',
              },
              '& .Mui-selected': { color: `${C.heading} !important` },
              '& .MuiTabs-indicator': { backgroundColor: C.heading },
            }}
          >
            {ocPractices.map(p => (
              <Tab key={p.label} label={p.label} />
            ))}
          </Tabs>
        </Box>

        {/* Scrollable content — this is the only region that scrolls */}
        <Box
          ref={scrollRef}
          sx={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <Box
            sx={{
              px: { xs: 1, sm: 1.5, md: 6 },
              py: 3,
              maxWidth: 980,
              mx: 'auto',
            }}
          >
            {/* Reading / Maths / Thinking cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: { xs: 1, sm: 2 },
                mb: 3,
              }}
            >
              {papers.map((p, i) => {
                const selected = i === subject;
                const count = paperQuestions(p, '').length;
                return (
                  <Box
                    key={p.subject}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => pickSubject(i)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        pickSubject(i);
                      }
                    }}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      bgcolor: selected ? C.accent : C.panel,
                      border: `2px solid ${selected ? C.accent : C.border}`,
                      boxShadow: selected
                        ? `0 4px 14px ${withAlpha(C.accent, 0.3)}`
                        : `0 1px 3px ${withAlpha(palette.black, 0.06)}`,
                      transition: 'all 0.15s',
                      '&:hover': { borderColor: C.accent },
                      '&:focus-visible': {
                        outline: `3px solid ${withAlpha(C.accent, 0.5)}`,
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
                      {SUBJECT_EMOJI[p.subject]}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: selected ? palette.white : C.heading,
                        fontSize: { xs: '0.9rem', sm: '1.05rem' },
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: selected
                          ? withAlpha(palette.white, 0.85)
                          : palette.gray950,
                        fontSize: '0.8rem',
                      }}
                    >
                      {count} questions · {p.minutes} min
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {paper.blocks.map((block, i) => (
              <BlockView
                key={`${paperId}.${i}`}
                block={block}
                blockId={`${paperId}.${i}`}
                lettered
              />
            ))}

            <FinishPanel
              key={paperId}
              paper={paper}
              paperId={paperId}
              answers={answers}
              finished={finished}
              onFinish={handleFinish}
              onRestart={handleRestart}
            />
          </Box>
        </Box>
      </Box>
    </AnswersContext.Provider>
  );
}

export default OCSection;
