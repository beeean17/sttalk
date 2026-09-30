// Runs before the app and CSS paint so dark-theme visitors do not see a light flash.
// The site always follows the system colour scheme; there is no manual switch.
;(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const apply = () => {
    document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'
  }
  apply()
  media.addEventListener('change', apply)
  try {
    // A choice saved by the old theme switch no longer applies.
    localStorage.removeItem('sttalk-theme')
  } catch {
    // Storage can be unavailable in private or embedded browsers.
  }
})()
