// ---- atlas ----
const MM={skull:['Череполомы','Черепов на поле почти вдвое больше'],shuffle:['Хаос рун','Поле перемешивается каждые 5 ходов'],stone:['Каменная кожа','Красные руны бьют на 30% слабее'],fast:['Стремительные','Враги бьют на ход быстрее'],tough:['Живучие','У врагов +40% здоровья'],fierce:['Свирепые','Враги наносят на 30% больше урона'],curse:['Проклятая мана','Синие руны дают на 40% меньше маны']};
const TC=['#cfcfcf','#7c9bff','#7cd6ff','#ffd34a','#ff8a4a'];
const lv=()=>M?M.map.lvl:S.stage,hasMod=x=>!!M&&M.map.mods.includes(x),rwm=m=>1+.3*m.mods.length+.1*(m.t-1)+(m.dg?.03*(m.lvl-m.b0):0);
function mkMap(){const t=ri(1,Math.min(5,1+Math.floor(S.stage/4))),ids=Object.keys(MM),mods=[];for(let n=ri(0,Math.min(3,t));n>0;n--)mods.push(pick(ids.filter(i=>!mods.includes(i))));
return{t,lvl:S.stage+(t-1)*2,mods,name:pick(['Склеп','Пещеры','Руины','Топи','Бастион'])+' '+pick(['Теней','Бездны','Костей','Забвения'])}}
function enterMap(i){if(M||busy)return;const mp=P.maps.splice(i,1)[0];if(!mp)return;M={map:mp,n:0,total:5};mv=0;log('🗺 Вход в карту «'+mp.name+'»');spawn();drawUI()}
function enterDg(){if(M||busy)return;M={map:{t:1,lvl:S.stage,b0:S.stage,mods:[],name:'Бесконечная Бездна',dg:1},n:0,total:1e9,dg:1};mv=0;log('🌀 Вы спустились в Бесконечную Бездну');spawn();drawUI()}
function dgEnd(why){const n=M.n,c=Math.floor(n/5),g=Math.round(n*(20+M.map.b0*6));P.chaos+=c;P.gold+=g;if(n>P.dgBest)P.dgBest=n;log(`🌀 ${why}: врагов ${n}, награда +${g}🪙, +${c}◎`);if(n>=5)Q.push(gen(true));M=null}
function finishMap(){const mp=M.map,rm=rwm(mp),s=stats(),g=Math.round((100+mp.lvl*20)*rm*(1+s.gold/100)),c=Math.ceil(rm*2);
P.gold+=g;P.chaos+=c;P.st.maps++;log(`🏆 Карта пройдена! +${g}🪙, +${c} Сфер Хаоса`);Q.push(gen(true));if(mp.mods.length>=2)Q.push(gen(true));M=null;spawn()}
