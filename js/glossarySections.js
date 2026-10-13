// Разделы глоссария: вкладка и функция, которая строит страницу из данных игры.
// Всё берётся из файлов данных, поэтому новые фракции, классы, навыки и враги появляются в книге сами.
// Новый вид данных (предметы, квесты…) — новый раздел здесь и свой файл glossary<Раздел>.js.
const GLOSSARY_SECTIONS = [
  { id: 'gems',     name: tr("ui.Фишки"),          build: glossaryGems },
  { id: 'battle',   name: tr("ui.Бой"),            build: glossaryBattle },
  { id: 'factions', name: tr("ui.Фракции"),        build: glossaryFactions },
  { id: 'races',    name: tr("ui.Расы"),           build: glossaryRaces },
  { id: 'classes',  name: tr("ui.Классы"),         build: glossaryClasses },
  { id: 'stats',    name: tr("ui.Характеристики"), build: glossaryStats },
  { id: 'skills',   name: tr("ui.Навыки"),         build: glossarySkills },
  { id: 'zones',    name: tr("ui.Локации и враги"), build: glossaryZones },
  { id: 'items',    name: tr("ui.Предметы"),       build: glossaryItems },
  { id: 'bunker',   name: tr("ui.Бункер"),         build: glossaryBunker },
  { id: 'camp',     name: tr("ui.Лагерь"),         build: glossaryCamp },
  { id: 'paragon',  name: tr("ui.Реестр"),         build: glossaryParagon },
  { id: 'servers',  name: tr("ui.Серверы"),        build: glossaryServers },
  { id: 'progress', name: tr("ui.Опыт и изолента"), build: glossaryProgress }
];
