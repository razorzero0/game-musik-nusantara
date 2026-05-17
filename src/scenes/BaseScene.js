 export class BaseScene extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    buttonMd(button){
        button.setDisplaySize(400, 200)
    }
    buttonSm(button){
        button.setDisplaySize(300, 150)
    }
    buttonLg(button){
        button.setDisplaySize(500, 250)
    }
    buttonXl(button){
        button.setDisplaySize(700, 350)
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