// Окно сумки (в общем окне предмета): размер, шутка, цена. where — { bag: i[, sell] } (в инвентаре)
// или { pack: гнездо } (надета). Кнопки: в инвентаре — «Выбросить»/«Продать» и «Надеть», надетая — «Снять».
function openBagInfo(where) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const inPack = where.pack !== undefined;
  const item = inPack ? heroPacks(hero).worn[where.pack] : (hero.bag || [])[where.bag];
  if (!item) return;
  const t = findById(BAG_TYPES, item.bagType) || {};
  const box = document.getElementById('itemInfo');
  const title = document.getElementById('itemInfoTitle');
  title.textContent = item.name;
  title.style.color = '';
  const body = document.getElementById('itemInfoBody');
  body.innerHTML = '';
  const p = (text, cls) => { const el = document.createElement('p'); el.className = cls; el.textContent = text; body.appendChild(el); return el; };
  p(tr("ui.Сумка · ") + item.size + ' ' + plural(item.size, tr("ui.ячейка"), tr("ui.ячейки"), tr("ui.ячеек")) + (inPack ? tr("ui. · надета") : ''), 'itSub');
  p(t.lore || '', 'itLore');
  p(inPack ? tr("ui.Снятая сумка ляжет в инвентарь и займёт одну ячейку.") : tr("ui.Надетая сумка добавляет ячейки в инвентарь."), 'itReq');
  const price = p('', 'itPrice');
  price.innerHTML = tr("ui.<span>Цена у торговца</span>") + formatTape(itemPrice(item));
  const btns = document.getElementById('itemInfoButtons');
  btns.innerHTML = '';
  const close = () => box.classList.remove('open');
  const btn = (label, cls, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + cls;
    b.textContent = label;
    b.dataset.role = itemButtonRole(label); // на кнопки наводятся стрелки сюжета
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    btns.appendChild(b);
  };
  if (inPack) btn(tr("ui.Снять"), 'stone', () => takeOffBag(where.pack, close));
  else {
    if (where.sell) btn(tr("ui.Продать"), 'orange', () => { close(); sellItem(where.bag); });
    else btn(tr("ui.Выбросить"), 'red', () => showConfirm(tr("ui.Выбросить «") + item.name + tr("ui.»? Вернуть не получится."), tr("ui.Выбросить"), () => { close(); dropItem(where.bag); }));
    btn(tr("ui.Надеть"), 'green', () => { if (wearBag(where.bag)) close(); });
  }
  box.classList.add('open');
  storyEvent('openItem'); // сюжет: открыто окно сумки (акт «Тара»)
}
