// Силуэт пустого слота (что сюда надевается) — бледный значок, квадрат 24×24.
const SLOT_ICONS = {
  head: 'M5 14 Q5 4 12 4 Q19 4 19 14 L19 17 L15 17 L15 13 L9 13 L9 17 L5 17 Z',
  shoulders: 'M2 14 Q2 7 9 7 L9 12 Q5 12 5 16 L2 16 Z M22 14 Q22 7 15 7 L15 12 Q19 12 19 16 L22 16 Z',
  amulet: 'M6 3 Q12 12 18 3 L16.5 3 Q12 9.5 7.5 3 Z M12 11 L16 15.5 L12 21 L8 15.5 Z',
  chest: 'M7 3 L10 5 L14 5 L17 3 L21 7 L18 10 L18 21 L6 21 L6 10 L3 7 Z',
  belt: 'M2 9 L22 9 L22 15 L2 15 Z M9.5 8 L14.5 8 L14.5 16 L9.5 16 Z M11 10.5 L13 10.5 L13 13.5 L11 13.5 Z',
  hands: 'M7 21 L7 10 Q7 8 8.5 8 Q10 8 10 10 L10 4.5 Q10 3 11.5 3 Q13 3 13 4.5 L13 9 L13 5.5 Q13 4 14.5 4 Q16 4 16 5.5 L16 11 L17.5 9 Q19 7.5 20 9 L17 16 L17 21 Z',
  ring: 'M12 6 A7 7 0 1 1 11.99 6 Z M12 9 A4 4 0 1 0 12.01 9 Z M9.5 2 L14.5 2 L13 5.5 L11 5.5 Z',
  legs: 'M6 3 L18 3 L18 21 L13.5 21 L12 9 L10.5 21 L6 21 Z',
  feet: 'M6 3 L11 3 L11 14 L20 16 Q22 17 22 19 L22 21 L4 21 L4 15 Q6 14 6 12 Z',
  weapon: 'M17 2 L22 2 L22 7 L11 18 L13 20 L11 22 L9 20 L6 23 L4 21 L7 18 L5 16 L7 14 L9 16 Z',
  rune: 'M12 3 L19 9 L16 21 L8 21 L5 9 Z M12 7 L12 17 M9 11 L15 11'
};
function slotIcon(kind) {
  const d = SLOT_ICONS[kind];
  if (!d) return '';
  return '<svg class="slotIcon" viewBox="0 0 24 24" aria-hidden="true"><path d="' + d +
    '" fill="var(--text-muted)" fill-rule="evenodd" stroke="var(--text-muted)" stroke-width="' + (kind === 'rune' ? 1.5 : 0) + '"/></svg>';
}
