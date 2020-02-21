import SceneBase from './SceneBase';

export default class Menu extends SceneBase {

  // -------------------------------------------------------------------------
  create() {
    console.log("Menu");

    // bacground color
    //this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x808080);

    // focus on 0, 0
    this.setView();

    // sound and music icons
    // this.addAudioControlls();

    // add startScreen
    this.add.image(0, 0, 'startScreen');

    // add play button
    this.addPlayButton();

    // this.add.bitmapText(-this.gameWidth / 2 + 50, -this.gameHeight / 2 + 50, 'timotheos', 'super cérebro', 72);
  }

  // --------------------------------------------------------------------
  addAudioControlls() {
    let y = -this.gameHeight / 2 + 50;

    // sound
    let soundIconFrame = this.App.settings.soundOn ? "IconSoundOn" : "IconSoundOff";
    let sound = this.add.sprite(-40, y, "Sprites", soundIconFrame);
    sound.setInteractive();
    sound.on("pointerdown", () => {
      this.App.settings.soundOn = !this.App.settings.soundOn;
      sound.setFrame(this.App.settings.soundOn ? "IconSoundOn" : "IconSoundOff");
      this.saveSettings();
    });

    // music
    let musicIconFrame = this.App.settings.musicOn ? "IconMusicOn" : "IconMusicOff";
    let music = this.add.sprite(40, y, "Sprites", musicIconFrame);
    music.setInteractive();
    music.on("pointerdown", () => {
      this.App.settings.musicOn = !this.App.settings.musicOn;
      music.setFrame(this.App.settings.musicOn ? "IconMusicOn" : "IconMusicOff");
      this.saveSettings();
    });
  }

  // --------------------------------------------------------------------
  addPlayButton() {
    // play
    let play = this.add.image(390, 24, 'playButton');
    play.setInteractive();
    play.on("pointerover", () => {
      play.setScale(1.1);
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
  saveSettings() {
    this.StorageUtils.save(this.App.config.SAVE_KEY, this.App.settings).then(function () {
      console.log("Settings saved...");
    }).catch(function (e) {
      console.log(e);
    });
  }

}
