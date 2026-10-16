// Живой прогресс заданий «Собрать фишки» в бою: считает взятое + собранное в этом бою и, если выросло,
// показывает тост (questToast: прогресс или «ГОТОВО») и обновляет трекер (renderQuestTrack).
function questLiveCheck() {
  if (!battle || !battle.save) return;
  const gained = battle.gained.gems || {};
  battle.questSeen = battle.questSeen || {};
  for (const q of questTrackList()) {
    if (q.type !== 'gems' || q.baseHave >= q.need) continue;
    const prev = battle.questSeen[q.uid] ?? q.baseHave;
    if (q.have > prev) {
      battle.questSeen[q.uid] = q.have;
      questToast(q.have >= q.need ? 'done' : 'progress', q, q.have - prev);
    }
  }
  renderQuestTrack();
}
