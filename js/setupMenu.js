// Привязывает кнопки главного меню, персонажей, создания персонажа, настроек и кнопку «Назад» телефона.
function setupMenu() {
  const on = (id, fn) => document.getElementById(id).addEventListener('click', () => { vibrate(); fn(); });

  on('btnStart', startGame);
  on('btnCharacters', () => { renderCharacters(); showScreen('characters'); });
  on('btnSettings', () => { renderSettings(); showScreen('settings'); });
  on('btnExit', exitApp);
  on('btnReturn', () => { renderMenu(); showScreen('menu', false); });
  // Создание персонажа: «Назад» (к происхождению / выход) и «Случайно»
  on('createBack', createStepBack);
  on('createRandom', randomCharacter);
  // Своя клавиатура имени: касание мимо клавиш закрывает её
  document.getElementById('keyboard').addEventListener('click', e => {
    if (e.target.id === 'keyboard') closeKeyboard();
  });

  // Бой: карта врагов и окно итогов
  on('btnMap', openMap);
  on('resultMap', closeBattleResult); // окно итогов показано поверх карты — «Закрыть»
  on('resultAgain', () => { closeBattleResult(); enterGame(true); }); // тот же враг (lastEnemy)

  // Заставка: «Пропустить»
  on('introSkip', finishIntro);

  document.querySelectorAll('[data-back]').forEach(b =>
    b.addEventListener('click', () => { vibrate(); goBack(); }));

  // Ползунки громкости
  for (const key of ['music', 'sound']) {
    const input = document.getElementById('set-' + key);
    input.addEventListener('input', () => {
      settings[key] = Number(input.value);
      document.getElementById('val-' + key).textContent = settings[key] + '%';
    });
    input.addEventListener('change', saveSettings);
  }

  // Переключатели
  for (const key of ['vibration', 'fullscreen', 'notifications']) {
    const input = document.getElementById('set-' + key);
    input.addEventListener('change', () => {
      settings[key] = input.checked;
      saveSettings();
      vibrate();
      if (key === 'fullscreen') setFullscreen(settings.fullscreen);
      if (key === 'notifications' && settings.notifications) showToast('Оповещения включены');
    });
  }

  on('btnResetSaves', () => showConfirm(
    'Удалить всех персонажей во всех ячейках? Это нельзя отменить.', 'Удалить всё', () => {
      resetAllSaves();
      showToast('Все сохранения удалены');
    }));

  // Esc на ПК: закрывает окно, иначе возвращает в меню
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.modal.open');
    if (open) open.classList.remove('open');
    else if (!document.getElementById('menu').classList.contains('active')) goBack();
  });

  // Кнопка «Назад» телефона: возврат на предыдущий экран (для создания персонажа — отмена)
  window.addEventListener('popstate', () => {
    document.getElementById('confirm').classList.remove('open');
    closeGemLegend();
    document.getElementById('keyboard').classList.remove('open');
    if (history.state && history.state.screen !== 'game') closeBattleResult();
    let id = (history.state && history.state.screen) || 'menu';
    if (id === 'create' && !creation) id = 'menu';
    if (id === 'intro') id = 'menu';
    if (id !== 'create') creation = null;
    stopIntro();
    renderScreen(id);
    showScreen(id, false);
  });
}
