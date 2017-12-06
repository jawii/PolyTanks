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

    //WHAT TO DO HERE??
    this.reset(x, y, data);

    

};

PolyTank.Crate.prototype = Object.create(Phaser.Sprite.prototype);
PolyTank.Crate.prototype.constructor = PolyTank.Crate;

PolyTank.Crate.prototype.reset = function(x, y, data) {
	Phaser.Sprite.prototype.reset.call(this, x, y, data.health);
    
    //create label text from data
    var style = {
        font: "25px Arial",
        fontWeight: 'normal',
        fill: '#000',
        //wordWrap: true
    }

    this.labelText = this.game.add.text(0, 0, data.text, style);
    this.labelText.anchor.setTo(0.5);
    

    //increase with if text is wider
    //this.addChild(this.labelText)
    this.width = Math.max(this.labelText.width + 25, this.width);


    //HEALTH BAR
    //https://github.com/bmarwane/phaser.healthbar
    //http://www.html5gamedevs.com/topic/3985-health-bars/
    var barConfig = {
        x: this.x, 
        y: this.y - 30, 
        width: this.width, 
        height: 8,
        bg: {
            color: '#ff0000'
        },
        bar: {
            color: '#33ce10'
        },
    };
    this.healthBar = new HealthBar(this.game, barConfig);

    //this.myHealthBar.height = this.heigth;

    /*
    width
    height
    x: initial x position
    y: initial y position
    bg.color: background color
    bar.color: color of the actual bar
    animationDuration: control the animation when the bar value is changed
    flipped: if true the bar will change size from left to right
    */

	//apply velocity
    var randomVelocity = Math.random();
	this.body.velocity.x = Math.max(70 * Math.random(), 20);
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
};

PolyTank.Crate.prototype.damage = function(amount){
	Phaser.Sprite.prototype.damage.call(this, amount);

	//console.log("Damaged");

	//update healthbar
    this.healthBar.setPercent((this.health / this.data.health) * 100);


	//add particle emitter for hit

};

PolyTank.Crate.prototype.kill = function(data){

	Phaser.Sprite.prototype.kill.call(this);

	//destroy label and health bars
	this.labelText.destroy();


	if(this.data.isCorrectValue){
		//console.log("right crate destroyed")
        PolyTank.GameState.moveNextLevel = true;

        //TODO Score points and some 
	}

    //destroy healthbar
    this.healthBar.kill();

    //particles 
    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('panel_light_particles');
    emitter.gravity = 0;
    //emitter.maxParticleSpeed = 300;
    //emitter.maxParticleSpeed = 20;
    emitter.start(true, 500, null, 10);

    this.game.time.events.add(700, function(){
        emitter.destroy();
    }, this);

    
    //console.log(PolyTank.GameState.currentEnemyIndex);


};

PolyTank.Crate.prototype.update = function(){
	
	//make the text follow crate
	this.labelText.x = this.x;
    this.labelText.y = this.y;

    //make the healthbar follow crate
    this.healthBar.setPosition(this.x, this.y - 32);


    this.game.physics.arcade.collide(this, PolyTank.GameState.crates, function(){
        console.log("Collide");
        //this.body.velocity.x *= -1;

    }, null, this);

}