require('./bootstrap');
import ObjectUtils from './Utils/ObjectUtils';
import Config from './Config';
import Settings from './Settings';
import Game from './Game';

class App {

  constructor() {
    console.log('App constructing');

    // game
    this.game = null;

    // settings
    this.settings = Settings;

    // config
    this.config = Config;

    this.launch();

    console.log('App constructed');
  }

  async launch() {
    console.log('App launching');

    // load main game config
    let configJson = null;
    try {
      configJson = await ObjectUtils.loadJson("./assets/config.json");
      ObjectUtils.loadValuesIntoObject(configJson, this.config);
    } catch (e) {
      throw e;
    }

    // create game
    this.game = new Game(this.config);

    console.log('App launched');
  }
}

export default new App();
