var playState2 = { 
create : function() {
	
	menuMusic = game.add.audio('menuMusic');

		gunMusic = game.add.audio('gunMusic');
	moneyMusic = game.add.audio('moneyMusic');
	
	back2 = game.add.tileSprite(0, 0, 800, 600, 'background');
	balance = 2000;

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
	
	var atm = atms.create(game.world.width - 157.5, 287.5, 'atm');//right
	var atm2 = atms.create(0, 287.5, 'atm');//left
	var realBank = atms.create(320, 0, 'bank');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    atm.scale.setTo(1.75, 1.5);
	atm2.scale.setTo(1.75, 1.5);
	realBank.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    atm.body.immovable = true;
	atm2.body.immovable = true;
	realBank.body.immovable = true;

    // The player and its settings
    player1 = game.add.sprite(32, game.world.height - 150, 'businessmoney');
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
	player1.animations.add('dieLeft', [0, 1, 2], 2, true);
	player1.animations.add('dieRight', [0, 1, 2], 2, true); 
	
	
	 // Player2 physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    //  Our animations
	player2.animations.add('left', [4, 5, 6, 7], 7, true);
	player2.animations.add('right', [0, 1, 2, 3], 7, true); 
	player2.animations.add('shootLeft', [0, 1, 2], 2, true);
	player2.animations.add('shootRight', [0, 1, 2], 2, true); 
	player2.animations.add('dieLeft', [0, 1, 2], 2, true);
	player2.animations.add('dieRight', [0, 1, 2], 2, true); 
 


    //  The score
    balanceText = game.add.text(16, 16, 'Balance: $2000', { fontSize: '32px', fill: '#000' });
	
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
	Mkey = game.input.keyboard.addKey(Phaser.Keyboard.M);
	Rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	

	
},

update : function() {
 //  Collide the player with the platforms and atms
    game.physics.arcade.collide(player1, platforms);
	game.physics.arcade.collide(player2, platforms);
	game.physics.arcade.overlap(bullet, player1, p1Die, null, this);
	game.physics.arcade.overlap(bullet, player2, p2Die, null, this);
	
	if (p1Count >= 20)
	{
		endGame();
	}
	if (p2Count >= 20)
	{
		endGame();
	}
	
	
	//game.physics.arcade.overlap(player2, bullet, killPlayer2, null, this);
	
      player1.body.velocity.x = 0;
	   player2.body.velocity.x = 0;
	
	 if (cursors.left.isDown)
    {
        //  Move to the left
        player1.body.velocity.x = -300;

        player1.animations.play('left');
		//back2.tilePosition.x+= 5;
	
    }
	if (Mkey.isDown && player1.x <= 157.5 && player1.y >= 287.5)
    {
        playState2.deposit();
    }
	 
	  if (cursors.down.isDown && (prevShot+.5 < this.game.time.totalElapsedSeconds())) 
	 {
		 gunMusic.play();
		p1ShootRight();
		prevShot = this.game.time.totalElapsedSeconds();
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
        player1.animations.stop();

        //player1.frame = 2;
    }
    if (Skey.isDown && (prevShot+.5 < this.game.time.totalElapsedSeconds())) 
	 {
		 gunMusic.play();
	   p2ShootLeft();
	   prevShot = this.game.time.totalElapsedSeconds();
	 }
	 
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player1.body.touching.down)
    {
        player1.body.velocity.y = -400;
    }
	if (Rkey.isDown && player2.x >= 642.5 && player2.y >= 287.5)
    {
        playState2.withdraw();
    }
	
     if (Akey.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -300;
		player2.animations.play('left');
        
		//back2.tilePosition.x+= 5;
		//player2.frame = 4;
    }
    else if (Dkey.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 300;

       player2.animations.play('right');
		//back2.tilePosition.x-=5;
		//player2.frame = 0;
    }
    else
    {
        //  Stand still
        player2.animations.stop();

        //player2.frame = 2;
    }
	
    
    //  Allow the player to jump if they are touching the ground.
    if (Wkey.isDown && player2.body.touching.down)
    {
        player2.body.velocity.y = -400;
    }
	try {
			game.physics.arcade.overlap(player1, bullet, killPlayer1, null, this);
		}
		catch (err)
		{
			
		}
		 try {
			game.physics.arcade.overlap(player2, bullet, killPlayer2, null, this);
		}
		catch (err)
		{
			
		}

},

deposit : function()
{
	
	wait(S);
	if (prevTransaction+.5 < this.game.time.totalElapsedSeconds())
	{
	moneyMusic.play();
	console.log('Depositing $100');
	var newBalance = balance + 100;
	console.log(', new balance is ' + newBalance);
	balance = newBalance;
	balanceText.setText('Balance: $' + balance);
	p1Count++;

	prevTransaction = this.game.time.totalElapsedSeconds();
	}
	
	signal(S);
},

withdraw : function ()
{
	wait(S);
	if (prevTransaction+.5 < this.game.time.totalElapsedSeconds())
	{
	if (balance >= 100)
	{
		moneyMusic.play();
	console.log('Withdrawing $100');
	newBalance = balance - 100;
	console.log(', new balance is ' + newBalance);
	balance = newBalance;
	balanceText.setText('Balance: $' + balance);
	p2Count++;

	}
	prevTransaction = this.game.time.totalElapsedSeconds();
	}
	
	signal(S);
},
};