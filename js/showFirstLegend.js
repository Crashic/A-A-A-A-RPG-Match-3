// В первом бою на этом устройстве сама открывает подсказку «Фишки» (один раз).
function showFirstLegend() {
  if (settings.gemLegendSeen) return;
  settings.gemLegendSeen = true;
  saveSettings();
  openGemLegend();
}
