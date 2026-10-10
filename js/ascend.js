// ---- ascendancy (level 60): 3 subclasses per class, each with a 5-node mini-branch ----
const ASC=[
[{n:'Берсерк',d:'Урон ценой защиты',s:[['inc',6],['crit',2],['hp',15],['inc',6]],k:['Неистовство','+30% урона, −20% здоровья',{inc:30,hpMul:.8}]},
{n:'Страж',d:'Броня и шипы',s:[['armor',8],['hp',20],['thorns',4],['armor',8]],k:['Несокрушимый','+40 брони, +10 шипов',{armor:40,thorns:10}]},
{n:'Палач',d:'Критические удары',s:[['crit',3],['critDmg',15],['inc',5],['crit',3]],k:['Казнь','+60% крит. урона, +6% крита',{critDmg:60,crit:6}]}],
[{n:'Пиромант',d:'Чистый урон',s:[['inc',6],['mana',10],['dmg',2],['inc',6]],k:['Пламя Бездны','+35% урона, +20 маны',{inc:35,mana:20}]},
{n:'Криомант',d:'Щит и контроль',s:[['shield',8],['mana',10],['regen',1],['shield',8]],k:['Вечная мерзлота','+40 щита, +2 реген',{shield:40,regen:2}]},
{n:'Архимаг',d:'Мана и каскады',s:[['manaGain',10],['mana',12],['casc',.05],['manaGain',10]],k:['Мастер потока','+25% каскадов, +40% маны с рун',{casc:.25,manaGain:40}]}],
[{n:'Охотник',d:'Меткие криты',s:[['crit',3],['inc',5],['luck',4],['crit',3]],k:['Меткий глаз','+10% крита, +25% крит. урона',{crit:10,critDmg:25}]},
{n:'Стрелок',d:'Постоянный урон',s:[['inc',6],['dmg',2],['crit',2],['inc',6]],k:['Град стрел','+30% урона',{inc:30}]},
{n:'Разведчик',d:'Удача и добыча',s:[['luck',6],['gold',8],['regen',1],['luck',6]],k:['Тропа удачи','+30% удачи, +30% золота',{luck:30,gold:30}]}],
[{n:'Грабитель',d:'Золото и удача',s:[['gold',10],['luck',5],['gold',10],['luck',5]],k:['Золотая жила','+60% золота, +20% удачи',{gold:60,luck:20}]},
{n:'Дуэлянт',d:'Урон и броня',s:[['inc',6],['crit',2],['armor',6],['inc',6]],k:['Мастер клинка','+25% урона, +15 брони',{inc:25,armor:15}]},
{n:'Везунчик',d:'Шанс и криты',s:[['luck',8],['crit',2],['luck',8],['gold',6]],k:['Игрок','+50% удачи, +8% крита',{luck:50,crit:8}]}],
[{n:'Убийца',d:'Удар из тени',s:[['crit',3],['critDmg',15],['inc',5],['crit',3]],k:['Удар из тени','+40% урона, −15% здоровья',{inc:40,hpMul:.85}]},
{n:'Чародей хаоса',d:'Щит и мана',s:[['shield',8],['mana',10],['regen',1],['shield',8]],k:['Хаос-щит','+60 щита, +1 реген',{shield:60,regen:1}]},
{n:'Призрак',d:'Выживание',s:[['armor',8],['regen',1],['hp',15],['regen',1]],k:['Эфирность','+3 реген, +30 брони',{regen:3,armor:30}]}],
[{n:'Целитель',d:'Здоровье и реген',s:[['hp',20],['regen',1],['hp',20],['regen',1]],k:['Благодать','+60 здоровья, +3 реген',{hp:60,regen:3}]},
{n:'Инквизитор',d:'Урон и лечение',s:[['inc',6],['redHeal',1],['crit',2],['inc',6]],k:['Карающий свет','+25% урона, красные руны лечат +2',{inc:25,redHeal:2}]},
{n:'Хранитель',d:'Защита',s:[['armor',8],['shield',8],['hp',15],['armor',8]],k:['Священный щит','+40 щита, +30 брони',{shield:40,armor:30}]}]];
const ascNodes=()=>{const sb=ASC[P.cls][P.asc.sub];return[...sb.s.map(([k,v],i)=>({n:sb.n+': '+['закалка','выучка','мощь','мастерство'][i],d:'+'+(k=='casc'?Math.round(v*100)+'% каскадов':v+L[k]),m:{[k]:v}})),{n:sb.k[0],d:sb.k[1],m:sb.k[2],key:1}]};
const ascPts=()=>P.asc?3+(P.lv>=70?1:0)+(P.lv>=80?1:0)-P.asc.al.length:0;
let ascLater=0;
function showAsc(){if(MD)return;MD=1;const sbs=ASC[P.cls];
$('#cc').innerHTML=`<h3>Восхождение</h3><small style="color:var(--mu)">Вы достигли 60 уровня. Выберите подкласс: он открывает мини-ветку из 5 узлов (3 очка сразу, ещё по одному на 70 и 80 уровне). Выбор окончателен.</small>`+sbs.map((sb,i)=>`<div class="it" style="--rc:#e6cf8c"><b>${sb.n}</b><small>${sb.d}</small><small>Ключевой узел: <b style="color:var(--tx)">${sb.k[0]}</b> — ${sb.k[1]}</small><div class="bt"><button data-sub="${i}">Выбрать: ${sb.n}</button></div></div>`).join('')+'<div class="mb"><button data-later="1">Позже</button></div>';
$('#cp').classList.add('show')}
function maybeAsc(){if(P.lv>=60&&!P.asc&&!ascLater&&!MD&&en)showAsc()}
function ascHtml(){if(!P.asc){return P.lv>=60?'<div class="df nd"><b>Восхождение доступно!</b><div class="mb"><button data-asc="pick">Выбрать подкласс</button></div></div>':`<div class="df nd" style="color:var(--mu)">🔒 Восхождение откроется на 60 уровне (сейчас ${P.lv}): подкласс и мини-ветка из 5 узлов.</div>`}
const sb=ASC[P.cls][P.asc.sub],pts=ascPts();
return `<h4 style="margin:12px 0 4px;color:var(--ac)">Восхождение: ${sb.n}</h4><small style="color:var(--mu)">${sb.d} · Очков: <b style="color:var(--tx)">${pts}</b>${P.lv<80?' · ещё очки на '+(P.lv<70?'70 и 80':'80')+' уровне':''}</small>`+ascNodes().map((nd,i)=>{const ok=P.asc.al.includes(i),can=!ok&&pts>0&&(i==0||P.asc.al.includes(i-1));
return `<div class="it" style="--rc:${nd.key?'#f2a96b':'#e6cf8c'}"><b>${ok?'✓ ':''}${nd.n}</b><small>${nd.d}</small>${ok?'':`<div class="bt"><button data-asn="${i}" ${can?'':'disabled'}>${can?'Взять узел':i>0&&!P.asc.al.includes(i-1)?'Сначала предыдущий':'Нет очков'}</button></div>`}</div>`}).join('')}
