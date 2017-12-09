var PolyTank = PolyTank || {};

PolyTank.Crate = function(state, x, y, data){
    

    this.randTextures = [
        { 
            asset: 'shard_wood',
            health: 15
        },
        { 
            asset: 'shard_glass',
            health: 5
        },
        { 
            asset: 'shard_stone',
            health: 20
        }
        // { 
        //     asset: 'panel_lightblue',
        //     health: 50
        // },
        // { 
        //     asset: 'panel_light',
        //     health: 50
        // }
    ];

    //get random asset and health
    var randData = this.randTextures[Math.floor(Math.random() * this.randTextures.length)];
    this.health = randData["health"];
    this.texture = randData['asset'];
    this.maxHealth = this.health;

    Phaser.Sprite.call(this, state.game, x, y, this.texture);

	this.state = state;
	this.game = state.game;

	this.anchor.setTo(0.5);
	this.scale.setTo(0.5);

	this.game.physics.arcade.enable(this);
    this.enableBody = true;

    this.reset(x, y, data);

    

};

PolyTank.Crate.prototype = Object.create(Phaser.Sprite.prototype);
PolyTank.Crate.prototype.constructor = PolyTank.Crate;

PolyTank.Crate.prototype.reset = function(x, y, data) {

	Phaser.Sprite.prototype.reset.call(this, x, y, this.maxHealth);
    

    //create label text from data
    var style = {
        font: "25px Arial",
        fontWeight: 'normal',
        fill: '#000',
        //wordWrap: true
    }
    this.data = data;

    this.labelText = this.game.add.text(0, 0, data.text, style);
    this.labelText.anchor.setTo(0.5);
    
    //increase with if text is wider
    //console.log(this);
    //console.log(this.body.width);
    this.width = Math.max(this.labelText.width + 50, this.width);

    //HEALTH BAR
    //https://github.com/bmarwane/phaser.healthbar
    this.barConfig = {
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
    this.healthBar = new HealthBar(this.game, this.barConfig);

	//apply velocity
    var randomVelocity = Math.random();
	this.body.velocity.x = Math.max(70 * Math.random(), 20);
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
};

PolyTank.Crate.prototype.damage = function(amount, player){
	Phaser.Sprite.prototype.damage.call(this, amount);

	//console.log("Damaged");
    //this.player = player;
    //console.log(this.player);

	//update healthbar
    //this.healthBar.setPercent((this.health / this.data.health) * 100);


	//add particle emitter for hit

};

PolyTank.Crate.prototype.kill = function(data, player){

	Phaser.Sprite.prototype.kill.call(this);

    //get the score
    this.player = player;

    
	
    //destroy label and health bars
    this.labelText.destroy();
    this.healthBar.kill();

    //particles 
    var emitter = this.game.add.emitter(this.x, this.y, 300);
    emitter.makeParticles('panel_lightblue_particles');
    emitter.gravity = 0;
    emitter.alpha = 1;
    //emitter.maxParticleSpeed = 600, 600;
    emitter.setXSpeed(-100, 100);
    emitter.setYSpeed(-100, 100);
    emitter.start(true, 1250, null, 50);

    this.game.time.events.add(950, function(){
        emitter.destroy();
    }, this);

    
    this.scoreTextStyle = {
        font: '40px Arial',
        fill: '#00ff19'
    };
    

    //if(this.data.isCorrectValue && PolyTank.GameState.playerKill){
    if(this.data.isCorrectValue){
        var scoreText = this.game.add.text(this.game.world.width/2, this.game.world.height/4, "", this.scoreTextStyle);
        
        //console.log(this.player);
        this.player.score += 5;
        PolyTank.GameState.updateScore(player);
        scoreText.anchor.setTo(0.5);
        scoreText.text = this.player.playerName + " scores";
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            scoreText.text = "";
            PolyTank.GameState.moveNextLevel = true;
        }, this);

        this.game.add.tween(scoreText).to({fontSize: 70}, 1000, null, true);
    }
    //IF CRATE IS PLAYERKILLED, REMOVE SCORE POINTS
    else if(PolyTank.GameState.playerKill) 
    {
        this.player.score -= 1;
        PolyTank.GameState.updateScore(player);
    }

};

PolyTank.Crate.prototype.update = function(){
	
	//make the text follow crate
	this.labelText.x = this.x;
    this.labelText.y = this.y;
    
    //console.log(this.healthBar);
    //make the healthbar follow crate
    this.healthBar.setPosition(this.x, this.y - 32);



    this.game.physics.arcade.collide(this, PolyTank.GameState.crates, function(){
        //console.log("Collide");
        //this.body.velocity.x *= -1;

    }, null, this);

}