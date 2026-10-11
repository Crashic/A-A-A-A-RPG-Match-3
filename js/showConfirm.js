// Окно подтверждения: текст, кнопка действия с галочкой и «Отмена» с крестиком.
// yesClass — цвет кнопки действия (по умолчанию red; например, 'orange' для сброса очков).
const CONFIRM_YES_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CONFIRM_NO_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>';
function showConfirm(text, yesLabel, onYes, yesClass = 'red') {
  const box = document.getElementById('confirm');
  document.getElementById('confirmText').textContent = text;
  const yes = document.getElementById('confirmYes');
  yes.className = 'btn ' + yesClass;
  yes.innerHTML = CONFIRM_YES_ICON + '<span></span>';
  yes.lastChild.textContent = yesLabel;
  const no = document.getElementById('confirmNo');
  no.innerHTML = CONFIRM_NO_ICON + '<span>Отмена</span>';
  const close = () => box.classList.remove('open');
  yes.onclick = () => { vibrate(); close(); onYes(); };
  no.onclick = () => { vibrate(); close(); };
  box.onclick = e => { if (e.target === box) close(); };
  box.classList.add('open');
}
