// Случайное имя выжившего (не длиннее NAME_MAX_LENGTH).
function randomName() {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  for (;;) {
    const name = pick(RANDOM_FIRST) + ' ' + pick(RANDOM_LAST);
    if (name.length <= NAME_MAX_LENGTH) return name;
  }
}
