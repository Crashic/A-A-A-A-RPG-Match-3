// Привязывает кнопки главного меню, профиля, настроек и кнопку «Назад» телефона.
function setupMenu() {
  const on = (id, fn) => document.getElementById(id).addEventListener('click', () => { vibrate(); fn(); });

  on('btnStart', startGame);
  on('btnProfile', () => { renderProfile(); showScreen('profile'); });
  on('btnSettings', () => { renderSettings(); showScreen('settings'); });
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
    'Удалить все сохранения во всех ячейках? Это нельзя отменить.', 'Удалить всё', () => {
      resetAllSaves();
      showToast('Все сохранения удалены');
    }));

  // Кнопка «Назад» телефона возвращает в меню
  window.addEventListener('popstate', () => {
    document.getElementById('confirm').classList.remove('open');
    renderMenu();
    showScreen('menu', false);
  });
}
