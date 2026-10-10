// Шаг «Имя»: поле ввода. «Далее» становится доступной, когда имя введено.
function renderNameStep(body, step) {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'heroName';
  input.className = 'textInput';
  input.maxLength = NAME_MAX_LENGTH;
  input.placeholder = 'Имя героя';
  input.autocomplete = 'off';
  input.value = creation.draft[step.field] || '';
  input.addEventListener('input', () => {
    creation.draft[step.field] = input.value;
    document.getElementById('createNext').disabled = !isStepComplete(step);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && isStepComplete(step)) createStepNext();
  });
  body.appendChild(input);
  const note = document.createElement('p');
  note.className = 'hint small';
  note.textContent = 'До ' + NAME_MAX_LENGTH + ' символов';
  body.appendChild(note);
}
