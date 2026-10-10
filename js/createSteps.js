// Шаги создания персонажа — по экрану на шаг, в этом порядке.
// field — куда записывается выбор в персонажа; options — справочник вариантов.
// Чтобы добавить шаг, достаточно дописать его сюда (и при необходимости справочник).
const CREATE_STEPS = [
  { id: 'name',    title: 'Имя',     hint: 'Как зовут героя?',      field: 'name' },
  { id: 'class',   title: 'Класс',   hint: 'Выберите класс',        field: 'classId',   options: () => CLASSES },
  { id: 'gender',  title: 'Пол',     hint: 'Выберите пол',          field: 'genderId',  options: () => GENDERS },
  { id: 'race',    title: 'Раса',    hint: 'Выберите расу',         field: 'raceId',    options: () => RACES },
  { id: 'faction', title: 'Фракция', hint: 'Выберите фракцию',      field: 'factionId', options: () => FACTIONS }
];
const NAME_MAX_LENGTH = 16;
