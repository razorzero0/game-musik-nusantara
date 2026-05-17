import { BaseScene } from './BaseScene.js';

export class Game extends BaseScene {

    constructor() {
        super('Game');
    }

    create() {
        
        this.cameras.main.fadeIn(500, 0, 0, 0);

        const width = this.scale.width;
        const height = this.scale.height;
        const centerX = width / 2;

        // Background
        this.bgGameDark = this.add
            .image(0, 0, 'background-game')
            .setOrigin(0,0);

        // --- SISTEM GAME STATE ---
        this.score = 0;
        this.combo = 0;
        this.lives = 3;
        this.timeLeft = 60; // 60 detik = 1 menit

        // --- UI: POJOK KIRI ATAS (WAKTU) ---
        this.countdownText = this.add.text(
            50,
            80,
            `Waktu: ${this.timeLeft}`,
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '50px',
                color: '#FFF8DC',
                stroke: '#5C2E00',
                strokeThickness: 6,
                fontStyle: 'bold'
            }
        ).setOrigin(0, 0.5);

        // --- UI: TENGAH ATAS (NYAWA / LOVE) ---
        this.hearts = [];
        // Jarak antar ikon love adalah 80px
        const startX = centerX - 180; 
        for (let i = 0; i < 3; i++) {
            let heart = this.add.image(startX + (i * 180), 80, 'love');
            this.buttonSm(heart);
            this.hearts.push(heart);
        }

        // --- UI: POJOK KANAN ATAS (SKOR & PAUSE) ---
        this.btnPause = this.add.image(width - 110, 80, 'btnPause');
        this.buttonMd(this.btnPause);
        
        // Teks Poin/Skor diletakkan di sebelah kiri tombol pause
        this.scoreText = this.add.text(
            width - 210, 
            80, 
            `Poin: 0`, 
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '50px',
                color: '#FFF8DC',
                stroke: '#5C2E00',
                strokeThickness: 6,
                fontStyle: 'bold'
            }
        ).setOrigin(1, 0.5); // Origin X = 1 agar rata kanan

        // --- EVENT KLIK TOMBOL PAUSE ---
        this.btnPause.setInteractive();
        this.btnPause.on('pointerdown', () => {
            // Jeda (freeze) scene Game ini
            this.scene.pause(); 
            // Jalankan scene Pause di atasnya
            this.scene.launch('Pause'); 
        });

        // --- TIMERS ---
        // 1. Timer Waktu Mundur
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });

        // 2. Timer Spawner Item (Memunculkan item yang jatuh)
        this.spawnTimer = this.time.addEvent({
            delay: 800, // Kecepatan kemunculan item (0.8 detik)
            callback: this.spawnItem,
            callbackScope: this,
            loop: true
        });
    }

    // --- METHOD UNTUK UPDATE TIMER WAKTU ---
    onTimerTick() {
        this.timeLeft -= 1;
        this.countdownText.setText(`Waktu: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
            this.gameOver("Waktu Habis!");
        }
    }

    // --- METHOD UNTUK MEMUNCULKAN ITEM ---
    spawnItem() {
        const goodItems = ['angklung', 'gamelan', 'kecapi'];
        const badItems = ['sendal', 'durian'];
        
        const width = this.scale.width;
        // Posisi X acak agar tidak menempel di dinding layar
        const startX = Phaser.Math.Between(150, width - 150);
        
        // Peluang muncul: 60% alat musik (good), 40% durian/sendal (bad)
        const isGood = Math.random() > 0.4; 
        const itemKey = isGood 
            ? Phaser.Utils.Array.GetRandom(goodItems) 
            : Phaser.Utils.Array.GetRandom(badItems);

        // Spawn item di luar layar bagian atas (Y = -100)
        let item = this.add.image(startX, -100, itemKey);
        this.buttonMd(item); // Terapkan styling/skala yang sama dari base scene
        item.setAlpha(0); // Mulai transparan
        
        // Jadikan item bisa diklik
        item.setInteractive();

        // Tween 1: Item jatuh ke bawah layar
        let fallTween = this.tweens.add({
            targets: item,
            y: this.scale.height + 150,
            duration: Phaser.Math.Between(3000, 4500), // Kecepatan jatuh acak
            onComplete: () => {
                // Hapus item dari memori jika tidak diklik dan melewati batas bawah
                if (item && item.active) {
                    // Jika alat musik lolos ke bawah (opsional): bisa putus combo di sini
                    if (isGood) this.combo = 0; 
                    item.destroy();
                }
            }
        });

        // Tween 2: Efek Fade In saat melewati tombol atas
        this.tweens.add({
            targets: item,
            alpha: 1,
            duration: 800
        });

        // Event saat item diklik
        item.once('pointerdown', () => {
            // Matikan interaksi dan hentikan tween animasi jatuh
            item.disableInteractive();
            fallTween.stop();

            if (isGood) {
                // LOGIKA ITEM BAIK (Alat Musik)
                this.combo += 1;
                let pointsEarned = 10 * this.combo; // Poin dikalikan combo
                this.score += pointsEarned;
                this.scoreText.setText(`Poin: ${this.score}`);
                
                // Animasi Teks Pop-up
                let popText = `+${pointsEarned}\n(Combo x${this.combo})`;
                this.showPopupText(item.x, item.y, popText, '#00FF00'); // Warna Hijau

                // Hancurkan item
                item.destroy();
            } else {
                // LOGIKA ITEM BURUK (Sendal / Durian)
                this.combo = 0; // Reset Combo
                this.lives -= 1;
                
                // Hilangkan 1 gambar love
                if (this.lives >= 0) {
                    this.tweens.add({
                        targets: this.hearts[this.lives],
                        alpha: 0,
                        scale: 1.5,
                        duration: 300
                    });
                }

                // Animasi Teks Pop-up Ouch
                this.showPopupText(item.x, item.y, "OUCH!", '#FF0000'); // Warna Merah

                // Beri efek getar kecil (Camera Shake) sebagai feedback damage
                this.cameras.main.shake(200, 0.01);
                
                item.destroy();

                // Cek Game Over
                if (this.lives <= 0) {
                    this.gameOver("Nyawa Habis!");
                }
            }
        });
    }

    // --- METHOD UNTUK ANIMASI TEKS POP-UP KETIKA ITEM DIKLIK ---
    showPopupText(x, y, message, color) {
        let text = this.add.text(x, y, message, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '40px',
            color: color,
            stroke: '#000000',
            strokeThickness: 6,
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Teks melayang ke atas dan menghilang
        this.tweens.add({
            targets: text,
            y: y - 100,
            alpha: 0,
            duration: 800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                text.destroy();
            }
        });
    }

    // --- METHOD UNTUK GAME OVER ---
    gameOver(reason) {
        console.log("Game Over:", reason);
        
        // Hentikan (pause) scene Game agar semua timer dan item jatuh berhenti
        this.scene.pause(); 
        
        // Jalankan scene GameOver sebagai overlay, dan kirimkan data skor & alasan
        this.scene.launch('GameOver', { finalScore: this.score, reason: reason }); 
    }
}