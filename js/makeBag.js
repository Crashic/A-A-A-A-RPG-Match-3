// Новая сумка-вещь типа typeId (BAG_TYPES); size — свой размер (для «Чемодана из прошлой жизни»).
function makeBag(typeId, size) {
  const t = findById(BAG_TYPES, typeId);
  return {
    uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    bagType: t.id, name: t.name, size: size || t.size,
    rarity: 'common', level: 1, req: 1
  };
}
