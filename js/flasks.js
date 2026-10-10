// ---- flasks (belt slots, recharge on kills) and shop ----
const FL={hp:{n:'Флакон жизни',i:'🧪',c:'#e59a9a',m:3,pr:60,d:'Лечит 40% здоровья'},
mp:{n:'Флакон маны',i:'💧',c:'#8fb0ea',m:3,pr:50,d:'Восстанавливает 60 маны'},
sh:{n:'Флакон щита',i:'🔮',c:'#b9a1e3',m:3,pr:70,d:'Полностью наполняет щит'},
gr:{n:'Гранитный флакон',i:'🛡',c:'#a7a3b3',m:2,pr:80,d:'+40 брони на 5 ходов'},
ru:{n:'Рубиновый флакон',i:'⚔',c:'#e8a070',m:2,pr:90,d:'+40% урона на 5 ходов'}};
const SHOP2=[{id:'chaos',i:'◎',n:'Сфера Хаоса',d:'Для перековки аффиксов и усиления карт',pr:120},
{id:'gem',i:'💎',n:'Случайный самоцвет',d:'Умение или поддержка',pr:90},
{id:'map',i:'🗺',n:'Карта Атласа',d:'Случайная карта (с 3-го этапа, до 12 карт)',pr:250,ok:()=>S.stage>=3&&P.maps.length<12}];
function fixBelt(it){if(!it||it.slot!='p'||it.flasks)return;it.fl=1+Math.floor(Math.random()*5);it.flasks=Array(it.fl).fill(null)}
function useFlask(i){const bl=P.eq.p,f=bl&&bl.flasks&&bl.flasks[i];if(!f||f.c<1||busy||MD)return;const s=stats(),d=FL[f.t];f.c--;
if(f.t=='hp')P.hp=Math.min(s.mhp,P.hp+s.mhp*.4);else if(f.t=='mp')P.mana=Math.min(s.mana,P.mana+60);else if(f.t=='sh')P.sh=s.shield;
else if(f.t=='gr')P.buffs.push({k:'armor',v:40,t:5,n:'Гранит'});else if(f.t=='ru')P.buffs.push({k:'inc',v:40,t:5,n:'Ярость'});
log(d.i+' '+d.n);drawUI()}
function shop(a){const [c,v]=a.split(':'),bl=P.eq.p;
if(c=='buy'){const f=FL[v],i=bl&&bl.flasks?bl.flasks.findIndex(x=>!x):-1;if(i<0||P.gold<f.pr)return;P.gold-=f.pr;bl.flasks[i]={t:v,c:f.m};log('🛒 Куплен: '+f.n)}
else if(c=='pet'){const p=PETS[v];if(!p||P.pets[v]||P.gold<p.pr)return;P.gold-=p.pr;P.pets[v]={xp:0};if(!P.pet)P.pet=v;log('🐾 Куплен питомец: '+p.n)}
else if(c=='rm'){const f=bl&&bl.flasks&&bl.flasks[+v];if(f){P.gold+=Math.floor(FL[f.t].pr/2);bl.flasks[+v]=null}}
else if(c=='refill'){let m=0;if(bl&&bl.flasks)bl.flasks.forEach(f=>{if(f)m+=FL[f.t].m-f.c});if(m&&P.gold>=m*10){P.gold-=m*10;bl.flasks.forEach(f=>{if(f)f.c=FL[f.t].m})}}
else{const x=SHOP2.find(y=>y.id==c);if(!x||P.gold<x.pr||(x.ok&&!x.ok()))return;P.gold-=x.pr;
if(c=='chaos')P.chaos++;else if(c=='gem'){const g=pick(Object.keys(GEMS));P.gems.push(g);log('💎 Куплен самоцвет: '+GEMS[g].n)}else if(c=='map'){const mp=mkMap();P.maps.push(mp);log('🗺 Куплена карта: '+mp.name)}}
drawUI()}
const DQ=[['kills','Победить врагов',[15,25,40],'kills'],['moves','Сделать ходов',[60,100,160],'moves'],['bosses','Победить босса',[1],'bosses'],['bombs','Создать бомб',[2,4],'bombs'],['items','Найти предметов',[5,8],'items'],['maps','Пройти карту',[1],'maps']];
const today=()=>new Date().toLocaleDateString('sv');
function dqNew(){const ks=DQ.slice().sort(()=>Math.random()-.5).slice(0,3),base={};DQ.forEach(d=>base[d[3]]=P.st[d[3]]||0);
P.dq={day:today(),base,q:ks.map(d=>{const ti=Math.floor(Math.random()*d[2].length),t=d[2][ti];return{id:d[0],t,r:60+ti*40+t*3,c:1+(ti>0?1:0),done:0}})}}
const dqVal=q=>{const d=DQ.find(x=>x[0]==q.id);return Math.max(0,(P.st[d[3]]||0)-(P.dq.base[d[3]]||0))};
function claimDq(i){const q=P.dq.q[i];if(!q||q.done||dqVal(q)<q.t)return;q.done=1;P.gold+=q.r;P.chaos+=q.c;log(`📜 Задание выполнено: +${q.r}🪙, +${q.c}◎`);drawUI()}
function dqHtml(){return `<b>📜 Задания дня</b><small style="display:block;color:var(--mu)">Обновляются каждый день.</small>`+P.dq.q.map((q,i)=>{const d=DQ.find(x=>x[0]==q.id),v=Math.min(q.t,dqVal(q)),ok=v>=q.t;return `<div class="it" style="--rc:${q.done?'#6b6578':ok?'#a3d6ae':'#c9a24a'}"><b>${q.done?'✓ ':''}${d[1]}: ${q.t}</b> <small>Награда: ${q.r}🪙 и ${q.c}◎</small>${bar(v,q.t,'var(--bx)',v+'/'+q.t,'s')}${q.done?'':`<div class="bt"><button data-dq="${i}" ${ok?'':'disabled'}>Забрать</button></div>`}</div>`}).join('')}
const PETS={wolf:{i:'🐺',n:'Волк',pr:300,d:'Каждые 3 хода кусает врага (урон ×2)'},owl:{i:'🦉',n:'Сова',pr:300,d:'Даёт 3 маны каждый ход'},turtle:{i:'🐢',n:'Черепаха',pr:350,d:'Каждые 3 хода даёт 8 щита'},fairy:{i:'🧚',n:'Фея',pr:400,d:'Каждые 2 хода лечит 3% здоровья'},imp:{i:'😈',n:'Бесёнок',pr:250,d:'+10% золота'}};
const PU={wolf:'Вой: урон ×5',owl:'+30 маны',turtle:'щит полностью',fairy:'лечит 15%',imp:'находит золото'};;
const petLv=id=>1+Math.min(4,Math.floor(((P.pets[id]||{}).xp||0)/12)),petPm=id=>1+.25*(petLv(id)-1);
let petFl=0;
const PER={wolf:3,owl:1,turtle:3,fairy:2,imp:0};
function petBtn(){const id=P.pet,p=PETS[id],pr=PER[id],l=petLv(id),f=petFl;petFl=0;return `<button class="fb pet${f?' act':''}" data-pt="1" style="--fc:#a3d6ae"><span>${p.i}</span><small>${l}★ ${pr>1?(mv%pr)+'/'+pr:pr?'ход':'+10%'}</small></button>`}
function petAct(){const id=P.pet;if(!id||!P.pets[id])return;const s=stats(),pm=petPm(id);
if(id=='wolf'&&mv%3==0){petFl=1;const d=Math.round(s.dmg*2*pm);en.hp-=d;log('🐺 Волк кусает врага на '+d)}
else if(id=='owl'){P.mana=Math.min(s.mana,P.mana+3*pm);petFl=1}
else if(id=='turtle'&&mv%3==0){P.sh=Math.min(s.shield,P.sh+8*pm);petFl=1}
else if(id=='fairy'&&mv%2==0){P.hp=Math.min(s.mhp,P.hp+s.mhp*.03*pm);petFl=1};if(petLv(id)>=3&&mv%10==0)petUlt(id,s,pm)}
function petUlt(id,s,pm){petFl=1;const p=PETS[id];if(id=='wolf'){const d=Math.round(s.dmg*5*pm);en.hp-=d;log('🐺 Вой! Волк наносит '+d)}else if(id=='owl'){P.mana=Math.min(s.mana,P.mana+30);log('🦉 Сова вернула 30 маны')}else if(id=='turtle'){P.sh=s.shield;log('🐢 Панцирь: щит полон')}else if(id=='fairy'){P.hp=Math.min(s.mhp,P.hp+s.mhp*.15);log('🧚 Фея исцеляет 15%')}else if(id=='imp'){const g=30*petLv(id);P.gold+=g;log('😈 Бесёнок нашёл '+g+'🪙')}}
function petHtml(){const ks=Object.keys(P.pets);return '<b>Питомцы</b>'+(ks.length?ks.map(k=>{const p=PETS[k],l=petLv(k),xp=Math.min(48,P.pets[k].xp||0);return `<div class="it" style="--rc:${P.pet==k?'#a3d6ae':'#6b6578'}"><b>${p.i} ${p.n}</b> <small>ур. ${l}${l<5?'':' (макс.)'} · сила ×${petPm(k).toFixed(2)}</small>${bar(l<5?xp%12:12,12,'var(--bx)',l<5?'опыт '+xp%12+'/12':'макс.','s')}<small>Пассивно: ${p.d}</small><small style="color:${l>=3?'#f2d98a':'var(--mu)'}">${l>=3?'★':'🔒 с ур. 3 ·'} Каждые 10 ходов: ${PU[k]}</small><div class="bt"><button data-pet="${k}" ${P.pet==k?'disabled':''}>${P.pet==k?'Активен':'Взять с собой'}</button><button data-feed="${k}" ${l>=5||P.gold<40?'disabled':''}>Покормить 40🪙</button></div></div>`}).join(''):'<div class="df">Питомцев нет. Купите в «Лавке» или найдите яйцо у босса. Питомец растёт с убийствами врагов.<div class="mb"><button data-gotab="shop">В Лавку</button></div></div>')}
function fixAll(){[...Object.values(P.eq),...P.inv,...Q].forEach(fixBelt);
if(!P.eq.p&&!P.inv.some(i=>i.slot=='p')&&P.inv.length<16){const bt=mkItem('p',0,1,'Кожаный пояс');bt.flasks[0]={t:'hp',c:3};P.inv.push(bt);log('🎁 Выдан Кожаный пояс со слотами под флаконы — наденьте его во вкладке «Вещи»')}}
