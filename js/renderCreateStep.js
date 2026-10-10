// Рисует текущий экран создания: «Происхождение» (фракции и расы) или «Класс».
function renderCreateStep() {
  document.getElementById('createTitle').textContent = creation.step === 'origin' ? 'Происхождение' : 'Класс';
  if (creation.step === 'origin') renderOriginStep();
  else renderClassStep();
}
