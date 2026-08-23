(function(){'use strict';
function init(){
  var controls=document.getElementById('controls'), run=document.getElementById('run');
  if(!controls||!run)return;
  var timer=setInterval(function(){
    var canvas=document.getElementById('wheelCanvas'), input=document.getElementById('items');
    if(!canvas||!input)return;
    clearInterval(timer);
    var oldInput=input.cloneNode(true), oldRun=run.cloneNode(true);
    input.parentNode.replaceChild(oldInput,input); run.parentNode.replaceChild(oldRun,run);
    run=oldRun; input=oldInput;
    var remove=document.getElementById('removeWinner');
    var ctx=canvas.getContext('2d'), rotation=0, spinning=false;
    function rand32(){var a=new Uint32Array(1);window.crypto.getRandomValues(a);return a[0]}
    function randInt(min,max){var span=max-min+1,limit=Math.floor(4294967296/span)*span,v;do{v=rand32()}while(v>=limit);return min+(v%span)}
    function values(){return input.value.split(/[\n,]+/).map(function(x){return x.trim()}).filter(Boolean).filter(function(v,i,a){return a.indexOf(v)===i})}
    function draw(){
      var a=values();if(!a.length)a=['Add entries'];
      var dpr=window.devicePixelRatio||1,w=canvas.clientWidth||520;canvas.width=w*dpr;canvas.height=w*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,w);
      var cx=w/2,cy=w/2,r=w/2-12,s=2*Math.PI/a.length;ctx.save();ctx.translate(cx,cy);ctx.rotate(rotation*Math.PI/180);
      var colours=['#6b57f1','#ff5f98','#14b8a6','#f59e0b','#06b6d4','#8b5cf6','#ef4444','#22c55e','#3b82f6','#ec4899','#84cc16','#f97316'];
      a.forEach(function(item,i){var start=-Math.PI/2+i*s,end=start+s;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,start,end);ctx.closePath();ctx.fillStyle=colours[i%colours.length];ctx.fill();ctx.strokeStyle='rgba(255,255,255,.92)';ctx.lineWidth=2;ctx.stroke();ctx.save();ctx.rotate(start+s/2);ctx.fillStyle='#fff';ctx.font=(a.length>12?'12px':'15px')+' Inter,Arial,sans-serif';ctx.fontWeight='800';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillText(item.length>19?item.slice(0,18)+'…':item,r-18,0);ctx.restore()});
      ctx.restore();
    }
    function sync(){draw();canvas.style.transform='rotate(0deg)'}
    input.addEventListener('input',sync);window.addEventListener('resize',sync);sync();
    run.addEventListener('click',function(){
      if(spinning)return;var a=values();if(a.length<2){var out=document.getElementById('result');out.className='result error-result';out.textContent='Add at least two entries for the wheel.';return}
      spinning=true;run.disabled=true;var winner=randInt(0,a.length-1),slice=360/a.length,center=winner*slice+slice/2,delta=((360-center-(rotation%360))+360)%360+360*5+randInt(0,2)*360,target=rotation+delta;
      canvas.style.transition='transform 1.7s cubic-bezier(.12,.74,.22,1)';canvas.style.transform='rotate('+target+'deg)';
      setTimeout(function(){rotation=target%360;canvas.style.transition='none';canvas.style.transform='rotate('+rotation+'deg)';draw();var out=document.getElementById('result');out.className='result';out.innerHTML='<div class="result-main">🎡 '+String(a[winner]).replace(/[&<>\"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})+'</div>';var copy=document.createElement('button');copy.type='button';copy.className='copy-result';copy.textContent='Copy result';copy.onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(a[winner]).then(function(){copy.textContent='Copied ✓';setTimeout(function(){copy.textContent='Copy result'},1000)})};out.appendChild(copy);if(remove&&remove.checked){a.splice(winner,1);input.value=a.join('\n');sync()}spinning=false;run.disabled=false},1750);
    });
  },50);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
