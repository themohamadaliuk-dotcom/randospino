(function(){
  'use strict';
  function cleanRelated(){
    document.querySelectorAll('.rs10-related a[href="../random-city/"]').forEach(function(a){a.remove();});
    document.querySelectorAll('.rs10-related-grid').forEach(function(g){if(!g.children.length)g.closest('.rs10-related').remove();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(cleanRelated,700);});else setTimeout(cleanRelated,700);
})();
