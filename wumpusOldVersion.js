var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.image("hunter", "hunter.png");
	game.load.image("mapa", "mapa.png");
	game.load.image('pit', 'pit.png')

	// game.load.spritesheet('dude', 'assets/dude.png', 32, 48);	

}

function create() {


game.stage.backgroundColor = "#7cdce5";

// game.add.sprite(0, 0, 'mapa');
hunter = game.add.sprite(350,game.world.height-300, 'hunter');
pit = game.add.sprite(0,0, 'pit');

game.camera.follow(hunter);

// hunter.enableBody = true;

// hunter.body.bounce.y = 0.2;
// hunter.body.gravity.y = 200;

// player.body.bounce.y = 0.2;
// player.body.gravity.y = 300;
// player.body.collideWorldBounds = true;

// player.animations.add('left', [0, 1, 2, 3], 10, true);
// player.animations.add('right', [5, 6, 7, 8], 10, true);

cursors = game.input.keyboard.createCursorKeys();

}

function update() {
	if (cursors.left.isDown){
		hunter.x -= 4;
	}
	else if (cursors.right.isDown) {
		hunter.x += 4;
	}

	if(cursors.up.isDown) {
		hunter.y -= 4;

	}
	else if (cursors.down.isDown) {
		hunter.y +=4;

	}


}

