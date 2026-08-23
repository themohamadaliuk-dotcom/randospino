(function () {
  'use strict';

  var DATA = {
    names: {
      Global: ['Aarav','Abigail','Adam','Aisha','Akira','Alejandro','Ali','Amara','Amelia','Ana','Anaya','Andrei','Aria','Aya','Ben','Camila','Carlos','Chloe','Daniel','David','Elena','Elias','Emily','Emma','Ethan','Fatima','Felix','Freya','Gabriel','Grace','Hana','Hannah','Hassan','Hugo','Ibrahim','Isabella','Ivan','Jamal','Jasmine','Javier','Jia','Joseph','Julia','Kai','Kareem','Layla','Leo','Leila','Liam','Lina','Lucas','Lucia','Maya','Mia','Mika','Mohamed','Nadia','Naomi','Nora','Noah','Olivia','Omar','Oscar','Priya','Rafael','Rania','Ruby','Sam','Sara','Sofia','Sophia','Tariq','Theo','Valentina','Victor','Yara','Yasmin','Yuki','Zain','Zoe'],
      Arabic: ['Aaliyah','Amina','Aya','Farah','Fatima','Hala','Hana','Huda','Iman','Laila','Layla','Leen','Mariam','Maya','Nadia','Noor','Rania','Reem','Salma','Sara','Yasmin','Zahra','Ahmed','Ali','Amir','Hassan','Hussein','Ibrahim','Jamal','Kareem','Khalid','Mahmoud','Omar','Rami','Samir','Tariq','Yusuf','Zaid','Zain'],
      SouthAsian: ['Aarav','Aanya','Aditya','Anika','Arjun','Diya','Ishaan','Kavya','Kiara','Meera','Neha','Nisha','Pari','Priya','Rhea','Rohan','Saanvi','Sahil','Sana','Shreya','Siya','Tanvi','Varun','Veer','Vihaan'],
      EastAsian: ['Aiko','Akira','Aya','Emi','Hana','Haruto','Hiro','Kai','Kenji','Kenta','Mei','Ren','Riku','Sakura','Sora','Yuki','Yuna','Hyejin','Jisoo','Minho','Seojun','Sora','Wei','Xinyi','Yichen'],
      African: ['Amina','Amara','Ayana','Chiamaka','Efe','Imani','Jabari','Kofi','Lerato','Mandla','Nia','Nneka','Olu','Sade','Tariro','Thabo','Wanjiku','Zuri','Kwame','Kabelo'],
      European: ['Alba','Amelia','Anna','Arthur','Beatrice','Clara','Elena','Elise','Emma','Eva','Finn','Freya','George','Greta','Hugo','Iris','Luca','Lucia','Matteo','Mila','Nina','Oscar','Sofia','Theo','Viktor'],
      LatinAmerican: ['Alejandro','Camila','Diego','Elena','Emilia','Gabriela','Isabella','Javier','Lucia','Mateo','Mateus','Natalia','Rafael','Renata','Santiago','Sofia','Valentina','Ximena','Yasmin','Thiago']
    },
    words: {
      Any: ['adventure','bright','courage','forest','journey','kindness','moment','ocean','puzzle','spark','sunshine','wander','wonder','rhythm','discovery','horizon','lantern','meadow','midnight','treasure','whistle','breeze','galaxy','marble','thunder','curious','echo','velvet','sunrise','comet','rainbow','drift','whisper','orbit','castle','garden','river','wildflower','starlight','passport'],
      Nature: ['forest','ocean','river','meadow','wildflower','sunrise','rainbow','thunder','breeze','garden','mountain','valley','island','sunset','rain','cloud','leaf','stone','willow','moonlight'],
      Creative: ['canvas','melody','sketch','poem','rhythm','novel','design','colour','story','idea','spark','imagine','create','invent','wonder'],
      Positive: ['kindness','courage','joy','hope','smile','gratitude','friendship','success','calm','bright','brave','trust','respect','laugh','dream']
    },
    countries: ['Argentina','Australia','Austria','Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czechia','Denmark','Egypt','Finland','France','Germany','Greece','Hungary','Iceland','India','Indonesia','Ireland','Italy','Japan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand','Norway','Peru','Philippines','Poland','Portugal','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland','Thailand','Türkiye','United Kingdom','United States','Vietnam'],
    countriesByRegion: {
      Europe: ['Austria','Belgium','Croatia','Czechia','Denmark','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Netherlands','Norway','Poland','Portugal','Spain','Sweden','Switzerland','United Kingdom'],
      Asia: ['China','India','Indonesia','Japan','Malaysia','Philippines','Singapore','South Korea','Thailand','Türkiye','Vietnam'],
      Africa: ['Egypt','Kenya','Morocco','South Africa'],
      Americas: ['Argentina','Brazil','Canada','Chile','Colombia','Mexico','Peru','United States'],
      Oceania: ['Australia','New Zealand']
    },
    movies: ['The Dark Knight','The Grand Budapest Hotel','Back to the Future','Spirited Away','Jurassic Park','The Matrix','Inception','Toy Story','The Lord of the Rings: The Fellowship of the Ring','Spider-Man: Into the Spider-Verse','Knives Out','Paddington 2','Guardians of the Galaxy','The Truman Show','School of Rock','Interstellar','The Martian','The Princess Bride','Jumanji','The Incredibles'],
    moviesByGenre: {
      Any: ['The Dark Knight','The Grand Budapest Hotel','Back to the Future','Spirited Away','Jurassic Park','The Matrix','Inception','Toy Story','Knives Out','Interstellar','The Martian','The Princess Bride','School of Rock','The Incredibles'],
      Action: ['The Dark Knight','The Matrix','Jurassic Park','Inception','Guardians of the Galaxy','Spider-Man: Into the Spider-Verse'],
      Comedy: ['The Grand Budapest Hotel','School of Rock','Paddington 2','The Princess Bride','The Truman Show'],
      Family: ['Toy Story','Paddington 2','The Incredibles','Jumanji','Spider-Man: Into the Spider-Verse'],
      SciFi: ['The Matrix','Inception','Interstellar','The Martian','Back to the Future'],
      Mystery: ['Knives Out','The Truman Show','The Dark Knight']
    },
    meals: ['Pizza','Tacos','Curry','Pasta','Burgers','Sushi','Stir-fry','Fajitas','Ramen','Jacket potato','Mac and cheese','Greek salad','Chilli','Fish and chips','Burritos','Chicken wrap','Lasagne','Pad Thai','Risotto','Kebab','Pho','Paella','Bibimbap','Falafel','Dumplings'],
    mealsByType: {
      Any: ['Pizza','Tacos','Curry','Pasta','Burgers','Sushi','Stir-fry','Fajitas','Ramen','Jacket potato','Mac and cheese','Greek salad','Chilli','Fish and chips','Burritos','Chicken wrap','Lasagne','Pad Thai','Risotto','Kebab','Pho','Paella','Bibimbap','Falafel','Dumplings'],
      Quick: ['Pizza','Pasta','Jacket potato','Chicken wrap','Burgers','Tacos','Stir-fry'],
      Healthy: ['Greek salad','Stir-fry','Falafel','Chicken wrap','Sushi','Buddha bowl','Grilled fish'],
      Comfort: ['Mac and cheese','Lasagne','Chilli','Jacket potato','Curry','Pizza'],
      International: ['Sushi','Ramen','Pad Thai','Pho','Paella','Bibimbap','Falafel','Tacos','Curry','Kebab']
    },
    challenges: ['Do 20 squats','Take a 10-minute walk','Send someone a nice message','Learn one new fact','Draw something in 60 seconds','Go 30 minutes without your phone','Try a new snack','Compliment someone','Write down three things you are grateful for','Take a photo of something interesting','Do a 5-minute tidy-up','Make up a silly slogan','Write a four-line poem','Do a one-minute dance','Learn how to say hello in another language','Organise one drawer','Write down a future goal'],
    challengesByType: {
      Any: ['Do 20 squats','Take a 10-minute walk','Send someone a nice message','Learn one new fact','Draw something in 60 seconds','Go 30 minutes without your phone','Try a new snack','Compliment someone','Write down three things you are grateful for','Take a photo of something interesting','Do a 5-minute tidy-up','Make up a silly slogan','Write a four-line poem','Do a one-minute dance','Learn how to say hello in another language','Organise one drawer','Write down a future goal'],
      Quick: ['Do 20 squats','Draw something in 60 seconds','Compliment someone','Do a one-minute dance','Make up a silly slogan','Take a photo of something interesting'],
      Creative: ['Draw something in 60 seconds','Write a four-line poem','Make up a silly slogan','Write a tiny story','Invent a superhero','Create a new word'],
      Social: ['Send someone a nice message','Compliment someone','Ask a friend an interesting question','Tell someone a joke','Thank someone for something'],
      Productivity: ['Do a 5-minute tidy-up','Organise one drawer','Write down a future goal','Delete ten old screenshots','Make a short to-do list']
    },
    games: ['Charades','Pictionary','20 Questions','Heads Up!','Two Truths and a Lie','Categories','Would You Rather','Simon Says','Trivia','Word Association','Telephone','Guess the Song','I Spy','Hangman','Scattergories','The Alphabet Game','Truth or Dare','Name That Tune'],
    animals: ['Dog','Cat','Fox','Panda','Penguin','Koala','Tiger','Otter','Dolphin','Red panda','Hedgehog','Rabbit','Elephant','Giraffe','Parrot','Lion','Zebra','Gorilla','Turtle','Kangaroo','Panda'],
    fantasyFirst: ['Ael','Bryn','Cael','Dara','Eira','Fael','Galen','Ilyra','Kael','Lyra','Mira','Nyx','Orin','Riven','Sylas','Elara','Thorne','Seren','Vael','Arwen','Cerys','Dorian','Elowen','Fenric','Isolde'],
    fantasyLast: ['Moonfall','Stormborn','Nightvale','Silverleaf','Starweaver','Brightwater','Emberstone','Dawnwhisper','Shadowmere','Frostvale','Oakenshield','Ravencrest','Sunfire','Mistwalker','Ironheart','Duskwarden'],
    gamerFirst: ['Neon','Shadow','Turbo','Pixel','Cosmic','Mystic','Rapid','Rogue','Lucky','Frost','Blaze','Nova','Viper','Cyber','Phantom','Hyper','Atomic','Zero','Quantum','Arcane'],
    gamerLast: ['Fox','Panda','Tiger','Nova','Byte','Runner','Wizard','Spark','Otter','Ace','Wolf','Dragon','Knight','Ghost','Reaper','Vortex','Rider','Ninja','Fury','Raptor'],
    teamWords: ['Legends','Warriors','Titans','Rockets','Falcons','Storm','Blaze','Vipers','Ravens','Wolves','Comets','Raiders','Giants','Foxes','Hawks','Dragons','Knights','Chargers','Panthers','Guardians'],
    partyGames: ['Charades','Pictionary','Musical Chairs','Trivia','Murder Mystery','Karaoke Challenge','Minute to Win It','Scavenger Hunt','Two Truths and a Lie','Guess the Song','Would You Rather','Dare Challenge','Freeze Dance','Human Bingo','Act It Out'],
    petFirst: ['Bella','Luna','Milo','Coco','Teddy','Daisy','Buddy','Poppy','Rocky','Nala','Toby','Ruby','Bailey','Oreo','Mabel','Biscuit','Loki','Willow','Pepper','Mochi'],
    petSecond: ['Bear','Bean','Moon','Paws','Bug','Biscuit','Pepper','Scout','Sunny','Blue','Maple','Waffles','Pickle','Cookie','Mochi','Bubbles'],
    themes: {
      gaming: ['Neon','Pixel','Cyber','Turbo','Shadow','Quantum','Arcade','Glitch','Rogue','Nova','Phantom','Byte','Viper','Frost','Blaze'],
      football: ['Goal','Striker','Keeper','Pitch','Boot','Tackle','Volley','Finesse','Captain','United','Derby','Premier'],
      space: ['Cosmic','Orbit','Nova','Lunar','Solar','Stellar','Astro','Rocket','Comet','Nebula','Eclipse','Galaxy'],
      nature: ['Forest','River','Wild','Oak','Pine','Moss','Willow','Summit','Meadow','Canyon','Leaf','Rain'],
      music: ['Beat','Rhythm','Melody','Vinyl','Bass','Echo','Tempo','Lyric','Chord','Wave','Groove','Sonic'],
      anime: ['Kitsune','Shinobi','Ronin','Kitsune','Sakura','Kage','Hikari','Akuma','Yuki','Ryu','Mochi','Sora'],
      tech: ['Code','Byte','Logic','Kernel','Pixel','Cloud','Data','Stack','Script','Binary','Tech','Node'],
      cars: ['Turbo','Drift','Rally','Apex','Nitro','Torque','V8','Piston','Roadster','Track','Speed','Cruise'],
      luxury: ['Elite','Royal','Velvet','Gold','Diamond','Platinum','Silk','Prestige','Monarch','Opal','Crown','Luxe'],
      cute: ['Mochi','Bunny','Peach','Berry','Poppy','Panda','Cookie','Bubbles','Sunny','Cherry','Honey','Daisy'],
      fantasy: ['Dragon','Rune','Mythic','Wizard','Raven','Arcane','Ember','Knight','Frost','Mystic','Quest','Shadow'],
      dark: ['Void','Night','Grim','Raven','Wraith','Dusk','Shadow','Hex','Obsidian','Phantom','Ash','Eclipse'],
      travel: ['Nomad','Wander','Atlas','Roamer','Voyage','Passport','Jetset','Trail','Globe','Compass','Horizon','Trek'],
      food: ['Taco','Noodle','Pepper','Basil','Cookie','Sushi','Curry','Mango','Berry','Pasta','Mocha','Chilli']
    }
  };

  function byId(id) { return document.getElementById(id); }
  function secureUint32() {
    if (!window.crypto || !window.crypto.getRandomValues) throw new Error('Secure browser randomness is unavailable. Please use a modern browser.');
    var a = new Uint32Array(1); window.crypto.getRandomValues(a); return a[0];
  }
  function randomInt(min, max) {
    min = Math.ceil(Number(min)); max = Math.floor(Number(max));
    if (!isFinite(min) || !isFinite(max) || max < min) throw new Error('Please enter a valid range.');
    var span = max - min + 1;
    var limit = Math.floor(4294967296 / span) * span;
    var v; do { v = secureUint32(); } while (v >= limit);
    return min + (v % span);
  }
  function pick(list) { if (!list || !list.length) throw new Error('There are no choices available.'); return list[randomInt(0, list.length - 1)]; }
  function values(id) { var e = byId(id); return e ? e.value.split(/[\n,]+/).map(function (x) { return x.trim(); }).filter(Boolean) : []; }
  function unique(id) { var out=[]; values(id).forEach(function(v){ if(out.indexOf(v)<0) out.push(v); }); return out; }
  function esc(value) { return String(value).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];}); }
  function shuffle(list) { var a=list.slice(); for(var i=a.length-1;i>0;i--){var j=randomInt(0,i),t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function field(label, html) { return '<div class="field"><label>' + label + '</label>' + html + '</div>'; }
  function resultMain(html) { return '<div class="result-main">' + html + '</div>'; }
  function copyText(text) { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text); }
  function formatColour() {
    var r=randomInt(0,255),g=randomInt(0,255),b=randomInt(0,255);
    var hex='#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase();
    var max=Math.max(r,g,b)/255,min=Math.min(r,g,b)/255,l=(max+min)/2, h=0,s=0,d=max-min;
    if(d){s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h=Math.round(h*60);} 
    s=Math.round(s*100); l=Math.round(l*100);
    return {hex:hex,r:r,g:g,b:b,h:h,s:s,l:l};
  }
  function namePool(region){ return DATA.names[region] || DATA.names.Global; }
  function themeKey(raw){ var s=String(raw||'').toLowerCase(); var keys=Object.keys(DATA.themes); for(var i=0;i<keys.length;i++){ if(s.indexOf(keys[i])>=0) return keys[i]; } var map={space:'space',gaming:'gaming',gamer:'gaming',football:'football',soccer:'football',anime:'anime',tech:'tech',computer:'tech',nature:'nature',forest:'nature',music:'music',song:'music',car:'cars',cars:'cars',luxury:'luxury',rich:'luxury',cute:'cute',fantasy:'fantasy',magic:'fantasy',dark:'dark',travel:'travel',holiday:'travel',food:'food',cooking:'food'}; for(var k in map){if(s.indexOf(k)>=0)return map[k];} return 'gaming'; }
  function makeUsername(theme, includeNumber, separator) {
    var key=themeKey(theme), list=DATA.themes[key], first=pick(list), second=pick(DATA.gamerLast), sep=separator||'';
    var out=first+sep+second;
    if(includeNumber) out += sep + randomInt(10,999);
    return out;
  }
  function makeWheel(items) {
    var center=260,radius=236,slice=360/items.length,colors=['#6b57f1','#ff5f98','#14b8a6','#f59e0b','#06b6d4','#8b5cf6','#ef4444','#22c55e','#3b82f6','#ec4899','#84cc16','#f97316'];
    function p(angle,d){var r=(angle-90)*Math.PI/180;return {x:center+d*Math.cos(r),y:center+d*Math.sin(r)};}
    var svg='<svg class="wheel-svg" viewBox="0 0 520 520" aria-label="Decision wheel"><g id="wheel-disc">';
    items.forEach(function(item,i){var st=i*slice,en=(i+1)*slice,a=p(st,radius),b=p(en,radius),m=st+slice/2,lr=items.length>12?148:items.length>8?165:180,lp=p(m,lr),fs=items.length>12?11:items.length>8?13:16,path='M 260 260 L '+a.x.toFixed(2)+' '+a.y.toFixed(2)+' A 236 236 0 '+(slice>180?1:0)+' 1 '+b.x.toFixed(2)+' '+b.y.toFixed(2)+' Z';svg+='<path d="'+path+'" fill="'+colors[i%colors.length]+'" stroke="rgba(255,255,255,.9)" stroke-width="2"></path><text x="'+lp.x.toFixed(2)+'" y="'+lp.y.toFixed(2)+'" font-size="'+fs+'" font-weight="800" fill="#fff" text-anchor="middle" dominant-baseline="middle">'+esc(item.length>18?item.slice(0,17)+'…':item)+'</text>';});
    svg+='</g><circle cx="260" cy="260" r="28" fill="#fff" stroke="#ddd8f5" stroke-width="4"></circle><circle cx="260" cy="260" r="8" fill="#6b57f1"></circle></svg>';return svg;
  }
  function setHistory(key, value) { var arr=[]; try{arr=JSON.parse(sessionStorage.getItem('rs_'+key)||'[]')}catch(e){} arr.unshift(value); if(arr.length>12)arr=arr.slice(0,12); try{sessionStorage.setItem('rs_'+key,JSON.stringify(arr))}catch(e){} return arr; }
  function getHistory(key) { try{return JSON.parse(sessionStorage.getItem('rs_'+key)||'[]')}catch(e){return []} }
  function historyHtml(arr) { return arr.length ? '<div class="history"><span>Recent</span>'+arr.map(function(v){return '<button type="button" class="history-chip" data-history="'+esc(v)+'">'+esc(v)+'</button>';}).join('')+'</div>' : ''; }

  var TOOLS = {
    randomNumber:{title:'Random Number Generator',desc:'Choose an independent random number — no predictable turn-taking.',render:function(){return field('Minimum','<input id="min" type="number" value="1">')+field('Maximum','<input id="max" type="number" value="100">')+field('Mode','<select id="mode"><option value="integer">Whole number</option><option value="decimal">Decimal</option></select>')},run:function(){var min=Number(byId('min').value),max=Number(byId('max').value);if(!isFinite(min)||!isFinite(max)||max<min)throw new Error('Enter a valid minimum and maximum.');if(byId('mode').value==='integer')return resultMain(randomInt(Math.ceil(min),Math.floor(max)));var scaled=randomInt(Math.ceil(min*100),Math.floor(max*100))/100;return resultMain(scaled.toFixed(2));}},
    coinFlip:{title:'Coin Flip',desc:'Heads or tails, with every flip independently random.',render:function(){var h=getHistory('coin');return '<p class="control-help">Each flip is an independent cryptographic random draw. Consecutive Heads or Tails are completely possible — the tool never alternates results on purpose.</p><div class="stats"><strong id="coin-count">'+h.length+'</strong><span>flips this session</span></div><div id="coin-history">'+historyHtml(h)+'</div>'},run:function(){var v= randomInt(0,1)===0?'Heads':'Tails';var h=setHistory('coin',v);return resultMain(v==='Heads'?'Heads 🪙':'Tails 🪙')+'<div class="stats"><strong>'+h.length+'</strong><span>flips this session</span></div>'+historyHtml(h);}},
    diceRoller:{title:'Dice Roller',desc:'Roll one or many dice with your choice of sides.',render:function(){return field('Number of dice','<input id="count" type="number" value="1" min="1" max="100">')+field('Sides','<select id="sides"><option>4</option><option selected>6</option><option>8</option><option>10</option><option>12</option><option>20</option><option>100</option></select>')},run:function(){var n=Math.max(1,Math.min(100,Number(byId('count').value)||1)),s=Number(byId('sides').value),a=[],t=0;for(var i=0;i<n;i++){var r=randomInt(1,s);a.push(r);t+=r;}return resultMain(a.join(' · ')+'<small>Total: '+t+'</small>');}},
    randomPicker:{title:'Random Picker',desc:'Paste your own choices and pick one fairly.',render:function(){return field('Choices','<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta\nCurry"></textarea>')+field('Avoid immediate repeat','<select id="avoid"><option value="yes" selected>Yes</option><option value="no">No</option></select>')},run:function(){var a=unique('items');if(!a.length)throw new Error('Add at least one choice.');var h=getHistory('picker'),pool=a;if(byId('avoid').value==='yes'&&a.length>1&&h.length&&a.indexOf(h[0])>=0)pool=a.filter(function(x){return x!==h[0]});var v=pick(pool),hh=setHistory('picker',v);return resultMain(esc(v))+historyHtml(hh);}},
    wheelSpinner:{title:'Wheel Spinner',desc:'A real animated wheel that spins and lands on one of your entries.',render:function(){return '<div class="wheel-shell"><div class="wheel-pointer"></div><div class="wheel-wrap" id="wheel-wrap">'+makeWheel(['Pizza','Burger','Pasta','Curry','Tacos','Sushi'])+'</div></div>'+field('Wheel entries','<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta\nCurry">Pizza\nBurger\nPasta\nCurry\nTacos\nSushi</textarea>')+'<label class="check-row"><input id="removeWinner" type="checkbox"> Remove winner after each spin</label><p class="control-help">Your entries redraw the wheel automatically when they change.</p>'},run:function(){return ''; }},
    randomName:{title:'Random Name Generator',desc:'Explore a broader mix of first names from around the world.',render:function(){return field('Name pool','<select id="region"><option>Global</option><option>Arabic</option><option>SouthAsian</option><option>EastAsian</option><option>African</option><option>European</option><option>LatinAmerican</option></select>')},run:function(){return resultMain(esc(pick(namePool(byId('region').value))));}},
    randomWord:{title:'Random Word Generator',desc:'Generate a useful word with optional category.',render:function(){return field('Category','<select id="category"><option>Any</option><option>Nature</option><option>Creative</option><option>Positive</option></select>')},run:function(){return resultMain(esc(pick(DATA.words[byId('category').value]||DATA.words.Any)));}},
    randomCountry:{title:'Random Country Generator',desc:'Pick a country globally or from a region.',render:function(){return field('Region','<select id="region"><option value="Any">Worldwide</option><option>Europe</option><option>Asia</option><option>Africa</option><option>Americas</option><option>Oceania</option></select>')},run:function(){var r=byId('region').value,a=r==='Any'?DATA.countries:DATA.countriesByRegion[r];return resultMain('🌍 '+esc(pick(a)));}},
    randomColour:{title:'Random Colour Generator',desc:'Generate a colour with copyable HEX, RGB and HSL values.',render:function(){return field('Format emphasis','<select id="format"><option value="all">Show all</option><option value="hex">HEX</option><option value="rgb">RGB</option><option value="hsl">HSL</option></select>')},run:function(){var c=formatColour(),blocks='<div class="colour-swatch" style="background:'+c.hex+'"></div><div class="colour-meta"><div><strong>HEX</strong><button class="copy-result" data-copy="'+c.hex+'">'+c.hex+'</button></div><div><strong>RGB</strong><button class="copy-result" data-copy="rgb('+c.r+', '+c.g+', '+c.b+')">rgb('+c.r+', '+c.g+', '+c.b+')</button></div><div><strong>HSL</strong><button class="copy-result" data-copy="hsl('+c.h+', '+c.s+'%, '+c.l+'%)">hsl('+c.h+', '+c.s+'%, '+c.l+'%)</button></div></div>';return blocks;}},
    randomTeam:{title:'Random Team Generator',desc:'Shuffle names and split them as evenly as possible.',render:function(){return field('Names','<textarea id="items" rows="8" placeholder="Alex\nSam\nJamie\nTaylor\nJordan\nMaya"></textarea>')+field('Number of teams','<input id="teams" type="number" value="2" min="2" max="20">')},run:function(){var a=unique('items'),t=Math.max(2,Math.min(20,Number(byId('teams').value)||2));if(a.length<t)throw new Error('Add at least as many names as teams.');var o=[];for(var i=0;i<t;i++)o.push([]);shuffle(a).forEach(function(v,k){o[k%t].push(v)});return o.map(function(team,k){return '<div class="team-block"><strong>Team '+(k+1)+'</strong><span>'+team.map(esc).join(', ')+'</span></div>';}).join('');}},
    whoGoesFirst:{title:'Who Goes First?',desc:'Choose a first player without taking turns.',render:function(){return field('Players','<textarea id="items" rows="6" placeholder="Alex\nSam\nJamie"></textarea>')},run:function(){var a=unique('items');if(!a.length)throw new Error('Add some players first.');return resultMain('🏁 '+esc(pick(a)));}},
    yesOrNo:{title:'Yes or No',desc:'Ask a question and get an independently random yes/no result.',render:function(){var h=getHistory('yesno');return field('Question (optional)','<input id="question" type="text" placeholder="Should I order pizza tonight?">')+'<p class="control-help">Yes and No are selected independently each time. There is no alternating sequence.</p>'+historyHtml(h);},run:function(){var v=randomInt(0,1)===0?'Yes':'No',h=setHistory('yesno',v),q=(byId('question').value||'').trim();return (q?'<div class="question-preview">'+esc(q)+'</div>':'')+resultMain(v==='Yes'?'Yes ✅':'No ❌')+historyHtml(h);}},
    randomMovie:{title:'Random Movie Picker',desc:'Pick a movie by genre.',render:function(){return field('Genre','<select id="genre"><option>Any</option><option>Action</option><option>Comedy</option><option>Family</option><option>SciFi</option><option>Mystery</option></select>')},run:function(){return resultMain('🎬 '+esc(pick(DATA.moviesByGenre[byId('genre').value]||DATA.movies)));}},
    randomMeal:{title:'Random Meal Generator',desc:'Pick a meal by mood or type.',render:function(){return field('Type','<select id="type"><option>Any</option><option>Quick</option><option>Healthy</option><option>Comfort</option><option>International</option></select>')},run:function(){return resultMain('🍕 '+esc(pick(DATA.mealsByType[byId('type').value]||DATA.meals)));}},
    randomChallenge:{title:'Random Challenge Generator',desc:'Choose a challenge by category.',render:function(){return field('Category','<select id="type"><option>Any</option><option>Quick</option><option>Creative</option><option>Social</option><option>Productivity</option></select>')},run:function(){return resultMain('🔥 '+esc(pick(DATA.challengesByType[byId('type').value]||DATA.challenges)));}},
    randomGame:{title:'Random Game Picker',desc:'Pick a game for your group.',render:function(){return field('Players','<select id="players"><option>Any</option><option>2</option><option>3–5</option><option>6+</option></select>')},run:function(){return resultMain('🎮 '+esc(pick(DATA.games)));}},
    randomDate:{title:'Random Date Generator',desc:'Generate an inclusive random date inside your range.',render:function(){return '<div class="date-grid"><div class="field"><label>From</label><input id="from" type="date"></div><div class="field"><label>To</label><input id="to" type="date"></div></div>'},run:function(){var from=byId('from'),to=byId('to'),n=new Date(),d=new Date(n);if(!from.value)from.value=n.toISOString().slice(0,10);if(!to.value){d.setFullYear(d.getFullYear()+1);to.value=d.toISOString().slice(0,10);}var a=new Date(from.value+'T12:00:00'),b=new Date(to.value+'T12:00:00');if(b<a)throw new Error('Choose a To date on or after the From date.');var days=Math.floor((b-a)/86400000);var r=new Date(a.getTime()+randomInt(0,days)*86400000);return resultMain(r.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}));}},
    usernameGenerator:{title:'Username Generator',desc:'Use a theme to shape the actual words in your username.',render:function(){return field('Theme','<input id="theme" type="text" placeholder="gaming, space, football, anime, music..."><span class="field-hint">Try: gaming · space · football · anime · tech · cars · nature · music · dark · cute · travel · food</span>')+field('Separator','<select id="separator"><option value="">None</option><option value="_">Underscore</option><option value=".">Dot</option><option value="-">Dash</option></select>')+field('Add numbers','<select id="numbers"><option value="yes" selected>Yes</option><option value="no">No</option></select>')},run:function(){var u=makeUsername(byId('theme').value,byId('numbers').value==='yes',byId('separator').value);return resultMain(esc(u));}},
    gamerNameGenerator:{title:'Gamer Name Generator',desc:'Generate a gamer tag with more control.',render:function(){return field('Style','<select id="style"><option>Any</option><option>Stealth</option><option>Competitive</option><option>Funny</option><option>Fantasy</option><option>Tech</option></select>')+field('Numbers','<select id="numbers"><option>Yes</option><option>No</option></select>')},run:function(){var styles={Any:DATA.gamerFirst,Stealth:['Shadow','Phantom','Rogue','Ghost','Night'],Competitive:['Turbo','Rapid','Blaze','Viper','Apex'],Funny:['Waffle','Pickle','Biscuit','Noodle','Taco'],Fantasy:['Dragon','Rune','Wizard','Raven','Mystic'],Tech:['Pixel','Cyber','Quantum','Byte','Glitch']};var u=pick(styles[byId('style').value]);u+=pick(DATA.gamerLast);if(byId('numbers').value==='Yes')u+=randomInt(10,999);return resultMain(esc(u));}},
    teamNameGenerator:{title:'Team Name Generator',desc:'Build a team name around a style.',render:function(){return field('Style','<select id="style"><option>Powerful</option><option>Funny</option><option>Classic</option><option>Esports</option></select>')},run:function(){var suffix={Powerful:['Legends','Warriors','Titans','Guardians'],Funny:['Club','Crew','Squad','Bunch'],Classic:['United','Athletic','Rovers','City'],Esports:['GG','Gaming','Elite','X']};return resultMain(esc(pick(DATA.teamWords)+' '+pick(suffix[byId('style').value])));}},
    fantasyNameGenerator:{title:'Fantasy Name Generator',desc:'Create a fantasy character name with style.',render:function(){return field('Style','<select id="style"><option>Any</option><option>Royal</option><option>Dark</option><option>Nature</option><option>Warrior</option></select>')},run:function(){var style=byId('style').value,pre=DATA.fantasyFirst,suf=DATA.fantasyLast,extra={Royal:['Elara','Isolde','Arwen','Seren'],Dark:['Nyx','Riven','Thorne','Vael'],Nature:['Elowen','Willow','Eira','Cael'],Warrior:['Dorian','Galen','Riven','Thorne']};if(extra[style])pre=extra[style];return resultMain(esc(pick(pre)+' '+pick(suf)));}},
    petNameGenerator:{title:'Pet Name Generator',desc:'Find a pet name by vibe.',render:function(){return field('Vibe','<select id="vibe"><option>Cute</option><option>Funny</option><option>Classic</option><option>Cool</option></select>')},run:function(){var map={Cute:['Mochi','Cookie','Bubbles','Peach','Honey','Daisy'],Funny:['Pickle','Waffles','Noodle','Beans','Tater','Biscuit'],Classic:['Bella','Charlie','Max','Ruby','Buddy','Mabel'],Cool:['Loki','Nova','Pepper','Scout','Storm','Blue']};return resultMain(esc(pick(map[byId('vibe').value])));}},
    partyGameGenerator:{title:'Party Game Generator',desc:'Choose something to play right now.',render:function(){return field('Group size','<select id="size"><option>Any</option><option>2–4</option><option>5–8</option><option>9+</option></select>')},run:function(){return resultMain('🎉 '+esc(pick(DATA.partyGames)));}},
    secretSantaPicker:{title:'Secret Santa Picker',desc:'Assign people fairly without anyone drawing themselves.',render:function(){return field('Names','<textarea id="items" rows="10" placeholder="Alex\nSam\nJamie\nTaylor"></textarea>')},run:function(){var a=unique('items');if(a.length<2)throw new Error('Add at least two different names.');var targets,ok=false;for(var tries=0;tries<500&&!ok;tries++){targets=shuffle(a);ok=targets.every(function(v,i){return v!==a[i]});}if(!ok)throw new Error('Please try again.');return a.map(function(g,i){return '<div class="team-block"><strong>'+esc(g)+'</strong><span>→ '+esc(targets[i])+'</span></div>';}).join('');}},
    couplesDecisionMaker:{title:'Couples Decision Maker',desc:'Let a fair random choice settle two options.',render:function(){return field('Option A','<input id="a" type="text" placeholder="Movie night">')+field('Option B','<input id="b" type="text" placeholder="Dinner out">')},run:function(){var a=byId('a').value.trim(),b=byId('b').value.trim();if(!a||!b)throw new Error('Enter both options first.');return resultMain('❤️ '+esc(pick([a,b])));}},
    animals:{title:'Random Animal Generator',desc:'Pick an animal quickly.',render:function(){return '<p class="control-help">A quick picker for games, prompts and ideas.</p>';},run:function(){return resultMain('🐾 '+esc(pick(DATA.animals)));}}
  };

  function adaptLinks() {
    if (location.hostname.indexOf('github.io') < 0 || location.pathname.indexOf('/randospino') !== 0) return;
    var links=document.querySelectorAll('a[href^="/"]');
    for(var i=0;i<links.length;i++){var h=links[i].getAttribute('href');if(h&&h.indexOf('/randospino')!==0)links[i].setAttribute('href','/randospino'+h);}
  }

  function initWheel() {
    var items=unique('items'),wrap=byId('wheel-wrap');if(!wrap||!items.length)return;
    wrap.innerHTML=makeWheel(items);
    var run=byId('run'); if(!run)return;
    run.onclick=function(){
      try{
        var list=unique('items');if(list.length<2)throw new Error('Add at least two wheel entries.');
        wrap.innerHTML=makeWheel(list);
        var winnerIndex=randomInt(0,list.length-1), slice=360/list.length, turns=randomInt(5,8), target=turns*360 + (360-(winnerIndex+0.5)*slice);
        var disc=byId('wheel-disc'); run.disabled=true;
        disc.style.transition='transform 4.2s cubic-bezier(.12,.75,.18,1)'; disc.style.transform='rotate('+target+'deg)';
        window.setTimeout(function(){run.disabled=false;var winner=list[winnerIndex];byId('result').innerHTML=resultMain('🎡 '+esc(winner))+'<button class="copy-result" type="button" data-copy="'+esc(winner)+'">Copy result</button>';if(byId('removeWinner').checked){var remain=list.filter(function(x,i){return i!==winnerIndex});byId('items').value=remain.join('\n');wrap.innerHTML=makeWheel(remain.length?remain:['Add entries']);}},4300);
      }catch(e){byId('result').textContent=e.message||'Something went wrong.';byId('result').className='result result-error';}
    };
    byId('items').addEventListener('input',function(){var list=unique('items');if(list.length>=2)wrap.innerHTML=makeWheel(list);});
  }

  function init() {
    adaptLinks();
    var key=document.body.getAttribute('data-tool'),tool=TOOLS[key],title=byId('tool-title'),desc=byId('tool-desc'),controls=byId('controls'),run=byId('run'),result=byId('result');
    if(!tool||!title||!desc||!controls||!run||!result)return;
    title.textContent=tool.title;desc.textContent=tool.desc;controls.innerHTML=tool.render();
    if(key==='wheelSpinner'){run.textContent='🎡 Spin the wheel';initWheel();return;}
    run.onclick=function(){try{var output=tool.run();if(output!==undefined){result.className='result';result.innerHTML=output;bindCopy();}}catch(e){result.className='result result-error';result.textContent=e&&e.message?e.message:'Something went wrong. Please try again.';}};
    bindCopy();
  }
  function bindCopy(){var buttons=document.querySelectorAll('[data-copy]');for(var i=0;i<buttons.length;i++){buttons[i].onclick=function(){copyText(this.getAttribute('data-copy'));this.textContent='Copied ✓';var b=this;setTimeout(function(){b.textContent=b.getAttribute('data-copy');},900);};}}
  document.addEventListener('DOMContentLoaded',init);
}());
