const $=s=>document.querySelector(s),sl=t=>new Promise(r=>setTimeout(r,t)),rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.round(rnd(a,b)),pick=a=>a[Math.floor(Math.random()*a.length)];
const GL=['⚔','✦','☘','◆','☯','☠'],CL=[0,1,2,3,4,5].map(k=>`var(--r${k})`);
// 4 palettes from light to dark (runes, bars and page background); chosen in Settings
const THEMES=[
{n:'Светлая',r:['#e8a0a0','#9db8ee','#a3d6ae','#ecd89a','#c4aee6','#b5b1c2'],gl:'#3a3046',bh:'#e59a9a',bm:'#8fb0ea',bs:'#b9a1e3',bx:'#e6cf8c',be:'#d98a8a',bg:'#2b2536',p:'#383046',p2:'#443b54',bd:'#5a4e70'},
{n:'Мягкая',r:['#cf8f8f','#86a2d6','#8cbf9c','#d2be82','#ab96d2','#908c9e'],gl:'#2a2234',bh:'#d28a8a',bm:'#86a2d6',bs:'#ab96d2',bx:'#d2be82',be:'#c47a7a',bg:'#1f1a28',p:'#2a2336',p2:'#352d44',bd:'#4a3f5c'},
{n:'Тёмная',r:['#b87474','#7089c4','#72a583','#bba466','#9a80c4','#78748a'],gl:'#f4eef8',bh:'#c97d7d',bm:'#6f8fd0',bs:'#9d86cc',bx:'#c9b36e',be:'#b96868',bg:'#15111b',p:'#1e1827',p2:'#292135',bd:'#3a2f48'},
{n:'Глубокая',r:['#96505a','#4f68a0','#4f8662','#9a8444','#74589e','#5c586c'],gl:'#ece6f2',bh:'#a8545e',bm:'#4f6cae',bs:'#7a5fae',bx:'#a58f4a',be:'#8e464e',bg:'#09070c',p:'#120e18',p2:'#1b1523',bd:'#2a2234'}];
function applyTheme(){const t=THEMES[P.pal]||THEMES[2],st=document.documentElement.style;t.r.forEach((c,k)=>st.setProperty('--r'+k,c));
st.setProperty('--gl',t.gl);['bh','bm','bs','bx','be','bg','p','p2','bd'].forEach(k=>st.setProperty('--'+k,t[k]))}
const RC=['#d8d4e0','#9db4ff','#f0d98a','#f2a96b'],RN=['Обычный','Магический','Редкий','Уникальный'];
const L={inc:'% урона',hp:' здоровья',mana:' маны',crit:'% крита',armor:' брони',gold:'% золота',shield:' щита',dmg:' ур.',luck:'% удачи',regen:' регена',redHeal:' лечения от красных рун',thorns:' урона врагу при ударе',manaGain:'% маны с рун',critDmg:'% крит. урона'};
const AFF=[['inc',4,12],['hp',10,30],['mana',10,30],['crit',1,4],['armor',4,15],['gold',5,15],['shield',5,15],['dmg',1,3],['luck',3,10]];
const SLOT={w:'Оружие',h:'Шлем',a:'Броня',g:'Перчатки',b:'Ботинки',p:'Пояс',r:'Кольцо',m:'Амулет'},
NM={w:['Топор','Клинок','Посох'],h:['Шлем','Капюшон'],a:['Кираса','Мантия'],g:['Перчатки','Рукавицы'],b:['Сапоги','Ботинки'],p:['Пояс','Кушак'],r:['Кольцо','Перстень'],m:['Амулет','Талисман']};
const BASE={w:['dmg',2],h:['armor',4],a:['armor',8],g:['inc',3],b:['regen',1],p:['hp',15],r:['mana',10],m:['crit',2]};
const MAXS={w:4,h:3,a:4,g:2,b:2,p:2,r:2,m:2},BS={w:2,h:1,a:2,g:1,b:1,p:1,r:1,m:1};
// uniques: fixed stats + special effect
const UNI=[
{n:'Кровавый Клык',s:'w',m:[['dmg',3],['redHeal',1],['crit',4]],fx:'Красные руны лечат вас сильнее'},
{n:'Шлем Паука',s:'h',m:[['armor',8],['spider',1],['hp',20]],fx:'Каждый 4-й ход враг опутан паутиной: +1 ход до удара'},
{n:'Кираса Стража',s:'a',m:[['armor',15],['thorns',15],['hp',25]],fx:'Враг получает урон, когда бьёт вас'},
{n:'Перчатки Берсерка',s:'g',m:[['inc',25],['crit',5],['hpMul',.85]],fx:'−15% к здоровью'},
{n:'Сапоги Ветра',s:'b',m:[['manaGain',50],['regen',2],['luck',10]],fx:'Синие руны дают на 50% больше маны'},
{n:'Пояс Бури',s:'p',m:[['casc',.2],['shield',20],['hp',20]],fx:'Каскады на 20% сильнее'},
{n:'Перстень Мидаса',s:'r',m:[['gold',60],['luck',25]],fx:'Золото и удача растут'},
{n:'Амулет Хаоса',s:'m',m:[['crit',8],['critDmg',50],['mana',20]],fx:'Критические удары бьют сильнее'}];
// classes: start arm on the tree, bonuses, starter kit
const CLS=[
{n:'Воин',arm:0,b:{hp:30,armor:5},d:'+30 здоровья, +5 брони. Старт в ветке Силы.',w:['Ржавый топор',['chain','emp',null]],a:['ice',null],gems:['fire','burn','multi','crit']},
{n:'Колдун',arm:1,b:{mana:30,inc:5},d:'+30 маны, +5% урона. Старт в ветке Разума.',w:['Посох ученика',['fire','multi',null]],a:['ice',null],gems:['chain','emp','burn','crit']},
{n:'Следопыт',arm:2,b:{crit:4,luck:5},d:'+4% крита, +5% удачи. Старт в ветке Ловкости.',w:['Короткий лук',['chain','crit',null]],a:['ice',null],gems:['fire','emp','burn','multi']},
{n:'Авантюрист',arm:3,b:{gold:15,luck:10},d:'+15% золота, +10% удачи. Старт в ветке Удачи.',w:['Ржавый клинок',['fire','emp',null]],a:['ice',null],gems:['chain','burn','multi','crit']},
{n:'Тень',arm:4,b:{shield:15,regen:1},d:'+15 щита, +1 реген. Старт в ветке Хаоса.',w:['Тёмный кинжал',['ice','burn',null]],a:['chain',null],gems:['fire','emp','multi','crit']},
{n:'Жрец',arm:5,b:{hp:20,regen:1},d:'+20 здоровья, +1 реген. Старт в ветке Жизни.',w:['Жезл света',['heal','emp',null]],a:['fire',null],gems:['ice','chain','burn','multi']}];
const d=m=>Object.entries(m).map(([k,v])=>'+'+v+L[k]).join(', ');
// ---- gems ----
const GEMS={fire:{k:'a',i:'🔥',n:'Огненный шар',c:30,m:6,f:'burn',d:'Урон ×6 и поджог'},
ice:{k:'a',i:'❄',n:'Ледяной шип',c:20,m:4,f:'ice',d:'Урон ×4, враг заморожен на 2 хода'},
chain:{k:'a',i:'⚡',n:'Цепная молния',c:40,m:3,h:3,d:'3 удара по ×3'},
heal:{k:'a',i:'✚',n:'Целебный свет',c:35,m:0,f:'heal',d:'Лечит 25% здоровья'},
emp:{k:'s',i:'⬆',n:'Усиление',d:'+40% урона, +30% к цене маны'},
burn:{k:'s',i:'♨',n:'Ожог',d:'Поджигает врага на 3 хода'},
multi:{k:'s',i:'✴',n:'Множ. снаряды',d:'+1 попадание, +20% к цене маны'},
crit:{k:'s',i:'🎯',n:'Меткость',d:'+30% шанса крита, +10% к цене маны'}};
