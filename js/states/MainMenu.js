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
			gameLength: "normal"
		};


		this.startGameTextstyle = {
            font: '30px Arial',
            fill: '#000000'
        };
        this.levelDifficultyTextstyle = {
            font: '20px Arial',
            fill: '#000000'
        };
        var gameTextStyle = {
            font: '80px Arial',
            fill: '#ff32c3'
        };
        var guideTextStyle = {
            font: '20px Arial',
            fill: '#000000',
            align: 'center'
        }
        //GAMENAME AND INSTRUCTION TEXT
        var gameNameText = this.game.add.text(this.game.world.width/2, 80, 'PolyTank', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var guideText = this.game.add.text(gameNameText.x, gameNameText.y + 70, "Two player Math game!", guideTextStyle);
        guideText.anchor.setTo(0.5);


        var startGameButton = this.game.add.button(400, 300, 'button1');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Start Game', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        //var guideTextText = 'You have 60 seconds \n\n to place as many points you can in the Cartesian coordinate grid.';
        //var guideText = this.game.add.text(this.game.world.width/2.5, this.game.world.height/2, guideTextText, guideTextStyle);
        //guideText.anchor.setTo(0.5);
        //guideText.setTextBounds(100, 0, 100, 100);
        
        startGameButton.events.onInputDown.add(function(){
        	if (buttonLevelEasy.selected){
        		this.levelData.easy = true
        	}
        	if (buttonLevelNormal.selected){
        		this.levelData.normal = true
        	}
        	if (buttonLevelHard.selected){
        		this.levelData.hard = true
        	}

        	//if any isnt selected, select all
        	if (!buttonLevelHard.selected && !buttonLevelHard.selected && !buttonLevelHard.selected)
        	{
        		this.levelData.easy = true;
        		this.levelData.normal = true;
        		this.levelData.hard = true;

        	}

        	if(buttonLengthShort.selected){
        		this.levelData.gameLength = "short"
        	}
        	else if(buttonLengthNormal.selected){
        		this.levelData.gameLength = "normal"
        	}
        	else if(buttonLengthLong.selected){
        		this.levelData.gameLength = "long"
        	}

            PolyTank.game.state.start('GameState', true, false, this.levelData);
        }, this);

        //excercise guide text
        var levelGuideText = this.game.add.text(400, 370, "Select excercise levels", guideTextStyle)
        levelGuideText.anchor.setTo(0.5);
        var levelGuideText1 = this.game.add.text(400, 430, "You can select multiple levels", guideTextStyle)
        levelGuideText1.anchor.setTo(0.5);
        levelGuideText1.fontSize = "12px"
        //buttons for level
        var buttonLevelEasy = this.game.add.button(310, 400, "button2", this.clickHandler);
        buttonLevelEasy.anchor.setTo(0.5);
        buttonLevelEasy.scale.setTo(0.4, 0.7);
        var buttonLevelEasyText = this.game.add.text(buttonLevelEasy.position.x, buttonLevelEasy.position.y, "Easy", this.levelDifficultyTextstyle);
        buttonLevelEasyText.anchor.setTo(0.5);
        buttonLevelEasy.selected = false;

        var buttonLevelNormal = this.game.add.button(400, 400, "button2", this.clickHandler);
        buttonLevelNormal.anchor.setTo(0.5);
        buttonLevelNormal.scale.setTo(0.4, 0.7);
        var buttonLevelNormalText = this.game.add.text(buttonLevelNormal.position.x, buttonLevelNormal.position.y, "Normal", this.levelDifficultyTextstyle);
        buttonLevelNormalText.anchor.setTo(0.5);
        buttonLevelNormalText.selected = false;

        var buttonLevelHard = this.game.add.button(490, 400, "button2", this.clickHandler);
        buttonLevelHard.anchor.setTo(0.5);
        buttonLevelHard.scale.setTo(0.4 , 0.7);
        var buttonLevelHardText = this.game.add.text(buttonLevelHard.position.x, buttonLevelHard.position.y, "Hard", this.levelDifficultyTextstyle);
        buttonLevelHardText.anchor.setTo(0.5);
        buttonLevelHardText.selected = false;



        //excercise guide text
        var levelGuideText = this.game.add.text(400, 470, "Select game length", guideTextStyle)
        levelGuideText.anchor.setTo(0.5);

        //buttons for level length
        var buttonLengthShort = this.game.add.button(310, 500, "button2", this.clickHandler2);
        buttonLengthShort.anchor.setTo(0.5);
        buttonLengthShort.scale.setTo(0.4, 0.7);
        var buttonLengthNormal = this.game.add.button(400, 500, "button2", this.clickHandler2);
        buttonLengthNormal.anchor.setTo(0.5);
        buttonLengthNormal.scale.setTo(0.4, 0.7);
        var buttonLengthLong = this.game.add.button(490, 500, "button2", this.clickHandler2);
        buttonLengthLong.anchor.setTo(0.5);
        buttonLengthLong.scale.setTo(0.4 , 0.7);
        

        this.lengthButtons = this.add.group();
        this.lengthButtons.add(buttonLengthShort);
        this.lengthButtons.add(buttonLengthNormal);
        this.lengthButtons.add(buttonLengthLong);

        var buttonLengthLongText = this.game.add.text(buttonLengthLong.position.x, buttonLengthLong.position.y, "Long", this.levelDifficultyTextstyle);
        buttonLengthLongText.anchor.setTo(0.5);
        buttonLengthLongText.selected = false;
        var buttonLengthNormalText = this.game.add.text(buttonLengthNormal.position.x, buttonLengthNormal.position.y, "Normal", this.levelDifficultyTextstyle);
        buttonLengthNormalText.anchor.setTo(0.5);
        buttonLengthNormalText.selected = false;
        var buttonLengthShortText = this.game.add.text(buttonLengthShort.position.x, buttonLengthShort.position.y, "Short", this.levelDifficultyTextstyle);
        buttonLengthShortText.anchor.setTo(0.5);
        buttonLengthShort.selected = false;
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
		
	}





};