import { palette, withAlpha } from '../theme/palette';
import { Box, Typography } from '@mui/material';
import type { OcCollection } from '../data/ocTypes';
import { formatDuration, type OcAttempt } from '../utils/ocHistory';
import { C } from './testShared';

const dateFmt = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
});

/**
 * Every finished attempt, grouped by paper. One measure (score %) per attempt,
 * so each row is a labelled bar in a single accent colour — the numbers are
 * always printed, colour never carries meaning on its own.
 */
function OCProgress({
  collection,
  history,
}: {
  collection: OcCollection;
  history: OcAttempt[];
}) {
  if (history.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          borderRadius: '16px',
          bgcolor: C.panel,
          border: `1px solid ${C.border}`,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: '2.5rem' }}>📈</Typography>
        <Typography sx={{ color: C.heading, fontWeight: 800, mb: 0.5 }}>
          No finished tests yet
        </Typography>
        <Typography sx={{ color: palette.gray950 }}>
          Finish a test and your score and time will show up here.
        </Typography>
      </Box>
    );
  }

  // attempts for papers that were renamed or removed since
  const known = new Set(
    collection.practices.flatMap(pr =>
      pr.papers.map(p => `${pr.label}.${p.id}`)
    )
  );
  const orphans = history.filter(a => !known.has(`${a.practice}.${a.paperId}`));

  return (
    <>
      {collection.practices.flatMap(practice =>
        practice.papers.map(paper => {
          const attempts = history
            .filter(
              a => a.practice === practice.label && a.paperId === paper.id
            )
            .sort((a, b) => a.finishedAt - b.finishedAt);
          if (attempts.length === 0) return null;
          const best = Math.max(...attempts.map(a => a.score / a.total));
          return (
            <Box
              key={`${practice.label}.${paper.id}`}
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: '16px',
                bgcolor: C.panel,
                border: `1px solid ${C.border}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  flexWrap: 'wrap',
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: C.heading, fontWeight: 800 }}>
                  {paper.emoji} {practice.label} · {paper.title}
                </Typography>
                <Typography sx={{ color: palette.gray950, fontSize: '0.9rem' }}>
                  {attempts.length} attempt{attempts.length === 1 ? '' : 's'} ·
                  best {Math.round(best * 100)}%
                </Typography>
              </Box>
              {attempts.map((a, i) => {
                const pct = Math.round((a.score / a.total) * 100);
                return (
                  <Box
                    key={`${a.startedAt ?? 0}.${a.finishedAt}.${i}`}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: '150px 1fr 190px',
                      },
                      alignItems: 'center',
                      columnGap: 1.5,
                      rowGap: 0.25,
                      py: 0.75,
                      borderTop: i ? `1px solid ${C.border}` : 'none',
                    }}
                  >
                    <Typography
                      sx={{ color: palette.gray950, fontSize: '0.85rem' }}
                    >
                      #{i + 1} · {dateFmt.format(a.finishedAt)}
                    </Typography>
                    <Box
                      role="img"
                      aria-label={`${pct}%`}
                      sx={{
                        height: 10,
                        borderRadius: '4px',
                        bgcolor: withAlpha(C.accent, 0.12),
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${pct}%`,
                          height: '100%',
                          borderRadius: '4px',
                          bgcolor: C.accent,
                        }}
                      />
                    </Box>
                    <Typography sx={{ color: C.text, fontSize: '0.9rem' }}>
                      <Box component="b" sx={{ fontWeight: 800 }}>
                        {a.score}/{a.total}
                      </Box>{' '}
                      ({pct}%) · {formatDuration(a.usedSec)}
                      {a.timedOut ? ' ⏰' : ''}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          );
        })
      )}
      {orphans.length > 0 && (
        <Typography sx={{ color: palette.gray950, fontSize: '0.9rem', mb: 1 }}>
          Older attempts:{' '}
          {orphans
            .map(
              a =>
                `${a.practice} ${a.paperTitle} ${a.score}/${a.total} (${dateFmt.format(a.finishedAt)})`
            )
            .join(' · ')}
        </Typography>
      )}
      <Typography sx={{ color: palette.gray950, fontSize: '0.85rem', mt: 1 }}>
        ⏰ = time ran out before the test was finished.
      </Typography>
    </>
  );
}

export default OCProgress;
