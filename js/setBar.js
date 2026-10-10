// Полоса (здоровье, щит, мана, опыт): заполнение value/max и подпись.
function setBar(bar, value, max, text) {
  const part = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  bar.querySelector('i').style.width = (part * 100) + '%';
  bar.querySelector('span').textContent = text !== undefined ? text : value + ' / ' + max;
}
