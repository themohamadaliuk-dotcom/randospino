(function(){
  'use strict';
  var keyFav='randospino:favourites:v1',keyRecent='randospino:recent:v1';
  var tools=[
    ['Random Number','./random-number/','Pick any number from a custom range.','random'],['Coin Flip','./coin-flip/','Genuinely random heads or tails.','random'],['Dice Roller','./dice-roller/','Roll dice with different sides.','random'],['Random Name','./random-name/','Generate names from diverse pools.','random'],['Random Word','./random-word/','Generate one or many words.','random'],['Random Country','./random-country/','Pick a country from a broad global list.','random'],['Random Colour','./random-colour/','Generate a colour with HEX, RGB and HSL.','random'],['Random Team','./random-team/','Split a list into random teams.','random'],['Random Picker','./random-picker/','Pick from your own list.','decide'],['Wheel Spinner','./wheel-spinner/','Spin a real visual wheel.','decide'],['Who Goes First?','./who-goes-first/','Choose a first player fairly.','decide'],['Yes or No','./yes-or-no/','Get a genuinely random yes or no.','decide'],['Random Movie','./random-movie/','Pick a movie by genre.','decide'],['Random Meal','./random-meal/','Choose a meal by type or cuisine.','decide'],['Random Challenge','./random-challenge/','Generate a challenge to try.','decide'],['Random Game','./random-game/','Pick a game for a group.','decide'],['Random Date','./random-date/','Choose a random date in a range.','decide'],['Username Generator','./username-generator/','Create theme-aware usernames.','generate'],['Gamer Name Generator','./gamer-name-generator/','Generate style-based gamer names.','generate'],['Team Name Generator','./team-name-generator/','Create team names by vibe.','generate'],['Fantasy Name Generator','./fantasy-name-generator/','Create fantasy names by style.','generate'],['Pet Name Generator','./pet-name-generator/','Find pet names by vibe.','generate'],['Party Game Generator','./party-game-generator/','Choose a game everyone can play.','generate'],['Secret Santa Picker','./secret-santa-picker/','Make a fair Secret Santa draw.','generate'],['Couples Decision Maker','./couples-decision-maker/','Settle two-option decisions.','decide']
  ];
  function read(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}}
  function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
  function favs(){return read(keyFav)}
  function recent(){return read(keyRecent)}
  function slug(url){return url.replace(/^\.\//,'').replace(/\/$/,'')}
  function addRecent(url){var r=recent().filter(function(x){return x!==url});r.unshift(url);write(keyRecent,r.slice(0,8))}
  function toggleFav(url){var f=favs();f.indexOf(url)>=0?f=f.filter(function(x){return x!==url}):f.unshift(url);write(keyFav,f.slice(0,30));renderUtilityLists();decorateCards()}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function card(t){var name=t[0],url=t[1],desc=t[2],fav=favs().indexOf(url)>=0;return '<a class="tool-card v3-card" href="'+url+'" data-tool-name="'+esc(name.toLowerCase())+'" data-tool-desc="'+esc(desc.toLowerCase())+'"><span class="v3-card-top"><b>'+esc(name)+'</b><button type="button" class="fav-btn '+(fav?'is-fav':'')+'" data-fav="'+url+'" aria-label="'+(fav?'Remove '+esc(name)+' from favourites':'Add '+esc(name)+' to favourites')+'">'+(fav?'★':'☆')+'</button></span><span>'+esc(desc)+'</span></a>'}
  function renderUtilityLists(){
    var host=document.getElementById('v3-tools'); if(!host)return;
    var f=favs(),r=recent();
    function rows(list,title,empty){
      if(!list.length)return '<section class="v3-mini"><div class="v3-mini-head"><span>'+title+'</span></div><p class="v3-empty">'+empty+'</p></section>';
      return '<section class="v3-mini"><div class="v3-mini-head"><span>'+title+'</span></div><div class="v3-mini-grid">'+list.map(function(u){var t=tools.filter(function(x){return x[1]===u})[0];return t?'<a href="'+t[1]+'" class="v3-mini-card" data-v3-link="'+t[1]+'"><span>'+t[0]+'</span><small>'+t[2]+'</small></a>':''}).join('')+'</div></section>';
    }
    host.innerHTML=rows(r,'Recently used','Your recent tools will appear here as you use them.')+rows(f,'Favourites','Star a tool to keep it here.');
  }
  function decorateCards(){
    document.querySelectorAll('[data-fav]').forEach(function(btn){if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toggleFav(btn.getAttribute('data-fav'))})});
  }
  function buildDirectory(){
    var el=document.getElementById('v3-directory');if(!el)return;
    el.innerHTML=tools.map(card).join('');decorateCards();
    document.querySelectorAll('.v3-card').forEach(function(a){a.addEventListener('click',function(){addRecent(a.getAttribute('href'))})});
  }
  function search(){
    var input=document.getElementById('v3-search');if(!input)return;
    input.addEventListener('input',function(){var q=input.value.toLowerCase().trim();document.querySelectorAll('.v3-card').forEach(function(c){c.style.display=(!q||((c.dataset.toolName||'')+' '+(c.dataset.toolDesc||'')).indexOf(q)>=0)?'':'none'});var n=document.getElementById('v3-search-count');if(n){var visible=[].slice.call(document.querySelectorAll('.v3-card')).filter(function(x){return x.style.display!=='none'}).length;n.textContent=q?visible+' tools match':''}});
  }
  function surprise(){var btn=document.getElementById('surpriseBtn');if(!btn)return;btn.addEventListener('click',function(){var t=tools[Math.floor(Math.random()*tools.length)];addRecent(t[1]);btn.classList.add('is-spinning');setTimeout(function(){location.href=t[1]},220)})}
  function globalShare(){var btn=document.getElementById('shareSite');if(!btn)return;btn.addEventListener('click',function(){var data={title:'RandoSpino',text:'Can\'t decide? Let RandoSpino choose.',url:location.href};if(navigator.share){navigator.share(data).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(location.href);btn.textContent='Link copied ✓';setTimeout(function(){btn.textContent='Share RandoSpino'},1200)}})}
  function boot(){buildDirectory();renderUtilityLists();search();surprise();globalShare();
    document.querySelectorAll('a[href$="/"]').forEach(function(a){if(a.closest('.v3-card'))return;a.addEventListener('click',function(){var h=a.getAttribute('href');if(h&&h.indexOf('./')===0)addRecent(h)})});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
