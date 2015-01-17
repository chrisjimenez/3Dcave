/***************************************************************************    
* 3D perpective cave room                         
* By Chris Jimenez
*
* room.js
***************************************************************************/

/**
*	Draws the actual cave room.
*/
function drawRoom(){

	// top wall
	drawPlane(900, 3000, 0, 270, 0, 0, 0, 0, 0x39362b, 2, 2);

	// left wall
	drawPlane(3000, 600,-300, 0, 0, Math.PI/2, 0, Math.PI/2, 0x39362b, 2, 2);

	// right wall
	drawPlane(3000, 600, 300, 0, 50-500, Math.PI/2, 0, -Math.PI/2, 0x39362b, 2, 2);

	// ground
	drawPlane(900, 3000, 0, -270, 0, 0, 0, Math.PI, 0xc2b280, 4, 1.5);
}


/**
*	Generates a height value using the perlin noise funciton.
*
* 	width 		- 	width segments of plane
* 	height 		- 	height segments of plane
*	q 			- 	quality(perlin noise)
*	qMultiple	-	quality multiple(perlin noise)
*/
function generateHeight( width, height, q, qMultiple ) {

	var size = width * height;
	var data = new Uint8Array( size );
	var perlin = new ImprovedNoise();
	var quality = q;
	var z = Math.random() * 100;

	for ( var j = 0; j < 4; j ++ ) {
		for ( var i = 0; i < size; i ++ ) {

			var x = i % width; 
			var y = i / width
			data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
		}
		quality *= qMultiple;
	}

	return data;
}

/**
*	Draws a plane on the scene with given parameters.
*
* 	width 		=  	width segments of plane
* 	height 		=  	height segments of plane
*	x 			=  	x position of plane
*	y			= 	y position of plane
* 	z 			= 	z position of plane
* 	xRotation 	= 	x rotation of plane
*	yRotation 	=  	y rotation
*	zRotation	- 	z rotation
*	q 			- 	quality(perlin noise)
*	qMultiple	-	quality multiple(perlin noise)
*/
function drawPlane(width, height, x, y, z, xRotation, yRotation, zRotation, color, q, qMultiple){
	
	var heightSegments = height/20;
	var widthSegments = width/20;

	var data = generateHeight( widthSegments, heightSegments, q, qMultiple );

	var geometry = new THREE.PlaneBufferGeometry( width, height, widthSegments - 1, heightSegments - 1 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

	var vertices = geometry.attributes.position.array;

	for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
		vertices[ j + 1 ] = data[ i ] * 2;
	}

	var plane = new THREE.Mesh( geometry,
					 new THREE.MeshBasicMaterial( { shading: THREE.SmoothShading, color: color } ) );

	// set up position with given parameters
	plane.position.x = x;
	plane.position.y = y;
	plane.position.z = z;

	// set up rotation with given parameters
	plane.rotation.x = xRotation;
	plane.rotation.y = yRotation;
	plane.rotation.z = zRotation;

	scene.add( plane );
}