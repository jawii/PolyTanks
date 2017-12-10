var PolyTank = PolyTank || {};

PolyTank.BootState = {


	preload: function(){
		this.load.image('preloadBar', 'assets/images/preloadBar.png');
	},

	create: function(){


		PolyTank.game.state.start('PreloadState');  
	}



};