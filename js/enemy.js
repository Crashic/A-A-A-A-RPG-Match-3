// ---- enemy ----
function spawn(){const lw=lv(),boss=M?(M.dg?M.n%5==4:M.n==M.total-1):S.stage%5==0,a=[];if(lw>1)for(let i=0;i<(boss?2:Math.random()<.5?1:0);i++){const x=pick(['Регенерирует','Быстрый','Взрывной','Вампир','Иссушающий','Призрачный','Щитоносец','Берсерк']);if(!a.includes(x))a.push(x)}
const hp=Math.round((60+lw*35)*(boss?3:1)*(hasMod('tough')?1.4:1));
en={n:boss?pick(['Владыка Осколков','Бездонный Король','Королева Пауков','Лорд Вампиров','Пожиратель Душ']):pick(['Скелет-страж','Тень Бездны','Гнилой упырь','Культист','Каменный голем','Паук-ткач','Призрак шахты','Вурдалак','Рыцарь Бездны']),boss,hp,mhp:hp,atk:Math.round(8+lw*2.2)*(boss?1.5:1)*(hasMod('fierce')?1.3:1),spd:Math.max(2,(a.includes('Быстрый')?3:4)-(hasMod('fast')?1:0)),t:4,a,poison:0,burn:0,bd:0,mc:0};en.t=en.spd;if(a.includes('Щитоносец'))en.sh=Math.round(hp*.25);if(boss){en.mech=pick(Object.keys(MECH));log('⚠ Босс: '+MECH[en.mech][0]+' — '+MECH[en.mech][1])}}
function kill(){const s=stats(),rm=M?rwm(M.map):1;log(`☠ ${en.n} повержен`);P.st.kills++;if(en.boss)P.st.bosses++;if(P.pet&&P.pets[P.pet])P.pets[P.pet].xp+=en.boss?3:1;if(en.boss&&Math.random()<.3){const f=Object.keys(PETS).filter(k=>!P.pets[k]);if(f.length){const k=pick(f);P.pets[k]={xp:0};if(!P.pet)P.pet=k;log('🥚 Питомец найден: '+PETS[k].n);toast('🥚 Питомец: '+PETS[k].i+' '+PETS[k].n)}}if(en.a.includes('Взрывной')){log('Взрыв!');hurt(15)}
{const bl=P.eq.p;if(bl&&bl.flasks)bl.flasks.forEach(f=>{if(f)f.c=Math.min(FL[f.t].m,f.c+(en.boss?2:1))})}
P.xp+=Math.round((40+lv()*25)*rm);P.gold+=Math.round((10+lv()*5)*(1+s.gold/100)*rm);
while(P.xp>=need(P.lv)){P.xp-=need(P.lv);P.lv++;P.pts++;log('★ Уровень '+P.lv+'! +1 очко древа')}
if(Math.random()<Math.min(.95,.7*rm)||en.boss){const it=gen(en.boss);Q.push(it);log(`Выпало: <span style="color:${RC[it.r]}">${it.name}</span>`)}
if(Math.random()<.3*rm+(en.boss?.5:0)){P.chaos++;log('Выпала Сфера Хаоса')}
if(Math.random()<.22+(en.boss?.35:0)){const g=pick(Object.keys(GEMS));P.gems.push(g);P.st.gems++;log(`💎 Самоцвет: ${GEMS[g].i} ${GEMS[g].n}`)}
if(P.maps.length<12&&lv()>=3&&Math.random()<(en.boss?.5:.1)){const mp=mkMap();P.maps.push(mp);log('🗺 Выпала карта: '+mp.name)}
const m=stats();P.hp=Math.min(m.mhp,P.hp+m.mhp*.2);
if(M){M.n++;if(M.dg){M.map.lvl++;if(M.n>P.dgBest)P.dgBest=M.n;if(M.n%10==0&&M.map.mods.length<4){const x=pick(Object.keys(MM).filter(y=>!M.map.mods.includes(y)));M.map.mods.push(x);log('🌀 Бездна искажается: '+MM[x][0])}}if(M.n>=M.total)finishMap();else spawn()}else{S.stage++;spawn()}
showDrop()}
function hurt(x){const s=stats();x=Math.round(x*100/(100+s.armor));const ab=Math.min(P.sh,x);P.sh-=ab;P.hp-=x-ab;if(P.hp<=0){P.hp=0;dead=1}}
function hit(base,casc,s,cb){let x=base*(1+s.inc/100)*(1+s.casc*casc)*s.baseMul;if(Math.random()*100<s.crit+(cb||0))x*=1.5+s.critDmg/100;x=Math.round(x*(en.a.includes('Призрачный')?.7:1));if(en.sh>0){const ab=Math.min(en.sh,x);en.sh-=ab;x-=ab}en.hp-=x}
