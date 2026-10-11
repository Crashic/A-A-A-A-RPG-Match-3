// Шуточное окно «оплаты» (заглушка): нарисованная карта без полей ввода и одна кнопка «Я терпила».
// onClose — что сделать после «Я терпила» (для «Читера» — открыть окно читов), иначе просто закрыть.
function openPayJoke(onClose) {
  const box = document.getElementById('payJoke');
  const close = () => box.classList.remove('open');
  document.getElementById('payJokeNo').onclick = e => {
    e.stopPropagation();
    vibrate();
    close();
    if (onClose) onClose();
  };
  box.onclick = e => { if (e.target === box) close(); };
  box.classList.add('open');
}
