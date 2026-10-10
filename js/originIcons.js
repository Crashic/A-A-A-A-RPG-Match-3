// Иконки фракций, рас, классов и пола: силуэт в квадрате 100×100 (рисуется в плитке-сквиркле,
// как фишки GemsElemental: тёмный тон цвета плитки). Иконки ресурсов берутся у фишек (GEM_TYPES).
// rule — правило заливки (evenodd вырезает дырки, nonzero — сливает пересечения).
const ORIGIN_ICONS = {
  stamp: { d: 'M38 8 H62 V40 H38 Z M44 40 H56 V56 H44 Z M14 56 H86 V72 H14 Z M8 80 H92 V92 H8 Z', rule: 'evenodd' },
  fist: { d: 'M30 30 H70 V62 H30 Z M30 31 V18 H41 V31 Z M42 31 V12 H53 V31 Z M54 31 V16 H65 V31 Z M16 40 H30 V56 H16 Z M36 62 H64 V94 H36 Z', rule: 'nonzero' },
  mic: { d: 'M38 6 H62 V54 H38 Z M24 40 H30 V50 A20 20 0 0 0 70 50 V40 H76 V50 A26 26 0 0 1 53 76 V86 H68 V94 H32 V86 H47 V76 A26 26 0 0 1 24 50 Z', rule: 'nonzero' },
  ruins: { d: 'M6 94 V50 L18 44 V30 L30 36 V20 L44 28 V94 Z M52 94 V60 L64 54 V40 L78 48 V36 L94 44 V94 Z', rule: 'evenodd' },
  factory: { d: 'M6 94 V50 L28 38 V50 L50 38 V50 L72 38 V10 H86 V94 Z', rule: 'evenodd' },
  tunnel: { d: 'M6 94 V50 A44 44 0 0 1 94 50 V94 H74 V54 A24 24 0 0 0 26 54 V94 Z', rule: 'evenodd' },
  wheel: { d: 'M50 4 A46 46 0 1 1 49.9 4 Z M50 18 A32 32 0 1 0 50.1 18 Z M44 18 H56 V82 H44 Z M18 44 H82 V56 H18 Z', rule: 'evenodd' },
  tree: { d: 'M50 4 L80 40 H64 L86 70 H56 V96 H44 V70 H14 L36 40 H20 Z', rule: 'evenodd' },
  shield: { d: 'M50 4 L88 18 V48 C88 72 70 88 50 96 C30 88 12 72 12 48 V18 Z', rule: 'evenodd' },
  eye: { d: 'M4 50 C24 18 76 18 96 50 C76 82 24 82 4 50 Z M50 32 A18 18 0 1 0 50.1 32 Z M50 42 A8 8 0 1 1 49.9 42 Z', rule: 'evenodd' },
  key: { d: 'M30 16 A24 24 0 1 1 29.9 16 Z M30 30 A10 10 0 1 0 30.1 30 Z M54 34 H96 V46 H88 V60 H78 V46 H70 V56 H60 V46 H54 Z', rule: 'evenodd' },
  wrench: { d: 'M36 4 V24 L44 30 H56 L64 24 V4 C80 12 82 36 60 44 V90 A10 10 0 0 1 40 90 V44 C18 36 20 12 36 4 Z', rule: 'evenodd' },
  flask: { d: 'M40 4 H60 V12 H56 V36 L88 84 A8 8 0 0 1 82 96 H18 A8 8 0 0 1 12 84 L44 36 V12 H40 Z', rule: 'evenodd' },
  bush: { d: 'M8 70 A22 22 0 1 1 52 70 A22 22 0 1 1 8 70 Z M48 70 A22 22 0 1 1 92 70 A22 22 0 1 1 48 70 Z M28 44 A22 22 0 1 1 72 44 A22 22 0 1 1 28 44 Z M6 72 H94 V94 H6 Z', rule: 'nonzero' },
  compass: { d: 'M50 4 A46 46 0 1 1 49.9 4 Z M50 14 A36 36 0 1 0 50.1 14 Z M50 20 L60 50 L50 80 L40 50 Z', rule: 'evenodd' },
  note: { d: 'M36 18 L84 8 V70 A12 10 0 1 1 72 62 V30 L48 35 V80 A12 10 0 1 1 36 72 Z', rule: 'nonzero' },
  male: { d: 'M40 30 A28 28 0 1 1 39.9 30 Z M40 42 A16 16 0 1 0 40.1 42 Z M58 6 H94 V42 H82 V26 L68 40 L60 32 L74 18 H58 Z', rule: 'nonzero' },
  female: { d: 'M50 6 A28 28 0 1 1 49.9 6 Z M50 20 A14 14 0 1 0 50.1 20 Z M44 60 H56 V72 H68 V82 H56 V96 H44 V82 H32 V72 H44 Z', rule: 'nonzero' }
};
// Иконки-ресурсы с фишек: ключ иконки → id камня
const GEM_ICON_KEYS = { girder: 'sapphire', radiation: 'topaz', gear: 'aquamarine', canister: 'ruby', leaf: 'emerald', ticket: 'pearl', cassette: 'amethyst' };
