// Данные «Приказа» для окна диалога (макет «Сюжетное задание: диалог»): номер акта, название, что делать, награда.
// act — элемент STORY_ACTS. Возвращает { no, title, todo, rewards: [{ text, cls }] }.
function storyOrderCard(hero, act) {
  const no = STORY_ACTS.indexOf(act) + 1;
  const r = act.reward || {};
  const rewards = [];
  if (r.tape) rewards.push({ html: formatTape(r.tape) });
  if (r.item) { const rar = findById(ITEM_RARITIES, r.item); rewards.push({ text: (rar ? rar.name : '') + tr("ui. предмет"), cls: 'r-' + r.item }); }
  if (r.xpPct) rewards.push({ text: Math.round(r.xpPct * 100) + tr("ui.% опыта уровня") });
  if (r.paragon || act.id === 'act8') rewards.push({ text: tr("ui.Очко Реестра") });
  return { no, title: act.title, todo: act.todo ? storyFill(act.todo, hero) : '', rewards };
}
