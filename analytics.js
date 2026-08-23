(function(){
  'use strict';
  var KEY='randospino:analytics:v1';
  function push(type,data){
    try{
      var bucket=JSON.parse(localStorage.getItem(KEY)||'{}');
      bucket[type]=(bucket[type]||0)+1;
      localStorage.setItem(KEY,JSON.stringify(bucket));
    }catch(e){}
    if(window.dataLayer) window.dataLayer.push({event:type,randospino:data||{}});
  }
  window.RandoSpinoAnalytics={event:push,getLocalSummary:function(){try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){return{};}}};
})();
