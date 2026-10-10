// Окно подтверждения: текст, кнопка действия и «Отмена».
function showConfirm(text, yesLabel, onYes) {
  const box = document.getElementById('confirm');
  document.getElementById('confirmText').textContent = text;
  const yes = document.getElementById('confirmYes');
  yes.textContent = yesLabel;
  const close = () => box.classList.remove('open');
  yes.onclick = () => { vibrate(); close(); onYes(); };
  document.getElementById('confirmNo').onclick = () => { vibrate(); close(); };
  box.onclick = e => { if (e.target === box) close(); };
  box.classList.add('open');
}
