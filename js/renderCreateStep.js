// Рисует текущий шаг создания персонажа и кнопки «Назад» / «Далее» / «Создать».
function renderCreateStep() {
  const step = CREATE_STEPS[creation.step];
  const last = creation.step === CREATE_STEPS.length - 1;
  document.getElementById('createTitle').textContent = step.title;
  document.getElementById('createProgress').textContent =
    'Шаг ' + (creation.step + 1) + ' из ' + CREATE_STEPS.length;
  document.getElementById('createHint').textContent = step.hint;

  const body = document.getElementById('createBody');
  body.innerHTML = '';
  if (step.id === 'name') renderNameStep(body, step);
  else renderChoiceStep(body, step);

  const next = document.getElementById('createNext');
  next.textContent = last ? 'Создать' : 'Далее';
  next.disabled = !isStepComplete(step);
}
