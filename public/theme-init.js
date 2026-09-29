// Runs before the app and CSS paint to avoid a light flash for dark-theme visitors.
;(() => {
  let preference = 'system'
  try {
    const saved = localStorage.getItem('sttalk-theme')
    if (saved === 'light' || saved === 'dark') preference = saved
  } catch {
    // Storage can be unavailable in private or embedded browsers.
  }
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.dataset.themePreference = preference
  document.documentElement.dataset.theme =
    preference === 'system' ? (dark ? 'dark' : 'light') : preference
})()
