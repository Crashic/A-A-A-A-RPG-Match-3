// Прячет подсказку (showTip).
function hideTip() {
  const tip = document.getElementById('tip');
  if (tip) tip.hidden = true;
  tipOwner = null;
}
