var container;
var animation;
//SETTING UP CAMERA

var camera;
var fovy = 60;
var near = 0.1;
var far = 1000;
var reset = false;

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
var startGame = false;
var entered = false;
var posStart = {z : 0};
var posEnd = -10;
var tweenShip;
var game_over;
var gOverElement = document.getElementById("game_over");
var warning = document.getElementById("warning");
var enter = document.getElementById("hint");
var improvemnts = document.getElementById("improvements");

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
var loader = new THREE.TextureLoader();
var planet_clock;

var planet_position=[[20,10,-1300],[-20,-10,-1300],[-20,10,-1300],[20,-10,-1300],[-10,0,-1300],[10,0,-1300]];
shuffle(planet_position,6);

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
var moneys_asteroidsBox = [];
var money;
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
		appeared: false,
		health: 3
	},
	enemystarship2: {
		model:null, 
		name:"enemystarship2",
		appeared: false,
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
		appeared: false,
		health: 3
	}
}


//
//PLANETS
//
var pointLight;
var segmenti_pianeta = 48;

var texture_planets=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg","./images/8.jpg","./images/9.jpg","./images/10.jpg","./images/11.jpg","./images/12.jpg",
			 "./images/13.jpg","./images/14.jpg","./images/15.jpg","./images/16.jpg",
			 "./images/17.jpg","./images/18.png","./images/19.png","./images/20.png","./images/21.png","./images/22.png","./images/23.jpg","./images/24.jpg","./images/25.jpg","./images/26.jpg"];
var planets_dimensions=[15,14,13,12,11];

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
shuffle(texture_planets,26);
shuffle(planets_dimensions,6);

var pianeta1_data = constructPlanetData(0.03, (0,0,20), "pianeta1", texture_planets[0], planets_dimensions[0], segmenti_pianeta);
var pianeta2_data = constructPlanetData(0.025, (15,15,20), "pianeta2", texture_planets[1], planets_dimensions[1], segmenti_pianeta);
var pianeta3_data = constructPlanetData(0.03, (15,15,20), "pianeta3", texture_planets[2], planets_dimensions[2], segmenti_pianeta);
var pianeta4_data = constructPlanetData(0.025, (-15,-15,-20), "pianeta4", texture_planets[3], planets_dimensions[3], segmenti_pianeta);
var pianeta5_data = constructPlanetData(0.03, (15,15,20), "pianeta5", texture_planets[4], planets_dimensions[4], segmenti_pianeta);
var pianeta6_data = constructPlanetData(0.025, (0,0,0), "pianeta6", texture_planets[5], planets_dimensions[5], segmenti_pianeta);
var pianeta7_data = constructPlanetData(0.03, (0,0,20), "pianeta7", texture_planets[6], planets_dimensions[0], segmenti_pianeta);
var pianeta8_data = constructPlanetData(0.025, (15,15,20), "pianeta8", texture_planets[7], planets_dimensions[1], segmenti_pianeta);
var pianeta9_data = constructPlanetData(0.03, (15,15,20), "pianeta9", texture_planets[8], planets_dimensions[2], segmenti_pianeta);
var pianeta10_data = constructPlanetData(0.025, (-15,-15,-20), "pianeta10", texture_planets[9], planets_dimensions[3], segmenti_pianeta);
var pianeta11_data = constructPlanetData(0.03, (15,15,20), "pianeta11", texture_planets[10], planets_dimensions[4], segmenti_pianeta);
var pianeta12_data = constructPlanetData(0.025, (0,0,0), "pianeta12", texture_planets[11], planets_dimensions[5], segmenti_pianeta);

shuffle(texture_planets);
shuffle(planets_dimensions);

function rotazione_pianeta(pianeta, myData) {
    if(myData.name=='pianeta1'){
        pianeta.rotation.y += myData.rotationRate*1.5;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta2'){
        pianeta.rotation.y += myData.rotationRate*1.5;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta3'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta4'){
        pianeta.rotation.y += myData.rotationRate*1.8;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta5'){
        pianeta.rotation.y += myData.rotationRate*1.6;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
    if(myData.name=='pianeta6'){
        pianeta.rotation.y += myData.rotationRate*1.5;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta7'){
        pianeta.rotation.y += myData.rotationRate*1.1;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta8'){
        pianeta.rotation.y += myData.rotationRate*1.2;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta9'){
        pianeta.rotation.y += myData.rotationRate*1.5;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta10'){
        pianeta.rotation.y += myData.rotationRate*1.5;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta11'){
        pianeta.rotation.y += myData.rotationRate*1.3;
        pianeta.rotation.x += (myData.rotationRate)/3;
	}
	if(myData.name=='pianeta12'){
        pianeta.rotation.y += myData.rotationRate;
        pianeta.rotation.x += (myData.rotationRate)/3;
    }
}


function movimento_pianeta(pianeta,myData){
    
    if(pianeta.position.z< camera.position.z){
		pianeta.position.z +=2.5;
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
gOverElement.style.display = "none";
warning.style.display = "none";
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
			starshipBox.position.set(0.0, -8.0, 2.0);	
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
			enemystarship.enemystarship1.model.position.set(-5.0, 0.0, -1000.0);	
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
			enemystarship.enemystarship2.model.position.set(5.0, 0.0, -1010.0);	

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

	
	//PLANETS MOVEMENT
	pianeta1 = loadTexturedPlanet(pianeta1_data, 220, 80, -400, 0);
	pianeta2 = loadTexturedPlanet(pianeta2_data, -205, -20, -500, 0);
	pianeta3 = loadTexturedPlanet(pianeta3_data, -280, -90, -200, 0);
	pianeta4 = loadTexturedPlanet(pianeta4_data, 230, -70, -100, 0);
	pianeta5 = loadTexturedPlanet(pianeta5_data, -215, 100, -300, 0);
	pianeta6 = loadTexturedPlanet(pianeta6_data, 185, -100, -100, 0);
	pianeta7 = loadTexturedPlanet(pianeta7_data, 40, 95, -200, 0);
	pianeta8 = loadTexturedPlanet(pianeta8_data, -40, -65, -800, 0);
	pianeta9 = loadTexturedPlanet(pianeta9_data, 90, -25, -200, 0);
	pianeta10 = loadTexturedPlanet(pianeta10_data, -90, 75, -1100, 0);
	pianeta11 = loadTexturedPlanet(pianeta11_data, -75, -50, -10, 0);
	pianeta12 = loadTexturedPlanet(pianeta12_data, -100, -50, -90, 0);

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
			enemystarship.finalenemy.model.position.set(0.0, 2.0, -1040.0);	

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

	var stargate_obj_loader = new THREE.OBJLoader(loadManager);
	var stargate_mtlLoader = new THREE.MTLLoader(loadManager);
	material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/portal/mqdefault.jpg') } );
	material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('models/portal/GateMisc.jpg') } );
		

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

	var money_loader = new THREE.OBJLoader(loadManager);
    var money_mtlLoader = new THREE.MTLLoader(loadManager);
	var asteroid_loader = new THREE.TextureLoader();

	money_mtlLoader.load('models/money/money.mtl', (materials) => {
        materials.preload();
        money_loader.setMaterials(materials);
        money_loader.load('models/money/money.obj', (object) => {
			object.rotation.y= 1.5;
			money = object.clone();
			asteroid_loader.load( './images/5.jpg', function ( texture ) {
				var geometry = new THREE.SphereGeometry( 1, 7, 7 );
				var material = new THREE.MeshBasicMaterial( { map: texture} );
				asteroid = new THREE.Mesh( geometry, material );
				createMoneyAndAsteroid();
				setMoneys();				
			} );
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

	enter.style.display = "block";
	
	
}

function planets_respawn(){
	movimento_pianeta(pianeta1,pianeta1_data);
	movimento_pianeta(pianeta2,pianeta2_data);
	movimento_pianeta(pianeta3,pianeta3_data);
	movimento_pianeta(pianeta4,pianeta4_data);
	movimento_pianeta(pianeta5,pianeta5_data);
	movimento_pianeta(pianeta6,pianeta6_data);
	movimento_pianeta(pianeta7,pianeta7_data);
	movimento_pianeta(pianeta8,pianeta8_data);
	movimento_pianeta(pianeta9,pianeta9_data);
	movimento_pianeta(pianeta10,pianeta10_data);
	movimento_pianeta(pianeta11,pianeta11_data);
	movimento_pianeta(pianeta12,pianeta12_data);

	rotazione_pianeta(pianeta1,pianeta1_data);
	rotazione_pianeta(pianeta2,pianeta2_data);
	rotazione_pianeta(pianeta3,pianeta3_data);
	rotazione_pianeta(pianeta4,pianeta4_data);
	rotazione_pianeta(pianeta5,pianeta5_data);
	rotazione_pianeta(pianeta6,pianeta6_data);
	rotazione_pianeta(pianeta7,pianeta7_data);
	rotazione_pianeta(pianeta8,pianeta8_data);
	rotazione_pianeta(pianeta9,pianeta9_data);
	rotazione_pianeta(pianeta10,pianeta10_data);
	rotazione_pianeta(pianeta11,pianeta11_data);
	rotazione_pianeta(pianeta12,pianeta12_data);
	var roundednumber=Math.round(planet_clock.getElapsedTime());
	var starting_position_planets=	[[80, 70, -1300],[127, 107, -1300],[-200, -104, -1300],[-110, -114, -1300],[-129, 116, -1300],[-79, 89, -1300],
	[120, -100, -1300],[113, -115, -1300], [-110, 110, -1300],[-104, 130, -1300],[110, -123, -1300],[118, 84, -1300],[-110, 100, -1300],[-80, -105, -1300],[89,-95, -1300],[-140,105 , -1300],[-100,80 , -1300],[-75,-95 , -1300]
	,[90,-95 , -1300],[-80,85 , -1300],[-100,100 , -1300],[87,-100 , -1300],[90,-82 , -1300],[110,-90 , -1300],[120,52 , -1300],[-120,-125 , -1300]];
	//console.log(roundednumber);
	shuffle(starting_position_planets,6);
	var x=starting_position_planets[0];
	var y=starting_position_planets[0];
	//console.log(starting_position_planets[0]);
	if(roundednumber % 2 ==0){
		if(pianeta1.position.z >= camera.position.z){
			pianeta1.position.set(x[0],x[1],x[2]);			
			shuffle(starting_position_planets,6);
			x=starting_position_planets[0];
			scene.add(pianeta1);
		}
		if(pianeta12.position.z >= camera.position.z){
			pianeta12.position.set(y[0],y[1],y[2]);		
			shuffle(starting_position_planets,14);
			y=starting_position_planets[0];
			scene.add(pianeta12);
		}
	}
	
	if(roundednumber % 3 ==0){
		if(pianeta2.position.z >= camera.position.z){
			pianeta2.position.set(x[0],x[1],x[2]);						
			shuffle(starting_position_planets,6);
			x=starting_position_planets[0];
			scene.add(pianeta2);
		}
		if(pianeta11.position.z >= camera.position.z){
			pianeta11.position.set(y[0],y[1],y[2]);			
			shuffle(starting_position_planets,14);
			y=starting_position_planets[0];
			scene.add(pianeta11);
		}
	}
	if(roundednumber % 4 ==0){
		if(pianeta3.position.z >= camera.position.z){
			pianeta3.position.set(x[0],x[1],x[2]);						
			shuffle(starting_position_planets,6);
			x=starting_position_planets[0];
			scene.add(pianeta3);
		}
		if(pianeta10.position.z >= camera.position.z){
			pianeta10.position.set(y[0],y[1],y[2]);				
			shuffle(starting_position_planets,14);
			y=starting_position_planets[0];
			scene.add(pianeta10);
		}
	}
	if(roundednumber % 6 ==0){
		if(pianeta4.position.z >= camera.position.z){
			pianeta4.position.set(x[0],x[1],x[2]);		
			shuffle(starting_position_planets,6);
			x=starting_position_planets[0];
			scene.add(pianeta4);
		}
		if(pianeta9.position.z >= camera.position.z){
			pianeta9.position.set(y[0],y[1],y[2]);		
			shuffle(starting_position_planets,14);
			y=starting_position_planets[0];
			scene.add(pianeta9);
		}
	}
}

function animateEnemy(){
	if (enemystarship.enemystarship1.health > 0 && enemystarship.enemystarship1.appeared == true){
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
	if (enemystarship.enemystarship2.health > 0 && enemystarship.enemystarship2.appeared == true){
		var y_pos = enemystarship.enemystarship2.model.position.y;	//0.0
		var x_pos = enemystarship.enemystarship2.model.position.x; //0.0
		enemystarship.enemystarship2.model.position.x += x_step[2];
		enemystarship.enemystarship2.model.position.y += y_step[2];
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
	if (enemystarship.finalenemy.health > 0 && enemystarship.finalenemy.appeared == true){
		var axis = new THREE.Vector3(0, 0, 1);
		enemystarship.finalenemy.model.rotateOnAxis(axis, 0.05);
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
	}
}

function setStarshipRotation(){
	if (movimento==false){
		if(starship.model.rotation.x>0){
			starship.model.rotation.x-=0.1
		}
		if(starship.model.rotation.x<0){
			starship.model.rotation.x+=0.1
		}
		if(starship.model.rotation.y>0){
			starship.model.rotation.y-=0.1
		}
		if(starship.model.rotation.y<0){
			starship.model.rotation.y+=0.1
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
	starship.model.position.z = 0;
	if (enemystarship.enemystarship1.model.position.z >= -70 && !enemystarship.enemystarship1.appeared && starship.model.getObjectByName("LeftWingBottom.001").rotation.z < 1 ){
		rotateWings("open");
	}
	if (enemystarship.enemystarship1.health <= 0 && level == 2 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		rotateWings("close");
	}
	if (enemystarship.enemystarship1.health && enemystarship.enemystarship2.health <= 0 && level == 3 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		rotateWings("close");
	}
	if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0 && enemystarship.finalenemy.health <= 0 && level == 4 && starship.model.getObjectByName("LeftWingBottom.001").rotation.z > 0 ){
		rotateWings("close");
	}
	quitGame();
	if (!reset){
		resetGame();
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
					propulsor_lower_left.position.x += 0.00060;
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
			enemystarship.enemystarship1.health = 3;
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
			enemystarship.enemystarship1.health = 3;
			enemystarship.enemystarship2.health = 3;
		}

	}
	if (clock.running && level == 4){
		clock.stop()
	}
}


function destroyEnemy( event ) {
	if (canShot){
		vec= new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	 
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
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

		


		var bullet_dx = new THREE.Mesh(
			new THREE.SphereGeometry(0.2, 0.2,20),
			new THREE.MeshBasicMaterial({color:0x00FF00})
		);
		
		bullet_dx.position.set(x1,x2,x3);


		var dir = new THREE.Vector3();
		var starship_pos = bullet_dx.position;
		var enemy_pos =position;
		dir.subVectors(enemy_pos,starship_pos).normalize();


		bullet_dx.velocity = dir;
		//console.log("s",bullet_dx)
		bullet_dx.alive = true;
		setTimeout(function(){
			hitShot(mouse.x,mouse.y);
			bullet_dx.alive = false;
			scene.remove(bullet_dx);
		}, 300);


		bullets.push(bullet_dx);
		scene.add(bullet_dx);
		
		var bullet_dx1 = new THREE.Mesh(
			new THREE.SphereGeometry(0.2, 0.2, 20),
			new THREE.MeshBasicMaterial({color:	0x00FF00})
		);
		
		bullet_dx1.position.set(x11,x22,x33);


		var dir = new THREE.Vector3();
		var starship_pos = bullet_dx1.position;
		var enemy_pos =position;
		dir.subVectors(enemy_pos,starship_pos).normalize();



		bullet_dx1.velocity = dir;
		bullet_dx1.alive = true;
		setTimeout(function(){
			bullet_dx1.alive = false;
			scene.remove(bullet_dx1);
			hitShot(event);
		}, 300);
		
		bullets.push(bullet_dx1);
		scene.add(bullet_dx1);	
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
					console.log(firstObjIntersected);
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
					}
					else{
						loadDamagedFinalShip(enemystarship.finalenemy.model, enemystarship.finalenemy.health);
					}
				}
				if (enemystarship.enemystarship1.health <= 0 && enemystarship.enemystarship2.health <= 0 && enemystarship.finalenemy.health <= 0){
					clock.start();
					shooting = false;
					level = 4;
				}
			}
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		if( intersects.length > 0 ) {
			var firstObjIntersected = intersects[0].object;
			//var planet_list=["pianeta1","pianeta2","pianeta3","pianeta4","pianeta5","pianeta6","pianeta7","pianeta8","pianeta9","pianeta10","pianeta11","pianeta12",];
			console.log(firstObjIntersected.name);
			switch (firstObjIntersected.name) {
				case "pianeta1":
					parts.push(new explode_planet(pianeta1,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta1,2));
					}, 180);
					pianeta1.position.z= camera.position.z+1;
					break;
				case "pianeta2":
					parts.push(new explode_planet(pianeta2,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta2,2));
					}, 180);
					pianeta2.position.z= camera.position.z+2;
					break;
				case "pianeta3":
					parts.push(new explode_planet(pianeta3,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta3,2));
					}, 180);
					pianeta3.position.z= camera.position.z+3;
					break;
				case "pianeta4":
					parts.push(new explode_planet(pianeta4,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta4,2));
					}, 180);
					pianeta4.position.z= camera.position.z+4;
					break;
				case "pianeta5":
					parts.push(new explode_planet(pianeta5,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta5,2));
					}, 180);
					pianeta5.position.z= camera.position.z+5;
					break;
				case "pianeta6":
					parts.push(new explode_planet(pianeta6,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta6,2));
					}, 180);
					pianeta6.position.z= camera.position.z+1;
					break;
				case "pianeta7":
					parts.push(new explode_planet(pianeta7,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta7,2));
					}, 180);
					pianeta7.position.z= camera.position.z+2;
					break;
				case "pianeta8":
					parts.push(new explode_planet(pianeta8,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta8,2));
					}, 180);
					pianeta8.position.z= camera.position.z+3;
					break;
				case "pianeta9":
					parts.push(new explode_planet(pianeta9,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta9,2));
					}, 180);
					pianeta9.position.z= camera.position.z+4;
					break;
				case "pianeta10":
					parts.push(new explode_planet(pianeta10,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta10,2));
					}, 180);
					pianeta10.position.z= camera.position.z+5;
					break;
				case "pianeta11":
					parts.push(new explode_planet(pianeta11,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta11,2));
					}, 180);
					pianeta11.position.z= camera.position.z+1;
					break;
				case "pianeta12":
					parts.push(new explode_planet(pianeta12,1));
					setTimeout(function() {
						parts.push(new explode_planet(pianeta12,2));
					}, 180);
					pianeta12.position.z= camera.position.z+5;
					break;
			}
			
		}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
}


function enemyShot(obj){
	var enemy_pos = obj.position.clone();
	var starship_pos = starship.model.position.clone();
	var dir = new THREE.Vector3();
	dir.sub(starship_pos, enemy_pos).normalize();
	var bullet = new THREE.Mesh(
		new THREE.SphereGeometry(0.2, 0.2, 20),
		new THREE.MeshBasicMaterial({color:0xF62817})
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
		if (shooting && enemystarship.enemystarship1.health > 0){	//when an enemy is hit, it starts to shot you
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
				starship.health -= 1;
				scene.remove(curr_bullet1);
				curr_bullet1 = undefined;
				if (starship.health == 0){
					scene.remove(starship.model);	
					canShot = false;
					gameOver();
				}
				return;
			}
		}
	}

	if (fireRate2 % 100 == 0){
		if (shooting && enemystarship.enemystarship2.health > 0 && level >= 2){	//when an enemy is hit, it starts to shot you
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
				starship.health -= 1;
				scene.remove(curr_bullet2);
				curr_bullet2 = undefined;
				if (starship.health == 0){
					scene.remove(starship.model);	
					canShot = false;
					gameOver();
				}
				return;
			}
		}
	}
	if (fireRate2 % 20 == 0){
		if (shooting && enemystarship.finalenemy.health > 0 && level == 3){	//when an enemy is hit, it starts to shot you
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
					if (starship.health == 0){
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
	if ( keyboard.pressed("D") && starship.model.position.x < window.innerWidth/42){
		starship.model.translateX(x_step[0]);
		starshipBox.translateX(x_step[0]);
		starship.model.rotation.z= -z_rotate;
		starshipBox.rotation.z= -z_rotate;
		document.addEventListener( "mousemove", mouseMove, false );
	}
	if ( keyboard.pressed("A") && starship.model.position.x > -window.innerWidth/42){
		starship.model.translateX(-x_step[0]);
		starshipBox.translateX(-x_step[0]);
		starship.model.rotation.z= z_rotate;
		starshipBox.rotation.z= z_rotate;
		document.addEventListener( "mousemove", mouseMove, false );
	}
	if ( keyboard.pressed("W") && starship.model.position.y < window.innerHeight/42){
		starship.model.translateY(y_step[0]);
		starshipBox.translateY(y_step[0]);
		starship.model.rotation.x= -x_rotate;
		starshipBox.rotation.x= -x_rotate;
		document.addEventListener( "mousemove", mouseMove, false );

	}
	if ( keyboard.pressed("S") && starship.model.position.y > -window.innerHeight/42){
		starship.model.translateY(-y_step[0]);
		starshipBox.translateY(-y_step[0]);
		starship.model.rotation.x= x_rotate;
		starshipBox.rotation.x= x_rotate;
		document.addEventListener( "mousemove", mouseMove, false );
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
	if (health == 2){
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
	if (health == 2){
		obj = enemystarship.damagedfinalship1.model.clone();
	}
	else if (health == 1){
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
				starship.model.position.z = posStart.z;
				if(starship.model.position.z <= -29){
					starship.model.remove(propulsor_upper_right);
					starship.model.remove(propulsor_upper_left);
					starship.model.remove(propulsor_lower_right);
					starship.model.remove(propulsor_lower_left);
				}
			})
			.onComplete(function(){
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
	reset = false;
}

function createMoneyAndAsteroid(){
	for (var i = 1; i <= 40; i++){
		if (i % 10 == 0){ //asteroid
			moneys_asteroids[i] = asteroid.clone();
			moneys_asteroids[i].name = "asteroid"+i;
		}
		else{ //moneys
			moneys_asteroids[i] = money.clone();
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
				moneys_asteroids[i].position.y = k*beta*Math.sin(beta) - 4;
				moneys_asteroids[i].position.z = -950-20*i;
			}
			else{
				moneys_asteroids[i].position.x = k*beta*Math.cos(beta);
				moneys_asteroids[i].position.y = k*beta*Math.sin(beta) - 5.5;
				moneys_asteroids[i].position.z = -950-20*i;
			}
			beta += 0.25;
			if (beta >= 5){
				beta = -beta;
			}
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
                moneys_asteroids[i].position.z += 0.75;
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
		for (var vertexIndex = 0; vertexIndex < 2; vertexIndex++){		
			var localVertex = starshipBox.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( starshipBox.matrix );
			var directionVector = globalVertex.sub( starshipBox.position );
			
			var ray = new THREE.Raycaster( starshipBox.position.clone(), directionVector.clone().normalize() );
			var intersects = ray.intersectObjects( scene.children, true );
			if( intersects.length > 0 && intersects[0].distance < directionVector.length()) {
				var firstObjIntersected = intersects[0].object;
				for(var i = 1; i <= 40; i++){
					if ( "money"+i === firstObjIntersected.parent.name) {
						scene.remove(moneys_asteroids[i]);
						starship.money += 1;
						return;
					}
					if ( "asteroid"+i === firstObjIntersected.name){
						scene.remove(moneys_asteroids[i]);
						starship.health -= 3;
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
	starship.health = 10;
	starship.money -= 10;
}

function increaseDamage(){
	if (starship.money >= 10*starship.damage){
		starship.money -= 10*starship.damage;
		starship.damage += 1;
	}
	else{
		document.getElementById("msg").innerHTML = "You need " + 10*starship.damage + " money to upgrade!";
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
	if ( keyboard.pressed("Q") ){
		window.location.reload(false); 
	}
}

function resetGame(){
	if ( keyboard.pressed("R") && entered){
		reset = true;
		
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}
		pianeta1.position.z =  -1300;
		pianeta2.position.z =  -1300;
		pianeta3.position.z =  -1300;
		pianeta4.position.z =  -1300;
		pianeta5.position.z =  -1300;
		pianeta6.position.z =  -1300;
		pianeta7.position.z =  -1300;
		pianeta8.position.z =  -1300;
		pianeta9.position.z =  -1300;
		pianeta10.position.z = -1300;
		pianeta11.position.z = -1300;
		pianeta12.position.z = -1300;
		scene.add(pianeta1);
		scene.add(pianeta2);
		scene.add(pianeta3);
		scene.add(pianeta4);
		scene.add(pianeta5);
		scene.add(pianeta6);
		scene.add(pianeta7);
		scene.add(pianeta8);
		scene.add(pianeta9);
		scene.add(pianeta10);
		scene.add(pianeta11);
		scene.add(pianeta12);
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
		fireRate1 = 0;
		fireRate2 = 0;
		setMoneys();
		starship.money = 0;
		starship.health = 10;
		starship.damage = 1;
		enemystarship.enemystarship1.health = 3;
		enemystarship.enemystarship2.health = 3;
		enemystarship.finalenemy.health = 3;
		initGame();
		addToScene();
		cancelAnimationFrame( animation ); 
	}

}