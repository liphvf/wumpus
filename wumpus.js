var game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet("hunter", "assets/img/hunter.png", 65, 65);
    game.load.image('pit', 'assets/img/pit.png');
    game.load.image('map', 'assets/img/map.png');
    game.load.image('gold', 'assets/img/gold.png');
    game.load.image('tile', 'assets/img/tile.png');
    game.load.image('wind', 'assets/img/wind.png');
    game.load.image('stench', 'assets/img/stench.png')
    game.load.image('moster', 'assets/img/moster2.png')
    game.load.image('door', 'assets/img/door.png')
    game.load.image('arrow', 'assets/img/arrow.png')

    //Audio
    game.load.audio('coin', 'assets/audio/coin.wav')
    game.load.audio('wind', 'assets/audio/wind.ogg')
    game.load.audio('morte', 'assets/audio/morte.ogg')
    game.load.audio('morteMonstro', 'assets/audio/morteMonstro.ogg')
    game.load.audio('peido', 'assets/audio/peido.ogg')
    game.load.audio('win', 'assets/audio/win.ogg')

};

var hunter;
var tiles;
var cursors;
var pit;
var gold;
var arrowTime = 0;

var arrowDirection;
var arrowshots = 1;

var windTime = 0;

var stenchTime = 0

var getgold;
var getmonster;

winhit = 1;


//variaveis de tempo
var seconds = 0;
var minutes = 0;
// milliseconds = Math.floor(game.time.time) % 100;


//audio var
var coin;
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
game.add.sprite(0, 0, 'map');

//add a soud
// coin = game.add.audio('coin');





//gold start

//Cria um gropo de mostro
goldgroup = game.add.group();
// adiciona física a esse grupo
goldgroup.enableBody = true;


var x = Math.floor(Math.random()*cord.length);
var pitcord = cord[x];

var y = Math.floor(Math.random()*pitcord.length);
var pitcordcolumn = pitcord[y];

var gold = goldgroup.create(pitcordcolumn[0],pitcordcolumn[1], 'gold');
// gold end


//burcado vento start
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


    var pit = pitgroup.create(pitcordcolumn[0],pitcordcolumn[1], 'pit');


        //coloca o vento de cima
        if (typeof cord[x-1] !== 'undefined') {
            var wind = windgroup.create(cord[x-1][y][0], cord[x-1][y][1] ,'wind')
        };

        //esquerdo
        if (typeof cord[y-1] !== 'undefined') {
            var wind = windgroup.create(cord[x][y-1][0], cord[x][y-1][1] ,'wind')
        };

        // //baixo
        if (typeof cord[x+1] !== 'undefined') {
            var wind = windgroup.create(cord[x+1][y][0], cord[x+1][y][1] ,'wind')
        };

        // //direito        
        if (typeof cord[y+1] !== 'undefined') {
            var wind = windgroup.create(cord[x][y+1][0], cord[x][y+1][1] ,'wind')
        };
    
};

//buraco vento end


//Cria um gropo de mostro
mostergroup = game.add.group();
// adiciona física a esse grupo
mostergroup.enableBody = true;

//gropo de fedor
stenchgroup = game.add.group();

//adiciona física
stenchgroup.enableBody = true;


// criando mostro randomico

var x = Math.floor(Math.random()*cord.length)
var pitcord = cord[x];

var y = Math.floor(Math.random()*pitcord.length)
var pitcordcolumn = pitcord[y];

var moster = mostergroup.create(pitcordcolumn[0],pitcordcolumn[1], 'moster');

//coloca o vento de cima
if (typeof cord[x-1] !== 'undefined') {
    var stench = stenchgroup.create(cord[x-1][y][0], cord[x-1][y][1] ,'stench')
};
//esquerdo
if (typeof cord[y-1] !== 'undefined') {
    var stench = stenchgroup.create(cord[x][y-1][0], cord[x][y-1][1] ,'stench')
};

// //baixo
if (typeof cord[x+1] !== 'undefined') {
    var stench = stenchgroup.create(cord[x+1][y][0], cord[x+1][y][1] ,'stench')
};

// //direito        
if (typeof cord[y+1] !== 'undefined') {
    var stench = stenchgroup.create(cord[x][y+1][0], cord[x][y+1][1] ,'stench')
};





//Tiles start
//criou tiles group
tiles = game.add.group();

// habilita a física
tiles.enableBody = true;


doors = game.add.group();

// habilita a física
doors.enableBody = true;

//adiciona ao groupo
var t11 = tiles.create(0,0,'tile');
var t12 = tiles.create(200,0,'tile');
var t13 = tiles.create(400,0,'tile');
// var t14 = tiles.create(600,0,'door');
var door = doors.create(600,0,'door');
// door = game.add.sprite(600,0, 'door');

var t21 = tiles.create(0,200,'tile');
var t22 = tiles.create(200,200,'tile');
var t23 = tiles.create(400,200,'tile');
var t24 = tiles.create(600,200,'tile');

var t31 = tiles.create(0,400,'tile');
var t32 = tiles.create(200,400,'tile');
var t33 = tiles.create(400,400,'tile');
var t34 = tiles.create(600,400,'tile');

var t42 = tiles.create(200,600,'tile');
var t43 = tiles.create(400,600,'tile');
var t44 = tiles.create(600,600,'tile');
// Tiles end

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

//Arrow
arrow = game.add.group();
arrow.enableBody = true;
arrow.physicsBodyType = Phaser.Physics.ARCADE;

for (var i = 0; i < 20; i++)
{
    var arw = arrow.create(0, 0, 'arrow');
    arw.name = 'arrow' + i;
    arw.exists = false;
    arw.visible = false;
    arw.checkWorldBounds = true;
    arw.events.onOutOfBounds.add(resetArrow, this);
}



cursors = game.input.keyboard.createCursorKeys();

};

function update() {

// criar um delay no jogo
minutes = Math.floor(game.time.time / 60000) % 60;
seconds = Math.floor(game.time.time / 1000) % 60;

    // game.physics.arcade.collide(hunter, tiles, huntermove);
    game.physics.arcade.overlap(hunter, tiles, huntermove, null, this);
    game.physics.arcade.overlap(hunter, pitgroup, pitfall);
    game.physics.arcade.overlap(hunter, goldgroup, playgoldsound)
    game.physics.arcade.overlap(hunter, windgroup, windsound)
    game.physics.arcade.overlap(hunter, mostergroup, killhunter)
    game.physics.arcade.overlap(hunter, stenchgroup, playstenchsound)
    game.physics.arcade.overlap(hunter, doors, happyends, null, this)


    game.physics.arcade.overlap(arrow, mostergroup,killmoster, null, this);


function playstenchsound(hunter, stenchgroup) {
    if (game.time.now > stenchTime) {
        game.sound.play('peido')
        // Time = game.time.now + 300;
        stenchTime += 3000

    }
}    

function playgoldsound(hunter, gold) {

    gold.kill()
    getgold = 1
    alert('Parabéns você pegou o ouro')
    game.sound.play('coin')
}

function windsound(hunter, wind) {
    
    if (game.time.now > windTime) {
        game.sound.play('wind')
        // Time = game.time.now + 300;
        windTime += 3000

    }
}

function happyends(hunter, door) {
    if (winhit === 1) {

    var pegou = ''
    var matou = ''
    if (getgold === 1) {
        pegou = 'Pegou o OURO!'
    } 
    if (getmonster ===1) {
        matou =  'Matou o monstro'
    }

    alert('Você ganhou! ' + pegou + matou)
    game.sound.play('win')

    }
    winhit = 0
};

    


function huntermove(hunter, tile) {

    tile.kill()
}


function killmoster (arrow, mostergroup) {
    getmonster = 1
    arrow.kill();
    mostergroup.kill();
    game.sound.play('morteMonstro')

    if(seconds < 3) {

    alert('Matou o Monstro')
    }

}

function killhunter(hunter, mostergroup) {
    hunter.kill()
    game.sound.play('morte')
    if (seconds < 5) {
    var conf =  confirm("Você foi morto pelo Monstro, gostaria de recomeçar?")
    if (conf === true) {
        location.reload(); 
    }
        }
}


function pitfall(hunter, pit) {
    hunter.kill()
    game.sound.play('morte')

    if (seconds < 1) { 

    var conf =  confirm("Caiu no Burraco, gostaria de reiniciar o jogo?")
    if (conf === true) {
        location.reload(); 
    }

    }
}

    //  Reset the players velocity (movement)
    hunter.body.velocity.x = 0;

    if (cursors.left.isDown){
        // hunter.x -= 4;
        hunter.body.velocity.x = -150;
        hunter.animations.play('left');

        arrowDirection = cursors.left.isDown
    }
    else if (cursors.right.isDown) {
        // hunter.x += 4;
        hunter.body.velocity.x = +150;
        hunter.animations.play('right');

        arrowDirection = cursors.right.isDown
    }
     else if(cursors.up.isDown) {

        // timer = game.time.create(1000, false);
        // timer.add(3000);
        // timer.onEvent.add(cursors.up.isDown, this);
        // timer.start();
        
        // function andar(){
        // }
            hunter.y -= 3;

        arrowDirection = cursors.up.isDown

    }
    else if (cursors.down.isDown) {
        hunter.y +=3;

        arrowDirection = cursors.down.isDown
    }
    else {
        hunter.animations.stop();

        hunter.frame = 6;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {

        if (arrowshots === 1) {
        fireArrow();
        }
        arrowshots = arrowshots -1;
        

    }



};


function resetArrow(arrow) {
    arrow.kill();
};

function fireArrow () {

    if (game.time.now > arrowTime)
    {
        arrowhit = arrow.getFirstExists(false);

        // if (arrowhit)
        // {
        //     arrowhit.reset(hunter.x + 6, hunter.y - 8);
        //     arrowhit.body.velocity.y = -100;
        //     Time = game.time.now + 300;

        //     console.log(arrowDirection)
        // }

        if (arrowDirection !== null) {

        if (arrowDirection === cursors.right.isDown) {
            arrowhit.reset(hunter.x + 6, hunter.y - 8);
            arrowhit.body.velocity.x = +100;
            Time = game.time.now + 300;
        } else if (arrowDirection === cursors.left.isDown) {
            arrowhit.reset(hunter.x + 6, hunter.y - 8);
            arrowhit.body.velocity.x = -100;
            Time = game.time.now + 300;
        } else if (arrowDirection === cursors.up.isDown) {
            arrowhit.reset(hunter.x + 6, hunter.y - 8);
            arrowhit.body.velocity.y = -100;
            Time = game.time.now + 300;
        } else if (arrowDirection === cursors.down.isDown) {
            arrowhit.reset(hunter.x + 6, hunter.y - 8);
            arrowhit.body.velocity.y = +100;
            Time = game.time.now + 300;
        }

        }





    }

};