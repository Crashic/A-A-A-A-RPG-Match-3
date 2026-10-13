// Глоссарий · Лагерь (js/campConfig.js): общий лагерь аккаунта и постройки.
function glossaryCamp() {
  return [
    glossaryEntry(CAMP_ICON, 'Лагерь', 'Общий для всех персонажей аккаунта',
      [CAMP_TEXT, 'Откроется после цепочки заданий; пока выдаётся сразу. Кнопка — в меню.']),
    ...CAMP_BUILDINGS.map(b => glossaryEntry(iconTile(b.icon, b.color), b.name, 'Постройка лагеря · скоро', [b.text]))
  ];
}
