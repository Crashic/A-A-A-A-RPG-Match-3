// Иконки добычи в окне итогов боя: вещи (resultLoot) — пока они в сумке, касание открывает окно вещи
// ({ bag, sell: true }: «Продать», «Надеть», сравнение с надетым); проданные/надетые — исчезают.
// res — ресурсы { id: сколько } (значок + число, они уже в лагере).
let resultLoot = [];
function renderResultLoot(box, res) {
  box = box || document.querySelector('#resultList .resultLoot');
  if (!box) return;
  if (res) box.dataset.res = JSON.stringify(res);
  res = JSON.parse(box.dataset.res || '{}');
  box.innerHTML = '';
  const hero = loadSlot(getActiveSlot());
  const bag = (hero && hero.bag) || [];
  for (const it of resultLoot) {
    const i = bag.findIndex(x => x.uid === it.uid);
    if (i < 0) continue;
    box.appendChild(itemSlot(bag[i], 'cell', () => openItemInfo({ bag: bag.findIndex(x => x.uid === it.uid), sell: true })));
  }
  for (const id in res) {
    const r = findById(RESOURCES, id);
    const s = document.createElement('span');
    s.className = 'resultRes';
    s.dataset.tipTitle = r.name;
    s.dataset.tip = 'Ресурс — уже в лагере.';
    s.innerHTML = resourceIcon(id) + '<b>×' + res[id] + '</b>';
    box.appendChild(s);
  }
  if (!box.children.length) box.innerHTML = '<small>всё разобрали</small>';
}
