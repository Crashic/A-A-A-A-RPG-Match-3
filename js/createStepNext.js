// «Далее»: следующий шаг; на последнем шаге — «Создать».
function createStepNext() {
  if (!isStepComplete(CREATE_STEPS[creation.step])) return;
  if (creation.step === CREATE_STEPS.length - 1) { finishCharacterCreation(); return; }
  creation.step++;
  renderCreateStep();
  window.scrollTo(0, 0);
}
