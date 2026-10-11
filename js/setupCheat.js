// Кнопки «Читера»: открыть из меню, закрыть крестиком или касанием мимо окна.
function setupCheat() {
  const box = document.getElementById('cheat');
  const close = () => { box.classList.remove('open'); renderMenu(); };
  document.getElementById('btnCheat').addEventListener('click', () => { vibrate(); openCheat(); });
  document.getElementById('cheatClose').addEventListener('click', e => { e.stopPropagation(); vibrate(); close(); });
  box.addEventListener('click', e => { if (e.target === box) close(); });
}
