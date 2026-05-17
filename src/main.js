import { Boot } from "./scenes/Boot.js";
import { Start } from "./scenes/Start.js";
import { Tutorial } from "./scenes/Tutorial.js";
import { Game } from "./scenes/Game.js";
import { Pause } from "./scenes/Pause.js";
import { GameOver } from "./scenes/GameOver.js";
import { Settings } from "./scenes/Settings.js";
import { Collections } from "./scenes/Collections.js";

const config = {
  type: Phaser.AUTO,
  title: "Overlord Rising",
  description: "",
  parent: "game-container",
  width: 1920,
  height: 1080,
  backgroundColor: "#000000",
  pixelArt: false,
  scene: [Boot, Start, Tutorial, Game, Pause, GameOver, Collections, Settings],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
