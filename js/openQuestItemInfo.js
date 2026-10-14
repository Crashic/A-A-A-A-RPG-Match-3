// Окно квестового предмета у Семёныча (в общем окне предмета, как у любой покупки): название, «Квестовый предмет»,
// описание, цена и «Купить» — покупка только после подтверждения этой кнопкой (buyQuestItem).
function openQuestItemInfo(id) {
  const hero = loadSlot(getActiveSlot());
  const q = findById(QUEST_ITEMS, id);
  if (!hero || !q) return;
  const box = document.getElementById('itemInfo');
  const title = document.getElementById('itemInfoTitle');
  title.textContent = q.name;
  title.style.color = 'var(--ui-reward)';
  const body = document.getElementById('itemInfoBody');
  body.innerHTML = '';
  const p = (text, cls) => { const el = document.createElement('p'); el.className = cls; el.textContent = text; body.appendChild(el); return el; };
  p(tr("ui.Квестовый предмет · особый заказ"), 'itSub');
  p(q.text, 'itLore');
  p(tr("ui.Ляжет во вкладку «Квестовое» у «Персонажа»: место в сумке не занимает, продать и выбросить нельзя."), 'itReq');
  const price = p('', 'itPrice');
  price.innerHTML = '<span>' + tr("ui.Цена") + '</span>' + formatTape(q.price);
  const btns = document.getElementById('itemInfoButtons');
  btns.innerHTML = '';
  const have = hasQuestItem(hero, id);
  const poor = (hero.tape || 0) < q.price;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn orange';
  b.textContent = have ? tr("ui.Уже куплено") : poor ? tr("ui.Не хватает изоленты") : tr("ui.Купить");
  b.dataset.role = 'buy';
  b.disabled = have || poor;
  b.addEventListener('click', e => { e.stopPropagation(); vibrate(); box.classList.remove('open'); buyQuestItem(id); });
  btns.appendChild(b);
  box.classList.add('open');
  storyEvent('openItem', 'quest:' + id); // сюжет, акт 3: открыто окно каски
}
