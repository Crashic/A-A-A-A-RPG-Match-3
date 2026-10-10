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
