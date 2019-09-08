
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

var keyboard = new THREEx.KeyboardState();

//Setting up clock and levels
var clock;
var level = 1;

//PLANETS
var pianeta1;
var pianeta2;
var pianeta3;
var pianeta4;
var pianeta5;
var pianeta6;
var loader = new THREE.TextureLoader();
var planet_clock;

var planet_position=[[20,10,-1300],[-20,-10,-1300],[-20,10,-1300],[20,-10,-1300],[-10,0,-1300],[10,0,-1300]];
shuffle(planet_position,6);

//Enemies destruction

 var dirs = [];
 var parts = [];


// Bullets array
var bullets = [];
var objects = [];
var fireRate1 = 0;
var fireRate2 = 0;

var starship;
var enemystarship;

//SETTING UP ENEMY MOVEMENTS
var y_step = [0.2, 0.15, -0.15];
var x_step = [0.3, 0.2, -0.2];


var z_rotate = 0.06;
var x_rotate = 0.06;




starship = { 
	model:null, 
	name : "starship",
	health: 10
};

enemystarship = {
	originalenemy1 : { 
		model:null, 
		name:"enemystarship1",
		health: 3
	},
	originalenemy2: {
		model:null, 
		name:"enemystarship2",
		health: 3
	},
	enemystarship1 : { 
		model:null, 
		name:"enemystarship1",
		health: 3
	},
	enemystarship2: {
		model:null, 
		name:"enemystarship2",
		health: 3
	},
	damagedstarship1: {
		model:null, 
		name:"damagedstarship1",
		health: 3
	},
	damagedstarship2: {
		model:null, 
		name:"damagedfinalship1",
		health: 3
	},
	damagedfinalship1: {
		model:null, 
		name:"damagedstarship1",
		health: 3
	},
	damagedfinalship2: {
		model:null, 
		name:"damagedfinalship2",
		health: 3
	},
	finalenemy: {
		model:null, 
		name:"finalenemy",
		health: 3
	}
}


//
//PLANETS
//
var pointLight;
var segmenti_pianeta = 48;

var texture_planets=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg","./images/8.jpg","./images/9.jpg","./images/10.jpg","./images/11.jpg","./images/12.jpg",
             "./images/13.jpg","./images/14.jpg","./images/15.jpg","./images/16.jpg"];
var planets_dimensions=[2,3,4,5,6];

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

var pianeta1_data = constructPlanetData(0.02, (0,0,20), "pianeta1", texture_planets[0], planets_dimensions[0], segmenti_pianeta);
var pianeta2_data = constructPlanetData(0.015, (15,15,20), "pianeta2", texture_planets[1], planets_dimensions[1], segmenti_pianeta);
var pianeta3_data = constructPlanetData(0.02, (15,15,20), "pianeta3", texture_planets[2], planets_dimensions[2], segmenti_pianeta);
var pianeta4_data = constructPlanetData(0.015, (-15,-15,-20), "pianeta4", texture_planets[3], planets_dimensions[3], segmenti_pianeta);
var pianeta5_data = constructPlanetData(0.02, (15,15,20), "pianeta5", texture_planets[4], planets_dimensions[4], segmenti_pianeta);
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
    
    if(pianeta.position.z< camera.position.z){
		if(myData.name=='pianeta1'){
			pianeta.position.z += 1.5;
		}
		if(myData.name=='pianeta2'){
			pianeta.position.z += 2;
		}
		if(myData.name=='pianeta3'){
			pianeta.position.z += 3;
		}
		if(myData.name=='pianeta4'){
			pianeta.position.z += 1;
		}
		if(myData.name=='pianeta5'){
			pianeta.position.z += 0.6;
		}
		if(myData.name=='pianeta6'){
			pianeta.position.z +=0.8;
		}
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
        THREE.ImageUtils.crossOrigin = '';
        var passThisTexture = loader.load(myData.texture);

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
    //scene.add(pianeta);
    pianeta.position.set(x, y, z);

    return pianeta;
}
//
//END PLANETS
//


var loadManager = new THREE.LoadingManager();

document.getElementById("start").addEventListener("click", function(){

	document.getElementById("load").style.display = "block";
	document.getElementById("start").style.display = "none";
	document.getElementById("commands").style.display = "none";

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

	var starsDiv = document.createElement("DIV");
    starsDiv.id = "starsid"; 
    starsDiv.className = "stars";
    document.getElementById("info").appendChild(starsDiv);

    var twinklingDiv = document.createElement("DIV");
    twinklingDiv.id = "twinklingid";
    twinklingDiv.className = "twinkling";
    document.getElementById("info").appendChild(twinklingDiv);

	//NUVOLE
    //var cloudsDiv = document.createElement("DIV");
    //cloudsDiv.id = "cloudsid";
    //cloudsDiv.className = "clouds";
    //document.getElementById("info").appendChild(cloudsDiv);



	var starship_loader = new THREE.OBJLoader(loadManager);
	var starship_mtlLoader = new THREE.MTLLoader(loadManager);

	
	

	starship_mtlLoader.load('models/starship/X-Wing.mtl', (materials) => {
		materials.preload();
		starship_loader.setMaterials(materials);
		starship_loader.load('models/starship/X-Wing.obj', (object) => {
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
			object.name ="enemystarship1";
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.enemystarship1.model = object;
			enemystarship.enemystarship1.model.position.set(0.0, 0.0, -10.0);	
			
			enemystarship.originalenemy1.model = object.clone();
			enemystarship.originalenemy1.model.position.set(0.0, 0.0, -10.0);	
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);

	enemies_mtlLoader.load('models/enemies/star-wars-vader-tie-fighter-big.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('models/enemies/star-wars-vader-tie-fighter-big.obj', (object) => {
			object.name ="enemystarship2";
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.enemystarship2.model = object;
			enemystarship.enemystarship2.model.position.set(0.0, 0.0, -20.0);	
			enemystarship.originalenemy2.model = object.clone();
			enemystarship.originalenemy2.model.position.set(0.0, 0.0, -10.0);	
		});
	});
	//PLANETS MOVEMENT
	pianeta1 = loadTexturedPlanet(pianeta1_data, 20, 10, -400, 0);
	pianeta2 = loadTexturedPlanet(pianeta2_data, -20, -10, -500, 0);
	pianeta3 = loadTexturedPlanet(pianeta3_data, -20, 10, -200, 0);
	pianeta4 = loadTexturedPlanet(pianeta4_data, 20, -10, -100, 0);
	pianeta5 = loadTexturedPlanet(pianeta5_data, -10, 0, -300, 0);
	pianeta6 = loadTexturedPlanet(pianeta6_data, 10, 0, -100, 0);

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);

	enemies_mtlLoader.load('models/enemies/star-wars-vader-tie-fighter-big-damaged1.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('models/enemies/star-wars-vader-tie-fighter-big-damaged1.obj', (object) => {
			object.name ="damagedstarship1";
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.damagedstarship1.model = object
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);

	enemies_mtlLoader.load('models/enemies/star-wars-vader-tie-fighter-big-damaged2.mtl', (materials) => {
		materials.preload();
		enemies_obj_loader.setMaterials(materials);
		enemies_obj_loader.load('models/enemies/star-wars-vader-tie-fighter-big-damaged2.obj', (object) => {
			object.name ="damagedstarship2";
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			objects.push(object);
			enemystarship.damagedstarship2.model = object
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);
	var material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
	var material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
		

	enemies_mtlLoader.load('models/enemies/X-Wing.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing.obj', (object) => {
			object.name ="finalenemy"
			object.traverse( function ( child ) {
				 // For any meshes in the model, add our material.

				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
					if (child.name == "polySurface46_Mesh"){
						child.material = material2
					}
					else{
						child.material = material1;	

					}
				}
			} );
			enemystarship.finalenemy.model = object;
			enemystarship.finalenemy.model.position.set(0.0, 2.0, -50.0);	
			enemystarship.finalenemy.model.rotation.x += 0.1;
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);
	material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
	material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
		

	enemies_mtlLoader.load('models/enemies/X-Wing-damaged1.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing-damaged1.obj', (object) => {
			object.name ="damagedfinalship1"
			object.traverse( function ( child ) {
				 // For any meshes in the model, add our material.

				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
					if (child.name == "polySurface46_Mesh"){
						child.material = material2
					}
					else{
						child.material = material1;	

					}
				}
			} );
			enemystarship.damagedfinalship1.model = object;
			enemystarship.damagedfinalship1.model.position.set(0.0, 2.0, -50.0);	
			enemystarship.damagedfinalship1.model.rotation.x += 0.1;
		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);
	material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
	material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
		

	enemies_mtlLoader.load('models/enemies/X-Wing-damaged2.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing-damaged2.obj', (object) => {
			object.name ="damagedfinalship2"
			object.traverse( function ( child ) {
				 // For any meshes in the model, add our material.

				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
					if (child.name == "polySurface46_Mesh"){
						child.material = material2
					}
					else{
						child.material = material1;	

					}
				}
			} );
			enemystarship.damagedfinalship2.model = object;
			enemystarship.damagedfinalship2.model.position.set(0.0, 2.0, -50.0);	
			enemystarship.damagedfinalship2.model.rotation.x += 0.1;	
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

	clock = new THREE.Clock();
	clock.start();

	planet_clock = new THREE.Clock();
	planet_clock.start();

	var levelDiv=document.createElement("DIV");
	levelDiv.id="levelDiv";
	document.body.appendChild(levelDiv);
	document.getElementById("levelDiv").innerHTML = "LEVEL " + level;     
	document.getElementById("levelDiv").style = "position: absolute; left:90%; top:10px; color: white"
	
	var lifeDiv=document.createElement("DIV");
	lifeDiv.id="lifeDiv";
	document.body.appendChild(lifeDiv);
	document.getElementById("lifeDiv").style = "position: absolute; top:0px; color: white"

	var life=document.createElement("I");
	life.id="heart"
	life.className="fas fa-heart";
	life.setAttribute("color", "white");
	life.setAttribute("display", "block");
	document.getElementById("lifeDiv").appendChild(life);

	var healthDiv = document.createElement("DIV");
	healthDiv.id = "healthDiv";      
	document.body.appendChild(healthDiv);
	document.getElementById("healthDiv").innerHTML = starship.health;         
	document.getElementById("healthDiv").style = "position: absolute; left:3%; top:1.5%; color: white"

	
	stats = new Stats();
	stats.showPanel( 0 ); 
	stats.domElement.style = "position: absolute; left:0px; bottom:0px;"
	document.body.appendChild( stats.domElement );
		
		
	scene.add(starship.model);
	scene.add(light);	
	scene.add(ambientLight);
	
	

	document.addEventListener( "mousedown", destroyEnemy, false );
	animate();

	window.addEventListener( 'resize', onWindowResize, false );

	var listener = new THREE.AudioListener();
    camera.add(listener);

    //Create a global audio source
    var sound = new THREE.Audio(listener);

    //Load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/avengers_scene.mp3', function(buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.06);
      sound.play();
	});
	
    update(renderer, scene, camera, controls);
	
}

function planets_respawn(){
	movimento_pianeta(pianeta1,pianeta1_data);
	movimento_pianeta(pianeta2,pianeta2_data);
	movimento_pianeta(pianeta3,pianeta3_data);
	movimento_pianeta(pianeta4,pianeta4_data);
	movimento_pianeta(pianeta5,pianeta5_data);
	movimento_pianeta(pianeta6,pianeta6_data);

	rotazione_pianeta(pianeta1,pianeta1_data);
	rotazione_pianeta(pianeta2,pianeta2_data);
	rotazione_pianeta(pianeta3,pianeta3_data);
	rotazione_pianeta(pianeta4,pianeta4_data);
	rotazione_pianeta(pianeta5,pianeta5_data);
	rotazione_pianeta(pianeta6,pianeta6_data);
	var roundednumber=Math.round(planet_clock.getElapsedTime());
	console.log(roundednumber);

	if(roundednumber % 2 ==0){
		if(pianeta1.position.z >= camera.position.z){
			console.log("PIANETA1");
			pianeta1.position.set(20, 10, -1300);			//posizione pianeta 5 cambiare texture
			scene.add(pianeta1);
		}
	}
	//////////////////////////
	if(roundednumber % 3 ==0){
		if(pianeta2.position.z >= camera.position.z){
			console.log("PIANETA2");
			pianeta2.position.set(-20, -10, -1300);			//posizione pianeta 6 cambiare texture
			scene.add(pianeta2);
		}
	}
	if(roundednumber % 4 ==0){
		if(pianeta3.position.z >= camera.position.z){
			console.log("PIANETA3");
			pianeta3.position.set(-20, 10, -1300);			//posizione pianeta 6 cambiare texture
			scene.add(pianeta3);
		}
	}
	if(roundednumber % 6 ==0){
		if(pianeta4.position.z >= camera.position.z){
			console.log("PIANETA4");
			pianeta4.position.set(20, -10, -1300);			//posizione pianeta 6 cambiare texture
			scene.add(pianeta4);
		}
	}

	///////////////////////////
	if(roundednumber % 5 ==0){
		if(pianeta5.position.z >= camera.position.z){
			console.log("PIANETA5");
			pianeta5.position.set(-10, 0, -1300);			//posizione pianeta 5 cambiare texture
			scene.add(pianeta5);
		}
	}
	if(roundednumber % 7 ==0){
		if(pianeta6.position.z >= camera.position.z){
			console.log("PIANETA6");
			pianeta6.position.set(10, 0, -1300);			//posizione pianeta 6 cambiare texture
			scene.add(pianeta6);
		}
	}
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
		enemystarship.enemystarship2.model.position.x += x_step[2];
		enemystarship.enemystarship2.model.position.y += y_step[2];
		if (y_pos > 8.0){
			enemystarship.enemystarship2.model.position.y = 8.0;
			y_step[2] = -y_step[2];
		} 
		if (y_pos < -8.0){
			enemystarship.enemystarship2.model.position.y = -8.0;
			y_step[2] = -y_step[2];
		}
		if (x_pos > 40.0){
			enemystarship.enemystarship2.model.position.x = 40.0;
			x_step[2] = -x_step[2];
		}
		if (x_pos < -40.0){
			enemystarship.enemystarship2.model.position.x = -40.0;
			x_step[2] = -x_step[2];
		}
	}
	if (enemystarship.finalenemy.health > 0){
		enemystarship.finalenemy.model.rotation.z += 0.05;
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
	loadEnemies();
	animateEnemy();
	updateExplosion();
	shotResponse();

	planets_respawn();
	render();
	update();
	
	stats.end();

}

function rotateWings(action){
	if (action == "open"){
		starship.model.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				if (child.name == "LeftWingBottom.001" || child.name == "LeftWingBottomEngineAndGreebles.001" || child.name == "LeftWingBottomHullPlates.001"){
					child.rotation.z += 0.0012;
				}
				if (child.name == "LeftWingTop.001" || child.name == "LeftWingTopEngineAndGreebles.001" || child.name == "LeftWingTopHullPlates.001"){
					child.rotation.z -= 0.0012;
				}
				if (child.name == "RightWingBottom.001" || child.name == "RightWingBottomEngineAndGreebles.001" || child.name == "RightWingBottomHullPlates.001"){
					child.rotation.z -= 0.0012;
				}
				if (child.name == "RightWingTop.001" || child.name == "RightWingTopEngineAndGreebles.001" || child.name == "RightWingTopHullPlates.001"){
					child.rotation.z += 0.0012;
				}

			}
		} );
	}
	else{
		starship.model.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				if (child.name == "LeftWingBottom.001" || child.name == "LeftWingBottomEngineAndGreebles.001" || child.name == "LeftWingBottomHullPlates.001"){
					child.rotation.z -= 0.0012;
				}
				if (child.name == "LeftWingTop.001" || child.name == "LeftWingTopEngineAndGreebles.001" || child.name == "LeftWingTopHullPlates.001"){
					child.rotation.z += 0.0012;
				}
				if (child.name == "RightWingBottom.001" || child.name == "RightWingBottomEngineAndGreebles.001" || child.name == "RightWingBottomHullPlates.001"){
					child.rotation.z += 0.0012;
				}
				if (child.name == "RightWingTop.001" || child.name == "RightWingTopEngineAndGreebles.001" || child.name == "RightWingTopHullPlates.001"){
					child.rotation.z -= 0.0012;
				}
			}
		} );

	}
	
}

function loadEnemies(){
	if (clock.running && level == 1){
		if (clock.getElapsedTime() > 3 && clock.getElapsedTime() < 5){
			rotateWings("open");
		}
		else if (clock.getElapsedTime() > 5){
			scene.add(enemystarship.enemystarship1.model);
			clock.stop();
		}
	}
	if (clock.running && level == 2){
		if (clock.getElapsedTime() > 1 && clock.getElapsedTime() < 3){
			rotateWings("close");
		}
		else if (clock.getElapsedTime() > 7 && clock.getElapsedTime() < 9){
			rotateWings("open");
		}
		else if (clock.getElapsedTime() > 9){
			enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
			scene.add(enemystarship.enemystarship1.model);
			scene.add(enemystarship.enemystarship2.model);
			enemystarship.enemystarship1.health = 3;
			clock.stop()
		}

	}
	if (clock.running && level == 3){
		if (clock.getElapsedTime() > 1 && clock.getElapsedTime() < 3){
			rotateWings("close");
		}
		else if (clock.getElapsedTime() > 7 && clock.getElapsedTime() < 9){
			rotateWings("open");
		}
		else if (clock.getElapsedTime() > 9){
			enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
			enemystarship.enemystarship2.model = enemystarship.originalenemy2.model.clone();
			scene.add(enemystarship.enemystarship1.model);
			scene.add(enemystarship.enemystarship2.model);
			scene.add(enemystarship.finalenemy.model);
			enemystarship.enemystarship1.health = 3;
			enemystarship.enemystarship2.health = 3;
			clock.stop()
		}

	}
	if (clock.running && level == 4){
		if (clock.getElapsedTime() > 1 && clock.getElapsedTime() < 3){
			rotateWings("close");
		}
		else if (clock.getElapsedTime() >5){
			clock.stop()
		}
	}
}

function destroyEnemy( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster = new THREE.Raycaster();


	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children, true);
	console.log(intersects);
	if (level == 1){
		if( intersects.length > 0 ) {
			var firstObjIntersected = intersects[0].object;
			if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
				enemystarship.enemystarship1.health -= 1;
				if (enemystarship.enemystarship1.health == 0){
					parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
					clock.start();
					level = 2;	
					document.getElementById("levelDiv").innerHTML = "LEVEL: " + level;
					return;
				}
				loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
			}
		}
	}
	else if (level == 2){
		if( intersects.length > 0 ) {
		
			var firstObjIntersected = intersects[0].object;

			if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
				enemystarship.enemystarship1.health -= 1;
				if (enemystarship.enemystarship1.health == 0){
					parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
				}
				else{
					loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
				}
			}
			else if ( enemystarship.enemystarship2.name === firstObjIntersected.parent.name ) {
				enemystarship.enemystarship2.health -= 1;
				if (enemystarship.enemystarship2.health == 0){
					parts.push(new esplode_enemy(enemystarship.enemystarship2.model));
				}
				else{
					loadDamagedShip(enemystarship.enemystarship2.model, enemystarship.enemystarship2.health);
				}
			}
			if (enemystarship.enemystarship1.health == 0 && enemystarship.enemystarship2.health == 0){
				clock.start();
				level = 3;
				document.getElementById("levelDiv").innerHTML = "LEVEL: " + level;
			}
		}
	}
	else if (level == 3){
		if( intersects.length > 0 ) {
		
			var firstObjIntersected = intersects[0].object;

			if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
				enemystarship.enemystarship1.health -= 1;
				if (enemystarship.enemystarship1.health == 0){
					parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
				}
				else{
					loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
				}
			}
			if ( enemystarship.enemystarship2.name === firstObjIntersected.parent.name ) {
				enemystarship.enemystarship2.health -= 1;
				if (enemystarship.enemystarship2.health == 0){
					parts.push(new esplode_enemy(enemystarship.enemystarship2.model));
				}
				else{
					loadDamagedShip(enemystarship.enemystarship2.model, enemystarship.enemystarship2.health);
				}
			}
			if ( enemystarship.finalenemy.name === firstObjIntersected.parent.name ) {
				enemystarship.finalenemy.health -= 1;
				if (enemystarship.finalenemy.health == 0){
					parts.push(new esplode_enemy(enemystarship.finalenemy.model));
				}
				else{
					loadDamagedFinalShip(enemystarship.finalenemy.model, enemystarship.finalenemy.health);
				}
			}
			if (enemystarship.enemystarship1.health == 0 && enemystarship.enemystarship2.health == 0 && enemystarship.finalenemy.health == 0){
				clock.start();
				level = 4;
			}
		}
	}
	
}

function shotResponse(){
	fireRate1 += 1;
	fireRate2 += 1;
	if (fireRate1 % 100 == 0){
		if (enemystarship.enemystarship1.health <= 2 && enemystarship.enemystarship1.health > 0){	//when an enemy is hit, it starts to shot you
			raycaster = new THREE.Raycaster();
			var dir = new THREE.Vector3();
			var starship_pos = starship.model.position.clone();
			var enemy_pos = enemystarship.enemystarship1.model.position.clone();
			dir.subVectors(starship_pos, enemy_pos).normalize();
			raycaster.set(enemy_pos, dir);
			var intersects = raycaster.intersectObjects( scene.children, true);
			if( intersects.length > 0 ) {
				
				var firstObjIntersected = intersects[0].object;

				if ( starship.name === firstObjIntersected.parent.name ) {
					starship.health -= 1;
					document.getElementById("healthDiv").innerHTML = starship.health;   
					console.log(clock.getElapsedTime());
					if (starship.health == 0){
						scene.remove(starship.model);	
						alert("GAME OVER");
					}
					return;
				}
			}
		}
	}
	if (fireRate2 % 100 == 0){
		if (enemystarship.enemystarship2.health <= 2 && enemystarship.enemystarship2.health > 0){	//when an enemy is hit, it starts to shot you
			raycaster = new THREE.Raycaster();
			var dir = new THREE.Vector3();
			var starship_pos = starship.model.position.clone();
			var enemy_pos = enemystarship.enemystarship2.model.position.clone();
			dir.subVectors(starship_pos, enemy_pos).normalize();
			raycaster.set(enemy_pos, dir);
			var intersects = raycaster.intersectObjects( scene.children, true);
			if( intersects.length > 0 ) {
				
				var firstObjIntersected = intersects[0].object;

				if ( starship.name === firstObjIntersected.parent.name ) {
					starship.health -= 1;
					document.getElementById("healthDiv").innerHTML = starship.health;   
					if (starship.health == 0){
						scene.remove(starship.model);	
						alert("GAME OVER");
					}
					return;
				}
			}
		}
	
	}
	if (fireRate2 % 20 == 0){
		if (enemystarship.finalenemy.health <= 2 && enemystarship.finalenemy.health > 0){	//when an enemy is hit, it starts to shot you
			raycaster = new THREE.Raycaster();
			var dir = new THREE.Vector3();
			var starship_pos = starship.model.position.clone();
			var enemy_pos = enemystarship.finalenemy.model.position.clone();
			dir.subVectors(starship_pos, enemy_pos).normalize();
			raycaster.set(enemy_pos, dir);
			var intersects = raycaster.intersectObjects( scene.children, true);
			if( intersects.length > 0 ) {
				
				var firstObjIntersected = intersects[0].object;

				if ( starship.name === firstObjIntersected.parent.name ) {
					starship.health -= 1;
					document.getElementById("healthDiv").innerHTML = starship.health;   
					if (starship.health == 0){
						scene.remove(starship.model);	
						alert("GAME OVER");
					}
					return;
				}
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

function esplode_enemy(obj) {
	var geometry = new THREE.Geometry();
	var i = 0;
	for (i = 0; i < 500; i++) {

		var vertex = new THREE.Vector3();

		vertex.x = obj.position.x;
		vertex.y = obj.position.y + 0.5 ;
		vertex.z = obj.position.z;
		geometry.vertices.push(vertex);
		dirs.push({
			x: (Math.random() * 10)  - (10 / 2) ,
			y: (Math.random() * 10)  - (10 / 2) ,
			z: (Math.random() * 10)  - (10 / 2)
		});
	}
	var color;
	if (Math.random() < 0.33){
		color = 0xFBB917;	
	}
	else if (Math.random() < 0.66){
		color = 0xF62817;
	}
	else{
		color = 0x736AFF;
	}
	var material = new THREE.PointsMaterial({
		size: 0.265,
		color: color
	});
	var particles = new THREE.Points(geometry, material);

	this.object = particles;
	this.status = true;

	scene.add(this.object);

	setTimeout(function() {
		scene.remove(particles);
	}, 180);

	this.update = function() {
		if (this.status == true) {
			var pCount = 500;
			while (pCount--) {
				var particle = this.object.geometry.vertices[pCount]
				particle.y += dirs[pCount].y/5;
				particle.x += dirs[pCount].x/5;
				particle.z += dirs[pCount].z/5;
			}
			this.object.geometry.verticesNeedUpdate = true;
		}
	}
	scene.remove(obj);
}

function updateExplosion(){
	var pCount = parts.length;
    while (pCount--) {
      parts[pCount].update();
    }
}


function loadDamagedShip(enemy,health){
	var obj;
	if (health == 2){
		obj = enemystarship.damagedstarship1.model.clone();
	}
	else if (health == 1){
		obj = enemystarship.damagedstarship2.model.clone();
	}
	var child4, child0, child5, child7;
	obj.traverse( function ( obj_child ) {
		if ( obj_child instanceof THREE.Mesh ) {
			if (obj_child.name == "Line60_solar"){
				console.log(obj_child)
				child4 = obj_child;
			}
			else if (obj_child.name == "Line53_bluehull"){
				child0 = obj_child;
			}
			else if (obj_child.name == "Spot03_bluehull"){
				child7 = obj_child;
			}
			else if (obj_child.name == "Object04_bluehull"){
				child5 = obj_child;
			}
		}
	} );
	enemy.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			if (child.name == "Line60_solar"){
				console.log(child)
				child4.parent = child.parent;
				enemy.children[4] = child4;
			}
			else if (child.name == "Line53_bluehull"){
				child0.parent = child.parent;
				enemy.children[0] = child0;
			}
			else if (child.name == "Spot03_bluehull"){
				child7.parent = child.parent;
				enemy.children[7] = child7;
			}
			else if (child.name == "Object04_bluehull"){
				child5.parent = child.parent;
				enemy.children[5] = child5;
			}
		}			
	} );
	
}

function loadDamagedFinalShip(enemy,health){
	console.log(enemy);
	var obj;
	if (health == 2){
		obj = enemystarship.damagedfinalship1.model.clone();
	}
	else if (health == 1){
		obj = enemystarship.damagedfinalship2.model.clone();
	}
	var child0, child1;
	obj.traverse( function ( obj_child ) {
		if ( obj_child instanceof THREE.Mesh ) {
			if (obj_child.name == "polySurface46_Mesh"){
				child0 = obj_child;
			}
			else if (obj_child.name == "pCube85_Mesh.001"){
				child1 = obj_child;
			}
		}
	} );
	enemy.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			if (child.name == "pCube85_Mesh"){
				child0.parent = child.parent;
				enemy.children[0] = child0;
			}
			else if (child.name == "polySurface46_Mesh"){
				child1.parent = child.parent;
				enemy.children[1] = child1;
			}
		}			
	} );
	
}