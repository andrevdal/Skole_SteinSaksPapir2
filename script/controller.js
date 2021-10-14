export class Game {
  rock = 2;
  paper = 3;
  scissors = 4;
  hChooser = null;
  bChoice = null;
  calculatorResult = NaN;
  timer = 3;
  timerID = null;
  bScore = 0;
  hScore = 0;
  rounds = 3;
  roundsLimit = Math.floor(this.rounds / 2) + 1;

  onTimerChange(timer) {
    return;
  }

  onRound(feedback) {
    return;
  }

  onFinish() {
    return
  }

  constructor() {
    this.startTimer();
  }

  startTimer() {
    this.timer = 4;
    if (this.timerID) {
      this.stopTimer();
    }
    this.timerID = setInterval(() => {
      this.timer--;
      this.onTimerChange(this.timer);
      if (this.timer == 0) this.stopTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  /**
   *
   * @returns number
   */
  botChooser() {
    this.bChoice = Math.round(Math.random() * 2 + 2);
    return this.bChoice;
  }

  /**
   *
   * @param {string} itemName
   * @returns 2, 3, 4
   */
  getItemFromString(itemName) {
    switch (itemName.trim().toLowerCase()) {
      case "rock":
        return this.rock;
      case "paper":
        return this.paper;
      case "scissors":
        return this.scissors;
    }
  }

  /**
   *
   * @param {number} human
   * @param {number} bot
   * @returns {number}
   */
  calculator(human, bot) {
    this.calculatorResult = human / bot;
    console.log(bot, human);
    return this.calculatorResult;
  }
  /**
   * Check with the provided variables
   * @returns {[number, number]} humanScore, botScore
   */
  battleCheck() {
    if (this.timer == 0 || this.timer > 1) {
      this.bScore++;
      this.rounds++;
    } else {
      if (this.calculatorResult == 1) {
        this.onRound("(draw)");
      } else if (
        this.calculatorResult == 0.5 ||
        this.calculatorResult == 1.5 ||
        this.calculatorResult == 1.3333333333333333
      ) {
        this.hScore++;
        this.rounds++;
		this.onRound("(win)");
      } else if (
        this.calculatorResult == 0.6666666666666666 ||
        this.calculatorResult == 0.75 ||
        this.calculatorResult == 2
      ) {
        this.bScore++;
        this.rounds++;
		this.onRound("(lost)");
      }
    }
    if (this.bScore >= this.roundsLimit || this.hScore >= this.roundsLimit) {
      this.stopTimer()
      this.onFinish()
    } else {
      //this.stopTimer();
      setTimeout(() => this.startTimer(), 1000);
    }
    return [this.hScore, this.bScore];
  }
}
