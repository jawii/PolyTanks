var PolyTank = PolyTank || {};

PolyTank.Pack = function(state, x, y, data){
    

    this.texture = "crateAmmo"

    var data = [
        { 
            improvement: 'bulletDamage',
            amount: 1
        },
        { 
            improvement: "fireRate",
            amount: 50
        },
        { 
            improvement: "bulletSpeed",
            amount: 100
        },
        {
            improvement: "angleSpeed",
            amount: 0.1

        }
    ];

    var randImprovement = data[Math.floor(Math.random() * data.length)];

    //console.log(this.data);

    Phaser.Sprite.call(this, state.game, x, y, this.texture);

	this.state = state;
	this.game = state.game;

	this.anchor.setTo(0.5);
	this.scale.setTo(0.5);

	this.game.physics.arcade.enable(this);
    this.enableBody = true;

    this.reset(x, y, randImprovement);

    

};

PolyTank.Pack.prototype = Object.create(Phaser.Sprite.prototype);
PolyTank.Pack.prototype.constructor = PolyTank.Pack;

PolyTank.Pack.prototype.reset = function(x, y, data) {

	Phaser.Sprite.prototype.reset.call(this, x, y);

    this.data = data;
	//apply velocity
    var randomVelocity = Math.random();
	this.body.velocity.y = Math.max(70 * Math.random(), 20);
    this.body.bounce.x = 1;
    //this.body.collideWorldBounds = true;
};

PolyTank.Pack.prototype.damage = function(amount, player){
	Phaser.Sprite.prototype.damage.call(this, amount);

};

PolyTank.Pack.prototype.kill = function(data, player){

	Phaser.Sprite.prototype.kill.call(this);

    //console.log(player);
    this.player = player;

    //improve player stats
    console.log(this.data["improvement"]);
    this.player[this.data["improvement"]] += this.data["amount"];
    PolyTank.GameState.updateStats(this.player);
    

};

PolyTank.Pack.prototype.update = function(){
	


    this.game.physics.arcade.collide(this, PolyTank.GameState.packs, function(){

    });

}