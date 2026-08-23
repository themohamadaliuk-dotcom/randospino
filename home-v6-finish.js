(function(){
  'use strict';
  var TOPICS=[
    ['Families','👨‍👩‍👧','random-game','random-meal','random-challenge','wheel-spinner'],
    ['Parties','🎉','party-game-generator','random-truth-or-dare','random-would-you-rather','random-charades','wheel-spinner'],
    ['Classrooms','🏫','random-classroom-choice','random-picker-for-classroom','random-wheel-for-students','random-school-subject'],
    ['Work','💼','random-team-generator-for-work','random-picker','team-name-generator','random-team'],
    ['Couples','❤️','couples-decision-maker','random-date-idea','random-meal','random-movie'],
    ['Gamers','🎮','random-game','gamer-name-generator','random-board-game','random-pokemon'],
    ['Groups','👥','random-team','who-goes-first','random-game','wheel-spinner']
  ];
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function toolBySlug(slug){var a=document.querySelectorAll('#v3-directory .v3-card');for(var i=0;i<a.length;i++){var href=a[i].getAttribute('href')||'';if(href.indexOf('./'+slug+'/')===0)return a[i];}return null;}
  function addForSection(){var host=document.querySelector('.v3-discovery');if(!host||document.getElementById('v6-for'))return;var section=document.createElement('section');section.id='v6-for';section.className='v6-for';section.innerHTML='<div class="v6-section-head"><div><span class="kicker">RandoSpino for…</span><h3>Pick the experience that fits.</h3></div><p>Quick starting points for the moments where you need a little help choosing.</p></div><div class="v6-for-grid">'+TOPICS.map(function(t){return'<div class="v6-for-card"><div class="v6-for-title"><span>'+t[1]+'</span><b>'+esc(t[0])+'</b></div><div class="v6-for-links">'+t.slice(2).map(function(slug){var el=toolBySlug(slug);if(!el)return '';return'<a href="'+el.getAttribute('href')+'">'+esc((el.querySelector('b')||{}).textContent||slug)+'</a>';}).join('')+'</div></div>';}).join('')+'</div>';
    host.appendChild(section);
  }
  function improveSearch(){
    var input=document.getElementById('v3-search'),results=document.getElementById('v3-search-results'),count=document.getElementById('v3-search-count');
    if(!input||!results||input.dataset.v6finish)return;input.dataset.v6finish='1';
    var intents={
      dinner:['meal','snack','breakfast','dessert','cuisine','food'],
      lunch:['meal','snack','cuisine'],
      gaming:['game','gamer','board','pokemon'],
      gaming:['game','gamer','board','pokemon'],
      school:['school','classroom','subject','student'],
      classroom:['school','classroom','subject','student'],
      party:['party','charades','truth','dare','would you rather','game','wheel'],
      holidays:['holiday','destination','country','continent'],
      travel:['holiday','destination','country','continent'],
      names:['name','username','gamer','fantasy','pet','team'],
      creative:['drawing','writing','prompt','activity','fantasy'],
      decide:['picker','wheel','yes or no','decision','first'],
      teams:['team','picker','who goes first'],
      work:['team','work','picker']
    };
    function candidates(q){
      var cards=document.querySelectorAll('#v3-directory .v3-card'),out=[];q=q.toLowerCase().trim();
      if(!q)return out;
      var keys=intents[q]||[];
      for(var i=0;i<cards.length;i++){
        var c=cards[i],text=(c.textContent||'').toLowerCase(),href=(c.getAttribute('href')||'').toLowerCase();
        var hit=text.indexOf(q)>-1||href.indexOf(q)>-1;
        if(!hit&&keys.length)hit=keys.some(function(k){return text.indexOf(k)>-1||href.indexOf(k)>-1;});
        if(hit)out.push(c);
      }
      return out;
    }
    input.addEventListener('input',function(){
      var q=input.value.trim(),matches=candidates(q);count.textContent=q?(matches.length+' tool'+(matches.length===1?'':'s')+' found'):'';
      if(!q){results.innerHTML='';results.classList.remove('has-results');return;}
      if(!matches.length){results.innerHTML='<div class="search-empty"><span class="search-empty-icon">🔎</span><div><strong>No tools found</strong><small>Try <em>dinner</em>, <em>gaming</em>, <em>school</em>, <em>party</em>, <em>travel</em> or <em>creative</em>.</small></div></div>';results.classList.add('has-results');return;}
      results.innerHTML='<div class="search-results-heading"><strong>'+matches.length+' '+(matches.length===1?'match':'matches')+'</strong><span>Choose a tool</span></div><div class="search-results-grid">'+matches.slice(0,12).map(function(c){var href=c.getAttribute('href'),b=c.querySelector('b'),s=c.querySelector('span');return'<a class="search-result-card" href="'+href+'"><div class="search-result-icon">'+((c.querySelector('.v3-card-icon')||{}).textContent||'✦')+'</div><div class="search-result-copy"><b>'+esc(b?b.textContent:'Tool')+'</b><small>'+esc(s?s.textContent:'Open tool')+'</small></div><span class="search-result-arrow">→</span></a>';}).join('')+'</div>';
      results.classList.add('has-results');
    });
  }
  function boot(){addForSection();improveSearch();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(boot,250);});else setTimeout(boot,250);
})();
