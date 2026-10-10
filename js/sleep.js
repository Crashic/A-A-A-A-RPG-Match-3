// Пауза для анимаций: await sleep(200).
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
