// Меню боя: одна кнопка справа внизу открывает список с иконками
// (Фишки, Персонаж, Глоссарий, Карта врагов, В главное меню). Касание мимо — закрывает.
function toggleBattleMenu(open) {
  const menu = document.getElementById('battleMenu');
  const show = open === undefined ? menu.hidden : open;
  menu.hidden = !show;
  document.getElementById('btnBattleMenu').setAttribute('aria-expanded', String(show));
}
function closeBattleMenu() { toggleBattleMenu(false); }
