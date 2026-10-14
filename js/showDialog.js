// Диалог сюжета: npc — { name, who, icon, color }, lines — реплики по одной («Далее»), на последней — okLabel.
// Окно закрывается только кнопкой. По последней кнопке — onDone.
function showDialog(npc, lines, okLabel, onDone) {
  const box = document.getElementById('storyDialog');
  box.querySelector('.dialogPortrait').innerHTML = iconTile(npc.icon, npc.color);
  document.getElementById('dialogName').textContent = npc.name;
  document.getElementById('dialogRole').textContent = npc.who;
  const text = document.getElementById('dialogText');
  const page = document.getElementById('dialogPage');
  const btn = document.getElementById('dialogNext');
  let i = 0;
  const show = () => {
    text.textContent = lines[i];
    page.textContent = lines.length > 1 ? (i + 1) + ' / ' + lines.length : '';
    btn.textContent = i < lines.length - 1 ? tr("ui.Далее") : okLabel;
  };
  btn.onclick = e => {
    e.stopPropagation();
    vibrate();
    if (i < lines.length - 1) { i++; show(); return; }
    box.classList.remove('open');
    if (onDone) onDone();
  };
  box.onclick = null; // мимо окна — не закрывается
  hideTip();
  hideTutorial();
  show();
  box.classList.add('open');
}
