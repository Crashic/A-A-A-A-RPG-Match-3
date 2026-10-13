// Рисует текущий экран создания: «Сервер», «Происхождение» (фракции и расы) или «Класс».
function renderCreateStep() {
  if (creation.step === 'server') renderServerStep();
  else if (creation.step === 'origin') renderOriginStep();
  else renderClassStep();
}
