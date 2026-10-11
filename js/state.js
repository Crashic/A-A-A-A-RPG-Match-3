// Общее состояние игры (переменные, не функции).
const SLOT_COUNT = 3;
const DEFAULT_SETTINGS = {
  music: 70,          // громкость музыки, 0–100
  sound: 80,          // громкость звуков, 0–100
  vibration: true,
  fullscreen: true,
  notifications: true, // всплывающие сообщения игры
  gemLegendSeen: false // подсказка «Фишки» уже показана в первом бою
};
let settings = null;  // заполняется в main() через loadSettings()

// Создание персонажа: черновик, номер шага, ячейка и куда вернуться после «Создать»
let creation = null;  // { draft, step, slot, returnTo: 'game' | 'characters' }

// Заставка после создания персонажа: { onDone, timer } пока идёт
let intro = null;

// Глоссарий: открытый раздел (id из GLOSSARY_SECTIONS)
let glossaryTab = 'gems';

// Подсказка: элемент, над которым она сейчас показана (showTip / hideTip)
let tipOwner = null;

// Экран «Персонаж»: открытая вкладка под характеристиками — 'class' | 'faction' | 'race'
let charTab = 'class';
// Вкладка характеристик: 'base' (очки) | 'detail' (что дают в бою)
let statTab = 'base';
