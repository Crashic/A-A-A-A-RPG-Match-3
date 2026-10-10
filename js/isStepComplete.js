// Заполнен ли шаг создания: имя не пустое, в остальных шагах выбран вариант.
function isStepComplete(step) {
  const value = creation.draft[step.field];
  if (step.id === 'name') return !!value && value.trim().length > 0;
  return !!value;
}
