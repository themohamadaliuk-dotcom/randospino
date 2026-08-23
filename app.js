const LISTS = {
  names: ['Alex','Ava','Charlie','Emily','Harry','Isla','Jack','Liam','Mia','Noah','Olivia','Oscar','Sophie','Theo','Zoe','Amelia','Arthur','Ella','George','Grace','Leo','Lily','Max','Ruby','Thomas','Freya','Daniel','Poppy','William','Evie'],
  words: ['adventure','bright','courage','forest','journey','kindness','moment','ocean','puzzle','spark','sunshine','wander','wonder','rhythm','discovery','horizon','lantern','meadow','midnight','treasure','whistle','breeze','galaxy','marble','thunder'],
  countries: ['Australia','Brazil','Canada','Egypt','France','Greece','India','Italy','Japan','Kenya','Mexico','Norway','Spain','Thailand','United Kingdom','Argentina','Chile','Denmark','Germany','Iceland','Ireland','Morocco','New Zealand','Portugal','South Africa','South Korea','Sweden','Switzerland','Vietnam'],
  colours: ['#635BFF','#14B8A6','#F59E0B','#EF4444','#06B6D4','#8B5CF6','#EC4899','#22C55E','#F97316','#3B82F6','#84CC16','#E11D48'],
  movies: ['The Dark Knight','The Grand Budapest Hotel','Back to the Future','Spirited Away','Jurassic Park','The Matrix','Inception','Toy Story','The Lord of the Rings','Spider-Man: Into the Spider-Verse','Knives Out','Paddington 2','Guardians of the Galaxy','The Truman Show','School of Rock'],
  meals: ['Pizza','Tacos','Curry','Pasta','Burgers','Sushi','Stir-fry','Fajitas','Ramen','Jacket potato','Mac and cheese','Greek salad','Chilli','Fish and chips','Burritos'],
  challenges: ['Do 20 squats','Take a 10-minute walk','Send someone a nice message','Learn one new fact','Draw something in 60 seconds','Go 30 minutes without your phone','Try a new snack','Compliment someone','Write down three things you are grateful for','Take a photo of something interesting','Do a 5-minute tidy-up','Make up a silly slogan'],
  games: ['Charades','Pictionary','20 Questions','Heads Up!','Two Truths and a Lie','Categories','Would You Rather','Simon Says','Trivia','Word Association','Telephone','Guess the Song'],
  animals: ['Dog','Cat','Fox','Panda','Penguin','Koala','Tiger','Otter','Dolphin','Red panda','Hedgehog','Rabbit','Elephant','Giraffe','Parrot'],
  fantasyFirst: ['Ael','Bryn','Cael','Dara','Eira','Fael','Galen','Ilyra','Kael','Lyra','Mira','Nyx','Orin','Riven','Sylas'],
  fantasyLast: ['Moonfall','Stormborn','Nightvale','Silverleaf','Starweaver','Brightwater','Emberstone','Dawnwhisper','Shadowmere','Frostvale','Oakenshield','Ravencrest'],
  gamerFirst: ['Neon','Shadow','Turbo','Pixel','Cosmic','Mystic','Rapid','Rogue','Lucky','Frost','Blaze','Nova','Viper','Cyber','Phantom'],
  gamerLast: ['Fox','Panda','Tiger','Nova','Byte','Runner','Wizard','Spark','Otter','Ace','Wolf','Dragon','Knight','Ghost','Reaper'],
  teamWords: ['Legends','Warriors','Titans','Rockets','Falcons','Storm','Blaze','Vipers','Ravens','Wolves','Comets','Raiders','Giants','Foxes','Hawks'],
  partyGames: ['Charades','Pictionary','Musical Chairs','Trivia','Murder Mystery','Karaoke Challenge','Minute to Win It','Scavenger Hunt','Two Truths and a Lie','Guess the Song','Would You Rather','Dare Challenge'],
  petFirst: ['Bella','Luna','Milo','Coco','Teddy','Daisy','Buddy','Poppy','Rocky','Nala','Toby','Ruby','Bailey','Oreo','Mabel'],
  petSecond: ['Bear','Bean','Moon','Paws','Bug','Biscuit','Pepper','Scout','Sunny','Blue','Maple','Waffles']
};

function cryptoUint32(){
  const a = new Uint32Array(1);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(a);
  else a[0] = Math.floor(Math.random() * 4294967296);
  return a[0];
}
function randInt(min,max){
  min=Math.ceil(Number(min)); max=Math.floor(Number(max));
  if(!Number.isFinite(min)||!Number.isFinite(max)||max<min) throw new Error('Please enter a valid range.');
  const span=max-min+1;
  const limit=Math.floor(4294967296/span)*span;
  let x;
  do{x=cryptoUint32();}while(x>=limit);
  return min+(x%span);
}
function pick(a){ return a[randInt(0,a.length-1)]; }
function lines(id){ return (document.getElementById(id)?.value||'').split(/\n|,/).map(s=>s.trim()).filter(Boolean); }
function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function shuffle(a){ const x=[...a]; for(let i=x.length-1;i>0;i--){const j=randInt(0,i);[x[i],x[j]]=[x[j],x[i]];} return x; }
function randomHex(){ return '#'+randInt(0,0xFFFFFF).toString(16).padStart(6,'0').toUpperCase(); }
function slugTool(key){ return key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()); }
function resultCard(text, cls=''){ return `<div class="result-main ${cls}">${text}</div>`; }

const TOOLS = {
  randomNumber:{title:'Random Number Generator',desc:'Pick a random whole number between two limits.',render:()=>'<label>Minimum<input id="min" type="number" value="1"></label><label>Maximum<input id="max" type="number" value="100"></label>',run:()=>resultCard(String(randInt(document.getElementById('min').value,document.getElementById('max').value)))},
  coinFlip:{title:'Coin Flip',desc:'Flip a virtual coin instantly.',render:()=>'<p class="control-help">Tap generate to flip a fair virtual coin.</p>',run:()=>resultCard(randInt(0,1)?'Heads 🪙':'Tails 🪙')},
  diceRoller:{title:'Dice Roller',desc:'Roll one or more standard six-sided dice.',render:()=>'<label>Number of dice<input id="count" type="number" value="1" min="1" max="100"></label>',run:()=>{const n=Math.min(100,Math.max(1,randInt(1,Math.max(1,Number(document.getElementById('count').value)||1))));const rolls=Array.from({length:n},()=>randInt(1,6));return resultCard(`${rolls.join(' · ')}<small>Total: ${rolls.reduce((a,b)=>a+b,0)}</small>`);}},
  randomPicker:{title:'Random Picker',desc:'Enter a list of choices and let chance pick one.',render:()=>'<label>Choices<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta"></textarea></label>',run:()=>{const a=lines('items');if(!a.length)throw new Error('Add at least one choice.');return resultCard(escapeHtml(pick(a)));}},
  wheelSpinner:{title:'Wheel Spinner',desc:'Turn any list into a spin-the-wheel style picker.',render:()=>'<label>Wheel entries<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta\nCurry"></textarea></label><label><input id="removeWinner" type="checkbox"> Remove the winner after each spin</label>',run:()=>{const a=lines('items');if(!a.length)throw new Error('Add at least one entry.');const winner=pick(a);return resultCard(`🎡 ${escapeHtml(winner)}`);}},
  randomName:{title:'Random Name Generator',desc:'Pick a random first name.',render:()=>'<p class="control-help">Generate a first name instantly.</p>',run:()=>resultCard(escapeHtml(pick(LISTS.names)))},
  randomWord:{title:'Random Word Generator',desc:'Get a random everyday word.',render:()=>'<p class="control-help">Useful for prompts, games, writing and brainstorming.</p>',run:()=>resultCard(escapeHtml(pick(LISTS.words)))},
  randomCountry:{title:'Random Country Generator',desc:'Spin the globe and see where you land.',render:()=>'<p class="control-help">Pick a country at random.</p>',run:()=>resultCard(`🌍 ${escapeHtml(pick(LISTS.countries))}`)},
  randomColour:{title:'Random Colour Generator',desc:'Generate a random colour and HEX code.',render:()=>'<p class="control-help">Generate a colour you can copy into a design.</p>',run:()=>{const h=randomHex();return `<div class="result-main colour-result"><i style="background:${h}"></i><b>${h}</b></div>`;}},
  randomTeam:{title:'Random Team Generator',desc:'Split names into fair random teams.',render:()=>'<label>Names<textarea id="items" rows="8" placeholder="Alex\nSam\nJamie\nTaylor"></textarea></label><label>Number of teams<input id="teams" type="number" value="2" min="2" max="20"></label>',run:()=>{const a=lines('items');const t=Math.max(2,Math.min(20,Number(document.getElementById('teams').value)||2));if(a.length<t)throw new Error('Add at least as many names as teams.');const out=Array.from({length:t},()=>[]);shuffle(a).forEach((x,i)=>out[i%t].push(x));return out.map((x,i)=>`<div class="team-block"><strong>Team ${i+1}</strong><span>${x.map(escapeHtml).join(', ')}</span></div>`).join('');}},
  whoGoesFirst:{title:'Who Goes First?',desc:'Choose a first player fairly.',render:()=>'<label>Names<textarea id="items" rows="6" placeholder="Alex\nSam\nJamie"></textarea></label>',run:()=>{const a=lines('items');if(!a.length)throw new Error('Add some names first.');return resultCard(`🏁 ${escapeHtml(pick(a))}`);}},
  yesOrNo:{title:'Yes or No',desc:'Need a simple answer? Ask RandoSpino.',render:()=>'<label>Question <input id="question" type="text" placeholder="Should I order pizza?"></label>',run:()=>resultCard(pick(['Yes ✅','No ❌']))},
  randomMovie:{title:'Random Movie Picker',desc:'Pick a movie when you cannot decide what to watch.',render:()=>'<p class="control-help">One random suggestion, with no scrolling required.</p>',run:()=>resultCard(`🎬 ${escapeHtml(pick(LISTS.movies))}`)},
  randomMeal:{title:'Random Meal Generator',desc:'Let chance decide what you are eating.',render:()=>'<p class="control-help">Pick a meal idea when nothing sounds right.</p>',run:()=>resultCard(`🍕 ${escapeHtml(pick(LISTS.meals))}`)},
  randomChallenge:{title:'Random Challenge Generator',desc:'Get a fun challenge to try.',render:()=>'<p class="control-help">Keep generating until you find one you like.</p>',run:()=>resultCard(`🔥 ${escapeHtml(pick(LISTS.challenges))}`)},
  randomGame:{title:'Random Game Picker',desc:'Pick a game for your group.',render:()=>'<p class="control-help">Great for friends, families, classrooms and parties.</p>',run:()=>resultCard(`🎮 ${escapeHtml(pick(LISTS.games))}`)},
  randomDate:{title:'Random Date Generator',desc:'Generate a random date within a range.',render:()=>'<div class="date-grid"><label>From<input id="from" type="date"></label><label>To<input id="to" type="date"></label></div>',run:()=>{const f=document.getElementById('from'),t=document.getElementById('to');const now=new Date();if(!f.value)f.value=now.toISOString().slice(0,10);if(!t.value){const d=new Date(now);d.setFullYear(d.getFullYear()+1);t.value=d.toISOString().slice(0,10);}const a=new Date(f.value+'T12:00:00').getTime(),b=new Date(t.value+'T12:00:00').getTime();if(b<a)throw new Error('Choose a To date on or after the From date.');return resultCard(new Date(a+Math.floor((b-a+86400000)*randInt(0,1000000)/1000000)).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}));}},
  usernameGenerator:{title:'Username Generator',desc:'Create a memorable username in seconds.',render:()=>'<label>Theme (optional)<input id="theme" type="text" placeholder="gaming, music, space..."></label>',run:()=>resultCard(`${pick(LISTS.gamerFirst)}${pick(LISTS.gamerLast)}${randInt(10,999)}`)},
  gamerNameGenerator:{title:'Gamer Name Generator',desc:'Find a new gaming handle.',render:()=>'<p class="control-help">Generate a handle with a clean, memorable structure.</p>',run:()=>resultCard(`${pick(LISTS.gamerFirst)}${pick(LISTS.gamerLast)}${randInt(1,99)}`)},
  teamNameGenerator:{title:'Team Name Generator',desc:'Instant names for your squad.',render:()=>'<p class="control-help">Generate a bold team name.</p>',run:()=>resultCard(`${pick(LISTS.teamWords)} ${pick(['Club','Crew','United','Squad','League','Collective'])}`)},
  fantasyNameGenerator:{title:'Fantasy Name Generator',desc:'Characters, kingdoms, creatures and more.',render:()=>'<p class="control-help">Generate a fantasy-style character name.</p>',run:()=>resultCard(`${pick(LISTS.fantasyFirst)} ${pick(LISTS.fantasyLast)}`)},
  petNameGenerator:{title:'Pet Name Generator',desc:'Find a name for your new best friend.',render:()=>'<p class="control-help">Works for dogs, cats and all kinds of pets.</p>',run:()=>resultCard(`${pick(LISTS.petFirst)} ${pick(LISTS.petSecond)}`)},
  partyGameGenerator:{title:'Party Game Generator',desc:'Pick a game everyone can play.',render:()=>'<p class="control-help">Generate a party-friendly game idea.</p>',run:()=>resultCard(`🎉 ${pick(LISTS.partyGames)}`)},
  couplesDecisionMaker:{title:'Couples Decision Maker',desc:'Let RandoSpino settle the little things.',render:()=>'<label>Option A<input id="a" type="text" placeholder="Movie night"></label><label>Option B<input id="b" type="text" placeholder="Dinner out"></label>',run:()=>{const a=document.getElementById('a').value.trim(),b=document.getElementById('b').value.trim();if(!a||!b)throw new Error('Enter both options first.');return resultCard(`❤️ ${escapeHtml(pick([a,b]))}`);}},
  secretSantaPicker:{title:'Secret Santa Picker',desc:'Make a fair Secret Santa draw without anyone drawing themselves.',render:()=>'<label>Names<textarea id="items" rows="10" placeholder="Alex\nSam\nJamie\nTaylor"></textarea></label>',run:()=>{const a=Array.from(new Set(lines('items')));if(a.length<2)throw new Error('Add at least two different names.');let targets;for(let tries=0;tries<200;tries++){targets=shuffle(a);if(targets.every((x,i)=>x!==a[i]))break;}if(!targets||targets.some((x,i)=>x===a[i]))throw new Error('Try again with more names.');return a.map((giver,i)=>`<div class="team-block"><strong>${escapeHtml(giver)}</strong><span>→ ${escapeHtml(targets[i])}</span></div>`).join('');}},
  animals:{title:'Random Animal Generator',desc:'Pick a random animal.',render:()=>'<p class="control-help">A quick animal picker for games and ideas.</p>',run:()=>resultCard(`🐾 ${pick(LISTS.animals)}`)}
};

function adaptProjectLinks(){
  if(!location.hostname.endsWith('github.io') || !location.pathname.startsWith('/randospino')) return;
  document.querySelectorAll('a[href^="/"]').forEach(a=>{
    const href=a.getAttribute('href');
    if(href && !href.startsWith('/randospino')) a.setAttribute('href','/randospino'+href);
  });
}

function initDefaults(){
  const from=document.getElementById('from'); const to=document.getElementById('to');
  if(from&&!from.value){const n=new Date();from.value=n.toISOString().slice(0,10);const d=new Date(n);d.setFullYear(d.getFullYear()+1);to.value=d.toISOString().slice(0,10);}
}

document.addEventListener('DOMContentLoaded',()=>{
  adaptProjectLinks();
  const key=document.body.dataset.tool;
  const tool=TOOLS[key];
  if(!tool) return;
  const title=document.getElementById('tool-title'); const desc=document.getElementById('tool-desc'); const controls=document.getElementById('controls'); const run=document.getElementById('run'); const result=document.getElementById('result');
  title.textContent=tool.title; desc.textContent=tool.desc; controls.innerHTML=tool.render(); initDefaults();
  run.addEventListener('click',()=>{try{result.innerHTML=tool.run();}catch(e){result.innerHTML=`<div class="result-error">${escapeHtml(e.message||'Please check your inputs.')}</div>`;}});
  run.addEventListener('keydown',e=>{if(e.key==='Enter') e.preventDefault();});
});
