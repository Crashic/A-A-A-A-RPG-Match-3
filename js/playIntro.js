// Показывает заставку с бегущим текстом (своя история для расы и класса — introStory), по окончании или по «Пропустить» вызывает onDone.
function playIntro(hero, onDone) {
  stopIntro();
  const crawl = document.getElementById('introCrawl');
  crawl.innerHTML = '';
  const story = introStory(hero || {});
  const episode = document.createElement('p');
  episode.className = 'introEpisode';
  episode.textContent = story.episode;
  const title = document.createElement('h2');
  title.className = 'introTitle';
  title.textContent = story.title;
  crawl.append(episode, title);
  for (const text of story.paragraphs) {
    const p = document.createElement('p');
    p.textContent = text;
    crawl.appendChild(p);
  }
  renderIntroStars();
  crawl.style.animationDuration = INTRO_DURATION + 'ms';
  crawl.classList.remove('run');
  crawl.getBoundingClientRect(); // перезапуск анимации
  crawl.classList.add('run');
  intro = { onDone, timer: setTimeout(finishIntro, INTRO_DURATION) };
}
