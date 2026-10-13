// Изолента в виде «мотков»: синяя, чёрная, белая (старшие нулевые не показываются).
// Возвращает HTML: <span class="tape"><i class="roll blue"></i>1 …</span>.
function formatTape(amount) {
  let rest = Math.max(0, Math.floor(amount || 0));
  const parts = [];
  for (const k of TAPE_KINDS) {
    const n = Math.floor(rest / k.value);
    rest -= n * k.value;
    if (n || parts.length || k.id === 'white')
      parts.push(`<span data-tip-title="${tr('ui.Изолента')}" data-tip="${k.name[0].toUpperCase() + k.name.slice(1)} ${tr('ui.изолента')}"><i class="roll ${k.id}"></i>${n}</span>`);
  }
  return '<span class="tape">' + parts.join('') + '</span>';
}
