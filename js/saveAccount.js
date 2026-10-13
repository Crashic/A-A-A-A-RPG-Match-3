// Сохраняет общие данные аккаунта (loadAccount).
function saveAccount(acc) {
  try { localStorage.setItem('aaaa-account', JSON.stringify(acc)); } catch (e) {}
}
