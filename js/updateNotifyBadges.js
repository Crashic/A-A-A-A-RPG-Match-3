// Значки-уведомления «!» на кнопках: «Задания» — есть выполненное задание (можно сдать),
// «Персонаж» — есть нераспределённые очки характеристик. Кнопки: столбец меню экранов (data-act),
// меню боя, кнопка меню боя (видно, пока список закрыт) и «Персонаж» на карточке героя в главном меню.
function updateNotifyBadges() {
  const hero = loadSlot(getActiveSlot());
  const quest = !!(hero && hero.quests && (hero.quests.active || []).some(q => q.have >= q.need));
  const stats = !!(hero && statPointsFree(hero) > 0);
  const mark = (el, on, tip) => {
    if (!el) return;
    let dot = el.querySelector(':scope > .notifyDot');
    if (on && !dot) {
      dot = document.createElement('b');
      dot.className = 'notifyDot';
      dot.textContent = '!';
      el.appendChild(dot);
    }
    if (dot) { dot.hidden = !on; if (tip) dot.dataset.tip = tip; }
  };
  document.querySelectorAll('.sideMenu [data-act="journal"]').forEach(b => mark(b, quest));
  document.querySelectorAll('.sideMenu [data-act="char"]').forEach(b => mark(b, stats));
  mark(document.getElementById('btnJournalGame'), quest);
  mark(document.getElementById('btnCharGame'), stats);
  mark(document.getElementById('btnCharacter'), stats);
  mark(document.getElementById('btnBattleMenu'), quest || stats);
}
