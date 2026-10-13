// Глоссарий · Лагерь (js/campConfig.js): общий лагерь аккаунта и постройки.
function glossaryCamp() {
  return [
    glossaryEntry(CAMP_ICON, tr("ui.Лагерь"), tr("ui.Общий для всех персонажей аккаунта"),
      [CAMP_TEXT, tr("ui.Откроется после цепочки заданий; пока выдаётся сразу. Кнопка — в меню.")]),
    ...CAMP_BUILDINGS.map(b => glossaryEntry(iconTile(b.icon, b.color), b.name, tr("ui.Постройка лагеря") + (b.open ? '' : tr("ui. · скоро")), [b.text,
      b.id === 'storage' ? ['list', STASH_BASE_SLOTS + tr("ui. ячеек (расширяется за изоленту до ") + (STASH_BASE_SLOTS + STASH_NEST_SIZE * STASH_NEST_PRICES.length) + ': ' + STASH_NEST_PRICES.map(tapeText).join(' → ') + tr("ui.) и изолента, общие для всех персонажей. Откроется после задания (пока — сразу).")] : '']))
  ];
}
