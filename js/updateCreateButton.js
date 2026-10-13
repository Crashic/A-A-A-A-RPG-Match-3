// Включает «Создать персонажа», когда всё выбрано, иначе пишет под ней, чего не хватает.
function updateCreateButton() {
  const btn = document.getElementById('createHero');
  if (!btn || !creation) return;
  const check = canCreateHero(creation.draft);
  btn.disabled = !check.ok;
  document.getElementById('createWhy').textContent = check.reason;
  tutorialCheck(); // имя введено — подсказка «Создать»
}
