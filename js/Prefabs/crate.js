var PolyTank = PolyTank || {};

PolyTank.Crate = function(state, x, y, data){
	Phaser.Sprite.call(this, state.game, x, y, data.asset);

	this.state = state;
	this.game = state.game;
	this.anchor.setTo(0.5);
	this.scale.setTo(0.5);

	this.data = data;
	this.health = data.health;

	this.game.physics.arcade.enable(this);
    this.enableBody = true;

    //create label text from data
    var style = {
    	font: "18px Arial"
    }
    this.labelText = this.game.add.text(x, y, data.text, style);
    this.labelText.anchor.setTo(0.5);


    //HEALTH BAR
    //https://github.com/bmarwane/phaser.healthbar
    //http://www.html5gamedevs.com/topic/3985-health-bars/



    this.reset(x, y, data);

    

};

PolyTank.Crate.prototype = Object.create(Phaser.Sprite.prototype);
PolyTank.Crate.prototype.constructor = PolyTank.Crate;

PolyTank.Crate.prototype.reset = function(x, y, data) {
	Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

};

PolyTank.Crate.prototype.damage = function(amount){
	Phaser.Sprite.prototype.damage.call(this, amount);

	//console.log("Damaged");

	//update healthbar
	//add particle emitter for hit

};

PolyTank.Crate.prototype.kill = function(data){

	Phaser.Sprite.prototype.kill.call(this);

	//destroy label and health bars
	this.labelText.destroy();

	console.log(this.data);

	if(this.data.isCorrectValue){
		console.log("right crate destroyed")
	}
	else{
		console.log("you destroyed wrong crate")
	}
}