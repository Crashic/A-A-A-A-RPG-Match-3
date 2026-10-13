// Наглядный жребий первого хода (rollFirstTurn): над полем крутится монета-«рел»,
// на одной стороне два скрещённых меча (ходите вы), на другой — щит (ходит враг).
// Монета падает нужной стороной, ниже — подпись. Возвращает промис: ждёт конца анимации.
const COIN_SWORDS = '<svg viewBox="0 0 64 64" aria-hidden="true">' +
  '<path d="M14 12 L18 12 L46 42 L42 46 L12 18 Z" fill="var(--ui-parchment)"/><path d="M14 12 L18 12 L46 42 L44 44 Z" fill="var(--gem-pearl-light)"/>' +
  '<path d="M50 12 L46 12 L18 42 L22 46 L52 18 Z" fill="var(--ui-parchment)"/><path d="M50 12 L46 12 L18 42 L20 44 Z" fill="var(--gem-pearl-light)"/>' +
  '<path d="M38 44 L46 36 M18 36 L26 44" stroke="var(--ui-gold-shadow)" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M44 46 L50 52 M20 46 L14 52" stroke="var(--gem-ruby-dark)" stroke-width="5" stroke-linecap="round"/></svg>';
const COIN_SHIELD = '<svg viewBox="0 0 64 64" aria-hidden="true">' +
  '<path d="M32 8 L52 15 Q52 40 32 56 Q12 40 12 15 Z" fill="var(--gem-sapphire)"/>' +
  '<path d="M32 8 L52 15 Q52 40 32 56 Z" fill="var(--gem-sapphire-dark)"/>' +
  '<path d="M32 15 L45 20 Q45 37 32 48 Q19 37 19 20 Z" fill="none" stroke="var(--ui-parchment)" stroke-width="3" stroke-linejoin="round"/>' +
  '<path d="M32 22 L32 40 M25 29 L39 29" stroke="var(--ui-parchment)" stroke-width="3" stroke-linecap="round"/></svg>';
function showCoinFlip(turn, text) {
  const box = document.getElementById('coinFlip');
  if (!box) return Promise.resolve();
  box.innerHTML = '<div class="coin"><div class="coinFace coinHero">' + COIN_SWORDS + '</div><div class="coinFace coinEnemy">' + COIN_SHIELD + '</div></div><p class="coinText"></p>';
  const coin = box.querySelector('.coin');
  const end = 1800 + (turn === 'enemy' ? 180 : 0); // 5 оборотов и нужная сторона
  box.classList.add('open');
  coin.animate([
    { transform: 'translateY(0) rotateY(0deg) scale(.6)' },
    { transform: 'translateY(-46px) rotateY(' + (end / 2) + 'deg) scale(1.1)', offset: .45 },
    { transform: 'translateY(0) rotateY(' + end + 'deg) scale(1)' }
  ], { duration: 1500, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'forwards' });
  return new Promise(res => {
    setTimeout(() => {
      const t = box.querySelector('.coinText');
      t.textContent = text;
      t.className = 'coinText ' + turn;
      vibrate(30);
    }, 1500);
    setTimeout(() => { box.classList.remove('open'); box.innerHTML = ''; res(); }, 2500);
  });
}
