import { BaseScene } from './BaseScene.js';

export class Pause extends BaseScene {
    constructor() {
        super('Pause');
    }

    create() {
        // Efek transisi masuk
        this.cameras.main.fadeIn(300, 0, 0, 0);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Overlay semi-transparan hitam agar game di belakang tetap terlihat
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.7).setOrigin(0, 0);

        // Modal dan elemen di-set koordinatnya relatif terhadap Container (0, 0)
        this.bgModal1 = this.add.image(0, 0, 'modal1');
        this.btnContinue = this.add.image(400, 340, 'btnContinue'); // Lanjut main
        this.btnBeranda = this.add.image(-400, 340, 'btnBeranda'); // Ke menu utama

        this.buttonMd(this.btnContinue);
        this.buttonMd(this.btnBeranda);
        this.applyButtonEffect(this.btnContinue);
        this.applyButtonEffect(this.btnBeranda);

        // Teks Pause
        this.pauseText = this.add.text(0, -50, 'GAME PAUSED', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '150px',
            color: '#FFF8DC',
            stroke: '#5C2E00',
            strokeThickness: 8,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Container: Masukkan semua elemen UI ke sini
        this.modalContainer = this.add.container(centerX, centerY, [
            this.bgModal1,
            this.pauseText,
            this.btnContinue,
            this.btnBeranda
        ]);

        // --- AKSI TOMBOL ---

        // Tombol Lanjut (Play)
        this.btnContinue.once("pointerdown", () => {
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.resume('Game'); // Lanjutkan Game yang ter-pause
                this.scene.stop();         // Matikan scene Pause ini
            });
        });

        // Tombol Kembali ke Awal (Home)
        this.btnBeranda.once("pointerdown", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.stop('Game');   // Matikan Game di background
                this.scene.start('Start'); // Kembali ke scene menu awal
            });
        });
    }
}