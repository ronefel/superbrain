import SceneBase from './SceneBase';
import { Geom } from 'phaser';

export default class Play extends SceneBase {

  constructor() {
    super();
    this.cloud = 1;
    this.pierx = 400;
    this.piery = 270;
    this.pier = null;
    this.einstein = null;
    this.table = null;
    this.brain = null;
    this.isFly = false;
    this.clipboard = null;
    this.questions = [];
    this.responses = [];
  }

  // --------------------------------------------------------------------
  create() {
    console.log("Play");
    console.log(gameParams);

    // focus on 0, 0
    this.setView();

    // cursor set default
    this.sys.canvas.style.cursor = "default";

    // background
    this.addBackground();
    this.addWaves();

    // cloud
    this.addClouds();

    // pier
    this.pier = this.add.sprite(this.pierx, this.piery, 'pier', 0);

    // einstein
    this.einstein = this.add.sprite(this.pierx + 70, this.piery - 180, 'einstein', 0);
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('einstein'),
      frameRate: 24,
      repeat: 1
    });
    setInterval(() => {
      if (!this.isFly) {
        this.einstein.play('walk');
      }
    }, 5500);

    // table
    this.table = this.physics.add.sprite(this.pierx - 100, this.piery - 45, 'table');
    this.table.setOrigin(0.5, 1);

    // brain
    this.brain = this.add.sprite(this.pierx - 98, this.piery - 224, 'brain');
    this.brain.setOrigin(0.5, 1);
    this.brain.setScale(.3);
    this.tweens.add({
      targets: this.brain,
      scaleY: this.brain.scale + 0.02,
      ease: 'Linear',
      duration: 800,
      yoyo: true,
      loop: -1,
    });

    // balloonYourBrain
    const balloonYourBrain = this.add.sprite(this.pierx - 130, this.piery - 310, 'balloonYourBrain');
    this.tweens.add({
      targets: balloonYourBrain,
      scale: 1.1,
      ease: 'Linear',
      delay: 100,
      duration: 200,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.tweens.add({
          targets: balloonYourBrain,
          scale: 0,
          ease: 'Linear',
          delay: 1500,
          duration: 200,
          onComplete: () => {

          }
        })
      }
    });

    // clipboard
    this.clipboard = this.add.sprite(-this.gameWidth / 2 + 396, 10, 'clipboard');

    console.log(this.App.questions)
    const questionnaire = [
      {
        id: 1,
        text: 'Resposta certa é a alternativa a?',
        type: "multiple-choice-single-answer",
        answers: [
          {
            id: 1,
            text: 'Resposta a',
            isCorrect: true,
            fraction: "1.0000000"
          },
          {
            id: 2,
            text: 'Resposta b',
            value: 0
          },
          {
            id: 3,
            text: 'Resposta c',
            value: 0
          },
          {
            id: 4,
            text: 'Resposta d',
            value: 0
          },
          {
            id: 5,
            text: 'Resposta e',
            value: 0
          }
        ]
      },
      {
        id: 2,
        text: 'Resposta certa é a alternativa b?',
        answers: [
          {
            id: 1,
            text: 'Resposta a',
            value: 0
          },
          {
            id: 2,
            text: 'Resposta b',
            value: 100
          },
          {
            id: 3,
            text: 'Resposta c',
            value: 0
          },
          {
            id: 4,
            text: 'Resposta d',
            value: 0
          },
          {
            id: 5,
            text: 'Resposta e',
            value: 0
          }
        ]
      }
    ];

    let questionNumber = -1;
    this.App.questions.reverse().forEach(question => {
      questionNumber++;
      this.questions.push(this.makeQuestion(question, questionNumber));
      console.log(questionNumber)
    });
    // if (this.questions.length > 0) {
    //   this.questions[questionNumber].setVisible(true);
    // }
    console.log(this.questions)


    //this.paper = this.add.sprite(-this.gameWidth / 2 + 406, 35, 'paper');

    //this.question = this.add.text(0, 0, 'Question 1/2', style);

    // back icon
    // this.addControlls();

    // add some animation
    // this.buildScene();
    setTimeout(() => {
      //this.endAnimate();
      //this.detachQuestion(this.questions[0]);
    }, 5000);
  }

  // update() {

  // this.question.x = Math.floor(this.paper.x - this.paper.width / 2 + 20);
  // this.question.y = Math.floor(this.paper.y - this.paper.height / 2 + 20);

  // }

  makeQuestion(question, questionNumber) {
    const paper = this.add.sprite(this.clipboard.x + 10, this.clipboard.y + 24, 'paper');

    const answersDiv = document.createElement('div');
    answersDiv.innerHTML += '<div class="question-text">' + question.text + '</div>';

    const width = `width: ${paper.width - 90}px; height: ${paper.height - 130}px;`;
    const divDom = this.add.dom(0, 0, answersDiv, width).setClassName('question');
    divDom.setPosition(paper.x - paper.width / 2 + divDom.width / 2 + 5, paper.y - paper.height / 2 + divDom.height / 2 + 15);

    const arrow = this.add.sprite(0, 0, 'arrow').setAlpha(0.5).setName('arrow');
    arrow.setPosition(paper.x + paper.width / 2 - arrow.width / 2 - 30, divDom.y + divDom.height / 2 + arrow.height / 2 + 10);
    this.onClick(arrow, () => {
      this.saveAnswer(question, questionNumber);
    })
    arrow.disableInteractive();

    question.answers.forEach(answer => {
      const label = document.createElement('label');
      label.setAttribute('class', 'radio-custom');
      label.innerText = answer.text;
      label.innerHTML += `<input type="radio" name="${question.id}" value="${answer.id}"><span class="checkmark"></span>`;
      label.onmouseup = () => {
        arrow.setInteractive();
        arrow.setAlpha(1);
      };
      answersDiv.appendChild(label);
    });

    const style = { fontFamily: 'Komika Display Bold', fontSize: '18px', color: "#ffffff", wordWrap: { width: 100 }, align: "left" };
    const sendOrContinue = this.add.text(arrow.x - arrow.width / 2 + 10, arrow.y - 14, 'Enviar', style).setName('sendOrContinue');

    const answersContainer = this.add.container(0, 0, [paper, divDom, arrow, sendOrContinue]).setName(question.id);
    answersContainer.setSize(paper.width, paper.height);
    return answersContainer
  }

  saveAnswer(question, questionNumber) {
    console.log(questionNumber)
    const answerId = document.querySelector(`input[name="${question.id}"]:checked`).value;
    const answer = question.answers.filter(obj => {
      return obj.id === answerId;
    })
    this.responses[question.id] = answer;
    this.questions[questionNumber - 1].setVisible(true);
    this.detachQuestion(this.questions[questionNumber]);
  }

  detachQuestion(questionContainer) {
    this.tweens.add({
      targets: questionContainer,
      y: this.clipboard.y - 21,
      x: 38,
      angle: -8,
      duration: 300,
      ease: 'Linear',
      repeat: 0,
      onComplete: () => {
        this.tweens.add({
          targets: questionContainer,
          y: this.gameHeight,
          x: 200,
          duration: 300,
          ease: 'Linear',
          repeat: 0,
          onComplete: () => {
            questionContainer.destroy();
          }
        })
      }
    });
  }

  endAnimate() {
    const x = this.gameWidth / 2 + 130;
    const y = -this.gameHeight / 2 + 100;
    const gaivota = this.physics.add.sprite(x, y, 'gaivota');

    // this.physics.add.collider(gaivota, this.table, () => {console.log('colidiu')});
    //this.physics.add.overlap(gaivota, this.table, () => {console.log('colidiu')}, null);

    this.physics.add.collider(gaivota, this.table, () => {
      this.tableDestroyed();
    });

    const timeline = this.tweens.createTimeline();

    timeline.add({
      targets: gaivota,
      x: -x,
      y: y + 50,
      duration: 1800,
      ease: 'Linear'
    });
    timeline.add({
      targets: gaivota,
      x: x,
      y: y + 100,
      duration: 1800,
      delay: 500,
      ease: 'Linear',
      onStart: () => {
        gaivota.setFlipX(true);
      }
    });
    timeline.add({
      targets: gaivota,
      x: -x,
      y: y + 800,
      duration: 1500,
      delay: 500,
      ease: 'Linear',
      onStart: () => {
        gaivota.setPosition(x, y);
        gaivota.setFlipX(false);
      }
    });
    timeline.play();
  }

  tableDestroyed() {
    this.tweens.add({
      targets: this.table,
      props: {
        x: { value: this.pierx - 400 },
        y: { value: this.piery + 100 },
        angle: {
          value: -180,
        },
      },
      duration: 1000,
      ease: 'Linear',
    });

    this.tweens.add({
      targets: this.brain,
      // props: {
      //   y: { value: this.piery - 33, delay: 10 },
      // },
      y: this.piery - 33,
      duration: 200,
      delay: 10,
      ease: 'Back.easeIn',
      easeParams: [1],
      onComplete: () => {
        setTimeout(() => {
          this.pierDestroyed();
          this.launchEinstein();
        }, 150);
      }
    });
  }

  pierDestroyed() {
    this.pier.setTexture('pier', 1);
    setTimeout(() => {
      this.pier.setTexture('pier', 2);
    }, 100);
  }

  launchEinstein() {
    this.isFly = true;
    this.einstein.setTexture('einsteinFly', 0);
    this.tweens.add({
      targets: this.einstein,
      props: {
        y: { value: - this.gameHeight - 500 },
      },
      duration: 800,
      ease: 'Linear',
      onComplete: () => {
        this.scene.start("ScoringSky");
      }
    });
  }

  // --------------------------------------------------------------------
  // addControlls() {
  //   let y = -this.gameHeight / 2 + 50;
  //   let x = -this.gameWidth / 2 + 50

  //   // menu icon
  //   let menu = this.add.sprite(x, y, "Sprites", "IconMenu");
  //   menu.setInteractive();
  //   menu.on("pointerdown", () => {
  //     this.scene.start("Menu");
  //   });
  // }

  // --------------------------------------------------------------------
  // buildScene() {

  //   // create pig animation if it does not exist
  //   if (typeof this.anims.get("pig") === "undefined") {
  //     this.anims.create({
  //       key: "pig",
  //       frames: this.anims.generateFrameNames("Sprites", { frames: ["pig01", "pig02", "pig03", "pig04", "pig05", "pig06", "pig07"] }),
  //       frameRate: 3,
  //       repeat: -1
  //     });
  //   }

  //   // add pig sprite and play animation
  //   let pig = this.add.sprite(0, 0, "Sprites");
  //   pig.anims.play("pig");
  // }

}
