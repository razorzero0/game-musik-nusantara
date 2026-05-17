import { BaseScene } from "./BaseScene.js";

export class GameOver extends BaseScene {
  constructor() {
    super("GameOver");
  }

  // Tangkap data yang dikirim dari Game.js
  init(data) {
    this.finalScore = data.finalScore || 0;
    this.reason = data.reason || "Waktu Habis";
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // Overlay semi-transparan hitam lebih gelap
    this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.8)
      .setOrigin(0, 0);

    // Modal & Tombol
    this.bgModal1 = this.add.image(0, 0, "modal1");
    this.btnTry = this.add.image(400, 350, "btnTry"); // Main lagi
    this.btnHome = this.add.image(-400, 350, "btnHome"); // Ke menu utama

    this.buttonLg(this.btnHome);
    this.buttonLg(this.btnTry);
    this.applyButtonEffect(this.btnHome);
    this.applyButtonEffect(this.btnTry);

    // --- PENYESUAIAN TEKS ---

    // Teks Judul (GAME OVER) - Dibuat lebih hangat dan menyatu
    this.titleText = this.add
      .text(0, -200, "GAME OVER", {
        fontFamily: '"Fredoka", "Chewy", "Comic Sans MS", cursive',
        fontSize: "180px",
        color: "#5C2E00", // Cokelat gelap hangat menggantikan merah terang
        stroke: "#FFFFFF", // Outline putih
        strokeThickness: 8,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    // Tambahan bayangan tipis agar teks lebih menonjol
    this.titleText.setShadow(2, 2, "#333333", 2, true, false);

    // Teks Alasan (Nyawa habis!) - Dipertebal dengan warna putih agar kontras
    this.reasonText = this.add
      .text(0, -10, this.reason, {
        fontFamily: '"Fredoka", "Chewy", "Comic Sans MS", cursive',
        fontSize: "40px",
        color: "#FFFFFF", // Teks putih solid
        stroke: "#5C2E00", // Outline cokelat gelap tebal
        strokeThickness: 8, // Ketebalan outline dinaikkan
        fontStyle: "bold", // Ditambahkan efek bold
      })
      .setOrigin(0.5);

    // Teks Skor - Diselaraskan dengan warna hijau eco modern
    this.scoreText = this.add
      .text(0, 100, `Skor Akhir: ${this.finalScore}`, {
        fontFamily: '"Fredoka", "Chewy", "Comic Sans MS", cursive',
        fontSize: "50px",
        color: "#16A34A", // Hijau modern
        stroke: "#FFFFFF", // Outline putih untuk memisahkan dari background
        strokeThickness: 6,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.scoreText.setShadow(2, 2, "#000000", 2, true, false);

    // --- AKHIR PENYESUAIAN TEKS ---

    // Container
    this.modalContainer = this.add.container(centerX, centerY, [
      this.bgModal1,
      this.titleText,
      this.reasonText,
      this.scoreText,
      this.btnHome,
      this.btnTry,
    ]);

    // --- AKSI TOMBOL ---

    // Tombol Main Lagi (Try)
    this.btnTry.once("pointerdown", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.stop("Game"); // Hentikan Game lama
        this.scene.start("Game"); // Mulai ulang Game baru
      });
    });

    // Tombol Kembali ke Awal (Home)
    this.btnHome.once("pointerdown", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.stop("Game"); // Hentikan Game di background
        this.scene.start("Start"); // Kembali ke menu utama
      });
    });
  }
}
