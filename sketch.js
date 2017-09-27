var canvas;
var player;
var house;
var monsters;
var shutters;
var monster_num;
var x;
var y;
var time;
var x_min = -20;
var x_max = 1140;
var y_min = -20;
var y_max = 670;

function setup() {
  canvas = createCanvas(1100, 650);
  centerCanvas();
  player = new Player(1100/2, 650/2);
  monsters = new Map();
  shutters = new Map();
  monster_num = 0;
  x = 0;
  y = 0;
  house = new House(175, 85);
  /*monsters.set(monster_num, new Monster(0,0));
  monster_num += 1;
  monsters.set(monster_num, new Monster(200,0));
  monster_num += 1;
  monsters.set(monster_num, new Monster(200,600));
  monster_num += 1;
  monsters.set(monster_num, new Monster(0,200));
  monster_num += 1;
  monsters.set(monster_num, new Monster(0,630));
  monster_num += 1;
  monsters.set(monster_num, new Monster(200,620));
  monster_num += 1;
  monsters.set(monster_num, new Monster(990, 630));
  monster_num += 1;
  monsters.set(monster_num, new Monster(900, 600));
  monster_num += 1;
  monsters.set(monster_num, new Monster(930, 0));
  monster_num += 1;*/
  //left
  shutters.set(0, new Shutter(175, 305, 5, 40, 175, 323, 5, 5));
  //upper
  shutters.set(1, new Shutter(540, 85, 40, 5, 558, 85, 5, 5));
  //right
  shutters.set(2, new Shutter(920, 305, 5, 40, 920, 323, 5, 5));
  //lower
  shutters.set(3, new Shutter(540, 580, 40, 5, 558, 580, 5, 5));
  //setInterval(spawnMonster, 10000);
  time = 0;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  canvas.position(x, 100);
}

function getRandomX(min, max) {
  return floor(Math.random() * (x_max - x_min) + x_min);
}

function getRandomY(min, max) {
  return floor(Math.random() * (y_max - y_min) + y_min);
}

function spawnMonster() {
  valid_spawn = false;
  //make sure it spawns outside of the house
  while (!valid_spawn) {
    x = getRandomX(x_min, x_max);
    y = getRandomY(y_min, y_max);
    //if its not inside the house, then its okay
    if ( !(x > 0 && x < 1140 && y > 0 && y < 670) ) {
      valid_spawn = true;
    }
  }
  monsters.set(monster_num, new Monster(x, y));
  //monsters.get(monster_num).move();
  monster_num += 1;
  console.log("monster spawned");
}

function draw() {
  background(0);
  fill(255, 100);
  //keep an event listener for keyboard input
  keys();
  time += second();
  //console.log(time);
  if (time > 15000) {
    spawnMonster();
    time = 0;
  }
  house.show();
  player.show();

  //displays shutters
  for (var i = 0; i < shutters.size; i++) {
    if (shutters.has(i)){
      shutters.get(i).show();
    }
  }
  //displays monsters
  for (var i = 0; i < monsters.size; i++){
    if (monsters.has(i)){
      monsters.get(i).show();
    }
  }
  //moves monsters
  for (var i = 0; i < monsters.size; i++){
    if (monsters.has(i)){
      monsters.get(i).move();
    }
  }

}

function mouseClicked() {
  console.log("(" + mouseX + ", " + mouseY + ")");
}

function keys() {
  if (keyIsDown(RIGHT_ARROW))
    player.move(1);
  if (keyIsDown(DOWN_ARROW))
    player.move(2);
  if (keyIsDown(LEFT_ARROW))
    player.move(3);
  if (keyIsDown(UP_ARROW))
    player.move(4);
}
