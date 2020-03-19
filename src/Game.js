import Phaser from 'phaser';
import Boot from './Scenes/Boot';
import Preloader from './Scenes/Preloader';
import Menu from './Scenes/Menu';
import Play from './Scenes/Play';
import ScoringSky from './Scenes/ScoringSky';
import FallingDown from './Scenes/FallingDown';

export default class Game extends Phaser.Game {

  // --------------------------------------------------------------------
  constructor(config) {
    console.log('Game constructing');

    // init game
    super(
      {
        type: Phaser.CANVAS,
        title: "Super Brain",
        physics: {
          default: 'arcade',
          arcade: {
            // debug: true
          }
        },
        dom: {
          createContainer: true
        },
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
    this.scene.add("ScoringSky", ScoringSky);
    this.scene.add("FallingDown", FallingDown);

    // start
    this.scene.start("Boot");
    console.log('App constructed');
  }
}
