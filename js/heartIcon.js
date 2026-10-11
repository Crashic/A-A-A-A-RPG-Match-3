// Сердце у полосы здоровья (как в дизайн-системе, Panels): плоский силуэт цвета ui-danger
// с тёмным тоном снизу и бликом сверху-слева, в квадрате 100×100.
function heartIcon() {
  return '<svg class="gemMini" viewBox="0 0 100 100" aria-hidden="true">' +
    '<path d="M50 90 C20 68 4 52 4 32 C4 16 16 6 30 6 C40 6 46 12 50 20 C54 12 60 6 70 6 C84 6 96 16 96 32 C96 52 80 68 50 90 Z" fill="var(--ui-danger)"/>' +
    '<path d="M50 90 C30 75 16 63 9 50 C22 62 36 70 50 74 C64 70 78 62 91 50 C84 63 70 75 50 90 Z" fill="var(--gem-ruby-dark)" opacity=".6"/>' +
    '<ellipse cx="28" cy="26" rx="11" ry="7" fill="#fff" opacity=".35" transform="rotate(-30 28 26)"/>' +
    '</svg>';
}
