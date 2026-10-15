// Открывает торговца (из бункера или меню карты): при необходимости завозит новый товар (shopStock),
// выбирает реплику завхоза и показывает экран «Торговец».
let shopQuote = '';
let shopTab = null; // вкладка прилавка: 'stock' | 'bags' | 'quest' (null — по умолчанию: особый заказ, если он есть)
function openShop() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  if (shopStock(hero)) saveSlot(slot, hero);
  shopTab = null;
  shopQuote = SHOP_QUOTES[Math.floor(Math.random() * SHOP_QUOTES.length)];
  hideTip();
  renderShop();
  showScreen('shop');
}
