import App from '../App';
import StorageUtils from '../Utils/StorageUtils';

export default class SceneBase extends Phaser.Scene {

  constructor() {
    super();
    this.cloud = 1;
    this.wave2;
  }

  get App() {
    return App;
  }

  get StorageUtils() {
    return StorageUtils;
  }

  // --------------------------------------------------------------------
  get gameWidth() {
    return this.sys.game.config.width;
  }

  // --------------------------------------------------------------------
  get gameHeight() {
    return this.sys.game.config.height;
  }

  // --------------------------------------------------------------------
  setView() {
    // focus on center
    this.cameras.main.centerOn(0, 0);
  }

  addBackground() {
    this.add.sprite(0, 0, 'background');
  }

  addClouds() {
    const cloud = this.add.sprite(640 + 168, -250, 'cloud' + this.cloud);
    this.tweens.add({
      targets: cloud,
      x: - (this.gameWidth / 2 + 168),
      duration: 20000,
      ease: 'Linear',
      loop: -1,
      onLoop: () => {
        if (this.cloud === 3) {
          this.cloud = 2;
          cloud.setTexture('cloud' + this.cloud);
        } else if (this.cloud === 2) {
          this.cloud = 1;
          cloud.setTexture('cloud' + this.cloud);
        } else {
          this.cloud = 3;
          cloud.setTexture('cloud' + this.cloud);
        }
      }
    });
  }

  addWaves() {
    const wave1 = this.add.sprite(30, (this.gameHeight / 2) + 30, 'wave1').setOrigin(.5, 1);
    this.wave2 = this.physics.add.sprite(-30, (this.gameHeight / 2) + 20, 'wave2').setOrigin(.5, 1);

    this.tweens.add({
      targets: wave1,
      x: 50,
      ease: 'Linear',
      duration: 2000,
      yoyo: true,
      loop: -1,
    });

    this.tweens.add({
      targets: this.wave2,
      x: -50,
      ease: 'Linear',
      duration: 2000,
      yoyo: true,
      loop: -1,
    });
  }

  showScore() {
    this.add.bitmapText(-this.gameWidth / 2 + 25, -this.gameHeight / 2 + 25, 'timotheos', `PONTUAÇÃO: ${this.App.score}`, 72);
  }
  onClick(obj, callback) {
    obj.setInteractive();
    obj.on("pointerover", () => {
      this.sys.canvas.style.cursor = "pointer";
    });
    obj.on("pointerout", () => {
      this.sys.canvas.style.cursor = "default";
    });
    obj.on("pointerdown", callback);
  }
}