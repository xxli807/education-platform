import { palette, withAlpha } from '../theme/palette';
import { Fragment, type ReactNode } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import type { TestQuestion, TestBlock } from '../data/testsContent';
import { C, LETTERS, useAnswers } from './testShared';

// Shared renderers for worksheet-style test pages (Tests card, OC card).

const HEADER_OFFSET = 172; // height of the sticky top panel (used for sticky passage)

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
  const { get, set, locked } = useAnswers();
  const value = get(id);
  return (
    <TextField
      disabled={locked}
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
  lettered,
  after,
}: {
  q: TestQuestion;
  qid: string;
  blockNumeric?: boolean;
  /** Prefix options with A, B, C… so they can be matched to an answer key. */
  lettered?: boolean;
  /** Extra content under the question, e.g. the review after a test. */
  after?: ReactNode;
}) {
  const { get, set, locked } = useAnswers();
  const inlineBlanks = q.type === 'short' && BLANK_RE.test(q.prompt);
  // question-level flag wins over the block default
  const numeric =
    q.type === 'short' ? (q.numeric ?? blockNumeric ?? false) : false;
  const image = q.type === 'mcq' ? q.image : undefined;
  const row = q.type === 'mcq' && (q.row || !!image);
  // A bare number + one row of options fits on a single line.
  const oneLine = row && !image && !q.prompt;

  return (
    <>
      <Box
        sx={{
          mb: 2,
          ...(oneLine && {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }),
        }}
      >
        {image ? (
          // The picture already shows the question number, text and options.
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={`Question ${q.n ?? ''}`}
            loading="lazy"
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: 640,
              height: 'auto',
              mb: 1,
            }}
          />
        ) : inlineBlanks ? (
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
            component={oneLine ? 'span' : 'p'}
            sx={{
              color: C.text,
              fontSize: '1rem',
              mb: oneLine ? 0 : 1,
              fontWeight: 500,
            }}
          >
            {q.n ? <NumberBadge n={q.n} /> : null}
            {q.prompt}
          </Typography>
        )}

        {q.type === 'mcq' && (
          <RadioGroup
            row={row}
            sx={{ pl: oneLine ? 0 : 2, columnGap: row ? 1 : 0 }}
            value={get(qid)}
            onChange={(_, v) => set(qid, v)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={String(i)}
                disabled={locked}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: palette.slate400,
                      // keep the child's pick visible after answers are locked
                      '&.Mui-checked, &.Mui-checked.Mui-disabled': {
                        color: C.accent,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: C.text, fontSize: '0.95rem' }}>
                    {lettered && opt !== LETTERS[i] && (
                      <Box
                        component="span"
                        sx={{ fontWeight: 700, color: C.accent, mr: 1 }}
                      >
                        {LETTERS[i]}
                      </Box>
                    )}
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
                    disabled={locked}
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
            disabled={locked}
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
              disabled={locked}
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
      {after}
    </>
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

export function BlockView({
  block,
  blockId,
  lettered,
  renderAfter,
}: {
  block: TestBlock;
  blockId: string;
  lettered?: boolean;
  /** Extra content under each question (given the question and its answer id). */
  renderAfter?: (q: TestQuestion, qid: string) => ReactNode;
}) {
  return (
    <Box
      sx={{
        mb: 3,
        // keep side space small at every size so reading text gets the width
        p: 1.5,
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
              p: 1.5,
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
              <QuestionView
                key={i}
                q={q}
                qid={`${blockId}.${i}`}
                blockNumeric={block.numeric}
                lettered={lettered}
                after={renderAfter?.(q, `${blockId}.${i}`)}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <>
          {block.image && (
            // e.g. a reading passage kept as a picture of the original page
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}${block.image}`}
              alt={block.heading}
              loading="lazy"
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 640,
                height: 'auto',
                mb: 2,
                pb: 2,
                borderBottom: `1px solid ${C.border}`,
              }}
            />
          )}

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
            <QuestionView
              key={i}
              q={q}
              qid={`${blockId}.${i}`}
              blockNumeric={block.numeric}
              lettered={lettered}
              after={renderAfter?.(q, `${blockId}.${i}`)}
            />
          ))}
        </>
      )}
    </Box>
  );
}
