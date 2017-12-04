var PolyTank = PolyTank || {};

PolyTank.Barrel = function(state, x, y, data){
	Phaser.Sprite.call(this, state.game, x, y, data.asset);

	this.state = state;
	this.game = state.game;
	this.anchor.setTo(0.5);
	this.scale.setTo(0.5);

	this.data = data;

	this.game.physics.arcade.enable(this);
    this.enableBody = true;


    this.reset(x, y, data);

    

};

PolyTank.Barrel.prototype = Object.create(Phaser.Sprite.prototype);
PolyTank.Barrel.prototype.constructor = PolyTank.Barrel;

PolyTank.Barrel.prototype.reset = function(x, y, data) {
	Phaser.Sprite.prototype.reset.call(this, x, y, data.health);

};

PolyTank.Barrel.prototype.damage = function(amount){
	Phaser.Sprite.prototype.damage.call(this, amount);

	console.log("Damaged");


};



