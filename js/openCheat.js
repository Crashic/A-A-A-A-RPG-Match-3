// «Читер» в главном меню: сначала шуточная «оплата», по «Я терпила» — окно читов.
function openCheat() {
  openPayJoke(() => {
    renderCheat();
    document.getElementById('cheat').classList.add('open');
  });
}
