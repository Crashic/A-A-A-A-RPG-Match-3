// Шаг с выбором из справочника (класс, пол, раса, фракция): карточки вариантов.
function renderChoiceStep(body, step) {
  const grid = document.createElement('div');
  grid.className = 'choiceGrid';
  for (const option of step.options()) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'choice' + (creation.draft[step.field] === option.id ? ' selected' : '');
    const name = document.createElement('b');
    name.textContent = option.name;
    card.appendChild(name);
    if (option.description) {
      const text = document.createElement('span');
      text.textContent = option.description;
      card.appendChild(text);
    }
    card.addEventListener('click', () => {
      vibrate();
      creation.draft[step.field] = option.id;
      renderCreateStep();
    });
    grid.appendChild(card);
  }
  body.appendChild(grid);
}
