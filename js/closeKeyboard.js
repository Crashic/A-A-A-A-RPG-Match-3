// Закрывает клавиатуру имени и обновляет экран создания.
function closeKeyboard() {
  const box = document.getElementById('keyboard');
  if (!box.classList.contains('open')) return;
  box.classList.remove('open');
  if (creation) {
    creation.draft.name = creation.draft.name.trim();
    renderCreateStep();
  }
}
