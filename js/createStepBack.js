// «Назад» на экране создания: с выбора класса — к происхождению, с происхождения — выход без сохранения.
function createStepBack() {
  if (creation && creation.step === 'class') {
    creation.step = 'origin';
    renderCreateStep();
  } else {
    goBack();
  }
}
