// Глоссарий · Лагерь (js/campConfig.js): общий лагерь аккаунта и постройки.
function glossaryCamp() {
  return [
    glossaryEntry(CAMP_ICON, 'Лагерь', 'Общий для всех персонажей аккаунта',
      [CAMP_TEXT, 'Откроется после цепочки заданий; пока выдаётся сразу. Кнопка — в меню.']),
    ...CAMP_BUILDINGS.map(b => glossaryEntry(iconTile(b.icon, b.color), b.name, 'Постройка лагеря' + (b.open ? '' : ' · скоро'), [b.text,
      b.id === 'storage' ? ['list', STASH_SLOTS + ' ячеек и изолента, общие для всех персонажей. Откроется после задания (пока — сразу).'] : '']))
  ];
}
