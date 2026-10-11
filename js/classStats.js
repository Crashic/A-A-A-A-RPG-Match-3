// Базовые характеристики классов (сумма у всех 55 — разный только профиль).
// str — Сила, agi — Ловкость, sta — Выносливость, int — Интеллект, spi — Дух.
const CLASS_STATS = {
  engineer:   { str: 12, agi: 9,  sta: 12, int: 12, spi: 10 },
  scout:      { str: 9,  agi: 14, sta: 10, int: 11, spi: 11 },
  guard:      { str: 12, agi: 9,  sta: 14, int: 9,  spi: 11 },
  technician: { str: 9,  agi: 10, sta: 11, int: 14, spi: 11 },
  overseer:   { str: 10, agi: 9,  sta: 11, int: 13, spi: 12 },
  keeper:     { str: 9,  agi: 9,  sta: 12, int: 13, spi: 12 },
  nomad:      { str: 11, agi: 12, sta: 12, int: 9,  spi: 11 },
  mechanic:   { str: 12, agi: 11, sta: 11, int: 12, spi: 9 },
  raider:     { str: 14, agi: 12, sta: 11, int: 8,  spi: 10 },
  forester:   { str: 11, agi: 13, sta: 11, int: 10, spi: 10 },
  herbalist:  { str: 8,  agi: 10, sta: 11, int: 13, spi: 13 },
  ambusher:   { str: 11, agi: 14, sta: 10, int: 10, spi: 10 },
  guide:      { str: 10, agi: 12, sta: 11, int: 10, spi: 12 },
  archivist:  { str: 9,  agi: 10, sta: 10, int: 14, spi: 12 },
  bard:       { str: 9,  agi: 11, sta: 10, int: 11, spi: 14 },
  chronicler: { str: 10, agi: 10, sta: 11, int: 12, spi: 12 }
};
