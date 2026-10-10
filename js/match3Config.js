// Настройки игры «3 в ряд».
const BOARD_SIZE = 9;            // поле 9×9 (BoardSample)
const BOARD_GAP = 3;             // зазор между клетками, px
const BOARD_PAD = 6;             // отступ клеток от края поля, px
const BOARD_MAX_CELL = 46;       // клетка по макету — 46 px (на узком телефоне меньше)
const HINT_DELAY = 10000;        // через сколько мс бездействия показать подсказку
const ANIM_SWAP = 170;           // обмен фишек, мс
const ANIM_CLEAR = 220;          // исчезновение совпавших, мс
const ANIM_FALL_ROW = 70;        // падение на одну клетку, мс
const ANIM_FALL_MIN = 160;       // минимальное время падения, мс
