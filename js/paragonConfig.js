// «Реестр Героев и Пострадавших» — парагон как в Diablo 3, общий для аккаунта (acc.paragon = { ranks: { id: n } }).
// Очки: за каждые PARAGON_LEVEL_STEP уровней каждого персонажа аккаунта — 1 очко (paragonPoints).
// Узлы — «компенсации» на паутинке: x, y — место на сетке (0–6 × 0–4), links — соседние узлы
// (взять можно, если у любого соседа есть хоть один ранг; корень — root), max — сколько рангов.
// Эффект за ранг (kind): stat (id — str/agi/sta/int/spi), hpPct, atkPct, critPct, ini, shieldStart (доля от макс. щита, %),
// manaStart (gem), tapePct, xpPct; active — свой навык в бою (skill — как активные навыки, раз за бой).
const PARAGON_NAME = tr("ui.Реестр Героев и Пострадавших");
const PARAGON_LEVEL_STEP = 5;
const PARAGON_NODES = [
  { id: 'claim',  no: 1,   x: 3, y: 2, root: true, max: 1, kind: 'hpPct', value: 3, links: ['sta1', 'str1', 'int1', 'spi1'],
    name: tr("ui.Заявление о признании"), reason: tr("ui.подано в трёх экземплярах, один съела крыса") },
  { id: 'str1',   no: 77,  x: 2, y: 1, max: 3, kind: 'stat', stat: 'str', value: 1, links: ['claim', 'atk', 'agi1'],
    name: tr("ui.Компенсация за натёртые ладони"), reason: tr("ui.длительное использование самодельного оружия") },
  { id: 'atk',    no: 112, x: 1, y: 0, max: 3, kind: 'atkPct', value: 2, links: ['str1', 'crit'],
    name: tr("ui.Надбавка за вредность удара"), reason: tr("ui.систематические удары по чужому имуществу") },
  { id: 'crit',   no: 404, x: 0, y: 1, max: 2, kind: 'critPct', value: 1, links: ['atk', 'strike'],
    name: tr("ui.Справка о меткости"), reason: tr("ui.попал в военкомат с первого раза") },
  { id: 'strike', no: 13,  x: 0, y: 3, max: 1, kind: 'active', links: ['crit', 'agi1'],
    skill: { id: 'p-strike', name: tr("ui.Встречный иск"), type: 'active', once: true, cost: {}, act: 'strike', mult: 3,
      text: tr("ui.Раз за бой, бесплатно: урон ×3 от атаки. Ход не тратится."), lore: tr("ui.Подан молча, удовлетворён немедленно.") },
    name: tr("ui.Право на встречный иск"), reason: tr("ui.пострадал от действий противника, хочет пострадать в ответ") },
  { id: 'agi1',   no: 9,   x: 1, y: 2, max: 3, kind: 'stat', stat: 'agi', value: 1, links: ['str1', 'strike', 'ini'],
    name: tr("ui.Пособие на быстрые ноги"), reason: tr("ui.регулярное убегание от последствий") },
  { id: 'ini',    no: 1917, x: 2, y: 3, max: 3, kind: 'ini', value: 1, links: ['agi1', 'claim', 'tape'],
    name: tr("ui.Удостоверение льготника"), reason: tr("ui.право проходить без очереди, в том числе в бой") },
  { id: 'tape',   no: 58,  x: 2, y: 4, max: 3, kind: 'tapePct', value: 4, links: ['ini', 'xp'],
    name: tr("ui.Субсидия на изоленту"), reason: tr("ui.утрата личного имущества при неустановленных обстоятельствах") },
  { id: 'xp',     no: 61,  x: 4, y: 4, max: 3, kind: 'xpPct', value: 4, links: ['tape', 'int1'],
    name: tr("ui.Стипендия за выживание"), reason: tr("ui.успешное несдохновение в течение отчётного периода") },
  { id: 'sta1',   no: 3,   x: 4, y: 1, max: 3, kind: 'stat', stat: 'sta', value: 1, links: ['claim', 'hp', 'spi1'],
    name: tr("ui.Компенсация за синяки"), reason: tr("ui.многократные удары по лицу при исполнении") },
  { id: 'hp',     no: 101, x: 5, y: 0, max: 3, kind: 'hpPct', value: 3, links: ['sta1', 'shield'],
    name: tr("ui.Путёвка в санаторий (не выдана)"), reason: tr("ui.санаторий взорван, путёвка засчитана здоровьем") },
  { id: 'shield', no: 202, x: 6, y: 1, max: 2, kind: 'shieldStart', value: 10, links: ['hp', 'aid'],
    name: tr("ui.Каска за счёт профсоюза"), reason: tr("ui.падение предметов с высоты, в том числе неба") },
  { id: 'aid',    no: 103, x: 6, y: 3, max: 1, kind: 'active', links: ['shield', 'spi1'],
    skill: { id: 'p-aid', name: tr("ui.Больничный лист"), type: 'active', once: true, cost: {}, act: 'heal', pct: 15,
      text: tr("ui.Раз за бой, бесплатно: восстанавливает 15 % здоровья. Ход не тратится."), lore: tr("ui.Освобождён от смерти на три дня.") },
    name: tr("ui.Право на больничный"), reason: tr("ui.хронический бой средней тяжести") },
  { id: 'spi1',   no: 7,   x: 5, y: 2, max: 3, kind: 'stat', stat: 'spi', value: 1, links: ['sta1', 'aid', 'mana'],
    name: tr("ui.Талон на моральную поддержку"), reason: tr("ui.утрата веры в светлое будущее") },
  { id: 'int1',   no: 42,  x: 4, y: 3, max: 3, kind: 'stat', stat: 'int', value: 1, links: ['claim', 'xp', 'mana'],
    name: tr("ui.Возмещение за прочитанные инструкции"), reason: tr("ui.вынужденное чтение мелкого шрифта") },
  { id: 'mana',   no: 220, x: 6, y: 4, max: 2, kind: 'manaStart', gem: 'topaz', value: 2, links: ['spi1', 'int1'],
    name: tr("ui.Паёк Радиации на старт"), reason: tr("ui.выдан по ошибке, возврату не подлежит") }
];
const PARAGON_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="3" width="20" height="26" rx="2" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="2"/>' +
  '<path d="M10 9 L22 9 M10 13 L22 13 M10 17 L18 17" stroke="var(--ui-metal)" stroke-width="1.6" stroke-linecap="round"/>' +
  '<circle cx="20" cy="23" r="4.5" fill="var(--gem-ruby)" stroke="var(--ui-outline)" stroke-width="1.5"/>' +
  '<path d="M18 23 L19.5 24.5 L22.5 21.5" fill="none" stroke="var(--ui-parchment)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
