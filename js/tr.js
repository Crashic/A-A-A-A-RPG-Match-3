// Перевод строки по ключу «ui.<русский текст>» на текущий язык. Весь русский текст в коде идёт через tr() (не t — это имя часто занято локальными переменными):
// есть перевод в locales/<язык>.js — он, нет — исходный русский текст (часть ключа после «ui.»).
// Язык читается из сохранённых настроек сразу при загрузке: файлы данных (зоны, навыки, предметы) вызывают tr()
// ещё до main(), поэтому смена языка перезагружает игру (setupLanguage).
function currentLang() {
  let s = null;
  try { s = settings; } catch (e) {} // tr() может вызываться до загрузки state.js
  if (s && s.lang) return s.lang;
  if (currentLang.early === undefined) {
    try { currentLang.early = (JSON.parse(localStorage.getItem('aaaa-settings')) || {}).lang || DEFAULT_LANG; }
    catch (e) { currentLang.early = DEFAULT_LANG; }
  }
  return currentLang.early;
}
function tr(key, fallback) {
  const dict = LOCALES[currentLang()] || {};
  if (dict[key] != null) return dict[key];
  const ru = LOCALES[DEFAULT_LANG] || {};
  if (ru[key] != null) return ru[key];
  if (fallback != null) return fallback;
  return key.startsWith('ui.') ? key.slice(3) : key;
}
