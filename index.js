var container;
var animation;
//SETTING UP CAMERA

var camera;
var fovy = 60;
var near = 0.1;
var far = 1000;
var reset = false;

/* ---- sound ---- */

var sound_scene;
var sound_enemy;
var sound_start;
var sound_shot;

/* ---------------*/
//starship rotation and shot
var position;
var vec;
var rete;
var position;
var distanza;
var movimento=false;
var finelivello=true;
var x1;
var x2;
var x3;
var vec1;
var x11;
var x22;
var x33;
var vec2

var scene, renderer, light;
var controls;

var raycaster ;
var mouse = new THREE.Vector2();

var keyboard = new THREEx.KeyboardState();

//Setting up clock and levels
var clock;
var clock_money;
var level = 1;

//SETTING UP GAME LOGIC
var world = 1;
var startGame = false;
var entered = false;
var posStart = {z : 0};
var posEnd = -10;
var tweenShip;
var game_over;
var gOverElement = document.getElementById("game_over");
var warning = document.getElementById("warning");
var win = document.getElementById("win");
var enter = document.getElementById("hint");
var improvemnts = document.getElementById("improvements");
var parti=false;

/* ----- Lensflare: propulsor -----*/

var initial_intensity_propulsor=256;
var final_intensity_propulsor=260;
var propulsor_upper_right;
var propulsor_upper_left;
var propulsor_lower_right;
var propulsor_lower_left;

/* -------------------------------*/
//PLANETS
var pianeta1;
var pianeta2;
var pianeta3;
var pianeta4;
var pianeta5;
var pianeta6;
var pianeta7;
var pianeta8;
var pianeta9;
var pianeta10;
var pianeta11;
var pianeta12;
var planets = [];
var planets_data = [];
var loader = new THREE.TextureLoader();
var planet_clock;

//Enemies destruction
 var dirs = [];
 var parts = [];
 var shooting = false;
 var canShot = false;


// Bullets array
var bullets = [];
var enemy_bullets = [];
var curr_bullet1;
var curr_bullet2;
var curr_bullet3;
var objects = [];
var fireRate1 = 0;
var fireRate2 = 0;

//BoxHelpers
var starshipBox;
var starshipBoxMaterial;

var starship;
var enemystarship;
var stargate;
var moneys_asteroids = [];
var moneys_wireframe = [];
var moneys_asteroidsBox = [];
var money;
var money_wireframe;
var asteroid;
var k;
var beta;

var arrived = false;

//SETTING UP ENEMY MOVEMENTS
var y_step = [0.2, 0.15, -0.15];
var x_step = [0.3, 0.2, -0.2];


var z_rotate = 0.04;
var x_rotate = 0.04;


stargate = { 
	model:null, 
	name : "stargate"
};

starship = { 
	model:null, 
	name : "starship",
	money: 0,
	health: 10,
	damage: 1
};

enemystarship = {
	originalenemy1 : { 
		model:null, 
		name:"enemystarship1",
		health: 5
	},
	originalenemy2: {
		model:null, 
		name:"enemystarship2",
		health: 5
	},
	originalfinalenemy : { 
		model:null, 
		name:"originalfinalenemy",
		health: 10,
		animate: false
	},
	enemystarship1 : { 
		model:null, 
		name:"enemystarship1",
		appeared: false,
		health: 5
	},
	enemystarship2: {
		model:null, 
		name:"enemystarship2",
		appeared: false,
		health: 5
	},
	damagedstarship1: {
		model:null, 
		name:"damagedstarship1",
		health: 5
	},
	damagedstarship2: {
		model:null, 
		name:"damagedfinalship1",
		health: 5
	},
	damagedfinalship1: {
		model:null, 
		name:"damagedstarship1",
		health: 5
	},
	damagedfinalship2: {
		model:null, 
		name:"damagedfinalship2",
		health: 5
	},
	finalenemy: {
		model:null, 
		name:"finalenemy",
		appeared: false,
		health: 10,
		animate: false
	}
}


//
//PLANETS
//
var pointLight;
var segmenti_pianeta = 64;

var texture_planets=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg","./images/8.jpg","./images/9.jpg","./images/10.jpg","./images/11.jpg","./images/12.jpg",
			 "./images/13.jpg","./images/14.jpg","./images/15.jpg","./images/16.jpg",
			 "./images/17.jpg","./images/18.png","./images/19.png","./images/20.png","./images/21.png","./images/22.png","./images/23.jpg","./images/24.jpg","./images/25.jpg","./images/26.jpg"];
var planets_dimensions=[40,30,45,55,25,38,45,30,28,42,29,51];

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

function fill_planets(){
	for (var i = 0; i < 12; i++){
		var sign = i % 2 == 0 ? i+1 : -i-1;
		planets_data[i] = constructPlanetData(0.001, {x: 150*(sign), y: 15*sign, z :-500 - 500*i}, "pianeta" + i, texture_planets[i], planets_dimensions[i], segmenti_pianeta)
	}
}
shuffle(texture_planets, 26);
shuffle(planets_dimensions, 12);
fill_planets();


function rotazione_pianeta(pianeta, myData) {
	pianeta.rotation.y += myData.rotationRate;
}

function loadPlanets(){
	for (var i = 0; i < 12; i++){
		var data = planets_data[i];
		var x = planets_data[i].distanceFromAxis.x;
		console.log(planets_data[i].distanceFromAxis);
		var y = planets_data[i].distanceFromAxis.y;
		var z = planets_data[i].distanceFromAxis.z;
		planets[i] = loadTexturedPlanet(data, x , y, z, 0);
	}
}

function movimento_pianeta(pianeta, planet_data){
	if (!enemystarship.enemystarship1.appeared && !enemystarship.enemystarship2.appeared && !enemystarship.finalenemy.appeared){
		if (pianeta.position.x > 0){
			pianeta.position.x += 0.01;
		}
		else{
			pianeta.position.x -= 0.01;
		}
		if(pianeta.position.z < camera.position.z){
			pianeta.position.z += 1.2;
		}
		else{
			scene.remove(pianeta);
			pianeta.position.x = planet_data.distanceFromAxis.x;
			pianeta.position.y = planet_data.distanceFromAxis.y;
			pianeta.position.z = planet_data.distanceFromAxis.z - 1300;
			scene.add(pianeta)
		}
	}	
}

function constructPlanetData(rotation_rate_tmp, distance_from_axis_tmp, name_tmp, texture_tmp, size_tmp, segments_tmp) {
    return { rotationRate: rotation_rate_tmp, distanceFromAxis: distance_from_axis_tmp, name: name_tmp, texture: texture_tmp, size: size_tmp, segments: segments_tmp };
}

function getMaterial(type, color, texture_tmp) {
    var material_characteristic = { color: color === undefined ? 'rgb(255, 255, 255)' : color, map: texture_tmp === undefined ? null : texture_tmp };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(material_characteristic);
        case 'lambert':
            return new THREE.MeshLambertMaterial(material_characteristic);
        case 'phong':
            return new THREE.MeshPhongMaterial(material_characteristic);
        case 'standard':
            return new THREE.MeshStandardMaterial(material_characteristic);
        default:
            return new THREE.MeshBasicMaterial(material_characteristic);
    }
}

function getSphere(material, size, segments) {
    var geom = new THREE.SphereGeometry(size, segments, segments);
    var object = new THREE.Mesh(geom, material);
    object.castShadow = true;

    return object;
}


function loadTexturedPlanet(myData, x, y, z, materialType) {
    var material;
    var texture;

    if (myData.texture && myData.texture !== "") {
		THREE.ImageUtils.crossOrigin = '';
		var texture = loader.load(myData.texture);
		//texture.minFilter = THREE.LinearFilter;
    }
    if (materialType) {
        material = getMaterial(materialType, "rgb(255, 255, 255 )", texture);
    } else {
        material = getMaterial("lambert", "rgb(255, 255, 255 )", texture);
    }

    material.receiveShadow = true;
    material.castShadow = true;
    var pianeta = getSphere(material, myData.size, myData.segments);
    pianeta.receiveShadow = true;
	pianeta.name = myData.name;
    pianeta.position.set(x, y, z);

    return pianeta;
}
//
//END PLANETS
//


var loadManager = new THREE.LoadingManager();
gOverElement.style.display = "none";
warning.style.display = "none";
win.style.display = "none";
improvemnts.style.display = "none";
enter.style.display = "none";

document.getElementById("start").addEventListener("click", function(){

	document.getElementById("load").style.display = "block";
	document.getElementById("start").style.display = "none";
	document.getElementById("commands").style.display = "none";

	loadModels(loadManager);
});

document.getElementById("health").addEventListener("click", restoreHealth);
document.getElementById("damage").addEventListener("click", increaseDamage);




loadManager.onLoad = function () { 

	document.getElementById("load").parentNode.removeChild(document.getElementById("load"));
	initGame();
	addToScene();
	
};

loadManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	document.getElementById("progress_bar").style = "background: linear-gradient(90deg,#e5405e 0%, #ffdb3a 25%, #3fffa2 50%, #3fffa2 50%" + String((itemsLoaded/itemsTotal)*100) + "%, #000000 0%);";
	var round=Math.round((itemsLoaded/itemsTotal)*100);
	document.getElementById("percent_load").innerHTML = 'LOADING: ' + String(round)+"%";
};

loadManager.onError = function ( url ) { 
	document.getElementById("percent_load").innerHTML = 'There was an error loading ' + url; 
};


function loadModels(loadManager){
	//----MODELS-----
	if(!scene) {
		scene = new THREE.Scene();
	}

	if (!camera) {
		camera = new THREE.PerspectiveCamera( fovy, window.innerWidth / window.innerHeight, near, far );
		camera.position.set( 0.0, 0.0, 30.0);
		camera.lookAt( 0.0, -4.0, 0.0 );
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
	var listener = new THREE.AudioListener();
    camera.add(listener);

    sound_scene = new THREE.Audio(listener);
    //Load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/avengers_scene.mp3', function(buffer) {
      sound_scene.setBuffer(buffer);
      sound_scene.setLoop(true);
	  sound_scene.setVolume(0.06);
	});



    sound_start = new THREE.Audio(listener);

	var audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/via.wav', function(buffer) {
		sound_start.setBuffer(buffer);
		sound_start.setVolume(0.03);
	});



	sound_shot = new THREE.Audio(listener);

	var audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/Photon colpo.wav', function(buffer) {
		sound_shot.setBuffer(buffer);
		sound_shot.setVolume(0.06);
		
	});


	sound_enemy = new THREE.Audio(listener);

	var audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/Photon 1.wav', function(buffer) {
		sound_enemy.setBuffer(buffer);
		sound_enemy.setVolume(0.06);
	});



	var textureLoader = new THREE.TextureLoader(loadManager);

	var lensFlareTexture = textureLoader.load("./images/lensflare2.jpg");



	var starship_loader = new THREE.OBJLoader(loadManager);
	var starship_mtlLoader = new THREE.MTLLoader(loadManager);

	
	

	starship_mtlLoader.load('models/starship/X-Wing.mtl', (materials) => {
		materials.preload();
		starship_loader.setMaterials(materials);
		starship_loader.load('models/starship/X-Wing.obj', (object) => {
			object.name ="starship"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			starship.model = object;	
			starshipBox = new THREE.BoxGeometry(10, 8, 15);
			starshipBoxMaterial = new THREE.MeshBasicMaterial({
				color: 0xffff00,
				wireframe: true
			});
			starshipBox = new THREE.Mesh(starshipBox, starshipBoxMaterial);
			starshipBox.position.set(-1.0, -8.0, 2.0);	
			starshipBox.material.visible = false;
			/* propulsor_upper_right */

			propulsor_upper_right= new THREE.Lensflare();
			propulsor_upper_right.flame = new THREE.LensflareElement( lensFlareTexture );
			propulsor_upper_right.addElement( propulsor_upper_right.flame );
			

			propulsor_upper_right.position.y = 1;
			propulsor_upper_right.position.x = 2.2;
			propulsor_upper_right.position.z = 8.25;

			propulsor_upper_right.flame.size = initial_intensity_propulsor/1.5;
			

			/* propulsor_upper_left*/

			propulsor_upper_left = new THREE.Lensflare();
			propulsor_upper_left.flame = new THREE.LensflareElement( lensFlareTexture );
			propulsor_upper_left.addElement( propulsor_upper_left.flame );
			

			propulsor_upper_left.position.y = 1;
			propulsor_upper_left.position.x = -2.2;
			propulsor_upper_left.position.z = 8.25;

			propulsor_upper_left.flame.size = initial_intensity_propulsor/1.5;


			/* propulsor_lower_right */

			propulsor_lower_right= new THREE.Lensflare();
			propulsor_lower_right.flame = new THREE.LensflareElement( lensFlareTexture );
			propulsor_lower_right.addElement( propulsor_lower_right.flame );
			

			propulsor_lower_right.position.y = -1.5;
			propulsor_lower_right.position.x = 2.2;
			propulsor_lower_right.position.z = 8.25;

			propulsor_lower_right.flame.size = initial_intensity_propulsor/1.5;


			/* propulsor_lower_left*/

			propulsor_lower_left = new THREE.Lensflare();
			propulsor_lower_left.flame = new THREE.LensflareElement( lensFlareTexture );
			propulsor_lower_left.addElement( propulsor_lower_left.flame );
			

			propulsor_lower_left.position.y = -1.5;
			propulsor_lower_left.position.x = -2.1;
			propulsor_lower_left.position.z = 8.25;

			propulsor_lower_left.flame.size = initial_intensity_propulsor/1.5;

			
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
			enemystarship.originalenemy1.model = object.clone();
			enemystarship.originalenemy1.model.position.set(-5.0, 0.0, -1000.0);	
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

			enemystarship.originalenemy2.model = object.clone();
			enemystarship.originalenemy2.model.position.set(5.0, 0.0, -1010.0);	
		});
	});
	
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

	
	//Loading planets
	loadPlanets();
	
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
		

	enemies_mtlLoader.load('models/enemies/X-Wing.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing.obj', (object) => {
			object.name ="finalenemy";
			var material1 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
			var material2 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
				 
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
			enemystarship.originalfinalenemy.model = object.clone();
			enemystarship.originalfinalenemy.model.position.set(5.0, 0.0, 1040.0);	

		});
	});

	enemies_obj_loader = new THREE.OBJLoader(loadManager);
	enemies_mtlLoader = new THREE.MTLLoader(loadManager);
		

	enemies_mtlLoader.load('models/enemies/X-Wing-damaged1.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing-damaged1.obj', (object) => {
			object.name ="damagedfinalship1"
			var material1 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
			var material2 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
	
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
		

	enemies_mtlLoader.load('models/enemies/X-Wing-damaged2.mtl', (materials) => {
		enemies_obj_loader.load('models/enemies/X-Wing-damaged2.obj', (object) => {
			object.name ="damagedfinalship2"
			var material1 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_TIE_VN_BaseColor.png') } );
			var material2 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('models/enemies/textures/TIE-vn_Glass_BaseColor.png') } );
				 
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

	var stargate_obj_loader = new THREE.OBJLoader(loadManager);
	var stargate_mtlLoader = new THREE.MTLLoader(loadManager);
		

	stargate_mtlLoader.load('models/portal/stargate.mtl', (materials) => {
		stargate_obj_loader.load('models/portal/stargate.obj', (object) => {
			object.name ="stargate"
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.castShadow = true;
				}
			} );
			stargate.model = object;
			stargate.model.position.set(0.0, -5.0, -20.0);	

		});
		stargate_obj_loader.setMaterials(materials);
	});

	var money_material = createDataTexture("money");
	money = new THREE.Mesh( new THREE.CylinderGeometry( 2, 2, 1, 16 ), money_material);
	money_wireframe = new THREE.Mesh( new THREE.CylinderGeometry( 2.1, 2.1, 1, 64 ),new THREE.MeshPhongMaterial( {color: 0x000000, wireframe: true} ));

	var geometry = new THREE.SphereGeometry( 2, 7, 7 );
	var asteroid_material = createDataTexture("asteroid");
	asteroid = new THREE.Mesh( geometry, asteroid_material );
	createMoneyAndAsteroid();
	setMoneys();		
}

function createDataTexture(obj){
	var side = 48;
	var amount = Math.pow(side, 2);
	var cell = new Uint8Array(amount);
	if (obj == "money"){
		for (var i = 0; i < amount; i++) {
			cell[i] = 156 + (92*i)/amount;
		}
		var texture = new THREE.DataTexture(cell, side, side, THREE.LuminanceFormat, THREE.UnsignedByteType);
		texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true; 
		var material = new THREE.MeshPhongMaterial( { 
			color: 0xFBB917,
			map: texture,
			side: THREE.DoubleSide
		});
		return material;
	}
	else{
		side = 32;
		for (var i = 0; i < amount; i++) {
			cell[i] = 128*Math.random();
		}
		var texture = new THREE.DataTexture(cell, side, side, THREE.LuminanceFormat, THREE.UnsignedByteType);
		texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true; 
		var material = new THREE.MeshPhongMaterial( { 
			map: texture,
			side: THREE.DoubleSide
		});
		return material;
	}
}

function initGame() {
		
	if (!scene) {
		scene = new THREE.Scene();
	}
				
				
	if (!camera) {
		camera = new THREE.PerspectiveCamera( fovy, window.innerWidth / window.innerHeight, near, far );
		camera.position.set( 0.0, 0.0, 30.0);
		camera.lookAt( 0.0, -4.0, 0.0 );
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
		light.position.set(-40.0, 10.0, 0.0);
	}		

	game_over = false;

	clock = new THREE.Clock();
	clock_money= new THREE.Clock();
	clock_money.stop();

	planet_clock = new THREE.Clock();
	planet_clock.start();

	if (!document.getElementById("levelDiv")){
		var levelDiv=document.createElement("DIV");
		levelDiv.id="levelDiv";
		document.body.appendChild(levelDiv);
		document.getElementById("levelDiv").innerHTML = "LEVEL " + level;     
		document.getElementById("levelDiv").style = "position: absolute; left:90%; top:10px; color: white"

		var musicDiv=document.createElement("DIV");
		musicDiv.id="musicDiv";
		document.body.appendChild(musicDiv);
		document.getElementById("musicDiv").style = "position: absolute; left: 90.5%;top: 10%;"
	
	
		var label1=document.createElement("LABEL");
		label1.id="label1";
		label1.className="switch";
		document.getElementById("musicDiv").appendChild(label1);
	
		var check=document.createElement("INPUT");
		check.setAttribute("type", "checkbox");
		check.id="togBtn";
		document.getElementById("label1").appendChild(check);
	
		var span1=document.createElement("SPAN");
		span1.id="span1";
		span1.className="slider round"
		document.getElementById("label1").appendChild(span1);
	}

	
	if (!document.getElementById("healthDiv")){
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
	}

	if (!document.getElementById("damageDiv")){
		var laserDiv=document.createElement("DIV");
		laserDiv.id="laserDiv";
		document.body.appendChild(laserDiv);
		document.getElementById("laserDiv").style = "position: absolute; top:30px; color: white"

		var laser=document.createElement("IMG");
		laser.id="laser";
		laser.src = "./images/laser.png"
		laser.setAttribute("color", "white");
		laser.setAttribute("display", "block");
		document.getElementById("laserDiv").appendChild(laser);

		var damageDiv = document.createElement("DIV");
		damageDiv.id = "damageDiv";      
		document.body.appendChild(damageDiv);
		document.getElementById("damageDiv").innerHTML = starship.damage;         
		document.getElementById("damageDiv").style = "position: absolute; left:3%; top:40px; color: white"
	}
	if (!document.getElementById("moneyDiv")){
		var moneyDiv=document.createElement("DIV");
		moneyDiv.id="moneyDiv";
		document.body.appendChild(moneyDiv);
		document.getElementById("moneyDiv").style = "position: absolute; top:63px; color: white"
	
		var money=document.createElement("IMG");
		money.id="money";
		money.src = "./images/money.png"
		money.setAttribute("color", "white");
		money.setAttribute("display", "block");
		document.getElementById("moneyDiv").appendChild(money);
	
		var moneysDiv = document.createElement("DIV");
		moneysDiv.id = "moneysDiv";      
		document.body.appendChild(moneysDiv);
		document.getElementById("moneysDiv").innerHTML = starship.money;         
		document.getElementById("moneysDiv").style = "position: absolute; left:3%; top:73px; color: white"
	}
	if (!document.getElementById("worldDiv")){
		var worldDiv=document.createElement("DIV");
		worldDiv.id="worldDiv";
		document.body.appendChild(worldDiv);
		document.getElementById("worldDiv").innerHTML = "World " + world;     
		document.getElementById("worldDiv").style = "position: absolute; left:43%; top:10px;"
		document.getElementById("worldDiv").style.display = "block";
	}
	

	
	starship.model.position.set(0.0, -8.0, 0.0);
	starshipBox.position.set(0.0, -8.0, 2.0);
	enemystarship.enemystarship2.model.position.set(5.0, 0.0, -1010.0);	
	enemystarship.originalenemy2.model.position.set(5.0, 0.0, -1010.0);	
	enemystarship.finalenemy.model.position.set(0.0, 2.0, -1040.0);	
	enemystarship.damagedfinalship1.model.position.set(0.0, 2.0, -50.0);	
	enemystarship.damagedfinalship1.model.rotation.x += 0.1;
	enemystarship.damagedfinalship2.model.position.set(0.0, 2.0, -50.0);	
	enemystarship.damagedfinalship2.model.rotation.x += 0.1;
	stargate.model.position.set(0.0, -5.0, -20.0);			
	scene.add(starship.model);
	scene.add(starshipBox);
	scene.add(light);	
	scene.add(ambientLight);
	
	

	document.addEventListener( "mousedown", destroyEnemy, false );
	document.addEventListener( "mousemove", mouseMove, false );
	animate();

	window.addEventListener( 'resize', onWindowResize, false );

	sound_scene.play(); 
	
	enter.style.display = "block";
	
	var checkbox = document.getElementById("togBtn");

 	checkbox.addEventListener('change', function () {
		if(this.checked) {
			sound_scene.setVolume(0.0);
        	sound_enemy.setVolume(0.0);
        	sound_shot.setVolume(0.0);
        	sound_start.setVolume(0.0);

		}
		else {
			sound_scene.setVolume(0.06);
			sound_enemy.setVolume(0.06);
			sound_shot.setVolume(0.06);
			sound_start.setVolume(0.03);
		}
  	});
}

function planets_respawn(){
	for (var i = 0; i < planets.length; i++){
		movimento_pianeta(planets[i], planets_data[i]);
		rotazione_pianeta(planets[i], planets_data[i]);
	}	
}

function addPlanets(){
	for (var i = 0; i < planets.length; i++){
		scene.add(planets[i]);
	}
}

function animateEnemy(){
	if (enemystarship.enemystarship1.health > 0 && enemystarship.enemystarship1.appeared == true){
		var y_pos = enemystarship.enemystarship1.model.position.y;	//0.0
		var x_pos = enemystarship.enemystarship1.model.position.x; //0.0
		enemystarship.enemystarship1.model.position.x += x_step[1]*world;
		enemystarship.enemystarship1.model.position.y += y_step[1]*world;
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
	if (enemystarship.enemystarship2.health > 0 && enemystarship.enemystarship2.appeared == true){
		var y_pos = enemystarship.enemystarship2.model.position.y;	//0.0
		var x_pos = enemystarship.enemystarship2.model.position.x; //0.0
		enemystarship.enemystarship2.model.position.x += x_step[2]*world;
		enemystarship.enemystarship2.model.position.y += y_step[2]*world;
		var dir = new THREE.Vector3();
		var starship_pos = starship.model.position.clone();
		var enemy_pos = enemystarship.enemystarship1.model.position.clone();
		dir.subVectors(starship_pos, enemy_pos).normalize();
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
	if (enemystarship.finalenemy.health > 0 && enemystarship.finalenemy.appeared == true && !enemystarship.finalenemy.animate){
		enemystarship.finalenemy.animate = true;
		var rand = Math.random();
		if (shooting && enemystarship.finalenemy.health > 0 && level >= 3){	//when an enemy is hit, it starts to shot you
			curr_bullet3 = enemyShot(enemystarship.finalenemy.model);
		}
		if (curr_bullet3 != undefined){
			if (curr_bullet3.position.z >= camera.position.z){
				scene.remove(curr_bullet3);
			}
			else{
				raycaster = new THREE.Raycaster();
				var dir = new THREE.Vector3();
				var starship_pos = starship.model.position.clone();
				var enemy_pos = curr_bullet3.position.clone();
				dir.subVectors(starship_pos, enemy_pos).normalize();
				raycaster.set(enemy_pos, dir);
				var intersects = raycaster.intersectObjects( scene.children, true);
				if( intersects.length > 0 && intersects[0].distance < 2) {
					
					var firstObjIntersected = intersects[0].object;
		
					if ( starship.name === firstObjIntersected.parent.name ) {
						starship.health -= 2*world;
						scene.remove(curr_bullet3);
						curr_bullet3 = undefined;
						if (starship.health <= 0){
							scene.remove(starship.model);	
							canShot = false;
							gameOver();
						}
					}
				}
			}
			
		}
		if (enemystarship.finalenemy.model.position.x > 0){
			if (rand < 0.2) {
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-30;
					enemystarship.finalenemy.model.position.y=-30;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.4){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-20;
					enemystarship.finalenemy.model.position.y=15;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.6){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-20;
					enemystarship.finalenemy.model.position.y=0;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.8){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-30;
					enemystarship.finalenemy.model.position.y=-10;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else{
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=0;
					enemystarship.finalenemy.model.position.y=0;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
		}
		if (enemystarship.finalenemy.model.position.x == 0){
			if (rand < 0.2) {
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-30;
					enemystarship.finalenemy.model.position.y=-30;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.4){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x= 20;
					enemystarship.finalenemy.model.position.y= 10;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.6){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-20;
					enemystarship.finalenemy.model.position.y=10;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.8){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=40;
					enemystarship.finalenemy.model.position.y=-5;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else{
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=-15;
					enemystarship.finalenemy.model.position.y=-10;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
		}
		
		if (enemystarship.finalenemy.model.position.x < 0){
			if (rand < 0.2) {
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=10;
					enemystarship.finalenemy.model.position.y=-30;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.4){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x= 40;
					enemystarship.finalenemy.model.position.y= 0;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.6){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=30;
					enemystarship.finalenemy.model.position.y=-10;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else if (rand < 0.8){
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=20;
					enemystarship.finalenemy.model.position.y=-15;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}
			else{
				setTimeout(function(){
					enemystarship.finalenemy.model.position.x=0;
					enemystarship.finalenemy.model.position.y=0;
					enemystarship.finalenemy.animate = false;
				}, 1000);
			}		
		}	
	}

}



function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function mouseMove(event){
	if(canShot==true){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
		starship.model.rotation.x= Math.min(10,  mouse.y);
		starship.model.rotation.y= Math.min(10,  -mouse.x);
		starshipBox.rotation.x = Math.min(10,  mouse.y);
		starshipBox.rotation.y = Math.min(10,  -mouse.x);
	}
}

function setStarshipRotation(){
	if (movimento==false){
		if(starship.model.rotation.x>0){
			starship.model.rotation.x-=0.1;
			starshipBox.rotation.x-=0.1	;
		}
		if(starship.model.rotation.x<0){
			starship.model.rotation.x+=0.1;
			starshipBox.rotation.x+=0.1	;
		}
		if(starship.model.rotation.y>0){
			starship.model.rotation.y-=0.1;
			starshipBox.rotation.y-=0.1	;
		}
		if(starship.model.rotation.y<0){
			starship.model.rotation.y+=0.1;
			starshipBox.rotation.y+=0.1	;
		}
		
	}
}

function createBullets(){
	for(var index=0; index < bullets.length; index+=1){
		if( bullets[index] === undefined ) continue;
		if( bullets[index].alive == false ){
			bullets.splice(index,1);
			continue;
		}
		bullets[index].position.add(bullets[index].velocity);
	}
}


var end=false;

function finishGame(){

	if (level == 4){
		if (starship.model.position.x > 0){
			starship.model.position.x-=0.1;
		}
		if (starship.model.position.x < 0){
			starship.model.position.x+=0.1;
		}
		if (starship.model.position.y > -8){
			starship.model.position.y-=0.1;
		}
		if (starship.model.position.y < -8){
			starship.model.position.y+=0.1;
		}
		if (parti==true){
			if (starship.model.position.z >= -90){
				if (starship.model.position.z <= -65){
					starship.model.remove(propulsor_upper_right);
					starship.model.remove(propulsor_upper_left);
					starship.model.remove(propulsor_lower_right);
					starship.model.remove(propulsor_lower_left);
				}
				starship.model.position.z -= 0.2;
			}
			else if (starship.model.position.z >= -130){
				starship.model.position.z -= 0.2;
				TweenMax.set($('.stars'), {opacity:0 });
				TweenMax.staggerTo($('.stars'), 3, {opacity:1}, 0.1 );
				while(scene.children.length > 0){ 
					scene.remove(scene.children[0]); 
				}
			}
			else{				
				world += 1;
				parti = false;
				resetGame(end);
			}
		}
	}
	if (end==false && level==4){
		end=true;
			
		
		setTimeout(function(){
			parts.push(new fuochi(-10, 5));
		}, 3500);

		setTimeout(function(){
			parts.push(new fuochi(-20, -5));
		}, 4000);

		setTimeout(function(){
			parts.push(new fuochi(10, 8));
		}, 5000);

		setTimeout(function(){
			parts.push(new fuochi(-15, -7));
		}, 3500);

		setTimeout(function(){
			parts.push(new fuochi(0, -5));
		}, 3500);

		setTimeout(function(){
			parts.push(new fuochi(-5, -5));
		}, 3500);

		setTimeout(function(){
			parti=true;
		}, 3000);
	}
}

function createEnemyBullets(){
	for(var index=0; index < enemy_bullets.length; index+=1){
		if( enemy_bullets[index] === undefined ) continue;
		if( enemy_bullets[index].alive == false ){
		  enemy_bullets.splice(index,1);
		  continue;
		}
		enemy_bullets[index].position.add(enemy_bullets[index].velocity);
	}
}

function animate() {
	animation = requestAnimationFrame( animate );
	if (movimento==false){
		starship.model.rotation.x=0;
		starship.model.rotation.y=0;
		starship.model.rotation.z=0;
		starshipBox.rotation.x= 0;	
		starshipBox.rotation.y= 0;	
		starshipBox.rotation.z= 0;		
	}
	if (parti == false){
		starship.model.position.z = 0;
		starshipBox.position.z= 0;	
	}
	
	if (enemystarship.enemystarship1.model.position.z >= -70 && !enemystarship.enemystarship1.appeared && starship.model.getObjectByName("LeftWingBottom.001").rotation.z < 1 ){
		rotateWings("open");
	}
	if (enemystarship.enemystarship1.health <= 0 && level == 2 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		if (!enemystarship.enemystarship2.appeared){
			rotateWings("close");
		}
	}
	if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0 && level == 3 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		if (!enemystarship.finalenemy.appeared){
			rotateWings("close");
		}
	}
	if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0 && enemystarship.finalenemy.health <= 0 && level == 4 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		rotateWings("close");
	}
	quitGame();
	if (!reset){
		resetGame(false);
	}
	if (startGame && !game_over){
		handleMovements();
		loadEnemies();
		animateEnemy();
		showImprovements();
		updateExplosion();
		shotResponse();
		planets_respawn();
		setStarshipRotation()
		animateMoney();
		createBullets()
		createEnemyBullets()
		updateInfoBar();
		getMoney();
		finishGame()
	}
	else if (!game_over && !startGame){
		playGame();
		TWEEN.update();
	}
	render();
}

function rotateWings(action){
	if (action == "open"){
		movimento=true;
		starship.model.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				if (child.name == "LeftWingBottom.001" || child.name == "LeftWingBottomEngineAndGreebles.001" || child.name == "LeftWingBottomHullPlates.001"){
					child.rotation.z += 0.0016;
					propulsor_lower_left.position.y -= 0.00085;
					propulsor_lower_left.position.x += 0.00060;
				}
				if (child.name == "LeftWingTop.001" || child.name == "LeftWingTopEngineAndGreebles.001" || child.name == "LeftWingTopHullPlates.001"){
					child.rotation.z -= 0.0016;
					propulsor_upper_left.position.y += 0.00085;
					propulsor_upper_left.position.x += 0.00060;
				}
				if (child.name == "RightWingBottom.001" || child.name == "RightWingBottomEngineAndGreebles.001" || child.name == "RightWingBottomHullPlates.001"){
					child.rotation.z -= 0.0016;
					propulsor_lower_right.position.y -= 0.00085;
					propulsor_lower_right.position.x -= 0.00060;
				}
				if (child.name == "RightWingTop.001" || child.name == "RightWingTopEngineAndGreebles.001" || child.name == "RightWingTopHullPlates.001"){
					child.rotation.z += 0.0016;
					propulsor_upper_right.position.y += 0.00085;
					propulsor_upper_right.position.x -= 0.00060;
				}

			}
		} );
	}
	else{
		movimento=false;
		canShot = false;
		starship.model.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				if (child.name == "LeftWingBottom.001" || child.name == "LeftWingBottomEngineAndGreebles.001" || child.name == "LeftWingBottomHullPlates.001"){
					child.rotation.z -= 0.0016;
					propulsor_lower_left.position.y += 0.00085;
					propulsor_lower_left.position.x -= 0.00045;
				}
				if (child.name == "LeftWingTop.001" || child.name == "LeftWingTopEngineAndGreebles.001" || child.name == "LeftWingTopHullPlates.001"){
					child.rotation.z += 0.0016;
					propulsor_upper_left.position.y -= 0.00085;
					propulsor_upper_left.position.x -= 0.00060;
				}
				if (child.name == "RightWingBottom.001" || child.name == "RightWingBottomEngineAndGreebles.001" || child.name == "RightWingBottomHullPlates.001"){
					child.rotation.z += 0.0016;
					propulsor_lower_right.position.y += 0.00085;
					propulsor_lower_right.position.x += 0.00060;
				}
				if (child.name == "RightWingTop.001" || child.name == "RightWingTopEngineAndGreebles.001" || child.name == "RightWingTopHullPlates.001"){
					child.rotation.z -= 0.0016;
					propulsor_upper_right.position.y -= 0.00085;
					propulsor_upper_right.position.x += 0.00060;
				}
			}
		} );

	}
	
}

function loadEnemies(){
	if (clock.running && level == 1){
		if (clock.getElapsedTime() > 9 && clock.getElapsedTime() < 15){
			warning.style.display = "block";
		}
		if (clock.getElapsedTime() >= 15){
			warning.style.display = "none";
		}
		if (clock.getElapsedTime() > 2){
			if (enemystarship.enemystarship1.model.position.z < -118){
				enemystarship.enemystarship1.model.position.z += 1.5;
			}
			else if (enemystarship.enemystarship1.model.position.z < -18){
				enemystarship.enemystarship1.model.position.z += 0.75;
			}
			else{
				enemystarship.enemystarship1.appeared = true;
				canShot = true;
				clock.stop();
			}
		}
	}
	if (clock.running && level == 2){
		if (clock.getElapsedTime() > 11 && clock.getElapsedTime() < 17){
			warning.style.display = "block";
		}
		if (clock.getElapsedTime() >= 17){
			warning.style.display = "none";
		}
		if (clock.getElapsedTime() > 5){
			
			if (enemystarship.enemystarship1.model.position.z < -118){
				enemystarship.enemystarship1.model.position.z += 1.5;
				enemystarship.enemystarship2.model.position.z += 1.5
			}
			else if (enemystarship.enemystarship1.model.position.z < -18){
				enemystarship.enemystarship1.model.position.z += 0.75;
				enemystarship.enemystarship2.model.position.z += 0.75;
			}
			else{
				enemystarship.enemystarship1.appeared = true;
				enemystarship.enemystarship2.appeared = true;
				canShot = true;
				clock.stop();
			}
			enemystarship.enemystarship1.health = 5;
		}

	}
	if (clock.running && level == 3){
		
		if (clock.getElapsedTime() > 11 && clock.getElapsedTime() < 17){
			warning.style.display = "block";
		}
		if (clock.getElapsedTime() >= 17){
			warning.style.display = "none";
		}
		if (clock.getElapsedTime() > 5){
			if (enemystarship.enemystarship1.model.position.z < -118){
				enemystarship.enemystarship1.model.position.z += 1.5;
				enemystarship.enemystarship2.model.position.z += 1.5;
				enemystarship.finalenemy.model.position.z += 1.5;
			}
			else if (enemystarship.enemystarship1.model.position.z < -18){
				enemystarship.enemystarship1.model.position.z += 0.75;
				enemystarship.enemystarship2.model.position.z += 0.75;
				enemystarship.finalenemy.model.position.z += 0.75;
			}
			else{
				enemystarship.enemystarship1.appeared = true;
				enemystarship.enemystarship2.appeared = true;
				enemystarship.finalenemy.appeared = true;
				canShot = true;
				clock.stop();
			}
			enemystarship.enemystarship1.health = 5;
			enemystarship.enemystarship2.health = 5;
		}

	}
	if (clock.running && level == 4){
		if (clock.getElapsedTime() >= 1 && clock.getElapsedTime() <= 7){
			win.style.display = "block";
		}
		else if (clock.getElapsedTime() > 7){
			win.style.display = "none";
			clock.stop();
		}
	}
}


function destroyEnemy( event ) {
	if (canShot){
		sound_enemy.play();
		vec= new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	 
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		hitShot(mouse.x,mouse.y);
		
		vec.unproject( camera );
		
		rete= vec.sub( camera.position ).normalize();
		distanza= -camera.position.z / rete.z;
		position= camera.position.clone()
		position=position.add(rete.multiplyScalar(distanza));
		
		
		x1= starship.model.position.x+8.5;
		x2= starship.model.position.y+1.5;
		x3= starship.model.position.z-3;
		x11=starship.model.position.x-8.5;
		x22=starship.model.position.y+1.5;
		x33=starship.model.position.z-3;
		vec1=new THREE.Vector3( x1,x2,x3);
		vec2=new THREE.Vector3( x11,x22,x33);

		var material = new THREE.LineDashedMaterial( {
			color:0x00FF00,
			dashSize: 0.7,
			gapSize: 1,
		} );		
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3( x1, x2, x3),
		new THREE.Vector3(position.x, position.y, position.z) );

		var line = new THREE.Line( geometry, material );
        line.computeLineDistances();

		scene.add( line );
		setTimeout(function(){
			line.alive = false;
			scene.remove(line);
		},10);

		
		var material2 = new THREE.LineDashedMaterial( {
			color:0x00FF00,
			dashSize: 0.7,
			gapSize: 1,
		} );		
		var geometry2 = new THREE.Geometry();
		geometry2.vertices.push(new THREE.Vector3( x11, x22, x33) );
		geometry2.vertices.push(new THREE.Vector3( position.x, position.y, position.z) );
		
		var line2 = new THREE.Line( geometry2, material2 );
        line2.computeLineDistances();

		scene.add( line2 );


		
		setTimeout(function(){
			line2.alive = false;
			scene.remove(line2);
		},10);


	}	
}

function hitShot( x,y ) {
	if (canShot){
		mouse.x = x;
		mouse.y = y;	
		raycaster = new THREE.Raycaster();	
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children, true);
		if (level == 1){
			if( intersects.length > 0 ) {
				var firstObjIntersected = intersects[0].object;
				if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
					enemystarship.enemystarship1.health -= starship.damage;
					shooting = true;
					if (enemystarship.enemystarship1.health <= 0){
						parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
						enemystarship.enemystarship1.appeared = false;
						enemystarship.enemystarship1.model.position.z = -1000;
						enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
						scene.add(enemystarship.enemystarship1.model);
						clock_money.start();
						shooting = false;
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
					enemystarship.enemystarship1.health -= starship.damage;
					//console.log(firstObjIntersected);
					shooting = true;
					if (enemystarship.enemystarship1.health <= 0){
						parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
						enemystarship.enemystarship1.appeared = false;
						enemystarship.enemystarship1.model.position.z = -1000;
						enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
						scene.add(enemystarship.enemystarship1.model);
					}
					else{
						loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
					}
				}
				else if ( enemystarship.enemystarship2.name === firstObjIntersected.parent.name ) {
					enemystarship.enemystarship2.health -= starship.damage;
					shooting = true;
					if (enemystarship.enemystarship2.health <= 0){
						parts.push(new esplode_enemy(enemystarship.enemystarship2.model));
						enemystarship.enemystarship2.appeared = false;
						enemystarship.enemystarship2.model.position.z = -1010;
						enemystarship.enemystarship2.model = enemystarship.originalenemy2.model.clone();
						scene.add(enemystarship.enemystarship2.model);
					}
					else{
						loadDamagedShip(enemystarship.enemystarship2.model, enemystarship.enemystarship2.health);
					}
				}
				if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0){
					setMoneys();
					clock_money.start();
					shooting = false;
					level = 3;
					document.getElementById("levelDiv").innerHTML = "LEVEL: " + level;
				}
			}
		}
		else if (level == 3){
			if( intersects.length > 0 ) {
			
				var firstObjIntersected = intersects[0].object;
	
				if ( enemystarship.enemystarship1.name === firstObjIntersected.parent.name ) {
					enemystarship.enemystarship1.health -= starship.damage;
					shooting = true;
					if (enemystarship.enemystarship1.health <= 0){
						parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
						enemystarship.enemystarship1.appeared = false;
						enemystarship.enemystarship1.model.position.z = -1000;
						enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
					}
					else{
						loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
					}
				}
				if ( enemystarship.enemystarship2.name === firstObjIntersected.parent.name ) {
					enemystarship.enemystarship2.health -= starship.damage;
					shooting = true;
					if (enemystarship.enemystarship2.health <= 0){
						parts.push(new esplode_enemy(enemystarship.enemystarship2.model));
						enemystarship.enemystarship2.appeared = false;
						enemystarship.enemystarship2.model.position.z = -1010;
						enemystarship.enemystarship2.model = enemystarship.originalenemy2.model.clone();
					}
					else{
						loadDamagedShip(enemystarship.enemystarship2.model, enemystarship.enemystarship2.health);
					}
				}
				if ( enemystarship.finalenemy.name === firstObjIntersected.parent.name ) {
					enemystarship.finalenemy.health -= starship.damage;
					shooting = true;
					if (enemystarship.finalenemy.health <= 0){
						parts.push(new esplode_enemy(enemystarship.finalenemy.model));
						enemystarship.finalenemy.appeared = false;
						enemystarship.finalenemy.model.position.z = -1040;
						enemystarship.finalenemy.model = enemystarship.originalfinalenemy.model.clone();
					}
					else{
						loadDamagedFinalShip(enemystarship.finalenemy.model, enemystarship.finalenemy.health);
					}
				}
				if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0 && enemystarship.finalenemy.health <= 0){
					shooting = false;
					level = 4;
					clock.start();
					stargate.model.position.z = -50;
					scene.add(stargate.model);
				}
			}
		}
		if( intersects.length > 0 ) {
			var firstObjIntersected = intersects[0].object;
			for (var i = 0; i < planets.length; i++){
				if (firstObjIntersected.name == "pianeta"+i){
					parts.push(new explode_planet(planets[i],1));
					calculate_damages(planets[i].position);
					setTimeout(function() {
						parts.push(new explode_planet(pianetas[i],2));
					}, 180);
					pianeta[i].position.z= camera.position.z+1;
					break;
				}
			}
		}
	}
}


function calculate_damages(src){
	var distance = src.distanceTo(starship.model.position);
	if (distance < 10){
		starship.health -= 2;
		if (starship.health <= 0){
			scene.remove(starship.model);	
			canShot = false;
			gameOver();
		}
	}
	distance = src.distanceTo(enemystarship.enemystarship1.model.position);
	if (distance < 5){
		enemystarship.enemystarship1.health -= 2;
		if (enemystarship.enemystarship1.health <= 0){
			parts.push(new esplode_enemy(enemystarship.enemystarship1.model));
			enemystarship.enemystarship1.appeared = false;
			enemystarship.enemystarship1.model.position.z = -1000;
			enemystarship.enemystarship1.model = enemystarship.originalenemy1.model.clone();
		}
		else{
			loadDamagedShip(enemystarship.enemystarship1.model, enemystarship.enemystarship1.health);
		}
	}
	distance = src.distanceTo(enemystarship.enemystarship2.model.position);
	if (distance < 5){
		enemystarship.enemystarship2.health -= 2;
		if (enemystarship.enemystarship2.health <= 0){
			parts.push(new esplode_enemy(enemystarship.enemystarship2.model));
			enemystarship.enemystarship2.appeared = false;
			enemystarship.enemystarship2.model.position.z = -1010;
			enemystarship.enemystarship2.model = enemystarship.originalenemy2.model.clone();
		}
		else{
			loadDamagedShip(enemystarship.enemystarship2.model, enemystarship.enemystarship2.health);
		}
	}
	distance = src.distanceTo(enemystarship.finalenemy.model.position);
	if (distance < 5){
		enemystarship.finalenemy.health -= 2;
		if (enemystarship.finalenemy.health <= 0){
			parts.push(new esplode_enemy(enemystarship.finalenemy.model));
			enemystarship.finalenemy.appeared = false;
			enemystarship.finalenemy.model.position.z = -1040;
			enemystarship.finalenemy.model = enemystarship.originalfinalenemy.model.clone();
		}
		else{
			loadDamagedFinalShip(enemystarship.finalenemy.model, enemystarship.finalenemy.health);
		}
	}
}


function enemyShot(obj){
	sound_shot.play();
	var enemy_pos = obj.position.clone();
	var starship_pos = starship.model.position.clone();
	var dir = new THREE.Vector3();
	dir.subVectors(starship_pos, enemy_pos).normalize();
	var bullet = new THREE.Mesh(
		new THREE.SphereGeometry(0.3, 0.3, 20),
		new THREE.MeshPhongMaterial({color:0xF62817})
	);
	bullet.position.set(enemy_pos.x, enemy_pos.y, enemy_pos.z);
	bullet.velocity = dir;
	bullet.alive = true;
	enemy_bullets.push(bullet);
	scene.add(bullet);
	
	return bullet;

}

function shotResponse(){
	fireRate1 += 1;
	fireRate2 += 1;
	if (fireRate1 % 100 == 0){
		if (enemystarship.enemystarship1.appeared && enemystarship.enemystarship1.health > 0){	//when an enemy is hit, it starts to shot you
			curr_bullet1 = enemyShot(enemystarship.enemystarship1.model);
		}
	}
	if (curr_bullet1 != undefined){
		if (curr_bullet1.position.z >= camera.position.z){
			scene.remove(curr_bullet1);
			return;
		}
		raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
		var starship_pos = starship.model.position.clone();
		var enemy_pos = curr_bullet1.position.clone();
		dir.subVectors(starship_pos, enemy_pos).normalize();
		raycaster.set(enemy_pos, dir);
		var intersects = raycaster.intersectObjects( scene.children, true);
		if( intersects.length > 0 && intersects[0].distance < 2) {
			
			var firstObjIntersected = intersects[0].object;

			if ( starship.name === firstObjIntersected.parent.name ) {
				starship.health -= 1*world;
				scene.remove(curr_bullet1);
				curr_bullet1 = undefined;
				if (starship.health <= 0){
					scene.remove(starship.model);	
					canShot = false;
					gameOver();
				}
				return;
			}
		}
	}

	if (fireRate2 % 70 == 0){
		if (enemystarship.enemystarship2.appeared && enemystarship.enemystarship2.health > 0 && level >= 2){	//when an enemy is hit, it starts to shot you
			curr_bullet2 = enemyShot(enemystarship.enemystarship2.model);
		}
	}
	if (curr_bullet2 != undefined){
		if (curr_bullet2.position.z >= camera.position.z){
			scene.remove(curr_bullet2);
			return;
		}
		raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
		var starship_pos = starship.model.position.clone();
		var enemy_pos = curr_bullet2.position.clone();
		dir.subVectors(starship_pos, enemy_pos).normalize();
		raycaster.set(enemy_pos, dir);
		var intersects = raycaster.intersectObjects( scene.children, true);
		if( intersects.length > 0 && intersects[0].distance < 2) {
			
			var firstObjIntersected = intersects[0].object;

			if ( starship.name === firstObjIntersected.parent.name ) {
				starship.health -= 1*world;
				scene.remove(curr_bullet2);
				curr_bullet2 = undefined;
				if (starship.health <= 0){
					scene.remove(starship.model);	
					canShot = false;
					gameOver();
				}
				return;
			}
		}
	}
	if (fireRate2 % 120 == 0){
		if (enemystarship.finalenemy.appeared && enemystarship.finalenemy.health > 0 && level == 3){	
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
					starship.health -= 2*world; 
					if (starship.health <= 0){
						scene.remove(starship.model);	
						canShot = false;
						gameOver();
					}
					return;
				}
			}
		}
	
	}
	
}



function render() {
	var time = performance.now() * 0.001;
	renderer.render( scene, camera );

}


function handleMovements(){
	if (level != 4){
		if ( keyboard.pressed("D") && starship.model.position.x < window.innerWidth/42){
			starship.model.translateX(x_step[0]);
			starship.model.rotation.z= -z_rotate;
			starshipBox.translateX(x_step[0]);
			starshipBox.rotation.z= -z_rotate;
			document.addEventListener( "mousemove", mouseMove, false );
		}
		if ( keyboard.pressed("A") && starship.model.position.x > -window.innerWidth/42){
			starship.model.translateX(-x_step[0]);
			starship.model.rotation.z= z_rotate;
			starshipBox.translateX(-x_step[0]);
			starshipBox.rotation.z= z_rotate;
			document.addEventListener( "mousemove", mouseMove, false );
		}
		if ( keyboard.pressed("W") && starship.model.position.y < window.innerHeight/42){
			starship.model.translateY(y_step[0]);
			starship.model.rotation.z= z_rotate;
			starshipBox.translateY(y_step[0]);
			starshipBox.rotation.x= -x_rotate;
			document.addEventListener( "mousemove", mouseMove, false );
	
		}
		if ( keyboard.pressed("S") && starship.model.position.y > -window.innerHeight/42){
			starship.model.translateY(-y_step[0]);
		    starship.model.rotation.z= z_rotate;
			starshipBox.translateY(-y_step[0]);
			starshipBox.rotation.x= x_rotate;
			document.addEventListener( "mousemove", mouseMove, false );
		}

	}
	
}

var movementSpeed = 2;
var totalObjects = 500;
var objectSize = 0.2;
var colors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF];


	
function fuochi(x,y){
	

	var geometry = new THREE.Geometry();
	var i;
	for (i = 0; i < totalObjects; i ++){ 
		var vertex = new THREE.Vector3();
		vertex.x = x;
		vertex.y = y;
		vertex.z = 0;
		geometry.vertices.push( vertex );
		dirs.push({
			x:(Math.random() * movementSpeed)-(movementSpeed/2),
			y:(Math.random() * movementSpeed)-(movementSpeed/2),
			z:(Math.random() * movementSpeed)-(movementSpeed/2)
		});
	}
	var material = new THREE.PointsMaterial( { size: objectSize,  color: colors[Math.round(Math.random() * colors.length)] });
	var particles = new THREE.Points( geometry, material );

	this.object = particles;
	this.status = true;

	setTimeout(function() {
		scene.remove(particles);
	}, 250);

	this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
	this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
	this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);

	scene.add( this.object  ); 

	this.update = function(){
		if (this.status == true){
			var pCount = totalObjects;
			while(pCount--) {
				var particle =  this.object.geometry.vertices[pCount]
				particle.y += dirs[pCount].y;
				particle.x += dirs[pCount].x;
				particle.z += dirs[pCount].z;
			}
			this.object.geometry.verticesNeedUpdate = true;
		}
	}
}

function explode_planet(obj,info) {
	var geometry = new THREE.Geometry();
	var i = 0;
	for (i = 0; i < 1000; i++) {

		var vertex = new THREE.Vector3();

		vertex.x = obj.position.x+10;
		vertex.y = obj.position.y +10 ;
		vertex.z = obj.position.z+10;
		geometry.vertices.push(vertex);
		dirs.push({
			x: (Math.random() * 10)  - (10 / 2) ,
			y: (Math.random() * 10)  - (10 / 2) ,
			z: (Math.random() * 10)  - (10 / 2)
		});
	}
	var color;
	if(info==1){
		color= 0xFFD700;
	}
	else{
		color= 0xA52A2A;
	}
	
	var material = new THREE.PointsMaterial({
		size: 2.500,
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
				particle.y += dirs[pCount].y/2;
				particle.x += dirs[pCount].x/2;
				particle.z += dirs[pCount].z/2;
			}
			this.object.geometry.verticesNeedUpdate = true;
		}
	}
	scene.remove(obj);
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
	if (health == 3){
		obj = enemystarship.damagedstarship1.model.clone();
	}
	else if (health == 1){
		obj = enemystarship.damagedstarship2.model.clone();
	}
	else{
		return;
	}
	var child4, child0, child5, child7;
	obj.traverse( function ( obj_child ) {
		if ( obj_child instanceof THREE.Mesh ) {
			if (obj_child.name == "Line60_solar"){
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
	var obj;
	if (health == 6){
		obj = enemystarship.damagedfinalship1.model.clone();
	}
	else if (health == 3){
		obj = enemystarship.damagedfinalship2.model.clone();
	}
	else{
		return;
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


function addToScene(){
	enemystarship.enemystarship1.model.position.set(-5.0, 0.0, -1000.0);	
	enemystarship.enemystarship2.model.position.set(5.0, 0.0, -1010.0);	
	enemystarship.finalenemy.model.position.set(0.0, 2.0, -1040.0);	
	scene.add(enemystarship.enemystarship1.model);
	scene.add(enemystarship.enemystarship2.model);
	scene.add(enemystarship.finalenemy.model);
	scene.add(stargate.model);
}

function playGame(){
	if ( keyboard.pressed("E") && !entered){
		starship.model.add(propulsor_upper_right);
		starship.model.add(propulsor_upper_left);
		starship.model.add(propulsor_lower_right);
		starship.model.add(propulsor_lower_left);


		var temporal_intensity=initial_intensity_propulsor;
		while(initial_intensity_propulsor<final_intensity_propulsor){
			temporal_intensity+=25;
			propulsor_upper_right.flame.size = temporal_intensity/1.5;
			propulsor_upper_left.flame.size = temporal_intensity/1.5;
			initial_intensity_propulsor+=1;
		}

		enter.style.display = "none";
		tweenShip = new TWEEN.Tween(posStart)
			.to({z: -35}, 2000)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function() {
				sound_start.play();
				starship.model.position.z = posStart.z;
				if(starship.model.position.z <= -29.3){
					starship.model.remove(propulsor_upper_right);
					starship.model.remove(propulsor_upper_left);
					starship.model.remove(propulsor_lower_right);
					starship.model.remove(propulsor_lower_left);
				}
			})
			.onComplete(function(){
				document.getElementById("worldDiv").style.display = "none";
				TweenMax.set($('.stars'),{opacity:0 });
				TweenMax.staggerTo($('.stars'),5,{opacity:1}, 0.1, start );
				scene.remove(stargate.model);
				scene.remove(starship.model);
				const sleep = (milliseconds) => {
					return new Promise(resolve => setTimeout(resolve, milliseconds))
				}				
				sleep(3000).then(() => {
					scene.add(starship.model);
					starship.model.position.set(0.0, -8.0, 0.0);
					initial_intensity_propulsor=256;
					starship.model.add(propulsor_upper_right);
					starship.model.add(propulsor_upper_left);
					starship.model.add(propulsor_lower_right);
					starship.model.add(propulsor_lower_left);
					clock.start();
				})
			})
			.start();
	}

}

function start(){
	startGame = true;
	entered = true;
	movimento = false;
	reset = false;
	end = false;
	posStart.z = 0;
	addPlanets();
}

function createMoneyAndAsteroid(){
	for (var i = 1; i <= 40; i++){
		if (i % 10 == 0){ //asteroid
			moneys_asteroids[i] = asteroid.clone();
			moneys_asteroids[i].name = "asteroid"+i;
		}
		else{ //moneys
			moneys_asteroids[i] = money.clone();
			moneys_asteroids[i].rotation.x=-1.5;
			moneys_wireframe[i] = money_wireframe.clone();
			moneys_wireframe[i].rotation.x=-1.5;
			moneys_asteroids[i].name = "money"+i;
		}
	}
}

function setMoneys(){
	if (level < 3){
		k = 2;
		beta = 0;
		for (var i = 1; i <= 40; i++){
			if (i % 10 == 0){
				moneys_asteroids[i].position.x = k*beta*Math.cos(beta);
				moneys_asteroids[i].position.y = k*beta*Math.sin(beta) - 7;
				moneys_asteroids[i].position.z = -950-20*i;
			}
			else{
				moneys_asteroids[i].position.x = k*beta*Math.cos(beta);
				moneys_asteroids[i].position.y = k*beta*Math.sin(beta) - 7;
				moneys_asteroids[i].position.z = -950-20*i;
				
				moneys_wireframe[i].position.x = k*beta*Math.cos(beta);
				moneys_wireframe[i].position.y = k*beta*Math.sin(beta) - 7;
				moneys_wireframe[i].position.z = -950-20*i;
				scene.add(moneys_wireframe[i]);
			}
			beta += 0.23;
			scene.add(moneys_asteroids[i]);
		}
	}
}

function animateMoney(){
    if(clock_money.running && clock_money.getElapsedTime() > 5){
        
        for(var i=1; i <= 40; i++){
			if (moneys_asteroids[1].position.z <= -100){
				moneys_asteroids[i].position.z += 2;
			}
            else if(moneys_asteroids[i].position.z <= camera.position.z){
                moneys_asteroids[i].position.z += 0.8;
			}
			else{
				scene.remove(moneys_asteroids[i]);
				if (i == 40){					
					clock_money.stop();
					clock.start();
					arrived = false;
				}
			}
        }
    }
}

function getMoney(){
	if (clock_money.running){
		for (var vertexIndex = 0; vertexIndex < 3; vertexIndex++){		
			var localVertex = starshipBox.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( starshipBox.matrix );
			var directionVector = globalVertex.sub( starshipBox.position );
			
			var ray = new THREE.Raycaster(starshipBox.position.clone(), directionVector.clone().normalize() );
			var intersects = ray.intersectObjects( scene.children, true );
			if( intersects.length > 0 && intersects[0].distance < directionVector.length()) {
				var firstObjIntersected = intersects[0].object;
				for(var i = 1; i <= 40; i++){
					if ( "money"+i === firstObjIntersected.name) {
						scene.remove(moneys_asteroids[i]);
						starship.money += 1;
						return;
					}
					if ( "asteroid"+i === firstObjIntersected.name){
						scene.remove(moneys_asteroids[i]);
						starship.health -= 3;
						if (starship.health <= 0){
							gameOver();
						}
						return;
					}
				}
			}
		}
	}

}

function gameOver(){
	game_over = true;
	while(scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
	gOverElement.style.display = "block";
}

function showImprovements(){
	if (starship.money >= 10){
		improvemnts.style.display = "block";
	}
	else{
		improvemnts.style.display = "none";
	}
}

function restoreHealth(){
	if (starship.money >= 10 && starship.health < 10){
		starship.health = 10;
		starship.money -= 10;
	}
}

function increaseDamage(){
	if (starship.money >= 20*starship.damage*world){
		starship.money -= 20*starship.damage*world;
		starship.damage += 1;
	}
	else{
		document.getElementById("msg").innerHTML = "You need " + 20*starship.damage*world + " money to upgrade!";
		document.getElementById("msg").style.display = "block";
		setTimeout(function(){
			document.getElementById("msg").style.display = "none";
		}, 2000);

	}
}

function updateInfoBar(){
	document.getElementById("healthDiv").innerHTML = starship.health; 
	document.getElementById("damageDiv").innerHTML = starship.damage; 
	document.getElementById("moneysDiv").innerHTML = starship.money;
}

function quitGame(){
	if ( keyboard.pressed("P") ){
		window.location.reload(false); 
	}
}

function resetGame(end){
	if ( (keyboard.pressed("R") && entered) || end){
		reset = true;
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}
		document.getElementById("game_over").style.display = "none";
		clock.stop();
		clock_money.stop();
		planet_clock.stop();
		level = 1;
		posStart = {z : 0};
		startGame = false;
		shooting = false
		canShot = false;
		entered = false;
		movimento = false;
		parti = false;
		fireRate1 = 0;
		fireRate2 = 0;
		setMoneys();
		starship.model.rotation.set(0,0,0);
		starshipBox.rotation.set(0, 0 ,0);
		starship.model.remove(propulsor_upper_right);
		starship.model.remove(propulsor_upper_left);
		starship.model.remove(propulsor_lower_right);
		starship.model.remove(propulsor_lower_left);
		if(!end){
			starship.money = 0;
			starship.health = 10;
			starship.damage = 1;
			world = 1;
		}
		if (sound_scene){
			sound_scene.stop();
		}
		document.getElementById("healthDiv").innerHTML = starship.health; 
		document.getElementById("moneysDiv").innerHTML = starship.money;         
		document.getElementById("damageDiv").innerHTML = starship.damage;         
		document.getElementById("levelDiv").innerHTML = "LEVEL " + level;   
		document.getElementById("worldDiv").innerHTML = "World " + world;
		document.getElementById("worldDiv").style.display = "block";
		enemystarship.enemystarship1.health = 5;
		enemystarship.enemystarship2.health = 5;
		enemystarship.finalenemy.health = 10;
		initGame();
		addToScene();
		addPlanets();
		cancelAnimationFrame( animation ); 
	}

}