// Карта вылазок: зоны на поверхности с диапазоном уровней, как в World of Warcraft.
// Сеттинг — постапокалипсис в фэнтезийной России: герой выходит из бункера за провизией.
// Враг: id, name, level, hp/atk — множители характеристик, elite — элита (сильнее, опыт ×2).
const ZONES = [
  { id: 'yard', name: 'Двор у бункера', min: 1, max: 10, enemies: [
    { id: 'rat',       name: 'Крыса-мутант',          level: 1,  hp: 0.8, atk: 0.8 },
    { id: 'dog',       name: 'Бродячий пёс',          level: 3,  hp: 0.9, atk: 1.0 },
    { id: 'drone',     name: 'Ржавый дрон',           level: 6,  hp: 1.0, atk: 1.0 },
    { id: 'boar',      name: 'Матёрый кабан-мутант',  level: 10, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'garages', name: 'Гаражный кооператив', min: 10, max: 20, enemies: [
    { id: 'looter',    name: 'Гаражник-мародёр',      level: 11, hp: 0.9, atk: 1.0 },
    { id: 'barbos',    name: 'Робот-сторож «Барбос»', level: 14, hp: 1.2, atk: 0.9 },
    { id: 'moonshiner',name: 'Самогонщица',           level: 17, hp: 0.9, atk: 1.2 },
    { id: 'chairman',  name: 'Председатель ГСК',      level: 20, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'blocks', name: 'Хрущёвки-призраки', min: 20, max: 30, enemies: [
    { id: 'crows',     name: 'Стая ворон',            level: 21, hp: 0.8, atk: 1.1 },
    { id: 'gopnik',    name: 'Гопник в противогазе',  level: 24, hp: 1.0, atk: 1.0 },
    { id: 'lift',      name: 'Лифт-людоед',           level: 27, hp: 1.3, atk: 1.0 },
    { id: 'housing',   name: 'Управдом',              level: 30, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'plant', name: 'Химзавод «Заря»', min: 30, max: 40, enemies: [
    { id: 'slime',     name: 'Кислотный слизень',     level: 32, hp: 1.0, atk: 1.1 },
    { id: 'liquidator',name: 'Ликвидатор',            level: 35, hp: 0.9, atk: 1.1 },
    { id: 'cyberguard',name: 'Кибер-вахтёр',          level: 37, hp: 0.8, atk: 1.3 },
    { id: 'director',  name: 'Директор завода',       level: 40, hp: 1.1, atk: 0.9, elite: true }
  ] },
  { id: 'metro', name: 'Метро «Глубинная»', min: 40, max: 50, enemies: [
    { id: 'ghoul',     name: 'Тоннельный упырь',      level: 42, hp: 0.8, atk: 1.2 },
    { id: 'trolley',   name: 'Дрезинщик',             level: 45, hp: 1.4, atk: 0.9 },
    { id: 'ratking',   name: 'Крысиный король',       level: 47, hp: 1.0, atk: 1.1 },
    { id: 'stationboss', name: 'Начальник станции',   level: 50, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'highway', name: 'Ледяная трасса М-11', min: 50, max: 55, enemies: [
    { id: 'yeti',      name: 'Снежный мутант',        level: 51, hp: 1.1, atk: 1.0 },
    { id: 'trucker',   name: 'Дальнобой-киборг',      level: 52, hp: 0.8, atk: 1.2 },
    { id: 'inspector', name: 'Дорожный инспектор',    level: 54, hp: 0.9, atk: 1.2 },
    { id: 'grader',    name: 'Ледяной грейдер',       level: 55, hp: 1.1, atk: 1.0, elite: true }
  ] },
  { id: 'naukograd', name: 'Мёртвый наукоград', min: 55, max: 60, enemies: [
    { id: 'exo',       name: 'Боевой экзоскелет',     level: 56, hp: 1.1, atk: 1.0 },
    { id: 'ai',        name: 'Свихнувшийся ИИ',       level: 58, hp: 0.8, atk: 1.3 },
    { id: 'nanobots',  name: 'Рой нанороботов',       level: 59, hp: 1.2, atk: 1.1 },
    { id: 'academic',  name: 'Академик',              level: 60, hp: 1.1, atk: 1.1, elite: true }
  ] }
];
