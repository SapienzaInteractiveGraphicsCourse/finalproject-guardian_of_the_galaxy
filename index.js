
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

//SETTING UP ENEMY MOVEMENTS
var y_step = [0.2, 0.15, -0.15];
var x_step = [0.2, 0.2, -0.2];


var z_rotate = 0.06;
var x_rotate = 0.06;


starship = { 
	model:null, 
	name : "starship",
	health: 1
};

enemystarship = {
	enemystarship1 : { 
		model:null, 
		name:"enemystarship1",
		health: 3
	},
	enemystarship2: {
		model:null, 
		name:"enemystarship2",
		health: 3
	}
}





var loadManager = new THREE.LoadingManager();

document.getElementById("start").addEventListener("click", function(){

	document.getElementById("load").style.display = "block";
	document.getElementById("start").style.display = "none";

	loadModels(loadManager);
});




loadManager.onLoad = function () { 

	document.getElementById("load").parentNode.removeChild(document.getElementById("load"));
	initGame();
	
};

loadManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	document.getElementById("progress_bar").style = "background: linear-gradient(90deg,#e5405e 0%, #ffdb3a 25%, #3fffa2 50%, #3fffa2 50%" + String((itemsLoaded/itemsTotal)*100) + "%, #000000 0%);";
	document.getElementById("percent_load").innerHTML = 'LOADING: ' + String((itemsLoaded/itemsTotal)*100)+"%";
};

loadManager.onError = function ( url ) { 
	document.getElementById("percent_load").innerHTML = 'There was an error loading ' + url; 
};


function loadModels(loadManager){
	//----MODELS-----
	if(!scene) {
		scene = new THREE.Scene();
		scene.background= new THREE.Color( 0xffffff );
	}

	var starship_loader = new THREE.OBJLoader(loadManager);
	var starship_mtlLoader = new THREE.MTLLoader(loadManager);

	starship_mtlLoader.load('models/starship/star-wars-x-wing.mtl', (materials) => {
		materials.preload();
		starship_loader.setMaterials(materials);
		starship_loader.load('models/starship/star-wars-x-wing.obj', (object) => {
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

	enemies_mtlLoader.load('models/enemies/star-wars-vader-tie-fighter-big.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('models/enemies/star-wars-vader-tie-fighter-big.obj', (object) => {
			scene.add(object);
			object.name ="enemystarship1"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.enemystarship1.model = object
			enemystarship.enemystarship1.model.position.set(0.0, 0.0, -10.0);	
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);

	enemies_mtlLoader.load('models/enemies/star-wars-vader-tie-fighter-big.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('models/enemies/star-wars-vader-tie-fighter-big.obj', (object) => {
			scene.add(object);
			object.name ="enemystarship2"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.enemystarship2.model = object
			enemystarship.enemystarship2.model.position.set(0.0, 0.0, -20.0);	
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
	scene.add(enemystarship.enemystarship1.model);
	scene.add(light);	
	scene.add(ambientLight);
			
	document.addEventListener( "mousedown", destroyEnemy, false );
	animate();

	window.addEventListener( 'resize', onWindowResize, false );
	
}



function animateEnemy(){
	if (enemystarship.enemystarship1.health > 0){
		var y_pos = enemystarship.enemystarship1.model.position.y;	//0.0
		var x_pos = enemystarship.enemystarship1.model.position.x; //0.0
		enemystarship.enemystarship1.model.position.x += x_step[1];
		enemystarship.enemystarship1.model.position.y += y_step[1];
		if (y_pos > 8.0){
			enemystarship.enemystarship1.model.position.y = 8.0;
			y_step[1] = -y_step[1];
		} 
		if(y_pos < -8.0){
			enemystarship.enemystarship1.model.position.y = -8.0;
			y_step[1] = -y_step[1];
		}
		if (x_pos > 40.0){
			enemystarship.enemystarship1.model.position.x = 40.0;
			x_step[1] = -x_step[1];
		}
		if (x_pos < -40.0){
			enemystarship.enemystarship1.model.position.x = -40.0;
			x_step[1] = -x_step[1];
		}
	}
	if (enemystarship.enemystarship2.health > 0){
		var y_pos = enemystarship.enemystarship2.model.position.y;	//0.0
		var x_pos = enemystarship.enemystarship2.model.position.x; //0.0
		enemystarship.enemystarship2.model.position.x -= x_step[1];
		enemystarship.enemystarship2.model.position.y -= y_step[1];
	}

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
	animateEnemy();
	shotResponse();
	render();
	update();
		
	stats.end();

}


function destroyEnemy( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster = new THREE.Raycaster();


	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children, true);
	console.log(intersects);
	if( intersects.length > 0 ) {
		
		var firstObjIntersected = intersects[0].object;

		if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
			enemystarship.enemystarship1.health -= 1;
			if (enemystarship.enemystarship1.health == 0){
				scene.remove(enemystarship.enemystarship1.model );	
			}
			return;
		}
		if ( enemystarship.enemystarship2.name === firstObjIntersected.parent.name ) {
			enemystarship.enemystarship2.health -= 1;
			if (enemystarship.enemystarship2.health == 0){
				scene.remove(enemystarship.enemystarship2.model );	
			}
			return;
		}
	}
}

function shotResponse(){
	if (enemystarship.enemystarship1.health <= 2){	//when an enemy is hit, it starts to shot you
		raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
		var starship_pos = starship.model.position.clone();
		var enemy_pos = enemystarship.enemystarship1.model.position.clone();
		dir.subVectors(starship_pos, enemy_pos).normalize();
		raycaster.set(enemy_pos, dir);
		var intersects = raycaster.intersectObjects( scene.children, true);
		console.log(intersects);
		if( intersects.length > 0 ) {
			
			var firstObjIntersected = intersects[0].object;

			if ( starship.name === firstObjIntersected.parent.name ) {
				starship.health -= 1;
				if (starship.health == 0){
					scene.remove(starship.model);	
					alert("GAME OVER");
				}
				return;
			}
		}
	}
	if (enemystarship.enemystarship2.health <= 2){	//when an enemy is hit, it starts to shot you
		raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
		var starship_pos = starship.model.position.clone();
		var enemy_pos = enemystarship.enemystarship2.model.position.clone();
		dir.subVectors(starship_pos, enemy_pos).normalize();
		raycaster.set(enemy_pos, dir);
		var intersects = raycaster.intersectObjects( scene.children, true);
		console.log(intersects);
		if( intersects.length > 0 ) {
			
			var firstObjIntersected = intersects[0].object;

			if ( starship.name === firstObjIntersected.parent.name ) {
				starship.health -= 1;
				if (starship.health == 0){
					scene.remove(starship.model);	
					alert("GAME OVER");
				}
				return;
			}
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
		starship.model.translateX(x_step[0]);
		starship.model.rotation.z= -z_rotate;
	}
	if ( keyboard.pressed("A") ){
		starship.model.translateX(-x_step[0]);
		starship.model.rotation.z= z_rotate;
	}
	if ( keyboard.pressed("W") ){
		starship.model.translateY(y_step[0]);
		starship.model.rotation.x= -x_rotate;

	}
	if ( keyboard.pressed("S") ){
		starship.model.translateY(-y_step[0]);
		starship.model.rotation.x= x_rotate;

	}

}
