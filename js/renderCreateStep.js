// Рисует текущий экран создания: «Происхождение» (фракции и расы) или «Класс».
function renderCreateStep() {
  if (creation.step === 'origin') renderOriginStep();
  else renderClassStep();
}
