
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Multithreads', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('background', 'assets/back2.png');
    game.load.image('atm', 'assets/atm.png');
	game.load.image('bank','assets/bank.png');
	 game.load.spritesheet('thiefmoney', 'assets/thiefmoney.png', 50, 120, 5);
	 game.load.spritesheet('thief', 'assets/thief.png', 50, 120, 5);
	 game.load.spritesheet('business', 'assets/business.png', 30, 69);
	 game.load.spritesheet('businessmoney', 'assets/businessmoney.png', 30, 69, 7);
	 game.load.image('ground', 'assets/platform.png');
	// game.load.image('menu', 'assets/blackbox.png', 360, 200);
	 
	//add sound
	//game.load.audio('music', 'assets/audio/How_It_Began.mp3'); 

}



var player1;
var player2;
var platforms;
var cursors;
var Akey;
var Wkey;
var Skey;
var Dkey;
var homework;
var score = 0;
var scoreText;

//CHANGE
var aTest;

//add sound
var sound;

//Timer
var timer;
var timeLeft = 32;
var timerText = 0;

function create() {
	//superKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);

    //add sound
	//game.input.touch.preventDefault = false;
	//sound = game.add.audio('music');
	//sound.play();
	//game.input.onDown.add(restartMusic, this);
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple sbackground for our game
   // game.add.sprite(0, 0, 'background');
	back2 = game.add.tileSprite(0, 0, 800, 600, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

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
	
	var atm = platforms.create(game.world.width - 180, 250, 'atm');
	var bank = platforms.create(0, 255, 'atm');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    atm.scale.setTo(2, 2);
	bank.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    atm.body.immovable = true;
	bank.body.immovable = true;

    // The player and its settings
    player1 = game.add.sprite(32, game.world.height - 150, 'business');
	player2 = game.add.sprite(100, game.world.height - 150, 'businessmoney');
	//player1.frame = 1;
	//player2.frame = 1;

    //  We need to enable physics on the players
    game.physics.arcade.enable(player1);
	game.physics.arcade.enable(player2);

    //  Player1 physics properties. Give the little guy a slight bounce.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;

     //  Our two animations, walking left and right.
	player1.animations.add('left', [4, 5, 6, 7], 7, true);
	player1.animations.add('right', [0, 1, 2, 3], 7, true); 
	
	 // Player2 physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
	//player2.animations.add('left2', [0, 1, 2], 6, true);
	//player2.animations.add('right2', [3, 4, 5], 6, true);
 


    //  The score
    //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	
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
	
	//  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

    //game.time.events.repeat(Phaser.Timer.SECOND * 5, 2, createHomework, this);
	
	//  AT 15 SECOND MARK
	//  Here we'll create a basic timed event. This is a one-off event, it won't repeat or loop:
    //  The first parameter is how long to wait before the event fires. In this case 15 seconds 
    //  The next parameter is the function to call ('halfTime') and finally the context under which that will happen.

    //game.time.events.add(Phaser.Timer.SECOND * 15, halfTime, this);
	
	//  AT 30 SECONDS
	//game.time.events.add(Phaser.Timer.SECOND * 30, createTest, this);
	
	//  AT 33 SECONDS
	//game.time.events.add(Phaser.Timer.SECOND * 33, endGame, this); // Testing purposes only
}

/* function returnGrade(score){
	if (score >= 90){
		return "A";
	} else if (score >= 80){
		return "B";
	} else if (score >= 70){
		return "C";
	} else if (score >= 60){
		return "D";
	} else {
		return "F";
	}
} */

/* function restartMusic() {
	sound.restart();
}

function updateTimer() {

    timeLeft--;
	timerText.setText('Time: ' + timeLeft);

} */

function update() {

    //  Collide the player and the homework with the platforms
    game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);
   /*  if (game.physics.arcade.collide(homework, platforms)){
		homework.points = 10;
	} */

    //  Checks to see if the player overlaps with any of the homeworks, if he does call the collecthomework function
    //game.physics.arcade.overlap(player, homework, collectHomework, null, this);

	// CHANGE: tests
	//game.physics.arcade.overlap(player, aTest, collectTest, null, this);
      player1.body.velocity.x = 0;
	   player2.body.velocity.x = 0;
	/* if (superKey.isDown){
		superMode = true;
	}
	
	if (superMode == true){
		updateSuperPlayer();
	} else {
		updatePlayer();
	} */
	 if (cursors.left.isDown)
    {
        //  Move to the left
        player1.body.velocity.x = -150;

        player1.animations.play('left');
		//back2.tilePosition.x+= 5;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player1.body.velocity.x = 150;

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
        player1.body.velocity.y = -350;
    }
	
     if (Akey.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -150;

        
		//back2.tilePosition.x+= 5;
    }
    else if (Dkey.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 150;

       //player1.animations.play('right');
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
        player2.body.velocity.y = -350;
    }
}

/* function updateSuperPlayer() {
	player1.body.velocity.x = 0;
	player2.body.velocity.x = 0;
	if (cursors.left.isDown)
    {
        //  Move to the left
        player1.body.velocity.x = -250;

        player1.animations.play('left');
		//school.tilePosition.x+= 5;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player1.body.velocity.x = 250;

        player1.animations.play('right');
		//school.tilePosition.x-=5;
    }
    else
    {
        //  Stand still
        player1.animations.stop();

        player1.frame = 4;
    }
    
    //  Allow the player to jump
    if (cursors.up.isDown)
    {
        player1.body.velocity.y = -300;
    }
	else if (cursors.down.isDown)
	{
		player1.body.velocity.y += 300;
	}
} */

/* function updatePlayer() {
	//  Reset the players velocity (movement)
    player1.body.velocity.x = 0;

   
} */


/* function createHomework() {
	try {
		homework.kill();
	} catch (err){
		
	}
	
	var homeworkFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	// The player and its settings
    homework = game.add.sprite(homeworkFall, 0, 'homework');
	homework.points = 15;

    //  We need to enable physics on the homework
    game.physics.arcade.enable(homework);
	
	homework.body.gravity.y = 300;

} */

/* function createTest() {
	try {
		aTest.kill();
		homework.kill();
	} catch (err){
		
	}
 */
	/* var testFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	The player and its settings
    aTest = game.add.sprite(testFall, 0, 'test');

     We need to enable physics on the test
    game.physics.arcade.enable(aTest);
	
	aTest.body.gravity.y = 300; */
	
	/*
	//  Finally some tests to collect
    tests = game.add.group();

    //  We will enable physics for any test that is created in this group
    tests.enableBody = true;
	
	var testFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	
	var aTest = tests.create(testFall,0,'test');
	aTest.body.gravity.y = 100; // TODO: make it fall slower
	*/



/* function halfTime(homework){
	
	createTest();
	game.time.events.repeat(Phaser.Timer.SECOND * 5, 2, createHomework, this);
} */

/* function render() 
{

    //sound-related
	game.debug.soundInfo(sound, 20, 32);
	

	game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

} */

/* function collectHomework (player, homework) {
    
    // Removes the homework from the screen
    homework.kill();

    //  Add and update the score
    score += homework.points;
    scoreText.text = 'Score: ' + score;

} */

/* function collectTest (player, aTest) {
    
    // Removes the homework from the screen
    aTest.kill();

    //  Add and update the score
    score += 20;
    scoreText.text = 'Score: ' + score;

} */

/* function endGame() {
	// When the pause button is pressed, we pause the game
    game.paused = true;
	var w = game.world.width;
	var h = game.world.height;

	// Then add the menu
	var menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	var endMessage = "GRADE: "+returnGrade(score);
	if (score < 60){
		endMessage = endMessage+ "\nYOU FAILED!"; 
	}
	if (score == 100){
		endMessage = endMessage+ "\nAMAZING!";
	}
	else{
		endMessage = endMessage+ "\nTHANKS FOR PLAYING!";
	}
	var endText = game.add.text(game.world.centerX, game.world.centerY, endMessage,{fill: '#fff' });
	endText.anchor.setTo(0.5,0.5);

	// And a label to illustrate which menu item was chosen. (This is not necessary)
	var choiseLabel = game.add.text(game.world.centerX, game.world.centerY + menu.height/2+30, 'Click here to restart', {fill: '#000000' });
	choiseLabel.anchor.setTo(0.5, 0.5);

	
	// Add a input listener that can help us return from being paused
    game.input.onDown.add(restart, self);
	function restart(event){
		location.reload();
	}
} */
