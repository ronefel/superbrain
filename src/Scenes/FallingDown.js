import SceneBase from './SceneBase';

export default class FallingDown extends SceneBase {

  constructor() {
    super();
    this.pierx = 400;
    this.piery = 270;
  }

  // --------------------------------------------------------------------
  create() {
    console.log("Play");

    // focus on 0, 0
    this.setView();

    // background
    this.addBackground();

    // cloud
    this.addClouds();

    this.showScore();

    // einstein
    const einstein = this.physics.add.sprite(-330, -30 - this.gameHeight / 2, 'einsteinFly').setAngle(180).setScale(0.2);
    this.tweens.add({
      targets: einstein,
      y: -30 + this.gameHeight / 2,
      duration: 1000,
      ease: 'Linear',
      repeat: 0
    })
    const splash = this.physics.add.sprite(-330, 223, 'splash').setOrigin(0.5, 1).setScale(0);

    // add waves
    this.addWaves();

    const collider = this.physics.add.collider(einstein, this.wave2, () => {
      console.log('colid')
      this.physics.world.removeCollider(collider)
      this.tweens.add({
        targets: splash,
        y: { value: 228, delay: 200, duration: 100 },
        scale: 0.3,
        duration: 300,
        ease: 'Sine',
        // yoyo: true,
        onComplete: () => {
          splash.destroy();
          this.addRestartButton();
        }
      });
    });

    // pier
    this.add.sprite(this.pierx, this.piery, 'pier', 2);

    // brain
    const brain = this.add.sprite(this.pierx - 98, this.piery - 33, 'brain');
    brain.setOrigin(0.5, 1);
    brain.setScale(.3);
    this.tweens.add({
      targets: brain,
      scaleY: brain.scale + 0.02,
      ease: 'Linear',
      duration: 800,
      yoyo: true,
      loop: -1,
    });
  }

  addRestartButton() {
    // play
    let play = this.add.bitmapText(-100, 0, 'timotheos', 'REINICIAR', 72);
    play.setInteractive();
    play.on("pointerover", () => {
      play.setScale(1.04);
      this.sys.canvas.style.cursor = "pointer";
    });
    play.on("pointerout", () => {
      play.setScale(1);
      this.sys.canvas.style.cursor = "default";
    });
    play.on("pointerdown", () => {
      this.scene.start("Play");
    });
  }


  // --------------------------------------------------------------------
  // addControlls() {
  //   let y = -this.gameHeight / 2 + 50;
  //   let x = -this.gameWidth / 2 + 50

  //   // menu icon
  //   let menu = this.add.sprite(x, y, "Sprites", "IconMenu");
  //   menu.setInteractive();
  //   menu.on("pointerdown", () => {
  //     this.scene.start("Menu");
  //   });
  // }

  // --------------------------------------------------------------------
  // buildScene() {

  //   // create pig animation if it does not exist
  //   if (typeof this.anims.get("pig") === "undefined") {
  //     this.anims.create({
  //       key: "pig",
  //       frames: this.anims.generateFrameNames("Sprites", { frames: ["pig01", "pig02", "pig03", "pig04", "pig05", "pig06", "pig07"] }),
  //       frameRate: 3,
  //       repeat: -1
  //     });
  //   }

  //   // add pig sprite and play animation
  //   let pig = this.add.sprite(0, 0, "Sprites");
  //   pig.anims.play("pig");
  // }

}
