import SceneBase from './SceneBase'

export default class Preloader extends SceneBase {

  // -------------------------------------------------------------------------
  create() {
    console.log("Preloader");

    let self = this;

    // load user settings
    self.StorageUtils.load(this.App.config.SAVE_KEY).then(function (data) {
      // if data is not null and not undefined
      if (data != null) {
        self.App.settings = data;
        console.log("Settings loaded...");
      } else {
        console.log("No saved settings.");
      }

      // continue to menu
      self.scene.start("Menu");
    });
  }

  // --------------------------------------------------------------------
  preload() {

    console.log("Loading assets...");

    // load atlas with test sprites
    this.load.atlas("Sprites", "assets/sprites/Sprites.png", "assets/sprites/Sprites.json");

    this.load.atlas("Mega", "assets/sprites/Mega.png", "assets/sprites/Mega.json");
  }
}
