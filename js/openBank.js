// Открывает экран «Банк» (из бункера).
let bankQuote = '';
function openBank() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  bankQuote = BANK_QUOTES[Math.floor(Math.random() * BANK_QUOTES.length)];
  hideTip();
  renderBank();
  showScreen('bank');
}
