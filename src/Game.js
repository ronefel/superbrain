import Phaser from 'phaser';
import Boot from './Scenes/Boot';
import Preloader from './Scenes/Preloader';
import Menu from './Scenes/Menu';
import Play from './Scenes/Play';

export default class Game extends Phaser.Game {

  // --------------------------------------------------------------------
  constructor(config) {
    console.log('Game constructing');

    // init game
    super(
      {
        type: Phaser.AUTO,
        title: "Super Brain",

        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: "game-content",

          width: config.GAME_WIDTH,
          height: config.GAME_HEIGHT,
        }
      }
    );

    // states
    this.scene.add("Boot", Boot);
    this.scene.add("Preloader", Preloader);
    this.scene.add("Menu", Menu);
    this.scene.add("Play", Play);

    // start
    this.scene.start("Boot");
    console.log('App constructed');
  }
}
