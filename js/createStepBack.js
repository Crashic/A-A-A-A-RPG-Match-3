// «Назад»: предыдущий шаг; с первого шага — выход из создания без сохранения.
function createStepBack() {
  if (creation.step > 0) {
    creation.step--;
    renderCreateStep();
    window.scrollTo(0, 0);
  } else {
    goBack();
  }
}
