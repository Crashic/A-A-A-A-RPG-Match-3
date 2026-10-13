// Валюта пустошей — изолента (как золото/серебро/медь в WoW):
// 1 синяя = 100 чёрных, 1 чёрная = 100 белых. В сохранении — всё в белых (поле tape).
const TAPE_KINDS = [
  { id: 'blue',  name: tr("ui.синяя"),  short: tr("ui.с"), value: 10000 },
  { id: 'black', name: tr("ui.чёрная"), short: tr("ui.ч"), value: 100 },
  { id: 'white', name: tr("ui.белая"),  short: tr("ui.б"), value: 1 }
];
