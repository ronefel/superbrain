import SceneBase from './SceneBase';

export default class Menu extends SceneBase {

  // -------------------------------------------------------------------------
  create() {
    console.log("Menu");

    // bacground color
    this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x808080);

    // focus on 0, 0
    this.setView();

    // sound and music icons
    this.addAudioControlls();

    // add play button
    this.addPlayButton();
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
    let play = this.add.sprite(0, 0, "Sprites", "IconPlay");
    play.setInteractive();
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
