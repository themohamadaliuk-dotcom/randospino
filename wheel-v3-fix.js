(function(){
  'use strict';
  var KEY='randospino:wheel-items:v2';
  function boot(){
    var input=document.getElementById('wheelItems');
    var canvas=document.getElementById('wheelCanvas');
    if(canvas){
      canvas.style.maxWidth='100%';
      canvas.style.height='auto';
      var parent=canvas.parentElement;
      if(parent){
        var width=Math.max(1,Math.min(520,parent.clientWidth||520));
        canvas.style.width=width+'px';
      }
    }
    if(!input)return;
    try{
      var raw=localStorage.getItem(KEY);
      if(raw!==null){
        var saved=JSON.parse(raw);
        if(Array.isArray(saved)&&saved.length===0&&input.value.trim()!==''){
          input.value='';
          input.dispatchEvent(new Event('input',{bubbles:true}));
        }
      }
    }catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
  window.addEventListener('resize',function(){
    var canvas=document.getElementById('wheelCanvas');
    var parent=canvas&&canvas.parentElement;
    if(!canvas||!parent)return;
    var width=Math.max(1,Math.min(520,parent.clientWidth||520));
    canvas.style.maxWidth='100%';
    canvas.style.width=width+'px';
    canvas.style.height='auto';
  });
})();
