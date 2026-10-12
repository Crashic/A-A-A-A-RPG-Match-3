// Разделы глоссария: вкладка и функция, которая строит страницу из данных игры.
// Всё берётся из файлов данных, поэтому новые фракции, классы, навыки и враги появляются в книге сами.
// Новый вид данных (предметы, квесты…) — новый раздел здесь и свой файл glossary<Раздел>.js.
const GLOSSARY_SECTIONS = [
  { id: 'gems',     name: 'Фишки',          build: glossaryGems },
  { id: 'battle',   name: 'Бой',            build: glossaryBattle },
  { id: 'factions', name: 'Фракции',        build: glossaryFactions },
  { id: 'races',    name: 'Расы',           build: glossaryRaces },
  { id: 'classes',  name: 'Классы',         build: glossaryClasses },
  { id: 'stats',    name: 'Характеристики', build: glossaryStats },
  { id: 'skills',   name: 'Навыки',         build: glossarySkills },
  { id: 'zones',    name: 'Локации и враги', build: glossaryZones },
  { id: 'items',    name: 'Предметы',       build: glossaryItems },
  { id: 'progress', name: 'Опыт и изолента', build: glossaryProgress }
];
