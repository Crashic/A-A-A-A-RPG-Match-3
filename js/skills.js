// Навыки классов по расам (документ автора; у Прессы — тексты автора для пресс-классов).
// Ключ — 'раса:класс'. У каждого навыка: name, lore (оттенок расы из документа),
// text — что навык делает в бою сейчас (адаптация к текущим механикам), и механика:
//   пассивный — type 'passive', effects: [{ on, ... }] (см. js/skillPassive*.js);
//   активный — type 'active', кнопка в бою: cost { sapphire|amethyst: мана }, once — раз за бой,
//     act — действие (см. js/useSkill.js); действия с полем тратят ход.
// Мана: sapphire — Металл, amethyst — Плёнка.
const SKILLS = {
  // ----- Совет Управляющих · Руинники -----
  'ruiners:engineer': [
    { id: 'weld', name: tr("ui.Инвентарная сварка"), type: 'passive',
      lore: tr("ui.Прочность не от качества, а от «учётной надёжности» — будто каждый прут заранее внесён в ведомость."),
      text: tr("ui.Серия из 3+ Металла даёт щит: +10% от наибольшего щита."),
      effects: [{ on: 'gather', gem: 'sapphire', min: 3, give: 'shieldPctMax', value: 10 }] },
    { id: 'remnants', name: tr("ui.Учёт остатков"), type: 'passive',
      lore: tr("ui.Экономия через отчётность: «то, что не списано, ещё пригодится»."),
      text: tr("ui.Бой начинается с запасом Металла — 15% от наибольшей маны (5)."),
      effects: [{ on: 'start', give: 'mana', gem: 'sapphire', value: 5 }] }
  ],
  'ruiners:scout': [
    { id: 'yardmark', name: tr("ui.Дворовой ориентир"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Ориентируется по табличкам «Не входить» и надписям на стенах — знает, где тайники «по умолчанию»."),
      text: tr("ui.Раз за бой, бесплатно: показывает лучший ход на поле. Ход не тратится."),
      act: 'show' },
    { id: 'quietpath', name: tr("ui.Тихий обход"), type: 'passive',
      lore: tr("ui.Выгода не в скорости, а в том, чтобы «не потревожить учётные журналы»."),
      text: tr("ui.Следующая серия после «Ориентира» даёт +5% ко всем эффектам; Документы всегда +5% опыта."),
      effects: [{ on: 'afterActive', pct: 5 }, { on: 'gemPct', gem: 'pearl', pct: 5 }] }
  ],
  'ruiners:guard': [
    { id: 'post', name: tr("ui.Пост по уставу"), type: 'active', cost: { sapphire: 8 }, once: false,
      lore: tr("ui.Сила в дисциплине и рутине: «главное — не шевелиться лишний раз»."),
      text: tr("ui.8 Металла: 3 хода врага его урон по вам −15%. Ход не тратится."),
      act: 'ward', pct: 15, turns: 3 },
    { id: 'passcheck', name: tr("ui.Проверка пропусков"), type: 'passive',
      lore: tr("ui.Бюрократическая защита: «без формы №3 не действует»."),
      text: tr("ui.Первый удар врага в бою ослаблен на 50%."),
      effects: [{ on: 'firstHit', pct: 50 }] }
  ],
  // ----- Совет Управляющих · Заводчане -----
  'factory:engineer': [
    { id: 'fitting', name: tr("ui.Цеховая подгонка"), type: 'passive',
      lore: tr("ui.Заводская смекалка: «если деталь не подходит, её можно доработать молотком и приказом»."),
      text: tr("ui.Серия из 4+ Деталей приносит «редкий лом»: +изолента (как за 3 радиации)."),
      effects: [{ on: 'gather', gem: 'aquamarine', min: 4, give: 'tape', value: 3 }] },
    { id: 'shiftlog', name: tr("ui.Сменный журнал"), type: 'passive',
      lore: tr("ui.Эффективность растёт с каждой «отработанной сменой»."),
      text: tr("ui.Каждые 5 ваших ходов Детали дают +1% щита (до +5%)."),
      effects: [{ on: 'stack', gem: 'aquamarine', every: 5, pct: 1, max: 5 }] }
  ],
  'factory:technician': [
    { id: 'calibrate', name: tr("ui.Полевая калибровка"), type: 'active', cost: { sapphire: 8 }, once: true,
      lore: tr("ui.Заводские технари знают, как «выжать» из оборудования ещё чуть-чуть."),
      text: tr("ui.Раз за бой, 8 Металла: меняет 1 фишку так, чтобы сложилась лучшая серия. Тратит ход."),
      act: 'calibrate' },
    { id: 'spare', name: tr("ui.Срочная замена"), type: 'passive',
      lore: tr("ui.У них всегда есть «запасная деталь под верстаком»."),
      text: tr("ui.Раз за бой: когда враг пробивает ваш щит до нуля, сразу ставит щит как за 2 Детали."),
      effects: [{ on: 'shieldBroken', gems: 2 }] }
  ],
  'factory:overseer': [
    { id: 'access', name: tr("ui.Контроль доступа"), type: 'active', cost: { sapphire: 10 }, once: false,
      lore: tr("ui.Не столько сила, сколько умение «запретить» противнику делать то, что он хочет."),
      text: tr("ui.10 Металла: 3 хода врага его урон по вам −30%. Ход не тратится."),
      act: 'ward', pct: 30, turns: 3 },
    { id: 'violation', name: tr("ui.Акт о нарушении"), type: 'passive',
      lore: tr("ui.Даже конфликт превращается в отчёт: «нарушение зафиксировано, меры приняты»."),
      text: tr("ui.Документы дают +10% опыта."),
      effects: [{ on: 'gemPct', gem: 'pearl', pct: 10 }] }
  ],
  // ----- Совет Управляющих · Подземники (адм.) -----
  'underAdm:technician': [
    { id: 'grease', name: tr("ui.Подземная смазка"), type: 'passive',
      lore: tr("ui.Знают, как заставить старую систему работать «ещё одну смену»."),
      text: tr("ui.Первая серия из 3+ Металла снижает урон врага по вам на 20% до конца боя."),
      effects: [{ on: 'gather', gem: 'sapphire', min: 3, give: 'dmgReduce', value: 20, once: true }] },
    { id: 'reserve', name: tr("ui.Аварийный резерв"), type: 'passive',
      lore: tr("ui.Запас прочности всегда держат «на крайний случай»."),
      text: tr("ui.Раз за бой: когда здоровье падает ниже 70%, восстанавливает 10% здоровья."),
      effects: [{ on: 'lowHp', below: 70, healPct: 10 }] }
  ],
  'underAdm:scout': [
    { id: 'echo', name: tr("ui.Эхо тоннеля"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Читают тоннели по звуку и запаху, а не по картам."),
      text: tr("ui.Раз за бой, бесплатно: показывает лучший ход на поле. Ход не тратится."),
      act: 'show' },
    { id: 'draft', name: tr("ui.Вентиляционный след"), type: 'passive',
      lore: tr("ui.Документы часто лежат там, где «тянет сквозняком»."),
      text: tr("ui.Документы дают +15% опыта."),
      effects: [{ on: 'gemPct', gem: 'pearl', pct: 15 }] }
  ],
  'underAdm:keeper': [
    { id: 'seal', name: tr("ui.Печать станции"), type: 'active', cost: { sapphire: 10 }, once: false,
      lore: tr("ui.Защита через «учёт и контроль»: «это место официально защищено»."),
      text: tr("ui.10 Металла: щит +20% от наибольшего. Ход не тратится."),
      act: 'shield', pctMax: 20 },
    { id: 'dutylog', name: tr("ui.Журнал дежурств"), type: 'passive',
      lore: tr("ui.Стабильность — это рутина: «пока журнал ведётся, станция держится»."),
      text: tr("ui.Каждый ваш ход Детали дают +0,5% щита (до +10%)."),
      effects: [{ on: 'stack', gem: 'aquamarine', every: 1, pct: 0.5, max: 10 }] }
  ],
  // ----- Союз Вольных · Степняки‑кочевники -----
  'steppe:nomad': [
    { id: 'steppemark', name: tr("ui.Степной ориентир"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Знают тропы, по которым ходят все, и где можно срезать."),
      text: tr("ui.Раз за бой, бесплатно: показывает ход, собирающий больше всего Топлива. Ход не тратится."),
      act: 'show', gem: 'ruby' },
    { id: 'quickdrain', name: tr("ui.Быстрый слив"), type: 'passive',
      lore: tr("ui.Время — главный ресурс: «чем быстрее уедем, тем дольше проживём»."),
      text: tr("ui.Серии из 3+ Топлива бьют на 5% сильнее."),
      effects: [{ on: 'gemPct', gem: 'ruby', min: 3, pct: 5 }] }
  ],
  'steppe:mechanic': [
    { id: 'fieldfix', name: tr("ui.Полевой ремонт"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Чинят «на коленке», но быстро."),
      text: tr("ui.Раз за бой, бесплатно: восстанавливает 15% здоровья. Ход не тратится."),
      act: 'heal', pct: 15 },
    { id: 'sparebolt', name: tr("ui.Запасной болт"), type: 'passive',
      lore: tr("ui.Всегда носят с собой «запасной болт и изоленту»."),
      text: tr("ui.Если ход дал только одну серию (без каскада), вы получаете щит как за 1 Деталь."),
      effects: [{ on: 'single', give: 'shield', value: 1 }] }
  ],
  'steppe:raider': [
    { id: 'quickstart', name: tr("ui.Резкий старт"), type: 'passive',
      lore: tr("ui.Ставка на первый удар: «если не вышло сразу, лучше уйти»."),
      text: tr("ui.Первые 3 ваших хода все эффекты фишек +15%."),
      effects: [{ on: 'allPct', firstTurns: 3, pct: 15 }] },
    { id: 'decoy', name: tr("ui.Ложная цель"), type: 'active', cost: { amethyst: 8 }, once: false,
      lore: tr("ui.Отвлекают внимание, чтобы уйти чистыми."),
      text: tr("ui.8 Плёнки: приманка полностью поглощает следующий удар врага. Ход не тратится."),
      act: 'ward', pct: 100, hits: 1 }
  ],
  // ----- Союз Вольных · Лесные -----
  'forest:forester': [
    { id: 'woodsense', name: tr("ui.Лесная чуйка"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Чувствуют растения по запаху и звуку: «лес сам подсказывает, где искать»."),
      text: tr("ui.Раз за бой, бесплатно: показывает ход, собирающий больше всего Трав. Ход не тратится."),
      act: 'show', gem: 'emerald' },
    { id: 'greenharvest', name: tr("ui.Зелёный сбор"), type: 'passive',
      lore: tr("ui.Собирают не просто травы, а «те самые», что растут в нужных местах."),
      text: tr("ui.Серия из 4+ Трав приносит редкий ингредиент: +изолента (как за 3 радиации)."),
      effects: [{ on: 'gather', gem: 'emerald', min: 4, give: 'tape', value: 3 }] }
  ],
  'forest:herbalist': [
    { id: 'tincture', name: tr("ui.Быстрая настойка"), type: 'active', cost: { amethyst: 10 }, once: true,
      lore: tr("ui.Умеют «выжимать» пользу из того, что есть под рукой."),
      text: tr("ui.Раз за бой, 10 Плёнки: превращает 3 фишки в Травы так, чтобы сложилась серия. Тратит ход."),
      act: 'convert', to: 'emerald', n: 3 },
    { id: 'bitter', name: tr("ui.Горький барьер"), type: 'passive',
      lore: tr("ui.Природа защищает, но жёстко: «лучше горькая правда, чем сладкая смерть»."),
      text: tr("ui.Сбор Трав ослабляет следующий удар врага на 25%."),
      effects: [{ on: 'gather', gem: 'emerald', min: 3, give: 'ward', value: 25 }] }
  ],
  'forest:ambusher': [
    { id: 'leafshade', name: tr("ui.Тени листвы"), type: 'active', cost: { amethyst: 8 }, once: false,
      lore: tr("ui.Прячутся там, где листва гуще, и знают, где тень падает правильно."),
      text: tr("ui.8 Плёнки: 3 хода врага его урон по вам −20%. Ход не тратится."),
      act: 'ward', pct: 20, turns: 3 },
    { id: 'firststrike', name: tr("ui.Первый удар"), type: 'passive',
      lore: tr("ui.Ставка на внезапность: «тот, кто видит первым, побеждает»."),
      text: tr("ui.Первая серия боя и первая серия после навыка дают +20% ко всем эффектам."),
      effects: [{ on: 'afterActive', pct: 20, first: true }] }
  ],
  // ----- Союз Вольных · Подземники (незав.) -----
  'underFree:scout': [
    { id: 'airsmell', name: tr("ui.Запах воздуха"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Определяют ценность по запаху: «если пахнет старым железом и пылью — там что-то ценное»."),
      text: tr("ui.Раз за бой, бесплатно: показывает ход, собирающий больше всего Радиации (изоленты). Ход не тратится."),
      act: 'show', gem: 'topaz' },
    { id: 'bypass', name: tr("ui.Тоннельный обход"), type: 'passive',
      lore: tr("ui.Знают «обходные пути», где патрули не ходят."),
      text: tr("ui.Сбор Радиации ослабляет следующий удар врага на 20%."),
      effects: [{ on: 'gather', gem: 'topaz', min: 3, give: 'ward', value: 20 }] }
  ],
  'underFree:technician': [
    { id: 'solder', name: tr("ui.Подпольная пайка"), type: 'active', cost: { sapphire: 8 }, once: true,
      lore: tr("ui.Работают с тем, что нашли в старых щитках: «если нет новой детали, сделаем из двух старых одну хорошую»."),
      text: tr("ui.Раз за бой, 8 Металла: ваш следующий ход +20% ко всем эффектам. Ход не тратится."),
      act: 'buff', pct: 20, turns: 1 },
    { id: 'emergency', name: tr("ui.Аварийное питание"), type: 'passive',
      lore: tr("ui.Держат «тайный аккумулятор» на крайний случай."),
      text: tr("ui.Раз за бой: когда здоровье падает ниже 30%, восстанавливает 20% здоровья."),
      effects: [{ on: 'lowHp', below: 30, healPct: 20 }] }
  ],
  'underFree:guide': [
    { id: 'knownpath', name: tr("ui.Знакомая тропа"), type: 'passive',
      lore: tr("ui.Водят только проверенными путями: «если я это уже проходил, значит, безопасно»."),
      text: tr("ui.Радиация даёт на 25% больше изоленты."),
      effects: [{ on: 'gemPct', gem: 'topaz', pct: 25 }] },
    { id: 'warning', name: tr("ui.Тихое предупреждение"), type: 'passive',
      lore: tr("ui.Слышат шаги раньше, чем видят врага: «предупреждён — значит, не попался»."),
      text: tr("ui.Урон врага по вам −10% весь бой."),
      effects: [{ on: 'dmgReduce', pct: 10 }] }
  ],
  // ----- Пресса (тексты автора) -----
  'press:archivist': [
    { id: 'blindledger', name: tr("ui.Слепая ведомость"), type: 'active', cost: {}, once: true,
      lore: tr("ui.Берёт приёмы у Совета — читает «по документам», а не по глазам: «если в журнале сказано, что тут металл, значит, тут металл»."),
      text: tr("ui.Раз за бой, бесплатно: показывает лучший ход на поле. Ход не тратится."),
      act: 'show' },
    { id: 'papertrail', name: tr("ui.Бумажный след"), type: 'passive',
      lore: tr("ui.Бюрократия как разведка: «самая опасная вещь в руинах — это правильно заполненный акт»."),
      text: tr("ui.Серии из 3+ Документов дают +15% опыта."),
      effects: [{ on: 'gemPct', gem: 'pearl', min: 3, pct: 15 }] }
  ],
  'press:bard': [
    { id: 'rumorsong', name: tr("ui.Песня‑слух"), type: 'active', cost: { amethyst: 10 }, once: true,
      lore: tr("ui.Берёт у Союза Вольных свободу и скорость: «слух летит быстрее пули, особенно если его правильно спеть»."),
      text: tr("ui.Раз за бой, 10 Плёнки: 2 ваших хода все серии +10%. Ход не тратится."),
      act: 'buff', pct: 10, turns: 2 },
    { id: 'falsenote', name: tr("ui.Ложная нота"), type: 'passive',
      lore: tr("ui.Импровизация вместо точности: «если нельзя доказать — можно хотя бы записать»."),
      text: tr("ui.Если ход дал только одну серию (без каскада), 1 случайная фишка становится Документом."),
      effects: [{ on: 'single', give: 'pearl' }] }
  ],
  'press:chronicler': [
    { id: 'timeskip', name: tr("ui.Разрыв хронологии"), type: 'active', cost: { amethyst: 10 }, once: false,
      lore: tr("ui.Нейтральность и гибкость: «факт можно оспорить, запись — нет, пока её не перечёркнут»."),
      text: tr("ui.10 Плёнки: «вычёркивает» последний ход врага — возвращает отнятые им здоровье и щит. Ход не тратится."),
      act: 'undo' },
    { id: 'margins', name: tr("ui.Пометка на полях"), type: 'passive',
      lore: tr("ui.Фиксирует даже то, что не должно быть замечено: «главное — чтобы было где посмотреть потом»."),
      text: tr("ui.Серия 4+ даёт «редкий документ» (+опыт как за 2 Документа) и пометку: в следующем бою — щит как за 1 Деталь за каждую (до 5)."),
      effects: [{ on: 'notes', max: 5 }] }
  ]
};
// Адаптированные классы Прессы берут навыки своей фракции:
// Инженер и Надзиратель — как у Заводчан, Механик — как у Степняков, Засадник — как у Лесных.
const PRESS_SKILL_SOURCE = { engineer: 'factory', overseer: 'factory', mechanic: 'steppe', ambusher: 'forest' };
