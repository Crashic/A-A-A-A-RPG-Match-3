// Общие данные аккаунта (для всех персонажей): localStorage 'aaaa-account' = { campUnlocked, camp }.
function loadAccount() {
  let acc = {};
  try { acc = JSON.parse(localStorage.getItem('aaaa-account')) || {}; } catch (e) {}
  acc.camp = acc.camp || {};
  return acc;
}
