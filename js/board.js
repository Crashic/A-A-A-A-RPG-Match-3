// ---- board ----
const rr=()=>Math.random()<(hasMod('skull')?.17:.09)?5:Math.floor(Math.random()*5);
// cell value: colour = v%10, special = floor(v/10): 0 normal, 1 bomb (3x3 blast), 2 shard (clears the whole colour)
const cl=i=>B[i]%10,sp=v=>Math.floor(v/10)%10,fz=v=>v>=100; // +100 = frozen (cannot be swapped until matched)
function fixRuns(){let r;while((r=runs()).length)r.forEach(q=>q.cells.forEach(i=>B[i]=rr()))}
let hA=-1,hB=-1,lastAct=Date.now();
function findMove(){for(let a=0;a<64;a++)for(const d of[1,8]){const t=a+d;if(t>63||(d==1&&a%8==7)||fz(B[a])||fz(B[t]))continue;
[B[a],B[t]]=[B[t],B[a]];const ok=runs().length>0||sp(B[a])>0||sp(B[t])>0;[B[a],B[t]]=[B[t],B[a]];if(ok)return[a,t]}return null}
function clearHint(){lastAct=Date.now();if(hA>=0){hA=hB=-1;drawBoard()}}
async function settle(){while(runs().length&&!dead&&en.hp>0){await resolve([]);if(en.hp<=0)kill()}}
setInterval(async()=>{if(busy||MD||G||!B.length)return;
if(runs().length){busy=1;await settle();if(dead)die();busy=0;drawBoard();drawUI();return}
if(hA<0&&Date.now()-lastAct>5000){const m=findMove();if(m){hA=m[0];hB=m[1];drawBoard()}}},600);
function hasMove(){for(let a=0;a<64;a++)for(const d of[1,8]){const t=a+d;if(t>63||(d==1&&a%8==7)||fz(B[a])||fz(B[t]))continue;
[B[a],B[t]]=[B[t],B[a]];const ok=runs().length>0||sp(B[a])>0||sp(B[t])>0;[B[a],B[t]]=[B[t],B[a]];if(ok)return true}return false}
function runs(){const o=[];for(let y=0;y<8;y++)for(let x=0;x<8;){let c=cl(y*8+x),e=x;while(e<8&&cl(y*8+e)==c)e++;if(e-x>=3)o.push({c,cells:Array.from({length:e-x},(_,k)=>y*8+x+k)});x=e}
for(let x=0;x<8;x++)for(let y=0;y<8;){let c=cl(y*8+x),e=y;while(e<8&&cl(e*8+x)==c)e++;if(e-y>=3)o.push({c,cells:Array.from({length:e-y},(_,k)=>(y+k)*8+x)});y=e}return o}
function init(){B=Array.from({length:64},rr);let r;while((r=runs()).length)r.forEach(q=>q.cells.forEach(i=>B[i]=rr()))}
function reshuffle(){for(let i=63;i>0;i--){const j=Math.floor(Math.random()*(i+1));[B[i],B[j]]=[B[j],B[i]]}let r;while((r=runs()).length)r.forEach(q=>q.cells.forEach(i=>B[i]=rr()));log('🌀 Руны перемешались!')}
function gravity(){for(let x=0;x<8;x++){const col=[];for(let y=7;y>=0;y--)if(B[y*8+x]>=0)col.push(B[y*8+x]);for(let y=7;y>=0;y--)B[y*8+x]=col.length?col.shift():rr()}}
function effect(c,n,casc,s){const a=n>=4?n+2:n;
if(c==0){hit(a*s.dmg*(hasMod('stone')?.7:1)*(en.mech=='stone'?.5:1),casc,s);if(s.redHeal)P.hp=Math.min(s.mhp,P.hp+a*s.redHeal*2)}
else if(c==1){if(!s.noBlue)P.mana=Math.min(s.mana,P.mana+Math.round(a*5*(1+s.manaGain/100)*(hasMod('curse')?.6:1)))}
else if(c==2)en.poison+=a;else if(c==3)P.gold+=Math.round(a*(2+lv())*(1+s.gold/100));
else if(c==4)P.sh=Math.min(s.shield,P.sh+a*3);else hurt(a*(3+lv()*1.2))}
async function resolve(trig){let casc=0;
for(;;){const r=runs();if(!r.length&&!(trig&&trig.length))break;
const s=stats(),set=new Set(),inRun=new Set(),keep=new Map(),cnt=[0,0,0,0,0,0];
r.forEach(q=>{q.cells.forEach(i=>{set.add(i);inRun.add(i)});effect(q.c,q.cells.length,casc,s);
if(q.cells.length>=4&&q.c!=5){const free=q.cells.filter(i=>sp(B[i])==0&&!keep.has(i));if(free.length)keep.set(free[Math.floor(free.length/2)],q.c+(q.cells.length>=5?20:10))}});
(trig||[]).forEach(i=>set.add(i));trig=null;
const done=new Set();let ch=1;
while(ch){ch=0;[...set].forEach(i=>{if(done.has(i)||sp(B[i])==0)return;done.add(i);ch=1;const col=B[i]%10;
if(sp(B[i])==1){const x=i%8,y=Math.floor(i/8);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&nx<8&&ny>=0&&ny<8)set.add(ny*8+nx)}}
else for(let j=0;j<64;j++)if(B[j]%10==col)set.add(j)})}
set.forEach(i=>{if(!inRun.has(i)&&B[i]%10!=5)cnt[B[i]%10]++});
cnt.forEach((n,c)=>{if(n)effect(c,n,casc,s)});
keep.forEach((v,k)=>set.delete(k));
set.forEach(i=>$('#b').children[i].classList.add('pop'));keep.forEach((v,k)=>$('#b').children[k].classList.add('born'));
drawUI();await sl(200);set.forEach(i=>B[i]=-1);keep.forEach((v,k)=>{B[k]=v});gravity();drawBoard();if(casc)log('Каскад ×'+(casc+1));
if(keep.size){keep.forEach(v=>{if(v>=20)P.st.shards++;else P.st.bombs++});log(`✨ Создана ${[...keep.values()].some(v=>v>=20)?'руна-осколок':'руна-бомба'}`)}casc++;await sl(220);if(en.hp<=0||dead)break}
P.st.maxCasc=Math.max(P.st.maxCasc,casc)}
async function swap(a,b){clearHint();if(fz(B[a])||fz(B[b])){log('❄ Руна заморожена — разбейте её матчем рядом');return}
busy=1;[B[a],B[b]]=[B[b],B[a]];const trig=[a,b].filter(i=>sp(B[i])>0);
if(!runs().length&&!trig.length){drawBoard();await sl(150);[B[a],B[b]]=[B[b],B[a]];drawBoard();busy=0;return}
mv++;P.st.moves++;drawBoard();await resolve(trig);if(!dead&&en.hp<=0)kill();else if(!dead){petAct();if(en.hp<=0)kill();else{enemyTurn();if(!dead&&en.hp>0&&en.mech)bossAct()}}if(dead)die();if(hasMod('shuffle')&&mv%5==0)reshuffle();
await settle();if(dead)die();if(!hasMove()){B=B.map(v=>v%100);let n=0;do{reshuffle();n++}while(!hasMove()&&n<20)}
busy=0;drawBoard();drawUI()}
const MECH={frost:['❄ Ледяное дыхание','Каждые 3 хода замораживает руны'],skull:['☠ Призыв черепов','Каждые 3 хода превращает руны в черепа'],chaos:['🌀 Хаос рун','Каждые 4 хода перемешивает поле'],stone:['🪨 Каменная кожа','Красные руны бьют вдвое слабее'],vamp:['🩸 Кровопийца','Каждые 3 хода лечится на 10%'],drain:['🕳 Иссушитель','Каждые 3 хода крадёт 25 маны'],rage:['🔥 Ярость','Каждые 4 хода бьёт на 15% сильнее']};
function bossAct(){en.mc=(en.mc||0)+1;const m=en.mech;
if(m=='frost'&&en.mc%3==0){for(let n=0;n<4;n++){const i=Math.floor(Math.random()*64);if(!fz(B[i]))B[i]+=100}log('❄ Босс заморозил руны!')}
else if(m=='skull'&&en.mc%3==0){for(let n=0;n<3;n++)B[Math.floor(Math.random()*64)]=5;fixRuns();log('☠ Босс призвал черепа!')}
else if(m=='chaos'&&en.mc%4==0)reshuffle()
else if(m=='vamp'&&en.mc%3==0){en.hp=Math.min(en.mhp,en.hp+en.mhp*.1);log('🩸 Босс исцелился')}
else if(m=='drain'&&en.mc%3==0){P.mana=Math.max(0,P.mana-25);log('🕳 Босс высосал 25 маны')}
else if(m=='rage'&&en.mc%4==0&&(en.rg||0)<5){en.rg=(en.rg||0)+1;en.atk=Math.round(en.atk*1.15);log('🔥 Босс в ярости!')}}
function enemyTurn(){const s=stats();en.t--;if(P.buffs.length)P.buffs=P.buffs.map(b=>({...b,t:b.t-1})).filter(b=>b.t>0);if(s.spider&&mv%4==0){en.t++;log('🕸 Паутина замедлила врага')}if(en.poison>0){en.hp-=en.poison*2;en.poison--}if(en.burn>0){en.hp-=en.bd;en.burn--}
if(en.a.includes('Регенерирует'))en.hp=Math.min(en.mhp,en.hp+en.mhp*.05);if(s.regen)P.hp=Math.min(s.mhp,P.hp+s.regen*3);
if(en.hp<=0){kill();return}if(en.t<=0){const ak=en.atk*(en.a.includes('Берсерк')&&en.hp<en.mhp/2?1.5:1);hurt(ak);log(`${en.n} бьёт на ${Math.round(ak*100/(100+s.armor))}`);if(en.a.includes('Вампир'))en.hp=Math.min(en.mhp,en.hp+Math.round(ak*.5));if(en.a.includes('Иссушающий'))P.mana=Math.max(0,P.mana-10);en.t=en.spd;
if(s.thorns&&!dead){en.hp-=s.thorns;log('🌵 Шипы: враг получил '+s.thorns);if(en.hp<=0)kill()}}}
function die(){dead=0;P.st.deaths++;if(M&&M.dg)dgEnd('Вы пали в Бездне');else if(M){log('✖ Карта провалена и сгорела.');M=null}log('✖ Вы погибли. Потеряно 10% золота.');P.gold=Math.floor(P.gold*.9);P.hp=stats().mhp;P.sh=0;spawn()}
