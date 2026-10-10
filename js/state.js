// ---- state ----
const P={lv:1,xp:0,gold:0,chaos:3,pts:1,cls:3,al:new Set(['c']),inv:[],eq:{},hp:100,mana:50,sh:0,gems:['chain','burn','multi','crit'],maps:[],pal:2,buffs:[],dq:null,pets:{},pet:null,dgBest:0,asc:null,ach:[],st:{kills:0,bosses:0,moves:0,maxCasc:0,bombs:0,shards:0,items:0,uniq:0,gems:0,maps:0,deaths:0}};
const Q=[];
// achievements: [id, name, description, current value, target, reward in chaos orbs]
const ACH=[
['kill1','Первая кровь','Победите врага',()=>P.st.kills,1,1],
['kill50','Истребитель','Победите 50 врагов',()=>P.st.kills,50,2],
['kill250','Легион','Победите 250 врагов',()=>P.st.kills,250,5],
['boss3','Охотник на боссов','Победите 3 боссов',()=>P.st.bosses,3,3],
['casc4','Мастер каскадов','Каскад из 4 цепочек за один ход',()=>P.st.maxCasc,4,2],
['bomb5','Подрывник','Создайте 5 бомб',()=>P.st.bombs,5,1],
['shard1','Осколочник','Создайте руну-осколок',()=>P.st.shards,1,2],
['dg20','Бездонная глубина','Победите 20 врагов в Бесконечной Бездне',()=>P.dgBest||0,20,3],
['pet1','Друг зверей','Заведите питомца',()=>Object.keys(P.pets).length,1,1],
['stage10','Глубокий спуск','Дойдите до 10-го этапа',()=>S.stage,10,3],
['map1','Покоритель карт','Пройдите карту',()=>P.st.maps,1,3],
['uni1','Везунчик','Найдите уникальный предмет',()=>P.st.uniq,1,5],
['gem10','Огранщик','Найдите 10 самоцветов',()=>P.st.gems,10,2],
['gold1k','Скряга','Накопите 1000 золота',()=>P.gold,1000,2],
['mv500','Упорство','Сделайте 500 ходов',()=>P.st.moves,500,2],
['asc','Вознесение','Выберите подкласс на 60 уровне',()=>P.asc?1:0,1,5],
['die3','Неудачник','Погибните 3 раза',()=>P.st.deaths,3,1]];
let tT=0;
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>e.classList.remove('show'),2800)}
function checkAch(){ACH.forEach(a=>{if(!P.ach.includes(a[0])&&a[3]()>=a[4]){P.ach.push(a[0]);P.chaos+=a[5];log(`🏆 Достижение: ${a[1]} (+${a[5]}◎)`);toast(`🏆 ${a[1]} · +${a[5]}◎`)}})}
let S={stage:1},en,B=[],sel=-1,busy=0,dead=0,tab='hero',lg=[],M=null,mv=0,ngArm=0,noSave=0,MD=0,GPR=null,selN='',G=null,svT=0;
const KEY='abyss-shards-v2';
const need=l=>Math.floor(100*l**1.8);
function stats(){const s={dmg:5+P.lv,inc:0,hp:100+P.lv*8,mana:100,crit:5,armor:0,gold:0,luck:0,shield:20,regen:0,casc:.25,redHeal:0,noBlue:0,baseMul:1,hpMul:1,spider:0,thorns:0,manaGain:0,critDmg:0};
const add=m=>{for(const k in m){if(k=='baseMul'||k=='hpMul')s[k]*=m[k];else s[k]+=m[k]}};
if(CLS[P.cls])add(CLS[P.cls].b);P.al.forEach(id=>add(N[id].m));if(P.asc)ascNodes().forEach((nd,i)=>{if(P.asc.al.includes(i))add(nd.m)});(P.buffs||[]).forEach(b=>add({[b.k]:b.v}));Object.values(P.eq).forEach(i=>i.mods.forEach(([k,v])=>add({[k]:v})));if(P.pet&&P.pet=='imp'&&P.pets[P.pet])s.gold+=10*petPm('imp');s.mhp=Math.round(s.hp*s.hpMul);return s}
function log(t){lg.unshift(t);lg=lg.slice(0,30);$('#log').innerHTML=lg.join('<br>')}
// ---- save ----
function saveNow(){if(noSave)return;try{localStorage.setItem(KEY,JSON.stringify({v:3,P:{...P,al:[...P.al]},S,en,B,M,Q,mv}))}catch(_){}}
function save(){clearTimeout(svT);svT=setTimeout(saveNow,250)}
function load(){try{const j=JSON.parse(localStorage.getItem(KEY)||'null');if(!j||!(j.v>=2)||!j.P||!j.en)return 0;
Object.assign(P,j.P,{al:new Set(j.P.al)});Object.assign(S,j.S);en=j.en;B=j.B||[];M=j.M||null;mv=j.mv||0;Q.push(...(j.Q||[]));return 1}catch(_){return 0}}
addEventListener('pagehide',saveNow);document.addEventListener('visibilitychange',()=>{if(document.hidden)saveNow()});
