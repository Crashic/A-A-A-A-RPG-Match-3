// «Назад» на экране создания: с выбора класса — к происхождению, с происхождения — к серверу, с сервера — выход без сохранения.
function createStepBack() {
  if (creation && creation.step !== 'server') {
    creation.step = 'server';
    renderCreateStep();
  } else {
    goBack();
  }
}
