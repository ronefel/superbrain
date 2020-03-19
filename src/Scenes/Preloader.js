import SceneBase from './SceneBase'
import 'whatwg-fetch'

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

    // load questions
    this.loadQuestions();

    // font timotheos
    this.load.bitmapFont('timotheos', 'assets/font/bitmapFonts/timotheos.png', 'assets/font/bitmapFonts/timotheos.xml');

    // load assets
    this.load.image('startScreen', 'assets/sprites/startScreen.png');
    this.load.image('playButton', 'assets/sprites/playButton.png');
    this.load.image('background', 'assets/sprites/background.png');
    this.load.image('wave1', 'assets/sprites/wave1.png');
    this.load.image('wave2', 'assets/sprites/wave2.png');
    this.load.image('cloud1', 'assets/sprites/cloud1.png');
    this.load.image('cloud2', 'assets/sprites/cloud2.png');
    this.load.image('cloud3', 'assets/sprites/cloud3.png');
    this.load.spritesheet('pier', 'assets/sprites/pier.png', { frameWidth: 412, frameHeight: 236 });
    this.load.spritesheet('einstein', 'assets/sprites/einstein.png', { frameWidth: 144, frameHeight: 269 });
    this.load.spritesheet('einsteinFly', 'assets/sprites/einstein_fly.png', { frameWidth: 154, frameHeight: 282 });
    this.load.spritesheet('einsteinDown', 'assets/sprites/einstein_down.png', { frameWidth: 300, frameHeight: 520 });
    this.load.image('sky', 'assets/sprites/sky.png');
    this.load.image('table', 'assets/sprites/table.png');
    this.load.image('brain', 'assets/sprites/brain.png');
    this.load.image('balloonYourBrain', 'assets/sprites/balloonYourBrain.png');
    this.load.image('clipboard', 'assets/sprites/clipboard.png');
    this.load.image('paper', 'assets/sprites/paper.png');
    this.load.image('radio', 'assets/sprites/radio.png');
    this.load.image('radioChecked', 'assets/sprites/radioChecked.png');
    this.load.image('gaivota', 'assets/sprites/gaivota.png');
    this.load.image('like', 'assets/sprites/like.png');
    this.load.image('splash', 'assets/sprites/splash.png');
    this.load.image('arrow', 'assets/sprites/arrow.png');

  }

  loadQuestions() {
    fetch('http://localhost:8080/assets/data/view.xml').then((res) => {
      return res.text()
    }).then((data) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, 'text/html');
      let questionNodes = xmlDoc.getElementsByTagName('questions')[0].childNodes;

      for (let i = 0; i < questionNodes.length; i++) {
        let answers = [];
        if (questionNodes[i].getAttribute('type') == 'multichoice') {
          let answerNodes = questionNodes[i].childNodes[2].childNodes;
          for (let j = 0; j < answerNodes.length; j++) {
            let answer = answerNodes[j].childNodes;
            answers.push({
              id: answerNodes[j].getAttribute('id'),
              text: answer[0].innerHTML,
              isCorrect: Math.round(answer[0].parentElement.attributes[1].value) > 0 ? true : false,
              fraction: answer[0].parentElement.attributes[1].value
            });
          }
        } else if (questionNodes[i].getAttribute('type') == 'truefalse') {
          answers.push({
            id: questionNodes[i].getAttribute('correctanswer') == '1' ? 1 : 0,
            text: "Wahr",
            isCorrect: questionNodes[i].getAttribute('correctanswer') == '1' ? true : false,
            fraction: questionNodes[i].getAttribute('correctanswer') == '1' ? 1.0 : 0.0
          },
            {
              id: questionNodes[i].getAttribute('correctanswer') == '1' ? 0 : 1,
              text: "Falsch",
              isCorrect: questionNodes[i].getAttribute('correctanswer') == '1' ? false : true,
              fraction: questionNodes[i].getAttribute('correctanswer') == '1' ? 0.0 : 1.0
            })
        }
        let type = null;
        switch (questionNodes[i].getAttribute('type')) {
          case 'multichoice':
            if (this.isMultiChoiceMultiAnswersType(answers)) {
              console.log("multichoice multi answers");
              type = 'multiple-choice-multiple-answer';
            } else {
              console.log("multichoice single answers");
              type = 'multiple-choice-single-answer';
            }
            break;
          case 'truefalse':
            console.log("truefalse");
            type = 'multiple-choice-single-answer';
            break;
        }
        this.App.questions.push({
          answers: answers,
          id: questionNodes[i].getAttribute('id'),
          text: questionNodes[i].childNodes[0].innerHTML,
          type: type
        });
      }
    })
  }

  isMultiChoiceMultiAnswersType(answers) {
    for (let i = 0; i < answers.length; i++) {
      if (!(answers[i].fraction == 0.0000000 || answers[i].fraction == 1.0000000)) {
        return true;
      }
    }
    return false;
  }
}
