import SceneBase from './SceneBase';

export default class ScoringSky extends SceneBase {

  constructor() {
    super();
    this.sky = null;
    this.einsteinFly = null;
  }

  // -------------------------------------------------------------------------
  create() {
    console.log("ScoringSky");

    // focus on 0, 0
    this.setView();

    // add sky
    this.sky = this.add.sprite(0, this.gameHeight / 2, 'sky').setOrigin(0.5, 1);

    // add einsteinFly
    this.einsteinFly = this.add.sprite(200, 141, 'einsteinFly').setOrigin(0.5, 1);
    this.anims.create({
      key: 'einsteinFly',
      frames: this.anims.generateFrameNumbers('einsteinFly'),
      frameRate: 18,
      repeat: -1
    });
    this.einsteinFly.play('einsteinFly');

    // sky anim
    this.tweens.add({
      targets: this.sky,
      y: this.skyPosition(),
      ease: 'Sine.easeOut',
      duration: this.skyPosition() + 1000,
      loop: 0,
      onComplete: () => {
        this.einsteinFlyAnim()
      }
    });

  }

  skyPosition() {
    return (this.sky.height - 413) * (this.App.score / 100);
  }

  einsteinFlyAnim() {
    this.einsteinFly.anims.stop();
    this.showScore();
    if (this.App.score > 96) {
      this.einsteinFly.setTexture('like');
      this.tweens.add({
        targets: this.einsteinFly,
        x: 500,
        y: -330,
        angle: 90,
        scale: 0.1,
        duration: 100000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
      });
    } else {
      this.einsteinFly.setTexture('einsteinDown', 0);
      setTimeout(() => {
        this.tweens.add({
          targets: this.einsteinFly,
          x: 200,
          y: this.gameHeight / 2,
          duration: 1000,
          ease: 'Sine.easeIn',
          repeat: 0,
          onStart: () => {
            this.einsteinFly.setTexture('einsteinDown', 1);
          },
          onComplete: () => {
            this.tweens.add({
              targets: this.einsteinFly,
              x: 200,
              y: this.gameHeight + 300,
              duration: 500,
              ease: 'Linear',
              repeat: 0,
              onStart: () => {
                this.einsteinFly.setTexture('einsteinDown', 2);
              },
              onComplete: () => {
                setTimeout(() => {
                  this.scene.start("FallingDown");
                }, 1000);
              }
            })
          }
        });
      }, 100);
    }
  }

}
