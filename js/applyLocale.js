// Переводит статичные надписи страницы: data-i18n — текст, data-i18n-aria — aria-label,
// data-i18n-tip — подсказка data-tip, data-i18n-ph — placeholder. Ставит <html lang>.
function applyLocale() {
  document.documentElement.lang = (settings && settings.lang) || DEFAULT_LANG;
  document.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(e => e.setAttribute('aria-label', t(e.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-tip]').forEach(e => { e.dataset.tip = t(e.dataset.i18nTip); });
  document.querySelectorAll('[data-i18n-ph]').forEach(e => e.setAttribute('placeholder', t(e.dataset.i18nPh)));
}
