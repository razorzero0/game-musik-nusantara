export class Boot extends Phaser.Scene {

    constructor() {
        super('Boot');
    }

    preload() {

  // Load Assets
        this.load.image('sky', 'assets/img/bg/sky.png');
        this.load.image('cloud1', 'assets/img/bg/cloud1.png');
        this.load.image('cloud2', 'assets/img/bg/cloud5.png');
        this.load.image('cloud3', 'assets/img/bg/cloud6.png');
        this.load.image('background', 'assets/img/bg/main-no-sky.png');
        
        this.load.image('btnStart', 'assets/img/buttons/play.png');
        this.load.image('btnMusicOn', 'assets/img/buttons/music-on.png');
        this.load.image('title', 'assets/img/text/main-title.png');
        this.load.image('music-collections', 'assets/img/buttons/music-collections.png');
        this.load.image('setting', 'assets/img/buttons/setting.png');


        this.load.image('background-dark', 'assets/img/bg/main-game-dark.png');
        this.load.image('background-game', 'assets/img/bg/main-game.png');
        this.load.image('modal1', 'assets/img/modal/modal-v1.png');
        this.load.image('btnClose', 'assets/img/buttons/close.png');
        this.load.image('btnPlay', 'assets/img/buttons/start.png');
        this.load.image('btnCancel', 'assets/img/buttons/cancel.png');
        this.load.image('btnCorrect', 'assets/img/buttons/correct.png');
        this.load.image('btnIncorrect', 'assets/img/buttons/incorrect.png');
        this.load.image('angklung', 'assets/img/items/angklung.png');
        this.load.image('gamelan', 'assets/img/items/gamelan.png');
        this.load.image('kecapi', 'assets/img/items/kecapi.png');
        this.load.image('durian', 'assets/img/items/durian.png');
        this.load.image('sendal', 'assets/img/items/sendal.png');
        this.load.image('intruksi', 'assets/img/text/intruksi.png');
        this.load.image('love', 'assets/img/text/love.png');
        this.load.image('btnPause', 'assets/img/buttons/pause.png');
        this.load.image('btnTry', 'assets/img/buttons/try.png');
        this.load.image('btnHome', 'assets/img/buttons/home.png');
        this.load.image('btnContinue', 'assets/img/buttons/lanjutkan.png');
        this.load.image('btnBeranda', 'assets/img/buttons/beranda.png');


    }



    create() {
        this.scene.start('Start');
        
    }

    applyButtonEffect(button) {
        const origWidth = button.displayWidth;
        const origHeight = button.displayHeight;

        button.setInteractive({ cursor: 'pointer' });

        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                displayWidth: origWidth * 1.1,
                displayHeight: origHeight * 1.1,
                duration: 200,
                ease: 'Power2'
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                displayWidth: origWidth,
                displayHeight: origHeight,
                duration: 200,
                ease: 'Power2'
            });
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scale: button.scale * 0.9,
                duration: 100,
                yoyo: true,
                ease: 'Linear'
            });
        });
    }
}