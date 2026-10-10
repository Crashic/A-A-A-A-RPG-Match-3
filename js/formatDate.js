// Дата и время для карточек сохранений: «10.10.2026, 16:20».
function formatDate(ms) {
  return new Date(ms).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}
