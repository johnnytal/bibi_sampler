var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        this.game.load.image("bg", "assets/bibi/images/bibi.jpg");
        this.game.load.spritesheet("button", "assets/bibi/images/button4.png", 486/2, 185);
        this.game.load.image("gear", "assets/bibi/images/gearBtn2.png");
        this.game.load.image("ok", "assets/bibi/images/ok.png");
        this.game.load.image("musicBtn", "assets/bibi/images/musicBtn.png");
        this.game.load.image("panel", "assets/bibi/images/panel.png");

        this.game.load.audio('bibi1', 'assets/bibi/audio/ad_tsavar.mp3');
        this.game.load.audio('bibi2', 'assets/bibi/audio/aravim.mp3');
        this.game.load.audio('bibi3', 'assets/bibi/audio/bomb.mp3');
        this.game.load.audio('bibi4', 'assets/bibi/audio/duck.mp3');
        this.game.load.audio('bibi5', 'assets/bibi/audio/dugri.mp3');
        this.game.load.audio('bibi6', 'assets/bibi/audio/ein_klum.mp3');
        this.game.load.audio('bibi7', 'assets/bibi/audio/hakol radud.mp3');
        this.game.load.audio('bibi8', 'assets/bibi/audio/iran.mp3');
        this.game.load.audio('bibi9', 'assets/bibi/audio/irtsu.mp3');
        this.game.load.audio('bibi10', 'assets/bibi/audio/kadentsia.mp3');
        this.game.load.audio('bibi11', 'assets/bibi/audio/yekablu.mp3');
        
        this.game.load.audio('musicSfx', 'assets/bibi/audio/music1.mp3');
        this.game.load.audio('musicSfx2', 'assets/bibi/audio/music2.mp3');
        this.game.load.audio('musicSfx3', 'assets/bibi/audio/music3.mp3');
    },
    
    create: function(){
        this.game.state.start("Game"); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};