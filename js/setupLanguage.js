// Выпадающий список «Язык» в настройках (#set-lang): выбор пишется в settings.lang, надписи переводятся сразу,
// открытый экран перерисовывается (renderScreen), чтобы обновились и надписи из кода.
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
    applyLocale();
    renderMenu(); // главное меню и карточка героя — надписи из кода
    const cur = document.querySelector('.screen.active');
    if (cur && typeof renderScreen === 'function' && cur.id !== 'settings') renderScreen(cur.id);
  });
}
