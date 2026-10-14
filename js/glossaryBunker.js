// Глоссарий · Бункер (js/shopConfig.js): торговец, цены, обновление прилавка, доска заданий.
function glossaryBunker() {
  return [
    glossaryEntry(BUNKER_ICON, tr("ui.Бункер"), tr("ui.Меню карты → люк"), [tr("ui.Дом выжившего. Здесь торговец и доска заданий; в бой отсюда — через карту.")]),
    glossaryEntry(SHOP_ICON, SHOP_TRADER.name, SHOP_TRADER.title, [
      tr("ui.На прилавке ") + SHOP_STOCK_SIZE + tr("ui. вещей от вашего уровня до +") + SHOP_LEVEL_UP + tr("ui.. Покупка — в ") + SHOP_BUY_MUL + tr("ui. раза дороже, чем завхоз платит за ту же вещь."),
      tr("ui.Прилавок обновляется сам через ") + SHOP_REFRESH_WINS + tr("ui. победы или на новом уровне; «Завезите новое» — сразу, за изоленту."),
      tr("ui.Продать — касанием по вещи в сумке; «Сдать хлам» продаёт все обычные вещи разом."),
      ['lore', tr("ui.Семёныч помнит каждую гайку на складе. И кто её не вернул.")]]),
    glossaryEntry(BANK_ICON, BANK_NAME, BANK_KEEPER.name + tr("ui. · у каждого персонажа свой"), [
      tr("ui.Сразу ") + BANK_BASE_SLOTS + tr("ui. ячеек. Ещё ") + BANK_BAG_SLOTS + tr("ui. гнёзд под сумки по +") + BANK_BAG_SIZE + tr("ui. ячеек — покупаются по очереди за изоленту."),
      ['list', tr("ui.Цены гнёзд: ") + BANK_BAG_PRICES.map(tapeText).join(' → ')],
      tr("ui.Касание по вещи перекладывает её между инвентарём и шкафчиком."),
      ['lore', BANK_QUOTES[0]]]),
    glossaryEntry(slotIcon('bag'), tr("ui.Сумки"), tr("ui.Место в инвентаре"), [
      tr("ui.Ячейки инвентаря дают только надетые сумки. Сумка в инвентаре занимает одну ячейку; надеть и снять — касанием по ней."),
      tr("ui.Без сумки вещи несут в руках — не больше ") + HANDS_SIZE + tr("ui.. Гнёзда для сумок пришивают до ") + BAG_NESTS_MAX + ': ' + BAG_NEST_EARLY_PRICES.concat(BAG_NEST_PRICES).map(p => p ? tapeText(p) : tr("ui.бесплатно")).join(' → ') + tr("ui.. Хотя бы одна сумка всегда надета."),
      tr("ui.Если снять сумку, а вещи не влезут, — лишнее выпадет на пол, и его тут же разворуют."),
      ['list', tr("ui.У Семёныча: ") + BAG_TYPES.filter(b => b.price > 0).map(b => b.name + ' (' + b.size + ', ' + tapeText(b.price) + ')').join(', ')],
      ['list', tr("ui.Стартовая: ") + findById(BAG_TYPES, BAG_START_TYPE).name + ' (' + findById(BAG_TYPES, BAG_START_TYPE).size + ').']]),
    glossaryEntry(BOARD_ICON, tr("ui.Доска объявлений"), tr("ui.Бункер или меню карты"), [
      tr("ui.Задания бывают четырёх видов. Прогресс идёт в боях, сдавать — на доске."),
      ...QUEST_CATEGORIES.map(c => ['list', c.name + ': ' + c.note]),
      tr("ui.Виды: победить врагов в локации, победить конкретного врага, одолеть элиту, собрать фишки (считаются и при поражении), одержать победы."),
      tr("ui.Награда — опыт, изолента, иногда магическая вещь; за элиту — всегда редкая."),
      ['list', tr("ui.Объявления пишут: ") + QUEST_GIVERS.map(g => g.name + ' (' + g.who + ')').join(', ')]])
  ];
}
