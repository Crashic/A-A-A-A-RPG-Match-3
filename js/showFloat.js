// Всплывающая цифра над панелью бойца: урон, щит, опыт, золото.
// side — 'hero' | 'enemy', kind — класс цвета (damage, shield, xp, gold).
function showFloat(side, text, kind) {
  const panel = document.getElementById(side === 'hero' ? 'heroPanel' : 'enemyPanel');
  const el = document.createElement('span');
  el.className = 'float ' + kind;
  el.textContent = text;
  el.style.left = (20 + Math.random() * 50) + '%';
  panel.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
