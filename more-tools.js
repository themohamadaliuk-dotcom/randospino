(function(){'use strict';
var pools={
time:['00:00','01:15','02:30','03:45','04:20','05:55','06:40','07:10','08:25','09:50','10:35','11:05','12:45','13:20','14:55','15:40','16:15','17:50','18:35','19:10','20:45','21:30','22:15','23:40'],
years:['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2040','2045','2050'],
languages:['English','Spanish','French','German','Italian','Portuguese','Arabic','Hindi','Urdu','Bengali','Japanese','Korean','Mandarin Chinese','Turkish','Dutch','Swedish','Norwegian','Greek','Polish','Russian','Swahili','Thai','Vietnamese','Indonesian'],
currencies:['British Pound','US Dollar','Euro','Japanese Yen','Canadian Dollar','Australian Dollar','Swiss Franc','Chinese Yuan','Indian Rupee','UAE Dirham','Saudi Riyal','Singapore Dollar','New Zealand Dollar','South African Rand','Brazilian Real','Mexican Peso','Norwegian Krone','Swedish Krona','Danish Krone'],
subjects:['Maths','English','Science','History','Geography','Art','Music','Computing','Drama','Physical Education','Design & Technology','Languages','Economics','Business Studies','Psychology','Physics','Chemistry','Biology','Literature','Media Studies'],
jobs:['Teacher','Designer','Developer','Engineer','Photographer','Chef','Journalist','Architect','Doctor','Nurse','Pilot','Writer','Animator','Game Designer','Electrician','Mechanic','Accountant','Lawyer','Musician','Marketing Manager','Film Director','Translator','Illustrator','Researcher'],
boardGames:['Chess','Checkers','Scrabble','Cluedo','Monopoly','Risk','Catan','Ticket to Ride','Carcassonne','Azul','Dixit','Pandemic','Guess Who?','Connect 4','Battleship','Jenga','Pictionary','Codenames','Boggle','The Game of Life'],
playingCards:['Ace of Hearts','2 of Hearts','3 of Hearts','4 of Hearts','5 of Hearts','6 of Hearts','7 of Hearts','8 of Hearts','9 of Hearts','10 of Hearts','Jack of Hearts','Queen of Hearts','King of Hearts','Ace of Diamonds','2 of Diamonds','3 of Diamonds','4 of Diamonds','5 of Diamonds','6 of Diamonds','7 of Diamonds','8 of Diamonds','9 of Diamonds','10 of Diamonds','Jack of Diamonds','Queen of Diamonds','King of Diamonds','Ace of Clubs','2 of Clubs','3 of Clubs','4 of Clubs','5 of Clubs','6 of Clubs','7 of Clubs','8 of Clubs','9 of Clubs','10 of Clubs','Jack of Clubs','Queen of Clubs','King of Clubs','Ace of Spades','2 of Spades','3 of Spades','4 of Spades','5 of Spades','6 of Spades','7 of Spades','8 of Spades','9 of Spades','10 of Spades','Jack of Spades','Queen of Spades','King of Spades'],
truthOrDare:['Tell a funny story from your childhood','Do your best celebrity impression','Let another player choose your profile picture for five minutes','Name three things you are grateful for','Speak in an accent for one round','Show the last photo in your camera roll','Do ten jumping jacks','Sing the chorus of a song','Give someone a genuine compliment','Describe your dream holiday','Act like a robot for 30 seconds','Tell the group your most unusual food opinion','Do a dramatic reading of the nearest text you can see','Try to make everyone laugh in 20 seconds','Invent a new handshake'],
wouldYouRather:['Would you rather fly or become invisible?','Would you rather always be ten minutes early or twenty minutes late?','Would you rather explore space or the deep ocean?','Would you rather give up social media or streaming services for a month?','Would you rather have unlimited travel or unlimited free food?','Would you rather be able to speak every language or play every instrument?','Would you rather live in the past or the future?','Would you rather never need sleep or never need money?','Would you rather have a photographic memory or perfect pitch?','Would you rather always know the truth or always be able to change the subject?'],
charades:['Brushing your teeth','Flying a plane','Making a sandwich','Walking a dog','Playing football','Swimming','Taking a selfie','Cooking spaghetti','Riding a bicycle','Opening a surprise gift','Being a superhero','Playing the drums','Falling asleep in class','Building a snowman','Going on a roller coaster','Searching for your keys','Dancing at a wedding','Catching a fish','Being a detective','Getting caught in the rain'],
snacks:['Popcorn','Nachos','Fruit salad','Chocolate','Pretzels','Trail mix','Cookies','Yoghurt','Granola bar','Crisps','Hummus and pita','Cheese and crackers','Apple slices','Smoothie','Muffin','Rice cakes','Toast','Mixed nuts','Banana','Ice cream'],
breakfasts:['Pancakes','Porridge','Scrambled eggs on toast','Greek yoghurt and fruit','Avocado toast','French toast','Breakfast burrito','Granola and berries','Omelette','Bagel with cream cheese','Egg and cheese sandwich','Banana and peanut butter toast','Shakshuka','Croissant and fruit','Breakfast smoothie'],
desserts:['Cheesecake','Chocolate brownie','Tiramisu','Apple crumble','Ice cream sundae','Crème brûlée','Chocolate mousse','Fruit tart','Sticky toffee pudding','Panna cotta','Baklava','Churros','Lemon tart','Profiteroles','Banoffee pie'],
restaurants:['Italian','Indian','Chinese','Japanese','Mexican','Thai','Greek','Turkish','Lebanese','Spanish','French','Korean','Vietnamese','American','Caribbean','Ethiopian','Moroccan','Mediterranean','British','Portuguese'],
birthstones:['Garnet','Amethyst','Aquamarine','Diamond','Emerald','Pearl','Ruby','Peridot','Sapphire','Opal','Topaz','Turquoise'],
planets:['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],
elements:['Hydrogen','Helium','Carbon','Nitrogen','Oxygen','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium','Iron','Copper','Zinc','Silver','Gold'],
eras:['Prehistoric','Ancient Egypt','Ancient Greece','Roman Empire','Medieval','Renaissance','Industrial Revolution','Victorian Era','Roaring Twenties','1950s','1960s','1970s','1980s','1990s','2000s','Near Future'],
activities:['Draw something with your non-dominant hand','Build the tallest paper tower you can','Invent a three-word story with a friend','Make a 30-second advertisement for a random object','Create a new team logo','Find five things that are the same colour','Write a haiku','Design a fictional country','Make up a new board game','Create a superhero with a silly weakness','Draw a map of an imaginary island','Invent a new holiday','Create a secret code','Write a six-line poem','Design an imaginary restaurant menu'],
classroom:['Pick a discussion leader','Choose the next presenter','Select a vocabulary word','Pick a team captain','Choose who goes first','Select a drawing prompt','Pick a review question','Choose a partner at random','Select a debate topic','Choose the next classroom helper']
};
var tools={
 randomTime:['Random Time Generator','Pick a random time of day.',pools.time],
 randomYear:['Random Year Generator','Choose a random year.',pools.years],
 randomLanguage:['Random Language Generator','Pick a language at random.',pools.languages],
 randomCurrency:['Random Currency Generator','Pick a currency at random.',pools.currencies],
 randomSchoolSubject:['Random School Subject Generator','Pick a school subject.',pools.subjects],
 randomJob:['Random Job Generator','Discover a random job.',pools.jobs],
 randomBoardGame:['Random Board Game Generator','Choose a board game to play.',pools.boardGames],
 randomPlayingCard:['Random Playing Card Generator','Draw a random playing card.',pools.playingCards],
 randomTruthOrDare:['Random Truth or Dare Prompt','Get a ready-to-use prompt.',pools.truthOrDare],
 randomWouldYouRather:['Random Would You Rather','Get a would-you-rather question.',pools.wouldYouRather],
 randomCharades:['Random Charades Prompt','Get a charades idea.',pools.charades],
 randomSnack:['Random Snack Generator','Let chance choose your snack.',pools.snacks],
 randomBreakfast:['Random Breakfast Generator','Pick a breakfast idea.',pools.breakfasts],
 randomDessert:['Random Dessert Generator','Choose a dessert at random.',pools.desserts],
 randomRestaurantCuisine:['Random Restaurant Cuisine','Choose a cuisine for your next meal.',pools.restaurants],
 randomBirthstone:['Random Birthstone Generator','Pick a birthstone at random.',pools.birthstones],
 randomPlanet:['Random Planet Generator','Pick one of the planets.',pools.planets],
 randomElement:['Random Chemical Element Generator','Pick a chemical element.',pools.elements],
 randomEra:['Random Historical Era Generator','Choose an era for a story, game or project.',pools.eras],
 randomActivity:['Random Activity Generator','Get something fun and creative to do.',pools.activities],
 randomClassroomChoice:['Random Classroom Choice','Pick a classroom option fairly.',pools.classroom]
};
function secure(){var a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]}
function pick(a){return a[Math.floor((secure()/4294967296)*a.length)]}
function esc(v){return String(v).replace(/[&<>\"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function boot(){var key=document.body.getAttribute('data-tool'),t=tools[key];if(!t)return;var title=document.getElementById('tool-title'),desc=document.getElementById('tool-desc'),run=document.getElementById('run'),out=document.getElementById('result');if(!title||!desc||!run||!out)return;title.textContent=t[0];desc.textContent=t[1];run.onclick=function(){var value=pick(t[2]);out.className='result';out.innerHTML='<div class=\"result-main\">'+esc(value)+'</div>'}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
