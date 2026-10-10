// Короткое всплывающее сообщение внизу экрана. Не показывается, если оповещения выключены.
function showToast(text, ms = 2500) {
  if (settings && !settings.notifications) return;
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.remove('show'), ms);
}
