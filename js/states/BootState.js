var PolyTank = PolyTank || {};

PolyTank.BootState = {
	preload: function(){
	},
	create: function(){


		PolyTank.game.state.start('PreloadState');  

		//scaling options
	    this.mobile = !this.game.device.desktop ? true : false;

	    if(this.mobile){
	      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    }
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;
	}



};