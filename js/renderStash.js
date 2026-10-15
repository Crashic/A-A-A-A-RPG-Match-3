// Экран «Общак» (макет «Общак»): слева — «Общак N / M», места «+» (докупка), ячейки склада, «Изолента общака»
// плашками синей / чёрной / белой и синяя «Взять всё»; справа — «Сумка · имя», ячейки сумки, «Изолента героя»
// и «Положить всё». Касание по вещи перекладывает её (stashMove); касание по плашке изоленты — один моток этого цвета (stashTape).
function renderStash() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('stashLeft');
  const right = document.getElementById('stashRight');
  if (!hero) { left.innerHTML = tr("ui.<p class=\"hint\">Нет персонажа</p>"); right.innerHTML = ''; return; }
  const stash = loadStash();
  const title = (text, count) => {
    const p = document.createElement('p');
    p.className = 'invTitle';
    p.innerHTML = '<span></span><b></b>';
    p.firstChild.textContent = text;
    p.lastChild.textContent = count || '';
    return p;
  };
  const tapeBlock = (dir, have) => {
    const chips = document.createElement('div');
    chips.className = 'stashChips';
    let rest = Math.max(0, Math.floor(have));
    for (const k of TAPE_KINDS) {
      const n = Math.floor(rest / k.value);
      rest -= n * k.value;
      const c = document.createElement('button');
      c.type = 'button';
      c.className = 'stashChip';
      c.disabled = n <= 0;
      c.innerHTML = '<i class="chipRoll ' + k.id + '"></i><b></b>';
      c.querySelector('b').textContent = n;
      c.dataset.tip = (dir === 'take' ? tr("ui.Взять 1: ") : tr("ui.Положить 1: ")) + k.name;
      c.addEventListener('click', e => { e.stopPropagation(); vibrate(); stashTape(dir, k.value); });
      chips.appendChild(c);
    }
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'btn blue stashAll';
    all.textContent = dir === 'take' ? tr("ui.Взять всё") : tr("ui.Положить всё");
    all.disabled = have <= 0;
    all.addEventListener('click', e => { e.stopPropagation(); vibrate(); stashTape(dir, 'all'); });
    return [chips, all];
  };
  const grid = (items, size, from, cls) => {
    const g = document.createElement('div');
    g.className = 'invGrid ' + cls;
    for (let i = 0; i < size; i++)
      g.appendChild(items[i] ? itemSlot(items[i], 'cell', () => stashMove(from, i)) : emptySlot('cell', ''));
    return g;
  };
  const size = stashSize();
  // места общака: купленные, следующее «+» (подсказка с ценой), закрытые — как гнёзда шкафчика
  const nests = document.createElement('div');
  nests.className = 'bankBags';
  for (let i = 0; i < STASH_NEST_PRICES.length; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    const n = stash.nests || 0;
    if (i < n) { b.className = 'invSlot bankBag owned'; b.innerHTML = '<b>+' + STASH_NEST_SIZE + '</b>'; b.disabled = true; }
    else if (i === n) {
      b.className = 'invSlot bankBag next' + ((hero.tape || 0) < STASH_NEST_PRICES[i] ? ' poor' : '');
      b.innerHTML = '<b>+</b>';
      b.dataset.tip = tr("ui.Расширить общак на ") + STASH_NEST_SIZE + tr("ui. ячеек:");
      b.dataset.tipTape = STASH_NEST_PRICES[i];
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); buyStashNest(); });
    } else { b.className = 'invSlot bankBag locked'; b.disabled = true; }
    nests.appendChild(b);
  }
  left.innerHTML = '';
  left.append(title(STASH_NAME, stash.items.length + ' / ' + size), nests,
    grid(stash.items, Math.max(size, stash.items.length), 'stash', 'stashGrid'),
    title(tr("ui.Изолента общака")), ...tapeBlock('take', stash.tape || 0));
  right.innerHTML = '';
  const bag = hero.bag || [];
  right.append(title(tr("ui.Сумка · ") + hero.name, bag.length + ' / ' + bagCapacity(hero)),
    grid(bag, bagCapacity(hero), 'bag', 'bagGrid'),
    title(tr("ui.Изолента героя")), ...tapeBlock('put', hero.tape || 0));
}
