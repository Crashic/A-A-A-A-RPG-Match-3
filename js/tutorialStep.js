// Учебный бой: начало хода игрока — следующая фаза сценария (TUTORIAL_PHASES): рассадить фишки, показать
// рамку и пояснение; фаза навыка — долить ману до цены и указать на кнопку; «дальше сам» — сценарий окончен.
function tutorialStep() {
  let ph = tutorialPhase();
  if (!ph || !isHeroTurn() || !match3) return;
  if (ph.enemy) { battle.tutorial.phase++; ph = tutorialPhase(); if (!ph) return; } // каскад дал лишний ход — фазу врага пропускаем
  const hero = battle.save;
  const text = storyFill(ph.text, hero);
  battle.tutorial.expect = null;
  battle.tutorial.lockBoard = false;
  tutorialFrameHide();
  clearHint();
  if (ph.id === 'free') {
    battle.tutorial.lockBoard = true;
    storyGuide(document.getElementById('enemyPanel'), text, () => {
      battle.tutorial.free = true;
      battle.tutorial.lockBoard = false;
      renderSkillBar();
      scheduleHint();
      saveBattle();
    });
    return;
  }
  if (ph.id === 'skill') {
    const skill = heroSkills(hero)[0];
    for (const [gem, n] of Object.entries(skill.cost || {})) battle.hero.mana[gem] = Math.max(battle.hero.mana[gem] || 0, n);
    if (battle.skill.cooldowns) battle.skill.cooldowns[skill.id] = 0;
    battle.tutorial.lockBoard = true;
    renderBattle();
    renderSkillBar();
    setTimeout(() => storyGuide(document.querySelector('#skillBar .skillBtn'), text), 50);
    return;
  }
  if (!tutorialPlant(ph)) { battle.tutorial.free = true; return; } // не вышло рассадить — пусть играет сам
  battle.tutorial.expect = ph.swap;
  setTimeout(() => storyGuide(tutorialFrame(ph.frame), text), 80);
}
