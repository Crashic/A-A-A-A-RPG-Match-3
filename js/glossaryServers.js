// Глоссарий · Серверы и режимы (js/serverConfig.js).
function glossaryServers() {
  return [
    ...SERVERS.map(s => glossaryEntry(iconTile(s.icon, s.color), s.name, tr("ui.Сервер"), [s.status, s.description])),
    ...GAME_MODES.map(m => glossaryEntry(iconTile(m.icon, m.color), m.name, m.title, [m.description, ['lore', m.note]]))
  ];
}
