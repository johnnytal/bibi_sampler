var gameMain = function(game){
    multiSounds = false;
    
    playModes = ['toggle', 'trigger', 'gate', 'pause', 'none'];
    mode = playModes[1];

    sounds = [];
    musics = [];
    
    theButton = null;
    
    soundButtons = [];
    musicButtons = [];
 
    texts = [];
    textsText = [ // text for each sound button
	    'Hakirot', 'Arabs', 'Bomb', 'Duck', 'Dugri', 'Ein Klum', 
	    'Radud', 'Iran', 'Fire', 'No need', 'Give'
    ];
    
    musicText = [];
    textsMusicText = [ // text for each music button
    	'Techno', 'Country', 'March'
    ];
    
    SOUND_BUTTONS_N = textsText.length;
    MUSIC_BUTTONS_N = textsMusicText.length;
};

gameMain.prototype = {
    create: function(){
		loadSounds();
        modal = new gameModal(game);
        
        bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.82;

        createSoundBtns();
        createMusicBtns();
        buttons();

        menuBtn = this.add.sprite(578, 680, 'gear');
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(openOptions, this);
        
    	settingsText = game.add.text(578, 680, 'Settings', {
        	font: '42px ' + font, fill: 'darkgreen', align: 'center', stroke:'yellow', strokeThickness: 1
   		});
   		settingsText.x = menuBtn.x + menuBtn.width / 2 - settingsText.width / 2;
   		settingsText.y = menuBtn.y + menuBtn.height / 2 - settingsText.height / 2;

		setTimeout(function(){
			try{
                StatusBar.hide;
            } catch(e){} 
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}   
		}, 1000);
		
		initAd();
    }, 
    update: function(){	
		for (x=0; x<keyNotesArray.length; x++){
			if (keyNotesArray[x].isDown){
				if (sounds[x].isPlaying) sounds[x].stop();
				playSound(x, 'kb');
				
			}
			else if (theButton != null && theButton.isUp && sounds[x].isPlaying && mode == 'gate'){
	            sounds[x].stop();
			}
		}
    }
};

function playSound(item, kb){	
	var place;
	
	if (kb == 'kb'){
		place = item;
		theButton = keyNotesArray[item];
	}
	else{
		place = soundButtons.indexOf(item);
		theButton = soundButtons[place];
	}
	
	var sprite = soundButtons[place];
	var sound = sounds[place];

    if (!sound.isPlaying){
        if (!multiSounds){ // no multichannel
        	stopSounds();
		}
		
        if (!sound.paused){
            sound.play();    
        }
        else{
            sound.resume();
        }
		
		sprite.frame = 1;
        sprite.tint = 0xe3dfff;
        
        sound.onStop.add(function(){
           sprite.frame = 0;
           sprite.tint = 0xffffff;
        }, this);
    } 
    
    else{
        if (mode == 'toggle'){
            sound.stop();
        }
        else if (mode == 'trigger'){
            sound.play();
        }
        else if (mode == 'pause'){
            sound.pause();
        }
    }    
}

function stopSounds(){
    for (n = 0; n < sounds.length; n++){
        sounds[n].stop();
    }   
}

function playMusic(item){
	var place = musicButtons.indexOf(item);
	
	var sprite = musicButtons[place];
	var music = musics[place];
	
	if (!musics[place].isPlaying){
   	 	var rnd = game.rnd.integerInRange(0, 4);
   	 	if (rnd == 2){ 	 	 	
			if(AdMob) AdMob.showInterstitial();
	  	}
	  	
   	 	musics[place].play();
   	 	sprite.tint = 0xcc33ff;
   	 	
   	 	for (m=0; m<musics.length; m++){
   	 		if (musics[m].isPlaying && m != place){
   	 			musics[m].stop();
   	 			musicButtons[m].tint = 0xffffff;
   	 		}
   	 	}
    }
    else{
    	musics[place].stop();
    	sprite.tint = 0xffffff;
    }
}

function openOptions(_this){
    _this.inputEnabled = false;
    optionsColor = '0x5555ff';
    strokeColor = "0x000000";
    sizeFont = 48;
    
    modal.createModal({
        type:"options",
        includeBackground: true, modalCloseOnInput: false,
        itemsArr: [
            { type: "image", content: "panel", offsetY: 0, offsetX: 0, contentScale: 2 },
            
            { type: "text", content: "Rewind mode:", fontSize: sizeFont, color: "0xFEFF49",
                offsetY: -250, stroke: strokeColor, strokeThickness: 5, fontFamily: font,
            },
            
            { type: "text", content: "Toggle", fontSize: sizeFont, color: optionsColor,
                stroke: strokeColor, strokeThickness: 1, offsetY: -150, fontFamily: font,
                callback: function () {
                    changePlayMode(playModes[0], this);         
                }
            },
            
            { type: "text", content: "Trigger", fontSize: sizeFont, color: optionsColor, 
                stroke: strokeColor, strokeThickness: 1, offsetY: -70, fontFamily: font,
                callback: function () {
                    changePlayMode(playModes[1], this);
                }
            },
            
            { type: "text", content: "Gate", fontSize: sizeFont,  color: optionsColor, 
                stroke: strokeColor, strokeThickness: 1, offsetY: 10, fontFamily: font,
                callback: function () {
                    changePlayMode(playModes[2], this);
                }
            },
            
            { type: "text", content: "Pause", fontSize: sizeFont, color: optionsColor, 
                stroke: strokeColor, strokeThickness: 1, offsetY: 90, fontFamily: font,
                callback: function () {
                    changePlayMode(playModes[3], this);
                }
            },
            
            { type: "text", content: "None", fontSize: sizeFont, color: optionsColor, 
                stroke: strokeColor, strokeThickness: 1, offsetY: 170,  fontFamily: font,
                callback: function () {
                    changePlayMode(playModes[4], this);
                }
            },
            
            { type: "text", content: "Allow Multichannel", fontSize: sizeFont, color: optionsColor,
                offsetY: 270, offsetX: 0,  fontFamily: font, stroke: '0xf00fff', strokeThickness: 3, 
                callback: function () {
                    allowMultiple(this);
                }
            },
            
            { type: "image", content: "ok", offsetY: 100, offsetX: 300,
                callback: function () {
                    modal.hideModal('options');
                    _this.inputEnabled = true;
                }
            },
        ]
   });
   
   modal.showModal("options"); 

   if (multiSounds) modal.getModalItem('options',9).tint = 0x00ff00;
   if (mode == 'toggle') modal.getModalItem('options',4).tint = 0x00ff00;
   else if (mode == 'trigger') modal.getModalItem('options',5).tint = 0x00ff00;
   else if (mode == 'gate') modal.getModalItem('options',6).tint = 0x00ff00;
   else if (mode == 'pause') modal.getModalItem('options',7).tint = 0x00ff00;
   else if (mode == 'none') modal.getModalItem('options',8).tint = 0x00ff00;

   for (n=0; n<11; n++){
       game.add.tween(modal.getModalItem('options',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
   }    
}

function changePlayMode(_mode, btn){
    mode = _mode;
    for (n=8; n>3; n--){
        modal.getModalItem('options', n).tint = 0xffffff;
    }
    btn.tint = 0x00ff00;
}

function allowMultiple(btn){
    if (multiSounds) multiSounds = false;
    else { multiSounds = true; }
    
    if (btn.tint == 0xffffff) btn.tint = 0x00ff00;
    else { btn.tint = 0xffffff; }
}

function buttons(){
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	EKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
	rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
	uKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
	iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
	jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	
	keyNotesArray = [wKey, EKey, rKey, sKey, dKey, fKey, uKey, iKey, oKey, jKey, kKey];
}

function createSoundBtns(){        
    soundBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	        
    for(b = 0; b < SOUND_BUTTONS_N; b++){
    	soundButtons[b] = soundBtnsGroup.create(28 + (275 * (b%3)), 15 + (Math.floor(b/3) * 220), 'button');
    	soundButtons[b].alpha = 0.89;
    	soundButtons[b].inputEnabled = true;

		soundButtons[b].events.onInputDown.add(playSound, this);
		
        soundButtons[b].events.onInputUp.add(function(){
            if (mode == 'gate') stopSounds();
        }, this);  
    }
    
    for(t = 0; t < SOUND_BUTTONS_N; t++){
    	texts[t] = game.add.text(0, 0, textsText[t], {
        	font: '48px ' + font, fill: 'purple', align: 'center', stroke:'grey', strokeThickness: 1
   		});
   		
   		texts[t].x = soundButtons[t].x + soundButtons[t].width / 2 - texts[t].width / 2;
   		texts[t].y = soundButtons[t].y + soundButtons[t].height / 2 - texts[t].height / 2;
    }
}

function createMusicBtns(){
	musicBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	
    for(m = 0; m < MUSIC_BUTTONS_N; m++){
    	musicButtons[m] = musicBtnsGroup.create(15 + (280 * m), 960, 'musicBtn');
    	musicButtons[m].alpha = 0.87;
    	musicButtons[m].inputEnabled = true;

    	musicButtons[m].events.onInputDown.add(playMusic, this);        
    }
 
    for(t = 0; t < MUSIC_BUTTONS_N; t++){
    	musicText[t] = game.add.text(0, 0, textsMusicText[t], {
        	font: '56px ' + font, fill: 'blue', align: 'center', stroke:'maroon', strokeThickness: 1
   		});
   		
   		musicText[t].x = musicButtons[t].x + musicButtons[t].width / 2 - musicText[t].width / 2;
   		musicText[t].y = musicButtons[t].y + musicButtons[t].height / 2 - musicText[t].height / 2 + 10;
    }
    
	musicAddText = game.add.text(156, 900, 'ADD  DRAMATIC  MUSIC:', {
		font: '46px ' + font, fill: 'yellow', align: 'center', stroke:'black', strokeThickness: 5
	});
}

function loadSounds(){
    sfxbibi1 = game.add.audio('bibi1');
    sfxbibi2 = game.add.audio('bibi2');
    sfxbibi3 = game.add.audio('bibi3');
    sfxbibi4 = game.add.audio('bibi4');
    sfxbibi5 = game.add.audio('bibi5');
    sfxbibi6 = game.add.audio('bibi6');
    sfxbibi7 = game.add.audio('bibi7');
    sfxbibi8 = game.add.audio('bibi8');
    sfxbibi9 = game.add.audio('bibi9');
    sfxbibi10 = game.add.audio('bibi10');
    sfxbibi11 = game.add.audio('bibi11');
    
    sounds = [ 
        sfxbibi1, sfxbibi2, sfxbibi3,
        sfxbibi4, sfxbibi5, sfxbibi6,
        sfxbibi7, sfxbibi8, sfxbibi9,
        sfxbibi10, sfxbibi11 
    ];
    
    sfxMusic = game.add.audio('musicSfx', 0.7, true);
    sfxMusic2 = game.add.audio('musicSfx2', 0.7, true);
    sfxMusic3 = game.add.audio('musicSfx3', 0.7, true);
    
    musics = [sfxMusic, sfxMusic2, sfxMusic3];
}

function initAd(){
	admobid = {
      banner: 'ca-app-pub-9795366520625065/7045597764',
      interstitial: 'ca-app-pub-9795366520625065/4747678738'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.TOP_CENTER,
    	autoShow: true 
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}