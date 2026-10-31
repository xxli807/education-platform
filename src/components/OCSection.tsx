import { palette, withAlpha } from '../theme/palette';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import type { TestQuestion } from '../data/testsContent';
import type { OcCollection, OcPaper } from '../data/ocTypes';
import {
  formatDuration,
  loadHistory,
  saveHistory,
  type OcAttempt,
} from '../utils/ocHistory';
import { AnswersContext, C, LETTERS } from './testShared';
import { BlockView } from './testViews';
import OCProgress from './OCProgress';

/** Every question of a paper in order, with the id its answer is saved under. */
function paperQuestions(paper: OcPaper, paperId: string) {
  return paper.blocks.flatMap((block, b) =>
    block.questions.map((q, i) => ({
      n: q.n ?? '',
      qid: `${paperId}.${b}.${i}`,
    }))
  );
}

function scoreOf(
  paper: OcPaper,
  paperId: string,
  answers: Record<string, string>
) {
  const questions = paperQuestions(paper, paperId);
  const picked = (qid: string) =>
    answers[qid] ? LETTERS[Number(answers[qid])] : '';
  return {
    questions,
    picked,
    blank: questions.filter(q => !picked(q.qid)).length,
    correct: questions.filter((q, i) => picked(q.qid) === paper.answers[i])
      .length,
  };
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

const primaryButtonSx = {
  ...buttonSx,
  bgcolor: C.accent,
  '&:hover': { bgcolor: C.heading },
};

const outlineButtonSx = { ...buttonSx, color: C.accent, borderColor: C.accent };

/** Shown before the timer starts, so the questions can't be previewed. */
function StartPanel({
  paper,
  onStart,
}: {
  paper: OcPaper;
  onStart: () => void;
}) {
  const count = paperQuestions(paper, '').length;
  return (
    <Box sx={{ ...panelSx, textAlign: 'center' }}>
      <Typography sx={{ fontSize: '2.5rem' }}>{paper.emoji}</Typography>
      <Typography
        sx={{ color: C.heading, fontWeight: 900, fontSize: '1.4rem', mb: 1 }}
      >
        {paper.title}
      </Typography>
      <Typography sx={{ color: C.text, fontSize: '1.1rem', mb: 1 }}>
        ⏱ {paper.minutes} minutes · {count} questions
      </Typography>
      <Typography sx={{ color: palette.gray950, mb: 2.5 }}>
        The timer starts when you tap Start and keeps going even if you leave
        this page. When time runs out the test finishes by itself.
      </Typography>
      <Button
        onClick={onStart}
        variant="contained"
        size="large"
        sx={{ ...primaryButtonSx, px: 4, fontSize: '1.1rem' }}
      >
        Start test
      </Button>
    </Box>
  );
}

/** Review under each question once the paper is finished. */
function QuestionReview({
  q,
  mine,
  correct,
}: {
  q: TestQuestion;
  mine: string;
  correct: string;
}) {
  const [open, setOpen] = useState(false);
  const explanation = q.type === 'mcq' ? q.explanation : undefined;
  const explanationImage = q.type === 'mcq' ? q.explanationImage : undefined;
  const tone = !mine
    ? palette.slate400
    : mine === correct
      ? palette.green425
      : palette.red425;
  return (
    <Box
      sx={{
        mt: -1,
        mb: 2.5,
        px: 1.5,
        py: 1,
        borderRadius: '10px',
        borderLeft: `4px solid ${tone}`,
        bgcolor: withAlpha(tone, 0.08),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ color: C.text, fontWeight: 700, flex: 1 }}>
          {!mine
            ? `— Not answered · answer ${correct}`
            : mine === correct
              ? `✓ Correct (${correct})`
              : `✗ You chose ${mine} · answer ${correct}`}
        </Typography>
        {(explanation || explanationImage) && (
          <Button
            size="small"
            onClick={() => setOpen(o => !o)}
            sx={{ ...buttonSx, color: C.accent }}
          >
            {open ? 'Hide explanation' : 'Show explanation'}
          </Button>
        )}
      </Box>
      {open && explanation && (
        <Typography
          sx={{ color: C.text, mt: 1, whiteSpace: 'pre-line', lineHeight: 1.7 }}
        >
          {explanation}
        </Typography>
      )}
      {open && explanationImage && (
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}${explanationImage}`}
          alt={`Explanation for question ${q.n ?? ''}`}
          sx={{
            display: 'block',
            width: '100%',
            maxWidth: 640,
            height: 'auto',
            mt: 1,
            bgcolor: palette.white,
            borderRadius: '8px',
          }}
        />
      )}
    </Box>
  );
}

/**
 * End of the paper. Answers stay hidden until the child taps "Finish test"
 * (or time runs out); that locks their choices and reveals the score.
 */
function FinishPanel({
  paper,
  paperId,
  answers,
  finished,
  usedSec,
  onFinish,
  onRestart,
}: {
  paper: OcPaper;
  paperId: string;
  answers: Record<string, string>;
  finished: boolean;
  usedSec?: number;
  onFinish: () => void;
  onRestart: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const { questions, picked, blank, correct } = scoreOf(
    paper,
    paperId,
    answers
  );

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
                sx={primaryButtonSx}
              >
                Yes, finish
              </Button>
              <Button
                onClick={() => setConfirming(false)}
                variant="outlined"
                sx={outlineButtonSx}
              >
                Keep working
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setConfirming(true)}
              variant="contained"
              sx={primaryButtonSx}
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
        sx={{ color: C.text, fontWeight: 800, fontSize: '1.2rem', mb: 0.5 }}
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
      {usedSec !== undefined && (
        <Typography sx={{ color: palette.gray950, mb: 2 }}>
          Time used: {formatDuration(usedSec)} of {paper.minutes}:00
          {usedSec >= paper.minutes * 60 ? ' — time ran out ⏰' : ''}
        </Typography>
      )}
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
              Clear all answers and start this test again? Your score stays in
              Progress.
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
              sx={outlineButtonSx}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setConfirming(true)}
            variant="outlined"
            sx={outlineButtonSx}
          >
            Start again
          </Button>
        )}
      </Box>
    </Box>
  );
}

/**
 * Timed, exam-style page for a set of OC-style papers: tabs for each practice
 * set plus Progress, a card per paper, a countdown that auto-finishes, and a
 * review with explanations once a paper is done.
 */
function OCSection({ collection }: { collection: OcCollection }) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { practices, storageKey } = collection;
  const [tab, setTab] = useState(0);
  const [paperIdx, setPaperIdx] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });
  const [history, setHistory] = useState<OcAttempt[]>(() =>
    loadHistory(storageKey)
  );
  const [savedFlash, setSavedFlash] = useState(false);
  // StrictMode runs effects twice in dev — never record one finish twice.
  const finishing = useRef(new Set<string>());

  const showProgress = tab === practices.length;
  const practice = practices[Math.min(tab, practices.length - 1)];
  const paper = practice.papers[paperIdx];
  // Keyed by label + paper id, not tab position, so reordering keeps answers.
  const paperKey = (label: string, p: OcPaper) => `${label}.${p.id}`;
  const paperId = paperKey(practice.label, paper);

  // Auto-save every pick: losing a half-done paper to a reload or the back
  // button is worse than a few extra writes.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {
      // storage full / private mode — answers stay in memory for this visit
    }
  }, [answers, storageKey]);

  useEffect(() => saveHistory(storageKey, history), [history, storageKey]);

  // Timer state lives with the answers so it survives reloads.
  const startedAt = Number(answers[`${paperId}.startedAt`] || 0);
  const finished = answers[`${paperId}.finished`] === '1';
  const usedRaw = answers[`${paperId}.usedSec`];
  const usedSec = usedRaw === undefined ? undefined : Number(usedRaw);
  const running = startedAt > 0 && !finished;
  const limitSec = paper.minutes * 60;
  const remainingSec = running
    ? limitSec - Math.max(0, Math.floor((now - startedAt) / 1000))
    : limitSec;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const finishPaper = (secondsUsed: number, timedOut: boolean) => {
    if (finishing.current.has(paperId)) return;
    finishing.current.add(paperId);
    const used = Math.min(limitSec, Math.max(0, secondsUsed));
    const { correct, questions } = scoreOf(paper, paperId, answers);
    setAnswers(prev => ({
      ...prev,
      [`${paperId}.finished`]: '1',
      [`${paperId}.usedSec`]: String(used),
    }));
    setHistory(prev => [
      ...prev,
      {
        practice: practice.label,
        paperId: paper.id,
        paperTitle: paper.title,
        score: correct,
        total: questions.length,
        usedSec: used,
        minutes: paper.minutes,
        finishedAt: timedOut ? startedAt + limitSec * 1000 : Date.now(),
        timedOut,
      },
    ]);
  };

  // Time's up → finish automatically, like the real test.
  useEffect(() => {
    if (running && remainingSec <= 0) finishPaper(limitSec, true);
  });

  const handleStart = () => {
    finishing.current.delete(paperId);
    const t = Date.now();
    setNow(t);
    setAnswers(prev => ({ ...prev, [`${paperId}.startedAt`]: String(t) }));
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const handleRestart = () => {
    finishing.current.delete(paperId);
    setAnswers(prev =>
      Object.fromEntries(
        Object.entries(prev).filter(([k]) => !k.startsWith(`${paperId}.`))
      )
    );
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const handleSave = () => {
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);
  };

  const pickPaper = (i: number) => {
    setPaperIdx(i);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const ctx = {
    get: (id: string) => answers[id] ?? '',
    set: (id: string, value: string) => {
      if (running) setAnswers(prev => ({ ...prev, [id]: value }));
    },
    locked: !running,
  };

  const { picked } = scoreOf(paper, paperId, answers);
  const qIndex = new Map(
    paperQuestions(paper, paperId).map((q, i) => [q.qid, i])
  );
  const review = (q: TestQuestion, qid: string) => {
    const i = qIndex.get(qid);
    if (!finished || i === undefined) return null;
    return (
      <QuestionReview q={q} mine={picked(qid)} correct={paper.answers[i]} />
    );
  };

  const timerTone =
    remainingSec <= 60
      ? palette.red550
      : remainingSec <= 300
        ? palette.amber950
        : C.accent;

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
              aria-label="Back"
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
              {collection.title}
            </Typography>
            {!showProgress && running && (
              <Box
                role="timer"
                aria-label={`${formatDuration(remainingSec)} left`}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '12px',
                  border: `2px solid ${timerTone}`,
                  bgcolor: withAlpha(timerTone, 0.1),
                  color: timerTone,
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                ⏱ {formatDuration(remainingSec)}
              </Box>
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

          {/* Practice set tabs + Progress */}
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              pickPaper(0);
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
            {practices.map(p => (
              <Tab key={p.label} label={p.label} />
            ))}
            <Tab label="📈 Progress" />
          </Tabs>
        </Box>

        {/* Scrollable content — this is the only region that scrolls */}
        <Box
          ref={scrollRef}
          sx={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <Box sx={{ px: 1, py: 3 }}>
            <Typography
              sx={{ color: palette.gray950, fontSize: '0.85rem', mb: 2 }}
            >
              {collection.source}
            </Typography>

            {showProgress ? (
              <OCProgress collection={collection} history={history} />
            ) : (
              <>
                {/* One card per paper in this practice set */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${practice.papers.length}, 1fr)`,
                    gap: { xs: 1, sm: 2 },
                    mb: 3,
                  }}
                >
                  {practice.papers.map((p, i) => {
                    const selected = i === paperIdx;
                    const id = paperKey(practice.label, p);
                    const count = paperQuestions(p, '').length;
                    const done = answers[`${id}.finished`] === '1';
                    const started = Number(answers[`${id}.startedAt`] || 0) > 0;
                    const status = done
                      ? `Score ${scoreOf(p, id, answers).correct}/${count}`
                      : started
                        ? 'In progress ⏱'
                        : `${count} questions · ${p.minutes} min`;
                    return (
                      <Box
                        key={p.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                        onClick={() => pickPaper(i)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            pickPaper(i);
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
                        <Typography
                          sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}
                        >
                          {p.emoji}
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
                          {status}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {!startedAt && !finished ? (
                  <StartPanel
                    key={paperId}
                    paper={paper}
                    onStart={handleStart}
                  />
                ) : (
                  <>
                    {paper.blocks.map((block, i) => (
                      <BlockView
                        key={`${paperId}.${i}`}
                        block={block}
                        blockId={`${paperId}.${i}`}
                        lettered
                        renderAfter={review}
                      />
                    ))}

                    <FinishPanel
                      key={paperId}
                      paper={paper}
                      paperId={paperId}
                      answers={answers}
                      finished={finished}
                      usedSec={usedSec}
                      onFinish={() =>
                        finishPaper(
                          Math.round((Date.now() - startedAt) / 1000),
                          false
                        )
                      }
                      onRestart={handleRestart}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </AnswersContext.Provider>
  );
}

export default OCSection;
