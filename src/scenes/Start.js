import { BaseScene } from './BaseScene.js';

export class Start extends BaseScene {
    constructor() {
        super('Start');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        // --- LAYER BACKGROUND (Z-Index Paling Belakang) ---
        // Parameter: x, y, width, height, key
        this.sky = this.add.tileSprite(0, 0, 1920, 1080, 'sky').setOrigin(0, 0);
        
        // Awan (Urutan cloud1 paling belakang/paling lambat)
        this.cloud1 = this.add.tileSprite(0, 0, 1920, 1080, 'cloud1').setOrigin(0, 0);
        this.cloud2 = this.add.tileSprite(0, 0, 1920, 1080, 'cloud2').setOrigin(0, 0);
        this.cloud3 = this.add.tileSprite(0, 0, 1920, 1080, 'cloud3').setOrigin(0, 0);


        // Background Utama (Tanah/Bangunan tanpa langit)
        this.background = this.add.tileSprite(0, 0, 1920, 1080, 'background').setOrigin(0, 0);

        // --- LAYER UI (Z-Index Paling Depan) ---
        this.title = this.add.image(920, 350, 'title');
        this.btnStart = this.add.image(920, 750, 'btnStart').setDisplaySize(550, 275);
        this.btnMusicOn = this.add.image(1770, 100, 'btnMusicOn').setDisplaySize(400, 200);
        this.btnMusicCollections = this.add.image(250, 950, 'music-collections').setDisplaySize(400, 200);
        this.btnSetting = this.add.image(1670, 950, 'setting').setDisplaySize(400, 200);

        // Terapkan efek hover ke semua tombol
        this.applyButtonEffect(this.btnStart);
        this.applyButtonEffect(this.btnMusicCollections);
        this.applyButtonEffect(this.btnSetting);
        this.applyButtonEffect(this.btnMusicOn);
        this.btnStart.once("pointerdown", () => {

        // Fade out
        this.cameras.main.fadeOut(500, 0, 0, 0);

        // Setelah fade selesai
        this.cameras.main.once('camerafadeoutcomplete', () => {

            this.scene.start('Tutorial');

            });

        });

    }

  

    update() {
        // Efek Parallax: Semakin jauh objek, semakin kecil nilainya (semakin lambat)
        this.cloud1.tilePositionX += 0.5;   // Awan paling lambat
        this.cloud2.tilePositionX += 0.8;
        this.cloud3.tilePositionX += 1.2;

    }
}