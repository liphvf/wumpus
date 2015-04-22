var game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.spritesheet("hunter", "assets/img/hunter.png", 65, 65);
	game.load.image('pit', 'assets/img/pit.png');
	game.load.image('sky', 'assets/img/sky.png');
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('tile', 'assets/img/tilenew.png');
    game.load.image('wind', 'assets/img/wind.png');

    game.load.tilemap('matching', 'assets/tilemaps/maps/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
};

var hunter;
var tiles;
var cursors;
var pit;
// var cord = [[0,0], [200,0], [400,0], [600,0], [0,200], [200,200], [400,200],[600,200], [0,400], [200,400], [400,400], [600,400], [200,600], [400,600], [600,600]];
var cord = [
[[0,0], [200,0], [400,0], [600,0]],
[[0,200], [200,200], [400,200],[600,200]],
[[0,400], [200,400], [400,400], [600,400]],
[[0,600],[200,600], [400,600], [600,600]]
];

var windcord

function create() {

// add física
game.physics.startSystem(Phaser.Physics.ARCADE);
game.stage.smoothed = false;
// game.stage.backgroundColor = "#7cdce5";

//backgroud
// game.add.sprite(0, 0, 'sky');

//criou tiles group
tiles = game.add.group();

// habilita a física
tiles.enableBody = true;


//adiciona ao groupo
var t11 = tiles.create(0,0,'tile')
var t12 = tiles.create(200,0,'tile')
var t13 = tiles.create(400,0,'tile')
var t14 = tiles.create(600,0,'tile')

var t21 = tiles.create(0,200,'tile')
var t22 = tiles.create(200,200,'tile')
var t23 = tiles.create(400,200,'tile')
var t24 = tiles.create(600,200,'tile')

var t31 = tiles.create(0,400,'tile')
var t32 = tiles.create(200,400,'tile')
var t33 = tiles.create(400,400,'tile')
var t34 = tiles.create(600,400,'tile')

var t42 = tiles.create(200,600,'tile')
var t43 = tiles.create(400,600,'tile')
var t44 = tiles.create(600,600,'tile')


//Cria um gropo de buracos
pitgroup = game.add.group();
// adiciona física a esse grupo
pitgroup.enableBody = true;

//gropo de vendo
windgroup = game.add.group();

//adiciona física
windgroup.enableBody = true;



// criando buracos randomicos
for (var i = 0; i < 3; i++){

	var x = Math.floor(Math.random()*cord.length)
	var pitcord = cord[x];

	var y = Math.floor(Math.random()*pitcord.length)
	var pitcordcolumn = pitcord[y];

	console.log(pitcordcolumn)
	console.log('Inicial X -->' + x)
	console.log('Inicial Y -->' + y)

    var pit = pitgroup.create(pitcordcolumn[0],pitcordcolumn[1], 'pit');

    var windX
    var windY


 		// //coloca o vento de cima
 		// if ( x !== 0) {
 		// 	var wind = pitgroup.create(pitcordcolumn[x-1], pitcordcolumn[y] ,'wind')
 		// 	console.log('X -->' + x-1)
			// console.log('Y -->' + y)
 		// };
 		// //esquerdo
 		// if ( y !== 0) {
 		// 	var wind2 = pitgroup.create(pitcordcolumn[x], pitcordcolumn[y-1] ,'wind')
 		// 	console.log('X -->' + x)
			// console.log('Y -->' + y-1)
 		// };
 		// //baixo
 		// if ( x !== 3) {
 		// 	var wind3 = pitgroup.create(pitcordcolumn[x+1], pitcordcolumn[y] ,'wind')
 		// 	console.log('X -->' + x+1)
			// console.log('Y -->' + y)
 		// };
 		// //direito
 		// if ( y !== 3) {
 		// 	var wind4 = pitgroup.create(pitcordcolumn[x], pitcordcolumn[y+1] ,'wind')
 		// 	console.log('X -->' + x)
			// console.log('Y -->' + y+1)
 		// };
 		// console.debug(pitcordcolumn[10])	

 		//coloca o vento de cima
 		if (typeof cord[x-1] !== 'undefined') {
 			xx = x-1
 			var wind = pitgroup.create(cord[x-1][y][0], cord[x-1][y][1] ,'wind')
 			console.log('X -->' + xx)
			console.log('Y -->' + y)
 		};
 		//esquerdo
 		// if (typeof pitcordcolumn[y-1] !== 'undefined') {
 		// 	var wind2 = pitgroup.create(pitcordcolumn[x], pitcordcolumn[y-1] ,'wind')
 		// 	// console.log('X -->' + x)
			// // console.log('Y -->' + y-1)
 		// };
 		// //baixo
 		// if (typeof pitcordcolumn[x+1] !== 'undefined') {
 		// 	var wind3 = pitgroup.create(pitcordcolumn[x+1], pitcordcolumn[y] ,'wind')
 		// 	// console.log('X -->' + x+1)
			// // console.log('Y -->' + y)
 		// };
 		// //direito
 		// if (typeof pitcordcolumn[y+1] !== 'undefined') {
 		// 	var wind4 = pitgroup.create(pitcordcolumn[x], pitcordcolumn[y+1] ,'wind')
 		// 	// console.log('X -->' + x)
			// // console.log('Y -->' + y+1)
 		// };


 	
};
// criar um hunter
hunter = game.add.sprite(0,game.world.height-150, 'hunter');

//habilitar física
game.physics.arcade.enable(hunter);

hunter.scale.setTo(2, 2);

hunter.body.bounce.y = 0.2;
hunter.body.gravity.y = 0;
hunter.body.collideWorldBounds = true;

//animation
hunter.animations.add('left', [0, 1, 2, 3, 4,5], 5, true);
hunter.animations.add('right', [7,8,9,10,11,12], 5, true);


game.camera.follow(hunter);

cursors = game.input.keyboard.createCursorKeys();

};

function update() {

	// game.physics.arcade.collide(hunter, tiles, huntermove);
	game.physics.arcade.overlap(hunter, tiles, huntermove, null, this);
	game.physics.arcade.overlap(hunter, pitgroup, pitfall);

function huntermove(hunter, tile) {

	tile.kill()
}

function pitfall(hunter, pit) {
	hunter.kill()
	var conf = 	confirm("Caiu no Burraco, gostaria de reiniciar o jogo?")
	if (conf === true) {
		location.reload(); 
	}
}

    //  Reset the players velocity (movement)
    hunter.body.velocity.x = 0;

	if (cursors.left.isDown){
		// hunter.x -= 4;
		hunter.body.velocity.x = -150;
		hunter.animations.play('left');
	}
	else if (cursors.right.isDown) {
		// hunter.x += 4;
		hunter.body.velocity.x = +150;
		hunter.animations.play('right');
	}
	 else if(cursors.up.isDown) {
		hunter.y -= 4;

	}
	else if (cursors.down.isDown) {
		hunter.y +=4;
	}
	else {
        hunter.animations.stop();

        hunter.frame = 6;
	}




};

