/* ───────────────────────────────────────────────────────────────────────
   Language toggle (ES ⇄ EN) for the course site.
   Every translatable bit of text exists twice in the HTML —
   <span class="lang-es"> and <span class="lang-en"> — and CSS hides whichever
   language isn't active (see styles.css). This script flips the
   <body data-lang> switch and remembers the choice, so moving between the
   programa and the session pages keeps your language.
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  var DEFAULT_LANG = 'es';                 // Spanish is the default — the class runs in Spanish
  var stored = null;
  try { stored = localStorage.getItem('lang'); } catch (e) { /* private mode */ }
  var fromUrl = null;
  try { fromUrl = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* ignore */ }
  var lang = (fromUrl === 'en' || fromUrl === 'es') ? fromUrl
           : (stored === 'en' || stored === 'es') ? stored
           : DEFAULT_LANG;

  function apply(l) {
    document.body.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('.langbar button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-set') === l);
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === l ? 'true' : 'false');
    });
    try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
  }

  apply(lang);

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.langbar button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-set')); });
    });
  });
})();
