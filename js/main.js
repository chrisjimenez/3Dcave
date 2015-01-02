//
//  3D perpective cave room 
//  By Chris Jimenez
//  main.js
//


//  check to see if WebGL compatible
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
      
var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

//  SET UP 3D SCENE
var container, stats;
var camera, scene, renderer;
var plane;


//  SET UP STAT WINDOW
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

init();
setUpHeadTracker();
animate();


//  ADD HEAD TRACKING LISTENER...
document.addEventListener('headtrackingEvent', function(event) {
    scene.fog = new THREE.Fog( 0x000000, 1+(event.z*27), 2000+(event.z*27) );
}, false);


//  =====================================================

//  INIT FUNCTION
//    where all setup code is placed
function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // set up scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 1, 5000 );

  // set up camera
  camera = new THREE.PerspectiveCamera( 27, canvasInput.width / canvasInput.height, 1, 100000 );
  camera.position.z = 6000;
  scene.add( camera );
  
  drawRoom();
  createCharacters(20);
  
  // choose WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
}

//  ANIMATE FUNCTION
//    gets repeatedly called
function animate() {

  renderer.render(scene, camera);

  stats.update();

  requestAnimationFrame( animate );
  animateCharacters();
  moveCharacters();

}

function setUpHeadTracker(){
  // controller
  headtrackr.controllers.three.realisticAbsoluteCameraControl(camera, 27, [0,0,50], new THREE.Vector3(0,0,0), {damping : 0.5});

  var htracker = new headtrackr.Tracker({fadeVideo : true });
  htracker.init(videoInput, canvasInput);
  htracker.start();
}

//  ===========================================================
  