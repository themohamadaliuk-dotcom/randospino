(function(){
  'use strict';

  function esc(s){return String(s).replace(/[&<>\"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}

  function boot(){
    var input=document.getElementById('v3-search');
    var results=document.getElementById('v3-search-results');
    var count=document.getElementById('v3-search-count');
    var directory=document.getElementById('v3-directory');
    if(!input||!results||!directory)return;

    function addRecent(url){
      try{
        var r=JSON.parse(localStorage.getItem('randospino:recent:v3')||'[]').filter(function(x){return x!==url});
        r.unshift(url);
        localStorage.setItem('randospino:recent:v3',JSON.stringify(r.slice(0,12)));
      }catch(e){}
    }

    function render(){
      var q=input.value.toLowerCase().trim();
      var cards=[].slice.call(directory.querySelectorAll('.v3-card'));
      var matches=cards.filter(function(card){
        return !q || ((card.dataset.name||'')+' '+(card.dataset.desc||'')).indexOf(q)>=0;
      });

      if(count)count.textContent=q?(matches.length+' tool'+(matches.length===1?'':'s')+' found'):'';

      if(!q){results.innerHTML='';results.classList.remove('has-results');return;}

      if(!matches.length){
        results.innerHTML='<div class="search-empty"><strong>No tools found</strong><span>Try words like <em>games</em>, <em>names</em>, <em>food</em>, <em>school</em> or <em>random</em>.</span></div>';
        results.classList.add('has-results');
        return;
      }

      results.innerHTML='<div class="search-results-grid">'+matches.map(function(card){
        var href=card.getAttribute('href')||'#';
        var name=card.dataset.name||'';
        var desc=card.dataset.desc||'';
        var displayName=card.querySelector('b')?card.querySelector('b').textContent:name;
        var displayDesc=card.querySelector('span:not(.v3-card-top)')?card.querySelector('span:not(.v3-card-top)').textContent:desc;
        return '<a class="search-result-card" href="'+href+'"><span class="search-result-icon">✦</span><span><b>'+esc(displayName)+'</b><small>'+esc(displayDesc)+'</small></span><span class="search-result-arrow">→</span></a>';
      }).join('')+'</div>';
      results.classList.add('has-results');
      results.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){addRecent(a.getAttribute('href'))})});
    }

    input.addEventListener('input',render);
    render();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
