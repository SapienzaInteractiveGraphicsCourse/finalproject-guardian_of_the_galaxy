
import Stats from './utils/stats.module.js';
import { GUI } from './utils/dat.gui.module.js';
import { OrbitControls } from './utils/OrbitControls.js';

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


//
//PLANETS
//
var pointLight;
var segmenti_pianeta = 48;
var pianeta1_dimensione=3;
var pianeta2_dimensione=5;
var pianeta3_dimensione=6;
var pianeta4_dimensione=1;
var pianeta5_dimensione=4;
var pianeta6_dimensione=9;

var texture_planets=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg","./images/8.jpg","./images/9.jpg","./images/10.jpg","./images/11.jpg","./images/12.jpg",
             "./images/13.jpg","./images/14.jpg","./images/15.jpg","./images/16.jpg"];
var planets_dimensions=[1,3,5,7,9,4];

function shuffle(myArray,myLen){
    var array=myArray;
    var len=myLen;
    var index,temp;
    while(len>0){
        index=Math.floor(Math.random()*len);
        len=len-1;
        temp=array[len];
        array[len]=array[index];
        array[index]=temp;
    }
}
shuffle(texture_planets,16);
shuffle(planets_dimensions,6);

var pianeta1_data = constructPlanetData(0.015, (0,0,20), "pianeta1", texture_planets[0], planets_dimensions[0], segmenti_pianeta);
var pianeta2_data = constructPlanetData(0.015, (15,15,20), "pianeta2", texture_planets[1], planets_dimensions[1], segmenti_pianeta);
var pianeta3_data = constructPlanetData(0.015, (15,15,20), "pianeta3", texture_planets[2], planets_dimensions[2], segmenti_pianeta);
var pianeta4_data = constructPlanetData(0.015, (-15,-15,-20), "pianeta4", texture_planets[3], planets_dimensions[3], segmenti_pianeta);
var pianeta5_data = constructPlanetData(0.015, (15,15,20), "pianeta5", texture_planets[4], planets_dimensions[4], segmenti_pianeta);
var pianeta6_data = constructPlanetData(0.015, (0,0,0), "pianeta6", texture_planets[5], planets_dimensions[5], segmenti_pianeta);

shuffle(texture_planets);
shuffle(planets_dimensions);

function rotazione_pianeta(pianeta, myData) {
    if(myData.name=='pianeta1'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta2'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta3'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta4'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta5'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta6'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
}


function movimento_pianeta(pianeta,myData){
    /*if(pianeta.position.x >=-40){
        pianeta.position.x -= 0.2;
        pianeta.position.z += 0.2;
    }
    else{
        pianeta.position.x=0;
        pianeta.position.z=0;
    }*/
    if(pianeta.position.z< camera.position.z){
        pianeta.position.x -= 0.2;
        pianeta.position.z += 0.2;
    }
    else{
        scene.remove(pianeta);
    }
}

function constructPlanetData(rotation_rate_tmp, distance_from_axis_tmp, name_tmp, texture_tmp, size_tmp, segments_tmp) {
    return { rotationRate: rotation_rate_tmp, distanceFromAxis: distance_from_axis_tmp, name: name_tmp, texture: texture_tmp, size: size_tmp, segments: segments_tmp };
}

function getMaterial(type, color, texture_tmp) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: texture_tmp === undefined ? null : texture_tmp
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}


function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        //passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
        THREE.ImageUtils.crossOrigin = '';
        var passThisTexture = THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var pianeta = getSphere(myMaterial, myData.size, myData.segments);
    pianeta.receiveShadow = true;
    pianeta.name = myData.name;
    scene.add(pianeta);
    pianeta.position.set(x, y, z);

    return pianeta;
}

function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}


function updatePlanet(renderer, scene, camera, controls) {
    pointLight.position.copy([0,0,0]);
    controls.updatePlanet();

    //pianeta1 movimenti
    //rotazione_pianeta(pianeta1,pianeta1_data);
    //movimento_pianeta(pianeta1,pianeta1_data);

    //pianeta2 movimenti
    //rotazione_pianeta(pianeta2,pianeta2_data);
    //movimento_pianeta(pianeta2,pianeta2_data);

    //pianeta3 movimenti
    //rotazione_pianeta(pianeta3,pianeta3_data);
    //movimento_pianeta(pianeta3,pianeta3_data);

    //pianeta4 movimenti
    //rotazione_pianeta(pianeta4,pianeta4_data);
    //movimento_pianeta(pianeta4,pianeta4_data);

    //pianeta5 movimenti
    //rotazione_pianeta(pianeta5,pianeta5_data);
    //movimento_pianeta(pianeta5,pianeta5_data);

    //pianeta6 movimenti
    //rotazione_pianeta(pianeta6,pianeta6_data);
    //movimento_pianeta(pianeta6,pianeta6_data);


    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        updatePlanet(renderer, scene, camera, controls);
    });
}
//
//END PLANETS
//


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
	}
				
				
	if (!camera) {
		camera = new THREE.PerspectiveCamera( fovy, window.innerWidth / window.innerHeight, near, far );
		camera.position.set( 0.0, 0.0, 30.0);
		camera.lookAt( 0.0, 0.0, 0.0 );
	}
	
	if (!renderer) {
		renderer = new THREE.WebGLRenderer( { antialias:true,alpha: true, powerPreference:"high-performance" } );
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

	var pianeta1 = loadTexturedPlanet(pianeta1_data, pianeta1_data.distanceFromAxis, 0, 0);
    //var pianeta2 = loadTexturedPlanet(pianeta2_data, pianeta2_data.distanceFromAxis, 0, 0);
    //var pianeta3 = loadTexturedPlanet(pianeta3_data, pianeta3_data.distanceFromAxis, 0, 0);
    //var pianeta4 = loadTexturedPlanet(pianeta4_data, pianeta4_data.distanceFromAxis, 0, 0);
    //var pianeta5 = loadTexturedPlanet(pianeta5_data, pianeta5_data.distanceFromAxis, 0, 0);
    //var pianeta6 = loadTexturedPlanet(pianeta6_data, pianeta6_data.distanceFromAxis, 0, 0);


    update(renderer, scene, camera, controls);
	
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
