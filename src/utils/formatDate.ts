// Shared date/time formatting helpers for saved records.
// History rows show the actual moment a session was saved (date + time),
// not just the date — so multiple sessions on the same day are distinguishable.

export function formatSavedDateTime(value: Date | string | number): string {
  return new Date(value).toLocaleString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatSavedDate(value: Date | string | number): string {
  return new Date(value).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
