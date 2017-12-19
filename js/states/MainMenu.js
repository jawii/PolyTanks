var PolyTank = PolyTank || {};

PolyTank.MainMenu = {


	preload: function(){
		
	},

	create: function(){

		var background = this.game.add.sprite(0, 0, "background6");
		//background.anchor.setTo(1);
		background.scale.y = 0.8;


		this.levelData = {
			easy: false,
			normal: false,
			hard: false,
			gameLength: "normal",
			playerOneName: "",
			playerTwoName: ""
		};


		this.startGameTextstyle = {
            font: '30px Bungee',
            fill: '#000000'
        };
        this.levelDifficultyTextstyle = {
            font: '20px Arial',
            fill: '#000000'
        };
        var gameTextStyle = {
            font: '80px Bungee',
            fill: '#black'
        };
        var guideTextStyle = {
            font: 'bold 18px Arial',
            fill: '#000000',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 650
        }
        //GAMENAME AND INSTRUCTION TEXT
        var gameNameText = this.game.add.text(this.game.world.width/2, 50, 'PolyTank', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var guideText = this.game.add.text(gameNameText.x, gameNameText.y + 50, "Two player Math game!", guideTextStyle);
        guideText.anchor.setTo(0.5);


        var startGameButton = this.game.add.button(400, 470, 'button1');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Start Game', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        var guideTextText = 'Shoot right answer to get points. Collect crates to upgrade your turret. Player one controls: B, V and Z. Player two controls are arrow keys and period - button.';
        var guideText = this.game.add.text(400, 200, guideTextText, guideTextStyle);
        guideText.anchor.setTo(0.5);
        //guideText.setTextBounds(0, 0, 300, 200);
        
        startGameButton.events.onInputDown.add(function(){
        	if (this.buttonLevelEasy.selected){
        		this.levelData.easy = true
        	}
        	if (this.buttonLevelNormal.selected){
        		this.levelData.normal = true
        	}
        	if (this.buttonLevelHard.selected){
        		this.levelData.hard = true
        	}

        	//if any isnt selected, select all
        	if (!this.buttonLevelEasy.selected && !this.buttonLevelNormal.selected && !this.buttonLevelHard.selected)
        	{
        		this.levelData.easy = true;
        		this.levelData.normal = true;
        		this.levelData.hard = true;

        	}

        	if(buttonLengthShort.selected){
        		this.levelData.gameLength = "10"
        	}
        	else if(buttonLengthNormal.selected){
        		this.levelData.gameLength = "20"
        	}
        	else if(buttonLengthLong.selected){
        		this.levelData.gameLength = "30"
        	}

            PolyTank.game.state.start('GameState', true, false, this.levelData);
        }, this);

        //excercise guide text
        var levelGuideText = this.game.add.text(400, 270, "Select excercise levels", guideTextStyle)
        levelGuideText.anchor.setTo(0.5);
        var levelGuideText1 = this.game.add.text(400, 330, "You can select multiple levels", guideTextStyle)
        levelGuideText1.anchor.setTo(0.5);
        levelGuideText1.fontSize = "12px"
        //buttons for level
        this.buttonLevelEasy = this.game.add.button(310, 300, "button2", this.clickHandler);
        this.buttonLevelEasy.anchor.setTo(0.5);
        this.buttonLevelEasy.scale.setTo(0.4, 0.7);
        var buttonLevelEasyText = this.game.add.text(this.buttonLevelEasy.position.x, this.buttonLevelEasy.position.y, "Easy", this.levelDifficultyTextstyle);
        buttonLevelEasyText.anchor.setTo(0.5);
        this.buttonLevelEasy.selected = false;

        this.buttonLevelNormal = this.game.add.button(400, 300, "button2", this.clickHandler);
        this.buttonLevelNormal.anchor.setTo(0.5);
        this.buttonLevelNormal.scale.setTo(0.4, 0.7);
        var buttonLevelNormalText = this.game.add.text(this.buttonLevelNormal.position.x, this.buttonLevelNormal.position.y, "Normal", this.levelDifficultyTextstyle);
        buttonLevelNormalText.anchor.setTo(0.5);
        this.buttonLevelNormal.selected = false;

        this.buttonLevelHard = this.game.add.button(490, 300, "button2", this.clickHandler);
        this.buttonLevelHard.anchor.setTo(0.5);
        this.buttonLevelHard.scale.setTo(0.4 , 0.7);
        var buttonLevelHardText = this.game.add.text(this.buttonLevelHard.position.x, this.buttonLevelHard.position.y, "Hard", this.levelDifficultyTextstyle);
        buttonLevelHardText.anchor.setTo(0.5);
        this.buttonLevelHard.selected = false;



        //excercise guide text
        var levelGuideText = this.game.add.text(400, 360, "Select score to Win", guideTextStyle)
        levelGuideText.anchor.setTo(0.5);

        //buttons for level length
        var buttonLengthShort = this.game.add.button(310, 390, "button2", this.clickHandler2);
        buttonLengthShort.anchor.setTo(0.5);
        buttonLengthShort.scale.setTo(0.4, 0.7);
        var buttonLengthNormal = this.game.add.button(400, 390, "button2", this.clickHandler2);
        buttonLengthNormal.anchor.setTo(0.5);
        buttonLengthNormal.scale.setTo(0.4, 0.7);
        var buttonLengthLong = this.game.add.button(490, 390, "button2", this.clickHandler2);
        buttonLengthLong.anchor.setTo(0.5);
        buttonLengthLong.scale.setTo(0.4 , 0.7);
        

        this.lengthButtons = this.add.group();
        this.lengthButtons.add(buttonLengthShort);
        this.lengthButtons.add(buttonLengthNormal);
        this.lengthButtons.add(buttonLengthLong);

        var buttonLengthLongText = this.game.add.text(buttonLengthLong.position.x, buttonLengthLong.position.y, "30", this.levelDifficultyTextstyle);
        buttonLengthLongText.anchor.setTo(0.5);
        buttonLengthLongText.selected = false;
        var buttonLengthNormalText = this.game.add.text(buttonLengthNormal.position.x, buttonLengthNormal.position.y, "20", this.levelDifficultyTextstyle);
        buttonLengthNormalText.anchor.setTo(0.5);
        buttonLengthNormalText.selected = false;
        var buttonLengthShortText = this.game.add.text(buttonLengthShort.position.x, buttonLengthShort.position.y, "10", this.levelDifficultyTextstyle);
        buttonLengthShortText.anchor.setTo(0.5);
        buttonLengthShort.selected = false;

        this.loadControlGuide();
	},
	clickHandler: function(button, pointer){
		//console.log(arguments);

		button.selected = !button.selected;
		if(button.selected){
			button.loadTexture('button1');
			button.alpha = 0.5;
		}
		else{
			button.loadTexture('button2');
			button.alpha = 1;
		}
	},

	clickHandler2: function(button, pointer){

		//clear selections
		PolyTank.MainMenu.lengthButtons.forEach(function(element){
			element.selected = false;
			element.loadTexture('button2');
		}, this);

		button.selected = true;
		button.loadTexture('button1');
		button.alpha = 1;
	},
    loadControlGuide: function(){

        var style = {
            font: 'bold 16px Arial',
            fill: '#000000'
            // align: 'left'
        }
        //playerTwoControls
        var text = this.game.add.text(100, 520, "Player one controls", style);
        text.anchor.setTo(0.5);
        text = this.game.add.text(100, 540, "Move turret: B and V", style);
        text.anchor.setTo(0.5);
        text = this.game.add.text(100, 560, "Shoot: Z", style)
        text.anchor.setTo(0.5);

        var text = this.game.add.text(700, 520, "Player two controls", style);
        text.anchor.setTo(0.5);
        text = this.game.add.text(700, 540, "Move turret: Arrow keys", style);
        text.anchor.setTo(0.5);
        text = this.game.add.text(700, 560, "Shoot: . (period/piste)", style)
        text.anchor.setTo(0.5);
    }







};