// Карточка текущего персонажа в главном меню (макет «Агитпроп»): плитка-аватар (раса) со значком пола,
// имя, фракция и раса столбиком; ниже уровень и класс в строку; внизу изолента и очки Реестра (парагон).
// Нажатие на аватар — экран «Персонаж» (btnCharacter). Если в выбранной ячейке персонажа нет, блок скрыт.
function renderHeroCard() {
  const hero = loadSlot(getActiveSlot());
  const card = document.getElementById('heroCard');
  card.hidden = !hero;
  if (!hero) return;
  const race = findById(RACES, hero.raceId);
  const gender = findById(GENDERS, hero.genderId);
  document.getElementById('heroCardName').textContent = hero.name;
  document.getElementById('hcAvatar').innerHTML = race ? iconTile(race.icon, race.color) : '';
  document.getElementById('hcGender').innerHTML = gender ? iconTile(gender.icon, gender.color || 'var(--gem-topaz)') : '';
  heroCardRow('hcFaction', findById(FACTIONS, hero.factionId), tr('ui.Фракция'));
  heroCardRow('hcRace', race, tr('ui.Раса'));
  heroCardRow('hcClass', findById(CLASSES, hero.classId), tr('ui.Класс'));
  const lvl = hero.level + (hero.level < MAX_LEVEL ? ' (' + hero.xp + ' / ' + xpToNext(hero.level) + ')' : '');
  heroCardRow('hcLevel', { icon: 'stamp', color: 'var(--gem-topaz)', name: lvl }, tr('ui.Уровень'));
  heroCardRow('hcTape', { icon: 'girder', color: 'var(--gem-sapphire)', html: formatTape(hero.tape) }, tr('ui.Изолента'));
  const pp = paragonPoints();
  heroCardRow('hcParagon', { icon: 'cassette', color: 'var(--gem-amethyst)', name: pp.free + ' / ' + pp.total }, tr('ui.Реестр'));
}
