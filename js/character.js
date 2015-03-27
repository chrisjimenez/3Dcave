/***************************************************************************
*  3D perpective cave room
*  By Chris Jimenez
*
*  character.js
***************************************************************************/

//  invoke strict mode

//  to hold functions that are to be updated
var updateFcts = [];

var caveCharacters = [];

//  keep track of time for character animation
var lastTimeMsec = null;


/**
*  Adds all characters to the scene.
*/
function placeCharacters() {
  // randomly place characters 
  for(var i = 0; i < caveCharacters.length; i++){
    placeCharacter(caveCharacters[i]);
  }
}


/**
*  Adds and animates character on to the scene.
*/
function placeCharacter(character) {
  var pos = randomPosition();

  character.root.position.x = pos[0];
  character.root.position.y = pos[1];
  character.root.position.z = pos[2];

  // init animations
  var headAnims = new THREEx.MinecraftCharHeadAnimations(character);
  updateFcts.push(function(delta, now){
    headAnims.update(delta, now)  
  })
  headAnims.start('no');

  var bodyAnims = new THREEx.MinecraftCharBodyAnimations(character);
  updateFcts.push(function(delta, now){
    bodyAnims.update(delta, now)  
  })
  bodyAnims.start('fall');

  scene.add(character.root);
}



/**
*  Creates characters on the scene given
*  numOfCharacters parameter.
*/
function createCharacters(numOfCharacters) {

  //  if no value is passed, set to default 10
  if (!numOfCharacters) {
    numOfCharacters = 10;
  }

  for (var i = 0; i < numOfCharacters; i++) {
    var character = new THREEx.MinecraftChar(getRandomSkin());
    caveCharacters.push(character);
  }

  placeCharacters();
}


/**
*  Animates characters on the screen.
*/  
function animateCharacters() {
  var nowMsec = Date.now;
    lastTimeMsec  = lastTimeMsec || nowMsec-1000/60;
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec  = nowMsec;
    
    //  call each update function
    updateFcts.forEach(function(updateFn){
      updateFn(deltaMsec/1000, nowMsec/1000)
    });
}


/**
*  Generates random x,y,z position
*/
function randomPosition() {
  var position = [0,0,0];

  //  this will generate a random number between
  //  -150 and 150 for x, y and z
  var x = Math.floor(Math.random()* 150) + 1; 
  x *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

  var y = Math.floor(Math.random()* 150) + 1; 
  y *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

  var z = Math.floor(Math.random()* 2000) + 1; 
  z *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

  position[0] = x;
  position[1] = y;
  position[2] = z;

  return position;
}

/**
*  Moves the characters towards the screen or camera.
*/
function moveCharacters() {

  //  loop through each character
  for (var i = 0; i < caveCharacters.length; i++) {

    //  generate random speed for current chracter
    var randomSpeed = Math.floor(Math.random() * 10) + 2;
    caveCharacters[i].root.position.z += randomSpeed;

    //  return to init position if character is too close
    if (caveCharacters[i].root.position.z >= 2000) {
      caveCharacters[i].root.position.z = -3000;
    }
  }
}

/**
*  Returns a random  minecraft skin, where the default is the santa
*  skin. Skins could be foudn on planetminecraft.com.
*/
function getRandomSkin() {
  //  default is santa texture!
  var skin = "assets/santa.png";

  var numOfSkins = 20;

  //  it will mostly be santa
  var randSkin = Math.floor(Math.random() * numOfSkins) + 1;
  randSkin = Math.floor(Math.random() * 4) == 1 ? randSkin : 0; 


  switch (randSkin) {
      case 0:
        skin = "assets/santa.png"; 
        break;
      case 1:
        skin = "assets/santa2.png";
        break;
      case 2:
        skin = "assets/santa3.png";
        break;
      case 3:
        skin = "assets/santa.png";
        break;
      case 4:
        skin = "assets/zelda.png";
        break;
      case 5:
        skin = "assets/pikachu.png";
        break;
      case 6:
        skin = "assets/nyan.png";
        break;
      case 7:
        skin = "assets/moss.png";
        break;
      case 8:
        skin = "assets/psy.png";
        break;
      case 9:
        skin = "assets/leo.png";
        break;
      case 10:
        skin = "assets/jake.png";
        break;
      case 11:
        skin = "assets/ironman.png";
        break;
      case 12:
        skin = "assets/trooper.png";
        break;
      case 13:
        skin = "assets/goku.png";
        break;
      case 14:
        skin = "assets/finn.png";
        break;
      case 15:
        skin = "assets/deadpool.png";
        break;
      case 16:
        skin = "assets/daftpunk.png";
        break;
      case 17:
        skin = "assets/cookie.png";
        break;
      case 18:
        skin = "assets/nyan.png";
        break;
      case 19:
        skin = "assets/yeti.png";
        break;
      case 20:
        skin = "assets/batman.png";
        break;
  }

  return skin;
}