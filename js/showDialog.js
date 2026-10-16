// Диалог сюжета (макет «Сюжетное задание: диалог»): npc — { name, who, icon, color, svg }, lines — реплики по одной.
// «Далее» — следующая, «‹ Назад» — предыдущая, на последней — okLabel. order — карточка «Приказ № N» (storyOrderCard):
// показывается в начале акта, когда NPC выдаёт сюжетное задание. Окно закрывается только кнопкой. По последней кнопке — onDone.
const DIALOG_SILHOUETTE = '<svg class="dlgSil" aria-hidden="true" viewBox="0 0 100 124"><path d="M30 30 Q50 18 70 30 L74 36 L26 36Z"/><rect x="28" y="35" width="44" height="4" rx="2"/><circle cx="50" cy="50" r="15"/><path d="M8 124 Q8 74 50 70 Q92 74 92 124Z"/></svg>';
function showDialog(npc, lines, okLabel, onDone, order) {
  const box = document.getElementById('storyDialog');
  box.querySelector('.dialogPortrait').innerHTML = DIALOG_SILHOUETTE + '<span class="dlgBadge">' + (npc.svg ? npc.svg() : iconTile(npc.icon, npc.color)) + '</span>';
  box.querySelector('.dlgPortrait').style.setProperty('--npc', npc.color || '#c8221a');
  document.getElementById('dialogName').textContent = npc.name;
  document.getElementById('dialogRole').textContent = npc.who;
  document.getElementById('dialogKind').textContent = order ? tr("ui.Разговор · приказ № ") + order.no : tr("ui.Разговор");
  const card = document.getElementById('dialogOrder');
  card.hidden = !order;
  box.classList.toggle('withOrder', !!order);
  if (order) {
    card.innerHTML = '<p class="dlgOrdKind"></p><p class="dlgOrdTitle"><span></span><b></b></p>' +
      '<p class="dlgOrdSec"></p><p class="dlgOrdTodo"></p><p class="dlgOrdSec"></p><div class="dlgOrdRew"></div><span class="dlgOrdStamp"></span>';
    card.querySelector('.dlgOrdKind').textContent = tr("ui.Сюжетное задание");
    card.querySelector('.dlgOrdTitle span').textContent = tr("ui.Приказ № ") + order.no;
    card.querySelector('.dlgOrdTitle b').textContent = '«' + order.title + '»';
    const secs = card.querySelectorAll('.dlgOrdSec');
    secs[0].textContent = tr("ui.Что делать");
    card.querySelector('.dlgOrdTodo').textContent = order.todo;
    secs[1].textContent = tr("ui.Награда");
    const rew = card.querySelector('.dlgOrdRew');
    for (const r of order.rewards) {
      const s = document.createElement('span');
      s.className = 'dlgRew ' + (r.cls || '');
      if (r.html) s.innerHTML = r.html; else s.textContent = r.text;
      rew.appendChild(s);
    }
    if (!order.rewards.length) { secs[1].hidden = true; rew.hidden = true; }
    card.querySelector('.dlgOrdStamp').textContent = tr("ui.Срочно");
  }
  const text = document.getElementById('dialogText');
  const page = document.getElementById('dialogPage');
  const btn = document.getElementById('dialogNext');
  const back = document.getElementById('dialogBack');
  let i = 0;
  const show = () => {
    text.textContent = lines[i];
    page.textContent = lines.length > 1 ? (i + 1) + ' / ' + lines.length : '';
    btn.textContent = i < lines.length - 1 ? tr("ui.Далее") : okLabel;
    back.hidden = i === 0;
  };
  btn.onclick = e => {
    e.stopPropagation();
    vibrate();
    if (i < lines.length - 1) { i++; show(); return; }
    box.classList.remove('open');
    if (onDone) onDone();
  };
  back.onclick = e => { e.stopPropagation(); vibrate(); if (i > 0) { i--; show(); } };
  box.onclick = null; // мимо окна — не закрывается
  hideTip();
  hideTutorial();
  show();
  box.classList.add('open');
}
