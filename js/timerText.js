// Оставшееся время «м:сс» до момента until (мс).
function timerText(until) {
  const s = Math.max(0, Math.ceil((until - Date.now()) / 1000));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
