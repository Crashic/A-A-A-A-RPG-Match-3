// Кнопки «Читера»: открыть из главного меню, меню боя и карты, закрыть крестиком или касанием мимо окна.
function setupCheat() {
  const box = document.getElementById('cheat');
  const close = () => { box.classList.remove('open'); renderMenu(); };
  for (const id of ['btnCheat', 'btnCheatGame', 'mapCheat']) // главное меню, меню боя, карта
    document.getElementById(id).addEventListener('click', e => { e.stopPropagation(); vibrate(); closeBattleMenu(); openCheat(); });
  document.getElementById('cheatClose').addEventListener('click', e => { e.stopPropagation(); vibrate(); close(); });
  box.addEventListener('click', e => { if (e.target === box) close(); });
}
