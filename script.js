const NS='http://www.w3.org/2000/svg',W=640,H=360,M={l:52,r:14,t:14,b:34};
const ALL='Average of 100 major cities',Y0=1900,Y1=2012;
const $=s=>document.querySelector(s),chaps=[...document.querySelectorAll('.chap')];
let D,cur=0,motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion(on){motion=on;document.documentElement.classList.toggle('nomo',!on);
  $('#motion').textContent='Animation: '+(on?'on':'off');$('#motion').setAttribute('aria-pressed',String(on))}
function el(n,a,p){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function draw(svg,pts,band,animate){
  svg.innerHTML='';
  const x0=pts[0].y,x1=pts[pts.length-1].y;
  const lo=Math.min(...pts.map(d=>d.a-(band?d.u:0))),hi=Math.max(...pts.map(d=>d.a+(band?d.u:0)));
  const xs=v=>M.l+(v-x0)/(x1-x0||1)*(W-M.l-M.r),ys=v=>H-M.b-(v-lo)/(hi-lo||1)*(H-M.t-M.b);
  for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4;
    el('line',{x1:M.l,x2:W-M.r,y1:ys(v),y2:ys(v),class:'grid'},svg);
    el('text',{x:M.l-6,y:ys(v)+4,class:'ax','text-anchor':'end'},svg).textContent=v.toFixed(1)+'°C'}
  const st=(x1-x0)>60?20:(x1-x0)>25?10:5;
  for(let v=Math.ceil(x0/st)*st;v<=x1;v+=st)el('text',{x:xs(v),y:H-10,class:'ax','text-anchor':'middle'},svg).textContent=v;
  if(lo<0&&hi>0)el('line',{x1:M.l,x2:W-M.r,y1:ys(0),y2:ys(0),class:'zero'},svg);
  if(band){const up=pts.map(d=>xs(d.y)+','+ys(d.a+d.u)),dn=pts.map(d=>xs(d.y)+','+ys(d.a-d.u)).reverse();
    el('polygon',{points:up.concat(dn).join(' '),class:'bd'},svg)}
  const p=el('path',{d:'M'+pts.map(d=>xs(d.y)+','+ys(d.a)).join('L'),class:'ln'},svg);
  if(animate&&motion){try{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
    p.getBoundingClientRect();p.style.transition='stroke-dashoffset 3s ease';p.style.strokeDashoffset=0}catch(e){}}
}
function describe(svg,cap,tbl,pts,label,hasU){
  const a=pts[0],b=pts[pts.length-1],ch=b.a-a.a;
  const txt=`${label}: line chart from ${a.y} to ${b.y}. Temperature anomaly moves from ${a.a.toFixed(2)}°C to ${b.a.toFixed(2)}°C, a change of ${ch>=0?'+':''}${ch.toFixed(2)}°C.`;
  svg.setAttribute('aria-label',txt);$(cap).textContent=txt+' Note: the vertical axis does not start at zero.';
  const step=Math.max(1,Math.round(pts.length/15));
  $(tbl).innerHTML='<table><caption class="sr">'+label+'</caption><tr><th scope="col">Year</th><th scope="col">Anomaly (°C)</th>'+(hasU?'<th scope="col">± Uncertainty</th>':'')+'</tr>'+
   pts.filter((_,i)=>i%step==0).map(d=>`<tr><td>${d.y}</td><td>${d.a.toFixed(2)}</td>${hasU?`<td>${d.u.toFixed(2)}</td>`:''}</tr>`).join('')+'</table>';
}
function stripes(anim){
  const s=$('#stripes'),v=D.global,lo=Math.min(...v.map(d=>d.a)),hi=Math.max(...v.map(d=>d.a)),w=W/v.length;s.innerHTML='';
  v.forEach((d,i)=>{const t=(d.a-lo)/(hi-lo),r=el('rect',{x:i*w,y:0,width:w+.5,height:60,fill:`hsl(${Math.round(215-215*t)},70%,50%)`},s);
    if(anim&&motion){r.style.opacity=0;r.style.transition='opacity .5s';r.style.transitionDelay=(i*20)+'ms';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{r.style.opacity=1}))}})}
const ch1=a=>{draw($('#c1'),D.global,false,a);describe($('#c1'),'#cap1','#t1',D.global,ALL,false);stripes(a)};
const ch2=a=>{const b=$('#band').checked;draw($('#c2'),D.global,b,a);describe($('#c2'),'#cap2','#t2',D.global,ALL+(b?' with uncertainty band':''),true)};
function ch3(){
  let f=+$('#from').value,t=+$('#to').value;if(t-f<5){t=f+5;$('#to').value=t}
  $('#ofrom').textContent=' '+f;$('#oto').textContent=' '+t;
  const n=$('#place').value,s=(n===ALL?D.global:D.cities[n]).filter(d=>d.y>=f&&d.y<=t);
  if(s.length<2)return;draw($('#c3'),s,false,false);describe($('#c3'),'#cap3','#t3',s,n,false)}
function go(i){cur=Math.max(0,Math.min(chaps.length-1,i));
  chaps[cur].scrollIntoView({behavior:motion?'smooth':'auto'});chaps[cur].focus({preventScroll:true});
  $('#pos').textContent=`${cur+1} of ${chaps.length}`}
function build(t){
  const L=t.split('\n'),h=L[0].trim().split(','),di=h.indexOf('dt'),vi=h.indexOf('AverageTemperature'),ui=h.indexOf('AverageTemperatureUncertainty'),ci=h.indexOf('City'),m={};
  if(ci<0||vi<0)return null;
  for(let i=1;i<L.length;i++){const r=L[i].split(',');if(r.length<h.length)continue;
    const v=parseFloat(r[vi]);if(isNaN(v))continue;const y=+r[di].slice(0,4);if(y<Y0||y>Y1)continue;
    const k=r[ci].trim(),o=((m[k]=m[k]||{})[y]=m[k][y]||{s:0,u:0,n:0});o.s+=v;o.u+=parseFloat(r[ui])||0;o.n++}
  const ys=[];for(let y=Y0;y<=Y1;y++)ys.push(y);const cs={};
  for(const k in m){const s=m[k];if(!ys.every(y=>s[y]&&s[y].n==12))continue;
    const b=ys.filter(y=>y>=1901&&y<=1930).reduce((p,y)=>p+s[y].s/12,0)/30;
    cs[k]=ys.map(y=>({y,a:+(s[y].s/12-b).toFixed(3),u:+(s[y].u/12).toFixed(3)}))}
  const nm=Object.keys(cs),avg=(i,f)=>+(nm.reduce((p,k)=>p+cs[k][i][f],0)/nm.length).toFixed(3),c={};
  nm.forEach(k=>c[k]=cs[k].map(d=>({y:d.y,a:d.a})));
  return{baseline:'1901-1930',global:ys.map((y,i)=>({y,a:avg(i,'a'),u:avg(i,'u')})),cities:c}}
function init(d){
  D=d;$('#err').hidden=true;
  $('#place').innerHTML=[ALL,...Object.keys(d.cities)].map(c=>`<option>${c}</option>`).join('');
  $('#dl').href=URL.createObjectURL(new Blob([JSON.stringify(d)],{type:'application/json'}));$('#dl').hidden=false;
  ch1(false);ch2(false);ch3();                       // always show charts first (static)
  const seen={};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
    const i=chaps.indexOf(e.target);cur=i;$('#pos').textContent=`${i+1} of ${chaps.length}`;
    if(!seen[i]){seen[i]=1;if(i===1)ch1(true);if(i===2)ch2(true)}}),{threshold:.15});
  chaps.forEach(c=>io.observe(c));
}
function start(){
  if(window.CLIMATE_DATA)return init(window.CLIMATE_DATA);
  fetch('data/data.json').then(r=>{if(!r.ok)throw 0;return r.json()}).then(init).catch(()=>{$('#err').hidden=false});
}
$('#files').onchange=async e=>{
  $('#msg').textContent='Reading file...';let d=null;
  for(const f of e.target.files){d=build(await f.text());if(d)break}
  if(!d||d.global.length<10){$('#msg').textContent='Could not read the data. Choose GlobalLandTemperaturesByMajorCity.csv.';return}
  init(d)};
$('#replay').onclick=()=>D&&ch1(true);$('#band').onchange=()=>D&&ch2(true);
['place','from','to'].forEach(i=>$('#'+i).oninput=()=>D&&ch3());
$('#motion').onclick=()=>setMotion(!motion);
$('#next').onclick=()=>go(cur+1);$('#prev').onclick=()=>go(cur-1);
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
  if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();go(cur+1)}
  if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(cur-1)}});
addEventListener('error',e=>{$('#msg').textContent='Something went wrong: '+e.message;$('#err').hidden=false});
setMotion(motion);$('#pos').textContent='1 of '+chaps.length;start();
