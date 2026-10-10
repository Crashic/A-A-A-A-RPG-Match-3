// Показывает заставку с бегущим текстом, по окончании или по «Пропустить» вызывает onDone.
function playIntro(hero, onDone) {
  stopIntro();
  const crawl = document.getElementById('introCrawl');
  crawl.innerHTML = '';
  const episode = document.createElement('p');
  episode.className = 'introEpisode';
  episode.textContent = INTRO_TEXT.episode;
  const title = document.createElement('h2');
  title.className = 'introTitle';
  title.textContent = INTRO_TEXT.title;
  crawl.append(episode, title);
  for (const text of INTRO_TEXT.paragraphs) {
    const p = document.createElement('p');
    p.textContent = text.replace('{name}', hero ? hero.name : '');
    crawl.appendChild(p);
  }
  renderIntroStars();
  crawl.style.animationDuration = INTRO_DURATION + 'ms';
  crawl.classList.remove('run');
  crawl.getBoundingClientRect(); // перезапуск анимации
  crawl.classList.add('run');
  intro = { onDone, timer: setTimeout(finishIntro, INTRO_DURATION) };
}
