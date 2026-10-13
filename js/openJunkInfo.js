// Окно хлама (в общем окне предмета): шутка, цена и «Продать» (Семёныч берёт всё) / «Выбросить».
// where — { bag: i } (в инвентаре).
function openJunkInfo(where) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && (hero.bag || [])[where.bag];
  if (!item) return;
  const t = findById(JUNK_ITEMS, item.junk) || {};
  const box = document.getElementById('itemInfo');
  const title = document.getElementById('itemInfoTitle');
  title.textContent = item.name;
  title.style.color = findById(ITEM_RARITIES, 'junk').color;
  const body = document.getElementById('itemInfoBody');
  body.innerHTML = '';
  const p = (text, cls) => { const el = document.createElement('p'); el.className = cls; el.textContent = text; body.appendChild(el); return el; };
  p(tr("ui.Хлам · только на продажу"), 'itSub');
  p(t.lore || '', 'itLore');
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
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    btns.appendChild(b);
  };
  btn(tr("ui.Выбросить"), 'red', () => { close(); dropItem(where.bag); });
  btn(tr("ui.Продать"), 'orange', () => { close(); sellItem(where.bag); });
  box.classList.add('open');
}
