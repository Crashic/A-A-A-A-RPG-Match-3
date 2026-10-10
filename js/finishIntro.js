// Конец заставки (доехал текст или «Пропустить»): вызывает продолжение — запуск игры.
function finishIntro() {
  if (!intro) return;
  const done = intro.onDone;
  stopIntro();
  done();
}
