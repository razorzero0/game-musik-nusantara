
import { BaseScene } from './BaseScene.js';

export class Tutorial extends BaseScene {

    constructor() {
        super('Tutorial');
    }

    create() {

        this.cameras.main.fadeIn(500, 0, 0, 0);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Background
        this.bgGameDark = this.add
            .image(0, 0, 'background-dark')
            .setOrigin(0,0);

        // Modal
        this.bgModal1 = this.add.image(0, 0, 'modal1');

        // Tombol
        this.intruksi = this.add.image(0, -400, 'intruksi')

        this.btnPlay = this.add.image(400, 380, 'btnPlay')

        this.btnCancel = this.add.image(-400, 380, 'btnCancel')

        this.btnIncorrect = this.add.image(-400, -270, 'btnIncorrect')
        this.btnCorrect = this.add.image(400, -270, 'btnCorrect')

        this.sendal = this.add.image(-550, -80, 'sendal')
        this.durian = this.add.image(-300, -80, 'durian')

        this.angklung = this.add.image(150, -80, 'angklung')
        this.gamelan = this.add.image(400, -80, 'gamelan')
        this.kecapi = this.add.image(650, -80, 'kecapi')
        // this.buttonLg(this.btnClose)
        this.buttonMd(this.btnPlay)
        this.buttonMd(this.btnCancel)
        this.buttonSm(this.btnCorrect)
        this.buttonSm(this.btnIncorrect)
        this.buttonMd(this.angklung)
        this.buttonXl(this.intruksi)
        this.buttonMd(this.gamelan)
        this.buttonMd(this.kecapi)
        this.buttonMd(this.durian)
        this.buttonMd(this.sendal)
        // this.applyButtonEffect(this.btnClose);
        this.applyButtonEffect(this.btnPlay);
        this.applyButtonEffect(this.btnCancel);
        this.applyButtonEffect(this.durian);
        this.applyButtonEffect(this.sendal);
        this.applyButtonEffect(this.angklung);
        this.applyButtonEffect(this.gamelan);
        this.applyButtonEffect(this.kecapi);

        this.tutorialText = this.add.text(
            0,
            180,
            'Pilih item yang sesuai dengan ketentuan di atas!\n Dan kumpulkan poin sebanyak mungkin dalam 1 menit',
            {
                fontFamily: 'Arial',
                fontSize: '42px',
                color: '#FFF8DC',
                align: 'center',
                stroke: '#5C2E00',
                strokeThickness: 8,
                lineSpacing: 12,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.btnPlay.once("pointerdown", () => {

            // Fade out
            this.cameras.main.fadeOut(500, 0, 0, 0);

            // Setelah fade selesai
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Game');

                });

        });

        // Container
        this.modalContainer = this.add.container(centerX, centerY, [
            this.bgModal1,
            this.intruksi,
            this.btnPlay,
            this.btnCancel,
            this.btnCorrect,
            this.btnIncorrect,
            this.angklung,
            this.gamelan,
            this.kecapi,
            this.sendal,
            this.durian,
                this.tutorialText

        ]);

        this.btnCancel.once("pointerdown", () => {

        // Fade out
        this.cameras.main.fadeOut(500, 0, 0, 0);

        // Setelah fade selesai
        this.cameras.main.once('camerafadeoutcomplete', () => {

            this.scene.start('Start');

            });

        });

    }

}