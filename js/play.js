var playState = { 
create : function() {
	
	menuMusic = game.add.audio('menuMusic');
	gunMusic = game.add.audio('gunMusic');
	moneyMusic = game.add.audio('moneyMusic');
	
	
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
	
	var atm = atms.create(game.world.width - 157.5, 287.5, 'atm');//right
	var atm2 = atms.create(0, 287.5, 'atm');//left
	var realBank = atms.create(320, 0, 'bank');


    atm.scale.setTo(1.75, 1.5);
	atm2.scale.setTo(1.75, 1.5);
	realBank.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    atm.body.immovable = true;
	atm2.body.immovable = true;
	realBank.body.immovable = true;

    // The players and their settings
    player1 = game.add.sprite(32, game.world.height - 150, 'businessmoney');
	player2 = game.add.sprite(650, game.world.height - 150, 'businessmoney');


    //  We need to enable physics on the players
    game.physics.arcade.enable(player1);
	game.physics.arcade.enable(player2);

    //  Player1 physics properties. Give the little guy a slight bounce.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;

     // Player1 animations
	player1.animations.add('left', [4, 5, 6, 7], 7, true);
	player1.animations.add('right', [0, 1, 2, 3], 7, true); 

	

	
	 // Player2 physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    //  Player2 animations
	player2.animations.add('left', [4, 5, 6, 7], 7, true);
	player2.animations.add('right', [0, 1, 2, 3], 7, true); 
	
	
 


    //  The text items
    balanceText = game.add.text(16, 16, 'Balance: $0', { fontSize: '32px', fill: '#000' });
	var atmText = game.add.text(game.world.width - 157.5, 260, 'Player 2', { fontSize: '32px', fill: '#000' });
    var atmText2 = game.add.text(10, 260, 'Player 1', { fontSize: '32px', fill: '#000' });
	

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
	
	if (p1Count == 20)
	{
		endGame();
	}
	if (p2Count == 20)
	{
		endGame();
	}
	
	if (p1Count == 20)
	{
		endGame();
	}
	if (p2Count == 20)
	{
		endGame();
	}
	
	
      player1.body.velocity.x = 0;
	   player2.body.velocity.x = 0;
	
	 if (cursors.left.isDown)
    {
        //  Move to the left
        player1.body.velocity.x = -300;

        player1.animations.play('left');

	
    }
	if (Mkey.isDown && player1.x <= 157.5 && player1.y >= 287.5 && player1.y<=400)
    {
        playState.deposit();
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
	

    }
    else
    {
        //  Stand still
        player1.animations.stop();

       
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
	if (Rkey.isDown && player2.x >= 642.5 && player2.y >= 287.5 && player2.y<=400)
    {
        playState.withdraw();
    }
	
     if (Akey.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -300;
		player2.animations.play('left');
        
	
    }
    else if (Dkey.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 300;

       player2.animations.play('right');
	
    }
    else
    {
        //  Stand still
        player2.animations.stop();

   
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
	
},

withdraw : function ()
{
	
	if (prevTransaction+.5 < this.game.time.totalElapsedSeconds())
	{
	moneyMusic.play();
	console.log('Withdrawing $100');
	newBalance = balance - 100;
	console.log(', new balance is ' + newBalance);
	balance = newBalance;
	balanceText.setText('Balance: $' + balance);
	p2Count++;
	prevTransaction = this.game.time.totalElapsedSeconds();
	}
	
},
};