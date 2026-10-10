// Нажатие на версию открывает список изменений;
// закрывается крестиком или касанием по затемнению вокруг окна.
function setupChangelog() {
  document.getElementById('ver').addEventListener('click', openChangelog);
  document.getElementById('changelogClose').addEventListener('click', closeChangelog);
  document.getElementById('changelog').addEventListener('click', e => {
    if (e.target.id === 'changelog') closeChangelog();
  });
}
