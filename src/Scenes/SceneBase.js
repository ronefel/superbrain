import App from '../App';
import StorageUtils from '../Utils/StorageUtils';

export default class SceneBase extends Phaser.Scene {

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
}