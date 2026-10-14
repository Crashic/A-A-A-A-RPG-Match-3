// id текущего акта сюжета героя ('act3', 'actBag'…) — вместо номеров, которые сдвигаются при вставке актов.
function storyActId(hero) {
  return (STORY_ACTS[storyState(hero).act - 1] || {}).id || '';
}
