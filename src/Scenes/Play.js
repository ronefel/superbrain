import SceneBase from './SceneBase';

export default class Play extends SceneBase {

  // --------------------------------------------------------------------
  create() {
    console.log("Play");

    // bacground color
    this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0xB8C6FF);

    // focus on 0, 0
    this.setView();

    // back icon
    this.addControlls();

    // add some animation
    this.buildScene();
  }

  // --------------------------------------------------------------------
  addControlls() {
    let y = -this.gameHeight / 2 + 50;
    let x = -this.gameWidth / 2 + 50

    // menu icon
    let menu = this.add.sprite(x, y, "Sprites", "IconMenu");
    menu.setInteractive();
    menu.on("pointerdown", () => {
      this.scene.start("Menu");
    });
  }

  // --------------------------------------------------------------------
  buildScene() {

    // create pig animation if it does not exist
    if (typeof this.anims.get("pig") === "undefined") {
      this.anims.create({
        key: "pig",
        frames: this.anims.generateFrameNames("Sprites", { frames: ["pig01", "pig02", "pig03", "pig04", "pig05", "pig06", "pig07"] }),
        frameRate: 3,
        repeat: -1
      });
    }

    // add pig sprite and play animation
    let pig = this.add.sprite(0, 0, "Sprites");
    pig.anims.play("pig");
  }

}
