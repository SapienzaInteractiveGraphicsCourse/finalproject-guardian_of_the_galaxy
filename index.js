
import Stats from './jsm/libs/stats.module.js';

import { GUI } from './jsm/libs/dat.gui.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

var container, stats;
//SETTING UP CAMERA

var camera;
var fovy = 60;
var near = 0.1;
var far = 1000;

var scene, renderer, light;
var controls;

var raycaster ;
var mouse = new THREE.Vector2();

var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();


// Bullets array
var bullets = [];
var objects = [];

var starship;
var enemystarship;


starship = { 
				model:null, 
				name : "starship"
			};

enemystarship = { 
				model:null, 
				name:"enemystarship"
			};

var loadManager = new THREE.LoadingManager();

document.getElementById("start").addEventListener("click", function(){
	loadModels(loadManager);
});


loadManager.onLoad = function () { 

	initGame();
	
};


function loadModels(loadManager){
	//----MODELS-----
	if(!scene) {
		scene = new THREE.Scene();
		scene.background= new THREE.Color( 0xffffff );
	}

	var starship_loader = new THREE.OBJLoader(loadManager);
	var starship_mtlLoader = new THREE.MTLLoader(loadManager);

	starship_mtlLoader.load('images/starship/star-wars-x-wing.mtl', (materials) => {
		materials.preload();
		starship_loader.setMaterials(materials);
		starship_loader.load('images/starship/star-wars-x-wing.obj', (object) => {
			object.position.set(0,3,-10);
			scene.add(object);
			object.name ="starship"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			starship.model = object
			starship.model.position.set(0.0, 0.0, 0.0);	
		});
	});


	var enemies_obj_loader = new THREE.OBJLoader(loadManager);
	var enemies_mtlLoader = new THREE.MTLLoader(loadManager);

	enemies_mtlLoader.load('images/enemies/star-wars-vader-tie-fighter-big.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('images/enemies/star-wars-vader-tie-fighter-big.obj', (object) => {
			object.position.set(0.5,2.0,-20);
			scene.add(object);
			object.name ="enemystarship"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.model = object
			enemystarship.model.position.set(0.0, 0.0, -10.0);	
		});
	});
}

function initGame() {
	
		
	if (!scene) {
		scene = new THREE.Scene();
		scene.background= new THREE.Color( 0xffffff );
	}
				
				
	if (!camera) {
		camera = new THREE.PerspectiveCamera( fovy, window.innerWidth / window.innerHeight, near, far );
		camera.position.set( 0.0, 0.0, 30.0);
		camera.lookAt( 0.0, 0.0, 0.0 );
	}
	
	if (!renderer) {
		renderer = new THREE.WebGLRenderer( { antialias:true, powerPreference:"high-performance" } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container = document.getElementById( 'container' );
		container.appendChild( renderer.domElement );
	}	

	if (!light){
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		var light= new THREE.PointLight(0xFFFFFF);
		//light.position.set(-100,200,100);
		light.position.set(-40.0, 10.0, 0.0);
	}		


	
	stats = new Stats();
	stats.showPanel( 0 ); 
	stats.domElement.style = "position: absolute; left:0px; bottom:0px;"
	document.body.appendChild( stats.domElement );
		
		
	scene.add(starship.model);
	scene.add(enemystarship.model);
	scene.add(light);	
	scene.add(ambientLight);
			
	document.addEventListener( "mousedown", destroyEnemy, false );
	animate();

	window.addEventListener( 'resize', onWindowResize, false );
	
}







function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	
	stats.begin();
	
	requestAnimationFrame( animate );
	handleMovements();
	render();
	update();
		
	stats.end();

}


function destroyEnemy( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster = new THREE.Raycaster();


	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children, true);
	console.log(intersects);
	if( intersects.length > 0 ) {
		
		var firstObjIntersected = intersects[0].object;
		
		if ( enemystarship.name === firstObjIntersected.parent.name ) {
				
			scene.remove(enemystarship.model );	
			return;
			
		}
		
	}


}

function update(){	
	stats.update();
}


function render() {

	var time = performance.now() * 0.001;
	renderer.render( scene, camera );

}


function handleMovements(){
	if ( keyboard.pressed("D") ){
		starship.model.translateX(0.2);
	}

	if ( keyboard.pressed("A") ){
		starship.model.translateX(-0.2);
	}
	if ( keyboard.pressed("W") ){
		starship.model.translateY(0.2);
	}
	if ( keyboard.pressed("S") ){
		starship.model.translateY(-0.2);
	}

}
