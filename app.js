(function () {
  'use strict';

  var DATA_URL = (function () {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/app\.js(?:\?.*)?$/, 'data.js');
    return new URL('data.js', location.href).href;
  })();

  function loadData(done) {
    var s = document.createElement('script');
    s.src = DATA_URL + '?v=3';
    s.onload = done;
    s.onerror = function () {
      var out = document.getElementById('result');
      if (out) {
        out.className = 'result error-result';
        out.textContent = 'RandoSpino could not load its data. Please refresh the page.';
      }
    };
    document.head.appendChild(s);
  }

  function init() {
    var D = window.RANDOSPINO_DATA || {};
    var $ = function (id) { return document.getElementById(id); };
    var clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };

    function secure32() {
      if (!window.crypto || !window.crypto.getRandomValues) {
        throw new Error('Secure browser randomness is unavailable. Please use a modern browser.');
      }
      var a = new Uint32Array(1);
      window.crypto.getRandomValues(a);
      return a[0];
    }

    function randInt(min, max) {
      min = Math.ceil(Number(min));
      max = Math.floor(Number(max));
      if (!isFinite(min) || !isFinite(max) || max < min) throw new Error('Please enter a valid range.');
      var span = max - min + 1;
      var limit = Math.floor(4294967296 / span) * span;
      var v;
      do { v = secure32(); } while (v >= limit);
      return min + (v % span);
    }

    function randFloat() { return secure32() / 4294967296; }

    function pick(list) {
      if (!list || !list.length) throw new Error('There are no choices available.');
      return list[randInt(0, list.length - 1)];
    }

    function unique(list) {
      var seen = {};
      return list.filter(function (x) {
        var k = String(x);
        if (seen[k]) return false;
        seen[k] = true;
        return true;
      });
    }

    function sample(list, count, noRepeat) {
      var source = unique(list.slice());
      if (!source.length) throw new Error('There are no choices available.');
      count = clamp(parseInt(count, 10) || 1, 1, 50);
      if (!noRepeat) {
        var repeated = [];
        for (var i = 0; i < count; i++) repeated.push(pick(source));
        return repeated;
      }
      if (count > source.length) {
        throw new Error('There are only ' + source.length + ' unique choices in this category. Lower the number of results or allow repeats.');
      }
      return shuffle(source).slice(0, count);
    }

    function shuffle(list) {
      var x = list.slice();
      for (var i = x.length - 1; i > 0; i--) {
        var j = randInt(0, i);
        var t = x[i];
        x[i] = x[j];
        x[j] = t;
      }
      return x;
    }

    function vals(id) {
      var el = $(id);
      if (!el) return [];
      return el.value.split(/[\n,]+/).map(function (x) { return x.trim(); }).filter(Boolean);
    }

    function esc(v) {
      return String(v).replace(/[&<>"']/g, function (c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
      });
    }

    function field(label, html) {
      return '<div class="field"><label>' + label + '</label>' + html + '</div>';
    }

    function options(arr, id) {
      return '<select id="' + id + '">' + arr.map(function (x) {
        return '<option value="' + esc(x) + '">' + esc(x) + '</option>';
      }).join('') + '</select>';
    }

    function countField(id, label) {
      return field(label || 'Number of results', '<input id="' + id + '" type="number" min="1" max="50" value="1">');
    }

    function resultMain(html) { return '<div class="result-main">' + html + '</div>'; }
    function getResult() { return $('result'); }

    function addCopy(container, text) {
      if (!navigator.clipboard || !text) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-result';
      btn.textContent = 'Copy result';
      btn.onclick = function () {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied ✓';
          setTimeout(function () { btn.textContent = 'Copy result'; }, 1200);
        });
      };
      container.appendChild(btn);
    }

    function bindColourCopy() {
      var out = getResult();
      if (!out) return;
      out.querySelectorAll('[data-copy]').forEach(function (el) {
        el.addEventListener('click', function () {
          var text = el.getAttribute('data-copy');
          if (!navigator.clipboard) return;
          navigator.clipboard.writeText(text).then(function () {
            var span = el.querySelector('span');
            if (!span) return;
            var old = span.textContent;
            span.textContent = 'Copied ✓';
            setTimeout(function () { span.textContent = old; }, 1200);
          });
        });
      });
    }

    function renderSuccess(html, text) {
      var out = getResult();
      out.className = 'result';
      out.innerHTML = html;
      addCopy(out, text);
      bindColourCopy();
    }

    function renderError(message) {
      var out = getResult();
      out.className = 'result error-result';
      out.textContent = message || 'Something went wrong. Please try again.';
    }

    function statsRow(label, value, id) {
      return '<div class="stats-row"><span>' + label + '</span><span id="' + id + '">' + value + '</span></div>';
    }

    function sessionCount(key) { return STATE.sessions[key] || 0; }
    function noteSuccess(key, amount) { STATE.sessions[key] = sessionCount(key) + (amount || 1); }

    function updateSessionUI() {
      var ids = {
        coin: 'coinSession',
        yes: 'yesSession',
        randomName: 'nameSession',
        randomWord: 'wordSession',
        randomCountry: 'countrySession',
        randomMovie: 'movieSession',
        randomMeal: 'mealSession',
        randomChallenge: 'challengeSession',
        randomGame: 'gameSession',
        usernameGenerator: 'usernameSession',
        gamerNameGenerator: 'gamerSession',
        teamNameGenerator: 'teamNameSession',
        fantasyNameGenerator: 'fantasySession',
        petNameGenerator: 'petSession',
        partyGameGenerator: 'partySession'
      };
      Object.keys(ids).forEach(function (key) {
        var el = $(ids[key]);
        if (el) el.textContent = sessionCount(key) + ' result' + (sessionCount(key) === 1 ? '' : 's') + ' this session';
      });
    }

    function hslFromRgb(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          default: h = (r - g) / d + 4;
        }
        h /= 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function randomHex() { return '#' + randInt(0, 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0'); }
    function rgbFromHex(hex) {
      var n = parseInt(hex.slice(1), 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function normalizeTheme(s) {
      return String(s || '').toLowerCase().replace(/[^a-z0-9\s&-]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function themeVocabulary(input) {
      var t = normalizeTheme(input), out = [];
      Object.keys(D.themes || {}).forEach(function (key) {
        if (t.indexOf(key.toLowerCase()) >= 0) out = out.concat(D.themes[key]);
      });
      t.split(' ').filter(function (x) { return x.length > 1; }).forEach(function (x) { out.push(x); });
      return unique(out);
    }

    function themedTokens(input, fallback) {
      var vocab = themeVocabulary(input);
      return vocab.length ? vocab : (fallback || ['Nova','Pixel','Prime']);
    }

    function makeUsernames(theme, style, separator, withNumber, count) {
      var styleMap = {
        Clean: ['Core','Prime','Flow','Edge','Wave','Link','Mode'],
        Short: ['X','HQ','Go','Lab','One','Plus','Now'],
        Funny: ['Biscuit','Banana','Potato','Pickle','Waffle','Noodle','Goofy','Silly'],
        Cool: ['Ace','Rogue','Nova','Vibe','Elite','Prime','Flux','Zero'],
        Gaming: ['Clutch','Apex','Pixel','Turbo','Quest','Strike','Rank'],
        Aesthetic: ['Velvet','Luna','Bloom','Muse','Cloud','Satin','Aura']
      };
      var vocab = themedTokens(theme, styleMap[style] || styleMap.Clean);
      var rawTokens = normalizeTheme(theme).split(' ').filter(function (x) { return x.length > 1; });
      var extras = styleMap[style] || styleMap.Clean;
      var out = [], attempts = 0;
      while (out.length < count && attempts < count * 50) {
        attempts++;
        var left = rawTokens.length ? pick(rawTokens) : pick(vocab);
        var right = pick(vocab);
        if (vocab.length > 1 && right.toLowerCase() === left.toLowerCase()) right = pick(vocab);
        var suffix = pick(extras);
        var n = withNumber ? String(randInt(1, 999)) : '';
        var name = (left + separator + right + separator + suffix + n).replace(/\s+/g, '');
        if (out.indexOf(name) < 0) out.push(name);
      }
      return out;
    }

    function makeGamerNames(style, count) {
      var map = {
        Any: D.gamerFirst.concat(D.gamerLast),
        Stealth: ['Shadow','Ghost','Wraith','Silent','Phantom','Specter','Night','Vanish'],
        Competitive: ['Clutch','Apex','Elite','Rival','Ranked','MVP','Champion','Pro'],
        Funny: ['Banana','Potato','Waffle','Pickle','Noodle','Goofy','Silly','Biscuit'],
        Fantasy: ['Dragon','Rune','Knight','Wizard','Raven','Mythic','Ember','Frost'],
        Tech: ['Byte','Pixel','Quantum','Cyber','Binary','Kernel','Code','Glitch'],
        Sniper: ['Scope','Marksman','Deadeye','Crosshair','Longshot','Trigger','Caliber'],
        Speed: ['Turbo','Velocity','Nitro','Rapid','Rocket','Flash','Dash','Blitz']
      };
      var pool = map[style] || map.Any, out = [];
      while (out.length < count) {
        var name = (pick(pool) + pick(pool) + randInt(1, 999)).replace(/\s+/g, '');
        if (out.indexOf(name) < 0) out.push(name);
      }
      return out;
    }

    function makeTeamNames(style, keyword, count) {
      var map = {
        Powerful: ['Titans','Warriors','Legends','Giants','Champions','Guardians','Raiders','Dominators','Force','Empire'],
        Funny: ['Bananas','Waffles','Potatoes','Goofballs','Pickles','Couch Crew','Chaos Club','Biscuit Brigade','Noodle Squad'],
        Esports: ['Vortex','Phantoms','Reapers','Strikers','Rivals','Nexus','Dynasty','Velocity','Sentinels','Apex'],
        Sports: ['United','Rovers','Athletic','City','Rangers','Wanderers','FC','Town','Lions','Falcons'],
        Fantasy: ['Dragons','Knights','Ravens','Wolves','Guardians','Fireborn','Moonblades','Stormcallers','Silverfangs'],
        School: ['Scholars','Aces','All-Stars','House','Crew','Classics','Trailblazers','Titans','Pioneers'],
        Casual: ['Friends','Crew','Squad','Gang','Collective','Club','Team','Circle','Bunch','Mates']
      };
      var pool = map[style] || map.Powerful, lead = ['The','Team','Club','House','Squad','United'], out = [];
      while (out.length < count) {
        var core = pick(pool);
        var name = keyword ? keyword + ' ' + core : pick(lead) + ' ' + core;
        if (out.indexOf(name) < 0) out.push(name);
      }
      return out;
    }

    function makeFantasy(style, count) {
      var suffix = {
        Royal: ['Crown','Kingdom','Throne','Court','Majesty','Regal'],
        Dark: ['Shadow','Night','Dread','Raven','Void','Grave'],
        Nature: ['Oak','Willow','Fern','River','Bloom','Meadow'],
        Warrior: ['Blade','Shield','Valor','Storm','Iron','Fury'],
        Arcane: ['Rune','Mystic','Spell','Arcana','Crystal','Hex'],
        Celestial: ['Star','Moon','Solar','Nova','Eclipse','Starlight'],
        Pirate: ['Black','Tide','Skull','Corsair','Reef','Sable'],
        Dragon: ['Drake','Wyvern','Ember','Scale','Flame','Claw']
      };
      var ending = suffix[style] || suffix.Arcane, out = [];
      while (out.length < count) {
        var name = pick(D.fantasyFirst) + ' ' + pick(D.fantasyLast);
        if (out.indexOf(name) < 0) out.push(name);
      }
      return out.map(function (n) { return n + ' · ' + pick(ending); });
    }

    function makePets(vibe, count) {
      var map = {
        Cute: ['Mochi','Peaches','Bubbles','Honey','Poppy','Cookie','Peanut','Button','Daisy'],
        Funny: ['Pickle','Noodle','Waffle','Biscuit','Potato','Socks','Beans','Tofu','Nacho'],
        Elegant: ['Pearl','Jasper','Cleo','Dahlia','Velvet','Opal','Chanel','Romeo','Luna'],
        Food: ['Muffin','Taco','Mango','Brownie','Toast','Pepper','Olive','Cookie','Churro'],
        Nature: ['Willow','Maple','River','Hazel','Clover','Fern','Moss','Sunny','Meadow'],
        Mythic: ['Phoenix','Atlas','Loki','Freya','Apollo','Athena','Thor','Nyx','Zeus'],
        Cool: ['Onyx','Storm','Diesel','Shadow','Blaze','Rogue','Ace','Jet','Nova'],
        Tiny: ['Pip','Dot','Bean','Peanut','Pipkin','Button','Bitty','Nibbles','Sprout']
      };
      var pool = map[vibe] || map.Cute, out = [];
      while (out.length < count) {
        var base = pick(pool);
        if (randInt(0, 1)) base += ' ' + pick(D.petSecond);
        if (out.indexOf(base) < 0) out.push(base);
      }
      return out;
    }

    function renderCounted(list, icon) {
      if (list.length === 1) return resultMain((icon || '') + esc(list[0]));
      return resultMain('<div class="multi-results">' + list.map(function (x, i) {
        return '<div class="result-line"><span>' + (i + 1) + '</span><b>' + (icon || '') + esc(x) + '</b></div>';
      }).join('') + '</div>');
    }

    function drawWheel(canvas, items, angle) {
      var ctx = canvas.getContext('2d'), dpr = window.devicePixelRatio || 1, size = canvas.clientWidth || 520;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      var cx = size / 2, cy = size / 2, radius = size / 2 - 12, slice = 2 * Math.PI / items.length;
      var colours = ['#6b57f1','#ff5f98','#14b8a6','#f59e0b','#06b6d4','#8b5cf6','#ef4444','#22c55e','#3b82f6','#ec4899','#84cc16','#f97316'];
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * Math.PI / 180);
      items.forEach(function (item, i) {
        var start = -Math.PI / 2 + i * slice, end = start + slice;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, radius, start, end); ctx.closePath();
        ctx.fillStyle = colours[i % colours.length]; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.92)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.rotate(start + slice / 2); ctx.fillStyle = '#fff';
        ctx.font = (items.length > 12 ? '12px' : '15px') + ' Inter,Arial,sans-serif'; ctx.fontWeight = '800'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(item.length > 19 ? item.slice(0, 18) + '…' : item, radius - 18, 0); ctx.restore();
      });
      ctx.restore();
    }

    var STATE = { sessions: {}, coinHistory: [], yesHistory: [], wheel: { angle: 0, spinning: false }, noRepeat: {} };

    var tools = {
      randomNumber: { title:'Random Number Generator', desc:'Pick a fresh random number every time.', button:'🎲 Generate number', render:function(){return field('Mode',options(['Whole number','Decimal'],'numberMode'))+field('Minimum','<input id="min" type="number" value="1">')+field('Maximum','<input id="max" type="number" value="100">')+field('Decimal places',options(['1','2','3','4'],'decimals'));}, run:function(){var min=Number($('min').value),max=Number($('max').value);if(max<min)throw new Error('Maximum must be at least the minimum.');if($('numberMode').value==='Whole number')return{html:resultMain(String(randInt(min,max))),count:1};var p=Number($('decimals').value)||2;return{html:resultMain((min+randFloat()*(max-min)).toFixed(p)),count:1};}},
      coinFlip: { title:'Coin Flip', desc:'Genuinely random heads or tails. Repeats are possible.', button:'🪙 Flip the coin', render:function(){return statsRow('Session flips','0','coinSession')+statsRow('Result balance','Heads 0 · Tails 0','coinBalance')+'<div class="history" id="coinHistory"></div><p class="control-help">Every press is a new independent random draw. There is no 12-flip cap and no forced alternation.</p>';}, run:function(){var h=randInt(0,1)===0?'Heads':'Tails';return{html:resultMain(h==='Heads'?'Heads 🪙':'Tails 🪙'),count:1,coin:h};}, afterRun:function(r){STATE.coinHistory.push(r.coin);noteSuccess('coin',1);var h=STATE.coinHistory.filter(function(x){return x==='Heads'}).length,t=STATE.coinHistory.length-h;$('coinSession').textContent=String(sessionCount('coin'));$('coinBalance').textContent='Heads '+h+' · Tails '+t;$('coinHistory').innerHTML='<span>Recent</span>'+STATE.coinHistory.slice(-12).map(function(x){return'<span class="history-chip">'+x+'</span>';}).join('');}},
      diceRoller: { title:'Dice Roller', desc:'Choose dice type and roll up to 20 at once.', button:'🎲 Roll dice', render:function(){return field('Number of dice','<input id="count" type="number" value="1" min="1" max="20">')+field('Sides',options(['4','6','8','10','12','20','100'],'sides'));}, run:function(){var n=clamp(parseInt($('count').value,10)||1,1,20),s=Number($('sides').value),rolls=[],total=0;for(var i=0;i<n;i++){var r=randInt(1,s);rolls.push(r);total+=r;}return{html:resultMain(rolls.join(' · ')+'<small>Total: '+total+'</small>'),count:1};}},
      randomPicker: { title:'Random Picker', desc:'Paste your own choices and let chance pick one.', button:'🎲 Pick one', render:function(){return field('Choices','<textarea id="items" rows="9" placeholder="Pizza\nBurger\nPasta\nCurry"></textarea>')+'<label class="check-row"><input id="avoidRepeat" type="checkbox"> Do not repeat until the list is exhausted</label>';}, run:function(){var a=unique(vals('items'));if(!a.length)throw new Error('Add at least one choice.');var key=a.join('|'),used=STATE.noRepeat[key]||[];if($('avoidRepeat').checked&&used.length>=a.length)used=[];var pool=$('avoidRepeat').checked?a.filter(function(x){return used.indexOf(x)<0;}):a;var winner=pick(pool);if($('avoidRepeat').checked){used.push(winner);STATE.noRepeat[key]=used;}return{html:resultMain(esc(winner)),count:1};}},
      wheelSpinner: { title:'Wheel Spinner', desc:'A real animated wheel with a genuinely random winner.', button:'🎡 Spin the wheel', render:function(){return'<div class="wheel-shell"><div class="wheel-pointer" aria-hidden="true"></div><canvas id="wheelCanvas" class="wheel-canvas"></canvas></div>'+field('Wheel entries','<textarea id="items" rows="9" placeholder="Pizza\nBurger\nPasta\nCurry">Pizza\nBurger\nPasta\nCurry</textarea>')+'<label class="check-row"><input id="removeWinner" type="checkbox"> Remove the winner after each spin</label>';}, afterRender:function(){var canvas=$('wheelCanvas'),input=$('items');var redraw=function(){var a=unique(vals('items'));if(a.length>=2)drawWheel(canvas,a,0);};input.addEventListener('input',redraw);window.addEventListener('resize',redraw);redraw();}, run:function(){var a=unique(vals('items'));if(a.length<2)throw new Error('Add at least two entries for the wheel.');return{wheel:true,items:a};}},
      randomName: { title:'Random Name Generator', desc:'Choose a region and generate exactly the number of names you request.', button:'✨ Generate names', render:function(){return options(Object.keys(D.names||{}),'nameRegion')+countField('count','Number of names')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate names in this batch</label>'+statsRow('Session names','0 results this session','nameSession');}, run:function(){var list=D.names[$('nameRegion').value]||D.names.Global||[],count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomName',r.count);updateSessionUI();}},
      randomWord: { title:'Random Word Generator', desc:'Generate exactly as many random words as you ask for.', button:'🔤 Generate words', render:function(){return options(Object.keys(D.words||{}),'wordCategory')+countField('count','Number of words')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate words in this batch</label>'+statsRow('Session words','0 results this session','wordSession');}, run:function(){var list=D.words[$('wordCategory').value]||D.words.Any||[],count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomWord',r.count);updateSessionUI();}},
      randomCountry: { title:'Random Country Generator', desc:'Pick one or generate exactly as many countries as you request.', button:'🌍 Generate countries', render:function(){return options(['Worldwide','Europe','Asia','Africa','Americas','Oceania'],'countryRegion')+countField('count','Number of countries')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicates in this batch</label>'+statsRow('Session countries','0 results this session','countrySession');}, run:function(){var region=$('countryRegion').value,list=region==='Worldwide'?D.countries:(D.countriesByRegion[region]||D.countries),count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out,'🌍 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomCountry',r.count);updateSessionUI();}},
      randomColour: { title:'Random Colour Generator', desc:'Generate a colour with correct HEX, RGB and HSL values.', button:'🎨 Pick a colour', render:function(){return'<p class="control-help">Every colour is freshly generated. Tap a code to copy it.</p>';}, run:function(){var hex=randomHex(),rgb=rgbFromHex(hex),hsl=hslFromRgb(rgb.r,rgb.g,rgb.b),rgbText='rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')',hslText='hsl('+hsl.h+', '+hsl.s+'%, '+hsl.l+'%)',html='<div class="colour-result"><div class="colour-swatch" style="background:'+hex+'"></div><div class="colour-code-grid"><button class="code-chip" data-copy="'+esc(hex)+'"><b>HEX</b><span>'+hex+'</span></button><button class="code-chip" data-copy="'+esc(rgbText)+'"><b>RGB</b><span>'+rgbText+'</span></button><button class="code-chip" data-copy="'+esc(hslText)+'"><b>HSL</b><span>'+hslText+'</span></button></div></div>';return{html:html,text:hex,count:1};}},
      randomTeam: { title:'Random Team Generator', desc:'Split your names into fair random teams.', button:'👥 Make teams', render:function(){return field('Names','<textarea id="items" rows="9" placeholder="Alex\nSam\nJamie\nTaylor"></textarea>')+field('Number of teams','<input id="teams" type="number" value="2" min="2" max="20">');}, run:function(){var a=unique(vals('items')),t=clamp(parseInt($('teams').value,10)||2,2,20);if(a.length<t)throw new Error('Add at least as many names as teams.');a=shuffle(a);var teams=Array.from({length:t},function(){return[];});a.forEach(function(x,i){teams[i%t].push(x);});return{html:teams.map(function(team,i){return'<div class="team-block"><strong>Team '+(i+1)+'</strong><span>'+team.map(esc).join(', ')+'</span></div>';}).join(''),count:1};}},
      whoGoesFirst: { title:'Who Goes First?', desc:'Enter players and let chance choose one.', button:'🏁 Choose first', render:function(){return field('Players','<textarea id="items" rows="7" placeholder="Alex\nSam\nJamie"></textarea>');}, run:function(){var a=unique(vals('items'));if(!a.length)throw new Error('Add at least one player.');return{html:resultMain('🏁 '+esc(pick(a))),count:1};}},
      yesOrNo: { title:'Yes or No', desc:'Ask a question and get an independently random answer.', button:'✅ Decide', render:function(){return field('Question <span class="field-hint">Optional</span>','<input id="question" type="text" placeholder="Should I order pizza?">')+statsRow('Session answers','0','yesSession')+statsRow('Balance','Yes 0 · No 0','yesBalance')+'<div class="history" id="yesHistory"></div>';}, run:function(){var answer=randInt(0,1)===0?'Yes':'No';return{html:resultMain(answer==='Yes'?'Yes ✅':'No ❌'),count:1,answer:answer};}, afterRun:function(r){STATE.yesHistory.push(r.answer);noteSuccess('yes',1);var y=STATE.yesHistory.filter(function(x){return x==='Yes';}).length,n=STATE.yesHistory.length-y;$('yesSession').textContent=String(sessionCount('yes'));$('yesBalance').textContent='Yes '+y+' · No '+n;$('yesHistory').innerHTML='<span>Recent</span>'+STATE.yesHistory.slice(-12).map(function(x){return'<span class="history-chip">'+x+'</span>';}).join('');}},
      randomMovie: { title:'Random Movie Picker', desc:'Choose a genre and get exactly the number of movie picks you want.', button:'🎬 Pick movies', render:function(){return options(Object.keys(D.movies||{}),'movieGenre')+countField('count','Number of movies')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate movies in this batch</label>'+statsRow('Session movies','0 results this session','movieSession');}, run:function(){var list=D.movies[$('movieGenre').value]||D.movies.Any||[],count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out,'🎬 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomMovie',r.count);updateSessionUI();}},
      randomMeal: { title:'Random Meal Generator', desc:'Choose a food style and get exactly as many meal ideas as you want.', button:'🍽️ Pick meals', render:function(){return options(Object.keys(D.meals||{}),'mealType')+countField('count','Number of meals')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate meals in this batch</label>'+statsRow('Session meals','0 results this session','mealSession');}, run:function(){var list=D.meals[$('mealType').value]||D.meals.Any||[],count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out,'🍽️ '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomMeal',r.count);updateSessionUI();}},
      randomChallenge: { title:'Random Challenge Generator', desc:'Get exactly as many challenge ideas as you want.', button:'🔥 Give me challenges', render:function(){return options(Object.keys(D.challenges||{}),'challengeType')+countField('count','Number of challenges')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate challenges in this batch</label>'+statsRow('Session challenges','0 results this session','challengeSession');}, run:function(){var list=D.challenges[$('challengeType').value]||D.challenges.Any||[],count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(list,count,!$('allowDuplicates').checked);return{html:renderCounted(out,'🔥 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomChallenge',r.count);updateSessionUI();}},
      randomGame: { title:'Random Game Picker', desc:'Pick one or many games for your group.', button:'🎮 Pick games', render:function(){return countField('count','Number of games')+'<label class="check-row"><input id="allowDuplicates" type="checkbox"> Allow duplicate games in this batch</label>'+statsRow('Session games','0 results this session','gameSession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(D.games||[],count,!$('allowDuplicates').checked);return{html:renderCounted(out,'🎮 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('randomGame',r.count);updateSessionUI();}},
      randomDate: { title:'Random Date Generator', desc:'Generate exactly as many dates as you want within a range.', button:'📅 Generate dates', render:function(){var today=new Date(),to=new Date(today);to.setFullYear(to.getFullYear()+1);return'<div class="date-grid"><div class="field"><label>From</label><input id="from" type="date" value="'+today.toISOString().slice(0,10)+'"></div><div class="field"><label>To</label><input id="to" type="date" value="'+to.toISOString().slice(0,10)+'"></div></div>'+countField('count','Number of dates');}, run:function(){var start=new Date($('from').value+'T12:00:00').getTime(),end=new Date($('to').value+'T12:00:00').getTime();if(!isFinite(start)||!isFinite(end)||end<start)throw new Error('Choose a valid date range.');var days=Math.floor((end-start)/86400000),count=clamp(parseInt($('count').value,10)||1,1,50),out=[];for(var i=0;i<count;i++)out.push(new Date(start+randInt(0,days)*86400000).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}));return{html:renderCounted(out,'📅 '),text:out.join('\n'),count:out.length};}},
      usernameGenerator: { title:'Username Generator', desc:'Type any theme and the usernames will actually relate to it.', button:'✨ Generate usernames', render:function(){return field('Theme or topic','<input id="theme" type="text" placeholder="football, space, cats, your own idea...">')+field('Style',options(['Clean','Short','Funny','Cool','Gaming','Aesthetic'],'style'))+field('Separator',options(['None','_','.','-'],'separator'))+field('Include numbers','<label class="check-row"><input id="withNumber" type="checkbox"> Add numbers</label>')+countField('count','Number of usernames')+statsRow('Session usernames','0 results this session','usernameSession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),separator=$('separator').value==='None'?'':$('separator').value,out=makeUsernames($('theme').value,$('style').value,separator,$('withNumber').checked,count);return{html:renderCounted(out,'✨ '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('usernameGenerator',r.count);updateSessionUI();}},
      gamerNameGenerator: { title:'Gamer Name Generator', desc:'Choose a style and generate names that match the vibe.', button:'🎮 Generate gamer names', render:function(){return options(['Any','Stealth','Competitive','Funny','Fantasy','Tech','Sniper','Speed'],'style')+countField('count','Number of gamer names')+statsRow('Session gamer names','0 results this session','gamerSession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=makeGamerNames($('style').value,count);return{html:renderCounted(out,'🎮 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('gamerNameGenerator',r.count);updateSessionUI();}},
      teamNameGenerator: { title:'Team Name Generator', desc:'Pick a style, optionally add your own keyword, and get exactly the number of names you want.', button:'🏆 Generate team names', render:function(){return options(['Powerful','Funny','Esports','Sports','Fantasy','School','Casual'],'style')+field('Keyword (optional)','<input id="keyword" type="text" placeholder="Add your school, city, club or idea...">')+countField('count','Number of team names')+statsRow('Session team names','0 results this session','teamNameSession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=makeTeamNames($('style').value,$('keyword').value.trim(),count);return{html:renderCounted(out,'🏆 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('teamNameGenerator',r.count);updateSessionUI();}},
      fantasyNameGenerator: { title:'Fantasy Name Generator', desc:'Generate names that match the selected fantasy style.', button:'🧙 Generate fantasy names', render:function(){return options(['Royal','Dark','Nature','Warrior','Arcane','Celestial','Pirate','Dragon'],'style')+countField('count','Number of fantasy names')+statsRow('Session fantasy names','0 results this session','fantasySession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=makeFantasy($('style').value,count);return{html:renderCounted(out,'🧙 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('fantasyNameGenerator',r.count);updateSessionUI();}},
      petNameGenerator: { title:'Pet Name Generator', desc:'Choose a vibe and generate pet names that match it.', button:'🐾 Generate pet names', render:function(){return options(['Cute','Funny','Elegant','Food','Nature','Mythic','Cool','Tiny'],'vibe')+countField('count','Number of pet names')+statsRow('Session pet names','0 results this session','petSession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=makePets($('vibe').value,count);return{html:renderCounted(out,'🐾 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('petNameGenerator',r.count);updateSessionUI();}},
      partyGameGenerator: { title:'Party Game Generator', desc:'Generate one or many party games.', button:'🎉 Generate party games', render:function(){return countField('count','Number of games')+statsRow('Session party games','0 results this session','partySession');}, run:function(){var count=clamp(parseInt($('count').value,10)||1,1,50),out=sample(D.partyGames||D.games||[],count,true);return{html:renderCounted(out,'🎉 '),text:out.join('\n'),count:out.length};}, afterRun:function(r){noteSuccess('partyGameGenerator',r.count);updateSessionUI();}},
      couplesDecisionMaker: { title:'Couples Decision Maker', desc:'Give us two options and we will pick one.', button:'❤️ Decide', render:function(){return field('Option A','<input id="a" type="text" placeholder="Movie night">')+field('Option B','<input id="b" type="text" placeholder="Dinner out">');}, run:function(){var a=$('a').value.trim(),b=$('b').value.trim();if(!a||!b)throw new Error('Enter both options first.');return{html:resultMain('❤️ '+esc(pick([a,b]))),count:1};}},
      secretSantaPicker: { title:'Secret Santa Picker', desc:'Create a draw with nobody assigned to themselves.', button:'🎁 Make the draw', render:function(){return field('Names','<textarea id="items" rows="10" placeholder="Alex\nSam\nJamie\nTaylor"></textarea>');}, run:function(){var a=unique(vals('items'));if(a.length<2)throw new Error('Add at least two different names.');var targets=null;for(var tries=0;tries<1000;tries++){var candidate=shuffle(a);if(candidate.every(function(x,i){return x!==a[i];})){targets=candidate;break;}}if(!targets)throw new Error('Could not make a valid draw. Add another name and try again.');return{html:a.map(function(giver,i){return'<div class="team-block"><strong>'+esc(giver)+'</strong><span>→ '+esc(targets[i])+'</span></div>';}).join(''),count:1};}}
    };

    function handleWheelResult(res) {
      var canvas=$('wheelCanvas'), run=$('run'), items=res.items;
      if(!canvas||!items||STATE.wheel.spinning)return;
      STATE.wheel.spinning=true;run.disabled=true;
      var winner=randInt(0,items.length-1),slice=360/items.length,center=winner*slice+slice/2,current=((STATE.wheel.angle%360)+360)%360;
      var delta=((360-center-current)+360)%360+360*5+randInt(0,2)*360,target=STATE.wheel.angle+delta;
      canvas.style.transition='transform 1.8s cubic-bezier(.12,.74,.22,1)';
      canvas.style.transform='rotate('+target+'deg)';
      setTimeout(function(){
        STATE.wheel.angle=target%360;
        canvas.style.transition='none';
        canvas.style.transform='rotate('+STATE.wheel.angle+'deg)';
        var winnerText=items[winner];
        renderSuccess(resultMain('🎡 '+esc(winnerText)),winnerText);
        noteSuccess('wheel',1);
        if($('removeWinner')&&$('removeWinner').checked&&items.length>2){$('items').value=items.filter(function(_,i){return i!==winner;}).join('\n');}
        STATE.wheel.spinning=false;run.disabled=false;
      },1850);
    }

    function renderTool(tool) {
      var title=$('tool-title'),desc=$('tool-desc'),controls=$('controls'),run=$('run');
      if(!tool||!title||!desc||!controls||!run)return;
      title.textContent=tool.title;desc.textContent=tool.desc;controls.innerHTML=tool.render();run.textContent=tool.button||'Generate';
      if(tool.afterRender)tool.afterRender();
      run.disabled=false;
      run.onclick=function(){
        if(run.disabled)return;
        try{
          var res=tool.run();
          if(res&&res.wheel){handleWheelResult(res);return;}
          if(!res||!res.html)throw new Error('The generator returned no result.');
          renderSuccess(res.html,res.text);
          if(tool.afterRun)tool.afterRun(res);
        }catch(e){renderError(e&&e.message?e.message:'Something went wrong. Please try again.');}
      };
    }

    var STATE = { sessions:{}, coinHistory:[], yesHistory:[], wheel:{angle:0,spinning:false}, noRepeat:{} };
    var key = document.body && document.body.getAttribute('data-tool');
    renderTool(tools[key]);
    updateSessionUI();
  }

  loadData(init);
})();