// Обучение: шаги-подсказки (кружок вокруг элемента, стрелка и пояснение). screen — на каком экране,
// sel — что обвести (первый видимый), when — когда показывать (по умолчанию — всегда, пока не просмотрен).
// auto: true — шаг создания персонажа: идёт сам по мере выбора (кнопки «Понятно» нет, «просмотренным» не считается).
// Остальные показываются один раз для персонажа (hero.tutorial.seen), по кнопке «Понятно» — следующий.
const TUTORIAL_STEPS = [
  // создание персонажа
  { id: 'c-mode', screen: 'create', auto: true, sel: '.pick.mode', when: () => creation && creation.step === 'server' && !creation.draft.modeId,
    text: 'Добро пожаловать в пустоши! Сначала выберите режим игры. Пока он ни на что не влияет — берите тот, что смешнее звучит.' },
  { id: 'c-mode-next', screen: 'create', auto: true, sel: '#createRight .btn.green', when: () => creation && creation.step === 'server' && creation.draft.modeId,
    text: 'Отлично. Теперь — к происхождению.' },
  { id: 'c-faction', screen: 'create', auto: true, sel: '.pick.faction', when: () => creation && creation.step === 'origin' && !creation.draft.factionId,
    text: 'Выберите фракцию: Совет Управляющих или Союз Вольных. Пресса — посередине, она сама себе фракция.' },
  { id: 'c-race', screen: 'create', auto: true, sel: '.pick.race:not(.dim)', when: () => creation && creation.step === 'origin' && creation.draft.factionId && !creation.draft.raceId,
    text: 'Теперь раса. У каждой — свои бонусы к классам и своя стартовая локация.' },
  { id: 'c-toclass', screen: 'create', auto: true, sel: '#createRight .btn.green', when: () => creation && creation.step === 'origin' && creation.draft.raceId,
    text: 'Раса выбрана. Жмите «Выбрать класс».' },
  { id: 'c-class', screen: 'create', auto: true, sel: '.pick.cls:not(.dim)', when: () => creation && creation.step === 'class' && !creation.draft.classId,
    text: 'Выберите класс. Справа видно его навыки и характеристики.' },
  { id: 'c-name', screen: 'create', auto: true, sel: '#heroName', when: () => creation && creation.step === 'class' && creation.draft.classId && !creation.draft.name.trim(),
    text: 'Введите имя выжившего — или нажмите кубик «Случайно» справа вверху, если фантазия кончилась вместе с цивилизацией.' },
  { id: 'c-create', screen: 'create', auto: true, sel: '#createHero', when: () => creation && creation.step === 'class' && creation.draft.classId && creation.draft.name.trim(),
    text: 'Осталось выбрать пол и нажать «Создать персонажа».' },
  // бой
  { id: 'b-board', screen: 'game', sel: '#board', text: 'Это поле. Меняйте местами две соседние фишки (перетащить или два касания), чтобы собрать 3 в ряд. Ряд из 4+ или группа из 5 — ещё один ход.' },
  { id: 'b-hero', screen: 'game', sel: '#heroPanel', text: 'Это вы. Красное — здоровье, ниже — щит и три маны. Кончится здоровье — бой проигран.' },
  { id: 'b-legend', screen: 'game', sel: '#btnLegend', text: 'Что даёт каждая фишка: Топливо — урон, Детали — щит, Металл/Травы/Плёнка — мана, Документы — опыт, Радиация — изолента. Забыли — жмите сюда.' },
  { id: 'b-skills', screen: 'game', sel: '.heroSkillBtns .skillBtn', text: 'Навыки. Копите ману нужного цвета и жмите — большинство не тратят ход.' },
  { id: 'b-enemy', screen: 'game', sel: '#enemyPanel', text: 'Враг. Он ходит после вас теми же фишками. Коснитесь панели — увидите его характеристики и навыки.' },
  { id: 'b-log', screen: 'game', sel: '#battleLog', text: 'Лог боя: кто сколько накопал и ударил.' },
  { id: 'b-menu', screen: 'game', sel: '#btnBattleMenu', text: 'Меню боя: персонаж, задания, глоссарий, «Сдаться» и выход в главное меню.' },
  // экраны меню
  { id: 'm-map', screen: 'map', sel: '#zoneList', text: 'Карта врагов: слева локации, справа — кто там водится. Выберите врага, чтобы начать бой.' },
  { id: 'm-side', screen: 'map', sel: '.screen.active .sideMenu', text: 'Столбец меню: бункер, лагерь, карта, персонаж, задания, глоссарий. Последний домик — в главное меню.' },
  { id: 'm-bunker', screen: 'map', sel: '.screen.active .sideMenu .btn:nth-child(1)', text: 'Бункер: завхоз Семёныч (торговля и сумки), шкафчик для вещей и доска объявлений с заданиями.' },
  { id: 'm-camp', screen: 'map', sel: '.screen.active .sideMenu .btn:nth-child(2)', when: () => campUnlocked(), text: 'Лагерь — общий для всех ваших персонажей: общак, реестр компенсаций и будущие постройки.' },
  { id: 'm-char', screen: 'character', sel: '#charRight', text: 'Инвентарь: место дают сумки. Коснитесь вещи — надеть, сравнить, выбросить.' },
  { id: 'm-stats', screen: 'character', sel: '#charLeft', text: 'Слева — кукла и характеристики. С 2-го уровня даются очки: раздайте их кнопками «+».' },
  { id: 'm-quests', screen: 'quests', sel: '#questsLeft', text: 'Доска объявлений: поручения и ежедневные. Взяли — выполняйте в боях — сдавайте за опыт и изоленту.' },
  { id: 'm-campscreen', screen: 'camp', sel: '.campGrid', text: 'Постройки лагеря. Реестр даёт компенсации всем персонажам — очки за каждые 5 уровней.' }
];
