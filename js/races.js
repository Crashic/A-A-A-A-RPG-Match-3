// Расы (таблицы 3–5 автора). factionId — фракция: у Совета и Союза по три расы,
// Пресса — фракция и раса сразу. classes — доступные классы с бонусами.
// bonus: text — подпись, gem — ресурс-фишка, которую усиливает (+pct %), если есть.
const RACES = [
  { id: 'ruiners', name: tr("ui.Руинники"), factionId: 'council', icon: 'ruins', color: 'var(--gem-sapphire)',
    note: tr("ui.«Потерять прут в картотеке — тоже успех: значит, он учтён»"),
    unavailable: 'nomad',
    classes: {
      engineer: { text: tr("ui.+1% к Арматуре"), gem: 'sapphire', pct: 1 },
      scout:    { text: tr("ui.+1% к тайникам") },
      guard:    { text: tr("ui.+1% к удержанию точек") } } },
  { id: 'factory', name: tr("ui.Заводчане"), factionId: 'council', icon: 'factory', color: 'var(--gem-sapphire)',
    note: tr("ui.«Деталь сначала опись, потом ломается. Отчётность должна быть идеальной»"),
    unavailable: 'forester',
    classes: {
      engineer:   { text: tr("ui.+1% к Деталям"), gem: 'aquamarine', pct: 1 },
      technician: { text: tr("ui.+1% к починке") },
      overseer:   { text: tr("ui.+1% к предотвращению саботажа") } } },
  { id: 'underAdm', name: tr("ui.Подземники (адм.)"), factionId: 'council', icon: 'tunnel', color: 'var(--gem-sapphire)',
    note: tr("ui.«У каждого фильтра есть номер, подпись и истёкший срок годности. Документ важнее состояния»"),
    unavailable: 'nomad',
    classes: {
      technician: { text: tr("ui.+1% к Аккумуляторам/Фильтрам") },
      scout:      { text: tr("ui.+1% к навигации") },
      keeper:     { text: tr("ui.+1% к защите станций") } } },
  { id: 'steppe', name: tr("ui.Степняки‑кочевники"), factionId: 'union', icon: 'wheel', color: 'var(--gem-emerald)',
    note: tr("ui.«Собрать двигатель из трёх сломанных, одной верёвки и молитвы — обычное дело»"),
    unavailable: 'overseer',
    classes: {
      nomad:    { text: tr("ui.+1% к Топливу"), gem: 'ruby', pct: 1 },
      mechanic: { text: tr("ui.+1% к полевой починке") },
      raider:   { text: tr("ui.+1% к успешности рейдов") } } },
  { id: 'forest', name: tr("ui.Лесные"), factionId: 'union', icon: 'tree', color: 'var(--gem-emerald)',
    note: tr("ui.«Если трава не светится и не шипит — уже хорошо»"),
    unavailable: 'engineer',
    classes: {
      forester:  { text: tr("ui.+1% к Травам"), gem: 'emerald', pct: 1 },
      herbalist: { text: tr("ui.+1% к зельям") },
      ambusher:  { text: tr("ui.+1% к незаметности") } } },
  { id: 'underFree', name: tr("ui.Подземники (незав.)"), factionId: 'union', icon: 'tunnel', color: 'var(--gem-emerald)',
    note: tr("ui.«Знает, где пол уже провалился, но ещё не до конца. Ведёт так, чтобы никто не запаниковал»"),
    unavailable: 'overseer',
    classes: {
      scout:      { text: tr("ui.+1% к воде/тоннелям") },
      technician: { text: tr("ui.+1% к системам жизнеобеспечения") },
      guide:      { text: tr("ui.+1% к безопасному переходу") } } },
  { id: 'press', name: tr("ui.Пресса"), factionId: 'press', icon: 'mic', color: 'var(--gem-amethyst)',
    note: tr("ui.«Свежий взгляд помнит, как всё было устроено на прошлой стороне. Лучший репортаж бесит обе стороны одинаково»"),
    classes: {
      // side — к какой фракции относится класс: от неё зависят стартовая локация и карта Прессы
      // адаптированные от Совета Управляющих
      engineer:   { side: 'council', text: tr("ui.+1% к Деталям, +0,5% к уязвимостям"), gem: 'aquamarine', pct: 1 },
      overseer:   { side: 'council', text: tr("ui.+1% к саботажу, +0,5% к редким документам") },
      // адаптированные от Союза Вольных
      mechanic:   { side: 'union', text: tr("ui.+1% к починке, +0,5% к слухам") },
      ambusher:   { side: 'union', text: tr("ui.+1% к незаметности, +0,5% к фиксации действий") },
      // уникальные пресс-классы: Архивариус — Совета, Бард — Союза, Хронист — нейтральный
      archivist:  { side: 'council', text: tr("ui.Уникальный пресс-класс") },
      bard:       { side: 'union', text: tr("ui.Уникальный пресс-класс") },
      chronicler: { side: null, text: tr("ui.+1% к сохранению информации") } } }
];
