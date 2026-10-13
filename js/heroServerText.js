// Строка «Сервер · режим» для карточки персонажа (у старых персонажей — Крэшляндия, PvE).
function heroServerText(hero) {
  const server = findById(SERVERS, hero.serverId) || SERVERS[0];
  const mode = findById(GAME_MODES, hero.modeId) || GAME_MODES[0];
  return server.name + ' · ' + mode.name;
}
