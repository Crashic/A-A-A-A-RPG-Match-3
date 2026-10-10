// ---- drop popup ----
const price=it=>5+it.il*3+it.r*15;
function simStats(it){const o=P.eq[it.slot];P.eq[it.slot]=it;const s=stats();if(o)P.eq[it.slot]=o;else delete P.eq[it.slot];return s}
const CMP=[['Урон руны',s=>s.dmg*(1+s.inc/100)*s.baseMul,1],['Макс. здоровье',s=>s.mhp,0],['Макс. мана',s=>s.mana,0],['Крит, %',s=>s.crit,0],['Броня',s=>s.armor,0],['Щит',s=>s.shield,0],['Золото, %',s=>s.gold,0],['Удача, %',s=>s.luck,0],['Реген',s=>s.regen,0],['Шипы',s=>s.thorns,0],['Мана с рун, %',s=>s.manaGain,0],['Крит. урон, %',s=>150+s.critDmg,0]];
function showDrop(){if(MD||!Q.length)return;MD=1;const it=Q[0],cur=P.eq[it.slot],s0=stats(),s1=simStats(it),full=P.inv.length>=16;
const f=(v,fl)=>fl?v.toFixed(1):Math.round(v);
const rows=CMP.map(([n,fn,fl])=>{const a=fn(s0),b=fn(s1),dl=b-a;if(Math.abs(dl)<.05)return '';const c=dl>0?'up':'dn';return `<div>${n}: ${f(a,fl)} → <b class="${c}">${f(b,fl)}</b> <span class="${c}">(${dl>0?'+':''}${f(dl,fl)})</span></div>`}).join('');
$('#mc').innerHTML=`<h3>Выпал предмет!${Q.length>1?' <small style="color:var(--mu)">(ещё '+(Q.length-1)+')</small>':''}</h3>
<div class="cols"><div><h4>Новый предмет</h4>${il_(it)}</div></div>
<div><h4>${cur?'Сейчас надето':'Слот: '+SLOT[it.slot]}</h4>${cur?il_(cur)+'</div>':'<div class="it" style="--rc:#444"><small>Слот пуст</small></div>'}</div></div>
<div class="df">${rows||'<span class="eq">Характеристики не изменятся</span>'}</div>
${cur&&cur.sock.some(Boolean)?'<small style="color:var(--mu)">Самоцветы старого предмета остаются в его гнёздах (он уйдёт в сумку).</small>':''}
${cur&&full?`<small style="color:var(--mu)">Сумка полна — старый предмет будет продан за ${price(cur)}🪙, самоцветы вернутся в запас.</small>`:''}
<div class="mb"><button data-m="eq">Надеть</button><button data-m="bag" ${full?'disabled':''}>${full?'Сумка полна':'В сумку'}</button><button data-m="sell">Продать ${price(it)}🪙</button></div>`;
$('#md').classList.add('show')}
$('#mc').onclick=e=>{const m=e.target.dataset.m;if(!m)return;const it=Q[0];
if(m=='bag'&&P.inv.length>=16)return;Q.shift();
if(m=='eq'){const o=P.eq[it.slot];P.eq[it.slot]=it;if(o){if(P.inv.length<16)P.inv.push(o);else{retGems(o);P.gold+=price(o);log('Сумка полна: '+o.name+' продан')}}P.hp=Math.min(P.hp,stats().mhp);log('Надето: '+it.name)}
else if(m=='bag'){P.inv.push(it);log('В сумку: '+it.name)}
else{P.gold+=price(it);log('Продано: '+it.name+' за '+price(it)+'🪙')}
MD=0;$('#md').classList.remove('show');drawUI();showDrop()};
// ---- gem picker ----
function openGP(ref,ix){const it=itemByRef(ref);if(!it)return;GPR={ref,ix};const cur=it.sock[ix];
const rows=P.gems.map((g,j)=>`<button class="gr" data-g="in:${j}"><span>${GEMS[g].i} <b>${GEMS[g].n}</b> <small style="display:inline">· ${GEMS[g].k=='a'?'умение':'поддержка'}</small></span><small>${GEMS[g].d}</small></button>`).join('');
$('#gc').innerHTML=`<h3>Гнездо ${ix+1} · ${it.name}</h3>${cur?`<div class="df"><b>${GEMS[cur].i} ${GEMS[cur].n}</b><br><small>${GEMS[cur].d}</small></div><button data-g="rm" style="width:100%;margin-top:8px">Вынуть самоцвет</button>`:''}<h4 style="margin:10px 0 4px;color:var(--mu);font-size:12px">В запасе (${P.gems.length})</h4>${rows||'<small style="color:var(--mu)">Запас пуст — самоцветы выпадают с врагов</small>'}<div class="mb"><button data-g="x">Закрыть</button></div>`;
$('#gp').classList.add('show')}
$('#gc').onclick=e=>{const b=e.target.closest('button');if(!b||!GPR)return;const v=b.dataset.g,it=itemByRef(GPR.ref);
if(it&&v=='rm'){const c=it.sock[GPR.ix];if(c){P.gems.push(c);it.sock[GPR.ix]=null}}
else if(it&&v&&v.startsWith('in:')){const j=+v.slice(3),g=P.gems[j];if(g){P.gems.splice(j,1);const c=it.sock[GPR.ix];if(c)P.gems.push(c);it.sock[GPR.ix]=g}}
GPR=null;$('#gp').classList.remove('show');drawUI()};
