(function(){
  'use strict';
  var LIVE_HOME='https://themohamadaliuk-dotcom.github.io/randospino/';
  var HOME='/randospino/';
  function root(){return LIVE_HOME;}
  function fixLinks(){
    document.querySelectorAll('a[href="/"],a[href="../"],a[href="./"]').forEach(function(a){a.setAttribute('href',HOME);});
    document.querySelectorAll('a[href^="/#"],a[href^="'+HOME+'#"]').forEach(function(a){var h=a.getAttribute('href')||'';var i=h.indexOf('#');a.setAttribute('href',HOME+(i>=0?h.slice(i):''));});
  }
  function addGlobalStyle(){
    if(document.getElementById('rs-site-fix-style'))return;
    var s=document.createElement('style');s.id='rs-site-fix-style';
    s.textContent='.rs-site-fix{margin:28px 0;display:grid;gap:12px}.rs-site-fix a{display:flex;justify-content:space-between;align-items:center;padding:13px 15px;border:1px solid #e6e6ef;border-radius:15px;background:#fff;text-decoration:none;font-weight:800}.rs-site-fix-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}@media(max-width:760px){.rs-site-fix-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.rs-site-fix-grid{grid-template-columns:1fr}}';
    document.head.appendChild(s);
  }
  function currentSlug(){var m=location.pathname.match(/\/randospino\/([^/]+)\/?$/);return m?m[1]:'';}
  var RELATED={
    'wheel-spinner':['random-picker','yes-or-no','random-game','random-meal'],
    'random-game':['random-meal','random-picker','random-challenge'],
    'random-meal':['random-movie','random-game','random-picker'],
    'random-name':['username-generator','gamer-name-generator','fantasy-name-generator'],
    'random-team':['team-name-generator','random-picker','secret-santa-picker']
  };
  var LABELS={'random-picker':'Random Picker','yes-or-no':'Yes or No','random-game':'Random Game','random-meal':'Random Meal','random-movie':'Random Movie','random-challenge':'Random Challenge','username-generator':'Username Generator','gamer-name-generator':'Gamer Name Generator','fantasy-name-generator':'Fantasy Name Generator','team-name-generator':'Team Name Generator','secret-santa-picker':'Secret Santa Picker'};
  function addRelated(){
    var slug=currentSlug(),items=RELATED[slug],main=document.querySelector('main');
    if(!main||!items||document.querySelector('.rs-site-fix'))return;
    var sec=document.createElement('section');sec.className='rs-site-fix';
    sec.innerHTML='<div><span class="kicker">KEEP GOING</span><h2>Try something related</h2></div><div class="rs-site-fix-grid"></div>';
    var grid=sec.querySelector('.rs-site-fix-grid');
    items.forEach(function(x){var a=document.createElement('a');a.href=HOME+x+'/';a.innerHTML='<span>'+ (LABELS[x]||x.replace(/-/g,' ')) +'</span><span>→</span>';grid.appendChild(a);});
    main.appendChild(sec);
  }
  function simplifyHome(){
    if(location.pathname!==HOME&&location.pathname!=='/randospino')return;
    ['random','decide','generate'].forEach(function(id){var sec=document.getElementById(id);if(!sec||sec.dataset.rsFixed)return;sec.dataset.rsFixed='1';});
  }
  function init(){addGlobalStyle();fixLinks();addRelated();simplifyHome();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
