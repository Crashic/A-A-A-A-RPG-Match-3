// Подзаголовок внутри страницы глоссария (например, раса в «Навыках» или локация во «Врагах»).
function glossaryHeading(text) {
  const h = document.createElement('h3');
  h.className = 'gHead';
  h.textContent = text;
  return h;
}
