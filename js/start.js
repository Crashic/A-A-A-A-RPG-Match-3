// ---- start ----
function newGame(i){P.cls=i;starter();init();spawn();P.hp=stats().mhp;P.mana=50;MD=0;$('#cp').classList.remove('show');drawBoard();drawUI();log('Класс: '+CLS[i].n+'. Потяните руну к соседней или нажмите две подряд.')}
function showClass(){MD=1;$('#cc').innerHTML='<h3>Выберите класс</h3><small style="color:var(--mu)">Класс задаёт стартовую точку на древе, бонусы и набор умений.</small>'+CLS.map((c,i)=>`<div class="it" style="--rc:#c9a24a"><b>${c.n}</b><small>${c.d}</small><small>Умения: ${[c.w[1][0],c.a[0]].map(g=>GEMS[g].i+' '+GEMS[g].n).join(', ')}</small><div class="bt"><button data-c="${i}">Играть: ${c.n}</button></div></div>`).join('');$('#cp').classList.add('show')}
$('#cc').onclick=e=>{const d=e.target.dataset;
if(d.sub!=null&&d.sub!==''){P.asc={sub:+d.sub,al:[]};MD=0;$('#cp').classList.remove('show');log('✨ Восхождение: '+ASC[P.cls][P.asc.sub].n);toast('✨ Подкласс: '+ASC[P.cls][P.asc.sub].n);drawUI();showDrop();return}
if(d.later){ascLater=1;MD=0;$('#cp').classList.remove('show');showDrop();return}
if(d.c!=null&&d.c!=='')newGame(+d.c)};
applyTheme();
if(load()){applyTheme();fixAll();if(B.length!=64||B.some(c=>c<0)||runs().length)init();if(en.hp<=0)spawn();drawBoard();drawUI();log('Прогресс загружен.');if(Q.length)showDrop()}
else showClass();
