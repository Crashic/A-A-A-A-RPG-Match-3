// Изолента простым текстом (для подтверждений и сообщений): «1 с 20 ч 5 б».
function tapeText(amount) {
  let rest = Math.max(0, Math.floor(amount || 0));
  const parts = [];
  for (const k of TAPE_KINDS) {
    const n = Math.floor(rest / k.value);
    rest -= n * k.value;
    if (n || (k.id === 'white' && !parts.length)) parts.push(n + ' ' + k.short);
  }
  return parts.join(' ');
}
