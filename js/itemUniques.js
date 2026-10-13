// Уникальные предметы: своё имя, база (ITEM_BASES), уровень, с которого могут выпасть, и свойства.
// Числа в mods — в «долях силы»: 1 = верхняя граница случайного свойства на уровне предмета
// (itemAffixRange), так уникальные растут вместе с уровнем. id свойств — как в ITEM_AFFIXES.
const ITEM_UNIQUES = [
  { id: 'gensek',   base: 'ushanka',    minLevel: 10, name: tr("ui.Ушанка Генсека"),               mods: { int: 2, spi: 1 },          lore: tr("ui.Одно ухо всегда поднято — слушает, что говорят в бункере.") },
  { id: 'breathe',  base: 'gasmask',    minLevel: 1,  name: tr("ui.Противогаз «Дыши глубже»"),     mods: { sta: 2, hp: 1 },           lore: tr("ui.Фильтр 1983 года. Пахнет резиной и надеждой.") },
  { id: 'sandbox',  base: 'epaulets',   minLevel: 5,  name: tr("ui.Погоны Генерала Песочницы"),    mods: { str: 2, crit: 1 },         lore: tr("ui.Командовал армией солдатиков. Проиграл коту.") },
  { id: 'udarnik',  base: 'gtobadge',   minLevel: 1,  name: tr("ui.Значок «Ударник пятилетки»"),   mods: { str: 1, agi: 1, sta: 1 },  lore: tr("ui.Пятилетка кончилась, а ударник остался.") },
  { id: 'unkillable', base: 'quilted',  minLevel: 15, name: tr("ui.Ватник Неубиваемый"),           mods: { sta: 3, hp: 1 },           lore: tr("ui.Пережил три войны, два потопа и одну стирку.") },
  { id: 'striped',  base: 'telnyashka', minLevel: 8,  name: tr("ui.Тельняшка Бывалого"),           mods: { str: 1, agi: 1, crit: 1 }, lore: tr("ui.Бывалый уже не помнит, где бывал. Но был везде.") },
  { id: 'empty',    base: 'bandolier',  minLevel: 1,  name: tr("ui.Патронташ без патронов"),       mods: { agi: 2, tape: 1 },         lore: tr("ui.Зато звенит солидно.") },
  { id: 'frost',    base: 'mittens',    minLevel: 12, name: tr("ui.Рукавицы Деда Мороза"),         mods: { spi: 2, sta: 1 },          lore: tr("ui.Подарков не будет. Будет обморожение.") },
  { id: 'allpower', base: 'signet',     minLevel: 20, name: tr("ui.Перстень Всевластия Завхоза"),  mods: { tape: 2, int: 1 },         lore: tr("ui.Одно кольцо, чтобы списать их всех.") },
  { id: 'fate',     base: 'nut',        minLevel: 6,  name: tr("ui.Гайка Судьбы"),                 mods: { crit: 2, agi: 1 },         lore: tr("ui.Закручивается только по часовой. Как и судьба.") },
  { id: 'olympic',  base: 'trackpants', minLevel: 3,  name: tr("ui.Треники Олимпийца-80"),         mods: { agi: 3 },                  lore: tr("ui.Вытянутые коленки — признак большой скорости.") },
  { id: 'runner',   base: 'kirza',      minLevel: 4,  name: tr("ui.Кирзачи Скорохода"),            mods: { agi: 1, sta: 2 },          lore: tr("ui.Портянки намотаны по уставу. Бегут сами.") },
  { id: 'lastword', base: 'rebar',      minLevel: 10, name: tr("ui.Арматура «Последний довод»"),   mods: { str: 3, crit: 1 },         lore: tr("ui.Аргумент, после которого спор окончен.") },
  { id: 'knowall',  base: 'manual',     minLevel: 7,  name: tr("ui.Справочник Всезнайки"),         mods: { int: 2, xp: 1 },           lore: tr("ui.Том первый. Остальные пошли на растопку.") },
  { id: 'mazut',    base: 'censer',     minLevel: 18, name: tr("ui.Кадило Отца Мазута"),           mods: { spi: 3 },                  lore: tr("ui.Окуривает от радиации. Радиация в недоумении.") },
  { id: 'firmness', base: 'runehard',   minLevel: 25, name: tr("ui.Руна «Ъ» Несгибаемости"),       mods: { str: 1, sta: 1, spi: 1 },  lore: tr("ui.Её отменили в 1918-м. Она не согласилась.") }
];
