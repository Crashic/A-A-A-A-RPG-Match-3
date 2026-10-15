// Глоссарий-книга: слева вкладки разделов, справа страница выбранного раздела (glossaryTab).
function renderGlossary() {
  const tabs = document.getElementById('glossaryTabs');
  tabs.innerHTML = '';
  for (const s of GLOSSARY_SECTIONS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'zone' + (s.id === glossaryTab ? ' selected' : '');
    b.innerHTML = '<b></b>';
    b.firstChild.textContent = s.name;
    b.addEventListener('click', () => { vibrate(); glossaryTab = s.id; renderGlossary(); });
    tabs.appendChild(b);
  }
  const section = GLOSSARY_SECTIONS.find(s => s.id === glossaryTab) || GLOSSARY_SECTIONS[0];
  const page = document.getElementById('glossaryPage');
  page.innerHTML = '<div class="gPageHead"><span></span><small></small></div>'; // шапка страницы книги (макет «Глоссарий»)
  page.querySelector('.gPageHead span').textContent = section.name;
  page.querySelector('.gPageHead small').textContent = tr("ui.Стр. ") + (GLOSSARY_SECTIONS.indexOf(section) + 1) + tr("ui. · издание исправленное");
  page.append(...section.build());
  page.scrollTop = 0;
}
