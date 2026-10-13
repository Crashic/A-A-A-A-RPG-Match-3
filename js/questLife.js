// Срок поручения на доске в боях по награде (QUEST_BOARD_LIFE): без вещи — 5, уникальная — 1.
function questLife(q) {
  return QUEST_BOARD_LIFE[q.reward.item || 'none'] || 5;
}
