// Урок про хлам в окне итогов первой победы: стрелка на хлам в добыче → «Продать» в окне вещи → «Продолжить».
function storyJunkStep() {
  if (!storyJunkActive()) return;
  const hero = loadSlot(getActiveSlot());
  const j = hero.story.junk;
  const info = document.getElementById('itemInfo').classList.contains('open');
  const result = document.getElementById('battleResult').classList.contains('open');
  if (j === 'loot' && info) {
    storyGuide(document.querySelector('#itemInfoButtons [data-role="sell"]'), tr("ui.Жми «Продать». Семёныч берёт всё — даже это. Особенно это."));
    return;
  }
  if (j === 'loot' && result) {
    const el = document.querySelector('#resultList .resultLoot .r-junk');
    if (el) { storyGuide(el, tr("ui.Хлам! В сумке он занимает место, как тёща на кухне: толку ноль, а подвинуть страшно. Нажми на него.")); return; }
    hero.story.junk = 'cont'; saveSlot(getActiveSlot(), hero); // хлам уже убрали — сразу к «Продолжить»
  }
  if (result) storyGuide(document.getElementById('resultMap'), tr("ui.Место освободилось, совесть чиста. Жми «Продолжить» — тебя ждут."));
}
