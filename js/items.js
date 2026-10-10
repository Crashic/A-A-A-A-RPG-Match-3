// ---- items ----
function mkAff(n,il){const pool=AFF.slice(),o=[];while(n--&&pool.length){const a=pool.splice(Math.floor(Math.random()*pool.length),1)[0];o.push([a[0],Math.max(1,Math.round(rnd(a[1],a[2])*(1+il*.08)))])}return o}
function mkItem(sl,q,il,nm){const b=BASE[sl],it={slot:sl,r:q,il,base:[b[0],Math.round(b[1]*(1+il*.5))],aff:mkAff(q==2?4:q==1?ri(1,2):0,il)};
it.sock=Array(Math.min(MAXS[sl],BS[sl]+(q==2?ri(1,2):q==1?ri(0,1):0))).fill(null);
it.name=nm||(q==2?pick(['Бездонный','Проклятый','Осколочный','Тёмный']):q?'Рунный':'Старый')+' '+pick(NM[sl]);it.mods=[it.base,...it.aff];if(sl=='p')fixBelt(it);return it}
function mkUnique(u){const it=mkItem(u.s,2,lv(),u.n);it.r=3;it.aff=u.m.map(x=>x.slice());it.mods=[it.base,...it.aff];it.fx=u.fx;return it}
function gen(boss){const s=stats(),r=Math.random()*100,q=r<6+s.luck/4+(boss?40:0)?2:r<45+s.luck/2?1:0;P.st.items++;
if(Math.random()<(boss?.1:.02)+s.luck/2500){P.st.uniq++;return mkUnique(pick(UNI))}return mkItem(pick(Object.keys(SLOT)),q,lv())}
const startAl=()=>new Set(['c','a'+CLS[P.cls].arm+'_1']);
function starter(){const C=CLS[P.cls],w=mkItem('w',0,1,C.w[0]),a=mkItem('a',0,1,'Рваная роба');w.sock=C.w[1].slice();a.sock=C.a.slice();const bt=mkItem('p',0,1,'Кожаный пояс');bt.flasks[0]={t:'hp',c:3};P.eq={w,a,p:bt};P.gems=C.gems.slice();P.buffs=[];P.al=startAl();P.pts=1}
const gem=(g,ref,ix)=>{const c='sg '+(g?GEMS[g].k:''),t=g?GEMS[g].n:'Пустое гнездо',ic=g?GEMS[g].i:'○';
return ref?`<button class="${c}" data-sock="${ref}:${ix}" title="${t}">${ic}</button>`:`<span class="${c}" title="${t}">${ic}</span>`};
const upCost=it=>Math.round(60*(1+(it.up||0))*(1+it.il*.15));
const cft=(w,i,it)=>{const u=upCost(it),a=`data-w="${w}" data-i="${i}"`;return `<div class="bt"><button data-a="up" ${a} ${(it.up||0)>=5||P.gold<u?'disabled':''}>Улучшить ${u}🪙 (${it.up||0}/5)</button><button data-a="en" ${a} ${it.r==3||it.aff.length>=4||P.chaos<2||P.gold<100?'disabled':''}>+Свойство 2◎ 100🪙</button><button data-a="so" ${a} ${!it.sock||!(it.sock.length<MAXS[it.slot])||P.chaos<3?'disabled':''}>+Гнездо 3◎</button></div>`};
const il_=(i,ref)=>`<div class="it" style="--rc:${RC[i.r]}"><b>${i.name}</b> <small>${SLOT[i.slot]} · ${RN[i.r]} · ур.${i.il}</small>${i.mods.filter(([k])=>L[k]).map(([k,v])=>`<small style="color:${i.base[0]==k&&i.mods[0][1]==v?'#cfcfcf':'#9ec8ff'}">+${v}${L[k]}</small>`).join('')}${i.fx?`<small style="color:#ffb066">★ ${i.fx}</small>`:''}${i.flasks?`<small style="color:#9ec8ff">Слоты флаконов (${i.fl}): ${i.flasks.map(f=>f?FL[f.t].i:'○').join(' ')}</small>`:''}${i.sock&&i.sock.length?`<div class="so">${i.sock.map((g,x)=>gem(g,ref,x)).join('')}</div>`:''}`;
function reroll(it){it.aff=mkAff(it.r==2?4:ri(1,2),it.il);it.mods=[it.base,...it.aff]}
function retGems(it){(it.sock||[]).forEach((g,i)=>{if(g){P.gems.push(g);it.sock[i]=null}});(it.flasks||[]).forEach((f,i)=>{if(f){P.gold+=Math.floor(FL[f.t].pr/2);it.flasks[i]=null}})}
const itemByRef=ref=>{const [w,k]=ref.split(':');return w=='e'?P.eq[k]:P.inv[+k]};
// ---- skills (active gems socketed in equipped items, linked with support gems of the same item) ----
function skills(){const o=[];Object.keys(SLOT).forEach(k=>{const it=P.eq[k];if(!it||!it.sock)return;const sups=it.sock.filter(g=>g&&GEMS[g].k=='s');it.sock.forEach(g=>{if(g&&GEMS[g].k=='a')o.push({g,sups,from:k})})});return o}
function sk(x){const G=GEMS[x.g];let cm=1,dm=1,hits=G.h||1,burn=G.f=='burn',cb=0;
x.sups.forEach(g=>{if(g=='emp'){dm*=1.4;cm*=1.3}else if(g=='burn')burn=true;else if(g=='multi'){hits++;cm*=1.2}else if(g=='crit'){cb+=30;cm*=1.1}});
return{G,dm,hits,burn,cb,cost:Math.round(G.c*cm)}}
function cast(i){if(busy||MD)return;const x=skills()[i];if(!x)return;const p=sk(x),g=p.G,s=stats();if(P.mana<p.cost)return;P.mana-=p.cost;
if(g.f=='heal'){const h=Math.round(s.mhp*.25*p.dm);P.hp=Math.min(s.mhp,P.hp+h);log('Умение: '+g.n+' (+'+h+')')}
else{for(let h=0;h<p.hits;h++)hit(s.dmg*g.m*p.dm,0,s,p.cb);if(g.f=='ice'){en.t+=2;log('Враг заморожен (+2 хода)')}if(p.burn){en.burn=3;en.bd=Math.round(s.dmg*1.5)}log('Умение: '+g.n)}
if(en.hp<=0)kill();drawUI()}
