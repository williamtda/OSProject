var bootState = {
	
	create : function () {
		
		//Enables in game physics
		 game.physics.startSystem(Phaser.Physics.ARCADE);
		 
		 
		 game.state.start('load');
	}
}