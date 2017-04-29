
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Multithreads', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background', 'assets/back2.png');
    game.load.image('atm', 'assets/atm.png');
	game.load.image('bank','assets/bank.png');
	 game.load.spritesheet('thiefmoney', 'assets/thiefmoney.png', 50, 120, 5);
	 game.load.spritesheet('thief', 'assets/thief.png', 50, 120, 5);
	 game.load.spritesheet('business', 'assets/leftright.png', 30, 65);
	 game.load.spritesheet('businessmoney', 'assets/moneyman.png', 30, 65, 7);
	 game.load.image('ground', 'assets/platform.png');
	// game.load.image('menu', 'assets/blackbox.png', 360, 200);
	  game.load.spritesheet('dieRight', 'assets/die_right.png', 32, 64);
	  game.load.spritesheet('dieLeft', 'assets/die_left.png', 32, 64);
	  game.load.spritesheet('shootLeft', 'assets/shoot_left.png', 32, 64);
	  game.load.spritesheet('shootRight', 'assets/shoot_right.png', 32, 64);
	game.load.image('bullet', 'assets/bullet.png');

}


var bullet;
var player1;
var player2;
var platforms;
var atms;
var cursors;
var Akey;
var Wkey;
var Skey;
var Dkey;
var balance = 0;
var balanceText;
var prevShot = 0;



//Timer
var timer;
var timeLeft = 32;
var timerText = 0;

function create() {
	
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple sbackground for our game
   // game.add.sprite(0, 0, 'background');
	back2 = game.add.tileSprite(0, 0, 800, 600, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
	atms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
	atms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game  
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(600, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 400, 'ground');
    ledge.body.immovable = true;
	
	var atm = atms.create(game.world.width - 180, 140, 'atm');
	var bank = atms.create(0, 140, 'atm');
	var realBank = atms.create(350, 0, 'bank');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    atm.scale.setTo(2, 2);
	bank.scale.setTo(2, 2);
	realBank.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    atm.body.immovable = true;
	bank.body.immovable = true;
	realBank.body.immovable = true;

    // The player and its settings
    player1 = game.add.sprite(32, game.world.height - 150, 'business');
	player2 = game.add.sprite(650, game.world.height - 150, 'businessmoney');
	//player1.frame = 1;
	//player2.frame = 1;

    //  We need to enable physics on the players
    game.physics.arcade.enable(player1);
	game.physics.arcade.enable(player2);

    //  Player1 physics properties. Give the little guy a slight bounce.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;

     // Our animations
	player1.animations.add('left', [4, 5, 6, 7], 7, true);
	player1.animations.add('right', [0, 1, 2, 3], 7, true); 
	player1.animations.add('shootLeft', [0, 1, 2], 2, true);
	player1.animations.add('shootRight', [0, 1, 2], 2, true); 
	player1.animations.add('dieLeft', [0], 0, true);
	player1.animations.add('dieRight', [0], 0, true); 
	
	
	 // Player2 physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    //  Our animations
	player2.animations.add('left', [4, 5, 6, 7], 7, true);
	player2.animations.add('right', [0, 1, 2, 3], 7, true); 
	player2.animations.add('shootLeft', [0, 1, 2], 2, true);
	player2.animations.add('shootRight', [0, 1, 2], 2, true); 
	player2.animations.add('dieLeft', [0], 0, true);
	player2.animations.add('dieRight', [0], 0, true); 
 


    //  The score
    balanceText = game.add.text(16, 16, 'balance: 0', { fontSize: '32px', fill: '#000' });
	
	//The Time left
	//timerText = game.add.text(670, 13, 'Time: 32', { fontSize: '32px', fill: '#000' });
	//timer = game.time.create(false);
	//timer.loop(1000, updateTimer, this);
	//timer.start();
	

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
	Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		game.physics.arcade.overlap(player1, bullet, killPlayer1, null, this);
		game.physics.arcade.overlap(player2, bullet, killPlayer2, null, this);
	
}






function update() {

    //  Collide the player and the homework with the platforms
    game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);
  

   

	// CHANGE: tests
	//game.physics.arcade.overlap(player, aTest, collectTest, null, this);
      player1.body.velocity.x = 0;
	   player2.body.velocity.x = 0;
	
	 if (cursors.left.isDown)
    {
        //  Move to the left
        player1.body.velocity.x = -300;

        player1.animations.play('left');
		//back2.tilePosition.x+= 5;
    }
	 if (cursors.down.isDown && (prevShot+.5 < this.game.time.totalElapsedSeconds())) {
		p1ShootRight();
		prevShot = this.game.time.totalElapsedSeconds();
	}
		player1.animations.play('shootRight');
        //  shoot to the right
        p1ShootRight();
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player1.body.velocity.x = 300;

       player1.animations.play('right');
		//back2.tilePosition.x-=5;
    }
    else
    {
        //  Stand still
        //player1.animations.stop();

        player1.frame = 2;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player1.body.touching.down)
    {
        player1.body.velocity.y = -400;
    }
	
     if (Akey.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -300;
		player2.animations.play('left');
        
		//back2.tilePosition.x+= 5;
    }
    else if (Dkey.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 300;

       player2.animations.play('right');
		//back2.tilePosition.x-=5;
    }
    else
    {
        //  Stand still
        //player1.animations.stop();

        player2.frame = 2;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (Wkey.isDown && player2.body.touching.down)
    {
        player2.body.velocity.y = -400;
    }
}



function killPlayer1(bullet)
{
	//play kill animation
	if (player2.x < player1.x)
	{
		player1.animations.play('dieRight');
	}
	if (player2.x > player1.x)
	{
		player1.animations.play('dieLeft');
	}

	
	
	//respawn player
	player1 = game.add.sprite(32, game.world.height - 150, 'business');
	 game.physics.arcade.enable(player1);
	 player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;
}

	
	   
	
	  
	  
function killPlayer2(bullet)
{
	//play kill animation
	if (player1.x < player2.x)
	{
		player2.animations.play('dieRight');
	}
	if (player1.x > player2.x)
	{
		player2.animations.play('dieLeft');
	}
	try {
		bullet.kill();
		player2.kill();
	}
	catch (err)
	{
		
	}
	//respawn player
	player2 = game.add.sprite(650, game.world.height - 150, 'businessmoney');
	game.physics.arcade.enable(player2);
	player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;
}
function p1ShootLeft()
{
	//play shoot animation]
	bullet = game.add.sprite(player1.x, player1.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.body.velocity.x = -400;
	game.physics.arcade.collide(bullet, player2);
}

function p1ShootRight()
{
	//play shoot animation]
	bullet = game.add.sprite(player1.x+30, player1.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.body.velocity.x = 400;
	game.physics.arcade.collide(bullet, player2);
}

function p2ShootLeft()
{
	//play shoot animation]
	bullet = game.add.sprite(player2.x, player1.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.body.velocity.x = -400;
	game.physics.arcade.collide(bullet, player1);
}

function p2ShootRight()
{
	//play shoot animation]
	bullet = game.add.sprite(player2.x + 30, player1.y + 30, 'bullet');
	game.physics.arcade.enable(bullet);
	bullet.body.velocity.x = 400;
	game.physics.arcade.collide(bullet, player1);
}



/* function render() 
{

    //sound-related
	game.debug.soundInfo(sound, 20, 32);
	

	game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

} */






