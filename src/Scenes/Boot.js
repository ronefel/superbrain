import SceneBase from './SceneBase'

export default class Boot extends SceneBase {

  // --------------------------------------------------------------------
  create() {
    console.log("Boot");

    this.scene.start("Preloader");
  }
}
