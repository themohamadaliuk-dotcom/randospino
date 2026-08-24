(function(){
  'use strict';

  var RELATED={
    'random-number':['random-picker','dice-roller','random-letter','random-word'],
    'coin-flip':['yes-or-no','dice-roller','who-goes-first','random-picker'],
    'dice-roller':['coin-flip','random-number','random-game','random-picker'],
    'random-name':['username-generator','gamer-name-generator','fantasy-name-generator','pet-name-generator'],
    'random-word':['random-writing-prompt','random-drawing-prompt','random-letter','random-emoji'],
    'random-country':['random-continent','random-holiday-destination','random-language','random-city'],
    'random-colour':['random-colour-name','random-colour-hex','random-drawing-prompt','random-shape'],
    'random-team':['team-name-generator','who-goes-first','random-game','wheel-spinner'],
    'random-picker':['wheel-spinner','yes-or-no','who-goes-first','random-number'],
    'wheel-spinner':['random-picker','random-team','who-goes-first','random-game'],
    'who-goes-first':['random-picker','wheel-spinner','random-game','random-challenge'],
    'yes-or-no':['coin-flip','random-picker','couples-decision-maker','wheel-spinner'],
    'random-movie':['random-game','random-meal','random-date-idea','party-game-generator'],
    'random-meal':['random-snack','random-breakfast','random-dessert','random-restaurant-cuisine'],
    'random-challenge':['random-activity','random-drawing-prompt','random-workout','random-game'],
    'random-game':['random-board-game','party-game-generator','wheel-spinner','random-challenge'],
    'username-generator':['gamer-name-generator','team-name-generator','random-name','fantasy-name-generator'],
    'gamer-name-generator':['username-generator','random-game','team-name-generator','random-pokemon'],
    'team-name-generator':['random-team','gamer-name-generator','fantasy-name-generator','party-game-generator'],
    'fantasy-name-generator':['random-name','gamer-name-generator','pet-name-generator','random-writing-prompt'],
    'pet-name-generator':['random-name','random-animal','random-colour-name','random-food-ingredient'],
    'party-game-generator':['random-game','random-truth-or-dare','random-would-you-rather','wheel-spinner'],
    'random-truth-or-dare':['party-game-generator','random-would-you-rather','random-charades','random-challenge'],
    'random-would-you-rather':['random-truth-or-dare','party-game-generator','random-challenge','random-game']
  };

  var NAMES={
    'random-picker':'Random Picker','wheel-spinner':'Wheel Spinner','yes-or-no':'Yes or No','coin-flip':'Coin Flip','dice-roller':'Dice Roller',
    'random-number':'Random Number','random-word':'Random Word','random-country':'Random Country','random-colour':'Random Colour','random-name':'Random Name',
    'random-game':'Random Game','random-meal':'Random Meal','random-movie':'Random Movie','random-challenge':'Random Challenge','random-team':'Random Team',
    'username-generator':'Username Generator','gamer-name-generator':'Gamer Name Generator','team-name-generator':'Team Name Generator','fantasy-name-generator':'Fantasy Name Generator',
    'pet-name-generator':'Pet Name Generator','party-game-generator':'Party Game Generator','random-board-game':'Random Board Game','who-goes-first':'Who Goes First?'
  };

  function slug(){
    var p=location.pathname.replace(/\\/+/g,'/').replace(/\/$/,'').split('/');
    return p[p.length-1] || '';
  }
  function rel(sl){ return '../'+sl+'/'; }
  function copyText(text,btn){
    if(!text)return;
    if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(function(){btn.textContent='Copied ✓';setTimeout(function(){btn.textContent='Copy'},1100);});
    }
  }
  function cleanResultText(result){
    var clone=result.cloneNode(true);
    clone.querySelectorAll('.rs10-actions,.rs10-related,.copy-result,button').forEach(function(n){n.remove();});
    return (clone.innerText||clone.textContent||'').replace(/\s+/g,' ').trim();
  }
  function addResultExperience(){
    var result=document.getElementById('result'),run=document.getElementById('run');
    if(!result||!run)return;
    if(result.dataset.rs10Ready==='1')return;
    var actions=document.createElement('div');
    actions.className='rs10-actions';
    actions.innerHTML='<button type="button" class="rs10-btn rs10-again">↻ Again</button><button type="button" class="rs10-btn">Copy</button><button type="button" class="rs10-btn">↗ Share</button>';
    result.insertAdjacentElement('afterend',actions);
    var again=actions.children[0],copy=actions.children[1],share=actions.children[2];
    again.addEventListener('click',function(){run.click();});
    copy.addEventListener('click',function(){copyText(cleanResultText(result),copy);});
    share.addEventListener('click',function(){
      var text=cleanResultText(result),title=document.title.replace(/\s*\|\s*RandoSpino$/,'');
      if(navigator.share){navigator.share({title:title,text:text,url:location.href}).catch(function(){});}
      else{copyText(location.href,share);share.textContent='Link copied ✓';setTimeout(function(){share.textContent='↗ Share'},1100);}
    });
    result.dataset.rs10Ready='1';
    addRelated(result,actions);
  }
  function addRelated(result,actions){
    var s=slug(),list=RELATED[s];if(!list||!list.length)return;
    var block=document.createElement('section');block.className='rs10-related';
    block.innerHTML='<div class="rs10-related-head"><span>KEEP GOING</span><b>Try another random tool</b></div><div class="rs10-related-grid">'+list.map(function(x){return '<a href="'+rel(x)+'"><span>✦</span><b>'+esc(NAMES[x]||x)+'</b><i>→</i></a>';}).join('')+'</div>';
    actions.insertAdjacentElement('afterend',block);
  }
  function esc(s){return String(s).replace(/[&<>\"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
  function secureIndex(max){if(max<=0)return 0;if(window.crypto&&window.crypto.getRandomValues){var a=new Uint32Array(1),span=max+1,limit=Math.floor(4294967296/span)*span,v;do{window.crypto.getRandomValues(a);v=a[0];}while(v>=limit);return v%span;}return Math.floor(Math.random()*(max+1));}
  function observeResult(){
    var result=document.getElementById('result');if(!result)return;
    addResultExperience();
    new MutationObserver(function(){
      addResultExperience();
      var actions=result.nextElementSibling;if(actions&&actions.classList.contains('rs10-actions')){actions.classList.remove('rs10-pop');void actions.offsetWidth;actions.classList.add('rs10-pop');}
    }).observe(result,{childList:true,subtree:true});
  }
  function surprise(){
    if(!location.search.match(/[?&]surprise=1(?:&|$)/))return;
    var tries=0,timer=setInterval(function(){
      tries++;
      var run=document.getElementById('run');
      if(run){clearInterval(timer);setTimeout(function(){run.click();},220);}
      if(tries>40)clearInterval(timer);
    },120);
  }
  function enhanceSurpriseButtons(){
    var buttons=[document.getElementById('surpriseBtn'),document.getElementById('surpriseBtn2')].filter(Boolean);
    buttons.forEach(function(b){
      if(b.dataset.rs10Bound)return;b.dataset.rs10Bound='1';
      b.addEventListener('click',function(){
        var cards=document.querySelectorAll('#v3-directory .v3-card');
        if(!cards.length)return;
        var choices=Array.prototype.slice.call(cards),choice=choices[secureIndex(choices.length-1)];
        var href=choice.getAttribute('href');if(!href)return;
        b.disabled=true;b.textContent='✨ Choosing…';
        setTimeout(function(){location.href=href+'?surprise=1';},180);
      },true);
    });
  }
  function enhanceCustomPicker(){
    if(slug()!=='random-picker')return;
    var tries=0,timer=setInterval(function(){
      tries++;
      var controls=document.getElementById('controls');
      var field=controls&&controls.querySelector('textarea,input[type="text"]');
      if(!field)return;
      clearInterval(timer);
      if(document.querySelector('.rs10-picker-tools'))return;
      var wrap=document.createElement('div');wrap.className='rs10-picker-tools';
      wrap.innerHTML='<button type="button">💾 Save list</button><button type="button">📂 Load list</button><button type="button">🔗 Share list</button><span></span>';
      controls.insertAdjacentElement('afterend',wrap);
      var key='randospino:custom-picker';
      var status=wrap.querySelector('span');
      wrap.children[0].onclick=function(){localStorage.setItem(key,field.value||'');status.textContent='Saved on this device ✓';};
      wrap.children[1].onclick=function(){var v=localStorage.getItem(key)||'';field.value=v;field.dispatchEvent(new Event('input',{bubbles:true}));status.textContent=v?'Loaded ✓':'Nothing saved yet';};
      wrap.children[2].onclick=function(){var raw=btoa(unescape(encodeURIComponent(field.value||'')));var url=location.origin+location.pathname+'?list='+encodeURIComponent(raw);if(navigator.share)navigator.share({title:'My RandoSpino list',url:url}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(url).then(function(){status.textContent='Share link copied ✓';});};
      var params=new URLSearchParams(location.search),data=params.get('list');
      if(data){try{field.value=decodeURIComponent(escape(atob(data)));field.dispatchEvent(new Event('input',{bubbles:true}));status.textContent='Shared list loaded ✓';}catch(e){}}
    },120);
    setTimeout(function(){clearInterval(timer);},5000);
  }
  function boot(){observeResult();enhanceSurpriseButtons();surprise();enhanceCustomPicker();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(boot,500);});else setTimeout(boot,500);
})();
