// Нажатие на закрытую по сюжету функцию: перехватывается раньше её обработчика, вместо перехода — сообщение.
function setupFeatureLocks() {
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('.featureLocked');
    if (!el) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    vibrate(30);
    showToast(tr("ui.Рано. «") + (STORY_FEATURE_NAMES[el.dataset.feature] || '') + tr("ui.» откроется по ходу сюжета."), 2500);
  }, true);
}
