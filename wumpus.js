var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.spritesheet("hunter", "assets/img/hunter.png", 65, 65);
	game.load.image("mapa", "assets/img/mapa.png");
	game.load.image('pit', 'assets/img/pit.png');
	game.load.image('sky', 'assets/img/sky.png');
    game.load.image('ground', 'assets/img/platform.png');
};

var hunter
var platforms
var cursors
var pit

function create() {
// add física
game.physics.startSystem(Phaser.Physics.ARCADE);
game.stage.smoothed = false;
// game.stage.backgroundColor = "#7cdce5";

//backgroud
game.add.sprite(0, 0, 'sky');

//criou platforms group
platforms = game.add.group();

// habilita a física
platforms.enableBody = true;

// define um conjutno de items que vão participar da física
var ground = platforms.create(0, game.world.height - 64, 'ground');

// define a escala
ground.scale.setTo(2, 2);

//set como imutável
ground.body.immovable = true;

// criar um hunter
hunter = game.add.sprite(350,game.world.height-150, 'hunter');

//habilitar física
game.physics.arcade.enable(hunter);

hunter.scale.setTo(2, 2);


hunter.body.bounce.y = 0.2;
hunter.body.gravity.y = 0;
hunter.body.collideWorldBounds = true;

//animation
hunter.animations.add('left', [0, 1, 2, 3, 4,5], 5, true);
hunter.animations.add('right', [7,8,9,10,11,12], 5, true);


pitgroup = game.add.group();

// hunter.scale.setTo(1,1)

// pit = game.add.sprite(0,0, 'pit');

// for (var i = 0; i < 3; i++)
// {

// var listay = [100,200,300,400,500,600,700,800]
// var listax = [100,200,300,400,500,600]


//     //  Create a pit inside of the 'stars' group
//     var pit = pitgroup.create(listay[Math.floor(Math.random()*listay.length)], listax[Math.floor(Math.random()*listay.length)], 'pit');

//      // Let gravity do its thing
//     // pit.body.gravity.y = 300;

// //     //  This just gives each pit a slightly random bounce value
// //     pit.body.bounce.y = 0.7 + Math.random() * 0.2;
// }

game.camera.follow(hunter);

cursors = game.input.keyboard.createCursorKeys();

};

function update() {

	game.physics.arcade.collide(hunter, platforms);
	// game.physics.arcade.overlap(hunter, null, this);

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
	else {
        hunter.animations.stop();

        hunter.frame = 6;
	}

	if(cursors.up.isDown) {
		hunter.y -= 4;

	}
	else if (cursors.down.isDown) {
		hunter.y +=4;
	}


};

