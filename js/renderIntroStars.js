// Звёзды на фоне заставки: случайные точки (рисуются один раз).
function renderIntroStars() {
  const sky = document.getElementById('introStars');
  if (sky.childElementCount) return;
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
    if (Math.random() < 0.15) s.className = 'big';
    sky.appendChild(s);
  }
}
