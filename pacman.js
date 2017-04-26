// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
menu_option: '4',
name: 'Clyde',
colour: 'Orange',
character: 'Pokey',
edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky,blinky,pinky,clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 100);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power Pellets: '  + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets < 1) { //step 5d
    console.log('(p) Eat Power-Pellet');
  }
   // step 5b
  for (var i=1; i <5; i++) {
    console.log('(' + i + ') Eat ' + ghosts[i-1].name);
  }

  console.log('(q) Quit');

}

function eatGhost(ghost) {

  if (ghost.edible === false) {
    lives -= 1;
    console.log(ghost.colour + ' ' + ghost.name + ' eat a Pac-Man');
    alive();
  }

}

function eatPowerPellet() { // step 5c
  score += 50;
  for (var i = 0; i < 4; i++) {
    ghosts[i].edible = true;
  }
  powerPellets -= 1;
}

function alive() {

  if (lives < 1) {
  process.exit();
  }

}



function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(ghosts[1]);
      break;
    case '2':
      eatGhost(ghosts[2]);
      break;
    case '3':
      eatGhost(ghosts[3]);
      break;
    case '4':
      eatGhost(ghosts[4]);
      break;
    case 'p':
      if (powerPellets < 1) {
      console.log('\nNo more Power Pellet left!');
      } else {
      eatPowerPellet();
      }
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
