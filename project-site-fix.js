(function(){
  'use strict';
  function fix(){
    var root='../';
    if(location.pathname==='/randospino/'||location.pathname==='/randospino') root='./';
    document.querySelectorAll('a[href="/"]').forEach(function(a){a.setAttribute('href',root);});
    document.querySelectorAll('a[href^="/#"]').forEach(function(a){
      a.setAttribute('href',root+a.getAttribute('href').slice(2));
    });
    var wheel=document.querySelector('.wheel-shell');
    if(wheel){
      wheel.style.setProperty('background','transparent','important');
      wheel.style.setProperty('border','0','important');
      wheel.style.setProperty('box-shadow','none','important');
      wheel.style.setProperty('padding','4px 8px 0','important');
      wheel.style.setProperty('margin','0 0 0','important');
      var canvas=wheel.querySelector('.wheel-canvas');
      if(canvas) canvas.style.setProperty('background','transparent','important');
      var button=wheel.nextElementSibling;
      if(button&&button.classList.contains('action')) button.style.setProperty('margin-top','6px','important');
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fix); else fix();
})();
