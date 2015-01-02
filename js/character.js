//
//	3D perpective cave room 
//	By Chris Jimenez
//	character.js
//

var updateFcts	= [];

var caveCharacters = [];

var lastTimeMsec = null;


// 	createCharacters() FUNCTION
// 		numOfCharacters = how many characters in the scene
// 		they are randomly placed in the scene based
// 		on constratins in the randomPosition() function
function createCharacters(numOfCharacters){

	if(!numOfCharacters) numOfCharacters = 10;

	for( var i = 0; i < numOfCharacters; i++ ){
		var character = new THREEx.MinecraftChar(getRandomSkin());
		caveCharacters.push(character);
	}

	placeCharacters();
}

// 	placeCharacters() FUNCTION
//	 	places all characters in the scene
function placeCharacters(){
	// randomly place characters 
	for(var i = 0; i < caveCharacters.length; i++){
		placeCharacter(caveCharacters[i]);
	}
}


// 	placeCharacter() FUNCTION
// 		pos param with xyz position of character
function placeCharacter(character){
	var pos = randomPosition();

	character.root.position.x = pos[0];
	character.root.position.y = pos[1];
	character.root.position.z = pos[2];

	// init animations
	var headAnims	= new THREEx.MinecraftCharHeadAnimations(character);
	updateFcts.push(function(delta, now){
		headAnims.update(delta, now)	
	})
	headAnims.start('no');

	var bodyAnims	= new THREEx.MinecraftCharBodyAnimations(character);
	updateFcts.push(function(delta, now){
		bodyAnims.update(delta, now)	
	})
	bodyAnims.start('fall');

	scene.add(character.root);
}


// 	animateCharacters() FUNCTION
// 		no params
function animateCharacters(){
	var nowMsec = Date.now;
  	lastTimeMsec  = lastTimeMsec || nowMsec-1000/60;
  	var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  	lastTimeMsec  = nowMsec;
  	
  	// 	call each update function
  	updateFcts.forEach(function(updateFn){
   		updateFn(deltaMsec/1000, nowMsec/1000)
  	});
}


// 	randomPosition() FUNCTION
// 		no params
function randomPosition(){
	var position = [0,0,0];

	var x = Math.floor(Math.random()* 150) + 1; // this will get a number between 1 and 150
	x *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of the numbers

	var y = Math.floor(Math.random()* 150) + 1; 
	y *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

	var z = Math.floor(Math.random()* 2000) + 1; 
	z *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

	position[0] = x;
	position[1] = y;
	position[2] = z;

	return position;
}

// 	moveCharacters() FUNCTION
// 		no params
function moveCharacters(){
	for( var i = 0; i < caveCharacters.length; i++){

		var randomSpeed = Math.floor(Math.random() * 10) + 2;
		caveCharacters[i].root.position.z += randomSpeed;


		if(caveCharacters[i].root.position.z >= 2000){
		 caveCharacters[i].root.position.z = -3000;
		}
	}
}

// 	getRandomTetxure() FUNCTION
//		no params
function getRandomSkin(){
	// default is santa texture!
	var skin = "images/santa.png";

	var numOfSkins = 20;

	// it will mostly be santa
	var randSkin =  Math.floor(Math.random()* numOfSkins) + 1;
	randSkin = Math.floor(Math.random()*4) == 1 ? randSkin : 0; 


	switch (randSkin) {
	    case 0:
	        skin = "images/santa.png";
	        break;
	    case 1:
	        skin = "images/santa2.png";
	        break;
	    case 2:
	        skin = "images/santa3.png";
	        break;
	    case 3:
	        skin = "images/santa.png";
	        break;
	    case 4:
	        skin = "images/zelda.png";
	        break;
	    case 5:
	        skin = "images/pikachu.png";
	        break;
	    case 6:
	        skin = "images/nyan.png";
	        break;
	    case 7:
	        skin = "images/moss.png";
	        break;
	    case 8:
	        skin = "images/psy.png";
	        break;
	    case 9:
	        skin = "images/leo.png";
	        break;
	    case 10:
	        skin = "images/jake.png";
	        break;
	    case 11:
	        skin = "images/ironman.png";
	        break;
	    case 12:
	        skin = "images/trooper.png";
	        break;
	    case 13:
	        skin = "images/goku.png";
	        break;
	    case 14:
	        skin = "images/finn.png";
	        break;
	    case 15:
	        skin = "images/deadpool.png";
	        break;
	    case 16:
	        skin = "images/daftpunk.png";
	        break;
	    case 17:
	        skin = "images/cookie.png";
	        break;
	    case 18:
	        skin = "images/nyan.png";
	        break;
	    case 19:
	        skin = "images/yeti.png";
	        break;
	    case 20:
	        skin = "images/batman.png";
	        break;

    }

	return skin;
}
