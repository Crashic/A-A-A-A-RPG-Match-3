// Кладёт ресурсы { id: сколько } в общий запас аккаунта (acc.resources) — для лагеря и крафта.
function addResources(res) {
  if (!res || !Object.keys(res).length) return;
  const acc = loadAccount();
  acc.resources = acc.resources || {};
  for (const id in res) acc.resources[id] = (acc.resources[id] || 0) + res[id];
  saveAccount(acc);
}
