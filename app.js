const TOOLS = {
  randomNumber: {
    title: 'Random Number Generator',
    desc: 'Pick a random whole number between two limits.',
    render() {
      return `
        <label>Minimum<input id="min" type="number" value="1"></label>
        <label>Maximum<input id="max" type="number" value="100"></label>`;
    },
    run() {
      const min = Number(document.getElementById('min').value);
      const max = Number(document.getElementById('max').value);
      if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) return 'Choose a valid range.';
      return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  },
  coinFlip: { title: 'Coin Flip', desc: 'Flip a virtual coin instantly.', render(){ return ''; }, run(){ return Math.random() < 0.5 ? 'Heads' : 'Tails'; } },
  diceRoller: {
    title: 'Dice Roller', desc: 'Roll one or more standard six-sided dice.',
    render(){ return `<label>Number of dice<input id="count" type="number" value="1" min="1" max="20"></label>`; },
    run(){ const n=Math.min(20,Math.max(1,parseInt(document.getElementById('count').value,10)||1)); const rolls=Array.from({length:n},()=>Math.floor(Math.random()*6)+1); return `${rolls.join(' + ')} = ${rolls.reduce((a,b)=>a+b,0)}`; }
  },
  randomPicker: {
    title:'Random Picker', desc:'Enter a list of choices and let chance pick one.',
    render(){ return `<label>Choices<textarea id="items" rows="7" placeholder="Pizza\nBurger\nPasta"></textarea></label>`; },
    run(){ const items=document.getElementById('items').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean); return items.length?items[Math.floor(Math.random()*items.length)]:'Add at least two choices.'; }
  },
  randomName:{ title:'Random Name Generator',desc:'Pick a random first name.',render(){return '';},run(){const n=['Alex','Ava','Charlie','Emily','Harry','Isla','Jack','Liam','Mia','Noah','Olivia','Oscar','Sophie','Theo','Zoe'];return n[Math.floor(Math.random()*n.length)];}},
  randomWord:{ title:'Random Word Generator',desc:'Get a random everyday word.',render(){return '';},run(){const n=['adventure','bright','courage','forest','journey','kindness','moment','ocean','puzzle','spark','sunshine','wander','wonder','rhythm','discovery'];return n[Math.floor(Math.random()*n.length)];}},
  randomCountry:{ title:'Random Country Generator',desc:'Spin the globe and see where you land.',render(){return '';},run(){const n=['Australia','Brazil','Canada','Egypt','France','Greece','India','Italy','Japan','Kenya','Mexico','Norway','Spain','Thailand','United Kingdom'];return n[Math.floor(Math.random()*n.length)];}},
  randomColour:{ title:'Random Colour Generator',desc:'Generate a random colour and HEX code.',render(){return '';},run(){const h=Math.floor(Math.random()*0x1000000).toString(16).padStart(6,'0');return `<span class="colour-result"><i style="background:#${h}"></i><b>#${h.toUpperCase()}</b></span>`;}},
  randomTeam:{ title:'Random Team Generator',desc:'Split names into fair random teams.',render(){return `<label>Names<textarea id="items" rows="7" placeholder="Alex\nSam\nJamie\nTaylor"></textarea></label><label>Teams<input id="teams" type="number" value="2" min="2" max="10"></label>`;},run(){const items=document.getElementById('items').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);const t=Math.min(10,Math.max(2,parseInt(document.getElementById('teams').value,10)||2));if(items.length<t)return'Add at least as many names as teams.';for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}const out=Array.from({length:t},()=>[]);items.forEach((x,i)=>out[i%t].push(x));return out.map((a,i)=>`<strong>Team ${i+1}</strong><div>${a.join(', ')}</div>`).join('<br>');}},
  whoGoesFirst:{ title:'Who Goes First?',desc:'Choose a first player fairly.',render(){return `<label>Names<textarea id="items" rows="6" placeholder="Alex\nSam\nJamie"></textarea></label>`;},run(){const a=document.getElementById('items').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);return a.length?a[Math.floor(Math.random()*a.length)]:'Add some names first.';}},
  yesOrNo:{title:'Yes or No',desc:'Need a simple answer? Ask RandoSpino.',render(){return '';},run(){return Math.random()<0.5?'Yes':'No';}},
  usernameGenerator:{title:'Username Generator',desc:'Create a memorable username in seconds.',render(){return '';},run(){const a=['Pixel','Lucky','Neon','Turbo','Cosmic','Mystic','Rapid','Shadow','Sunny','Rogue'];const b=['Fox','Panda','Tiger','Nova','Byte','Runner','Wizard','Spark','Otter','Ace'];return a[Math.floor(Math.random()*a.length)]+b[Math.floor(Math.random()*b.length)]+Math.floor(Math.random()*900+100);}},
  wheelSpinner:{title:'Wheel Spinner',desc:'Turn any list into a spin-the-wheel style picker.',render(){return `<label>Wheel entries<textarea id="items" rows="7" placeholder="Pizza\nBurger\nPasta\nCurry"></textarea></label>`;},run(){const a=document.getElementById('items').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);return a.length?a[Math.floor(Math.random()*a.length)]:'Add entries to the wheel.';}}
};

function adaptProjectLinks(){
  if(!location.hostname.endsWith('github.io') || !location.pathname.startsWith('/randospino')) return;
  document.querySelectorAll('a[href^="/"]').forEach(a=>{
    const href=a.getAttribute('href');
    if(href && !href.startsWith('/randospino')) a.setAttribute('href','/randospino'+href);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  adaptProjectLinks();
  const key=document.body.dataset.tool;
  const tool=TOOLS[key];
  if(!tool) return;
  document.getElementById('tool-title').textContent=tool.title;
  document.getElementById('tool-desc').textContent=tool.desc;
  document.getElementById('controls').innerHTML=tool.render();
  document.getElementById('run').addEventListener('click',()=>{document.getElementById('result').innerHTML=tool.run();});
});
