// Свойство предмета { id, v }: выпавшее число roll умножается на mul свойства (ITEM_AFFIXES),
// дробное округляется до половинки (крит).
function affixValue(id, roll) {
  const a = findById(ITEM_AFFIXES, id);
  return { id, v: Math.max(0.5, Math.round(roll * (a ? a.mul : 1) * 2) / 2) };
}
