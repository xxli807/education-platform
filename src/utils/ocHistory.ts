// Finished OC-style test attempts, kept per card in localStorage so the
// Progress tab can show scores over time. "Start again" clears a paper's
// answers but never its history.

export interface OcAttempt {
  practice: string;
  paperId: string;
  paperTitle: string;
  score: number;
  total: number;
  /** Seconds actually used (the full time limit if the timer ran out). */
  usedSec: number;
  minutes: number;
  finishedAt: number;
  timedOut: boolean;
}

const historyKey = (storageKey: string) => `${storageKey}History`;

export function loadHistory(storageKey: string): OcAttempt[] {
  try {
    const raw = JSON.parse(
      localStorage.getItem(historyKey(storageKey)) || '[]'
    );
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function saveHistory(storageKey: string, attempts: OcAttempt[]) {
  try {
    localStorage.setItem(historyKey(storageKey), JSON.stringify(attempts));
  } catch {
    // storage full / private mode — history stays in memory for this visit
  }
}

/** 125 -> "2:05" */
export function formatDuration(totalSec: number) {
  const sec = Math.max(0, Math.round(totalSec));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}
