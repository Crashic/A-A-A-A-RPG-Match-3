// «Понятно» у подсказки сюжета.
function storyGuideOk() {
  const fn = storyGuide.onOk;
  storyGuide.onOk = null;
  vibrate();
  hideTutorial();
  if (fn) fn();
}
