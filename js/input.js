// ---- events ----
function ndHtml(){const n=N[selN];if(!n)return '<span class="eq" style="color:var(--mu)">Нажмите на узел, чтобы увидеть описание. Крупные красные — ключевые.</span>';
const al=P.al.has(n.id),can=!al&&P.pts>0&&n.nb.some(b=>P.al.has(b));
return `<b style="color:var(--ac)">${n.name}</b>: ${n.desc}<div class="mb"><button data-take="${n.id}" ${can?'':'disabled'}>${al?'Уже взято':can?'Взять узел':P.pts<1?'Нет очков':'Недоступен'}</button></div>`}
// board: tap-to-select OR drag a rune toward a neighbour
const bd=$('#b');
function tap(i){lastAct=Date.now();if(sel<0){sel=i;drawBoard();return}
const a=sel,ok=Math.abs(a%8-i%8)+Math.abs(Math.floor(a/8)-Math.floor(i/8))==1;
if(a==i){sel=-1;drawBoard()}else if(ok){sel=-1;swap(a,i)}else{sel=i;drawBoard()}}
bd.addEventListener('pointerdown',e=>{if(busy||MD||G)return;const c=e.target.closest('[data-i]');if(!c)return;
G={i:+c.dataset.i,x:e.clientX,y:e.clientY,el:c,done:0,id:e.pointerId};try{bd.setPointerCapture(e.pointerId)}catch(_){}
c.style.transition='none';c.style.zIndex=5});
bd.addEventListener('pointermove',e=>{if(!G||G.done||e.pointerId!==G.id)return;
const dx=e.clientX-G.x,dy=e.clientY-G.y,ax=Math.abs(dx),ay=Math.abs(dy),cs=G.el.offsetWidth,h=ax>=ay,v=h?dx:dy;
G.el.style.transform=h?`translate(${Math.max(-cs,Math.min(cs,v))}px,0)`:`translate(0,${Math.max(-cs,Math.min(cs,v))}px)`;
if(Math.max(ax,ay)>cs*.4){G.done=1;const i=G.i,x=i%8,y=Math.floor(i/8);let t=-1;
if(h){const nx=x+(dx>0?1:-1);if(nx>=0&&nx<8)t=y*8+nx}else{const ny=y+(dy>0?1:-1);if(ny>=0&&ny<8)t=ny*8+x}
if(t>=0&&!busy){sel=-1;swap(i,t)}else{G.el.style.transform='';G.el.style.transition=''}}});
const gEnd=e=>{if(!G||e.pointerId!==G.id)return;const g=G;G=null;
if(g.el.isConnected){g.el.style.transform='';g.el.style.transition='';g.el.style.zIndex=''}
if(g.done||e.type=='pointercancel'||busy||MD)return;tap(g.i)};
bd.addEventListener('pointerup',gEnd);bd.addEventListener('pointercancel',gEnd);
bd.addEventListener('contextmenu',e=>e.preventDefault());
$('#sk').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.s!=null)cast(+b.dataset.s);else if(b.dataset.go){tab=b.dataset.go;drawTab()}};
$('#fl').onclick=e=>{if(e.target.closest('[data-pt]')){tab='pet';drawTab();return}const b=e.target.closest('[data-f]');if(b)useFlask(+b.dataset.f)};
document.querySelector('nav').onclick=e=>{const b=e.target.closest('[data-t]');if(b){tab=b.dataset.t;drawTab()}};
$('#tab').onclick=e=>{const t=e.target;
const th=t.closest('[data-th]');if(th){P.pal=+th.dataset.th;applyTheme();drawUI();return}
if(t.dataset.shop){shop(t.dataset.shop);return}
if(t.dataset.pet){P.pet=t.dataset.pet;drawUI();return}
if(t.dataset.feed){const k=t.dataset.feed;if(P.pets[k]&&P.gold>=40&&petLv(k)<5){P.gold-=40;P.pets[k].xp=Math.min(48,P.pets[k].xp+4);drawUI()}return}
if(t.dataset.gotab){tab=t.dataset.gotab;drawTab();return}
if(t.dataset.dq!=null&&t.dataset.dq!==''){claimDq(+t.dataset.dq);return}
if(t.dataset.asc){showAsc();return}
if(t.dataset.asn!=null&&t.dataset.asn!==''&&P.asc){const i=+t.dataset.asn;if(!P.asc.al.includes(i)&&(i==0||P.asc.al.includes(i-1))&&ascPts()>0){P.asc.al.push(i);drawUI()}return}
if(t.dataset.sock){const p=t.dataset.sock.split(':');openGP(p[0]+':'+p[1],+p[2]);return}
if(t.dataset.n){selN=t.dataset.n;drawTab();return}
if(t.dataset.take){const n=N[t.dataset.take];if(!P.al.has(n.id)&&P.pts>0&&n.nb.some(b=>P.al.has(b))){P.al.add(n.id);P.pts--;drawUI()}return}
if(t.dataset.at){const [c,v]=t.dataset.at.split(':');
if(c=='go')enterMap(+v);
else if(c=='up'){const m=P.maps[+v];if(m&&P.chaos>=1&&m.mods.length<4){P.chaos--;m.mods.push(pick(Object.keys(MM).filter(x=>!m.mods.includes(x))));drawUI()}}
else if(c=='leave'&&!busy){if(M.dg)dgEnd('Вы покинули Бездну');else{M=null;log('Карта покинута — она сгорела.')}spawn();drawUI()}
else if(c=='dg')enterDg()
return}
if(t.id=='ng'){if(!ngArm){ngArm=1;drawTab();return}noSave=1;clearTimeout(svT);try{localStorage.removeItem(KEY)}catch(_){}location.reload();return}
if(t.id=='rs'){const c=P.lv<=20?0:P.lv*10;if(P.gold<c)return;P.gold-=c;const sa=startAl();P.pts+=P.al.size-sa.size;P.al=sa;if(P.asc)P.asc.al=[];drawUI();return}
const a=t.dataset.a;if(!a)return;const it=t.dataset.w=='e'?P.eq[t.dataset.i]:P.inv[+t.dataset.i];if(!it)return;
if(a=='ch'){if(P.chaos<1||it.r==0||it.r==3)return;P.chaos--;reroll(it)}
else if(a=='up'){const c=upCost(it);if((it.up||0)>=5||P.gold<c)return;P.gold-=c;it.up=(it.up||0)+1;const f=v=>Math.max(v+1,Math.round(v*1.12));it.base[1]=f(it.base[1]);it.aff.forEach(x=>x[1]=f(x[1]));it.mods=[it.base,...it.aff]}
else if(a=='en'){if(it.r==3||it.aff.length>=4||P.chaos<2||P.gold<100)return;const ex=it.aff.map(x=>x[0]),pl=AFF.filter(x=>!ex.includes(x[0])&&x[0]!=it.base[0]);if(!pl.length)return;P.chaos-=2;P.gold-=100;const x=pick(pl);it.aff.push([x[0],Math.max(1,Math.round(rnd(x[1],x[2])*(1+it.il*.08)))]);it.mods=[it.base,...it.aff];if(it.r==0)it.r=1;if(it.r==1&&it.aff.length>=3)it.r=2}
else if(a=='so'){if(!it.sock||!(it.sock.length<MAXS[it.slot])||P.chaos<3)return;P.chaos-=3;it.sock.push(null)}
else if(a=='sell'){retGems(it);P.gold+=price(it);P.inv.splice(+t.dataset.i,1)}
else{P.inv.splice(+t.dataset.i,1);if(P.eq[it.slot])P.inv.push(P.eq[it.slot]);P.eq[it.slot]=it;const m=stats().mhp;P.hp=Math.min(P.hp,m)}drawUI()};
