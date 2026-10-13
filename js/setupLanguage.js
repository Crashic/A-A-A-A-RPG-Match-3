// Выпадающий список «Язык» в настройках (#set-lang): выбор пишется в settings.lang, игра перезапускается на новом языке.
function setupLanguage() {
  const sel = document.getElementById('set-lang');
  sel.innerHTML = '';
  for (const l of LANGUAGES) {
    const o = document.createElement('option');
    o.value = l.id;
    o.textContent = l.name;
    sel.appendChild(o);
  }
  sel.value = settings.lang || DEFAULT_LANG;
  sel.addEventListener('change', () => {
    vibrate();
    settings.lang = sel.value;
    saveSettings();
    // весь текст из кода и справочников (локации, навыки, предметы) собирается при запуске — перезапуск
    location.reload();
  });
}
