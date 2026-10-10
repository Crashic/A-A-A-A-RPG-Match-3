// Короткое всплывающее сообщение внизу экрана.
function showToast(text, ms = 2500) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.remove('show'), ms);
}
