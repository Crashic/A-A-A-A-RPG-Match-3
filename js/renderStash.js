// Экран «Общак» (общий склад (лагерь, общий для аккаунта): слева — вещи склада и изолента склада с кнопкой «Взять»,
// справа — сумка текущего персонажа и его изолента с кнопкой «Положить». Касание по вещи перекладывает её
// (stashMove); кнопки изоленты — по одной синей / чёрной / белой или всё (stashTape).
function renderStash() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('stashLeft');
  const right = document.getElementById('stashRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
  const stash = loadStash();
  const tapeRow = (dir, have) => {
    const box = document.createElement('div');
    box.className = 'stashTape';
    box.innerHTML = '<div class="invTape"><span>' + (dir === 'take' ? 'На складе' : 'В карманах') + '</span>' + formatTape(have) + '</div><div class="stashTapeBtns"></div>';
    const btns = box.lastChild;
    const add = (label, amount) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn ' + (dir === 'take' ? 'green' : 'stone') + ' stashTapeBtn';
      b.innerHTML = label;
      b.disabled = have <= 0;
      b.addEventListener('click', e => { e.stopPropagation(); stashTape(dir, amount); });
      btns.appendChild(b);
    };
    for (const k of TAPE_KINDS) add((dir === 'take' ? '−' : '+') + '1 <span class="tape"><i class="roll ' + k.id + '"></i></span>', k.value);
    add(dir === 'take' ? 'Взять всё' : 'Положить всё', 'all');
    return box;
  };
  const grid = (items, size, from) => {
    const g = document.createElement('div');
    g.className = 'invGrid';
    for (let i = 0; i < size; i++)
      g.appendChild(items[i] ? itemSlot(items[i], 'cell', () => stashMove(from, i)) : emptySlot('cell', ''));
    return g;
  };
  const size = stashSize();
  left.innerHTML = '<p class="invTitle"></p><p class="shopNote">Общий для всех ваших персонажей. Коснитесь вещи — она переедет.</p>';
  left.firstChild.textContent = STASH_NAME + ': ' + stash.items.length + ' / ' + size;
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
      b.dataset.tip = 'Расширить общак на ' + STASH_NEST_SIZE + ' ячеек:';
      b.dataset.tipTape = STASH_NEST_PRICES[i];
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); buyStashNest(); });
    } else { b.className = 'invSlot bankBag locked'; b.disabled = true; }
    nests.appendChild(b);
  }
  left.append(nests, tapeRow('take', stash.tape), grid(stash.items, Math.max(size, stash.items.length), 'stash'));
  right.innerHTML = '<p class="invTitle"></p>';
  right.firstChild.textContent = 'Сумка: ' + hero.name;
  right.append(tapeRow('put', hero.tape || 0), grid(hero.bag || [], bagCapacity(hero), 'bag'));
}
