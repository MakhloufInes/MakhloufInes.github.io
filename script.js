// Light / dark toggle, remembered in the browser.
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    const forced = root.getAttribute('data-theme');
    return forced || (systemDark.matches ? 'dark' : 'light');
  }
  function reflect() {
    const dark = current() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
  }
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    reflect();
    document.dispatchEvent(new CustomEvent('themechange'));
  });
  systemDark.addEventListener('change', reflect);
  reflect();
})();
