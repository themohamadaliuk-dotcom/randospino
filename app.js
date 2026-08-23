(function () {
  'use strict';

  var DATA = {
    names: ['Alex','Ava','Charlie','Emily','Harry','Isla','Jack','Liam','Mia','Noah','Olivia','Oscar','Sophie','Theo','Zoe','Amelia','Arthur','Ella','George','Grace','Leo','Lily','Max','Ruby','Thomas','Freya','Daniel','Poppy','William','Evie','Adam','Alice','Benjamin','Chloe','Daisy','Edward','Eliza','Finley','Hannah','Henry','James','Jessica','Joseph','Layla','Lucas','Lucy','Matthew','Maya','Michael','Nora','Oliver','Phoebe','Samuel','Scarlett','Sebastian','Sophia','Toby','Victoria'],
    words: ['adventure','bright','courage','forest','journey','kindness','moment','ocean','puzzle','spark','sunshine','wander','wonder','rhythm','discovery','horizon','lantern','meadow','midnight','treasure','whistle','breeze','galaxy','marble','thunder','curious','echo','velvet','sunrise','comet','rainbow','drift','whisper','orbit','castle','garden','river','wildflower','starlight','passport'],
    countries: ['Australia','Argentina','Austria','Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czechia','Denmark','Egypt','Finland','France','Germany','Greece','Hungary','Iceland','India','Indonesia','Ireland','Italy','Japan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand','Norway','Peru','Philippines','Poland','Portugal','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland','Thailand','Türkiye','United Kingdom','United States','Vietnam'],
    movies: ['The Dark Knight','The Grand Budapest Hotel','Back to the Future','Spirited Away','Jurassic Park','The Matrix','Inception','Toy Story','The Lord of the Rings: The Fellowship of the Ring','Spider-Man: Into the Spider-Verse','Knives Out','Paddington 2','Guardians of the Galaxy','The Truman Show','School of Rock','Interstellar','The Martian','The Princess Bride','Jumanji','The Incredibles'],
    meals: ['Pizza','Tacos','Curry','Pasta','Burgers','Sushi','Stir-fry','Fajitas','Ramen','Jacket potato','Mac and cheese','Greek salad','Chilli','Fish and chips','Burritos','Chicken wrap','Lasagne','Pad Thai','Risotto','Kebab'],
    challenges: ['Do 20 squats','Take a 10-minute walk','Send someone a nice message','Learn one new fact','Draw something in 60 seconds','Go 30 minutes without your phone','Try a new snack','Compliment someone','Write down three things you are grateful for','Take a photo of something interesting','Do a 5-minute tidy-up','Make up a silly slogan','Write a 4-line poem','Do a one-minute dance','Learn how to say hello in another language'],
    games: ['Charades','Pictionary','20 Questions','Heads Up!','Two Truths and a Lie','Categories','Would You Rather','Simon Says','Trivia','Word Association','Telephone','Guess the Song','I Spy','Hangman','Scattergories','The Alphabet Game','Truth or Dare','Name That Tune'],
    animals: ['Dog','Cat','Fox','Panda','Penguin','Koala','Tiger','Otter','Dolphin','Red panda','Hedgehog','Rabbit','Elephant','Giraffe','Parrot','Lion','Zebra','Gorilla','Turtle','Kangaroo','Panda'],
    fantasyFirst: ['Ael','Bryn','Cael','Dara','Eira','Fael','Galen','Ilyra','Kael','Lyra','Mira','Nyx','Orin','Riven','Sylas','Elara','Thorne','Seren','Vael','Arwen'],
    fantasyLast: ['Moonfall','Stormborn','Nightvale','Silverleaf','Starweaver','Brightwater','Emberstone','Dawnwhisper','Shadowmere','Frostvale','Oakenshield','Ravencrest','Sunfire','Mistwalker','Ironheart','Duskwarden'],
    gamerFirst: ['Neon','Shadow','Turbo','Pixel','Cosmic','Mystic','Rapid','Rogue','Lucky','Frost','Blaze','Nova','Viper','Cyber','Phantom','Hyper','Atomic','Zero','Quantum','Arcane'],
    gamerLast: ['Fox','Panda','Tiger','Nova','Byte','Runner','Wizard','Spark','Otter','Ace','Wolf','Dragon','Knight','Ghost','Reaper','Vortex','Rider','Ninja','Fury','Raptor'],
    teamWords: ['Legends','Warriors','Titans','Rockets','Falcons','Storm','Blaze','Vipers','Ravens','Wolves','Comets','Raiders','Giants','Foxes','Hawks','Dragons','Knights','Chargers','Panthers','Guardians'],
    partyGames: ['Charades','Pictionary','Musical Chairs','Trivia','Murder Mystery','Karaoke Challenge','Minute to Win It','Scavenger Hunt','Two Truths and a Lie','Guess the Song','Would You Rather','Dare Challenge','Freeze Dance','Human Bingo','Act It Out'],
    petFirst: ['Bella','Luna','Milo','Coco','Teddy','Daisy','Buddy','Poppy','Rocky','Nala','Toby','Ruby','Bailey','Oreo','Mabel','Milo','Biscuit','Loki','Willow','Pepper'],
    petSecond: ['Bear','Bean','Moon','Paws','Bug','Biscuit','Pepper','Scout','Sunny','Blue','Maple','Waffles','Pickle','Cookie','Mochi','Bubbles']
  };

  function byId(id) { return document.getElementById(id); }

  function secureUint32() {
    if (!window.crypto || !window.crypto.getRandomValues) {
      throw new Error('Secure browser randomness is not available in this browser. Please use an up-to-date browser.');
    }
    var bucket = new Uint32Array(1);
    window.crypto.getRandomValues(bucket);
    return bucket[0];
  }

  function randomInt(min, max) {
    min = Math.ceil(Number(min));
    max = Math.floor(Number(max));
    if (!isFinite(min) || !isFinite(max) || max < min) {
      throw new Error('Please enter a valid range.');
    }

    var span = max - min + 1;
    var limit = Math.floor(4294967296 / span) * span;
    var value;
    do {
      value = secureUint32();
    } while (value >= limit);

    return min + (value % span);
  }

  function pick(list) {
    if (!list || !list.length) throw new Error('There are no choices available.');
    return list[randomInt(0, list.length - 1)];
  }

  function values(id) {
    var el = byId(id);
    if (!el) return [];
    return el.value.split(/[\n,]+/).map(function (value) { return value.trim(); }).filter(Boolean);
  }

  function uniqueValues(id) {
    var result = [];
    values(id).forEach(function (value) {
      if (result.indexOf(value) === -1) result.push(value);
    });
    return result;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"']/g, function (char) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[char];
    });
  }

  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = randomInt(0, i);
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function resultHtml(html) {
    return '<div class="result-main">' + html + '</div>';
  }

  function field(label, html) {
    return '<div class="field"><label>' + label + '</label>' + html + '</div>';
  }

  function makeDateString(date) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function randomDateBetween(from, to) {
    var start = new Date(from + 'T12:00:00').getTime();
    var end = new Date(to + 'T12:00:00').getTime();
    if (!isFinite(start) || !isFinite(end) || end < start) {
      throw new Error('Choose a valid date range.');
    }
    var days = Math.floor((end - start) / 86400000);
    return new Date(start + randomInt(0, days) * 86400000);
  }

  function createWheelSvg(items) {
    var size = 520;
    var center = 260;
    var radius = 236;
    var count = items.length;
    var slice = 360 / count;
    var colors = ['#6b57f1','#ff5f98','#14b8a6','#f59e0b','#06b6d4','#8b5cf6','#ef4444','#22c55e','#3b82f6','#ec4899','#84cc16','#f97316'];
    var markup = '<svg class="wheel-svg" viewBox="0 0 520 520" role="img" aria-label="Random selection wheel"><g class="wheel-disc" id="wheel-disc">';

    function point(angle, distance) {
      var radians = (angle - 90) * Math.PI / 180;
      return {
        x: center + distance * Math.cos(radians),
        y: center + distance * Math.sin(radians)
      };
    }

    items.forEach(function (item, index) {
      var start = index * slice;
      var end = (index + 1) * slice;
      var p1 = point(start, radius);
      var p2 = point(end, radius);
      var largeArc = slice > 180 ? 1 : 0;
      var path = 'M ' + center + ' ' + center + ' L ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) + ' A ' + radius + ' ' + radius + ' 0 ' + largeArc + ' 1 ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2) + ' Z';
      var mid = start + slice / 2;
      var labelRadius = count > 12 ? 148 : count > 8 ? 168 : 180;
      var lp = point(mid, labelRadius);
      var textSize = count > 12 ? 12 : count > 8 ? 14 : 16;
      markup += '<path d="' + path + '" fill="' + colors[index % colors.length] + '" stroke="rgba(255,255,255,.85)" stroke-width="2"></path>';
      markup += '<text x="' + lp.x.toFixed(2) + '" y="' + lp.y.toFixed(2) + '" font-size="' + textSize + '" font-weight="800" fill="#fff" text-anchor="middle" dominant-baseline="middle" transform="rotate(' + mid.toFixed(2) + ' ' + lp.x.toFixed(2) + ' ' + lp.y.toFixed(2) + ')">' + escapeHtml(item.length > 18 ? item.slice(0, 17) + '…' : item) + '</text>';
    });

    markup += '</g><circle cx="260" cy="260" r="28" fill="#fff" stroke="#ddd8f5" stroke-width="4"></circle><circle cx="260" cy="260" r="8" fill="#6b57f1"></circle></svg>';
    return markup;
  }

  var TOOLS = {
    randomNumber: {
      title: 'Random Number Generator',
      desc: 'Pick a random whole number between two limits.',
      render: function () { return field('Minimum','<input id="min" type="number" value="1">') + field('Maximum','<input id="max" type="number" value="100">'); },
      run: function () { return resultHtml(String(randomInt(byId('min').value, byId('max').value))); }
    },
    coinFlip: {
      title: 'Coin Flip',
      desc: 'Flip a genuinely random virtual coin.',
      render: function () { return '<p class="control-help">Every flip is independently selected using your browser\'s secure random generator. Repeats are possible — just like a real coin.</p>'; },
      run: function () { return resultHtml(randomInt(0, 1) === 0 ? 'Heads 🪙' : 'Tails 🪙'); }
    },
    diceRoller: {
      title: 'Dice Roller',
      desc: 'Roll one or more standard six-sided dice.',
      render: function () { return field('Number of dice','<input id="count" type="number" value="1" min="1" max="100">'); },
      run: function () {
        var count = Math.max(1, Math.min(100, Number(byId('count').value) || 1));
        var rolls = [];
        var total = 0;
        for (var i = 0; i < count; i++) { var roll = randomInt(1, 6); rolls.push(roll); total += roll; }
        return resultHtml(rolls.join(' · ') + '<small>Total: ' + total + '</small>');
      }
    },
    randomPicker: {
      title: 'Random Picker',
      desc: 'Enter a list of choices and let chance pick one.',
      render: function () { return field('Choices','<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta"></textarea>'); },
      run: function () { var list = values('items'); if (!list.length) throw new Error('Add at least one choice.'); return resultHtml(escapeHtml(pick(list))); }
    },
    wheelSpinner: {
      title: 'Wheel Spinner',
      desc: 'Add entries, spin the wheel, and let chance choose a winner.',
      render: function () {
        return '<div class="wheel-shell"><div class="wheel-pointer" aria-hidden="true"></div><div class="wheel-wrap" id="wheel-wrap">' + createWheelSvg(['Pizza','Burger','Pasta','Curry']) + '</div></div>' +
          field('Wheel entries','<textarea id="items" rows="8" placeholder="Pizza\nBurger\nPasta\nCurry">Pizza\nBurger\nPasta\nCurry</textarea>') +
          '<label class="check-row"><input id="removeWinner" type="checkbox"> Remove the winner after each spin</label>' +
          '<p class="control-help">The pointer stays fixed. The wheel itself spins and lands on the randomly selected entry.</p>';
      },
      run: function () { return ''; }
    },
    randomName: {
      title: 'Random Name Generator',
      desc: 'Pick a random first name.',
      render: function () { return '<p class="control-help">Generate a first name instantly.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.names))); }
    },
    randomWord: {
      title: 'Random Word Generator',
      desc: 'Get a random everyday word for games, writing and ideas.',
      render: function () { return '<p class="control-help">Useful for writing prompts, games, brainstorming and creative exercises.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.words))); }
    },
    randomCountry: {
      title: 'Random Country Generator',
      desc: 'Spin the globe and see where you land.',
      render: function () { return '<p class="control-help">Pick a country at random.</p>'; },
      run: function () { return resultHtml('🌍 ' + escapeHtml(pick(DATA.countries))); }
    },
    randomColour: {
      title: 'Random Colour Generator',
      desc: 'Generate a random colour and HEX code.',
      render: function () { return '<p class="control-help">Generate a colour you can use in a design or project.</p>'; },
      run: function () {
        var hex = '#' + randomInt(0, 16777215).toString(16).toUpperCase().padStart(6, '0');
        return '<div class="result-main colour-result"><i style="background:' + hex + '"></i><b>' + hex + '</b></div>';
      }
    },
    randomTeam: {
      title: 'Random Team Generator',
      desc: 'Split names into fair random teams.',
      render: function () { return field('Names','<textarea id="items" rows="8" placeholder="Alex\nSam\nJamie\nTaylor"></textarea>') + field('Number of teams','<input id="teams" type="number" value="2" min="2" max="20">'); },
      run: function () {
        var list = uniqueValues('items');
        var teamCount = Math.max(2, Math.min(20, Number(byId('teams').value) || 2));
        if (list.length < teamCount) throw new Error('Add at least as many names as teams.');
        var teams = [];
        for (var i = 0; i < teamCount; i++) teams.push([]);
        shuffle(list).forEach(function (name, index) { teams[index % teamCount].push(name); });
        return teams.map(function (team, index) { return '<div class="team-block"><strong>Team ' + (index + 1) + '</strong><span>' + team.map(escapeHtml).join(', ') + '</span></div>'; }).join('');
      }
    },
    whoGoesFirst: {
      title: 'Who Goes First?',
      desc: 'Choose a first player fairly.',
      render: function () { return field('Names','<textarea id="items" rows="6" placeholder="Alex\nSam\nJamie"></textarea>'); },
      run: function () { var list = values('items'); if (!list.length) throw new Error('Add some names first.'); return resultHtml('🏁 ' + escapeHtml(pick(list))); }
    },
    yesOrNo: {
      title: 'Yes or No',
      desc: 'Need a simple answer? Ask RandoSpino.',
      render: function () { return field('Question (optional)','<input id="question" type="text" placeholder="Should I order pizza?">'); },
      run: function () { return resultHtml(pick(['Yes ✅','No ❌'])); }
    },
    randomMovie: {
      title: 'Random Movie Picker',
      desc: 'Pick a movie when you cannot decide what to watch.',
      render: function () { return '<p class="control-help">One quick suggestion. Generate again whenever you want another pick.</p>'; },
      run: function () { return resultHtml('🎬 ' + escapeHtml(pick(DATA.movies))); }
    },
    randomMeal: {
      title: 'Random Meal Generator',
      desc: 'Let chance decide what you are eating.',
      render: function () { return '<p class="control-help">A quick meal idea for when nobody can decide.</p>'; },
      run: function () { return resultHtml('🍕 ' + escapeHtml(pick(DATA.meals))); }
    },
    randomChallenge: {
      title: 'Random Challenge Generator',
      desc: 'Get a fun challenge to try.',
      render: function () { return '<p class="control-help">Keep generating until you find one you like.</p>'; },
      run: function () { return resultHtml('🔥 ' + escapeHtml(pick(DATA.challenges))); }
    },
    randomGame: {
      title: 'Random Game Picker',
      desc: 'Pick a game for your group.',
      render: function () { return '<p class="control-help">Great for friends, families, classrooms and parties.</p>'; },
      run: function () { return resultHtml('🎮 ' + escapeHtml(pick(DATA.games))); }
    },
    randomDate: {
      title: 'Random Date Generator',
      desc: 'Generate a random date within a range.',
      render: function () { return '<div class="date-grid"><div class="field"><label>From</label><input id="from" type="date"></div><div class="field"><label>To</label><input id="to" type="date"></div></div>'; },
      run: function () {
        var from = byId('from').value;
        var to = byId('to').value;
        var now = new Date();
        if (!from) from = now.toISOString().slice(0, 10);
        if (!to) { var later = new Date(now); later.setFullYear(later.getFullYear() + 1); to = later.toISOString().slice(0, 10); }
        return resultHtml('📅 ' + makeDateString(randomDateBetween(from, to)));
      }
    },
    usernameGenerator: {
      title: 'Username Generator',
      desc: 'Create a memorable username in seconds.',
      render: function () { return field('Theme (optional)','<input id="theme" type="text" placeholder="gaming, music, space...">'); },
      run: function () { return resultHtml(escapeHtml(pick(DATA.gamerFirst) + pick(DATA.gamerLast) + randomInt(10, 999))); }
    },
    gamerNameGenerator: {
      title: 'Gamer Name Generator',
      desc: 'Find a new gaming handle.',
      render: function () { return '<p class="control-help">Generate a handle with a clean, memorable structure.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.gamerFirst) + pick(DATA.gamerLast) + randomInt(1, 99))); }
    },
    teamNameGenerator: {
      title: 'Team Name Generator',
      desc: 'Instant names for your squad.',
      render: function () { return '<p class="control-help">Generate a bold team name.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.teamWords) + ' ' + pick(['Club','Crew','United','Squad','League','Collective']))); }
    },
    fantasyNameGenerator: {
      title: 'Fantasy Name Generator',
      desc: 'Characters, kingdoms, creatures and more.',
      render: function () { return '<p class="control-help">Generate a fantasy-style character name.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.fantasyFirst) + ' ' + pick(DATA.fantasyLast))); }
    },
    petNameGenerator: {
      title: 'Pet Name Generator',
      desc: 'Find a name for your new best friend.',
      render: function () { return '<p class="control-help">Works for dogs, cats and all kinds of pets.</p>'; },
      run: function () { return resultHtml(escapeHtml(pick(DATA.petFirst) + ' ' + pick(DATA.petSecond))); }
    },
    partyGameGenerator: {
      title: 'Party Game Generator',
      desc: 'Pick a game everyone can play.',
      render: function () { return '<p class="control-help">Generate a party-friendly game idea.</p>'; },
      run: function () { return resultHtml('🎉 ' + escapeHtml(pick(DATA.partyGames))); }
    },
    couplesDecisionMaker: {
      title: 'Couples Decision Maker',
      desc: 'Let RandoSpino settle the little things.',
      render: function () { return field('Option A','<input id="a" type="text" placeholder="Movie night">') + field('Option B','<input id="b" type="text" placeholder="Dinner out">'); },
      run: function () { var a = byId('a').value.trim(); var b = byId('b').value.trim(); if (!a || !b) throw new Error('Enter both options first.'); return resultHtml('❤️ ' + escapeHtml(pick([a,b]))); }
    },
    secretSantaPicker: {
      title: 'Secret Santa Picker',
      desc: 'Make a fair Secret Santa draw without anyone drawing themselves.',
      render: function () { return field('Names','<textarea id="items" rows="10" placeholder="Alex\nSam\nJamie\nTaylor"></textarea>'); },
      run: function () {
        var people = uniqueValues('items');
        if (people.length < 2) throw new Error('Add at least two different names.');
        var targets = null;
        for (var tries = 0; tries < 500; tries++) {
          var shuffled = shuffle(people);
          var valid = shuffled.every(function (person, index) { return person !== people[index]; });
          if (valid) { targets = shuffled; break; }
        }
        if (!targets) throw new Error('We could not make a valid draw. Try adding another name.');
        return people.map(function (giver, index) { return '<div class="team-block"><strong>' + escapeHtml(giver) + '</strong><span>→ ' + escapeHtml(targets[index]) + '</span></div>'; }).join('');
      }
    },
    animals: {
      title: 'Random Animal Generator',
      desc: 'Pick a random animal.',
      render: function () { return '<p class="control-help">A quick animal picker for games, ideas and prompts.</p>'; },
      run: function () { return resultHtml('🐾 ' + escapeHtml(pick(DATA.animals))); }
    }
  };

  function adaptProjectLinks() {
    if (location.hostname.indexOf('github.io') === -1 || location.pathname.indexOf('/randospino') !== 0) return;
    var links = document.querySelectorAll('a[href^="/"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href && href.indexOf('/randospino') !== 0) links[i].setAttribute('href', '/randospino' + href);
    }
  }

  function copyTextFromResult(result) {
    var text = result.textContent.trim();
    if (!text || text === 'Ready when you are.') return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showCopyStatus(result, 'Copied!'); }).catch(function () { fallbackCopy(text, result); });
    } else {
      fallbackCopy(text, result);
    }
  }

  function fallbackCopy(text, result) {
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); showCopyStatus(result, 'Copied!'); } catch (e) { showCopyStatus(result, 'Copy failed'); }
    document.body.removeChild(area);
  }

  function showCopyStatus(result, message) {
    var button = result.querySelector('.copy-result');
    if (!button) return;
    var original = button.getAttribute('data-original') || 'Copy result';
    button.textContent = message;
    setTimeout(function () { button.textContent = original; }, 1400);
  }

  function setOutput(result, html) {
    result.className = 'result';
    result.innerHTML = html + '<button class="copy-result" type="button" data-original="Copy result">Copy result</button>';
    var copy = result.querySelector('.copy-result');
    if (copy) copy.addEventListener('click', function () { copyTextFromResult(result); });
  }

  function setError(result, error) {
    result.className = 'result';
    result.innerHTML = '<div class="result-error">' + escapeHtml(error && error.message ? error.message : 'Something went wrong. Please try again.') + '</div>';
  }

  function renderWheel(items) {
    var wrap = byId('wheel-wrap');
    if (!wrap) return;
    wrap.innerHTML = createWheelSvg(items);
    var disc = byId('wheel-disc');
    if (disc) disc.style.transform = 'rotate(0deg)';
  }

  function initWheel(runButton, result) {
    var wheelItems = function () { var list = uniqueValues('items'); if (list.length < 2) throw new Error('Add at least two entries to spin the wheel.'); return list.slice(0, 24); };
    var currentRotation = 0;
    var spinning = false;

    var input = byId('items');
    if (input) input.addEventListener('input', function () {
      var list = uniqueValues('items');
      if (list.length >= 2) renderWheel(list.slice(0, 24));
    });

    runButton.addEventListener('click', function () {
      if (spinning) return;
      try {
        var items = wheelItems();
        var winnerIndex = randomInt(0, items.length - 1);
        var disc = byId('wheel-disc');
        if (!disc) throw new Error('The wheel could not be loaded. Please refresh the page.');
        renderWheel(items);
        disc = byId('wheel-disc');
        var slice = 360 / items.length;
        var centerAngle = (winnerIndex + 0.5) * slice;
        var fullTurns = 6 + randomInt(0, 2);
        var targetRotation = currentRotation + fullTurns * 360 + (360 - centerAngle);
        spinning = true;
        runButton.disabled = true;
        disc.style.transition = 'transform 5s cubic-bezier(.12,.78,.16,1)';
        disc.style.transform = 'rotate(' + targetRotation + 'deg)';
        setTimeout(function () {
          currentRotation = targetRotation;
          spinning = false;
          runButton.disabled = false;
          setOutput(result, '<span class="wheel-winner">🎡 ' + escapeHtml(items[winnerIndex]) + '</span>');
          var remove = byId('removeWinner');
          if (remove && remove.checked) {
            var updated = items.filter(function (item, index) { return index !== winnerIndex; });
            if (updated.length >= 2) {
              byId('items').value = updated.join('\n');
              renderWheel(updated);
            }
          }
        }, 5100);
      } catch (error) {
        setError(result, error);
      }
    });
  }

  function init() {
    adaptProjectLinks();
    var key = document.body.getAttribute('data-tool');
    var tool = TOOLS[key];
    var title = byId('tool-title');
    var desc = byId('tool-desc');
    var controls = byId('controls');
    var run = byId('run');
    var result = byId('result');

    if (!tool || !title || !desc || !controls || !run || !result) return;

    title.textContent = tool.title;
    desc.textContent = tool.desc;
    controls.innerHTML = tool.render();

    if (key === 'wheelSpinner') {
      initWheel(run, result);
      return;
    }

    run.addEventListener('click', function () {
      try {
        setOutput(result, tool.run());
      } catch (error) {
        setError(result, error);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();