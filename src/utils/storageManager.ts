const LAST_CLEANUP_KEY = 'lastStorageCleanup';
const STORAGE_VERSION = 'v1';

export function initializeStorageCleanup() {
  const lastCleanup = localStorage.getItem(LAST_CLEANUP_KEY);
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  if (!lastCleanup || !lastCleanup.startsWith(today)) {
    cleanupOldCache();
    localStorage.setItem(LAST_CLEANUP_KEY, `${today}_${STORAGE_VERSION}`);
  }
}

function cleanupOldCache() {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Keep these keys
    if (key === LAST_CLEANUP_KEY || key === 'user') continue;

    // Remove all session-specific cache (answers, showAnswers, etc.)
    // Keep only preferences (difficulty, yearLevel, selectedTopic)
    if (key.match(/^(math|english|science|holiday).*/) &&
        !key.match(/Difficulty|YearLevel|SelectedTopic/)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
  console.log(`Cleaned up ${keysToRemove.length} old cache entries`);
}

export function clearSectionCache(sectionPrefix: string) {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(sectionPrefix)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
}
