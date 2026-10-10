// Общее состояние игры (переменные, не функции).
const SLOT_COUNT = 3;
const DEFAULT_SETTINGS = {
  music: 70,          // громкость музыки, 0–100
  sound: 80,          // громкость звуков, 0–100
  vibration: true,
  fullscreen: true,
  notifications: true // всплывающие сообщения игры
};
let settings = null;  // заполняется в main() через loadSettings()

// Создание персонажа: черновик, номер шага, ячейка и куда вернуться после «Создать»
let creation = null;  // { draft, step, slot, returnTo: 'game' | 'characters' }

// Заставка после создания персонажа: { onDone, timer } пока идёт
let intro = null;
