(function(){
  'use strict';
  var INTENTS={
    football:['game','sport','team','team name','who goes first','challenge'],soccer:['game','sport','team','team name','who goes first'],
    dinner:['meal','food','snack','breakfast','dessert','cuisine','restaurant'],lunch:['meal','food','snack','cuisine'],breakfast:['breakfast','meal','food'],
    gaming:['game','gamer','board game','pokemon','challenge'],games:['game','gamer','board game','party game','challenge'],
    school:['classroom','school subject','student','picker','wheel','activity'],classroom:['classroom','school subject','student','picker','wheel','activity'],
    party:['party game','truth or dare','would you rather','charades','wheel','challenge'],group:['group','team','game','wheel','who goes first'],
    names:['name','username','gamer name','fantasy name','pet name','team name'],name:['name','username','gamer name','fantasy name','pet name','team name'],
    travel:['country','continent','holiday destination','language','city'],holiday:['holiday destination','country','continent','activity'],holidays:['holiday destination','country','continent','activity'],
    creative:['drawing prompt','writing prompt','activity','fantasy name','word'],writing:['writing prompt','word','creative'],drawing:['drawing prompt','random shape','colour'],
    decide:['picker','wheel','yes or no','who goes first','coin flip'],decision:['picker','wheel','yes or no','who goes first','coin flip'],
    food:['meal','food ingredient','snack','breakfast','dessert','restaurant cuisine'],pet:['pet name','animal','colour'],pets:['pet name','animal','colour'],
    work:['team','team name','picker','who goes first'],teams:['random team','team name','picker','who goes first']
  };
  function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();}
  function score(card,q){
    var name=norm(card.querySelector('b')?card.querySelector('b').textContent:''),desc=norm(card.querySelector('span')?card.querySelector('span').textContent:''),href=norm(card.getAttribute('href')||'');
    var text=name+' '+desc+' '+href,score=0;
    if(name===q)score+=100;if(name.indexOf(q)>=0)score+=45;if(text.indexOf(q)>=0)score+=25;
    (INTENTS[q]||[]).forEach(function(k){var n=norm(k);if(text.indexOf(n)>=0)score+=18;});
    q.split(' ').forEach(function(w){if(w.length>2&&text.indexOf(w)>=0)score+=7;});
    return score;
  }
  function icon(name){var n=norm(name);if(n.indexOf('game')>=0||n.indexOf('gamer')>=0)return'🎮';if(n.indexOf('name')>=0||n.indexOf('username')>=0)return'✨';if(n.indexOf('food')>=0||n.indexOf('meal')>=0||n.indexOf('snack')>=0||n.indexOf('breakfast')>=0||n.indexOf('dessert')>=0||n.indexOf('cuisine')>=0)return'🍴';if(n.indexOf('country')>=0||n.indexOf('continent')>=0||n.indexOf('travel')>=0||n.indexOf('holiday')>=0)return'🌍';if(n.indexOf('colour')>=0)return'🎨';if(n.indexOf('wheel')>=0)return'🎡';if(n.indexOf('movie')>=0)return'🎬';if(n.indexOf('word')>=0||n.indexOf('letter')>=0)return'🔤';if(n.indexOf('school')>=0||n.indexOf('classroom')>=0)return'📚';if(n.indexOf('picker')>=0||n.indexOf('decision')>=0||n.indexOf('yes or no')>=0)return'✅';return'✦';}
  function render(input){
    var results=document.getElementById('v3-search-results'),count=document.getElementById('v3-search-count'),dir=document.getElementById('v3-directory');if(!results||!dir)return;
    var q=norm(input.value);if(!q){count.textContent='';results.innerHTML='';results.classList.remove('has-results');return;}
    var cards=Array.prototype.slice.call(dir.querySelectorAll('.v3-card')).map(function(c){return{card:c,score:score(c,q)}}).filter(function(x){return x.score>0}).sort(function(a,b){return b.score-a.score}).slice(0,12);
    count.textContent=cards.length+' smart result'+(cards.length===1?'':'s');
    if(!cards.length){results.innerHTML='<div class="search-empty"><span class="search-empty-icon">🔎</span><div><strong>No close match yet</strong><small>Try <em>dinner</em>, <em>football</em>, <em>gaming</em>, <em>school</em>, <em>party</em>, <em>travel</em> or <em>names</em>.</small></div></div>';results.classList.add('has-results');return;}
    results.innerHTML='<div class="search-results-heading"><strong>'+cards.length+' smart '+(cards.length===1?'match':'matches')+'</strong><span>Open one directly</span></div><div class="search-results-grid">'+cards.map(function(x){var c=x.card,href=c.getAttribute('href'),name=c.querySelector('b')?c.querySelector('b').textContent:'Tool',desc=c.querySelector('span')?c.querySelector('span').textContent:'Open tool';return'<a class="search-result-card" href="'+href+'"><span class="search-result-icon">'+icon(name)+'</span><span class="search-result-copy"><b>'+name.replace(/[&<>\"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch];})+'</b><small>'+desc.replace(/[&<>\"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch];})+'</small></span><span class="search-result-arrow">→</span></a>';}).join('')+'</div>';
    results.classList.add('has-results');
  }
  function boot(){
    var input=document.getElementById('v3-search');if(!input||input.dataset.rsSearch)return;input.dataset.rsSearch='1';
    input.addEventListener('input',function(e){e.stopImmediatePropagation();render(input);},true);
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=document.querySelector('#v3-search-results a.search-result-card');if(a){e.preventDefault();a.click();}}},true);
    render(input);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(boot,800);});else setTimeout(boot,800);
})();
