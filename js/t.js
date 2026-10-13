// Перевод строки по ключу на текущий язык (settings.lang). Нет перевода — русский, нет и его — fallback или сам ключ.
function t(key, fallback) {
  const lang = (settings && settings.lang) || DEFAULT_LANG;
  const dict = LOCALES[lang] || {};
  if (dict[key] != null) return dict[key];
  const ru = LOCALES[DEFAULT_LANG] || {};
  return ru[key] != null ? ru[key] : (fallback != null ? fallback : key);
}
