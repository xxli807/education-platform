/**
 * Hard refresh for the iPad home-screen app, which has no browser reload
 * button. A fresh query string makes Safari refetch index.html instead of a
 * cached copy that points at JS chunks a newer deploy has already deleted
 * ("Importing a module script failed"). Saved answers in localStorage stay.
 */
export function forceRefresh() {
  const url = new URL(window.location.href);
  url.searchParams.set('v', String(Date.now()));
  window.location.replace(url.toString());
}
