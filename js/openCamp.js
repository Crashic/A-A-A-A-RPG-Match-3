// Открывает экран «Лагерь» (общий для аккаунта, персонаж не нужен).
function openCamp() {
  if (!campUnlocked()) { showToast('Лагерь откроется после цепочки заданий. Пока — только палатка в мечтах.'); return; }
  hideTip();
  renderCamp();
  showScreen('camp');
}
