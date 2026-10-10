// ---- tree ----
const ARMS=[['Сила','inc',6,{inc:20,armor:5},'Кровавый пакт','Красные руны лечат, синие руны не дают маны',{redHeal:1,noBlue:1}],
['Разум','mana',15,{mana:40,inc:10},'Мастер каскадов','Каскады ×2 сильнее, но урон рун −50%',{casc:.25,baseMul:.5}],
['Ловкость','crit',2,{crit:6,inc:8},'Тень клинка','+15% крита, здоровье −30%',{crit:15,hpMul:.7}],
['Удача','gold',10,{gold:25,luck:10},'Золотая лихорадка','+40% удачи, урон −15%',{luck:40,inc:-15}],
['Хаос','shield',8,{shield:20,regen:1},'Хаос-ядро','+60 щита, здоровье −50%',{shield:60,hpMul:.5}],
['Жизнь','hp',12,{hp:30,armor:5},'Несокрушимый','+30 брони, урон −10%',{armor:30,inc:-10}]];
const N={c:{id:'c',x:0,y:0,t:0,m:{},name:'Изгнанник',desc:'Начало пути',nb:[]}};
ARMS.forEach((a,i)=>{for(let k=1;k<=5;k++){const id=`a${i}_${k}`,an=(i*60-90)*Math.PI/180,t=k==5?2:k==3?1:0;
const m=t==2?a[6]:t==1?a[3]:{[a[1]]:a[2]};N[id]={id,x:Math.cos(an)*k*42,y:Math.sin(an)*k*42,t,m,name:t==2?a[4]:t==1?a[0]+': заметный':a[0],desc:t==2?a[5]:d(m),nb:[k==1?'c':`a${i}_${k-1}`]}}});
Object.values(N).forEach(n=>n.nb.slice().forEach(b=>N[b].nb.push(n.id)));
for(let i=0;i<6;i++){const a=`a${i}_3`,b=`a${(i+1)%6}_3`;N[a].nb.push(b);N[b].nb.push(a)}
